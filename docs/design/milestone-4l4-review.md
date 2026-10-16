# Milestone 4L.4 visual review

Implemented only in the development-only `/spatial-home` prototype. No geometry, production homepage, assistant page, navigation behavior, or other layer reveals changed. No dependencies, generated artwork, commits, or pushes.

## Composition and motion

Code sits upper left (29vw, capped at 450px); Systems sits higher at upper right (26vw, capped at 410px). Experience is smaller and lower left (25vw, capped at 390px). Answer is the largest element at lower right (32vw, capped at 500px). All sit behind the stack, with understated curved connections converging on the selected plate's projected center. The plate remains in front, with its original centered rotation and a small additional glow on A and I. There is no duplicate heading.

A single reversible GSAP timeline expands artwork outward from offsets toward the core, starting at scale .88 and opacity 0. Sources start at .18, .28 and .38 seconds; Answer starts at .78 seconds. Each takes .75 seconds. Exit reverses at 1.8× speed, and interruptions reuse the same playhead. Reduced motion and the pause control settle immediately. Mobile shows only Experience and Answer, below and behind the stack. Images are decorative, empty-alt, and pointer-transparent. A static radial mask softens the supplied images' rectangular haze boundaries.

## Assets and isolation

All four original PNGs were verified before editing. Each is 768 × 512 RGBA:

- Code: 710,625 bytes
- Systems: 700,393 bytes
- Experience: 767,297 bytes
- Answer: 775,611 bytes

Total: 2,953,926 bytes (2.82 MiB). Files were moved unchanged from `public/` into `app/spatial-home/assets/` and imported only by the prototype. Public assets would otherwise be copied to production regardless of route availability. The isolation script now also rejects these asset names and the new reveal selectors. Both prototype artifact checks pass; all eight localized spatial-home production URLs return 404.

## Verification

- Production build: passed.
- Locale consistency: passed.
- `git diff --check`: passed.
- Application type check: existing errors remain in app.vue, lab components, SpatialEnvironment.vue, and other existing files; no errors in the changed reveal files.
- Server type check: passed.
- Public localization check: existing 48 untranslated strings in design-lab and geometry diagnostics; no new visible text was added.
- Desktop 1440 × 900 and mobile 390 × 844: dark and light screenshots captured with settled keyboard focus.
- Widths 320, 390, 768, 1024, 1440 and 1920: no horizontal overflow.
- Focus, Escape, hover exit, rapid interruption, reduced motion and two-tap touch navigation exercised. Ask navigation checked in English, German and Russian. All five links retain their targets and activate on focus.
- No browser runtime exceptions observed.

## Review artifacts

Saved outside the source tree in `/tmp/m4l4-review/`:

- `desktop-dark.png`, `desktop-light.png`
- `mobile-dark.png`, `mobile-light.png`
- `interaction.mp4` (reveal, settled composition, exit)
- `verification.json`, `captures.json`, `hover.json`
- `performance-unrecorded.json`, `performance.json`

## Limitations

The original artwork includes dark semitransparent haze. The static mask softens its edges, but light mode still has noticeable dark halos. No dark backing cards or replacement assets were introduced. Some original embedded graphic text is English and remains part of the supplied artwork.

Headless Chrome without recording measured a 16.7ms median frame interval and 83.3ms p95 (64 samples, 11 intervals over 50ms). Recording added further overhead. Animation uses only transforms and opacity for artwork and connections, with no continuous decorative loops. These measurements do not establish smooth performance on physical devices; hardware browser review remains advisable. The original assets remain approximately 2.82 MiB combined, and mobile hides rather than downloads fewer assets.

Stopped for visual review.
