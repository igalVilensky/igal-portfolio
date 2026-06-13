# Next Task

## Task Title

Visual system refactor.

## Goal

Move the portfolio’s visual system toward a mature, calm, recruiter-friendly product-engineering style now that the homepage information architecture is in place.

The goal is not to redesign everything from scratch. The goal is to make the existing Nuxt/Tailwind interface feel clearer, quieter, more readable, and more aligned with:

> Full-stack software developer building SaaS products and practical AI-assisted workflows.

## Context

The homepage now follows the target IA:

1. Hero
2. Recruiter Snapshot
3. Ask My Portfolio preview
4. Selected Work
5. How I Work
6. AI / Automation Focus
7. Experience Snapshot
8. Contact CTA

The next step is to polish the visual language around that structure.

## Design Direction

Follow:

```text
docs/design/visual-direction.md
```

The site should feel:

* clean
* mature
* calm
* readable
* recruiter-friendly
* product-minded
* case-study-driven
* lightly technical

Avoid:

* loud gradients
* neon/cyberpunk styling
* excessive animation
* heavy glassmorphism
* overly playful AI visuals
* decorative elements that compete with content

## Recommended Scope

Focus on the homepage and shared visual primitives used there.

Good scope:

* simplify colors and backgrounds
* reduce gradient-heavy styling
* improve typography hierarchy
* tighten section spacing
* make cards cleaner and more content-led
* make buttons and links more consistent
* improve mobile readability
* keep the static Ask My Portfolio preview professional
* preserve the data-driven homepage structure

Avoid in this task:

* changing routes
* adding dependencies
* implementing real AI
* adding API routes
* rebuilding all case studies
* deleting useful pages
* inventing new facts

## Files Likely To Inspect

```text
app/pages/index.vue
app/assets/css/main.css
tailwind.config.js
docs/design/visual-direction.md
docs/codex/current-state.md
```

Only change `tailwind.config.js` if truly needed. Prefer scoped or existing utility-class improvements first.

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not implement real AI.
* Do not overstate AI expertise.
* Do not change the structured content facts.
* Keep visual changes restrained and purposeful.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* homepage feels calmer and more recruiter-friendly
* text hierarchy is easier to scan
* section and card styling is more consistent
* colors and effects are less flashy
* mobile layout remains readable
* no real AI or new dependencies are added
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
