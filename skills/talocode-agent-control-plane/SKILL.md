---
name: talocode-agent-control-plane
description: Gate agent tool calls, spend, policy, and verify output before merge using Talocode control-plane products.
---

# Talocode agent control plane

Use this skill whenever an agent is about to call tools, spend credits, or open a PR with generated code.

## Order of operations

1. **SpendCaps** — can we afford this action?
2. **GateLane** — is this tool allowed for this actor?
3. **PolicyLane** — role/tag policy + redact secrets from payloads
4. **Execute tool** (only if allowed)
5. **VerifyLane** — scan code/diff/agent output before merge
6. **Tera coding/review** (optional paid depth) for high-risk changes
7. **Skills** — package reusable agent instructions via Skills API

## Local (no key)

```bash
# GateLane open-source gateway
npx @talocode/gatelane demo

# VerifyLane
npx verifylane code --file ./src/app.ts

# Demo path
node demo/agent-control-plane/ship-demo-core.js
```

## Hosted (TALOCODE_API_KEY)

Base: `https://api.talocode.site`

```bash
# Guard tool call (denies dangerous tools by default)
curl -sS -X POST "$TALOCODE_BASE_URL/v1/gatelane/guard" \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tool":"shell.exec","actor":"agent-1","policies":[]}'

# Policy check
curl -sS -X POST "$TALOCODE_BASE_URL/v1/policylane/check" \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"action":"tool.shell","policy":{"defaultEffect":"deny","rules":[{"action":"tool.shell","effect":"deny"}]}}'

# Verify code
curl -sS -X POST "$TALOCODE_BASE_URL/v1/verifylane/code" \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text":"eval(x)"}'

# Spend cap
curl -sS -X POST "$TALOCODE_BASE_URL/v1/spendcaps/check" \
  -H "Authorization: Bearer $TALOCODE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"balanceCredits":100,"costCredits":5,"spentInWindow":10,"windowLimit":50}'
```

## Credits (approx)

| Action | Credits |
|--------|---------|
| gatelane.check | 2 |
| gatelane.guard | 3 |
| policylane.check | 2 |
| verifylane.code | 8 |
| spendcaps.check | 1 |
| skills generate repo | 100 |
| tera coding/review | 20 |

## Rules

- Default **deny** for write/shell/network-internal tools
- Never ship agent output with critical/high VerifyLane findings
- Prefer open-source CLIs for local; bill hosted power for team CI
- Do not name external competitor products in public Talocode copy
