# Next Task

## Task Title

Add source cues and QA cases for Ask My Portfolio.

## Goal

Harden the AI-powered Ask My Portfolio guide by making answer grounding clearer and defining a small manual QA set for recruiter questions.

The guide already uses the existing Groq-backed portfolio AI route when available and falls back to deterministic local FAQ answers when AI is unavailable.

## Context

The homepage now has:

1. Stable recruiter-focused information architecture.
2. A strengthened light-first product/SaaS visual identity.
3. Focused section components under `app/components/home/`.
4. Ask My Portfolio implemented in `app/components/home/AskPortfolioPreview.vue`.
5. Existing AI infrastructure reused through `useGroqChat()`, `/api/groqChat`, and `/.netlify/functions/groqChat`.
6. Static FAQ fallback from `content/faq.json`.

Current positioning remains:

> Full-stack software developer building SaaS products and practical AI-assisted workflows.

## Recommended Scope

Good scope:

* add lightweight source cues to the Ask My Portfolio answer panel
* indicate whether an answer is backed by FAQ, project, experience, role-fit, skills, or profile content
* add a concise manual QA checklist for common recruiter prompts
* include at least one unavailable-information prompt to verify the guide says when information is missing
* verify fallback behavior when `GROQ_API_KEY` is missing or the AI request fails
* preserve current homepage IA and visual style
* keep all answer grounding tied to local structured content

Avoid in this task:

* adding a new AI provider
* exposing API keys on the frontend
* adding dependencies
* adding browsing, email sending, scheduling, job applications, or external actions
* inventing facts or unsupported claims
* redesigning the homepage visual system
* changing routes unless explicitly requested

## Files Likely To Inspect

```text
app/components/home/AskPortfolioPreview.vue
app/pages/index.vue
app/composables/useGroqChat.ts
server/api/groqChat.post.ts
netlify/functions/groqChat.js
content/faq.json
content/projects.json
content/experience.json
content/skills.json
content/role-fit.json
docs/codex/current-state.md
```

## Rules

* Keep the app working.
* Do not add dependencies.
* Do not add a new AI provider.
* Do not expose API keys.
* Preserve the deterministic FAQ fallback.
* Do not change structured content facts.
* Preserve the visual direction unless the user asks for a visual pass.
* Run the relevant build/check command if possible.
* Update `docs/codex/current-state.md` after completing the task.
* Update this file with the next recommended task after completion.

## Acceptance Criteria

The task is complete when:

* Ask My Portfolio answers show clearer grounding/source cues
* a small QA prompt set is documented or implemented
* fallback behavior remains intact
* no new provider, dependency, route change, or external action is added
* no unsupported facts are introduced
* build/check passes or any blocker is documented
* current-state and next-task docs are updated
