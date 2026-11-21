import * as T from 'three';
export type EncounterState='idle'|'noticing'|'ready'|'listening'|'thinking'|'responding'|'returning';
/** Compact Journey rest bay and one stationary portfolio representative in AI & Tools. */
export function createIntelligence(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='Journey rest bay and Ask Igal';scene.add(root);
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>();
 const stone=new T.MeshStandardMaterial({color:'#293438',roughness:.85});
 const shell=new T.MeshStandardMaterial({color:'#7b8985',metalness:.35,roughness:.6});
 const ivory=new T.MeshStandardMaterial({color:'#d2c4a6',roughness:.7});
 const glow=new T.MeshStandardMaterial({color:'#b6dccf',emissive:'#b6dccf',emissiveIntensity:.4});
 [stone,shell,ivory,glow].forEach(m=>ms.add(m));
 function mesh(g:T.BufferGeometry,m:T.Material,parent:T.Object3D=root,solid=false){gs.add(g);const o=new T.Mesh(g,m);parent.add(o);o.userData={room:'intelligence-chamber',noCollision:!solid};solids.push(o);return o;}
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=stone,parent:T.Object3D=root,solid=true){const o=mesh(new T.BoxGeometry(w,h,d),m,parent,solid);o.position.set(x,y,z);return o;}
 // Retain the Journey opening; reclaim the unused forty-metre agent hall as a ten-metre bay.
 box(22,1,10,-99,-.5,3);box(.8,7,10,-110,3.5,3);box(.8,7,10,-88,3.5,3);
 box(22,7,.8,-99,3.5,-2);box(22,.5,10,-99,7,3);
 box(15,7,.7,-102.5,3.5,8);box(1,7,.7,-88.5,3.5,8);
 box(6,.5,.7,-92,7,8);box(10,.5,1.3,-103,.4,0,shell);
 // A human-scale meeting alcove faces the existing AI & Tools entrance.
 box(7,.12,5,-48,.06,36,shell);
 box(2.4,.35,1.6,-48,.55,37,ivory);box(2.4,1.8,.3,-48,1.4,37.7,shell);
 box(3.5,.18,1.2,-48,.8,34,ivory);for(const x of [-49.3,-46.7])box(.15,.8,.8,x,.4,34,shell);
 for(const x of [-52,-44]){box(.18,4.8,.3,x,2.4,38,shell);box(.05,4.3,.04,x,2.4,37.82,glow,root,false);}
 box(8.2,.18,.3,-48,4.8,38,shell);
 const person=new T.Group();person.position.set(-48,0,37);person.rotation.y=Math.PI;root.add(person);
 const body=new T.Group();person.add(body);
 const torso=mesh(new T.CylinderGeometry(.35,.45,.85,8),shell,body);torso.position.y=1.25;
 const head=new T.Group();head.position.y=2.05;body.add(head);
 const face=mesh(new T.IcosahedronGeometry(.29,1),ivory,head);face.scale.set(.85,1.1,.85);
 for(const side of [-1,1]){
  box(.22,.25,.8,side*.25,.65,.3,shell,body,false);
  box(.2,.65,.22,side*.25,.3,.6,shell,body,false);
  const arm=box(.16,.65,.19,side*.48,1.12,.13,shell,body,false);arm.rotation.x=-.3;
 }
 box(.32,.035,.04,0,0,.25,glow,head,false).userData.entity='ask-igal';
 const targetMat=new T.MeshBasicMaterial({visible:false});ms.add(targetMat);
 const target=mesh(new T.BoxGeometry(1.6,2.6,1.4),targetMat,person);target.position.y=1.3;target.userData.entity='ask-igal';
 const light=new T.PointLight('#c6dfd4',55,16,1.5);light.position.set(-48,4,35);root.add(light);
 const bayLight=new T.PointLight('#e0c99f',35,20,1.5);bayLight.position.set(-99,5,3);root.add(bayLight);
 const entity={spec:{id:'ask-igal',height:2.3},person};
 return {root,entities:[entity],
 update(now:number,dt:number,reduced:boolean,player:T.Vector3,active:string|null,phase:EncounterState){
  const near=player.distanceTo(person.position)<8,engaged=active==='ask-igal';
  const yaw=near||engaged?Math.atan2(player.x+48,player.z-37):Math.PI;
  person.rotation.y+=Math.atan2(Math.sin(yaw-person.rotation.y),Math.cos(yaw-person.rotation.y))*(1-Math.exp(-dt*3));
  head.rotation.z=reduced?0:engaged&&phase==='responding'?Math.sin(now*.002)*.035:near?.035:0;
  glow.emissiveIntensity=T.MathUtils.damp(glow.emissiveIntensity,engaged?.9:near?.65:.3,5,dt);
  return near;
 },dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
