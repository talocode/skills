#!/usr/bin/env node

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { auditSkillNoops, repoRoot } from './audit-skill-noops.mjs'

async function withFixture(callback) {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'talocode-noops-'))

  try {
    await fs.mkdir(path.join(tempRoot, 'skills', 'fixture-skill'), { recursive: true })
    await fs.mkdir(path.join(tempRoot, 'docs'), { recursive: true })
    await fs.writeFile(path.join(tempRoot, 'README.md'), '# Fixture\n')
    await callback(tempRoot)
  } finally {
    await fs.rm(tempRoot, { recursive: true, force: true })
  }
}

async function run() {
  await withFixture(async (tempRoot) => {
    const skillPath = path.join(tempRoot, 'skills', 'fixture-skill', 'SKILL.md')
    const disabledPath = path.join(tempRoot, 'skills', 'disabled', 'SKILL.md')
    await fs.mkdir(path.dirname(disabledPath), { recursive: true })

    await fs.writeFile(
      skillPath,
      [
        '# fixture-skill',
        '',
        '- Be thorough',
        '- Be careful with secrets',
        '<!-- talocode-noop-ok -->',
        '- Be precise',
        'Weak:',
        '- Use best practices',
        '',
      ].join('\n'),
    )

    await fs.writeFile(
      disabledPath,
      [
        '<!-- talocode-noop-audit-disable -->',
        '- Be helpful',
      ].join('\n'),
    )

    const result = await auditSkillNoops({ rootDir: tempRoot })

    assert.equal(result.summary.totalFilesScanned, 3)
    assert.equal(result.summary.skippedFiles.length, 1)
    assert.equal(result.summary.highSeverityCount, 1)
    assert.equal(result.summary.mediumSeverityCount, 1)
    assert.equal(result.summary.lowSeverityCount, 1)
    assert.equal(result.summary.totalFindings, 3)
    assert.equal(result.summary.score, 3)

    const high = result.findings.find((finding) => finding.matchedPhrase === 'be thorough')
    assert.ok(high)
    assert.equal(high.severity, 'high')
    assert.equal(high.lineNumber, 3)
    assert.match(high.suggestedReplacement, /Inspect adjacent files/i)

    const medium = result.findings.find((finding) => finding.matchedPhrase === 'be careful')
    assert.ok(medium)
    assert.equal(medium.severity, 'medium')
    assert.match(medium.reason, /vague phrase still weakens it/i)

    const low = result.findings.find((finding) => finding.matchedPhrase === 'use best practices')
    assert.ok(low)
    assert.equal(low.severity, 'low')

    const skipped = result.findings.find((finding) => finding.matchedPhrase === 'be precise')
    assert.equal(skipped, undefined)
  })

  const docsPath = path.join(repoRoot, 'docs', 'SKILL_NOOP_AUDITOR.md')
  const readmePath = path.join(repoRoot, 'README.md')
  const scriptPath = path.join(repoRoot, 'scripts', 'audit-skill-noops.mjs')

  const [docs, readme, script] = await Promise.all([
    fs.readFile(docsPath, 'utf8'),
    fs.readFile(readmePath, 'utf8'),
    fs.readFile(scriptPath, 'utf8'),
  ])

  assert.match(docs, /Talocode skill instruction standard/i)
  assert.match(readme, /audit-skill-noops\.mjs/i)
  assert.doesNotMatch(script, /openai|anthropic|mistral|gemini/i)

  console.log('skill no-op auditor tests passed')
}

run().catch((error) => {
  console.error(error instanceof Error ? error.stack : error)
  process.exit(1)
})
