import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const dir=await mkdtemp(join(tmpdir(),'origin-test-'));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(dir,'node_modules'),'dir');
for(const name of ['origin','collision','environment','wall-geometry','connectivity','atmosphere','spaces','atmosphere-materials']){
 const source=await readFile(new URL(`./${name}.ts`,import.meta.url),'utf8');
 await writeFile(join(dir,name+'.mjs'),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText.replace(/(from ['"])(\.\/[^'"]+)(['"])/g,'$1$2.mjs$3'));
}
const {createOrigin,originHeight}=await import(join(dir,'origin.mjs'));
const {buildEnvironment}=await import(join(dir,'environment.mjs'));
const {createAtmosphere}=await import(join(dir,'atmosphere.mjs'));
const {createCollision}=await import(join(dir,'collision.mjs'));
after(()=>rm(dir,{recursive:true,force:true}));
test('actual hall wall and moving door allow three reversible sprint sweeps only when open',()=>{
 globalThis.matchMedia=()=>({matches:false});
 const scene=new T.Scene(),hall=buildEnvironment(scene),atmosphere=createAtmosphere(scene,hall.solids),origin=createOrigin(scene,hall.solids);scene.updateMatrixWorld(true);
 const move=createCollision(hall.solids),p=new T.Vector3(12,1.65,17);
 move(p,new T.Vector3(0,0,20));assert.ok(p.z<24,'closed entrance is solid');
 origin.activate();for(let i=0;i<100;i++)origin.update(.05,false,p,true);scene.updateMatrixWorld(true);
 for(let i=0;i<3;i++){p.set(12,1.65,17);move(p,new T.Vector3(0,0,20));assert.ok(Math.abs(p.z-37)<.001,'no wall behind the open door');move(p,new T.Vector3(0,0,-20));assert.ok(Math.abs(p.z-17)<.001,'same opening returns inside');}
 p.set(22,1.65,17);move(p,new T.Vector3(0,0,20));assert.ok(p.z<24,'surrounding south wall stays solid');
 p.set(35,1.65,62);move(p,new T.Vector3(-23,0,0));assert.ok(Math.abs(p.x-12)<.001,'crosscourt stays clear between path walls');
 p.set(0,1.65,120);move(p,new T.Vector3(0,0,40));assert.ok(p.z<132&&p.z>130,'parapet stops sprint at visible edge');
 origin.dispose();atmosphere.dispose();hall.dispose();assert.equal(origin.root.parent,null);
});
test('belvedere is continuously grounded and theme preserves entrance, camera and root identity',()=>{
 const scene=new T.Scene(),solids=[],origin=createOrigin(scene,solids),p=new T.Vector3(54,1.65,60),root=origin.root;
 origin.activate();origin.setTheme(false);for(let z=60;z<=110;z++){p.z=z;origin.update(.05,true,p,true);assert.ok(Math.abs(p.y-1.65-originHeight(54,z))<1e-6);}
 assert.equal(p.y,5.65);const before=p.clone();origin.setTheme(true);assert.ok(origin.opened);assert.equal(origin.root,root);assert.ok(p.equals(before));origin.dispose();
});
test('reduced motion freezes cloud drift and instancing releases its GPU buffers',()=>{
 const scene=new T.Scene(),origin=createOrigin(scene,[]),p=new T.Vector3(12,1.65,90);origin.setTheme(false);
 const cloud=origin.root.children.find(o=>o.material?.uniforms?.time),banks=origin.root.children.find(o=>o.isInstancedMesh);
 origin.update(1,false,p,true);const time=cloud.material.uniforms.time.value;assert.ok(time>0);
 origin.update(1,true,p,true);assert.equal(cloud.material.uniforms.time.value,time);
 let released=false;banks.addEventListener('dispose',()=>released=true);origin.dispose();assert.ok(released);
});
test('shared Origin update preserves ladder and rooftop elevation while using exterior atmosphere',()=>{
 const scene=new T.Scene();scene.fog=new T.FogExp2('#ffffff',.0035);const origin=createOrigin(scene,[]),p=new T.Vector3(-40,16.05,50);
 origin.setTheme(false);origin.update(.05,false,p,true,false,false,true);assert.equal(p.y,16.05);assert.equal(scene.fog.density,.0009);
 origin.setTheme(true);p.set(-57,6.8,19.5);origin.update(.05,true,p,true,false,false,true);assert.equal(p.y,6.8);origin.dispose();
});
