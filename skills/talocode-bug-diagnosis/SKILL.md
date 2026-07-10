# talocode-bug-diagnosis

A 6-phase discipline for diagnosing hard bugs and performance regressions.

## Purpose

Provide a repeatable, feedback-loop-first process for diagnosing bugs. The core insight: build a **tight** (fast, deterministic, red-capable) signal for the bug before generating any hypotheses. Everything else follows mechanically.

## When to Use

Use this skill when:
- The user says "diagnose", "debug this", or reports something broken, throwing, failing, or slow
- Debugging a performance regression
- A bug is intermittent, hard to reproduce, or has survived initial attempts
- The codebase has no test coverage for the suspected area

## Workflow

### Phase 1 — Build a feedback loop

**This is the skill.** Everything else is mechanical. If you have a tight pass/fail signal for the bug — one that goes **red** on this bug — you will find the cause. If you don't, no amount of staring at code will save you.

Spend disproportionate effort here. Build the loop by trying these in roughly this order:

1. **Failing test** at whatever seam reaches the bug — unit, integration, e2e.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture input, diffing stdout against a known-good snapshot.
4. **Headless browser script** (Playwright / Puppeteer) — drives the UI, asserts on DOM/console/network.
5. **Replay a captured trace** — save a real network request / payload / event log to disk; replay through the code path.
6. **Throwaway harness** — spin up a minimal subset of the system that exercises the bug path.
7. **Property / fuzz loop** — for "sometimes wrong output", run 1000 random inputs.
8. **Bisection harness** — automate "boot at state X, check, repeat" so you can `git bisect run`.
9. **Differential loop** — run same input through old vs new version, diff outputs.

**Tighten the loop** once you have one:
- Faster? Cache setup, skip unrelated init, narrow test scope.
- Sharper signal? Assert on the specific symptom, not "didn't crash".
- More deterministic? Pin time, seed RNG, isolate filesystem, freeze network.

**Non-deterministic bugs**: goal is not a clean repro but a higher reproduction rate. Loop the trigger 100x, parallelise, add stress, narrow timing windows.

When you genuinely cannot build a loop, stop and say so explicitly. List what you tried. Ask for: (a) access to reproducing environment, (b) a captured artifact (HAR, log dump, core dump), or (c) permission to add temporary production instrumentation.

**Completion criterion**: you can name one command (a script path, test invocation, curl) that you have already run at least once, and that is:
- Red-capable — drives the actual bug code path and asserts the user's exact symptom
- Deterministic — same verdict every run
- Fast — seconds, not minutes
- Agent-runnable — you can run it unattended

### Phase 2 — Reproduce and minimise

Run the loop. Watch it go red. Confirm the loop produces the failure mode the **user** described — not a different failure nearby. Then shrink the repro to the smallest scenario that still goes red. Cut inputs, callers, config, data, and steps one at a time, re-running the loop after each cut.

Done when every remaining element is load-bearing — removing any one makes the loop go green.

### Phase 3 — Hypothesise

Generate **3-5 ranked hypotheses** before testing any of them. Each must be falsifiable: state what prediction it makes.

Format: "If <X> is the cause, then <changing Y> will make the bug disappear / <changing Z> will make it worse."

Show the ranked list to the user before testing. They often have domain knowledge that re-ranks instantly.

### Phase 4 — Instrument

Each probe must map to a specific prediction from Phase 3. Change one variable at a time.

Tool preference:
1. Debugger / REPL inspection — one breakpoint beats ten logs.
2. Targeted logs at boundaries that distinguish hypotheses.
3. Never "log everything and grep".

Tag every debug log with a unique prefix, e.g. `[DEBUG-a4f2]`. Cleanup at the end becomes a single grep.

**Perf branch**: for performance regressions, establish a baseline measurement first (timing harness, profiler, query plan), then bisect.

### Phase 5 — Fix and regression test

Write a regression test **before the fix** — but only if there is a correct seam for it (one that exercises the real bug pattern as it occurs at the call site). If no correct seam exists, that itself is the finding — the architecture is preventing the bug from being locked down.

If a correct seam exists:
1. Turn the minimised repro into a failing test at that seam.
2. Watch it fail.
3. Apply the fix.
4. Watch it pass.
5. Re-run the Phase 1 loop against the original (un-minimised) scenario.

### Phase 6 — Cleanup and post-mortem

Before declaring done:
- [ ] Original repro no longer reproduces
- [ ] Regression test passes (or absence of seam is documented)
- [ ] All `[DEBUG-...]` instrumentation removed
- [ ] Throwaway prototypes deleted
- [ ] The correct hypothesis is stated in the commit / PR message

Then ask: what would have prevented this bug? If the answer involves architectural change, hand off to `talocode-architecture-design` with the specifics.

## Constraints

- Never skip Phase 1 — no hypothesising without a tight loop
- Tag all debug instrumentation for cleanup
- One hypothesis test at a time — change one variable
- Do not commit debug logs or throwaway code
- For non-deterministic bugs, raise reproduction rate before hypothesising
- If no loop can be built, state the blocker explicitly

## Validation Checklist

- [ ] Phase 1 loop is tight, red-capable, and agent-runnable
- [ ] Minimised repro is load-bearing
- [ ] 3-5 ranked hypotheses generated before testing
- [ ] Each probe maps to a specific prediction
- [ ] Regression test written before fix (or absence documented)
- [ ] All instrumentation removed
- [ ] Post-mortem recorded
