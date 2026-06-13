# Build Order

## Principle

Do not ask Codex to rebuild the whole portfolio at once.

This project should be developed in controlled milestones.

Each milestone should leave the site in a working state.

## Milestone 1: Documentation Foundation

Goal:

Add the source-of-truth documentation that defines the portfolio strategy, visual direction, and Codex workflow.

Files:

```text
docs/strategy/positioning.md
docs/design/visual-direction.md
docs/codex/project-brief.md
docs/codex/implementation-rules.md
docs/product/site-map.md
docs/product/build-order.md
docs/codex/current-state.md
docs/codex/next-task.md
```

Outcome:

Codex can understand the intended direction before touching UI code.

Do not modify the actual site yet except for docs.

## Milestone 2: Content Source of Truth

Goal:

Create structured content files so the site and future AI guide can use reliable profile data.

Possible files:

```text
content/profile.json
content/experience.json
content/projects.json
content/skills.json
content/role-fit.json
content/faq.json
content/professional-narrative.md
```

Content should be based on:

* Igal’s CV
* transferable skills exercise
* SMART goal
* alternative job titles
* professional narrative
* existing project data

Outcome:

The portfolio has a clean data layer for profile, projects, role fit, and AI guide answers.

No real AI integration yet.

## Milestone 3: Homepage Information Architecture

Goal:

Refactor the homepage structure around recruiter scanning.

Target homepage sections:

1. Hero
2. Recruiter Snapshot
3. Ask My Portfolio preview
4. Selected Work
5. How I Work
6. AI / Automation Focus
7. Experience Snapshot
8. Contact CTA

Outcome:

Homepage structure matches the new positioning.

Visuals can still be basic at this stage.

Avoid heavy styling changes until structure is stable.

## Milestone 4: Visual System Refactor

Goal:

Move the design toward a mature, calm product-engineering style.

Tasks may include:

* simplify color palette
* reduce gradients
* reduce flashy animations
* improve typography
* improve spacing
* improve cards
* improve buttons
* improve mobile layout
* remove or simplify visual noise

Outcome:

The site feels professional, readable, and recruiter-friendly.

## Milestone 5: Selected Work Refactor

Goal:

Rework projects into a clearer proof hierarchy.

Homepage featured projects:

1. Flowplace Role Compass
2. OpenMe
3. Decision Matrix AI
4. ARI Motors EV Portal

Tasks:

* update project cards
* show role/proof/stack/outcome
* reduce equal-weight project overload
* separate featured work from lab/secondary projects
* improve case-study links

Outcome:

Recruiters can quickly identify strongest proof.

## Milestone 6: Case Study Pages

Goal:

Improve selected case studies for hiring managers and technical reviewers.

Prioritize:

1. Flowplace Role Compass
2. OpenMe
3. Decision Matrix AI
4. ARI Motors EV Portal

Each case study should include:

* overview
* context/problem
* Igal’s role
* tech stack
* key contributions
* outcome/proof
* technical decisions
* what it demonstrates for target roles

Outcome:

Selected projects become persuasive technical/professional proof.

## Milestone 7: Static Ask My Portfolio MVP

Goal:

Add a safe, deterministic AI guide prototype without a real LLM.

Features:

* prompt chips
* predefined answers
* links to relevant sections/projects
* clear “based on portfolio data” framing
* no API key
* no external requests
* no hallucination risk

Suggested questions:

* What roles is Igal a good fit for?
* Summarize Igal for a recruiter.
* What is his frontend experience?
* Does he have SaaS experience?
* Show his strongest AI-related projects.
* Which project should I review first?

Outcome:

The site demonstrates AI/product thinking while staying safe and simple.

## Milestone 8: Structured AI Guide Content

Goal:

Connect the static AI guide to local structured content files.

Use:

```text
content/profile.json
content/projects.json
content/experience.json
content/skills.json
content/role-fit.json
content/faq.json
```

Outcome:

The AI guide becomes data-driven and easier to maintain.

Still no real LLM required.

## Milestone 9: Optional LLM-Backed AI Guide

Goal:

Add optional real AI only after the static guide and structured content work.

Architecture:

* frontend calls Nuxt server route
* server route reads structured content
* server route calls AI provider if configured
* API key stays server-side
* fallback works without API key

Rules:

* no API keys in frontend
* no external actions
* no job applications
* no email sending
* no scheduling
* no browsing
* answer only from provided data
* say when information is unavailable

Outcome:

A grounded “Ask My Portfolio” feature that demonstrates practical AI integration safely.

## Milestone 10: Polish

Goal:

Prepare for public use and job applications.

Tasks:

* mobile QA
* accessibility QA
* SEO metadata
* Open Graph image/text
* performance cleanup
* README update
* remove unused code/assets
* check broken links
* check CV/contact links
* verify deployment

Outcome:

Portfolio is ready to share with recruiters.

## Suggested First Codex Task

After all docs are created, the first Codex implementation task should be:

```text
Add the documentation foundation files exactly as provided. Do not change application code yet. Then create docs/codex/current-state.md and docs/codex/next-task.md summarizing that the documentation foundation is complete and recommending the next task: create structured content source files.
```

## What Not To Do First

Do not start with:

* real AI integration
* RAG
* MCP
* redesigning all components
* deleting old pages
* framework migration
* new repo
* large animation system
* new dependency stack
* perfect case studies

Start with strategy, structure, and content.

## Success Criteria

The build order is successful if:

* every Codex task is narrow
* the site remains working after each milestone
* docs stay updated
* design does not drift into flashiness
* content remains truthful
* AI guide evolves safely
* recruiter usefulness remains the main priority
