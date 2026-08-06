---
name: reliabilitylane
description: ReliabilityLane — Talocode agent skill
version: 0.1.0
license: MIT
---

# ReliabilityLane

**Reliability patterns for AI agents** — match failure symptoms to curated patterns, plan retries with backoff, verify work against checklists, and resolve incidents with playbooks.

## Install

```bash
npm install -g @talocode/reliabilitylane
export TALOCODE_API_KEY=...
export TALOCODE_BASE_URL=https://api.talocode.site
```

## Dataset

Curated, deterministic — no LLM guessing:

- 10 failure patterns (retry hammering, unverified completion, self-graded work, lost context, unsafe tool calls, wrong math, security ticket fiction, ...)
- 4 retry strategies (transient, rate limit, permanent, circuit-protected)
- 5 verification checklists (deployment, code, security, content, data)
- 3 incident playbooks (deploy failed, outage detected, dangerous tool call caught)
- 5 anti-patterns to avoid

## Workflow

1. Match the failure: `reliabilitylane match "it keeps retrying the same call forever"`
2. Plan the retry: `reliabilitylane retry-plan --status 429`
3. Verify the work: `reliabilitylane verify --area deployment --evidence "Service responds"`
4. Resolve the incident: `reliabilitylane incident "deploy failed"`

## CLI

```bash
reliabilitylane match [symptom...] --error --category
reliabilitylane retry-plan --status --code --message --kind
reliabilitylane verify --area --checklist --evidence
reliabilitylane incident [symptom...] --error
reliabilitylane patterns | retries | checklists | playbooks | antipatterns | list | pricing | capabilities
```

## MCP server

```bash
reliabilitylane-mcp
```

Stdio JSON-RPC MCP server with tools: match-pattern, retry-plan, verify, incident, antipatterns, list.

## Routes

`/v1/reliabilitylane/*` on Talocode Cloud (match 1 cr, retry-plan 1 cr, verify 1 cr, incident 2 cr).

## Related

https://github.com/talocode/reliabilitylane
