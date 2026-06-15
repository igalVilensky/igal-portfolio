# Current State

## Project

Repository:

```text
igalVilensky/igal-portfolio
```

This is an existing Nuxt/Vue/TypeScript portfolio site. Refactor it in place. Do not create a new app or migrate frameworks unless explicitly requested.

## Strategic Direction

The portfolio is being repositioned into a mature, recruiter-friendly product-engineering portfolio.

Core positioning:

> Full-stack software developer building SaaS products and practical AI-assisted workflows.

Igal should be positioned as a software developer with real product experience who is expanding into AI agents, automations, and AI-assisted workflows.

## Documentation Foundation

These planning docs are present:

```text
docs/strategy/positioning.md
docs/design/visual-direction.md
docs/codex/project-brief.md
docs/codex/implementation-rules.md
docs/product/site-map.md
docs/product/build-order.md
docs/codex/current-state.md
docs/codex/next-task.md
```

They define positioning, target roles, visual direction, implementation rules, site map, build order, state, and next tasks.

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
* `app/pages/case-studies/security.vue` is now a concise document-style lab case study for Security Playground.
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

The focused AI proof page is complete.

What changed:

* Added `app/pages/ai-automation.vue` at `/ai-automation`.
* The page follows the minimal document-like direction using simple headers, bordered rows, compact lists, and existing dark mode utilities.
* Featured AI-related work is grouped as Decision Matrix AI, AI Compliance Compass, OpenMe, and Ask My Portfolio.
* Each AI-related item shows a concise summary, what AI/automation pattern it demonstrates, a compact tech line, and available links.
* Decision Matrix AI, AI Compliance Compass, and OpenMe facts come from `content/projects.json`.
* Ask My Portfolio is included as an existing portfolio assistant/site feature, not as a new structured project claim.
* Patterns demonstrated are listed factually: LLM API integration, structured prompts, serverless AI calls, fallback behavior, human-in-the-loop review, API/webhook workflow thinking, and responsible AI boundaries.
* Current learning is based on WBS AI Agents & Automations and covers AI agents, n8n, Make, Python automations, APIs/webhooks, and AI safety.
* The global navbar now uses a short `AI` link to `/ai-automation`; AI Compliance Compass remains reachable from the AI page and Work project links.
* AI-related proof now has its own focused grouping instead of adding more homepage sections or making the Work index more marketing-heavy.

Content boundary:

* Job Command Center was not added because the repository and structured content do not document enough factual information for it yet.
* TODO: Add Job Command Center only if factual project content, links, role, stack, and boundaries are documented first.

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

## Next Recommended Phase

The next phase should be:

> Redesign the Experiments page.

The homepage, global shell, Work index, first individual case-study pages, cleanup pass, AI & Automation page, public route structure, and About page are complete. The next best step is to bring the visible Experiments page into the same recruiter-friendly style.

Focus areas:

* redesign `/experiments` as a concise lab/project utility index
* keep the usable lab tools if they remain valuable, but remove decorative lab visualizer, GSAP reveal animation, gradient hero treatment, large cards, hover-scale module swapping, and promotional CTA panel
* present lab/experiment projects as simple bordered rows using existing project data where practical
* preserve useful links to demos, source, or case studies without overpromoting experiments as primary work
* avoid redesigning unrelated pages in the same task
* avoid new providers, dependencies, route changes, or invented facts
* run the build after implementation

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

## Last Updated

2026-06-15 after the About page was redesigned and verified with `npm run build`.
