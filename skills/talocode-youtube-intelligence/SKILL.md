# talocode-youtube-intelligence

Analyze public YouTube video/channel patterns and create original, high-retention video plans for Talocode and ClipLoop workflows.

## Purpose

Help Talocode agents study publicly available YouTube channel and video metadata to extract structural patterns — then use those patterns to plan, script, and produce original content through the ClipLoop video pipeline. This is not a copying engine. It is a pattern analysis and original creation workflow.

## When to Use This Skill

- Planning a new video for the Talocode YouTube channel
- Auditing a channel's content strategy before creating competing original content
- Extracting retention and hook patterns from public video metadata
- Converting a video idea into a ClipLoop motion spec
- Building a content calendar for consistent publishing
- Analyzing what works in a niche before committing to a topic

## When NOT to Use This Skill

- To copy, reupload, or clone existing videos
- To generate mass-produced repetitive content
- To bypass YouTube policies or monetization requirements
- To create misleading or clickbait content with no substance
- To automate publishing without human review

## Workflow

### 1. Define Channel Niche

Before any analysis, establish the content domain:

- What topic area does the channel cover?
- Who is the target audience?
- What is the value proposition?
- What makes this channel's perspective unique?

Example for Talocode:
- Niche: open-source AI tooling and developer workflows
- Audience: software developers building with AI
- Value: honest build logs, working demos, architecture decisions
- Unique angle: real products, not demos or vaporware

### 2. Collect Public Metadata

Gather publicly available information about channels and videos:

- Channel name, description, subscriber count, video count
- Video titles, durations, publish dates, public view counts
- Video descriptions and tags (publicly visible)
- Comment counts and public engagement signals
- Upload frequency and scheduling patterns

Use only publicly available data. Do not access private analytics. Do not require credentials. Do not extract content behind authentication.

### 3. Analyze Structural Patterns

Study the collected metadata to identify patterns across videos:

**Title Analysis:**
- Length ranges that perform well
- Keyword patterns and phrasing styles
- Question vs statement vs list formats
- Emotional triggers used (curiosity, urgency, authority)

**Hook Analysis:**
- What appears in the first 3 seconds of successful videos
- Opening question patterns
- Visual or audio hooks
- Problem-solution framing in intros

**Thumbnail Analysis:**
- Text overlay patterns
- Face vs no-face approaches
- Color contrast patterns
- Simplicity vs complexity spectrum

**Retention Pattern Analysis:**
- Video length distribution across view counts
- Section pacing in longer successful videos
- B-roll vs talking head ratios
- Pattern interrupts and engagement devices

**Structure Analysis:**
- Common video formats (tutorial, explainer, build log, comparison)
- Section breakdowns and timing
- CTA placement and style
- End screen and subscribe prompt patterns

### 4. Extract Pattern Principles

Convert observations into reusable principles — never copy specific content:

**Do extract:**
- "Videos under 60 seconds with a question hook tend to get higher retention"
- "Build log formats with real terminal output feel more authentic"
- "Showing the final result first, then the process, creates curiosity"
- "Technical explainers benefit from visual diagrams over pure talking head"

**Do NOT extract:**
- Specific scripts or word-for-word phrasing
- Exact thumbnail designs or visual layouts
- Competitor video structures copied verbatim
- Audio tracks or music choices

### 5. Generate Original Video Concepts

Using extracted principles and Talocode's own products and work:

- Map each idea to a Talocode product or workflow
- Ensure every idea is original and adds unique value
- Score each idea on: demand signal, uniqueness, production difficulty, Talocode fit
- Prioritize ideas that demonstrate real working tools

### 6. Score and Rank Ideas

For each generated concept, assign scores:

| Factor | Weight | Scale |
|--------|--------|-------|
| Demand signal | 30% | 1-5 (based on topic search interest) |
| Uniqueness | 25% | 1-5 (how original is this angle) |
| Production difficulty | 20% | 1-5 (5 = easiest to produce) |
| Talocode fit | 25% | 1-5 (how well it showcases our tools) |

Minimum threshold: average score >= 3.0 to proceed to scripting.

### 7. Create Script and Storyboard

For approved ideas, create:

- Hook (0-3 seconds): the opening that earns the next 30 seconds
- Context/proof (3-10 seconds): why this matters, what it connects to
- Core content (10-45 seconds): the explanation, demo, or build
- CTA (45-60 seconds): what to do next (subscribe, try the tool, read the docs)

Include:
- Visual direction for each section
- Caption text
- Motion style notes
- Asset requirements

### 8. Convert to ClipLoop Motion Spec

Transform the script into a ClipLoop motion spec:

- Map script sections to scenes
- Define typography, colors, and motion style
- Specify element types (text, code, terminal, workflow cards)
- Set camera movements and transitions
- Configure export format (16:9 for YouTube, 9:16 for Shorts)

### 9. Require Human Approval

No video is published without explicit human review:

- Review the script for accuracy and tone
- Review the motion spec for visual quality
- Verify no copyrighted material is included
- Confirm the video meets YouTube policy requirements
- Approve title, description, tags, and thumbnail concept

### 10. Track Performance and Iterate

After publishing, feed performance data back:

- View count and retention曲线
- Click-through rate on title/thumbnail
- Comment sentiment and questions
- Subscriber growth per video
- Which patterns from the analysis held true

Use lessons to refine the next batch of ideas.

## Originality Requirements

Every video produced through this workflow must be:

- **Scripted from scratch** — no copied or paraphrased competitor scripts
- **Visually original** — no cloned thumbnails, layouts, or visual styles
- **Substantively valuable** — provides real information, demos, or insights
- **Honestly presented** — no misleading claims, fake metrics, or clickbait
- **Policy-safe** — complies with YouTube Community Guidelines and monetization policies

## YouTube Policy Safety

### YPP Eligibility Rules

YouTube Partner Program generally requires:
- 1,000 subscribers + 4,000 valid public watch hours in 12 months, OR
- 1,000 subscribers + 10 million valid public Shorts views in 90 days

### Content That Risks Rejection

- Repetitive or mass-produced content
- Reuploaded or minimally modified content from other channels
- Content designed primarily to manipulate algorithms
- Misleading metadata (fake titles, deceptive thumbnails)
- Artificial engagement (fake views, sub4sub, engagement bait)

### Content That Is Safe

- Original educational or informational content
- Real product demonstrations and build logs
- Honest reviews and comparisons
- Creative original presentations of ideas
- Content that provides genuine viewer value

## ClipLoop Integration

### From Idea to Motion Spec

```
Original video idea
  ↓
Script with timing and visual direction
  ↓
ClipLoop motion spec generation
  ↓
Scene-by-scene breakdown
  ↓
Render through ClipLoop API
  ↓
Human review and approval
  ↓
Publish to YouTube
```

### Template Mapping

| Video Type | ClipLoop Template | Duration |
|-----------|-------------------|----------|
| Tech explainer | talocode-tech-explainer | 45-60s |
| Build log | talocode-build-log | 60-90s |
| Product launch | saas-motion-launch | 45-60s |
| Quick tip | talocode-quick-tip | 15-30s |

## Content Calendar Planning

### Publishing Cadence Recommendation

- 2-3 Shorts per week (15-60 seconds each)
- 1 long-form video per week (3-10 minutes)
- 1 product launch/demo video per major release

### Batch Production

- Plan 2 weeks of content at a time
- Script and storyboard 4-6 videos in one session
- Batch render through ClipLoop
- Schedule publishing across the week
- Review analytics before planning the next batch

## Constraints

- Never copy scripts, thumbnails, or video structures from other channels
- Never reupload or repackage someone else's content
- Never use fake views, engagement, or subscriber tactics
- Never promise guaranteed revenue or monetization
- Never produce content without human review
- Never misrepresent AI-generated content as fully human-created
- Always provide genuine value to viewers
- Always comply with YouTube Terms of Service and Community Guidelines
