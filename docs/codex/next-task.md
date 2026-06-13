# Next Task

## Task Title

Extract homepage sections into components.

## Goal

After the strengthened homepage visual identity is approved, split the refactored homepage in `app/pages/index.vue` into focused, maintainable section components without changing the homepage information architecture, facts, routes, or visual direction.

The goal is code organization only. The homepage should render the same eight-section recruiter flow:

1. Hero
2. Recruiter Snapshot
3. Ask My Portfolio preview
4. Selected Work
5. How I Work
6. AI / Automation Focus
7. Experience Snapshot
8. Contact CTA

## Context

The homepage information architecture is stable. A stronger light-first product/SaaS-style visual identity pass has been applied after the previous version still felt too close to the old portfolio style.

Component extraction should remain paused until that visual identity is approved.

Current positioning remains:

> Full-stack software developer building SaaS products and practical AI-assisted workflows.

The page currently imports structured content from:

```text
content/profile.json
content/projects.json
content/experience.json
content/skills.json
content/faq.json
```

Preserve the structured content source of truth.

## Recommended Scope

Create focused homepage section components, likely under an existing or new component directory that fits the Nuxt app structure.

Suggested components:

```text
HomepageHero.vue
RecruiterSnapshot.vue
AskPortfolioPreview.vue
SelectedWork.vue
HowIWork.vue
AiAutomationFocus.vue
ExperienceSnapshot.vue
HomepageContactCTA.vue
```

Good scope:

* keep data preparation readable
* pass props from the page into section components where practical
* preserve current section IDs and order
* preserve the current homepage content hierarchy
* preserve the approved visual styling direction
* keep components simple and local to the homepage unless reuse is obvious

Avoid in this task:

* changing content facts
* changing routes
* adding dependencies
* implementing real AI
* adding API routes
* redesigning the visual system again unless the user explicitly asks for another visual pass
* rebuilding case studies
* deleting useful pages

## Files Likely To Inspect

```text
app/pages/index.vue
app/assets/css/main.css
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
* Do not implement real AI.
* Do not add API routes.
* Do not change routes.
* Do not change structured content facts.
* Do not alter the homepage IA.
* Do not make a new visual redesign pass.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* the homepage still renders the same eight sections in the same order
* `app/pages/index.vue` is smaller and easier to scan
* homepage sections live in focused Vue components
* structured content usage remains clear
* visual styling remains materially unchanged
* no real AI, API route, dependency, or route change is added
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
