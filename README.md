# Talocode Skills

Reusable instructions for AI coding agents that help them build open-source, local-first tools the Talocode way.

## What are Talocode Skills?

Skills are markdown files that give AI coding agents (Codex, Claude Code, Cursor, Hermes) specialized knowledge about how Talocode builds products. They encode repeatable patterns so agents can follow proven workflows.

## Skills

| Skill | Purpose |
|-------|---------|
| `talocode-release` | Full release discipline for npm packages |
| `talocode-local-first-cli` | Building local-first open-source CLIs |
| `talocode-remotion-demo` | Creating release demo videos |
| `talocode-open-source-positioning` | Messaging and positioning for open-source tools |

## Install

```bash
npx skills add talocode/skills/talocode-release
npx skills add talocode/skills/talocode-local-first-cli
npx skills add talocode/skills/talocode-remotion-demo
npx skills add talocode/skills/talocode-open-source-positioning
```

Or install all at once:

```bash
npx skills add talocode/skills
```

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

## License

MIT © Talocode
