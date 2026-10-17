# Milestone 4M visual review

Implemented only in the development-only `/spatial-home` prototype. No production homepage, Work page, route destinations, dependencies, Ask Igal artwork or interaction, or other layer geometry changed. No images generated or replaced. No commit or push.

## Composition and depth

MindQ is the dominant portrait object on the left, with +85px camera depth, a 12° yaw, -5° pitch and -6° roll. Sunlit is a wide amber object upper right, recessed to -160px with -16° yaw, 8° pitch and 5° roll. i18n Linter sits lower right at +15px, with its own -9° yaw and 8° roll. Perspective stages, independent staggered travel, transparent silhouettes, static shadows and stack occlusion establish foreground/background relationships. There are no backing cards, project descriptions, duplicate headings or second navigation.

Work uses the same `useActiveCore` clock, eased pose, `projectPlate` geometry, camera and centered front-edge title placement as Ask Igal. No rotation geometry was copied or reimplemented. Only Work receives the new pose and electric-blue illumination. The former Work landing preview and its decorative source path are removed from the active prototype.

Each artwork starts at the actual projected Work center at scale .12 and z=-240. The reversible GSAP timeline staggers emergence at .22/.36/.48 seconds and settles with distinct rotations and depths over .95–1.13 seconds. Reversal runs at 1.8× from the current playhead; no continuous artwork animation runs after settling. Resize rebuilds preserve playhead progress. Reduced motion and pause select coherent static endpoints. Artwork is empty-alt, aria-hidden and pointer-transparent.

Mobile retains the existing stack dimensions, shows compact MindQ and optional Sunlit below the navigation/context, and hides Linter. Narrow/short screens show MindQ alone; mobile uses reduced perspective and rotation.

## Assets and production isolation

Verified the three RGBA PNGs in `public/` before implementation. Moved them unchanged to `app/spatial-home/assets/work/`; byte equality against the supplied staged originals was verified. Imports resolved in the development browser. `public/` assets would otherwise ship regardless of route availability.

Combined supplied PNG size: 5,391,758 bytes (5.14 MiB). MindQ and Linter are 1122×1402; Sunlit is 1672×941. The isolation script now rejects their names and the new Work reveal selectors. Production build/artifact checks exclude the route, artwork and prototype code. Eight production route variants returned 404.

## Modified files

- `app/spatial-home/WorkReveal.vue`: replaces landing preview with spatial artwork and GSAP timeline.
- `app/spatial-home/SpatialStack.vue`: Work clock, canonical rotation and blue accent.
- `app/spatial-home/SpatialPlate.vue`: removes old Work-only decorative source path.
- `app/spatial-home/SpatialHome.vue`: removes obsolete Work origin prop.
- `scripts/check-spatial-home-isolation.mjs`: guards new selectors and asset names.
- Three PNGs moved from `public/` to `app/spatial-home/assets/work/`.
- This review document.

## Verification

- Production build: passed; final rerun logged in `/tmp/m4m-build-final.log`.
- Canonical plate geometry: passed all 101 poses, including rigid square proportions, fixed pivot, thickness, perspective and centered label.
- Locale catalog consistency: passed.
- Server TypeScript check: passed.
- Application TypeScript check: existing errors in app.vue, lab components and SpatialEnvironment.vue remain. No errors in the changed components.
- Public localization audit: existing untranslated design-lab and geometry diagnostic strings remain; no visible text added by this milestone.
- `git diff --check`: passed.
- Hover, full reveal, exit, repeated rapid interruption, focus and Escape exercised. Full reversal verified at 1.2 seconds; the plate returns before the longer artwork timeline finishes.
- Two-tap mobile preview/navigation passed. Destinations remain `/case-studies`, `/de/case-studies`, `/ru/case-studies`.
- Reduced-motion static state passed. Work → Ask → Work correctly hides the inactive artwork.
- Dark/light desktop 1440×900 and mobile 390×844 captured and visually inspected. Mobile placement refined to clear the context text; desktop bounds refined to keep artwork inside viewport.
- No horizontal overflow at widths 320, 390, 768, 1024, 1440 and 1920. No browser runtime exceptions recorded.

## Review artifacts

Saved outside the source tree at `/tmp/m4m-review/`:

- `desktop-dark.png`, `desktop-light.png`, `mobile-dark.png`, `mobile-light.png`
- `interaction.mp4`: pointer reveal, settled state and full reversal
- `verification.json`, `hover.json`, `final-captures.json`
- `performance-unrecorded.json`, `performance.json`

## Performance and limitations

Artwork animation changes transforms and opacity only; shadows are static and there are no animated filters, SVG artwork, or perpetual artwork loops. Original PNGs retain their highlights and transparent cutouts. Light-mode review did not reveal opaque rectangular boundaries requiring masking. Bright baked highlights remain conspicuous in light mode; later asset tuning could soften these without changing the interaction.

Headless Chrome measured 16.7ms median / 150ms p95 frame intervals over 43 unrecorded samples, including 13 intervals above 50ms. Recording measured 16.9ms median / 157ms p95. These local results show stalls and do not establish smooth physical-device performance; hardware visual review is still needed. The original large PNGs remain 5.14 MiB combined, and hidden mobile artwork still downloads. Mobile deliberately treats artwork as small atmospheric silhouettes rather than readable project screenshots. Text baked into the supplied artwork is not localized.

Stopped for visual review.
