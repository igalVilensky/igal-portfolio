# Next Task

## Task Title

Redesign the Experiments page.

## Goal

Bring `/experiments` in line with the new minimal, document-like portfolio direction.

## Context

The public navigation model is now:

```text
Home
Work
Experiments
AI
About
```

The homepage, global shell, Work index, first individual case-study detail pages, focused AI & Automation page, public route structure, and About page now use a compact developer portfolio style:

* narrow layout
* typography-first presentation
* simple bordered rows
* quiet dark mode
* no large stat cards, gradient hero treatments, visualizers, decorative timelines, or promotional CTA panels

The active Experiments page still carries older lab/landing-page patterns:

* `ExperimentsVisualizer`
* GSAP reveal animation
* gradient hero text
* large module layout
* hover-scale module swapping
* rounded/glassy cards
* icon-heavy promotional CTA panel

Current positioning remains:

> Full-stack developer building SaaS products, web applications, and AI-assisted tools.

## Recommended Scope

Good scope:

* inspect `app/pages/experiments.vue`, `app/components/ExperimentsVisualizer.vue`, `app/components/ArchitectSimulator.vue`, `app/components/lab/JsonToTs.vue`, `app/components/lab/ContrastChecker.vue`, and `app/composables/useProjects.ts`
* make `/experiments` a concise lab/utility index rather than a showy interactive landing page
* present experiment/lab projects as compact rows using existing project data where practical
* decide whether the current interactive lab tools still belong on the page; if they stay, frame them simply and avoid visualizer/animation treatment
* if `ExperimentsVisualizer.vue` becomes unused after this change, remove it only after confirming no references remain
* keep dark mode support
* run the build after implementation

Avoid in this task:

* redesigning the homepage, Work index, case-study pages, About page, navbar, footer, or `/ai-automation`
* changing project/case-study route mappings
* changing routes
* adding dependencies
* adding providers, AI features, or API-key changes
* inventing facts, metrics, companies, links, or claims
* reintroducing deleted legacy components from the previous landing-page direction
* reintroducing large cards, decorative timelines, icon-heavy blocks, gradients, glow, glassmorphism, or scroll reveal animation

## Files Likely To Inspect

```text
app/pages/experiments.vue
app/components/ExperimentsVisualizer.vue
app/components/ArchitectSimulator.vue
app/components/lab/JsonToTs.vue
app/components/lab/ContrastChecker.vue
app/composables/useProjects.ts
app/assets/css/main.css
docs/codex/current-state.md
```

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not change routes.
* Do not expose API keys.
* Do not invent facts.
* Preserve homepage, global shell, Work index, case-study, AI & Automation, About page, and the five-item public navigation model.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* `/experiments` matches the minimal portfolio style
* useful lab/experiment content remains available without a marketing/lab-showcase treatment
* no routes, providers, dependencies, or unsupported facts are introduced
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
