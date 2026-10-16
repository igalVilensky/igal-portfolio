# Milestone 4L.1 — rigid-body validation and stable labels

2026-10-16. **Stop for visual review.** This correction replaces the split between a projected Ask plate and four hard-coded SVG plates. All five layers now instantiate the same `SpatialPlate.vue`, using the same `plateGeometry.ts` model. The former Ask-specific component and geometry module are removed.


## Final validation correction

The shared resting geometry is preserved. Inspection found no independent corner interpolation: the canonical eight vertices are rotated about local Y at the solid origin, then passed through one perspective camera. The apparent silhouette change includes occlusion by the two upper plates. No geometry, production motion timing, colors, dimensions or other layer interactions were redesigned for this correction.

Development diagnostics are available at `/spatial-home?geometry=1` (also localized routes). A–D identify the top physical corners, O is the solid center, and X/Y/Z show the rotated local axes. The overlay deliberately draws through neighboring plates so hidden corners can be inspected. The panel distinguishes constant physical dimensions from changing projected lengths, reports yaw and rotation from rest, and provides a review-only pose slider. “Live hover / focus” restores normal input. Diagnostics do not ship to production. The slow recording drives this slider; normal hover timing is unchanged.

### Label jitter: measured cause and fix

The rendered title's ResizeObserver called getBBox and wrote a new fitting matrix. Chromium's glyph bounds varied under the continuously changing fractional ancestor transforms; the observer/write loop converted those variations into visible title scale changes. During seven seconds, **each of the five title fitting matrices changed 65 times**, while each front-edge geometry matrix remained constant. This was not independently animated label geometry or GSAP competition.

`SpatialPlate.vue` now measures a temporary, untransformed 1:1 SVG outside the animation hierarchy. It copies actual font/weight/spacing, fits the title once, and only repeats for text, selected weight, font loading or the mobile typography breakpoint. There is no title ResizeObserver, per-frame measurement, coordinate snapping, or removal of idle motion. The label continues to use the same projected edge basis during idle and rotation; real accessible anchor names and SVG text remain intact.

After the fix, every fitting matrix remains unchanged across idle, Ask activation and return in dark/light at DPR 1 and DPR 2. Before/after frame crops confirm the visible size pulsing is removed. Each recording includes six seconds of untouched idle, activation/hold, return, and more than five seconds of subsequent idle. Screen capture cadence is lower than browser rendering cadence; these clips demonstrate geometry and label attachment, not a frame-rate benchmark.

### New evidence

Session-local directory: `/tmp/m4l1-validation/`.

- `slow.mp4`: 12-second diagnostic review, rest → four-second turn → final hold → four-second return.
- `dark-1x.mp4`, `light-1x.mp4`, `dark-2x.mp4`, `light-2x.mp4`: idle/hover/return stability at normal zoom and both device pixel ratios; matching JSON reports zero fitting mutations for all five labels, no overflow and returned progress zero.
- `pose-{dark,light}-{0,0.3,0.6,1}.png`: exact review poses with center, corners, axes and angle.
- `before-trace.json` / `after-trace.json`, `before-label-contact.png` / `after-label-contact.png`: observer feedback evidence and enlarged frame comparisons.
- `node scripts/check-spatial-geometry.mjs`: 101 poses, all 28 pairwise distances, orthogonal equal square edges, constant thickness, parallel opposite edges, fixed center, single-camera projection, positive depth with decreasing scale, shared resting vertices, and centered label basis/containment. Final far/near edge ratio is 0.7861, as expected for ordinary perspective.

Build, locale lint and production isolation pass (99 artifacts and eight production URLs returning 404). App type checking still reports the same 25 errors in unchanged files, with none in the changed geometry, plate or stack code. Localized EN/DE/RU label checks at 320/1440 in both themes have no clipping; final center error is under 0.04 CSS pixels. Pointer, keyboard, touch, rapid reversals, reduced motion and shared resting/returned geometry are rechecked using the existing browser harness. Physical devices and non-Chromium browsers remain untested.

**Stop for visual review. No commit or push.**

## Shared definition

`plateGeometry.ts` owns the square's eight local corners, equal side lengths, thickness, camera, face visibility, surface paths, rim/corners, front-edge label basis and stationary hit silhouette. All five instances use the same cached resting projection. The component renders the same top, side and front faces, inset, core, grid, rim and corner geometry for every layer. Labels use the same centered, fitted edge treatment; Ask retains its existing A/I accents.

The layer index selects only existing decorations/style and label content. Geometry receives a single orientation-progress input. Ask changes that input from zero to one and reverses it; the other four remain at zero. There is no alternate Ask resting or active shape. The same eight-corner square is projected before, during and after rotation. Parent anchors still control vertical stacking, existing reveal translations and stationary input ownership.

The model retains the reviewed perspective camera: square sides `455.936683897`, physical thickness `23.317224444`, camera distance `1800`, elevation `19.35063°`, and centered yaw through `37.94151°`. The solid's projected pivot remains `(359.380565,127.308169)`. Larger camera depth produces smaller projected scale. SVG path coordinates are serialized to six decimals so server/browser trigonometric rounding cannot produce insignificant differences between resting instances.

All layers now share the same soft shadow and physical side construction; none uses the obsolete detached contact-shadow polygon. The existing AI clip/surface strokes and Experiments attachment endpoints reference the shared model. Their timings and interactions are unchanged. Existing surface-authored decoration paths are mapped to the canonical face, not used as alternate definitions of the plate. No new effects or assets.

## Verification

Session-local evidence: `/tmp/m4l1-shared/`.

- `shared-geometry.json`: compares eight geometric path definitions across all five resting instances, verifies that only Ask changes during rotation, and compares the returned state to the original. Desktop and mobile cases are included.
- `rest-{1440,390}-{dark,light}.png`, `rotated-{1440,390}-{dark,light}.png`, `returned-{1440,390}.png`: visual review captures.
- `reveal-{0,1,3,4}.png`: the existing four non-Ask reveal states, checked after geometry adaptation.
- `rotation.mp4`: live Ask hover and return on the shared stack.
- `geometry.log`: 101 poses verifying square dimensions, rigidity, fixed center, correct perspective depth, label attachment and containment.
- `verification.json`: pointer/focus/Escape, rapid reversals, touch preview/navigation, reduced motion, localized Ask destinations and overflow checks.

Build and production artifact isolation pass (99 artifacts). App type check retains 25 existing errors in unchanged files; no errors in the shared model/component or adapted reveal files. `git diff --check` passes. Browser interaction checks report no page exceptions. The eight exact geometry paths and return identity are asserted separately from visual inspection.

The other layers necessarily adopt the canonical square's perspective and corner treatment; this is the requested geometry unification, not a new reveal design. Chrome mobile emulation was used; physical devices, Safari/Firefox and screen-reader speech were not tested. Existing stack idle breathing and active styles remain. No dependencies, production integration, commit, push or deployment. **Await review before further work.**
