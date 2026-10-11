# Milestone 4G.1 — Ask Igal identity reveal

The development-only `/spatial-home` prototype now gives the Ask Igal layer a dedicated typographic reveal: **Ask Igal → AI**. A small light source follows the selected layer’s left corner and draws a connection into the surrounding composition. The full name holds briefly, the remaining letters lift and fade, and A and I converge into an underlined mark. Two restrained expanding contours and localized question/response signals follow. These are visual dialogue cues, not generated answers.

`AskIgalReveal.vue` owns one reversible GSAP timeline. Hover and keyboard focus use the existing navigation selection state; interruptions reverse the current playhead instead of rebuilding the animation. Exit runs at 1.65× speed. Pause and reduced motion resolve to static endpoints. The decorative composition is hidden from assistive technology; the existing localized link names, descriptions, focus indicator, and live context remain available. The identity name stays English in EN/DE/RU. Ask Igal navigation now has no artificial delay, while touch retains first-tap preview and second-tap navigation.

The stack’s dimensions, position, and CSS are unchanged. Desktop typography occupies the left environment, tablet typography the space above, and mobile typography the existing space below the stack. A bounded 600 ms measurement loop keeps the signal attached during the existing layer transition; there is no continuous particle or reveal rendering loop. Other reveals, production pages, localization catalogs, and dependencies are unchanged.

## Verification

Chrome/Playwright checks passed for hover, exit, ten rapid reversals, keyboard arrows/Escape/Enter, localized labels and destinations, touch preview/outside dismissal/second-tap navigation, pause, reduced motion, unchanged stack bounds, and horizontal containment at 320, 390, 768, 844, 1024, 1280, 1440, and 1920 px widths. Both themes were visually inspected and recorded. Short landscape screens retain the prototype’s pre-existing vertical scrolling.

Vue type checking and whitespace checks passed. Production build passed; the updated isolation scanner found no prototype code in 99 production artifacts, and all eight localized/trailing-slash prototype URLs returned 404 from the production server.

Review artifacts:

- `/tmp/m4g1-review/ask-igal-identity.mp4`: dark and light reveal, hold, and complete reversal.
- `/tmp/m4g1-review/dark.png` and `light.png`: final desktop states.
- `/tmp/m4g1-review/name.png`: readable name before convergence.
- `/tmp/m4g1-review/verification.json`: interaction assertions and viewport bounds.
- `/tmp/m4g1-review/`: localized and responsive screenshots.
- `/tmp/igal-portfolio-browser/m4g1-check.mjs` and `m4g1-record.mjs`: runners using the existing browser installation.

No commits or pushes. Stop after this single-layer prototype for visual review.
