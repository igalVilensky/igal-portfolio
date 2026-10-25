# Spatial About — two perspectives

Prototype route: `/spatial-about`, with `/de/spatial-about` and `/ru/spatial-about` locale variants.

Two interlocking tetrahedral frames rotate in opposite directions around a restrained luminous core. Six visible desktop targets connect to structural nodes. Mobile uses a six-section rail. Drag rotates the whole with damped settling; hover/focus slows motion and emphasizes the linked structure. Selection stabilizes orientation, pauses counter-rotation, articulates the frames and extends a reading surface. Escape, close, outside click and another selection transition back or between sections. Reduced motion disables autonomous motion and inertia.

Files added / changed in this prototype:
- `app/pages/spatial-about.vue`: isolated spatial shell, section controls, projected connector lines, content reveal, locale and theme integration.
- `app/spatial-about/SelfSculpture.client.vue`: Three.js tetrahedral frames, core, structural nodes, raycasting, drag/inertia, alignment, reduced motion and resource cleanup.
- `app/spatial-about/self.css`: dark/light styling and responsive composition.
- `app/spatial-about/copy.ts`: concise English, German and Russian About content.
- `artifacts/spatial-about/`: screenshots, recording and verification notes.

The standard About page and existing spatial routes were not edited. No commit, push or deployment.

Verification:
- Production `npm run build` passed.
- Browser verification passed with no runtime exceptions: six selections, theme toggle, Escape, mobile overflow, German route and reduced-motion selection.
- Additional checks passed for visible zone hover, keyboard Enter activation, selection pausing counter-rotation, close resuming rotation, direct structural-node raycasting and outside-click reassembly.
- `interaction.mp4` shows idle motion, hover, drag and settling, selection, section switching and reassembly. Software-rendered browser capture has a lower frame rate than a hardware GPU.

Known limitations / recommended next refinements:
- Transparent face ordering and metallic lighting should be reviewed on real mobile GPUs; touch feel is verified by emulation, not physical devices.
- All sections align to a shared calm orientation; a unique composition for each section could strengthen the personal/professional mapping.
- The frame articulation is intentionally restrained. More precise node-to-panel choreography could make the reading surface feel more physically attached.
- Very short viewports may need vertical scrolling. Mobile uses the lower section rail instead of the desktop spatial labels.
- WebGL failure leaves accessible section controls and a text fallback; copy and translations remain prototype drafts.
