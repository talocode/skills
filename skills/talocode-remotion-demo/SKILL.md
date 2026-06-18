# talocode-remotion-demo

Guide agents to create release demo videos.

## When to Use

Use this skill when creating a demo video for a release. Demo videos help users understand what the tool does quickly.

## Video Requirements

### Duration

- **35-60 seconds** maximum
- Shorter is better
- Respect viewer time

### Format

- **MP4** (H.264)
- **1920x1080** or **1280x720**
- **30fps** minimum
- Attach to GitHub Release

### Naming Convention

```
demo/<product>-v<version>-demo.mp4

Examples:
demo/worklane-v0.1.0-demo.mp4
demo/codra-v0.2.0-demo.mp4
demo/signallane-v1.0.0-demo.mp4
```

## Visual Style (Talocode Dark Theme)

```typescript
const COLORS = {
  background: '#1C1C1C',
  primary: '#58C4DD',      // Blue
  secondary: '#83C167',    // Green
  accent: '#FFFF00',       // Yellow
  error: '#FF6B6B',        // Red
  text: '#FFFFFF',         // White
  muted: '#888888',        // Gray
};

const FONT = 'Monospace';
```

## Tools

### Preferred: Remotion

Remotion is the preferred tool for creating demo videos:

```bash
# Install
npm install remotion @remotion/cli @remotion/renderer

# Create video
npx remotion render src/Video.tsx demo.mp4
```

Benefits:
- React-based (familiar for web developers)
- Programmatic animations
- TypeScript support
- Easy to version control

### Fallback: ffmpeg

If Remotion is not available, use ffmpeg:

```bash
# Create scene
ffmpeg -f lavfi -i "color=c=0x1C1C1C:s=1920x1080:d=4" \
  -vf "drawtext=text='Title':fontsize=72:fontcolor=0x58C4DD:x=(w-text_w)/2:y=(h-text_h)/2" \
  -c:v libx264 -pix_fmt yuv420p scene.mp4

# Concatenate scenes
cat > concat.txt << EOF
file 'scene1.mp4'
file 'scene2.mp4'
EOF
ffmpeg -f concat -safe 0 -i concat.txt -c copy demo.mp4
```

## Video Structure

### Scene 1: Title (3-4 seconds)

```
WorkLane
Open-Source AI Coworker Platform
```

### Scene 2: Problem (4-5 seconds)

```
The Problem
- Enterprise AI tools are closed
- Live in expensive dashboards
- Require prompt engineering
```

### Scene 3: Solution (4-5 seconds)

```
The Solution
- Mention AI agents in chat
- Route work automatically
- Return finished output
```

### Scene 4: Demo (10-15 seconds)

Show the tool in action:

```
@WorkLane summarize this discussion

→ Routes to Summarize Workflow
→ Uses AI Provider
→ Returns formatted summary
```

### Scene 5: Features (5-7 seconds)

```
Features
✓ Provider-agnostic
✓ Self-hostable
✓ Open-source
✓ Local memory
```

### Scene 6: Call to Action (3-4 seconds)

```
Get Started
github.com/<org>/<repo>
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
- "Provider-agnostic" not "Supports all providers"

### Show Real Output

- Use actual CLI output
- Show real terminal sessions
- Don't mock responses

## Example (ffmpeg)

```bash
#!/bin/bash

OUTPUT="demo/product-v1.0.0-demo.mp4"
TEMP_DIR="demo/temp"
mkdir -p "$TEMP_DIR"

# Scene 1: Title
ffmpeg -y -f lavfi -i "color=c=0x1C1C1C:s=1920x1080:d=4" \
  -vf "drawtext=text='Product':fontsize=120:fontcolor=0x58C4DD:x=(w-text_w)/2:y=(h-text_h)/2-50:font=Monospace,\
drawtext=text='Open-Source Tool':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2+50:font=Monospace" \
  -c:v libx264 -pix_fmt yuv420p "$TEMP_DIR/scene1.mp4"

# Add more scenes...

# Concatenate
cat > "$TEMP_DIR/concat.txt" << EOF
file 'scene1.mp4'
file 'scene2.mp4'
EOF
ffmpeg -y -f concat -safe 0 -i "$TEMP_DIR/concat.txt" -c copy "$OUTPUT"

rm -rf "$TEMP_DIR"
echo "Demo video: $OUTPUT"
```

## Attach to Release

```bash
gh release upload <tag> demo/<product>-v<version>-demo.mp4 --clobber
```

## Notes

- Keep it short (35-60 seconds)
- Show real output, not mocks
- Use consistent dark theme
- Attach to GitHub Release
- Don't overclaim features
