# talocode-context-engineering

Manage long-running tasks without context collapse.

## Purpose

Help agents maintain focus and accuracy during extended coding sessions by managing context effectively.

## When to Use

Use this skill when:
- Working on large refactors
- Debugging complex issues
- Running multi-step workflows
- Managing long conversations
- Working across multiple files

## Context Management Rules

### 1. Summarize Old Context

After completing a task, summarize what was done:
- What files were changed
- What was the goal
- What were the results
- What's the next step

### 2. Compress Tool Outputs

Don't paste entire file contents. Instead:
- Show relevant sections
- Summarize key points
- Extract actionable information

### 3. Separate Facts from Assumptions

Track:
- **Facts**: What you know for certain
- **Assumptions**: What you think might be true
- **Questions**: What you need to verify

### 4. Maintain Active Task State

Keep clear record of:
- Current goal
- Progress so far
- Blockers
- Next steps

### 5. Avoid Context Poisoning

Don't let errors or failed attempts clutter the context:
- Clear failed attempts from active context
- Summarize what didn't work
- Focus on what will work

### 6. Create Handoff Summaries

When passing work to another agent or session:
- Summarize completed work
- List pending tasks
- Include relevant file paths
- Note any blockers

## Context Loading Rules

- Load only relevant files
- Don't load entire codebases at once
- Focus on the specific area being worked on
- Reload files when context changes

## Context Compression

When context gets too large:
- Summarize old conversations
- Extract key decisions
- Remove redundant information
- Keep actionable items

## Notes

- Context is finite, use it wisely
- Summarize before you forget
- Hand off clearly when switching tasks
- Don't let context collapse cause errors
