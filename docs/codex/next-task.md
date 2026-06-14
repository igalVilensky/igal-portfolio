# Next Task

## Task Title

Redesign the Experience page.

## Goal

Bring `/experience` in line with the new minimal, document-like portfolio direction.

## Context

The homepage, global shell, Work index, and first individual case-study detail pages now use a compact developer portfolio style:

* narrow layout
* typography-first presentation
* simple bordered rows
* quiet dark mode
* no large stat cards, gradient hero treatments, visualizers, or promotional CTA panels

The cleanup pass has also removed unused legacy landing-page components, old demo/security components, stale no-op animation hooks, and unreferenced public images. The active Experience page and `app/components/Experience.vue` remain intentionally untouched by that cleanup and are still the next redesign target.

Current positioning remains:

> Full-stack developer building SaaS products, web applications, and AI-assisted tools.

## Recommended Scope

Good scope:

* inspect `app/pages/experience.vue`, `app/components/Experience.vue`, and `content/experience.json`
* make the Experience page read like a concise professional timeline
* use compact rows or sections for each role
* show organization, role, dates, location/type where available, and the strongest contribution bullets
* preserve corrected facts:
  * Flowplace is `Software Developer`, `2023 - 2025`, not current
  * WBS CODING SCHOOL is `2026 - Present`, Online
  * Myfxbook Ltd / Cashdo is framed as `Digital Product & Web Coordinator`
* keep dark mode support
* run the build after implementation

Avoid in this task:

* redesigning the homepage, Work index, case-study pages, navbar, or footer again
* changing project/case-study route mappings
* changing routes
* adding dependencies
* adding providers, AI features, or API-key changes
* inventing facts, metrics, companies, links, or claims
* reintroducing deleted legacy components from the previous landing-page direction
* reintroducing large cards, decorative timelines, icon-heavy blocks, gradients, glow, glassmorphism, or scroll reveal animation

## Files Likely To Inspect

```text
app/pages/experience.vue
app/components/Experience.vue
content/experience.json
content/profile.json
docs/codex/current-state.md
```

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not change routes.
* Do not expose API keys.
* Do not invent facts.
* Preserve homepage, global shell, Work index, and case-study direction.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* `/experience` matches the minimal portfolio style
* experience facts and corrected dates are preserved
* the page is easier to scan for recruiters and hiring managers
* no routes, providers, dependencies, or unsupported facts are introduced
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
