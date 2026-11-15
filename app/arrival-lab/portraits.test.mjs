import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../../server/api/dev-family-portrait.get.ts', import.meta.url), 'utf8');
function handler(dev, optIn) {
  const exports = {}, reads = [], headers = {};
  const code = ts.transpileModule(source.replaceAll('import.meta.dev', String(dev)), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  new Function('require','exports','defineEventHandler','createError','getQuery','setHeader','process',code)(
    name => name === 'node:fs/promises' ? {readFile: async path => {reads.push(path); return Buffer.from('private');}} : {resolve:(...parts)=>parts.join('/')},
    exports, fn=>fn, value=>Object.assign(new Error(),value), event=>event.query,
    (_,name,value)=>headers[name]=value, {env:{ARRIVAL_PRIVATE_PORTRAITS:optIn},cwd:()=>'/project'});
  return {run:exports.default,reads,headers};
}
const event=(id,address='127.0.0.1')=>({query:{id},node:{req:{socket:{remoteAddress:address},headers:{host:'127.0.0.1:3000'}}}});
test('production cannot read photos even with the opt-in enabled',async()=>{
  const h=handler(false,'1');await assert.rejects(h.run(event('igal')),{statusCode:404});assert.equal(h.reads.length,0);
});
test('private portraits require loopback and an allowlisted identity',async()=>{
  for(const [opt,id,address] of [['1','igal','10.0.0.2'],['1','../igal','127.0.0.1'],['1','constructor','127.0.0.1']]){
    const h=handler(true,opt);await assert.rejects(h.run(event(id,address)),{statusCode:404});assert.equal(h.reads.length,0);
  }
});
test('all five identities select their own local photo and disable caching',async()=>{
  for(const [id,file] of Object.entries({igal:'igal.jpeg',anastasia:'anastasia.jpg',amelia:'amelia.jpg',nataniel:'nataniel.jpg',adriel:'adriel.jpg'})){
    const h=handler(true,'1');await h.run(event(id));assert.deepEqual(h.reads,['/project/docs/design/design-references/family/'+file]);assert.equal(h.headers['Cache-Control'],'no-store');assert.equal(h.headers['Content-Type'],'image/jpeg');
  }
});

test('Nuxt Unix-socket proxy accepts only local host and an entirely local forwarded chain',async()=>{
 for(const [host,chain,allowed] of [['127.0.0.1:3000','127.0.0.1',true],['localhost:3000','::1',true],['example.com','127.0.0.1',false],['localhost','',false],['localhost','10.0.0.2, 127.0.0.1',false]]){
  const h=handler(true);const e=event('igal',undefined);e.node.req.socket={};e.node.req.headers={host,'x-forwarded-for':chain};
  if(allowed)await h.run(e);else await assert.rejects(h.run(e),{statusCode:404});
  assert.equal(h.reads.length,allowed?1:0);
 }
});

test('direct loopback transport cannot bypass remote Host or forwarding checks',async()=>{
 for(const headers of [{host:'example.com'},{host:'localhost','x-forwarded-for':'10.0.0.2, 127.0.0.1'}]){
  const h=handler(true),e=event('igal');e.node.req.headers=headers;await assert.rejects(h.run(e),{statusCode:404});assert.equal(h.reads.length,0);
 }
});
