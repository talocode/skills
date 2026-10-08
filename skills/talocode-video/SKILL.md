---
name: talocode-video
description: "Professional Talocode launch films with visible motion, full voiceover, and burned captions. Use for product demos, walkthroughs, and social clips. Not for static title cards."
license: MIT
metadata:
  version: "0.4.0"
---

# talocode-video

Ship a film a person can see moving with the sound on. A still card is a failed render.

## Motion gate

Sample three frames at 2s, 8s, and 16s. If the pixels do not change, reject the cut and render the ffmpeg kinetic composer. HyperFrames is allowed only when the preview shows movement. A processing widget is not a finished video.

## Required

- Full voiceover, written first, then timestamps.
- Burned captions that follow the voice.
- A usage demo: the command, the HTTP 402, the spend cap, the $TCODE fee, the wallet sign.
- 1920x1080, H.264, AAC, faststart.
- Real mint `6ptxwABxQz8zMhwhiPeVgRgWjGMdVcEBFBv8v8C3ory`. Do not invent a completed transfer.

## Composer

1. Generate the voiceover.
2. Draw frames where at least one element moves every second: terminal slide, fee card, scan line, caption.
3. Mux voiceover. Probe for both h264 and aac before posting.
