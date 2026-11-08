import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, readdir, mkdtemp, symlink, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import ts from 'typescript';
import * as T from 'three';
const temp=await mkdtemp(join(tmpdir(),'arrival-spatial-'));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(temp,'node_modules'),'dir');
for(const name of await readdir(new URL('.',import.meta.url),{recursive:true})){
 if(!name.endsWith('.ts'))continue;
 const output=join(temp,name.replace(/\.ts$/,'.mjs'));await mkdir(dirname(output),{recursive:true});
 const source=await readFile(new URL(name,import.meta.url),'utf8');
 await writeFile(output,ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from\s+['"])(\.[^'"]+)(['"])/g,(all,a,b,c)=>a+b+(/\.[a-z]+$/i.test(b)?'':'.mjs')+c));
}
const {buildEnvironment}=await import(join(temp,'environment.mjs'));
const {createCollision}=await import(join(temp,'collision.mjs'));
const {createLook}=await import(join(temp,'camera.mjs'));
const {createJourney}=await import(join(temp,'journey.mjs'));
const {createWorks}=await import(join(temp,'works/environment.mjs'));
after(()=>rm(temp,{recursive:true,force:true}));
const scene=new T.Scene(), architecture=buildEnvironment(scene);
after(()=>architecture.dispose());
test('barrel and all three ribs have mirrored cross sections and unchanged crown heights',()=>{
 const vaults=architecture.solids.filter(m=>m.geometry.type==='ExtrudeGeometry'&&m.geometry.parameters.shapes.getPoints().length>90);
 assert.equal(vaults.length,4);
 for(const mesh of vaults){const points=mesh.geometry.parameters.shapes.getPoints();for(const p of points)assert.ok(points.some(q=>Math.abs(p.x+q.x)<1e-6&&Math.abs(p.y-q.y)<1e-6));}
 vaults[0].geometry.computeBoundingBox();assert.ok(Math.abs(vaults[0].geometry.boundingBox.max.y-44.1)<1e-4);
});
test('Works cheeks meet opening edges without coplanar overlap; passage clears the visitor disk both ways',()=>{
 const oldDocument=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 const works=createWorks(scene,architecture.solids);globalThis.document=oldDocument;scene.updateMatrixWorld(true);
 try{
 const cheeks=architecture.solids.filter(m=>m.geometry.type==='BoxGeometry'&&m.geometry.parameters.width===5&&m.geometry.parameters.height===8);
 assert.equal(cheeks.length,2);
 const bounds=cheeks.map(m=>new T.Box3().setFromObject(m)).sort((a,b)=>a.min.z-b.min.z);
 assert.ok(Math.abs(bounds[0].max.z+96)<1e-6);assert.ok(Math.abs(bounds[1].min.z+92)<1e-6);
 const lowerWalls=architecture.solids.filter(m=>m.position.x===11&&m.geometry.parameters?.height===8);
 for(const cheek of bounds)for(const wall of lowerWalls){const b=new T.Box3().setFromObject(wall);assert.ok(Math.min(cheek.max.z,b.max.z)-Math.max(cheek.min.z,b.min.z)<1e-6,'Cheeks replace lower wall ends');}
 const slabs=architecture.solids.filter(m=>m.geometry.type==='BoxGeometry'&&m.position.y<0&&Math.abs(m.position.y+m.geometry.parameters.height/2)<1e-6);
 assert.equal(slabs.length,3);
 const slabBounds=slabs.map(m=>new T.Box3().setFromObject(m));
 for(let i=0;i<slabBounds.length;i++)for(let j=i+1;j<slabBounds.length;j++){
  const a=slabBounds[i],b=slabBounds[j];
  const width=Math.min(a.max.x,b.max.x)-Math.max(a.min.x,b.min.x),depth=Math.min(a.max.z,b.max.z)-Math.max(a.min.z,b.min.z);
  assert.ok(width<=1e-6||depth<=1e-6,'No duplicate floor top planes');
 }
 for(let x=14.25;x<54;x+=.5)for(let z=-113.75;z<-74;z+=.5)assert.equal(slabBounds.filter(b=>x>b.min.x&&x<b.max.x&&z>b.min.z&&z<b.max.z).length,1,'Complete annex floor');
 const move=createCollision(architecture.solids),p=new T.Vector3(0,1.65,-94);
 move(p,new T.Vector3(22,0,0));assert.ok(Math.abs(p.x-22)<1e-5);
 move(p,new T.Vector3(-22,0,0));assert.ok(Math.abs(p.x)<1e-5);
 // Full sprint-sized sweep into the light-well side wall outside its opening.
 p.set(0,1.65,-87);move(p,new T.Vector3(25,0,0));assert.ok(p.x<9.8);
 }finally{works.dispose();}
});
test('Shift sprint eases to 2.25x walking speed, decelerates, and clears on blur/disable',()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;
 const win=new EventTarget(),doc=new EventTarget(),canvas=new EventTarget();
 globalThis.window=win;globalThis.document=doc;doc.pointerLockElement=canvas;doc.exitPointerLock=()=>{doc.pointerLockElement=null;};
 const camera=new T.PerspectiveCamera();const look=createLook(camera,canvas,{activate(){},hover(){},escape(){},manual(){}});
 const key=(code,type='keydown')=>{const e=new Event(type,{cancelable:true});Object.defineProperties(e,{code:{value:code},key:{value:code}});win.dispatchEvent(e);};
 try{
 key('KeyW');let speed;for(let i=0;i<120;i++)speed=look.movement(1/60).delta.length()*60;
 assert.ok(Math.abs(speed-4.8)<.001);key('ShiftLeft');let accelerated=look.movement(1/60).delta.length()*60;assert.ok(accelerated>4.8&&accelerated<10.8);
 for(let i=0;i<120;i++)speed=look.movement(1/60).delta.length()*60;assert.ok(Math.abs(speed/4.8-2.25)<.001);
 key('ShiftLeft','keyup');speed=look.movement(1/60).delta.length()*60;assert.ok(speed>4.8&&speed<10.8);
 win.dispatchEvent(new Event('focusin'));assert.equal(look.movement(1/60).delta.length(),0);
 key('KeyW');win.dispatchEvent(new Event('blur'));assert.equal(look.movement(1/60).delta.length(),0);
 look.setEnabled(false);key('KeyW');assert.equal(look.movement(1/60).delta.length(),0);
 }finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});

test('radio can pause and resume the existing journey without a camera jump',()=>{
 const clock=globalThis.performance;let now=1000;globalThis.performance={now:()=>now};
 try{
 const camera=new T.PerspectiveCamera();camera.position.set(5,1.65,17);
 const journey=createJourney(camera,architecture,()=>{});journey.approach();now=1600;journey.update(now,.016);
 const position=camera.position.clone();journey.setPaused(true);now=7600;journey.update(now,.016);assert.ok(camera.position.equals(position));
 journey.setPaused(false);journey.update(now,.016);assert.ok(camera.position.equals(position));
 now+=200;journey.update(now,.016);assert.ok(camera.position.distanceTo(position)>0);
 }finally{globalThis.performance=clock;}
});
