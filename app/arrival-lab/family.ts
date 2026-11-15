import * as T from 'three';
import { familyNodes, familyRoute } from './family-navigation';
import { createCollision } from './collision';
import type { CharacterVisual } from './character-assets';

/** Stable identity and navigation; visuals are loaded independently from licensed assets. */
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
 const people=familyMembers.map((spec,index)=>{
  const person=new T.Group();person.name=spec.name;person.userData={npc:spec.id,age:spec.age};person.position.set(spec.x,0,spec.z);root.add(person);
  const body=new T.Group();person.add(body);
  const geometry=new T.BoxGeometry(.62,spec.height,.42);geometries.push(geometry);
  const material=new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});materials.push(material);
  const target=new T.Mesh(geometry,material);target.position.y=spec.height/2;target.userData={npc:spec.id,noCollision:true};target.visible=typeof window==='undefined';person.add(target);solids.push(target);
  return {spec:{...spec,homeRoom:spec.id,model:'quaternius-humanoid',animationSet:'skeletal',ageCategory:spec.age<5?'toddler':spec.age<10?'child':spec.age<18?'teen':'adult',reaction:'wave',navigation:'arrival-ground-floor'},person,body,target,visual:undefined as CharacterVisual|undefined,phase:index*1.7,near:false,node:index,route:[] as number[],wait:5+index*4,reaction:0,blocked:0,cycle:0,state:'idle'};
 });
 let disposed=false,assets:Awaited<ReturnType<typeof import('./character-assets')['loadCharacterAssets']>>|undefined;
 const assetStatus={state:'loading' as 'loading'|'ready'|'error',error:''};
 const ready=typeof window==='undefined'?Promise.resolve():import('./character-assets').then(async module=>{
  assets=await module.loadCharacterAssets();
  if(disposed){assets.dispose();return;}
  for(const p of people){p.visual=assets.create(p.spec);p.body.add(p.visual.root);p.target.visible=true;}
  assetStatus.state='ready';
 }).catch(error=>{assetStatus.state='error';assetStatus.error=String(error);console.error('Family character loading failed',error);});
 const collision=createCollision(solids.filter(m=>!m.userData.npc));
 const probe=new T.Vector3(),delta=new T.Vector3();
 return {root,people,ready,assetStatus,activate(id:string){const p=people.find(p=>p.spec.id===id);if(p&&root.visible&&p.reaction<=0){p.reaction=2.4;p.state='reacting';}},update(now:number,dt:number,reduced:boolean,player:T.Vector3,enabled=true){root.visible=enabled;if(!enabled)return false;dt=Math.min(Math.max(dt,0),.2);
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
      const target=Math.atan2(delta.x,delta.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*(1-Math.exp(-dt*5));
     }
    }p.state=walking?'walking':'idle';
   }
   if(p.reaction>0){const target=Math.atan2(player.x-p.person.position.x,player.z-p.person.position.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*(1-Math.exp(-dt*4));}
   p.visual?.update(dt,walking,p.reaction>0,reduced);
  }return true;
 },dispose(){disposed=true;assets?.dispose();for(const p of people){p.visual?.mixer.stopAllAction();if(p.visual)p.visual.mixer.uncacheRoot(p.visual.mixer.getRoot());}root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
