import * as T from 'three';
export const collisionMetrics = { enabled: false, collisionQueries: 0, collisionMs: 0, zeroQueries: 0, broadPhaseMs: 0, broadPhaseMeshes: 0, candidates: 0, maxCandidates: 0, dynamicCandidates: 0, raycasts: 0, meshRaycastDispatches: 0 };

export const collisionOwners = new Map<string, { queries: number; cpuMs: number; raycasts: number; meshDispatches: number }>();

/** Swept, sliding visitor disk against the actual world-space triangles at body height.
 * Moving wall carriages are sampled on every step; decorative rays never become barriers. */
export function createCollision(solids: T.Mesh[], owner = 'unlabeled') {
  const ray = new T.Raycaster(), direction = new T.Vector3();
  const radius = .32;
  const barriers = solids.filter(m => !m.userData.passage && !m.userData.noCollision && (m.material as T.Material).visible !== false);
  // Cache static expansion bounds; moving Living Wall meshes remain live raycast targets.
  solids[0]?.parent?.updateMatrixWorld(true);
  const staticBounds = new Map(barriers.filter(m => m.userData.room).map(m => [m, new T.Box3().setFromObject(m)]));
  // Static X/Z grid only narrows candidates; original bounds and triangle rays remain authoritative.
  const cellSize=16,grid=new Map<number,Map<number,T.Mesh[]>>(),dynamic=barriers.filter(mesh=>!staticBounds.has(mesh));
  for(const [mesh,bounds] of staticBounds){
    for(let x=Math.floor(bounds.min.x/cellSize);x<=Math.floor(bounds.max.x/cellSize);x++){
      let column=grid.get(x);if(!column){column=new Map();grid.set(x,column);}
      for(let z=Math.floor(bounds.min.z/cellSize);z<=Math.floor(bounds.max.z/cellSize);z++){
        let cell=column.get(z);if(!cell){cell=[];column.set(z,cell);}cell.push(mesh);
      }
    }
  }
  const selected=new Set<T.Mesh>();
  const dynamicBounds = new T.Box3(), safetySweep = new T.Box3();
  const sweep = new T.Box3(), end = new T.Vector3(), step = new T.Vector3(), origin = new T.Vector3(), low = new T.Vector3();
  const candidates: T.Mesh[] = [], safety: T.Mesh[] = [], hits: T.Intersection[] = [];
  function finishQuery(started:number,raysBefore:number,dispatchesBefore:number){
    const elapsed=performance.now()-started;
    collisionMetrics.collisionQueries++;collisionMetrics.collisionMs+=elapsed;
    let entry=collisionOwners.get(owner);
    if(!entry){entry={queries:0,cpuMs:0,raycasts:0,meshDispatches:0};collisionOwners.set(owner,entry);}
    entry.queries++;entry.cpuMs+=elapsed;entry.raycasts+=collisionMetrics.raycasts-raysBefore;
    entry.meshDispatches+=collisionMetrics.meshRaycastDispatches-dispatchesBefore;
  }
  return (position: T.Vector3, displacement: T.Vector3) => {
    const started = collisionMetrics.enabled ? performance.now() : 0;
    const raysBefore=collisionMetrics.raycasts,dispatchesBefore=collisionMetrics.meshRaycastDispatches;
    if(displacement.x===0&&displacement.z===0){
      position.y=1.65;
      if(collisionMetrics.enabled){collisionMetrics.zeroQueries++;finishQuery(started,raysBefore,dispatchesBefore);}
      return;
    }
    end.copy(position).add(displacement);
    sweep.min.copy(position).min(end);sweep.max.copy(position).max(end);sweep.min.addScalar(-radius);sweep.max.addScalar(radius);
    sweep.min.y=position.y-1.65;sweep.max.y=position.y+.33;
    candidates.length=0;safety.length=0;
    const broadStarted = collisionMetrics.enabled ? performance.now() : 0;
    safetySweep.copy(sweep);safetySweep.min.y=safetySweep.max.y=.5;
    let dynamicCandidates=0;
    selected.clear();
    const minX=Math.floor(sweep.min.x/cellSize),maxX=Math.floor(sweep.max.x/cellSize),minZ=Math.floor(sweep.min.z/cellSize),maxZ=Math.floor(sweep.max.z/cellSize);
    // Long guided sweeps must not scan a huge empty grid rectangle.
    if((maxX-minX+1)*(maxZ-minZ+1)>staticBounds.size){for(const mesh of staticBounds.keys())selected.add(mesh);}
    else for(let x=minX;x<=maxX;x++)for(let z=minZ;z<=maxZ;z++)for(const mesh of grid.get(x)?.get(z)??[])selected.add(mesh);
    for(const mesh of dynamic)selected.add(mesh);
    for(const mesh of selected){
      let bounds=staticBounds.get(mesh);
      // Unknown/moving rigid meshes use their CURRENT world transform, never a cached pose.
      // Deformed, instanced and custom-raycast meshes retain the conservative fallback.
      if(!bounds && mesh.raycast===T.Mesh.prototype.raycast && !(mesh instanceof T.SkinnedMesh) && !(mesh instanceof T.InstancedMesh) && !mesh.morphTargetInfluences){
        if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();
        if(mesh.geometry.boundingBox)bounds=dynamicBounds.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
      }
      if(!bounds||bounds.intersectsBox(sweep)||(mesh.userData.safetyBarrier&&bounds.intersectsBox(safetySweep))){
        candidates.push(mesh);if(!staticBounds.has(mesh))dynamicCandidates++;
        if(mesh.userData.safetyBarrier)safety.push(mesh);
      }
    }
    if(collisionMetrics.enabled){
      collisionMetrics.broadPhaseMs+=performance.now()-broadStarted;collisionMetrics.broadPhaseMeshes+=selected.size;
      collisionMetrics.candidates+=candidates.length;collisionMetrics.dynamicCandidates+=dynamicCandidates;
      collisionMetrics.maxCandidates=Math.max(collisionMetrics.maxCandidates,candidates.length);
    }
    const steps = Math.max(1, Math.ceil(displacement.length() / .16));
    step.copy(displacement).divideScalar(steps);
    for (let i = 0; i < steps; i++) {
      for (const axis of ['x', 'z'] as const) {
        const amount = step[axis]; if (!amount) continue;
        direction.set(0, 0, 0); direction[axis] = Math.sign(amount);
        let allowed = Math.abs(amount);
        for (const height of [.4, 1.15, 1.65]) {
          for (const offset of [-radius, 0, radius]) {
            origin.copy(position); origin.y = position.y - 1.65 + height; origin[axis === 'x' ? 'z' : 'x'] += offset;
            ray.set(origin, direction); ray.far = allowed + radius;
            if(collisionMetrics.enabled){collisionMetrics.raycasts++;collisionMetrics.meshRaycastDispatches+=candidates.length;}
            hits.length=0;
            const hit = ray.intersectObjects(candidates, false, hits)[0];
            // Perimeter protection remains continuous above unsupported cloud space.
            if(safety.length){if(collisionMetrics.enabled){collisionMetrics.raycasts++;collisionMetrics.meshRaycastDispatches+=safety.length;}low.copy(origin);low.y=.5;ray.set(low,direction);hits.length=0;const guard=ray.intersectObjects(safety,false,hits)[0];if(guard)allowed=Math.min(allowed,Math.max(0,guard.distance-radius));ray.set(origin,direction);}
            if (hit) allowed = Math.min(allowed, Math.max(0, hit.distance - radius));
          }
        }
        position[axis] += Math.sign(amount) * allowed;
      }
    }
    position.y = 1.65;
    if(collisionMetrics.enabled){finishQuery(started,raysBefore,dispatchesBefore);}
  };
}
