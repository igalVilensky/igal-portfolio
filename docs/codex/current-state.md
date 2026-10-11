# Current State

## Active snapshot — 2026-10-10

Repository: `igalVilensky/igal-portfolio`. The active direction is a **Hybrid Personal Engineering Website**, combining professional work, independent applications, AI/automation and integrations, interactive experiments, and personal engineering ideas. The active visual target is Precision Stack + Systems Canvas + Neural Workbench, specified in Milestone 4A below. Milestone 4B.1 implements the shared visual foundation, navigation and homepage Hero; remaining homepage sections retain their existing composition. Milestone 4C adds a development-only visual identity lab with three prototypes awaiting user evaluation.

Igal is an **AI Software Engineer at Agorando Technologies GmbH since August 2026**. Work areas include software engineering, internal business tools, enterprise system integrations, automation, AI-related workflows, requirements analysis, and operational process improvements. **AI Agents & Automations at WBS CODING SCHOOL was completed in July 2026.** These user-confirmed facts supersede the older education and job-search framing below.

Agorando may be described only at this confirmed high level. Do not publish or invent private project details, code, internal architecture, operational metrics, employee/customer data, credentials, or confidential business figures. More detail requires confirmation of accuracy and public disclosure suitability.

## Milestone 4C — Interactive Visual Identity Lab

Implemented 2026-10-10. **Three experimental directions are ready for user evaluation; no winner selected or homepage integration authorized.** The existing production Hero and System Explorer remain unchanged by 4C. Earlier staged work was preserved.

### Access and production separation

- Run `npm run dev` and open `/design-lab` (the review server used `http://127.0.0.1:3103/design-lab`). No navigation or sitemap entry was added.
- `nuxt.config.ts` registers the page only when `nuxt.options.dev` is true. All page, component and CSS sources live in `app/design-lab/`, outside automatic page/component scanning, and are explicitly imported by the dev page. Production build and static generation therefore do not register the route or bundle its components. The lab also declares `noindex, nofollow` and disables localized lab routes.
- Verified the production build contains no lab code/assets, and `/design-lab`, `/design-lab/`, `/de/design-lab` and `/ru/design-lab` return HTTP 404. Added dependency-free `scripts/check-design-lab-isolation.mjs`; run after a build, optionally passing the production server origin for HTTP checks. Static generation was not separately run; it uses the same dev-only registration gate.

### Prototypes and animation approach

- **A — Living Network:** curved SVG relationships around an `iv` core, orbit contours, traveling path impulses, hover/focus emphasis, selected satellite expansion and core reticle rotation. Mouse position produces a small perspective response; selection remains available to keyboard and touch.
- **B — System Layers:** five isometric SVG planes with edge thickness, fine grids and distinct glyphs. Native adjacent buttons focus a plane, pull it forward and separate the layers with eased transform transitions. A collapse/separate control changes the stack spacing. This prototype has no idle animation.
- **C — Data Flow Engine:** a continuous folded track, traveling SVG dashes and five distinct CSS mechanisms (intake bars, rotating processor, joining rings, nested resolver, output strokes). Selection changes the mechanism boundary/scale as well as its explanation. Mobile uses a vertical connected track with full-size controls.
- Vue Composition API and TypeScript; semantic theme tokens and the existing `ThemeToggle`. CSS keyframes, cubic-bezier transform transitions and SVG only. Neither GSAP nor a new dependency was necessary; no per-frame JavaScript rendering loop, canvas, WebGL, or external visual assets.
- One mounted prototype at a time. Reset remounts the current prototype, restoring its selection and animation phase; pause/resume controls continuous motion. IntersectionObserver and document visibility pause CSS animation offscreen/in background tabs, with observer/listener cleanup on unmount. Pointer movement is ignored while stopped or under reduced motion. Reduced-motion CSS disables keyframes and transitions throughout the lab while retaining immediate selection feedback.

### Verification and artifacts

- `npm run build` and `git diff --check` passed. Production artifact scan covered 98 JS/CSS/HTML/JSON files with no lab markers. Production HTTP checks passed for the four paths above; development `/design-lab` returns 200.
- Automated Chrome sweep: all three prototypes × light/dark × 320/390/768/1440px (24 combinations). No page horizontal overflow or page JavaScript exceptions. Verified last-item click selection and first-item Space selection in each combination, plus touch-emulated selection for every prototype, reduced-motion animation removal and pause behavior.
- Additional checks verified Tab/Enter selection, mouse-driven network perspective, theme toggle and persistence after reload, offscreen suspension, moving path dash offsets and rotating mechanism transforms. Layer transforms were sampled before, during and after selection to confirm real interpolation rather than a static screenshot.
- Short desktop samples of 90 animation frames per prototype had a median interval of approximately 16.7ms, no intervals over 50ms, and a worst observed interval of 33.3ms. These are local headless-browser observations, not a device-independent performance benchmark or invented product metrics.
- Captured and visually reviewed 12 screenshots: `/tmp/design-lab-{0,1,2}-{1440,390}-{dark,light}.png` (0=A, 1=B, 2=C). Temporary test scripts are `/tmp/igal-portfolio-browser/design-lab.mjs` and `design-lab-motion.mjs`; results are `/tmp/design-lab-results.json` and `/tmp/design-lab-motion-results.json`. These artifacts are local, not shipped public assets. Some captures include existing fixed skip-link/devtools overlays from the development shell.
- Chrome initially crashed because the host disk was almost full. Using approved memory-backed temporary storage resolved it; no user files were deleted and no browser package was added to the repository.

### Accessibility and known compromises

- Native buttons with pressed states, visible focus, non-color selection indicators and polite atomic detail announcements. Main controls have at least 44px targets. Existing semantic text/control colors supply independent light and dark treatments. Decorative geometry is hidden from assistive technology; the layer image has a descriptive label and adjacent native controls.
- This development-only lab uses English copy (`lang="en"`); EN/DE/RU product catalogs and all project facts remain unchanged. It retains the existing site shell and theme system. Motion and depth intentionally explore beyond the older production motion limits, as requested for this isolated milestone.
- Layers use 2D isometric projection, not a true 3D camera; plane selection uses the adjacent labeled controls. Flow motion is illustrative and does not simulate real workload or measured throughput. Mobile flow trades the folded track for a clear vertical sequence. Reset also resets selection; switching prototypes starts them fresh.
- No physical-device, Safari/Firefox, screen-reader, actual browser-zoom, comprehensive contrast audit, or long-duration profiling was performed. Background-tab pausing is implemented via visibility events; the automated suspension test exercised offscreen observation. Subjective motion quality still requires the user's live review.
- No production homepage, assistant, navigation, project data or dependencies changed. No commit or push. Stop here and wait for the user's choice or refinement request.

## Milestone 4B.1 — expressive Hero and System Explorer

Implemented 2026-10-10 as a refinement of the foundation below. Awaiting visual approval; stop before other homepage sections.

* Reworked `HomeHero.vue` with a wider two-column composition, a prominent three-part engineering headline, blue emphasis and atmospheric semantic-token backgrounds. Preserved identity, employer, contact, work anchor and social links.
* Added `SystemExplorer.vue` and `system-explorer/domains.ts`: five conceptual domains, a central Integrations node, SVG connections, selectable semantic buttons, hover/focus highlights, contextual information and evidence-backed project links resolved through `useProjects`. No employer architecture or invented project claims.
* Mobile uses a compact hub and full-size domain buttons; desktop uses a spatial diagram. Both themes use existing semantic tokens. Selected nodes have a checkmark and thicker border; keyboard focus is explicit. Reduced motion disables flow and detail animation. No animation library or new dependency.
* Added equivalent EN/DE/RU copy in both locale catalogs. Updated the visual direction to record the explicitly authorized expressive treatment. Existing staged foundation work is preserved; the prior `HomeWorkflow.vue` remains unused. Other homepage sections, routes, project facts, providers and dependencies are unchanged.

### Verification of expressive refinement

* Final production `npm run build`, `npm run lint:i18n`, `npm run lint:i18n:public` and `git diff --check` passed.
* Headless Chrome covered EN/DE/RU × 320/390/768/1024/1440px × light/dark. All 30 combinations passed page-width and theme assertions and five-node selection checks (29 in the main final-build sweep, the last in a follow-up after a browser crash).
* Verified mouse connection highlighting, Enter/Space selection, single pressed state, visible keyboard outline, static reduced-motion connection styles, theme switching, EN → DE language switching and German case-study navigation. Both linked internal case-study destinations returned HTTP 200 in all three locales. External project URLs resolve from existing data; external availability was not tested.
* Browser automation initially caught a reduced-motion selector specificity issue; fixed and rechecked on the final build. A test initially retained the Russian locale cookie when expecting English controls; corrected the harness. Chrome resource exhaustion interrupted longer runs, so remaining checks and screenshots were split into smaller runs. No browser dependency was added to the repository.
* Final small-run checks passed the Explore Work anchor, 390px layout with 200% root text size, and normal-motion flow. Captured and visually reviewed final Hero screenshots at `/tmp/expressive-hero-{1440,390}-{light,dark}.png`. Browser scripts and results are temporary artifacts under `/tmp/igal-portfolio-browser/expressive*.mjs` and `/tmp/expressive-results.json`; the results JSON covers the final small run, not the whole combined audit.
* Earlier foundation checks remain historical evidence only. No live providers, real-device touch, manual screen-reader, full cross-route regression or actual browser zoom audit was performed in this refinement. No commit or push.

## Earlier Milestone 4B.1 — visual foundation and static Hero

Completed 2026-10-10 within the user’s narrowed 4B.1 scope. Stop here; the rest of 4B is not implemented or automatically authorized.

* Added the approved opaque light/dark semantic colors, sans/mono typography, spacing, corners, wide/reading containers, button states, focus, selection, scrollbar and reduced-motion rules. Existing numeric palette utilities and legacy page width remain compatible for unmigrated components.
* Updated Navbar, Footer, theme and locale controls and the default layout. Preserved all six navigation destinations, system color preference, explicit theme persistence and locale routing. Active links have an underline and `aria-current`; controls have 44px minimum targets. Navigation stays in document flow, wraps when needed and expands below the mobile header instead of obscuring page content. Added a skip link and removed the homepage’s nested main landmark.
* Replaced only the Hero composition: name, AI Software Engineer role, current Agorando employer, grounded engineering headline/description, Explore Work anchor, email Contact action, location and existing social links.
* Added `HomeWorkflow.vue`: a static, responsive, semantic ordered sequence of inputs/data → integration/processing → automation/AI → useful outputs. Existing Lucide SVG icons and CSS only; no dependency or continuous motion. Localized visible caption explains the flow and explicitly disclaims a deployed system or Agorando architecture. Ordered text remains available to assistive technology; arrows/icons are decorative. This conceptual sequence follows the explicit 4B.1 request, superseding the earlier optional grouping-only focus-map suggestion.
* Added equivalent EN/DE/RU `foundation` copy in both locale directories. No project data, selected-work composition, assistant implementation, AI integration, route, experiment logic or deployment changes. Existing homepage sections inherit shared typography/spacing but retain their prior palette utilities until a later authorized rollout.

### Modified files in this milestone

* Foundation: `app/assets/css/main.css`, `tailwind.config.js`.
* Shell: `app/layouts/default.vue`, `app/components/Navbar.vue`, `Footer.vue`, `ThemeToggle.vue`, `LanguageSwitcher.vue`.
* Hero: `app/components/home/HomeHero.vue`, new `HomeWorkflow.vue`; `app/pages/index.vue` only removes the nested main wrapper.
* Localization: `i18n/locales/{en,de,ru}.json` and `app/i18n/locales/{en,de,ru}.json`.
* Handoff: `docs/codex/current-state.md`, `docs/codex/next-task.md`. Pre-existing design/planning edits in the working tree were preserved.

### Milestone 4B.1 verification

* Production `npm run build`, `npm run lint:i18n`, `npm run lint:i18n:public`, and `git diff --check` passed.
* Headless Chrome on the local production build: 24 homepage combinations (EN/DE/RU × 320/390/768/1440px × light/dark) passed no-horizontal-overflow, single-main and expected-theme assertions, with no page JavaScript errors. Captured and visually inspected desktop light/dark and mobile light/dark screenshots at 1440px and 390px (`/tmp/m4b1-{1440,390}-{light,dark}.png`).
* Verified mobile menu open/close and Escape focus return, theme switching and persistence after reload, EN → DE locale navigation and translated Hero, skip-link keyboard focus transfer, Explore Work anchor, and reduced-motion smooth-scroll removal. English homepage at 390px with root text size doubled had no page overflow. The 320px tests cover the effective reflow width of a 1280px viewport at 400%; actual browser zoom was not separately automated.
* Regression sweep: all 13 existing routes × EN/DE/RU × both themes (78 loads) returned HTTP 200 at 390px with no page horizontal overflow, detected raw public translation keys or page JavaScript exceptions. This was a page-load/layout check, not a repeat of interactive tool or assistant loading/fallback tests; those states and a full desktop cross-route visual audit remain unverified for this milestone.
* Calculated all 58 relevant semantic color pairings: text/status/action roles on canvas/surface/raised, primary foreground on default/hover fill, and essential control boundaries. All meet 4.5:1 text and 3:1 boundary targets; minimum boundary ratios are 3.30:1 light and 3.81:1 dark. This does not certify every legacy component’s colors.
* Browser artifacts and ad hoc scripts are in `/tmp`; no browser dependency was added to the project. No live provider or speech service was tested. No commit or push.

Next proposal: separately authorize Milestone 4B.2 for remaining homepage composition. The assistant purpose/knowledge review remains deferred.

## Milestone 4A completed — design system and visual specification

Completed 2026-10-10. Documentation only; the target is a structured personal engineering workspace combining Precision Stack (hierarchy), Systems Canvas (evidence-based relationships), and Neural Workbench (subtle depth and optional sourced exploration). This supersedes older editorial/document-like visual prescriptions; the Hybrid Personal Engineering Website strategy remains active.

* Replaced `docs/design/visual-direction.md` with the selected concept, independent light/dark direction, typography guidance, assistant positioning and explicit anti-patterns.
* Created `docs/design/design-system.md`: proposed semantic theme tokens, sans/mono typography, spacing and container scales, component/state rules, accessibility and motion acceptance, and an incremental CSS/Tailwind migration boundary.
* Created `docs/design/page-blueprints.md`: Home, Work, case-study and assistant compositions, responsive behavior, evidence requirements, preserved route mappings and implementation touchpoints.
* Updated the planning entry points and `next-task.md` to identify **Milestone 4B: homepage and global visual system implementation**. Work/case-study/assistant composition rollouts remain later tasks. The former Milestone 4 assistant knowledge review is deferred, not completed or discarded.
* No application code, content JSON, dependencies, assets, routes, assistant behavior or deployment configuration changed. No commit or push.

### Milestone 4A verification and limits

Reviewed documentation scope, consistency, referenced repository paths and Markdown links; `git diff --check` passed. Only intended Markdown documentation changed. No build, runtime/browser test or rendered contrast audit was run for this documentation-only milestone. Proposed tokens require validation in actual component states during 4B; prior milestone checks below remain historical evidence.

Historical next task at 4A completion: implement 4B only when separately requested. 4B.1 is now completed above; remaining 4B work is still deferred. Preserve the existing assistant behavior/knowledge backlog and the incomplete full-browser-console verification from Milestone 3.1.

## Milestone 3.1 completed — public localization audit and fixes

Completed 2026-10-10. This section supersedes the remaining public-localization backlog in Milestone 3. The detailed inventory is in `docs/codex/milestone-3-1-i18n-audit.md`.

* Audited every public route, the shared shell, tool components, script-generated states, structured project content, SEO, and assistant output labels. Found hardcoded English beyond the old key-consistency check: Work/case-study prose, experiment interfaces and results, AI-page explanations, compliance clarification/fallback content, footer labels, and assistant evidence labels.
* Added EN/DE/RU translations in both locale directories. Public project summaries/categories and descriptive titles use the existing localized-content pattern; Home, Work, Experiments and AI resolve the shared canonical values reactively. Historical project facts and technical identifiers remain intact.
* Translated setup-time lists and metadata now use reactive computations. Local error/fallback state stores keys where needed. The JSON tool now computes output and error together without render-time mutation, so invalid-input messages render reliably and react to locale changes.
* Compliance API enums keep their existing values and receive localized display labels. System Design Sketcher and compliance prompts explicitly request the selected language for generated prose. No provider, model architecture, schema enum, or integration was replaced.
* Assistant runtime suggestions match the neutral translated UI suggestions. New `content/source-labels.json` localizes skill, FAQ and role-fit evidence labels. Both runtimes resolve localized project fields safely for retrieval and return localized source labels; Netlify's catch preserves the request locale. Generated knowledge exports match canonical content. File links such as the CV no longer receive locale route prefixes.
* Added `npm run lint:i18n:public` to catch literal template text, missing referenced keys, divergent locale mirrors, incomplete public structured translations, and stale generated project/source-label data. It complements the existing placeholder/key check and browser tests.

### Milestone 3.1 verification

* Content/locale JSON parsing, `npm run lint:i18n`, `npm run lint:i18n:public`, production `npm run build`, and whitespace checks pass. The source audit covers all 38 Vue components.
* All 39 public route/language combinations return HTTP 200 in development and production. Rendered EN/DE/RU comparisons found only technical terms, code and names intentionally shared across languages.
* Chrome checks passed for EN/DE/RU JSON invalid-input/empty/copy states, sketch generation/loading and selected-language prompts, compliance clarification and unavailable-provider fallback, XSS/SQL demo states, and assistant loading/fallback responses. Provider calls were mocked; separate offline tests exercised the actual Netlify fallback and validation paths in all three languages.
* EN → DE → RU → EN switching passed at 1440px and 390px, including localized experiment UI, document language and preservation of the same browser document (no full reload).
* The 390px sweep rendered all 39 localized pages without raw keys or horizontal overflow, but intermittent chunk-load errors prevented a clean JavaScript-error sweep. A diagnostic rerun confirmed Chrome `ERR_INSUFFICIENT_RESOURCES` and ended in a page crash; further browser runs were stopped. Full error-free browser coverage of every page remains unverified. Early development-server module-loading interruptions were superseded by successful targeted production-build checks.

### Remaining limitations and next task

No live AI-provider output quality, browser speech-recognition service, or translated downloadable PDF content was verified. Generated prose and user-entered content retain their original language; subsequent AI requests carry the selected language. The assistant's broader knowledge/compensation policy and legacy candidate-evaluation answers still require separately authorized Milestone 4 review. No redesign, dependencies, confidential employer content, commit or push was introduced.

## Milestone 3 completed — public content and homepage repositioning

Completed 2026-10-10. The user-authorized scope expanded the former copy-only proposal to include homepage composition and neutral assistant introductory/default-question copy. This section supersedes the Milestone 2 follow-up inventory below.

* Home now reads Introduction → Current Focus → Selected Work → Experiments & Ideas → Contact. Agorando and August 2026 are visible with only approved high-level responsibilities. Removed the hero CV link, dominant assistant CTA, and broad stack line. Existing project order, links, layout primitives, and navigation remain intact.
* About reflects current employment, previous Flowplace/LeanERA/ARI Motors work, completed July 2026 WBS education, and the distinction between professional technology experience and independent projects/coursework. The CV remains a secondary reference on About.
* AI & Automation has neutral introductory/assistant copy and completed WBS education. Contact no longer asserts employment or freelance availability. Education lists WBS separately from the existing DCI certificate; no new credential was fabricated.
* Updated relevant SEO and public copy in EN/DE/RU. Nuxt resolves `i18n/i18n.config.ts`, which imports `i18n/locales/`; corresponding changed namespaces were mirrored in `app/i18n/locales/` without a configuration refactor. Existing English project-detail copy and structured-content English fallback remain.
* Assistant introduction, placeholder, empty state, sidebar prompts, and recruitment-oriented default questions now invite project/engineering exploration. Legacy question IDs and translation keys remain compatible. Only the canonical assistant description and matching generated Netlify description changed; provider logic, response schemas, answer generation, and fallbacks are untouched.
* No Notes section, dependencies, deployment changes, commits, or pushes.

### Remaining issues and next milestone

Milestone 4 should coordinate assistant purpose and public knowledge: role-fit/FAQ content, runtime follow-up questions, candidate-evaluation answers, compensation/personal-data policy, and CV response actions remain legacy behavior. Neutral initial prompts do not imply that this deeper migration is complete. Review both server and Netlify paths together, preserving grounded answers and unavailable-provider behavior.

README and downloadable CV/certificate currency remain unverified; the DCI certificate is not evidence of WBS completion. Existing English-only project descriptions and AI-page technical labels remain a later localization task. No new employer case study or unverified outcome was introduced.

### Milestone 3 verification

* All top-level content JSON and both locale directories parse; changed locale namespaces match across directories; canonical assistant data matches its generated Netlify export.
* `npm run lint:i18n` passes; locale key consistency and `git diff --check` pass.
* `npm run build` passed with no reported warnings. Local HTTP/SSR checks passed for Home, About, AI & Automation, Contact, Education, and Ask Igal in EN/DE/RU (18 routes), including translated revised content, homepage section order, and localized Experiments links.
* No deployed provider integration, separate TypeScript typecheck, or browser-based visual/interaction test was performed. Existing responsive classes and experiment logic were preserved.

## Milestone 1 completed — documentation only

Updated positioning, visual direction, project brief, implementation rules, site map, build order, current state, and next task. The active strategy supersedes conflicting historical recruiter-first, target-role, CV-led, and ongoing-WBS instructions. Application code, structured JSON, dependencies, routes, experiments, and deployment settings are unchanged. No commit or push was made.

At completion of Milestone 1, the next task was factual content modernization. That work is now completed below; the former OpenMe/Decision Matrix AI case-study task remains deferred.

## Milestone 2 completed — factual content modernization

Completed 2026-10-10. Updated `content/profile.json`, `content/experience.json`, and `content/professional-narrative.md`, with focused factual corrections in `content/faq.json` and `content/role-fit.json`.

* The profile and experience record now describe current employment as AI Software Engineer at Agorando Technologies GmbH since August 2026, using only confirmed high-level work areas. Employer location, stack, deliveries, and metrics were not inferred.
* Flowplace GmbH is retained as previous employment in 2023–2025. Other historical experience entries are unchanged.
* WBS AI Agents & Automations is completed education, July 2026, in profile, experience, narrative, and dependent FAQ/role-fit passages.
* `current_focus` now holds professional focus areas. Active job availability was replaced with neutral contact wording; `target_roles` is an empty array.
* The narrative distinguishes shipped professional work, deployed independent MVPs, current responsibilities, and exploratory tools. No independent initiative is labeled actively in progress without evidence; current maintenance/development status requires confirmation.
* Technology descriptions distinguish documented professional Vue/Nuxt/TypeScript/API work from independent-project and coursework experience. No equal depth across technologies or employer-specific stack is implied.
* Reviewed `content/agent-knowledge/personal-profile.json` and left it unchanged. Its compensation policy and personal visibility scope remain deferred to a coordinated assistant review; no sensitive values are reproduced here.

### Compatibility decisions

Repository-wide consumer searches covered app code, server routes, and Netlify functions before edits. No JSON key or existing entry ID was removed. `current_course` retains its legacy name and shape but now has completed status and timeframe; `availability.summary` remains a string used by Home. `target_roles` remains an array so existing `.join()` and spread consumers work. Existing FAQ IDs/questions and role-fit structures remain compatible; their recruiting-oriented purpose is still a later migration.

Both assistant implementations currently reference `experienceData.entries[0]` as the source of a historical-work answer. Flowplace remains first to preserve that behavior; Agorando was added after existing work entries and before education. Array order is not a chronological contract. A future assistant refactor should select evidence by ID instead of index before reordering.

The production assistant does not import canonical JSON directly: `netlify/functions/lib/portfolioKnowledge.js` contains generated data literals. Refreshed only its four changed exports (profile, experience, FAQ, role-fit) to prevent stale production facts. This necessary consumer-data synchronization supersedes the earlier proposed restriction on touching the Netlify snapshot; no handler, provider integration, or deployment configuration was changed. Other bundled exports are unchanged. Future content edits must keep this snapshot synchronized until generation is automated in a separately scoped task.

### Verification

* All top-level content JSON and the inspected personal-profile JSON parsed successfully.
* Compatibility assertions passed for existing keys/types, IDs, untouched historical entries, preserved first experience entry, and empty target-role handling.
* The four changed generated exports exactly match canonical JSON; unrelated exports and project/personal data are unchanged.
* `npm run build` passed (Nuxt client and server production build). This was not a deployed-provider integration test or a separate TypeScript typecheck.
* Content/documentation diff and whitespace review passed. No Vue, navigation, page, provider integration, dependency, or deployment changes; no commit or push.

At completion of Milestone 2, Milestone 3 was proposed; it is now completed above.

## Current implementation observed in the repository

This snapshot supersedes older implementation descriptions below where code has since evolved. It is based on source inspection, not a fresh runtime or deployment test.

* Nuxt/Vue/TypeScript, Tailwind, i18n, color mode, and Netlify remain the foundation.
* Home renders HomeHero, Current Focus, SelectedWork, Experiments & Ideas, and HomeContactCTA. It reads profile/project JSON and localized copy; the assistant remains available through navigation.
* The navbar currently links Home, Work, Experiments, Ask Igal, AI, and About. `/contact`, `/education`, and `/ai-compliance-compass` also exist.
* `/ask-igal` uses `usePortfolioAgent`, the portfolio-agent components, `/api/portfolioAgent` in development, and `/.netlify/functions/portfolioAgent` in production. Server and Netlify knowledge implementations use structured content. The historical compact homepage guide is not the current implementation.
* The assistant includes role-fit/recruiter questions and personal/compensation knowledge that need a coordinated purpose and visibility review. Do not copy sensitive knowledge into planning docs or assume that server-side storage prevents public disclosure.
* Existing Work detail routes map Flowplace to `/case-studies/flowplace`, ARI Motors to `/case-studies/leanera`, LeanERA to `/case-studies/cashdo`, and Security Playground to `/case-studies/security`. OpenMe and Decision Matrix AI have no dedicated case-study pages in this checkout.
* Experiments and the Security Playground remain interactive. Preserve all useful projects, including job-related tools as historical engineering work.
* Localization exists in both `i18n/locales/` and `app/i18n/locales/`. Trace the active configuration and any duplication before later copy changes; preserve the fallback contract in `docs/i18n-content.md`.

## Milestone 2 public-facing content backlog — historical inventory

Source-inspected inventory at completion of Milestone 2. Milestone 3 public-copy entries are now completed as described above; assistant behavior and asset reviews remain deferred.

| Surface / source | Follow-up |
| --- | --- |
| `content/profile.json`, `content/experience.json` | Completed in Milestone 2; preserve compatibility keys until consumers migrate |
| `content/professional-narrative.md` | Completed in Milestone 2; shipped work, MVPs, and exploration are distinguished without inventing in-progress status |
| `content/faq.json`, `content/role-fit.json` | Dependent factual corrections completed in Milestone 2; legacy questions, role labels, and candidate-evaluation purpose remain for assistant review |
| `app/components/home/HomeHero.vue`, `HomeContactCTA.vue`, `app/pages/index.vue`, locale home/SEO strings | Review rendered identity, CV emphasis, role-fit invitation, and contact wording after data updates (Milestone 3) |
| `app/pages/about.vue`, `app/pages/ai-automation.vue` | Replace hardcoded ongoing-WBS/current-learning framing; reflect current employment and completed education; update AI-page assistant description and metadata (Milestone 3) |
| `app/components/Contact.vue`, `app/pages/contact.vue` | Remove open-role/recruiting and unconfirmed freelance availability framing; preserve simple contact links (Milestone 3) |
| `app/pages/education.vue`, `app/components/Education.vue`, education locale strings | Audit rendered completion facts and labels (Milestone 3) |
| `i18n/locales/{en,de,ru}.json`, `app/i18n/locales/{en,de,ru}.json` | Review supported-language copy, metadata, availability, current-learning and assistant strings; determine active sources before editing (Milestones 3–4) |
| `content/portfolio-agent.json`, `content/agent-knowledge/personal-profile.json` | Review recruiter description/prompts, compensation behavior, and public personal knowledge scope without reproducing sensitive values (Milestone 4) |
| `app/pages/ask-igal.vue`, `app/components/portfolio-agent/`, `app/composables/usePortfolioAgent.ts`, `app/types/portfolio-agent.ts` | Review candidate-evaluation prompts, CV actions, labels, and contracts together (Milestone 4) |
| `server/api/portfolioAgent.post.ts`, `netlify/functions/portfolioAgent.js`, `netlify/functions/lib/portfolioKnowledge.js` | Canonical factual data synchronized to the generated knowledge snapshot in Milestone 2. Runtime labels such as “Target roles”/“Availability,” localized prompts, role matching, compensation behavior, sources, and fallback still need coordinated review (Milestone 4) |
| `content/projects.json`, `app/composables/useProjects.ts`, case-study pages | Later verify claims and source provenance before expanding case studies; existing metrics are not newly verified by this milestone (Milestone 5) |
| `README.md`, linked CV/certificate assets | Audit currency in later copy work; do not infer that an existing certificate documents July 2026 WBS completion or fabricate replacement credentials |

## Decisions still open

* Assistant name, navigation prominence, and appropriate personal/compensation knowledge scope.
* Whether AI remains a top-level navigation item or becomes a linked specialization page.
* Contact prominence and any secondary CV placement.
* Actual writing and selected personal context for Notes/About; Notes remains optional.
* Final featured-work order and evidence for additional case studies. No Agorando case study is required; detailed employer work requires confirmation.

## Milestone 1 verification

Reviewed documentation against source files and the requested scope; checked the documentation diff for conflicting active guidance and whitespace. Only the eight requested Markdown files were changed. Application behavior is unchanged by this milestone. No build was run for documentation-only edits; build results below belong to historical implementation tasks.

## Historical implementation record — not active instructions

The remainder preserves previous completed work and its reported checks, including the earlier milestone numbering and June 2026 timestamps. Words such as “current,” “now,” and “next” below refer to the time of those reports. Earlier WBS dates, recruiter framing, homepage assistant descriptions, and navigation lists are superseded by the active snapshot and strategy above. Do not use these historical descriptions to restore obsolete requirements or override current facts.

## Content Source Of Truth Added

Milestone 2 is complete. A top-level `content/` folder now contains:

```text
content/profile.json
content/experience.json
content/projects.json
content/skills.json
content/role-fit.json
content/faq.json
content/professional-narrative.md
```

These files consolidate factual portfolio data from the CV PDF, certificate PDF, existing locale copy, current project composable, case-study pages, README links, and strategy docs.

The structured content covers:

* profile, location, contact links, languages, target roles, and current WBS course
* professional and education timeline
* featured, secondary, and lab project data
* skill groups
* role-fit summaries for target roles
* recruiter-style FAQ answers for a future static guide
* professional narrative variants

Known content boundaries:

* WBS AI Agents & Automations is now recorded as `2026 - Present`, Online, from user-provided correction.
* Some existing case-study routes have naming mismatches, and the project content records notes rather than hiding that uncertainty.
* Project metrics are only included where the repository documents them.

Content accuracy corrections made after Milestone 2:

* Flowplace experience is now `Software Developer`, `2023 - 2025`, and no longer labeled current.
* Myfxbook Ltd / Cashdo is now framed as `Digital Product & Web Coordinator`, emphasizing website/product operations, feature development coordination, and white-label partner integrations.
* WBS CODING SCHOOL is now `2026 - Present`, Online.

## Current App Understanding

The existing app already has:

* Nuxt/Vue/TypeScript foundation
* Tailwind styling
* a refactored homepage in `app/pages/index.vue`
* project data in `app/composables/useProjects.ts`
* structured portfolio data in `content/*.json`
* multiple project/case-study routes
* live deployment context
* current AI/automation language in parts of the site

The homepage has been simplified from the previous marketing-style eight-section direction into a quieter professional developer portfolio index.

Homepage sections now follow this compact structure:

1. Minimal hero
2. Selected Work
3. Ask about the portfolio
4. Contact

The homepage still imports structured content from:

```text
content/profile.json
content/projects.json
content/experience.json
content/skills.json
content/faq.json
```

What changed:

* The hero now shows only Igal's name, one positioning sentence, one metadata line, and simple Work/CV/GitHub/LinkedIn/Email links.
* The hero and selected work sections now share the same `max-w-4xl` content width.
* Selected Work is the main homepage content and shows only Flowplace Role Compass, OpenMe, Decision Matrix AI, and ARI Motors EV Portal.
* Project entries are concise: title, one-sentence summary, compact tech line, and one link.
* Recruiter Snapshot, How I Work, AI / Automation Focus, and Experience Snapshot are no longer rendered on the homepage.
* Ask My Portfolio is now a compact optional guide labeled "Ask about the portfolio." It shows an input and three suggested questions, with no answer visible by default.
* The guide still uses the existing AI route when available and preserves deterministic FAQ fallback behavior.
* The guide now sends a compact portfolio brief instead of the full structured content object, avoiding homepage-specific AI request failures.
* The homepage contact area is a short availability sentence plus email, LinkedIn, and GitHub.
* The global navbar is simplified to text links and a quiet theme toggle, with the left logo/name block and "Let's Talk" CTA removed.

No dependency, route, provider, structured content fact, or case-study page change was added.

## Global Shell Simplification

The global shell now follows the minimal portfolio direction before individual secondary page redesigns.

What changed:

* `app/components/Navbar.vue` is a narrow `max-w-4xl` text navigation with subtle active text emphasis, no logo block, no name block, no CTA button, and a quiet text-based dark mode toggle.
* Mobile navigation is text-only and narrow, with no decorative chevrons or CTA block.
* `app/components/Footer.vue` is now a minimal footer with only copyright, Email, GitHub, and LinkedIn.
* The footer sitemap, brand paragraph, social icons, and "Nuxt 4 / SSR" line were removed.
* `app/layouts/default.vue` renders the minimal footer globally again because it is no longer a landing-page footer.
* Shared primitives in `app/assets/css/main.css` are calmer and narrower: `page-container` is `max-w-4xl`, page headers are single-column, titles are smaller, intros are unframed, buttons are quieter, and glass/gradient utilities resolve to flat treatments.
* `tailwind.config.js` now reduces oversized display font tokens, section spacing, container width, and custom animation intensity.

No route, dependency, content fact, provider, or individual page redesign was added.

## Work Index Redesign

The `/case-studies` Work index now follows the same minimal, document-like portfolio direction.

What changed:

* Removed the old Work page visualizer, stats cards, GSAP reveal animations, gradient headline, ProjectVisual cards, large tag walls, icon-heavy links, and promotional contact CTA.
* The page now has a simple header with the title `Work` and a short intro.
* Primary projects are explicitly ordered as Flowplace Role Compass, OpenMe, Decision Matrix AI, and ARI Motors EV Portal.
* Primary projects render as compact bordered rows with title, one-sentence summary, compact tech line, and available case study/live/GitHub links.
* Remaining projects render in a quieter Secondary work list using the same compact row pattern.
* Existing project facts, links, and case-study routes are preserved through `app/composables/useProjects.ts`.

No route, dependency, content fact, provider, homepage, global shell, or individual case-study detail page change was added.

## Case Study Detail Redesign

The first individual case-study page redesign milestone is complete.

What changed:

* `app/pages/case-studies/flowplace.vue` is now a concise document-style case study for Flowplace Role Compass.
* `app/pages/case-studies/leanera.vue` is now a concise document-style case study for ARI Motors EV Portal.
* `app/pages/case-studies/cashdo.vue` is now a concise document-style case study for LeanERA Digital Transition.
* `app/pages/case-studies/security.vue` was originally a concise document-style case study, but has since been rebuilt into an interactive educational lab.
* The old oversized hero sections, gradient backgrounds, metric card grids, icon-heavy blocks, decorative security visuals, simulator framing, and promotional CTA panel were removed from these four pages.
* Each page now uses the shared minimal `page-shell`, `page-container`, and `page-header` direction with a simple summary, role/stack/outcome facts, and short Context, Problem, Role/Implementation, Outcome, and Stack sections where relevant.
* Dark mode support is preserved through the existing neutral text, border, and background utilities.

Route/content verification:

* `/case-studies/flowplace` represents Flowplace Role Compass.
* `/case-studies/leanera` is a legacy route name, but its content represents ARI Motors EV Portal.
* `/case-studies/cashdo` is a legacy route name, but its content represents LeanERA Digital Transition.
* `/case-studies/security` represents Security Playground.
* No project-to-case-study URL mapping was changed because `app/composables/useProjects.ts` and `content/projects.json` already pointed each project to the route matching the current page content.

Verification:

* `npm run build` passed after the case-study redesign.

## Homepage Component Extraction

The homepage component extraction task remains complete.

What changed:

* Homepage sections live as focused components under `app/components/home/`.
* `app/pages/index.vue` is now smaller and acts as the structured content orchestration layer.
* Prepared data is passed into section components through typed props.
* Project link preparation remains typed and readable in the page before data is passed to `SelectedWork.vue`.

Created components:

```text
app/components/home/HomeHero.vue
app/components/home/AskPortfolioPreview.vue
app/components/home/SelectedWork.vue
app/components/home/HomeContactCTA.vue
```

Extracted homepage components from the previous eight-section direction that were no longer referenced by `app/pages/index.vue` were removed during the cleanup pass.

No route, dependency, or structured content fact change was added.

## Safe Cleanup Pass

The cleanup-only pass is complete. It removed files only after repo-wide reference checks across app code, content, docs, config, route links, and public asset paths.

Removed unused Vue components:

```text
app/components/About.vue
app/components/CaseStudiesPreview.vue
app/components/CaseStudiesVisualizer.vue
app/components/ContactCTA.vue
app/components/CursorNeuralVisualizer.vue
app/components/GridSystem.vue
app/components/Hero.vue
app/components/IntegratedSkills.vue
app/components/MyStory.vue
app/components/ProjectVisual.vue
app/components/home/AiAutomationFocus.vue
app/components/home/ExperienceSnapshot.vue
app/components/home/HowIWork.vue
app/components/home/RecruiterSnapshot.vue
app/components/lab/SecurityAuditor.vue
app/components/lab/SystemMonitor.vue
app/components/security/LocalStorageDemo.vue
app/components/security/SecurityDemo.vue
app/components/security/XssDemo.vue
```

Removed unreferenced public assets:

```text
public/canOrderSystem.jpeg
public/comap.jpeg
public/coming_soon.jpg
public/images/hero-bg.png
public/portfolio.jpeg
public/psy.jpeg
public/url-shortener.jpeg
```

Other cleanup:

* Removed stale no-op GSAP hooks from `app/pages/education.vue` and `app/pages/experience.vue`.
* Removed unused global CSS utilities `.glass-card` and `.text-gradient` from `app/assets/css/main.css`.
* Kept `.text-gradient-primary` because active pages still use it.
* Updated the README structure section so it no longer points to deleted components or removed public images.
* Kept active visualizers on About, Contact, and Experiments because current pages still referenced them at the time of the cleanup pass.
* Kept `ProjectVisual` TypeScript data shape in `app/composables/useProjects.ts` because project data still stores `visual` metadata.
* Kept package dependencies unchanged because active code still uses GSAP and VueUse-derived imports, and dependency removal was not necessary for a safe cleanup.
* Left the ARI Motors and LeanERA legacy case-study route names unchanged because the current route/content mapping was already documented and no safe route rename was required.

Verification:

* `npm run build` passed after the cleanup pass.

## Strongest Featured Projects

The new content files prioritize:

1. Flowplace Role Compass
2. OpenMe
3. Decision Matrix AI
4. ARI Motors EV Portal

Other projects are marked as secondary or lab so they do not compete equally on the homepage.

## Ask My Portfolio Status

Ask My Portfolio is implemented as an optional AI-assisted portfolio guide with a deterministic local fallback.

What works:

* The homepage guide reuses the existing `useGroqChat()` composable.
* Local development calls `/api/groqChat`; production calls `/.netlify/functions/groqChat`.
* The existing Groq provider and `GROQ_API_KEY` server-side pattern are reused.
* No API key is exposed in frontend code.
* Suggested recruiter questions remain visible and selectable.
* Custom recruiter questions can be asked from the homepage guide.
* The AI prompt receives local structured portfolio context from `content/profile.json`, `content/projects.json`, `content/experience.json`, `content/skills.json`, `content/role-fit.json`, and `content/faq.json`.
* The homepage sends that context as a compact text brief rather than a full JSON dump.
* If the AI route is unavailable, no API key is configured, the request fails, or no reply is returned, the guide falls back to the closest predefined answer from `content/faq.json`.
* The homepage UI keeps the guide compact, shows only three suggested questions, and reveals an answer only after the visitor asks or selects a question.

Known limitations:

* Grounding is prompt-based and uses local structured context, not RAG or source citation retrieval.
* The fallback matching is deterministic and simple, based on FAQ question/answer text overlap.
* Existing AI infrastructure still uses Groq through the current generic chat route/function.

## AI & Automation Page

The focused AI proof page is updated with verified external repository evidence.

What changed:

* Added `app/pages/ai-automation.vue` at `/ai-automation`.
* The page follows the minimal document-like direction using simple headers, bordered rows, compact lists, and existing dark mode utilities.
* Featured AI-related work is now explicitly grouped into three categories: AI products, AI workflow / automation systems, and Site feature.
* AI products include Decision Matrix AI, AI Compliance Compass, and Sunlit Tales / Poetry Mood Game.
* AI workflow / automation systems include Job Command Center and OpenMe.
* Ask My Portfolio is included as an existing portfolio assistant/site feature.
* OpenMe was updated to show the Python/FastAPI AI service layer in its stack and summary.
* Job Command Center was added to `content/projects.json` and the AI page with verified facts.
* Sunlit Tales was updated to reflect its AI mood game feature and point to the correct `poetry` repository.
* Patterns demonstrated are listed factually: LLM API integration, structured prompts, serverless AI calls, fallback behavior, human-in-the-loop review, API/webhook workflow thinking, and responsible AI boundaries.
* Current learning is based on WBS AI Agents & Automations and covers AI agents, n8n, Make, Python automations, APIs/webhooks, and AI safety.
* The global navbar uses a short `AI` link to `/ai-automation`; AI Compliance Compass remains reachable from the AI page and Work project links.
* AI-related proof now has its own focused grouping instead of adding more homepage sections or making the Work index more marketing-heavy.

No dependency, homepage layout, provider, API key, or new AI functionality change was added.

Verification:

* `npm run build` passed after the AI & Automation page milestone.

## Standalone Experience Page Removed

The standalone `/experience` page has been removed from the public portfolio structure.

Reason:

* The intended public structure is Home, Work, Experiments, AI, and About.
* A standalone Experience page duplicated information already covered through About, Work, case studies, structured content, and Ask My Portfolio.
* Experience data remains valuable as structured source material, but it should not create a public top-level route.

What changed:

* Removed `app/pages/experience.vue`, which removed the public `/experience` route.
* `app/components/Experience.vue` remains removed after confirming no app code referenced it.
* `content/experience.json` was preserved as the factual source for About, Ask My Portfolio, structured context, and future content work.
* The global navbar remains Home, Work, Experiments, AI, About.
* Stale `/experience` references were removed from product/Codex handoff docs.

No dependency, provider, API key, homepage, Work index, case-study, navbar, footer, `/ai-automation`, or AI functionality change was added.

Verification:

* `npm run build` passed after removing the standalone Experience route.
* A fresh dev server returned `404 Page not found` for `/experience`.

## About Page Redesign

The `/about` page redesign is complete.

What changed:

* `app/pages/about.vue` is now a short, quiet human/context page rather than another landing page or CV page.
* Removed `AboutVisualizer`, GSAP / ScrollTrigger imports, reveal animation code, gradient text, profile/sidebar card layout, glassy cards, icon-heavy working-area cards, and the promotional CTA panel from About.
* The page now uses `page-shell`, `page-container`, `page-header`, max-width text sections, simple bordered snapshot rows, and plain text links.
* About now answers only the core context questions: who Igal is, what kind of developer he is, short background, current focus, and where to review work or contact him.
* Structured content is used from `content/profile.json`, `content/experience.json`, and `content/skills.json`.
* The AI helper remains only on the homepage and was not moved or duplicated on About.
* `app/components/AboutVisualizer.vue` was removed after confirming no app code referenced it.
* The old `Creative technologist` wording was removed from About.

No dependency, route, provider, API key, homepage, Work index, case-study, navbar, footer, `/ai-automation`, Experiments, or AI functionality change was added.

Verification:

* `npm run build` passed after the About page redesign.

## Experiments Workbench Redesign

The `/experiments` page redesign is complete, and the page intentionally remains interactive.

What changed:

* `app/pages/experiments.vue` is now a calm developer workbench, not a static project list.
* The page uses the shared minimal `page-shell`, `page-container`, and `page-header` direction.
* The header title is `Experiments` with the intro: "Small interactive tools and lab projects. Some are usable mini-tools; others are smaller proof points."
* The old featured-module/sidebar swap pattern was removed.
* All three interactive tools are visible and usable without hover-scale swapping:
  * System Design Sketcher, implemented in `app/components/ArchitectSimulator.vue`
  * JSON to TypeScript, implemented in `app/components/lab/JsonToTs.vue`
  * A11y Contrast Checker, implemented in `app/components/lab/ContrastChecker.vue`
* The System Design Sketcher keeps the existing `useGroqChat()` integration but now uses less overclaiming language, includes the note "Generated sketch, not final architecture.", and requests concise sections for suggested stack, architecture shape, data/storage choice, key tradeoff, and MVP first step.
* JSON to TypeScript keeps local JSON parsing and copy-to-clipboard, and now has an optional interface-name input plus small example presets.
* A11y Contrast Checker keeps local contrast calculation and visual preview, and now includes color swapping, normal/large AA and AAA states, and a short guidance line.
* The Lab shelf remains below the tools as compact bordered rows using existing project data for Security Playground, PageScope, i18n Linter CLI, Family Space, MindQ Lab, and Sunlit Tales.
* MindQ Lab is included on Experiments because `content/projects.json` marks it as `priority: "lab"` even though the composable still categorizes it as `projectType: "work"`.
* Removed the old Experiments visualizer, GSAP reveal animation, gradient hero text, exploration track cards, hover-scale module swapping, large cards, icon-heavy CTA panel, and promotional contact panel.

Removed unused component after confirming no app references remained:

```text
app/components/ExperimentsVisualizer.vue
```

No route, dependency, provider, API key, AI helper, homepage, Work index, case-study, AI & Automation, About, navbar, or footer change was added.

Verification:

* `npm run build` passed after the Experiments workbench redesign.

## UI/UX Consistency Pass

A controlled UI/UX improvement pass was applied across the portfolio to improve scanability, visual hierarchy, and perceived polish without changing the existing minimal, document-like aesthetic or altering existing interactive tool logic.

What changed:

### Semantic icon system (`lucide-vue-next`)

* `app/components/Navbar.vue` now renders a small icon next to each navigation item (Home, Briefcase, FlaskConical, Bot, User) in both desktop and mobile views.
* Section headings on Work, Experiments, AI & Automation, and About now include a quiet leading icon.
* Icons are sized 14–24 px and aligned with text using `flex items-center gap-*`.

### Project badges

* Project listings on Home (SelectedWork), Work (case-studies/index), Experiments (lab shelf), and AI & Automation now render compact uppercase badges derived from the project `category` field in `content/projects.json`.
* Badge styling: `rounded bg-secondary-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider` with dark mode variant `dark:bg-white/5 dark:text-secondary-400`.
* No new category data was invented; badges are split from the existing `category` string.

### Interactive tool state improvements

* `AskPortfolioPreview.vue` Ask button now shows a Loader2 spinner icon when loading.
* `ArchitectSimulator.vue` Generate sketch button now shows a Loader2 spinner icon when loading.
* `ai-compliance-compass.vue` Analyze and Continue buttons now use Loader2/Search/Check icons from `lucide-vue-next` instead of Font Awesome `<i>` tags.
* `JsonToTs.vue` now shows a dashed placeholder box ("Generated interface will appear here.") when no input has been entered.

### Link affordances

* External links across all pages now include an `ExternalLink` icon (14 px) and use `inline-flex items-center gap-1.5`.
* All external links use `target="_blank" rel="noopener noreferrer"`.
* Internal links use consistent `inline-flex items-center gap-1.5` styling without the ExternalLink icon.
* Link labels are standardized: "Live" / "Open tool" for live links, "GitHub" for source, "Case study" for case studies.

### "Why this matters" microcopy

* `XssConceptDemo.vue` header now includes: "Shows how a frontend rendering choice can introduce script injection risk."
* `TokenStorageDemo.vue` header now includes: "Demonstrates how any script on the page can read localStorage — including injected ones."
* `ai-compliance-compass.vue` header now includes: "Educational advisory tool • Not legal advice."

### Spacing and hierarchy

* Section description paragraphs on the Experiments page now include `mb-6` for consistent spacing before content grids.
* Icon+heading rows use `m-0` on section titles to prevent double margin when wrapped in flex containers.

### Accessibility

* The Ask button includes both a Loader2 icon and text for screen readers.
* Navigation icons are decorative (no aria-label needed since text labels remain visible).
* All interactive buttons have `disabled:cursor-not-allowed disabled:opacity-60` or similar disabled state styling.

No route, dependency, content fact, provider, API key, or interactive tool logic change was added.

Verification:

* `npm run build` passed after the UI/UX improvement pass.

## Historical snapshot date

2026-06-16 after the UI/UX consistency pass. The active snapshot and newer milestone entries above supersede this historical record.

Historical next-task proposal: OpenMe and Decision Matrix AI case-study pages were recommended but not implemented in this record. That proposal is deferred by the active roadmap; Milestone 2 now modernizes factual content first. Existing legacy route mappings remain preserved.

## Known Constraints

* Do not create a new repo.
* Do not migrate away from Nuxt.
* Do not add dependencies unless explicitly requested.
* Do not add new AI providers or ungrounded AI behavior unless explicitly approved.
* Do not implement RAG or MCP in the portfolio MVP.
* Do not invent facts.
* Do not overstate AI expertise.
* Do not make the site flashy.
* Do not rebuild all pages in one task.
* Keep the site working after each milestone.

## Security Playground Lab Rebuild

The Security Playground has been successfully rebuilt from a static case study into an interactive educational lab.

What changed:

* `app/pages/case-studies/security.vue` is now an interactive lab rather than a static document.
* Created four new, safe, self-contained educational demo components under `app/components/security/`:
  * `XssConceptDemo.vue`
  * `TokenStorageDemo.vue`
  * `PhishingAwarenessDemo.vue`
  * `SqlInjectionConceptDemo.vue`
* Kept the minimal, document-like styling of the portfolio.
* Avoided executing any real malicious payloads or utilizing real tokens.

## UI/UX Consistency Pass

A controlled UI/UX improvement pass was applied across the portfolio to improve scanability, visual hierarchy, and perceived polish without changing the existing minimal, document-like aesthetic or altering existing interactive tool logic.

What changed:

### Semantic icon system (`lucide-vue-next`)

* `app/components/Navbar.vue` now renders a small icon next to each navigation item (Home, Briefcase, FlaskConical, Bot, User) in both desktop and mobile views.
* Section headings on Work, Experiments, AI & Automation, and About now include a quiet leading icon.
* Icons are sized 14–24 px and aligned with text using `flex items-center gap-*`.

### Project badges

* Project listings on Home (SelectedWork), Work (case-studies/index), Experiments (lab shelf), and AI & Automation now render compact uppercase badges derived from the project `category` field in `content/projects.json`.
* Badge styling: `rounded bg-secondary-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider` with dark mode variant `dark:bg-white/5 dark:text-secondary-400`.
* No new category data was invented; badges are split from the existing `category` string.

### Interactive tool state improvements

* `AskPortfolioPreview.vue` Ask button now shows a Loader2 spinner icon when loading.
* `ArchitectSimulator.vue` Generate sketch button now shows a Loader2 spinner icon when loading.
* `ai-compliance-compass.vue` Analyze and Continue buttons now use Loader2/Search/Check icons from `lucide-vue-next` instead of Font Awesome `<i>` tags.
* `JsonToTs.vue` now shows a dashed placeholder box ("Generated interface will appear here.") when no input has been entered.

### Link affordances

* External links across all pages now include an `ExternalLink` icon (14 px) and use `inline-flex items-center gap-1.5`.
* All external links use `target="_blank" rel="noopener noreferrer"`.
* Internal links use consistent `inline-flex items-center gap-1.5` styling without the ExternalLink icon.
* Link labels are standardized: "Live" / "Open tool" for live links, "GitHub" for source, "Case study" for case studies.

### "Why this matters" microcopy

* `XssConceptDemo.vue` header now includes: "Shows how a frontend rendering choice can introduce script injection risk."
* `TokenStorageDemo.vue` header now includes: "Demonstrates how any script on the page can read localStorage — including injected ones."
* `ai-compliance-compass.vue` header now includes: "Educational advisory tool • Not legal advice."

### Spacing and hierarchy

* Section description paragraphs on the Experiments page now include `mb-6` for consistent spacing before content grids.
* Icon+heading rows use `m-0` on section titles to prevent double margin when wrapped in flex containers.

### Accessibility

* The Ask button includes both a Loader2 icon and text for screen readers.
* Navigation icons are decorative (no aria-label needed since text labels remain visible).
* All interactive buttons have `disabled:cursor-not-allowed disabled:opacity-60` or similar disabled state styling.

No route, dependency, content fact, provider, API key, or interactive tool logic change was added.

Verification:

* `npm run build` passed after the UI/UX improvement pass.

## Historical snapshot date

2026-06-16 after the UI/UX consistency pass. The active snapshot and newer milestone entries above supersede this historical record.

