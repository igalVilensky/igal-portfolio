import * as T from 'three';

export const jumpSettings={speed:5.6,gravity:15.5,eye:1.65};
/** Vertical body state shares the existing horizontal collision and surface resolution. */
export function createJump(solids:T.Mesh[]){
 let velocity=0,offset=0,grounded=true,requested=false;
 const ray=new T.Raycaster(),down=new T.Vector3(0,-1,0),up=new T.Vector3(0,1,0),origin=new T.Vector3();
 const bodies=solids.filter(m=>!m.userData.noCollision&&!m.userData.passage);
 const bounds=new Map(bodies.filter(m=>m.userData.room).map(m=>[m,new T.Box3().setFromObject(m)]));
 const candidates:T.Mesh[]=[],normal=new T.Vector3();
 const lastSafe=new T.Vector3();let initialized=false;
 return {
  get airborne(){return !grounded;},get offset(){return offset;},
  request(){if(grounded)requested=true;},
  reset(){velocity=offset=0;grounded=true;requested=false;},
  update(dt:number,p:T.Vector3,floorEye:number,enabled:boolean){
   if(!initialized){lastSafe.copy(p);initialized=true;}
   if(!enabled){requested=false;return;}
   candidates.length=0;
   for(const mesh of bodies){const box=bounds.get(mesh);if(!box||(p.x>=box.min.x&&p.x<=box.max.x&&p.z>=box.min.z&&p.z<=box.max.z))candidates.push(mesh);}
   // Re-sample support even while standing on a newly reached low solid.
   origin.set(p.x,p.y-jumpSettings.eye+.12,p.z);ray.set(origin,down);ray.far=.3;
   let support=floorEye;
   for(const hit of ray.intersectObjects(candidates,false)){if(!hit.object.visible||hit.object.userData.noCollision||hit.object.userData.passage)continue;if(hit.face&&normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld).y>.65){support=Math.max(support,hit.point.y+jumpSettings.eye);break;}}
   if(grounded){if(p.y>support+.32){grounded=false;velocity=0;}else p.y=support;}
   if(requested&&grounded){velocity=jumpSettings.speed;grounded=false;}requested=false;
   if(grounded){offset=Math.max(0,p.y-floorEye);lastSafe.copy(p);return;}
   const previous=p.y;let next=previous+velocity*dt-.5*jumpSettings.gravity*dt*dt;velocity-=jumpSettings.gravity*dt;
   let landing=support;
   // Solid furniture/low architecture can be landed on; overhead roofs are not snapped onto.
   origin.set(p.x,previous-jumpSettings.eye+.12,p.z);ray.set(origin,down);ray.far=Math.max(.2,previous-next+.16);
   for(const hit of ray.intersectObjects(candidates,false)){if(!hit.object.visible||hit.object.userData.noCollision||hit.object.userData.passage)continue;if(hit.face&&normal.copy(hit.face.normal).transformDirection(hit.object.matrixWorld).y>.65){landing=Math.max(landing,hit.point.y+jumpSettings.eye);break;}}
   if(velocity>0){origin.set(p.x,previous+.33,p.z);ray.set(origin,up);ray.far=Math.max(.2,next-previous+.2);const hit=ray.intersectObjects(candidates,false)[0];if(hit){next=Math.min(next,previous+Math.max(0,hit.distance-.04));velocity=0;}}
   if(velocity<=0&&next<=landing){p.y=landing;velocity=0;grounded=true;lastSafe.copy(p);}else p.y=next;
   offset=Math.max(0,p.y-floorEye);
   if(p.y<floorEye-8){p.copy(lastSafe);this.reset();}
  },
 };
}
