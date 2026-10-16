# Next Task

## Immediate next step — review rigid rotation and stable labels

Review the [4L.1 validation correction](milestone-4l1-handoff.md), `/spatial-home?geometry=1`, and `/tmp/m4l1-validation/slow.mp4`. Confirm centered rigid rotation and identical resting/returned geometry. Review `dark-1x.mp4`, `light-1x.mp4`, `dark-2x.mp4`, and `light-2x.mp4` for stable labels through idle, hover and return. **Stop here. No further effects, assets, production integration, commit or push.**

## Deferred — review all five provisional worlds after Milestone 4K

About completes the fifth first-pass reveal. Review Work, Experiments, Ask Igal, AI & Automation and About together, in both themes and on desktop/mobile. None has final visual approval; the central Spatial Stack is provisionally accepted. See [4K handoff](milestone-4k-handoff.md).

**Stop for review. Do not automatically begin the coordinated redesign.** The next phase may combine real-time interaction with prepared visual assets and lightweight animation, subject to new direction. No production integration, commit or push.

## Historical review instructions — Milestone 4E

Review the standalone spatial navigation at `http://localhost:3002/spatial-home` (`npm run dev -- --port 3002`). Also inspect `/de/spatial-home` and `/ru/spatial-home`. Five planes are the sole primary navigation; the complete stack is the initial Home state. A/B/C/D remain available unchanged at `/design-lab` for comparison.

Review the composition, plane depth and separation, desktop/mobile labels, both themes, keyboard focus, two-tap touch behavior and transition into the existing public destinations. See [4E handoff](milestone-4e-handoff.md) for evidence and limitations.

**Stop for review. Do not integrate into the production homepage, commit, push or start another rollout automatically.** Further changes require the user's direction. Keep the standalone prototype outside production scanning and rerun the isolation checker after authorized changes.

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
