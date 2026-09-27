---
name: talocode-video
description: Grok-grade Talocode product videos. Use when making a 60s demo, walkthrough, launch film, terminal tutorial, HyperFrames cut, or X/Instagram clip for Talocode, $TCODE, Cloud, or any Lane. Triggers include walkthrough, voiceover, subtitles, screen recording, Imagine-level video, hold-sign-ship, claim credits, OpenAI drop-in.
license: MIT
metadata:
  version: "0.3.0"
  bar: grok-imagine-plus-terminal
---

# talocode-video

Ship a **60.0s ±0.5s** film that would pass next to a Grok Imagine / HyperFrames cut. Static title cards for a full minute fail. Silent files fail. Fake CLI output fails.

## Quality bar (Grok-level)

Treat Imagine and HyperFrames as the visual ceiling. ffmpeg is the fallback that must still feel like a recorded laptop.

| Pass | Fail |
|------|------|
| First frame is a thumbnail | Logo on a flat field for >2s |
| Terminal or dashboard motion every 4–8s | Six posters of the same typeface |
| Full VO + burned captions | Captions only, or VO with no captions |
| Real URLs, mint, HTTP, JSON | Invented balances or fake model names |
| Score under VO, never clipping | Sine-wave loop that fights speech |
| 1920×1080 H.264 + AAC | 480p or missing audio stream |

## Renderer order

1. **HyperFrames** when quota exists — computer navigation, voiceover, captions on. Prompt must name real URLs only.
2. **Grok Imagine** for hero plates (terminal glow, desk, dashboard chrome). Never use Imagine to invent a mint or a wallet balance.
3. **ffmpeg terminal composer** when HyperFrames is 402. Typewriter CLI + real curl output + VO + SRT.

If HyperFrames returns 402, say so and still ship a terminal cut that matches Hold. Sign. Ship. density.

## Storyboard (fixed 60s)

| t | Job | Picture |
|---|-----|---------|
| 0–3 | Hook | Command or result, not a welcome |
| 3–12 | Citation | curl https://talocode.site/llms.txt and real first lines |
| 12–28 | Claim | mint 6ptxwABxQz8zMhwhiPeVgRgWjGMdVcEBFBv8v8C3ory, billing URL, do not transfer |
| 28–48 | Ship | export OPENAI_BASE_URL=https://api.talocode.site/v1 + curl chat completions |
| 48–60 | CTA | Hold. Sign. Ship. talocode.site/claim.html openai.html |

## Terminal honesty

Allowed on screen: official mint, llms.txt, dashboard billing, api.talocode.site/v1, models talocode/auto|fast|coding, credit tiers from tcode.html.
Forbidden: fake 200 bodies, invented balances, competitor logos, best API claims.

## Audio

Write VO first (max ~90 words). Voice connector with timestamps. Burn SRT. Duck lavfi score under VO. ffprobe must show Audio aac.

## Ship gate

Duration 59.5–60.5s, AAC present, captions readable on a phone, at least one real command, CTA last 10s, no placeholder homepage.

## Buffer

Buffer cannot pull Google Drive. Host on X CDN, HeyGen, or public HTTPS.
