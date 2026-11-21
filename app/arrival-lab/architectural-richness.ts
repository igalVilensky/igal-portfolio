import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
/** Authored ornaments and view gardens; no collision or movement ownership. */
export function createArchitecturalRichness(scene:T.Scene){
 const root=new T.Group();root.name='Arrival · suspended lanterns and stone guardians';scene.add(root);
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>();
 const mat=(color:string,metalness=0,glow=0)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness:metalness?.35:.82,emissive:color,emissiveIntensity:glow});ms.add(m);return m;};
 const brass=mat('#816849',.75),stone=mat('#b9b5a8'),ivory=mat('#ffe5b0',0,1),leaf=mat('#597c65'),bark=mat('#655447'),fabric=mat('#b78b73'),blind=mat('#bec7bd'),flower=mat('#ca957f');
 const sphere=new T.SphereGeometry(1,16,12),cube=new T.BoxGeometry(1,1,1);gs.add(sphere);gs.add(cube);
 function add(g:T.BufferGeometry,m:T.Material,p:T.Object3D,x:number,y:number,z:number,sx=1,sy=sx,sz=sx){gs.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);p.add(o);return o;}
 function beam(p:T.Object3D,a:T.Vector3,b:T.Vector3,r:number,m:T.Material){const o=add(new T.CylinderGeometry(r,r,a.distanceTo(b),8),m,p,0,0,0);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());return o;}
 const lamps:T.PointLight[]=[];
 // Pendant lantern crowns: faceted metal galleries, bowed load-bearing arms, cut glass blades.
 for(const [z,scale] of [[-8,1],[-39,1.35],[-61,.85]]){
 const crown=new T.Group();crown.position.set(0,25,z!);crown.scale.setScalar(scale!);root.add(crown);
 beam(crown,new T.Vector3(0,2,0),new T.Vector3(0,(43-25)/scale!,0),.08,brass);
 add(new T.CylinderGeometry(.4,.8,2,8),brass,crown,0,2,0);
 for(const y of [-1.5,.3]){const rim=add(new T.TorusGeometry(4.3,.10,6,8),brass,crown,0,y,0);rim.rotation.x=Math.PI/2;}
 for(let i=0;i<8;i++){const a=i*Math.PI/4,x=Math.cos(a)*4.3,zz=Math.sin(a)*4.3;
 const curve=new T.CatmullRomCurve3([new T.Vector3(0,3,0),new T.Vector3(x*.6,1.3,zz*.6),new T.Vector3(x,-.4,zz),new T.Vector3(x*.9,-1.7,zz*.9)]);
 add(new T.TubeGeometry(curve,16,.075,6,false),brass,crown,0,0,0);
 const pane=add(new T.CylinderGeometry(.24,.13,2.2,5),ivory,crown,x,-.2,zz);pane.rotation.y=a;
 for(const side of [-1,1])beam(crown,new T.Vector3(x+Math.cos(a+side*.2)*.27,-1.3,zz+Math.sin(a+side*.2)*.27),new T.Vector3(x,.9,zz),.035,brass);
 add(new T.OctahedronGeometry(.18),ivory,crown,x*.88,-2,zz*.88);
 }
 add(new T.CylinderGeometry(.65,.1,1.7,8),brass,crown,0,-2.4,0);
 const l=new T.PointLight('#ffcf8e',150,42,1.7);l.position.set(0,23,z!);root.add(l);lamps.push(l);
 }
 // Paired lion/winged sentinel reliefs, anchored to inner wall faces at x=±24.
 for(const side of [-1,1])for(let i=0;i<3;i++){
 const g=new T.Group();g.position.set(side*23.9,18,-12-i*21);g.rotation.y=side===1?-Math.PI/2:Math.PI/2;root.add(g);
 add(cube,stone,g,0,-1.7,-.12,2.6,.5,1.3);add(cube,brass,g,0,-2,-.2,1.8,.25,.7);
 add(sphere,stone,g,0,-.2,.3,.8,1.3,.65);add(sphere,stone,g,0,1,.8,.72,.68,.65);
 // Distinct muzzle, brow, eye sockets, pointed ears and individually carved mane locks.
 for(const s of [-1,1]){add(sphere,stone,g,s*.27,.65,1.25,.33,.25,.3);add(sphere,brass,g,s*.28,1.13,1.34,.1,.075,.04);add(sphere,stone,g,s*.28,1.27,1.24,.33,.12,.13);add(new T.ConeGeometry(.18,.5,5),stone,g,s*.55,1.65,.65);const paw=add(sphere,stone,g,s*.55,-1.24,.9,.3,.24,.55);for(let t=0;t<3;t++)add(sphere,brass,paw,(t-1)*.35,-.1,.8,.08,.12,.08);}
 add(sphere,brass,g,0,.81,1.54,.16,.12,.08);add(cube,brass,g,0,.45,1.38,.45,.035,.04);
 for(let j=0;j<13;j++){const a=j/13*Math.PI*2;const lock=add(new T.ConeGeometry(.19,.7,5),stone,g,Math.sin(a)*.84,.88+Math.cos(a)*.84,.55);lock.rotation.z=-a;}
 if(i!==1)for(const s of [-1,1])for(let j=0;j<5;j++){const feather=add(sphere,stone,g,s*(.7+j*.19),.1+j*.25,-.05,.17,.8-j*.07,.22);feather.rotation.z=-s*.5;}
 }
 // East-facing domestic windows at x=103. Views stay inside the existing island ground.
 function garden(x:number,z:number){add(cube,stone,root,x,.25,z,2.8,.5,5);add(cube,bark,root,x,.53,z,2.5,.06,4.7);for(let i=0;i<5;i++){add(sphere,leaf,root,x+Math.sin(i)*.6,1,z-1.7+i*.85,.7,.65,.6);add(sphere,flower,root,x+.3,1.55,z-1.7+i*.85,.16);}beam(root,new T.Vector3(x,0,z),new T.Vector3(x,4,z),.12,bark);for(let i=0;i<4;i++)add(sphere,leaf,root,x+Math.sin(i*2)*.7,4+i*.2,z+Math.cos(i*2)*.7,1.3,.75,1);}
 for(const z of [6,19,32])garden(108,z);
 for(const x of [-54,-49])garden(x,47);
 // Gathered curtains occupy the reveals, leaving the centre of each opening unobscured.
 for(const [z,width,y,h] of [[6,3.2,2.3,2.1],[19,10,2.575,2.75],[32,3.2,2.3,2.1]]){
 for(const s of [-1,1])for(let j=0;j<5;j++){const o=add(cube,fabric,root,102.65+Math.sin(j*1.8)*.06,y!,z!+s*(width!/2-.2-j*.11),.06,h!,.14);o.rotation.x=s*.02;}
 add(cube,brass,root,102.6,y!+h!/2+.12,z!,.12,.08,width!+.4);
 }
 // Work wing panorama at z=42, x=-48.
 for(let i=0;i<3;i++)add(cube,blind,root,-48,3.65+i*.22,41.6,15.5,.11,.2);
 // Scenic islands are non-traversable distant compositions, each a distinct silhouette.
 for(let i=0;i<7;i++){const g=new T.Group();g.position.set(Math.cos(i*1.8)*520,-35-i%3*12,Math.sin(i*1.8)*600);root.add(g);const r=22+i*4;add(new T.ConeGeometry(r,r*1.6,5+i%4),stone,g,0,-r*.8,0).rotation.z=Math.PI;add(new T.CylinderGeometry(r*.94,r,.9,7+i%3),leaf,g,0,0,0);for(let j=0;j<3+i%4;j++){const x=Math.sin(j*2.4)*r*.6,z=Math.cos(j*2.4)*r*.6;add(new T.DodecahedronGeometry(1,0),stone,g,x,3,z,3,5+j,2);if(j%2===0){add(cube,bark,g,x,6,z,.5,8,.5);add(sphere,leaf,g,x,10,z,3,4,3);}}if(i%2===0){add(cube,stone,g,0,7,0,3,14,3);add(cube,ivory,g,0,13,1.6,1,.7,.12);}}
 // Bake static pieces by material and spatial cell; preserve distant-island culling.
 root.updateMatrixWorld(true);
 const batches=new Map<string,{material:T.Material;pieces:T.BufferGeometry[];meshes:T.Mesh[]}>();
 root.traverse(o=>{if(!(o instanceof T.Mesh))return;const m=o.material as T.Material,p=new T.Vector3();o.getWorldPosition(p);const key=m.uuid+':'+Math.floor(p.x/80)+':'+Math.floor(p.z/80);let b=batches.get(key);if(!b){b={material:m,pieces:[],meshes:[]};batches.set(key,b);}b.pieces.push((o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone()).applyMatrix4(o.matrixWorld));b.meshes.push(o);});
 const baked:T.BufferGeometry[]=[];
 for(const b of batches.values()){const g=mergeGeometries(b.pieces);b.pieces.forEach(p=>p.dispose());if(g){b.meshes.forEach(m=>m.removeFromParent());root.add(new T.Mesh(g,b.material));baked.push(g);}}
 // Original resources remain registered for cleanup; only baked meshes render.
 baked.forEach(g=>gs.add(g));
 return {update(night:number){lamps.forEach(l=>l.intensity=110+night*130);ivory.emissiveIntensity=.65+night*.7;},dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
