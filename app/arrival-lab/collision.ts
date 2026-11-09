import * as T from 'three';

/** Swept, sliding visitor disk against the actual world-space triangles at body height.
 * Moving wall carriages are sampled on every step; decorative rays never become barriers. */
export function createCollision(solids: T.Mesh[]) {
  const ray = new T.Raycaster(), direction = new T.Vector3();
  const radius = .32;
  const barriers = solids.filter(m => !m.userData.passage && !m.userData.noCollision && (m.material as T.Material).visible !== false);
  // Cache static expansion bounds; moving Living Wall meshes remain live raycast targets.
  solids[0]?.parent?.updateMatrixWorld(true);
  const staticBounds = new Map(barriers.filter(m => m.userData.room).map(m => [m, new T.Box3().setFromObject(m)]));
  const sweep = new T.Box3(), end = new T.Vector3();
  return (position: T.Vector3, displacement: T.Vector3) => {
    end.copy(position).add(displacement);
    sweep.setFromPoints([position,end]);sweep.min.addScalar(-radius);sweep.max.addScalar(radius);
    sweep.min.y=0;sweep.max.y=1.98;
    const candidates=barriers.filter(m=>!staticBounds.has(m)||staticBounds.get(m)!.intersectsBox(sweep));
    const steps = Math.max(1, Math.ceil(displacement.length() / .16));
    const step = displacement.clone().divideScalar(steps);
    for (let i = 0; i < steps; i++) {
      for (const axis of ['x', 'z'] as const) {
        const amount = step[axis]; if (!amount) continue;
        direction.set(0, 0, 0); direction[axis] = Math.sign(amount);
        let allowed = Math.abs(amount);
        for (const height of [.4, 1.15, 1.65]) {
          for (const offset of [-radius, 0, radius]) {
            const origin = position.clone(); origin.y = height; origin[axis === 'x' ? 'z' : 'x'] += offset;
            ray.set(origin, direction); ray.far = allowed + radius;
            const hit = ray.intersectObjects(candidates, false)[0];
            if (hit) allowed = Math.min(allowed, Math.max(0, hit.distance - radius));
          }
        }
        position[axis] += Math.sign(amount) * allowed;
      }
    }
    position.y = 1.65;
  };
}
