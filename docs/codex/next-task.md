# Next Task

## Task Title

Redesign the Work index page.

## Goal

Refactor `/case-studies` into a minimal, project-led index that matches the new homepage and global shell style.

## Context

The homepage is now a compact developer portfolio index:

1. Minimal hero
2. Selected Work
3. Ask about the portfolio
4. Contact

The global shell now supports the same direction:

* narrow text navigation
* minimal footer
* calmer shared page primitives
* no large sitemap footer
* no logo/name block in the nav
* no landing-page CTA in the nav

Current positioning remains:

> Full-stack developer building SaaS products, web applications, and AI-assisted tools.

## Recommended Scope

Good scope:

* redesign `app/pages/case-studies/index.vue`
* make the page a compact Work index, not a landing page
* keep Flowplace Role Compass, OpenMe, Decision Matrix AI, and ARI Motors EV Portal as the strongest work
* group secondary and lab projects quietly below primary work if they are shown
* use concise project rows or simple bordered entries
* include title, one-sentence summary, compact tech line, and one primary link per project
* preserve existing case-study routes and project links
* keep dark mode support
* run the build after implementation

Avoid in this task:

* redesigning every case-study detail page
* changing routes
* adding dependencies
* adding new AI providers or touching API keys
* inventing project facts, metrics, or links
* reintroducing large cards, badges, promotional CTA panels, icons, gradients, glow, glassmorphism, or decorative effects
* repeating the full stack/current-course/process narrative from the homepage

## Files Likely To Inspect

```text
app/pages/case-studies/index.vue
app/composables/useProjects.ts
content/projects.json
docs/codex/current-state.md
```

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not change routes.
* Do not expose API keys.
* Do not invent facts.
* Keep homepage and global shell minimal.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* `/case-studies` matches the minimal portfolio style
* primary projects are easy to scan and clearly prioritized
* secondary/lab work does not compete with the strongest work
* no routes, providers, dependencies, or unsupported facts are introduced
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
