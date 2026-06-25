# Skill No-Op Auditor

`scripts/audit-skill-noops.mjs` scans Talocode skill markdown for vague instructions that do not reliably change agent behavior.

## Why This Exists

No-op instructions waste tokens and make skills harder to evaluate. Generic quality slogans and caution-only wording sound useful, but they do not tell an agent what to do, what to avoid, or how to prove the work is correct.

Talocode skill instruction standard:

1. A concrete action
2. A forbidden action
3. A required output field
4. A decision rule
5. A validation check
6. A file/path/tool constraint

If a line does not fit one of those shapes, it is a candidate for cleanup.

## What The Auditor Checks

The auditor scans:

- `skills/**/SKILL.md`
- `docs/**/*.md`
- `README.md`

It reports possible no-op lines with:

- file path
- line number
- matched phrase
- severity
- reason
- suggested replacement
- category

## Severity Levels

- `high`: pure vague instruction with no measurable behavior
- `medium`: vague phrase mixed with some useful instruction
- `low`: phrase appears in explanatory text, examples, or quoted guidance

The script reports a simple score:

- `0`: clean
- `1-3`: minor cleanup
- `4-10`: needs review
- `10+`: bloated skill, cleanup recommended

## CLI Usage

```bash
node scripts/audit-skill-noops.mjs
node scripts/audit-skill-noops.mjs --json
node scripts/audit-skill-noops.mjs --fail-on-high
```

Default output is a human-readable summary plus findings. `--json` prints an array of finding objects. `--fail-on-high` exits non-zero when any high-severity finding exists.

## CI

GitHub Actions runs the auditor on pull requests, on pushes to `main`, and on pushes to `feat/**` branches.

- `node scripts/test-skill-noop-auditor.mjs` verifies the local auditor behavior.
- `node scripts/audit-skill-noops.mjs --fail-on-high` fails CI when any high-severity finding is present.
- Use `<!-- talocode-noop-ok -->` only when the vague phrase is intentionally present in explanatory or example text.
- Use `<!-- talocode-noop-audit-disable -->` rarely, because it disables the full file from the audit.

## Allowlist Comments

Use inline allowlists when a phrase is intentionally present in explanatory text:

```md
<!-- talocode-noop-ok -->
- Be precise
```

If the same line or the previous line contains `<!-- talocode-noop-ok -->`, the auditor skips that finding.

Use file-level disable when a markdown file should be excluded from the audit:

```md
<!-- talocode-noop-audit-disable -->
```

Disabled files are skipped and counted in the audit summary.

## Rewrite Guidance

Weak:

```md
<!-- talocode-noop-ok -->
- Be careful with secrets.
```

Sharper:

```md
- Never print .env values. When checking config, report only whether required variables are present or missing.
```

Weak:

```md
<!-- talocode-noop-ok -->
- Use best practices.
```

Sharper:

```md
- Follow existing repo conventions. Inspect adjacent files before adding new patterns.
```

Weak:

```md
- Write a good final report.
```

Sharper:

```md
- Final report must include: branch, files changed, tests run, validation result, commit hash, push status, and limitations.
```

## Limitations

- The auditor uses phrase matching and lightweight heuristics, not semantic parsing.
- Findings are intentionally labeled as possible no-ops, not guaranteed errors.
- Some explanatory docs may still need manual review even when severity is low.
