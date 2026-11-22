import * as T from 'three';
import { discoveryCopy } from './discovery-copy';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Authored, connected floor plan. Coordinates also drive the swept walking boundary. */
export const depthConnections = [
 {surface:[22,1.65,-38], below:[13,-58.35,2], name:['Hall stone panel','Steinplatte der Halle','Каменная панель в зале']},
 {surface:[-92,1.65,76], below:[-66,-58.35,2], name:['Garden well','Gartenbrunnen','Садовый колодец']},
 {surface:[62,5.65,88], below:[64,-54.35,2], name:['Eastern survey lift','Östlicher Vermessungslift','Восточный подъёмник']},
 {surface:[0,1.65,-119], below:[16,-58.35,-60], name:['Northern stone cleft','Nördliche Felsspalte','Северная расщелина']},
] as const;
export const depthRooms = [
 [-3,3,-3,3], // Lantern shaft
 [-1,1,-12,-4],[-4,4,-17,-12], // Resonator vault
 [-13,-4,-1,1],[-17,-12,-5,5], // Cistern bridge
 [4,11,-1,1],[12,16,-4,4], // Rising archive
 [-1,1,4,10],[-4,4,11,15], // Quiet scriptorium
 [2,8,8,9],[7,8,2,7], // A second route closes the southern loop
] as const;
export function depthHeight(x:number){return -60+T.MathUtils.clamp((x-16)/28,0,1)*4;}
const cells=new Set<string>(),pits=new Set<string>();
for(const [x0,x1,z0,z1] of depthRooms)for(let x=x0;x<=x1;x++)for(let z=z0;z<=z1;z++)cells.add(`${x},${z}`);
// A sunken cistern: the cross bridge and perimeter remain walkable.
for(let x=-16;x<=-13;x++)for(let z=-4;z<=4;z++)if(z!==0&&Math.abs(z)!==4&&x!==-16){cells.delete(`${x},${z}`);pits.add(`${x},${z}`);}
const obstacles:{x:number;z:number;w:number;d:number}[]=[];
for(const x of [-8,12])for(const z of [-8,12])obstacles.push({x,z,w:.7,d:.7});
for(let x=50;x<=62;x+=4)for(const z of [-10,14])obstacles.push({x,z,w:2.6,d:.9});
for(let i=0;i<7;i++)obstacles.push({x:-7+i*3,z:-65,w:.4,d:1});
export function depthContains(x:number,z:number,margin=.36){
 if(Math.hypot(x-2,z-52)<2.9+margin||obstacles.some(o=>Math.abs(x-o.x)<o.w/2+margin&&Math.abs(z-o.z)<o.d/2+margin))return false;
 const inset=margin+.35; // Half the masonry thickness plus the visitor footprint.
 for(const [dx,dz] of [[0,0],[-inset,-inset],[-inset,inset],[inset,-inset],[inset,inset]])if(!cells.has(`${Math.floor((x+dx!)/4)},${Math.floor((z+dz!)/4)}`))return false;
 return true;
}
export function moveInDepth(p:T.Vector3,d:T.Vector3){
 const n=Math.max(1,Math.ceil(Math.hypot(d.x,d.z)/.16));
 for(let i=0;i<n;i++){if(depthContains(p.x+d.x/n,p.z))p.x+=d.x/n;if(depthContains(p.x,p.z+d.z/n))p.z+=d.z/n;}
 p.y=depthHeight(p.x)+1.65;
}
export function createSubterranean(scene:T.Scene,allSolids:T.Mesh[]=[]){
 const root=new T.Group(),surface=new T.Group();root.name='Tidal Archive · subterranean labyrinth';surface.name='Four concealed descents';root.visible=false;scene.add(root,surface);
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>(),targets:T.Mesh[]=[],ownedSolids:T.Mesh[]=[];
 function material(color:string,emissive=0){const m=new T.MeshStandardMaterial({color,roughness:.83,metalness:.12,emissive:color,emissiveIntensity:emissive});ms.add(m);return m;}
 const stone=material('#414e54'),edge=material('#728482'),bronze=material('#776349'),floor=material('#586365'),warm=material('#e5bb75',1.5),cool=material('#83c5c1',.8),water=material('#234a56',.3);
 // Subtle world-space mineral strata, no external textures or texture fetches.
 for(const m of [stone,floor,edge])m.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 strata;').replace('#include <begin_vertex>','#include <begin_vertex>\nstrata=position;');s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 strata;').replace('#include <color_fragment>','#include <color_fragment>\nfloat grain=fract(sin(dot(floor(strata*37.),vec3(12.98,78.23,43.1)))*43758.5);diffuseColor.rgb*=.91+.12*grain+.025*sin(strata.y*11.+sin(strata.x*.4));');};
 const batches=new Map<T.Material,T.BufferGeometry[]>();
 function mesh(g:T.BufferGeometry,m:T.Material,parent:T.Object3D,x=0,y=0,z=0,action?:string){gs.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);parent.add(o);let ancestor:T.Object3D|null=parent;while(ancestor&&ancestor!==surface)ancestor=ancestor.parent;if(ancestor===surface){o.userData.room='subterranean-entrances';o.userData.noCollision=!!action;allSolids.push(o);ownedSolids.push(o);}if(action){o.userData.secret=action;targets.push(o);}return o;}
 function block(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material,parent:T.Object3D=root,batch=true){
  const g=new T.BoxGeometry(w,h,d);if(batch&&parent===root){g.translate(x,y,z);const list=batches.get(m)||[];list.push(g);batches.set(m,list);return;}return mesh(g,m,parent,x,y,z);
 }
 for(const key of cells){const [ix,iz]=key.split(',').map(Number) as [number,number],x=ix*4+2,z=iz*4+2,h=depthHeight(x),height=ix>=-3&&ix<=3&&iz>=-3&&iz<=3?16:ix>=-4&&ix<=4&&iz<=-12?18:8;
  const g=new T.BoxGeometry(4,.6,4);const pos=g.attributes.position!;for(let i=0;i<pos.count;i++)pos.setY(i,pos.getY(i)+depthHeight(pos.getX(i)+x)-h);g.computeVertexNormals();g.translate(x,h-.3,z);const list=batches.get(floor)||[];list.push(g);batches.set(floor,list);
  block(4,.5,4,x,h+height+.25,z,stone);
  for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]])if(!cells.has(`${ix+dx!},${iz+dz!}`)){
   const wx=x+dx!*2,wz=z+dz!*2;
   if(pits.has(`${ix+dx!},${iz+dz!}`)){block(dx?.12:4,.12,dz?.12:4,wx,h+1.05,wz,bronze);block(.1,1.1,.1,wx,h+.55,wz,bronze);continue;}
   block(dx?.7:4,height+1,dz?.7:4,wx,h+height/2-.5,wz,stone);
   block(dx?.85:4,.3,dz?.85:4,wx,h+.25,wz,bronze);
   block(dx?.85:4,.22,dz?.85:4,wx,h+height-.5,wz,edge);
   block(.62,height,.62,wx+dz!*1.78,h+height/2,wz+dx!*1.78,edge);
   if((ix+iz)%3===0){block(dx?.12:1.2,.16,dz?.12:1.2,wx-dx!*.5,h+2.6,wz-dz!*.5,(iz<-10?cool:warm));}
  }
 }
 // Arched ribs mark the processional corridors and monumental north vault.
 function arch(x:number,z:number,r:number,y:number,alongX=false){
  const curve=new T.EllipseCurve(0,0,r,r*.65,0,Math.PI,false,0),points=curve.getPoints(24).map(p=>new T.Vector3(alongX?0:p.x,p.y,alongX?p.x:0));
  mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),24,.18,6,false),edge,root,x,y,z);
  for(const side of [-1,1])block(.36,4,.36,x+(alongX?0:side*r),y-2,z+(alongX?side*r:0),edge);
 }
 for(const z of [-18,-30,-42])arch(2,z,5.6,-56);
 for(const x of [-18,-30,-42,22,34,46])arch(x,2,5.6,depthHeight(x)+4,true);
 for(const z of [-50,-58,-66])arch(2,z,17,-55);
 // Central shaft: an open walking ring surrounds a suspended bronze lantern mechanism.
 const mechanism=new T.Group();mechanism.position.set(2,-49,2);root.add(mechanism);
 for(const r of [1.6,2.8,4]){const o=mesh(new T.TorusGeometry(r,.09,8,56),bronze,mechanism);o.rotation.x=r*.5;}
 mesh(new T.OctahedronGeometry(1.5,0),warm,mechanism);
 for(const x of [-8,12])for(const z of [-8,12]){block(.7,16,.7,x,-52,z,edge);block(1.5,.3,1.5,x,-44,z,bronze);}
 water.roughness=.24;water.metalness=.35;
 // Cistern water sits below the bridge; solid coping and rails frame each opening.
 block(20,.15,36,-58,-63,2,water);
 for(const z of [-.15,4.15]){block(16,.12,.12,-56,-58.9,z,bronze);for(let x=-63;x<-47;x+=4)block(.09,1.1,.09,x,-59.45,z,bronze);}
 for(let i=0;i<9;i++){const o=mesh(new T.CylinderGeometry(.4,.65,7+i%3,8),stone,root,-62+(i%3)*5,-66, -12+Math.floor(i/3)*14);o.rotation.z=.12*Math.sin(i);}
 // Archive niches, built outside the clear circulation centreline.
 for(let x=50;x<=62;x+=4)for(const z of [-10,14]){block(2.6,3,.8,x,-54.5,z,bronze);for(let j=0;j<6;j++)block(.18,1.8,.9,x-1+j*.4,-54.2,z,warm);}
 // Resonator: concentric stone fins above a shallow reflective basin.
 block(12,.15,10,2,-59.8,-59,water);
 for(let i=0;i<7;i++){const x=-7+i*3;block(.38,5+Math.sin(i/6*Math.PI)*5,1,x,-55,-65,edge);block(.12,3,.12,x,-54,-64.4,cool);}
 // Quiet south room has a circular reading table and an amber ceiling constellation.
 mesh(new T.CylinderGeometry(2.6,2.9,.18,40),bronze,root,2,-59.3,52);
 for(let i=0;i<17;i++){const a=i*2.399,r=2+i%4;mesh(new T.OctahedronGeometry(.12),warm,root,2+Math.cos(a)*r,-54+(i%3)*.3,52+Math.sin(a)*r);}
 for(const key of pits){const [ix,iz]=key.split(',').map(Number) as [number,number];block(4,.5,4,ix*4+2,-51.75,iz*4+2,stone);}
 for(const [m,list] of batches){const g=mergeGeometries(list);list.forEach(g=>g.dispose());if(g)mesh(g,m,root);}
 const signs:{canvas:HTMLCanvasElement;texture:T.CanvasTexture}[]=[],entranceSigns:typeof signs=[];
 if(typeof document!=='undefined')for(const [x,y,z] of [[2,-56,-11],[2,-55,-49],[-42,-56,2],[46,-52,2],[2,-56,46]]){const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=128;const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;const m=new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:T.DoubleSide});ms.add(m);const plaque=mesh(new T.PlaneGeometry(6,.75),m,root,x,y,z);plaque.rotation.y=signs.length===2?Math.PI/2:signs.length===3?-Math.PI/2:signs.length===4?Math.PI:0;signs.push({canvas,texture});}
 const light=new T.HemisphereLight('#bedbdc','#39424b',2.1);root.add(light);
 const lamp=new T.PointLight('#efc88b',75,38,1.4);root.add(lamp);
 const north=new T.PointLight('#92c9d2',65,35,1.5);north.position.set(2,-53,-59);root.add(north);
 function doorway(parent:T.Object3D,x:number,y:number,z:number,action:string,style:number){
  if(style===2){
   mesh(new T.CylinderGeometry(1.5,1.7,.12,12),bronze,parent,x,y+.06,z,action);for(const side of [-1,1]){block(.16,3,.16,x+side*1.7,y+1.5,z-.8,bronze,parent,false);block(.08,2.2,.08,x+side*1.7,y+1.5,z-.69,cool,parent,false);}block(3.6,.2,1.2,x,y+3,z-.8,edge,parent,false);mesh(new T.OctahedronGeometry(.18),warm,parent,x,y+1.3,z-.8,action);
  }else if(style===3){
   for(const side of [-1,1]){const rock=mesh(new T.CylinderGeometry(.75,1,4,5),stone,parent,x+side*1.5,y+1.7,z);rock.rotation.z=side*.12;}block(4.2,.65,1.3,x,y+3.4,z,edge,parent,false);mesh(new T.PlaneGeometry(2.2,3.1),stone,parent,x,y+1.55,z+.05,action);mesh(new T.OctahedronGeometry(.15),cool,parent,x+.8,y+1.5,z+.2,action);
  }else if(style===1){mesh(new T.CylinderGeometry(1.65,1.85,.65,16,1,true),edge,parent,x,y+.325,z);const o=mesh(new T.CircleGeometry(1.4,32),cool,parent,x,y+.04,z,action);o.rotation.x=-Math.PI/2;}
  else {for(const dx of [-1.3,1.3])block(.35,3.4,.6,x+dx,y+1.7,z,style===3?stone:bronze,parent,false);block(3,.3,.7,x,y+3.3,z,edge,parent,false);mesh(new T.PlaneGeometry(2.25,2.9),stone,parent,x,y+1.5,z+.02,action);block(.07,2.5,.08,x+.8,y+1.6,z+.08,cool,parent,false);mesh(new T.OctahedronGeometry(.18),warm,parent,x+.7,y+1.6,z+.2,action);}
 }
 depthConnections.forEach((c,i)=>{
  const [x,y,z]=c.surface,portal=new T.Group();surface.add(portal);portal.position.set(i===0?23.65:x,y-1.65,i===0?z:z-2.6);if(i===0)portal.rotation.y=-Math.PI/2;doorway(portal,0,0,0,'depth:enter:'+i,i);
  if(typeof document!=='undefined'){
   const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=160;
   const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
   const m=new T.MeshBasicMaterial({map:texture});ms.add(m);
   mesh(new T.PlaneGeometry(4.6,.72),m,portal,0,3.85,.12,'depth:enter:'+i);entranceSigns.push({canvas,texture});
   if(i===1)for(const side of [-1,1])block(.08,3.8,.08,side*1.8,1.9,-.1,bronze,portal,false);
  }
  const [bx,by,bz]=c.below,exit=new T.Group();root.add(exit);exit.position.set(i===0?15.65:i===1?-67.65:i===2?67.65:19.65,by-1.65,bz);exit.rotation.y=i===1?Math.PI/2:-Math.PI/2;doorway(exit,0,0,0,'depth:exit:'+i,0);
 });
 // Low amber inlays lead from the arrival area along the clear eastern aisle.
 const cueGeometry=new T.BoxGeometry(.18,.025,.65);gs.add(cueGeometry);
 const trail=[new T.Vector3(5,.04,11),new T.Vector3(20,.04,8),new T.Vector3(20,.04,-38),new T.Vector3(22,.04,-38)];
 for(let j=1;j<trail.length;j++){const a=trail[j-1]!,b=trail[j]!,length=a.distanceTo(b);for(let d=0;d<length;d+=2.8){const p=new T.Vector3().lerpVectors(a,b,d/length),cue=mesh(cueGeometry,warm,surface,p.x,p.y,p.z);cue.rotation.y=Math.atan2(b.x-a.x,b.z-a.z);cue.userData.noCollision=true;}}
 return {root,surface,targets,move:moveInDepth,fog:new T.FogExp2('#24363c',.006),
  setLocale(locale:string){const c=discoveryCopy[locale==='de'||locale==='ru'?locale:'en'];signs.forEach(({canvas,texture},i)=>{const ctx=canvas.getContext('2d');if(!ctx)return;ctx.clearRect(0,0,1024,128);ctx.fillStyle='#e1cda4';ctx.font='40px sans-serif';ctx.textAlign='center';ctx.fillText(c.landmarks[i]!,512,80);texture.needsUpdate=true;});entranceSigns.forEach(({canvas,texture})=>{const ctx=canvas.getContext('2d');if(!ctx)return;ctx.fillStyle='#20373c';ctx.fillRect(0,0,1024,160);ctx.fillStyle='#f3d6a0';ctx.font='bold 54px sans-serif';ctx.textAlign='center';ctx.fillText(c.entrance,512,102);texture.needsUpdate=true;});},
  update(dt:number,reduced:boolean,p:T.Vector3){lamp.position.set(p.x,p.y+2,p.z);if(!reduced)mechanism.rotation.y+=Math.min(dt,.05)*.08;},
  dispose(){root.removeFromParent();surface.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());[...signs,...entranceSigns].forEach(s=>s.texture.dispose());for(const o of ownedSolids){const i=allSolids.indexOf(o);if(i>=0)allSolids.splice(i,1);}},
 };
}
