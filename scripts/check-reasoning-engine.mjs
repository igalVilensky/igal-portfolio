// Legacy entry point retained for existing review commands; now checks the workflow canvas.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
const source=fs.readFileSync(new URL('../app/spatial-ai-automation/motion.ts',import.meta.url),'utf8').replace("'./model'",JSON.stringify(new URL('../app/spatial-ai-automation/model.ts',import.meta.url).href));
const { WorkflowMotion }=await import('data:text/javascript;base64,'+Buffer.from(stripTypeScriptTypes(source)).toString('base64'));
import { nodes,connections,execution,copy } from '../app/spatial-ai-automation/model.ts';
for(const e of connections){const s=nodes.find(n=>n.id===e.source),t=nodes.find(n=>n.id===e.target);assert(s&&t);assert(s.outputs.includes(e.sourcePort));assert(t.inputs.includes(e.targetPort));}
for(const scenario of ['ready','clarify']){
 const events=execution(scenario);let last=-1;for(const e of [...events].sort((a,b)=>a.at-b.at)){assert(e.at>=last);last=e.at;assert(nodes.some(n=>n.id===e.node));}
 const used=events.filter(e=>e.type==='output-transmitted').map(e=>e.edge);assert(used.includes(scenario));assert(!used.includes(scenario==='ready'?'clarify':'ready'));
 for(const id of used){const received=events.find(e=>e.type==='data-received'&&e.node===connections.find(c=>c.id===id).target);assert(received.at>events.find(e=>e.type==='output-transmitted'&&e.edge===id).at);}
 for(const hz of [5,30,60,144]){const m=new WorkflowMotion();m.scenario=scenario;m.start('execute');for(let i=0;i<hz;i++)m.tick(1/hz);assert(Math.abs(m.time-1)<1e-8);m.playing=false;const held=m.time;m.tick(2);assert.equal(m.time,held);m.playing=true;for(let i=0;i<4*hz;i++)m.tick(1/hz);assert(m.complete);assert.equal(m.active,'result');m.reset();assert.equal(m.phase,'idle');m.start('build');for(let i=0;i<3*hz;i++)m.tick(1/hz);assert(m.complete);assert.equal(m.time,2.6);}
}
for(const lang of ['en','de','ru']){assert.deepEqual(Object.keys(copy[lang]),Object.keys(copy.en));for(const n of nodes)for(const field of ['title','description','why','input','output'])assert(n[field][lang]);}
const m=new WorkflowMotion();m.reduced=true;m.start('build');assert(m.complete);assert(!m.playing);
console.log('Workflow model: valid ports/edges; exclusive branches; causal events; 5/30/60/144Hz; exact pause/resume; reset/build; reduced motion; EN/DE/RU parity passed.');
