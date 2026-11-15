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
 const portraits=personalRooms.map((r,i)=>{
  const north=r.z<19,boundary=north?12:26,outer=north?0:38,m=mat(r.color);
  box(r.width,1,r.depth,r.x,-.5,r.z,floor);
  box(r.width,5,.4,r.x,2.5,outer,m);
  for(const side of [-1,1])box(.4,5,r.depth,r.x+side*r.width/2,2.5,r.z,m);
  // Wide, deep reveals; no door leaf or identifying wall text.
  for(const side of [-1,1])box((r.width-3)/2,5,.4,r.x+side*(r.width+3)/4,2.5,boundary,m);
  box(3,1.8,.4,r.x,4.1,boundary,m);box(r.width,.3,r.depth,r.x,5.2,r.z);
  box(r.width-2,.06,.15,r.x,4.7,outer+(north?.3:-.3),light,false);
  // Production-safe non-identifying artwork. No private file is imported or served.
  const z=outer+(north?.3:-.3),rotation=north?0:Math.PI;
  const frame=new T.Group();frame.position.set(r.x,2.35,z);frame.rotation.y=rotation;root.add(frame);
  const add=(w:number,h:number,d:number,x:number,y:number,zz:number,material:T.Material)=>{const g=new T.BoxGeometry(w,h,d);geometry.push(g);const mesh=new T.Mesh(g,material);mesh.position.set(x,y,zz);frame.add(mesh);return mesh;};
  add(2.2,2.8,.12,0,0,0,oak);add(2,2.6,.03,0,0,.08,stone);
  add(1.7,2.3,.025,0,0,.105,m);add(1.2,.65,.03,0,-.65,.13,bronze);add(.5,.5,.03,.22,.52,.13,light);
  box(2.2,.4,1,r.x+r.width/2-2,.2,r.z,oak);
  const l=new T.PointLight('#ffe8c6',28,14,1.5);l.position.set(r.x,3.8,r.z);root.add(l);lights.push(l);
  if(import.meta.dev && new URLSearchParams(location.search).get('privatePortraits')==='1'){
   new T.TextureLoader().load('/api/dev-family-portrait?id='+r.id,texture=>{
    if(disposed){texture.dispose();return;}texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
    const ratio=texture.image.width/texture.image.height,h=Math.min(2.3,1.7/ratio),w=h*ratio;
    const g=new T.PlaneGeometry(w,h);geometry.push(g);const m=new T.MeshBasicMaterial({map:texture});materials.push(m);
    const portrait=new T.Mesh(g,m);portrait.position.z=.16;frame.add(portrait);
   },undefined,()=>{/* Keep the designed public fallback when opt-in is unavailable. */});
  }
  return {id:r.id,frame,kind:'privacy-safe-artwork' as const};
 });
 return {root,portraits,setTheme(dark:boolean){stone.color.set(dark?'#70685e':'#e4d8c5');floor.color.set(dark?'#675d50':'#c9baa0');lights.forEach(l=>l.intensity=dark?40:55);},dispose(){disposed=true;textures.forEach(t=>t.dispose());root.removeFromParent();geometry.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
