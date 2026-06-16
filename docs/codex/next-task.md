# Next Task

## Task Title

Add concise case-study pages for OpenMe and Decision Matrix AI.

## Goal

Give the remaining primary portfolio projects their own focused, document-style case-study pages so the strongest Work items have deeper proof without changing the minimal public direction.

## Context

The public navigation model is now:

```text
Home
Work
Experiments
AI
About
```

The homepage, global shell, Work index, Experiments workbench, AI & Automation page, About page, public route structure, and first existing case-study detail pages now use the compact developer portfolio style:

* narrow layout
* typography-first presentation
* simple bordered rows and panels
* quiet dark mode
* no large stat-card systems, gradient hero treatments, visualizers, decorative timelines, or promotional CTA panels

Experiments is intentionally interactive. Do not turn it into a static project index in future cleanup passes.

### Recent completed UI/UX polish

The UI/UX consistency pass is now complete.

* Lucide semantic icons are in use across the navbar and section headings.
* Selected Work on the homepage and Work index now features compact badges and external-link affordances.
* Experiments remains interactive with its tools and lab shelf.
* Security Playground has been restored as an interactive educational lab.
* AI & Automation page's taxonomy and section structure are preserved with added iconography.
* The minimal document-like visual direction remains the baseline for the entire portfolio.

Primary project order is:

```text
Flowplace Role Compass
OpenMe
Decision Matrix AI
ARI Motors EV Portal
```

Current case-study coverage:

* `/case-studies/flowplace` covers Flowplace Role Compass.
* `/case-studies/leanera` is a legacy route name, but its content covers ARI Motors EV Portal.
* `/case-studies/cashdo` is a legacy route name, but its content covers LeanERA Digital Transition.
* `/case-studies/security` covers Security Playground.
* OpenMe and Decision Matrix AI are primary projects but do not yet have dedicated case-study routes.

## Recommended Scope

Good scope:

* inspect `docs/codex/current-state.md`
* inspect `docs/codex/implementation-rules.md`
* inspect `app/pages/case-studies/flowplace.vue`
* inspect `app/pages/case-studies/index.vue`
* inspect `app/composables/useProjects.ts`
* inspect `content/projects.json`
* add concise document-style case-study pages for OpenMe and Decision Matrix AI if no route conflicts exist
* update project data links only after the new routes exist
* keep the new pages visually consistent with the existing redesigned case-study pages
* run the build after implementation

Possible route names:

```text
/case-studies/openme
/case-studies/decision-matrix-ai
```

Use these only if they are available and no existing route/content mapping conflicts.

## Content Boundaries

Use existing documented facts only:

* OpenMe facts from `app/composables/useProjects.ts`, `content/projects.json`, and the existing live/GitHub links.
* Decision Matrix AI facts from `app/composables/useProjects.ts`, `content/projects.json`, and the existing live/GitHub links.
* Do not invent adoption metrics, user counts, architecture claims, product outcomes, or business impact.
* It is acceptable to say that no user/adoption metric is documented where relevant.

## Avoid In This Task

* redesigning Home, Work index, Experiments, AI & Automation, About, navbar, footer, or existing case-study pages
* removing or hiding the interactive Experiments tools
* renaming existing legacy case-study routes
* changing the public navigation model
* adding dependencies
* adding AI providers, API keys, or AI helper changes
* adding ungrounded metrics, outcomes, or claims
* reintroducing visualizers, GSAP page animation, gradient heroes, large cards, glow/glass treatments, decorative timelines, or promotional CTA panels

## Acceptance Criteria

The task is complete when:

* OpenMe has a concise case-study page if the route is safely available
* Decision Matrix AI has a concise case-study page if the route is safely available
* `app/composables/useProjects.ts` and `content/projects.json` link to the new case-study pages if they were added
* the Work index exposes the new case-study links through existing row link behavior
* no unrelated routes, providers, dependencies, or visual systems are changed
* build/check passes or any blocker is documented
* `docs/codex/current-state.md` and this file are updated for the next milestone
