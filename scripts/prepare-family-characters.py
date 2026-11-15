"""Prepare licensed Quaternius assets; usage: python scripts/prepare-family-characters.py archive.zip.

Download the Standard archive from https://quaternius.itch.io/universal-base-characters.
No private photographs are read. No network calls or third-party services are used.
"""
import json
from pathlib import Path
import sys
import zipfile

archive = zipfile.ZipFile(sys.argv[1])
output = Path(__file__).resolve().parents[1] / 'public/arrival-lab/characters'
license_path = next(name for name in archive.namelist() if name.endswith('/License_Standard.txt'))
license_bytes = archive.read(license_path)
if b'CC0 1.0 Universal' not in license_bytes:
    raise SystemExit('Expected official CC0 Standard archive; inspect license before proceeding.')
output.mkdir(parents=True, exist_ok=True)
output.joinpath('LICENSE.txt').write_bytes(license_bytes)

def prepare(suffix, target, eyes=False):
    name = next(name for name in archive.namelist() if name.endswith(suffix))
    prefix = name.rsplit('/', 1)[0] + '/'
    model = json.loads(archive.read(name))
    for material in model.get('materials', []):
        material.pop('normalTexture', None)
        if eyes:
            pbr = material['pbrMetallicRoughness']
            pbr.pop('metallicRoughnessTexture', None)
            pbr['roughnessFactor'] = .85
            if material['name'] != 'MI_Eyes':
                pbr.pop('baseColorTexture', None)
        else:
            material['pbrMetallicRoughness'] = {'baseColorFactor': [1, 1, 1, 1], 'metallicFactor': 0, 'roughnessFactor': .85}
            material.pop('alphaMode', None)
    if eyes:
        eye = next(image for image in model['images'] if 'Eye_Brown' in image['uri'])
        output.joinpath(eye['uri']).write_bytes(archive.read(prefix + eye['uri']))
        model['images'] = [eye]
        model['textures'] = [{'source': 0}]
        next(m for m in model['materials'] if m['name'] == 'MI_Eyes')['pbrMetallicRoughness']['baseColorTexture'] = {'index': 0}
    else:
        for key in ['images', 'textures', 'samplers']:
            model.pop(key, None)
    for buffer in model['buffers']:
        output.joinpath(buffer['uri']).write_bytes(archive.read(prefix + buffer['uri']))
    output.joinpath(target + '.gltf').write_text(json.dumps(model, separators=(',', ':')))

for sex in ['Male', 'Female']:
    prepare(f'Godot - UE/Superhero_{sex}_FullBody.gltf', f'base-{sex.lower()}', eyes=True)
for hair in ['Hair_Beard', 'Hair_Buns', 'Hair_Buzzed', 'Hair_Long', 'Hair_SimpleParted']:
    prepare('Origin at 0/glTF (Godot)/' + hair + '.gltf', hair)
