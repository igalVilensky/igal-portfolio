import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const source=readFileSync(new URL('./character-assets.ts',import.meta.url),'utf8');
let code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
for(const name of ['three','three/addons/loaders/GLTFLoader.js','three/addons/utils/SkeletonUtils.js'])code=code.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name)));
const {loadCharacterAssets}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const directory=new URL('../../public/arrival-lab/characters/',import.meta.url);

test('real rigged assets retain metre calibration, child anatomy and blended animation',async()=>{
 const original=GLTFLoader.prototype.loadAsync,previous=globalThis.ProgressEvent;
 globalThis.ProgressEvent=class {};
 GLTFLoader.prototype.loadAsync=async function(path){
  const d=JSON.parse(readFileSync(new URL(path.split('/').at(-1),directory),'utf8'));
  for(const b of d.buffers)b.uri='data:application/octet-stream;base64,'+readFileSync(new URL(b.uri,directory)).toString('base64');
  // Geometry, rig and material checks do not need DOM-backed texture decoding.
  for(const m of d.materials)delete m.pbrMetallicRoughness.baseColorTexture;
  delete d.images;delete d.textures;
  return this.parseAsync(JSON.stringify(d),'');
 };
 let assets;
 try{
  assets=await loadCharacterAssets();const models=[];
  for(const [id,age,height] of [['igal',41,1.65],['anastasia',42,1.65],['amelia',17,1.65],['nataniel',7,1.2],['adriel',3,1.025]]){
   const visual=assets.create({id,age,height,hair:'#493326',shirt:'#566878',pants:'#343d45',skin:'#dfaf91'});models.push(visual);
   visual.root.updateMatrixWorld(true);let bounds=new T.Box3().setFromObject(visual.root,true);
   assert(Math.abs(bounds.max.y-bounds.min.y-height)<.015,`${id}: ${bounds.max.y-bounds.min.y}`);
   assert(Math.abs(bounds.min.y)<.015,`${id}: grounded`);
   let body;visual.root.traverse(o=>{if(o instanceof T.SkinnedMesh && o.geometry.attributes.position.count>2000)body=o;});
   assert(body);assert(body.skeleton.bones.length>50);assert(body.geometry.attributes.color);assert(body.geometry.attributes.position.count>5000);
   const thigh=body.skeleton.bones.find(b=>b.name==='thigh_l');const before=thigh.quaternion.clone();
   visual.update(.1,true,false,false);visual.update(.2,true,false,false);assert(before.angleTo(thigh.quaternion)>.01);
   const time=visual.mixer.time;visual.update(.1,true,false,false);assert(visual.mixer.time>time);
   visual.update(.1,false,true,false);visual.update(.2,false,true,true);
   visual.root.traverse(o=>{if(o instanceof T.Mesh)for(const n of o.geometry.attributes.position.array)assert(Number.isFinite(n));});
  }
  // Later child creation must never mutate the adult's inverse bind matrices.
  for(const visual of models){visual.update(.1,false,false,false);visual.update(.3,false,false,false);visual.root.updateMatrixWorld(true);const box=new T.Box3().setFromObject(visual.root,true);assert(Math.abs(box.max.y-box.min.y-visual.height)<.025,`shared rig isolation: ${box.max.y-box.min.y} vs ${visual.height}`);}
  function ratios(visual){let head,hip,knee,ankle;visual.root.updateMatrixWorld(true);visual.root.traverse(o=>{if(o.name==='Head')head=o;if(o.name==='pelvis')hip=o;if(o.name==='calf_l')knee=o;if(o.name==='foot_l')ankle=o;});return {head:head.getWorldPosition(new T.Vector3()).y/visual.height,leg:knee.getWorldPosition(new T.Vector3()).distanceTo(ankle.getWorldPosition(new T.Vector3()))/visual.height};}
  const adult=ratios(models[0]),child=ratios(models[3]),toddler=ratios(models[4]);
  assert(child.leg<adult.leg);assert(toddler.leg<child.leg);assert(toddler.head<adult.head);
 }finally{assets?.dispose();GLTFLoader.prototype.loadAsync=original;globalThis.ProgressEvent=previous;}
});
