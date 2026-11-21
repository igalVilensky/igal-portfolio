import {capturePortalRenderState} from './portal-render-state';
import * as T from 'three';
import { createCollision } from './collision';
import { createThresholdView } from './threshold-view';

import { districtOffset } from './geography';
export { districtOffset } from './geography';
export const loopTopology = {
 district: 'loop-district', interior: 'loop-vault',
 bridge: { start: 80, end: 212, z: 48, width: 7 },
 departure: { room: 'journey', position: [-92,0,19] as const, yaw: Math.PI/2 },
 connections: ['homecoming', 'impossible-house', 'loop-stair'] as const,
} as const;
type Door = { id:string; root:T.Group; pivot:T.Group; progress:number; opened:boolean; environment:string };
/** A shared exterior, one concealed remote interior, and rigid reversible doorway maps. */
export function createLoopDistrict(scene:T.Scene, solids:T.Mesh[]) {
 const root=new T.Group();root.name='The Loop District';scene.add(root);
 const vault=new T.Group();vault.name='Impossible House · luminous vault';vault.visible=false;root.add(vault);
 const geometries=new Map<string,T.BufferGeometry>(), materials:T.MeshStandardMaterial[]=[], own:T.Mesh[]=[], indoor:T.Mesh[]=[];
 const mat=(color:string,metalness=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.72,metalness});materials.push(m);return m;};
 const plaster=mat('#f1e5d7'),stone=mat('#b9b8ac'),cliff=mat('#667985'),terra=mat('#be7057'),blue=mat('#285b9f'),aqua=mat('#4b9092'),metal=mat('#647980',.65),green=mat('#52765a'),warm=mat('#f7ca83');warm.emissive.set('#f7b35d');warm.emissiveIntensity=.25;
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m=plaster,solid=true,parent:T.Object3D=root){const key=[w,h,d].join();let g=geometries.get(key);if(!g){g=new T.BoxGeometry(w,h,d);geometries.set(key,g);}const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=solid&&h>2;o.receiveShadow=true;o.userData.room='loop-district';o.userData.noCollision=!solid;parent.add(o);solids.push(o);let ancestor:T.Object3D|null=parent;while(ancestor&&ancestor!==vault)ancestor=ancestor.parent;(ancestor===vault?indoor:own).push(o);return o;}
 // Repeated bridge bays span the expanded gap; the island keeps its local layout.
 const span=68+districtOffset, end=148+districtOffset;
 const bridgeDeck=box(62+districtOffset,.65,7,115+districtOffset/2,-.325,48,stone,false);bridgeDeck.name='loop-bridge-deck';
 box(32,.035,7,68,.02,48,stone,false);
 for(const z of [44.5,51.5]){
  box(span,.5,.3,80+span/2,.25,z,plaster).userData.safetyBarrier=true;
  box(span,.09,.12,80+span/2,1.3,z,metal).userData.safetyBarrier=true;
  for(let x=81;x<end;x+=4){box(.12,1.3,.12,x,.65,z,metal);box(.65,2,.7,x,-1,z,metal,false);}
 }
 for(let x=84;x<end;x+=8){box(.07,.025,6.6,x,.018,48,metal,false);for(const z of [44.5,51.5])box(.45,3,.6,x,-1.7,z,plaster,false);}
 const bridgeObjects=new Set(root.children);
 const island=new T.Group();island.name='Loop District · geographic transform';island.position.x=districtOffset;root.add(island);
 // Faceted floating land, with a crisp mineral cap and tapered keel.
 const land=new T.Mesh(new T.CylinderGeometry(34,16,20,7),cliff);geometries.set('land',land.geometry);land.position.set(178,-11,53);land.scale.z=.9;root.add(land);
 // The slab supplies sides and underside only. Its removed top is owned by one inlaid surface.
 const foundation=box(64,1,55,178,-.5,53,stone,false);foundation.name='loop-island-foundation';
 const foundationGeometry=foundation.geometry.clone();geometries.set('island-foundation-open-top',foundationGeometry);
 foundationGeometry.setIndex(Array.from(foundationGeometry.index!.array).filter((_,i)=>i<12||i>=18));foundationGeometry.clearGroups();foundation.geometry=foundationGeometry;
 const xs=new Set([146,210,155.5,192.5,172.5,175.5,173.5,188.5]);
 const zs=new Set([25.5,80.5,32.5,46.5,69.5]);
 for(let i=0;i<9;i++){xs.add(156+i*4.5-.05);xs.add(156+i*4.5+.05);}
 for(let i=0;i<8;i++){zs.add(33+i*2-.6);zs.add(33+i*2+.6);}
 const xGrid=[...xs].sort((a,b)=>a-b),zGrid=[...zs].sort((a,b)=>a-b),vertices:number[]=[],indices:number[][]=[[],[],[]];
 for(let xi=0;xi<xGrid.length-1;xi++)for(let zi=0;zi<zGrid.length-1;zi++){
  const x0=xGrid[xi]!,x1=xGrid[xi+1]!,z0=zGrid[zi]!,z1=zGrid[zi+1]!,x=(x0+x1)/2,z=(z0+z1)/2;
  const plaza=x>=155.5&&x<=192.5&&z>=46.5&&z<=69.5;
  const courtyard=x>=173.5&&x<=188.5&&z<=32.5;
  const lane=x>=172.5&&x<=175.5&&Array.from({length:8},(_,i)=>33+i*2).some(center=>Math.abs(z-center)<.6);
  const stripe=plaza&&Array.from({length:9},(_,i)=>156+i*4.5).some(center=>Math.abs(x-center)<.05);
  const materialIndex=courtyard||stripe?2:plaza||lane?1:0,base=vertices.length/3;
  vertices.push(x0,0,z0,x0,0,z1,x1,0,z1,x1,0,z0);indices[materialIndex]!.push(base,base+1,base+2,base,base+2,base+3);
 }
 const pavingGeometry=new T.BufferGeometry();pavingGeometry.setAttribute('position',new T.Float32BufferAttribute(vertices,3));pavingGeometry.setIndex(indices.flat());pavingGeometry.computeVertexNormals();
 let offset=0;indices.forEach((list,i)=>{pavingGeometry.addGroup(offset,list.length,i);offset+=list.length;});geometries.set('district-inlaid-floor',pavingGeometry);
 const paving=new T.Mesh(pavingGeometry,[plaster,stone,terra]);paving.name='loop-island-inlaid-floor';paving.receiveShadow=true;paving.userData={room:'loop-district',noCollision:true};root.add(paving);solids.push(paving);own.push(paving);
 for(const x of [146,210]){box(.45,1.15,55,x,.575,53,plaster);}
 // West edge leaves a seven-metre opening exactly where the bridge arrives.
 own.filter(o=>o.position.x===146&&o.position.y===.575).forEach(o=>{o.userData.noCollision=true;o.visible=false;});
 for(const [z,d] of [[35,19],[66,29]] as const)box(.45,1.15,d,146,.575,z);
 for(const z of [25.5,80.5])box(64,1.15,.45,178,.575,z);
 // Radial mineral paving and a slender open-loop sculpture mark the plaza.

 const ringG=new T.TorusGeometry(2,.16,8,48);geometries.set('ring',ringG);const ring=new T.Mesh(ringG,aqua);ring.position.set(177,3.1,59);root.add(ring);box(4.5,.5,2,177,.25,59,plaster);
 function house(x:number,z:number,w:number,d:number,h:number,accent:T.MeshStandardMaterial){
  // A real aperture in the front wall; the vestibule remains walkable behind the leaf.
  box((w-2.6)/2,h,.45,x-(w+2.6)/4,h/2,z,plaster);box((w-2.6)/2,h,.45,x+(w+2.6)/4,h/2,z,plaster);
  box(2.6,h-3.3,.45,x,(h+3.3)/2,z,plaster);
  for(const sx of [-1,1])box(.45,h,d,x+sx*w/2,h/2,z-d/2,plaster);
  box(w,h,.45,x,h/2,z-d,plaster);box(w+.8,.4,d+.8,x,h+.2,z-d/2,accent,false);
  for(const sx of [-1,1]){box(1.3,1.6,.1,x+sx*(w/2-1.3),h*.65,z+.25,accent,false);box(1.5,.12,.5,x+sx*(w/2-1.3),h*.65-.85,z+.4,stone,false);}
 }
 house(164,43,12,11,4,blue);house(185,40,10,10,7,terra);house(198,60,9,12,8,aqua);

 // Deep cornices, buttresses, a vaulted crown and roof garden give each house a silhouette.
 for(const x of [158,170])box(.65,4.4,1.1,x,2.2,42.6,stone);
 for(const z of [33,36,39])box(12.4,.14,.14,164,4.55,z,blue,false);
 const crownGeometry=new T.CylinderGeometry(4.7,4.7,10.5,24,1,false,0,Math.PI);crownGeometry.rotateZ(Math.PI/2);crownGeometry.rotateY(Math.PI/2);
 geometries.set('vault-crown',crownGeometry);const crown=new T.Mesh(crownGeometry,terra);crown.position.set(185,7.2,35);crown.scale.y=.45;root.add(crown);
 for(const x of [180.2,189.8])box(.3,7.2,.9,x,3.6,40.3,terra);
 box(6,.25,3,198,8.6,55,aqua,false);for(const x of [195.5,200.5])box(.2,2.5,.2,x,9.7,55,metal,false);
 for(let z=53.5;z<=57;z+=.6)box(6,.12,.15,198,11,z,terra,false);
 for(const [x,z] of [[153,53],[190,48],[204,69]] as const){box(.15,2.8,.15,x,1.4,z,metal);box(.6,.4,.6,x,2.9,z,warm,false);}
 // Courtyard and shaded lane between the blue house and the luminous house.
 for(let x=173;x<191;x+=3){box(.18,3.7,.18,x,1.85,26.7,metal);box(.16,.18,9,x,3.7,30,metal,false);}
 for(const [x,z] of [[151,69],[207,31],[175,29],[187,75]] as const){box(2.5,.65,2.5,x,.325,z,terra);const g=new T.IcosahedronGeometry(1.7,1);geometries.set(`tree-${x}`,g);const tree=new T.Mesh(g,green);tree.position.set(x,2,z);root.add(tree);}
 box(7,.18,1.1,191,.65,72,aqua);for(const x of [188.5,193.5])box(.3,.6,1,x,.3,72,stone);
 // The third house contains an actual shallow stair; its top doorway maps to another roof.
 for(let i=0;i<18;i++)box(3,.2, .5,198,.1+i*.2,58.5-i*.5,stone,false);
 for(const x of [196.3,199.7]){const rail=box(.16,1.1,11,x,2.6,53,metal);rail.rotation.x=-Math.atan(.4);}
 box(3,.2,2,198,3.5,49,stone,false);
 // Blue house roof terrace: a protected viewpoint with a return doorway at the north edge.
 box(11.5,.15,13.5,164,4.08,36,stone,false);
 box(12,1.2,.22,164,4.75,29.3,blue);
 for(const x of [158.2,169.8])box(.22,1.2,14,x,4.75,36,blue);
 box(12,1.2,.22,164,4.75,43,blue);
 for(const x of [160,168])box(3.8,1.2,.22,x,4.75,32,blue);
 // Oversized remote interior, hidden until entered; no duplicate render loop.
 box(34,.2,46,400,-.1,443,stone,false,vault);
 for(const x of [383,417])box(.5,23,46,x,11.5,443,plaster,true,vault);
 box(34,23,.5,400,11.5,466,plaster,true,vault);
 for(const x of [390.85,409.15])box(15.7,23,.5,x,11.5,420,plaster,true,vault);
 box(2.6,19.7,.5,400,13.15,420,plaster,true,vault);
 box(2.6,.2,2,400,-.1,419,stone,false,vault);
 for(const x of [386,414]){box(4,1,37,x,8,445,terra,false,vault);for(const z of [428,440,454])box(.6,18,.6,x,9,z,stone,true,vault);}
 for(let z=424;z<465;z+=6){box(34,.5,.45,400,22,z,plaster,false,vault);box(1,.12,32,400,22.4,443,warm,false,vault);}
 box(6,.5,6,400,.25,447,aqua,true,vault);
 const suspended=new T.Mesh(new T.TorusGeometry(4,.25,12,64),blue);geometries.set('suspended',suspended.geometry);suspended.position.set(400,13,447);suspended.rotation.x=.6;vault.add(suspended);
 const fill=new T.HemisphereLight('#d7edff','#a68b70',2.5);vault.add(fill);const light=new T.PointLight('#ffdfb0',150,45,2);light.position.set(400,18,444);vault.add(light);
 const doors:Door[]=[];
 function door(id:string,x:number,y:number,z:number,angle:number,environment:string,color:T.MeshStandardMaterial,parent:T.Group=root){
  const r=new T.Group();r.position.set(x,y,z);r.rotation.y=angle;parent.add(r);
  box(.18,3.3,.5,-1.25,1.65,0,color,true,r);box(.18,3.3,.5,1.25,1.65,0,color,true,r);box(2.7,.18,.5,0,3.3,0,color,true,r);
  const pivot=new T.Group();pivot.position.x=-1.13;r.add(pivot);const leaf=box(2.26,3.15,.15,1.13,1.575,0,color,true,pivot);delete leaf.userData.room;leaf.userData.loopDoor=id;
  const handle=box(.3,.07,.2,1.9,1.25,.16,warm,false,pivot);handle.userData.loopDoor=id;
  for(const side of [-1,1]){box(.06,2.6,.52,side*1.1,1.6,0,warm,false,r);const brace=box(.7,.16,.56,side*1.1,3.1,0,metal,false,r);brace.rotation.z=-side*.45;}
  for(let n=0;n<3;n++)box(1.95,.035,.17,1.13,.65+n*.85,0,warm,false,pivot);
  const doorway={id,root:r,pivot,progress:0,opened:false,environment};doors.push(doorway);return doorway;
 }
 const home=door('homecoming',164,0,43,0,'loop-district',blue);
 const departure=door('homecoming-return',...loopTopology.departure.position,loopTopology.departure.yaw,loopTopology.departure.room,blue);
 departure.root.name='Journey · island departure threshold';
 // A short mineral reveal nestles the opening against the front room's existing west bearing.
 for(const side of [-1,1])box(.2,3.6,2.2,side*1.5,1.8,-1,stone,true,departure.root);
 box(3.2,.2,2.2,0,3.5,-1,stone,false,departure.root);
 const impossible=door('impossible-house',185,0,40,0,'loop-district',terra);
 const inside=door('impossible-return',400,0,420,0,'loop-vault',terra,vault);
 const stair=door('loop-stair',198,3.6,49.5,0,'loop-district',aqua);
 const roof=door('loop-stair-return',164,4.15,32,Math.PI,'loop-district',aqua);
 const views=new Map(doors.map(d=>[d,createThresholdView(d.root,2.27,3.16)]));
 const pairs=[[home,departure],[impossible,inside],[stair,roof]] as const;
 // Remote vault and Homecoming destination stay in their original world spaces.
 for(const child of [...root.children])if(child!==island&&child!==vault&&!bridgeObjects.has(child)&&child!==departure.root)island.add(child);
 scene.updateMatrixWorld(true);
 own.forEach(o=>{if(o.position.y===.575)o.userData.safetyBarrier=true;});
 const indoorCollision=createCollision(indoor,'district-interior'), exteriorCollision=createCollision(own,'district-exterior');
 let active=false,previous=new T.Vector3(),initialized=false;
 const local=new T.Vector3(),before=new T.Vector3(),turn=new T.Matrix4().makeRotationY(Math.PI);
 function height(p:T.Vector3){if(active)return 0;const x=p.x-districtOffset;if(x>=196.1&&x<=199.9&&p.z>=48.3&&p.z<=59)return T.MathUtils.clamp((59-p.z)*.4,0,3.6);if(x>=158&&x<=170&&p.z>=29.3&&p.z<=43.3&&p.y>4)return 4.15;return 0;}
 const viewCamera=new T.PerspectiveCamera();
 const viewFrustum=new T.Frustum(),viewProjection=new T.Matrix4();
 function renderViews(renderer:T.WebGLRenderer,camera:T.PerspectiveCamera){
  camera.updateMatrixWorld();viewFrustum.setFromProjectionMatrix(viewProjection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  for(const pair of pairs)for(let i=0;i<2;i++){
   const source=pair[i]!,destination=pair[1-i]!,view=views.get(source)!;
   if(source.progress<=0||source.environment==='loop-vault'!==active||camera.position.distanceTo(source.root.getWorldPosition(new T.Vector3()))>20)continue;
   view.mesh.updateWorldMatrix(true,false);
   if(!viewFrustum.intersectsObject(view.mesh))continue;
   const mapping=new T.Matrix4().copy(destination.root.matrixWorld).multiply(turn).multiply(source.root.matrixWorld.clone().invert());
   viewCamera.copy(camera);viewCamera.position.applyMatrix4(mapping);viewCamera.quaternion.premultiply(new T.Quaternion().setFromRotationMatrix(mapping));viewCamera.updateProjectionMatrix();
   const height=Math.max(256,Math.round(640/camera.aspect));if(view.target.height!==height)view.target.setSize(640,height);
   const restore=capturePortalRenderState(renderer,scene,[vault,...Array.from(views.values(),v=>v.mesh)]);
   try{
    if(destination.environment==='loop-vault')scene.children.forEach(o=>o.visible=o===root);
    vault.visible=destination.environment==='loop-vault';views.forEach(v=>v.mesh.visible=false);
    renderer.clippingPlanes=[new T.Plane(new T.Vector3(0,0,1),-.01).applyMatrix4(destination.root.matrixWorld)];renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=false;
    renderer.setRenderTarget(view.target);renderer.render(scene,viewCamera);
   }finally{restore();}
  }
 }
 return {syncPosition(position:T.Vector3){previous.copy(position);initialized=true;},renderViews,root,vault,doors,pairs,get active(){return active;},get environment(){return active?'loop-vault':'loop-district';},
 contains(p:T.Vector3){return active||(p.x>79&&p.x<146+districtOffset&&p.z>=44.8&&p.z<=51.2)||(p.x>=146+districtOffset&&p.x<=210+districtOffset&&p.z>=25&&p.z<=81);},
 activate(id:string){const d=doors.find(d=>d.id===id);if(d)d.opened=true;},
 move(p:T.Vector3,delta:T.Vector3){const old=p.clone(),level=height(p);if(active)indoorCollision(p,delta);else exteriorCollision(p,delta);p.y=old.y;const next=height(p);p.y=(Math.abs(next-level)<.65?next:level)+1.65;},
 update(dt:number,reduced:boolean,camera:T.PerspectiveCamera){let changed=false;if(active&&camera.position.x<300){active=false;vault.visible=false;changed=true;}for(const d of doors){const next=Math.min(1,d.progress+(d.opened?(reduced?1:dt*1.7):0));if(next!==d.progress)changed=true;d.progress=next;d.pivot.rotation.y=-next*Math.PI*.55;}
 root.updateWorldMatrix(true,true);
 if(initialized)for(const pair of pairs)for(let i=0;i<2;i++){
  const source=pair[i]!,destination=pair[1-i]!;if(source.progress<.99||source.environment==='loop-vault'!==active)continue;
  local.copy(camera.position);source.root.worldToLocal(local);before.copy(previous);source.root.worldToLocal(before);
  if(before.z>-.02&&local.z<=-.02&&Math.abs(local.x)<.85&&local.y>1&&local.y<2.3){
   const mapping=new T.Matrix4().copy(destination.root.matrixWorld).multiply(turn).multiply(source.root.matrixWorld.clone().invert());camera.position.applyMatrix4(mapping);camera.position.y=destination.root.getWorldPosition(new T.Vector3()).y+1.65;camera.quaternion.premultiply(new T.Quaternion().setFromRotationMatrix(mapping));
   destination.opened=true;destination.progress=1;destination.pivot.rotation.y=-Math.PI*.55;active=destination.environment==='loop-vault';vault.visible=active;changed=true;
  }
 }
 previous.copy(camera.position);initialized=true;return changed;},
 setTheme(dark:boolean){plaster.color.set(dark?'#8290a2':'#f1e5d7');stone.color.set(dark?'#53697d':'#b9b8ac');cliff.color.set(dark?'#304254':'#667985');warm.emissiveIntensity=dark?.8:.25;},
 dispose(){views.forEach(v=>v.dispose());root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},
 };
}
