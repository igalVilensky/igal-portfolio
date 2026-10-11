# Milestone 4H.1 — Experiments Living Network

Experiments now connects a deliberately placed curiosity constellation to its actual navigation plane, draws a signal across the plane, and grows a curved orbital network from the outgoing connection. The first response starts immediately; the plane reacts at 490 ms, the outgoing signal starts at 690 ms, and discovery begins at 900 ms. Overlapping stages settle within two seconds. One reversible GSAP playhead owns all three acts and reverses at 2.4× on exit.

The design-lab Living Network supplied the curved quadratic connections, tilted elliptical orbits, haloed nodes, reticle geometry, and restrained cyan/violet palette. Its dashboard readout, domain buttons, text, and continuously travelling wire impulses were not carried over. The new scene uses the existing navigation layer as its activation source.

Desktop uses the left and right viewport margins. Mobile has a compact composition below the unchanged stack: three curiosity nodes, three discovery nodes, two orbit paths, and fewer decorative details. Tablet uses the upper margins. Both themes use dedicated ink, surface, and atmosphere colors. Geometry is decorative, aria-hidden, and pointer-transparent.

Only two orbit rings have slow settled transform motion. It pauses on exit and with the existing pause control; reduced motion presents the complete static active state. Connection endpoints follow the actual selected SVG matrix for a bounded 620 ms during selection/resize. Updating the two path attributes directly avoids rerendering the entire scene on every measurement frame. No filters or dependencies were added.

Experiments resets immediately when another layer is selected. A small parent visibility latch keeps an interrupted Ask Igal reversal hidden until Ask Igal is selected again, including a rapid Ask → Experiments → idle sequence. Ask Igal's component and timeline remain unchanged.

## Changed files

- `app/spatial-home/ExperimentsReveal.vue`: new scene, timeline, themes, responsive composition, cleanup.
- `app/spatial-home/SpatialHome.vue`: Experiments mounting and Ask interruption visibility coordination.
- `app/spatial-home/SpatialStack.vue`: one decorative Experiments circuit and visibility guard for interrupted Ask circuit paths. No geometry changes.
- `scripts/check-spatial-home-isolation.mjs`: detects the new component and distinctive selectors in production artifacts.
- This handoff.

Production pages, route definitions, navigation behavior, Work, locale catalogs, theme/language controls, and dependencies remain unchanged. No commits or pushes.

## Verification

Build, Vue type checking, locale consistency, and `git diff --check` pass. Production artifact inspection excludes spatial-home from 99 artifacts and design-lab from 98 artifacts. All eight localized/trailing-slash spatial-home URLs return 404; the four design-lab URLs also return 404.

Browser checks cover hover/exit, eight rapid reversals, Ask/Experiments switching (including immediate exit), keyboard arrows/Escape/Enter, EN/DE/RU navigation to Experiments, touch preview/dismiss/open, pause, complete reduced-motion state, unchanged stack bounds, pointer transparency, and horizontal containment at 320, 390, 768, 844, 1024, 1280, 1440, and 1920 px widths. Browser page errors: none.

`npm run lint:i18n:public` still reports the same 39 pre-existing prototype literals: 37 in design-lab and the Ask Igal name fragments `sk`/`gal`. No new literal findings were introduced.

## Performance and limitations

Isolated headless Chrome at 1440×900, three activate/exit cycles, development server:

| CPU slowdown | Frames sampled | Median | p95 | p99 | Frames >33.4 ms | Long tasks >50 ms |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 1× | 491 | 16.7 ms | 16.8 ms | 33.4 ms | 1 | 0 |
| 4× | 485 | 16.7 ms | 16.8 ms | 33.4 ms | 4 | 0 |

An earlier measurement overlapped other browser verification and showed substantial contention; the reported sample was rerun in isolation after removing per-frame reactive path updates. These measurements are a local regression signal, not a guarantee for every GPU/device. Touch uses browser emulation; Safari/Firefox and physical phones were not tested. Existing short-viewport vertical scrolling is retained. Review artifacts below are session-local `/tmp` files.

## Review artifacts

- `/tmp/m4h-review/experiments-spatial-story.mp4`: desktop hover, reveal, hold, and reversal in dark and light themes.
- `/tmp/m4h-review/dark.png`, `/tmp/m4h-review/light.png`: desktop active scene.
- `/tmp/m4h-review/mobile-dark.png`, `/tmp/m4h-review/mobile-light.png`: 390×844 touch composition.
- `/tmp/m4h-review/320x568.png`: smallest checked viewport.
- `/tmp/m4h-review/verification.json`, `/tmp/m4h-review/performance.json`: interaction and frame timing results.
- `/tmp/igal-portfolio-browser/m4h-{check,record,perf}.mjs`: browser verification/capture runners using pre-existing tooling outside the project.

Stopped after Experiments for visual review.
