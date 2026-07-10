# talocode-architecture-design

Shared vocabulary and process for designing deep modules and surfacing architecture improvements.

## Purpose

Provide a consistent language for codebase and API design based on **deep modules** — a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. Also provides a process for scanning codebases and presenting improvement candidates.

## When to Use

Use this skill when:
- Designing a new module, API, or interface
- Reviewing an existing module's interface for deepening opportunities
- Discussing where to place a seam or how to make code more testable
- Scanning a codebase for architectural friction
- Any discussion about code structure, coupling, or testability

## Glossary

Use these terms exactly — consistent language is the whole point.

**Module** — anything with an interface and an implementation. Scale-agnostic: a function, class, package, or tier-spanning slice.

**Interface** — everything a caller must know to use the module correctly: type signature, invariants, ordering constraints, error modes, configuration, performance characteristics.

**Implementation** — what's inside a module. Distinct from **Adapter**: a thing can be a small adapter with a large implementation or vice versa.

**Depth** — leverage at the interface: the amount of behaviour a caller can exercise per unit of interface they must learn. A module is **deep** when large behaviour sits behind a small interface; **shallow** when the interface is nearly as complex as the implementation.

**Seam** (Feathers) — a place where you can alter behaviour without editing in that place. Where a module's interface lives.

**Adapter** — a concrete thing that satisfies an interface at a seam. Describes role, not substance.

**Leverage** — what callers get from depth: more capability per unit of interface learned.

**Locality** — what maintainers get from depth: change, bugs, knowledge, and verification concentrate in one place.

## Deep vs Shallow

A deep module: small interface, lots of implementation.
A shallow module: large interface, little implementation (avoid).

When designing an interface, ask:
- Can I reduce the number of methods?
- Can I simplify the parameters?
- Can I hide more complexity inside?

## Principles

- **Depth is a property of the interface, not the implementation.** A deep module can be internally composed of small, swappable parts — they just aren't part of the interface.
- **The deletion test.** Imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't introduce a seam unless something actually varies across it.
- **Accept dependencies, don't create them.** Functions that instantiate their own deps are hard to test.
- **Return results, don't produce side effects.** Pure functions at the interface are maximally testable.

## Process: surfacing improvements

When asked to scan a codebase for architectural friction:

### 1. Explore

Walk the codebase organically. Note where you experience friction:
- Understanding one concept requires bouncing between many small modules
- Modules are shallow — interface nearly as complex as the implementation
- Pure functions extracted for testability but real bugs hide in how they're called
- Tightly-coupled modules leak across their seams
- Parts of the codebase are untested or hard to test through their current interface

Apply the **deletion test** to anything shallow.

### 2. Present candidates

List each candidate with:
- **Files involved**
- **Problem** — why the current architecture causes friction
- **Solution** — plain English description of the change
- **Benefits** — expressed in terms of locality and leverage
- **Recommendation strength** — Strong / Worth exploring / Speculative

Order by impact. Do not propose new interfaces yet — present findings first.

### 3. Design the fix

Once the user picks a candidate, use the glossary terms to reason about the redesign:
- Where does the seam go?
- What sits behind it?
- What adapter(s) satisfy the interface?
- What tests survive and what needs new tests?

During discussion, keep the domain model current: when naming a deepened module, add the term to `CONTEXT.md`. When recording hard-won decisions, offer an ADR.

## Constraints

- Use the glossary terms exactly — no drifting into "component", "service", "API", "boundary"
- The deletion test applies to every module under discussion
- Do not propose interfaces during the exploration phase — present findings first
- Do not re-litigate existing ADRs unless friction warrants it
- A seam without two adapters is hypothetical — mark it as such

## Validation Checklist

- [ ] Glossary terms used consistently throughout discussion
- [ ] Deletion test applied to suspected shallow modules
- [ ] Candidates prioritised by impact
- [ ] Domain terms updated in CONTEXT.md as decisions crystallise
- [ ] ADRs offered for hard-won trade-offs
- [ ] Interface and implementation responsibilities are distinct
- [ ] Test surface aligns with the external seam
