import * as T from 'three';

/** Shared-centre orbital toy. Only the stationary plinth participates in body collision. */
export function createOrbitalSculpture(scene: T.Scene, solids: T.Mesh[]) {
  const root = new T.Group(); root.name = 'orbital-toy'; root.position.set(-49, 0, 0); scene.add(root);
  const geometries: T.BufferGeometry[] = [], materials: T.Material[] = [];
  function material(color: string, metalness = .45, glow = 0) {
    const m = new T.MeshStandardMaterial({ color, metalness, roughness: .32, emissive: color, emissiveIntensity: glow });
    materials.push(m); return m;
  }
  const bronze = material('#725b36'), ivory = material('#fff0c5', .5, .12), gold = material('#e9b94f', .65, .14), blue = material('#8ac5c7', .45, .16);
  function mesh(g: T.BufferGeometry, m: T.Material, parent: T.Object3D = root) {
    geometries.push(g); const object = new T.Mesh(g, m); parent.add(object); return object;
  }
  const plinth = mesh(new T.CylinderGeometry(2.3, 2.5, .42, 64), bronze); plinth.position.y = .21;
  plinth.userData.sculpture = true; solids.push(plinth);
  const stem = mesh(new T.CylinderGeometry(.16, .26, 1.2, 24), bronze); stem.position.y = 1;
  const orbit = new T.Group(); orbit.position.y = 4.65; root.add(orbit);
  const rings = [3.05, 2.46, 1.87, 1.28].map((radius, i) => {
    const pivot = new T.Group(); orbit.add(pivot);
    const ring = mesh(new T.TorusGeometry(radius, .065 + i * .008, 12, 96), [gold, ivory, blue, gold][i]!, pivot);
    ring.userData.sculpture = true; ring.userData.noCollision = true; solids.push(ring);
    // One restrained bead makes the motion legible even along a ring's edge.
    const bead = mesh(new T.SphereGeometry(.13, 16, 12), ivory, pivot); bead.position.x = radius;
    return pivot;
  });
  const core = mesh(new T.IcosahedronGeometry(.42, 1), ivory, orbit); core.userData.sculpture = true; core.userData.noCollision = true; solids.push(core);
  const light = new T.PointLight('#ffe2a1', 28, 14, 1.5); light.position.set(0, 7.5, 2); root.add(light);
  let phase = 0, boostedUntil = -Infinity, lastReducedBoost = NaN;
  return {
    activate(now: number) { boostedUntil = now + 6500; },
    update(now: number, dt: number, reduced: boolean) {
      if (reduced && lastReducedBoost === boostedUntil) return false;
      if (reduced) { lastReducedBoost = boostedUntil; phase = Number.isFinite(boostedUntil) ? phase + .35 : .6; }
      else {
        const remaining = T.MathUtils.clamp((boostedUntil - now) / 6500, 0, 1);
        phase += Math.min(dt, .05) * (.22 + 1.25 * Math.sin(Math.PI * remaining));
      }
      rings.forEach((ring, i) => ring.rotation.set(.4 + i * .52 + phase * [1, -.63, .47, -.82][i]!, i * .67 + phase * [.28, .48, -.34, .6][i]!, i * .32));
      root.updateMatrixWorld(true);
      return true;
    },
    dispose() { root.removeFromParent(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); },
  };
}
