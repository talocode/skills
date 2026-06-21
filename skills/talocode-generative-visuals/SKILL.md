# talocode-generative-visuals

Create procedural visuals for videos, launch assets, and product visuals.

## Purpose

Generate algorithmic visuals for Talocode products using code-based approaches.

## When to Use

Use this skill when:
- Creating motion backgrounds for videos
- Building launch visuals
- Creating abstract product visuals
- Generating X banners
- Building Codra terminal visual systems
- Creating Tradia market visuals

## Procedural Visual Principles

### 1. Parameterized Designs

Every visual should be parameterized:
- Colors as variables
- Sizes as variables
- Timing as variables
- Variations as parameters

### 2. Seeds and Variations

Use seeds for reproducible randomness:
```javascript
const seed = 12345;
const rng = seedRandom(seed);
```

Generate variations by changing seed or parameters.

### 3. Motion Restraint

- Use smooth transitions
- Avoid random shaking
- Match motion to purpose
- Keep timing consistent

### 4. Brand Consistency

- Use Talocode color palette
- Maintain typography rules
- Keep spacing consistent
- Preserve brand identity

### 5. Export Rules

- MP4 for video
- PNG for static
- SVG for vector
- GIF for simple animations
- No external dependencies in output

## Visual Patterns

### Particle Systems
```javascript
// Create particle field
const particles = Array.from({ length: 100 }, () => ({
  x: rng() * width,
  y: rng() * height,
  vx: (rng() - 0.5) * speed,
  vy: (rng() - 0.5) * speed
}));
```

### Gradient Flows
```javascript
// Smooth color transitions
const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
```

### Geometric Patterns
```javascript
// Grid-based patterns
const grid = Array.from({ length: rows }, (_, i) =>
  Array.from({ length: cols }, (_, j) => ({
    x: j * cellSize,
    y: i * cellSize,
    value: rng()
  }))
);
```

## Anti-Slop Rules

- No random noise without purpose
- No overused transitions
- No generic templates
- No excessive glow effects
- No cluttered compositions

## Export Formats

- **Video**: MP4 (H.264)
- **Static**: PNG (transparent if needed)
- **Vector**: SVG
- **Animation**: GIF or WebM

## Notes

- Generative visuals should serve a purpose
- Keep brand consistency
- Test on target platforms
- Export at appropriate quality
