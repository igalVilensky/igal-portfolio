import { familyKnowledge } from '../../shared/family-knowledge.js';
import * as T from 'three';
import { familyNodes, familyRoute, familySpots } from './family-navigation';
import { createCollision } from './collision';
import type { CharacterVisual } from './character-assets';

/** Stable identity and navigation; visuals are loaded independently from licensed assets. */
export const familyMembers=[
 {id:'igal',name:'Igal',x:70,z:6,hair:'#302a26',shirt:'#232a30',pants:'#455461',style:'short',skin:'#dfaf91'},
 {id:'anastasia',name:'Anastasia',x:82,z:6,hair:'#80603e',shirt:'#e7dfce',pants:'#30343b',style:'bun',skin:'#e6b79a'},
 {id:'amelia',name:'Amelia',x:96,z:6,hair:'#493326',shirt:'#b4a0b8',pants:'#344754',style:'long',skin:'#e7b6a1'},
 {id:'nataniel',name:'Nataniel',x:73,z:32,hair:'#ad9065',shirt:'#8c4154',pants:'#536578',style:'tousled',skin:'#f0c7ac'},
 {id:'adriel',name:'Adriel',x:94,z:32,hair:'#b99962',shirt:'#985359',pants:'#737e9a',style:'tousled',skin:'#f0c6ab'},
] .map(spec=>({...spec,age:familyKnowledge[spec.id]!.age,height:familyKnowledge[spec.id]!.height}));
export function createFamily(scene:T.Scene,solids:T.Mesh[]=[]){
 const root=new T.Group();root.name='Family · inhabitants';scene.add(root);
 const geometries:T.BufferGeometry[]=[],materials:T.Material[]=[];
 const people=familyMembers.map((spec,index)=>{
  const person=new T.Group();person.name=spec.name;person.userData={npc:spec.id,age:spec.age};person.position.set(spec.x,0,spec.z);root.add(person);
  const body=new T.Group();person.add(body);
  const geometry=new T.BoxGeometry(.62,spec.height,.42);geometries.push(geometry);
  const material=new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});materials.push(material);
  const target=new T.Mesh(geometry,material);target.position.y=spec.height/2;target.userData={npc:spec.id,noCollision:true};target.visible=typeof window==='undefined';person.add(target);solids.push(target);
  return {spec:{...spec,homeRoom:spec.id,model:'quaternius-humanoid',animationSet:'skeletal',ageCategory:spec.age<5?'toddler':spec.age<10?'child':spec.age<18?'teen':'adult',reaction:'wave',navigation:'arrival-ground-floor'},person,body,target,visual:undefined as CharacterVisual|undefined,phase:index*1.7,near:false,node:index,route:[] as number[],wait:5+index*4,reaction:0,blocked:0,cycle:0,state:'idle',destination:index,activity:'observing',facing:0,seatHeight:0,seatAnchor:undefined as readonly [number,number,number]|undefined,pace:1,seatBlend:0,proximityCooldown:0,greetTarget:null as T.Vector3|null};
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
 let conversationId:string|null=null,conversationPhase='listening';
 const probe=new T.Vector3(),delta=new T.Vector3();
 return {root,people,ready,assetStatus,converse(id:string|null,phase='listening'){conversationId=id;conversationPhase=phase;},activate(id:string){const p=people.find(p=>p.spec.id===id);if(p&&root.visible&&p.reaction<=0){p.greetTarget=null;p.reaction=2.4;p.state='reacting';}},update(now:number,dt:number,reduced:boolean,player:T.Vector3,enabled=true){root.visible=enabled;if(!enabled)return false;dt=Math.min(Math.max(dt,0),.2);
  for(const p of people){
   const distance=p.person.position.distanceTo(player);p.near=distance<3.5&&player.y<4;
   let walking=false;
   if(conversationId===p.spec.id){p.state=conversationPhase;p.reaction=conversationPhase==='responding'?.8:0;}
   else if(p.reaction>0){p.reaction=Math.max(0,p.reaction-dt);p.state='reacting';}
   else if(p.near&&p.proximityCooldown<=0){p.greetTarget=null;p.reaction=1.6;p.proximityCooldown=14;p.state='greeting';}
   else if(p.wait>0){
    const angle=Math.atan2(Math.sin(p.facing-p.person.rotation.y),Math.cos(p.facing-p.person.rotation.y));
    p.state=p.activity==='sitting'&&Math.abs(angle)>.08?'aligning':p.activity;
    if(p.state!=='aligning')p.wait-=dt;
    if(p.seatBlend<.02)p.person.rotation.y+=angle*(1-Math.exp(-dt*2));
   }
   else if(p.seatBlend>.02){p.state='standing-up';}

   else {
    if(!p.route.length){
     const index=people.indexOf(p);p.cycle++;
     const available=familySpots.filter(s=>(!s.owner||s.owner===p.spec.id)&&(!s.seatHeight||s.seatHeight<p.spec.height*.36)&&(familyNodes[s.node]![0]>=62||people.filter(other=>other!==p&&familyNodes[other.destination]![0]<62).length<2)&&people.filter(other=>other!==p&&other.destination===s.node).length<s.capacity);
     // Stagger a nearby seated pause every third choice; retain home returns and
     // the existing varied destinations between pauses. Never reserve an occupied seat.
     const nearbySeats=available.filter(s=>s.activity==='sitting'&&s.node!==p.node).sort((a,b)=>{
      const distance=(node:number)=>familyRoute(p.node,node).reduce((total,next,i,path)=>{const previous=familyNodes[i?path[i-1]!:p.node]!,point=familyNodes[next]!;return total+Math.hypot(point[0]-previous[0],point[1]-previous[1]);},0);
      return distance(a.node)-distance(b.node);
     });
     const seat=(p.cycle+index)%3===1?nearbySeats[0]:undefined;
     const spot=(p.cycle%4===0?available.find(s=>s.node===index):undefined)||seat||available[(p.cycle*7+index*3)%available.length];
     if(spot){p.destination=spot.node;p.activity=spot.activity;p.facing=spot.facing;p.seatHeight=spot.seatHeight||0;p.seatAnchor=spot.seatAnchor;p.pace=p.cycle%5===0?1.22:1;p.route=familyRoute(p.node,spot.node);if(!p.route.length)p.wait=spot.stay;}
    }
    const next=p.route[0];if(next!==undefined){const [x,z]=familyNodes[next]!;delta.set(x-p.person.position.x,0,z-p.person.position.z);const distance=delta.length();
     if(distance<.07){p.person.position.set(x,0,z);p.node=next;p.route.shift();p.blocked=0;if(!p.route.length)p.wait=(familySpots.find(s=>s.node===p.destination)?.stay||12)*( .8+(p.cycle%5)*.1);}
     else {delta.multiplyScalar(Math.min(distance,(p.spec.age<10?.65:.9)*p.pace*dt)/distance);
      // Shared swept collision prevents wall/furniture penetration; wait and retry a blocked edge.
      probe.copy(p.person.position);probe.y=1.65;collision(probe,delta);
      if(Math.hypot(probe.x-p.person.position.x,probe.z-p.person.position.z)<.001){p.blocked+=dt;if(p.blocked>2){p.route=[p.node];p.destination=p.node;p.activity='observing';p.wait=3;p.blocked=0;}}
      else {p.person.position.set(probe.x,0,probe.z);walking=true;p.blocked=0;}
      const target=Math.atan2(delta.x,delta.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*(1-Math.exp(-dt*5));
     }
    }p.state=walking?(p.destination===people.indexOf(p)?'returning-home':'walking'):'idle';
   }
   if((p.reaction>0||conversationId===p.spec.id)&&p.seatBlend<.02){const look=conversationId===p.spec.id?player:p.greetTarget||player;const target=Math.atan2(look.x-p.person.position.x,look.z-p.person.position.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*(1-Math.exp(-dt*4));}
   if(conversationId===p.spec.id&&!reduced){p.body.rotation.z=Math.sin(now/450+p.phase)*(conversationPhase==='thinking'?.012:conversationPhase==='responding'?.025:.005);}else p.body.rotation.z=T.MathUtils.damp(p.body.rotation.z,0,5,dt);
   p.proximityCooldown=Math.max(0,p.proximityCooldown-dt);
   const aligned=Math.abs(Math.atan2(Math.sin(p.facing-p.person.rotation.y),Math.cos(p.facing-p.person.rotation.y)))<.08;
   const seated=p.state==='sitting'&&aligned&&conversationId!==p.spec.id&&p.reaction<=0;
   p.seatBlend=T.MathUtils.damp(p.seatBlend,seated?1:0,5,dt);
   if(p.seatBlend<.001)p.seatBlend=0;
   p.body.position.set(0,0,0);
   if(p.seatAnchor&&p.seatBlend>0){
    // Convert the fixed world seat anchor into the person's local frame; navigation
    // stays at the approach node while only the pose moves onto/off the cushion.
    delta.set(p.seatAnchor[0]-p.person.position.x,0,p.seatAnchor[2]-p.person.position.z).applyAxisAngle(T.Object3D.DEFAULT_UP,-p.person.rotation.y);
    p.body.position.copy(delta).multiplyScalar(p.seatBlend);
   }
   if(walking&&p.proximityCooldown<=0){const other=people.find(other=>other!==p&&other.person.position.distanceTo(p.person.position)<1.5&&conversationId!==other.spec.id);if(other){p.greetTarget=other.person.position;other.greetTarget=p.person.position;p.reaction=.9;p.proximityCooldown=18;other.reaction=.9;other.proximityCooldown=18;p.state='greeting';other.state='greeting';}}
   p.visual?.update(dt,walking,p.reaction>0,reduced,p.seatBlend,p.seatHeight,p.pace);
  }return true;
 },dispose(){disposed=true;assets?.dispose();for(const p of people){p.visual?.mixer.stopAllAction();if(p.visual)p.visual.mixer.uncacheRoot(p.visual.mixer.getRoot());}root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
