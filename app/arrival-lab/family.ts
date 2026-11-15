import * as T from 'three';
import { familyNodes, familyRoute } from './family-navigation';
import { createCollision } from './collision';

/** Development silhouettes pending licensed rigged character assets. No photographic face textures. */
export const familyMembers=[
 {id:'igal',name:'Igal',age:41,height:1.65,x:70,z:6,hair:'#302a26',shirt:'#232a30',pants:'#455461',style:'short',skin:'#dfaf91'},
 {id:'anastasia',name:'Anastasia',age:42,height:1.65,x:82,z:6,hair:'#80603e',shirt:'#e7dfce',pants:'#30343b',style:'bun',skin:'#e6b79a'},
 {id:'amelia',name:'Amelia',age:17,height:1.65,x:96,z:6,hair:'#493326',shirt:'#b4a0b8',pants:'#344754',style:'long',skin:'#e7b6a1'},
 {id:'nataniel',name:'Nataniel',age:7,height:1.20,x:73,z:32,hair:'#ad9065',shirt:'#8c4154',pants:'#536578',style:'tousled',skin:'#f0c7ac'},
 {id:'adriel',name:'Adriel',age:3,height:1.025,x:94,z:32,hair:'#b99962',shirt:'#985359',pants:'#737e9a',style:'tousled',skin:'#f0c6ab'},
] as const;
export function createFamily(scene:T.Scene,solids:T.Mesh[]=[]){
 const root=new T.Group();root.name='Family · inhabitants';scene.add(root);
 const geometries:T.BufferGeometry[]=[],materials:T.Material[]=[];
 const sphere=new T.SphereGeometry(1,16,12),capsule=new T.CapsuleGeometry(1,1,4,12);const torsoGeometry=new T.LatheGeometry([new T.Vector2(.68,-.5),new T.Vector2(.86,-.46),new T.Vector2(.92,-.15),new T.Vector2(1,.23),new T.Vector2(.98,.38),new T.Vector2(.7,.5)],24);geometries.push(sphere,capsule,torsoGeometry);
 const material=(color:string)=>{const m=new T.MeshStandardMaterial({color,roughness:.85});materials.push(m);return m;};
 const shoe=material('#303a43'),eye=material('#33434a'),white=material('#f0e6d9');
 function ellipsoid(parent:T.Object3D,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){const o=new T.Mesh(sphere,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.castShadow=true;parent.add(o);return o;}
 const people=familyMembers.map((spec,index)=>{
  const person=new T.Group();person.name=spec.name;person.userData={npc:spec.id,age:spec.age};person.position.set(spec.x,0,spec.z);root.add(person);
  // Normalize the completed model bounds below; children have separate anatomy.
  const skin=material(spec.skin),hair=material(spec.hair),shirt=material(spec.shirt),pants=material(spec.pants);
  const body=new T.Group();person.add(body);const child=spec.age<10,headY=child?1.48:1.62,headR=child?.235:.205;
  // Softly tapered torso, separate legs and rounded shoes keep silhouettes human.
  const torso=new T.Mesh(torsoGeometry,shirt);torso.position.y=1.03;torso.scale.set(child?.20:.23,.60,.15);torso.castShadow=true;torso.userData={npc:spec.id,noCollision:true};body.add(torso);solids.push(torso);
  ellipsoid(body,shirt,0,1.3,0,child?.22:.255,.09,.15);
  for(const side of [-1,1]){
   const legPivot=new T.Group();legPivot.position.set(side*.115,.74,0);body.add(legPivot);
   const leg=new T.Mesh(capsule,pants);leg.position.set(0,-.32,0);leg.scale.set(.082,.23,.085);legPivot.add(leg);leg.castShadow=true;
   ellipsoid(legPivot,shoe,0,-.67,.055,.103,.065,.18);legPivot.name='leg';
  }
  ellipsoid(body,skin,0,1.34,0,.083,.13,.085);
  const head=new T.Group();head.position.y=headY;if(!child)head.scale.setScalar(.8);body.add(head);const face=new T.Group();face.position.z=child?.045:0;head.add(face);
  ellipsoid(head,skin,0,0,0,headR,headR*1.18,headR*.87);
  ellipsoid(head,hair,0,.13,-.035,headR*1.04,headR*.72,headR*.92);
  if(spec.style==='long')for(const side of [-1,1])ellipsoid(head,hair,side*.177,-.18,-.06,.065,.34,.12);
  if(spec.style==='bun'){ellipsoid(head,hair,0,.09,-.19,.13,.13,.11);ellipsoid(head,hair,0,.24,-.01,.17,.08,.13);}
  if(spec.style==='short')for(let i=0;i<4;i++)ellipsoid(head,hair,-.12+i*.075,.20+Math.sin(i)*.02,.025,.08,.05,.1);
  if(spec.style==='tousled')for(let i=0;i<7;i++){const tuft=ellipsoid(head,hair,Math.sin(i*2.4)*.16,.18+Math.cos(i)*.025,Math.cos(i*2.4)*.11,.085,.075,.085);tuft.rotation.z=i*.7;}
  for(const side of [-1,1]){
   ellipsoid(head,skin,side*headR,0,0,.035,.06,.035);
   ellipsoid(face,white,side*.075,.015,.165,.035,.024,.012);
   ellipsoid(face,eye,side*.075,.015,.176,.014,.017,.009);
   const brow=ellipsoid(face,hair,side*.075,.065,.16,.04,.008,.012);brow.rotation.z=-side*.08;
  }
  ellipsoid(face,skin,0,-.035,.18,.027,.04,.032);
  const smileCurve=new T.QuadraticBezierCurve3(new T.Vector3(-.06,-.095,.165),new T.Vector3(0,-.125,.19),new T.Vector3(.06,-.095,.165));
  const smileGeometry=new T.TubeGeometry(smileCurve,8,.005,4,false);geometries.push(smileGeometry);face.add(new T.Mesh(smileGeometry,material('#a66d65')));
  if(spec.id==='igal'){ellipsoid(head,hair,0,-.15,.082,.15,.065,.095);ellipsoid(head,skin,0,-.11,.154,.085,.03,.025);}
  if(spec.id==='anastasia'){
   ellipsoid(body,eye,0,1.06,.15,.1,.26,.015);
   for(const side of [-1,1]){const lapel=ellipsoid(body,white,side*.105,1.23,.142,.045,.15,.025);lapel.rotation.z=side*.35;ellipsoid(head,material('#c6aa71'),side*.21,-.065,.01,.016,.025,.015);}
  }
  if(spec.id==='nataniel')for(let i=0;i<5;i++)ellipsoid(body,white,0,.82+i*.09,.135,.215,.019,.02);
  const arms=[-1,1].map(side=>{const pivot=new T.Group();pivot.position.set(side*.29,1.2,0);body.add(pivot);
   ellipsoid(pivot,shirt,0,-.14,0,.075,.18,.08);ellipsoid(pivot,skin,0,-.34,.015,.062,.13,.065);ellipsoid(pivot,skin,0,-.46,.02,.064,.072,.055);pivot.rotation.z=side*.09;return pivot;});
  // Age-specific torso/limb silhouette, followed by exact metre calibration.
  if(spec.age===3){body.scale.set(1.08,.88,1.05);head.scale.setScalar(1.06);}
  person.updateMatrixWorld(true);const bounds=new T.Box3().setFromObject(person);
  const modelHeight=bounds.max.y-bounds.min.y,scale=spec.height/modelHeight;person.scale.setScalar(scale);body.position.y=-bounds.min.y;
  const targetGeometry=new T.BoxGeometry(.62,modelHeight,.42);geometries.push(targetGeometry);
  const targetMaterial=new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});materials.push(targetMaterial);
  const target=new T.Mesh(targetGeometry,targetMaterial);target.position.y=modelHeight/2;target.userData={npc:spec.id,noCollision:true};person.add(target);solids.push(target);
  return {spec:{...spec,homeRoom:spec.id,model:'development-silhouette',animationSet:'procedural',ageCategory:spec.age<5?'toddler':spec.age<10?'child':spec.age<18?'teen':'adult',reaction:'wave',navigation:'arrival-ground-floor'},person,body,head,arms,legs:body.children.filter(o=>o.name==='leg'),phase:index*1.7,near:false,node:index,route:[] as number[],wait:5+index*4,reaction:0,blocked:0,cycle:0,state:'idle',baseY:body.position.y};
 });
 const collision=createCollision(solids.filter(m=>!m.userData.npc));
 const probe=new T.Vector3(),delta=new T.Vector3();
 return {root,people,activate(id:string){const p=people.find(p=>p.spec.id===id);if(p&&root.visible&&p.reaction<=0){p.reaction=2.4;p.state='reacting';}},update(now:number,dt:number,reduced:boolean,player:T.Vector3,enabled=true){root.visible=enabled;if(!enabled)return false;dt=Math.min(dt,.05);const t=now/1000;
  for(const p of people){
   const distance=p.person.position.distanceTo(player);p.near=distance<3.5&&player.y<4;
   let walking=false;
   if(p.reaction>0){p.reaction=Math.max(0,p.reaction-dt);p.state='reacting';}
   else if(p.wait>0){p.wait-=dt;p.state='pausing';}
   else {
    if(!p.route.length){const destinations=[0,1,2,3,4,5,6,7,8,9,16];let target=destinations[(p.cycle++*3+people.indexOf(p)*2)%destinations.length]!;if(target===p.node)target=(target+1)%5;p.route=familyRoute(p.node,target);}
    const next=p.route[0];if(next!==undefined){const [x,z]=familyNodes[next]!;delta.set(x-p.person.position.x,0,z-p.person.position.z);const distance=delta.length();
     if(distance<.07){p.person.position.set(x,0,z);p.node=next;p.route.shift();p.blocked=0;if(!p.route.length)p.wait=7+people.indexOf(p)*2;}
     else {delta.multiplyScalar(Math.min(distance,(p.spec.age<10?.65:.9)*dt)/distance);
      // Shared swept collision prevents wall/furniture penetration; wait and retry a blocked edge.
      probe.copy(p.person.position);probe.y=1.65;collision(probe,delta);
      if(Math.hypot(probe.x-p.person.position.x,probe.z-p.person.position.z)<.001){p.blocked+=dt;if(p.blocked>2){p.route=[p.node];p.wait=3;p.blocked=0;}}
      else {p.person.position.set(probe.x,0,probe.z);walking=true;p.blocked=0;}
      const target=Math.atan2(delta.x,delta.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*Math.min(1,dt*5);
     }
    }p.state=walking?'walking':'idle';
   }
   if(p.reaction>0){const target=Math.atan2(player.x-p.person.position.x,player.z-p.person.position.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*Math.min(1,dt*4);}
   const stride=Math.sin(t*(p.spec.age<10?7:5)+p.phase);
   p.body.position.y=p.baseY+(reduced?0:Math.sin(t*1.6+p.phase)*.004);
   p.head.rotation.z=reduced?0:Math.sin(t*.65+p.phase)*.018;
   p.legs.forEach((leg,i)=>leg.rotation.x=walking?stride*.32*(i?1:-1):0);
   p.arms.forEach((arm,i)=>{arm.rotation.x=walking?stride*.24*(i?-1:1):0;arm.rotation.z=T.MathUtils.damp(arm.rotation.z,p.reaction>0&&i===1?2.1+(reduced?0:Math.sin(t*5)*.1):(i?1:-1)*.09,5,dt);});
  }return true;
 },dispose(){root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
