import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const load=(name,require)=>{const exports={};new Function('require','exports',ts.transpileModule(readFileSync(new URL(`./${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(require,exports);return exports;};
const collision=load('collision',()=>T),{createArrivalDiagnostics}=load('performance',()=>collision);
test('exclusive phases partition CPU; all passes have correct denominators; reset drops old samples',()=>{
 let target=null,t=0;
 const object={updateMatrixWorld(){t+=2;},updateWorldMatrix(){t+=2;}};
 const matrix=object.updateMatrixWorld;
 const render=()=>{object.updateMatrixWorld();t+=3;};
 const renderer={render,getRenderTarget:()=>target,info:{render:{calls:12,triangles:30},memory:{geometries:4,textures:2}}};
 const tables=[],table=console.table;console.table=value=>tables.push(value);
 try{
  const d=createArrivalDiagnostics(renderer,()=>t);d.observeMatrices(object);
  for(let i=0;i<21;i++){
   d.beginFrame(i*100);t+=1;d.phase('movement');t+=2;d.enter('matrices');t+=3;d.leave();t+=4;
   target=i%2?{}:null;renderer.render();t+=1;d.endFrame(i*100,'hall','ready');
  }
  assert.equal(tables.length,3);
  const [summary,phases]=tables;
  assert.equal(summary.completedHandlers,21);assert.equal(summary.mainPassesWindow,11);assert.equal(summary.offscreenPassesWindow,10);
  assert.equal(summary.drawCallsPerHandler,12);assert.equal(summary.rafIntervalAvgMs,100);assert.equal(summary.rafIntervalP95Ms,100);
  assert.equal(summary.handlerCpuAvgMs,16);assert.equal(summary.handlerCpuP95Ms,16);assert.equal(summary.gpuTiming,'unavailable');
  assert.equal(phases.movement.avgMs,7);assert.equal(phases.matrices.avgMs,5);assert.equal(phases.renderSubmission.avgMs,3);assert.equal(phases.other.avgMs,1);
  assert.equal(Object.values(phases).reduce((sum,p)=>sum+p.avgMs,0),summary.handlerCpuAvgMs);
  d.reset();d.beginFrame(9000);d.endFrame(9000,'hall');assert.equal(tables.length,3);
  d.dispose();assert.equal(renderer.render,render);assert.equal(object.updateMatrixWorld,matrix);assert.equal(collision.collisionMetrics.enabled,false);
 }finally{console.table=table;}
});
test('sparse p95 is unavailable; rendering outside handler is separate; inherited matrix methods are restored',()=>{
 let t=0;const prototype={updateMatrixWorld(){t+=2;},updateWorldMatrix(){t+=2;}},object=Object.create(prototype);
 const renderer={render(){t+=3;},getRenderTarget:()=>null,info:{render:{calls:1,triangles:2},memory:{geometries:1,textures:1}}};
 const tables=[],table=console.table;console.table=x=>tables.push(x);
 try{
  const d=createArrivalDiagnostics(renderer,()=>t);d.observeMatrices(object);renderer.render();
  d.beginFrame(0);t+=1;d.endFrame(0,'hall');d.beginFrame(2000);t+=1;d.endFrame(2000,'hall');
  assert.equal(tables[0].outsideHandlerRenderCpuWindowMs,3);assert.equal(tables[0].handlerCpuAvgMs,1);assert.equal(tables[0].handlerCpuP95Ms,null);
  d.dispose();assert.equal(Object.hasOwn(object,'updateMatrixWorld'),false);
 }finally{console.table=table;}
});
