# Talocode Agent Distribution Pack v0.1

Marketplace-ready agent skills that make Talocode tools usable from Codex, Claude Code, OpenCode, Cursor, and other `SKILL.md`-compatible agent workflows.

## Skills Included

| Skill | Purpose |
|-------|---------|
| `talocode-worklane` | WorkLane as an approval-first agent automation control plane |
| `talocode-stacklane` | Stacklane as a local-first backend, storage, and usage layer |
| `talocode-launchpix` | LaunchPix launch graphics and social assets from screenshots |

Each skill lives at `skills/<name>/SKILL.md`.

## Design Principles

- **Local-first by default.** No skill requires a cloud account or hosted Talocode API. Skills default to local JSON storage and self-hosted installs.
- **Approval-first.** Every skill requires explicit operator approval before write, destructive, or external actions. No skill auto-approves or auto-executes destructive work.
- **No secrets printed or stored.** Skills report config as present/missing only and never echo raw API keys.
- **No vague no-op instructions.** Skills use concrete, testable rules and pass the Talocode No-Op Auditor.
- **No overclaiming.** Skills do not claim cloud routines, autonomous destructive execution, or official marketplace listing.

## How to Use in Codex-Style Skill Systems

Codex-style systems load `SKILL.md` files as specialized knowledge modules.

1. Install a skill into your agent's skill directory:
   ```bash
   npx skills add talocode/skills/talocode-worklane
   npx skills add talocode/skills/talocode-stacklane
   npx skills add talocode/skills/talocode-launchpix
   ```
2. Reference the skill by name when the task matches its purpose (for example, `/talocode-worklane`).
3. The agent reads the `SKILL.md`, follows its workflow, and returns the documented final report fields.

## How to Use in Claude Code / OpenCode / Cursor-Style Workflows

These workflows treat `SKILL.md` files as project-local instructions.

1. Copy the relevant `skills/<name>/SKILL.md` into your project's agent instructions directory (for example, `.claude/skills/` or `.cursor/skills/`).
2. Point the agent at the file when the task matches the skill's "When to Use" section.
3. The agent follows the required behavior, workflow, and validation checklist inline.

No cloud account is required. The skills assume a local or self-hosted install of the target tool.

## Required Tools

Each skill assumes its target tool is installed and initialized locally:

- `talocode-worklane` requires a local or self-hosted WorkLane install (`worklane status`).
- `talocode-stacklane` requires a local Stacklane install (`stacklane doctor`).
- `talocode-launchpix` requires a self-hosted LaunchPix API (`launchpix doctor` or `docker compose up -d`).

If a tool is not present, the skill reports that and stops. It does not fabricate output.

## How Stacklane Supports Usage and Metadata

`talocode-stacklane` is the shared backend layer for the pack:

- Records usage events by product, action, customer, and workflow.
- Stores asset metadata with safe (normalized) filenames.
- Hashes API keys before storage; raw keys shown only once at creation.
- `talocode-launchpix` records usage and asset metadata through Stacklane when Stacklane is the configured backend, and preserves existing Supabase support when Supabase is configured instead.

## Validation

Run the pack tests and the no-op auditor:

```bash
node scripts/test-agent-distribution-pack.mjs
node scripts/audit-skill-noops.mjs --fail-on-high
node scripts/test-skill-noop-auditor.mjs
```

The pack test verifies that all skills, marketplace metadata, docs, and examples exist, parse, and contain no banned phrases (no-op phrases, cloud-dependency claims, auto-destructive execution claims, secret-printing claims, or unsupported official-listing claims).

## CI Validation

Both checks run in GitHub Actions on every pull request and every push to `main` or `feat/**` (see `.github/workflows/skill-noop-auditor.yml`):

- `node scripts/test-skill-noop-auditor.mjs` — auditor self-tests
- `node scripts/audit-skill-noops.mjs --fail-on-high` — fails CI on high-severity no-op instructions
- `node scripts/test-agent-distribution-pack.mjs` — validates the agent distribution pack

New skills, marketplace metadata, and examples must pass both the no-op audit and the distribution pack test before merge. The scripts are dependency-free (Node built-ins only), so CI does not run `npm install`.

## Marketplace Metadata

Each skill ships with marketplace metadata at `marketplace/<name>.json`:

- `name`, `slug`, `description`, `category`, `tags`
- `repo` URL
- `local_first: true`
- `approval_first: true`
- `requires_cloud_account: false`
- `supported_agent_environments`: Codex, Claude Code, OpenCode, Cursor, SKILL.md-compatible agents

This metadata does not claim official marketplace approval or listing. It describes the skill so it can be submitted to compatible registries later.

## Future MCP Packaging Plan

v0.1 ships `SKILL.md`-compatible skills only. A future v0.2 will wrap each skill's commands as MCP tools so MCP-compatible agents can call them directly:

- `worklane.routines.create`, `worklane.approvals.list`, `worklane.history.list`
- `stacklane.customers.create`, `stacklane.keys.create`, `stacklane.usage.record`, `stacklane.usage.summary`, `stacklane.assets.create`
- `launchpix.screenshots.upload`, `launchpix.assets.generate`

The MCP layer will preserve the same approval-first and local-first guarantees. No v0.1 file claims MCP support that does not yet exist.

## Limitations

- v0.1 is `SKILL.md`-compatible only; MCP packaging is planned for v0.2.
- Skills assume a local or self-hosted install of each target tool. They do not provision installs.
- No skill claims official marketplace listing. Listing status depends on future submission to compatible registries.
