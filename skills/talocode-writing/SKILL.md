# talocode-writing

A three-phase writing methodology: **explore** (mine fragments) then **exploit** (commit to structure) through shaping or beats.

## Purpose

Guide the writing process from raw material to finished article using deliberate divergence/convergence separation. Avoids premature commitment to structure (the #1 writing failure mode for AI agents).

## When to Use

Use this skill when:
- The user wants to write an article, essay, blog post, or documentation
- Raw material exists (fragments, notes, transcript) but needs shaping
- The user has a topic but no structure yet
- A draft needs restructuring or rethinking

## Workflow

### Phase 1 — Explore: mine fragments

Run a conversation with the user that produces fragments. Do not impose structure, outlines, or phases. This is pure divergence.

A **fragment** is any piece of text that might survive into the final article. It must be readable by the author but does not need to be comprehensible to a cold reader. Examples:
- A sharp sentence or claim
- A vignette, scenario, analogy, or code snippet
- A half-thought: "something about how X feels like Y, work this out later"
- A quote, overheard line, or punchline
- A **leading word** — a compact metaphor the whole piece can hang on

Capture fragments from the very first thing the user says. Append them to a single markdown file separated by horizontal rules (`\n---\n`). No headings inside the body. No tags. No order beyond the order they were added.

Append silently — don't ask permission for each fragment. Re-read the file from disk before every write to preserve user edits.

**Completion criterion**: the user feels the pile has enough raw material. Do not move to Phase 2 without user agreement.

### Phase 2a — Shape: paragraph by paragraph (preferred for prose)

The user has a pile of raw material. Read it end-to-end. Then:

1. **Establish prerequisites** — settle with the user what the reader knows walking in. Every concept must be **grounded** (either a prerequisite or introduced by a block) before a later block can lean on it.
2. **Draft 2-3 candidate openings**, each implying a different thesis or angle. Force the user to pick.
3. **Grow paragraph by paragraph** — after each block lands, ask "given this opening, what does the reader need to hear next?" Pull material from the pile. Each format choice (prose, list, table, callout, code block) should be deliberate.
4. **Append immediately** as each block is agreed. Re-read the file before every write.

Grounding test: an ungrounded concept blocks the next move. Name the gap: "We need an example here and the pile doesn't have one."

### Phase 2b — Beats: choose-your-own-adventure (preferred for narrative)

Alternative exploit path. After establishing prerequisites:

1. Write 2-3 candidate **starting beats**. Each may only lean on grounded concepts. Preview what paths each pick unlocks.
2. Write only that beat to the article file.
3. Offer 2-3 candidate **next beats** — different directions. Each must be reachable from the current grounded set.
4. Loop until the article reaches a natural end.

A **beat** does one move — sets a scene, lands a point, asks a question. If it needs five paragraphs and three subheadings, it's two beats glued together — split it.

### Phase 3 — Polish

Once the structure is complete and the user approves:
- Check for dangling concepts that were grounded but never used
- Verify every concept referenced is grounded
- Trim fragments that didn't make it in (leftover pile is fine)
- Read aloud for rhythm
- Remove any placeholder notes or meta-commentary

## Constraints

- Never structure in Phase 1 (explore). Divergence first, convergence later.
- Re-read the file from disk before every write — the user may have edited between turns.
- Never overwrite blindly: only append or edit a specific fragment/block in place.
- The raw material file is read-only in exploit phases — do not edit it.
- A beat may only lean on grounded concepts.
- End when the journey is complete, not when the pile is empty.

## Validation Checklist

- [ ] Phase 1 produced fragments without imposing structure
- [ ] File format: H1 title, fragments separated by `\n---\n`, no body headings
- [ ] Prerequisites established with user before exploit phase
- [ ] Every concept referenced is grounded by the point of use
- [ ] Each paragraph/beat has a deliberate format choice
- [ ] Leftover fragments are acceptable (not forced in)
- [ ] Article reads as one voice (not a patchwork)
