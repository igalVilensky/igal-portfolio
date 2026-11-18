import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const temp=await mkdtemp(join(tmpdir(),'arrival-print-'));
after(()=>rm(temp,{recursive:true,force:true}));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(temp,'node_modules'),'dir');
for(const name of ['print-model','print-lab','collision']){const source=await readFile(new URL(`./${name}.ts`,import.meta.url),'utf8');await writeFile(join(temp,`${name}.mjs`),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace("'./print-model'","'./print-model.mjs'"));}
const model=await import(join(temp,'print-model.mjs'));
const {createPrintLab}=await import(join(temp,'print-lab.mjs'));
const {createCollision}=await import(join(temp,'collision.mjs'));
test('saved custom creations round trip; malformed storage safely recovers',()=>{const d={type:'custom',base:'capsule',addon:'ring',color:model.colors[2]};assert.deepEqual(model.readPrints(JSON.stringify({selected:d,collection:[d,{type:'bad'},null]})),{selected:d,collection:[d]});for(const raw of ['broken','null','[]','{}'])assert.deepEqual(model.readPrints(raw),{selected:model.defaultDesign,collection:[]});});
test('all presets and custom combinations produce finite printable geometry',()=>{for(const type of [...model.presets,'custom'])for(const base of model.bases)for(const addon of model.addons){const toy=model.figurine({...model.defaultDesign,type,base,addon});const b=new T.Box3().setFromObject(toy);assert.ok(Number.isFinite(b.max.y)&&b.max.y>0);model.disposeObject(toy);}});
test('east entrance clears a visitor; walls and station remain solid; collection survives replacement',()=>{const prev=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};const scene=new T.Scene(),solids=[];const lab=createPrintLab(scene,solids);globalThis.document=prev;try{scene.updateMatrixWorld(true);const move=createCollision(solids);const p=new T.Vector3(-52,1.65,61);move(p,new T.Vector3(-9,0,0));assert.ok(Math.abs(p.x+61)<1e-5);p.set(-52,1.65,54);move(p,new T.Vector3(-9,0,0));assert.ok(p.x>-56);lab.setCollection(Array.from({length:12},()=>model.defaultDesign));lab.setCollection([model.defaultDesign]);lab.preview(model.defaultDesign);lab.update(.5,false);lab.finish();assert.ok(solids.some(o=>o.userData.printLab));}finally{lab.dispose();}});
