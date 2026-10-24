# Milestone 6B — Kinetic Core

Replaces the rejected sector platform on `/spatial-experiments`. Awaiting visual review; no commit, push or deployment.

## Geometry and renderer

A suspended open gimbal has three beveled annular extrusions, with 0.21 / 0.17 / 0.16 units of axial thickness. A warm outer frame surrounds a blue inner gimbal and a neutral cartridge rotor. Two opposed bearing pairs establish the actual rotational axes. Radial steel rods attach the cartridge mounts to a compact hexagonal hub. Each cartridge has a solid recessed base, a thick cap, an inset marking plate and two sliding guide pins. There is no floor, sector geometry, image artwork, shadow map or postprocessing.

Three.js provides a perspective camera and a depth buffer: rings, journals, hub, rods and cartridges all occlude each other from their actual geometry. CSS 3D cannot reliably interleave intersecting ring meshes, and projected SVG would require a separate hidden-surface renderer for every pose. Only `three` and development-only `@types/three` were added; no TresJS, physics, control library or GSAP wrapper is needed. The existing GSAP infrastructure remains unchanged. The small marking textures are drawn in code on canvas; no generated artwork is used.

The component is client-only and instantiated on mount. The accessible controls and navigation are server rendered. Resize and theme observers update the renderer. All geometries, materials, label textures, listeners, observers, animation frames and renderer resources are disposed on unmount. Initialization failure and context loss expose a lightweight fallback; the same HTML controls still select real tools.

## Mechanical hierarchy

`assembly → outer frame → inner Y-axis gimbal → X-axis carrier → radial mount → sliding cap`.

The outer frame owns both Y-axis journals; the inner gimbal owns the X-axis journals. Circular carrier symmetry allows its rotor to index in-plane inside those journals. Modules and their rods are children of the carrier. Their projected positions are never animated separately in screen coordinates. The guide pins belong to the cap and slide into the stationary mount as it returns. The entire assembly uses one perspective camera.

## Motion and selection

A 1.15-second settling sequence aligns the nested axes and seats the caps. It never gates interaction. Early selection changes the pose target while entrance settling continues, avoiding a reset or teleport. Idle uses deterministic sinusoidal movement: very slow outer drift, distinct inner and carrier oscillations and a small shared float. Labels oscillate with their actual mount, rather than spinning independently.

Selecting a physical cartridge by ray casting or its HTML button freezes the idle clock. A damped pose transition presents the selected module near the top, using the shortest angular route; the cap lifts 0.32 units along its local Z guide pins. Other modules remain mounted. Escape or selecting the same button clears selection and returns continuously to the frozen idle phase. A separate locale-aware link opens the existing Classic tools, with no tool logic changes. The former Contrast dialog is intentionally superseded by that temporary access path for this geometry milestone.

Native buttons expose meaningful translated names and `aria-pressed`; Enter, Space, pointer and touch share selection state. Escape restores focus to the associated control. Navigation stays available. Reduced motion skips entrance, idle and pose interpolation, including when the preference changes at runtime. Rendering is capped at 30 fps, device pixel ratio at 1.6, stops after a selected/paused pose settles and stops while the document is hidden. No continuous GSAP ticker or WebGL animation loop remains active in settled states.

## Registry and expansion

The existing experiment records, IDs, routes, translation keys and component identifiers are preserved; the obsolete sector geometry helper is removed. Up to six real registry entries share the same carrier, equally spaced:

- A fourth experiment receives a fourth mount at quarter intervals; dimensions stay constant.
- Six experiments use six equally spaced mounts on the same carrier. At this count the current dimensions leave space between caps.
- Ten experiments form banks of six and four. Selecting a registered item in another bank replaces the visible cartridge bank within the same carrier envelope. The selected ID resolves its bank; there are no fake modules or empty selectable slots.

All records remain available in the HTML controls; labels for future IDs use their registry glyph and a short ID fallback. The first prototype shows only the three actual experiments. A tactile animated bank exchange and a compact selector for larger registries are future work; bank swapping is currently immediate. Neither requires scaling the complete sculpture.

## Scope and review

Changed files: `app/pages/spatial-experiments.vue`, `app/spatial-experiments/KineticCore.client.vue`, `app/spatial-experiments/lab.css`, `app/spatial-experiments/registry.ts`, `package.json`, `package-lock.json`, and this document. Earlier staged Milestone 6A files are preserved. Spatial Home, Spatial Work, Classic Experiments and all tool implementations are unchanged by this milestone.

Review artifacts, browser scripts, raw recording frames and verification logs live exclusively in `/tmp/m6b-kinetic-core/`. See `browser-results.json`, `generate.log`, `types-app.log` and the screenshots/MP4s there. The app TypeScript check still reports existing diagnostics in unchanged code; no diagnostics belong to the new route, registry or scene. Full mechanical opening, embedded Spatial tool surfaces, mobile refinement and animated bank exchange remain outside this milestone. The browser review uses software WebGL in headless Chrome; physical-device GPU and touch testing remain useful follow-up checks.

### Verification results

`npm run generate` succeeds. Both staged and unstaged `git diff --check` pass. `vue-tsc --noEmit -p .nuxt/tsconfig.app.json` reports 25 existing errors in unchanged application/server files and zero errors in this milestone's scene, route or registry. Running `vue-tsc` only against the root references would not check the app, so the app configuration was checked explicitly.

Generated-build Chrome checks pass for real canvas ray-cast selection, HTML pointer selection, Enter/Space, Escape/focus restoration, hard reload and early selection, 1366×768 and 1920×1080 in both themes, immediate reduced-motion selection, 390px touch selection without horizontal overflow, DE/RU controls and links, and forced WebGL failure. No uncaught browser exceptions were observed. Additional instrumented frame-count checks confirm idle activity, pause and resume, no scheduled frames after selected/paused settling, hidden-document suspension and visibility restoration, and no continuous rendering under reduced motion.

Review captures: `dark-rest.png`, `light-1366.png`, `selected-lift.png`, plus both desktop sizes, touch, reduced-motion and fallback captures. `assembly-idle.mp4` is 5.6 seconds; `selection-return.mp4` is 5.8 seconds. Recordings preserve actual Chrome frame timestamps. Geometry, occlusion, entrance alignment, ring drift and selection lift were visually inspected from the captures. These are engineering prototype review materials, not a claim of visual approval.
