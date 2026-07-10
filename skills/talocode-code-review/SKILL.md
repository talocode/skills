# talocode-code-review

Two-axis code review via parallel sub-agents: **Standards** (does the code follow documented conventions?) and **Spec** (does the code match the spec?).

## Purpose

Review changes along two independent axes using parallel sub-agents so one axis doesn't mask the other. A change can pass Standards and fail Spec (implements the wrong thing correctly) or pass Spec and fail Standards (implements the right thing messily).

## When to Use

Use this skill when:
- The user wants to review a branch, PR, or work-in-progress changes
- The user asks to "review since" a commit, tag, or branch
- Reviewing changes before merging

## Workflow

### 1. Pin the fixed point

Determine the diff basis. If the user didn't specify, ask. Capture:
- `git diff <fixed-point>...HEAD` (three-dot merge-base comparison)
- `git log <fixed-point>..HEAD --oneline`

Confirm the fixed point resolves and the diff is non-empty before proceeding.

### 2. Identify the spec source

Look for the originating spec, in order:
1. Issue references in commit messages (#123, Closes #45) — fetch the issue.
2. A path the user passed as argument.
3. A PRD/spec file under `docs/`, `specs/`, or `.scratch/`.
4. If nothing is found, the Spec axis will report "no spec available".

### 3. Identify standards sources

Find any files documenting how code should be written — `CODING_STANDARDS.md`, `CONTRIBUTING.md`, `.editorconfig`, linter configs.

The Standards axis always carries this baseline of Fowler code smells, overridden by documented repo standards:

- **Mysterious Name** — function/variable/type name doesn't reveal its purpose
- **Duplicated Code** — same logic shape in multiple hunks/files
- **Feature Envy** — method reaches into another object's data more than its own
- **Data Clumps** — same fields/params travelling together (a type wanting to be born)
- **Primitive Obsession** — primitive/string for a domain concept deserving its own type
- **Repeated Switches** — same switch/if-cascade on the same type recurs
- **Shotgun Surgery** — one logical change forces scattered edits across files
- **Divergent Change** — one file edited for several unrelated reasons
- **Speculative Generality** — abstractions for needs the spec doesn't have
- **Message Chains** — long `a.b().c().d()` navigation
- **Middle Man** — class/function that mostly delegates onward
- **Refused Bequest** — subclass ignores most of what it inherits

### 4. Spawn both sub-agents in parallel

Send a single message with two parallel agent calls:

**Standards sub-agent**: receives the diff, commit list, standards source files, and the full smell baseline. Reports per-file where the diff violates a documented standard (cite the rule) and any baseline smells (name and quote the hunk). Distinguishes hard violations from judgement calls. Under 400 words.

**Spec sub-agent**: receives the diff, commit list, and spec. Reports: (a) requirements missing or partial, (b) behaviour not asked for (scope creep), (c) requirements that look implemented wrong. Quotes the spec line for each. Under 400 words.

### 5. Aggregate

Present the two reports under `## Standards` and `## Spec` headings verbatim. Do not merge or rerank findings — the two axes are deliberately separate.

End with a one-line summary per axis: total findings and the worst issue within each axis. Do not pick a single winner across axes.

## Constraints

- Standards and Spec are reviewed by separate sub-agents in parallel
- The repo's documented standards always override the smell baseline
- Baseline smells are always judgement calls, never hard violations
- Skip anything tooling already enforces
- If no spec is available, note this in the report — do not fabricate one
- Do not merge or rerank findings across axes

## Validation Checklist

- [ ] Fixed point confirmed and diff is non-empty
- [ ] Spec source identified (or "no spec available" noted)
- [ ] Standards sources identified from the repo
- [ ] Two parallel sub-agents spawned in one message
- [ ] Standards report distinguishes hard violations from judgement calls
- [ ] Spec report distinguishes missing, scope creep, and wrong implementations
- [ ] Reports presented separately under ## Standards and ## Spec
- [ ] Summary per axis without cross-axis reranking
