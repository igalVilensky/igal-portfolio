import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,readdir,mkdtemp,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const base=new URL('.',import.meta.url).pathname;
const temp=await mkdtemp(join(tmpdir(),'arrival-clearance-'));
after(()=>rm(temp,{recursive:true,force:true}));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(temp,'node_modules'),'dir');
for(const name of await readdir(base,{recursive:true})){if(!name.endsWith('.ts'))continue;const out=temp+'/'+name.replace(/\.ts$/,'.mjs');await mkdir((await import('node:path')).dirname(out),{recursive:true});await writeFile(out,ts.transpileModule(await readFile(base+name,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/(from\s+['"])(\.[^'"]+)(['"])/g,(all,a,b,c)=>a+b+(/\.[a-z]+$/i.test(b)?'':'.mjs')+c));}
test('occupied transport envelopes clear world geometry, station structures, supports and each other',async()=>{
const scene=new T.Scene();const {buildEnvironment}=await import(join(temp,'environment.mjs'));const arch=buildEnvironment(scene);
globalThis.matchMedia=()=>({matches:false});
for(const [file,fn] of [['origin','createOrigin'],['ascent','createAscent'],['loop-district','createLoopDistrict'],['living-quarters','createLivingQuarters'],['atmosphere','createAtmosphere']]){(await import(join(temp,file+'.mjs')))[fn](scene,arch.solids);}
globalThis.Image=class {};
globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:()=>()=>{}})})};
for(const [file,fn] of [['expansion','createExpansion'],['work-wing','createWorkWing'],['little-explorer','createLittleExplorer']]){(await import(join(temp,file+'.mjs')))[fn](scene,arch.solids);}
delete globalThis.document;
const {createSkyNetwork}=await import(join(temp,'skytube.mjs'));const sky=createSkyNetwork(scene,[]);const coaster=(await import(join(temp,'sky-coaster.mjs'))).createSkyCoaster(scene,[]);
scene.updateMatrixWorld(true);
const bounds=arch.solids.map(m=>[m,new T.Box3().setFromObject(m)]).filter(([m,b])=>b.max.x-b.min.x<1000&&m.geometry.type!=='PlaneGeometry');
for(const root of [coaster.root,sky.transport.root,sky.scenic.root])for(const m of root.children)if(m.isMesh&&(m.geometry.type==='BoxGeometry'||m.geometry.type==='CylinderGeometry'))bounds.push([m,new T.Box3().setFromObject(m)]);
const tri=new T.Triangle(),q=new T.Vector3();
for(const [name,route,radius] of [['service',sky.transport.route,3.35],['scenic',sky.scenic.route,3.35]]){
const found=new Map();const len=route.getLength();for(let d=7;d<len-7;d+=.75){const p=route.getPointAt(d/len);for(const [m,b] of bounds){if(b.distanceToPoint(p)>radius)continue;const g=m.geometry,pos=g.attributes.position,idx=g.index;let near=false;for(let i=0;i<(idx?idx.count:pos.count);i+=3){for(const [v,k] of [[tri.a,0],[tri.b,1],[tri.c,2]])v.fromBufferAttribute(pos,idx?idx.getX(i+k):i+k).applyMatrix4(m.matrixWorld);tri.closestPointToPoint(p,q);if(q.distanceTo(p)<radius){near=true;break;}}if(near&&!found.has(m))found.set(m,{at:p.toArray().map(v=>+v.toFixed(1)),room:m.userData.room,type:g.type,center:b.getCenter(new T.Vector3()).toArray().map(v=>+v.toFixed(1)),size:b.getSize(new T.Vector3()).toArray().map(v=>+v.toFixed(1))});}}
assert.equal(found.size,0,name+': '+JSON.stringify([...found.values()]));assert.ok(len>(name==='scenic'?1000:200));}

const camera=new T.PerspectiveCamera();camera.position.set(-58,1.65,92);coaster.activate(camera);coaster.update(1.6,false,camera);
const envelope=new T.Box3(new T.Vector3(-1.65,-.55,-4.2),new T.Vector3(1.65,2.5,3.2)),inverse=new T.Matrix4();const hits=new Map();
for(let time=0;time<coaster.duration;time+=.075){coaster.update(.075,false,camera);if(coaster.phase!=="riding")continue;inverse.copy(coaster.car.matrixWorld).invert();const swept=envelope.clone().applyMatrix4(coaster.car.matrixWorld);for(const [m,b] of bounds){if(!swept.intersectsBox(b))continue;const g=m.geometry,pos=g.attributes.position,idx=g.index;for(let i=0;i<(idx?idx.count:pos.count);i+=3){for(const [v,k] of [[tri.a,0],[tri.b,1],[tri.c,2]])v.fromBufferAttribute(pos,idx?idx.getX(i+k):i+k).applyMatrix4(m.matrixWorld).applyMatrix4(inverse);if(envelope.intersectsTriangle(tri)){if(!hits.has(m))hits.set(m,{at:coaster.car.position.toArray().map(v=>+v.toFixed(1)),room:m.userData.room,name:m.name,size:b.getSize(new T.Vector3()).toArray(),center:b.getCenter(new T.Vector3()).toArray()});break;}}}}
assert.equal(hits.size,0,'train envelope: '+JSON.stringify([...hits.values()]));assert.ok(coaster.length>1900);
const routes=[['service',sky.transport.route,3.35],['scenic',sky.scenic.route,3.35],['coaster',coaster.route,4]];
for(let a=0;a<routes.length;a++)for(let b=a+1;b<routes.length;b++){
 const [na,ra,ar]=routes[a],[nb,rb,br]=routes[b];let min=Infinity,where;
 const bp=rb.getSpacedPoints(Math.ceil(rb.getLength()/1));
 for(const p of ra.getSpacedPoints(Math.ceil(ra.getLength()/1)))for(const q of bp){const d=p.distanceTo(q);if(d<min){min=d;where=[p.toArray(),q.toArray()];}}
 assert.ok(min>ar+br+1,na+' / '+nb+' separation: '+min);
}
const secrets=(await import(join(temp,'two-secrets.mjs'))).createTwoSecrets(scene);
for(const [name,r,rad] of routes){let min=Infinity,where;const other=r.getSpacedPoints(Math.ceil(r.getLength()));for(const p of secrets.route.getSpacedPoints(900))for(const q of other){const d=p.distanceTo(q);if(d<min){min=d;where=[p.toArray(),q.toArray()];}}assert.ok(min>rad+12,'whale / '+name+' separation: '+min);}

secrets.dispose();coaster.dispose();sky.dispose();arch.dispose();
});
