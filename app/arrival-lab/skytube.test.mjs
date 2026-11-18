import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const dir=await mkdtemp(join(tmpdir(),'skytube-test-'));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(dir,'node_modules'),'dir');
for(const name of ['skytube','collision','geography']){const source=await readFile(new URL(`./${name}.ts`,import.meta.url),'utf8');await writeFile(join(dir,name+'.mjs'),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from ['"])(\.\/[^'"]+)(['"])/g,'$1$2.mjs$3'));}
const {createSkyTube,skyEase,createSkyRoute}=await import(join(dir,'skytube.mjs'));
after(()=>rm(dir,{recursive:true,force:true}));
function setup(scenic=false){const scene=new T.Scene(),solids=[],tube=createSkyTube(scene,solids,scenic),camera=new T.PerspectiveCamera();scene.updateMatrixWorld(true);return {scene,solids,tube,camera};}
function board(tube,camera,reduced=false){camera.position.copy(tube.vehicle.localToWorld(new T.Vector3(-3.55,1.65,0)));camera.position.y=1.65;assert.ok(tube.activate('board',camera,reduced));}
function advance(tube,camera,seconds,step=.1,reduced=false){for(let t=0;t<seconds;t+=step)tube.update(Math.min(step,seconds-t),reduced,camera);}
test('route is bounded, raised and smooth; profile starts and stops gently',()=>{
 const route=createSkyRoute();assert.ok(route.getPointAt(0).distanceTo(new T.Vector3(77,2.12,66))<1e-7);assert.ok(route.getPointAt(1).distanceTo(new T.Vector3(265,2.12,74))<1e-7);
 let last=0,previousYaw;for(let i=0;i<=200;i++){const t=i/200,eased=skyEase(t),p=route.getPointAt(t),v=route.getTangentAt(t),yaw=Math.atan2(v.x,v.z);assert.ok(eased>=last&&eased<=1);assert.ok(p.y>=1.9&&p.y<18);if(previousYaw!==undefined)assert.ok(Math.abs(yaw-previousYaw)<.12);last=eased;previousYaw=yaw;}
 assert.equal(skyEase(-1),0);assert.equal(skyEase(2),1);assert.ok(skyEase(.001)/.001<.001);assert.ok((1-skyEase(.999))/.001<.001);
});
test('three physical round trips keep one capsule, close doors for travel and restore platform ownership',()=>{
 const {scene,tube,camera}=setup();const vehicle=tube.vehicle;
 for(let round=0;round<3;round++)for(const destination of ['district','origin']){
  board(tube,camera);assert.equal(tube.ownsPassenger,true);assert.equal(tube.activate('board',camera),false);assert.equal(tube.activate('call:origin',camera),false);
  advance(tube,camera,3.45);assert.equal(tube.phase,'riding');assert.equal(tube.doorProgress,0);
  const q=camera.quaternion.clone();advance(tube,camera,tube.duration/2);
  assert.ok(tube.progress>.2&&tube.progress<.8);assert.equal(tube.doorProgress,0);assert.ok(camera.quaternion.equals(q),'transit does not overwrite independent look');
  const cabin=tube.vehicle.localToWorld(new T.Vector3(0,1.65,0));assert.ok(camera.position.distanceTo(cabin)<1e-7);
  camera.position.addScalar(100);tube.update(.1,false,camera);assert.ok(camera.position.distanceTo(tube.vehicle.localToWorld(new T.Vector3(0,1.65,0)))<1e-7,'external walking cannot displace the passenger');
  advance(tube,camera,tube.duration/2+1);assert.equal(tube.phase,'docked');assert.equal(tube.station,destination);assert.equal(tube.doorProgress,1);assert.equal(tube.vehicle,vehicle);
  assert.ok(tube.activate('exit',camera));advance(tube,camera,1.7);assert.equal(tube.ownsPassenger,false);assert.equal(tube.phase,'docked');assert.ok(Math.abs(camera.position.y-1.65)<1e-6);
  const local=tube.vehicle.worldToLocal(camera.position.clone());assert.ok(local.x< -3.4&&Math.abs(local.z)<.001);
 }
 assert.equal(scene.getObjectsByProperty('name','SkyTube passenger capsule').length,1);tube.dispose();assert.equal(tube.root.parent,null);
});
test('empty calls move the same capsule and ignore busy or repeated requests',()=>{
 const {tube,camera}=setup();camera.position.set(202,1.65,77);
 assert.ok(tube.activate('call:district',camera));assert.equal(tube.ownsPassenger,false);assert.equal(tube.activate('call:district',camera),false);
 advance(tube,camera,.9);assert.equal(tube.phase,'calling');advance(tube,camera,tube.duration/2);assert.ok(tube.progress>.2&&tube.progress<.8);assert.equal(tube.doorProgress,0);
 advance(tube,camera,tube.duration);assert.equal(tube.station,'district');assert.equal(tube.phase,'docked');assert.ok(tube.activate('call:district',camera));assert.equal(tube.progress,1);
 assert.ok(tube.activate('call:origin',camera));advance(tube,camera,tube.duration+2);assert.equal(tube.station,'origin');tube.dispose();
});
test('elapsed-time partitions agree; pause, reduced motion and theme changes preserve state',()=>{
 const a=setup(),b=setup();board(a.tube,a.camera);board(b.tube,b.camera);advance(a.tube,a.camera,12,.02);advance(b.tube,b.camera,12,.37);
 assert.ok(Math.abs(a.tube.progress-b.tube.progress)<1e-8);assert.ok(a.camera.position.distanceTo(b.camera.position)<1e-6);
 const point=a.camera.position.clone(),progress=a.tube.progress;a.tube.setPaused(true);a.tube.update(100,false,a.camera);assert.equal(a.tube.progress,progress);assert.ok(a.camera.position.equals(point));a.tube.setTheme(true);assert.equal(a.tube.progress,progress);a.tube.setPaused(false);a.tube.update(1,false,a.camera,true);assert.equal(a.tube.progress,progress);
 a.tube.dispose();b.tube.dispose();const r=setup();board(r.tube,r.camera,true);advance(r.tube,r.camera,4,.1,true);assert.equal(r.tube.update(.4,true,r.camera).turn,0);r.tube.dispose();
});
test('platform exits remain inside the existing safe land and require a nearby side-door approach',()=>{
 const {tube,camera}=setup();camera.position.set(0,1.65,0);assert.equal(tube.activate('board',camera),false);
 for(const destination of ['district','origin']){board(tube,camera);advance(tube,camera,tube.duration+5);assert.equal(tube.station,destination);tube.activate('exit',camera);advance(tube,camera,2);const p=camera.position;if(destination==='district')assert.ok(p.x>260&&p.x<273&&p.z>74&&p.z<80);else assert.ok(p.x>70.7&&p.x<84&&p.z>60&&p.z<79);}
 tube.dispose();
});
test('the capsule clears both existing island parapets throughout the real route',()=>{
 const {tube,camera}=setup();board(tube,camera);advance(tube,camera,3.5);
 const originEdge=new T.Box3(new T.Vector3(83.775,0,51.5),new T.Vector3(84.225,.85,105));
 const districtEdge=new T.Box3(new T.Vector3(210,0,80.275),new T.Vector3(274,1.15,80.725));
 function intersectsSurface(edge){let hit=false;tube.vehicle.traverse(mesh=>{if(hit||!mesh.isMesh||!new T.Box3().setFromObject(mesh).intersectsBox(edge))return;const g=mesh.geometry,p=g.getAttribute('position'),index=g.index,count=index?index.count:p.count;for(let i=0;i<count;i+=3){const vertices=[0,1,2].map(j=>new T.Vector3().fromBufferAttribute(p,index?index.getX(i+j):i+j).applyMatrix4(mesh.matrixWorld));if(edge.intersectsTriangle(new T.Triangle(...vertices))){hit=true;break;}}});return hit;}
 for(let t=0;t<tube.duration;t+=.05){tube.update(.05,false,camera);assert.ok(!intersectsSurface(originEdge),`Origin parapet at ${tube.progress}`);assert.ok(!intersectsSurface(districtEdge),`District parapet at ${tube.progress}`);}
 tube.dispose();
});
for(const scenic of [false,true])test(`closed ${scenic?'scenic':'district'} capsule geometry remains within the tube cross-section along the complete ride`,()=>{
 const {tube,camera}=setup(scenic);board(tube,camera);advance(tube,camera,3.45);
 for(let t=0;t<tube.duration;t+=.5){tube.update(.5,false,camera);tube.vehicle.traverse(mesh=>{if(!mesh.isMesh)return;const p=mesh.geometry.getAttribute('position');for(let i=0;i<p.count;i+=2){const point=new T.Vector3().fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld);let lo=Math.max(0,tube.progress-5/tube.length),hi=Math.min(1,tube.progress+5/tube.length);for(let n=0;n<16;n++){const a=lo+(hi-lo)/3,b=hi-(hi-lo)/3;if(tube.route.getPointAt(a).distanceToSquared(point)<tube.route.getPointAt(b).distanceToSquared(point))hi=b;else lo=a;}const u=(lo+hi)/2;if(u*tube.length>7&&(1-u)*tube.length>7)assert.ok(tube.route.getPointAt(u).distanceTo(point)<3.22,`capsule intersects glass at route ${tube.progress}`);}});}
 tube.dispose();
});

test('docked cabin floors are separated from island paving and a local call never snaps doors',()=>{
 const {tube,camera,scene}=setup();const floor=new T.Box3().setFromObject(scene.getObjectByName('SkyTube cabin floor'));assert.ok(Math.abs(floor.max.y-.12)<1e-6);assert.equal(tube.doorProgress,0);assert.ok(tube.activate('call:origin',camera));assert.equal(tube.doorProgress,0);tube.dispose();
});

test('the actual visible open-door frame and cabin remain valid repeat-boarding targets',()=>{
 const {tube,camera,scene,solids}=setup();board(tube,camera);advance(tube,camera,tube.duration+5);tube.activate('exit',camera);advance(tube,camera,2);scene.updateMatrixWorld(true);
 const target=tube.vehicle.localToWorld(new T.Vector3(-1.91,1.53,-1.85));const ray=new T.Raycaster(camera.position,target.sub(camera.position).normalize());const hit=ray.intersectObjects(solids,false)[0];assert.equal(hit.object.userData.skytube,'board');assert.ok(hit.distance<6.5);assert.ok(tube.canActivate('board',camera.position));tube.dispose();
});
