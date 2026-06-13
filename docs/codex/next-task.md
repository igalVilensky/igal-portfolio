# Next Task

## Task Title

Build the static Ask My Portfolio guide.

## Goal

Turn the current Ask My Portfolio preview into a deterministic, recruiter-friendly guide using local structured content only.

This is not a real AI task. The goal is to create a useful static guide experience with suggested recruiter questions and predefined grounded answers.

## Context

The homepage now has:

1. Stable recruiter-focused information architecture.
2. A strengthened light-first product/SaaS visual identity.
3. Focused section components under `app/components/home/`.
4. A static Ask My Portfolio preview powered by `content/faq.json`.

Current positioning remains:

> Full-stack software developer building SaaS products and practical AI-assisted workflows.

## Recommended Scope

Use local structured content as the source of truth:

```text
content/profile.json
content/projects.json
content/experience.json
content/skills.json
content/role-fit.json
content/faq.json
```

Good scope:

* expand the current Ask My Portfolio preview into a more useful deterministic guide
* show suggested recruiter questions from `content/faq.json`
* display predefined answers from `content/faq.json`
* optionally group questions by recruiter intent such as role fit, frontend experience, SaaS proof, AI/automation, location, and contact
* keep answers grounded in existing content facts
* preserve the current visual system and mature product style
* keep the interaction simple, clear, and static-deployment friendly

Avoid in this task:

* real AI or LLM calls
* API routes
* external browsing
* new dependencies
* invented facts or unsupported claims
* route changes unless explicitly approved
* redesigning the homepage visual system
* changing project, experience, profile, or FAQ facts

## Files Likely To Inspect

```text
app/pages/index.vue
app/components/home/AskPortfolioPreview.vue
content/faq.json
content/profile.json
content/projects.json
content/experience.json
content/skills.json
content/role-fit.json
docs/codex/current-state.md
```

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not implement real AI.
* Do not add API routes.
* Do not expose API keys.
* Do not change routes unless the user explicitly asks.
* Do not change structured content facts.
* Preserve the visual direction unless the user asks for a visual pass.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* Ask My Portfolio is more useful than the current preview
* suggested questions are visible and selectable
* answers are deterministic and come from local content
* no real AI, API route, dependency, or external service is added
* content facts remain unchanged
* the current homepage IA and visual style are preserved
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
