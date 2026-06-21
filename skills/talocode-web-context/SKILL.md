# talocode-web-context

Safe web and document context extraction workflow for Talocode agents.

## Purpose

Help Talocode agents collect, clean, and use public or user-approved web and document context safely — turning scattered web content into concise, citable, AI-usable context without violating privacy, terms of service, or safety boundaries.

## When to Fetch Web Context

Use web context extraction when:

- A task references a public API, library, or framework the agent needs to understand
- The user explicitly asks the agent to read a specific URL, docs page, or release notes
- Building a feature requires understanding a public specification or standard
- Debugging an error requires reading official documentation
- Writing release notes requires referencing changelogs
- Creating content (videos, posts, docs) requires source material the user approves

## When NOT to Fetch Web Context

Do NOT fetch web context when:

- The page requires authentication the user has not provided
- The content is behind a paywall or subscription wall
- The page has explicit no-crawling directives and the task does not require it
- The user has not approved accessing the content
- The page contains private data, personal information, or internal tools
- The agent can answer from existing local context without fetching
- The fetch would exceed reasonable rate limits

## Workflow

### 1. Define the Question or Task

Before fetching anything, clarify what the agent needs from the web:

- What specific information is needed?
- Can this be answered from local context already available?
- What is the minimum web content required?

### 2. Identify Allowed Sources

Determine which URLs and sources are acceptable:

- Public documentation sites
- Official GitHub repositories (issues, releases, docs, wikis)
- Public API references
- User-provided URLs
- Open-source license files
- Public blog posts and changelogs
- Government or standards body publications

### 3. Fetch Source Content

Retrieve content using the appropriate method:

- **Simple HTTP fetch** for static pages and markdown files
- **Document conversion** for PDFs, DOCX, and structured files
- **Browser-rendered fetch** for JavaScript-heavy pages (only when needed)
- **API endpoints** for structured data (GitHub API, etc.)

### 4. Extract Clean Content

Convert raw content into clean, structured format:

- Remove navigation, sidebars, footers, ads
- Strip HTML boilerplate, scripts, styles
- Convert to clean markdown preserving headings, code blocks, links
- Preserve meaningful structure (lists, tables, diagrams as text)
- Keep code examples intact with language tags

### 5. Compress and Filter

Reduce content to what matters for the task:

- Remove duplicated boilerplate (headers, footers repeated across pages)
- Summarize long sections that are not directly relevant
- Keep code examples and configuration snippets verbatim
- Preserve API signatures and parameter descriptions
- Filter out promotional content, CTAs, and unrelated noise

### 6. Preserve Source Metadata

Always track where content came from:

```json
{
  "sourceUrl": "https://example.com/docs/api",
  "title": "API Reference",
  "fetchedAt": "2026-06-21T10:00:00Z",
  "contentType": "documentation",
  "language": "en",
  "lastModified": "2026-06-20T08:00:00Z",
  "checksum": "sha256:abc123..."
}
```

### 7. Cite Sources in Output

When using web context in responses or code generation:

- Reference the source URL in comments or documentation
- Link back to the original page when possible
- Note when information may be outdated
- Distinguish between official docs and community content

### 8. Save Only Approved Context

- Store extracted context only with user approval
- Respect user's storage preferences
- Do not persist private or sensitive page content
- Allow users to review and delete stored context
- Default to session-scoped context (discarded on exit)

### 9. Feed Context into the Agent Task

Use the cleaned context as grounding:

- Inject relevant context into the provider prompt
- Use context to answer questions, write code, or plan tasks
- Reference specific source sections when citing information
- If context is insufficient, tell the user what additional sources would help

### 10. Validate Against Source

After generating output using web context:

- Verify claims against the original source
- Check that code examples match the documented API
- Confirm version-specific details match the source version
- Flag if source content may have changed since fetching

## Privacy and Safety Rules

### Respect

- Never bypass authentication systems
- Never access paywalled or subscription-gated content without a valid subscription
- Never ignore robots.txt when it explicitly blocks the path
- Never claim to be a human user to access restricted content
- Never extract content from private dashboards or admin panels

### Rate Limits

- Do not hammer public endpoints with rapid requests
- Respect API rate limits and retry-after headers
- Use cached content when available instead of re-fetching
- Batch requests when the target API supports it
- Default to conservative request intervals

### User Consent

- Always ask before accessing a URL the user has not explicitly provided
- Never automatically crawl entire sites or documentation trees
- Let users approve each new source before extraction
- Allow users to revoke access to stored web context
- Make it clear when context was sourced from the web vs. local files

### Data Handling

- Do not store extracted content without user awareness
- Do not share extracted content with third parties
- Do not use extracted content for training or profiling
- Delete cached web context when the user clears session data
- Default to ephemeral context unless the user opts into persistence

## Extraction Patterns

### Documentation Pages

```
Input:  URL to docs page
Output: Clean markdown with:
  - Page title and last-updated date
  - Main content (headers, text, code, tables)
  - Navigation context (where this page sits in docs tree)
  - Related links
```

### GitHub Issues and Releases

```
Input:  GitHub repo + issue/release number
Output: Structured markdown with:
  - Title, author, date, labels
  - Description body
  - Comments (if relevant to task)
  - Links to referenced PRs/commits
```

### API References

```
Input:  API docs URL or OpenAPI spec URL
Output: Structured API documentation:
  - Endpoint paths and methods
  - Parameters and types
  - Request/response examples
  - Authentication requirements
  - Rate limits
```

### PDF and Document Files

```
Input:  URL to PDF/DOCX file
Output: Extracted text content with:
  - Document title and metadata
  - Section headings preserved
  - Code blocks and tables formatted
  - Page numbers for citation
```

### Changelog and Release Notes

```
Input:  Changelog URL or release page
Output: Structured changes list with:
  - Version number and date
  - Breaking changes highlighted
  - New features listed
  - Bug fixes noted
  - Migration steps if present
```

## Integration Points

### With Codra Code

- `/context add-url <url>` — add web page to project context
- `/context web search <query>` — search and add relevant docs
- Store extracted context under `.codra/context/web/`
- Link web context to plans and threads
- Compress before provider calls to avoid context bloat

### With Tera Browser

- Page extraction flow on any browsed page
- Summarize/ask/explain/lesson from current page
- Save-to-memory with user approval
- Research mode for multi-page studies
- Source trail preservation for learning

### With ClipLoop

- Product URL → clean context → script → motion spec → video
- Changelog → release video content
- Documentation → tutorial video flow
- Source metadata preserved in video credits/description

## Output Format

When returning web context to the agent or user, always include:

1. **Source summary** — one-line description of what the page contains
2. **Key extracted content** — clean markdown of relevant sections
3. **Metadata** — URL, title, fetched date, content type
4. **Confidence note** — whether the content is official, community, or stale
5. **Citation** — formatted reference for use in code comments or docs
