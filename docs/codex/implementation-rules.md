# Codex Implementation Rules

## Purpose

These rules guide all Codex work on Igal Vilensky’s portfolio refactor.

The goal is a controlled rebuild of the existing portfolio into a mature, recruiter-friendly developer portfolio aligned with Igal’s current positioning:

> Full-stack software developer building SaaS products and practical AI-assisted workflows.

Codex must follow these rules unless the user explicitly changes them.

## Work Style

Do not build the whole site at once.

Work in small, scoped milestones.

Each task should have:

* a clear objective
* a small file/change scope
* no unrelated refactors
* a clear before/after purpose
* updated documentation when meaningful

Prefer controlled progress over big rewrites.

## Source of Truth

Before making content, design, or structure changes, read the relevant docs:

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

If a requested change conflicts with the docs, follow the user’s latest instruction and update the docs to reflect the new decision.

## Existing App

This is an existing Nuxt/Vue/TypeScript portfolio.

Do not start a new app.

Preserve the existing project unless explicitly asked to change architecture.

Current foundation to preserve unless instructed otherwise:

* Nuxt
* Vue
* TypeScript
* Tailwind CSS
* static generation
* Netlify deployment
* existing project/content data where still useful

## Design Rules

The design must follow:

```text
docs/design/visual-direction.md
```

Core design direction:

* clean
* mature
* calm
* readable
* recruiter-friendly
* product-minded
* case-study-driven
* lightly technical
* not flashy

Avoid:

* loud gradients
* neon/cyberpunk AI styling
* excessive animation
* large decorative effects
* generic AI portfolio aesthetics
* visual clutter
* playful chatbot mascot design
* overdesigned cards
* dense skill clouds

Use motion sparingly and respect reduced-motion preferences.

## Content Rules

Do not invent facts about Igal.

Only use information available in:

* existing portfolio repo
* CV content
* career positioning docs
* project data
* user-provided details

If information is missing, leave a placeholder or ask the user instead of inventing.

Do not exaggerate experience.

Avoid language like:

* AI expert
* guru
* ninja
* visionary
* rockstar
* revolutionary
* cutting-edge without proof
* world-class
* thought leader

Prefer grounded language:

* full-stack software developer
* SaaS product development
* frontend development
* API integration
* AI-assisted workflows
* automation-ready applications
* product-focused engineering
* human-in-the-loop AI features

## Positioning Rules

Igal should not be positioned as someone entering tech from zero.

He should be positioned as:

> A software developer with real product experience, now expanding into AI agents, automations, and AI-assisted workflows.

The site should support these target roles:

* Full-Stack Software Developer
* Frontend Developer
* Vue.js Developer
* React Developer
* TypeScript Developer
* AI Software Developer
* AI Automation Developer
* AI Workflow Developer
* SaaS Developer
* API Integration Developer

## Homepage Rules

The homepage must answer these questions quickly:

1. Who is Igal?
2. What roles is he relevant for?
3. What stack does he use?
4. What has he built?
5. What is his AI/automation direction?
6. How can someone contact him or view proof?

Do not overload the homepage.

Prioritize:

* clear hero
* recruiter snapshot
* selected case studies
* AI/automation focus
* experience summary
* contact CTA

## Project Rules

Featured homepage projects should be limited and strategic.

Preferred featured projects:

1. Flowplace Role Compass
2. OpenMe
3. Decision Matrix AI
4. ARI Motors EV Portal

Secondary projects can live on a broader projects or lab page.

Each featured project should explain:

* what it is
* why it matters
* Igal’s role
* technologies used
* outcome or proof
* relevance to target roles

Do not present every project with equal weight.

## AI Guide Rules

The AI guide is an optional enhancement, not the core website.

Preferred name:

* Ask My Portfolio

Acceptable alternatives:

* Portfolio Guide
* Recruiter Guide
* AI Portfolio Guide

The AI guide must feel like a grounded professional assistant or smart search layer, not a gimmick.

It should help recruiters ask questions such as:

* What roles is Igal a good fit for?
* Summarize Igal for a recruiter.
* What is his frontend experience?
* Does he have SaaS experience?
* Show his strongest AI-related projects.
* Which project should I review first?

## AI Guide MVP Rules

Do not start with a full LLM integration.

Build in phases:

### Phase 1

Static or deterministic AI guide prototype.

* suggested questions
* predefined grounded answers
* no external API keys
* no LLM dependency
* works on static deployment

### Phase 2

Structured local content layer.

* profile data
* projects data
* experience data
* skills data
* role-fit data
* FAQ data

### Phase 3

Optional server-side LLM route.

* API key stays server-side
* model receives selected structured context
* safe fallback when API key is missing
* assistant says when information is unavailable

Do not add RAG, vector database, MCP, or autonomous agent behavior in MVP.

## AI Safety Rules

The AI guide must not:

* invent facts
* claim private information
* apply to jobs
* send emails
* schedule meetings
* browse the web
* expose API keys
* pretend to be Igal
* make hiring guarantees
* collect sensitive information unnecessarily

The AI guide should:

* answer only from portfolio data
* be transparent about limitations
* suggest relevant sections/projects
* be concise by default
* include contact links when appropriate
* say when something is not available

## Code Rules

Prefer:

* readable components
* data-driven content
* small components
* clear names
* TypeScript types where helpful
* accessible HTML
* reusable layout primitives
* mobile-first UI
* simple state management
* minimal dependencies

Avoid:

* unnecessary libraries
* overengineering
* huge components
* deeply nested logic
* content hardcoded across many components
* framework migration
* duplicated project data
* unused files
* magic values without explanation

## Styling Rules

Use Tailwind consistently.

Prefer:

* consistent spacing scale
* restrained colors
* semantic component classes if already present
* accessible contrast
* readable text sizes
* visible focus states

Avoid:

* too many one-off colors
* excessive shadows
* excessive rounded corners
* heavy glassmorphism
* visual effects that compete with content

## Accessibility Rules

Every change should preserve or improve accessibility.

Requirements:

* semantic headings
* proper link/button usage
* keyboard-accessible interactions
* visible focus states
* alt text for meaningful images
* readable contrast
* reduced-motion support
* no important content available only on hover

## Mobile Rules

Mobile is critical.

Recruiters may open the site from LinkedIn or email on mobile.

Mobile requirements:

* no horizontal scrolling
* readable hero
* clear CTAs
* concise project cards
* easy navigation
* fast access to contact/CV
* AI guide must not dominate screen space

## Documentation Rules

After meaningful implementation work, update:

```text
docs/codex/current-state.md
```

Include:

* what changed
* relevant files
* what works
* known limitations
* next recommended step

When appropriate, update:

```text
docs/codex/next-task.md
```

Keep docs concise and useful.

## Commit / Task Hygiene

Each Codex task should be narrow.

Good task examples:

* Add initial documentation files.
* Refactor homepage hero according to positioning docs.
* Create recruiter snapshot component.
* Replace project card layout for featured projects.
* Add static Ask My Portfolio component.
* Create structured profile content file.

Bad task examples:

* Redesign the whole website.
* Make it modern.
* Add AI everywhere.
* Improve everything.
* Rebuild all pages.

## Final Rule

When in doubt, choose:

* clarity over cleverness
* proof over decoration
* maturity over flashiness
* recruiter usefulness over personal expression
* grounded AI over AI hype
