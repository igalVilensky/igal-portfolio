import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const dir=await mkdtemp(join(tmpdir(),'arrival-secrets-'));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(dir,'node_modules'),'dir');
for(const name of ['environment','wall-geometry','connectivity','subterranean','whale-voyage','discovery-copy','npc-passenger','two-secrets','skytube','collision','geography'])await writeFile(join(dir,name+'.mjs'),ts.transpileModule(await readFile(new URL(name+'.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from ['"])(\.\/[^'"]+)(['"])/g,'$1$2.mjs$3'));
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
test('whale makes a two-way voyage, releases walking at Aeralis, pauses and restores camera FOV',()=>{
 const scene=new T.Scene(),s=createTwoSecrets(scene),camera=new T.PerspectiveCamera(72);camera.position.copy(secretPlaces.call);
 assert.ok(s.activate('call',camera));assert.equal(s.whalePhase,'calling');assert.equal(s.activate('ride',camera),false);advance(s,camera,8);assert.equal(s.whalePhase,'ready');assert.ok(s.whale.position.distanceTo(secretPlaces.dock)<.3);
 for(let trip=0;trip<2;trip++){
  assert.ok(s.activate('call',camera));assert.equal(s.ownsPassenger,true);assert.equal(s.activate('home',camera),false);advance(s,camera,3);assert.equal(s.whalePhase,'riding');const p=camera.position.clone();for(let i=0;i<10;i++)s.update(.1,false,camera,true);assert.ok(camera.position.equals(p));
  advance(s,camera,55);assert.equal(s.whalePhase,'landed');assert.equal(s.ownsPassenger,true);assert.equal(camera.fov,72);assert.ok(s.activate('ride',camera));advance(s,camera,2.5);assert.equal(s.ownsPassenger,false);assert.equal(s.whalePhase,'ready');
  if(trip===0){assert.equal(s.onRemoteIsland,true);assert.ok(camera.position.distanceTo(new T.Vector3(-880,111.65,903))<.001);s.move(camera.position,new T.Vector3(1000,0,0));assert.ok(camera.position.x<-849);camera.position.set(-880,111.65,903);}
  else {assert.equal(s.onRemoteIsland,false);assert.ok(camera.position.distanceTo(new T.Vector3(26,1.65,122))<.001);}
 }
 assert.ok(s.activate('call',camera));assert.equal(s.whalePhase,'boarding');s.dispose();
});
const {depthConnections,depthContains,depthHeight,moveInDepth}=await import(join(dir,'subterranean.mjs'));
test('all four underground connections enter and leave with exact surface heights and visibility restored',()=>{
 const scene=new T.Scene(),surface=new T.Group(),hidden=new T.Group();hidden.visible=false;scene.add(surface,hidden);const s=createTwoSecrets(scene),c=new T.PerspectiveCamera();
 for(let i=0;i<4;i++){
  c.position.fromArray(depthConnections[i].surface);assert.ok(s.activate('depth:enter:'+i,c));advance(s,c,2);assert.equal(s.inDepth,true);assert.equal(surface.visible,false);assert.ok(depthContains(c.position.x,c.position.z));assert.ok(Math.abs(c.position.y-depthHeight(c.position.x)-1.65)<1e-8);
  assert.ok(s.activate('depth:exit:'+i,c));advance(s,c,2);assert.equal(s.active,false);assert.deepEqual(c.position.toArray(),[...depthConnections[i].surface]);assert.equal(surface.visible,true);assert.equal(hidden.visible,false);
 }
 c.position.fromArray(depthConnections[0].surface);s.activate('depth:enter:0',c);advance(s,c,2);assert.ok(s.returnHome(c));advance(s,c,2);assert.equal(s.active,false);s.dispose();
});
test('the authored labyrinth is connected, ramps are continuous and bridge edges resist tunnelling',()=>{
 const start=[2,2],seen=new Set(['2,2']),queue=[start];
 for(let i=0;i<queue.length;i++){const [x,z]=queue[i];for(const [dx,dz] of [[4,0],[-4,0],[0,4],[0,-4]]){const nx=x+dx,nz=z+dz,k=nx+','+nz;if(!seen.has(k)&&depthContains(nx,nz)){seen.add(k);queue.push([nx,nz]);}}}
 assert.ok(seen.size>300);for(const c of depthConnections)assert.ok(seen.has((Math.floor(c.below[0]/4)*4+2)+','+(Math.floor(c.below[2]/4)*4+2)));
 const p=new T.Vector3(2,-58.35,2);moveInDepth(p,new T.Vector3(52,0,0));assert.ok(Math.abs(p.y+54.35)<1e-8);assert.ok(p.x>53.9);
 p.set(-54,-58.35,2);moveInDepth(p,new T.Vector3(0,0,100));assert.ok(p.z<3.65);assert.ok(depthContains(p.x,p.z));
});
test('surface passages are ray-pickable from their safe landings and geometry stays batched',()=>{
 const scene=new T.Scene(),solids=[],s=createTwoSecrets(scene,solids);scene.updateMatrixWorld(true);
 for(let i=0;i<4;i++){
  const origin=new T.Vector3().fromArray(depthConnections[i].surface),target=s.targets.find(o=>o.userData.secret==='depth:enter:'+i),center=new T.Box3().setFromObject(target).getCenter(new T.Vector3());
  const ray=new T.Raycaster(origin,center.sub(origin).normalize());const hit=s.pick(ray);assert.ok(hit);assert.equal(hit.object.userData.secret,'depth:enter:'+i);
 }
 let meshes=0;s.depth.root.traverse(o=>{if(o.isMesh)meshes++;});assert.ok(meshes<90,'archive draw batches: '+meshes);
 const island=s.exterior.getObjectByName('Aeralis · wind observatory');let islandMeshes=0;island.traverse(o=>{if(o.isMesh)islandMeshes++;});assert.ok(islandMeshes<20,'island draw batches: '+islandMeshes);
 s.dispose();assert.equal(solids.length,0);assert.equal(s.depth.root.parent,null);
});

test('the marked hall approach is walkable and the entrance is not hidden behind building geometry',async()=>{
 const {buildEnvironment}=await import(join(dir,'environment.mjs')),{createCollision}=await import(join(dir,'collision.mjs'));
 const scene=new T.Scene(),architecture=buildEnvironment(scene),s=createTwoSecrets(scene,architecture.solids);scene.updateMatrixWorld(true);
 const walk=createCollision(architecture.solids),p=new T.Vector3(5,1.65,11);
 walk(p,new T.Vector3(15,0,-3));walk(p,new T.Vector3(0,0,-46));assert.ok(p.distanceTo(new T.Vector3(20,1.65,-38))<.01);
 const target=s.targets.find(o=>o.userData.secret==='depth:enter:0'),center=new T.Box3().setFromObject(target).getCenter(new T.Vector3()),ray=new T.Raycaster(p,center.sub(p).normalize());
 const first=ray.intersectObjects(architecture.solids,false)[0];assert.equal(first?.object.userData.secret,'depth:enter:0');assert.ok(s.canActivate('depth:enter:0',p));
 s.dispose();architecture.dispose();
});
