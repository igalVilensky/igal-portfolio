# Next Task

## Task Title

Align secondary pages with the simplified portfolio direction.

## Goal

Review and simplify the non-homepage experience so it supports the new compact, project-led developer portfolio direction without reintroducing marketing-style repetition.

## Context

The homepage has been simplified into:

1. Minimal hero
2. Selected Work
3. Ask about the portfolio
4. Contact

The homepage now avoids recruiter snapshot blocks, process sections, large AI marketing sections, experience snapshots, long bio copy, repeated stack lists, full course explanations, and a large footer sitemap.

Current positioning remains:

> Full-stack developer building SaaS products, web applications, and AI-assisted tools.

## Recommended Scope

Good scope:

* audit `/case-studies`, project detail pages, `/about`, `/contact`, global navigation, and shared footer treatment
* keep the work/case-study index as the deeper place for project proof
* remove or compress repeated stack, role, current-course, and process copy across secondary pages
* keep full experience, languages, detailed stack, current course, process, and detailed role fit available away from the homepage or through Ask My Portfolio
* preserve existing routes
* preserve Ask My Portfolio AI and deterministic FAQ fallback behavior
* keep the light-first mature visual style
* run the build after implementation

Avoid in this task:

* adding dependencies
* adding a new AI provider
* exposing API keys
* inventing facts or unsupported claims
* redesigning the site into a landing page again
* deleting routes
* changing structured content facts unless the user provides corrections

## Files Likely To Inspect

```text
app/pages/case-studies/index.vue
app/pages/case-studies/*.vue
app/pages/about.vue
app/pages/contact.vue
app/components/Navbar.vue
app/components/Footer.vue
content/profile.json
content/projects.json
content/experience.json
content/skills.json
content/faq.json
docs/codex/current-state.md
```

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not change routes.
* Do not expose API keys.
* Do not invent facts.
* Preserve deterministic FAQ fallback.
* Keep homepage content minimal.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* secondary pages support the simplified portfolio direction
* repeated homepage-style copy is reduced across the site
* project proof remains easy to find
* no routes, providers, dependencies, or unsupported facts are introduced
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
