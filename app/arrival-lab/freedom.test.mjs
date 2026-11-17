import { test,after } from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const dir=await mkdtemp(join(tmpdir(),'arrival-freedom-'));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(dir,'node_modules'),'dir');
for(const name of ['jumping','sky-coaster','skytube','collision','geography']){const source=await readFile(new URL(`./${name}.ts`,import.meta.url),'utf8');await writeFile(join(dir,name+'.mjs'),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from ['"])(\.\/[^'"]+)(['"])/g,'$1$2.mjs$3'));}
const {createJump}=await import(join(dir,'jumping.mjs'));
const {createSkyCoaster}=await import(join(dir,'sky-coaster.mjs'));
after(()=>rm(dir,{recursive:true,force:true}));
test('jump has one apex, rejects airborne repeats, lands and supports raised solids',()=>{
 const p=new T.Vector3(0,1.65,0),jump=createJump([]);jump.update(0,p,1.65,true);jump.request();let max=p.y;
 for(let i=0;i<100;i++){jump.update(.01,p,1.65,true);max=Math.max(max,p.y);if(i===20)jump.request();}
 assert.ok(max>2.6&&max<2.7);assert.equal(jump.airborne,false);assert.equal(p.y,1.65);
 const block=new T.Mesh(new T.BoxGeometry(3,.7,3),new T.MeshBasicMaterial());block.position.y=.35;block.updateMatrixWorld();
 const raised=createJump([block]);p.set(4,1.65,0);raised.update(0,p,1.65,true);raised.request();
 for(let i=0;i<80;i++){if(i===25)p.x=0;raised.update(.01,p,1.65,true);}
 assert.equal(raised.airborne,false);assert.ok(Math.abs(p.y-2.35)<1e-6);raised.update(.02,p,1.65,true);assert.ok(Math.abs(p.y-2.35)<1e-6);
 p.x=4;for(let i=0;i<50;i++)raised.update(.02,p,1.65,true);assert.equal(p.y,1.65);
});
test('coaster completes repeated physical circuits, gates exit, preserves look and releases control',()=>{
 const scene=new T.Scene(),solids=[],ride=createSkyCoaster(scene,solids),camera=new T.PerspectiveCamera();
 for(let round=0;round<3;round++){
  camera.position.set(-58,1.65,92);assert.ok(ride.activate(camera));assert.equal(ride.activate(camera),false);
  const q=camera.quaternion.clone();let high=0;
  for(let i=0;i<Math.ceil((ride.duration+3)/.05);i++){ride.update(.05,false,camera);high=Math.max(high,camera.position.y);}
  assert.equal(ride.phase,'docked');assert.ok(high>24);assert.ok(camera.quaternion.equals(q));assert.ok(ride.car.position.distanceTo(ride.route.getPointAt(0))<1e-7);
  assert.ok(ride.activate(camera));for(let i=0;i<30;i++)ride.update(.05,false,camera);
  assert.equal(ride.ownsPassenger,false);assert.ok(camera.position.distanceTo(new T.Vector3(-58,1.65,92))<1e-7);
 }
 ride.dispose();assert.equal(ride.root.parent,null);
});
