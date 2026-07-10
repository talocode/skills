# talocode-web-intelligence

Use the Talocode Web Intelligence API (Agent Browser) to fetch, extract, analyze, and capture web pages from inside agent workflows.

## When to Use

Use this skill when an agent task involves:
- Checking whether a website is up/down and inspecting response metadata
- Extracting structured content (title, description, headings, links, images, text) from a URL
- AI-powered page analysis (summary, sentiment, entities, topics, keywords)
- Capturing a browser screenshot of a web page
- Gathering competitive intelligence or documenting web page state

Do not use this skill for general HTML parsing of static strings; use it only when you need live HTTP/S fetch, browser rendering, or AI analysis.

## Required Behavior

- Never print or log raw API keys. Use `$TALOCODE_API_KEY` or the SDK client.
- Always include a `usage` block in response output showing credits consumed.
- Default to local HTTP fetch when possible; use cloud mode (`--cloud`) only when AI or browser features are required.
- Prefer the SDK (`@talocode/sdk`) over raw curl in TypeScript projects.
- Respect robots.txt and rate limits; do not hammer the same host.

## Auth

```
Authorization: Bearer $TALOCODE_API_KEY
```

Or via header:

```
X-Api-Key: $TALOCODE_API_KEY
```

Base URL: `https://api.talocode.site`

## Endpoints

### `POST /v1/agent-browser/check` (5 credits)

Check website status, HTTP code, title, and optional screenshot/vision.

```json
{
  "url": "https://example.com",
  "screenshot": false,
  "vision": false
}
```

Response includes `status` (`up`/`down`/`error`), `statusCode`, `title`, `checks`, `durationMs`.

### `POST /v1/agent-browser/extract` (15 credits)

Extract structured content from a URL — title, description, language, canonical, OG tags, headings, text, links, images.

```json
{
  "url": "https://example.com",
  "includeImages": true,
  "includeLinks": true,
  "maxTextLength": 50000
}
```

### `POST /v1/agent-browser/analyze` (25 credits)

AI-powered page analysis — summary, sentiment, entities, topics, keywords.

```json
{
  "url": "https://example.com",
  "analysis": ["summary", "sentiment", "entities", "topics", "keywords"],
  "maxTextLength": 50000
}
```

### `POST /v1/agent-browser/screenshot` (8 credits)

Capture a browser screenshot of the page.

```json
{
  "url": "https://example.com",
  "fullPage": false,
  "width": 1280,
  "height": 720
}
```

Returns a base64-encoded PNG screenshot string.

### `GET /v1/agent-browser/health`

Check API availability and mode.

## CLI Usage

Via the `@talocode/sdk` CLI (`talocode`):

```bash
# Check a website
talocode agent-browser check https://example.com

# Extract structured content
talocode agent-browser extract https://example.com --no-images

# AI-powered analysis
talocode agent-browser analyze https://example.com

# Capture screenshot (requires --cloud with API key)
TALOCODE_API_KEY=sk_... talocode --cloud agent-browser screenshot https://example.com --full-page

# Health check
talocode agent-browser health
```

## SDK Usage

```typescript
import { TalocodeClient } from '@talocode/sdk'

const client = new TalocodeClient({
  apiKey: process.env.TALOCODE_API_KEY,
})

// Check website
const check = await client.agentBrowser.check({ url: 'https://example.com' })

// Extract content
const extract = await client.agentBrowser.extract({ url: 'https://example.com' })

// AI analysis
const analysis = await client.agentBrowser.analyze({
  url: 'https://example.com',
  analysis: ['summary', 'sentiment', 'entities'],
})

// Screenshot
const screenshot = await client.agentBrowser.screenshot({
  url: 'https://example.com',
  fullPage: true,
})
```

## Raw API Examples

```bash
# Check
curl -X POST https://api.talocode.site/v1/agent-browser/check \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Extract
curl -X POST https://api.talocode.site/v1/agent-browser/extract \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "includeImages": true, "includeLinks": true}'

# Analyze
curl -X POST https://api.talocode.site/v1/agent-browser/analyze \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "analysis": ["summary", "sentiment"]}'

# Screenshot
curl -X POST https://api.talocode.site/v1/agent-browser/screenshot \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "fullPage": true}'
```

## Pricing

| Endpoint | Credits | USD Value |
|---|---|---|
| `POST /v1/agent-browser/check` | 5 | $0.05 |
| `POST /v1/agent-browser/screenshot` | 8 | $0.08 |
| `POST /v1/agent-browser/extract` | 15 | $0.15 |
| `POST /v1/agent-browser/analyze` | 25 | $0.25 |
| `POST /v1/agent-browser/evidence` | 8 | $0.08 |
| `POST /v1/agent-browser/trace-report` | 15 | $0.15 |
| `GET /v1/agent-browser/health` | 0 | Free |

## Validation Checklist

- [ ] Auth header configured (`Authorization: Bearer $TALOCODE_API_KEY`)
- [ ] URL is valid and publicly accessible
- [ ] `usage.credits` reported in response
- [ ] Cloud mode selected for AI analysis and screenshot features
- [ ] Local mode used for basic HTTP fetch/check when AI not needed
- [ ] No API keys printed or logged
- [ ] Error response contains `error.code` and `error.message`

## Notes

- Screenshot and AI analysis require cloud mode (`--cloud`) with a valid API key.
- Local mode performs basic HTTP fetch and regex extraction; cloud mode uses Playwright browser and AI models.
- The product is namespaced under `/v1/agent-browser/*`.
- SDK methods are grouped under `client.agentBrowser.*`.
