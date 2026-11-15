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

`character-assets.ts` clones skeletons with **independent inverse bind matrices**,
changes mesh and joint proportions together, rebinds skinning and fits each complete
model to its identity's metre height. Children have shorter relative legs and torsos,
narrower shoulders and relatively larger heads. Mesh vertex colours provide shirts,
trousers, shoes and skin; these are close-fitting garments, not separately tailored outfits.
Hair and beard are authored meshes from the same licensed pack. Facial structure remains
largely the base model's; this is approximate stylized identity, not a reconstructed face.
Three.js AnimationMixer blends locally authored idle, walk and greeting clips. Navigation,
turning, interaction identities and world visibility remain owned by `family.ts`.

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
