import * as T from 'three';

/** A shared studio kit. Entries remain real openings in the existing room shells. */
export function createWorkWing(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='Work Wing · studio spine';scene.add(root);
 const geometries:T.BufferGeometry[]=[],materials:T.Material[]=[],textures:T.Texture[]=[];
 const mat=(color:string,metalness=0,emissive?:string)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness:.52,emissive:emissive||'#000000',emissiveIntensity:.6});materials.push(m);return m;};
 const ink=mat('#263c47',.55),oak=mat('#b59b73'),stone=mat('#e0ddd1'),sage=mat('#879a84'),light=mat('#a4e4df',.2,'#5dccc6'),screen=mat('#20495b',.2,'#28596c');
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=ink,solid=true,parent:T.Object3D=root){const g=new T.BoxGeometry(w,h,d);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.room='work-wing';mesh.userData.noCollision=!solid;parent.add(mesh);if(solid)solids.push(mesh);return mesh;}
 function sign(text:string,x:number,y:number,z:number,rotation=0,w=5){const c=document.createElement('canvas');c.width=1024;c.height=160;const ctx=c.getContext('2d')!;ctx.fillStyle='#263c47';ctx.fillRect(0,0,1024,160);ctx.fillStyle='#d8e7d9';ctx.font='42px sans-serif';ctx.fillText(text,40,98);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;textures.push(t);const m=new T.MeshBasicMaterial({map:t});materials.push(m);const g=new T.PlaneGeometry(w,w*160/1024);geometries.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.rotation.y=rotation;root.add(o);}
 // Low joinery, acoustic bands and a continuous light line unite the corridor.
 for(const z of [16.36,21.64])for(const [x,w] of [[-55.5,8],[-40,8],[-27.5,2]]){
  box(w!,1.05,.12,x!,.6,z,oak,false);box(w!,.055,.12,x!,3.9,z,light,false);
 }
 for(const x of [-30,-39,-57]){box(.08,.04,5,x,.025,19,light,false);box(.12,.12,4.7,x,5.8,19,ink,false);}
 sign('WORK WING  /  STUDIO 09',-26.15,4.5,19,Math.PI/2,4.7);
 sign('JOURNEY  /  ROOF ↑',-59.5,4.6,19,Math.PI/2,4.6);
 const entries=[{x:-48,z:16,rotation:0,width:6,tint:light},{x:-48,z:22,rotation:Math.PI,width:6,tint:light},{x:-32,z:22,rotation:Math.PI,width:6,tint:sage},{x:-60,z:19,rotation:Math.PI/2,width:6,tint:oak}];
 const doors=entries.map((e,index)=>{
  const frame=new T.Group();frame.position.set(e.x,0,e.z);frame.rotation.y=e.rotation;root.add(frame);
  for(const side of [-1,1]){
   box(.28,4.8,.55,side*(e.width/2-.16),2.4,0,ink,false,frame);
   box(.065,3.6,.57,side*(e.width/2-.34),2.2,0,e.tint,false,frame);
   const shoulder=box(.9,.3,.65,side*(e.width/2-.4),4.5,0,oak,false,frame);shoulder.rotation.z=-side*.5;
  }
  box(e.width-.8,.22,.55,0,4.8,0,ink,false,frame);
  box(e.width-.85,.055,.58,0,4.63,0,e.tint,false,frame);
  const leaves=[-1,1].map(side=>{const leaf=new T.Group();frame.add(leaf);for(let i=0;i<3;i++){
   box(e.width/2-.5,1.23,.14,0,.7+i*1.3,0,index===2?sage:ink,false,leaf);
   box(e.width/2-.65,.025,.17,0,1.22+i*1.3,.01,e.tint,false,leaf);
  }return {leaf,side};});
  return {...e,leaves,progress:0};
 });
 function table(x:number,z:number,w=4,d=1.8){box(w,.15,d,x,.85,z,oak);for(const sx of [-1,1])box(.12,.8,d-.3,x+sx*(w/2-.25),.4,z,ink);}
 function display(x:number,z:number){box(1.2,.75,.09,x,1.42,z,screen);box(.08,.32,.12,x,.99,z,ink);for(let i=0;i<4;i++)box(.65-i*.1,.025,.012,x-.12,1.6-i*.12,z-.052,light,false);}
 // Tools: collaborative work benches, screens and a restrained project pin wall.
 for(const x of [-55,-42]){table(x,31,3.6);display(x,31.35);box(1,.12,1,x,.48,29.4,sage);box(1,1,.15,x,1,28.95,sage);}
 box(8,2.6,.12,-49,2.5,41.55,ink);
 for(let i=0;i<4;i++){box(1.6,1.25,.07,-52+i*2,2.65,41.45,screen,false);box(1.2,.035,.08,-52+i*2,2.3,41.39,light,false);}
 // Commons: a social table and upholstered bench, leaving its through-route clear.
 table(-32,30,3.3,1.5);box(4,.42,.95,-32,.45,32.5,sage);box(4,.8,.2,-32,1.05,32.9,sage);
 box(.28,.3,.28,-31.5,1.08,30,stone);box(.28,.3,.28,-32.4,1.08,30,stone);
 // Experiments: a standing prototype bench beside, never inside, the sculpture bay.
 table(-57,2,3,2);for(let i=0;i<3;i++)box(.4,.35+i*.12,.4,-58+i*.7,1.08+i*.06,2,light,false);
 box(.12,2,5,-59.5,2,3,ink);for(let i=0;i<5;i++)box(.15,.06,3,-59.4,1.3+i*.35,3,oak,false);
 // Journey doubles as a quiet project library and the architectural stair hall.
 table(-90,25,4);box(5,2.8,.5,-90,1.4,29.3,ink);for(let i=0;i<12;i++)box(.22,1.1,.35,-92+i*.35,1.9,28.95,i%2?oak:stone,false);
 sign('ROOF TERRACE  ↑',-64,2.6,11.5,0,4);
 function update(dt:number,p:T.Vector3,reduced:boolean){let changed=false;for(const d of doors){const target=Math.hypot(p.x-d.x,p.z-d.z)<10?1:0;const next=reduced?target:T.MathUtils.damp(d.progress,target,5,dt);if(Math.abs(next-d.progress)>.0001)changed=true;d.progress=next;for(const {leaf,side} of d.leaves)leaf.position.x=side*(d.width/4-.1+d.progress*(d.width/2-.3));}return changed;}
 return {root,update,setTheme(dark:boolean){stone.color.set(dark?'#82938e':'#e0ddd1');light.emissiveIntensity=dark?1:.6;},dispose(){root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
