import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdtemp,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';import {join} from 'node:path';
import ts from 'typescript';import * as T from 'three';
const temp=await mkdtemp(join(tmpdir(),'ring-skyfall-'));after(()=>rm(temp,{recursive:true,force:true}));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(temp,'node_modules'),'dir');
for(const name of ['ring-skyfall','orbital-sculpture','child-character','winter-home','sky-coaster','skytube','collision','geography','origin','camera']){
 const code=ts.transpileModule(await readFile(new URL(`./${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/from '(\.\/[^']+)'/g,"from '$1.mjs'");await writeFile(join(temp,name+'.mjs'),code);
}
const {createRingSkyfall,skyfall,brakeSeconds}=await import(join(temp,'ring-skyfall.mjs'));
const {createOrbitalSculpture}=await import(join(temp,'orbital-sculpture.mjs'));
const {createChildCharacter}=await import(join(temp,'child-character.mjs'));
const charge=s=>{for(let i=0;i<4;i++)assert(s.activate(i*400,i));for(let i=0;i<61;i++)s.update(.05);assert.equal(s.phase,'open');};

test('rings charge separately, debounce repeats, align, open and time out for repeat visits',()=>{
 const s=createRingSkyfall();assert.equal(s.enter(new T.Vector3(-49,1.65,4.5)),false);
 assert(s.activate(0,2));assert.equal(s.charges,4);assert.equal(s.activate(100,0),false);
 assert(s.activate(400,0));assert(s.activate(800,1));assert(s.activate(1200,3));assert.equal(s.phase,'aligning');assert.equal(s.count,4);
 for(let i=0;i<61;i++)s.update(.05);assert.equal(s.phase,'open');
 assert.equal(s.enter(new T.Vector3(-49,5,4.5)),false);assert.equal(s.enter(new T.Vector3(0,1.65,0)),false);
 for(let i=0;i<260;i++)s.update(.2);assert.equal(s.phase,'idle');assert.equal(s.count,0);assert(s.activate(10000,1));
});

test('portal -> high reveal -> continuous fall -> cubic braking -> exact safe landing',()=>{
 const s=createRingSkyfall(),p=new T.Vector3(-49,1.65,4.5);charge(s);assert(s.enter(p));const phases=new Set();let previous=Infinity,peak=0,finalFallVelocity=0,initialBrakeVelocity=0;
 for(let i=0;i<500;i++){
  const phase=s.phase,y=p.y;s.update(.05,p);phases.add(s.phase);peak=Math.max(peak,p.y);
  if(phase==='falling'||phase==='braking'){assert(p.y<=previous+.001);previous=p.y;assert(p.y>=skyfall.eye);assert.equal(p.x,skyfall.x);assert.equal(p.z,skyfall.z);}
  if(phase==='falling'&&s.phase==='braking')finalFallVelocity=(y-p.y)/.05;
  if(phase==='braking'&&s.time<.06)initialBrakeVelocity=(y-p.y)/.05;
 }
 assert(peak>=320);for(const phase of ['reveal','falling','braking','landed','cooldown'])assert(phases.has(phase));
 assert.deepEqual(p.toArray(),[12,1.65,115]);assert.equal(s.ownsMotion,false);assert(Math.abs(finalFallVelocity-initialBrakeVelocity)<3);
 assert(Math.abs(3*(skyfall.brake-skyfall.eye)/brakeSeconds-2*(skyfall.top-skyfall.brake)/skyfall.fallSeconds)<1e-8);
});

test('every owned phase can safely cancel, long frames are bounded, and reduced motion still completes',()=>{
 for(const target of ['launching','reveal','falling','braking','landed']){
  const s=createRingSkyfall(),p=new T.Vector3(-49,1.65,4.5);charge(s);s.enter(p);
  for(let i=0;i<500&&s.phase!==target;i++)s.update(.05,p);
  assert.equal(s.phase,target);assert(s.cancel(p));assert.equal(s.ownsMotion,false);assert.deepEqual(p.toArray(),[12,1.65,115]);assert.equal(s.cancel(p),false);
 }
 const scene=new T.Scene(),solids=[],toy=createOrbitalSculpture(scene,solids),camera=new T.PerspectiveCamera();camera.position.set(-49,1.65,4.5);
 const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)materials.add(o.material);});let disposed=0;geometries.forEach(g=>g.addEventListener('dispose',()=>disposed++));materials.forEach(m=>m.addEventListener('dispose',()=>disposed++));
 try{
  charge(toy.sequence);toy.update(0,.05,true,camera,true);assert(toy.ownsMotion);
  for(let i=0;i<450;i++)toy.update(i*50,.05,true,camera,false);
  assert(!toy.ownsMotion);assert.deepEqual(camera.position.toArray(),[12,1.65,115]);
  const fresh=createRingSkyfall();charge(fresh);fresh.enter(camera.position.set(-49,1.65,4.5));fresh.update(1000,camera.position);assert.equal(fresh.phase,'launching');
 }finally{toy.dispose();assert.equal(solids.length,0);assert.equal(scene.children.length,0);assert.equal(disposed,geometries.size+materials.size);}
});

test('skyfall column clears existing transport corridors and lands on the Origin terrace',async()=>{
 const {createSkyCoaster}=await import(join(temp,'sky-coaster.mjs'));const {createSkyRoute,createScenicRoute,createSkyNetwork}=await import(join(temp,'skytube.mjs'));const {createOrigin}=await import(join(temp,'origin.mjs'));
 const scene=new T.Scene(),coaster=createSkyCoaster(scene,[]),solids=[],origin=createOrigin(scene,solids),sky=createSkyNetwork(scene,[]),line=new T.Line3(new T.Vector3(12,1.65,115),new T.Vector3(12,320,115)),closest=new T.Vector3();
 try{
  for(const route of [coaster.route,createSkyRoute(),createScenicRoute()])for(const p of route.getSpacedPoints(Math.ceil(route.getLength()))){line.closestPointToPoint(p,true,closest);assert(closest.distanceTo(p)>5,'skyfall clears occupied ride envelope');}
  scene.updateMatrixWorld(true);const descentRay=new T.Raycaster(new T.Vector3(12,320,115),new T.Vector3(0,-1,0),0,318);for(const root of [coaster.root,sky.transport.root,sky.scenic.root])assert.equal(descentRay.intersectObject(root,true).length,0,'fall column clears actual rails, supports and vehicles');const ray=new T.Raycaster(new T.Vector3(12,10,115),new T.Vector3(0,-1,0),0,12),hits=ray.intersectObjects(origin.root.children.filter(o=>o.isMesh),false);
  assert(hits.some(hit=>Math.abs(hit.point.y)<.1),'landing terrace exists');
 }finally{coaster.dispose();sky.dispose();origin.dispose();}
});

test('purpose-built boys have distinct child silhouettes, grounded animated feet and independent disposable resources',()=>{
 const visuals=[['nataniel',7,1.2],['adriel',3,1.025]].map(([id,age,height])=>createChildCharacter({id,age,height,hair:'#b99962',shirt:'#8c4154',pants:'#536578',skin:'#f0c7ac'}));
 const ratios=[],disposedVisuals=new Set();
 try{
  for(const v of visuals){
   assert(v.root.userData.purposeBuiltChild);v.root.updateMatrixWorld(true);const b=new T.Box3().setFromObject(v.root);assert(Math.abs(b.max.y-b.min.y-v.height)<.001);assert(Math.abs(b.min.y)<.001);
   const face=v.root.getObjectByName('Child · rounded face'),arm=v.root.getObjectByName('Child · right arm');const headBounds=new T.Box3().setFromObject(face);
   ratios.push((headBounds.max.y-headBounds.min.y)/v.height);assert(ratios.at(-1)>.23);assert(headBounds.max.x-headBounds.min.x<v.height*.35);
   const rest=arm.quaternion.clone();for(let i=0;i<60;i++){v.update(.05,true,true,false,0,0,1.7);v.root.updateMatrixWorld(true);assert(new T.Box3().setFromObject(v.root).min.y>-.002);}
   assert(arm.quaternion.angleTo(rest)>.05);
   for(let i=0;i<80;i++)v.update(.05,false,true,false);assert(Math.abs(arm.rotation.z)<.3,'held greeting returns to a relaxed arm');
   const geometries=new Set(),materials=new Set();v.root.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);materials.add(o.material);}});let disposed=0;
   geometries.forEach(g=>g.addEventListener('dispose',()=>disposed++));materials.forEach(m=>m.addEventListener('dispose',()=>disposed++));v.dispose();disposedVisuals.add(v);assert.equal(disposed,geometries.size+materials.size);
  }
  assert(ratios[1]>ratios[0]*1.08,'toddler has a visibly larger relative head');
 }finally{visuals.filter(v=>!disposedVisuals.has(v)).forEach(v=>v.dispose());}
});


test('Escape invokes safe motion cancellation even when Pointer Lock owns the canvas',async()=>{
 const {createLook}=await import(join(temp,'camera.mjs'));const oldWindow=globalThis.window,oldDocument=globalThis.document;
 globalThis.window=new EventTarget();globalThis.document=new EventTarget();const canvas=new EventTarget();document.pointerLockElement=canvas;let cancelled=0,unlocked=0;
 document.exitPointerLock=()=>{unlocked++;document.pointerLockElement=null;};const look=createLook(new T.PerspectiveCamera(),canvas,{activate(){},hover(){},manual(){},jump(){},escape(){},cancelMotion(){cancelled++;return true;}});
 try{const e=new Event('keydown',{cancelable:true});Object.assign(e,{key:'Escape',code:'Escape'});window.dispatchEvent(e);assert.equal(cancelled,1);assert.equal(unlocked,0);assert(e.defaultPrevented);}
 finally{document.pointerLockElement=null;look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});

test('winter twinkle is one shared uniform, freezes for reduced motion and does not mutate instance transforms',async()=>{
 const {createWinterHome}=await import(join(temp,'winter-home.mjs'));const parent=new T.Group(),world=createWinterHome(parent,[]);
 try{
  const bulbs=world.root.children.find(o=>o.isInstancedMesh&&o.count===126);assert(bulbs);const before=bulbs.instanceMatrix.array.slice(),shader={uniforms:{},vertexShader:'#include <common>\n#include <begin_vertex>',fragmentShader:'#include <common>\n#include <emissivemap_fragment>'};bulbs.material.onBeforeCompile(shader,{});
  assert(shader.fragmentShader.includes('twinkleTime'));world.update(.1,false);assert.equal(shader.uniforms.twinkleTime.value,.1);
  assert.equal(world.update(.1,true),false);assert.equal(shader.uniforms.twinkleTime.value,0);assert.deepEqual(bulbs.instanceMatrix.array,before);
 }finally{world.dispose();}
});


test('portal entry requires contact with the opening and catches a sprint across its plane',()=>{
 const s=createRingSkyfall();charge(s);assert.equal(s.enter(new T.Vector3(-49,1.65,5.5)),false);
 assert.equal(s.enter(new T.Vector3(-46,1.65,3.5),new T.Vector3(-46,1.65,6)),false);
 assert(s.enter(new T.Vector3(-49,1.65,3.5),new T.Vector3(-49,1.65,6)));assert.equal(s.phase,'launching');
});
