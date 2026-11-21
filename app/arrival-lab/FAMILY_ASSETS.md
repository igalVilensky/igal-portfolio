# Arrival family assets

The runtime uses Quaternius Universal Base Characters **Standard**, downloaded from
https://quaternius.itch.io/universal-base-characters via the creator's official page:
https://quaternius.com/packs/universalbasecharacters.html.
The archive's CC0 notice is preserved in `public/arrival-lab/characters/LICENSE.txt`.
The free pack includes rigged superhero male/female bodies and the selected hairstyles.
No purchased Source assets or private photo textures are part of the character assets.

To reproduce the compact asset selection, pass the official archive to
`python scripts/prepare-family-characters.py /path/to/archive.zip`.
The script keeps geometry, rigs, UVs and the small iris texture, removes large normal
and skin maps, and preserves the original license. The selected assets total about 2.1 MB.

`character-assets.ts` keeps the licensed skeletal models for Igal, Anastasia and
Amelia, with independent inverse bind matrices, calibrated heights, blended gait
and additive upper-body gestures. Their likeness remains approximate and stylized.

Nataniel and Adriel now use `child-character.ts`: purpose-built rounded faces,
small eyes and noses, soft sweaters, child-length limbs, and separately authored
hair caps/fringes. They do not use deformed adult faces or superhero anatomy.
Adriel has a larger relative head, shorter limbs and a wider toddler stance;
Nataniel has longer school-age proportions, a striped sweater and tousled hair.
The models keep the approved identity heights. Their walk, run, wave and small
conversation gestures use the existing family update loop. Feet are grounded
using reused bounds; face details and hair are batched within the moving head.
Children are available immediately, while adult assets continue loading.

Navigation, interaction identities, social routines and world visibility remain
owned by `family.ts`. Adults retain cached seated poses. The children continue to
avoid adult-height seats; no new child seating locations have been introduced.

Family routines use the existing circulation graph plus four home gathering nodes.
The siblings periodically meet for a short shared running circuit, then return to
independent exploration. Conversations interrupt play and hold navigation safely.
Adults can face nearby family during short pauses. There is no separate AI loop.

`winter-home.ts` adds Hanukkah and Christmas dressing to the existing home.
The hanukkiah has eight equal candles and a raised central shamash. Tree lights and
overhead bulbs are instanced, with slow shader-based twinkling. The tree uses
clustered boughs, a continuous spiral garland and a restrained ornament palette.
Other small decorations are merged by material. Reduced motion freezes twinkling.
Only the tree base/trunk and console join collision. Snow stays on exterior roofs.
The home owns seasonal resource disposal; no extra shadow lights or particle loops
are introduced. Seasonal dressing is always present, rather than date-controlled.

## Public portraits

The five explicitly approved portraits (Igal, Anastasia, Amelia, Nataniel and Adriel)
are optimized progressive JPEGs under `public/arrival-lab/family/`. These public assets
ship with Nuxt builds and Netlify static generation. Original reference photographs
remain excluded from Git under `docs/design/design-references/family/`.

The framed photographs use TextureLoader → sRGB texture → fitted MeshBasicMaterial
planes in development and production. Frames and nameplates are unchanged. Images
are orientation-corrected, retain their full aspect ratio and are limited to 960 pixels
on the longest edge (JPEG quality 85, metadata removed). Amelia's supplied image
includes social-media chrome, which is preserved. A loading failure displays an error
inside the frame and reports the identity and asset URL in the browser console.
