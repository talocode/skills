---
name: talocode-tutorial-video
description: Create step-by-step tutorial videos for Talocode products — from an outcome and prerequisites through numbered teaching scenes, pauses for comprehension, and a recap. Use when recording a how-to, walkthrough, course lesson, or setup guide (as opposed to a 60s marketing demo). Not for short social demos, which use talocode-video.
---

# talocode-tutorial-video

Create step-by-step tutorial videos that teach a real Talocode workflow so the viewer can reproduce it after watching.

## When to Use

Use this skill when:

- Recording a how-to, setup guide, or course lesson for a Talocode product
- The viewer must follow along and reproduce the steps themselves
- The goal is understanding and skill transfer, not a marketing click
- The material needs more than 60 seconds and longer scene dwell times

Do **not** use this skill for 60s product demos, launch videos, or social Shorts — those use `talocode-video`.

## What Is Different From talocode-video

| Rule | `talocode-video` (demo) | `talocode-tutorial-video` (tutorial) |
|------|--------------------------|--------------------------------------|
| Duration | Fixed 60s | As long as the lesson needs (3–15 min typical) |
| Structure | Hook → Pain → Install → CTA | Outcome → Prereqs → Steps → Recap |
| Scene pace | 4–10s, fast cuts | 15–60s, follow-along dwell time |
| Pacing driver | Attention/retention | Comprehension and reproduction |
| Ending | Install / conversion CTA | Recap + one clear next step |
| Screen content | Proof and results | The actual actions, keystroke by keystroke |

## Core Principle

**"The viewer can replay it until it works."** Every step must be visible, numbered, and reproducible from what is on screen.

## Tutorial Structure

### 1. Outcome (0–30s)

State in one sentence what the viewer will be able to do by the end.

```text
By the end of this video you will be able to:
```

- Keep it to **one** outcome.
- Show the finished result as a 3–5s preview so the viewer knows the destination.
- Do not start with a long preamble, company intro, or feature list.

### 2. Prerequisites (30–60s)

List everything needed before starting:

- Runtime or tool version (for example, `node >= 18`, `codex` installed)
- Accounts or credentials required (never show secrets on screen)
- Repos or files to clone/download
- A one-line "test that it works" check so the viewer can confirm setup

### 3. Steps (the body)

Number every step. One action per step.

```text
Step 1: <one visible action>
Step 2: <next visible action>
...
```

Rules:

- Show the **real command or click** with its real output before explaining it.
- Keep each step on screen long enough to follow along and pause.
- Repeat nothing; restate only what changes between steps.
- Use on-screen markers (numbers, arrows, highlights) tied to the step number.
- If a step can fail, show the expected error and how to recover before moving on.
- Do not skip input the viewer must type. If you abstract it away, say so explicitly.

### 4. Recap

Close the loop in 15–30s:

- Restate the one outcome.
- Repeat the 2–3 commands or actions that matter most.
- Point to the one next step (related tutorial, docs page, or product), not a hard-sell CTA.

## Pacing Rules

- **15–60s per step** depending on complexity; never rush a command on screen.
- Cut only dead time (waiting, typing silence, false starts), not comprehension time.
- Pause briefly after each completed step so the viewer can catch up.
- Use one idea per scene; if a scene does two things, split it.

## Audio

- **Required:** a real voiceover explaining each step as it happens, or clearly written on-screen captions — the viewer must be able to follow without guessing.
- Background music optional and always low (−24 to −18 LUFS relative to VO) so it never competes with instruction.
- Never silent.
- Validate the final file has an audio stream (`ffprobe` shows `Audio: aac`).

## Captions

- Burned-in or high-contrast, readable on a phone-width crop.
- Show commands verbatim in a monospace style.
- Match captions to the exact action on screen.

## Renderer

Use the same rendering options as `talocode-video` (Remotion, HTML, ffmpeg, ClipLoop), whichever is available and suits the material. Prefer real screen capture for actual tool usage so every keystroke is honest. Still frames with typed text are acceptable only when the real tool is unavailable.

## Honesty

- Real commands and real outputs only. No fake results.
- If a step depends on a version or platform, show the version.
- Do not claim features that do not exist.

## Validation Checklist (ship gate)

```bash
ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 tutorial.mp4
ffprobe -v error -select_streams a -show_entries stream=codec_type -of csv=p=0 tutorial.mp4
```

- [ ] States one outcome in the first 30 seconds.
- [ ] Lists prerequisites before starting.
- [ ] Every step is numbered and shows the real action + output.
- [ ] Steps are on screen long enough to follow and pause.
- [ ] Expected errors and recovery shown where relevant.
- [ ] Captions readable on a phone-width crop.
- [ ] Audio stream present.
- [ ] Recap restates the outcome and one next step.
- [ ] No fake commands, outputs, or features.

## Final Report Fields

Report every produced tutorial with these fields:

```text
Tutorial:
Product:
Outcome:
Prerequisites:
Number of steps:
Duration:
Voiceover or captions:
Next step for viewer:
Approved by:
```

Completion criterion: the report contains every field above before the tutorial is published.

## Related skills

- `talocode-video` — 60s marketing demos and product launch videos
- `talocode-release` — release checklist (demo video required; tutorial optional)
- Product skills under `skills/<product>/` for accurate workflow steps
