# Talocode Skills

Reusable instructions for AI coding agents that help them build open-source, local-first tools the Talocode way.

## Demo

Watch the demo video in the GitHub release assets: [Talocode Skills Demo](https://github.com/talocode/skills/releases/tag/skills-v0.1.0)

## Talocode Skills API

Talocode Skills are also available as a **hosted API** at `https://api.talocode.site/v1/skills/*`. Generate installable AI skill packs from GitHub profiles, repos, docs, and text — no `npx skills` required.

```bash
curl -X POST "$TALOCODE_BASE_URL/v1/skills/generate/github-repo" \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"repoUrl": "https://github.com/talocode/codra", "target": "cursor"}'
```

See the [Skills API docs](https://github.com/talocode/talocode/blob/main/docs/skills.md) for full usage, pricing, and SDK/MCP integration.

## What are Talocode Skills?

Skills are markdown files that give AI coding agents (Codex, Claude Code, Cursor, Hermes) specialized knowledge about how Talocode builds products. They encode repeatable patterns so agents can follow proven workflows.

## Skills

| Skill | Purpose |
|-------|---------|
| `talocode-release` | Full release discipline for npm packages |
| `talocode-local-first-cli` | Building local-first open-source CLIs |
| `talocode-video` | Create videos with Remotion, HyperFrames-style HTML, ffmpeg, and ClipLoop |
| `talocode-open-source-positioning` | Messaging and positioning for open-source tools |
| `talocode-github-sponsors` | Adding GitHub Sponsors support to repos |
| `talocode-production-deploy` | Production deployment and build verification |
| `talocode-partnership-branding` | Premium partnership/collaboration image style |
| `talocode-design-taste-router` | Route agents to the right design skill |
| `talocode-superagent-harness` | Patterns for long-horizon agent systems |
| `talocode-product-design` | Design high-quality product interfaces |
| `talocode-systematic-debugging` | Root-cause debugging workflow |
| `talocode-codebase-search` | Search codebases before editing |
| `talocode-context-engineering` | Manage long-running tasks |
| `talocode-theme-system` | Create coherent theme systems |
| `talocode-visual-artifact` | Turn text into visual artifacts |
| `talocode-generative-visuals` | Create procedural visuals |
| `talocode-skill-creator` | Standardize skill creation with leading words, failure modes, and progressive disclosure |
| `talocode-agent-workflows` | Disciplined agent workflows |
| `talocode-web-context` | Safe web/document context extraction workflow |
| `talocode-youtube-intelligence` | Analyze YouTube patterns and create original high-retention video plans |
| `talocode-visual-context` | Use screenshot-aware page context when layout, charts, tables, or UI structure matter |
| `talocode-bug-diagnosis` | 6-phase debug discipline: build a tight feedback loop before hypothesising |
| `talocode-writing` | Three-phase writing methodology: explore fragments, exploit through shaping or beats |
| `talocode-workspace-teach` | Multi-session teaching workspace with lessons, reference docs, and learning records |
| `talocode-architecture-design` | Deep-module vocabulary and process for codebase improvements |
| `talocode-wayfinder` | Plan large multi-session efforts as a shared ticket map with fog-of-war tracking |
| `talocode-code-review` | Two-axis parallel sub-agent review: Standards and Spec |
| `talocode-domain-modeling` | Build, sharpen, and maintain domain glossary and architectural decisions |
| `talocode-worklane` | WorkLane as an approval-first agent automation control plane |
| `talocode-stacklane` | Stacklane as a local-first backend, storage, and usage layer |
| `talocode-launchpix` | LaunchPix launch graphics and social assets from screenshots |

## Install

```bash
npx skills add talocode/skills/talocode-release
npx skills add talocode/skills/talocode-local-first-cli
npx skills add talocode/skills/talocode-video
npx skills add talocode/skills/talocode-open-source-positioning
npx skills add talocode/skills/talocode-github-sponsors
npx skills add talocode/skills/talocode-production-deploy
npx skills add talocode/skills/talocode-partnership-branding
npx skills add talocode/skills/talocode-design-taste-router
npx skills add talocode/skills/talocode-superagent-harness
npx skills add talocode/skills/talocode-product-design
npx skills add talocode/skills/talocode-systematic-debugging
npx skills add talocode/skills/talocode-codebase-search
npx skills add talocode/skills/talocode-context-engineering
npx skills add talocode/skills/talocode-theme-system
npx skills add talocode/skills/talocode-visual-artifact
npx skills add talocode/skills/talocode-generative-visuals
npx skills add talocode/skills/talocode-skill-creator
npx skills add talocode/skills/talocode-agent-workflows
npx skills add talocode/skills/talocode-web-context
npx skills add talocode/skills/talocode-youtube-intelligence
npx skills add talocode/skills/talocode-visual-context
npx skills add talocode/skills/talocode-bug-diagnosis
npx skills add talocode/skills/talocode-writing
npx skills add talocode/skills/talocode-workspace-teach
npx skills add talocode/skills/talocode-architecture-design
npx skills add talocode/skills/talocode-wayfinder
npx skills add talocode/skills/talocode-code-review
npx skills add talocode/skills/talocode-domain-modeling
npx skills add talocode/skills/talocode-worklane
npx skills add talocode/skills/talocode-stacklane
npx skills add talocode/skills/talocode-launchpix
```

Or install all at once:

```bash
npx skills add talocode/skills
```

### External Skills

We recommend these external skills:

- **Taste Skill** by Leonxlnx: https://github.com/Leonxlnx/taste-skill
  - Install: `npx skills add Leonxlnx/taste-skill`
  - For frontend UI polish, brand kits, and anti-slop design

See [docs/EXTERNAL_SKILLS.md](docs/EXTERNAL_SKILLS.md) for more information.

## Usage

After installing, the skill files are available to your AI coding agent. Use them when:

- Releasing a new version of an npm package
- Building a CLI tool
- Creating demo videos for releases
- Positioning an open-source product

Skills work best when used case-by-case, not always-on.

## Audit Skill Instructions

Run the local no-op auditor to find vague skill instructions that should be rewritten into concrete, testable rules:

```bash
node scripts/audit-skill-noops.mjs
node scripts/test-skill-noop-auditor.mjs
```

See [docs/SKILL_NOOP_AUDITOR.md](docs/SKILL_NOOP_AUDITOR.md) for the instruction standard, allowlist comments, and rewrite guidance.

## Talocode Agent Distribution Pack

Marketplace-ready skills that make Talocode tools usable from Codex, Claude Code, OpenCode, Cursor, and other `SKILL.md`-compatible agent workflows. Local-first by default, approval-first for all write/destructive/external actions, no cloud account required.

Skills included:

- `talocode-worklane` — WorkLane as an approval-first agent automation control plane
- `talocode-stacklane` — Stacklane as a local-first backend, storage, and usage layer
- `talocode-launchpix` — LaunchPix launch graphics and social assets from screenshots

Marketplace metadata lives under `marketplace/`, examples under `examples/`, and full docs at [docs/AGENT_DISTRIBUTION_PACK.md](docs/AGENT_DISTRIBUTION_PACK.md).

Validate the pack:

```bash
node scripts/test-agent-distribution-pack.mjs
node scripts/audit-skill-noops.mjs --fail-on-high
```

Both checks run in CI on every push and PR.

## Philosophy

- **Open-source first**: Build in public, share freely
- **Local-first**: No hosted dependencies for core flows
- **Provider-agnostic**: Don't lock into one AI provider
- **Practical over perfect**: Ship working code, iterate later
- **No overclaiming**: Be honest about what works and what's experimental

## Contributing

To add a new skill:

1. Create `skills/your-skill/SKILL.md`
2. Follow the existing format
3. Keep it practical and actionable
4. Test it with an AI agent before submitting

## External Agent Harnesses

We study external agent systems to improve Talocode's architecture:

- **DeerFlow by ByteDance**: https://github.com/bytedance/deer-flow
  - MIT licensed
  - SuperAgent harness with sub-agents, memory, sandboxes
  - See `docs/EXTERNAL_AGENT_HARNESSES.md` for details

- **Taste Skill by Leonxlnx**: https://github.com/Leonxlnx/taste-skill
  - MIT licensed
  - Frontend design quality for AI agents
  - See `docs/EXTERNAL_SKILLS.md` for details

## Support Talocode

Talocode builds open-source workflow layers for builders: coding agents, learning tools, trading intelligence, video workflows, and local-first automation.

If Talocode Skills helps you, you can support the work here:

[![Sponsor Abdulmuiz44](https://img.shields.io/badge/Sponsor-Abdulmuiz44-ea4aaa?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Abdulmuiz44)

## Talocode Domains

| Domain | Purpose |
|--------|---------|
| [talocode.site](https://talocode.site) | Main site / homepage |
| [docs.talocode.site](https://docs.talocode.site) | Documentation |
| [api.talocode.site](https://api.talocode.site) | API endpoint |
| [dashboard.talocode.site](https://dashboard.talocode.site) | Cloud dashboard |
| [stacklane.talocode.site](https://stacklane.talocode.site) | Stacklane platform |
| [dashboard.talocode.site](https://dashboard.talocode.site) | Dashboard |

## Talocode ecosystem

Part of **[Talocode](https://github.com/talocode)** — open-source workflow layers for builders. Explore sibling projects:

| Project | What it is |
|---------|------------|
| **[ScreenLane](https://github.com/talocode/screenlane)** | Screen-aware voice command layer |
| **[Tera](https://github.com/talocode/tera)** | AI chat & assistant |
| **[Codra](https://github.com/talocode/codra)** | Local coding agent |
| **[GateLane](https://github.com/talocode/gatelane)** | MCP gateway & agent tool control plane |
| **[ContextLane](https://github.com/talocode/contextlane)** | Context ingestion for persistent agents |
| **[MemoryLane](https://github.com/talocode/memorylane)** | Persistent agent memory |
| **[SignalLane](https://github.com/talocode/signallane)** | X growth intelligence |
| **[ReplyLane](https://github.com/talocode/replylane)** | X reply opportunity intelligence |
| **[CrawlerLane](https://github.com/talocode/crawlerlane)** | Crawler / SEO intelligence |
| **[WebDataLane](https://github.com/talocode/webdatalane)** | Web extraction to structured data |
| **[SearchLane](https://github.com/talocode/searchlane)** | Search layer for agents |
| **[InvoiceLane](https://github.com/talocode/invoicelane)** | Invoicing tools |
| **[GeoLane](https://github.com/talocode/geolane)** | Geo intelligence |
| **[UgcLane](https://github.com/talocode/ugclane)** | UGC workflows |
| **[OpenSourceLane](https://github.com/talocode/opensourcelane)** | Open-source distribution tools |
| **[StackLane](https://github.com/talocode/stacklane)** | Builder stack platform |
| **[Tradia](https://github.com/talocode/tradia)** | Trading intelligence |
| **[Agent Browser](https://github.com/talocode/agent-browser)** | Browser automation for agents |
| **[Talocode](https://github.com/talocode/talocode)** | Org home & control plane |
| **[Skills](https://github.com/talocode/skills)** | Shared agent skills **(this repo)** |
| **[X Agent](https://github.com/talocode/x-agent)** | X automation agent |
| **[LaunchPix](https://github.com/talocode/launchpix)** | Launch tooling |
| **[ForgeCAD](https://github.com/talocode/forgecad)** | CAD workflows |
| **[WorkLane](https://github.com/talocode/worklane)** | Work automation |
| **[ClipLoop](https://github.com/talocode/cliploop)** | Clip / video loops |

MCP-compatible agents integrate via each product's MCP server where available ([Model Context Protocol](https://modelcontextprotocol.io/)).

More: [github.com/talocode](https://github.com/talocode) · [talocode.site](https://talocode.site) · [docs.talocode.site](https://docs.talocode.site)

## License

MIT © Talocode
