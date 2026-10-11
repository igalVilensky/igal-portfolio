# Next Task

## Next step — evaluate the three Milestone 4C prototypes

The isolated **Interactive Visual Identity Lab** is implemented at `/design-lab` in development only. Run `npm run dev` and open that route; the current review server is `http://127.0.0.1:3103/design-lab`. It is not registered or bundled in production, and production/localized lab URLs were verified to return 404.

Review **Living Network**, **System Layers**, and **Data Flow Engine** live at desktop and mobile widths, in both themes. Explore hover, selection, keyboard/touch, pause/reset, and reduced-motion states. Screenshots are supporting artifacts; motion must be judged live. Implementation details, test evidence and limitations are in [Current state](current-state.md#milestone-4c--interactive-visual-identity-lab).

**Stop after the three prototypes. Do not choose a winner, merge a prototype into the homepage, or continue the homepage rollout automatically.** The user will choose a direction or request refinements. Production Hero/System Explorer remain as they were before 4C.

For any separately requested lab changes, keep sources in `app/design-lab/`, preserve the dev-only route gate, and rerun `npm run build`, `node scripts/check-design-lab-isolation.mjs` (optionally with a production origin), route/browser checks, and `git diff --check`. Do not add the route to navigation or sitemap. Temporary screenshots and browser results are listed in current state; no browser dependency was added.

## Milestone 4B.2 — remaining homepage visual rollout (deferred proposal)

Milestone 4B.1 is complete as of 2026-10-10: semantic visual foundation, shared shell/navigation, Hero and an interactive conceptual System Explorer. **Stop after 4B.1. Do not start this proposal automatically.** The original broad 4B plan was narrowed by the user; this document is not authorization to redesign Selected Work or any other section now.

## Proposed scope, subject to the next user request

1. Review the implemented Hero and foundation against the approved design direction.
2. Bring the existing Current Focus, Selected Work, Experiments & Ideas and Contact sections into the new semantic surface/type/container system in a separately bounded task. Preserve section sequence, factual content, reactive translations, featured project order and actual links. Keep the Hero implementation unless changes are requested.
3. Preserve all routes and experiments. Do not change project data, AI integrations, assistant composition or knowledge. Do not add Notes, unsupported metrics, employer architecture, promotional CTAs, dependencies or deployment changes.
4. Review global-style inheritance on existing routes without redesigning their composition. The legacy numeric palette and page width remain compatible; migrate components deliberately rather than globally remapping every color utility.

## Read first

- [Current state](current-state.md), especially 4B.1 verification and limitations.
- [Visual direction](../design/visual-direction.md), [design system](../design/design-system.md), [page blueprints](../design/page-blueprints.md).
- [Implementation rules](implementation-rules.md), [positioning](../strategy/positioning.md), [site map](../product/site-map.md), [localization contract](../i18n-content.md).

## Verification for the next authorized implementation

Run `npm run build`, both i18n checks and `git diff --check`. Inspect desktop/mobile light/dark, EN/DE/RU, long labels, keyboard controls, focus, reduced motion, zoom/reflow, navigation and section links. Check inherited styles on other routes and report actual coverage separately from live-provider or full accessibility validation. Keep both locale directories synchronized. Update current state and next task; do not commit or push automatically.

## Deferred work

Work and case-study composition, new case studies, assistant redesign, command/search features, navigation restructuring, Notes and downloadable CV/certificate/README currency remain separate tasks.

The deeper assistant purpose/public-knowledge review is preserved: legacy candidate-evaluation answers, FAQ/role-fit content, compensation/personal visibility, CV actions and positional historical-experience lookups need coordinated review across server, Netlify and generated knowledge. Visual changes do not complete that work. Do not reproduce sensitive values in planning documents.
