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

## Attention Framework

**Hook → Retention → Emotion → Distribution**

Core principle: "Attention is engineered, not accidental."

### Hook

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

### Retention

Keep the viewer watching through pacing and curiosity.

**Rules:**
- One idea per scene
- Cut dead time
- Keep scenes short
- Use visible progress
- Use captions
- Show transformation
- Create open loops
- Make every 3–5 seconds visually earn attention

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
- Export for platform aspect ratios
- Make captions readable on mobile
- Make the first frame strong enough as a thumbnail
- Create cutdowns for X, LinkedIn, YouTube Shorts, Instagram, Threads, Facebook, WhatsApp

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

## Talocode Release Demo Structure

Recommended structure for 35–60 second demos:

1. **0–3s: Hook**
   - Show final result or strongest command
   - No slow intro

2. **3–10s: Pain/context**
   - What was hard before

3. **10–30s: Product workflow**
   - Show real commands, UI, or output

4. **30–45s: Proof**
   - Validation, install, release, before/after

5. **45–60s: CTA/distribution**
   - GitHub release
   - npm install
   - Sponsor link if relevant
   - Product account

## Viral Readiness Checklist

A video is not ready unless:

- [ ] First 3 seconds clearly create curiosity or value
- [ ] No generic intro
- [ ] Captions are readable on mobile
- [ ] Every scene has one job
- [ ] Dead time is removed
- [ ] There is a clear emotional reason to care
- [ ] The result/proof is shown
- [ ] CTA is visible
- [ ] Can be understood with sound off
- [ ] Can be repurposed to at least 3 platforms

## Notes

- Keep it short (35-60 seconds)
- Show real output, not mocks
- Use consistent dark theme
- Attach to GitHub Release
- Don't overclaim features
