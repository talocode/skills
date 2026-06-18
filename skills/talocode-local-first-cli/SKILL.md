# talocode-local-first-cli

Guide agents to build local-first open-source CLIs.

## When to Use

Use this skill when building a CLI tool that should work locally without requiring hosted infrastructure.

## Core Principles

### 1. No Hosted Dependency for Core Flow

The CLI must work without any external service:

```bash
# Good: works offline
worklane run "summarize this"

# Bad: requires API server
curl http://localhost:3000/run --data '{"task": "summarize this"}'
```

The CLI can have optional cloud features, but core functionality must be local.

### 2. No Secrets Printed

Never log, print, or expose API keys:

```bash
# Bad
console.log(`Using API key: ${apiKey}`)

# Good
console.log(`Using provider: ${config.provider}`)
console.log(`API key configured: ${!!apiKey}`)
```

Use a mask function for any displayed secrets:

```typescript
function maskSecret(value: string): string {
  if (!value) return '';
  if (value.length <= 8) return '****';
  return value.slice(0, 4) + '****' + value.slice(-4);
}
```

### 3. Local Storage Conventions

Store data in a predictable local directory:

```
.worklane/
  workspace.json      # Project config
  memory/             # Stored facts/context
  runs/               # Execution history
```

Or use user-level config:

```
~/.worklane/
  config.toml         # User preferences
```

### 4. Deterministic Mode First

Default to deterministic, predictable behavior:

```bash
# Good: deterministic by default
worklane run "create issue for bug #123"

# Bad: requires cloud, non-deterministic
worklane cloud run "create issue for bug #123"
```

Optional cloud features should be opt-in.

### 5. Provider Abstraction

Don't hardcode AI providers:

```typescript
// Bad
import OpenAI from 'openai';
const client = new OpenAI();

// Good
interface Provider {
  name: string;
  complete: (prompt: string) => Promise<string>;
}

class OpenAIProvider implements Provider { ... }
class OllamaProvider implements Provider { ... }
```

Config file example:

```toml
model = "gpt-4"
provider = "openai"

[providers.openai]
base_url = "https://api.openai.com/v1"
env_key = "OPENAI_API_KEY"

[providers.ollama]
base_url = "http://localhost:11434/v1"
```

### 6. Clean CLI Commands

Follow standard CLI conventions:

```bash
# Init
<tool> init

# Check health
<tool> doctor

# Main action
<tool> run "task description"

# List options
<tool> agents list
<tool> providers list

# Status
<tool> status
<tool> memory status
```

### 7. Docs & Tests

Every CLI needs:

- `README.md` with install and usage
- `docs/` directory for detailed guides
- Tests for core logic (routing, config, parsing)
- `npm pack` verification before publish

## File Structure

```
project/
  package.json
  README.md
  docs/
    ARCHITECTURE.md
    SETUP.md
  packages/
    core/
      src/
        types.ts
        config.ts
        utils.ts
        index.ts
      package.json
    cli/
      src/
        cli.ts
        index.ts
      package.json
  apps/
    telegram-bot/ (optional)
    api-server/ (optional)
```

## Validation

Before releasing a local-first CLI:

```bash
# Build
npm run build

# Test
npm test

# Pack
npm pack

# Install globally
npm install -g ./<package>-<version>.tgz

# Verify works without internet (for core features)
<tool> --version
<tool> --help
<tool> init
<tool> doctor

# Clean up
npm uninstall -g <package-name>
```

## Common Patterns

### TOML Config

```toml
# ~/.tool/config.toml
model = "gpt-4"
provider = "openai"

[providers.openai]
base_url = "https://api.openai.com/v1"
env_key = "OPENAI_API_KEY"
```

### Environment Variables

```bash
# Required
export OPENAI_API_KEY=sk-...

# Optional
export TELEGRAM_BOT_TOKEN=...
export TOOL_PORT=3000
```

### Graceful Degradation

```typescript
const provider = getProvider(config);

if (!provider) {
  console.log('No AI provider configured. Run: tool init');
  process.exit(1);
}
```

## Notes

- Local-first doesn't mean local-only
- Cloud features can be added later
- Always provide a fallback for missing config
- Store runs locally for debugging
- Log what agents do for transparency
