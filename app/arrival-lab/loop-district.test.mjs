import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const dir=await mkdtemp(join(tmpdir(),'loop-test-'));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(dir,'node_modules'),'dir');
for(const name of ['portal-render-state','star-geography','geography','threshold-view','loop-district','collision','origin','environment','wall-geometry','connectivity','atmosphere','spaces','atmosphere-materials','expansion']){const source=await readFile(new URL(`./${name}.ts`,import.meta.url),'utf8');await writeFile(join(dir,name+'.mjs'),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from ['"])(\.\/[^'"]+)(['"])/g,'$1$2.mjs$3'));}
const {buildEnvironment}=await import(join(dir,'environment.mjs'));
const {createExpansion}=await import(join(dir,'expansion.mjs'));
const {worldSpaces,spaceAt}=await import(join(dir,'spaces.mjs'));
const {createLoopDistrict}=await import(join(dir,'loop-district.mjs'));
const {createOrigin}=await import(join(dir,'origin.mjs'));
const {createCollision}=await import(join(dir,'collision.mjs'));
after(()=>rm(dir,{recursive:true,force:true}));
test('bridge joins both islands, supports repeated sprint sweeps and has solid side protection',()=>{
 const scene=new T.Scene(),solids=[],origin=createOrigin(scene,solids),district=createLoopDistrict(scene,solids);scene.updateMatrixWorld(true);const move=createCollision(solids),p=new T.Vector3(76,1.65,48);
 for(let i=0;i<3;i++){move(p,new T.Vector3(78,0,0));assert.ok(p.x>153);move(p,new T.Vector3(-78,0,0));assert.ok(p.x<77);}
 p.set(110,1.65,48);move(p,new T.Vector3(0,0,20));assert.ok(p.z<51.5&&p.z>50);district.dispose();origin.dispose();
});
test('all threshold pairs map position and orientation reversibly over three physical round trips',()=>{
 const scene=new T.Scene(),solids=[],district=createLoopDistrict(scene,solids),camera=new T.PerspectiveCamera();
 for(const pair of district.pairs){for(let cycle=0;cycle<3;cycle++){for(const source of pair){
  scene.updateMatrixWorld(true);camera.position.copy(source.root.localToWorld(new T.Vector3(0,1.65,2)));camera.quaternion.copy(source.root.quaternion);district.update(0,true,camera);district.activate(source.id);district.update(1,true,camera);
  for(let i=0;i<35;i++){const delta=new T.Vector3(0,0,-.1).applyQuaternion(camera.quaternion);district.move(camera.position,delta);district.update(.016,true,camera);}
  const destination=pair.find(d=>d!==source);const local=destination.root.worldToLocal(camera.position.clone());assert.ok(local.z>.6,`${source.id}: ${local.toArray()}`);assert.ok(Math.abs(local.x)<.01);assert.ok(local.y>.6&&local.y<2.4,`${source.id}: eye ${local.y}`);assert.equal(district.active,destination.environment==='loop-vault');if(district.active)assert.ok(camera.position.z>420&&camera.position.z<466,'vault landing must be inside its actual floor bounds');
 }}}
 district.dispose();assert.equal(district.root.parent,null);
});
test('stairs raise the walking surface continuously and theme keeps state and roots',()=>{
 const scene=new T.Scene(),district=createLoopDistrict(scene,[]),p=new T.Vector3(262,1.65,59);
 for(let i=0;i<95;i++)district.move(p,new T.Vector3(0,0,-.1));assert.ok(p.y>5.1);const before=p.clone(),root=district.root;district.setTheme(true);assert.ok(p.equals(before));assert.equal(root,district.root);district.dispose();
});

test('departure is in the front corridor room, with no remaining Hall door or alcove',()=>{
 const scene=new T.Scene(),solids=[],district=createLoopDistrict(scene,solids);
 const departure=district.doors.find(d=>d.id==='homecoming-return');
 assert.equal(spaceAt(departure.root.position)?.id,'journey');assert.equal(departure.environment,'journey');
 assert.equal(district.doors.filter(d=>d.environment==='hall').length,0);
 scene.updateMatrixWorld(true);
 for(const mesh of solids){const p=new T.Box3().setFromObject(mesh).getCenter(new T.Vector3());assert.ok(!(p.x>-24&&p.x<24&&p.z>-72&&p.z<24),'district adds no objects to the monumental Hall');}
 for(const room of worldSpaces)for(const id of room.connections)assert.ok(worldSpaces.find(s=>s.id===id)?.connections.includes(room.id));
 district.dispose();
});
test('the real corridor approach and rotated departure threshold remain collision-clear both ways',()=>{
 const previousDocument=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 const scene=new T.Scene(),hall=buildEnvironment(scene),expansion=createExpansion(scene,hall.solids),district=createLoopDistrict(scene,hall.solids);
 globalThis.document=previousDocument;scene.updateMatrixWorld(true);
 const move=createCollision(hall.solids),camera=new T.PerspectiveCamera();camera.position.set(5,1.65,19);
 move(camera.position,new T.Vector3(-94,0,0));assert.ok(Math.abs(camera.position.x+89)<.01,'walk straight through the gallery into the front room');
 move(camera.position,new T.Vector3(-5,0,0));assert.ok(camera.position.x>-92,'closed door blocks walking');
 camera.quaternion.setFromAxisAngle(new T.Vector3(0,1,0),Math.PI/2);district.update(0,true,camera);district.activate('homecoming-return');district.update(1,true,camera);
 for(let i=0;i<30&&camera.position.x<0;i++){scene.updateMatrixWorld(true);move(camera.position,new T.Vector3(-.1,0,0));district.update(.016,true,camera);}
 assert.ok(camera.position.x>150&&camera.position.z>43,'departure arrives in front of island blue door');
 camera.quaternion.identity();
 for(let i=0;i<40&&camera.position.x>0;i++){scene.updateMatrixWorld(true);move(camera.position,new T.Vector3(0,0,-.1));district.update(.016,true,camera);}
 assert.equal(spaceAt(camera.position)?.id,'journey');assert.ok(camera.position.x>-92&&camera.position.x<-89,'return stays in the same front room');
 assert.ok(camera.getWorldDirection(new T.Vector3()).x>.99,'return faces the room and corridor');
 district.dispose();expansion.dispose();hall.dispose();
});
test('island paving has one upward surface per point, including lane, courtyard and bridge seam',()=>{
 const scene=new T.Scene(),solids=[],district=createLoopDistrict(scene,solids);scene.updateMatrixWorld(true);
 const paving=scene.getObjectByName('loop-island-inlaid-floor'),foundation=scene.getObjectByName('loop-island-foundation'),bridge=scene.getObjectByName('loop-bridge-deck');
 assert.equal(paving.geometry.groups.length,3,'inlaid materials share one triangulated surface');
 const ray=new T.Raycaster();
 for(const [x,z] of [[148.123,48.321],[160.123,55.321],[174.123,33.321],[181.123,28.321],[200.123,74.321],[209.123,78.321],[145.999,48.321],[146.001,48.321]]){
  ray.set(new T.Vector3(x+64,2,z),new T.Vector3(0,-1,0));const hits=ray.intersectObjects(solids,false).filter(h=>Math.abs(h.point.y)<1e-6);
  assert.equal(hits.length,1,`exactly one floor face at ${x},${z}`);
 }
 assert.ok(paving.material.every(m=>m.depthTest&&!m.polygonOffset));district.dispose();
});
