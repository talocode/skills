# Talocode Skills

Reusable instructions for AI coding agents that help them build open-source, local-first tools the Talocode way.

## Demo

Watch the demo video in the GitHub release assets: [Talocode Skills Demo](https://github.com/talocode/skills/releases/tag/skills-v0.1.0)

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
| `talocode-skill-creator` | Standardize skill creation |
| `talocode-agent-workflows` | Disciplined agent workflows |
| `talocode-web-context` | Safe web/document context extraction workflow |
| `talocode-youtube-intelligence` | Analyze YouTube patterns and create original high-retention video plans |

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

## License

MIT © Talocode
