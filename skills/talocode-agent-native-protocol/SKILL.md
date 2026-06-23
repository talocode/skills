# talocode-agent-native-protocol

Guide Talocode agents to design products with shared actions, context, permissions, approval, and audit.

## When to Use

Use this skill when:

- Building a new Talocode product that agents will interact with
- Adding agent capabilities to an existing product
- Designing action registries for multi-surface use (UI, agent, API)
- Implementing permission gates for sensitive operations
- Adding audit logging for agent actions
- Creating context providers that expose app state to agents

## Core Principles

1. **Agents do not control the app directly** — they request actions through a typed, permissioned, audited layer
2. **Read-only actions execute without approval** but are always audited
3. **Write actions require explicit human approval** before execution
4. **Destructive actions are unsupported** in early versions
5. **No raw secrets** in action definitions, audit logs, or context providers
6. **Every action is typed** with input/output schemas

## Action Design Checklist

When defining a new agent action:

- [ ] Has a unique `id` (e.g., `product.action_name`)
- [ ] Has a clear `title` and `description`
- [ ] Has `inputSchema` with typed fields
- [ ] Has appropriate `riskLevel` (read/low/medium/high/destructive)
- [ ] Sets `readOnly` correctly
- [ ] Sets `requiresApproval` correctly
- [ ] Lists `requiredPermissions`
- [ ] Does not expose raw secrets in schema
- [ ] Is auditable

## Context Provider Design

When creating a context provider:

- [ ] Has a unique `id` (e.g., `product.entity`)
- [ ] Declares `privacyLevel` (public/workspace/private/sensitive)
- [ ] Lists what it `provides`
- [ ] Does not expose sensitive data without access grants
- [ ] Truncates large payloads

## Permission Design

When defining permissions:

- [ ] Follows `product:action` naming (e.g., `github:read`)
- [ ] Read permissions are separate from write permissions
- [ ] Write permissions require approval
- [ ] Destructive permissions are unsupported initially

## Approval Model

- Read-only actions: execute immediately, always audited
- Write actions: require approval before execution
- Destructive actions: unsupported
- Approval can be per-action or per-session

## Audit Requirements

Every action must:

- Create an audit event with timestamp
- Include action type, actor, result
- Sanitize metadata (no tokens, passwords, secrets)
- Be queryable by product, action, actor, time range

## Anti-Patterns

- Exposing raw API keys or tokens in action schemas
- Allowing agents to bypass approval gates
- Logging sensitive data in audit events
- Creating actions without input validation
- Skipping audit for read-only actions
- Overclaiming agent autonomy
