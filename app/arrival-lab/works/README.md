# The Living Works Gallery — Arrival 06

## Evidence and scope

The project is **Decision Matrix AI**, already registered in `app/composables/useProjects.ts` and `content/projects.json`. Its public repository was inspected on 2026-11-02 at commit `832d96be4d893b5acece18596c227fd2bc7095d8`:

- [README](https://github.com/igalVilensky/decision-matrix-ai/blob/832d96be4d893b5acece18596c227fd2bc7095d8/README.md): editable weighted criteria, scores, rankings, human-reviewed AI suggestions, React/Vite/TypeScript, Firebase/Firestore, Netlify Functions/Groq, Zod.
- [Scoring implementation](https://github.com/igalVilensky/decision-matrix-ai/blob/832d96be4d893b5acece18596c227fd2bc7095d8/src/services/scoring.ts): weights rounded/clamped to 1–5; scores 0–5; each contribution is weight × score; fit is total / maximum possible score.
- Real screenshot files exist in that repository (`home.png`, `matrix.png`, `scoring.png`, `ai-review.png`). None is invented or bundled here. No local matching screenshot was found. The gallery uses geometry rather than a fabricated application screenshot.
- [Live project](https://decision-matrix-ai.netlify.app/) and [repository](https://github.com/igalVilensky/decision-matrix-ai) are the registered destinations. There is no registered standalone case study or verified adoption metric for this project.

The installation is a deliberately limited, local conceptual demonstration. Two anonymous options and three generic criteria use clearly labeled illustrative scores. It does not invoke AI, persist decisions, implement must-have logic, or reproduce the full application. No sample is represented as a measured project outcome or a real product recommendation.

## World and interaction

One annex branches from a four-metre opening in the existing secondary light well. Arrival's main shell, Living Wall, FlowForge terminal and radio geometry stay intact. Concrete compression boundaries, offset roof planes, diagonal bearing ribs and bronze details distinguish Works from the vaulted Arrival hall.

Three input blades encode editable criterion weights. Connections terminate at the matching contribution in each of two stacked totals. Stack segment height is proportional to weight × score; changing a weight updates geometry, labels, numeric totals and ranking. Selecting a criterion highlights its corresponding material through both inputs and outputs. Motion settles after a change; there is no idle animation, sound or simulated AI.

The reading rail offers the same interaction with keyboard, touch or screen reader. The archive is a single boundary-mounted index, not a card grid. It reads `useProjects()` and filters professional projects. Titles, localized descriptions, stacks and actual registered case-study/demo/repository links are reused. Internal links use the current locale and open separately so the world and radio session remain intact.

## Modules and navigation

`registry.ts` defines a small typed registry: stable ID, module type, optional project ID, world location, destination/look target, interaction and availability. FlowForge, the matrix and archive use the same destination chooser. Future entries need not duplicate a project registry or change a fixed module-count layout.

`worldPath()` supplies explicit waypoints through the Living Wall throat and lateral annex opening. Works travel waits for the actual wall mechanism to open. The existing Journey and portal/radio routes reuse these safe connections. Travel can be cancelled. A close action releases the reading surface without changing camera position. Portal entry saves and restores its existing camera state. Reduced-motion mode completes guided movement without prolonged travel. The same project controls are available when WebGL fails or text mode is selected.

The route still owns the one YouTube controller and player. Works never mounts, destroys, loads, pauses or seeks it. No new audio exists.

## Files and verification

- `environment.ts`: annex and installation geometry/resources.
- `registry.ts`: modules and passage-aware paths.
- `matrix.ts`: illustrative weighted comparison.
- `WorksSurface.vue`: accessible controls and registry-based archive.
- `copy.ts`, `works.css`: EN/DE/RU labels and responsive presentation.
- `works.test.mjs`: scoring, ranking change, bounds, paths, module IDs, locale parity.
- Arrival's scene component, secondary enclosure, Journey and portal path integrate these pieces.

Run `node app/arrival-lab/works/works.test.mjs`. Review materials and full browser logs are outside Git in `/tmp/arrival-06-living-works/`.
