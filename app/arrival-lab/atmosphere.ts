import * as T from 'three';
import { atmosphereSpace } from './spaces';
import { matterVertexShader, matterFragmentShader } from './atmosphere-materials';
/** Finite procedural matter; shared scene, no postprocessing or independent clock. */
export function createAtmosphere(scene: T.Scene, solids: T.Mesh[]) {
    const root = new T.Group();
    root.name = 'living-atmosphere';
    scene.add(root);
    const geometries: T.BufferGeometry[] = [], materials: T.Material[] = [];
    const stone = new T.MeshStandardMaterial({ color: '#b8c7c3', roughness: .86 });
    const frame = new T.MeshStandardMaterial({ color: '#536d70', metalness: .25, roughness: .55 });
    const inlay = new T.MeshBasicMaterial({ color: '#dfbe82' });
    materials.push(stone, frame, inlay);
    function box(w: number, h: number, d: number, x: number, y: number, z: number, m: T.Material = stone) {
        const g = new T.BoxGeometry(w, h, d);
        geometries.push(g);
        const mesh = new T.Mesh(g, m);
        mesh.position.set(x, y, z);
        mesh.userData.room = 'atmosphere';
        root.add(mesh);
        solids.push(mesh);
        return mesh;
    }
    box(24, 1, 28, -10, -.5, 40);
    box(4, 1, 4, -24, -.5, 29);
    box(24, 12, .5, -10, 6, 26);
    box(24, 12, .5, -10, 6, 54);
    box(.5, 12, 28, 2, 6, 40);
    box(.5, 12, 1, -22, 6, 26.5);
    box(.5, 12, 23, -22, 6, 42.5);
    box(.5, 7, 4, -22, 8.5, 29);
    box(4, 5, .35, -24, 2.5, 27, frame);
    box(4, 5, .35, -24, 2.5, 31, frame);
    box(4, .4, 4, -24, 5.2, 29, frame);
    box(24, .5, 28, -10, 12, 40);
    for (let z = 27; z < 54; z += 4) {
        box(23, .35, .18, -10, 11.45, z, frame);
        box(.18, 10, .35, 1.6, 5, z, frame);
    }
    for (const z of [32, 42, 51]) {
        box(.12, 5, 4, 1.68, 4, z, frame);
        box(.05, .07, 3.7, 1.58, 6.6, z, inlay);
    }
    // Low observation ledge: clearly solid, outside the circulation path.
    box(1.5, .5, 18, .8, .25, 42, frame);
    for (const x of [-19, -10, -1])
        box(.035, .025, 23, x, .015, 40, inlay);
    const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : undefined;
    const ctx = canvas?.getContext('2d');
    let texture: T.CanvasTexture | undefined;
    if (canvas && ctx) {
        canvas.width = 768;
        canvas.height = 128;
        texture = new T.CanvasTexture(canvas);
        texture.colorSpace = T.SRGBColorSpace;
        const g = new T.PlaneGeometry(3, .5), m = new T.MeshBasicMaterial({ map: texture });
        geometries.push(g);
        materials.push(m);
        const plaque = new T.Mesh(g, m);
        plaque.position.set(-25.6, 3.5, 29);
        plaque.rotation.y = -Math.PI / 2;
        root.add(plaque);
    }
    function setLocale(locale: string) { if (!canvas || !ctx)
        return; ctx.fillStyle = '#344b50'; ctx.fillRect(0, 0, 768, 128); ctx.fillStyle = '#e9dec4'; ctx.font = '34px sans-serif'; ctx.fillText(atmosphereSpace.names[locale as 'en'] || atmosphereSpace.names.en, 24, 78); texture!.needsUpdate = true; }
    setLocale('en');
    const light = new T.PointLight('#bce9dd', 110, 33, 1.3);
    light.position.set(-11, 7, 39);
    root.add(light);
    const warm = new T.PointLight('#ffda9b', 65, 22, 1.3);
    warm.position.set(-5, 5, 48);
    root.add(warm);
    const mobile = matchMedia('(pointer: coarse)').matches;
    const sphere = new T.SphereGeometry(1, mobile ? 16 : 24, mobile ? 12 : 18);
    geometries.push(sphere);
    const homes = [[-13, 3.3, 37], [-6, 4.7, 45], [-17, 5.4, 48]];
    const forms = homes.map((home, i) => {
        const group = new T.Group();
        group.position.fromArray(home);
        root.add(group);
        const lobes: {
            mesh: T.Mesh;
            home: T.Vector3;
        }[] = [];
        const mat = new T.ShaderMaterial({ vertexShader: matterVertexShader, fragmentShader: matterFragmentShader, uniforms: { time: { value: 0 }, energy: { value: 0 }, dark: { value: 0 }, membrane: { value: i === 1 ? 1 : 0 }, tint: { value: new T.Color(i === 1 ? '#e6bc86' : i === 2 ? '#a4c9cb' : '#63cbb8') } }, transparent: true, depthWrite: false, side: T.DoubleSide });
        materials.push(mat);
        const count = i === 0 ? (mobile ? 13 : 21) : i === 1 ? 3 : 7;
        for (let j = 0; j < count; j++) {
            const mesh = new T.Mesh(sphere, mat);
            const angle = j * 2.39996;
            const r = i === 0 ? Math.sqrt(j / count) * 2.3 : .7;
            mesh.position.set(Math.cos(angle) * r, Math.sin(j * 1.7) * .65, Math.sin(angle) * r * .7);
            mesh.scale.set(i === 1 ? 2.7 : 1.1 + (j % 3) * .2, i === 1 ? .5 : .75 + (j % 4) * .12, i === 1 ? 1.5 : 1.05);
            lobes.push({ mesh, home: mesh.position.clone() });
            mesh.rotation.set(j * .21, angle, j * .13);
            mesh.userData.atmosphere = i;
            mesh.userData.noCollision = true;
            group.add(mesh);
            solids.push(mesh);
        }
        return { group, mat, lobes, home: new T.Vector3().fromArray(home), energy: 0, delay: 0 };
    });
    const count = mobile ? 96 : 200, positions = new Float32Array(count * 3), base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const f = forms[i % 3]!;
        const a = i * 2.39996, r = 1.5 + (i % 19) / 19 * 3.7;
        base[i * 3] = f.home.x + Math.cos(a) * r;
        base[i * 3 + 1] = f.home.y + Math.sin(i * 1.37) * 2;
        base[i * 3 + 2] = f.home.z + Math.sin(a) * r;
    }
    const pg = new T.BufferGeometry();
    pg.setAttribute('position', new T.BufferAttribute(positions, 3));
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++)
        seeds[i] = (i % 17) / 17;
    pg.setAttribute('seed', new T.BufferAttribute(seeds, 1));
    geometries.push(pg);
    const pm = new T.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { tint: { value: new T.Color('#9bd4c0') } }, vertexShader: `attribute float seed;varying float strength;void main(){strength=.55+seed*.45;vec4 p=modelViewMatrix*vec4(position,1.);gl_PointSize=min(8.,(28.+seed*20.)/max(1.,-p.z));gl_Position=projectionMatrix*p;}`, fragmentShader: `uniform vec3 tint;varying float strength;void main(){float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;gl_FragColor=vec4(tint,(1.-d*d)*.65*strength);}` });
    materials.push(pm);
    root.add(new T.Points(pg, pm));
    const offset = new T.Vector3();
    let clock = 0;
    return {
        setLocale,
        activate(index: number) { forms.forEach((f, i) => { if (i === index) {
            f.energy = 1;
            f.delay = 0;
        }
        else
            f.delay = .35 + Math.abs(i - index) * .28; }); },
        update(_now: number, delta: number, reduced: boolean, player: T.Vector3) {
            const dt = Math.min(.05, Math.max(0, delta));
            if (!reduced)
                clock += dt;
            for (let i = 0; i < forms.length; i++) {
                const f = forms[i]!;
                if (f.delay > 0) {
                    f.delay -= dt;
                    if (f.delay <= 0)
                        f.energy = Math.max(f.energy, .48);
                }
                f.energy *= Math.exp(-(reduced ? 7 : 1.25) * dt);
                offset.subVectors(f.home, player);
                offset.y = 0;
                const distance = offset.length();
                const near = T.MathUtils.smoothstep(6 - distance, 0, 4);
                if (distance > .001)
                    offset.multiplyScalar(near * 1.3 / distance);
                else
                    offset.set(0, 0, 0);
                const damping = 1 - Math.exp(-4 * dt);
                f.group.position.x = T.MathUtils.lerp(f.group.position.x, f.home.x + offset.x + f.energy * .9, damping);
                f.group.position.z = T.MathUtils.lerp(f.group.position.z, f.home.z + offset.z + f.energy * .7, damping);
                f.group.position.y = f.home.y + (reduced ? 0 : Math.sin(clock * (.24 + i * .07) + i) * .22) + f.energy * .3;
                for (let j = 0; j < f.lobes.length; j++) {
                    const l = f.lobes[j]!;
                    l.mesh.position.copy(l.home).multiplyScalar(1 + f.energy * .85);
                    l.mesh.position.y += Math.sin(j * 2.3) * f.energy * .7;
                }
                f.group.scale.setScalar(1 + f.energy * .35 + near * .09);
                f.mat.uniforms.time!.value = clock * (.8 + i * .17);
                f.mat.uniforms.energy!.value = f.energy + near * .3;
            }
            for (let i = 0; i < count; i++) {
                const k = i * 3, f = forms[i % 3]!, a = i * 2.39996, e = f.energy;
                positions[k] = base[k]! + Math.cos(a) * e * 2 + (reduced ? 0 : Math.sin(clock * .21 + i) * .22);
                positions[k + 1] = base[k + 1]! + e * Math.sin(i) * 1.5;
                positions[k + 2] = base[k + 2]! + Math.sin(a) * e * 2;
                const dx = positions[k]! - player.x, dz = positions[k + 2]! - player.z, d = Math.hypot(dx, dz);
                if (d < 2.8 && d > .001) {
                    const push = (1 - d / 2.8) * 1.1;
                    positions[k]! += dx / d * push;
                    positions[k + 2]! += dz / d * push;
                }
            }
            pg.attributes.position!.needsUpdate = true;
            return player.x > -29 && player.z > 24;
        },
        setTheme(dark: boolean) { stone.color.set(dark ? '#344b50' : '#b8c7c3'); frame.color.set(dark ? '#647c7c' : '#536d70'); light.intensity = dark ? 90 : 140; forms.forEach(f => { f.mat.uniforms.dark!.value = dark ? 1 : 0; }); },
        dispose() { texture?.dispose(); root.removeFromParent(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); },
    };
}
