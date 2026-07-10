# talocode-workspace-teach

Set up a multi-session teaching workspace with lessons, reference docs, learning records, and mission tracking.

## Purpose

Provide a structured environment for teaching the user a new skill or concept across multiple sessions. The workspace captures state, progress, and context so each session resumes where the last left off.

## When to Use

Use this skill when:
- The user asks to learn something new over multiple sessions
- The user wants a structured course-like experience rather than ad-hoc Q&A
- Teaching a topic with reusable reference material (syntax, algorithms, poses, flows)
- Building an interactive learning experience with quizzes and exercises

## Workflow

### 1. Establish the workspace

Create these files in the current directory:

- `MISSION.md` — why the user wants to learn this topic. Grounds all teaching. Format: one-line goal, motivation paragraph, success criteria.
- `RESOURCES.md` — list of high-quality resources (books, articles, videos, docs) to ground teaching in contextual knowledge, not parametric knowledge.
- `./reference/` — cheat sheets, glossaries, reference algorithms. Beautiful documents designed for quick reference.
- `./learning-records/` — numbered non-obvious lessons and key insights (`0001-<dash-case-name>.md`). Similar to ADRs for knowledge.
- `./lessons/` — numbered self-contained HTML lessons (`0001-<dash-case-name>.html`). The primary unit of teaching.
- `./assets/` — reusable components (stylesheets, quiz widgets, simulators) shared across lessons.
- `NOTES.md` — scratchpad for user preferences and working notes.

Create files lazily — only when you have something to write.

### 2. Populate resources

Before designing lessons, populate `RESOURCES.md` with trusted external references. Never rely solely on parametric knowledge. Focus on finding high-quality, high-trust resources.

### 3. Design the first lesson

A **lesson** is one self-contained HTML file that teaches one tightly-scoped thing tied to the mission. Each lesson should:
- Be completable quickly (learners' working memory is small)
- Give the user a single tangible win they can build on
- Lie in the user's **zone of proximal development**
- Use retrieval practice, spacing, and interleaving where appropriate
- Recommend a primary source for deeper reading
- Link to other lessons and reference documents via HTML anchors
- Include a reminder to ask followup questions

Lessons should be **beautiful** — clean typography and layout — since the user returns to them to review.

### 4. Build from components

Before authoring a lesson, read `./assets/` and build from existing components. When a lesson needs something new and reusable, write it as a component in `./assets/` and link to it. Start with a shared stylesheet so all lessons look consistent.

### 5. Track progress

After each lesson, add a learning record documenting:
- What was taught
- Non-obvious insights or key takeaways
- Any revisions to the mission or approach
- What the user should learn next

Update `MISSION.md` if the user's goals evolve (confirm with the user first).

### 6. Calculate the next lesson

When planning the next lesson:
- Read the learning records to understand what's been covered
- Check the mission to stay aligned with the user's goals
- Choose the most relevant next thing in the user's zone of proximal development

## Constraints

- Never rely solely on parametric knowledge — find and cite high-quality resources
- Lessons must be self-contained and directly tied to the mission
- Use retrieval practice (recall from memory), spacing (distribute over time), and interleaving (mix related topics)
- Knowledge is taught first, then skills practiced via an interactive feedback loop
- Difficulty is the enemy of knowledge acquisition, but the tool for skill acquisition
- Reference documents are for long-term reference; lessons are for active learning
- Glossaries created in reference docs must be adhered to in every lesson
- For wisdom-level questions, delegate to a community (forum, subreddit, local group)

## Validation Checklist

- [ ] MISSION.md captures the user's real goal (not just the topic)
- [ ] RESOURCES.md has at least 3 high-quality references
- [ ] First lesson is completable in one session
- [ ] Lesson links to its primary source
- [ ] Shared stylesheet exists in assets/
- [ ] Learning record written after each session
- [ ] Teaching stays in the zone of proximal development
- [ ] Knowledge and skills are taught separately (knowledge first, skills via practice)
