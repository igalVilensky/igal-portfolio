import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const exports={};new Function('require','exports',ts.transpileModule(readFileSync(new URL('./ascent.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(()=>T,exports);
const {createClimb,roofHeight,createAscent,ascent}=exports;
function tick(c,p,axis,seconds,dt=1/60){for(let t=0;t<seconds;t+=dt)c.update(dt,axis,p);}
test('three reversible climbs have continuous positions, clamp endpoints and restore walking',()=>{
 const c=createClimb(),p=new T.Vector3(-54.8,1.65,19.5);
 for(let n=0;n<3;n++){
 assert(c.activate(p));assert(!c.activate(p));tick(c,p,0,1);assert.equal(c.state,'climbing');
 tick(c,p,1,2);const mid=p.clone();assert(mid.y>1.65&&mid.y<12.05);tick(c,p,0,1);assert(p.equals(mid));
 tick(c,p,-1,.3);assert(p.y<mid.y);tick(c,p,1,10);assert.equal(c.state,'walking');assert(Math.abs(p.y-12.05)<1e-8);assert.equal(p.x,-54.8);
 assert(c.activate(p));tick(c,p,0,1);tick(c,p,-1,10);assert.equal(c.state,'walking');assert.equal(p.y,1.65);
 }
});
test('delta is bounded, reduced motion still physically aligns and progress is time based',()=>{
 for(const dt of [1/30,1/60,1/144]){const c=createClimb(),p=new T.Vector3(-54.8,1.65,19.5);c.activate(p);tick(c,p,0,1,dt);for(let i=0;i<Math.round(2/dt);i++)c.update(dt,1,p);assert(Math.abs(c.progress-4.4)<.001);}
 const c=createClimb(),p=new T.Vector3(-54.8,1.65,19.5);c.activate(p);c.update(.05,0,p,true);assert(p.x>-57&&p.x<-54.8);tick(c,p,0,1);c.update(60,1,p);assert(c.progress<=.221);
});
test('roof topology has continuous joins and explicitly excludes empty space',()=>{
 assert.equal(roofHeight(-54.8,19.5),10.4);assert.equal(roofHeight(-40,21),10.4);assert.equal(roofHeight(-40,43),14.4);assert.equal(roofHeight(-36,55),14.4);assert.equal(roofHeight(-20,30),undefined);
 for(let z=21;z<=43;z+=.1)assert(Math.abs(roofHeight(-40,z)-(10.4+(z-21)*4/22))<1e-8);
});
test('roof uses a single root and bounded shared geometry, theme preserves state, disposal releases assets',()=>{
 const scene=new T.Scene(),solids=[],roof=createAscent(scene,solids);assert.equal(roof.root.parent,scene);assert(solids.length<110);const p=roof.root.children[0].position.clone();roof.setTheme(true);assert(roof.root.children[0].position.equals(p));assert(solids.some(s=>s.userData.noCollision));roof.dispose();assert.equal(roof.root.parent,null);
});
test('existing collision sweeps keep three rooftop round trips on visible connected surfaces',()=>{
 const collisionExports={};new Function('require','exports',ts.transpileModule(readFileSync(new URL('./collision.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(()=>T,collisionExports);
 const scene=new T.Scene(),solids=[],roof=createAscent(scene,solids);scene.updateMatrixWorld(true);const collide=collisionExports.createCollision(solids),p=new T.Vector3(-54.8,12.05,19.5);
 function moveTo(x,z){for(let i=0;i<2000&&Math.hypot(p.x-x,p.z-z)>.02;i++){const delta=new T.Vector3(x-p.x,0,z-p.z).clampLength(0,.12);collide(p,delta);const h=roofHeight(p.x,p.z);assert.notEqual(h,undefined);p.y=h+1.65;}assert(Math.hypot(p.x-x,p.z-z)<.03,`stuck at ${p.toArray()}`);}
 for(let n=0;n<3;n++){moveTo(-40,19.5);moveTo(-40,44);moveTo(-36,55);assert.equal(p.y,16.05);moveTo(-40,44);moveTo(-40,19.5);moveTo(-54.8,19.5);assert.equal(p.y,12.05);}
 moveTo(-40,54);collide(p,new T.Vector3(0,0,10));assert(p.z<57&&p.z>56,'visible terrace edge stops the visitor');roof.dispose();
});
test('actual gallery ceiling has a clear climb well while adjacent ceiling stays intact',()=>{
 const compile=(name,require)=>{const out={};new Function('require','exports',ts.transpileModule(readFileSync(new URL(`./${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(require,out);return out;};
 const spaces=compile('spaces',()=>T),expansion=compile('expansion',id=>id==='three'?T:spaces),previous=globalThis.document;
 globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 try{const scene=new T.Scene(),solids=[],rooms=expansion.createExpansion(scene,solids),roof=createAscent(scene,solids);scene.updateMatrixWorld(true);
 const ray=new T.Raycaster(new T.Vector3(-57,1.65,19.5),new T.Vector3(0,1,0),0,20);assert.equal(ray.intersectObjects(solids,false).length,0,'the ladder path passes through actual open geometry');
 ray.ray.origin.x=-54;assert(ray.intersectObjects(solids,false).some(h=>Math.abs(h.point.y-7)<.01),'adjacent gallery ceiling is preserved');roof.dispose();rooms.dispose();
 }finally{globalThis.document=previous;}
});
