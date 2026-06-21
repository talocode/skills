# talocode-codebase-search

Search codebases effectively before editing.

## Purpose

Guide agents to search codebases before making changes, ensuring they understand the codebase structure and find relevant code.

## When to Use

Use this skill when:
- Finding command handlers
- Locating API routes
- Finding config files
- Locating provider usage
- Searching for function implementations
- Refactoring code
- Finding documentation mismatches

## Search-First Rule

**Always search before editing.** Understanding existing code prevents breaking changes.

## Search Tools

### Text Search (ripgrep)

```bash
# Search for a pattern
rg "pattern"

# Search in specific directory
rg "functionName" src/

# Search with context
rg "pattern" -C 3

# Search for exact match
rg "exact phrase" -F
```

### File Search

```bash
# Find files by name
find . -name "*.ts" -type f

# Find files matching pattern
find . -name "*.test.*" -type f

# Find directories
find . -type d -name "commands"
```

### Git Search

```bash
# Search tracked files
git grep "pattern"

# Search in specific path
git grep "pattern" -- src/
```

## Search Patterns

### Find Command Handlers
```bash
rg "case '/" src/commands/
```

### Find API Routes
```bash
rg "export async function" app/api/
```

### Find Config Files
```bash
find . -name "*.json" -o -name "*.yaml" -o -name "*.toml" | grep -E "config|settings"
```

### Find Provider Usage
```bash
rg "createProvider|provider.chat" src/
```

### Find Documentation
```bash
rg "# " docs/ --include="*.md"
```

## Search-Before-Edit Rule

Before modifying any code:
1. Search for the function/component being modified
2. Find all usages of that function/component
3. Understand the impact of changes
4. Make minimal, focused changes

## Command/Documentation Parity

When documentation mentions a command:
1. Search for the command implementation
2. Verify it exists
3. Check if it matches the documentation
4. Report mismatches

## Notes

- Search first, edit second
- Understand before modifying
- Keep changes minimal and focused
