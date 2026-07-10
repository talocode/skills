# talocode-wayfinder

Plan large multi-session efforts as a shared map of investigation tickets, resolved one at a time until the route is clear.

## Purpose

Break down work too large for one agent session into a **shared map** — a structured plan on the issue tracker that charts the unknown (fog of war) and resolves decisions one ticket at a time.

## When to Use

Use this skill when:
- A task is too large for a single agent session
- The route from here to the destination isn't visible yet
- Multiple sessions or collaborators need to share a plan
- The scope of work is uncertain and needs progressive elaboration

## Workflow

### Phase 1 — Charter the map

1. **Name the destination.** Grill the user to pin down what success looks like: a spec, a decision, a shipped change. The destination fixes the scope.
2. **Map the frontier.** Grill breadth-first across the whole space, surfacing open decisions and first takeable steps. If no fog remains and the whole journey fits one session, you don't need a map — stop.
3. **Create the map** as a single issue on the repo's issue tracker, labelled `wayfinder:map`. Body format:

```markdown
## Destination

<what reaching the end of this map looks like>

## Notes

<domain context, skills to consult, standing preferences>

## Decisions so far

- [<closed ticket title>](link) — <one-line gist>

## Not yet specified

<in-scope questions not yet sharp enough to ticket>

## Out of scope

<work ruled beyond the destination>
```

4. **Create tickets you can specify now** as child issues. Wire blocking edges in a second pass (issues need ids first). Everything you can't specify stays in the fog — the **Not yet specified** section.

### Phase 2 — Work through the map

Never resolve more than one ticket per session.

1. **Load the map** — the low-res view, not every ticket body.
2. **Choose the ticket.** If the user named one, use it. Otherwise take the first frontier ticket (open, unblocked, unclaimed).
3. **Claim it** — assign it to yourself before any work, so concurrent sessions skip it.
4. **Resolve it** — zoom as needed: fetch related ticket bodies, invoke relevant skills. Use grilling and domain-modeling when in doubt.
5. **Record the resolution** — post the answer as a comment, close the issue, and append a line to Decisions so far.
6. **Update the map** — add newly surfaced tickets, graduate fog from Not yet specified into new tickets, clear each graduated patch.

### Ticket types

Each ticket carries a `wayfinder:<type>` label:

- **Research** (AFK): reading documentation, third-party APIs. Creates a markdown summary.
- **Prototype** (HITL): raise discussion fidelity with a cheap concrete artifact via the prototype skill.
- **Grilling** (HITL): conversation, one question at a time. The default.
- **Task** (HITL or AFK): manual work that must happen before a decision can be made.

### Fog of war

The map is deliberately incomplete. Don't chart what you can't yet see. Beyond the live tickets lies the fog — decisions you know are coming but can't pin down because they hang on open questions.

Test: can you state the question precisely now? If yes, it's a ticket (blocked or not). If no, it goes in **Not yet specified**.

The fog only ever gathers toward the destination. Work beyond the destination is **out of scope** — it isn't fog, and it doesn't go in Not yet specified.

## Constraints

- Never resolve more than one ticket per session
- The destination fixes the scope — scope does not expand during wayfinding
- A ticket is only ready if its question can be stated precisely, even if the answer is unknown
- Claim a ticket before working it (assign to self)
- The map is an index, not a store — decisions live in their ticket, not restated in the map
- Do not pre-slice fog into ticket-sized pieces — wait until the frontier reaches it
- Out-of-scope work never graduates (unless the destination is redrawn)

## Validation Checklist

- [ ] Destination is named and scoped before tickets are created
- [ ] Fog is clearly split into Not yet specified vs Out of scope
- [ ] Each ticket has a precise question and type label
- [ ] Blocking edges are wired (native tracker dependency or fallback)
- [ ] Map is the index, not a duplication of ticket content
- [ ] Only one ticket resolved per session
- [ ] Decisions so far has a line for each closed ticket
