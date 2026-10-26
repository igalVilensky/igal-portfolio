# Milestone 8B — Transformation Engine

Local implementation for visual review. No commit, push, publication, live execution, or production validation.

## Diagnosis

8A moved a small capsule along a long production chassis, then scaled it away and revealed unrelated tiles. Subtle jaw/selector movements and a permanent reading panel carried most of the explanation. Desktop framing reserved substantial width for that panel. The result communicated a production station more strongly than information transformation.

## Persistent artifact

One parent group carries six persistent beveled modules. Each has a solid body, inset face, accent top, and contrasting connector/socket faces. Five persistent links connect the ordered assembly. The same modules retain their volume, identity, and material throughout; there is no capsule-to-tile replacement. Shared geometry/materials and batched stationary surfaces keep the scene to 90 objects including groups and anchors.

- **Input:** a gapped, tilted, asymmetric assembly enters along the chassis rails and settles into the intake.
- **Clarification:** the chamber opens; six modules separate into two readable banks with short, unresolved connection stubs.
- **Routing:** the bearing-mounted selector turns while alternating module lanes form an ascending/descending arrangement. Module orientation follows the routing operation.
- **Blueprint:** both banks align into an interlocking two-level lattice; socket faces align and the five links extend into a continuous path. The bridge-mounted alignment tool approaches the assembly.
- **Validation:** the completed lattice retains its geometry while the enlarged inspection portal traverses it. This represents conceptual review only.

Telescopic supports couple each module to the rail bed. The chamber's open uprights preserve visibility and carry the moving inspection head. The selector remains connected to its bearing; the alignment head remains on the bridge; the verifier traverses the existing output assembly. Motion limits remain deterministic.

## Animation ownership

The existing EngineMotion instance remains the sole elapsed-time owner. Automatic playback evaluates pure poses from its cursor. Pause stops cursor advancement; resume continues from that cursor. Replay resets the existing scene. Direct selection uses the controller's existing damped seek fraction to blend actual object position, quaternion, and scale toward the target pose, rather than replaying intermediate operations. A new target starts from the current scene transforms, including during rapid changes. There are no timeouts, secondary animation loops, or geometry creation during updates. Reduced motion uses static stage poses. Run during a direct transition finishes that transition before advancing playback; Pause freezes either operation at its exact cursor. Visibility suspends playback scheduling. Resources, environment maps, observers, listeners, and the renderer are cleaned up on unmount.

## Composition and interaction

The canvas occupies the full content width. A compact input/output sentence and expandable localized stage explanation replace the permanent sidebar. Playback and one five-stage navigator sit below the sculpture. Mobile places transport before contextual reading. The existing localized full-workflow description and WebGL fallback remain available.

Camera framing uses a full-width three-quarter view with a larger vertical field than the initially clipped attempt; mobile fits horizontal field of view. Material contrast separates warm artifact bodies from cool structural metals in both themes. No images, particles, bloom, dependencies, or global navigation changes were introduced.

Component picking highlights actual meshes and displays an anchored concise input/output label. The expandable HTML inspection summary is keyboard/touch accessible and also highlights the active assembly. Orbit drag and reset remain supported.

## Scope

Changed `app/pages/spatial-ai-automation.vue`, `app/spatial-ai-automation/ReasoningMachine.client.vue`, `app/spatial-ai-automation/geometry.ts`, and `app/spatial-ai-automation/engine.css`, plus this report. Also refined `motion.ts` and extended `scripts/check-reasoning-engine.mjs` to cover Run/Pause during direct transitions. Existing `model.ts`, project data, other routes, and locale catalogs are retained.

## Verification and review evidence

Evidence and temporary QA scripts live at `/tmp/m8b-transformation-engine/`. See build/type/model/geometry/browser logs there for final results. EN/DE/RU catalog consistency passes. The public untranslated-string audit has 49 existing failures in Design Lab and Spatial Home; the scoped TypeScript check reports 14 unrelated workspace diagnostics. Those files are outside this milestone's scope.

Visual approval remains a human review step. The mechanism is an illustrative kinematic model, not a physics simulation. The warm modules and branching lattice should be assessed for legibility in the supplied stage captures. The retained chassis still intentionally carries industrial visual cues.

Final verification passed: static generation; scoped scene/page TypeScript; locale catalog consistency; 5/30/60/144 Hz controller checks; Run/Pause interruption of direct transitions; persistent geometry/finite poses/rapid reversal; desktop playback and five stage captures; exact pause/resume; replay; Input→Validation and backward selection; rapid navigation; orbit/reset/component picking; keyboard activation; theme switching during playback; EN/DE/RU; 390px portrait; reduced motion; hard reload; WebGL fallback; and clean diff whitespace. Browser runs reported zero runtime exceptions. Preserved Spatial Home, Work, Experiments, About, and classic AI Automation returned HTTP 200. This is a route smoke check plus unchanged-source scope verification, not a full visual regression suite of those pages.

Recordings: `complete-transformation.mp4`, `direct-stage-switching.mp4`, and `mobile-interaction.mp4`. Stage screenshots: `artifact-input.png`, `artifact-clarification.png`, `artifact-routing.png`, `artifact-blueprint.png`, and `artifact-validation.png`. The review directory also contains dark/light idle, component inspection, locale, mobile, reduced-motion, and fallback screenshots.
