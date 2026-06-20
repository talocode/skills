# talocode-design-taste-router

Route agents to the right design skill based on the task.

## Purpose

This skill helps Talocode agents choose the right design skill for different tasks:

- **Frontend UI polish**: Use Taste Skill (external)
- **Partnership graphics**: Use talocode-partnership-branding
- **Video design**: Use ClipLoop video taste system
- **Release demos**: Use talocode-remotion-demo

## When to Use

Use this skill when:

- Starting a new design task
- Uncertain which design skill to use
- Working on multiple design types
- Need to route to the right tool

## Skill Routing

### Frontend UI Tasks

For landing pages, redesigns, brand kits, UI polish:

**Use**: Taste Skill by Leonxlnx

```bash
npx skills add Leonxlnx/taste-skill
```

**When to use**:
- Building or redesigning landing pages
- Creating brand kits
- Improving UI typography, spacing, motion
- Converting images to code
- Anti-slop frontend generation

**Reference**: https://github.com/Leonxlnx/taste-skill

### Partnership Graphics

For partnership announcements, collaboration visuals:

**Use**: talocode-partnership-branding

```bash
npx skills add talocode/skills/talocode-partnership-branding
```

**When to use**:
- Partnership announcement graphics
- Ecosystem relationship visuals
- Product integration images
- Launch/support visuals

### Video Design

For video content, tutorials, releases:

**Use**: ClipLoop video taste system

**When to use**:
- Creating product demos
- Making tutorial videos
- Release announcement videos
- Feature showcase content

**Reference**: See ClipLoop docs/VIDEO_TASTE_SYSTEM.md

### Release Demos

For release demo videos:

**Use**: talocode-remotion-demo

```bash
npx skills add talocode/skills/talocode-remotion-demo
```

**When to use**:
- Creating release demo videos
- Making product showcase videos
- Building feature announcement content

## Decision Tree

1. Is this a frontend UI task?
   → Use Taste Skill

2. Is this a partnership/collaboration graphic?
   → Use talocode-partnership-branding

3. Is this video content?
   → Use ClipLoop video taste system

4. Is this a release demo?
   → Use talocode-remotion-demo

5. Multiple design types?
   → Use multiple skills as needed

## Installation

```bash
# Install all design skills
npx skills add talocode/skills/talocode-design-taste-router
npx skills add Leonxlnx/taste-skill
npx skills add talocode/skills/talocode-partnership-branding
npx skills add talocode/skills/talocode-remotion-demo
```

## Notes

- This router skill references external skills
- Always check upstream repos for updates
- Preserve attribution when using external skills
- Keep ClipLoop video taste system original
