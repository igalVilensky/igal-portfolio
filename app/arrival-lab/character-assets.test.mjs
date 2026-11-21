import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const source=readFileSync(new URL('./character-assets.ts',import.meta.url),'utf8');
let code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
for(const name of ['three','three/addons/loaders/GLTFLoader.js','three/addons/utils/SkeletonUtils.js'])code=code.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name)));
let childCode=ts.transpileModule(readFileSync(new URL('./child-character.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
for(const name of ['three','three/addons/utils/BufferGeometryUtils.js'])childCode=childCode.replaceAll("'"+name+"'",JSON.stringify(import.meta.resolve(name)));
code=code.replace("'./child-character'",JSON.stringify('data:text/javascript;base64,'+Buffer.from(childCode).toString('base64')));
const {loadCharacterAssets}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const directory=new URL('../../public/arrival-lab/characters/',import.meta.url);

test('real rigs preserve anatomy, ground seated transitions and raise a connected waving arm',async()=>{
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
  for(const [id,age,height] of [['igal',41,1.65],['anastasia',42,1.65],['amelia',17,1.65]]){
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
   const bone=name=>body.skeleton.bones.find(b=>b.name===name);
   const point=name=>visual.root.worldToLocal(bone(name).getWorldPosition(new T.Vector3()));
   visual.update(.3,false,false,false);visual.update(.3,false,false,false);visual.root.updateMatrixWorld(true);
   const idleHand=point('hand_r'),armLengths=[point('upperarm_r').distanceTo(point('lowerarm_r')),point('lowerarm_r').distanceTo(point('hand_r'))];
   const wavePoints=[];
   for(let n=0;n<40;n++){
    visual.update(.05,false,true,false);visual.root.updateMatrixWorld(true);
    // Lift and release intentionally pass below the head; measure the held wave.
    if(n<14||n>32)continue;
    const shoulder=point('upperarm_r'),elbow=point('lowerarm_r'),hand=point('hand_r'),head=point('Head');wavePoints.push(hand);
    assert(elbow.y>shoulder.y+height*.04,`${id}: upper arm rises above shoulder`);
    assert(hand.y>head.y+height*.04,`${id}: waving hand clears head height`);
    assert(hand.distanceTo(head)>height*.14,`${id}: hand stays outside head`);
    assert(Math.abs(shoulder.distanceTo(elbow)-armLengths[0])<.001,`${id}: connected upper arm`);
    assert(Math.abs(elbow.distanceTo(hand)-armLengths[1])<.001,`${id}: connected forearm`);
   }
   assert(Math.max(...wavePoints.map(p=>p.x))-Math.min(...wavePoints.map(p=>p.x))>height*.035,`${id}: visible lateral wave`);
   visual.update(.3,false,false,false);visual.update(.3,false,false,false);visual.root.updateMatrixWorld(true);
   assert(point('hand_r').distanceTo(idleHand)<.02,`${id}: wave returns to idle`);

   // Smaller children currently cannot select adult furniture; verify their pose
   // against proportionate seat heights without changing that eligibility rule.
   const seatHeight=age<5?.18:age<10?.26:.48;
   const standing=thigh.quaternion.clone(),ankleHeight=point('foot_l').y;
   const legLengths=[point('thigh_l').distanceTo(point('calf_l')),point('calf_l').distanceTo(point('foot_l'))];
   for(let n=1;n<=20;n++){
    visual.update(.05,false,false,false,n/20,seatHeight);visual.root.updateMatrixWorld(true);
    assert(new T.Box3().setFromObject(visual.root,true).min.y>-.015,`${id}: sit-down does not sink feet through floor`);
   }
   const hip=point('thigh_l'),knee=point('calf_l'),ankle=point('foot_l');
   assert(thigh.quaternion.angleTo(standing)>.8,`${id}: seated thigh bends (${thigh.quaternion.angleTo(standing)})`);
   assert(hip.y>seatHeight&&hip.y<seatHeight+height*.12+.002,`${id}: hip sockets sit naturally above cushion (${hip.y} vs ${seatHeight})`);
   assert(Math.abs(hip.z)<.002,`${id}: hips align with seat anchor`);
   let underside=Infinity;
   const vertex=new T.Vector3();
   for(let i=0;i<body.geometry.attributes.position.count;i++){
    body.getVertexPosition(i,vertex).applyMatrix4(body.matrixWorld);visual.root.worldToLocal(vertex);
    if(Math.abs(vertex.x)<height*.35/1.65&&vertex.z>-height*.3/1.65&&vertex.z<height*(age<10?.10:.18)/1.65)underside=Math.min(underside,vertex.y);
   }
   assert(underside>=seatHeight-.005&&underside<seatHeight+.015,`${id}: skinned hips/thighs rest on cushion without sinking or hovering (${underside})`);

   assert(knee.z>hip.z+height*.15&&knee.y<hip.y,`${id}: thighs extend forward with a natural downward slope`);
   assert(Math.abs(knee.z-ankle.z)<.005&&knee.y>ankle.y,`${id}: shins extend vertically to floor`);
   assert(Math.abs(ankle.y-ankleHeight)<.005,`${id}: feet stay at standing floor height`);
   assert(Math.abs(hip.distanceTo(knee)-legLengths[0])<.001&&Math.abs(knee.distanceTo(ankle)-legLengths[1])<.001,`${id}: leg joints remain connected at original lengths`);
   if(age>=17){
    for(const height of [.51,.48]){
     visual.update(.05,false,false,false,1,height);visual.root.updateMatrixWorld(true);
     assert(Math.abs(point('foot_l').y-ankleHeight)<.005,`${id}: changing seat height keeps feet grounded`);
    }
   }
   for(let n=19;n>=0;n--){
    visual.update(.05,false,false,false,n/20,seatHeight);visual.root.updateMatrixWorld(true);
    assert(new T.Box3().setFromObject(visual.root,true).min.y>-.015,`${id}: stand-up does not sink feet through floor`);
   }
   visual.update(.3,false,false,false,0,seatHeight);visual.root.updateMatrixWorld(true);
   assert(thigh.quaternion.angleTo(standing)<.02,`${id}: stand-up restores idle legs`);
   const upright=new T.Box3().setFromObject(visual.root,true);
   assert(Math.abs(upright.max.y-upright.min.y-height)<.025,`${id}: stand-up restores height`);
   visual.update(.2,true,false,false);visual.update(.3,true,false,false);
   assert(thigh.quaternion.angleTo(standing)>.01,`${id}: walking resumes after sitting`);

   // An upper-body greeting must preserve a moving gait, including the run blend.
   const movingLeg=thigh.quaternion.clone();let legMotion=0;
   for(let n=0;n<30;n++){visual.update(.05,true,true,false,0,seatHeight,1.8);legMotion=Math.max(legMotion,movingLeg.angleTo(thigh.quaternion));}
   assert(legMotion>.15,`${id}: legs keep moving under the greeting layer`);
   for(let n=0;n<65;n++)visual.update(.05,false,true,false,0,seatHeight,0);
   visual.root.updateMatrixWorld(true);const afterWave=point('hand_r');
   assert(afterWave.y<point('Head').y,`${id}: a held greeting request does not loop overhead forever`);
   let gestures=0;const hands=[];
   for(let n=0;n<60;n++){visual.update(.05,false,false,false,0,seatHeight,0,'responding');visual.root.updateMatrixWorld(true);hands.push(point('hand_r'));}
   for(const hand of hands)gestures=Math.max(gestures,hand.distanceTo(hands[0]));
   assert(gestures>height*.035,`${id}: conversational gestures have a readable range`);
   for(let n=0;n<20;n++)visual.update(.05,false,false,false);
   visual.root.traverse(o=>{if(o instanceof T.Mesh)for(const n of o.geometry.attributes.position.array)assert(Number.isFinite(n));});
  }
  // Later child creation must never mutate the adult's inverse bind matrices.
  for(const visual of models){visual.update(.1,false,false,false);visual.update(.3,false,false,false);visual.root.updateMatrixWorld(true);const box=new T.Box3().setFromObject(visual.root,true);assert(Math.abs(box.max.y-box.min.y-visual.height)<.025,`shared rig isolation: ${box.max.y-box.min.y} vs ${visual.height}`);}

 }finally{assets?.dispose();GLTFLoader.prototype.loadAsync=original;globalThis.ProgressEvent=previous;}
});
