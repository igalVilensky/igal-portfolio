# Milestone 4F.4 — Work Page Peek

The development-only spatial home now previews the real Work destination. The rejected SpatialEnvironment is disconnected; its geometry, parallax listeners, and animation timeline are no longer mounted. Other layers and production pages are unchanged.

The preview reuses the destination's localized heading, introduction, section labels, and FlowForge content through useProjects. MindQ Lab's existing screenshot supplies authentic imagery, identified as secondary work. The original image contains Russian text; it is preserved as a real screenshot in every locale. The page fragment is decorative, has no separate project links, and uses the destination's editorial row structure.

A single reversible 400 ms GSAP timeline animates opacity and transforms. Its seam starts at the Work layer's right edge. Pause and reduced motion resolve to static states. Work activation has no artificial navigation delay; touch retains first-tap preview and second-tap navigation. The central stack keeps its dimensions and layout. Compact previews occupy the existing space below the stack, and short screens omit the large heading.

Verification: Chrome/Playwright checked hover, collapse, ten rapid interruptions, keyboard arrows/Home/Escape/Enter, two-tap touch navigation and outside dismissal, EN/DE/RU destinations, both themes, reduced motion, unchanged stack bounds, and horizontal containment across 320–1920px widths. Visual inspection caught and corrected a short-screen overlap. Existing short-screen vertical scrolling remains.

Chrome DevTools tracing and Performance metrics were collected during interrupted transitions, with a PerformanceObserver checking main-thread long tasks. Measurements are from local headless Chrome, not a guarantee of frame rate on other hardware.

Review artifacts: `/tmp/m4f4-review/work-page-peek.mp4`, desktop/mobile/localized screenshots, `short.png`, `verification.json`, and `performance.json`. The recording shows dark reveal/hold/collapse and light reveal/hold/collapse. Browser runners are in `/tmp/igal-portfolio-browser/m4f4-*.mjs` and reuse the existing installation; no dependency was added.

Type checking, production build, whitespace checks, and production isolation passed. The isolation scanner covers WorkReveal signatures; all eight localized/trailing-slash experimental route variants returned 404. No commits or pushes. Stop here for visual review.
