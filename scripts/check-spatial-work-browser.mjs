// Run against a generated site and Chrome --remote-debugging-port=9234.
// Artifacts deliberately live outside the checkout.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const base = process.env.SPATIAL_WORK_URL ?? 'http://127.0.0.1:3053';
const directory = '/tmp/m5b2-review';
await fs.mkdir(`${directory}/frames`, { recursive: true });
const endpoint = process.env.CHROME_DEBUG_URL ?? 'http://127.0.0.1:9234';
const target = await (await fetch(`${endpoint}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => { ws.onopen = resolve; });
let sequence = 0;
const pending = new Map();
const errors = [], warnings = [];
ws.onmessage = event => {
 const message = JSON.parse(event.data);
 if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id); }
 if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
 if (message.method === 'Runtime.consoleAPICalled' && ['warning', 'error'].includes(message.params.type)) warnings.push(message.params);
};
const call = (method, params = {}) => new Promise((resolve, reject) => {
 const id = ++sequence;
 pending.set(id, message => message.error ? reject(message.error) : resolve(message.result));
 ws.send(JSON.stringify({ id, method, params }));
});
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const evaluate = async expression => {
 const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
 if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
 return result.result.value;
};
async function until(expression, timeout = 10000) {
 const start = Date.now();
 while (Date.now() - start < timeout) { const value = await evaluate(expression); if (value) return value; await sleep(15); }
 throw new Error(`Timed out: ${expression}`);
}
const screenshot = async name => {
 const result = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
 await fs.writeFile(`${directory}/${name}.png`, Buffer.from(result.data, 'base64'));
};
async function click(selector) {
 const point = await evaluate(`(()=>{const node=document.querySelector(${JSON.stringify(selector)});const r=node.getBoundingClientRect();const x=r.x+r.width/2,y=r.y+r.height/2;return {x,y,hit:node.contains(document.elementFromPoint(x,y))}})()`);
 assert(point.hit, `Pointer blocker over ${selector}`);
 await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, x: point.x, y: point.y });
 await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, x: point.x, y: point.y });
}
const selected = () => evaluate(`document.querySelector('.module.selected')?.dataset.node`);
async function close() {
 await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
 await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
 await until(`!document.querySelector('.module.selected')`);
 assert(await evaluate(`document.activeElement.matches('.module')`), 'Origin focus restored');
}
const mounted = `performance.getEntriesByName('spatial-work:mounted').length`;
const metrics = () => evaluate(`({navigationStart:0,render:window.networkRender,mount:performance.getEntriesByName('spatial-work:mounted').at(-1)?.startTime,paint:performance.getEntriesByName('first-contentful-paint')[0]?.startTime,marks:performance.getEntriesByType('mark').filter(x=>x.name.startsWith('spatial-work:')).map(x=>({name:x.name,time:x.startTime}))})`);
async function reload() {
 const previous = await evaluate('performance.timeOrigin');
 await call('Page.reload', { ignoreCache: true });
 await until(`performance.timeOrigin !== ${previous} && performance.getEntriesByName('spatial-work:mounted').length && !!document.querySelector('.topology-scene')`);
}
const results = {};
await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
await call('Network.setCacheDisabled', { cacheDisabled: true });
await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await call('Page.addScriptToEvaluateOnNewDocument', { source: `const observer=new MutationObserver(()=>{if(document.querySelector('.project-module')){window.networkRender=performance.now();observer.disconnect()}});observer.observe(document,{childList:true,subtree:true});` });
for (const [index, kind] of ['project', 'project', 'technology'].entries()) {
 if (!index) await call('Page.navigate', { url: `${base}/spatial-work` });
 else await reload();
 await until(mounted);
 // No wait for assembly: use a real pointer while it is still running.
 assert(await evaluate(`document.querySelector('.topology-scene').classList.contains('entering')`), 'Entrance active before immediate click');
 await click(`.${kind}-module`);
 await until(`document.querySelector('.module.selected')`);
 assert((await selected()).startsWith(`${kind}:`));
 assert(await evaluate(`!document.querySelector('.topology-scene').classList.contains('entering')`), 'Selection finishes entrance');
 results[index ? `${kind}Reload` : 'projectColdLoad'] = await metrics();
 await close();
}
// Completed entrance and viewport checks at every requested desktop size/theme.
await reload(); await until(mounted);
await until(`performance.getEntriesByName('spatial-work:entrance-complete').length`);
results.completedEntrance = await metrics();
assert(await evaluate(`Array.from(document.querySelectorAll('.module')).every(node=>!node.disabled&&getComputedStyle(node).pointerEvents!=='none')`), 'No disabled or pointer-blocked nodes');
assert(await evaluate(`Array.from(document.querySelectorAll('.module')).every(node=>{const r=node.getBoundingClientRect();return node.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))})`), 'Every resting node has an unobstructed pointer target');
const floatY = () => evaluate(`new DOMMatrix(getComputedStyle(document.querySelector('.sculpture')).transform).m42`);
const beforeFloat = await floatY(); await sleep(600); const afterFloat = await floatY();
assert(Math.abs(afterFloat-beforeFloat)>.05, 'Shared sculpture floats');
await click('.project-module'); const paused = await floatY(); await sleep(520);
assert(Math.abs((await floatY())-paused)<.1, 'Selection holds the actual floating offset');
await close(); const resumed = await floatY(); assert(Math.abs(resumed-paused)<.2, 'Closing resumes without reset');
results.floating={beforeFloat,afterFloat,paused,resumed};
results.viewports = [];
for (const [width, height] of [[1366,768],[1440,900],[1920,1080]]) {
 await call('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
 for (const theme of ['dark', 'light']) {
  await evaluate(`document.documentElement.classList.remove('dark','light');document.documentElement.classList.add('${theme}')`);
  await screenshot(`desktop-${theme}-${width}`);
  await click('.project-module'); await sleep(500);
  const bounds = await evaluate(`(()=>{const r=document.querySelector('.detail').getBoundingClientRect();return {top:r.top,bottom:r.bottom,scroll:scrollY,documentHeight:document.documentElement.scrollHeight,height:innerHeight}})()`);
  assert(bounds.top >= 0 && bounds.bottom <= height && bounds.scroll === 0 && bounds.documentHeight <= height, JSON.stringify(bounds));
  await screenshot(`project-${theme}-${width}`);
  await close();
  results.viewports.push({ width, height, theme, bounds });
 }
}
await click('.technology-module'); await sleep(330); await screenshot('technology-light-1920');
await click('.related-projects button'); await until(`document.querySelector('.module.selected')?.dataset.node.startsWith('project:')`); await close();
// Rapid switching while opening and closing must leave one usable preview.
await evaluate(`document.querySelectorAll('.project-module')[1].click();document.querySelectorAll('.technology-module')[2].click();document.querySelectorAll('.project-module')[3].click()`);
await until(`document.querySelector('.detail h2')`); assert.equal(await evaluate(`document.querySelectorAll('.detail-open').length`), 1);
await evaluate(`document.querySelector('.close-detail').click();document.querySelector('.technology-module').click()`);
await until(`document.querySelector('.module.selected')?.dataset.node.startsWith('technology:')`); await close();
// Theme toggle uses the actual control; locale links use internal routing.
await click('.settings button'); await click('.project-module'); await close();
for (const language of ['DE','RU','EN']) {
 const mounts = await evaluate(mounted);
 await evaluate(`Array.from(document.querySelectorAll('.settings nav a')).find(a=>a.textContent==='${language}').click()`);
 await until(`document.documentElement.lang.startsWith('${language.toLowerCase()}') && performance.getEntriesByName('spatial-work:mounted').length > ${mounts}`);
 await click('.technology-module'); await close();
}
results.internalNavigation = await metrics();
let mountCount = await evaluate(mounted);
await evaluate('history.back()'); await until(`location.pathname.includes('/ru/') && performance.getEntriesByName('spatial-work:mounted').length > ${mountCount}`); await click('.project-module'); await close();
mountCount = await evaluate(mounted);
await evaluate('history.forward()'); await until(`location.pathname==='/spatial-work' && performance.getEntriesByName('spatial-work:mounted').length > ${mountCount}`); await click('.technology-module'); await close();
// Keyboard and reduced motion on a fresh hard reload.
await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await reload(); await until(mounted);
assert(await evaluate(`!document.querySelector('.topology-scene').classList.contains('entering')`));
await evaluate(`document.querySelector('.project-module').focus()`);
await call('Input.dispatchKeyEvent', { type:'keyDown', key:'Enter', code:'Enter', windowsVirtualKeyCode:13, text:'\r' });
await call('Input.dispatchKeyEvent', { type:'keyUp', key:'Enter', code:'Enter', windowsVirtualKeyCode:13 });
await until(`document.querySelector('.module.selected')`); await close();
await evaluate(`document.querySelector('.technology-module').focus()`);
await call('Input.dispatchKeyEvent', { type:'keyDown', key:' ', code:'Space', windowsVirtualKeyCode:32 });
await call('Input.dispatchKeyEvent', { type:'keyUp', key:' ', code:'Space', windowsVirtualKeyCode:32 });
await until(`document.querySelector('.module.selected')`); await close();
results.reduced = await metrics();
await call('Emulation.setDeviceMetricsOverride', { width:390,height:844,deviceScaleFactor:1,mobile:true });
await call('Emulation.setTouchEmulationEnabled', { enabled: true });
await reload(); await until(mounted);
const touch = await evaluate(`(()=>{const r=document.querySelector('.project-module').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
await call('Input.dispatchTouchEvent', { type:'touchStart',touchPoints:[touch] }); await call('Input.dispatchTouchEvent', { type:'touchEnd',touchPoints:[] });
await until(`document.querySelector('.module.selected')`); await screenshot('mobile-project'); await close();
assert(await evaluate(`document.documentElement.scrollWidth<=innerWidth`));
// A real-time screencast: reload, click during assembly, read, return, float.
await call('Emulation.setTouchEmulationEnabled', { enabled: false });
await call('Emulation.setDeviceMetricsOverride', { width:1440,height:900,deviceScaleFactor:1,mobile:false });
await call('Emulation.setEmulatedMedia', { features: [] });
let frame = 0; const times = [], writes = [];
ws.addEventListener('message', event => {
 const message = JSON.parse(event.data);
 if (message.method !== 'Page.screencastFrame') return;
 const {data,sessionId,metadata} = message.params;
 call('Page.screencastFrameAck', { sessionId });
 const index=frame++;times.push(metadata.timestamp);
 writes.push(fs.writeFile(`${directory}/frames/frame-${String(index).padStart(4,'0')}.jpg`,Buffer.from(data,'base64')));
});
await call('Page.startScreencast', {format:'jpeg',quality:85,maxWidth:1440,maxHeight:900,everyNthFrame:1});
await reload(); await until(mounted); await sleep(180); await click('.project-module'); await sleep(1200); await close(); await sleep(3500);
await call('Page.stopScreencast'); await sleep(200); await Promise.all(writes);
await fs.writeFile(`${directory}/frame-times.json`, JSON.stringify(times));
results.errors = errors; results.warnings = warnings;
assert.equal(errors.length, 0, 'No runtime exceptions');
await fs.writeFile(`${directory}/results.json`, JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));
ws.close();
