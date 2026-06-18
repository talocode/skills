# talocode-open-source-positioning

Guide agents on Talocode messaging and positioning.

## When to Use

Use this skill when writing README, docs, or marketing copy for an open-source Talocode-style product.

## Core Positioning

### What We Are

- **Open-source**: Code is public, community can contribute
- **Local-first**: Works without hosted infrastructure
- **Provider-agnostic**: Don't lock into one AI provider
- **Workflow layer**: AI agents that do real work

### What We Are Not

- **Not a SaaS**: We don't require signup or hosted services
- **Not an "official integration"**: We're independent, not endorsed by platforms
- **Not enterprise-only**: We're accessible to everyone
- **Not a wrapper**: We add real functionality, not just UI

## Messaging Framework

### One-Liner

```
<product> is an open-source <category> for <audience>.
```

Examples:
- "WorkLane is an open-source AI coworker platform for teams."
- "Codra is an open-source AI assistant for developers."
- "SignalLane is an open-source notification hub for services."

### Tagline

```
<action> in <context>. <benefit>.
```

Examples:
- "Mention agents in chat. Route work. Return finished output."
- "Write code locally. Deploy anywhere. Stay provider-agnostic."
- "Get notifications where you work. No dashboard required."

### Value Proposition

```
<product> lets <audience> <action> without <pain point>.
```

Examples:
- "WorkLane lets teams mention AI agents without opening another dashboard."
- "Codra lets developers use AI without sending code to the cloud."
- "SignalLane lets services send notifications without vendor lock-in."

## README Structure

```markdown
# <Product>

**<one-liner>**

< tagline>

## What is <Product>?

<2-3 sentences explaining what it does and why it matters>

## Features

- **<Feature 1>**: <brief description>
- **<Feature 2>**: <brief description>
- **<Feature 3>**: <brief description>

## Quick Start

```bash
# Install
npm install -g <package>

# Run
<command> --version
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Setup](docs/SETUP.md)
- [Roadmap](docs/ROADMAP.md)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## License

MIT © <Organization>
```

## Words to Use

| Use | Don't Use |
|-----|-----------|
| Open-source | Proprietary |
| Local-first | Cloud-required |
| Provider-agnostic | OpenAI-only |
| Self-hostable | SaaS |
| Workflow | Automation |
| Agent | Bot (unless it's a chatbot) |
| Community | Users |
| Contributing | Customers |

## Claims to Avoid

### "Official Integration"

```markdown
# Bad
WorkLane: Official Slack AI Integration

# Good
WorkLane: AI Coworker for Slack (unofficial)
```

### "Enterprise-Ready"

```markdown
# Bad
Enterprise-ready AI platform

# Good
Scalable AI workflow tool
```

### "Best" or "#1"

```markdown
# Bad
The best AI coding assistant

# Good
An AI coding assistant for developers
```

### "Replaces X"

```markdown
# Bad
Replaces ChatGPT for teams

# Good
Alternative to ChatGPT for teams who want self-hosting
```

## Honest Positioning

### Say What Works

```markdown
## What Works Now

- Telegram bot with basic commands
- CLI for local testing
- OpenAI provider integration

## What's Planned

- Slack integration
- More AI providers
- Web dashboard
```

### Say What's Experimental

```markdown
> **Note**: This is experimental software. APIs may change.
```

### Say What's Missing

```markdown
## Limitations

- No web UI yet
- Limited provider support
- No team collaboration features
```

## Examples

### WorkLane

```markdown
# WorkLane

**Open-source AI coworker platform for teams.**

Mention agents in chat. Route work. Return finished output.

## What is WorkLane?

WorkLane lets teams mention AI agents inside chat tools and get real work done without opening another dashboard or learning prompt engineering.

## Features

- **Telegram-first**: Start with Telegram, expand to Slack, Teams, Discord
- **Provider-agnostic**: Works with OpenAI, OpenRouter, Ollama
- **Self-hostable**: Run on your own infrastructure
- **Open-source**: MIT licensed, community-driven
```

### Codra

```markdown
# Codra

**Open-source AI assistant for developers.**

Write code locally. Deploy anywhere. Stay provider-agnostic.

## What is Codra?

Codra is an AI coding assistant that runs locally and works with any AI provider. Your code stays on your machine.

## Features

- **Local-first**: Code never leaves your machine unless you choose
- **Provider-agnostic**: Use OpenAI, Ollama, or any OpenAI-compatible API
- **Open-source**: MIT licensed, community-driven
```

## Tone

- **Confident but not arrogant**: We know what we build, but don't oversell
- **Honest about limitations**: We say what doesn't work yet
- **Community-focused**: We build for users, not investors
- **Technical but accessible**: We explain clearly without dumbing down

## Notes

- Positioning is about what you're not as much as what you are
- Honesty builds trust faster than hype
- Open-source is a distribution model, not a business model
- Local-first is a technical choice, not a marketing term
