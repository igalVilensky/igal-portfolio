import { familyKnowledge } from '../../shared/family-knowledge.js';
import * as T from 'three';
import { createChildCharacter } from './child-character';
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
 const childVisuals:ReturnType<typeof createChildCharacter>[]=[];
 const people=familyMembers.map((spec,index)=>{
  const person=new T.Group();person.name=spec.name;person.userData={npc:spec.id,age:spec.age};person.position.set(spec.x,0,spec.z);root.add(person);
  const body=new T.Group();person.add(body);
  const geometry=new T.BoxGeometry(.62,spec.height,.42);geometries.push(geometry);
  const material=new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false});materials.push(material);
  const target=new T.Mesh(geometry,material);target.position.y=spec.height/2;target.userData={npc:spec.id,noCollision:true};target.visible=typeof window==='undefined';person.add(target);solids.push(target);
  const childVisual=spec.age<10?createChildCharacter(spec):undefined;if(childVisual){body.add(childVisual.root);childVisuals.push(childVisual);target.visible=true;}
  return {spec:{...spec,homeRoom:spec.id,model:spec.age<10?'purpose-built-child':'quaternius-humanoid',animationSet:spec.age<10?'articulated-child':'skeletal',ageCategory:spec.age<5?'toddler':spec.age<10?'child':spec.age<18?'teen':'adult',reaction:'wave',navigation:'arrival-ground-floor'},person,body,target,visual:childVisual as CharacterVisual|undefined,phase:index*1.7,near:false,node:index,route:[] as number[],wait:5+index*4,reaction:0,blocked:0,cycle:0,state:'idle',destination:index,activity:'observing',facing:0,seatHeight:0,seatAnchor:undefined as readonly [number,number,number]|undefined,pace:1,seatBlend:0,proximityCooldown:0,greetTarget:null as T.Vector3|null,speed:0,visualPace:0,playStep:0,lookTime:0,socialTime:0};
 });
 let disposed=false,assets:Awaited<ReturnType<typeof import('./character-assets')['loadCharacterAssets']>>|undefined;
 const assetStatus={state:'loading' as 'loading'|'ready'|'error',error:''};
 const ready=typeof window==='undefined'?Promise.resolve():import('./character-assets').then(async module=>{
  assets=await module.loadCharacterAssets();
  if(disposed){assets.dispose();return;}
  for(const p of people){if(p.visual)continue;p.visual=assets.create(p.spec);p.body.add(p.visual.root);p.target.visible=true;}
  assetStatus.state='ready';
 }).catch(error=>{assetStatus.state='error';assetStatus.error=String(error);console.error('Family character loading failed',error);});
 const collision=createCollision(solids.filter(m=>!m.userData.npc),'family');
 let conversationId:string|null=null,conversationPhase='listening';
 const probe=new T.Vector3(),delta=new T.Vector3();
 let clock=0,nextPlay=32,playPhase:'rest'|'gathering'|'playing'='rest',playUntil=0;
 const siblings=people.filter(p=>p.spec.age<10);
 function sendTo(p:typeof people[number],node:number){p.destination=node;p.wait=0;p.activity='observing';p.route=[p.node,...familyRoute(p.node,node)];}

 return {root,people,ready,assetStatus,converse(id:string|null,phase='listening'){conversationId=id;conversationPhase=phase;},activate(id:string){const p=people.find(p=>p.spec.id===id);if(p&&root.visible&&p.reaction<=0){p.greetTarget=null;p.reaction=2.4;p.state='reacting';}},update(now:number,dt:number,reduced:boolean,player:T.Vector3,enabled=true){root.visible=enabled;if(!enabled)return false;dt=Math.min(Math.max(dt,0),.2);clock+=dt;
  // A small deterministic family routine, sharing the same audited navigation graph.
  if(playPhase==='rest'&&clock>=nextPlay&&!siblings.some(p=>conversationId===p.spec.id)){
   playPhase='gathering';playUntil=clock+240;siblings.forEach((p,i)=>{p.playStep=i*2;sendTo(p,i?51:50);});
  }
  if(playPhase==='gathering'&&siblings.every(p=>!p.route.length&&[50,51].includes(p.node))){playPhase='playing';playUntil=clock+28;siblings.forEach(p=>p.wait=0);}
  if(playPhase!=='rest'&&(clock>playUntil||siblings.some(p=>conversationId===p.spec.id))){playPhase='rest';nextPlay=clock+260;siblings.forEach(p=>p.pace=1);}

  for(const p of people){
   const distance=p.person.position.distanceTo(player);p.near=distance<3.5&&player.y<4;
   let walking=false;
   if(conversationId===p.spec.id){p.state=conversationPhase;p.reaction=0;}
   else if(p.reaction>0){p.reaction=Math.max(0,p.reaction-dt);p.state='reacting';}
   else if(p.near&&p.proximityCooldown<=0){p.greetTarget=null;p.reaction=2.4;p.proximityCooldown=14;p.state='greeting';}
   else if(p.wait>0){
    const angle=Math.atan2(Math.sin(p.facing-p.person.rotation.y),Math.cos(p.facing-p.person.rotation.y));
    p.state=p.activity==='sitting'&&Math.abs(angle)>.08?'aligning':p.activity==='observing'&&p.socialTime>0?'chatting':p.activity;
    if(p.state!=='aligning')p.wait-=dt;
    if(p.seatBlend<.02)p.person.rotation.y+=angle*(1-Math.exp(-dt*2));
   }
   else if(p.seatBlend>.02){p.state='standing-up';}

   else {
    if(!p.route.length){
     const index=people.indexOf(p);p.cycle++;
     const available=familySpots.filter(s=>(!s.owner||s.owner===p.spec.id)&&(!s.seatHeight||s.seatHeight<p.spec.height*.36)&&people.filter(other=>other!==p&&other.destination===s.node).length<s.capacity);
     // Stagger a nearby seated pause every third choice; retain home returns and
     // the existing varied destinations between pauses. Never reserve an occupied seat.
     const nearbySeats=available.filter(s=>s.activity==='sitting'&&s.node!==p.node).sort((a,b)=>{
      const distance=(node:number)=>familyRoute(p.node,node).reduce((total,next,i,path)=>{const previous=familyNodes[i?path[i-1]!:p.node]!,point=familyNodes[next]!;return total+Math.hypot(point[0]-previous[0],point[1]-previous[1]);},0);
      return distance(a.node)-distance(b.node);
     });
     const seat=p.cycle===1||(p.cycle+index)%3===1?nearbySeats[0]:undefined;
     const child=p.spec.age<10,playing=child&&playPhase==='playing';
     const itinerary=child?[50,28,51,42,6,39]:[48,49,36,42,23,39,44,28];
     const preferred=itinerary[(Math.floor(p.cycle/2)+index)%itinerary.length]!;
     const playNodes=[50,48,49,51,49,48];
     const node=playNodes[p.playStep++%playNodes.length]!;
     const spot=(playing?familySpots.find(s=>s.node===node):undefined)||
      (child&&playPhase==='gathering'?familySpots.find(s=>s.node===(index===3?50:51)):undefined)||
      (p.cycle%6===0?available.find(s=>s.node===index):undefined)||seat||available.find(s=>s.node===preferred)||available[(p.cycle*7+index*3)%available.length];
     if(spot){p.destination=spot.node;p.activity=spot.activity;p.facing=spot.facing;p.seatHeight=spot.seatHeight||0;p.seatAnchor=spot.seatAnchor;p.pace=playing?(p.spec.age<5?1.65:1.9):p.cycle%5===0?1.12:1;p.route=familyRoute(p.node,spot.node);if(!p.route.length)p.wait=playing?.5:spot.stay;}

    }
    const next=p.route[0];if(next!==undefined){const [x,z]=familyNodes[next]!;delta.set(x-p.person.position.x,0,z-p.person.position.z);const distance=delta.length();
     if(distance<.07){p.person.position.set(x,0,z);p.node=next;p.route.shift();p.blocked=0;if(!p.route.length)p.wait=p.spec.age<10&&playPhase==='playing'?.6:(familySpots.find(s=>s.node===p.destination)?.stay||12)*(.8+(p.cycle%5)*.1);}
     else {
      const base=p.spec.age<5?.72:p.spec.age<10?.88:.9;
      const targetSpeed=Math.min(base*p.pace,p.route.length===1?Math.sqrt(3.6*distance):Infinity);
      // Exact integral of exponential acceleration keeps displacement frame-rate independent.
      const travelled=targetSpeed*dt+(p.speed-targetSpeed)*(1-Math.exp(-5*dt))/5;
      p.speed=T.MathUtils.damp(p.speed,targetSpeed,5,dt);
      const heading=Math.atan2(delta.x,delta.z),turn=Math.atan2(Math.sin(heading-p.person.rotation.y),Math.cos(heading-p.person.rotation.y));
      const turnPace=Math.max(.18,Math.cos(turn));
      delta.multiplyScalar(Math.min(distance,travelled*turnPace)/distance);
      // Shared swept collision prevents wall/furniture penetration; wait and retry a blocked edge.
      probe.copy(p.person.position);probe.y=1.65;collision(probe,delta);
      if(Math.hypot(probe.x-p.person.position.x,probe.z-p.person.position.z)<.001){p.blocked+=dt;if(p.blocked>2){p.route=[p.node];p.destination=p.node;p.activity='observing';p.wait=3;p.blocked=0;}}
      else {p.visualPace=Math.hypot(probe.x-p.person.position.x,probe.z-p.person.position.z)/Math.max(.001,dt)/(p.spec.age<10?.75:.9);p.person.position.set(probe.x,0,probe.z);walking=true;p.blocked=0;}
      const target=Math.atan2(delta.x,delta.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*(1-Math.exp(-dt*5));
     }
    }p.state=walking?(p.destination===people.indexOf(p)?'returning-home':'walking'):'idle';
   }
   if((p.reaction>0||conversationId===p.spec.id)&&p.seatBlend<.02){const look=conversationId===p.spec.id?player:p.greetTarget||player;const target=Math.atan2(look.x-p.person.position.x,look.z-p.person.position.z);p.person.rotation.y+=Math.atan2(Math.sin(target-p.person.rotation.y),Math.cos(target-p.person.rotation.y))*(1-Math.exp(-dt*4));}
   if(conversationId===p.spec.id&&!reduced){p.body.rotation.z=Math.sin(now/450+p.phase)*(conversationPhase==='thinking'?.012:conversationPhase==='responding'?.025:.005);}else p.body.rotation.z=T.MathUtils.damp(p.body.rotation.z,0,5,dt);
   if(!walking){p.speed=T.MathUtils.damp(p.speed,0,8,dt);p.visualPace=0;}
   // Quiet observation: turn the gaze occasionally rather than rotate continuously.
   p.lookTime+=dt;p.socialTime=Math.max(0,p.socialTime-dt);
   if(!walking&&p.activity!=='sitting'&&p.wait>0&&p.reaction<=0&&p.seatBlend<.02&&conversationId!==p.spec.id&&p.lookTime>4){
    const companion=people.find(q=>q!==p&&q.person.position.distanceToSquared(p.person.position)<=20.25&&q.wait>0);
    if(companion){p.facing=Math.atan2(companion.person.position.x-p.person.position.x,companion.person.position.z-p.person.position.z);p.state='chatting';p.socialTime=3.6;}
    else if(p.activity!=='sitting')p.facing+=Math.sin(p.cycle+p.phase)*.22;
    p.lookTime=0;
   }
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
   if(walking&&p.proximityCooldown<=0&&!(p.spec.age<10&&playPhase==='playing')){const other=people.find(other=>other!==p&&other.person.position.distanceTo(p.person.position)<1.5&&conversationId!==other.spec.id);if(other){p.greetTarget=other.person.position;other.greetTarget=p.person.position;p.reaction=2.4;p.proximityCooldown=18;other.reaction=2.4;other.proximityCooldown=18;p.state='greeting';other.state='greeting';}}
   p.visual?.update(dt,walking,p.reaction>0,reduced,p.seatBlend,p.seatHeight,walking?Math.max(.15,p.visualPace):0,conversationId===p.spec.id?conversationPhase:p.state==='chatting'?'responding':p.state);
  }return true;
 },dispose(){disposed=true;assets?.dispose();childVisuals.forEach(v=>v.dispose());for(const p of people){p.visual?.mixer.stopAllAction();if(p.visual)p.visual.mixer.uncacheRoot(p.visual.mixer.getRoot());}root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
