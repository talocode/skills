# Stacklane Example: API Key and Usage Recording

## Sample Agent Task

"Create a Stacklane customer, create a live API key for it, record a usage event for launchpix asset generation, and summarize usage. Do not print the raw key after creation."

## Expected Safe Workflow

1. Inspect the project: run `stacklane doctor` or read `.stacklane/` to confirm Stacklane is present.
2. Present a plan:
   - Customer ID: pseudonymous `cust_01HX...` (identity not required)
   - Key env: `live`
   - Usage event: product `launchpix`, action `asset.generate`, workflow `launch-card`
3. Wait for operator approval before the key operation.
4. Create the customer:
   ```bash
   stacklane customers create --id "cust_01HXEXAMPLE" --name "acme"
   ```
5. Create the API key. Show the raw key ONCE, then never echo it again:
   ```bash
   stacklane keys create --customer "cust_01HXEXAMPLE" --env live
   ```
6. Record the usage event:
   ```bash
   stacklane usage record \
     --product "launchpix" \
     --action "asset.generate" \
     --customer "cust_01HXEXAMPLE" \
     --workflow "launch-card"
   ```
7. Summarize usage (read-only):
   ```bash
   stacklane usage summary --product "launchpix" --since "2026-01-01"
   ```
8. Return the report with the raw key redacted.

## Final Report Template

```json
{
  "stacklane_present": true,
  "customer_id": "cust_01HXEXAMPLE",
  "key_created": true,
  "usage_events_recorded": 1,
  "usage_summary": { "product": "launchpix", "events": 1 },
  "assets_created": 0,
  "secrets_printed": 0,
  "limitations": ["raw API key shown once at creation and not stored in report"]
}
```

## Validation Checklist

- [ ] Project inspected before any Stacklane command
- [ ] No raw API key printed or stored after creation
- [ ] Secrets redacted in logs and report
- [ ] Pseudonymous customer ID used
- [ ] Usage recorded with product/action/customer/workflow
- [ ] No external platform dependency introduced
- [ ] Final report fields returned
