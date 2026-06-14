# Next Task

## Task Title

Redesign individual case-study pages.

## Goal

Bring the case-study detail pages in line with the new minimal, document-like portfolio direction.

## Context

The homepage, global shell, and Work index now use a compact developer portfolio style:

* narrow layout
* typography-first presentation
* minimal navigation and footer
* compact project rows
* no visualizer, large stats, gradient hero, GSAP reveal animations, or promotional CTA blocks on the Work index

Current positioning remains:

> Full-stack developer building SaaS products, web applications, and AI-assisted tools.

## Recommended Scope

Good scope:

* redesign the existing case-study detail routes without changing their paths
* start with:
  * `app/pages/case-studies/flowplace.vue`
  * `app/pages/case-studies/leanera.vue`
  * `app/pages/case-studies/cashdo.vue`
  * `app/pages/case-studies/security.vue`
* make each page read like a concise technical case-study document
* keep the strongest facts, outcomes, role context, stack, and links
* use simple headings, paragraphs, lists, and bordered sections
* keep dark mode support
* run the build after implementation

Avoid in this task:

* changing routes
* deleting case-study pages
* adding dependencies
* adding new AI providers or touching API keys
* inventing project facts, metrics, or links
* reintroducing large cards, badges, promotional CTA panels, icons, gradients, glow, glassmorphism, visualizers, or scroll reveal animations
* redesigning unrelated pages such as About, Contact, Experiments, or AI Compliance Compass

## Files Likely To Inspect

```text
app/pages/case-studies/flowplace.vue
app/pages/case-studies/leanera.vue
app/pages/case-studies/cashdo.vue
app/pages/case-studies/security.vue
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
* Preserve homepage, global shell, and Work index direction.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* individual case-study pages match the minimal portfolio style
* project facts, links, and routes are preserved
* detail pages are easier to scan and less visually noisy
* no routes, providers, dependencies, or unsupported facts are introduced
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
