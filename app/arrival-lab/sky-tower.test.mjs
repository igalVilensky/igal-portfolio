import {test} from 'node:test';import assert from 'node:assert/strict';import {readFileSync,existsSync,readdirSync} from 'node:fs';import {fileURLToPath} from 'node:url';import ts from 'typescript';import * as T from 'three';import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const cache=new Map();function load(file){const url=new URL(file,import.meta.url);if(cache.has(url.href))return cache.get(url.href);const out={};cache.set(url.href,out);new Function('require','exports',ts.transpileModule(readFileSync(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(name=>name==='three'?T:name.includes('RoundedBoxGeometry')?{RoundedBoxGeometry}:name.includes('BufferGeometryUtils')?{mergeGeometries}:load(new URL(name+'.ts',url).href),out);return out;}

const model=load('./sky-tower-model.ts'), geo=load('./star-geography.ts'), tower=load('./sky-tower.ts');
test('tower foundation and plaza fit the supported northeast star arm',()=>{
 for(const x of [46,60,74])for(const z of [-241,-225,-202])assert(geo.containsGround(geo.starBoundary,x,z,.6),`${x},${z}`);
 assert.equal(model.towerLevels.length,7);assert.deepEqual(model.towerLevels,[0,16,32,48,64,80,96]);
 assert.deepEqual(model.towerEntrance,[65,1.65,-206]);assert.equal(model.towerRoof(66,-220),96);assert.equal(model.towerRoof(90,-220),undefined);
});
test('lift continuously travels, rejects competing requests, releases and disposes ownership',()=>{
 const lift=model.createTowerLift();assert(!lift.request(8,true));assert(!lift.request(NaN,true));assert(lift.request(6,true));assert(lift.ownsPassenger);assert(!lift.request(2,true));let last=0,seen=new Set();
 for(let i=0;i<5000&&lift.phase!=='idle';i++){seen.add(lift.phase);lift.update(.05);assert(lift.y>=last&&lift.y-last<=.501);last=lift.y;}
 assert.deepEqual([...seen],['closing','moving','opening']);assert.equal(lift.y,96);assert.equal(lift.door,1);assert(!lift.ownsPassenger);
 assert(lift.request(0,false));assert(!lift.ownsPassenger);for(let i=0;i<5000&&lift.phase!=='idle';i++)lift.update(.05);assert.equal(lift.y,0);
 lift.request(3,true);lift.dispose();assert(!lift.ownsPassenger);assert(!lift.request(0,true));
});
function create(){const scene=new T.Scene(),solids=[],world=tower.createSkyTower(scene,solids);scene.updateMatrixWorld(true);return {scene,solids,world};}
function walk(world,p,x,z){const end=new T.Vector3(x,p.y,z),distance=Math.hypot(x-p.x,z-p.z),steps=Math.ceil(distance/.08);const delta=new T.Vector3((x-p.x)/steps,0,(z-p.z)/steps);for(let i=0;i<steps;i++)world.move(p,delta);assert(Math.hypot(p.x-x,p.z-z)<.15,`blocked at ${p.toArray()} toward ${x},${z}`);}
test('walk from island into lobby, ride every floor, safely leave the cabin and return',()=>{
 const {world,solids,scene}=create(),p=new T.Vector3(65,1.65,-209);
 try{
 walk(world,p,65,-213);walk(world,p,64,-231);walk(world,p,59.5,-231);walk(world,p,59.5,-237);
 assert(world.inCabin(p));for(const target of [1,2,3,4,5,6,0]){
 assert(world.request(target,p,true));for(let i=0;i<5000&&world.lift.phase!=='idle';i++)world.update(.05,p,{hour:12,wet:0,snow:0,wind:0},true);
 assert.equal(p.y,model.towerLevels[target]+1.65);walk(world,p,59.5,-231);assert(!world.inCabin(p));walk(world,p,59.5,-237);
 }
 }finally{world.dispose();assert.equal(solids.length,0);assert.equal(scene.children.length,0);world.dispose();}
});
test('all public floors connect through the actual stairwell in both directions',()=>{
 const {world}=create(),p=new T.Vector3(48,1.65,-211);
 try{for(let i=0;i<6;i++){walk(world,p,48,-237);walk(world,p,52,-238);walk(world,p,52,-211);walk(world,p,48,-211);assert(Math.abs(p.y-(i+1)*16-1.65)<.05);}
 for(let i=5;i>=0;i--){walk(world,p,52,-211);walk(world,p,52,-238);walk(world,p,48,-238);walk(world,p,48,-211);assert(Math.abs(p.y-i*16-1.65)<.05);}
 }finally{world.dispose();}
});
test('walls, closed shaft gates, terraces and secret shelf constrain walking',()=>{
 const {world}=create();try{
 let p=new T.Vector3(65,17.65,-220);world.move(p,new T.Vector3(0,0,50));assert(p.z< -209);
 p.set(59.5,17.65,-232);world.move(p,new T.Vector3(0,0,-10));assert(p.z> -234);
 p.set(67,33.65,-210);walk(world,p,67,-205);world.move(p,new T.Vector3(0,0,8));assert(p.z<= -204.3);assert(world.contains(p));
 p.set(69,65.65,-227);world.move(p,new T.Vector3(0,0,-6));assert(p.z> -229);world.activate('secret',p);for(let i=0;i<60;i++)world.update(.05,p,{hour:0,wet:0,snow:0,wind:0},true);walk(world,p,69,-234);assert(world.secretOpen);
 }finally{world.dispose();}
});
test('floor furnishing activation is bounded, map targets ground entrance, locales align',()=>{
 assert(model.towerDetailVisible(0,new T.Vector3(65,1.65,-220)));assert(!model.towerDetailVisible(6,new T.Vector3(65,1.65,-220)));assert(!model.towerDetailVisible(0,new T.Vector3(0,1.65,0)));
 for(const c of Object.values(model.towerCopy))assert.equal(c.floors.length,7);
 const map=load('./world-map.ts');assert.deepEqual(map.selectMapDestination('sky-tower').point,[65,1.65,-206]);
 const t=load('./traversal.ts');assert.equal(t.traversalOwner({tower:true}),'tower');assert(!t.canStartTraversal({tower:true}));
});
test('authored passenger routes clear the complete tower volume',()=>{
 const scene=new T.Scene(),solids=[],coaster=load('./sky-coaster.ts').createSkyCoaster(scene,solids);
 try{const tube=load('./skytube.ts'),routes=[coaster.route,tube.createSkyRoute(),tube.createScenicRoute(),load('./horizon-transit.ts').createHorizonRoute(),load('./whale-voyage.ts').createVoyageRoute()];
 for(const route of routes)for(const p of route.getSpacedPoints(Math.ceil(route.getLength()))){assert(!(p.x>40&&p.x<80&&p.z> -247&&p.z< -197&&p.y<114&&p.y> -6),'occupied route intersects tower');}
 }finally{coaster.dispose();}
});
test('public landings connect rooms to stairs and rooftop flight support validates clear deck',()=>{
 const {world,solids,scene}=create();try{
 for(let i=0;i<7;i++){const p=new T.Vector3(52,model.towerLevels[i]+1.65,-211);walk(world,p,60,-211);walk(world,p,52,-211);}
 const aerial=load('./flight.ts').createFlightCollision(solids,model.towerRoof);scene.updateMatrixWorld(true);
 assert.equal(aerial.support(new T.Vector3(68,97.65,-215)),97.65);assert.equal(aerial.support(new T.Vector3(90,97.65,-215)),undefined);
 }finally{world.dispose();}
});
test('precipitation samples the high roof above interiors and leaves lower terrace sheltered',()=>{
 const {world,solids,scene}=create();try{scene.updateMatrixWorld(true);const ray=new T.Raycaster(new T.Vector3(68,220,-220),new T.Vector3(0,-1,0));const hits=ray.intersectObjects(solids,false);assert(hits[0].point.y>=96);assert(hits[0].point.y<102);
 const p=new T.Vector3(68,49.65,-220);world.update(.05,p,{hour:0,wet:1,snow:1,wind:1},false);assert(world.inside(p));assert(!world.inside(new T.Vector3(68,97.65,-220)));
 }finally{world.dispose();}
});

test('floor plate geometry continuously supports landing thresholds and the shaft-side aisle',()=>{
 const {world,solids,scene}=create();try{scene.updateMatrixWorld(true);for(const y of model.towerLevels)for(const [x,z] of [[54.2,-211],[54.6,-211],[64,-237],[68,-220]]){
 const ray=new T.Raycaster(new T.Vector3(x,y+.2,z),new T.Vector3(0,-1,0),0,.5);const hits=ray.intersectObjects(solids,false);assert(hits.some(h=>Math.abs(h.point.y-y)<.06),`unsupported floor ${x},${y},${z}`);
 }}finally{world.dispose();}
});
