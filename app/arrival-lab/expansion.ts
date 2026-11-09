import * as T from 'three';
import { expansionSpaces } from './spaces';
/** Static architecture shares the existing scene, loop, collision owner and lifecycle. */
export function createExpansion(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='west-expansion';scene.add(root);
 const geometries=new Map<string,T.BoxGeometry>(),materials:T.MeshStandardMaterial[]=[];
 const material=(color:string)=>{const m=new T.MeshStandardMaterial({color,roughness:.78});materials.push(m);return m;};
 const stone=material('#c5bca9'),bronze=material('#8c7652');
 const accents=['#c3a264','#baad9a','#829ca5','#9da88d'].map(material);
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=stone,room='gallery'){
 const key=[w,h,d].join(',');let g=geometries.get(key);if(!g){g=new T.BoxGeometry(w,h,d);geometries.set(key,g);}
 const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.receiveShadow=true;mesh.castShadow=true;mesh.userData.room=room;root.add(mesh);solids.push(mesh);return mesh;
 }
 // Gallery sides are precisely replaced by room thresholds below.
 box(.5,1,6,-25.75,-.5,19); // Meet the existing slab edge at x=-25.5.
 box(34,1,6,-43,-.5,19);box(34,.6,6,-43,7.3,19);
 // z=16: opening x=-51..-45. z=22 also contains the Commons opening.
 for(const [a,b] of [[-60,-51],[-45,-26]])box(b!-a!,7,.6,(a!+b!)/2,3.5,16,bronze);
 for(const [a,b] of [[-60,-51],[-45,-35],[-29,-26]])box(b!-a!,7,.6,(a!+b!)/2,3.5,22,bronze);
 box(34,.03,.16,-43,.02,19,bronze);
 const labels:{canvas:HTMLCanvasElement;ctx:CanvasRenderingContext2D;texture:T.CanvasTexture;labelMaterial:T.MeshBasicMaterial;g:T.PlaneGeometry;s:typeof expansionSpaces[number]}[]=[];
 const lights:T.PointLight[]=[];
 function wallBetween(ax:number,az:number,bx:number,bz:number,height:number,m:T.Material,room:string){
 const length=Math.hypot(bx-ax,bz-az),mesh=box(.65,height,length,(ax+bx)/2,height/2,(az+bz)/2,m,room);
 mesh.rotation.y=Math.atan2(bx-ax,bz-az);return mesh;
 }
 expansionSpaces.forEach((s,i)=>{
 const [x0,x1,z0,z1]=s.bounds,w=x1-x0,d=z1-z0,cx=(x0+x1)/2,cz=(z0+z1)/2,h=s.height,m=accents[i]!;
 box(w,1,d,cx,-.5,cz,m,s.id);
 // Shared gallery boundary is omitted; its split walls are authoritative.
 if(s.id==='journey'){
 box(.7,h,d,x0,h/2,cz,m,s.id);
 // Experiments and AI own the lower shared walls. Retain Journey's taller enclosure above them.
 box(.7,h-14,8,x1,14+(h-14)/2,12,m,s.id);box(.7,h-9,8,x1,9+(h-9)/2,26,m,s.id);
 box(w,h,.7,cx,h/2,z0,m,s.id);box(w,h,.7,cx,h/2,z1,m,s.id);
 // Broad rising roof leaves an expansive west-facing focal wall.
 for(let n=0;n<6;n++){const roof=box(6.05,.65,d,x0+3+n*6,15-n*.55,cz,stone,s.id);roof.rotation.z=-.09;}
 box(.6,8,12,x0+1,4,cz,stone,s.id);
 // Deep perimeter bearings articulate the long wing without obstructing its floor.
 for(const x of [-89,-79,-69]){
 box(.7,12,.9,x,6,z0+.7,stone,s.id);box(.7,12,.9,x,6,z1-.7,stone,s.id);
 box(.7,.8,d,x,12.2,cz,bronze,s.id);
 }
 box(.9,.5,14,x0+1.1,8.3,cz,bronze,s.id);
 }else{
 // AI owns the x=-38 partition shared with Commons.
 if(s.id!=='commons')box(.7,h,d,x0,h/2,cz,m,s.id);
 box(.7,h,d,x1,h/2,cz,m,s.id);
 const end=s.id==='experiments'?z0:z1;box(w,h,.7,cx,h/2,end,m,s.id);
 if(s.id==='experiments'){
 // Offset folded roof: low entry, rising north bay. The orbital toy occupies the open central bay.
 for(let n=0;n<4;n++){const roof=box(w,.65,d/4+.15,cx,10.5+n*.85,z1-d/8-n*d/4,stone,s.id);roof.rotation.x=.12;}
 // Flared shear walls compress entry, then release into the wider chamber.
 wallBetween(-51,16,-55,10,9,bronze,s.id);wallBetween(-45,16,-41,10,9,bronze,s.id);
 wallBetween(-60,-6,-54,-12,14,m,s.id);wallBetween(-44,-12,-38,-6,14,m,s.id);
 for(let n=1;n<4;n++)box(w,1.8,.3,cx,10.5+n*.85-.5,z1-n*d/4,stone,s.id);
 box(10,7,.7,cx,3.5,z0+1,bronze,s.id);box(12,.2,2,cx,.1,z0+1.4,m,s.id);
 }else{
 if(s.id==='commons'){
 // An actual open oculus gives the intimate court a distinct ceiling silhouette.
 box(4,.6,d,x0+2,h+.3,cz,stone,s.id);box(4,.6,d,x1-2,h+.3,cz,stone,s.id);
 box(4,.6,4,cx,h+.3,z0+2,stone,s.id);box(4,.6,4,cx,h+.3,z1-2,stone,s.id);
 for(const x of [cx-2,cx+2])box(.2,.8,4.3,x,h,cz,bronze,s.id);
 for(const z of [cz-2,cz+2])box(4.3,.8,.2,cx,h,z,bronze,s.id);
 }else box(w,.6,d,cx,h+.3,cz,stone,s.id);
 if(s.id==='ai-tools')for(const x of [-57,-52,-47,-42]){box(.35,.65,d,x,h-.3,cz,bronze,s.id);box(.6,h,1,x,h/2,z1-.7,bronze,s.id);}
 if(s.id==='commons'){box(8,.4,1,cx,.2,z1-1,m,s.id);box(8,.5,1,cx,5.5,z1-1,bronze,s.id);}
 }
 }
 const light=new T.PointLight(['#ffe2ac','#ffe4c8','#cce7ff','#e8f1d0'][i],i===1?80:45,55,1.3);light.position.set(cx,Math.min(h-2,9),cz);root.add(light);lights.push(light);
 // Flush, modest physical location identifier, no floating UI.
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=96;const ctx=canvas.getContext('2d')!;
 const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 const labelMaterial=new T.MeshBasicMaterial({map:texture});
 const g=new T.PlaneGeometry(3,.56);const label=new T.Mesh(g,labelMaterial);
 label.position.set(s.id==='journey'?-59.64:s.entry[0]+5,2.4,s.id==='journey'?24:s.entry[2]+(s.id==='experiments'?.32:-.32));
 label.rotation.y=s.id==='journey'?Math.PI/2:s.id==='experiments'?0:Math.PI;root.add(label);
 labels.push({canvas,ctx,texture,labelMaterial,g,s});
 });
 const galleryLight=new T.PointLight('#ffe7bf',30,40,1.3);galleryLight.position.set(-40,5,19);root.add(galleryLight);
 function setLocale(locale:string){for(const l of labels){l.ctx.fillStyle='#303b3c';l.ctx.fillRect(0,0,512,96);l.ctx.fillStyle='#eee4cc';l.ctx.font='30px monospace';l.ctx.fillText(l.s.names[locale as 'en']||l.s.names.en,20,60);l.texture.needsUpdate=true;}}
 function setTheme(dark:boolean){stone.color.set(dark?'#3d454b':'#c5bca9');bronze.color.set(dark?'#655c49':'#8c7652');accents.forEach((m,i)=>m.color.set((dark?['#65553c','#59534d','#344b59','#454f41']:['#c3a264','#baad9a','#829ca5','#9da88d'])[i]!));lights.forEach((l,i)=>l.intensity=(i===1?80:45)*(dark?.65:1));}
 setLocale('en');return {setTheme,setLocale,dispose(){root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());labels.forEach(l=>{l.texture.dispose();l.labelMaterial.dispose();l.g.dispose();});}};
}
