# Clueso video skills (vendored)

Source: https://github.com/clueso-ai/skills (Apache-2.0)

## Installed folders

| Skill folder | Purpose |
|--------------|---------|
| `clueso-brief-to-launch-video` | Product brief → 30–60s launch motion video |
| `clueso-kinetic-text-video` | Kinetic typography announcement |
| `clueso-animated-explainer-video` | Problem → solution explainer |
| `clueso-feature-release-video` | Release notes + demo → announcement |
| `clueso-demo-cutdown` | Full demo → short social teaser |
| `clueso-add-cta-end-card` | Append branded CTA end card |

## Hard dependency

**Every Clueso skill requires the [Clueso MCP](https://clueso.io)** (`https://connect.clueso.io/mcp`).

Without that MCP, skills are **instruction packs only** (script arcs, composition rules). They cannot export Clueso-hosted videos.

### Connect Clueso MCP

- Claude Code: `claude mcp add --transport http Clueso https://connect.clueso.io/mcp`
- Claude.ai / Desktop: Connectors → Add custom connector → that URL
- Docs: https://help.clueso.io/mcp-setup

## SearchLane launch (2026-07)

Used `brief-to-launch-video` script arc (Hook → Reveal → Points → Proof → CTA) to produce a local kinetic launch video when Clueso MCP was not available:

- Script + generator: `searchlane/scripts/generate-launch-video.py`
- Output: `searchlane/release-assets/searchlane-launch-video.mp4` (~30s)

When Clueso is connected, re-run the skill against the same brief for full VO + Clueso export quality.

## Install upstream (any agent)

```bash
npx skills add clueso-ai/skills
# or single skill:
npx skills add clueso-ai/skills --skill brief-to-launch-video
```
