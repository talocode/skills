# Video Renderers

Guide for choosing the right video renderer for Talocode projects.

## Overview

Talocode supports multiple video rendering approaches:

- Remotion
- HyperFrames (external)
- ffmpeg
- ClipLoop

## Remotion

**What it is:** React-based programmatic video creation framework.

**When to use:**
- Building videos with React components
- Need programmatic animations
- Want TypeScript support
- Creating reusable video templates
- Complex data visualizations

**Install:**
```bash
npm install remotion @remotion/cli @remotion/renderer
```

**Example:**
```bash
npx remotion render src/Video.tsx demo.mp4
```

**Limitations:**
- Requires React knowledge
- Heavier than plain HTML
- Build step required

**Maintained by:** Remotion team (external)

## HyperFrames (External)

**What it is:** HTML-to-video rendering framework for agents.

**When to use:**
- Agent-authored HTML compositions
- Quick browser-renderable videos
- Landing-page-style motion graphics
- Data/story videos

**Install:**
```bash
npx skills add heygen-com/hyperframes
```

**Example:**
```bash
npx hyperframes render index.html
```

**Limitations:**
- External (not maintained by Talocode)
- Requires browser environment
- Experimental integration

**Maintained by:** HeyGen (external)

## ffmpeg

**What it is:** Command-line video processing tool.

**When to use:**
- Stitching clips
- Adding audio
- Transcoding
- Trimming
- Caption burn-in
- Format conversion
- Fallback rendering

**Install:**
```bash
# macOS
brew install ffmpeg

# Ubuntu
sudo apt install ffmpeg

# Windows
choco install ffmpeg
```

**Example:**
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='Title':fontsize=72" output.mp4
```

**Limitations:**
- No programmatic composition
- Requires command-line knowledge
- Limited animation capabilities

**Maintained by:** FFmpeg team (external)

## ClipLoop

**What it is:** Talocode's own video engine.

**When to use:**
- Building Talocode-native videos
- Timeline-based editing
- API-driven video creation
- Future hosted rendering

**Status:** Experimental / In Development

**Limitations:**
- Not yet fully implemented
- Limited rendering backends
- No hosted API yet

**Maintained by:** Talocode

## Choosing a Renderer

| Use Case | Recommended Renderer |
|----------|---------------------|
| React component video | Remotion |
| Quick HTML composition | HyperFrames |
| Clip stitching | ffmpeg |
| Timeline editing | ClipLoop |
| Agent-authored video | HyperFrames or Remotion |
| Release demo | Remotion or ffmpeg |
| Social content | Remotion or ffmpeg |

## Integration with Talocode

This guide works alongside:

- `talocode-video` - Main video skill
- `talocode-partnership-branding` - Partnership graphics
- `talocode-release` - Release workflows

## Notes

- HyperFrames is external and not maintained by Talocode
- ClipLoop is experimental and under development
- Remotion is the recommended default for most use cases
- ffmpeg is always available as a fallback
