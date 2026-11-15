import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import ts from 'typescript';import * as T from 'three';import {worldDestinations} from '../../shared/world-entities.js';
function module(file){const out={};new Function('require','exports',ts.transpileModule(readFileSync(new URL(file,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(name=>name==='three'?T:module(name+'.ts'),out);return out;}
test('Journey doorway and chamber return clear actual collision geometry, with door retracted',()=>{
 const original=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:()=>()=>{}})})};
 let expansion,chamber,origin;
 try{const scene=new T.Scene(),solids=[];expansion=module('./expansion.ts').createExpansion(scene,solids);origin=module('./origin.ts').createOrigin(scene,solids);chamber=module('./intelligence.ts').createIntelligence(scene,solids);chamber.activate();for(let i=0;i<100;i++)chamber.update(i*50,.05,true,new T.Vector3(-92,1.65,10),null,'idle');scene.updateMatrixWorld(true);
 const floor=chamber.root.children.find(o=>o.isMesh&&o.geometry.parameters.width===22&&o.geometry.parameters.height===1);assert(floor);assert.equal(new T.Box3().setFromObject(floor).max.y,0);
 const move=module('./collision.ts').createCollision(solids);const p=new T.Vector3(-92,1.65,19);move(p,new T.Vector3(0,0,-19));assert(Math.abs(p.z)<.01);move(p,new T.Vector3(0,0,19));assert(Math.abs(p.z-19)<.01);
 const wall=new T.Vector3(-100,1.65,0);move(wall,new T.Vector3(-20,0,0));assert(wall.x> -110);
 assert.equal(new Set(chamber.entities.map(e=>e.spec.id)).size,3);
 }finally{chamber?.dispose();expansion?.dispose();origin?.dispose();globalThis.document=original;}
});
test('family engagement pauses the route, turns toward visitor and resumes after close',()=>{
 const family=module('./family.ts').createFamily(new T.Scene()),p=family.people[0];p.wait=0;p.route=[5];const start=p.person.position.clone();family.converse('igal','thinking');for(let i=0;i<50;i++)family.update(i*100,.1,false,new T.Vector3(66,1.65,10));assert(p.person.position.equals(start));assert.equal(p.state,'thinking');assert(Math.abs(p.person.rotation.y)>.1);family.converse(null);for(let i=0;i<20;i++)family.update(5000+i*100,.1,false,new T.Vector3());assert(p.person.position.distanceTo(start)>.2);family.dispose();
});

test('world guide snapshot matches registered destinations and connections',()=>{const {worldSpaces}=module('./spaces.ts');for(const item of worldDestinations){const space=worldSpaces.find(s=>s.id===item.id);assert(space,item.id);assert.deepEqual([...item.connections].sort(),[...space.connections].sort());}});
