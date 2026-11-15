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

## Local portraits

Run `npm run dev -- --host 127.0.0.1` and open `/arrival-lab` locally. No environment
variable or URL flag is needed. The five allowlisted originals remain under
`docs/design/design-references/family/`, excluded from Git. The development endpoint
reads them on demand with `Cache-Control: no-store`. Direct non-loopback clients are
rejected. Nuxt's Unix-socket proxy is accepted only for local Host names and an entirely
loopback forwarded chain. Keep the development server bound to loopback.

The framed photographs reuse Arrival Hall's TextureLoader → sRGB texture → fitted
MeshBasicMaterial plane pattern with physical depth between wall, frame, mat and print.
A ceramic nameplate labels each frame. Images retain their entire native aspect ratio;
Amelia's supplied image includes social-media chrome, which is intentionally preserved.

Production excludes the client fetch at compile time. The server endpoint returns 404
before any file read in production. Originals are never statically imported or copied to
public assets. Production portrait publication requires a separate explicit decision and
approved assets; the current production mounts have no private photograph.

Review screenshots contain private photos and belong only in `/tmp/arrival-0911-family-rebuild/`.
Do not commit or upload those artifacts.
