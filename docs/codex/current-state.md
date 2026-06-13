# Current State

## Project

Repository:

```text
igalVilensky/igal-portfolio
```

This is an existing Nuxt/Vue/TypeScript portfolio site. Refactor it in place. Do not create a new app or migrate frameworks unless explicitly requested.

## Strategic Direction

The portfolio is being repositioned into a mature, recruiter-friendly product-engineering portfolio.

Core positioning:

> Full-stack software developer building SaaS products and practical AI-assisted workflows.

Igal should be positioned as a software developer with real product experience who is expanding into AI agents, automations, and AI-assisted workflows.

## Documentation Foundation

These planning docs are present:

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

They define positioning, target roles, visual direction, implementation rules, site map, build order, state, and next tasks.

## Content Source Of Truth Added

Milestone 2 is complete. A top-level `content/` folder now contains:

```text
content/profile.json
content/experience.json
content/projects.json
content/skills.json
content/role-fit.json
content/faq.json
content/professional-narrative.md
```

These files consolidate factual portfolio data from the CV PDF, certificate PDF, existing locale copy, current project composable, case-study pages, README links, and strategy docs.

The structured content covers:

* profile, location, contact links, languages, target roles, and current WBS course
* professional and education timeline
* featured, secondary, and lab project data
* skill groups
* role-fit summaries for target roles
* recruiter-style FAQ answers for a future static guide
* professional narrative variants

Known content boundaries:

* WBS AI Agents & Automations dates are not available in the repo, so they remain `null`.
* Some existing case-study routes have naming mismatches, and the project content records notes rather than hiding that uncertainty.
* Project metrics are only included where the repository documents them.

## Current App Understanding

The existing app already has:

* Nuxt/Vue/TypeScript foundation
* Tailwind styling
* homepage sections such as Hero, MyStory, IntegratedSkills, CaseStudiesPreview, ContactCTA
* project data in `app/composables/useProjects.ts`
* multiple project/case-study routes
* live deployment context
* current AI/automation language in parts of the site

No UI code was changed during Milestone 2.

## Strongest Featured Projects

The new content files prioritize:

1. Flowplace Role Compass
2. OpenMe
3. Decision Matrix AI
4. ARI Motors EV Portal

Other projects are marked as secondary or lab so they do not compete equally on the homepage.

## AI Guide Status

The AI guide is still not implemented.

Preferred path:

1. Static/deterministic guide first.
2. Use suggested recruiter questions and predefined answers.
3. Connect to the structured content layer.
4. Add optional server-side LLM only later, with safe fallback and no frontend API keys.

## Next Recommended Phase

The next phase should be:

> Refactor homepage information architecture.

Use the content files as the source of truth and restructure the homepage around recruiter scanning before doing a visual-system polish.

Target homepage sections:

1. Hero
2. Recruiter Snapshot
3. Ask My Portfolio preview
4. Selected Work
5. How I Work
6. AI / Automation Focus
7. Experience Snapshot
8. Contact CTA

## Known Constraints

* Do not create a new repo.
* Do not migrate away from Nuxt.
* Do not add dependencies unless explicitly requested.
* Do not start with real AI integration.
* Do not implement RAG or MCP in the portfolio MVP.
* Do not invent facts.
* Do not overstate AI expertise.
* Do not make the site flashy.
* Do not rebuild all pages in one task.
* Keep the site working after each milestone.

## Last Updated

2026-06-13 after creating the structured content source files.
