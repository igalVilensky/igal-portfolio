import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,mkdir,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,dirname} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const dir=await mkdtemp(join(tmpdir(),'arrival-details-'));
after(()=>rm(dir,{recursive:true,force:true}));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(dir,'node_modules'),'dir');
const compiled=new Set();
async function prepare(name){
 if(compiled.has(name))return;compiled.add(name);
 const source=await readFile(new URL(name+'.ts',import.meta.url),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 for(const match of code.matchAll(/from ['"](\.\/[^'"]+)['"]/g))await prepare(join(dirname(name),match[1]));
 await mkdir(dirname(join(dir,name)),{recursive:true});
 await writeFile(join(dir,name+'.mjs'),code.replace(/from ['"](\.\/[^'"]+)['"]/g,"from '$1.mjs'"));
}
for(const name of ['lagoon','sky-coaster','expansion','living-quarters','two-secrets','lagoon-model','creation-yard','carryables','print-model','impossible-threshold'])await prepare(name);
const load=name=>import(join(dir,name+'.mjs'));
const savedDocument=globalThis.document,savedStorage=globalThis.localStorage;
const canvas=()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){},clearRect(){}})});
function storage(){const data=new Map();globalThis.localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};return data;}
after(()=>{globalThis.document=savedDocument;globalThis.localStorage=savedStorage;});
test('office, atrium and domestic windows have real thickness, open sightlines and solid sills',async()=>{
 const {createExpansion}=await load('expansion'),{createLivingQuarters}=await load('living-quarters');
 globalThis.document={createElement:canvas};const scene=new T.Scene(),solids=[];const wing=createExpansion(scene,solids);
 // Skip asynchronous portrait images in this geometry-only check.
 globalThis.document=undefined;const home=createLivingQuarters(scene,solids);scene.updateMatrixWorld(true);
 try{
  const ray=new T.Raycaster();
  for(const [origin,direction] of [[[-54,2.5,40],[0,0,1]],[[101,2.5,19],[1,0,0]],[[101,2.3,6],[1,0,0]],[[101,2.3,32],[1,0,0]]]){
   ray.set(new T.Vector3(...origin),new T.Vector3(...direction));ray.far=4;
   assert.equal(ray.intersectObjects(solids,false).length,0,'no invisible wall in opening');
   const lower=new T.Vector3(...origin);lower.y=.8;ray.set(lower,new T.Vector3(...direction));
   assert(ray.intersectObjects(solids,false).length>0,'retained sill blocks falls');
  }
 }finally{wing.dispose();home.dispose();globalThis.document=savedDocument;}
});
test('orbital planes require the correct configuration, reveal over time and reset deterministically',async()=>{
 const {createCelestialAlignment}=await load('two-secrets');const state=createCelestialAlignment();
 assert.equal(state.turn(-1),false);assert.equal(state.turn(NaN),false);
 for(let i=0;i<3;i++)for(let j=0;j<=i;j++)assert(state.turn(i));
 assert.equal(state.phase,'revealing');assert.equal(state.turn(0),false);
 for(let i=0;i<31;i++)state.update(.1);assert.equal(state.phase,'observing');assert.equal(state.progress,1);
 state.reset();assert.equal(state.phase,'tuning');assert.deepEqual(state.planes,[0,0,0]);assert.equal(state.progress,0);
});
test('all marine lanes stay submerged, east of the dry tube, above corals and away from the pearl',async()=>{
 const {marineRoute,marinePositionValid,inTunnel,lagoon}=await load('lagoon-model');
 for(let i=0;i<5;i++)for(let t=0;t<180;t+=.1)for(const near of [0,.5,1]){
  const p=marineRoute(i,t,near);assert(marinePositionValid(p));assert(!inTunnel(p.x,p.y,p.z));assert(p.y+1<lagoon.water);assert(p.y-1.1> -6.8);
  assert(Math.hypot(p.x+193,p.y+6.5,p.z-69)>4);
  const next=marineRoute(i,t+.001,near),forward=new T.Vector3(Math.cos(p.yaw),0,-Math.sin(p.yaw));
  assert(forward.dot(new T.Vector3(next.x-p.x,0,next.z-p.z))>0,'faces travel direction');
 }
});
test('visibly selected piece is deleted without stale preview; undo and reload restore only built objects',async()=>{
 storage();const {createCreationYard}=await load('creation-yard');const {builderKey,parseCreation}=await load('builder-model');
 const scene=new T.Scene(),builder=createCreationYard(scene),camera=new T.PerspectiveCamera(65,1,.08,200);
 try{
  const p={id:1,type:'cube',color:'#ed896a',rotation:0,x:-166,y:.5,z:132};builder.store.put(p);builder.undo();builder.update(camera);builder.store.put(p);
  // Sync through an ordinary command, then aim at the actual piece.
  builder.close();camera.position.set(-166,3,127);camera.lookAt(-166,.59,132);camera.updateMatrixWorld(true);
  builder.select();builder.activate(camera);assert.equal(builder.selected,1);assert.equal(builder.draft,null);
  const box=scene.children[0].children.find(o=>o.type==='BoxHelper');assert.equal(box.visible,true);
  builder.close();assert.equal(box.visible,false);builder.update(camera);assert.equal(box.visible,true,'reopening restores the selected outline');
  builder.remove();assert.equal(builder.selected,null);assert.equal(builder.draft,null);assert.equal(box.visible,false);assert.equal(builder.store.pieces.length,0);assert.equal(localStorage.getItem(builderKey),null);
  builder.place();assert.equal(builder.store.pieces.length,0,'no stale draft resurrects the deleted piece');
  assert.equal(scene.children[0].children.filter(o=>o.userData.piece===1).length,0);
  builder.undo();assert.equal(builder.store.pieces.length,1);assert.equal(parseCreation(localStorage.getItem(builderKey)).length,1);
  builder.select();builder.activate(camera);builder.move();camera.lookAt(-163,0,132);camera.updateMatrixWorld(true);builder.update(camera);assert(builder.valid);builder.place();assert.notEqual(builder.store.pieces[0].x,p.x);
  builder.select();camera.lookAt(builder.store.pieces[0].x,.6,builder.store.pieces[0].z);camera.updateMatrixWorld(true);builder.activate(camera);builder.rotate();builder.setColor('#76cbb7');assert.equal(builder.store.pieces[0].rotation,1);assert.equal(builder.store.pieces[0].color,'#76cbb7');
 }finally{builder.dispose();}
});
test('figurine identity, metadata, orientation and scale survive carry, placement and cancellation',async()=>{
 const {createCarryables}=await load('carryables'),{figurine,defaultDesign,disposeObject}=await load('print-model');
 const scene=new T.Scene(),floor=new T.Mesh(new T.BoxGeometry(12,.2,12),new T.MeshBasicMaterial()),toy=figurine(defaultDesign),camera=new T.PerspectiveCamera();
 floor.position.y=-.1;toy.position.set(2,0,1);toy.rotation.y=.7;toy.scale.setScalar(.8);camera.position.set(0,1.65,1);camera.lookAt(0,0,-1);scene.add(floor,toy,camera);scene.updateMatrixWorld(true);
 const carry=createCarryables([floor]),identity=toy.uuid,rotation=toy.quaternion.clone();carry.register(toy);
 try{
  assert(carry.pickup(toy));assert(!carry.pickup(toy));carry.update(camera);assert(carry.valid);assert(toy.quaternion.angleTo(camera.quaternion.clone().multiply(rotation))<1e-6);assert(new T.Box3().setFromObject(toy).getSize(new T.Vector3()).y<=.56);
  assert(carry.place());assert.equal(toy.uuid,identity);assert.deepEqual(toy.userData.printDesign,defaultDesign);assert.equal(toy.scale.x,.8);assert(toy.quaternion.equals(rotation));assert(new T.Box3().setFromObject(toy).min.y>=0);
  const placed=toy.position.clone();assert(carry.pickup(toy));carry.update(camera);carry.cancel();assert(toy.position.equals(placed));assert.equal(scene.children.filter(o=>o===toy).length,1);
  carry.unregister(toy);assert(!carry.pickup(toy));
 }finally{carry.dispose();disposeObject(toy);floor.geometry.dispose();floor.material.dispose();}
});
test('coastal light walk responds to reachable stones, resets and retains isolated sunlight',async()=>{
 const {createImpossibleThreshold}=await load('impossible-threshold');globalThis.document={createElement:canvas};
 const scene=new T.Scene(),world=createImpossibleThreshold(scene,[]),camera=new T.PerspectiveCamera();
 try{
  camera.position.set(12,1.65,-69);world.activate(true);world.update(2,false,camera);camera.position.z=-70.6;world.update(.05,false,camera);assert.equal(world.environment,'sun-world');
  for(const x of [6,9,12]){camera.position.set(x,1.65,33);world.update(.1,true,camera);}assert.equal(world.lightWalkProgress,3);
  world.setTheme(true);assert.equal(scene.background.getHexString(),'b4def1');world.setLocale('ru');
  camera.position.set(15,1.65,35);world.update(.1,true,camera);assert.equal(world.lightWalkProgress,0);
 }finally{world.dispose();globalThis.document=savedDocument;}
});

test('marine lanes clear the actual coaster bearing supports',async()=>{
 globalThis.document={createElement:canvas};const {createLagoon}=await load('lagoon'),{createSkyCoaster}=await load('sky-coaster'),{marineRoute}=await load('lagoon-model');
 const scene=new T.Scene(),solids=[],lagoon=createLagoon(scene,solids),coaster=createSkyCoaster(scene,solids);
 try{lagoon.registerSupports(coaster.root);for(let i=0;i<5;i++)for(let t=0;t<80;t+=.2){const p=marineRoute(i,t);for(const b of lagoon.supportBounds)assert(b.distanceToPoint(new T.Vector3(p.x,p.y,p.z))>2.8,JSON.stringify({p,min:b.min,max:b.max}));}}
 finally{lagoon.dispose();coaster.dispose();globalThis.document=savedDocument;}
});
