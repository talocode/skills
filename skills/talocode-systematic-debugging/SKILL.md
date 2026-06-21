# talocode-systematic-debugging

Root-cause debugging workflow for Talocode products.

## Purpose

A structured approach to debugging that avoids guessing and focuses on evidence.

## When to Use

Use this skill when:
- API returns HTML instead of JSON
- Auth flow breaks
- Deployment fails
- Build/test failures
- Package publish fails
- Webhook/API route issues
- Unexpected behavior

## Debugging Phases

### Phase 1: Reproduce

- Capture the exact error message
- Identify the failing command
- Note the environment (OS, Node version, etc.)
- Document expected vs actual behavior

### Phase 2: Isolate

- Narrow down the problem area
- Check recent changes
- Test with minimal reproduction
- Identify affected files

### Phase 3: Inspect Boundaries

- Check input/output at system boundaries
- Verify API contracts
- Check authentication state
- Verify file permissions
- Check network connectivity

### Phase 4: Prove Root Cause

- Form a hypothesis
- Test the hypothesis
- Gather evidence
- Document findings

### Phase 5: Implement Minimal Fix

- Make the smallest change that fixes the issue
- Avoid over-engineering
- Keep changes focused

### Phase 6: Validate

- Run the failing command again
- Run related tests
- Check for regressions
- Verify the fix works

### Phase 7: Prevent Regression

- Add tests if appropriate
- Update documentation if needed
- Consider edge cases

## Debugging Checklist

- [ ] Exact error captured
- [ ] Failing command identified
- [ ] Expected vs actual behavior documented
- [ ] Relevant files located
- [ ] Fix scoped to minimal change
- [ ] Tests/smoke checks added
- [ ] Docs updated only if needed

## Common Debug Patterns

### HTML Instead of JSON

Check:
- Route file location
- Response type (NextResponse.json)
- Middleware redirects
- Error handlers

### Auth Failures

Check:
- Token existence
- Token expiration
- Auth endpoint availability
- Environment variables

### Build Failures

Check:
- TypeScript errors
- Missing dependencies
- Import paths
- Circular dependencies

### Deployment Failures

Check:
- Build logs
- Environment variables
- Node version compatibility
- Dependency conflicts

## Notes

- Debugging is evidence-based, not guesswork
- Document what you find
- Fix the root cause, not the symptom
- Add tests to prevent regression
