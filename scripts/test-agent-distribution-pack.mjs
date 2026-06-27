#!/usr/bin/env node

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'

import { auditSkillNoops, repoRoot } from './audit-skill-noops.mjs'

const SKILLS = ['talocode-worklane', 'talocode-stacklane', 'talocode-launchpix']
const EXAMPLE_DIRS = ['worklane', 'stacklane', 'launchpix']

const NO_OP_PHRASES = [
  'be thorough',
  'be careful',
  'think carefully',
  'think step by step',
  'use best practices',
  'write clean code',
  'make it readable',
  'make it robust',
  'high quality',
  'ensure quality',
  'do a good job',
  'be precise',
  'be concise',
  'be helpful',
]

const CLOUD_DEPENDENCY_CLAIMS = [
  'requires a cloud account',
  'requires cloud account',
  'requires a hosted talocode api',
  'requires hosted talocode api',
  'cannot run locally',
  'cloud-only',
  'cloud only',
]

const AUTO_DESTRUCTIVE_CLAIMS = [
  'auto-destructive execution',
  'autonomous destructive execution',
  'auto-approve destructive',
  'auto approve destructive',
  'bypass approval',
  'bypass the approval',
  'skip approval',
]

const SECRET_PRINTING_CLAIMS = [
  'print the raw api key',
  'print raw api key',
  'log the raw api key',
  'echo the api key',
  'store the raw api key in a file',
  'print .env values',
  'print environment variables',
]

const OFFICIAL_LISTING_CLAIMS = [
  'official marketplace listing',
  'officially listed',
  'official marketplace approval',
  'officially approved',
  'official marketplace support',
]

async function readText(relativePath) {
  const absolute = path.join(repoRoot, relativePath)
  return fs.readFile(absolute, 'utf8')
}

async function exists(relativePath) {
  try {
    await fs.access(path.join(repoRoot, relativePath))
    return true
  } catch {
    return false
  }
}

function containsAny(text, phrases) {
  const normalized = text.toLowerCase()
  return phrases.filter((phrase) => normalized.includes(phrase))
}

// Detect affirmative claims only. Lines that explicitly prohibit a claim
// ("do not", "never", "must not", "do not claim") are prohibitions, not claims,
// so they are excluded from the banned-claim checks.
function containsAffirmativeClaim(text, phrases) {
  const lines = text.split(/\r?\n/)
  const hits = []
  for (const line of lines) {
    let normalized = line.trim().toLowerCase()
    normalized = normalized.replace(/^([-*+]|\d+\.\s|\d+\)\s)\s*/, '')
    if (/^(do not\b|never\b|must not\b|do not claim\b|do not store\b|do not print\b|do not log\b|do not auto\b|do not echo\b)/.test(normalized)) {
      continue
    }
    for (const phrase of phrases) {
      if (normalized.includes(phrase)) {
        hits.push(phrase)
      }
    }
  }
  return hits
}

function containsAnyWordBoundary(text, phrases) {
  const normalized = text.toLowerCase()
  return phrases.filter((phrase) => {
    const pattern = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
    return pattern.test(normalized)
  })
}

async function run() {
  // 1. All three SKILL.md files exist.
  for (const skill of SKILLS) {
    const skillPath = `skills/${skill}/SKILL.md`
    assert.ok(await exists(skillPath), `missing skill file: ${skillPath}`)
    const content = await readText(skillPath)
    assert.match(content, new RegExp(`^# ${skill}$`, 'm'), `${skillPath} missing H1 title`)
    assert.match(content, /## Purpose/, `${skillPath} missing Purpose section`)
    assert.match(content, /## When to Use/, `${skillPath} missing When to Use section`)
    assert.match(content, /## Required Behavior|## Workflow/, `${skillPath} missing workflow section`)
    assert.match(content, /## Constraints/, `${skillPath} missing Constraints section`)
    assert.match(content, /## Final Report Fields/, `${skillPath} missing Final Report Fields section`)
    assert.match(content, /## Validation Checklist/, `${skillPath} missing Validation Checklist section`)
  }

  // 2. All marketplace JSON files exist and parse.
  for (const skill of SKILLS) {
    const marketPath = `marketplace/${skill}.json`
    assert.ok(await exists(marketPath), `missing marketplace file: ${marketPath}`)
    const raw = await readText(marketPath)
    const json = JSON.parse(raw)
    assert.equal(json.slug, skill, `${marketPath} slug mismatch`)
    assert.ok(json.name && typeof json.name === 'string', `${marketPath} missing name`)
    assert.ok(json.description && typeof json.description === 'string', `${marketPath} missing description`)
    assert.ok(json.category && typeof json.category === 'string', `${marketPath} missing category`)
    assert.ok(Array.isArray(json.tags) && json.tags.length > 0, `${marketPath} missing tags`)
    assert.ok(typeof json.repo === 'string' && json.repo.startsWith('https://'), `${marketPath} missing repo URL`)
    assert.equal(json.local_first, true, `${marketPath} local_first must be true`)
    assert.equal(json.approval_first, true, `${marketPath} approval_first must be true`)
    assert.equal(json.requires_cloud_account, false, `${marketPath} requires_cloud_account must be false`)
    assert.ok(Array.isArray(json.supported_agent_environments), `${marketPath} missing supported_agent_environments`)
    const envs = json.supported_agent_environments.join(',')
    assert.match(envs, /Codex/, `${marketPath} must support Codex`)
    assert.match(envs, /Claude Code/, `${marketPath} must support Claude Code`)
    assert.match(envs, /OpenCode/, `${marketPath} must support OpenCode`)
    assert.match(envs, /Cursor/, `${marketPath} must support Cursor`)
    assert.match(envs, /SKILL\.md-compatible/, `${marketPath} must support SKILL.md-compatible agents`)
  }

  // 3. Docs exist.
  const docsPath = 'docs/AGENT_DISTRIBUTION_PACK.md'
  assert.ok(await exists(docsPath), `missing docs: ${docsPath}`)
  const docs = await readText(docsPath)
  assert.match(docs, /Agent Distribution Pack/, `${docsPath} missing title`)
  assert.match(docs, /local-first/i, `${docsPath} missing local-first section`)
  assert.match(docs, /approval-first/i, `${docsPath} missing approval-first section`)
  assert.match(docs, /MCP/i, `${docsPath} missing MCP plan`)

  // 4. Examples exist.
  for (const dir of EXAMPLE_DIRS) {
    const exampleDir = path.join(repoRoot, 'examples', dir)
    let entries
    try {
      entries = await fs.readdir(exampleDir)
    } catch {
      entries = []
    }
    const mdFiles = entries.filter((name) => name.endsWith('.md'))
    assert.ok(mdFiles.length > 0, `examples/${dir}/ must contain at least one .md file`)
    for (const name of mdFiles) {
      const content = await readText(`examples/${dir}/${name}`)
      assert.match(content, /Sample Agent Task/, `examples/${dir}/${name} missing Sample Agent Task`)
      assert.match(content, /Expected Safe Workflow/, `examples/${dir}/${name} missing Expected Safe Workflow`)
      assert.match(content, /Final Report Template/, `examples/${dir}/${name} missing Final Report Template`)
      assert.match(content, /Validation Checklist/, `examples/${dir}/${name} missing Validation Checklist`)
    }
  }

  // 5. No skill contains common no-op phrases.
  for (const skill of SKILLS) {
    const content = await readText(`skills/${skill}/SKILL.md`)
    const hits = containsAnyWordBoundary(content, NO_OP_PHRASES)
    assert.equal(hits.length, 0, `${skill} contains no-op phrases: ${hits.join(', ')}`)
  }

  // 6. No skill claims cloud dependency.
  for (const skill of SKILLS) {
    const content = await readText(`skills/${skill}/SKILL.md`)
    const hits = containsAffirmativeClaim(content, CLOUD_DEPENDENCY_CLAIMS)
    assert.equal(hits.length, 0, `${skill} claims cloud dependency: ${hits.join(', ')}`)
  }

  // 7. No skill claims auto-destructive execution.
  for (const skill of SKILLS) {
    const content = await readText(`skills/${skill}/SKILL.md`)
    const hits = containsAffirmativeClaim(content, AUTO_DESTRUCTIVE_CLAIMS)
    assert.equal(hits.length, 0, `${skill} claims auto-destructive execution: ${hits.join(', ')}`)
  }

  // 8. No skill prints or asks for secrets.
  for (const skill of SKILLS) {
    const content = await readText(`skills/${skill}/SKILL.md`)
    const hits = containsAffirmativeClaim(content, SECRET_PRINTING_CLAIMS)
    assert.equal(hits.length, 0, `${skill} prints secrets: ${hits.join(', ')}`)
  }

  // 9. No skill mentions unsupported official marketplace listing.
  for (const skill of SKILLS) {
    const content = await readText(`skills/${skill}/SKILL.md`)
    const hits = containsAffirmativeClaim(content, OFFICIAL_LISTING_CLAIMS)
    assert.equal(hits.length, 0, `${skill} claims official listing: ${hits.join(', ')}`)
  }

  // 10. No-Op Auditor passes (no high-severity findings across the repo).
  const audit = await auditSkillNoops()
  assert.equal(audit.summary.highSeverityCount, 0, `no-op auditor found high-severity findings: ${audit.summary.highSeverityCount}`)

  // 11. CI workflow still exists.
  const ciPath = '.github/workflows/skill-noop-auditor.yml'
  assert.ok(await exists(ciPath), `missing CI workflow: ${ciPath}`)
  const ci = await readText(ciPath)
  assert.match(ci, /test-skill-noop-auditor\.mjs/, `${ciPath} must run the auditor tests`)
  assert.match(ci, /audit-skill-noops\.mjs --fail-on-high/, `${ciPath} must run the no-op audit`)

  console.log('agent distribution pack tests passed')
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : error)
  process.exit(1)
})
