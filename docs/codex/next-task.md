# Next Task

## Milestone 3 — Public factual copy consistency

Status: proposed next task after completed Milestone 2, 2026-10-10. Do not start automatically. This is a copy-only follow-up within existing pages, not a UI redesign or information architecture change.

## Objective

Bring hardcoded public copy into agreement with the modernized canonical facts. Prioritize Home, About, AI & Automation, Contact, and Education. Preserve layouts, interactions, routes, navigation, and the existing assistant implementation.

## Read first

Read `docs/strategy/positioning.md`, `docs/codex/implementation-rules.md`, `docs/codex/current-state.md`, and `docs/i18n-content.md`. The current profile and experience JSON are the factual baseline; earlier recruitment and ongoing-course instructions are superseded.

Confirmed facts:

* AI Software Engineer at Agorando Technologies GmbH since August 2026.
* Flowplace GmbH was previous employment, 2023–2025.
* AI Agents & Automations at WBS CODING SCHOOL completed July 2026.
* Based in Leipzig, Germany.
* Current scope: software development, enterprise integrations, internal applications, AI and process automation. No internal employer details or unverified outcomes may be added.
* Technology background spans professional work, independent projects, and education; do not imply equal depth or assign a stack to Agorando.

## Bounded scope

1. Trace the locale configuration before editing `i18n/locales/{en,de,ru}.json` or `app/i18n/locales/{en,de,ru}.json`. Update only relevant public factual strings; keep supported translations equivalent without introducing a localization refactor.
2. Inspect HomeHero, HomeContactCTA, and `app/pages/index.vue`. Correct factual identity/contact/SEO text using canonical content where practical. The canonical contact sentence is already neutral; preserve it.
3. In `app/pages/about.vue`, replace the hardcoded ongoing-WBS paragraph and “Current” education snapshot with current employment and accurately labeled completed education, within the existing layout. Qualify the broad “day-to-day stack” claim using the verified experience contexts.
4. In `app/pages/ai-automation.vue`, replace “Current learning” and ongoing-course metadata with completed education wording. Keep the tool/project grouping and links. Do not present coursework or independent projects as internal employer work.
5. In `app/components/Contact.vue` and `app/pages/contact.vue`, replace asserted open-role/freelance availability and recruiting copy with simple contact wording. Preserve the existing interface and links.
6. Inspect `app/pages/education.vue`, `app/components/Education.vue`, and associated locale strings for conflicting completion facts. Correct only stale facts; do not invent course dates or credentials.
7. Update current state and next task with changed surfaces, verification, and remaining assistant-copy work. Review CV/certificate and README currency as a backlog item; do not fabricate replacement documents.

## Preserve compatibility

`profile.current_course` is a legacy key containing completed education; `target_roles` is an empty compatibility array, and `current_focus` contains professional areas. Do not remove these keys in a copy pass. The assistant’s generated `netlify/functions/lib/portfolioKnowledge.js` snapshot was synchronized in Milestone 2. Avoid unnecessary canonical content edits; if a verified correction is needed, keep its generated export synchronized without changing provider logic.

Experience order preserves Flowplace at index zero because existing assistant code references it as historical evidence. Do not reorder entries in this task. Use stable IDs to find the current Agorando role.

## Deferred

No new pages, navigation changes, layout redesign, project reordering, dependency additions, provider changes, or automatic commits/pushes. No Notes launch or case-study additions.

Assistant naming, recruiter/role-fit question wording, compensation behavior, personal knowledge visibility, CV actions, and internal “Target roles” labels require a coordinated Milestone 4 review across app, locales, canonical content, and both runtimes. Leave that behavior intact and document it; do not partially rename IDs or alter personal data in this copy pass.

## Acceptance and verification

* Reviewed pages accurately state current employment and completed education; no ongoing-WBS, active-job-search, or unverified freelance-availability claims remain on those surfaces.
* Existing routes, links, layouts, and interactive tools work; no employer details beyond the confirmed public scope are introduced.
* Changed locale JSON parses and translated facts agree. Check for missing keys and use existing locale validation where applicable without adding dependencies.
* Run `npm run build`, review the diff, and inspect the affected rendered pages in supported locales when tooling permits. Report limits rather than claiming unperformed checks.
* Explicitly list remaining assistant recruitment copy and any outdated downloadable documents. Stop after this milestone.
