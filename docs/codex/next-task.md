# Next Task

## Milestone 4 — Assistant purpose and public knowledge review

Status: proposed after completed Milestones 3 and 3.1, 2026-10-10. Do not start automatically.

## Objective

Align the existing assistant’s answers and public knowledge with project and engineering exploration. Milestone 3 updated the homepage composition, public facts, relevant EN/DE/RU copy and metadata, and assistant introductory/default-question text. Milestone 3.1 completed public localization, including reactive UI states, structured project summaries/categories, assistant evidence labels, and runtime suggestions. This next task addresses the remaining behavior behind that interface.

## Read first

Read `docs/strategy/positioning.md`, `docs/codex/implementation-rules.md`, `docs/codex/current-state.md`, and `docs/i18n-content.md`. Review the assistant UI, `content/portfolio-agent.json`, FAQ/role-fit content, both runtime implementations, and generated knowledge exports. Inspect personal knowledge carefully without reproducing sensitive values in documentation or tool output.

## Proposed scope

1. Review candidate-evaluation answers, internal role/availability labels, and CV response actions together. Runtime follow-up questions now match the neutral localized default suggestions. Preserve compatibility IDs until all consumers migrate.
2. Establish an approved public knowledge boundary for personal and compensation topics. Do not assume server-side storage makes information private. Do not invent new facts or publish additional employer details.
3. Keep answers grounded in documented projects and engineering experience, with sources and explicit unknowns. Confirm neutral default prompts behave usefully in EN/DE/RU.
4. Synchronize canonical content and `netlify/functions/lib/portfolioKnowledge.js`; preserve the existing provider architecture and fallback behavior. Replace positional historical-experience lookup with stable IDs only within a coordinated change.
5. Decide assistant naming/navigation prominence if needed; do not infer permission for a broader navigation redesign.

## Verification

Validate changed JSON and translated keys. Run `npm run lint:i18n`, `npm run lint:i18n:public`, `npm run build`, and `git diff --check`. Check development and Netlify behavior, including unavailable-provider fallback and unsupported questions. Record what was and was not tested. Update current state and next task.

## Localization verification follow-up

Milestone 3.1 passed the build, source/content checks, all 39 HTTP/SSR routes, and targeted EN/DE/RU interactions plus desktop/mobile switching. Repeat the full browser-console sweep when sufficient browser resources are available: its layout-chunk failures were traced to Chrome `ERR_INSUFFICIENT_RESOURCES`. No horizontal overflow or untranslated keys were observed in that sweep. Live provider output and speech services were not exercised.

## Deferred and preserved

Preserve Nuxt, Vue, TypeScript, Tailwind, Netlify, supported locales, routes, project links, experiments, and historical employment facts. No new dependencies, providers, Notes section, confidential Agorando details, automatic commit, or push.

Downloadable CV/certificate and README currency still require review; do not fabricate replacements. Public project descriptions and AI labels are now localized. Evidence-led case studies remain later work. Stop after the separately authorized milestone.
