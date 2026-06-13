# Codex Project Brief

## Project

You are refactoring and repositioning Igal Vilensky’s portfolio website.

Repository:

```text
igalVilensky/igal-portfolio
```

The current site is a Nuxt/Vue/TypeScript portfolio. The goal is not to create a new project from scratch. The goal is to perform a controlled rebuild/refactor inside the existing repository.

## Primary Goal

Reposition the portfolio into a mature, recruiter-friendly developer portfolio for a full-stack software developer with SaaS experience who is currently upskilling toward AI agents, automations, and practical AI-assisted workflows.

The site should support job applications for:

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

## Core Positioning

Igal is not positioned as a beginner entering tech.

He is positioned as:

> A full-stack software developer with real product experience, now specializing further in AI-assisted workflows and automation-ready web applications.

Primary site message:

> I build full-stack SaaS products and practical AI-assisted workflows.

## Existing Tech Stack

Preserve the existing technical foundation unless a task explicitly says otherwise.

Current stack includes:

* Nuxt
* Vue
* TypeScript
* Tailwind CSS
* Nuxt color mode
* Nuxt i18n
* static generation
* Netlify deployment

Do not migrate frameworks unless explicitly requested.

## High-Level Product Direction

The site should feel like a modern product-engineering portfolio, not a flashy creative portfolio.

It should be:

* clean
* mature
* calm
* readable
* recruiter-friendly
* case-study-driven
* product-minded
* lightly technical
* AI-aware but not AI-hype-driven

## Important Source Documents

Before making major changes, read and follow:

```text
docs/strategy/positioning.md
docs/design/visual-direction.md
docs/codex/project-brief.md
docs/codex/implementation-rules.md
docs/product/site-map.md
docs/product/page-requirements.md
docs/product/build-order.md
docs/codex/current-state.md
docs/codex/next-task.md
```

If some of these files do not exist yet, do not invent large implementation changes. Help create the missing docs first.

## Initial Scope

Do not rebuild the entire site in one step.

Work milestone by milestone.

Suggested order:

1. Add strategy and Codex documentation.
2. Create structured content source files from CV/career positioning/project data.
3. Redesign homepage structure and copy.
4. Refactor visual system toward mature product UI.
5. Rework selected project cards and case studies.
6. Add static AI guide prototype.
7. Add optional real LLM-backed AI guide later.
8. Polish accessibility, mobile UX, SEO, and README.

## AI Guide Concept

The site may include an AI guide called “Ask My Portfolio” or similar.

This should be a grounded recruiter-facing assistant that helps visitors quickly explore:

* Igal’s experience
* role fit
* projects
* technical stack
* SaaS experience
* AI/automation direction
* strongest case studies
* contact and profile links

The AI guide is an optional enhancement. The portfolio must remain fully useful without it.

## AI Guide MVP

The first version should not be a full autonomous agent.

Preferred MVP:

* static or deterministic suggested Q&A
* predefined prompt chips
* answers based on local structured content
* no external AI dependency required
* no API keys
* no agentic external actions

Later version:

* server-side LLM route
* uses structured portfolio data as context
* optional provider
* safe fallback if no API key exists

## AI Guide Boundaries

The AI guide must not:

* invent facts
* claim unavailable information
* expose secrets
* apply to jobs
* send emails
* schedule meetings
* browse the web unless explicitly implemented later
* present itself as Igal
* make hiring promises

The AI guide should:

* answer only from provided portfolio data
* say when information is unavailable
* suggest relevant sections/projects
* use concise answers
* be useful for recruiters
* demonstrate grounded, safe AI product thinking

## Content Direction

Use Igal’s updated career positioning.

Important facts:

* Name: Igal Vilensky
* Location: Leipzig, Germany
* Role: Full-Stack Software Developer
* Current course: AI Agents & Automations at WBS CODING SCHOOL
* Core stack: TypeScript, JavaScript, Vue, Nuxt, React, Next.js, Node.js, Express, Python, FastAPI, REST APIs
* AI/automation stack: LLM APIs, prompt engineering, AI agents, n8n, Make, webhooks, AI-assisted product workflows
* Languages: Hebrew native, Russian native, English C1, German B2
* Strong experience: SaaS products, frontend development, API integrations, product workflows, testing, production bug fixes, cross-functional collaboration

## Featured Project Priorities

Prioritize these projects on the homepage:

1. Flowplace Role Compass
   Professional SaaS product engineering, Vue/Nuxt, TypeScript, 5,000+ users in first month.

2. OpenMe
   Full-stack SaaS MVP with AI-assisted workflow and modern monorepo architecture.

3. Decision Matrix AI
   AI-assisted decision support tool with React, TypeScript, Groq API, Firebase, and Netlify Functions.

4. ARI Motors EV Portal
   Full-stack web platform delivered from concept to production in under three months.

Secondary projects can be shown on a dedicated project/lab page.

## Visual Direction

Follow:

```text
docs/design/visual-direction.md
```

Key visual rules:

* reduce flashy animations
* reduce loud gradients
* prioritize readability
* use calm professional colors
* use a strong grid
* use clean typography
* make the site scan-friendly
* keep cards clean and content-led
* ensure mobile UX is excellent

## Do Not Do

Do not:

* rebuild everything at once
* invent new facts about Igal
* overstate AI expertise
* make the site feel like a gimmick
* create a cartoon chatbot
* add unnecessary dependencies
* expose API keys in frontend code
* add real LLM calls before the structured content and static AI guide are working
* remove useful existing content without checking relevance
* create huge components that are hard to maintain
* ignore accessibility

## Development Style

Prefer:

* small focused changes
* readable components
* data-driven content
* structured content files
* reusable sections
* clear naming
* mobile-first layout
* accessible HTML
* minimal dependencies
* clear commit messages
* updating docs after meaningful changes

## Current Work Mode

This project should be developed with Codex using clear tasks.

Each Codex task should:

1. Read relevant docs.
2. Make a scoped change.
3. Avoid unrelated changes.
4. Run relevant checks if possible.
5. Update `docs/codex/current-state.md`.
6. Update `docs/codex/next-task.md` when appropriate.

## Success Criteria

The refactor is successful if:

* the portfolio feels mature and professional
* recruiters can understand Igal’s role fit quickly
* the homepage is easy to scan
* selected work is stronger and less cluttered
* the AI/automation direction feels credible
* the AI guide feels useful, grounded, and optional
* the site aligns with Igal’s CV and career coaching narrative
* the codebase remains maintainable
* the docs help Codex continue development without losing context
