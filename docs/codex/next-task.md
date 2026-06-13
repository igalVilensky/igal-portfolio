# Next Task

## Task Title

Refactor homepage information architecture.

## Goal

Restructure the homepage around recruiter scanning and the new source-of-truth content files.

The goal is to make the first page communicate quickly:

* who Igal is professionally
* which roles he fits
* what stack he uses
* which projects provide the strongest proof
* how AI agents and automations connect to his existing software development experience
* how to contact him or review work

## Context

Milestone 2 created the structured content source files:

```text
content/profile.json
content/experience.json
content/projects.json
content/skills.json
content/role-fit.json
content/faq.json
content/professional-narrative.md
```

Use these files as the source of truth where practical. Do not invent new content in components.

## Target Homepage Sections

Refactor the homepage toward this structure:

1. Hero
2. Recruiter Snapshot
3. Ask My Portfolio preview
4. Selected Work
5. How I Work
6. AI / Automation Focus
7. Experience Snapshot
8. Contact CTA

## Recommended Scope

This task should focus on structure and content hierarchy first.

Good scope:

* simplify the homepage flow
* make the hero copy more direct and recruiter-friendly
* add or prepare a recruiter snapshot section
* show only the strongest selected work on the homepage
* explain AI/automation as an extension of software development
* keep visual changes restrained
* keep existing routes working

Avoid in this task:

* full visual-system redesign
* real AI integration
* new dependencies
* route migration
* deleting useful pages
* rebuilding all case studies

## Data To Use

Use:

* `content/profile.json`
* `content/projects.json`
* `content/experience.json`
* `content/skills.json`
* `content/professional-narrative.md`
* positioning docs in `docs/strategy/positioning.md`
* visual direction docs in `docs/design/visual-direction.md`

Featured homepage projects should be:

1. Flowplace Role Compass
2. OpenMe
3. Decision Matrix AI
4. ARI Motors EV Portal

## Rules

* Do not add real AI integration yet.
* Do not add dependencies.
* Do not invent facts.
* Do not overstate AI expertise.
* Keep the app working after the refactor.
* Prefer small, readable components or data-driven sections.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* homepage information hierarchy matches the target structure or a clearly justified MVP subset
* strongest role positioning is visible near the top
* selected work is limited to the highest-priority projects
* AI/automation is framed as a practical extension of software development
* no unsupported facts are introduced
* existing main routes still work
* current-state and next-task docs are updated
