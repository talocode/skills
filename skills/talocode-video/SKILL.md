# talocode-video

Create high-quality Talocode videos for releases, demos, product updates, and social distribution using Remotion, HyperFrames-style HTML video, ffmpeg, and ClipLoop.

## When to Use

Use this skill when creating any video content for Talocode ecosystem products:

- Release demo videos
- Product launch videos
- Feature showcase videos
- Tutorial videos
- Social media content
- Partnership announcement videos

## Core Principle

**"Attention is engineered, not accidental."**

## Attention Framework

**Hook → Retention → Emotion → Distribution**

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

## Renderer Decision System

Choose the right renderer for your video:

### Remotion

**Use for:**
- React-based programmatic videos
- Component-driven demos
- Release animations
- Reusable visual systems
- Complex data visualizations

**When to choose:**
- Building a video with React components
- Need programmatic animations
- Want TypeScript support
- Creating reusable video templates

**Install:**
```bash
npm install remotion @remotion/cli @remotion/renderer
```

**Example:**
```bash
npx remotion render src/Video.tsx demo.mp4
```

### HyperFrames-style HTML

**Use for:**
- Quick agent-authored videos
- Plain HTML/CSS/JS compositions
- Browser-renderable motion graphics
- Landing-page-style motion
- Data/story videos
- Rapid prototyping

**When to choose:**
- Agent can quickly author HTML
- Need CSS/GSAP/WAAPI animations
- Browser-renderable compositions
- Fast iteration cycles

**Install (external):**
```bash
npx skills add heygen-com/hyperframes
```

**Note:** HyperFrames is external and not maintained by Talocode.

### ffmpeg

**Use for:**
- Stitching clips
- Adding audio
- Transcoding
- Trimming
- Caption burn-in
- Format conversion
- Fallback rendering

**When to choose:**
- Post-processing existing video
- Simple scene assembly
- Adding audio tracks
- Format conversion

**Example:**
```bash
ffmpeg -i input.mp4 -vf "drawtext=text='Title':fontsize=72" output.mp4
```

### ClipLoop

**Use for:**
- Talocode's own agent-editable video engine
- Timeline-based editing
- API-driven video creation
- Future hosted rendering

**When to choose:**
- Building Talocode-native videos
- Need timeline editing
- Want API-driven workflows
- Future cloud rendering

## HTML-to-Video / HyperFrames-style Workflow

For agent-authored HTML compositions:

1. **Write HTML/CSS/JS composition**
   - Use plain HTML, CSS, JavaScript
   - Add GSAP, CSS animations, or WAAPI for motion
   - Keep composition deterministic

2. **Preview in browser**
   - Open HTML file in browser
   - Verify timing and motion
   - Check mobile readability

3. **Render to MP4**
   - Use HyperFrames or compatible renderer
   - Or use ffmpeg to capture browser output

**Example HTML composition:**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #1C1C1C; color: white; font-family: monospace; }
    .container { display: flex; justify-content: center; align-items: center; height: 100vh; }
    .title { font-size: 72px; animation: fadeIn 1s ease-in; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  </style>
</head>
<body>
  <div class="container">
    <div class="title">Product Name</div>
  </div>
</body>
</html>
```

**Note:** HyperFrames is external (https://github.com/heygen-com/hyperframes) and not maintained by Talocode.

## Talocode Video Workflow

1. **Write the hook** - First 1-3 seconds
2. **Create storyboard** - Plan scenes and timing
3. **Choose renderer** - Remotion, HTML, ffmpeg, or ClipLoop
4. **Build frames/scenes** - Create visual content
5. **Add captions** - Make accessible and readable
6. **Add audio/voice** - If available
7. **Validate social readiness** - Check checklist
8. **Render MP4** - Export final video
9. **Attach to GitHub release** - Ship with release
10. **Post on social** - X, LinkedIn, YouTube Shorts, etc.

## Release Demo Structure

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

## Output Standards

- **Format**: MP4 (H.264)
- **Resolution**: 1080p or platform-specific
- **Captions**: Required for social
- **Audio**: Voice preferred when available
- **Claims**: No fake claims
- **Output**: Real command output for CLI workflows

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

## Attach to Release

```bash
gh release upload <tag> demo/<product>-v<version>-demo.mp4 --clobber
```

## Legacy

This skill was previously named `talocode-remotion-demo`. A compatibility wrapper exists at `skills/talocode-remotion-demo/SKILL.md`.
