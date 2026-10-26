# Milestone 8A — The Reasoning Engine

Route: `/spatial-ai-automation` (also `/de/spatial-ai-automation` and `/ru/spatial-ai-automation`). This is a deterministic architecture study, with no execution, external AI calls, generated answers, model reasoning traces, or live validation claims.

## Machine and scene graph

A single twin-rail instrument carries a request through a split interpretation chamber, a bearing-mounted routing fork, a blueprint assembly press, and a traveling inspection portal. A continuous chassis, guide channels, crossmembers, bridge, sliders, and fasteners provide structural connections. The geometry uses substantial rounded volumes rather than wireframes or nodes.

`geometry.ts` owns one root with intake, chamber, upper/lower jaws, routing cradle/selector, assembly bed/press, inspection gantry/scanner, carrier/capsule, and output tiles. Child transforms express physical motion. Fixed parts are merged per assembly, material, and pick identity; the result is 43 mesh draw calls. A shared rounded box and cylinder supply the source geometry. Geometry, materials, environment, renderer, observers, listeners, and animation frames are released on unmount.

## Verified conceptual sequence

The source is the existing `flowforge` record in `app/composables/useProjects.ts`, especially its long description and highlights. It explicitly describes guided clarification, routing, blueprint generation, safety review, structured non-executing previews, and inactive n8n JSON drafts with placeholder credentials. The page imports the project's identity, source link, and metadata from that record. The new localized stage model interprets those facts without changing the original data.

| Stage | Architectural meaning | Physical action |
| --- | --- | --- |
| Input | Plain-language idea and incomplete requirements | A compact cyan request carrier enters the intake along the common rails. |
| Clarification | Guided, LLM-assisted interpretation of missing requirements | Upper and lower jaws separate along guides; the capsule cap opens. |
| Routing | Multi-agent compiler assigns suitable capabilities | A fork pivots on a central bearing and aligns the carrier's path. |
| Blueprint | Structured, non-executing workflow proposal | Separate tiles unfold and settle into an ordered carrier assembly under a moving press. |
| Validation | Safety review and rule-based checking, with human review required | An inspection portal translates across the emerging draft; a review marker rises. |

The final abstract tile assembly is a conceptual output, not a fabricated workflow JSON document or successful validation result.

## Animation and interaction

`EngineMotion` is the sole time owner. Its cursor drives every assembly through a pure pose function. Full playback takes approximately 21 seconds of foreground time. Pause freezes the cursor and all linked motion. Replay resets the demonstration. Direct selection follows the same continuous path in either direction, with an exact settled target. Hidden tabs stop work and reset the time origin on return.

Run/Pause/Resume is one clearly labeled primary button; Replay is adjacent. Five stage buttons provide direct access to the architecture. Component raycasts select a stage and expose a projected label at its assembly; the readable explanation remains beside the machine. Keyboard users access equivalent content through the same stage buttons and the full textual workflow disclosure. There is no modal or focus trap.

Drag inspection is restricted to a small yaw/pitch range. A seven-pixel threshold suppresses accidental picks after dragging. Controls are outside the drag surface. Reset view restores the default orientation.

## Themes, localization, mobile, and fallback

The environment copies the approved Home/Work atmosphere: a cool radial field over `#0a111b` in Dark and `#f0f5f9` in Light. Materials use steel, blue/slate metal, silver shells, recessed dark surfaces, and restrained cyan accents. No bronze/gold palette is introduced. Theme changes recolor the existing scene without remounting the machine or resetting its cursor.

All stage explanations, conceptual inputs/outputs, categories, controls, and fallback information have EN/DE/RU variants in the typed model. The model separates stable IDs, categories, component IDs, content, and animation preview configuration from mesh construction.

Mobile uses a dedicated camera position and horizontal framing calculation. The controls appear directly below the machine and before its reading panel, with five touch-friendly stage controls and no required dragging. The stage panel becomes a full-width reading surface. Reduced motion presents discrete stage poses without animated mechanical travel. WebGL creation failure or context loss replaces the renderer with a localized message while retaining every stage, playback control, and textual explanation.

## Verification and review

- `npm run generate`: passed, including all three localized routes.
- Scoped TypeScript checking of new SFC scripts and model/geometry/motion: passed.
- Repository TypeScript checking: blocked by 14 existing diagnostics in `server/api/portfolioAgent.post.ts`; no new-file diagnostics.
- `npm run lint:i18n`: passed.
- Stage/content EN/DE/RU parity checks: passed.
- `npm run lint:i18n:public`: reports 49 existing untranslated literals in unrelated files; no new-page violations.
- `node --experimental-strip-types scripts/check-reasoning-engine.mjs`: passed at 5/30/60/144 Hz, including elapsed-time consistency, pause/resume, replay, continuous transport, reversible selection, reduced motion, stage identity, and locale parity.
- Geometry checks: 43 mesh draw calls, five inspection anchors, finite forward/reverse transforms, both themes, and disposal passed.
- `git diff --check`: passed.

Review artifacts and detailed browser results live outside the repository under `/tmp/m8a-reasoning-engine/`. Production browser checks cover Dark/Light idle, full playback, pause/resume, replay, direct stage selection, reconfiguration, component inspection, drag suppression/reset, theme preservation, EN/DE/RU switching, portrait layout, reduced motion, hard reload, WebGL fallback, and keyboard activation. No runtime exceptions were observed. Final framing also covers 320px width. See `browser-results.json`, `final-visual-checks.json`, PNG captures, `full-workflow.mp4`, and `stage-switching.mp4`. The implementation is left uncommitted for visual review.

Limitations: the machine illustrates a conceptual architecture rather than individual production agent contracts. Phone testing uses Chrome portrait emulation, not physical midrange hardware. Performance under actual mobile GPU/thermal conditions and assistive technology behavior still merit device testing. No global Classic/Spatial switch or navigation destination changes are included.

## Files added

| File | Responsibility |
| --- | --- |
| `app/pages/spatial-ai-automation.vue` | Standalone localized route, playback owner, accessible controls and readable stage information |
| `app/spatial-ai-automation/model.ts` | Typed FlowForge stages and EN/DE/RU content |
| `app/spatial-ai-automation/geometry.ts` | Integrated machine, reusable geometry/materials, batched fixed assemblies, physical poses and disposal |
| `app/spatial-ai-automation/motion.ts` | Deterministic transport clock, playback and reversible selection |
| `app/spatial-ai-automation/ReasoningMachine.client.vue` | Three.js lifecycle, camera, picking, projection, theme updates and visibility handling |
| `app/spatial-ai-automation/engine.css` | Shared Spatial atmosphere, layout and mobile control order |
| `scripts/check-reasoning-engine.mjs` | Motion, stage-model and localization regression checks |
| `docs/codex/milestone-8a-reasoning-engine.md` | Implementation and verification report |

All files are additions. Classic AI & Automation, the other Spatial experiences, their navigation destinations, project records, Ask Igal, and package dependencies are unchanged. No generated images or temporary review files are added to the repository.
