import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const load=(name,deps={})=>{const out={};new Function('require','exports',ts.transpileModule(readFileSync(new URL(`./${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(id=>id==='three'?T:deps[id],out);return out;};
const {createAscent,accessHeight,inStairHall}=load('ascent'),{createCollision}=load('collision'),spaces=load('spaces');
test('actual furnished wing allows ground circulation, reversible stair ascent and rooftop traversal',()=>{
 const previous=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:(o,k)=>o[k]??(()=>{}),set:(o,k,v)=>(o[k]=v,true)})})};
 try{
 const scene=new T.Scene(),solids=[],rooms=load('expansion',{'./spaces':spaces}).createExpansion(scene,solids),roof=createAscent(scene,solids),origin=load('origin',{'./star-geography':load('star-geography')}).createOrigin(scene,solids),wing=load('work-wing').createWorkWing(scene,solids);scene.updateMatrixWorld(true);const collision=createCollision(solids),p=new T.Vector3(-58,1.65,19);
 function walk(x,z){for(let i=0;i<2000&&Math.hypot(p.x-x,p.z-z)>.015;i++){const old=p.clone();collision(p,new T.Vector3(x-p.x,0,z-p.z).clampLength(0,.1));const h=accessHeight(p.x,p.z,old.y);if(h===undefined)p.copy(old);else p.y=h+1.65;origin.update(.016,true,p,true,false,false,p.y>7,inStairHall(p));}assert(Math.hypot(p.x-x,p.z-z)<.02,`route blocked: ${p.toArray()}, target ${x},${z}`);}
 walk(-90,19);assert.equal(p.y,1.65,'the upper flight leaves ground circulation clear');walk(-62,19);walk(-62,14);
 for(let i=0;i<2;i++){walk(-86,14);assert(Math.abs(p.y-6.85)<.01);walk(-86,19.2);walk(-58,19.2);assert.equal(p.y,12.05);walk(-40,19.2);walk(-40,44);assert.equal(p.y,16.05);walk(-40,19.2);walk(-86,19.2);walk(-86,14);walk(-62,14);assert.equal(p.y,1.65);}
 assert.equal(accessHeight(-75,14,1.65),0,'walking beneath a high flight remains on the ground');assert.equal(accessHeight(-75,16,4),undefined,'mid-flight visitors cannot step into empty space');
 wing.dispose();origin.dispose();roof.dispose();rooms.dispose();
 }finally{globalThis.document=previous;}
});
