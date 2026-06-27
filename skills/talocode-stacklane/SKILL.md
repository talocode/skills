# talocode-stacklane

Use Stacklane as a local-first backend, storage, and usage layer from inside agent workflows.

## Purpose

Guide agents to manage Stacklane customers, API keys, usage events, usage summaries, and asset metadata without external platform dependency and without exposing raw secrets.

## When to Use

Use this skill when an agent task involves:
- Creating a Stacklane customer
- Creating a Stacklane API key
- Recording a usage event
- Summarizing usage by product/action/customer/workflow
- Creating asset metadata
- Running Stacklane v0.4.1 validation commands

Do not use this skill for general database work; use it only when Stacklane is the backend layer.

## Required Behavior

- Never store raw API keys. Stacklane hashes keys before storage; the raw key is shown only once at creation.
- Never print or log a raw API key. If a key was just created, show it once to the operator and never echo it again.
- Redact secrets in all logs and reports. Report only whether a key is present, never its value.
- Prefer pseudonymous customer IDs when personal identity is not required for the task.
- Record usage by product, action, customer, and workflow so summaries are queryable.
- Reject path traversal and unsafe filenames. Normalize filenames and refuse `..`, absolute paths, and null bytes.
- Local-first by default. Do not introduce Supabase, Resend, or any external platform dependency.
- Require operator approval before creating, rotating, or revoking a key, and before deleting a customer or asset.

## Workflow

1. Inspect the target project. Confirm Stacklane is present by reading `package.json` or the local `.stacklane/` directory.
2. Identify the operation (customer, key, usage event, summary, asset metadata).
3. Present the plan and wait for approval before any write or key operation.
4. Execute read-only commands first (list customers, summarize usage).
5. For write operations, run the command and capture only non-secret output.
6. Return the final report with redacted secrets.

## Commands

Assume a local-first Stacklane CLI/SDK. Adjust to the target install.

```bash
# Confirm Stacklane is present
stacklane doctor

# Create a customer (prefer pseudonymous ID when identity is not required)
stacklane customers create --id "cust_01HX..." --name "acme"

# Create an API key (raw key shown ONCE; never print it again)
stacklane keys create --customer "cust_01HX..." --env live

# Record a usage event
stacklane usage record \
  --product "launchpix" \
  --action "asset.generate" \
  --customer "cust_01HX..." \
  --workflow "launch-card"

# Summarize usage
stacklane usage summary --product "launchpix" --since "2026-01-01"

# Create asset metadata (reject unsafe filenames)
stacklane assets create --key "banner-2026-06.png" --meta '{"type":"hero"}'

# Run v0.4.1 validation
node scripts/test-stacklane-v041-runtime.mjs
```

SDK usage assumption (TypeScript):

```typescript
await stacklane.usage.record({
  product: 'launchpix',
  action: 'asset.generate',
  customer: 'cust_01HX...',
  workflow: 'launch-card',
});
```

## Constraints

- Never echo `sk_lane_live_...` or `sk_lane_dev_...` raw values after creation.
- Never write a raw key to a file, commit, or asset metadata field.
- Refuse filenames containing `..`, leading `/`, control characters, or null bytes.
- Do not add Supabase, Resend, or any external platform dependency to the task.
- Do not delete a customer or asset without explicit operator approval.

## Final Report Fields

After a Stacklane task, return:
- `stacklane_present`: boolean
- `customer_id`: string or null
- `key_created`: boolean (never the raw key)
- `usage_events_recorded`: number
- `usage_summary`: object or null
- `assets_created`: number
- `secrets_printed`: 0
- `limitations`: list

## Validation Checklist

- [ ] Project inspected before any Stacklane command
- [ ] No raw API key printed or stored
- [ ] Secrets redacted in logs and report
- [ ] Pseudonymous customer ID used when identity not required
- [ ] Usage recorded with product/action/customer/workflow
- [ ] Unsafe filenames rejected
- [ ] No external platform dependency introduced
- [ ] v0.4.1 validation referenced when applicable
- [ ] Final report fields returned

## Notes

- Stacklane v0.4.0+ is local-first. Storage lives under `.stacklane/` as JSON and local files.
- API keys use `sk_lane_dev_...` and `sk_lane_live_...` prefixes and are hashed before storage.
- Future adapters may support object storage, but v0.4.x does not require cloud provisioning.
