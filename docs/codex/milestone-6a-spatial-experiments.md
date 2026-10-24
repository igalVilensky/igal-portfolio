# Milestone 6A — Modular Lab

Route: `/spatial-experiments` (also `/de/spatial-experiments` and `/ru/spatial-experiments`). Classic Experiments, Lab Shelf, Spatial Home navigation, Spatial Work, and the portal transition are unchanged.

## Construction

A machined docking drum carries replaceable annular cartridges around a recessed central hub. SVG constructs actual projected top, outer wall, inner wall and cut faces, using one shared oblique projection and explicit 30-unit thickness. The continuous base, registration marks and hub fasteners anchor the assembly. Light uses pale machined surfaces and slate sidewalls; Dark uses blue-grey faces with deep recessed edges. No imagery, new libraries or runtime geometry measurement loop is required.

`app/spatial-experiments/registry.ts` owns stable IDs, existing localization keys, type, component identifier, real Classic destination, integration status, accent and glyph. Sector size and location derive from index and registry length. A fourth entry needs no coordinate or animation-engine changes. Labels wrap independently of geometry. A separate secondary collection is the extension point for a future Lab Shelf; it is intentionally absent from this scene.

## Tool and interaction

Contrast Checker embeds the original component unchanged. All color fields, native color pickers, swap, validation fallbacks, luminance calculation, ratio, AA/AAA states and translated guidance remain owned by that component. Architect Simulator (currently titled System Design Sketcher in Classic) and JSON to TypeScript show real descriptions and locale-aware links to `/experiments`; these working Classic tools will receive Spatial surfaces later.

One shared state machine owns rest, extracting, opening, use, returning and docking. Activation settles decorative entrance, measures the actual trigger position, and translates the cartridge outward for 190ms before expanding a surface from its extracted bounds for 460ms. The final surface has axis-aligned edges, an attached material rail and bottom thickness. Return collapses to those bounds in 400ms, then visibly reseats the cartridge in 190ms. Stable IDs resolve docking geometry, including Vue-proxied selection records. Concurrent activations are ignored; users return before selecting another module.

The surface is a labelled dialog with internal scrolling. Background navigation is inert, scene controls leave the tab sequence, focus enters after Vue removes inert, Tab stays inside, Escape returns, and focus returns to the originating control. Tool controls are inert only during transformation. Decorative entrance never controls availability.

## Motion and mobile

Structural parts and cartridges align along the same assembly axis in a staggered 700–980ms entrance. One ancestor supplies a smooth eight-second ±5px float. Selection pauses shared motion; the user can also pause it explicitly. Reduced motion skips all interaction/entrance animations and disables idle motion. Timelines and the keyboard listener are cleaned up on unmount.

Below 600px, the sculpture retains its recognizable geometry and glyphs, with full-width readable cartridge selectors beneath it. They share the registry, state, extraction and return logic. The surface fits the viewport, scrolls internally and provides 44px controls. Future mobile refinement can merge these selectors more closely into the physical sculpture and tune compact landscape layouts. Full desktop geometry remains the approval focus.

## Verification and review

Artifacts and diagnostics are outside the repository at `/tmp/m6a-spatial-experiments/`. The static build is browser-tested through Chrome's debugging protocol, including a fresh cache-bypassing reload and activation during entrance, tool calculations (21:1 and 1:1), swapping, validation fallback, preview, return, repeated openings, all modules, both themes, all locales, keyboard, touch, reduced motion, and a 390px viewport.

Repository-wide type checking currently reports errors in unchanged files (including the original Contrast Checker, JSON converter, app locale-head options and portfolio agent). The new route and registry must remain free of type diagnostics. Locale key consistency and synchronized catalog mirrors pass. The broader public i18n audit reports 49 existing untranslated literals in Design Lab and Spatial Home; these are outside this milestone.

No commit, push, deployment or global style preference is part of this milestone. Next work after visual approval: adapt Architect Simulator and JSON to TypeScript into these registered surfaces while preserving their existing behavior, then refine mobile geometry and consider a secondary collection.
