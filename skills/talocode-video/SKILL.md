# talocode-video

Create high-quality Talocode videos for releases, demos, product updates, and social distribution using Remotion, HyperFrames-style HTML video, ffmpeg, ClipLoop, and image→video tools when available.

## When to Use

Use this skill when creating **any** video content for Talocode ecosystem products:

- Release demo videos
- Product launch videos
- Feature showcase videos
- Tutorial videos
- Social media content
- Partnership announcement videos

## Hard requirements (always)

These are **mandatory** for every Talocode demo/release video. Do not ship without them.

| Rule | Requirement |
|------|-------------|
| **Duration** | **Exactly 60 seconds** (not 6s, not 30s). Target **60.0s ±0.5s**. |
| **Audio / soundtrack** | **Always** include a **compelling background soundtrack** mixed into the final MP4 as an **AAC (or MP3) audio track** — multi-layer music bed (bass + pulse + melody/atmosphere). Optional short **voiceover**. **Never silent.** Never ship a video with only a silent video stream. Validate with `ffprobe` that an audio stream exists. |
| **Hook** | First **1–3 seconds** must stop the scroll (pain, result, bold claim, real command). |
| **Scenes** | Multi-scene storyboard — **realistic product scenes** (terminal, API JSON, dashboards, code diffs), not a static title card for the whole minute. |
| **Captions** | Burned-in or high-contrast on-screen text readable on mobile. |
| **CTA** | Final 8–12s: install (`npm` / `pip`), GitHub, product name. |
| **Honesty** | Real commands/outputs only. No fake metrics or features. |

If a renderer path fails (e.g. no Remotion), still produce a **60s** ffmpeg multi-scene cut with **layered lavfi audio** (bass + pulse + arpeggio + soft pad). Silence is a failed deliverable.

## Core Principle

**"Attention is engineered, not accidental."**

## Attention Framework

**Hook → Retention → Emotion → Distribution**

### Hook (0–3s)

The first 1–3 seconds must stop the scroll.

**Good hooks:**
- Show the result first
- Show the pain immediately
- Start with a bold claim
- Start with a surprising before/after
- Show a real command/output fast
- Show the product doing something valuable immediately

**Avoid:**
- Slow intros
- Generic logo openings
- "Welcome to this demo"
- Long context before value
- Full-minute static title on a solid color

### Retention

Keep the viewer watching through pacing and curiosity.

**Rules:**
- One idea per scene
- Cut dead time
- Keep scenes short (typically **4–10s** each for a 60s piece)
- Use visible progress
- Use captions
- Show transformation
- Create open loops
- Make every 3–5 seconds visually earn attention
- Prefer **realistic scenes**: terminal, editor, JSON responses, CLI help, health checks, before/after findings

### Emotion

Make the viewer feel the pain, relief, ambition, speed, frustration, or possibility.

**Use:**
- Builder struggle
- Time saved
- Frustration removed
- "Finally" moments
- Real constraints
- Honest shipping energy
- Open-source mission

**Avoid:**
- Robotic neutral demos
- Feature lists without stakes
- Fake hype

### Distribution

Make the video easy to share across platforms.

**Rules:**
- Include clear takeaway
- Include product name visually
- Include install/link CTA
- Export for platform aspect ratios (16:9 primary; 9:16 cutdown optional)
- Make captions readable on mobile
- Make the first frame strong enough as a thumbnail

## Audio requirements (always)

### Background soundtrack (required)

Every demo / product launch video **must** have **audible music or designed score playing for the full 60s**, encoded as a real audio track in the file (users hear it when they press play).

This is **not optional**. A cinematic silent montage is a **failed** deliverable.

Every demo **must** mix a multi-layer background track for the **full 60s**:

1. **Low pad / drone** — atmosphere (not loud)
2. **Rhythmic pulse / kick or soft click** — forward motion
3. **Melodic or arpeggio layer** — interest (vary every 8–15s)
4. **Optional risers / hits** on scene cuts (subtle)
5. **Optional VO** (espeak/TTS or real voice) ducked under the score for the hook (0–12s)

**Canonical generator:** `scripts/generate-cinematic-demo.py`  
Produces Ken-Burns cinematic plates + layered AAC score (+ optional VO).

**ffmpeg lavfi example (interesting, not boring):**

```bash
# Layered synth score ~60s → score.m4a
ffmpeg -y -f lavfi -i "
sine=f=55:d=60,
sine=f=110:d=60,
sine=f=220:d=60,
sine=f=330:d=60
" -filter_complex "
[0:a]volume=0.12,lowpass=f=180[a0];
[1:a]volume=0.08,highpass=f=80,tremolo=f=0.5:d=0.4[a1];
[2:a]volume=0.05,tremolo=f=3:d=0.35[a2];
[3:a]volume=0.04,aecho=0.8:0.88:40:0.3[a3];
[a0][a1][a2][a3]amix=inputs=4:duration=longest,alimiter=limit=0.9
" -c:a aac -b:a 192k score.m4a
```

Better: use a **multi-frequency arpeggio** with `aevalsrc` / `sine` sequenced + soft noise bed, or remix an original score. Prefer **stereo AAC**.

### Mixing rules

- Background music under dialogue/SFX: **−18 to −24 LUFS** relative feel (music duck under VO)
- Never clip peaks
- Always mux: `-c:v copy` or re-encode with `-c:a aac -shortest` only if video is ≥60s; **pad or loop** score to cover full video length
- Final output **must have an audio stream** (`ffprobe` shows `Audio: aac` or similar)

### Forbidden audio

- Completely silent demos
- Single pure tone for 60s with no variation
- Copyrighted commercial music without license
- Loud noise that drowns captions

## Duration structure (fixed 60s)

Always use this skeleton (adjust product-specific copy):

| Time | Section | Visual job |
|------|---------|------------|
| **0–3s** | **Hook** | Pain or final result; product name appears |
| **3–12s** | **Pain** | Broken agent / secret leak / no retries / no eval |
| **12–40s** | **Product workflow** | Real CLI/SDK/API scenes; 3–5 beats |
| **40–50s** | **Proof** | Health/pricing, findings pass, install works |
| **50–60s** | **CTA** | `npm i @talocode/<product>`, GitHub, talocode.site |

**Minimum scene count:** 5 distinct visual scenes for 60s.

## Renderer Decision System

Choose the right renderer for your video:

### Remotion

**Use for:** React-based programmatic videos, reusable systems, complex motion.

### HyperFrames-style HTML

**Use for:** Quick agent-authored HTML/CSS compositions. (External tools only when required as technical deps — no competitor branding in Talocode artifacts.)

### ffmpeg (fallback — always available)

**Use for:** Multi-scene stills + kinetic text, stitching, **audio always**, captions, final 60s assemble.

**When to choose:** Default when Remotion/ClipLoop unavailable. Still must meet **60s + score + multi-scene** rules.

### ClipLoop

**Use for:** Talocode-native timeline / API-driven video when available.

### Image → video / Imagine

**Use for:** Realistic product hero plates (dashboard, terminal glow, abstract infra) as **scene backgrounds**, then composite text + audio into a **60s** final cut.

## Realistic scene guidance

Prefer scenes that look like real builder work:

- Dark terminal with real CLI (`npx …`, `health`, JSON pretty-print)
- Diff / findings tables for VerifyLane
- Trace spans / run IDs for TraceLane
- Schema pass/fail for HandoffLane
- Policy allow/deny for PolicyLane
- Retry classification for RetryLane
- Eval suite scores for EvalLane
- Code + constitution for StyleLane
- Not: one fullscreen logo for 60 seconds

If you cannot capture a live terminal, use **honest kinetic mockups** of real output formats (same field names as the product).

## Talocode Video Workflow

1. **Write the hook** — first 1–3 seconds copy
2. **Storyboard 5–8 scenes** covering the 60s table above
3. **Choose renderer**
4. **Build frames/scenes**
5. **Generate multi-layer background score** (required)
6. **Add captions**
7. **Mux audio + video → exactly ~60s**
8. **Validate** with checklist + `ffprobe`
9. **Attach to GitHub release**
10. **Post cutdowns** (optional 15–20s hooks for X — full demo remains 60s)

## Validation checklist (ship gate)

```bash
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 demo.mp4
ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 demo.mp4
```

Ship only if:

- [ ] Duration ≈ **60** seconds
- [ ] **Audio stream present**
- [ ] First 3s hook is clear without sound
- [ ] ≥5 scenes / visual changes
- [ ] Product name + install CTA visible
- [ ] No fake claims
- [ ] Captions readable on a phone-width crop

## Viral Readiness Checklist

- [ ] First 3 seconds create curiosity or value
- [ ] No generic intro
- [ ] Captions readable on mobile
- [ ] Every scene has one job
- [ ] Dead time removed
- [ ] Emotional reason to care
- [ ] Result/proof shown
- [ ] CTA visible
- [ ] Understood with sound off (captions) **and** better with sound on (score)
- [ ] Repurposable to ≥3 platforms

## Visual Style (Talocode Dark Theme)

```typescript
const COLORS = {
  background: '#1C1C1C',
  primary: '#58C4DD',
  secondary: '#83C167',
  accent: '#FFFF00',
  error: '#FF6B6B',
  text: '#FFFFFF',
  muted: '#888888',
};
const FONT = 'Monospace';
```

## Output Standards

- **Format**: MP4 (H.264 + AAC)
- **Resolution**: 1280×720 minimum; 1920×1080 preferred
- **Duration**: **60 seconds**
- **Captions**: Required for social
- **Audio**: **Required** multi-layer background score; VO optional
- **Claims**: Honest only
- **CLI demos**: Real command output when possible

## ffmpeg 60s multi-scene recipe (fallback)

```bash
# 1) Build 6 scene clips (~10s each) with drawtext on product-colored bg
# 2) concat demuxer → video_60.mp4
# 3) Generate layered score.m4a (60s)
# 4) Mux:
ffmpeg -y -i video_60.mp4 -i score.m4a -c:v libx264 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -shortest -t 60 release-assets/<product>-demo.mp4
```

Prefer scripts under product `scripts/generate-demo-video.sh` that encode this recipe.

## Attach to Release

```bash
gh release upload <tag> release-assets/<product>-demo.mp4 --clobber
```

## Rules

### No Fake Claims

- Don't show features that don't exist
- Don't claim "official integration" unless it is
- Don't show fake metrics or numbers
- Be honest about what's experimental

### No Overclaiming

- "Works with OpenAI" not "Best AI integration ever"
- "Self-hostable" not "Enterprise-ready"

### Show Real Output

- Use actual CLI output when possible
- Don't invent API fields

## Related skills

- `talocode-release` — full release checklist (demo video **required**, 60s + audio)
- Product skills under `skills/<product>/`

## Legacy

Previously `talocode-remotion-demo`. Wrapper remains at `skills/talocode-remotion-demo/SKILL.md`.
