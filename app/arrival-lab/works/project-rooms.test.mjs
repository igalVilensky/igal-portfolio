import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const temp=await mkdtemp(join(tmpdir(),'project-rooms-'));
await symlink(new URL('../../../node_modules',import.meta.url).pathname,join(temp,'node_modules'),'dir');
for(const file of ['project-rooms','project-gallery','environment','matrix','copy','palette','../collision']){
 const source=await readFile(new URL(file+'.ts',import.meta.url),'utf8');
 const output=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/from '(\.\/[^']+)'/g,"from '$1.mjs'");
 await writeFile(join(temp,file.split('/').at(-1)+'.mjs'),output);
}
after(()=>rm(temp,{recursive:true,force:true}));
const {projectRooms,roomCopy}=await import(join(temp,'project-rooms.mjs'));
const {createWorks}=await import(join(temp,'environment.mjs'));
const {createCollision}=await import(join(temp,'collision.mjs'));
globalThis.document={createElement(){return {width:0,height:0,getContext(){return {fillRect(){},fillText(){}};}};}};
test('registry references verified projects and keeps future rooms sealed on both sides',async()=>{
 const content=JSON.parse(await readFile(new URL('../../../content/projects.json',import.meta.url),'utf8'));
 const records=Array.isArray(content)?content:content.projects;
 assert.equal(new Set(projectRooms.map(r=>r.id)).size,3);
 for(const r of projectRooms)assert.ok(records.some(p=>p.id===r.metadataId));
 assert.equal(projectRooms.filter(r=>r.status==='active').length,1);
 assert.deepEqual(new Set(projectRooms.map(r=>r.side)),new Set(['north','south']));
 for(const locale of ['de','ru'])assert.deepEqual(Object.keys(roomCopy[locale]),Object.keys(roomCopy.en));
});
test('visitor can cross old east wall, enter and exit OpenMe; reservations block passage',()=>{
 const scene=new T.Scene(),solids=[];const works=createWorks(scene,solids);scene.updateMatrixWorld(true);
 const collide=createCollision(solids),p=new T.Vector3(50,1.65,-87);
 collide(p,new T.Vector3(20,0,0));assert.ok(Math.abs(p.x-70)<.01);
 collide(p,new T.Vector3(0,0,-9));assert.ok(Math.abs(p.z+96)<.01);
 collide(p,new T.Vector3(0,0,9));assert.ok(Math.abs(p.z+87)<.01);
 collide(p,new T.Vector3(0,0,9));assert.ok(p.z<-82.5);
 p.set(87,1.65,-87);collide(p,new T.Vector3(0,0,-9));assert.ok(p.z>-91.5);
 works.projectGallery.select(2,true);assert.equal(works.projectGallery.update(.2,false),true);assert.equal(works.projectGallery.update(1,true),true);assert.equal(works.projectGallery.update(1,true),false);
 works.dispose();assert.equal(scene.children.length,0);
});
