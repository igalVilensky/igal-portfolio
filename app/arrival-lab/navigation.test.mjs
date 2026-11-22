import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync,existsSync,readdirSync} from 'node:fs';import {fileURLToPath} from 'node:url';import ts from 'typescript';import * as T from 'three';import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const cache=new Map();function load(file){const url=new URL(file,import.meta.url);if(cache.has(url.href))return cache.get(url.href);const out={};cache.set(url.href,out);new Function('require','exports',ts.transpileModule(readFileSync(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(name=>name==='three'?T:name.includes('RoundedBoxGeometry')?{RoundedBoxGeometry}:name.includes('BufferGeometryUtils')?{mergeGeometries}:load(new URL(name+'.ts',url).href),out);return out;}
const map=load('./world-map.ts'),travel=load('./map-travel.ts');
test('atlas projection uses actual coordinates; selection is deliberate and equipment follows its one location',()=>{
 assert.deepEqual(map.projectWorld(-220,-135),{x:0,y:0});assert.deepEqual(map.projectWorld(285,160),{x:100,y:100});assert(map.projectWorld(400,443).x>100);
 assert.equal(new Set(map.mapDestinations.map(d=>d.id)).size,map.mapDestinations.length);assert.equal(map.selectMapDestination('not-a-place'),undefined);assert.equal(map.selectMapDestination('ai-tools').names.en,'Ask Igal');assert.equal(map.selectMapDestination('loop-district').point[0],238);
 const drop=new T.Vector3(-60,1.65,70);assert(map.destinationPoint('sky-explorer',drop).equals(drop.clone().add(new T.Vector3(0,0,2))));assert(map.destinationPoint('north').equals(new T.Vector3(-12,1.65,-67)));
});
test('guided travel has one owner, bounded motion, cancellation, invalid input and collision interruption',()=>{
 const t=travel.createMapTravel(),p=new T.Vector3(),points=[p.clone(),new T.Vector3(10,0,0)];assert(t.start(points));assert(!t.start(points));assert(t.ownsMotion);t.update(.05,p,(p,d)=>p.add(d));assert(p.x>0&&p.x<=.9);t.cancel();const stopped=p.clone();t.update(1,p,(p,d)=>p.add(d));assert(p.equals(stopped));assert(!t.ownsMotion);
 assert(!t.start([new T.Vector3(NaN,0,0),p]));assert(t.start([p.clone(),new T.Vector3(10,0,0)]));t.update(.05,p,()=>{});assert.equal(t.state,'blocked');assert(p.equals(stopped));assert(!t.ownsMotion);
 assert.equal(travel.planMapRoute(new T.Vector3(NaN,0,0),p,()=>true),undefined);assert(!travel.onMapGround(new T.Vector3(310,1.65,100)));assert(!travel.onMapGround(new T.Vector3(-170,1.65,65)));assert(!travel.onMapGround(new T.Vector3(12,30,62)));
});
test('grounded equipment can be left, walked away from and re-equipped without moving the player',()=>{
 const f=load('./flight.ts').createFlight((p,d)=>p.add(d),p=>p.x<0?1.65:undefined),p=new T.Vector3(-8,1.65,91);assert(f.equip(p,true));p.set(-30,1.65,70);f.ground(p);const before=p.clone();assert(f.unequip(p));assert(p.equals(before));assert.equal(f.phase,'dropped');assert(f.devicePosition.equals(before));assert(!f.equipped);p.x-=10;assert(!f.equip(p,true));p.copy(before);assert(f.equip(p,true));assert(f.takeoff());assert(!f.unequip(p));f.recover(p);p.set(10,1.65,70);assert(!f.unequip(p));assert(!f.unequip(before,false));assert.equal(f.phase,'equipped');
});
test('retired playback and directional-board dependencies are absent from runtime',()=>{
 assert(!existsSync(new URL('./audio',import.meta.url)));assert(!existsSync(new URL('./wayfinding.ts',import.meta.url)));
 for(const file of ['./ArrivalChamber.client.vue','./PortalWorkspace.vue','./works/ProjectWorkspace.vue','./interactions.ts','./interaction-copy.ts'])assert(!/radio|youtube|createWayfinding/i.test(readFileSync(new URL(file,import.meta.url),'utf8')),file);
});
test('registered map routes validate against actual architecture from Arrival',()=>{
 const textureLoad=T.TextureLoader.prototype.load;T.TextureLoader.prototype.load=()=>new T.Texture();const doc=globalThis.document,media=globalThis.matchMedia,img=globalThis.Image;globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:()=>()=>{}})})};globalThis.matchMedia=()=>({matches:false});globalThis.Image=class{};
 const scene=new T.Scene(),solids=[],owned=[];
 try{
  const architecture=load('./environment.ts').buildEnvironment(scene);solids.push(...architecture.solids);owned.push(architecture);
  for(const [file,name] of [['expansion','createExpansion'],['atmosphere','createAtmosphere'],['origin','createOrigin'],['living-quarters','createLivingQuarters'],['intelligence','createIntelligence'],['work-wing','createWorkWing'],['ascent','createAscent'],['print-lab','createPrintLab'],['little-explorer','createLittleExplorer'],['lagoon','createLagoon'],['loop-district','createLoopDistrict'],['skytube','createSkyNetwork'],['sky-coaster','createSkyCoaster'],['works/environment','createWorks'],['sky-tower','createSkyTower']])owned.push(load('./'+file+'.ts')[name](scene,solids));
  const mechanism=load('./mechanics.ts').createMechanism(architecture.wall);mechanism.activate(0);mechanism.update(2000,false);const origin=owned[3];origin.welcome();for(let i=0;i<100;i++)origin.update(.05,true,new T.Vector3(12,1.65,62),true,true,true);
  scene.updateMatrixWorld(true);const collide=load('./collision.ts').createCollision(solids);const move=(p,d)=>{const y=p.y+d.y;collide(p,d);p.y=y;};const lagoon=load('./lagoon-model.ts');const clear=path=>travel.walkingRouteClear(path,move,travel.onMapGround);
  const failed=[];for(const d of map.mapDestinations.filter(d=>d.id!=='horizon-return')){const path=travel.planMapRoute(new T.Vector3(5,1.65,17),map.destinationPoint(d.id),clear);if(!path)failed.push(d.id);else if(!travel.planMapRoute(map.destinationPoint(d.id),new T.Vector3(5,1.65,17),clear))failed.push(d.id+':return');}
  assert.deepEqual(failed,[]);assert(travel.planMapRoute(new T.Vector3(54,5.65,90),new T.Vector3(5,1.65,17),clear),'raised Origin promenade return');
 }finally{owned.forEach(o=>o.dispose());globalThis.document=doc;globalThis.matchMedia=media;globalThis.Image=img;T.TextureLoader.prototype.load=textureLoad;}
});
test('camera mode follows actual Pointer Lock state and falls back to Drag Look on rejection',async()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;const win=new EventTarget(),doc=new EventTarget(),canvas=new EventTarget();doc.pointerLockElement=null;globalThis.window=win;globalThis.document=doc;canvas.focus=()=>{};canvas.requestPointerLock=async()=>{throw Error('Denied');};doc.exitPointerLock=()=>{doc.pointerLockElement=null;doc.dispatchEvent(new Event('pointerlockchange'));};
 let locked=false;const camera=new T.PerspectiveCamera(),look=load('./camera.ts').createLook(camera,canvas,{activate(){},hover(){},manual(){},escape(){},jump(){},lockChanged(value){locked=value;}});
 try{assert.equal(await look.lock(),false);assert(!locked);canvas.requestPointerLock=async()=>{doc.pointerLockElement=canvas;doc.dispatchEvent(new Event('pointerlockchange'));};assert(await look.lock());assert(locked);look.unlock();assert(!locked);assert.equal(doc.pointerLockElement,null);doc.pointerLockElement=canvas;doc.dispatchEvent(new Event('pointerlockchange'));doc.exitPointerLock();assert(!locked);look.setEnabled(false);assert.equal(await look.lock(),false);}finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
test('memory-world travel reaches the return doorway and uses the existing transition',()=>{
 for(const sun of [false,true]){
  const scene=new T.Scene(),solids=[],world=load('./impossible-threshold.ts').createImpossibleThreshold(scene,solids),camera=new T.PerspectiveCamera();
  try{
   camera.position.set(sun?12:-12,1.65,-69);world.update(0,true,camera);world.activate(sun);world.update(0,true,camera);camera.position.z=-70.6;world.update(.01,true,camera);assert(world.active);
   camera.position.set(sun?10:0,1.65,30);world.update(0,true,camera);scene.updateMatrixWorld(true);
   const move=(p,d)=>world.move(p,d,()=>{}),path=travel.planEnvironmentExit(camera.position,world.environment,p=>travel.walkingRouteClear(p,move));assert(path,world.environment);
   const guide=travel.createMapTravel();assert(guide.start(path));for(let i=0;i<1000&&guide.ownsMotion;i++)guide.update(.05,camera.position,move);assert.equal(guide.state,'arrived');world.update(0,true,camera);assert(!world.active);assert(camera.position.z<-69);
  }finally{world.dispose();}
 }
});
test('Impossible House travel uses the real paired return threshold',()=>{
 const scene=new T.Scene(),solids=[],world=load('./loop-district.ts').createLoopDistrict(scene,solids),camera=new T.PerspectiveCamera();
 try{world.activate('impossible-house');camera.position.set(249,1.65,41);world.update(1,true,camera);camera.position.z=39.7;world.update(0,true,camera);assert(world.active);camera.position.set(400,1.65,435);world.update(0,true,camera);scene.updateMatrixWorld(true);
 const move=(p,d)=>world.move(p,d),path=travel.planEnvironmentExit(camera.position,'vault',p=>travel.walkingRouteClear(p,move));assert(path);const guide=travel.createMapTravel();guide.start(path);for(let i=0;i<1000&&guide.ownsMotion;i++)guide.update(.05,camera.position,move);assert.equal(guide.state,'arrived');world.update(0,true,camera);assert(!world.active);assert(Math.abs(camera.position.x-249)<.1);
 }finally{world.dispose();}
});
test('one physical flight rig follows valid ground placements without duplicating station equipment',()=>{
 const doc=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:()=>()=>{}})})};const scene=new T.Scene(),camera=new T.PerspectiveCamera(),visual=load('./flight-scene.ts').createFlightScene(scene,camera);
 try{const root=scene.getObjectByName('Sky Explorer station'),rig=root.children.find(o=>o.isGroup),count=root.children.length;
 for(const point of [new T.Vector3(-30,1.65,70),new T.Vector3(-39,16.05,50)]){visual.update(false,false,0,point,true);scene.updateMatrixWorld(true);const position=rig.getWorldPosition(new T.Vector3());assert.equal(position.x,point.x);assert.equal(position.z,point.z);assert(Math.abs(position.y-(point.y-1))<.001);assert(rig.visible);visual.update(true,false,0,point,true);assert(!rig.visible);assert.equal(root.children.length,count);}
 }finally{visual.dispose();globalThis.document=doc;}
});
