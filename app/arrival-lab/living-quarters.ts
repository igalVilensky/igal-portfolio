import * as T from 'three';

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
  // Private bytes are fetched only in development; never imported into Vite.
  const z=outer+(north?.3:-.3),rotation=north?0:Math.PI;
  const frame=new T.Group();frame.name=`Portrait · ${r.id}`;frame.position.set(r.x,2.35,z);frame.rotation.y=rotation;root.add(frame);
  const add=(w:number,h:number,d:number,x:number,y:number,zz:number,material:T.Material)=>{const g=new T.BoxGeometry(w,h,d);geometry.push(g);const mesh=new T.Mesh(g,material);mesh.position.set(x,y,zz);frame.add(mesh);return mesh;};
  add(2.3,2.9,.14,0,0,0,oak);add(2.14,2.74,.04,0,0,.09,bronze);
  add(2.04,2.64,.035,0,0,.12,stone);
  const name=r.id[0]!.toUpperCase()+r.id.slice(1);
  const status={id:r.id,frame,kind:'unpublished' as 'unpublished'|'local-photograph'|'unavailable'};
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
  // Slim shelf and low upholstered seat sit outside the central walking path.
  box(2.6,.1,.38,r.x,.62,z+(north?.27:-.27),oak,false);
  box(2.2,.4,1,r.x+r.width/2-2,.2,r.z,oak);
  box(2.12,.12,.94,r.x+r.width/2-2,.46,r.z,m);
  const l=new T.PointLight('#ffe8c6',28,14,1.5);l.position.set(r.x,3.8,r.z);root.add(l);lights.push(l);
  if(import.meta.dev){
   new T.TextureLoader().load('/api/dev-family-portrait?id='+r.id,texture=>{
    if(disposed){texture.dispose();return;}texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;textures.push(texture);
    const ratio=texture.image.width/texture.image.height,h=Math.min(2.3,1.7/ratio),w=h*ratio;
    const g=new T.PlaneGeometry(w,h);geometry.push(g);const photoMaterial=new T.MeshBasicMaterial({map:texture,toneMapped:false});materials.push(photoMaterial);
    const portrait=new T.Mesh(g,photoMaterial);portrait.name=`${name} · local photograph`;portrait.position.z=.15;frame.add(portrait);status.kind='local-photograph';
   },undefined,()=>{status.kind='unavailable';});
  }
  return status;
 });
 return {root,portraits,setTheme(dark:boolean){stone.color.set(dark?'#70685e':'#e4d8c5');floor.color.set(dark?'#675d50':'#c9baa0');lights.forEach(l=>l.intensity=dark?40:55);},dispose(){disposed=true;textures.forEach(t=>t.dispose());root.removeFromParent();geometry.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
