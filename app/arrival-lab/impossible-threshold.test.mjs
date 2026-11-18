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
 camera.position.z=3;world.update(.01,false,camera);camera.position.z=0;world.update(.01,false,camera);
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
 moveTo(12.7,24);moveTo(12.7,12.3);moveTo(0,12.3);moveTo(0,3);moveTo(0,0);
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
test('roof is owned by the existing hall visibility switch and restored after world return',()=>{
 const scene=new T.Scene(),solids=[],roof=load('ascent').createAscent(scene,solids),world=createImpossibleThreshold(scene,solids),camera=new T.PerspectiveCamera();
 camera.position.set(-12,1.65,-68.6);world.update(.01,false,camera);world.activate();world.update(2,false,camera);
 camera.position.set(-12,1.65,-69);world.update(.01,false,camera);camera.position.z=-70.6;world.update(.01,false,camera);assert(world.active);assert.equal(roof.root.visible,false);
 world.returnToHall(camera);assert.equal(roof.root.visible,true);assert.equal(roof.root.parent,scene);world.dispose();roof.dispose();
});
test('live doorway views preserve scene visibility, clipping, render targets and viewer camera',()=>{
 const scene=new T.Scene(),hall=new T.Group();scene.add(hall);const world=createImpossibleThreshold(scene,[]),camera=new T.PerspectiveCamera(65,1.6,.08,4000);camera.position.set(12,1.65,-66);world.update(0,true,camera);world.activate(true);world.update(0,true,camera);const p=camera.position.clone(),q=camera.quaternion.clone(),visibility=scene.children.map(o=>o.visible),clipping=[],calls=[];let target=null;
 const renderer={clippingPlanes:clipping,shadowMap:{autoUpdate:false,needsUpdate:true},getRenderTarget:()=>target,setRenderTarget:t=>target=t,render:(s,c)=>calls.push({p:c.position.clone(),hall:hall.visible,planes:renderer.clippingPlanes.length,clip:renderer.clippingPlanes[0]?.clone()})};world.renderViews(renderer,camera);assert.equal(calls.length,1);camera.rotateY(Math.PI);world.renderViews(renderer,camera);assert.equal(calls.length,1,'offscreen aperture adds no render pass');camera.quaternion.copy(q);assert.equal(calls[0].hall,false);assert.equal(calls[0].planes,1);assert(Math.abs(calls[0].p.z+3.5)<.001);assert.deepEqual(scene.children.map(o=>o.visible),visibility);assert.equal(renderer.clippingPlanes,clipping);assert.equal(target,null);assert(camera.position.equals(p));assert(camera.quaternion.equals(q));assert.equal(renderer.shadowMap.needsUpdate,true);
 camera.position.z=-69.6;world.update(.01,true,camera);assert(world.active);camera.position.set(0,1.65,3);camera.lookAt(0,1.65,0);world.renderViews(renderer,camera);assert.equal(calls.length,2);assert.equal(calls[1].hall,true);assert(calls[1].clip.distanceToPoint(new T.Vector3(12,1.65,-66))>0,'return aperture keeps the Arrival side of the wall');assert(calls[1].clip.distanceToPoint(new T.Vector3(12,1.65,-75))<0,'return aperture clips the deep back side');world.dispose();
});

test('North cabin entrance is traversable both ways while glazing remains solid',()=>{
 const scene=new T.Scene(),solids=[],world=createImpossibleThreshold(scene,solids);
 try{
  scene.updateMatrixWorld(true);const move=collision.createCollision(world.snowSolids);
  const player=new T.Vector3(11.3,1.65,74);
  move(player,new T.Vector3(0,0,4));assert(Math.abs(player.z-78)<.01,'walk directly inside');
  move(player,new T.Vector3(0,0,-4));assert(Math.abs(player.z-74)<.01,'walk back outside');
  player.set(13.75,1.65,74);move(player,new T.Vector3(0,0,4));assert(player.z<75.5,'window cannot be walked through');
  const lamp=scene.getObjectsByProperty('type','PointLight').find(o=>o.castShadow);
  assert(lamp,'interior has a shadow casting light');assert(lamp.getWorldPosition(new T.Vector3()).z>75.5);
 }finally{world.dispose();}
});
