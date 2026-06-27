# talocode-worklane

Use WorkLane as an approval-first agent automation control plane from inside agent workflows.

## Purpose

Guide agents to drive WorkLane's tool gateway, loops/routines, automation approvals, execution queue, and audit history without bypassing human approval gates.

## When to Use

Use this skill when an agent task involves:
- Creating or reviewing a WorkLane routine/loop
- Listing pending automation approvals
- Queuing approved tool calls
- Reviewing execution history or audit trail
- Summarizing automation runs

Do not use this skill for general coding edits; use it only when WorkLane is the automation layer.

## Required Behavior

- Inspect the current repo or project before issuing WorkLane commands. Read `package.json`, `README.md`, and any `worklane` config to confirm WorkLane is present.
- Create a plan (affected files, intended routine, approval gates) before execution and present it to the operator.
- Require explicit operator approval before any write, destructive, or external action. Never bypass an approval gate.
- Never print secrets, API keys, or `.env` values. Report only whether required variables are present or missing.
- Use JSON-only request and response bodies when calling WorkLane endpoints. Do not send form-encoded payloads.
- Do not claim cloud routines exist unless the target WorkLane install implements them. Default to local-first JSON storage.
- Do not claim autonomous destructive execution. Destructive actions always pause for approval.

## Workflow

1. Inspect the project: run `worklane status` or read the local `.worklane/` directory to confirm WorkLane is initialized.
2. Identify the goal and list the exact routine, tools, and approval gates involved.
3. Present the plan to the operator and wait for approval before mutating state.
4. Execute read-only commands first (list routines, list approvals, review history).
5. For write/external actions, create the routine or queue entry, then surface the pending approval to the operator.
6. After execution, read the audit log and summarize the run.

## Commands

Assume a local-first WorkLane CLI. Adjust paths to the target install.

```bash
# Confirm WorkLane is present
worklane status

# Create a routine (pauses for approval before any destructive step)
worklane routines create --name "daily-summary" --steps ./routine.json

# List pending automation approvals
worklane approvals list --status pending

# Queue an approved tool call (JSON body)
worklane queue add --tool "github" --input '{"action":"create_issue","title":"..."}'

# Review execution history
worklane history list --limit 20

# Summarize a run from the audit log
worklane runs show <run-id>
```

JSON API assumption when calling WorkLane HTTP endpoints directly:

```bash
curl -X POST http://localhost:3001/api/routines \
  -H "Content-Type: application/json" \
  -d '{"name":"daily-summary","steps":[]}'
```

## Constraints

- Never auto-approve a destructive or external action on behalf of the operator.
- Never log or echo `WORKLANE_API_KEY` or any connection secret.
- Treat simulated/placeholder execution as labeled; do not report it as a real tool call.
- If WorkLane is not installed, report that and stop. Do not fabricate routine output.

## Final Report Fields

After a WorkLane task, return:
- `worklane_present`: boolean
- `routine_id`: string or null
- `approvals_pending`: number
- `actions_queued`: number
- `audit_entries_reviewed`: number
- `approval_required`: boolean (true if any write/destructive/external action was proposed)
- `limitations`: list

## Validation Checklist

- [ ] Project inspected before any WorkLane command
- [ ] Plan presented before execution
- [ ] No write/destructive/external action ran without approval
- [ ] No secret printed or logged
- [ ] JSON-only bodies used for HTTP calls
- [ ] Final report fields returned
- [ ] No claim of cloud routines unless implemented in the target install

## Notes

- WorkLane v0.1 stores data as local JSON under `.worklane/`.
- Approval-first is the default; there is no autonomous destructive mode.
- If a tool is not connected, WorkLane labels execution as simulated. Report that label honestly.
