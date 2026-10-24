# Milestone 6B.1 — Kinetic Interaction

The approved Kinetic Core remains the same size and shape, using the same fixed camera, registry, tools, navigation and routes. No dependencies, images, physics engine or new GSAP timelines were added. Awaiting visual review; no commit or push.

## Files changed in this milestone

- `app/spatial-experiments/KineticCore.client.vue`: raycast interaction, pointer lifecycle, scene-graph refinement, coordinated rendering, hover and Light materials.
- `app/spatial-experiments/kineticMotion.ts`: renderer-independent controller for angular dynamics and presentation phases.
- `app/pages/spatial-experiments.vue`: selected experiment name and duplicate-click protection for HTML selectors.
- `app/spatial-experiments/lab.css`: canvas touch ownership and compact selected-name layout.
- `app/i18n/locales/{en,de,ru}.json` and `i18n/locales/{en,de,ru}.json`: synchronized instruction to drag rings, inspect modules and select to release.
- `scripts/check-kinetic-motion.mjs`: deterministic dynamics and state-transition checks.
- This document. Earlier milestone files/staged work are preserved. Spatial Home, Spatial Work, Classic and all experiment tool implementations are untouched by 6B.1.

## One interaction owner

`KineticMotion` exclusively owns the pose and angular velocities. Pointer handlers send bounded angular deltas, hover intent and releases; they never write ring transforms or create tweens. The one existing scene loop advances the controller, applies the pose and interpolates physical cap/material feedback. Existing GSAP timelines elsewhere in the site do not target this scene.

Free operation distinguishes idle, ring hover, module hover, dragging and inertia. Selection follows stabilizing → aligning → releasing → selected. Dismissal enters returning: the cap docks first, then the mechanism returns to the saved manipulated pose. A new selection during a transition updates its target continuously. Only free operation permits ring dragging; selected modules remain physically clickable, while HTML selection and tool actions remain available throughout.

## Axes and mechanical relationships

The hierarchy is `assembly → outer Z frame → inner Y gimbal → carrier X gimbal → cartridge-indexing Z rotor → mounts → sliding caps`. The carrier's former combined Euler/indexing rotation is separated into two pivots without replacing geometry. Its existing X journals now correspond directly to its manipulated axis, and selection indexing no longer rotates those bearings.

Dragging the outer frame transports its journals and every nested part. Dragging the inner ring transports its X journals, carrier and modules. Dragging the carrier leaves its parent rings independent. There is no invented velocity transfer or fake gear ratio. Parent transforms provide the mechanical coupling, while the internal rotor indexes cartridge saddles around the circular carrier rail.

Raycasting resolves the nearest visible physical surface; rear rings/modules cannot be grabbed through the hub or other geometry. A captured ring hit is stored in local coordinates. Consecutive pointer rays intersect the plane normal to the actual axle in the pivot parent's coordinates, giving a signed `atan2` angular displacement. Near edge-on planes use the camera-projected angular tangent as a conditioned fallback. Grabbing very close to an axle gives little leverage, as expected; it never becomes camera orbit.

## Angular model and pointer lifecycle

Recent movement over approximately 100ms estimates release velocity, clamped to ±6 radians/second. A held release suppresses stale velocity. The exact integration is `deltaAngle = velocity * (1 - exp(-lambda*dt)) / lambda`, then `velocity *= exp(-lambda*dt)`. Damping rates are 1.9/s for the larger outer frame, 2.4/s for the inner ring and 2.8/s for the carrier. Stabilization uses stronger 16/s damping before alignment. The shortest wrapped angular difference drives presentation and return, with no spring bounce.

Mouse movement must exceed 5px (touch 9px) to count as a drag. Crossing that threshold permanently cancels module activation for the gesture, even when returning to the starting point. Module activation requires a matching down/up hit. Ring drags never emit selection. Pointer capture handles release outside the canvas; cancellation, lost capture, Escape, window blur, visibility loss, selection interruption, context loss and unmount all release interaction ownership. Secondary touches cancel the active press. Physical and HTML double clicks activate once. Hover never navigates.

## Hover and selection feedback

A hovered module extends 0.075 units along its own guide pins; its existing accent and body receive a small, static material emphasis. Leaving retracts it smoothly. Ring faces receive restrained material emphasis and a grab/grabbing cursor. These are mesh/material changes, not CSS scaling or floating cards.

Selection freezes the idle clock and damps remaining free motion, then aligns the ring hierarchy and indexes the chosen cartridge near the top. Only after alignment does the cap lift 0.32 units. The selected name, locale-aware Classic action and dismissal remain accessible in the existing rail. Escape restores focus. Tools retain their existing functionality through the same Classic destination; their full Spatial opening is deferred to 6B.2.

## Materials and performance

Dark mode retains its existing palette and light setup. Light mode uses warmer champagne faces, blue-grey inner surfaces, lighter neutral caps/hub and distinct deeper sidewalls. Lower face metalness gives a brighter diffuse response without relying on an environment map; a controlled hemisphere/key/rim balance preserves recess separation. No shadow maps, postprocessing, glow pulses or extra geometry are added.

Rendering uses the existing single requestAnimationFrame chain: up to 60fps during manipulation/coasting, 30fps for idle and settling, and no scheduled frames once selection or pause settles. Device pixel ratio remains capped at 1.6. Delta time is bounded at 100ms for stalls; visibility suspension resets the frame clock. Pointer geometry calculations reuse vectors, planes, rays and matrices, and hit storage is reused. No geometry is allocated in the frame loop. All geometry, material and texture resources, observers, media listeners and input handlers are disposed on unmount.

Reduced motion disables idle and inertia, makes selection/dismissal deterministic and immediate, and retains direct ring manipulation plus native HTML tool access. The scene has no entrance/loading gate. Native controls support keyboard Enter/Space, visible focus and Escape independently of 3D dragging. Touch uses the same captured pointer controller. WebGL failure retains the lightweight functional fallback.

## Validation and artifacts

Run `node --experimental-strip-types scripts/check-kinetic-motion.mjs` with Node 22+. It verifies angular frame-rate invariance at 30/60/144Hz, decay to rest, reverse direction, cancellation, held release, reduced motion, shortest-path staged selection and docking/return. Browser review additionally exercises actual raycast surfaces and pointer capture rather than synthetic scene coordinates.

`npm run generate` passes. `vue-tsc --noEmit -p .nuxt/tsconfig.app.json` reports the same 25 errors in unchanged application/server code, with none in the interaction controller, scene or route. Both staged and unstaged `git diff --check` pass.

Review materials are exclusively under `/tmp/m6b1-kinetic-interaction/`: browser scripts/logs/results, Dark/Light captures at 1366×768, 1440×900 and 1920×1080, selected/hover/touch captures, and four actual-browser recordings (`ring-drag.mp4`, `fast-inertia.mp4`, `module-hover.mp4`, `module-alignment.mp4`). Timestamped flick input avoids software screencast overhead converting a flick into a held release. Browser checks cover independent axes, parent attachment continuity, hover/lift, inertia and damping, click/drag discrimination, double click, cancellation, release outside the canvas, rapid selection changes, keyboard interruption, hard reload, native keyboard activation, touch rotation/activation, reduced motion, stopped rendering, visibility and WebGL fallback. Soft navigation to Spatial Home during a captured drag also disposes the scene safely; history return creates an interactive new scene. No uncaught browser exceptions were observed.

## Known limitations

This is constrained kinematics, not collision/contact simulation. There is no orbit camera or keyboard ring-spin control; all experiment selection/tool access remains keyboard accessible. An axle-aligned grab or near edge-on orbit has less screen-space leverage, so drag direction matters. Mobile is functional but retains the earlier compact layout. Software-rendered headless Chrome verifies behavior and captures; physical touchscreen and mid-range hardware GPU profiling remain useful follow-up checks. Animated bank exchange and full tool expansion remain deferred.
