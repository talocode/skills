# talocode-launchpix

Use LaunchPix to create launch graphics and social assets from screenshots and product context, with optional Stacklane backend awareness.

## Purpose

Guide agents to upload screenshots, generate launch cards and social banners, record asset metadata, and verify backend config without auto-publishing or storing secrets.

## When to Use

Use this skill when an agent task involves:
- Generating a launch card from a screenshot
- Creating a social banner concept (e.g., X/Twitter banner)
- Recording asset metadata through Stacklane
- Verifying LaunchPix backend config without printing secrets
- Self-hosting or running LaunchPix locally

Do not use this skill for AI image generation; LaunchPix uses deterministic rendering, not generative image models.

## Required Behavior

- Do not claim a final image exists unless it was actually generated. Report the asset path or URL only after generation succeeds.
- Do not auto-publish generated assets to any external channel. Publishing always requires operator approval.
- Do not store secrets in asset metadata. Metadata fields must contain only non-secret asset descriptors.
- If a Stacklane backend is enabled, record usage by product/action/customer/workflow.
- Preserve existing Supabase support if present in the target install. Do not remove it.
- Prefer the Stacklane or local backend when configured; fall back to Supabase only when it is the configured backend.
- Require operator approval before uploading, generating, or publishing.
- Never print `LAUNCHPIX_API_KEY`, the pepper, or any backend secret. Report only whether config is present.

## Workflow

1. Inspect the target LaunchPix install. Read `package.json`, `.env.example`, and `docker-compose.yml` to confirm the backend mode (local, Stacklane, or Supabase).
2. Verify backend config without printing secrets: check that required variables are present, report present/missing only.
3. Present the plan (screenshot source, asset type, target backend) and wait for approval.
4. Upload the screenshot (PNG/JPEG/WEBP, 5MB max).
5. Generate the asset and capture the returned asset path or URL.
6. If Stacklane is enabled, record the usage event and asset metadata.
7. Return the final asset and report fields. Do not publish.

## Commands

Assume a self-hosted LaunchPix API. Adjust the host to the target install.

```bash
# Verify backend config without printing secrets (present/missing only)
launchpix doctor

# Upload a screenshot
curl -X POST http://localhost:3000/api/v1/screenshots/upload \
  -H "x-launchpix-api-key: $LAUNCHPIX_API_KEY" \
  -F "file=@screenshot.png"

# Generate a launch card
curl -X POST http://localhost:3000/api/v1/assets/generate \
  -H "x-launchpix-api-key: $LAUNCHPIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"screenshotId":"...","type":"launch-card"}'

# Create an X/Twitter banner concept
curl -X POST http://localhost:3000/api/v1/assets/generate \
  -H "x-launchpix-api-key: $LAUNCHPIX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"screenshotId":"...","type":"social-banner","platform":"x"}'
```

Recording asset metadata through Stacklane when enabled:

```bash
stacklane assets create --key "launch-card-2026-06.png" --meta '{"type":"launch-card","source":"launchpix"}'
stacklane usage record --product "launchpix" --action "asset.generate" --customer "cust_01HX..." --workflow "launch-card"
```

## Constraints

- Never report an asset as generated if generation failed or was not run.
- Never auto-publish to social platforms or external stores.
- Never store `LAUNCHPIX_API_KEY`, the pepper, or any backend secret in asset metadata.
- Never print backend secrets; report config as present/missing only.
- Do not remove existing Supabase support if it is the configured backend.
- Do not introduce AI image generation; LaunchPix is deterministic.

## Final Report Fields

After a LaunchPix task, return:
- `launchpix_present`: boolean
- `backend_mode`: "local" | "stacklane" | "supabase" | "unknown"
- `screenshot_uploaded`: boolean
- `asset_generated`: boolean
- `asset_path_or_url`: string or null
- `asset_type`: string or null
- `usage_recorded`: boolean (true only if Stacklane was enabled and recording ran)
- `published`: false
- `secrets_printed`: 0
- `limitations`: list

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

## Notes

- LaunchPix renders deterministically; it does not use AI image generation.
- Self-host with Docker: `docker compose up -d`.
- API auth requires `x-launchpix-api-key` and `Authorization: Bearer <key>`.
- When Stacklane is configured, prefer it for usage and asset metadata; otherwise use the local or Supabase backend already configured.
