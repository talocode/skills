#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export const repoRoot = path.resolve(__dirname, '..')

const INLINE_ALLOW = '<!-- talocode-noop-ok -->'
const FILE_DISABLE = '<!-- talocode-noop-audit-disable -->'

const PHRASES = [
  {
    phrase: 'be thorough',
    category: 'generic_quality',
    reason: 'This asks for quality without defining what to inspect or report.',
    suggestion: 'Inspect adjacent files before editing and list the files you checked in the final report.',
  },
  {
    phrase: 'be careful',
    category: 'generic_caution',
    reason: 'This warns about risk but does not define a safety rule.',
    suggestion: 'Never print .env values. When checking config, report only whether required variables are present or missing.',
  },
  {
    phrase: 'think carefully',
    category: 'generic_thinking',
    reason: 'This asks for internal reasoning instead of an observable workflow.',
    suggestion: 'Before editing, list the affected files and the exact behavior you intend to change.',
  },
  {
    phrase: 'think step by step',
    category: 'generic_thinking',
    reason: 'This is vague unless the required steps are named explicitly.',
    suggestion: 'Follow this order: inspect repo, identify affected files, implement the change, run validation, then report results.',
  },
  {
    phrase: 'use best practices',
    category: 'generic_quality',
    reason: 'This points at a standard without naming the repo-specific rule to follow.',
    suggestion: 'Follow existing repo conventions. Inspect adjacent files before adding new patterns or abstractions.',
  },
  {
    phrase: 'write clean code',
    category: 'generic_quality',
    reason: 'This states an outcome without defining what makes the change acceptable.',
    suggestion: 'Prefer the smallest correct change and reuse existing naming patterns from nearby files.',
  },
  {
    phrase: 'make it readable',
    category: 'generic_quality',
    reason: 'This requests readability without a concrete editing rule.',
    suggestion: 'Use clear function and variable names, and add a short comment only where the logic is not self-explanatory.',
  },
  {
    phrase: 'make it easy to read',
    category: 'generic_quality',
    reason: 'This asks for readability without testable criteria.',
    suggestion: 'Keep each decision branch in a named function or a clearly separated block.',
  },
  {
    phrase: 'make it professional',
    category: 'generic_quality',
    reason: 'This is subjective and not tied to a measurable output.',
    suggestion: 'Match the repo\'s existing formatting, terminology, and file structure.',
  },
  {
    phrase: 'make it robust',
    category: 'generic_quality',
    reason: 'This does not specify which failure cases must be handled.',
    suggestion: 'Validate inputs, return sanitized errors, and add a test for the expected failure path.',
  },
  {
    phrase: 'high quality',
    category: 'generic_quality',
    reason: 'This is evaluative language without concrete acceptance checks.',
    suggestion: 'Require specific validation output such as tests run, build result, and any remaining limitations.',
  },
  {
    phrase: 'detailed commit message',
    category: 'commit_message',
    reason: 'This leaves the commit format and required content unspecified.',
    suggestion: 'Commit message format: <type>: <specific change>. Example: feat: add skill no-op auditor.',
  },
  {
    phrase: 'good commit message',
    category: 'commit_message',
    reason: 'This does not define what information the message must include.',
    suggestion: 'Use a commit title that states the change and avoid generic words like update or fix stuff.',
  },
  {
    phrase: 'make it detailed',
    category: 'generic_quality',
    reason: 'This requests more detail without defining the required fields.',
    suggestion: 'Require explicit output fields such as files changed, tests run, validation result, and limitations.',
  },
  {
    phrase: 'ensure quality',
    category: 'generic_quality',
    reason: 'This asks for a quality outcome without naming the checks.',
    suggestion: 'Run the relevant tests and fail the task if any required validation step does not pass.',
  },
  {
    phrase: 'do a good job',
    category: 'generic_quality',
    reason: 'This is motivational wording, not an actionable rule.',
    suggestion: 'Return the changed files, commands run, outcomes, and any unresolved issues.',
  },
  {
    phrase: 'be precise',
    category: 'generic_quality',
    reason: 'This asks for precision without telling the agent what to include or avoid.',
    suggestion: 'Use exact file paths, command names, and validation results in the report.',
  },
  {
    phrase: 'be concise',
    category: 'generic_quality',
    reason: 'This affects style but does not define a required output shape.',
    suggestion: 'Limit the final summary to the changed files, validation result, and next step.',
  },
  {
    phrase: 'be helpful',
    category: 'generic_quality',
    reason: 'This is a tone instruction rather than an operational rule.',
    suggestion: 'If blocked, explain the blocker, what you tried, and the smallest next action the user can take.',
  },
]

const EXPLANATORY_MARKERS = [
  'example',
  'examples',
  'weak:',
  'suggested:',
  'no-op examples',
  'possible no-op',
  'talocode standard',
]

function isMarkdownFile(filePath) {
  return filePath.endsWith('.md')
}

async function listMarkdownFiles(rootDir) {
  const queue = ['README.md', 'docs', 'skills']
  const files = []

  while (queue.length > 0) {
    const relative = queue.shift()
    const absolute = path.join(rootDir, relative)
    let stats

    try {
      stats = await fs.stat(absolute)
    } catch {
      continue
    }

    if (stats.isDirectory()) {
      const entries = await fs.readdir(absolute, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.name === '.git' || entry.name === 'node_modules') {
          continue
        }

        queue.push(path.join(relative, entry.name))
      }
      continue
    }

    if (stats.isFile() && isMarkdownFile(relative)) {
      files.push(relative)
    }
  }

  return files.sort((a, b) => a.localeCompare(b))
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function findPhrase(line) {
  const normalized = line.toLowerCase()
  for (const candidate of PHRASES) {
    const pattern = new RegExp(`\\b${escapeRegExp(candidate.phrase)}\\b`, 'i')
    if (pattern.test(normalized)) {
      return candidate
    }
  }

  return null
}

function isActionableLine(line) {
  return /(must|never|always|only|do not|required|return|include|run|verify|report|use\s+`|follow|create|update|list|check)\b/i.test(line)
}

function inferSeverity(line, previousLine, inCodeBlock, matchedPhrase) {
  const normalized = line.trim().toLowerCase()
  const previous = previousLine.trim().toLowerCase()

  if (inCodeBlock || EXPLANATORY_MARKERS.some((marker) => normalized.includes(marker) || previous.includes(marker))) {
    return 'low'
  }

  const looksLikeInstruction = /^(-|\*|\d+\.|\d+\)|>)/.test(normalized) || /^(always|never|do not|be|make|use|write|think|ensure)\b/.test(normalized)
  const withoutPhrase = normalized
    .replace(/^(-|\*|\d+\.|\d+\)|>)\s*/, '')
    .replace(new RegExp(`\\b${escapeRegExp(matchedPhrase)}\\b`, 'i'), '')
    .trim()

  if (looksLikeInstruction && !isActionableLine(normalized) && withoutPhrase.split(/\s+/).filter(Boolean).length <= 1) {
    return 'high'
  }

  return 'medium'
}

function fileHasDisableComment(content) {
  const lines = content.split(/\r?\n/)
  let inCodeBlock = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }

    if (!inCodeBlock && trimmed === FILE_DISABLE) {
      return true
    }
  }

  return false
}

function buildReason(baseReason, severity) {
  if (severity === 'high') {
    return `${baseReason} The line reads like an instruction but still lacks a measurable action.`
  }

  if (severity === 'medium') {
    return `${baseReason} The line has some useful context, but the vague phrase still weakens it.`
  }

  return `${baseReason} The phrase appears in explanatory or example context, so it is lower priority.`
}

export async function auditSkillNoops(options = {}) {
  const rootDir = options.rootDir ? path.resolve(options.rootDir) : repoRoot
  const files = await listMarkdownFiles(rootDir)
  const findings = []
  const skippedFiles = []
  const repeated = new Map()

  for (const relativePath of files) {
    const absolutePath = path.join(rootDir, relativePath)
    const content = await fs.readFile(absolutePath, 'utf8')

    if (fileHasDisableComment(content)) {
      skippedFiles.push(relativePath)
      continue
    }

    const lines = content.split(/\r?\n/)
    let inCodeBlock = false

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index]
      const previousLine = index > 0 ? lines[index - 1] : ''

      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock
      }

      if (!line.trim()) {
        continue
      }

      if (line.includes(INLINE_ALLOW) || previousLine.includes(INLINE_ALLOW)) {
        continue
      }

      const match = findPhrase(line)
      if (!match) {
        continue
      }

      const severity = inferSeverity(line, previousLine, inCodeBlock, match.phrase)
      repeated.set(match.phrase, (repeated.get(match.phrase) || 0) + 1)

      findings.push({
        filePath: relativePath,
        lineNumber: index + 1,
        matchedPhrase: match.phrase,
        severity,
        lineText: line.trim(),
        reason: buildReason(match.reason, severity),
        suggestedReplacement: match.suggestion,
        category: match.category,
      })
    }
  }

  const summary = {
    totalFilesScanned: files.length,
    skippedFiles,
    totalFindings: findings.length,
    highSeverityCount: findings.filter((finding) => finding.severity === 'high').length,
    mediumSeverityCount: findings.filter((finding) => finding.severity === 'medium').length,
    lowSeverityCount: findings.filter((finding) => finding.severity === 'low').length,
    topRepeatedPhrases: [...repeated.entries()]
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, 5)
      .map(([phrase, count]) => ({ phrase, count })),
  }

  const score = findings.length
  let rating = 'clean'
  if (score >= 10) {
    rating = 'bloated skill, cleanup recommended'
  } else if (score >= 4) {
    rating = 'needs review'
  } else if (score >= 1) {
    rating = 'minor cleanup'
  }

  return {
    findings,
    summary: {
      ...summary,
      score,
      rating,
    },
  }
}

function formatSummary(summary) {
  const lines = []
  lines.push('Talocode Skill No-Op Audit')
  lines.push(`Files scanned: ${summary.totalFilesScanned}`)
  lines.push(`Files skipped: ${summary.skippedFiles.length}`)
  lines.push(`Findings: ${summary.totalFindings}`)
  lines.push(`High severity: ${summary.highSeverityCount}`)
  lines.push(`Medium severity: ${summary.mediumSeverityCount}`)
  lines.push(`Low severity: ${summary.lowSeverityCount}`)
  lines.push(`Skill No-Op Score: ${summary.score} (${summary.rating})`)

  if (summary.topRepeatedPhrases.length > 0) {
    lines.push('Top repeated phrases:')
    for (const item of summary.topRepeatedPhrases) {
      lines.push(`- ${item.phrase}: ${item.count}`)
    }
  }

  if (summary.skippedFiles.length > 0) {
    lines.push('Skipped files:')
    for (const filePath of summary.skippedFiles) {
      lines.push(`- ${filePath}`)
    }
  }

  return lines.join('\n')
}

function formatFindings(findings) {
  if (findings.length === 0) {
    return 'No possible no-op instructions found.'
  }

  return findings
    .map((finding) => {
      return [
        `[${finding.severity.toUpperCase()}] ${finding.filePath}:${finding.lineNumber}`,
        `Phrase: ${finding.matchedPhrase}`,
        `Line: ${finding.lineText}`,
        `Reason: ${finding.reason}`,
        `Suggested replacement: ${finding.suggestedReplacement}`,
      ].join('\n')
    })
    .join('\n\n')
}

async function main() {
  const args = new Set(process.argv.slice(2))
  const jsonMode = args.has('--json')
  const failOnHigh = args.has('--fail-on-high')

  const result = await auditSkillNoops()

  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(result.findings, null, 2)}\n`)
  } else {
    process.stdout.write(`${formatSummary(result.summary)}\n\n${formatFindings(result.findings)}\n`)
  }

  if (failOnHigh && result.summary.highSeverityCount > 0) {
    process.exitCode = 1
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main().catch((error) => {
    process.stderr.write(`audit failed: ${error instanceof Error ? error.message : String(error)}\n`)
    process.exitCode = 1
  })
}
