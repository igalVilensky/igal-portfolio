import * as T from 'three';
import { createWall } from './wall-geometry';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** One unit is one metre. All architecture is composed around the traversable center axis. */
export const dimensions = { eye: 1.65, halfWidth: 24, arrivalFront: 24, thresholdZ: -70, doorWidth: 5.6, doorHeight: 8.8, secondaryEnd: -106 } as const;
export const spawn = new T.Vector3(5, dimensions.eye, 17);
export const destination = new T.Vector3(0, dimensions.eye, -88);
export type Architecture = ReturnType<typeof buildEnvironment>;

export function buildEnvironment(scene: T.Scene) {
  const geometries = new Set<T.BufferGeometry>();
  const materials = new Set<T.Material>();
  const solids: T.Mesh[] = [];
  const own = <M extends T.Material>(m: M): M => { materials.add(m); return m; };
  const stone = own(new T.MeshStandardMaterial({ color: '#e0d9c9', roughness: .83, metalness: .025 }));
  const pale = own(new T.MeshStandardMaterial({ color: '#eee9dc', roughness: .7, metalness: .04 }));
  const floor = own(new T.MeshStandardMaterial({ color: '#d2ccbd', roughness: .72, metalness: .07 }));
  const reveal = own(new T.MeshStandardMaterial({ color: '#999e9e', roughness: .68, metalness: .12 }));
  const satin = own(new T.MeshStandardMaterial({ color: '#c6c5bd', roughness: .46, metalness: .28 }));
  for (const m of [stone, pale, floor, satin]) {
    m.onBeforeCompile = shader => {
      shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 arrivalPosition;').replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\narrivalPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying vec3 arrivalPosition;').replace('#include <color_fragment>', `#include <color_fragment>
        float grain = fract(sin(dot(floor(arrivalPosition * 160.0), vec3(12.9898,78.233,39.425))) * 43758.5453);
        diffuseColor.rgb *= 0.985 + grain * 0.025;
        diffuseColor.rgb *= mix(0.88, 1.0, smoothstep(0.0, 2.0, arrivalPosition.y));`);
    };
  }
  const joint = own(new T.MeshStandardMaterial({ color: '#9d9e98', roughness: .9 }));
  const daylight = own(new T.MeshBasicMaterial({ color: '#f2f4f1' }));
  const thresholdLight = own(new T.MeshStandardMaterial({ color: '#f3e1b6', emissive: '#edce93', emissiveIntensity: .6, roughness: .6 }));
  function add(g: T.BufferGeometry, m: T.Material, position = new T.Vector3(), parent: T.Object3D = scene) {
    geometries.add(g);
    const mesh = new T.Mesh(g, m); mesh.position.copy(position); mesh.castShadow = true; mesh.receiveShadow = true;
    parent.add(mesh); solids.push(mesh); return mesh;
  }
  function box(w: number, h: number, d: number, x: number, y: number, z: number, m: T.Material = stone, parent: T.Object3D = scene) {
    return add(Math.min(w,h,d) > .3 ? new RoundedBoxGeometry(w,h,d,2,Math.min(.055,w*.05,h*.05,d*.05)) : new T.BoxGeometry(w, h, d), m, new T.Vector3(x, y, z), parent);
  }
  function extrude(points: number[][], depth: number, z: number, m: T.Material = stone) {
    const shape = new T.Shape(points.map(p => new T.Vector2(p[0]!, p[1]!)));
    return add(new T.ExtrudeGeometry(shape, { depth, bevelEnabled: false, steps: 1 }), m, new T.Vector3(0, 0, z));
  }

  // Continuous barrel shell with a centred crown: structure bears directly on the walls.
  // Square slab edges meet the annex floor without a bevel gap.
  add(new T.BoxGeometry(51, 1.2, 132), floor, new T.Vector3(0, -.6, -42));
  // West opening z=16..22 replaces the wall, with an intact bearing lintel.
  box(2,25,88,-25,12.5,-28,stone);
  box(2,25,2,-25,12.5,23,stone);
  box(2,18,6,-25,16,19,stone);
  // Little Explorer: east opening z=16..22, with the original bearing wall above.
  box(2,25,88,25,12.5,-28,pale);
  box(2,25,2,25,12.5,23,pale);
  box(2,19,6,25,15.5,19,pale);
  const vault = (z: number, depth: number, material: T.Material, rib = false) => {
    const points: number[][] = [];
    const center = 0, rx = 24, ry = 19;
    for (let i = 0; i <= 48; i++) {
      const t = Math.PI * i / 48;
      points.push([center + rx * Math.cos(t), 24 + (ry - (rib ? 1.6 : 0)) * Math.sin(t) - (rib ? .15 : 0)]);
    }
    for (let i = 48; i >= 0; i--) {
      const t = Math.PI * i / 48;
      points.push([center + (rx + (rib ? 1.8 : 1.1)) * Math.cos(t), 24 + (ry + (rib ? 1.8 : 1.1)) * Math.sin(t)]);
    }
    return extrude(points, depth, z, material);
  };
  vault(-72, 96, pale);
  // Three broad unequal diaphragms read as structural spans, rather than arcades.
  for (const [z, depth] of [[5, 3.2], [-27, 4.8], [-59, 2.4]]) {
    vault(z!, depth!, stone, true);
    box(3, 24, depth!, -24.5, 12, z! + depth! / 2, stone);
    box(3, 24, depth!, 24.5, 12, z! + depth! / 2, stone);
  }
  // Folded gallery mass anchored to the left enclosure; the opposite side stays open.
  extrude([[-24,8],[-17,11],[-17,13],[-24,16]], 67, -53, pale);
  box(2, 8, 67, -23, 4, -19.5, stone);
  // Main entrance x=7..17 avoids the Atmosphere annex at x=-22..2, z=26..54.
  box(32.5,24,1.5,-9.25,12,24,stone);
  box(8.5,24,1.5,21.25,12,24,stone);
  box(10,12,1.5,12,18,24,stone);
  const frontCrown:number[][]=[[-24,24],[24,24]];
  for(let i=0;i<=48;i++){const t=Math.PI*i/48;frontCrown.push([24*Math.cos(t),24+19*Math.sin(t)]);}
  extrude(frontCrown,1.5,23.25,stone);
  // A single tall reveal is the orientation landmark, visible from the whole chamber.
  box(.22, 32, 1, 23.85, 16, -47, daylight);
  box(1.3, 33, 2.2, 24, 16.5, -49, satin);
  box(1, .12, 88, 0, 42.9, -24, daylight);
  // The living surface occupies an asymmetric recessed bay in the end enclosure.
  // Human-scale impossible threshold: true opening x=-13.08..-10.92.
  box(11.42,44,3,-18.79,22,-71,pale);
  box(3.42,44,3,-9.21,22,-71,pale);
  box(2.16,41,3,-12,23.5,-71,pale);
  // Sun Door: matching 2.16 m clear cut-out x=10.92..13.08 through the full
  // 3 m enclosure depth. Keep both piers and the bearing lintel collidable.
  box(3.42,44,3,9.21,22,-71,stone);
  box(11.42,44,3,18.79,22,-71,stone);
  box(2.16,41,3,12,23.5,-71,stone);
  box(15,34,3,0,27,-71,pale);
  const wall=createWall(scene);solids.push(...wall.solids);
  // Seams fan toward the mechanism instead of repeating a column rhythm.
  for(const x of [-18,-10,0,10,18]) {
    const seam=box(.025,.015,92,x,.012,-23,joint);seam.rotation.y=x*.003;
  }
  box(48,.03,.04,0,.02,9,joint);
  const doors:T.Mesh[]=[], cues:T.Mesh[]=[];

  // Secondary space: a narrower, much taller light well, joined by the threshold.
  box(2, 46, 36, -11, 23, -90, stone); // Lateral passage into Works; the original Arrival shell stays intact.
  // The metal passage cheeks replace these lower wall ends, rather than overlap
  // their z=-92/-96 faces. Preserve the original four-metre clear opening.
  box(2,8,19.2,11,4,-81.6,stone);box(2,8,11.2,11,4,-102.4,stone);
  box(2,38,36,11,27,-90,stone);
  box(24, 46, 2, 0, 23, -107, pale);
  box(24, 2, 36, 0, 47, -90, pale);
  // Long vertical fins frame a recessed luminous wall, rather than a freestanding object.
  for (const x of [-7, -3.5, 3.5, 7]) box(.7, 40, 2, x, 20, -104.6, satin);
  box(3, 36, .12, 0, 26, -105.85, daylight).castShadow = false;
  box(18, .38, 2.8, 0, .19, -103.2, pale);
  box(19.9, .12, 20, 0, 45.9, -91, daylight).castShadow = false;

  return {
    solids, doors, cues, thresholdLight, wall,
    setTheme(dark: boolean) {
      const palette = dark ? ['#303944','#434b57','#252e38','#202936','#505866','#131b26','#99cfed'] : ['#e0d9c9','#eee9dc','#d2ccbd','#999e9e','#c6c5bd','#9d9e98','#f2f4f1'];
      [stone,pale,floor,reveal,satin,joint,daylight].forEach((m,i) => m.color.set(palette[i]!));
      wall.setTheme(dark);
    },
    dispose() { wall.dispose(); for (const g of geometries) g.dispose(); for (const m of materials) m.dispose(); },
  };
}
