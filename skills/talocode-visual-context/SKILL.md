# talocode-visual-context

Use screenshot-aware page context when layout, charts, tables, or UI structure matter.

## Purpose

Guide Talocode agents to use visual page context when text extraction alone loses meaning. Some pages communicate primarily through visual structure — dashboards, data tables, charts, diagrams, UI layouts, code editors, terminal output. Text extraction flattens these into meaningless strings. Visual context preserves the spatial and structural information that makes the content understandable.

## When Text Context Is Enough

Text extraction works well for:

- Documentation pages with clear headings and paragraphs
- Blog posts and articles
- API references with code examples
- README files and changelogs
- Markdown-rendered content
- Plain text files

## When Visual Context Is Needed

Use visual context when the page contains:

- **Data tables** — text extraction loses column alignment and row relationships
- **Charts and graphs** — text cannot convey visual data representations
- **Dashboard layouts** — spatial arrangement carries meaning
- **UI state** — button states, form validation, navigation breadcrumbs
- **Code editors** — syntax highlighting, error indicators, line numbers
- **Terminal output** — color coding, alignment, prompt structure
- **Diagrams** — architecture diagrams, flowcharts, network topology
- **Before/after comparisons** — visual diffs, state changes
- **Embedded media** — images, videos, interactive widgets
- **Rich formatting** — tables with merged cells, multi-column layouts

## How to Reason About Screenshots

When analyzing a page screenshot:

1. **Identify visual elements** — what is shown, not what text is present
2. **Read spatial relationships** — proximity, alignment, grouping
3. **Extract visible data** — numbers, labels, states from visual elements
4. **Note structure** — layout patterns, navigation, hierarchy
5. **Flag visual-only content** — content that has no text equivalent

## How to Combine Text + Screenshot Context

Hybrid approach:

1. Extract readable text from the page (if available)
2. Capture visible viewport screenshot (user-triggered)
3. Send both to the AI with clear framing:
   - "Text content: [extracted text]"
   - "Visual context: [screenshot description or image]"
4. Let the AI reason over both modalities
5. Return unified response drawing from both sources

## Source Metadata

Always track visual context metadata:

```json
{
  "sourceUrl": "https://example.com/dashboard",
  "title": "Analytics Dashboard",
  "capturedAt": "2026-06-21T10:00:00Z",
  "captureType": "viewport",
  "dimensions": { "width": 1440, "height": 900 },
  "textExtracted": true,
  "screenshotStored": false
}
```

## Privacy Rules

### No Hidden Capture

- Visual capture must be user-triggered (explicit button click or command)
- Never capture silently in the background
- Never capture on page load without user action
- Never capture across multiple pages without per-page consent

### No Private Pages Without Approval

- Warn before capturing private/authenticated pages
- Do not capture pages behind login walls unless user explicitly approves
- Do not capture banking, health, or sensitive portals by default
- Block local/private URLs in cloud mode unless explicitly enabled

### No Storing Screenshots Without Consent

- Default: screenshots are ephemeral (used for analysis, then discarded)
- Save-to-memory stores derived notes, not raw images by default
- If user opts into screenshot storage, encrypt and store securely
- Allow user to delete stored visual context at any time

### Secret Redaction

- Redact visible passwords, API keys, tokens, and secrets from screenshots where possible
- Warn if a screenshot appears to contain sensitive information
- Do not transmit screenshots containing visible secrets to external providers

## Accessibility Considerations

- Visual context should supplement, not replace, text content
- Text descriptions should accompany visual analysis for screen reader users
- Color-dependent information should be described in text form
- Spatial layouts should be described in terms of reading order, not just visual position

## Validation Checklist

Before using visual context:

- [ ] Is text extraction insufficient for this page?
- [ ] Is the user aware and has approved visual capture?
- [ ] Is the page appropriate for capture (not private/sensitive)?
- [ ] Are dimensions reasonable (not unnecessarily large)?
- [ ] Is the screenshot ephemeral unless user opts into storage?
- [ ] Are visible secrets redacted or flagged?
- [ ] Is source metadata attached?
- [ ] Is the response grounded in what is actually visible, not hallucinated?
