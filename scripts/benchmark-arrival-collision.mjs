// Node CPU microbenchmark against actual bridge/island meshes, not an FPS benchmark.
// Optional argument: path to a previous collision.ts implementation.
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import ts from 'typescript';
import * as T from 'three';
const root=new URL('../',import.meta.url),dir=await mkdtemp(join(tmpdir(),'arrival-collision-bench-'));
try {
 await symlink(fileURLToPath(new URL('node_modules',root)),join(dir,'node_modules'),'dir');
 for(const name of ['geography','threshold-view','loop-district','collision','origin','environment','wall-geometry','connectivity','atmosphere','spaces','atmosphere-materials','expansion']){
  const source=await readFile(new URL(`app/arrival-lab/${name}.ts`,root),'utf8');
  await writeFile(join(dir,name+'.mjs'),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from ['"])(\.\/[^'"]+)(['"])/g,'$1$2.mjs$3'));
 }
 const {createOrigin}=await import(join(dir,'origin.mjs')),{createLoopDistrict}=await import(join(dir,'loop-district.mjs'));
 const scene=new T.Scene(),solids=[],origin=createOrigin(scene,solids),district=createLoopDistrict(scene,solids);
 scene.updateMatrixWorld(true);
 const sources=[['current',await readFile(new URL('app/arrival-lab/collision.ts',root),'utf8')]];
 if(process.argv[2])sources.unshift(['before',await readFile(process.argv[2],'utf8')]);
 const original=T.Mesh.prototype.raycast,results=[];
 let dispatches=0;
 T.Mesh.prototype.raycast=function(...args){dispatches++;return original.apply(this,args);};
 try {
  for(const [version,source] of sources){
   const exports={};new Function('require','exports',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(()=>T,exports);
   const move=exports.createCollision(solids),position=new T.Vector3(),delta=new T.Vector3(),durations=[];
   let final;
   // First trial warms bounds/JIT. Alternate axes/directions on the real bridge.
   for(let trial=0;trial<6;trial++){
    position.set(110,1.65,48);dispatches=0;const start=performance.now();
    for(let i=0;i<1000;i++){delta.set(i%2?.08:-.08,0,i%4<2?.04:-.04);move(position,delta);}
    if(trial)durations.push(performance.now()-start);
    final=position.toArray();
   }
   durations.sort((a,b)=>a-b);results.push({version,queries:1000,medianBatchCpuMs:durations[2],meshRaycastDispatches:dispatches,final});
  }
 }finally{T.Mesh.prototype.raycast=original;origin.dispose();district.dispose();}
 if(results.length===2)results[0].final.forEach((value,i)=>assert.ok(Math.abs(value-results[1].final[i])<1e-8));
 console.table(results);
}finally{await rm(dir,{recursive:true,force:true});}
