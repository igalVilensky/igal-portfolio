# Milestone 4K — About: Human Constellation

Implemented 2026-10-16 as the fifth provisional navigation reveal at `/spatial-home`. **Stop for review.** All five environments remain first-pass prototypes without final visual approval. The central Spatial Stack is provisionally accepted. No coordinated redesign or production integration is authorized by this milestone.

## Implementation

About selection warms the existing plane illumination and reveals one asymmetric curved trajectory with five principal points, including its source within the plane. The stack occludes the trajectory to suggest depth. Different point sizes, restrained radial light, and a warm-to-cool thread distinguish the scene. There are no labels, dates, invented personal facts, cards, images, particle clouds, or new dependencies.

The component consumes the existing navigation state and finite `useActiveCore` clock: immediate activation, sequential point emergence, path drawing, settled composition, and reversal from the current progress on exit/interruption. No continuous effect is added. The existing pause control and reduced-motion preference present the completed active composition. Decorative SVG is hidden from assistive technology and never captures input.

The source follows the selected plane's actual SVG matrix during a bounded 650 ms measurement period on activation, exit, and resize. At widths up to 1100 px, a four-point lower arc replaces the wide desktop trajectory. The existing stack dimensions, touch behavior, semantic links, routes, theme and language controls remain unchanged.

## Changed files

- `app/spatial-home/AboutReveal.vue`: isolated SVG scene, responsive geometry, finite animation, measurement and cleanup.
- `app/spatial-home/SpatialHome.vue`: mounts About and applies About-only warm illumination through the existing plane color token.
- `scripts/check-spatial-home-isolation.mjs`: detects About component and scene markers in production artifacts.
- `docs/codex/current-state.md`, `docs/codex/next-task.md`, and this handoff: milestone status and review boundary.

`SpatialStack.vue`, the other four reveal implementations, production pages, locale catalogs, destinations, and dependencies are unchanged. No commit or push.

## Verification

- `npm run build`: passed.
- `vue-tsc --noEmit -p .nuxt/tsconfig.app.json`: blocked by 25 diagnostics in unchanged files (app shell, existing lab components, portfolio form, SpatialEnvironment, server portfolio API). No diagnostics in AboutReveal or SpatialHome. This is not a clean global type-check pass.
- `npm run lint:i18n`: passed.
- `npm run lint:i18n:public`: existing 39 untranslated prototype literals (37 design-lab, two Ask Igal fragments); no new findings.
- Production artifact checks: spatial-home excluded from 99 artifacts; design-lab excluded from 98. All eight spatial-home and four design-lab production URL variants returned 404.
- `git diff --check`: passed.
- Headless Chrome: hover/exit, eight rapid interruptions, keyboard focus/Escape/Enter, first-touch preview and second-touch navigation, reduced-motion complete state, EN/DE/RU About destinations, dark/light screenshots, and horizontal containment at 320/390/768/1024/1440/1920 px. No page exceptions. An initial hover capture preceded development hydration; the harness was corrected to wait and rerun.

## Review evidence and limitations

Session-local evidence in `/tmp/m4k-review/`:

- `desktop-dark.png`, `desktop-light.png`: 1440×900 active scene.
- `mobile-dark.png`, `mobile-light.png`: 390×844 touch preview.
- `interaction.mp4`: timestamped desktop hover, settle, exit screencast.
- `verification.json`, `check.mjs`, `record.mjs`: browser results and capture harnesses.

Logs: `/tmp/m4k-{build,types,locales,public}.log`.

The abstract constellation suggests connected experiences without claiming specific biography. Some of the path and its source are intentionally occluded by the stack. This is a 2D projected composition, not a 3D renderer. Touch was emulated; physical devices, Safari/Firefox, and screen-reader speech were not tested. The browser screencast demonstrates the interaction rather than proving frame-rate performance. Existing short-screen vertical scrolling and development-tool controls remain. Capture files are temporary local artifacts, not shipped assets.

## Next phase — requires review and direction

Review the full five-world system together. A future coordinated visual redesign may combine real-time interaction, prepared visual assets and lightweight animation. Do not start that redesign automatically, polish all scenes, alter the provisionally accepted stack, or integrate into production as part of 4K.
