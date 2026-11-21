import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import ts from 'typescript';import * as T from 'three';
function module(file){const out={};new Function('require','exports',ts.transpileModule(readFileSync(new URL(file,import.meta.url),'utf8').replaceAll('import.meta.dev','false'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(name=>name==='three'?T:name.includes('RoundedBoxGeometry')?{RoundedBoxGeometry}:name.includes('BufferGeometryUtils')?{mergeGeometries}:module(name.endsWith('.js')?name:name+'.ts'),out);return out;}
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
 assert(Math.abs(slow.people[0].person.position.z-(6+.9*(1-(1-Math.exp(-5))/5)))<.001);
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
  family.converse(null);p.reaction=0;for(let n=0;n<25;n++)family.update(3000+n*100,.1,true,new T.Vector3());assert(p.person.position.distanceTo(before)>0);
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

test('siblings gather, run a shared circuit, pause and resume wider exploration deterministically',()=>{
 const family=out.createFamily(new T.Scene()),player=new T.Vector3(-100,1.65,-100),runs=new Set(),visited=new Set();let pauses=0;
 try{
  for(let n=0;n<10000;n++){
   family.update(n*100,.1,false,player);
   for(const p of family.people.slice(3)){
    if(p.pace>1.5&&p.state==='walking')runs.add(p.spec.id);
    if(p.wait>0)pauses++;
    if(p.node===28||p.node===42)visited.add(p.spec.id);
    assert(Number.isFinite(p.person.position.x)&&Number.isFinite(p.person.rotation.y));
   }
  }
  assert.equal(runs.size,2);assert(pauses>0);assert.equal(visited.size,2,'both children also explore beyond home');
  const child=family.people[3],before=child.person.position.clone();family.converse(child.spec.id,'responding');
  for(let n=0;n<30;n++)family.update(1000000+n*100,.1,false,player);
  assert(child.person.position.equals(before));assert.equal(child.reaction,0,'conversation uses its own gesture, not a looping greeting');
 }finally{family.dispose();}
});

test('nearby adults face each other for a bounded conversational pause',()=>{
 const family=out.createFamily(new T.Scene()),player=new T.Vector3(-100,1.65,-100);
 try{
  for(const [i,node] of [[0,48],[1,49]]){const p=family.people[i],[x,z]=nav.familyNodes[node];p.person.position.set(x,0,z);p.node=p.destination=node;p.wait=20;p.activity='observing';}
  let chatting=false;
  for(let n=0;n<60;n++){family.update(n*100,.1,false,player);if(family.people[0].state==='chatting')chatting=true;}
  assert(chatting);assert(family.people[0].person.rotation.y>.5);assert(family.people[1].person.rotation.y<-.5);
 }finally{family.dispose();}
});

test('winter dressing batches shared decorations, keeps nine candle flames, and disposes resources and collision entries',()=>{
 const scene=new T.Scene(),parent=new T.Group();scene.add(parent);const solids=[];
 const winter=module('./winter-home.ts').createWinterHome(parent,solids);
 const geometries=new Set(),materials=new Set();let draws=0,flameVertices=0;
 winter.root.traverse(o=>{if(o.isMesh){draws++;geometries.add(o.geometry);materials.add(o.material);if(!o.isInstancedMesh&&o.material.emissiveIntensity===1.1&&o.material.color.getHexString()==='ffd28a')flameVertices+=o.geometry.attributes.position.count;}});
 assert(draws<20,'decorations remain batched');
 const sphere=new T.SphereGeometry(1,10,7);assert.equal(flameVertices,9*sphere.index.count);sphere.dispose();
 assert.equal(solids.length,3);assert.equal(winter.root.getObjectByName('Hanukkah · nine-light hanukkiah').type,'Group');
 let released=0;for(const g of geometries)g.addEventListener('dispose',()=>released++);for(const m of materials)m.addEventListener('dispose',()=>released++);
 winter.dispose();assert.equal(released,geometries.size+materials.size);assert.equal(parent.children.length,0);assert.equal(solids.length,0);
});

test('new attraction approaches clear the actual Print Lab, stations and train barriers',()=>{
 const old=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:()=>()=>{}})})};
 const scene=new T.Scene(),solids=[];let origin,print,tube,coaster;
 try{origin=module('./origin.ts').createOrigin(scene,solids);print=module('./print-lab.ts').createPrintLab(scene,solids);tube=module('./skytube.ts').createSkyTube(scene,solids,true);coaster=module('./sky-coaster.ts').createSkyCoaster(scene,solids);scene.updateMatrixWorld(true);const move=module('./collision.ts').createCollision(solids);
  for(const [a,b] of nav.familyEdges.filter(([a,b])=>a>=52||b>=52))for(const [from,to] of [[a,b],[b,a]]){const start=nav.familyNodes[from],end=nav.familyNodes[to],p=new T.Vector3(start[0],1.65,start[1]);move(p,new T.Vector3(end[0]-start[0],0,end[1]-start[1]));assert(Math.hypot(p.x-end[0],p.z-end[1])<.01,`${from} -> ${to}: ${p.toArray()}`);}
 }finally{origin?.dispose();print?.dispose();tube?.dispose();coaster?.dispose();globalThis.document=old;}
});

test('autonomous itineraries reach both ride owners and keep body disks separate',()=>{
 const counts={52:0,54:0},rides={};for(const node of [52,54])rides[node]={npcPassenger:false,remaining:0,boardNpc(){if(this.npcPassenger)return false;this.npcPassenger=true;this.remaining=4;counts[node]++;return true;}};
 const family=out.createFamily(new T.Scene(),[],rides),player=new T.Vector3(-300,1.65,-300);
 try{for(let n=0;n<18000;n++){for(const ride of Object.values(rides)){ride.remaining-=.1;if(ride.remaining<=0)ride.npcPassenger=false;}family.update(n*100,.1,true,player);for(let a=0;a<5;a++)for(let b=a+1;b<5;b++){const p=family.people[a],q=family.people[b];if(p.riding||q.riding)continue;const radius=(p.spec.age<10?.22:.32)+(q.spec.age<10?.22:.32);assert(Math.hypot(p.person.position.x-q.person.position.x,p.person.position.z-q.person.position.z)>=radius-.002,`${p.spec.id}/${q.spec.id} intersect at ${n/10}s`);}}
 assert(counts[52]>0,'coaster itinerary boards');assert(counts[54]>0,'scenic SkyTube itinerary boards');
 }finally{family.dispose();}
});
