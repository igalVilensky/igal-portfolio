import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const load=async path=>{
 let source=fs.readFileSync(path,'utf8').replace("from 'three'",`from '${import.meta.resolve('three')}'`);
 if(source.includes("from './registry'")){const registry=ts.transpileModule(fs.readFileSync('app/world-lab/registry.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;source=source.replace("from './registry'",`from 'data:text/javascript;base64,${Buffer.from(registry).toString('base64')}'`);}
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
};
const {regions,modules,connections,copy}=await load('app/world-lab/registry.ts');
const {height,terrainGeometry,sectors,routes,waterways,crossings,roadHeight}=await load('app/world-lab/terrain.ts');
const languages=['en','de','ru'];
function localized(value){assert.deepEqual(Object.keys(value).sort(),[...languages].sort());for(const l of languages)assert(value[l]?.trim());}
assert.equal(new Set(regions.map(r=>r.id)).size,regions.length);
assert.equal(new Set(modules.map(m=>m.id)).size,modules.length);
for(const r of regions){localized(r.name);localized(r.description);}
for(const m of modules){localized(m.title);localized(m.description);assert(regions.some(r=>r.id===m.regionId));assert(m.position.every(Number.isFinite));assert(['available','prototype','planned'].includes(m.status));if(m.status==='available'){assert(m.route);assert(fs.existsSync(`app/pages${m.route}.vue`));}if(m.status==='planned')assert(!m.route);for(const id of m.connectionIds??[])assert(connections.some(c=>c.id===id));}
for(const c of connections){assert(modules.some(m=>m.id===c.source));assert(modules.some(m=>m.id===c.target));localized(c.description);}
for(const l of languages)assert.deepEqual(Object.keys(copy[l]).sort(),Object.keys(copy.en).sort());
const a=terrainGeometry(),b=terrainGeometry();assert.deepEqual(a.attributes.position.array,b.attributes.position.array);assert([...a.attributes.position.array].every(Number.isFinite));assert(height(20,-16)>height(-24,12)+2);assert(height(13,18)<-.19,"Lake bed must be below the water plane");for(const m of modules)assert(height(...m.position)>0,"Landmarks must stay on dry land");assert(a.index.count>10000);a.dispose();b.dispose();
console.log(`World registry valid: ${regions.length} regions, ${modules.length} modules, ${languages.length} complete locales; terrain deterministic, finite and elevated.`);

// Compare complete shared edges, including normals and vertex colors, at all sector joins.
assert.equal(new Set(sectors.map(s=>s.id)).size,sectors.length);
for(const s of sectors){
 for(const id of s.neighbors)assert(sectors.some(n=>n.id===id&&n.neighbors.includes(s.id)));
 for(const id of s.landmarkIds)assert(modules.some(m=>m.id===id));
 for(const id of s.roadIds)assert(routes.some(r=>r.id===id));
 for(const id of s.waterwayIds)assert(waterways.some(w=>w.id===id));
 for(const n of sectors.filter(n=>s.maxX===n.minX&&s.minZ===n.minZ||s.maxZ===n.minZ&&s.minX===n.minX)){
  const a=terrainGeometry(s),b=terrainGeometry(n),r=s.geometry.resolution;
  for(let i=0;i<=r;i++)for(const key of ['position','normal','color']){
   const ai=s.maxX===n.minX?i*(r+1)+r:r*(r+1)+i,bi=s.maxX===n.minX?i*(r+1):i;
   for(let k=0;k<3;k++)assert(Math.abs(a.attributes[key].array[ai*3+k]-b.attributes[key].array[bi*3+k])<1e-6,`${key} seam: ${s.id}/${n.id}`);
  }a.dispose();b.dispose();
 }
}
console.log(`Sector joins valid: ${sectors.length} sectors; shared positions, normals, colors and configuration references.`);

for(const b of crossings)assert.equal(roadHeight(...b.position),b.deck,"Bridge deck and road surface must coincide");
