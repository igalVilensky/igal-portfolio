# Milestone 4F.3 — Work environment

The development-only `/spatial-home` route now reveals a continuous engineering chamber around the existing navigation stack. Four receding structural sections, a perspective floor, a suspended technical plane, and light paths share one composition. The Work layer emits the initial light impulse. Dark and light themes use separate atmospheric treatments; the scene fades around peripheral controls.

## Architecture

- `useSpatialNavigation.ts` resolves hover, keyboard focus, touch, and opening into one computed active layer. Existing destinations, keyboard controls, and two-tap touch navigation are preserved. Escape and an outside tap dismiss the preview.
- `SpatialStack.vue` retains its existing dimensions and geometry, displays navigation state, and reports the Work source position.
- `SpatialEnvironment.vue` consumes the active layer and source position. One reversible GSAP timeline handles activation and collapse; nested SVG groups separate reveal transforms from depth offsets. Reduced motion and pause resolve directly to meaningful static states. A live reduced-motion change also resets parallax.
- Future environments can respond concurrently to the same active-layer input; no intermediate idle state is required. Only Work is implemented.
- `WorkReveal.vue` is no longer imported. Its pre-existing uncommitted edit was preserved untouched.

The environment is decorative (`aria-hidden`), pointer-transparent, and clipped to the scene. Stack layers retain opacity for navigation readability. No project lists, other environments, dependencies, production-page edits, commits, or pushes were added.

## Verification and review artifacts

Browser checks cover idle/Work/idle, ten rapid hover interruptions, keyboard focus/arrows/Home/Escape/Enter, pointer click, localized destination navigation, touch preview/dismiss/second-tap navigation, both themes, reduced motion, pause, pointer transparency, and unchanged stack dimensions. Eight viewport sizes span 320–1920px widths. Separate checks verify distinct near/far parallax and live reduced-motion reset.

No horizontal overflow or environment-added vertical overflow was found. Existing vertical scrolling on short screens (320×568 and 844×390) is retained to preserve the stack dimensions; hiding the environment gives identical document dimensions.

Review files are in `/tmp/m4f3-review/`:

- `work-environment.mp4`: neutral → dark activation → sustained Work/parallax → collapse → light activation/hold → collapse.
- `desktop-idle.png`, `desktop-dark.png`, `desktop-light.png`, `keyboard-focus.png`, `reduced-motion.png`.
- `mobile-dark.png`, `mobile-light.png`.
- `verification.json`, `depth-and-overflow.json`.

The browser runner reused the existing Playwright installation in `/tmp/igal-portfolio-browser`; no dependency was installed. Chrome was configured to use shared memory because the temporary disk was nearly full. Recordings were streamed to the existing ffmpeg installation rather than accumulating image files.

Validation commands:

```sh
node node_modules/vue-tsc/bin/vue-tsc.js --noEmit
npm run build
node scripts/check-spatial-home-isolation.mjs http://127.0.0.1:3005
git diff --check
```

All validation commands passed. The production scan checked 99 artifacts, and all eight localized/trailing-slash spatial-home URLs returned 404. The final recording is 16 seconds.

The isolation script also checks the new environment component and CSS signatures. Browser verification scripts are `/tmp/igal-portfolio-browser/m4f3-test.mjs`, `m4f3-depth.mjs`, and `m4f3-record.mjs`.

Work only is ready for visual review.
