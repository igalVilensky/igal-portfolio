import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const exports = {};
new Function('require','exports',ts.transpileModule(readFileSync(new URL('./collision.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(()=>T,exports);
const {createCollision}=exports;
function wall(scene,x,z,w=1,d=8){const mesh=new T.Mesh(new T.BoxGeometry(w,4,d),new T.MeshBasicMaterial());mesh.position.set(x,2,z);scene.add(mesh);return mesh;}
test('sliding sweep preserves tangential movement without tunnelling',()=>{
 const scene=new T.Scene(),m=wall(scene,2,0),move=createCollision([m]),p=new T.Vector3(0,1.65,-2);
 move(p,new T.Vector3(5,0,3));assert.ok(p.x<=1.181&&p.x>1.17);assert.ok(Math.abs(p.z-1)<1e-8);
 m.geometry.dispose();m.material.dispose();
});
test('moving barrier remains live while doorway remains traversable',()=>{
 const scene=new T.Scene(),left=wall(scene,-2,0,2,1),right=wall(scene,2,0,2,1),door=wall(scene,0,0,2,1),move=createCollision([left,right,door]);
 const p=new T.Vector3(0,1.65,2);move(p,new T.Vector3(0,0,-4));assert.ok(p.z>.8);
 door.position.x=8;scene.updateMatrixWorld();p.set(0,1.65,2);move(p,new T.Vector3(0,0,-4));assert.ok(Math.abs(p.z+2)<1e-8);
 for(const m of [left,right,door]){m.geometry.dispose();m.material.dispose();}
});
test('safety barrier protects elevated sweeps and zero movement retains eye height',()=>{
 const scene=new T.Scene(),m=wall(scene,2,0);m.userData.safetyBarrier=true;
 const move=createCollision([m]),p=new T.Vector3(0,10,0);move(p,new T.Vector3(4,0,0));assert.ok(p.x<1.19);assert.equal(p.y,1.65);
 move(p,new T.Vector3());assert.equal(p.y,1.65);m.geometry.dispose();m.material.dispose();
});
test('dynamic bounds follow translation, rotation and scale into the sweep',()=>{
 const scene=new T.Scene(),m=wall(scene,100,0,1,4),move=createCollision([m]),p=new T.Vector3(0,1.65,0);
 move(p,new T.Vector3(4,0,0));assert.ok(p.x>3.99);
 m.position.x=2;m.rotation.y=Math.PI/2;m.scale.z=.5;scene.updateMatrixWorld();
 p.set(0,1.65,0);move(p,new T.Vector3(4,0,0));assert.ok(p.x>.67&&p.x<.69);
 m.geometry.dispose();m.material.dispose();
});
test('rigid broad-phase culling matches conservative custom-raycast fallback',()=>{
 const scene=new T.Scene(),meshes=[wall(scene,2,0),wall(scene,-3,1,1,2),wall(scene,200,200)];
 const optimized=createCollision(meshes),referenceMeshes=meshes.map(mesh=>{const copy=mesh.clone();copy.raycast=function(...args){return T.Mesh.prototype.raycast.apply(this,args);};scene.add(copy);return copy;});
 scene.updateMatrixWorld();const reference=createCollision(referenceMeshes);
 for(const [x,z,dx,dz] of [[0,-2,5,3],[0,0,-5,4],[0,0,0,10],[0,20,4,-25],[-5,-2,4,3]]){
  const a=new T.Vector3(x,1.65,z),b=a.clone(),delta=new T.Vector3(dx,0,dz);optimized(a,delta);reference(b,delta);assert.ok(a.distanceTo(b)<1e-8);
 }
 for(const mesh of meshes){mesh.geometry.dispose();mesh.material.dispose();}
});
test('owner counters partition query totals and count mesh dispatches rather than triangle tests',()=>{
 const {collisionMetrics:metrics,collisionOwners:owners}=exports;
 for(const key of Object.keys(metrics))if(key!=='enabled')metrics[key]=0;
 owners.clear();metrics.enabled=true;
 try{
  const move=createCollision([],'visitor'),p=new T.Vector3(0,1.65,0);
  move(p,new T.Vector3(.08,0,.04));move(p,new T.Vector3());
  assert.equal(metrics.collisionQueries,2);assert.equal(metrics.zeroQueries,1);assert.equal(metrics.raycasts,18);assert.equal(metrics.meshRaycastDispatches,0);
  assert.equal(owners.get('visitor').queries,2);assert.equal(owners.get('visitor').raycasts,18);assert.equal(owners.get('visitor').cpuMs,metrics.collisionMs);
 }finally{metrics.enabled=false;owners.clear();}
});
test('static grid preserves triangle collision while pruning remote room meshes',()=>{
 const scene=new T.Scene(),meshes=[];
 for(let i=0;i<100;i++){const m=wall(scene,i===0?2:100+i*20,0);m.userData.room='static';meshes.push(m);}
 const move=createCollision(meshes),position=new T.Vector3(0,1.65,0);
 exports.collisionMetrics.enabled=true;exports.collisionMetrics.broadPhaseMeshes=0;
 try{move(position,new T.Vector3(4,0,0));assert(position.x>1.17&&position.x<1.19);assert(exports.collisionMetrics.broadPhaseMeshes<5);}
 finally{exports.collisionMetrics.enabled=false;for(const m of meshes){m.geometry.dispose();m.material.dispose();}}
});
