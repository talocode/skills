# talocode-skill-creator

Standardize how new Talocode skills are created. A skill exists to wrangle determinism out of a stochastic system — **predictability** (the agent taking the same process every run) is the root virtue.

## Purpose

Provide a template and workflow for creating consistent, high-quality Talocode skills with progressive disclosure, leading words, and failure-mode awareness.

## When to Use

Use this skill when:
- Creating a new Talocode skill from scratch
- Reviewing or refactoring an existing skill
- Unsure whether to split a skill or keep it together
- Diagnosing why a skill underperforms (premature completion, sprawl, no-ops)

## Skill Structure

### Required Sections

1. **# Skill Name**
2. **## Purpose** - What the skill does
3. **## When to Use** - Use cases
4. **## Workflow** - Step-by-step process
5. **## Constraints** - Rules and limitations
6. **## Validation Checklist** - Quality checks

### Optional Sections

- **## Examples** - Concrete examples
- **## Anti-patterns** - What to avoid
- **## Notes** - Additional context

## Skill Template

```markdown
# talocode-[name]

[One-line purpose]

## Purpose

[Detailed purpose]

## When to Use

Use this skill when:
- [Use case 1]
- [Use case 2]

## Workflow

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Constraints

- [Rule 1]
- [Rule 2]

## Validation Checklist

- [ ] [Check 1]
- [ ] [Check 2]

## Notes

- [Additional context]
```

## Information Hierarchy

Structure skill content on a ladder ranked by how immediately the agent needs the material:

1. **In-skill step** — ordered actions in `SKILL.md`. Each step ends on a **completion criterion** that tells the agent the work is done. Make it checkable and exhaustive — a vague criterion invites premature completion.
2. **In-skill reference** — definitions, rules, or facts in `SKILL.md`, consulted on demand.
3. **External reference** — reference pushed out of `SKILL.md` into a sibling file (e.g. `GLOSSARY.md`), reached by a **context pointer** that loads only when fired.

Push less-critical material down the ladder so the top stays legible (**progressive disclosure**). Keep what every branch needs inline; push behind a pointer what only some branches reach.

## Leading Words

A **leading word** is a compact concept already living in the model's pretraining that the agent thinks with while running the skill (e.g. _seam_, _fog of war_, _tight loop_). It accumulates a distributed definition and anchors a whole region of behaviour in fewer tokens than spelling it out.

Hunt for opportunities to refactor skills to use leading words. A triad spelled out in three places is a passage begging to collapse into a single token. Examples:

- "fast, deterministic, low-overhead" → _tight_
- "a loop you believe in" → _red_ (the loop goes red on the bug, or it doesn't)

You win twice: fewer tokens, and a sharper hook for the agent to hang its thinking on.

## When to Split (Granularity)

Split a skill only when the cut earns it:

- **By invocation** — split off a skill when it has a distinct leading word that should trigger it on its own, or another skill must reach it. You pay context load for the new always-loaded description.
- **By sequence** — split a run of steps when the steps still ahead tempt the agent to rush the one in front of it (**premature completion**). Hiding post-completion steps encourages more legwork on the current task.

## Pruning

Keep each meaning in a **single source of truth** — one authoritative place so changing behaviour is a one-place edit. Check every line for relevance. Then hunt **no-ops** sentence by sentence: run the no-op test on each sentence in isolation. When one fails, delete the whole sentence rather than trim words from it.

## Failure Modes

Use these to diagnose issues with skills:

- **Premature completion** — ending a step before it's genuinely done, attention slipping to being done. Defence: sharpen the completion criterion first (cheap, local); only if it's irreducibly fuzzy and you observe the rush, hide post-completion steps by splitting.
- **Duplication** — the same meaning in more than one place. Costs maintenance and tokens, inflating prominence past its real rank.
- **Sediment** — stale layers that settle because adding feels safe and removing feels risky. The default fate of any skill without a pruning discipline.
- **Sprawl** — a skill too long, even when every line is live and unique. Cure: disclose reference behind pointers, split by branch or sequence.
- **No-op** — a line the model already obeys by default. Test: does it change behaviour versus the default? A weak leading word (the agent already checks quality by default, so telling it to "check quality" adds nothing) is a no-op; fix is a stronger word, not a different technique.
- **Negation** — steering by prohibition backfires. Prompt the positive — state the target behaviour so the banned one is never spoken. Keep a prohibition only as a hard guardrail you can't phrase positively, and pair it with what to do instead.

## Quality Rules

### Must Have
- Clear purpose statement
- Specific use cases
- Actionable workflow with completion criteria
- Validation checklist
- Leading words where patterns repeat
- Local-first, approval-first philosophy

### Must Not Have
- Generic advice (no-ops)
- Copied content
- Vague instructions
- Negation-based steering (state what TO do)
- Cloud-only dependencies (local mode must work)

## Validation Checklist

Before publishing a skill:
- [ ] Purpose is clear
- [ ] Use cases are specific
- [ ] Workflow steps have completion criteria
- [ ] Leading words replace repeated descriptions
- [ ] No no-op phrases (run `scripts/audit-skill-noops.mjs`)
- [ ] Constraints are defined
- [ ] Validation checklist exists
- [ ] No copied content
- [ ] Examples are relevant
- [ ] Local mode works without API key
- [ ] Approval-first for destructive actions
