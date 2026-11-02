import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import ts from 'typescript';
const temp = await mkdtemp(join(tmpdir(), 'arrival-radio-test-'));
await symlink(new URL('../../../node_modules',import.meta.url).pathname,join(temp,'node_modules'),'dir');
for (const file of ['youtube-api','stations','YouTubeRadio']) {
 const source=await readFile(new URL(`./${file}.ts`,import.meta.url),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replaceAll("'./youtube-api'","'./youtube-api.mjs'").replaceAll("'./stations'","'./stations.mjs'");
 await writeFile(join(temp,`${file}.mjs`),code);
}
const {YouTubeRadio}=await import(join(temp,'YouTubeRadio.mjs'));
function setup(apiOverride){
 globalThis.document={hidden:false,createElement:()=>({}),addEventListener(){},removeEventListener(){}};
 globalThis.innerWidth=1000;globalThis.innerHeight=800;globalThis.location={origin:'http://localhost:3000'};
 globalThis.localStorage={getItem:()=>null,setItem(){}};
 const instances=[],calls=[];
 class Player{
  constructor(_element,options){this.options=options;this.id=options.videoId;instances.push(this);queueMicrotask(()=>options.events.onReady());}
  stopVideo(){calls.push('stop');}loadVideoById(id){calls.push(`load:${id}`);this.id=id;}
  playVideo(){calls.push('play');}pauseVideo(){calls.push('pause');}destroy(){calls.push('destroy');}
  setVolume(value){calls.push(`volume:${value}`);}mute(){calls.push('mute');}unMute(){calls.push('unmute');}
  getVideoData(){return {video_id:this.id};}getIframe(){return {};}
 }
 const radio=new YouTubeRadio(apiOverride||(()=>Promise.resolve({Player})));
 const rect={width:480,height:270,left:10,top:10,right:490,bottom:280};
 radio.attach({getBoundingClientRect:()=>rect,replaceChildren(){}});
 return {radio,state:radio.state,instances,calls,rect};
}
test('presentation modes preserve player and never issue playback/seek commands',async()=>{
 const {radio,instances,calls}=setup();await radio.play();const player=instances[0];calls.length=0;
 for(const mode of ['mini','expanded','mini','docked'])radio.setMode(mode);
 assert.equal(instances.length,1);assert.equal(instances[0],player);assert.deepEqual(calls,[]);radio.dispose();
});
test('pause and resume preserve position by using playVideo, not loadVideoById',async()=>{
 const {radio,state,calls}=setup();await radio.play();calls.length=0;await radio.togglePlayback();assert.equal(state.status,'paused');await radio.togglePlayback();assert.deepEqual(calls.filter(c=>c==='play'||c==='pause'||c.startsWith('load:')),['pause','play']);radio.dispose();
});
test('channel switching stops old media and reuses one player',async()=>{
 const {radio,state,instances,calls}=setup();await radio.play();calls.length=0;radio.select(1);await new Promise(r=>setTimeout(r,0));
 assert.equal(instances.length,1);assert.ok(calls.indexOf('stop')<calls.findIndex(c=>c.startsWith('load:')));assert.equal(state.status,'loading');
 instances[0].id='mgjXO3pay1s';instances[0].options.events.onStateChange({data:1});assert.equal(state.status,'loading');radio.dispose();
});
test('stop is silent and invalidates late callbacks',async()=>{
 const {radio,state,instances,calls}=setup();await radio.play();radio.stop();instances[0].options.events.onStateChange({data:1});assert.equal(state.status,'off');assert.equal(state.power,false);assert.ok(calls.includes('destroy'));radio.dispose();
});
test('pending API load is cancelled by disposal',async()=>{
 let resolve;const api=new Promise(r=>resolve=r);const {radio,state}=setup(()=>api);const attempt=radio.play();await new Promise(r=>setTimeout(r,0));radio.dispose();resolve({Player:class{constructor(){throw Error('should not create');}}});await attempt;assert.equal(state.power,false);
});
test('errors and autoplay restrictions remain recoverable',async()=>{
 const {radio,state,instances}=setup();await radio.play();const events=instances[0].options.events;events.onAutoplayBlocked();assert.equal(state.status,'gesture');events.onError({data:150});assert.equal(state.status,'unavailable');assert.equal(state.errorCode,150);radio.dispose();
});
test('one volume and mute control use the official API',async()=>{
 const {radio,calls}=setup();await radio.play();radio.setVolume(.3);assert.ok(calls.includes('volume:30'));radio.toggleMute();assert.equal(calls.at(-1),'mute');radio.toggleMute();assert.equal(calls.at(-1),'unmute');radio.dispose();
});
test('undersized presentation pauses without destroying or hiding a player',async()=>{
 const {radio,state,instances,calls,rect}=setup();await radio.play();instances[0].options.events.onStateChange({data:1});rect.height=199;radio.checkPresentation();assert.equal(state.status,'presentation');assert.ok(calls.includes('pause'));assert.equal(instances.length,1);assert.ok(!calls.includes('destroy'));radio.dispose();
});
test('non-playing initialization events cannot falsely pause a loading player',async()=>{const {radio,state,instances,rect}=setup();await radio.play();rect.height=0;instances[0].options.events.onStateChange({data:5});radio.checkPresentation();assert.equal(state.status,'loading');rect.height=270;instances[0].options.events.onStateChange({data:1});assert.equal(state.status,'playing');radio.dispose();});
test('loading timeout cannot restart on a late ready event',async(t)=>{
 t.mock.timers.enable({apis:['setTimeout']});const {radio,state,calls,instances}=setup();await radio.play();t.mock.timers.tick(15001);assert.equal(state.status,'error');assert.ok(calls.includes('destroy'));const played=calls.filter(c=>c==='play').length;instances[0].options.events.onReady();assert.equal(calls.filter(c=>c==='play').length,played);radio.dispose();
});
test('no browser audio generators remain in Arrival source',async()=>{
 for(const name of ['YouTubeRadio.ts','stations.ts','RadioControls.vue','PersistentRadioPlayer.vue'])assert.doesNotMatch(await readFile(new URL(`./${name}`,import.meta.url),'utf8'),/new AudioContext|createOscillator|createBufferSource/);
});
test.after(async()=>rm(temp,{recursive:true,force:true}));
