# Milestone 4O review

First-pass AI & Automation reveal at the development-only `/spatial-home` route. No commit or push.

## Implementation and assets

- `app/spatial-home/AutomationReveal.vue`: new finite, reversible GSAP sequence. Input unfolds from a compact origin, an inlet draws toward the plate, processing appears behind it, the plate pulses, an outlet draws, then output expands. No repeating reveal animation, particles, new dependencies, or per-frame SVG path-shape changes.
- `app/spatial-home/SpatialStack.vue`: activates AI's existing `projectPlate` geometry through the same eased `useActiveCore` clock as Work/Experiments/Ask Igal. Adds amber lighting and a small vertical separation. Removes the old `AiFlowReveal` from this prototype's render tree; its source and Design Lab remain intact.
- `scripts/check-spatial-home-isolation.mjs`: additionally rejects automation artwork/component names and reveal markup in production output.
- Four supplied PNGs verified at `app/spatial-home/assets/automation/`. Inputs, processing and output are imported without modifying their files. Route is deliberately unused: two winding SVG path segments can meet the selected plate and pass behind it more precisely.
- Mobile preserves stack dimensions and uses small input/output motifs, with processing and the route hidden. Narrower desktops bring the artwork inward.

## Review artifacts

- [Desktop dark](desktop-dark.png), [desktop light](desktop-light.png)
- [Mobile dark](mobile-dark.png), [mobile light](mobile-light.png)
- [Interaction recording](interaction.mp4): hover, exit/reversal, rapid focus switching, reactivation and final reversal. Headless screencast frames encoded at a fixed 4 FPS; playback timing is approximate, not a frame-rate benchmark.
- `browser-results.json`: raw interaction run, including an early reduced-motion opacity observation before the browser painted its static endpoint.
- `performance-and-static.json`: final settled reduced-motion check and unrecorded timing sample. The static endpoint has pose 1 and artwork opacity 1 / .72 / 1.

## Verification

- Production build, `vue-tsc --noEmit`, locale consistency, shared geometry assertions, and `git diff --check` pass.
- Production isolation: no prototype artifacts; eight localized/unlocalized prototype URLs, with/without trailing slash, return 404.
- Hover activation/exit, centered rotation, complete exit cleanup, keyboard activation, rapid interruption and adjacent Ask/About switching pass. Artwork returns to opacity zero and AI pose zero after exit/switching.
- Mobile first tap activates without navigating; subsequent keyboard Enter navigates to `/ru/ai-automation`. DE/RU links and accessible labels retain their localized values; EN is exercised in the desktop/mobile runs.
- Desktop 1440×1000 and mobile 390×844, both light/dark, visually reviewed. No document horizontal overflow in these tests. Artwork does not intercept input; images are decorative and hidden from accessibility APIs.
- Reduced motion reaches a complete static state; leaving clears it. No continuous reveal timeline remains running after settlement.
- Existing `lint:i18n:public` fails on 48 pre-existing untranslated strings in Design Lab and developer geometry diagnostics. This milestone adds no informational text or locale keys.

## Performance and limitations

Headless Chrome, device scale 1, development server. Unrecorded samples over about 2.5 seconds each: idle median 66.7 ms, p95 133.3 ms, max 150 ms (32 samples); activation median 100.1 ms, p95 150 ms, max 183.4 ms (26 samples). Recording increased stalls: median 150.1 ms, p95 399.9 ms, max 666.6 ms. The baseline is already slow in this environment, so these observations cannot isolate the reveal's cost. Smooth 60 FPS is not established; physical-device profiling remains necessary.

Artwork has baked-in English/German labels, dark painted panels, and abrupt/faded crop boundaries. Transparent surroundings work in either theme, but those painted panels remain dark on light backgrounds. The output's lower edge and input's connecting edge expose the supplied crop. Processing is deliberately heavily occluded by the stack; its support role is subtle. Mobile prioritizes recognizable motifs and navigation, with a much simpler spatial narrative. These are first-pass visual limitations for review, not masked by opaque backgrounds or heavy glow.

Other reveal implementations, production Home, target pages, navigation logic, and the shared plate geometry source are unchanged.
