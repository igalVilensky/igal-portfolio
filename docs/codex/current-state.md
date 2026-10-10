# Current State

## Active snapshot — 2026-10-10

Repository: `igalVilensky/igal-portfolio`. The active direction is a **Hybrid Personal Engineering Website**, combining professional work, independent applications, AI/automation and integrations, interactive experiments, and personal engineering ideas. Preserve the restrained, document-like design.

Igal is an **AI Software Engineer at Agorando Technologies GmbH since August 2026**. Work areas include software engineering, internal business tools, enterprise system integrations, automation, AI-related workflows, requirements analysis, and operational process improvements. **AI Agents & Automations at WBS CODING SCHOOL was completed in July 2026.** These user-confirmed facts supersede the older education and job-search framing below.

Agorando may be described only at this confirmed high level. Do not publish or invent private project details, code, internal architecture, operational metrics, employee/customer data, credentials, or confidential business figures. More detail requires confirmation of accuracy and public disclosure suitability.

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

Next proposed task: **Milestone 3 — public factual copy consistency**, bounded in `docs/codex/next-task.md`. Stop after Milestone 2; the next task is not automatically authorized.

## Current implementation observed in the repository

This snapshot supersedes older implementation descriptions below where code has since evolved. It is based on source inspection, not a fresh runtime or deployment test.

* Nuxt/Vue/TypeScript, Tailwind, i18n, color mode, and Netlify remain the foundation.
* Home currently renders HomeHero, SelectedWork, and HomeContactCTA. It reads profile/project JSON; the assistant is no longer a homepage component.
* The navbar currently links Home, Work, Experiments, Ask Igal, AI, and About. `/contact`, `/education`, and `/ai-compliance-compass` also exist.
* `/ask-igal` uses `usePortfolioAgent`, the portfolio-agent components, `/api/portfolioAgent` in development, and `/.netlify/functions/portfolioAgent` in production. Server and Netlify knowledge implementations use structured content. The historical compact homepage guide is not the current implementation.
* The assistant includes role-fit/recruiter questions and personal/compensation knowledge that need a coordinated purpose and visibility review. Do not copy sensitive knowledge into planning docs or assume that server-side storage prevents public disclosure.
* Existing Work detail routes map Flowplace to `/case-studies/flowplace`, ARI Motors to `/case-studies/leanera`, LeanERA to `/case-studies/cashdo`, and Security Playground to `/case-studies/security`. OpenMe and Decision Matrix AI have no dedicated case-study pages in this checkout.
* Experiments and the Security Playground remain interactive. Preserve all useful projects, including job-related tools as historical engineering work.
* Localization exists in both `i18n/locales/` and `app/i18n/locales/`. Trace the active configuration and any duplication before later copy changes; preserve the fallback contract in `docs/i18n-content.md`.

## Outdated public-facing content backlog

Source-inspected inventory, updated after Milestone 2. Completed factual work is distinguished from remaining public-copy and assistant migrations.

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

## Last Updated

2026-06-16 after the UI/UX consistency pass.

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

## Last Updated

2026-06-16 after the UI/UX consistency pass.

