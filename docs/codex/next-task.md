# Next Task

## Task Title

Redesign the About page.

## Goal

Bring `/about` in line with the new minimal, document-like portfolio direction.

## Context

The homepage, global shell, Work index, first individual case-study detail pages, and focused AI & Automation page now use a compact developer portfolio style, and the standalone Experience route has been removed from the public structure:

* narrow layout
* typography-first presentation
* simple bordered rows
* quiet dark mode
* no large stat cards, gradient hero treatments, visualizers, decorative timelines, or promotional CTA panels

The public navigation model is Home, Work, Experiments, AI, and About. The active About page still carries older landing-page patterns:

* `AboutVisualizer`
* GSAP / ScrollTrigger reveal animation
* large rounded cards
* glossy/translucent panels and shadow-heavy blocks
* icon-heavy working-area cards
* gradient text treatment
* promotional contact CTA panel

Current positioning remains:

> Full-stack developer building SaaS products, web applications, and AI-assisted tools.

## Recommended Scope

Good scope:

* inspect `app/pages/about.vue`, `app/components/AboutVisualizer.vue`, `content/profile.json`, `content/skills.json`, and `content/professional-narrative.md`
* make `/about` read like a concise professional profile
* use structured content where practical
* show a short profile summary, working style, strongest skill/context areas, location/language context, and current WBS AI Agents & Automations learning
* keep dark mode support
* if `AboutVisualizer.vue` becomes unused after this change, remove it only after confirming no references remain
* run the build after implementation

Avoid in this task:

* redesigning the homepage, Work index, case-study pages, navbar, footer, or `/ai-automation`
* changing project/case-study route mappings
* changing routes
* adding dependencies
* adding providers, AI features, or API-key changes
* inventing facts, metrics, companies, links, or claims
* reintroducing deleted legacy components from the previous landing-page direction
* reintroducing large cards, decorative timelines, icon-heavy blocks, gradients, glow, glassmorphism, or scroll reveal animation

## Files Likely To Inspect

```text
app/pages/about.vue
app/components/AboutVisualizer.vue
content/profile.json
content/skills.json
content/professional-narrative.md
app/assets/css/main.css
docs/codex/current-state.md
```

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not change routes.
* Do not expose API keys.
* Do not invent facts.
* Preserve homepage, global shell, Work index, case-study, AI & Automation, and the five-item public navigation model.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* `/about` matches the minimal portfolio style
* profile facts and current AI automation learning are preserved
* the page is easier to scan for recruiters and hiring managers
* no routes, providers, dependencies, or unsupported facts are introduced
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
