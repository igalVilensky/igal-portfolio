import * as T from 'three';
export const flightSettings={speed:14,boost:24,vertical:6,response:4,brake:6,ceiling:180,minX:-235,maxX:1020,minZ:-800,maxZ:330,eye:1.65,radius:.38};
export const flightStation=new T.Vector3(-8,1.65,91);
export type FlightPhase='docked'|'dropped'|'equipped'|'taking-off'|'flying'|'hovering'|'descending'|'landing';
export type FlightInput={x:number;z:number;vertical:number;boost:boolean};
export function flightAllowed(s:{skyfall:boolean;passenger:boolean;guided:boolean;otherWorld:boolean;ui:boolean;water:boolean}){return !Object.values(s).some(Boolean);}
/** Movement ownership audit (Arrival 11.12): camera.ts owns orientation/input only;
 * ArrivalChamber's translation chain owns walking/swimming/journey/other worlds.
 * SkyTube/coaster update passengers later; sculpture.update owns scripted Skyfall.
 * Equipped flight blocks interaction entry to those owners; airborne flight skips
 * ground movement, jump, transport constraints and portal crossing. Origin receives
 * preserveHeight. UI/visibility reset intent and momentum; no second animation loop.
 * Landing deliberately returns walking only on validated, controller-supported ground.
 */
/** Only this controller translates while airborne. Ground equipment deliberately survives touchdown. */
export function createFlight(move:(p:T.Vector3,d:T.Vector3)=>void,support:(p:T.Vector3)=>number|undefined){
 let phase:FlightPhase='docked',launch=0,unsafe=false;const devicePosition=flightStation.clone().add(new T.Vector3(0,0,-1.2)),current=flightStation.clone(),velocity=new T.Vector3(),lastSafe=flightStation.clone(),before=new T.Vector3(),target=new T.Vector3(),delta=new T.Vector3();
 const airborne=()=>phase!=='docked'&&phase!=='dropped'&&phase!=='equipped';
 return {
 get phase(){return phase;},get equipped(){return phase!=='docked'&&phase!=='dropped';},get devicePosition(){return devicePosition;},get airborne(){return airborne();},get speed(){return velocity.length();},get unsafe(){return unsafe;},
 equip(p:T.Vector3,allowed:boolean){if(!allowed||(phase!=='docked'&&phase!=='dropped')||p.distanceTo(devicePosition)>3)return false;phase='equipped';current.copy(p);lastSafe.copy(p);return true;},
 unequip(p:T.Vector3=current,allowed=true){const floor=support(p);if(!allowed||phase!=='equipped'||floor===undefined||!Number.isFinite(p.y)||Math.abs(p.y-floor)>.15)return false;devicePosition.copy(p);devicePosition.y=floor;phase='dropped';velocity.setScalar(0);unsafe=false;return true;},
 ground(p:T.Vector3){current.copy(p);if(phase!=='equipped')return;const floor=support(p);if(floor!==undefined&&Math.abs(p.y-floor)<.15)lastSafe.copy(p);},
 takeoff(){if(phase!=='equipped')return false;phase='taking-off';launch=.65;return true;},
 pause(){velocity.setScalar(0);},
 recover(p:T.Vector3){p.copy(lastSafe);velocity.setScalar(0);phase='equipped';unsafe=false;},
 update(dt:number,p:T.Vector3,input:FlightInput,enabled:boolean){
 current.copy(p);if(!airborne())return;
 if(![p.x,p.y,p.z].every(Number.isFinite)||p.y<.5||p.y>flightSettings.ceiling+5||p.x<flightSettings.minX-5||p.x>flightSettings.maxX+5||p.z<flightSettings.minZ-5||p.z>flightSettings.maxZ+5){this.recover(p);return;}
 if(!enabled){this.pause();return;}dt=Math.min(.05,Math.max(0,dt));
 launch=Math.max(0,launch-dt);const vertical=launch>0?1:input.vertical;
 target.set(input.x,0,input.z).clampLength(0,1).multiplyScalar(input.boost?flightSettings.boost:flightSettings.speed);target.y=vertical*flightSettings.vertical;
 velocity.lerp(target,1-Math.exp(-(target.lengthSq()?flightSettings.response:flightSettings.brake)*dt));
 const floor=support(p);unsafe=vertical<0&&floor===undefined;
 if(floor!==undefined&&velocity.y<0&&p.y-floor<3)velocity.y=Math.max(velocity.y,-Math.max(.65,(p.y-floor)*2));
 before.copy(p);delta.copy(velocity).multiplyScalar(dt);move(p,delta);
 p.x=T.MathUtils.clamp(p.x,flightSettings.minX,flightSettings.maxX);p.z=T.MathUtils.clamp(p.z,flightSettings.minZ,flightSettings.maxZ);p.y=T.MathUtils.clamp(p.y,1.65,flightSettings.ceiling);
 for(const axis of ['x','y','z'] as const)if(Math.abs(p[axis]-before[axis]-delta[axis])>.001)velocity[axis]=0;
 const landing=support(p);
 if(vertical<=0&&landing!==undefined&&p.y>=landing-.12&&p.y<=landing+.09&&Math.hypot(velocity.x,velocity.z)<2){p.y=landing;velocity.setScalar(0);phase='equipped';lastSafe.copy(p);return;}
 if(launch>0)phase='taking-off';else if(vertical<0)phase=landing!==undefined&&p.y-landing<3?'landing':'descending';else phase=velocity.length()<.2?'hovering':'flying';
 },
 };
}
/** Conservative swept body AABBs: three independent axes provide sliding, substeps prevent tunnelling.
 * Static geometry bounds are cached, transforms are checked for moving doors/vehicles. */
export function createFlightCollision(meshes:T.Mesh[],ground:(x:number,z:number)=>number|undefined){
 const records=meshes.filter(m=>!m.userData.passage&&(!m.userData.noCollision||m.geometry.type==='BoxGeometry')).map(mesh=>({mesh,box:new T.Box3(),matrix:new T.Matrix4().makeScale(0,0,0)}));
 const corridors:T.Box3[]=[];let nearby:T.Box3[]|undefined;const sweep=new T.Box3(),endpoint=new T.Vector3();
 const body=new T.Box3(),step=new T.Vector3(),start=new T.Vector3();
 function refresh(){for(const r of records){if(!r.matrix.equals(r.mesh.matrixWorld)){if(!r.mesh.geometry.boundingBox)r.mesh.geometry.computeBoundingBox();r.box.copy(r.mesh.geometry.boundingBox!).applyMatrix4(r.mesh.matrixWorld);r.matrix.copy(r.mesh.matrixWorld);}}}
 function clear(p:T.Vector3){body.min.set(p.x-.38,p.y-1.6,p.z-.38);body.max.set(p.x+.38,p.y+.28,p.z+.38);return !(nearby||[...corridors,...records.filter(r=>r.mesh.visible).map(r=>r.box)]).some(b=>b.intersectsBox(body));}
 return {
 addRoute(route:T.Curve<T.Vector3>,radius:number){const points=route.getSpacedPoints(Math.ceil(route.getLength()/2));for(let i=1;i<points.length;i++)corridors.push(new T.Box3().setFromPoints([points[i-1]!,points[i]!]).expandByScalar(radius));},
 move(p:T.Vector3,d:T.Vector3){refresh();endpoint.copy(p).add(d);sweep.setFromPoints([p,endpoint]);sweep.min.add(new T.Vector3(-.4,-1.65,-.4));sweep.max.add(new T.Vector3(.4,.3,.4));nearby=[...corridors.filter(b=>b.intersectsBox(sweep)),...records.filter(r=>r.mesh.visible&&r.box.intersectsBox(sweep)).map(r=>r.box)];const n=Math.max(1,Math.ceil(d.length()/.15));step.copy(d).divideScalar(n);for(let i=0;i<n;i++)for(const axis of ['x','z','y'] as const){start.copy(p);p[axis]+=step[axis];if(!clear(p))p[axis]=start[axis];}nearby=undefined;},
 support(p:T.Vector3){refresh();let floor:number|undefined;for(const [dx,dz] of [[0,0],[-.65,-.65],[-.65,.65],[.65,-.65],[.65,.65]]){const h=ground(p.x+dx!,p.z+dz!);if(h===undefined||floor!==undefined&&Math.abs(h-floor)>.12)return;floor=h;}if(floor===undefined)return;start.set(p.x,floor+1.65+.04,p.z);if(!clear(start))return;return floor+1.65;},
 };
}
