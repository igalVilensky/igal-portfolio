import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,symlink,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import ts from 'typescript';
import * as T from 'three';
const temp=await mkdtemp(join(tmpdir(),'arrival-lagoon-'));
after(()=>rm(temp,{recursive:true,force:true}));
await symlink(new URL('../../node_modules',import.meta.url).pathname,join(temp,'node_modules'),'dir');
for(const name of ['npc-passenger','star-geography','lagoon-model','lagoon-copy','lagoon','builder-model','creation-yard','collision','origin','sky-coaster','skytube','geography','camera','spaces','print-lab','print-model']){
 const source=await readFile(new URL(`./${name}.ts`,import.meta.url),'utf8');
 const js=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace(/from '(\.\/[^']+)'/g,"from '$1.mjs'");
 await writeFile(join(temp,`${name}.mjs`),js);
}
const a=await import(join(temp,'lagoon-model.mjs'));
const b=await import(join(temp,'builder-model.mjs'));
const piece=(override={})=>({id:1,type:'cube',x:-166,y:.5,z:132,rotation:0,color:b.pieceColors[0],...override});
test('movement ownership excludes passenger, guided, modal and other-world motion',()=>{
 const base={passenger:false,guided:false,ui:false,otherWorld:false,water:true};
 assert.equal(a.motionOwner(base),'swimming');
 for(const [key,value] of [['passenger','passenger'],['guided','guided'],['ui','ui'],['otherWorld','other-world']])assert.equal(a.motionOwner({...base,[key]:true}),value);
 assert.equal(a.motionOwner({...base,water:false}),'walking');
});
test('beach, surface, submerged and dry passage classify the same water boundary',()=>{
 assert.equal(a.waterState({x:-135,y:1.65,z:62}),'land');
 assert.equal(a.waterState({x:-139,y:1,z:62}),'entering');
 assert.equal(a.waterState({x:-165,y:-.35,z:65}),'surface');
 assert.equal(a.waterState({x:-165,y:-2,z:65}),'underwater');
 assert.equal(a.waterState({x:-180,y:-5.35,z:65}),'land');
 assert.equal(a.inTunnel(-180,-1,65),false);
 for(const z of [30,45,85,100])assert.ok(Number.isFinite(a.tunnelFloor(z)));
});
test('swimming dives, ascends, damps, respects seabed and surfaces without jumping',()=>{
 const swim=a.createSwimming(),p={x:-165,y:-.35,z:65};
 for(let i=0;i<120;i++)swim.update(1/60,p,{x:0,z:0},-1);
 assert.equal(swim.state,'underwater');assert.ok(p.y< -5);
 for(let i=0;i<300;i++)swim.update(1/60,p,{x:0,z:0},-1);
 assert.equal(p.y,a.lagoon.floor+a.lagoon.eye);
 for(let i=0;i<600;i++)swim.update(1/60,p,{x:0,z:0},1);
 assert.equal(swim.state,'surface');assert.equal(p.y,a.lagoon.water+.45);
 swim.reset();assert.equal(swim.active,false);
});
test('deep walls, tunnel exterior and beach exit cannot strand swimmers',()=>{
 const swim=a.createSwimming();const p={x:-138.8,y:-3,z:70};
 swim.update(.05,p,{x:4,z:0},0);assert.ok(a.inBasin(p.x,p.z));
 const tube={x:-176.9,y:-5,z:65};swim.update(.05,tube,{x:-1,z:0},0);assert.ok(tube.x>=-176.9);
 const roof={x:-180,y:-1,z:65};for(let i=0;i<100;i++)swim.update(1/60,roof,{x:0,z:0},-1);assert.ok(roof.y>=a.tunnelFloor(65)+5.1);assert.equal(a.inTunnel(roof.x,roof.y,roof.z),false);
 const beach={x:-150,y:-4,z:62};for(let i=0;i<160;i++)swim.update(1/60,beach,{x:.12,z:0},1);
 assert.ok(beach.x>-140);assert.ok(beach.y>=1);assert.ok(['land','entering'].includes(swim.state));
});
test('placement bounds allow stacks, rotations and adjacent walls; reject intersections and limits',()=>{
 const p=piece();assert.ok(b.validPlacement(p,[]));assert.ok(b.validPlacement(piece({id:2,y:1.5}),[p]));
 assert.equal(b.validPlacement(piece({id:2,y:1}),[p]),false);
 assert.ok(b.validPlacement(piece({id:2,x:-165}),[p]));
 for(const q of [piece({x:0}),piece({y:-.5}),piece({y:21}),piece({x:NaN}),piece({rotation:9})])assert.equal(b.validPlacement(q,[]),false);
 assert.deepEqual(b.pieceSize(piece({type:'wall',rotation:1})),[.5,2,2]);
 assert.equal(b.validPlacement(piece({id:999}),Array.from({length:200},(_,i)=>piece({id:i+1}))),false);
});
test('versioned persistence safely rejects corrupt data, duplicate ids and oversized arrays',()=>{
 const p=piece();assert.deepEqual(b.parseCreation(JSON.stringify({version:1,pieces:[p,null,{...p,id:2,x:0},p]})),[p]);
 for(const raw of ['null','[]','{','{}',JSON.stringify({version:2,pieces:[p]})])assert.deepEqual(b.parseCreation(raw),[]);
 assert.ok(b.parseCreation(JSON.stringify({version:1,pieces:Array(1000).fill(p)})).length<=b.pieceLimit);
});
test('move, recolor, delete, undo and reset persist serializable snapshots, reset removes storage',()=>{
 let raw=null;const store=b.createBuilderStore([],v=>{raw=v;});
 assert.ok(store.put(piece()));assert.equal(b.parseCreation(raw).length,1);
 assert.ok(store.put(piece({x:-164,color:b.pieceColors[1]})));assert.equal(store.pieces.length,1);
 store.remove(1);assert.equal(store.pieces.length,0);store.undo();assert.equal(store.pieces[0].x,-164);
 store.reset();assert.equal(raw,null);assert.deepEqual(store.pieces,[]);store.undo();assert.equal(b.parseCreation(raw).length,1);
 const denied=b.createBuilderStore([],()=>{throw Error('quota');});denied.put(piece());assert.equal(denied.saved,false);assert.equal(denied.pieces.length,1);
});
test('physical bridge is open from Origin and dry passage has two continuous ground ramps',async()=>{
 const {createLagoon}=await import(join(temp,'lagoon.mjs'));
 const {createOrigin}=await import(join(temp,'origin.mjs'));const {createPrintLab}=await import(join(temp,'print-lab.mjs'));const {expansionLeg}=await import(join(temp,'spaces.mjs'));
 const {createCollision}=await import(join(temp,'collision.mjs'));
 const previous=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 const scene=new T.Scene(),solids=[];let world,origin,printLab;
 try{world=createLagoon(scene,solids);origin=createOrigin(scene,solids);printLab=createPrintLab(scene,solids);world.setLocale('ru');scene.updateMatrixWorld(true);const collide=createCollision(solids);const p=new T.Vector3(-104,1.65,62);collide(p,new T.Vector3(-30,0,0));assert.ok(Math.abs(p.x+134)<.01);collide(p,new T.Vector3(30,0,0));assert.ok(Math.abs(p.x+104)<.01);assert.ok(a.onExpansionApproach(p.x,p.z));
 for(let z=30;z<=100;z+=.2){assert.ok(a.inExpansion(-180,z));assert.ok(Math.abs(a.tunnelFloor(z+.2)-a.tunnelFloor(z))<.1);}
 const path=expansionLeg(new T.Vector3(-134,1.65,62)),visitor=path[0].clone();for(const target of path.slice(1,-1)){collide(visitor,target.clone().sub(visitor));assert.ok(visitor.distanceTo(target)<.001,'New guided route clears Print Lab');}
 // Wall is still closed alongside the bridge portal.
 p.set(-108,1.65,70);collide(p,new T.Vector3(-8,0,0));assert.ok(p.x>-112);
 }finally{world?.dispose();origin?.dispose();printLab?.dispose();globalThis.document=previous;}
});

test('builder scene edits individual pieces, restores saved content and releases its resources',async()=>{
 const {createCreationYard}=await import(join(temp,'creation-yard.mjs'));
 const previous=globalThis.localStorage;const data=new Map();globalThis.localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 const scene=new T.Scene();const builder=createCreationYard(scene);
 try{
  const camera=new T.PerspectiveCamera(65,1,.08,500);camera.position.set(-166,6,113);camera.lookAt(-166,0,125);camera.updateMatrixWorld(true);
  builder.update(camera);assert.ok(builder.valid);builder.place();assert.equal(builder.store.pieces.length,1);assert.equal(builder.selected,null);
  const placed=builder.store.pieces[0];camera.lookAt(placed.x,placed.y+.09,placed.z);camera.updateMatrixWorld(true);builder.select();builder.activate(camera);assert.equal(builder.selected,placed.id);
  const block=builder.store.pieces[0];const walk=new T.Vector3(block.x-1,1.65,block.z),to=walk.clone().add(new T.Vector3(.8,0,0));builder.constrain(walk,to);assert.equal(to.x,walk.x);const above=new T.Vector3(block.x,2.65,block.z);assert.equal(builder.constrain(above,above.clone()),1);
  builder.rotate();assert.equal(builder.store.pieces[0].rotation,1);builder.setColor(b.pieceColors[2]);assert.equal(builder.store.pieces[0].color,b.pieceColors[2]);
  builder.move();assert.ok(builder.moving);builder.close();assert.equal(builder.moving,false);assert.equal(builder.store.pieces.length,1);
  const restored=createCreationYard(scene);assert.deepEqual(restored.store.pieces,builder.store.pieces);restored.dispose();
  builder.remove();assert.equal(builder.store.pieces.length,0);builder.undo();assert.equal(builder.store.pieces.length,1);
  builder.reset();assert.equal(data.has(b.builderKey),false);
 }finally{builder.dispose();globalThis.localStorage=previous;assert.equal(scene.children.length,0);}
});

test('expansion architecture clears existing transport paths and bearing masts',async()=>{
 const {createSkyCoaster}=await import(join(temp,'sky-coaster.mjs'));const {createSkyRoute,createScenicRoute}=await import(join(temp,'skytube.mjs'));
 const {createLagoon}=await import(join(temp,'lagoon.mjs'));
 const prev=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 const scene=new T.Scene(),solids=[];const world=createLagoon(scene,solids),coaster=createSkyCoaster(scene,[]);globalThis.document=prev;
 try{
 world.registerSupports(coaster.root);scene.updateMatrixWorld(true);const bounds=[];world.root.traverse(m=>{if(m.isMesh&&!m.isInstancedMesh&&m.visible)bounds.push([m,new T.Box3().setFromObject(m)]);});
 const triangle=new T.Triangle(),q=new T.Vector3();
 for(const [name,route,radius] of [['tube',createSkyRoute(),3.4],['scenic',createScenicRoute(),3.4],['coaster',coaster.route,4.5]]){
  const length=route.getLength();for(let d=0;d<length;d+=2){const point=route.getPointAt(d/length);if(point.x> -125||point.z<20||point.z>158)continue;
   for(const [mesh,b] of bounds){if(b.distanceToPoint(point)>radius)continue;const g=mesh.geometry,position=g.attributes.position,index=g.index;
    for(let i=0;i<(index?index.count:position.count);i+=3){for(const [v,k] of [[triangle.a,0],[triangle.b,1],[triangle.c,2]])v.fromBufferAttribute(position,index?index.getX(i+k):i+k).applyMatrix4(mesh.matrixWorld);triangle.closestPointToPoint(point,q);assert.ok(q.distanceTo(point)>=radius,`${name} intersects expansion at ${point.toArray()}`);}
   }
   if(point.x>=-186&&point.x<=-146&&point.z>=116&&point.z<=148)assert.ok(point.y-radius>10,'Maximum construction height clears overhead route');
  }
 }
 const masts=coaster.root.children.filter(m=>m.name==='Cloudbreaker · offset bearing mast');
 for(const mast of masts){const b=new T.Box3().setFromObject(mast);if(a.inExpansion(mast.position.x,mast.position.z)&&b.min.y<0&&b.max.y>0){assert.ok(solids.includes(mast));assert.ok(world.supportBounds.some(box=>box.equals(b)));const swim=a.createSwimming();swim.setObstacles(world.supportBounds);const p={x:b.max.x+.5,y:-2,z:mast.position.z};swim.update(.05,p,{x:-.5,z:0},0);assert.ok(p.x>b.max.x+.4);}}
 }finally{world.dispose();coaster.dispose();}
});

test('shared look input owns held swim ascent and dive, clears interruptions and restores jump',async()=>{
 const {createLook}=await import(join(temp,'camera.mjs'));const oldWindow=globalThis.window,oldDocument=globalThis.document;
 globalThis.window=new EventTarget();globalThis.document=new EventTarget();const canvas=new EventTarget();let jumps=0;
 const look=createLook(new T.PerspectiveCamera(),canvas,{activate(){},hover(){},escape(){},manual(){},jump(){jumps++;}});
 const key=(code,type='keydown')=>{const e=new Event(type,{cancelable:true});Object.defineProperties(e,{code:{value:code},key:{value:code},target:{value:canvas}});window.dispatchEvent(e);};
 try{look.setSwimming(true);key('Space');assert.equal(look.swimAxis(),1);assert.equal(jumps,0);key('Space','keyup');key('KeyC');assert.equal(look.swimAxis(),-1);window.dispatchEvent(new Event('blur'));assert.equal(look.swimAxis(),0);look.swimAnalog(1);assert.equal(look.swimAxis(),1);look.setEnabled(false);assert.equal(look.swimAxis(),0);look.setSwimming(false);look.setEnabled(true);key('Space');assert.equal(jumps,1);}
 finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});

test('free pointer and center aim resolve distinct grid previews; confirmation consumes the displayed draft',async()=>{
 const {createCreationYard}=await import(join(temp,'creation-yard.mjs'));
 const scene=new T.Scene(),builder=createCreationYard(scene),camera=new T.PerspectiveCamera(65,1,.08,500);
 camera.position.set(-166,12,116);camera.lookAt(-166,0,132);camera.updateMatrixWorld(true);
 try{
  const rect={left:100,top:50,width:800,height:600};
  assert.deepEqual(b.builderPointer(300,350,rect,false),{x:-.5,y:0});
  assert.deepEqual(b.builderPointer(300,350,rect,true),{x:0,y:0});
  builder.update(camera,-.35,0);const left=builder.draft;assert.ok(builder.valid);
  builder.update(camera,.35,0);assert.notEqual(builder.draft.x,left.x);
  builder.choose('wall');builder.rotate();const shown=builder.draft;assert.equal(shown.rotation,1);
  const ghost=scene.children[0].children.find(o=>o.isMesh&&o.material.transparent);
  assert.deepEqual(ghost.position.toArray(),[shown.x,shown.y+.09,shown.z]);assert.equal(ghost.rotation.y,Math.PI/2);
  // Different activation coordinates must not silently replace the visible target.
  builder.activate(camera,-.8,.6);assert.deepEqual(builder.store.pieces,[shown]);
  builder.update(camera);const centered=builder.draft;assert.equal(centered.x,Math.round(centered.x*2)/2);
  builder.place();assert.deepEqual(builder.store.pieces[1],centered);
  camera.lookAt(0,0,0);camera.updateMatrixWorld(true);builder.update(camera);assert.equal(builder.valid,false);
  const count=builder.store.pieces.length;builder.place();assert.equal(builder.store.pieces.length,count);
  camera.lookAt(shown.x,shown.y+.09,shown.z);camera.updateMatrixWorld(true);builder.select();builder.activate(camera);builder.move();
  camera.lookAt(0,0,0);camera.updateMatrixWorld(true);builder.update(camera);builder.place();assert.deepEqual(builder.store.pieces[0],shown);
  assert.equal(builder.cancel(),true);assert.equal(builder.moving,false);assert.equal(builder.store.pieces.length,count);
 }finally{builder.dispose();}
});

test('construction sessions depend on motion ownership, not distance from the terminal',()=>{
 for(const position of [{x:-166,z:114},{x:-185,z:146},{x:-135,z:62}]){
  assert.equal(b.builderSessionActive({...position,guided:false,passenger:false,otherWorld:false}),true);
 }
 for(const key of ['guided','passenger','otherWorld'])assert.equal(b.builderSessionActive({guided:false,passenger:false,otherWorld:false,[key]:true}),false);
});

test('tunnel centerline has open opaque geometry, traversable collision and dry ramps in both directions',async()=>{
 const {createLagoon}=await import(join(temp,'lagoon.mjs'));const {createCollision}=await import(join(temp,'collision.mjs'));
 const previous=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 const scene=new T.Scene(),solids=[],world=createLagoon(scene,solids);
 try{
  scene.updateMatrixWorld(true);const collide=createCollision(solids),ray=new T.Raycaster();
  const opaque=[];world.root.traverse(m=>{if(m.isMesh&&!m.isInstancedMesh&&!m.material.transparent)opaque.push(m);});
  for(const direction of [-1,1])for(let z=30.3;z<99.7;z+=.25){
   const p=new T.Vector3(-180,a.tunnelFloor(z)+1.65,z),expected=z+direction*.2;
   assert.equal(a.waterState(p),'land');ray.set(p,new T.Vector3(0,0,direction));ray.far=.21;
   assert.equal(ray.intersectObjects(opaque,false).length,0,`opaque blockage at ${z}`);
   collide(p,new T.Vector3(0,0,direction*.2));assert.ok(Math.abs(p.z-expected)<1e-7);
  }
  assert.equal(a.inTunnel(-180,-10,65),false,'below the floor is not dry interior');
  assert.equal(a.inTunnel(-177.8,-3,65),false,'above curved glass is not dry interior');
  // The seabed top has no second horizontal keel cap beneath it.
  const downward=new T.Raycaster(new T.Vector3(-170,-10,65),new T.Vector3(0,-1,0),0,2);
  const hits=downward.intersectObjects(opaque,false).filter(h=>Math.abs(h.point.y+11)<.001);
  assert.equal(new Set(hits.map(h=>h.object)).size,1);
  const geometry=new Set(),materials=new Set();world.root.traverse(o=>{if(o.geometry)geometry.add(o.geometry);if(o.material)materials.add(o.material);});
  let disposed=0;for(const g of geometry)g.addEventListener('dispose',()=>disposed++);for(const m of materials)m.addEventListener('dispose',()=>disposed++);
  world.dispose();assert.equal(disposed,geometry.size+materials.size);assert.equal(scene.children.length,0);
 }finally{if(scene.children.length)world.dispose();globalThis.document=previous;}
});

test('coaster nonadjacent rails have clearance and the closed rider path has no tangent seam',async()=>{
 const {createSkyCoaster}=await import(join(temp,'sky-coaster.mjs'));const coaster=createSkyCoaster(new T.Scene(),[]);
 try{
  const n=2400,points=coaster.route.getSpacedPoints(n);let minimum=Infinity;
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
   if(Math.min(j-i,n-j+i)*coaster.length/n<20)continue;
   minimum=Math.min(minimum,points[i].distanceTo(points[j]));
  }
  assert.ok(minimum>5.5,`nonlocal centerline clearance ${minimum}`);
  assert.ok(coaster.route.getPointAt(0).distanceTo(coaster.route.getPointAt(1))<1e-8);
  assert.ok(coaster.route.getTangentAt(.00001).angleTo(coaster.route.getTangentAt(.99999))<.01);
  for(const mast of coaster.root.children.filter(o=>o.name==='Cloudbreaker · offset bearing mast')){
   assert.equal(((mast.position.x+170)/43)**2+((mast.position.z-65)/41)**2<1,false);
  }
 }finally{coaster.dispose();}
});

test('fish remain underwater and outside the tunnel and reef colonies along their animated lanes',async()=>{
 const {createLagoon}=await import(join(temp,'lagoon.mjs'));const previous=globalThis.document;
 globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 const world=createLagoon(new T.Scene(),[]),camera=new T.PerspectiveCamera();camera.position.set(-170,2,65);
 try{
  const fish=world.root.getObjectByName('Lagoon · schooling fish'),coral=[];const matrix=new T.Matrix4(),bounds=new T.Box3(),position=new T.Vector3();
  world.root.traverse(o=>{if(o.name==='Lagoon · coral colonies'){o.geometry.computeBoundingBox();for(let i=0;i<o.count;i++){o.getMatrixAt(i,matrix);coral.push(o.geometry.boundingBox.clone().applyMatrix4(matrix));}}});
  fish.geometry.computeBoundingBox();
  for(let frame=0;frame<800;frame++){
   world.update(.1,false,camera);
   for(let i=0;i<fish.count;i++){
    fish.getMatrixAt(i,matrix);bounds.copy(fish.geometry.boundingBox).applyMatrix4(matrix);position.setFromMatrixPosition(matrix);
    assert.ok(bounds.max.y<a.lagoon.water-.5);assert.ok(bounds.min.y>a.lagoon.floor);
    for(const x of [bounds.min.x,bounds.max.x])for(const z of [bounds.min.z,bounds.max.z])assert.ok(a.inBasin(x,z));
    assert.ok(bounds.min.x> -177.4||bounds.max.x< -182.6);
    assert.equal(coral.some(b=>b.intersectsBox(bounds)),false,`reef intersects fish ${i}`);
   }
  }
 }finally{world.dispose();globalThis.document=previous;}
});

test('touch targeting updates on press and drag without enabling unrelated hover raycasts',async()=>{
 const {createLook}=await import(join(temp,'camera.mjs'));const oldWindow=globalThis.window,oldDocument=globalThis.document;
 globalThis.window=new EventTarget();globalThis.document=new EventTarget();const canvas=new EventTarget();canvas.focus=()=>{};canvas.setPointerCapture=()=>{};
 const targets=[],activations=[];let hovers=0;
 const look=createLook(new T.PerspectiveCamera(),canvas,{target:(...p)=>targets.push(p),activate:(...p)=>activations.push(p),hover:()=>hovers++,escape(){},manual(){},jump(){}});
 const pointer=(type,x,y)=>{const e=new Event(type);Object.assign(e,{pointerType:'touch',button:0,pointerId:1,clientX:x,clientY:y});canvas.dispatchEvent(e);};
 try{
  pointer('pointerdown',120,180);assert.deepEqual(targets.at(-1),[120,180,false]);
  pointer('pointermove',123,181);assert.deepEqual(targets.at(-1),[123,181,false]);assert.equal(hovers,0);
  pointer('pointerup',123,181);assert.equal(activations.length,1);
 }finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
