# Milestone 6B.1a — Light mode and Spatial consistency

Appearance-only refinement of `/spatial-experiments`. Awaiting visual review. No commit, push, tool changes or new dependencies.

## Reference inspection and diagnosis

Before editing materials, the actual generated Home, Work and Experiments pages were captured in Dark and Light at 1440×900, using their native theme buttons. Computed styles were recorded in `/tmp/m6b1a-light-review/references.json`; the diagnosis was written to `diagnosis.md` in that directory before implementation. The screenshot references are `before-spatial-{home,work,experiments}-{dark,light}.png`.

The mismatch was a combination of palette, shading and surroundings:

- Home and Work use pale cool blue surfaces, blue extrusion edges, slate ink and small cyan/blue accents. Experiments instead had a dominant champagne/bronze frame (`#c5b693` / `#8c7956`), dark teal inner faces, green-grey neutral parts and dark label plates even in Light mode.
- There is no environment map. Fairly metallic surfaces, lower roughness and a warm high-intensity key produced dark interiors beside narrow bright specular streaks. Globally increasing exposure would not fix this uneven luminance or the unrelated palette.
- Home's background uses `--color-canvas` with a translucent `#dceaf7` halo. Work uses a closely related cool canvas/halo. Experiments used a separate greenish neutral `#f3f5f5` / `#e1e9ee` combination, plus different border, muted-text and monospace values.
- The renderer already used sRGB output, default NoToneMapping and exposure 1. This was not an incorrect color-space conversion. There were no floor/contact shadows to remove; adding a floor would have worked against the suspended composition.

## Concrete existing references

`app/spatial-home/SpatialHome.vue`: `--sp-top: #f8fcff`, `--sp-bottom: #d9e6f3`, `--sp-edge: #b7cce0`, `--sp-line: #7896b4`, `--sp-cyan: #087e98`; radial halo `#dceaf780` over `--color-canvas`.

`app/spatial-work/topology.css`: module front `#e5eef6`, technology front `#cfdfec`, technology top `#edf5fb`, technology side `#a4bccf`, ink `#203b50`, muted text `#516b7e`. Home/Work use explicit darker extrusions rather than glossy metal highlights to express thickness.

`app/assets/css/main.css`: Light canvas `#f6f8fb` and the existing `--font-mono` stack. No Home, Work or shared stylesheet was changed.

## Material and lighting implementation

`appearance.ts` centralizes complete reversible Light/Dark presets. Geometry constructors consume those presets; they no longer scatter theme-dependent hex values. Light rings use the existing Work blue faces and Home/Work extrusion colors. Recessed mounts and bearings use the existing slate-blue line color rather than near-black cavities. Existing label plates are recolored pale blue with slate ink and restrained cyan symbols/strips; their shapes, lettering layout and physical dimensions are unchanged.

Light structural metalness is approximately .05–.24 and roughness .58–.76. The neutral cool key is balanced with a blue-grey hemisphere ground and a weak frontal fill. This softens the specular response and reveals front/back geometry without an environment map, real-time shadows or postprocessing. sRGB output, NoToneMapping and exposure 1 are explicitly retained. Dark material colors, roughness/metalness, original lights and background remain unchanged; the extra fill is disabled in Dark.

Theme changes update existing material uniforms and repaint the same three existing CanvasTextures. They create no new scene, renderer, materials or textures, and preserve selection and angular state. An applied-theme guard avoids redundant texture uploads when unrelated root classes change. Existing disposal owns these same resources. The labels remain generated in code, not artwork assets.

The Light page uses Home's exact canvas/halo logic. Controls use Work ink/muted values, Home cyan, blue edge borders and the shared monospace stack. Dark controls keep their registry accent colors and previous contrast. Focus remains explicit; selected state also has the raised cap, pressed button, minus sign, name and dismissal action.

## Composition and preservation

Desktop camera projection zoom increases from 1 to 1.08. Camera position, FOV, view direction, mesh proportions and layout bounds are unchanged. Mobile retains zoom 1. This is a modest 8% displayed-size increase rather than a geometry scale change.

`regression-integrity.json` records byte-for-byte preservation of the motion controller and the component's entire interaction/frame-loop section, identical geometry-constructor expressions, and unchanged Home/Work reference source files. Drag axes, inertia, damping, hover/lift amounts, selection phases, entrance, float and reduced-motion behavior are untouched.

A conservative 2.8-unit world-space sphere encloses the model in every ring orientation, including shared float, entrance offset and selected caps. Projecting that sphere with the actual camera and 1.08 zoom verifies clearance from canvas edges, navigation and controls at 1366×768, 1440×900 and 1920×1080. The full Light rotation recording supplies an additional visual check. Conservative navigation clearance is approximately 14px, 23px and 57px at the three requested sizes; actual mesh clearance is larger than this enclosing-sphere bound.

## Changed files

- `app/spatial-experiments/appearance.ts` — palette sources, material/light presets and desktop projection zoom.
- `app/spatial-experiments/KineticCore.client.vue` — consume presets, update existing label textures/materials/lights, apply projection zoom.
- `app/spatial-experiments/lab.css` — Light canvas, text, borders, accents and shared monospace.
- This document. Prior staged milestone work is preserved.

## Verification and review artifacts

All temporary scripts, diagnostics, screenshots, recordings and logs live in `/tmp/m6b1a-light-review/`, outside Git. `browser-results.json` includes repeated theme switching while idle/selected/coasting, identity and GPU resource checks, actual raycast manipulation of all three axes, hover, click/alignment/lift, full-turn Light manipulation, hard reload, keyboard access, reduced motion, viewport clearance and runtime errors. The GPU counters are injected only by the review script, not production code. After warm-up and 12 additional theme changes, counts remained exactly one context, eight textures, 281 buffers and three programs. The suite observed zero uncaught exceptions; console warnings were existing Nuxt debug timer duplicates, with no material/WebGL errors. A separate 390px touch check verifies physical selection/lift and theme switching without horizontal overflow or selection reset.

`npm run generate` passes. The app-specific `vue-tsc --noEmit -p .nuxt/tsconfig.app.json` check still reports the existing 25 errors in unchanged application/server code; none belong to the new preset or scene. Staged and unstaged `git diff --check` pass. Nominal Light text contrast is 10.95:1 for primary controls, 5.26:1 for muted controls and 9.92:1 for plate label text; cyan is used for secondary symbols and interaction accents, while names remain slate.

Review images: Home/Work references in both themes; final Experiments Dark/Light at all three desktop sizes; `light-selected.png`. Recordings: `theme-switching.mp4` and `full-rotation-light.mp4`. Native theme controls are used. Browser caching is disabled for final review so it cannot reuse older generated HTML.

## Remaining limits

Appearance is a stylized match to the existing illustrated Spatial surfaces, not photorealistic metal. There are intentionally no contact shadows, environment maps or postprocessing. Dark retains its approved small warm frame. Desktop projection enlargement has been bounded analytically and browser-reviewed; mobile enlargement was deliberately avoided. Headless Chrome uses software WebGL, so physical-device GPU/display review remains useful. Final visual approval belongs to the user.
