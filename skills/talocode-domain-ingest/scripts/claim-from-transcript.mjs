#!/usr/bin/env node
/**
 * Scaffold claim cards from a single transcript file.
 * Usage: node claim-from-transcript.mjs --file video.txt --domain agents --out ./claims
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

function arg(f) {
  const i = process.argv.indexOf(f)
  return i >= 0 ? process.argv[i + 1] : undefined
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

const file = arg('--file')
const domain = arg('--domain') || 'general'
const out = arg('--out') || './claims'
const videoId = arg('--id') || 'unknown'
const url = arg('--url') || ''

if (!file) {
  console.error('--file required')
  process.exit(1)
}

const text = readFileSync(file, 'utf8')
const lines = text.split(/\n+/).map((l) => l.trim()).filter((l) => l.length > 50 && l.length < 350)
const signals = /\b(should|must|never|always|problem|fail|cost|instead|avoid|prefer|mistake)\b/i
const picks = lines.filter((l) => signals.test(l)).slice(0, 10)
mkdirSync(out, { recursive: true })
const today = new Date().toISOString().slice(0, 10)

picks.forEach((p, i) => {
  const path = join(out, `${slugify(p)}.md`)
  if (existsSync(path)) return
  writeFileSync(
    path,
    `---
title: ${JSON.stringify(p.slice(0, 100))}
domain: ${domain}
status: creator-only
confidence: low
sources:
  - type: youtube
    id: ${videoId}
    url: ${url}
retrieved: ${today}
tags: [${domain}]
---

# Claim

> ${p}

## Evidence

- Transcript extract (unverified)

## Recency

- Checked: ${today}
- Still holds? partial
`,
  )
})

console.log(JSON.stringify({ ok: true, written: picks.length, out }, null, 2))
