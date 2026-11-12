import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
function load(name,dependencies={}) {
 const source=readFileSync(new URL(`./${name}.ts`,import.meta.url),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const exports={};new Function('require','exports',code)(id=>id==='three'?T:dependencies[id],exports);return exports;
}
const collision=load('collision');
const {createImpossibleThreshold}=load('impossible-threshold',{'./collision':collision});
test('closed door blocks; opening alone never switches; real crossing returns without retrigger',()=>{
 const scene=new T.Scene(),hall=new T.Group();scene.add(hall);const solids=[];
 const world=createImpossibleThreshold(scene,solids),camera=new T.PerspectiveCamera(65,1,.08,220);
 const collide=collision.createCollision(world.hallSolids);
 camera.position.set(-12,1.65,-68.6);world.update(.01,false,camera);
 scene.updateMatrixWorld(true);world.move(camera.position,new T.Vector3(0,0,-2),collide);
 assert(camera.position.z> -69.5);assert.equal(world.active,false);
 world.activate();world.activate();world.update(2,false,camera);assert.equal(world.state,'open');assert.equal(world.active,false);
 // Walking beside the doorway must not cross.
 camera.position.set(-9,1.65,-69);world.update(.01,false,camera);camera.position.z=-71;world.update(.01,false,camera);assert.equal(world.active,false);
 camera.position.set(-12,1.65,-69);world.update(.01,false,camera);camera.position.z=-70.6;world.update(.01,false,camera);
 assert.equal(world.active,true);assert.equal(hall.visible,false);assert.equal(camera.far,9000);assert(Math.abs(camera.position.z-1.1)<1e-8);
 world.update(.01,false,camera);assert.equal(world.active,true);
 camera.position.z=3;world.update(.01,false,camera);camera.position.z=.9;world.update(.01,false,camera);
 assert.equal(world.active,false);assert.equal(hall.visible,true);assert.equal(camera.far,220);assert(Math.abs(camera.position.x+12)<1e-8);
 world.update(.01,false,camera);assert.equal(world.active,false);world.dispose();
});
test('reduced motion opens immediately and inactive hall collisions never affect snow',()=>{
 const scene=new T.Scene(),solids=[],world=createImpossibleThreshold(scene,solids),camera=new T.PerspectiveCamera();
 camera.position.set(-12,1.65,-69);world.update(0,true,camera);world.activate();world.update(0,true,camera);assert.equal(world.state,'open');
 camera.position.z=-70.6;world.update(.01,true,camera);let usedHall=false;
 world.move(camera.position,new T.Vector3(1,0,1),()=>{usedHall=true;});assert.equal(usedHall,false);
 world.returnToHall(camera);assert.equal(world.active,false);assert.equal(world.state,'open');world.dispose();
});
test('Sun Door has independent opening, a walkable dogleg, coastal reveal and natural return',()=>{
 const scene=new T.Scene(),hall=new T.Group();scene.add(hall);const solids=[];
 const world=createImpossibleThreshold(scene,solids),camera=new T.PerspectiveCamera(65,1,.08,220);
 const collide=collision.createCollision(world.hallSolids);
 camera.position.set(12,1.65,-69);world.update(0,true,camera);world.activate(true);world.update(0,true,camera);
 camera.position.z=-70.6;world.update(.01,true,camera);assert.equal(world.environment,'sun-world');
 const moveTo=(x,z)=>{scene.updateMatrixWorld(true);world.move(camera.position,new T.Vector3(x-camera.position.x,0,z-camera.position.z),collide);assert(Math.abs(camera.position.x-x)<.02,`x ${camera.position.x} expected ${x}`);assert(Math.abs(camera.position.z-z)<.02,`z ${camera.position.z} expected ${z}`);world.update(.01,true,camera);};
 moveTo(0,12.3);moveTo(12.7,12.3);moveTo(12.7,24);moveTo(10,30);
 world.setTheme(true);assert.equal(world.environment,'sun-world');
 moveTo(12.7,24);moveTo(12.7,12.3);moveTo(0,12.3);moveTo(0,3);moveTo(0,.9);
 assert.equal(world.environment,'hall');assert.equal(hall.visible,true);assert(Math.abs(camera.position.x-12)<.02);
 camera.position.set(-12,1.65,-69);world.update(.01,true,camera);assert.equal(world.state,'closed');
 world.dispose();
});
test('both impossible worlds restore Origin view distance and exterior visibility',()=>{
 for(const sun of [false,true]){
  const scene=new T.Scene(),origin=new T.Group();scene.add(origin);
  const world=createImpossibleThreshold(scene,[]),camera=new T.PerspectiveCamera(65,1,.08,4000);
  camera.position.set(sun?12:-12,1.65,-69);world.update(0,true,camera);world.activate(sun);world.update(0,true,camera);
  camera.position.z=-70.6;world.update(.01,true,camera);assert.equal(origin.visible,false);
  world.returnToHall(camera);assert.equal(camera.far,4000);assert.equal(origin.visible,true);world.dispose();
 }
});
