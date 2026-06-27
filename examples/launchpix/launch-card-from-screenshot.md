# LaunchPix Example: Launch Card from Screenshot

## Sample Agent Task

"Generate a launch card from a screenshot, record the asset metadata through Stacklane if enabled, and verify backend config without printing secrets. Do not publish."

## Expected Safe Workflow

1. Inspect the LaunchPix install: read `package.json`, `.env.example`, and `docker-compose.yml` to determine backend mode.
2. Verify backend config without printing secrets (present/missing only):
   ```bash
   launchpix doctor
   ```
3. Present a plan:
   - Screenshot: `screenshot.png` (PNG, under 5MB)
   - Asset type: `launch-card`
   - Backend: Stacklane if configured, else local/Supabase
   - Publish: false
4. Wait for operator approval before upload and generation.
5. Upload the screenshot:
   ```bash
   curl -X POST http://localhost:3000/api/v1/screenshots/upload \
     -H "x-launchpix-api-key: $LAUNCHPIX_API_KEY" \
     -F "file=@screenshot.png"
   ```
6. Generate the launch card:
   ```bash
   curl -X POST http://localhost:3000/api/v1/assets/generate \
     -H "x-launchpix-api-key: $LAUNCHPIX_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"screenshotId":"<id>","type":"launch-card"}'
   ```
7. If Stacklane is enabled, record usage and asset metadata:
   ```bash
   stacklane assets create --key "launch-card-2026-06.png" --meta '{"type":"launch-card","source":"launchpix"}'
   stacklane usage record --product "launchpix" --action "asset.generate" --customer "cust_01HXEXAMPLE" --workflow "launch-card"
   ```
8. Return the asset path. Do not publish.

## Final Report Template

```json
{
  "launchpix_present": true,
  "backend_mode": "stacklane",
  "screenshot_uploaded": true,
  "asset_generated": true,
  "asset_path_or_url": "/output/launch-card-2026-06.png",
  "asset_type": "launch-card",
  "usage_recorded": true,
  "published": false,
  "secrets_printed": 0,
  "limitations": ["asset not published; publishing requires separate operator approval"]
}
```

## Validation Checklist

- [ ] LaunchPix install inspected before any command
- [ ] Backend config verified without printing secrets
- [ ] Approval obtained before upload/generation
- [ ] Asset reported only after successful generation
- [ ] No auto-publish
- [ ] No secret stored in asset metadata
- [ ] Usage recorded if Stacklane enabled
- [ ] Existing Supabase support preserved if present
- [ ] Final report fields returned
