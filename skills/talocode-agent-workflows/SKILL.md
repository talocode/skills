# talocode-agent-workflows

Disciplined agent workflows for serious software work.

## Purpose

Define structured workflows for coding agents to follow when working on real software projects.

## When to Use

Use this skill when:
- Planning before editing
- Running TDD workflows
- Doing code review
- Working with git
- Responding to PRs
- Executing releases
- Multi-step implementations
- Safe branch work

## Core Workflows

### 1. Plan First

Before making changes:
1. Understand the goal
2. Search the codebase
3. Identify affected files
4. Create a plan
5. Get approval (if required)
6. Execute step by step

### 2. Inspect Before Changing

Always:
1. Read the current code
2. Understand the context
3. Check for dependencies
4. Review related tests
5. Make minimal changes

### 3. Small Commits

- One logical change per commit
- Clear commit messages
- Test before committing
- Don't mix unrelated changes

### 4. Validate Before Report

Before reporting completion:
1. Run tests
2. Run build
3. Check for errors
4. Verify the change works
5. Document what was done

### 5. No Fake Success

Never claim success without verification:
- Run the actual commands
- Check the actual output
- Verify the actual behavior

### 6. No Undocumented Behavior

Every change should be:
- Intentional
- Documented (if significant)
- Tested
- Reviewable

## Git Workflow

### Branch Work

1. Create feature branch
2. Make changes
3. Test changes
4. Commit with clear message
5. Create PR
6. Address review feedback
7. Merge

### Commit Messages

Format:
```
type(scope): description

- Detail 1
- Detail 2
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Tests
- `chore`: Maintenance

## Final Report Format

When completing work:

```
## What Changed
- [List changes]

## How It Was Done
- [Steps taken]

## Validation
- [Tests run]

## Next Steps
- [What's next]
```

## Notes

- Discipline prevents mistakes
- Documentation prevents confusion
- Testing prevents regressions
- Review prevents issues
