import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export const voyageDestination=new T.Vector3(-880,110,920);
export const voyageDock=new T.Vector3(-880,114,886);
export const voyageExit=new T.Vector3(-880,111.65,903);
/** Open, arc-length sampled route: launch above the plateau before the long western crossing. */
export function createVoyageRoute(){
 const route=new T.CatmullRomCurve3([[27,4,148],[27,24,142],[27,68,140],[0,108,200],[-140,145,330],[-360,174,490],[-600,158,680],[-795,144,833],[-866,128,875],[-880,114,886]].map(p=>new T.Vector3(...p as [number,number,number])),false,'centripetal');
 route.arcLengthDivisions=1800;route.updateArcLengths();return route;
}
/** Smooth acceleration / cruise / deceleration, symmetric for the return journey. */
export function voyageProgress(t:number){t=T.MathUtils.clamp(t,0,1);const a=.16;if(t<a)return t*t/(2*a*(1-a));if(t>1-a)return 1-(1-t)*(1-t)/(2*a*(1-a));return (t-a/2)/(1-a);}
export const voyageDuration=54;
export function onVoyageIsland(p:T.Vector3,margin=1.1){return Math.hypot((p.x+880)/(31-margin),(p.z-920)/(37-margin))<1;}
const gardenBeds=Array.from({length:14},(_,i)=>({x:(i<7?-1:1)*(15+i%7%2*3),z:-20+i%7*6}));
export function moveOnVoyageIsland(p:T.Vector3,d:T.Vector3){
 const n=Math.max(1,Math.ceil(Math.hypot(d.x,d.z)/.16));
 for(let i=0;i<n;i++)for(const axis of ['x','z'] as const){const old=p[axis];p[axis]+=d[axis]/n;const dx=p.x+880,dz=p.z-930;
  // Reflecting court and the four observatory piers are real walking obstacles.
  if(!onVoyageIsland(p)||Math.hypot(dx,dz)<5.3||[-10,10].some(x=>[-10,10].some(z=>Math.hypot(dx-x,dz-z)<1.25))||Math.hypot(dx,p.z-901)<1.25||gardenBeds.some(b=>Math.abs(dx-b.x)<2.35&&Math.abs(p.z-920-b.z)<1.35))p[axis]=old;
 }
 p.y=111.65;
}
export function createVoyageScenery(parent:T.Group,whale:T.Group){
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>(),targets:T.Mesh[]=[];
 function mat(color:string,glow=0){const m=new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:glow,roughness:.65,metalness:.32});ms.add(m);return m;}
 const stone=mat('#7e9295'),pale=mat('#ced8cd'),bronze=mat('#546b70'),light=mat('#bde6dd',.65),leaf=mat('#365e59'),water=mat('#37616b',.2);
 function mesh(g:T.BufferGeometry,m:T.Material,p:T.Object3D,x=0,y=0,z=0,action?:string){gs.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.userData.noCollision=true;p.add(o);if(action){o.userData.secret=action;targets.push(o);}return o;}
 const unitBox=new T.BoxGeometry(1,1,1);gs.add(unitBox);
 function box(p:T.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material){const o=mesh(unitBox,m,p,x,y,z);o.scale.set(w,h,d);return o;}
 const island=new T.Group();island.name='Aeralis · wind observatory';island.position.copy(voyageDestination);parent.add(island);
 // Layered oval mineral escarpment, suspended well away from the existing Horizon island.
 for(let i=0;i<4;i++){const o=mesh(new T.CylinderGeometry(1, i===3?.25:.87,1,12),i%2?stone:bronze,island,0,-2-i*5,0);o.scale.set(32-i*3,5,38-i*3);o.rotation.y=i*.15;}
 const deck=mesh(new T.CylinderGeometry(1,1,.45,64),pale,island,0,-.225,0);deck.scale.set(31,1,37);
 const ringGeo=new T.TorusGeometry(1,.015,6,96);gs.add(ringGeo);
 for(const r of [8,18,28]){const o=mesh(ringGeo,bronze,island,0,.04,7);o.rotation.x=-Math.PI/2;o.scale.setScalar(r);}
 // Open northern arrival promenade leads through wind gardens to a reflecting court.
 for(const side of [-1,1])for(let i=0;i<7;i++){
  box(island,4,.45,2,side*(15+i%2*3),.2,-20+i*6,stone);
  for(let j=0;j<4;j++){const blade=mesh(new T.ConeGeometry(.25,1.2+(j%2)*.7,4),leaf,island,side*(15+i%2*3)+(j-1.5)*.65,1,-20+i*6);blade.rotation.z=side*.22;}
 }
 const court=new T.Group();court.position.z=10;island.add(court);
 mesh(new T.CylinderGeometry(5,5,.1,64),water,court,0,.07,0);
 const instrument=new T.Group();instrument.position.y=6;court.add(instrument);
 for(let i=0;i<3;i++){const o=mesh(new T.TorusGeometry(4+i*.6,.08,8,80),i===1?light:bronze,instrument);o.rotation.set(.45+i*.7,i*.8,0);}
 mesh(new T.OctahedronGeometry(.65),light,instrument);
 for(const x of [-10,10])for(const z of [-10,10]){mesh(new T.CylinderGeometry(.6,.9,12,8),stone,court,x,6,z);box(court,2,.3,2,x,12,z,pale);}
 // Floating crown gives the destination a clear silhouette without blocking the sky.
 for(let i=0;i<12;i++){const a=i*Math.PI/6;const o=box(court,2.8,.5,1.2,Math.cos(a)*14,14+Math.sin(a*2)*1.5,Math.sin(a)*14,bronze);o.rotation.y=-a;}
 // Continuous edge coping, with a deliberate opening at the arrival promenade.
 for(let i=0;i<80;i++){const a=i/80*Math.PI*2;if(Math.sin(a)<-.94)continue;const x=Math.cos(a)*30.5,z=Math.sin(a)*36.5;const o=box(island,2.5,.75,.45,x,.375,z,stone);o.rotation.y=-Math.atan2(36.5*Math.cos(a),-30.5*Math.sin(a));}
 const returnRoot=new T.Group();returnRoot.position.set(0,0,-19);island.add(returnRoot);
 mesh(new T.CylinderGeometry(.75,1,.7,12),bronze,returnRoot,0,.35,0);
 mesh(new T.OctahedronGeometry(.35),light,returnRoot,0,1.25,0,'call');
 for(const x of [-4,4]){box(island,.15,.12,14,x,.06,-27,bronze);box(island,.4,2.7,.4,x,1.35,-28,stone);}
 // A few large sculpted waystones give close parallax during the crossing, away from the path.
 const waystones=new T.Group();waystones.name='Western wind markers';parent.add(waystones);
 for(const [x,y,z] of [[-170,112,360],[-410,140,490],[-640,126,724]]){const g=new T.Group();g.position.set(x!,y!,z!);waystones.add(g);mesh(new T.ConeGeometry(6,32,5),stone,g,0,-18,0);const o=mesh(new T.TorusGeometry(8,.35,8,48),bronze,g);o.rotation.y=-.65;mesh(new T.OctahedronGeometry(.7),light,g,0,7,0);}
 // Integrated forward observation blister. There is no glass plane to obscure the view.
 const cabin=new T.Group();cabin.name='Whale · forward observation cabin';cabin.position.set(0,2.7,-5.8);whale.add(cabin);
 box(cabin,3.8,.2,4.6,0,0,0,bronze);box(cabin,3.8,.65,.3,0,.35,-1.7,bronze);
 for(const x of [-1.8,1.8]){box(cabin,.14,2.7,.16,x,1.35,-1.5,bronze);box(cabin,.18,.75,4.4,x,.4,.3,stone);box(cabin,.13,.13,4.4,x,2.7,.3,bronze);}
 box(cabin,3.8,.12,.18,0,2.7,-1.5,bronze);
 box(cabin,1.7,.08,.5,0,.75,-1.45,stone);
 for(let i=0;i<7;i++)box(cabin,.11,.025,.14,(i-3)*.16,.8,-1.43,i===3?light:bronze);
 // Bake static architectural detail into a handful of material batches; keep the
 // moving instrument, cabin and interaction target as independent objects.
 function batch(root:T.Group,excluded?:T.Object3D){
  root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert(),groups=new Map<T.Material,T.BufferGeometry[]>(),sources:T.Mesh[]=[];
  root.traverse(o=>{if(!(o instanceof T.Mesh)||o.userData.secret)return;let p:T.Object3D|null=o;while(p&&p!==excluded)p=p.parent;if(excluded&&p===excluded)return;const g=o.geometry.clone().applyMatrix4(new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld)),m=o.material as T.Material,list=groups.get(m)||[];list.push(g);groups.set(m,list);sources.push(o);});
  for(const [m,list] of groups){const g=mergeGeometries(list);list.forEach(g=>g.dispose());if(g)mesh(g,m,root);}
  sources.forEach(o=>o.removeFromParent());
 }
 batch(island,instrument);batch(waystones);batch(cabin);
 const windGeo=new T.BufferGeometry(),positions=new Float32Array(64*6);windGeo.setAttribute('position',new T.BufferAttribute(positions,3));gs.add(windGeo);
 const windMat=new T.LineBasicMaterial({color:'#cee8e8',transparent:true,opacity:.18,depthWrite:false});ms.add(windMat);
 const wind=new T.LineSegments(windGeo,windMat);whale.add(wind);wind.visible=false;
 return {island,targets,cabin,
  update(dt:number,reduced:boolean,riding:boolean,time:number,speed:number){
   if(!reduced)instrument.rotation.y+=Math.min(.05,dt)*.07;
   wind.visible=riding&&!reduced&&speed>8;
   if(wind.visible){windMat.opacity=Math.min(.24,speed/120);for(let i=0;i<64;i++){const a=i*2.399,r=9+i%7,z=((time*speed*.8+i*7)%100)-75,k=i*6;positions[k]=positions[k+3]=Math.cos(a)*r;positions[k+1]=positions[k+4]=Math.sin(a)*r+4;positions[k+2]=z;positions[k+5]=z+Math.min(4,speed*.1);}windGeo.attributes.position!.needsUpdate=true;}
  },
  dispose(){island.removeFromParent();waystones.removeFromParent();cabin.removeFromParent();wind.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());},
 };
}
