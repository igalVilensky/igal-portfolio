# Milestone 4G.2 — Ask Igal spatial story

Ask Igal now becomes AI, sends a signal into the selected plane, illuminates its visible front rim and junction, and produces a response waveform with progressively drawn abstract text fragments on the right. These are decorative response cues, not an invented answer.

One reversible GSAP timeline owns the glyph transformation, incoming path, actual plane geometry, outgoing path, response, and finite cursor pulse. The name enters in 180 ms; original A/I glyphs assemble by 610 ms; the signal reaches the plane at 830 ms; the response begins at 1.22 seconds and settles around two seconds. Exit reverses at 1.6× from the current playhead, removing the response before restoring the name and clearing the layer. Paused/reduced-motion states resolve immediately to coherent endpoints. Navigation remains immediate and unchanged.

Endpoints use the selected SVG's screen transformation matrix. The existing bounded measurement loop follows its selection movement. The response connection meets the waveform's measured start. Mobile places compact identity/response cues beneath the unchanged stack. No new filters, dependencies, real AI requests, or continuous reveal loops were added.

## Files changed in this milestone

- `app/spatial-home/AskIgalReveal.vue`: connected reveal and responsive/theme styling.
- `app/spatial-home/SpatialStack.vue`: exact Ask Igal entry/exit measurement and two decorative SVG paths only.
- `app/spatial-home/SpatialHome.vue`: additional Ask Igal endpoint coordinates.
- This handoff.

Existing uncommitted work was preserved. Work reveal, production pages, destinations, locale catalogs, stack dimensions, and navigation code were not edited in this milestone. No commits or pushes.

## Verification and artifacts

Chrome/Playwright passed hover, full reveal endpoint, collapse, ten rapid interruptions, keyboard arrows/Escape/Enter, EN/DE/RU labels and routes, touch first-tap preview/outside dismissal/second-tap navigation, reduced motion, pause, unchanged stack bounds, and horizontal containment at 320, 390, 768, 844, 1024, 1280, 1440, and 1920 pixel viewport widths. Additional checks verified central path activation/complete reversal and pointer-events exclusion. Desktop/mobile light/dark screenshots were inspected. Testing uses browser touch emulation, not physical mobile hardware.

`npm run build`, `npm run lint:i18n`, Vue type checking, and `git diff --check` passed. Production isolation found no prototype code in 99 build artifacts, and all eight localized/trailing-slash prototype URLs returned 404. The broader `npm run lint:i18n:public` remains failing on 37 existing design-lab strings and the preserved English name fragments `sk`/`gal`; no locale keys were changed. Short landscape layouts retain existing vertical scrolling.

Artifacts are local to this workspace session:

- `/tmp/m4g2-review/ask-igal-spatial-story.mp4`: dark and light hover, full progression, hold, reversal.
- `/tmp/m4g2-review/dark.png`, `light.png`: desktop hover.
- `/tmp/m4g2-review/1440-dark.png`, `1440-light.png`: desktop keyboard focus.
- `/tmp/m4g2-review/390-dark.png`, `390-light.png`: compact mobile composition.
- `/tmp/m4g2-review/verification.json`: interaction results and viewport measurements.
- `/tmp/igal-portfolio-browser/m4g2-{check,visual,record}.mjs`: verification and recording runners using the existing browser tooling.

Stopped after Ask Igal. No production integration or additional layer implementation.
