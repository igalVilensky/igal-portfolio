import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import ts from 'typescript';import * as T from 'three';
function module(file){const out={};new Function('require','exports',ts.transpileModule(readFileSync(new URL(file,import.meta.url),'utf8').replaceAll('import.meta.dev','false'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(name=>name==='three'?T:name.includes('RoundedBoxGeometry')?{RoundedBoxGeometry}:module(name.endsWith('.js')?name:name+'.ts'),out);return out;}
const out=module('./family.ts'),nav=module('./family-navigation.ts');
test('identities have calibrated heights and bounded repeatable reactions',()=>{const family=out.createFamily(new T.Scene());assert.deepEqual(family.people.map(p=>p.spec.height),[1.65,1.65,1.65,1.2,1.025]);for(const p of family.people){const box=new T.Box3().setFromObject(p.person);assert(Math.abs(box.max.y-box.min.y-p.spec.height)<.001);family.activate(p.spec.id);family.activate(p.spec.id);assert.equal(p.reaction,2.4);}family.dispose();});
test('all destinations are connected and roaming leaves home, pauses and survives inactive scenes',()=>{for(let a=0;a<nav.familyNodes.length;a++)for(let b=0;b<nav.familyNodes.length;b++)if(a!==b)assert(nav.familyRoute(a,b).length);const family=out.createFamily(new T.Scene());const start=family.people.map(p=>p.person.position.clone());const moved=new Set();for(let n=0;n<2400;n++){family.update(n*50,.05,true,new T.Vector3(0,1.65,0));family.people.forEach((p,i)=>{if(p.person.position.distanceTo(start[i])>1)moved.add(i);});}assert.equal(moved.size,5);const p=family.people[0],before=p.person.position.clone();family.update(130000,.05,false,new T.Vector3(),false);assert.equal(family.root.visible,false);assert(p.person.position.equals(before));family.update(130050,.05,false,new T.Vector3(),true);assert.equal(family.root.visible,true);family.dispose();});
test('private references are excluded from runtime modules',()=>{for(const file of ['./family.ts','./living-quarters.ts'])assert(!/design-references|family-space\.jpe?g/.test(readFileSync(new URL(file,import.meta.url),'utf8')));});

test('all Living Quarters graph edges clear the actual room shells in both directions',()=>{const scene=new T.Scene(),solids=[],wing=module('./living-quarters.ts').createLivingQuarters(scene,solids);scene.updateMatrixWorld(true);const move=module('./collision.ts').createCollision(solids);for(const [a,b] of nav.familyEdges.filter(([a,b])=>a<11&&b<11)){for(const [from,to] of [[a,b],[b,a]]){const start=nav.familyNodes[from],end=nav.familyNodes[to],p=new T.Vector3(start[0],1.65,start[1]);move(p,new T.Vector3(end[0]-start[0],0,end[1]-start[1]));assert(Math.hypot(p.x-end[0],p.z-end[1])<.01,`${from} -> ${to}: ${p.toArray()}`);}}wing.dispose();});

test('the full Origin and Living Quarters collision owners permit east-room access',()=>{const scene=new T.Scene(),solids=[],wing=module('./living-quarters.ts').createLivingQuarters(scene,solids);const origin=module('./origin.ts').createOrigin(scene,solids);scene.updateMatrixWorld(true);const move=module('./collision.ts').createCollision(solids);for(const [x,z] of [[96,6],[94,32]]){const p=new T.Vector3(62,1.65,19);move(p,new T.Vector3(x-62,0,0));move(p,new T.Vector3(0,0,z-19));assert(Math.hypot(p.x-x,p.z-z)<.01);}wing.dispose();origin.dispose();});

test('Explorer circulation edges clear the existing flag installations in both directions',()=>{const oldDocument=globalThis.document,oldImage=globalThis.Image;globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:()=>()=>{}})})};globalThis.Image=class {};const scene=new T.Scene(),solids=[];let explorer;try{explorer=module('./little-explorer.ts').createLittleExplorer(scene,solids);scene.updateMatrixWorld(true);const move=module('./collision.ts').createCollision(solids);for(const [a,b] of nav.familyEdges.filter(([a,b])=>a>=10&&b<=15)){for(const [from,to] of [[a,b],[b,a]]){const start=nav.familyNodes[from],end=nav.familyNodes[to],p=new T.Vector3(start[0],1.65,start[1]);move(p,new T.Vector3(end[0]-start[0],0,end[1]-start[1]));assert(Math.hypot(p.x-end[0],p.z-end[1])<.01,`${from} -> ${to}: ${p.toArray()}`);}}}finally{explorer?.dispose();globalThis.document=oldDocument;globalThis.Image=oldImage;}});

test('NPC travel covers the same distance at 5 and 20 frames per second',()=>{
 const slow=out.createFamily(new T.Scene()),fast=out.createFamily(new T.Scene());
 for(const family of [slow,fast]){family.people[0].wait=0;family.people[0].route=[5];}
 for(let n=0;n<5;n++)slow.update(n*200,.2,true,new T.Vector3());
 for(let n=0;n<20;n++)fast.update(n*50,.05,true,new T.Vector3());
 assert(slow.people[0].person.position.distanceTo(fast.people[0].person.position)<.001);
 assert(Math.abs(slow.people[0].person.position.z-6.9)<.001);
 slow.dispose();fast.dispose();
});

test('expanded routes clear building shells, furniture and public door approaches',()=>{
 const old=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:()=>()=>{}})})};
 const scene=new T.Scene(),solids=[];let wing,work,expansion,environment;
 try{
  // Portrait textures are irrelevant to the collision graph.
  const load=T.TextureLoader.prototype.load;T.TextureLoader.prototype.load=()=>new T.Texture();
  try{wing=module('./living-quarters.ts').createLivingQuarters(scene,solids);}finally{T.TextureLoader.prototype.load=load;}
  work=module('./work-wing.ts').createWorkWing(scene,solids);
  expansion=module('./expansion.ts').createExpansion(scene,solids);
  environment=module('./environment.ts').buildEnvironment(scene);solids.push(...environment.solids);
  scene.updateMatrixWorld(true);const move=module('./collision.ts').createCollision(solids);
  for(const seat of nav.familySpots.filter(s=>s.activity==='sitting')){
   const [x,y,z]=seat.seatAnchor;assert.equal(y,seat.seatHeight);
   const ray=new T.Raycaster(new T.Vector3(x,y+.1,z),new T.Vector3(0,-1,0),0,.2);
   const hit=ray.intersectObjects(solids.filter(m=>!m.userData.noCollision),false)[0];
   assert(hit&&Math.abs(hit.point.y-y)<.005,`${seat.node}: support anchor lies on the actual cushion`);
  }
  for(const [a,b] of nav.familyEdges){for(const [from,to] of [[a,b],[b,a]]){const start=nav.familyNodes[from],end=nav.familyNodes[to],p=new T.Vector3(start[0],1.65,start[1]);move(p,new T.Vector3(end[0]-start[0],0,end[1]-start[1]));assert(Math.hypot(p.x-end[0],p.z-end[1])<.01,`${from} -> ${to}: ${p.toArray()}`);}}
 }finally{wing?.dispose();work?.dispose();expansion?.dispose();environment?.dispose();globalThis.document=old;}
});

test('conversation holds position and releases the same valid route repeatedly',()=>{
 const family=out.createFamily(new T.Scene()),p=family.people[0];p.wait=0;p.route=[5];
 for(let turn=0;turn<3;turn++){
  const before=p.person.position.clone();family.converse('igal','thinking');for(let n=0;n<20;n++)family.update(n*100,.1,true,new T.Vector3());assert(p.person.position.equals(before));
  family.converse(null);p.reaction=0;family.update(3000,.1,true,new T.Vector3());assert(p.person.position.distanceTo(before)>0);
 }family.dispose();
});

test('normal roaming includes early seated pauses and later walking without constant sitting',()=>{
 const family=out.createFamily(new T.Scene()),player=new T.Vector3(5,1.65,17);
 const stats=family.people.slice(0,3).map(()=>({firstSit:Infinity,seated:0,resumed:false}));
 try{
  for(let n=0;n<6000;n++){
   family.update(n*100,.1,false,player);
   family.people.slice(0,3).forEach((p,i)=>{
    const s=stats[i];
    if(p.seatBlend>.9){s.firstSit=Math.min(s.firstSit,n/10);s.seated+=.1;}
    if(s.firstSit<Infinity&&p.seatBlend<.02&&['walking','returning-home'].includes(p.state))s.resumed=true;
   });
  }
  stats.forEach((s,i)=>{const name=family.people[i].spec.name;assert(s.firstSit<120,`${name}: sitting is discoverable within two minutes`);assert(s.seated>10&&s.seated<300,`${name}: sitting remains an occasional activity`);assert(s.resumed,`${name}: returns to walking after sitting`);});
  // Adult-height seats remain unsuitable for the two smaller children.
  assert(family.people.slice(3).every(p=>p.seatBlend===0));
 }finally{family.dispose();}
});

test('a seated conversation releases the pose, holds position, and resumes roaming',()=>{
 const family=out.createFamily(new T.Scene()),p=family.people[0],seat=nav.familySpots.find(s=>s.node===29),player=new T.Vector3(5,1.65,17);
 const [x,z]=nav.familyNodes[seat.node];p.person.position.set(x,0,z);p.person.rotation.y=seat.facing;p.node=seat.node;p.destination=seat.node;p.activity='sitting';p.facing=seat.facing;p.seatHeight=seat.seatHeight;p.seatAnchor=seat.seatAnchor;p.wait=30;
 let animationBlend=0;const visualRoot=new T.Group();p.visual={root:visualRoot,height:p.spec.height,mixer:new T.AnimationMixer(visualRoot),update(_dt,_walking,_greeting,_reduced,blend){animationBlend=blend;}};
 try{
  for(let n=0;n<20;n++)family.update(n*100,.1,false,player);
  assert(p.seatBlend>.98&&animationBlend>.98,'seated blend reaches the animation controller');
  p.person.updateMatrixWorld(true);const anchor=p.body.getWorldPosition(new T.Vector3());assert(anchor.distanceTo(new T.Vector3(seat.seatAnchor[0],0,seat.seatAnchor[2]))<.005,'body aligns with measured seat support');
  const position=p.person.position.clone();family.converse('igal','listening');
  for(let n=0;n<30;n++)family.update(n*100,.1,false,player);
  assert(p.person.position.equals(position));assert(p.seatBlend<.001&&animationBlend<.001,'conversation stands up and releases the seated pose');
  family.converse(null);p.wait=0;p.cycle=3;
  for(let n=0;n<50;n++)family.update(n*100,.1,false,player);
  assert(p.person.position.distanceTo(position)>1,'roaming resumes after seated conversation');
  assert.equal(p.seatBlend,0);assert(p.body.position.length()<.001,'standing leaves no seated root offset');
 }finally{family.dispose();}
});

test('seat alignment completes before sitting and stand-up completes before turning',()=>{
 const family=out.createFamily(new T.Scene()),p=family.people[0],seat=nav.familySpots.find(s=>s.node===29),player=new T.Vector3(5,1.65,17);
 const [x,z]=nav.familyNodes[seat.node];p.person.position.set(x,0,z);p.person.rotation.y=seat.facing-Math.PI/2;p.node=seat.node;p.destination=seat.node;p.activity='sitting';p.facing=seat.facing;p.seatHeight=seat.seatHeight;p.seatAnchor=seat.seatAnchor;p.wait=20;
 try{
  const position=p.person.position.clone();family.update(0,.1,false,player);assert.equal(p.state,'aligning');assert.equal(p.seatBlend,0);
  for(let n=0;n<60;n++)family.update(n*100,.1,false,player);
  assert(p.person.position.equals(position));assert(p.seatBlend>.98);
  const facing=p.person.rotation.y;family.converse('igal','listening');family.update(7000,.1,false,player);
  assert.equal(p.person.rotation.y,facing,'body does not twist on the cushion during stand-up');
  for(let n=0;n<30;n++)family.update(7100+n*100,.1,false,player);
  assert.equal(p.seatBlend,0);assert(p.body.position.length()<.001);assert(Math.abs(p.person.rotation.y-facing)>.1,'turns to visitor once upright');
 }finally{family.dispose();}
});

test('outdoor roaming edges clear the Origin landscape and welcoming portico',()=>{
 const scene=new T.Scene(),solids=[],origin=module('./origin.ts').createOrigin(scene,solids);
 try{
  origin.welcome();for(let i=0;i<60;i++)origin.update(.1,true,new T.Vector3(),false);
  scene.updateMatrixWorld(true);const move=module('./collision.ts').createCollision(solids);
  for(const [a,b] of nav.familyEdges.filter(([a,b])=>a>=37||b>=37))for(const [from,to] of [[a,b],[b,a]]){
   const start=nav.familyNodes[from],end=nav.familyNodes[to],p=new T.Vector3(start[0],1.65,start[1]);
   move(p,new T.Vector3(end[0]-start[0],0,end[1]-start[1]));
   assert(Math.hypot(p.x-end[0],p.z-end[1])<.01,`${from} -> ${to}: ${p.toArray()}`);
  }
 }finally{origin.dispose();}
});
