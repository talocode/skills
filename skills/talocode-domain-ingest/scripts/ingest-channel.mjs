#!/usr/bin/env node
/**
 * talocode-domain-ingest — list / fetch / process public YouTube channel captions
 * into a Talocode Wiki layout. Requires yt-dlp on PATH.
 *
 * Usage:
 *   node ingest-channel.mjs list --channel <url> --limit 30 --out manifest.json
 *   node ingest-channel.mjs fetch --manifest manifest.json --out ./transcripts
 *   node ingest-channel.mjs process --transcripts ./transcripts --domain agents --wiki ./wiki
 */
import { spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from 'node:fs'
import { join, basename, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function usage() {
  console.log(`talocode-domain-ingest channel tools

Commands:
  list    --channel <url> [--limit N] --out <manifest.json>
  fetch   --manifest <file> --out <transcriptsDir> [--max N]
  process --transcripts <dir> --domain <slug> --wiki <wikiDir>

Requires: yt-dlp on PATH
`)
}

function arg(flag, argv = process.argv) {
  const i = argv.indexOf(flag)
  return i >= 0 ? argv[i + 1] : undefined
}

function has(flag) {
  return process.argv.includes(flag)
}

function ensureYtDlp() {
  const r = spawnSync('yt-dlp', ['--version'], { encoding: 'utf8' })
  if (r.status !== 0) {
    throw new Error('yt-dlp not found on PATH. Install yt-dlp, then retry.')
  }
  return (r.stdout || '').trim()
}

function runYtDlp(args, opts = {}) {
  const r = spawnSync('yt-dlp', args, {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
    ...opts,
  })
  if (r.status !== 0) {
    const err = (r.stderr || r.stdout || 'yt-dlp failed').slice(0, 2000)
    throw new Error(err)
  }
  return r.stdout || ''
}

function slugify(s) {
  return String(s || 'untitled')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'untitled'
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

/** list public playlist/channel entries */
function cmdList() {
  ensureYtDlp()
  const channel = arg('--channel')
  const out = arg('--out')
  const limit = Number(arg('--limit') || 25)
  if (!channel || !out) throw new Error('--channel and --out required')

  // Prefer uploads playlist style URLs; yt-dlp accepts channel/handle URLs
  const jsonl = runYtDlp([
    '--flat-playlist',
    '--skip-download',
    '-J',
    '--playlist-end',
    String(limit),
    channel,
  ])

  let data
  try {
    data = JSON.parse(jsonl)
  } catch {
    throw new Error('Failed to parse yt-dlp JSON output')
  }

  const entries = (data.entries || []).map((e, i) => ({
    index: i + 1,
    id: e.id || e.url,
    title: e.title || '',
    url: e.url?.startsWith('http')
      ? e.url
      : e.id
        ? `https://www.youtube.com/watch?v=${e.id}`
        : e.url,
    duration: e.duration ?? null,
    channel: data.channel || data.uploader || data.title || channel,
    channel_url: data.channel_url || data.uploader_url || channel,
  })).filter((e) => e.id)

  const manifest = {
    fetchedAt: new Date().toISOString(),
    channel,
    limit,
    count: entries.length,
    entries,
  }

  mkdirSync(dirname(out) === '.' ? process.cwd() : dirname(out), { recursive: true })
  writeFileSync(out, JSON.stringify(manifest, null, 2) + '\n')
  console.log(JSON.stringify({ ok: true, count: entries.length, out }, null, 2))
}

/** fetch public auto-subs / subs as vtt/srv3/ttml → plain text */
function cmdFetch() {
  ensureYtDlp()
  const manifestPath = arg('--manifest')
  const outDir = arg('--out')
  const max = Number(arg('--max') || 999)
  if (!manifestPath || !outDir) throw new Error('--manifest and --out required')
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  mkdirSync(outDir, { recursive: true })

  const results = []
  const entries = (manifest.entries || []).slice(0, max)

  for (const e of entries) {
    const id = e.id
    const base = join(outDir, id)
    const metaPath = `${base}.meta.json`
    writeFileSync(metaPath, JSON.stringify(e, null, 2))

    try {
      // Write auto-subs + subs if any; convert later
      runYtDlp([
        '--skip-download',
        '--write-auto-sub',
        '--write-sub',
        '--sub-lang',
        'en.*,en',
        '--sub-format',
        'vtt/srt/best',
        '-o',
        `${base}.%(ext)s`,
        e.url || `https://www.youtube.com/watch?v=${id}`,
      ])

      // Find subtitle files
      const dirFiles = readdirSync(outDir).filter((f) => f.startsWith(id) && (f.endsWith('.vtt') || f.endsWith('.srt')))
      if (!dirFiles.length) {
        results.push({ id, ok: false, reason: 'no_captions' })
        continue
      }
      const subFile = join(outDir, dirFiles[0])
      const text = vttOrSrtToText(readFileSync(subFile, 'utf8'))
      writeFileSync(`${base}.txt`, text)
      results.push({ id, ok: true, chars: text.length, sub: dirFiles[0] })
    } catch (err) {
      results.push({ id, ok: false, reason: err instanceof Error ? err.message : String(err) })
    }
  }

  const summaryPath = join(outDir, '_fetch-summary.json')
  writeFileSync(summaryPath, JSON.stringify({ at: new Date().toISOString(), results }, null, 2))
  const ok = results.filter((r) => r.ok).length
  console.log(JSON.stringify({ ok: true, fetched: ok, total: results.length, summary: summaryPath }, null, 2))
}

function vttOrSrtToText(raw) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')
  const out = []
  const seen = new Set()
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    if (t.startsWith('WEBVTT')) continue
    if (t.startsWith('NOTE')) continue
    if (t.startsWith('Kind:') || t.startsWith('Language:')) continue
    if (/^\d+$/.test(t)) continue // srt index
    if (/-->/.test(t)) continue // timestamps
    if (/^<\/?c[\s>]/.test(t)) continue
    // strip simple tags
    const clean = t.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim()
    if (!clean) continue
    if (seen.has(clean)) continue
    seen.add(clean)
    out.push(clean)
  }
  return out.join('\n')
}

/** Heuristic claim extraction — agent should refine; this scaffolds notes */
function extractClaimCandidates(text, max = 12) {
  const paras = text.split(/\n+/).map((s) => s.trim()).filter(Boolean)
  const scored = []
  const signals =
    /\b(should|must|never|always|problem|fails?|bug|cost|token|latency|because|instead|workflow|mistake|avoid|prefer)\b/i
  for (const p of paras) {
    if (p.length < 40 || p.length > 400) continue
    let score = 0
    if (signals.test(p)) score += 2
    if (/\d/.test(p)) score += 1
    if (/\b(I|we|you)\b/i.test(p)) score += 0.5
    if (score >= 2) scored.push({ text: p, score })
  }
  scored.sort((a, b) => b.score - a.score)
  // de-dupe similar starts
  const picked = []
  for (const c of scored) {
    if (picked.some((x) => x.text.slice(0, 40) === c.text.slice(0, 40))) continue
    picked.push(c)
    if (picked.length >= max) break
  }
  return picked
}

function cmdProcess() {
  const transcriptsDir = arg('--transcripts')
  const domain = arg('--domain')
  const wikiDir = arg('--wiki') || './wiki'
  if (!transcriptsDir || !domain) throw new Error('--transcripts and --domain required')

  const domainDir = join(wikiDir, 'domains', domain)
  const claimsDir = join(domainDir, 'claims')
  const sourcesRoot = join(wikiDir, 'sources')
  mkdirSync(claimsDir, { recursive: true })
  mkdirSync(sourcesRoot, { recursive: true })
  mkdirSync(join(wikiDir, 'raw', domain), { recursive: true })

  // domain brief stub if missing
  const briefPath = join(domainDir, 'brief.md')
  if (!existsSync(briefPath)) {
    const tpl = readFileSync(join(__dirname, '../templates/domain-brief.md'), 'utf8')
    writeFileSync(
      briefPath,
      tpl
        .replace('domain: ""', `domain: "${domain}"`)
        .replace('created: ""', `created: "${today()}"`)
        .replace('<name>', domain),
    )
  }

  const files = readdirSync(transcriptsDir).filter((f) => f.endsWith('.txt'))
  let claimsWritten = 0
  const indexLines = [`# Domain: ${domain}`, '', `Updated: ${today()}`, '', '## Ingested videos', '']

  for (const f of files) {
    const id = f.replace(/\.txt$/, '')
    const text = readFileSync(join(transcriptsDir, f), 'utf8')
    let meta = { id, title: id, url: `https://www.youtube.com/watch?v=${id}` }
    const metaPath = join(transcriptsDir, `${id}.meta.json`)
    if (existsSync(metaPath)) {
      try {
        meta = { ...meta, ...JSON.parse(readFileSync(metaPath, 'utf8')) }
      } catch {
        /* ignore */
      }
    }

    const channelSlug = slugify(meta.channel || 'youtube')
    const sourceDir = join(sourcesRoot, `yt-${channelSlug}`)
    mkdirSync(join(sourceDir, 'pages'), { recursive: true })

    const candidates = extractClaimCandidates(text)
    const sourcePage = [
      '---',
      `title: ${JSON.stringify(meta.title || id)}`,
      `source_type: youtube`,
      `video_id: ${id}`,
      `url: ${meta.url}`,
      `domain: ${domain}`,
      `retrieved: ${today()}`,
      'status: raw-extract',
      '---',
      '',
      `# ${meta.title || id}`,
      '',
      `Source: ${meta.url}`,
      '',
      '## Candidate claims (unverified)',
      '',
      ...candidates.map((c, i) => `${i + 1}. ${c.text}`),
      '',
      '## Agent next steps',
      '',
      '1. Fact-check each claim against primary sources',
      '2. Mark status: supported | contested | creator-only | false | stale',
      '3. Promote durable claims to `domains/<domain>/claims/`',
      '',
    ].join('\n')

    writeFileSync(join(sourceDir, 'pages', `${id}.md`), sourcePage)
    indexLines.push(`- [${meta.title || id}](${meta.url}) — ${candidates.length} candidates`)

    // Write claim cards (creator-only until agent verifies)
    candidates.forEach((c, i) => {
      const slug = slugify(`${id}-${i}-${c.text.slice(0, 40)}`)
      const claimPath = join(claimsDir, `${slug}.md`)
      if (existsSync(claimPath)) return
      const body = [
        '---',
        `title: ${JSON.stringify(c.text.slice(0, 100))}`,
        `domain: ${domain}`,
        'status: creator-only',
        'confidence: low',
        'sources:',
        '  - type: youtube',
        `    id: ${id}`,
        `    url: ${meta.url}`,
        `    title: ${JSON.stringify(meta.title || '')}`,
        `retrieved: ${today()}`,
        `tags: [${domain}, youtube-ingest]`,
        '---',
        '',
        '# Claim',
        '',
        `> ${c.text}`,
        '',
        '## Why it matters',
        '',
        '_Agent: fill in audience impact._',
        '',
        '## Evidence',
        '',
        `- Transcript candidate from ${meta.url}`,
        '',
        '## Counter-evidence / limits',
        '',
        '- _Pending fact-check_',
        '',
        '## Recency',
        '',
        `- Checked: ${today()}`,
        '- Still holds? partial',
        '- Notes: auto-extracted; not verified',
        '',
        '## Talocode angle (optional)',
        '',
        '_Only if demoable._',
        '',
        '## Open questions',
        '',
        '- What primary source confirms this?',
        '',
      ].join('\n')
      writeFileSync(claimPath, body)
      claimsWritten++
    })
  }

  // domain index
  writeFileSync(join(domainDir, 'index.md'), indexLines.join('\n') + '\n')

  // playbook stub
  const playbookPath = join(domainDir, 'playbook.md')
  if (!existsSync(playbookPath)) {
    const tpl = readFileSync(join(__dirname, '../templates/domain-playbook.md'), 'utf8')
    writeFileSync(
      playbookPath,
      tpl.replace('domain: ""', `domain: "${domain}"`).replace('updated: ""', `updated: "${today()}"`).replace('<domain>', domain),
    )
  }

  // hot cache append
  const hotPath = join(wikiDir, 'hot.md')
  mkdirSync(wikiDir, { recursive: true })
  const hotLine = `\n## Domain ingest: ${domain} (${today()})\n\n- Claims scaffolded: ${claimsWritten}\n- Transcripts: ${files.length}\n- Path: domains/${domain}/\n- Next: fact-check claims; promote supported ones; query before inventing.\n`
  if (existsSync(hotPath)) {
    writeFileSync(hotPath, readFileSync(hotPath, 'utf8') + hotLine)
  } else {
    writeFileSync(hotPath, `# Hot cache\n${hotLine}`)
  }

  console.log(
    JSON.stringify(
      {
        ok: true,
        domain,
        transcripts: files.length,
        claimsWritten,
        domainDir,
        note: 'All claims default to status: creator-only. Agent must fact-check before treating as truth.',
      },
      null,
      2,
    ),
  )
}

function main() {
  const cmd = process.argv[2]
  if (!cmd || cmd === '--help' || cmd === '-h') {
    usage()
    process.exit(0)
  }
  try {
    if (cmd === 'list') cmdList()
    else if (cmd === 'fetch') cmdFetch()
    else if (cmd === 'process') cmdProcess()
    else {
      usage()
      process.exit(1)
    }
  } catch (e) {
    console.error(e instanceof Error ? e.message : e)
    process.exit(1)
  }
}

main()
