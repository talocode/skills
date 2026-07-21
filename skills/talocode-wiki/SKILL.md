# Talocode Wiki — Agent Knowledge Base

## What This Skill Does

Talocode Wiki turns any agent into a knowledge-powered assistant. It creates, maintains, and queries a structured knowledge base of plain Markdown files that persist across sessions.

**Key features:**
- Ingest documents, PDFs, web pages, and text into linked knowledge pages
- Query the knowledge base with natural language questions
- Cross-reference and link related concepts automatically
- Maintain a hot cache for instant context in new sessions
- Lint the wiki to find contradictions, dead links, and orphans
- Works with any project — one brain, every codebase

## When To Use This Skill

Use this skill when:
- User wants to build a "second brain" or knowledge base
- User asks to ingest documents or notes
- User wants to query previously ingested information
- User needs to organize research or findings
- User wants cross-referenced, linked notes
- User asks about Obsidian, markdown wikis, or knowledge management

## Wiki Structure

When initialized, create this directory structure:

```
wiki/
├── index.md           # Master index of all knowledge
├── hot.md             # Recent context cache (last 7 days)
├── domains/           # Domain-specific knowledge
│   ├── coding.md
│   ├── research.md
│   └── projects.md
├── sources/           # Ingested source documents
│   └── <source-name>/
│       ├── index.md   # Source summary
│       └── pages/     # Extracted concepts
└── links.md           # Cross-reference graph
```

## Core Commands

### Initialize Wiki

```bash
# Create wiki structure in current project
mkdir -p wiki/{domains,sources,links}
touch wiki/index.md wiki/hot.md wiki/links.md
```

Write initial `wiki/index.md`:

```markdown
# Knowledge Base Index

Last updated: <date>

## Domains
- [Coding](domains/coding.md)
- [Research](domains/research.md)
- [Projects](domains/projects.md)

## Recent Activity
- <list recent additions>

## Statistics
- Total sources: 0
- Total pages: 0
- Last ingested: none
```

### Ingest Source

When user says "ingest <file>" or "add this to the wiki":

1. Read the source file/content
2. Extract key concepts, people, ideas, and facts
3. Create wiki pages for each concept
4. Cross-link related concepts
5. Update index.md and hot.md
6. Update links.md with new relationships

Output format for each ingested source:

```markdown
# <Source Title>

**Ingested:** <date>
**Type:** <pdf|article|note|code>
**Source:** <path or URL>

## Summary
<2-3 sentence summary>

## Key Concepts
- [Concept 1](pages/concept-1.md)
- [Concept 2](pages/concept-2.md)

## Key Facts
- <fact 1>
- <fact 2>

## Links
- Related: [[other-source]]
- References: [[concept-3]]
```

### Query Knowledge

When user asks "what do you know about X?" or "search the wiki":

1. Read `wiki/hot.md` first (recent context)
2. If not enough, read `wiki/index.md`
3. Search for relevant pages using grep
4. Drill into specific wiki pages
5. Return answer with citations

Response format:

```
Based on the knowledge base:

<answer>

Sources:
- [Source 1](wiki/sources/source1/index.md)
- [Source 2](wiki/sources/source2/pages/concept.md)
```

### Save Conversation

When user says "save" or "save this":

1. Extract key information from current conversation
2. Create a new wiki page under `wiki/sources/conversation-<date>/`
3. Cross-link with existing knowledge
4. Update index and hot cache

### Lint Wiki

When user says "lint the wiki" or "check the wiki":

1. Find orphan pages (no incoming links)
2. Find dead links (broken [[references]])
3. Find contradictions (conflicting facts about same topic)
4. Find stale claims (old information that may be outdated)
5. Generate report with fixes

Output:

```markdown
# Wiki Health Report

## Orphan Pages (no incoming links)
- wiki/sources/old-note.md → link from another page or delete

## Dead Links
- wiki/sources/note.md links to [[nonexistent]] → fix or remove

## Contradictions
- wiki/sources/a.md says X
- wiki/sources/b.md says Y
→ Review and reconcile

## Stale Claims
- wiki/sources/old.md claims "latest version is 2.0" (3 months ago)
→ Update or verify

## Statistics
- Pages: 45
- Links: 120
- Orphans: 3
- Dead links: 1
- Contradictions: 0
```

### Auto-Research

When user says "/autoresearch <topic>":

1. Search the web for the topic
2. Fetch top results
3. Extract key information
4. Create wiki pages for findings
5. Cross-link with existing knowledge
6. Generate summary report

## Hot Cache

Maintain `wiki/hot.md` with recent context:

```markdown
# Hot Cache — Recent Context

Updated: <date>

## Last 7 Days
- <source 1> — <1-line summary>
- <source 2> — <1-line summary>

## Active Topics
- <topic 1>: <current understanding>
- <topic 2>: <current understanding>

## Pending Questions
- <unanswered question 1>
- <unanswered question 2>
```

Refresh this at the end of every session.

## Cross-Referencing

When creating new pages, always check for related concepts:

1. Search existing pages for similar terms
2. Add `[[wikilinks]]` to related concepts
3. Update `wiki/links.md` with new relationships
4. Create bidirectional links where appropriate

## Integration With Projects

Add this to any project's AGENTS.md or CLAUDE.md:

```markdown
## Knowledge Base
Path: wiki/

When you need context not in this project:
1. Read wiki/hot.md first
2. If not enough, read wiki/index.md
3. If you need domain details, read the relevant domain sub-index
4. Only then drill into specific wiki pages

Do NOT read the wiki for general coding questions.
```

## Obsidian Compatibility

This wiki structure is compatible with Obsidian:

- Plain Markdown files
- `[[wikilinks]]` for cross-references
- YAML frontmatter for metadata
- Works with Obsidian Graph View
- Compatible with Obsidian Git for version control

## Best Practices

1. **One concept per page** — keep pages focused
2. **Always cross-link** — every page should link to at least 2 others
3. **Update hot cache** — refresh at end of each session
4. **Lint weekly** — find and fix issues early
5. **Ingest regularly** — knowledge compounds over time
6. **Cite sources** — always note where information came from
7. **Date everything** — track when facts were gathered
