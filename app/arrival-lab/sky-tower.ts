import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {createChildCharacter} from './child-character';
import {towerSite,towerLevels,towerEntrance,towerContains,towerFloor,towerWalkingHeight,towerDetailVisible,createTowerLift,towerCopy,towerLanguage} from './sky-tower-model';

/** One scene, one update loop. Architecture stays visible; only small furnishings are culled. */
export function createSkyTower(scene:T.Scene,allSolids:T.Mesh[]){
 const root=new T.Group();root.name='The Sky Tower';root.position.set(towerSite.x,0,towerSite.z);scene.add(root);
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>(),textures:T.Texture[]=[],owned:T.Mesh[]=[],targets:T.Mesh[]=[];
 const cache=new Map<string,T.BoxGeometry>(),obstacles:{x:number;y:number;z:number;w:number;h:number;d:number;mesh:T.Mesh}[]=[];
 const details=towerLevels.map(()=>new T.Group());details.forEach((g,i)=>{g.name='Tower furnishings '+i;root.add(g);});
 const mat=(color:string,metalness=0,emissive=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.68,metalness,emissive:color,emissiveIntensity:emissive});ms.add(m);return m;};
 const stone=mat('#d4dbd8'),dark=mat('#29454f',.6),bronze=mat('#aa7950',.65),wood=mat('#72513e'),cloth=mat('#397b80'),leaf=mat('#44745a'),warm=mat('#ffd497',.15,.5),water=mat('#397d8d',.4,.15);
 const glass=mat('#b1dce1',.12);glass.transparent=true;glass.opacity=.12;glass.depthWrite=false;glass.side=T.DoubleSide;glass.forceSinglePass=true;
 const snow=mat('#f1f7fc');snow.transparent=true;snow.opacity=0;
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=stone,parent:T.Object3D=root,solid=false,action?:string)=>{
  const key=[w,h,d].join();let g=cache.get(key);if(!g){g=new T.BoxGeometry(w,h,d);cache.set(key,g);gs.add(g);}const o=new T.Mesh(g,m);o.position.set(x,y,z);o.receiveShadow=true;parent.add(o);
  o.userData.room='sky-tower';o.userData.noCollision=!solid;
  // Floors, facade and targets participate in climate/flight/picking; furnishings stay bounded locally.
  if(parent===root||solid||action){owned.push(o);allSolids.push(o);}
  if(solid)obstacles.push({x,y,z,w,h,d,mesh:o});
  if(action){o.userData.tower=action;targets.push(o);}return o;
 };
 const shape=(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,parent:T.Object3D=root)=>{gs.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);parent.add(o);return o;};
 const labels:{canvas:HTMLCanvasElement;texture:T.CanvasTexture;key:string;index:number}[]=[];
 function sign(key:string,index:number,x:number,y:number,z:number,w=4,rot=0){if(typeof document==='undefined')return;const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);const m=new T.MeshBasicMaterial({map:texture,side:T.DoubleSide});ms.add(m);const o=shape(new T.PlaneGeometry(w,w/4),m,x,y,z);o.rotation.y=rot;labels.push({canvas,texture,key,index});}
 // Supported plaza, tall open entrance and a cantilevered portico facing the island.
 box(28,.18,40,0,-.09,3,stone);
 for(let z=24;z<=52;z+=4)box(3,.035,2.5,5,.017,z,stone);box(16,.5,7,3,7.8,18,dark);
 for(const x of [-5,11])box(.55,8,.55,x,4,18,bronze,root,true);
 for(const x of [2,8]){box(.12,8,3,x,4,17.5,glass,root,true).name='Sky Tower · entrance door held open';box(.08,1.4,.08,x,3,18.5,bronze);}
 sign('name',0,3,6.4,21.55,10);sign('stairs',0,-10,2.7,15.6,5);
 for(let i=0;i<18;i++){
  const y=i*96/18;
  box(28,.3,.5,0,y, -16,dark);box(28,.3,.5,0,y,16,dark);
  for(const x of [-14,14])box(.5,.3,32,x,y,0,dark);
  // Selected warm windows, varied deliberately; no reflection render targets.
  if(i%3!==0)for(const x of [-1,5,11])box(2.5,.12,.12,x,y+2.3,-15.7,i%2?warm:bronze);
 }
 for(const x of [-14,14])for(const z of [-16,-5,5,16])box(.65,96,.75,x,48,z,stone,root,true);
 for(const x of [-6,2,10])for(const z of [-16,16])box(.3,96,.45,x,48,z,bronze,root,true);
 // Genuine glazing spans between columns, with an open ground entrance at x=2..8.
 for(let i=0;i<6;i++){
  const y=towerLevels[i]!;
  box(28,15.5,.12,0,y+8,-16,glass,root,true);
  for(const x of [-14,14])box(.12,15.5,32,x,y+8,0,glass,root,true);
  if(i===0){box(16,15.5,.12,-6,y+8,16,glass,root,true);box(6,15.5,.12,11,y+8,16,glass,root,true);box(6,8,.12,5,12,16,glass,root,true);}
  else if(i===2||i===5){box(15,15.5,.12,-6.5,y+8,16,glass,root,true);box(6,15.5,.12,11,y+8,16,glass,root,true);box(7,11,.12,4.5,y+10.5,16,glass,root,true);}
  else box(28,15.5,.12,0,y+8,16,glass,root,true);
 }
 // Floor plates leave real holes for the stairwell and lift shaft.
 for(const [i,y] of towerLevels.entries()){
  box(19.6,.4,25,4.2,y-.2,3.5,stone);
  box(12,.4,7,8,y-.2,-12.5,stone);box(2,.4,7,-4,y-.2,-12.5,stone);
  for(const z of [-14,14])box(8.4,.4,4,-9.8,y-.2,z,stone);
  if(i===6){box(4,.4,24,-12,y-.2,0,stone);box(5.5,.3,7,-.5,y+5.2,-12.5,dark);for(const x of [-3.2,2.2])box(.25,5,7,x,y+2.5,-12.5,glass,root,true);box(5.5,5,.2,-.5,y+2.5,-16,glass,root,true);}
  sign('floors',i,5,y+3,-8.72,7);sign('stairs',i,-5.42,y+2.4,13,3,-Math.PI/2);
  // A clear 4m circulation aisle links the elevator, central hall and both side rooms.
  if(i>0&&i<6){box(.22,4.8,8,5,y+2.4,9,dark,root,true);box(8,.15,.12,9,y+4.9,5,warm);}
 }
 // Stair flights: actual treads over a continuous sloped slab, protected central divider.
 for(let i=0;i<6;i++)for(let lane=0;lane<2;lane++){
  const x=lane===0?-12:-8,base=i*16+lane*8;
  const ramp=box(3.1,.16,Math.hypot(24,8),x,base+4-.12,0,dark);ramp.rotation.x=lane===0?Math.atan(1/3):-Math.atan(1/3);
  for(let step=0;step<48;step++){const z=lane===0?11.75-step*.5:-11.75+step*.5;box(3,.12,.5,x,base+(step+1)/6-.06,z,stone);}
  const rail=box(.12,.12,Math.hypot(24,8),lane===0?-10.45:-9.55,base+5.1,0,bronze);rail.rotation.x=ramp.rotation.x;
  for(let z=-10;z<=10;z+=4)box(.1,1.1,.1,lane===0?-10.45:-9.55,base+(lane===0?(12-z)/3:(z+12)/3)+.55,z,bronze);
  box(8,.25,4,-10,base+8-.125,lane===0?-14:14,stone);
 }
 box(.2,96,24,-10,48,0,dark,root,true);
 // Stairwell room boundary only opens at the public landings on the south side.
 box(.25,96,26,-5.6,48,-3,dark,root,true);
 for(let i=0;i<6;i++)box(.25,12,6,-5.6,i*16+10,13,dark,root,true);
 // Shaft, landings, automatic gates and cabin share exactly the same authored rectangle.
 for(const x of [-3.2,2.2])box(.25,96,7,x,48,-12.5,dark,root,true);
 box(5.5,96,.25,-.5,48,-16,dark,root,true);
 const gates:T.Mesh[][]=[];
 for(let i=0;i<7;i++){
  const y=towerLevels[i]!;
  if(i<6)box(5.5,11,.25,-.5,y+10.5,-9,dark,root,true);
  const pair=[box(2.5,5,.18,-1.75,y+2.5,-9,bronze),box(2.5,5,.18,.75,y+2.5,-9,bronze)];gates.push(pair);
  box(.5,1,.3,3,y+1.5,-8.8,warm,root,false,'call:'+i);
 }
 const cabin=new T.Group();root.add(cabin);cabin.position.set(-.5,0,-12.5);
 box(4.8,.2,6.4,0,-.1,0,dark,cabin);box(4.8,.2,6.4,0,5,0,warm,cabin);
 for(const x of [-2.4,2.4])box(.12,5,6.4,x,2.5,0,glass,cabin);
 box(4.8,5,.12,0,2.5,-3.2,bronze,cabin);
 box(.6,1,.3,1.6,1.6,2.5,warm,cabin,false,'panel');
 const lift=createTowerLift();
 // Each room has a central installation and furnishings outside the main circulation.
 const installations=new Map<number,T.Object3D>(),plants:T.Object3D[]=[];
 const interactive=(i:number,x:number,z:number,g:T.BufferGeometry,m=bronze)=>{
  const y=towerLevels[i]!;box(3,.5,3,x,y+.25,z,dark,root,true);
  const o=shape(g,m,x,y+2.5,z);o.userData.tower='exhibit:'+i;o.userData.noCollision=true;owned.push(o);allSolids.push(o);targets.push(o);installations.set(i,o);return o;
 };
 interactive(0,8,-1,new T.TorusKnotGeometry(1.45,.22,72,8));
 box(5,1.1,2,9,.55,9,wood,root,true);sign('elevator',0,0,3,-8.7,4);
 interactive(1,8,-1,new T.IcosahedronGeometry(1.7,0),cloth);
 for(const [x,z] of [[0,2],[9,10],[0,10]]){box(2,.7,2,x,16.35,z,stone,details[1]);shape(new T.ConeGeometry(.8,2.5,5),bronze,x,18,z,details[1]);}
 function seat(i:number,x:number,z:number){const y=towerLevels[i]!;box(3.4,.6,1.5,x,y+.6,z,cloth,root,true);box(3.4,1,.35,x,y+1.2,z+.7,cloth,details[i]);}
 for(const x of [0,10])for(const z of [1,10])seat(2,x,z);
 interactive(2,9,-3,new T.SphereGeometry(1,16,10),warm);
 function plant(i:number,x:number,z:number,scale=1){const y=towerLevels[i]!;box(2*scale,.7,2*scale,x,y+.35,z,stone,root,true);const p=new T.Group();p.position.set(x,y+.7,z);details[i]!.add(p);box(.3,3*scale,.3,0,1.5*scale,0,wood,p);for(let j=0;j<3;j++)shape(new T.IcosahedronGeometry(1.3*scale,1),leaf,Math.sin(j*2)*.6,scale*(2.7+j*.7),Math.cos(j*2)*.5,p);plants.push(p);}
 for(const [x,z] of [[-2,0],[10,1],[-2,10],[10,11]])plant(3,x!,z!,1.3);
 interactive(3,7,-4,new T.CylinderGeometry(1.5,1.7,.3,32),water);
 for(const x of [-1,11])seat(3,x,6);
 // Library shelves form a reading room and concealed northern chamber.
 for(const x of [-2,1]){box(1,3,7,x,65.5,4,wood,root,true);for(let j=0;j<12;j++)box(.9,1.7,.22,x,65.4,1+j*.5,j%3?bronze:cloth,details[4]);}
 seat(4,10,10);interactive(4,8,4,new T.OctahedronGeometry(.8),warm);
 box(12,6,.3,0,67,-4,wood,root,true);box(1.5,6,.3,13.25,67,-4,wood,root,true);
 const secretDoor=box(6.5,5,.35,9.25,66.5,-4,wood,root,false,'secret');
 box(.08,4,.08,12.45,66,-3.78,warm,root,false,'secret');sign('clue',4,9,68,-3.75,5);
 const secretArt=shape(new T.TorusKnotGeometry(1.3,.08,80,6,2,5),warm,9,68,-11);
 for(let i=0;i<7;i++)box(.1,4+i*.4,.1,6+i,67,-14,bronze,details[4]);
 interactive(5,8,0,new T.ConeGeometry(1.2,2.4,6),bronze);seat(5,-1,5);seat(5,10,10);sign('view',5,8,84,-15.8,7);
 // Terraces are real exterior extensions through open glazing bays, with supported corners.
 const snowSurfaces:T.Mesh[]=[];
 function barrier(w:number,d:number,x:number,y:number,z:number){box(w,1.4,d,x,y+.7,z,glass,root,true);box(w,.1,d,x,y+1.45,z,bronze);}
 for(const i of [2,5]){const y=towerLevels[i]!;box(12,.4,5,6,y-.2,18.5,stone);barrier(12,.15,6,y,21);for(const x of [0,12])barrier(.15,5,x,y,18.5);for(const x of [0,12]){const brace=box(.3,5.4,.3,x,y-2,18,bronze);brace.rotation.x=-.5;}if(i===5)snowSurfaces.push(box(11.5,.035,4.5,6,y+.025,18.5,snow));}
 // The Summit: open perimeter promenade and a six-point celestial compass, below flight ceiling.
 barrier(28,.15,0,96,-16);barrier(28,.15,0,96,16);for(const x of [-14,14])barrier(.15,32,x,96,0);
 for(const x of [-13,13]){box(.5,10,.7,x,101,-14,stone);box(.12,6,.12,x,102,-13.5,warm);const fin=box(.35,12,.8,x,102,0,bronze);fin.rotation.z=x>0?-.22:.22;}
 const compass=interactive(6,6,0,new T.TorusGeometry(3,.14,8,64));compass.rotation.x=Math.PI/2;
 for(let i=0;i<6;i++){const a=i*Math.PI/3;const needle=shape(new T.ConeGeometry(.55,3.4,4),i%2?bronze:warm,6+Math.cos(a)*2,97.8,Math.sin(a)*2);needle.rotation.z=a-Math.PI/2;}
 snowSurfaces.push(box(18,.035,24,4.5,96.025,3.5,snow),box(11,.035,6,8.25,96.025,-12,snow),box(3,.035,23,-12,96.025,0,snow));
 sign('name',6,5,99,-15.8,8);
 // Reuse existing purpose-built character visuals; no second NPC navigation framework.
 const visitors=[2,3].map((floor,index)=>{const visual=createChildCharacter({id:'tower-visitor-'+index,age:9,height:1.35,skin:'#c99b7c',shirt:index?'#b98552':'#537f96',pants:'#384e5a',hair:'#44352e'} as Parameters<typeof createChildCharacter>[0]);visual.root.position.set(index?8:0,towerLevels[floor]!,index?9:10);details[floor]!.add(visual.root);return visual;});
 // Batch static furnishings by material while preserving animated plants and characters.
 for(const group of details){const batches=new Map<T.Material,T.Mesh[]>();for(const o of [...group.children])if(o instanceof T.Mesh){const list=batches.get(o.material as T.Material)||[];list.push(o);batches.set(o.material as T.Material,list);}for(const [m,list] of batches){const geometries=list.map(o=>{o.updateMatrix();return o.geometry.clone().applyMatrix4(o.matrix);});const g=mergeGeometries(geometries);geometries.forEach(g=>g.dispose());if(g){gs.add(g);group.add(new T.Mesh(g,m));list.forEach(o=>o.removeFromParent());}}}
 // Keep large horizontal surfaces for precipitation and flight support; batch small facade/tread details.
 const movingMeshes=new Set<T.Object3D>([...gates.flat(),secretDoor,...snowSurfaces,...installations.values(),secretArt]);
 const batches=new Map<T.Material,T.Mesh[]>();
 for(const o of [...root.children])if(o instanceof T.Mesh&&o.userData.noCollision&&!o.userData.tower&&!movingMeshes.has(o)&&o.geometry instanceof T.BoxGeometry){
  const size=o.geometry.parameters;if(size.height<.6&&size.depth>2&&size.width>2)continue;
  const list=batches.get(o.material as T.Material)||[];list.push(o);batches.set(o.material as T.Material,list);
 }
 for(const [m,list] of batches){const parts=list.map(o=>{o.updateMatrix();return o.geometry.clone().applyMatrix4(o.matrix);});const merged=mergeGeometries(parts);parts.forEach(g=>g.dispose());if(merged){gs.add(merged);root.add(new T.Mesh(merged,m));const set=new Set(list);for(let i=allSolids.length-1;i>=0;i--)if(set.has(allSolids[i]!))allSolids.splice(i,1);list.forEach(o=>o.removeFromParent());}}
 let locale='en',secretOpen=false,secretSlide=0,clock=0,disposed=false;const active=new Set<number>();
 function inCabin(p:T.Vector3){return Math.abs(p.x-59.5)<2&&p.z>-240.3&&p.z<-233.5&&Math.abs(p.y-1.65-lift.y)<.5;}
 function allowed(x:number,z:number,y:number){
  const lx=x-60,lz=z+225;
  const floor=towerFloor(y),terrace=(floor===2||floor===5)&&lx>.4&&lx<11.6&&lz>15&&lz<20.6;
  const doorway=floor===0&&lx>2.4&&lx<7.6&&lz>15;
  if(!terrace&&!doorway&&(lx< -13.5||lx>13.5||lz< -15.5||lz>15.5))return false;
  if(lx> -3.4&&lx<2.4&&lz< -8.6){if(!inCabin(new T.Vector3(x,y,z))||lift.phase!=='idle'||lift.door<.95)return false;}
  if(floor===4&&secretSlide<6&&Math.abs(lz+4)<.65&&lx>5.6&&lx<12.9)return false;
  if(lx< -5.3&&lx> -5.95&&lz<12.4)return false;
  return !obstacles.some(o=>o.mesh.visible&&Math.abs(lx-o.x)<o.w/2+.32&&Math.abs(lz-o.z)<o.d/2+.32&&y-.9>o.y-o.h/2&&y-.9<o.y+o.h/2);
 }
 return {root,lift,targets,get ownsPassenger(){return lift.ownsPassenger;},get secretOpen(){return secretOpen;},contains:(p:T.Vector3)=>((towerContains(p.x,p.z,.1)||([2,5].includes(towerFloor(p.y))&&p.x>60&&p.x<72&&p.z> -210&&p.z< -203.8))&&p.y<110),
 inside:(p:T.Vector3)=>towerContains(p.x,p.z)&&p.y<95,
 inCabin,
 panelNear(p:T.Vector3){return towerContains(p.x,p.z)&&((inCabin(p))||Math.abs(p.x-63)<2.7&&Math.abs(p.z+233.8)<3)&&Math.abs(p.y-1.65-towerLevels[towerFloor(p.y)]!)<.6;},
 request(level:number,p:T.Vector3,permitted:boolean){return permitted&&this.panelNear(p)&&lift.request(level,inCabin(p));},
 activate(action:string,p:T.Vector3){if(action.startsWith('call:'))return lift.request(Number(action.split(':')[1]),inCabin(p));if(action==='secret'){secretOpen=!secretOpen;return true;}if(action.startsWith('exhibit:')){const i=Number(action.split(':')[1]);active.has(i)?active.delete(i):active.add(i);return true;}return false;},
 move(p:T.Vector3,d:T.Vector3){if(lift.ownsPassenger)return;const n=Math.max(1,Math.ceil(Math.hypot(d.x,d.z)/.12));for(let i=0;i<n;i++)for(const axis of ['x','z'] as const){const amount=d[axis]/n,x=p.x+(axis==='x'?amount:0),z=p.z+(axis==='z'?amount:0);let h=towerWalkingHeight(x,z,p.y);if(inCabin(new T.Vector3(x,p.y,z)))h=lift.y;if(Math.abs(h+1.65-p.y)<.5&&allowed(x,z,h+1.65)){p[axis]+=amount;p.y=h+1.65;}}},
 setLocale(value:string){locale=value;const c=towerCopy[towerLanguage(locale)];labels.forEach(({canvas,texture,key,index})=>{const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='#203841';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#f2d4a0';ctx.textAlign='center';ctx.font=key==='clue'?'30px sans-serif':'48px sans-serif';ctx.fillText(key==='floors'?`${index} · ${c.floors[index]}`:String(c[key as keyof typeof c]),512,150);texture.needsUpdate=true;});},
 update(dt:number,p:T.Vector3,climate:{hour:number;wet:number;snow:number;wind:number},reduced:boolean,visible=true){if(disposed)return;root.visible=visible;if(!visible)return;dt=Math.min(.05,Math.max(0,dt));clock+=dt;const was=lift.ownsPassenger;lift.update(dt);cabin.position.y=lift.y;if(was||lift.ownsPassenger)p.set(T.MathUtils.clamp(p.x,57.9,61.1),lift.y+1.65,T.MathUtils.clamp(p.z,-239.7,-235.1));
 gates.forEach((pair,i)=>{const open=Math.abs(lift.y-towerLevels[i]!)<.01?lift.door:0;pair[0]!.position.x=-1.75-open*2.5;pair[1]!.position.x=.75+open*2.5;});
 secretSlide=T.MathUtils.damp(secretSlide,secretOpen?6.5:0,4,dt);secretDoor.position.x=9.25-secretSlide;
 warm.emissiveIntensity=.35+1.1*(1-Math.max(0,Math.sin((climate.hour-6)/24*Math.PI*2)));stone.roughness=.68-climate.wet*.2;snow.opacity=climate.snow*.92;snowSurfaces.forEach(o=>o.visible=climate.snow>.01);
 details.forEach((g,i)=>g.visible=towerDetailVisible(i,p));if(!reduced){installations.forEach((o,i)=>{if(active.has(i)&&Math.abs(p.y-o.position.y)<22)o.rotation.y+=dt*.45;});plants.forEach((o,i)=>{o.rotation.z=Math.sin(clock*.6+i)*climate.wind*.012;});if(secretOpen&&Math.abs(p.y-65.65)<20)secretArt.rotation.y+=dt*.15;visitors.forEach((v,i)=>{if(v.root.parent?.visible){v.root.rotation.y=Math.sin(clock*.12+i)*.25;v.update(dt,false,false,reduced);}});}
 },
 dispose(){if(disposed)return;disposed=true;lift.dispose();root.removeFromParent();visitors.forEach(v=>v.dispose());gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());const set=new Set(owned);for(let i=allSolids.length-1;i>=0;i--)if(set.has(allSolids[i]!))allSolids.splice(i,1);}
 };
}
