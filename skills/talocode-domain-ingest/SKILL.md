---
name: talocode-domain-ingest
description: Domain onboarding for agents — ingest YouTube channels into Talocode Wiki, extract durable claims, fact-check, recency-check, and file notes. Run first on any new domain; pair with deep research and social scans.
version: 0.1.0
license: MIT
compatibility:
  - cursor
  - claude-code
  - opencode
  - codra
  - codex
---

# talocode-domain-ingest

**Domain onboarding for agents.** When you enter a domain you have never shipped in, do not start with a single prompt. Build a knowledge base first.

This skill ingests public YouTube channel material into **[Talocode Wiki](https://github.com/talocode/talocode-wiki)** (plain Markdown), then runs a strict transcript loop:

1. Extract what is worth keeping  
2. Fact-check claims  
3. Confirm claims still hold today  
4. File durable notes into the wiki  

Pair with deep research subagents and recent social scans (SearchLane / XSearchLane). Deep research is where time and money go — and it shows in everything built after.

## Why this exists (growth)

Agents that only prompt-on-the-fly produce thin products and thin content. Agents that **ingest → verify → file → query** ship:

- Sharper product decisions (fewer reinvented wheels)
- Higher-signal Shorts and tutorials (hooks grounded in real pain)
- Faster domain entry for new Talocode lanes
- A reusable wiki that compounds across sessions

## When to use

- Taking on a domain the team (or agent) has never owned  
- Researching a content niche before a Talocode video sprint  
- Preparing a new product launch with competitive landscape context  
- Building a wiki domain pack for Codra / agent hosts  

## When NOT to use

- To copy scripts, thumbnails, or reupload third-party videos  
- To scrape private / authenticated content  
- To mass-produce low-value rehashes of creator claims without verification  
- To publish wiki notes that still say `status: unverified` as product truth  

## Prerequisites

```bash
# Knowledge base
npm install -g @talocode/wiki   # or: pip install talocode-wiki

# Public video metadata + captions (local tool)
# yt-dlp must be on PATH

# Optional research siblings
npm install -g @talocode/searchlane @talocode/xsearchlane
```

```bash
wiki init -d ./wiki
```

## Core workflow

### Phase 0 — Domain brief (5 minutes)

Write `wiki/domains/<domain>.md` with:

- Domain name and one-sentence scope  
- Audience (who feels the pain)  
- Success metric for this research sprint  
- Out-of-scope list  
- Seed questions (5–10)  

Do **not** start ingesting until the brief exists.

### Phase 1 — Parallel fleet (kick off together)

In one planning turn, start three tracks:

| Track | Tool | Job |
|-------|------|-----|
| **A. Channel ingest** | this skill + `scripts/ingest-channel.mjs` | Transcripts → extract candidates |
| **B. Deep research** | SearchLane / web research subagents | Primary sources, docs, standards |
| **C. Social scan** | XSearchLane / recent social scrape | What people complain about *now* |

Rule: **A without B/C bakes in creator blind spots.** Always cross-check.

### Phase 2 — Channel ingest (Track A)

```bash
# List recent public videos (metadata only)
node skills/talocode-domain-ingest/scripts/ingest-channel.mjs list \
  --channel "https://www.youtube.com/@SomePublicChannel" \
  --limit 30 \
  --out ./wiki/raw/<domain>/manifest.json

# Download public auto-captions / subtitles when available
node skills/talocode-domain-ingest/scripts/ingest-channel.mjs fetch \
  --manifest ./wiki/raw/<domain>/manifest.json \
  --out ./wiki/raw/<domain>/transcripts

# Walk each transcript through the extract → verify → file loop
node skills/talocode-domain-ingest/scripts/ingest-channel.mjs process \
  --transcripts ./wiki/raw/<domain>/transcripts \
  --domain <domain> \
  --wiki ./wiki
```

`process` writes:

- `wiki/sources/yt-<channel>/<video-id>.md` — source page with raw extract  
- `wiki/domains/<domain>/claims/*.md` — claim cards with verification status  
- Updates `wiki/hot.md` with sprint context  

If captions are missing, skip the video and log it — do not invent a transcript.

### Phase 3 — Transcript loop (per video)

For every transcript, produce a **claim set**, not a summary dump.

#### 3a. Extract (what is worth keeping)

Keep only:

- Concrete problems with audience language  
- Repeatable workflows / checklists  
- Quantitative claims (with numbers)  
- Tooling patterns (neutral — no third-party brand worship in Talocode product copy)  
- Failure modes and anti-patterns  

Drop:

- Intros, sponsor reads, CTAs, jokes  
- Vague motivation  
- Anything that only works as video performance  

Template: `templates/claim-card.md`

#### 3b. Fact-check

For each claim:

| Status | Meaning |
|--------|---------|
| `supported` | Independent primary source agrees |
| `contested` | Sources disagree |
| `creator-only` | Only this video asserts it |
| `false` | Contradicted by reliable sources |
| `stale` | Was true; no longer holds |

Prefer: official docs, RFCs, package README, measured benchmarks, primary papers.

Never mark `supported` from another video alone.

#### 3c. Recency check (“still holds today”)

- Date the claim  
- Check current docs / changelog / package versions  
- If APIs renamed or defaults changed → `stale` + note upgrade path  
- Social scan: are people still hitting this pain this month?  

#### 3d. File the note

Wiki note frontmatter (required):

```yaml
---
title: <short claim title>
domain: <domain>
status: supported | contested | creator-only | false | stale
confidence: low | medium | high
sources:
  - type: youtube
    id: <video_id>
    url: https://www.youtube.com/watch?v=<id>
  - type: web
    url: <primary source>
retrieved: <ISO date>
tags: [domain, topic]
---
```

Body:

1. Claim (one sentence)  
2. Why it matters to builders  
3. Evidence  
4. Counter-evidence / limits  
5. Talocode product angle (optional — only if genuine)  
6. Open questions  

Then:

```bash
wiki ingest ./wiki/domains/<domain>/claims/<slug>.md -d ./wiki
# or keep files in place if already under wiki/
wiki lint -d ./wiki
```

### Phase 4 — Synthesize domain pack

After N videos + research + social:

1. `wiki/domains/<domain>/index.md` — map of topics  
2. `wiki/domains/<domain>/playbook.md` — what we will build / publish  
3. `wiki/hot.md` — paste the 10 highest-confidence claims for session boot  
4. Content angles for Talocode Shorts (problem-led, one destination)  
5. Product gaps (features the market asks for that Talocode can own)  

### Phase 5 — Query before you invent

Before coding or scripting:

```bash
wiki query "common failure modes in <domain>" -d ./wiki
wiki query "what still holds about <topic> in 2026" -d ./wiki
```

If the wiki is empty for the question, extend ingest — do not hallucinate.

## Growth playbook (Talocode)

Use this skill to accelerate distribution **without** cloning creators:

| Input | Output |
|-------|--------|
| Niche channel pain language | Shorts hooks that name the real failure |
| Contested claims | Tutorial angles that show *proof* |
| Stale advice | “What changed” content that builds trust |
| Creator-only workflows | First-party Talocode tools/skills that encode the durable part |

Rules (non-negotiable):

- No third-party product names in Talocode public copy when avoidable  
- No reuploaded or lightly rewritten third-party videos  
- Every public claim must be supportable from our demo or primary docs  
- One destination per Short (docs, package, or product page)  

## Agent checklist

- [ ] Domain brief written  
- [ ] Parallel fleet started (channel + research + social)  
- [ ] Manifest of videos listed (limit enforced)  
- [ ] Captions fetched where available; misses logged  
- [ ] Each video ran extract → fact-check → recency → file  
- [ ] Claim statuses set honestly (`creator-only` is OK)  
- [ ] Domain index + playbook written  
- [ ] `wiki lint` clean enough to use  
- [ ] `wiki/hot.md` updated for the next session  

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/ingest-channel.mjs` | list / fetch / process channel captions into wiki |
| `scripts/claim-from-transcript.mjs` | single-transcript extract scaffold |
| `templates/claim-card.md` | claim note template |
| `templates/domain-brief.md` | domain brief template |
| `templates/domain-playbook.md` | synthesis playbook template |

## Related Talocode skills / packages

- [talocode-wiki](https://github.com/talocode/talocode-wiki) — knowledge base  
- `talocode-youtube-intelligence` — original content plans (use **after** domain ingest)  
- SearchLane — web research  
- XSearchLane — recent social signals  
- LeanLane — keep agent builds minimal once research is done  
- Codra — coding agent that should load `wiki/hot.md` at session start  

## Safety

- Public data only  
- Respect site/YouTube terms; rate-limit fetches  
- Do not store secrets from transcripts  
- Attribution in wiki source pages; do not plagiarize into product docs  
- Prefer linking primary sources over quoting long transcript blocks  

## Success criteria

A domain ingest sprint is successful when:

1. A new agent session can answer 5 seed questions from the wiki alone  
2. At least 30% of claims are `supported` or `stale` with upgrade notes (not all `creator-only`)  
3. A publishable content or product angle exists that is **original** and **demoable**  
4. Time-to-first-useful-diff or time-to-first-script drops vs cold prompting  

---

More: [github.com/talocode](https://github.com/talocode) · [talocode.site](https://talocode.site) · [docs.talocode.site](https://docs.talocode.site)
