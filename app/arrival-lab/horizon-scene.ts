import * as T from 'three';
import {createSkyWeaver} from './sky-weaver';
import {horizonBoundary,horizonCenter} from './star-geography';
import {horizonTerminals,createHorizonTransit} from './horizon-transit';
import {horizonCopy,horizonLanguage} from './horizon-copy';
/** All assets belong to this group; no new renderer, shadow lights, RAF or global listeners. */
export function createHorizonScene(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='Far Horizons';scene.add(root);
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>(),textures:T.Texture[]=[];
 const transit=createHorizonTransit();let disposed=false;
 const mat=(color:string,extra:T.MeshStandardMaterialParameters={})=>{const m=new T.MeshStandardMaterial({color,roughness:.7,...extra});ms.add(m);return m;};
 const stone=mat('#d9d6c5'),dark=mat('#384f5b'),brass=mat('#aa9165',{metalness:.55}),glass=mat('#a8ced5',{transparent:true,opacity:.18,roughness:.15,depthWrite:false,side:T.DoubleSide});
 function add(g:T.BufferGeometry,m:T.Material,p:T.Object3D=root,solid=false){gs.add(g);const mesh=new T.Mesh(g,m);p.add(mesh);mesh.receiveShadow=true;mesh.userData={room:'horizon',noCollision:!solid};solids.push(mesh);return mesh;}
 const cube=new T.BoxGeometry(1,1,1);gs.add(cube);
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m=stone,p:T.Object3D=root,solid=false){const o=add(cube,m,p,solid);o.scale.set(w,h,d);o.position.set(x,y,z);return o;}
 function slab(scale:number,top:number,depth:number,m:T.Material){const shape=new T.Shape(horizonBoundary.map(([x,z])=>new T.Vector2(horizonCenter.x+(x-horizonCenter.x)*scale,horizonCenter.z+(z-horizonCenter.z)*scale)));const g=new T.ExtrudeGeometry(shape,{depth,bevelEnabled:false});g.rotateX(Math.PI/2);const o=add(g,m);o.position.y=top;return o;}
 slab(1,0,9,stone);slab(.94,-9,12,dark);slab(.65,-21,10,stone);
 horizonBoundary.forEach((a,i)=>{const b=horizonBoundary[(i+1)%horizonBoundary.length]!,o=box(Math.hypot(b[0]-a[0],b[1]-a[1]),1,.35,(a[0]+b[0])/2,.5,(a[1]+b[1])/2,brass,root,true);o.rotation.y=-Math.atan2(b[1]-a[1],b[0]-a[0]);o.userData.safetyBarrier=true;});
 // Covered arrival pavilion and a connected observation promenade.
 for(const x of [923,937])for(const z of [-727,-713])box(.6,6,.6,x,3,z,dark,root,true);
 // Open central launch slot: the capsule never passes through a terminal roof.
 for(const x of [922,938]){box(3,.65,17,x,6.3,-720,stone);box(3.5,.18,19,x,6.7,-720,brass);}
 box(5,.035,30,948,.02,-720,brass);box(27,.035,5,942,.02,-710,brass);
 // Tilted sight-ring and sheltered seating give the outpost an observation identity.
 const weaver=createSkyWeaver(root,solids);
 for(const x of [945,958]){box(7,.5,2,x,.65,-700,stone,root,true);box(7,1,.35,x,1.25,-699,dark,root,true);}
 const observer=box(1.5,1.1,1.5,942,.55,-701,brass,root,true);observer.userData.horizon='observe';
 const signs:{canvas:HTMLCanvasElement;texture:T.CanvasTexture;station:number}[]=[];
 function sign(parent:T.Object3D,x:number,y:number,z:number,station:number){const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=256;const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);const material=mat('#ffffff',{map:texture});const o=box(8,2,.12,x,y,z,material,parent);signs.push({canvas,texture,station});return o;}
 for(let i=0;i<2;i++){const p=horizonTerminals[i]!;box(12,.08,12,p.x,.04,p.z,stone);if(i===0){for(const x of [-6,6])box(.5,5,.5,x,2.5,p.z+4,dark,root,true);for(const x of [-5,5])box(3,.4,10,x,5.2,p.z,stone);}sign(root,p.x,3.8,p.z+4.5,i);}
 sign(root,954,4,-696,2).rotation.y=Math.PI;
 function capsule(parent:T.Object3D){const g=new T.Group();g.name='Horizon capsule';parent.add(g);box(3.4,.3,5,0,-.12,0,dark,g);box(3.4,.25,5,0,3,0,stone,g);box(2.8,.35,1,0,.35,1.7,brass,g);for(const x of [-1.65,1.65]){box(.12,3,.12,x,1.45,-2.4,brass,g);box(.12,3,.12,x,1.45,2.4,brass,g);box(.04,2.6,4.7,x,1.5,0,glass,g);}box(3.2,2.6,.04,0,1.5,-2.45,glass,g);g.traverse(o=>{if(o instanceof T.Mesh)o.userData.horizonVehicle=true;});return g;}
 const parked=horizonTerminals.map((p,i)=>{const g=capsule(root);g.position.copy(p);g.traverse(o=>{if(o instanceof T.Mesh)o.userData.horizon=String(i);});return g;});
 const vehicle=capsule(root);vehicle.visible=false;
 // A slim magnetic spine follows the identical curve used for passenger motion.
 const guide=add(new T.TubeGeometry(transit.route,320,.14,5,false),dark);guide.position.y=-.5;
 function setLocale(locale:string){const c=horizonCopy[horizonLanguage(locale)];for(const {canvas,texture,station} of signs){const ctx=canvas.getContext('2d')!;ctx.fillStyle='#263e48';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#f1e9d5';ctx.font='bold 58px sans-serif';ctx.textAlign='center';ctx.fillText(station===2?c.star:c.express,512,95);ctx.font='38px sans-serif';ctx.fillText(station===2?c.view:station===0?c.outpost:c.return,512,175);texture.needsUpdate=true;}}
 setLocale('en');
 return {root,transit,setLocale,weaver,
 update(){const active=transit.ownsPassenger;vehicle.visible=active;parked.forEach(p=>p.visible=!active);if(active){const s=transit.sample();vehicle.position.copy(s.point);vehicle.rotation.y=Math.atan2(-s.tangent.x,-s.tangent.z);}},
 setTheme(night:boolean){stone.color.set(night?'#728493':'#d9d6c5');dark.color.set(night?'#293b4a':'#384f5b');},
 dispose(){if(disposed)return;disposed=true;weaver.dispose();transit.dispose();const owned=new Set<T.Mesh>();root.traverse(o=>{if(o instanceof T.Mesh)owned.add(o);});for(let i=solids.length-1;i>=0;i--)if(owned.has(solids[i]!))solids.splice(i,1);root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}
 };
}
