# Milestone 4E handoff

2026-10-11. Standalone spatial homepage prototype, ready for visual and interaction review. No production integration, commit or push performed.

## Review

Run `npm run dev -- --port 3002`, then open `http://localhost:3002/spatial-home`. EN/DE/RU links stay in the prototype; planes open the existing localized public destinations. Those destinations retain their normal production shell. Browser Back restores the assembled prototype. Public Home links still lead to `/`, not to this development experiment.

The initial view has a quiet identity, five-plane navigation object, language/theme controls, contextual one-line description and motion control. Touch: tap a plane to focus, tap it again to open; tapping a different plane changes focus. Keyboard: Tab and Enter, optional arrows/Home/End, Escape to clear focus. Reduced motion removes the idle animation and navigation delay. Native links remain present without JavaScript.

## Implementation boundary

- `app/spatial-home/SpatialHome.vue`: standalone page, `layout: false`, `noindex, nofollow`, existing color-mode control and locale-aware language links.
- `app/spatial-home/SpatialStack.vue`: reusable SVG/CSS geometry and semantic-link interaction; no dependencies added.
- `app/spatial-home/content.ts`: typed EN/DE/RU prototype copy and exact existing route mapping. These development-only strings deliberately do not enter production catalogs.
- `nuxt.config.ts`: development-only route registration, alongside the existing lab gate. The entire directory sits outside automatic page/component scanning.
- `app/app.vue`: remove the forced layout name so Nuxt honors page metadata. Existing pages continue to use `default`. No public page source or A/B/C/D prototype source changed in this milestone.
- `scripts/check-spatial-home-isolation.mjs`: bundle/static-output scan, plus optional production HTTP verification for eight prefixed/trailing-slash paths.

No sitemap entry exists or was added. `npm run generate` follows the same production gate; its 83 prerendered routes excluded the prototype. The generated-output scan checked 128 artifacts with no prototype route, code, CSS, markup or copy. Netlify's existing generation configuration remains unchanged; no deployment was performed.

## Verification

- `npm run build`: passed.
- `npm run generate`: passed, 83 routes; both standalone and Design Lab artifact isolation scans passed.
- Production server: all eight `/spatial-home` URL variants (unprefixed, EN, DE, RU, with/without trailing slash) returned 404. Existing four Design Lab URL checks also returned 404.
- `npm run lint:i18n`: passed.
- `npm run lint:i18n:public`: **not passing** — 37 pre-existing literal-template findings, all in unchanged `app/design-lab` prototypes. No finding names `app/spatial-home`; public catalogs/mirrors were not changed.
- `vue-tsc --noEmit -p .nuxt/tsconfig.app.json`: **not passing** — existing repository errors in i18n head options, tools, assistant and server code. No diagnostic names `app/spatial-home`. This is not a clean global type-check pass.
- `git diff --check`: passed.

Automated Chromium checks actually performed:

- Light/dark at 1440×900, 1366×768, 1280×720, 768×1024, 390×844, 320×568 and 844×390. No horizontal overflow. First five sizes fit without vertical scrolling. At 320×568 the document is 588px tall; at 844×390 it is 644px tall. Natural scrolling intentionally preserves access on constrained screens.
- EN/DE/RU switching; all 15 localized destinations activated via keyboard and separately by touch (30 navigations total), with assembled state restored on Back.
- Tab, Enter, arrows, Home/End, Escape, visible focus screenshot, motion pause, reduced-motion animation/transition checks, mobile theme control and five native hrefs without JavaScript.
- All five mouse hover targets passed in two rounds with idle motion enabled after explicit hydration. The production homepage smoke check retained its default shell.
- No uncaught page errors in the test context. Existing external analytics/font requests are not a dependency of the stack.

Screenshots were visually inspected for desktop/mobile light/dark, keyboard focus and DE/RU mobile selected states. Touch was emulated in Chromium, not tested on physical hardware. Safari, Firefox, screen-reader output, live deployment behavior and a formal contrast audit were not tested. This milestone remains subject to the user's visual review.

## Local artifacts

Artifacts stay outside the deployment output and repository:

- `/tmp/m4e-1440-light.png`, `/tmp/m4e-1440-dark.png`
- `/tmp/m4e-390-light.png`, `/tmp/m4e-390-dark.png`
- `/tmp/m4e-focus.png`
- `/tmp/m4e-touch-en.png`, `/tmp/m4e-touch-de.png`, `/tmp/m4e-touch-ru.png`
- `/tmp/m4e-interaction.mp4` — seven-second sampled recording of keyboard layer focus and route activation.
- `/tmp/m4e-results.json` — browser assertion results.
- `/tmp/m4e-build.log`, `/tmp/m4e-generate.log`, `/tmp/m4e-i18n.log`, `/tmp/m4e-i18n-public.log`, `/tmp/m4e-types.log`.
- Browser harness: `/tmp/igal-portfolio-browser/m4e-test.mjs`, using the pre-existing external Playwright installation; no package changes in this repository.

Stop here. Refine only after review; do not integrate the prototype into production automatically.
