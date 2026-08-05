---
name: talocode-market-radar
description: Watch competitors across public sources, build a verified baseline, and turn every change into a graded Act/Investigate/Watch/Ignore decision with evidence links. Use when asked to track competitors, research what changed for a product, build a competitive intelligence report, or decide whether a market move needs a response.
---

# talocode-market-radar

Watch competitors across public sources, build a verified baseline, and turn every change into a graded decision with evidence.

## Purpose

Turn scattered public signals (pricing pages, changelogs, announcements, community threads, package releases) into a repeatable surveillance loop: capture a verified baseline, compare future snapshots, and emit an evidence-linked decision for each change — Act, Investigate, Watch, or Ignore.

## When to Use

Use this skill when:

- Tracking competitors before a launch, pricing change, or positioning update
- Answering "what changed for this product and why it matters"
- Reviewing your own positioning against shifting market signals
- Producing a regular competitor intelligence report for yourself or your team
- Deciding whether a market move needs a response

## Core Loop

The leading word is **baseline**: a dated, verified snapshot of public facts. Everything else is a **delta** — what changed since the last baseline, scored by confidence and impact.

```text
baseline -> delta -> grade -> decide
```

A baseline is only facts with a source and a capture date. A delta is only a difference with evidence. A grade is a decision, not a summary.

## Workflow

### 1. Baseline

Capture the current state from public sources before making any judgment. Store each capture with a source URL and date.

```text
Target sources (pick the relevant set):
- product and pricing pages
- changelogs and release notes
- announcements and launch posts
- repository activity and package releases
- community threads, reviews, and public discussions
- news and public archives
```

For each source, record:

```text
Source URL:
Captured date:
Claim:
Evidence (quote, version number, price, date):
```

Completion criterion: every claim in the baseline has a source and a capture date. Nothing is remembered; everything is cited.

### 2. Delta

Compare the new snapshot against the last baseline. List only actual differences.

```text
What changed:
Where it appeared (source):
When (date):
```

Do not blend old and new facts. A delta must be attributable to a specific change event.

Completion criterion: each delta is a difference visible in both snapshots, not an interpretation.

### 3. Grade

Score each delta on confidence and impact, then assign one decision.

```text
Confidence (high/medium/low):
Impact (high/medium/low):
Evidence strength:
Decision:
- ACT      -> change pricing, positioning, or response now
- INVESTIGATE -> dig deeper before deciding
- WATCH    -> track the next snapshot
- IGNORE   -> no action
```

Completion criterion: every delta has a confidence, an impact, and exactly one decision. If evidence is thin, grade it Investigate or Watch, never Act.

### 4. Decide and Report

Produce an interactive HTML report with evidence links, or a markdown summary for a thread or post.

```text
Header: target, baseline date, snapshot date
Section: decisions (Act / Investigate / Watch / Ignore)
Section: each change with evidence links and dates
Section: recommended next action per decision
```

Completion criterion: each claim in the report links to its source and includes a capture date, so a reader can verify independently.

## Constraints

- Use only public sources. No private accounts, paywalled scrapes, or non-public data.
- Cite every claim. No claim without a source leaves the workflow.
- Keep the baseline honest: capture a dated snapshot before judging a change.
- Never present speculation as fact; score it low-confidence and route it to Investigate or Watch.
- Keep reports privacy-first and public-source only.
- Stay Talocode-first: use this skill for your own competitive read and internal decisions. Do not reference external tool names in reports — cite sources, not vendors.

## Validation Checklist

- [ ] The baseline has a capture date and a source for every claim.
- [ ] Deltas are differences, not interpretations.
- [ ] Every delta has confidence, impact, and one decision.
- [ ] Every claim in the report links to its source.
- [ ] No speculation is graded as Act.
- [ ] The next baseline snapshot date is scheduled.
