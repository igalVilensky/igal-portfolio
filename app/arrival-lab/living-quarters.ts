import * as T from 'three';
import { createWinterHome } from './winter-home';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

/** Metres; east of Little Explorer, separate from the professional west wing. */
export const personalRooms = [
 {id:'igal',x:70,z:6,width:10,depth:12,color:'#879a99'},
 {id:'anastasia',x:82,z:6,width:12,depth:12,color:'#b6a58c'},
 {id:'amelia',x:96,z:6,width:14,depth:12,color:'#8998a8'},
 {id:'nataniel',x:73,z:32,width:16,depth:12,color:'#9ba88c'},
 {id:'adriel',x:94,z:32,width:18,depth:12,color:'#c0a085'},
] as const;
export function createLivingQuarters(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='The Living Quarters';scene.add(root);
 const geometry:T.BufferGeometry[]=[],materials:T.Material[]=[],textures:T.Texture[]=[];let disposed=false;
 const mat=(color:string,glow=false)=>{const m=new T.MeshStandardMaterial({color,roughness:.75,emissive:glow?color:'#000000',emissiveIntensity:glow?.6:0});materials.push(m);return m;};
 const stone=mat('#e4d8c5'),oak=mat('#9b7656'),floor=mat('#c9baa0'),light=mat('#ffe0a6',true),bronze=mat('#605143');
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m=stone,solid=true){const g=new T.BoxGeometry(w,h,d);geometry.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.userData={room:'living-quarters',noCollision:!solid};mesh.receiveShadow=true;mesh.castShadow=solid;root.add(mesh);if(solid)solids.push(mesh);return mesh;}
 // A six metre real passage through the east wall of Little Explorer.
 box(5,1,6,62.5,-.5,19,floor);for(const z of [15.8,22.2])box(5,5,.4,62.5,2.5,z,oak);box(5,.3,6,62.5,5.2,19);
 box(38,1,14,84,-.5,19,floor);box(38,.3,14,84,6.2,19);
 box(.4,6,4,65,3,14);box(.4,6,4,65,3,24);box(.4,6,14,103,3,19);
 for(const [x,w,z] of [[75.5,1,12],[88.5,1,12],[83,4,26]])box(w!,5,.4,x!,2.5,z!);
 // Atrium focal point: a planted mineral basin under a luminous oculus.
 box(3,.45,2,84,.225,16,oak);box(2.6,.06,1.6,84,.48,16,mat('#68785e'));
 for(const x of [83.2,84,84.8]){box(.12,2.1,.12,x,1.5,16,bronze,false);const b=box(.9,.14,.65,x,2.45,16,mat('#9ea77c'),false);b.rotation.z=(x-84)*.3;}
 box(6,.08,4,84,6,18,light,false);
 for(const x of [78,91]){box(3,.48,1,x,.24,24,oak);box(3,.65,.2,x,.8,24.4);}
 const lights:T.PointLight[]=[];
 for(const x of [69,81,96]){const l=new T.PointLight('#ffe2b4',55,23,1.5);l.position.set(x,4.5,19);root.add(l);lights.push(l);}
 const portraits=personalRooms.map(r=>{
  const north=r.z<19,boundary=north?12:26,outer=north?0:38,m=mat(r.color);
  box(r.width,1,r.depth,r.x,-.5,r.z,floor);
  box(r.width,5,.4,r.x,2.5,outer,m);
  for(const side of [-1,1])box(.4,5,r.depth,r.x+side*r.width/2,2.5,r.z,m);
  // Wide, deep reveals; no door leaf or identifying wall text.
  for(const side of [-1,1])box((r.width-3)/2,5,.4,r.x+side*(r.width+3)/4,2.5,boundary,m);
  box(3,1.8,.4,r.x,4.1,boundary,m);box(r.width,.3,r.depth,r.x,5.2,r.z);
  box(r.width-2,.06,.15,r.x,4.7,outer+(north?.3:-.3),light,false);
  // Deep oak surround, bronze inner reveal and a warm archival mat.
  // Approved public photographs are available in development and production.
  const z=outer+(north?.3:-.3),rotation=north?0:Math.PI;
  const frame=new T.Group();frame.name=`Portrait · ${r.id}`;frame.position.set(r.x,2.35,z);frame.rotation.y=rotation;root.add(frame);
  const add=(w:number,h:number,d:number,x:number,y:number,zz:number,material:T.Material)=>{const g=new T.BoxGeometry(w,h,d);geometry.push(g);const mesh=new T.Mesh(g,material);mesh.position.set(x,y,zz);frame.add(mesh);return mesh;};
  add(2.3,2.9,.14,0,0,0,oak);add(2.14,2.74,.04,0,0,.09,bronze);
  add(2.04,2.64,.035,0,0,.12,stone);
  const name=r.id[0]!.toUpperCase()+r.id.slice(1);
  const status={id:r.id,frame,kind:'loading' as 'loading'|'photograph'|'unavailable'};
  // Printed ceramic nameplate, legible at a natural approach distance.
  add(.88,.19,.045,0,-1.64,.02,stone);
  if(typeof document!=='undefined'){
   const canvas=document.createElement('canvas');canvas.width=704;canvas.height=152;
   const ctx=canvas.getContext('2d');
   if(ctx){ctx.fillStyle='#e4d8c5';ctx.fillRect(0,0,704,152);ctx.fillStyle='#342d27';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='500 76px Georgia, serif';ctx.fillText(name,352,80);
    const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
    const labelMaterial=new T.MeshBasicMaterial({map:texture,toneMapped:false});materials.push(labelMaterial);
    const g=new T.PlaneGeometry(.84,.18);geometry.push(g);const label=new T.Mesh(g,labelMaterial);label.name=`${name} · caption`;label.position.set(0,-1.64,.047);frame.add(label);
   }
  }
  // Furniture stays in side bays, preserving the portrait axis and three-metre entrance.
  const textile=mat(r.id==='amelia'?'#536679':r.id==='adriel'?'#dfa969':r.id==='nataniel'?'#648c80':r.id==='anastasia'?'#b59078':'#455b62');
  const ivory=mat('#eee3cc'),ink=mat('#35444a'),leaf=mat('#738460');
  const round=(w:number,h:number,d:number,x:number,y:number,zz:number,m:T.Material)=>{const g=new RoundedBoxGeometry(w,h,d,2,Math.min(.12,h/3));geometry.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,zz);mesh.userData.room='living-quarters';root.add(mesh);solids.push(mesh);return mesh;};
  const leg=(x:number,zz:number,h=.72)=>box(.07,h,.07,x,h/2,zz,bronze);
  const table=(x:number,zz:number,w:number,d:number,h=.78)=>{round(w,.12,d,x,h,zz,oak);for(const dx of [-w/2+.15,w/2-.15])for(const dz of [-d/2+.15,d/2-.15])leg(x+dx,zz+dz,h-.06);};
  const rug=(x:number,zz:number,w:number,d:number)=>round(w,.025,d,x,.016,zz,textile).userData.noCollision=true;
  const bed=(x:number,zz:number,w=1.8,h=.5)=>{round(w,h,3.1,x,h/2,zz,oak);round(w-.08,.22,2.95,x,h+.1,zz,ivory);round(w-.12,.10,1.65,x,h+.24,zz+.5,textile);round(w-.35,.16,.55,x,h+.25,zz-1,ivory);round(w,.9,.13,x,.65,zz-1.55,textile);};
  const shelf=(x:number,zz:number,w=2.2)=>{for(const dx of [-w/2,w/2])box(.1,2.2,.45,x+dx,1.1,zz,oak);for(const y of [.25,1,1.8,2.2])box(w,.08,.45,x,y,zz,oak);for(let i=0;i<6;i++)box(.12,.35+(i%3)*.08,.25,x-w/2+.25+i*.22,1.24,zz, i%2?ivory:textile,false);};
  const chair=(x:number,zz:number,rotation=0)=>{const group=new T.Group();group.position.set(x,0,zz);group.rotation.y=rotation;root.add(group);const part=(w:number,h:number,d:number,xx:number,y:number,z:number,m:T.Material)=>{const o=round(w,h,d,0,0,0,m);group.add(o);o.position.set(xx,y,z);};part(1.1,.2,1,0,.38,0,textile);part(1.1,.85,.18,0,.85,.43,textile);for(const side of [-1,1]){part(.14,.5,1,side*.55,.65,0,oak);part(.09,.3,.8,side*.42,.15,0,bronze);}};
  const plant=(x:number,zz:number)=>{round(.5,.55,.5,x,.275,zz,ivory);for(const side of [-1,0,1]){const o=round(.42,.8,.17,x+side*.16,.95+Math.abs(side)*.15,zz,leaf);o.rotation.z=side*.4;}};
  const lamp=(x:number,zz:number)=>{leg(x,zz,1.7);round(.65,.32,.65,x,1.75,zz,ivory);box(.5,.025,.5,x,1.57,zz,light,false);};
  const display=(x:number,zz:number,w=1.3)=>{round(w,.85,.10,x,1.4,zz,ink);box(w-.12,.69,.015,x,1.4,zz+.06,mat('#78a7ac',true),false);box(.08,.3,.1,x,.96,zz,bronze);};
  const left=r.x-r.width/2+1.8,right=r.x+r.width/2-2;
  if(r.id==='igal'){
   table(left+1,4.2,3.8,1.25);display(left,3.9);display(left+1.5,3.7,1.5);shelf(right,1.3,2.5);table(right,8,2.5,1.4,.95);
   for(let i=0;i<3;i++){const o=round(.35,.35,.35,right-.7+i*.65,1.2,8,i%2?textile:ivory);o.rotation.y=i*.4;}
   rug(left+1,7,4,3);lamp(left-1,8);for(let i=0;i<4;i++){const o=box(.8,.65,.03,left+i*.8,2.8,1,ivory,false);o.rotation.z=(i%2-.5)*.15;for(let j=0;j<3;j++)box(.5,.025,.035,left+i*.8,2.6+j*.12,1.03,ink,false);}
  }else if(r.id==='anastasia'){
   rug(left+2,6,5.2,4.8);chair(78.3,6,-Math.PI/2);chair(84.2,6,-Math.PI/2);table(81.2,3.5,1.8,1.8,.62);
   // Abstract reflection game: original neutral grid and wooden tokens.
   box(1.3,.025,1.3,81.2,.704,3.5,ivory,false);for(let i=0;i<5;i++)for(let j=0;j<5;j++)box(.2,.015,.2,80.72+i*.24,.726,3.02+j*.24,(i+j)%2?textile:oak,false);
   shelf(right,1.1);plant(left,2);plant(right,9);lamp(77,8.5);
  }else if(r.id==='amelia'){
   bed(right,4.5,1.65);table(left+1,3,2.7,1.2);chair(92.15,7,-Math.PI/2);rug(left+1,7,3.6,3.5);shelf(right,9,2.3);lamp(left-1,9);
   round(.9,2.3,.08,left-1.1,1.5,1,bronze);box(.76,2.12,.03,left-1.1,1.5,1.06,mat('#c3d5d4',true),false);
   for(let i=0;i<3;i++){box(.7,.9,.05,r.x-1+i*.9,2.8,.65,i%2?ivory:textile,false);}
  }else if(r.id==='nataniel'){
   bed(left,34.8,1.5);table(right-1,35,2.5,1.3,.65);shelf(right,28.2,2.5);rug(r.x+1,33,4,3.5);lamp(left+1,28);
   for(let i=0;i<5;i++){const o=round(.38,.25+(i%2)*.3,.38,r.x+1+(i%3)*.55,.2,34+Math.floor(i/3)*.6,i%2?textile:oak);o.rotation.y=i*.3;}
   for(let i=0;i<3;i++){const o=box(1.3,1.1,.06,r.x-1+i*1.5,2.7,37.65,ivory,false);o.rotation.z=(i-1)*.06;box(.75,.06,.08,r.x-1+i*1.5,2.7,37.7,textile,false);}
  }else{
   bed(left,34.5,1.35,.24);rug(r.x+1,33.5,5,4);table(right,34,1.6,1.2,.42);lamp(left,28);
   for(let i=0;i<6;i++){round(.55,.55,.55,r.x+1+(i%3)*.7,.3+(i>2?.55:0),34+Math.floor(i/3)*.2,mat(['#cc885e','#7ba5a4','#d8b767'][i%3]!));}
   for(const y of [.22,.85])round(3,.12,.65,right-1,y,28,oak);for(let i=0;i<4;i++)round(.4,.35,.4,right-2+i*.6,.45,28,i%2?textile:ivory);
   for(let i=0;i<3;i++){const g=new T.CircleGeometry(.4+i*.12,24);geometry.push(g);const o=new T.Mesh(g,[textile,ivory,leaf][i]);o.position.set(r.x-1+i*1.6,2.6,37.7);o.rotation.y=Math.PI;root.add(o);}
  }
  const l=new T.PointLight('#ffe8c6',28,14,1.5);l.position.set(r.x,3.8,r.z);root.add(l);lights.push(l);
  const portraitUrl=`/arrival-lab/family/${r.id}.jpg`;
  if(typeof document!=='undefined')new T.TextureLoader().load(portraitUrl,texture=>{
    if(disposed){texture.dispose();return;}texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;textures.push(texture);
    const ratio=texture.image.width/texture.image.height,h=Math.min(2.3,1.7/ratio),w=h*ratio;
    const g=new T.PlaneGeometry(w,h);geometry.push(g);const photoMaterial=new T.MeshBasicMaterial({map:texture,toneMapped:false});materials.push(photoMaterial);
    const portrait=new T.Mesh(g,photoMaterial);portrait.name=`${name} · photograph`;portrait.position.z=.15;frame.add(portrait);status.kind='photograph';
   },undefined,error=>{
    if(disposed)return;
    status.kind='unavailable';
    console.error(`Failed to load portrait for ${name}: ${portraitUrl}`,error);
    const canvas=document.createElement('canvas');canvas.width=680;canvas.height=180;
    const ctx=canvas.getContext('2d');
    if(ctx){
     ctx.fillStyle='#742d24';ctx.fillRect(0,0,680,180);ctx.fillStyle='#ffffff';ctx.textAlign='center';ctx.font='32px sans-serif';
     ctx.fillText(`${name}: photo unavailable`,340,76);ctx.fillText('Please reload to retry',340,126);
     const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
     const material=new T.MeshBasicMaterial({map:texture,toneMapped:false});materials.push(material);
     const g=new T.PlaneGeometry(1.7,.45);geometry.push(g);
     const notice=new T.Mesh(g,material);notice.name=`${name} · portrait loading error`;notice.position.z=.15;frame.add(notice);
    }
   });
  return status;
 });
 const winter=createWinterHome(root,solids);
 return {root,portraits,winter,update:winter.update,setTheme(dark:boolean){stone.color.set(dark?'#70685e':'#e4d8c5');floor.color.set(dark?'#675d50':'#c9baa0');lights.forEach(l=>l.intensity=dark?40:55);},dispose(){disposed=true;winter.dispose();textures.forEach(t=>t.dispose());root.removeFromParent();geometry.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
