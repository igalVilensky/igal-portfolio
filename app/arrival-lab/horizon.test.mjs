import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const cache=new Map();
function load(file){const url=new URL(file,import.meta.url);if(cache.has(url.href))return cache.get(url.href);const out={};cache.set(url.href,out);new Function('require','exports',ts.transpileModule(readFileSync(url,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(name=>name==='three'?T:load(new URL(name+'.ts',url).href),out);return out;}
const geo=load('./star-geography.ts'),transport=load('./horizon-transit.ts'),spaces=load('./spaces.ts');
const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
test('hexagram has six convex points, six recesses, no crossing edges and finite closed extrusion',()=>{
 const p=geo.starBoundary;assert.equal(p.length,12);let convex=0,concave=0;
 p.forEach((a,i)=>{const v=cross(a,p[(i+1)%12],p[(i+2)%12]);v>0?convex++:concave++;for(let j=i+2;j<12;j++){if((j+1)%12===i)continue;const b=p[(i+1)%12],c=p[j],d=p[(j+1)%12];assert(!(cross(a,b,c)*cross(a,b,d)<0&&cross(c,d,a)*cross(c,d,b)<0));}});
 assert.equal(convex,6);assert.equal(concave,6);
 const shape=new T.Shape(p.map(a=>new T.Vector2(...a))),g=new T.ExtrudeGeometry(shape,{depth:4,bevelEnabled:false});
 assert([...g.attributes.position.array].every(Number.isFinite));assert(g.attributes.normal.count>0);
 // Earcut covers exactly the concave polygon area, with no self-overlapping fan.
 const area=Math.abs(T.ShapeUtils.area(shape.getPoints())),tri=T.ShapeUtils.triangulateShape(shape.getPoints(),[]);let sum=0;for(const [a,b,c] of tri)sum+=Math.abs(cross(p[a],p[b],p[c]))/2;assert(Math.abs(sum-area)<1e-6);g.dispose();
});
test('existing mainland building bounds and circulation remain supported without coordinate edits',()=>{
 const skip=new Set(['origin','living-lagoon','creation-yard','loop-vault','loop-district','skybridge']);
 for(const s of spaces.worldSpaces.filter(s=>!skip.has(s.id))){for(const x of [s.bounds[0],s.bounds[1]])for(const z of [s.bounds[2],s.bounds[3]])assert(geo.containsGround(geo.starBoundary,x,z,1),`${s.id} ${x},${z}`);}
 for(const [x,z] of [[-104,72],[-104,62],[12,115],[54,112],[-58,92],[-8,91],[76,48],[84,48],[0,158]])assert(geo.containsGround(geo.starBoundary,x,z,1));
 const preserved={arrival:[5,1.65,17],'living-quarters':[76,1.65,19],'living-works':[22,1.65,-87],'print-lab':[-60,1.65,61],'living-lagoon':[-134,1.65,62],'creation-yard':[-166,1.65,113],'loop-district':[238,1.65,58]};
 for(const [id,point] of Object.entries(preserved))assert.deepEqual(spaces.worldSpaces.find(s=>s.id===id).anchor,point);
 for(let i=0;i<360;i++){const a=i*Math.PI/180;assert(!geo.containsGround(geo.starBoundary,-170+32*Math.cos(a),65+27*Math.sin(a)),'basin must remain open');}
});
test('remote ground is separate, bounded and both exits have safe support',()=>{
 assert(geo.onHorizon(950,-720));assert(!geo.onHorizon(1000,-720));assert(!geo.onHorizon(0,0));assert(geo.onHorizon(...[transport.horizonExits[1].x,transport.horizonExits[1].z]));assert(geo.containsGround(geo.starBoundary,transport.horizonExits[0].x,transport.horizonExits[0].z,1));
 assert(Math.hypot(geo.horizonCenter.x,geo.horizonCenter.z)>1100);
 for(const p of geo.horizonBoundary)assert(!geo.containsGround(geo.starBoundary,...p));
});
test('route is continuous, endpoints exact, cruise speed constant with smooth acceleration and braking',()=>{
 const r=transport.createHorizonRoute();assert(r.getPointAt(0).distanceTo(transport.horizonTerminals[0])<1e-6);assert(r.getPointAt(1).distanceTo(transport.horizonTerminals[1])<1e-6);
 let prev=r.getPointAt(0);for(let i=1;i<=2000;i++){const p=r.getPointAt(i/2000);assert(p.toArray().every(Number.isFinite));assert(p.distanceTo(prev)<2);prev=p;}
 const f=transport.horizonDistance,deriv=t=>(f(t+1e-5)-f(t-1e-5))/2e-5;assert.equal(f(0),0);assert.equal(f(1),1);assert(deriv(.001)<.01);assert(deriv(.999)<.01);assert(Math.abs(deriv(.3)-deriv(.7))<1e-7);assert(Math.abs(deriv(.2-1e-5)-deriv(.2+1e-5))<.001);
});
test('outbound and return visit all passenger states and release at the correct safe exits',()=>{
 const ride=transport.createHorizonTransit(),camera=new T.PerspectiveCamera();camera.position.copy(transport.horizonExits[0]);
 for(const source of [0,1]){assert(ride.board(source,camera,true));assert(ride.ownsPassenger);assert(!ride.board(source,camera,true));const phases=new Set();let previous=camera.position.clone();for(let i=0;i<1480;i++){ride.update(1/60,camera);phases.add(ride.phase);assert(camera.position.toArray().every(Number.isFinite));if(i>1&&ride.ownsPassenger)assert(camera.position.distanceTo(previous)<2);previous.copy(camera.position);}assert(!ride.ownsPassenger);assert(camera.position.distanceTo(transport.horizonExits[1-source])<1e-9);for(const phase of ['boarding','launching','cruising','approaching','docking','disembarking','docked'])assert(phases.has(phase),phase);}
 ride.dispose();assert(!ride.board(0,camera,true));
});
test('boarding guard rejects every incompatible owner; pause, cancellation and invalid input recover safely',()=>{
 const state={passenger:false,flight:false,swimming:false,skyfall:false,guided:false,otherWorld:false,builder:false,airborne:false,carrying:false};assert(transport.horizonCanBoard(state));for(const key of Object.keys(state))assert(!transport.horizonCanBoard({...state,[key]:true}));
 const ride=transport.createHorizonTransit(),c=new T.PerspectiveCamera();c.position.copy(transport.horizonExits[0]);assert(!ride.board(0,c,false));assert(ride.board(0,c,true));ride.setPaused(true);const before=c.position.clone();ride.update(15,c);assert(c.position.equals(before));ride.setPaused(false);assert(ride.cancel(c));assert(!ride.ownsPassenger);assert(c.position.equals(transport.horizonExits[0]));assert(ride.board(0,c,true));for(let i=0;i<50;i++)ride.update(.05,c);assert(!ride.cancel(c));assert.equal(ride.update(NaN,c),'recovered');assert(!ride.ownsPassenger);assert(c.position.equals(transport.horizonExits[0]));
});
test('map projection uses a shared metre transform and remote selection targets departure rather than teleporting',()=>{
 const map=load('./world-map.ts'),b=map.horizonAtlasBounds;
 assert.deepEqual(map.projectWorld(b.minX,b.minZ,b),{x:0,y:0});assert.deepEqual(map.projectWorld(b.maxX,b.maxZ,b),{x:100,y:100});
 const p=map.projectWorld(950,-720,b);assert(p.x>0&&p.x<100&&p.y>0&&p.y<100);assert(map.destinationPoint('horizon-outpost').equals(transport.horizonExits[0]));assert.deepEqual(map.selectMapDestination('arrival').point,[5,1.65,17]);
});
test('scene disposal releases each owned resource exactly once and removes registered meshes',()=>{
 const original=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 try{const scene=new T.Scene(),solids=[],h=load('./horizon-scene.ts').createHorizonScene(scene,solids),resources=new Set(),counts=new Map();h.root.traverse(o=>{if(o.geometry)resources.add(o.geometry);for(const m of [o.material].flat().filter(Boolean)){resources.add(m);if(m.map)resources.add(m.map);}});for(const r of resources)r.addEventListener('dispose',()=>counts.set(r,(counts.get(r)||0)+1));assert(solids.length>0);h.dispose();h.dispose();assert.equal(h.root.parent,null);assert.equal(solids.length,0);for(const r of resources)assert.equal(counts.get(r),1);assert(!h.transit.ownsPassenger);}finally{globalThis.document=original;}
});

test('Horizon Express corridor clears existing coaster, service tube and scenic tube trajectories',()=>{
 const scene=new T.Scene(),sky=load('./skytube.ts').createSkyNetwork(scene,[]),coaster=load('./sky-coaster.ts').createSkyCoaster(scene,[]);
 try{const express=transport.createHorizonRoute().getSpacedPoints(1100);
 for(const [name,curve,radius] of [['coaster',coaster.route,7.5],['tube',sky.transport.route,7],['scenic',sky.scenic.route,7]]){
  let min=Infinity,where;const other=curve.getSpacedPoints(Math.ceil(curve.getLength()/2));
  for(const p of express)for(const q of other){const d=p.distanceTo(q);if(d<min){min=d;where=[p.toArray(),q.toArray()];}}
  assert(min>radius,`${name}: ${min} at ${JSON.stringify(where)}`);
 }
 }finally{sky.dispose();coaster.dispose();}
});

test('terminal launch slots, observation furniture and outpost structures clear the capsule envelope',()=>{
 const original=globalThis.document;globalThis.document={createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})};
 const scene=new T.Scene(),solids=[],h=load('./horizon-scene.ts').createHorizonScene(scene,solids);
 try{scene.updateMatrixWorld(true);const boxes=solids.filter(m=>{let p=m.parent;while(p){if(p.name==='Horizon capsule')return false;p=p.parent;}return m.geometry.type==='BoxGeometry';}).map(m=>new T.Box3().setFromObject(m));
 const r=h.transit.route,length=r.getLength();for(let d=4;d<length-4;d+=.75){const p=r.getPointAt(d/length);for(const b of boxes)assert(b.distanceToPoint(p)>2.5,`terminal collision at ${p.toArray()}`);}
 }finally{h.dispose();globalThis.document=original;}
});
