import { createJiti } from 'jiti';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const jiti=createJiti(import.meta.url,{alias:{'~':`${root}/app`}});
const {buildTopology,layoutTopology,normalizeTechnology}=await jiti.import(`${root}/app/spatial-work/topology.ts`);
const content=JSON.parse(fs.readFileSync(`${root}/content/projects.json`));
const g=buildTopology();
assert.equal(g.projects.length,14);assert(!g.projects.some(p=>p.sourceId==='job-command-center'));
assert.equal(new Set(g.technologies.map(t=>t.id)).size,g.technologies.length);
assert.deepEqual(layoutTopology(g),layoutTopology(buildTopology('ru')));
for(const e of g.edges){const p=g.projects.find(p=>p.id===e.project);assert(p.technologies.some(t=>`technology:${normalizeTechnology(t)}`===e.technology));}
for(const p of g.projects){const source=content.projects.find(s=>s.id===p.sourceId);assert.deepEqual(p.links,source.links);assert.deepEqual(p.technologies,source.technologies);}
for(const t of ['Nuxt','Nuxt 3','Nuxt 4','Nuxt.js'])assert.equal(normalizeTechnology(t),'Nuxt');
assert.notEqual(normalizeTechnology('React'),normalizeTechnology('Next.js'));
console.log(`Spatial Work: ${g.projects.length} projects, ${g.technologies.length} technologies, ${g.edges.length} source-backed edges. Checks passed.`);
