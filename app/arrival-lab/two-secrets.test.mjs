import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const dir=await mkdtemp(join(tmpdir(),'arrival-secrets-'));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(dir,'node_modules'),'dir');
for(const name of ['npc-passenger','two-secrets','skytube','collision','geography'])await writeFile(join(dir,name+'.mjs'),ts.transpileModule(await readFile(new URL(name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from ['"])(\.\/[^'"]+)(['"])/g,'$1$2.mjs$3'));
const {createTwoSecrets,secretPlaces}=await import(join(dir,'two-secrets.mjs'));
after(()=>rm(dir,{recursive:true,force:true}));
const advance=(s,c,t)=>{for(let elapsed=0;elapsed<t;elapsed+=.05)s.update(.05,false,c);};
test('all three transformations remain bounded, reward play, and restore Origin visibility and exact pose',()=>{
 const scene=new T.Scene(),outside=new T.Group(),hidden=new T.Group();hidden.visible=false;scene.add(outside,hidden);scene.fog=new T.FogExp2('#abcdef',.002);const fog=scene.fog;
 const s=createTwoSecrets(scene),camera=new T.PerspectiveCamera();camera.position.copy(secretPlaces.entrance);camera.rotation.set(.2,.7,0);const pose=camera.position.clone(),orientation=camera.quaternion.clone();
 assert.equal(s.activate('moon',camera),false);assert.equal(s.activate('enter',camera),true);assert.equal(s.activate('enter',camera),false);advance(s,camera,2);assert.equal(s.active,true);assert.equal(outside.visible,false);assert.equal(hidden.visible,false);assert.equal(scene.fog,null);
 camera.position.copy(secretPlaces.chamber).add(new T.Vector3(0,1.65,4));advance(s,camera,4);
 for(const world of ['moon','crystal','jungle']){
  assert.ok(s.activate(world,camera));advance(s,camera,2);assert.equal(s.world,world);
  s.move(camera.position,new T.Vector3(1000,0,1000));assert.ok(Math.hypot(camera.position.x,camera.position.z)<=10.100001);
  if(world==='moon')for(let i=0;i<3;i++){const a=i*Math.PI*2/3;camera.position.copy(secretPlaces.chamber).add(new T.Vector3(Math.cos(a)*4,2.5,Math.sin(a)*4));s.update(.05,false,camera);}
  if(world==='crystal')for(let i=0;i<3;i++)assert.ok(s.activate('crystal:'+i,camera));
  if(world==='jungle'){camera.position.copy(secretPlaces.chamber).add(new T.Vector3(0,1.65,0));advance(s,camera,3);}
  assert.ok(s.activate('home',camera));advance(s,camera,2);assert.equal(s.world,'observatory');
 }
 assert.deepEqual(s.discoveries,{moon:3,crystal:3,jungle:1});
 assert.ok(s.returnHome(camera));advance(s,camera,2);assert.equal(s.active,false);assert.ok(camera.position.equals(pose));assert.ok(camera.quaternion.angleTo(orientation)<1e-7);assert.equal(outside.visible,true);assert.equal(hidden.visible,false);assert.equal(scene.fog,fog);
 s.dispose();assert.equal(s.exterior.parent,null);assert.equal(s.chamber.parent,null);
});
test('whale stages its reveal, pauses, completes a full ride and allows a second safe boarding',()=>{
 const scene=new T.Scene(),s=createTwoSecrets(scene),camera=new T.PerspectiveCamera();camera.position.copy(secretPlaces.call);
 assert.ok(s.activate('call',camera));assert.equal(s.whalePhase,'calling');assert.equal(s.activate('ride',camera),false);advance(s,camera,13);assert.equal(s.whalePhase,'ready');assert.ok(s.whale.position.distanceTo(secretPlaces.dock)<.3);
 for(let trip=0;trip<2;trip++){
  assert.ok(s.activate('call',camera));assert.equal(s.ownsPassenger,true);assert.equal(s.activate('home',camera),false);advance(s,camera,3);assert.equal(s.whalePhase,'riding');const p=camera.position.clone();for(let i=0;i<10;i++)s.update(.1,false,camera,true);assert.ok(camera.position.equals(p));
  advance(s,camera,83);assert.equal(s.whalePhase,'landed');assert.equal(s.ownsPassenger,true);assert.ok(camera.position.distanceTo(secretPlaces.dock)<7);assert.ok(s.activate('ride',camera));advance(s,camera,2.5);assert.equal(s.ownsPassenger,false);assert.equal(s.whalePhase,'ready');assert.ok(camera.position.distanceTo(new T.Vector3(26,1.65,122))<.001);
 }
 s.dispose();
});
