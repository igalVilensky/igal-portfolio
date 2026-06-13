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

Milestone 3 homepage information architecture is complete.

Homepage sections now follow the target recruiter flow:

1. Hero
2. Recruiter Snapshot
3. Ask My Portfolio preview
4. Selected Work
5. How I Work
6. AI / Automation Focus
7. Experience Snapshot
8. Contact CTA

The homepage now imports structured content from:

```text
content/profile.json
content/projects.json
content/experience.json
content/skills.json
content/faq.json
```

What changed:

* Hero copy is more direct, mature, and recruiter-friendly.
* Recruiter snapshot gives location, target roles, stack, AI focus, languages, and current WBS course.
* Ask My Portfolio is a static/non-functional preview using FAQ content only.
* Selected Work shows only the four featured projects.
* AI/automation is framed as an extension of software development experience.
* Experience snapshot is concise and data-driven.
* Contact CTA points to email, LinkedIn, and GitHub.

No real AI integration, API route, dependency, route migration, or page deletion was added.

Milestone 4 visual system refactor is complete.

What changed:

* Homepage visual treatment is calmer, flatter, and more recruiter-friendly while keeping the same eight-section IA.
* Hero typography, section headings, and body copy were tightened for easier scanning.
* Cards now use more consistent borders, spacing, and corner radius.
* Buttons and homepage CTA links are more consistent and mobile-readable.
* The Ask My Portfolio preview is quieter and more professional, still static and non-functional.
* Shared homepage primitives in `app/assets/css/main.css` were simplified for buttons, kickers, titles, and compact sections.

No real AI integration, API route, dependency, route change, structured content fact change, component split, or case-study rebuild was added.

## Strengthened Homepage Visual Identity Pass

A stronger homepage visual identity pass is complete after review found the prior version too close to the old portfolio style.

What changed:

* Homepage styling now leans light-first with warm off-white backgrounds, charcoal text, soft gray borders, white editorial panels, and restrained indigo accents.
* The homepage no longer uses the old dark/glass-heavy treatment, glow effects, gradients, or icon-heavy button styling.
* The same eight-section recruiter IA is preserved: Hero, Recruiter Snapshot, Ask My Portfolio preview, Selected Work, How I Work, AI / Automation Focus, Experience Snapshot, and Contact CTA.
* Shared primitives in `app/assets/css/main.css` were flattened: glass and gradient utilities now resolve to calm solid treatments, `btn-primary` is restrained, and `page-kicker`, `section-title`, and `section-compact` better match the mature product style.
* `tailwind.config.js` now uses warmer neutral/charcoal colors, indigo-blue primary accents, emerald secondary accents, and removes the old hero glow token while de-emphasizing motion/display styling.

No component extraction, real AI integration, API route, dependency, route change, or structured content fact change was added.

## Homepage Component Extraction

The homepage component extraction task is complete.

What changed:

* The eight homepage sections now live as focused components under `app/components/home/`.
* `app/pages/index.vue` is now smaller and acts as the structured content orchestration layer.
* Prepared data is passed into section components through typed props.
* The existing homepage IA, section order, section IDs, content facts, routes, and strengthened visual direction were preserved.
* Project link preparation remains typed and readable in the page before data is passed to `SelectedWork.vue`.

Created components:

```text
app/components/home/HomeHero.vue
app/components/home/RecruiterSnapshot.vue
app/components/home/AskPortfolioPreview.vue
app/components/home/SelectedWork.vue
app/components/home/HowIWork.vue
app/components/home/AiAutomationFocus.vue
app/components/home/ExperienceSnapshot.vue
app/components/home/HomeContactCTA.vue
```

No real AI integration, API route, dependency, route change, content fact change, or visual redesign was added.

## Strongest Featured Projects

The new content files prioritize:

1. Flowplace Role Compass
2. OpenMe
3. Decision Matrix AI
4. ARI Motors EV Portal

Other projects are marked as secondary or lab so they do not compete equally on the homepage.

## Ask My Portfolio Status

Ask My Portfolio is now implemented as an AI-powered recruiter guide with a deterministic local fallback.

What works:

* The homepage guide reuses the existing `useGroqChat()` composable.
* Local development calls `/api/groqChat`; production calls `/.netlify/functions/groqChat`.
* The existing Groq provider and `GROQ_API_KEY` server-side pattern are reused.
* No API key is exposed in frontend code.
* Suggested recruiter questions remain visible and selectable.
* Custom recruiter questions can be asked from the homepage guide.
* The AI prompt receives local structured portfolio context from `content/profile.json`, `content/projects.json`, `content/experience.json`, `content/skills.json`, `content/role-fit.json`, and `content/faq.json`.
* If the AI route is unavailable, no API key is configured, the request fails, or no reply is returned, the guide falls back to the closest predefined answer from `content/faq.json`.
* The UI states that answers are grounded in portfolio content and that the guide cannot browse, send emails, schedule calls, apply to jobs, or make claims beyond portfolio data.

Known limitations:

* Grounding is prompt-based and uses local structured context, not RAG or source citation retrieval.
* The fallback matching is deterministic and simple, based on FAQ question/answer text overlap.
* Existing AI infrastructure still uses Groq through the current generic chat route/function.

## Next Recommended Phase

The next phase should be:

> Add source cues and QA cases for Ask My Portfolio.

Now that Ask My Portfolio can use AI with a deterministic fallback, harden the experience with clearer source cues and a small set of manual QA prompts.

Focus areas:

* add lightweight source cues for FAQ, project, role-fit, or experience-backed answers
* define manual QA prompts for role fit, SaaS proof, frontend experience, AI/automation, contact, and unavailable information
* verify AI answers stay within local portfolio facts
* preserve the fallback behavior when Groq is unavailable
* avoid new providers, dependencies, route changes, or visual redesign
* run the build after implementation

## Known Constraints

* Do not create a new repo.
* Do not migrate away from Nuxt.
* Do not add dependencies unless explicitly requested.
* Do not start with real AI integration.
* Do not implement RAG or MCP in the portfolio MVP.
* Do not invent facts.
* Do not overstate AI expertise.
* Do not make the site flashy.
* Do not rebuild all pages in one task.
* Keep the site working after each milestone.

## Last Updated

2026-06-13 after AI-powered Ask My Portfolio implementation.
