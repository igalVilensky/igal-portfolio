import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const load=name=>{const exports={};new Function('require','exports',ts.transpileModule(readFileSync(new URL(`./${name}.ts`,import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(()=>T,exports);return exports;};
const {traversalOwner,canStartTraversal}=load('traversal');
test('every traversal owner blocks a second activation; release permits walking without position changes',()=>{
 for(const owner of ['flight','skyfall','horizon','skytube','coaster','secret','guided','portal','swim']){
  assert.equal(traversalOwner({[owner]:true}),owner);assert.equal(canStartTraversal({[owner]:true}),false);
 }
 assert.equal(canStartTraversal({},true),false);assert.equal(canStartTraversal({}),true);assert.equal(traversalOwner({}),'walk');
});
const {capturePortalRenderState}=load('portal-render-state');
test('portal restoration preserves hidden apertures, target face/mip, scene and shadow state on failure',()=>{
 const scene=new T.Scene(),root=new T.Group(),aperture=new T.Object3D();root.add(aperture);scene.add(root);aperture.visible=false;
 const background=new T.Color('red'),fog=new T.Fog('blue',1,2);scene.background=background;scene.fog=fog;
 const target={},planes=[],shadowMap={autoUpdate:true,needsUpdate:true};let restored;
 const renderer={getRenderTarget:()=>target,getActiveCubeFace:()=>2,getActiveMipmapLevel:()=>3,clippingPlanes:planes,shadowMap,setRenderTarget:(...args)=>restored=args};
 const restore=capturePortalRenderState(renderer,scene,[aperture]);
 assert.throws(()=>{try{root.visible=false;aperture.visible=true;scene.background=null;scene.fog=null;renderer.clippingPlanes=[];shadowMap.autoUpdate=false;shadowMap.needsUpdate=false;throw Error('submission failed');}finally{restore();}});
 assert(root.visible);assert.equal(aperture.visible,false);assert.equal(scene.background,background);assert.equal(scene.fog,fog);assert.equal(renderer.clippingPlanes,planes);assert.deepEqual(restored,[target,2,3]);assert.deepEqual(shadowMap,{autoUpdate:true,needsUpdate:true});
});
test('boarding cancellation preserves current position; emergency recovery remains explicit',()=>{
 const {createHorizonTransit,horizonExits}=load('horizon-transit'),ride=createHorizonTransit(),camera=new T.PerspectiveCamera();camera.position.copy(horizonExits[0]);
 assert(ride.board(0,camera,true));ride.update(.1,camera);const position=camera.position.clone();assert(ride.cancel(camera));assert(camera.position.equals(position));assert(!ride.ownsPassenger);
 ride.recover(camera);assert(camera.position.equals(horizonExits[0]));ride.dispose();
});
test('actual guided-approach release preserves camera pose and restores walking input',()=>{
 const vue=readFileSync(new URL('./ArrivalChamber.client.vue',import.meta.url),'utf8');
 const script=vue.slice(vue.indexOf('>')+1,vue.indexOf('</script>'));
 const ast=ts.createSourceFile('arrival.ts',script,ts.ScriptTarget.ES2022,true);
 const declaration=ast.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='restoreExploration');assert(declaration);
 const code=ts.transpileModule(declaration.getText(ast),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;
 const camera=new T.PerspectiveCamera();camera.position.set(4,1.65,-18);camera.rotation.set(.1,.4,0,'YXZ');
 const position=camera.position.clone(),rotation=camera.quaternion.clone();let enabled=false,restored;
 const look={restore:(...angles)=>restored=angles,setEnabled:value=>enabled=value};
 const run=new Function('T','camera','look',`let saved={position:new T.Vector3(50,1.65,50),yaw:0,pitch:0,locked:false},travel={},guided=true,needsRender=false;const resumeLook={value:false},portalState={value:'entering'},journey={locate(){}},nextTick=()=>{};${code};restoreExploration(true);return {guided,travel,saved,needsRender,state:portalState.value};`);
 const result=run(T,camera,look);assert(camera.position.equals(position));assert(camera.quaternion.equals(rotation));assert(enabled);assert(Math.abs(restored[0]-.4)<1e-9);assert(Math.abs(restored[1]-.1)<1e-9);assert.deepEqual(result,{guided:false,travel:undefined,saved:undefined,needsRender:true,state:'exploring'});
});
