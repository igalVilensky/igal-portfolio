# Page Blueprints

Milestone 4A specification, 2026-10-10. These are target compositions, not implemented screens or authorization to redesign every page. Use [Design system](design-system.md) for tokens and states and [Visual direction](visual-direction.md) for purpose.

## Homepage — Milestone 4B

Preserve the current sequence: **Introduction → Current Focus → Selected Work → Experiments & Ideas → Contact**. Keep existing data, featured order and useful links. The selected work should remain the main evidence, with no oversized AI hero displacing it.

| Region | Content and composition | Responsive behavior |
| --- | --- | --- |
| Global header | Existing identity/navigation, theme and language controls; shared wide alignment | Keep current destinations; accessible mobile menu rather than squeezing labels |
| Introduction | Igal's name as h1, current engineering positioning, existing location/context; selected-work link as primary action and existing social/contact links as quieter actions | Text first. At desktop, optional compact focus map beside it; below 1024px stack map after introduction or omit redundant decoration |
| Current Focus | Confirmed Agorando role/since date and high-level areas; compact prose or labeled groups | One reading column on mobile; no invented employer stack, architecture or project cards |
| Selected Work | Existing featured entries, readable project modules, factual category and compact technology line; real case-study/tool/repository links | Single column baseline. Wider modules can separate summary and actions; do not force equal text heights |
| Experiments & Ideas | Existing overview and link to interactive experiments; tool-like treatment through panel framing and explicit action | Stack naturally. No Notes feed or fake recent activity when content is absent |
| Contact | Existing neutral invitation and email/profile links, optionally paired with a short About link if supported by existing copy | Compact text region; no inferred availability, hiring banner or repeated giant CTA |

The optional hero focus map shows **areas of work**, using only already confirmed labels such as applications, integrations, automation and AI workflows. Caption it as a focus overview. Grouping is sufficient: do not draw directional arrows unless a documented process is being explained. It must not look like a live monitor or employer system. Plain semantic HTML/CSS is sufficient; omit it if it merely repeats the subtitle without aiding comprehension.

Keep assistant discovery in the existing navigation for 4B. A later contextual exploration link may sit near selected work, but an input-looking control must actually accept input; do not draw a fake command field that is only a link. The homepage must remain fully useful without an assistant request.

Implementation touchpoints: `app/pages/index.vue`, `app/components/home/HomeHero.vue`, `SelectedWork.vue`, `HomeContactCTA.vue`, shared CSS/Tailwind, `app/layouts/default.vue`, `Navbar.vue`, `Footer.vue`, and existing theme/language controls as needed. Preserve reactive translations and project-link fallback logic. Review existing nested main landmarks when updating the homepage shell.

## Work — later page implementation

Route remains `/case-studies`. Header gives a short orientation, followed by existing primary projects and additional work. Preserve the current project selection and order unless a later content task explicitly changes it; Home and Work currently select their featured entries differently.

Each module answers: what is it, what problem does it address, what kind of work is it, and where can I inspect it? Render documented contribution or constraints only when present. Keep professional, independent and experimental context factual; subject matter is not proof of employment provenance.

Use a one-column module list within the wide shell. On desktop, a main summary column can sit beside compact metadata/actions or a verified screenshot. On mobile, title → summary → metadata → links is the DOM and visual order. Secondary work may be more compact, but remains legible and accessible.

Do not introduce filtering/search merely to imitate a product dashboard. If future content volume justifies filters, specify keyboard behavior, result counts and empty states in that task. Cards without a case study use existing live/tool/repository links, never invented detail URLs.

Data touchpoints: `app/pages/case-studies/index.vue`, `app/composables/useProjects.ts`, and `content/projects.json`. No project data migration is prescribed here.

## Case studies — later page implementation

Target reading sequence:

1. Back to Work, project title, concise factual summary and existing evidence/demo/source links.
2. Context: problem, contribution/role and relevant constraints, using only documented material.
3. System or workflow: one useful diagram/screenshot when public evidence supports it; accompany with a caption and readable text explanation.
4. Implementation approach and decisions: explain choices and trade-offs with short labeled panels where helpful.
5. Documented outcome and limitations: qualitative evidence is valid; omit unsupported metrics and unavailable sections.
6. Existing related work or experiments and a return-to-Work path.

Wide outer shell, narrow prose column; a metadata rail or diagram can use the remaining width at 1024px and above. Stack metadata before body on small screens. A table of contents is optional only for genuinely long pages and must not overlay content. Never reserve blank cards for missing facts. Interactive demos keep their inputs, outputs, errors and controls intact.

Preserve these existing mappings:

| Path | Content |
| --- | --- |
| `/case-studies/flowplace` | Flowplace Role Compass |
| `/case-studies/leanera` | ARI Motors EV Portal |
| `/case-studies/cashdo` | LeanERA Digital Transition |
| `/case-studies/security` | Interactive Security Playground |

OpenMe and Decision Matrix AI have no dedicated detail pages in this checkout; this spec does not create them. No detailed Agorando case study is authorized. Diagrams are evidence-bearing content, subject to the same confidentiality rules as prose.

## Assistant — integration blueprint, implementation deferred

Preserve `/ask-igal`, current navigation label and both runtimes. The target is a native **portfolio exploration panel**: find documented projects, ask about engineering choices, follow concise sources and continue through ordinary links. The interface does not imply impersonation, autonomous actions or access to private systems.

Desktop target: main question/response column plus a restrained guidance/source-navigation rail. Mobile target: introduction → question form → suggestions → responses/sources → secondary guidance. Use shared reading measures; responses should not stretch across the full shell. Avoid floating bottom-corner chat bubbles, avatars and messenger-style speech balloons.

| State / part | Target visual and interaction rule |
| --- | --- |
| Entry/empty | Short purpose statement, real labeled question field, submit button and a few existing localized suggestions. Command-like economy without fake shortcuts or terminal prompts. |
| Composing | Visible label, existing length constraint and useful validation. Keyboard and mobile text entry remain normal; no new search/command execution behavior is implied. |
| Loading | Stable panel with truthful loading label; prevent duplicate submission while keeping project navigation available. No fake token stream or percentage. |
| Answer | Question context, concise generated answer, visible evidence/source group and real next actions; reuse current response contract. Preserve longer necessary content without arbitrary truncation. |
| Sources | Descriptive localized labels and actual destinations next to the answer. Distinguish references from suggested actions; no decorative citations or invented confidence badge. |
| Unsupported / unavailable | Clear unknown/error/fallback message with ordinary Work/Experiments links. Do not imply generated success when the provider is unavailable. |
| Follow-up | Existing useful suggestions as secondary controls, wrapping on mobile. Preserve keyboard focus and avoid forced scroll when reduced motion is requested. |

Touchpoints for a future authorized task: `app/pages/ask-igal.vue`, `app/components/portfolio-agent/`, `app/composables/usePortfolioAgent.ts` and existing response types. Milestone 4A changes none of these. Milestone 4B must not restyle assistant composition or alter its contracts; inherited global styles only need regression checking.

The deeper assistant review remains separate: legacy candidate-evaluation answers, role-fit/FAQ knowledge, compensation/personal-data boundaries, CV actions and positional experience lookups must be coordinated across server and Netlify code and generated knowledge. Visual polish is not evidence that this behavioral migration has happened. Do not reproduce sensitive knowledge in design docs.

## Cross-page acceptance for future implementation

Ordinary links remain sufficient to explore the site. Preserve all existing locale routes and interactive tools, including `/ai-automation`, `/ai-compliance-compass`, `/experiments`, `/about`, `/contact` and `/education`. No new Notes route or navigation reshuffle is implied.

Review both themes at mobile and desktop sizes, EN/DE/RU wrapping, keyboard/focus, reduced motion, assistant loading/fallback readability and tool input/output states. Shared styles may change appearance beyond Home; they must not degrade those pages or silently expand 4B into a full visual rollout.
