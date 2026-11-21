import * as T from 'three';
export const carryCopy={en:{pick:'Pick up figurine',place:'Place figurine',blocked:'Aim at a clear surface · Esc to return'},de:{pick:'Figur aufnehmen',place:'Figur abstellen',blocked:'Auf freie Fläche zielen · Esc zum Zurücklegen'},ru:{pick:'Взять фигурку',place:'Поставить фигурку',blocked:'Наведите на свободную поверхность · Esc — вернуть'}};
/** Selected props only. Placement is an on-demand bounded footprint/support query. */
export function createCarryables(solids:T.Mesh[]){
 const objects=new Set<T.Object3D>();let held:T.Object3D|undefined;const original=new T.Matrix4(),originalScale=new T.Vector3(),world=new T.Vector3(),bounds=new T.Box3(),candidate=new T.Vector3();let valid=false,queryIn=0;let lastCamera:T.Camera|undefined;
 const ray=new T.Raycaster(),down=new T.Raycaster(),up=new T.Vector3(0,1,0),normal=new T.Vector3(),half=new T.Vector3();
 function cancel(){if(held){held.matrix.copy(original);held.matrix.decompose(held.position,held.quaternion,held.scale);held=undefined;}valid=false;}
 const meshBox=new T.Box3(),cameraPoint=new T.Vector3();
 function meshBounds(mesh:T.Mesh){if(!mesh.geometry.boundingBox)mesh.geometry.computeBoundingBox();return meshBox.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);}
 function surfaces(){return solids.filter(m=>m.visible&&!m.userData.npc&&!m.userData.noCollision&&meshBounds(m).distanceToPoint(cameraPoint)<5);}
 return {get held(){return held;},get valid(){return valid;},
  register(object:T.Object3D){objects.add(object);},unregister(object:T.Object3D){if(held===object)cancel();objects.delete(object);},
  pick(view:T.Raycaster){const hit=view.intersectObjects([...objects].filter(object=>{for(let node:T.Object3D|null=object;node;node=node.parent)if(!node.visible)return false;return true;}),true)[0];if(!hit||hit.distance>3)return;let object:T.Object3D=hit.object;while(object.parent&&!objects.has(object))object=object.parent;return objects.has(object)?{object,distance:hit.distance}:undefined;},
  pickup(object:T.Object3D){if(held||!objects.has(object))return false;object.updateMatrix();original.copy(object.matrix);originalScale.copy(object.scale);held=object;queryIn=0;return true;},
  update(camera:T.Camera,allowed=true,dt=.1){if(!held)return false;if(!allowed){cancel();return true;}
   lastCamera=camera;camera.updateWorldMatrix(true,false);camera.getWorldPosition(cameraPoint);camera.localToWorld(world.set(.40,-.43,-1.05));held.parent?.worldToLocal(world);held.position.copy(world);held.quaternion.identity();held.scale.copy(originalScale);held.updateWorldMatrix(true,true);
   bounds.setFromObject(held);held.scale.copy(originalScale).multiplyScalar(.25);held.updateWorldMatrix(true,true);half.copy(bounds.max).sub(bounds.min).multiplyScalar(.5);
   queryIn-=dt;if(queryIn>0)return true;queryIn=.1;
   ray.setFromCamera(new T.Vector2(0,0),camera);ray.far=3;
   const targets=surfaces(),hit=ray.intersectObjects(targets.filter(m=>ray.ray.intersectsBox(meshBounds(m))),false)[0];valid=false;if(!hit?.face)return true;
   normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld);if(normal.dot(up)<.95)return true;
   candidate.copy(hit.point);const support=hit.point.y;
   // Full footprint must have level support. No unsupported ledges or water planes.
   for(const x of [-half.x,half.x])for(const z of [-half.z,half.z]){down.set(new T.Vector3(candidate.x+x,support+.04,candidate.z+z),new T.Vector3(0,-1,0));down.far=.08;const h=down.intersectObjects(targets.filter(m=>down.ray.intersectsBox(meshBounds(m))),false)[0];if(!h||Math.abs(h.point.y-support)>.015)return true;}
   const placed=bounds.clone().translate(new T.Vector3(candidate.x-(bounds.min.x+bounds.max.x)/2,support+.005-bounds.min.y,candidate.z-(bounds.min.z+bounds.max.z)/2));
   for(const mesh of targets){if(mesh===hit.object)continue;if(meshBounds(mesh).intersectsBox(placed))return true;}
   candidate.y=support+.005;valid=true;return true;
  },
  place(){if(held&&lastCamera){queryIn=0;this.update(lastCamera,true,.1);}if(!held||!valid)return false;held.scale.copy(originalScale);held.updateWorldMatrix(true,true);held.getWorldPosition(world);bounds.setFromObject(held);world.x+=candidate.x-(bounds.min.x+bounds.max.x)/2;world.z+=candidate.z-(bounds.min.z+bounds.max.z)/2;world.y+=candidate.y-bounds.min.y;held.parent?.worldToLocal(world);held.position.copy(world);held=undefined;valid=false;return true;},cancel,
  dispose(){cancel();objects.clear();lastCamera=undefined;}
 };
}
