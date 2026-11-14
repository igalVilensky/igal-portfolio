import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const load=async name=>{
 const source=fs.readFileSync(`app/arrival-lab/${name}.ts`,'utf8').replace("from 'three'",`from '${import.meta.resolve('three')}'`);
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
};
// Geometry and movement checks need no GPU; browser screenshots cover flag rendering.
globalThis.document={createElement:()=>({getContext:()=>new Proxy({},{get:(o,k)=>o[k]??(()=>{}),set:(o,k,v)=>(o[k]=v,true)})})};
globalThis.Image=class {set src(value){assert(fs.existsSync(`public${value}`));}};
const {explorerCountries,createLittleExplorer,explorerCountryName}=await load('little-explorer');
const {createCollision}=await load('collision');
assert.deepEqual(explorerCountries.map(c=>c.id),['germany','israel','bulgaria','poland','czechia','italy','spain','albania','croatia']);
const scene=new T.Scene(),solids=[],room=createLittleExplorer(scene,solids);
scene.updateMatrixWorld(true);const move=createCollision(solids),position=new T.Vector3(29,1.65,19);
function walk(target){move(position,target.clone().sub(position));assert(position.distanceTo(target)<.02,`Blocked walking to ${target.toArray()}: ${position.toArray()}`);}
walk(new T.Vector3(35,1.65,19));walk(new T.Vector3(40,1.65,15));
// A continuous interior walking loop reaches each station within interaction range.
for(let degrees=235;degrees<=620;degrees+=2){const angle=T.MathUtils.degToRad(degrees);walk(new T.Vector3(46+6.5*Math.sin(angle),1.65,11-6.5*Math.cos(angle)));}
for(const country of explorerCountries){
 const panels=solids.filter(s=>s.userData.explorer===country.id);
 assert.equal(panels.length,4,'Frame, flag, label and globe token must be interactive');
 const flag=panels.find(s=>s.geometry.type==='PlaneGeometry'&&s.geometry.parameters.width===3.16);
 const target=flag.getWorldPosition(new T.Vector3());const approach=target.clone().lerp(new T.Vector3(46,2.5,11),.4);approach.y=1.65;
 assert(approach.distanceTo(target)<9);
 const ray=new T.Raycaster(approach,target.clone().sub(approach).normalize());
 assert.equal(ray.intersectObjects(solids)[0]?.object.userData.explorer,country.id);
 room.activate(country.id,1000);room.update(1100,.016,false,approach,`explorer:${country.id}`);
 room.update(1200,.016,true,approach,false);
 for(const locale of ['en','de','ru'])assert(explorerCountryName(country.id,locale));
}
room.activate('albania',1300);assert.equal(room.visited.length,9,'Repeated visits must not duplicate stamps');
for(const locale of ['en','de','ru'])room.setLocale(locale);
room.setTheme(true);room.setTheme(false);room.dispose();assert.equal(scene.children.length,0);
console.log('Nine stations: clear entrance and walking loop, unobstructed interaction rays, globe tokens, unique stamps, locales, themes and disposal passed.');
