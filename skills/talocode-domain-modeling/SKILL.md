# talocode-domain-modeling

Build, sharpen, and maintain a project's domain model — glossary, terms, context boundaries, and architectural decisions.

## Purpose

Actively build and sharpen a project's domain model as you design. Challenge terms, invent edge-case scenarios, and write the glossary and decisions down the moment they crystallise. Distinguishes between consuming the domain model (reading CONTEXT.md) and changing it (this skill).

## When to Use

Use this skill when:
- The user wants to pin down domain terminology
- Fuzzy or overloaded terms need sharpening
- An architectural decision with lasting impact is being made
- Multiple contexts exist and their boundaries need definition
- Domain terms in code conflict with conversational language

## Workflow

### 1. Establish the file structure

Most repos have a single context:
```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

If a `CONTEXT-MAP.md` exists at the root, the repo has multiple contexts. The map points to where each one lives.

Create files lazily — only when you have something to write.

### 2. Challenge against the glossary

When the user uses a term that conflicts with existing language in `CONTEXT.md`, call it out immediately. "Your glossary defines 'cancellation' as X, but you seem to mean Y — which is it?"

### 3. Sharpen fuzzy language

When the user uses vague or overloaded terms, propose a precise canonical term. "You're saying 'account' — do you mean the Customer or the User? Those are different things."

### 4. Discuss concrete scenarios

Stress-test domain relationships with specific scenarios that probe edge cases and force precision about concept boundaries.

### 5. Cross-reference with code

When the user states how something works, check whether the code agrees. If you find a contradiction, surface it: "Your code cancels entire Orders, but you just said partial cancellation is possible — which is right?"

### 6. Update CONTEXT.md inline

When a term is resolved, update `CONTEXT.md` right there. Do not batch. `CONTEXT.md` must be totally devoid of implementation details — it is a glossary, not a spec or scratch pad.

### 7. Offer ADRs sparingly

Only offer to create an ADR when all three are true:
1. **Hard to reverse** — the cost of changing your mind later is meaningful
2. **Surprising without context** — a future reader will wonder why
3. **Result of a real trade-off** — genuine alternatives with specific reasons for the choice

If any of the three is missing, skip the ADR.

### Creating a glossary (from scratch)

When extracting domain terms from a conversation:

1. Scan the conversation for domain-relevant nouns, verbs, and concepts.
2. Identify problems: ambiguity (same word, different concepts), synonyms (different words, same concept), overloaded terms.
3. Propose a canonical glossary with opinionated term choices.
4. Group terms into tables by natural clusters (subdomain, lifecycle, actor).
5. Include a relationship section and an example dialogue demonstrating precise usage.

Example glossary format:

```markdown
## Order lifecycle

| Term | Definition | Aliases to avoid |
|------|------------|------------------|
| **Order** | A customer's request to purchase | Purchase, transaction |
| **Invoice** | A request for payment after delivery | Bill, payment request |

## Relationships

- An **Order** produces one or more **Invoices**
- An **Invoice** belongs to exactly one **Customer**
```

## Constraints

- `CONTEXT.md` is a glossary only — no implementation details, specs, or scratch content
- Update CONTEXT.md inline as terms resolve, not batched
- ADRs require all three conditions (hard to reverse, surprising, real trade-off)
- One-liner definitions: define what a term IS, not what it does
- Only include terms relevant for domain experts — skip generic programming concepts
- `CONTEXT.md` should be usable by any skill for vocabulary reference
- Multiple contexts (CONTEXT-MAP.md) keep their own CONTEXT.md and docs/adr/

## Validation Checklist

- [ ] CONTEXT.md exists (or created lazily when first term emerges)
- [ ] All terms have one-sentence definitions (what it IS, not what it does)
- [ ] Fuzzy/conflicting terms are flagged before proceeding
- [ ] Glossary is grouped into natural tables (not one flat list)
- [ ] Relationships documented with cardinality
- [ ] Example dialogue written when glossary is created from scratch
- [ ] ADRs only created when all three conditions are met
- [ ] Implementation details are absent from CONTEXT.md
