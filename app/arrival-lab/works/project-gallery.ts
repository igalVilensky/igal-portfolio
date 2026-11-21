import * as T from 'three';
import { projectRooms, getRoomCopy } from './project-rooms';

/** One scene owner, one set of colliders; no transport or camera ownership. */
export function createProjectGallery(scene:T.Scene, solids:T.Mesh[]){
 const root=new T.Group();root.name='living-works-project-rooms';scene.add(root);
 const geometry:T.BufferGeometry[]=[],materials:T.Material[]=[],textures:T.Texture[]=[];
 const owned:T.Mesh[]=[];
 const material=(color:string,metalness=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.6,metalness});materials.push(m);return m;};
 const stone=material('#c9cebf'),floor=material('#7d8c85'),blue=material('#284c69',.35),green=material('#22c55e',.3),ink=material('#182f2a',.3),brass=material('#d3b974',.4);
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=stone,id?:string){const g=new T.BoxGeometry(w,h,d);geometry.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.userData.room='project-gallery';if(id)mesh.userData.works=id;root.add(mesh);solids.push(mesh);owned.push(mesh);mesh.receiveShadow=true;return mesh;}
 const labels:{mesh:T.Mesh;draw:(a:string,b?:string)=>void}[]=[];
 function label(w:number,h:number,x:number,y:number,z:number,rotation=0,id?:string){
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
  const m=new T.MeshBasicMaterial({map:texture});materials.push(m);const g=new T.PlaneGeometry(w,h);geometry.push(g);
  const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.rotation.y=rotation;root.add(mesh);
  if(id){mesh.userData.works=id;mesh.userData.noCollision=true;solids.push(mesh);owned.push(mesh);}
  const entry={mesh,draw(a:string,b=''){const c=canvas.getContext('2d')!;c.fillStyle='#182f2a';c.fillRect(0,0,1024,256);c.fillStyle='#e2f2da';c.font='48px monospace';c.fillText(a,30,95,964);c.fillStyle='#79dca4';c.font='28px monospace';c.fillText(b,30,190,964);texture.needsUpdate=true;}};labels.push(entry);return entry;
 }
 // Exactly meet the cut opening in the old east wall; floor top stays y=0.
 box(42,1,10,75,-.5,-87,floor);box(42,.6,10,75,9.3,-87);
 box(.6,9,10,96,4.5,-87,blue);
 // Active registry entrances cut the corridor wall; reservations retain a solid boundary.
 for(const side of ['north','south'] as const){
  const z=side==='north'?-92:-82;
  const active=projectRooms.filter(r=>r.side===side&&r.status==='active').sort((a,b)=>a.entrance[0]-b.entrance[0]);
  let edge=54;
  for(const room of active){const x=room.entrance[0];box(x-3-edge,9,.6,(edge+x-3)/2,4.5,z);box(6,3,.6,x,7.5,z);edge=x+3;}
  if(edge<96)box(96-edge,9,.6,(edge+96)/2,4.5,z);
 }
 for(const x of [57,79,95]){for(const z of [-91.5,-82.5])box(.4,9,.5,x,4.5,z,blue);box(.4,.4,9,x,8.8,-87,blue);}
 box(40,.025,.12,75,.025,-87,brass);
 const sign=label(7,1.5,53.4,5,-86.8,-Math.PI/2);
 const back=label(6,1.1,95.65,3,-87,-Math.PI/2);
 const plates=projectRooms.map(r=>{
  const [x,,z]=r.entrance,rotation=r.side==='north'?0:Math.PI;
  for(const dx of [-3.2,3.2])box(.3,6,.75,x+dx,3,z, r.status==='active'?green:blue);
  box(6.7,.3,.75,x,6,z,r.status==='active'?green:blue);
  return label(5.5,1.1,x,6.95,z+(r.side==='north'?.34:-.34),rotation);
 });
 // Adapt the reference's 20 × 30 × 9 monument to the assigned 16 × 18 room.
 // The doorway and corridor remain at z=-92; all room geometry stays inside its plot.
 const room=projectRooms.find(r=>r.id==='openme')!;
 const [cx,,cz]=room.center;
 const darkFloor=material('#0c1612',.3),wall=material('#16251e'),fin=material('#0a1210',.4);
 const basic=(color:string)=>{const m=new T.MeshBasicMaterial({color});materials.push(m);return m;};
 const mint=basic('#7dffb0'),dim=basic('#2a6b4a');
 const glass=new T.MeshStandardMaterial({color:'#9fffd0',transparent:true,opacity:.22,roughness:.1,emissive:'#1f6b45',depthWrite:false});materials.push(glass);
 const decor=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material)=>{const o=box(w,h,d,x,y,z,m);o.userData.noCollision=true;return o;};
 function sculpture(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,id?:string){geometry.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);root.add(o);if(id){o.userData.works=id;o.userData.noCollision=true;solids.push(o);owned.push(o);}return o;}
 function ring(radius:number,y:number,m:T.Material){const o=sculpture(new T.RingGeometry(radius,radius+.035,96),m,cx,y,cz);o.rotation.x=-Math.PI/2;return o;}
 function channel(a:T.Vector3,b:T.Vector3,m:T.Material){const o=decor(.07,.02,a.distanceTo(b),0,0,0,m);o.position.copy(a).add(b).multiplyScalar(.5);o.lookAt(b);return o;}
 box(room.width,1,room.depth,cx,-.5,cz,darkFloor);box(room.width,.4,room.depth,cx,9.2,cz,fin);
 for(const x of [cx-8,cx+8])box(.6,9,18,x,4.5,cz,wall);
 box(16,9,.6,cx,4.5,-110,wall);
 for(let i=-3;i<=3;i++){
  const z=cz+i*2.2;
  for(const side of [-1,1]){box(.65,9,.4,cx+side*7.45,4.5,z,fin);decor(.055,7,.055,cx+side*7.08,4.5,z+.8,dim);}
  decor(14.6,.5,.35,cx,8.7,z,fin);
 }
 for(const side of [-1,1])decor(.06,.025,17,cx+side*7,.02,cz,mint);
 decor(5.8,.1,.12,cx,5.9,-92.4,mint);
 const oculus=sculpture(new T.TorusGeometry(3.1,.055,8,64),mint,cx,8.4,cz);oculus.rotation.x=Math.PI/2;
 for(const r of [2.6,5.4,7.4])ring(r,.015,r===2.6?mint:dim);
 box(2.4,.45,2.4,cx,.225,cz,fin,'openme');
 const orb=sculpture(new T.SphereGeometry(.48,32,24),mint,cx,1.9,cz,'openme');
 const wire=new T.MeshBasicMaterial({color:'#7dffb0',wireframe:true,transparent:true,opacity:.5});materials.push(wire);
 const shell=sculpture(new T.IcosahedronGeometry(.98,1),wire,cx,1.9,cz,'openme');
 const angles=[45,135,225,315].map(a=>a*Math.PI/180);
 for(let i=0;i<32;i++){const a=i/32*Math.PI*2;if(angles.some(g=>Math.abs(Math.atan2(Math.sin(a-g),Math.cos(a-g)))<.3))continue;
  const p=decor(.1,3.2,.4,cx+Math.sin(a)*3,1.6,cz+Math.cos(a)*3,glass);p.rotation.y=a;
 }
 const center=new T.Vector3(cx,.04,cz),destination=new T.Vector3(cx,.04,-107.6);
 channel(center,destination,dim);
 const stations=angles.map((a,i)=>{
  const x=cx+Math.sin(a)*5.7,z=cz+Math.cos(a)*5.7,turn=Math.atan2(cx-x,cz-z);
  const gate=new T.Group();gate.position.set(x,0,z);gate.rotation.y=turn;root.add(gate);
  function part(w:number,h:number,d:number,px:number,py:number,pz:number,m:T.Material,collides=true){const o=box(w,h,d,0,0,0,m,'openme-endpoint-'+i);gate.attach(o);o.position.set(px,py,pz);o.rotation.set(0,0,0);o.userData.noCollision=!collides;return o;}
  part(.4,4.6,.65,-1.25,2.3,0,fin);part(.4,4.6,.65,1.25,2.3,0,fin);part(2.9,.4,.65,0,4.5,0,fin);
  const glow=basic('#2a6b4a');
  part(.06,4.2,.06,-1.02,2.3,.36,glow,false);part(.06,4.2,.06,1.02,2.3,.36,glow,false);part(2.1,.06,.06,0,4.35,.36,glow,false);
  part(1.6,1.15,.08,0,1.7,0,glass,false);
  const l=label(3.3,1.05,x,5.4,z,turn,'openme-endpoint-'+i);
  // Labels on both sides remain readable on approach and from the centre.
  const reverse=label(3.3,1.05,x,5.4,z,turn+Math.PI,'openme-endpoint-'+i);
  const route=basic('#2a6b4a');channel(new T.Vector3(x,.04,z),center,route);
  return {l,reverse,glow,route,pos:new T.Vector3(x,.3,z)};
 });
 const headline=label(10,1.6,cx,7.2,-109.64);
 box(5.2,.8,1.6,cx,.4,-108.4,fin,'openme');
 const inbox=decor(5.4,.06,1.8,cx,.83,-108.4,dim);
 for(const side of [-1,1])box(.18,5,.2,cx+side*2.9,2.5,-108.4,fin,'openme');
 box(6,.18,.3,cx,5,-108.4,fin,'openme');
 const inboxLabel=label(6.2,1.5,cx,3.3,-108.25,0,'openme');
 const info=label(3.4,1,cx,3.5,cz+.3,0,'openme');
 const exit=label(5,1,cx,4.8,-92.34,Math.PI);
 const coreLight=new T.PointLight('#7dffb0',65,13,2);coreLight.position.set(cx,2.3,cz);root.add(coreLight);
 const inboxLight=new T.PointLight('#7dffb0',25,8,2);inboxLight.position.set(cx,3,-107);root.add(inboxLight);
 const corridorLight=new T.PointLight('#eafff3',110,15,2);corridorLight.position.set(cx,4,-89);root.add(corridorLight);
 const packet=sculpture(new T.SphereGeometry(.17,16,12),mint,cx,.3,cz);packet.visible=false;
 const packetLight=new T.PointLight('#7dffb0',12,3,2);root.add(packetLight);packetLight.visible=false;
 let locale='en',selected=-1,progress=1,elapsed=0,received=false;
 function text(){const c=getRoomCopy(locale);sign.draw('LIVING WORKS',c.gallery);back.draw(c.back);plates.forEach((p,i)=>p.draw(projectRooms[i]!.title,projectRooms[i]!.id==='sunlit-tales'?({de:'Lesegarten · Fragmente entdecken',ru:'Сад чтения · откройте фрагменты'}[locale]||'Reading garden · discover fragments'):projectRooms[i]!.status==='active'?c.action:c.reserved));headline.draw('OpenMe',c.intro);inboxLabel.draw(c.inbox,received?c.received+' · '+c.endpoints[selected]:c.demo);info.draw('Profile / OpenMe',c.details);exit.draw(c.back);stations.forEach((s,i)=>{s.l.draw(c.endpoints[i]!,i===selected?c.inbox:'0'+(i+1)+' / OpenMe');s.reverse.draw(c.endpoints[i]!,'0'+(i+1)+' / OpenMe');});}
 text();
 return {get received(){return received;},get routing(){return progress<1;},setLocale(value:string){locale=value;text();},select(index:number,route=false){if(index<0||index>=stations.length)return;selected=index;progress=route?0:1;received=false;packet.visible=route;packetLight.visible=route;stations.forEach((s,i)=>{s.glow.color.set(i===index?'#7dffb0':'#2a6b4a');s.route.color.set(i===index?'#7dffb0':'#2a6b4a');});text();},update(dt:number,reduced:boolean){elapsed+=dt;if(!reduced){shell.rotation.y=elapsed*.4;shell.rotation.x=elapsed*.2;orb.scale.setScalar(1+Math.sin(elapsed*2)*.06);coreLight.intensity=65+Math.sin(elapsed*2)*8;}
 if(progress<1){const start=stations[selected]!.pos,mid=center.clone().setY(.3),end=destination.clone().setY(.3),first=start.distanceTo(mid),total=first+mid.distanceTo(end);progress=reduced?1:Math.min(1,progress+dt*4.2/total);const d=progress*total;if(d<first)packet.position.lerpVectors(start,mid,d/first);else packet.position.lerpVectors(mid,end,(d-first)/(total-first));packetLight.position.copy(packet.position);if(progress===1){packet.visible=packetLight.visible=false;received=true;inbox.material=mint;inboxLight.intensity=65;text();}}else{inboxLight.intensity=Math.max(25,inboxLight.intensity-dt*15);}return !reduced||progress<1;},setTheme(dark:boolean){stone.color.set(dark?'#344b48':'#c9cebf');floor.color.set(dark?'#263b35':'#7d8c85');},dispose(){root.removeFromParent();for(const mesh of owned){const i=solids.indexOf(mesh);if(i>=0)solids.splice(i,1);}geometry.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
