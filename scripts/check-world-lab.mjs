import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const load=async path=>{
 const source=fs.readFileSync(path,'utf8').replace("from 'three'",`from '${import.meta.resolve('three')}'`);
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
};
const {regions,modules,connections,copy}=await load('app/world-lab/registry.ts');
const {height,terrainGeometry}=await load('app/world-lab/terrain.ts');
const languages=['en','de','ru'];
function localized(value){assert.deepEqual(Object.keys(value).sort(),[...languages].sort());for(const l of languages)assert(value[l]?.trim());}
assert.equal(new Set(regions.map(r=>r.id)).size,regions.length);
assert.equal(new Set(modules.map(m=>m.id)).size,modules.length);
for(const r of regions){localized(r.name);localized(r.description);}
for(const m of modules){localized(m.title);localized(m.description);assert(regions.some(r=>r.id===m.regionId));assert(m.position.every(Number.isFinite));assert(['available','prototype','planned'].includes(m.status));if(m.status==='available'){assert(m.route);assert(fs.existsSync(`app/pages${m.route}.vue`));}if(m.status==='planned')assert(!m.route);for(const id of m.connectionIds??[])assert(connections.some(c=>c.id===id));}
for(const c of connections){assert(modules.some(m=>m.id===c.source));assert(modules.some(m=>m.id===c.target));localized(c.description);}
for(const l of languages)assert.deepEqual(Object.keys(copy[l]).sort(),Object.keys(copy.en).sort());
const a=terrainGeometry(),b=terrainGeometry();assert.deepEqual(a.attributes.position.array,b.attributes.position.array);assert([...a.attributes.position.array].every(Number.isFinite));assert(height(-4,-8)>height(1,4)+2);assert(a.index.count>10000);a.dispose();b.dispose();
console.log(`World registry valid: ${regions.length} regions, ${modules.length} modules, ${languages.length} complete locales; terrain deterministic, finite and elevated.`);
