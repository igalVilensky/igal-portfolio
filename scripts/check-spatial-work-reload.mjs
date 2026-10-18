// Regression for stale SSR hydrating the sculpture inside .construction.
// Uses isolated browser contexts, not tabs sharing cookies/cache with earlier tests.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.SPATIAL_WORK_URL ?? 'http://localhost:3000';
const endpoint = process.env.CHROME_DEBUG_URL ?? 'http://127.0.0.1:9234';
const directory = process.env.SPATIAL_WORK_DEBUG_DIR ?? '/tmp/spatial-work-debug';
const label = process.env.SPATIAL_WORK_TEST_LABEL ?? 'results';
await fs.mkdir(directory, { recursive: true });
async function connection(url) {
 const ws = new WebSocket(url); await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
 let sequence = 0; const pending = new Map(); const events = [];
 ws.onmessage = event => {
  const message = JSON.parse(event.data);
  if (message.id) { pending.get(message.id)?.(message); pending.delete(message.id); }
  else events.push(message);
 };
 return { ws, events, call: (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence;
  pending.set(id, message => message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result));
  ws.send(JSON.stringify({ id, method, params }));
 }) };
}
const version = await (await fetch(`${endpoint}/json/version`)).json();
const browser = await connection(version.webSocketDebuggerUrl);
const results = [];
for (const locale of ['en', 'de']) for (const source of ['hard-reload', 'spatial-home']) {
 const { browserContextId } = await browser.call('Target.createBrowserContext');
 let page;
 const result = { locale, source, passed: false };
 try {
  const { targetId } = await browser.call('Target.createTarget', { url: 'about:blank', browserContextId });
  const targets = await (await fetch(`${endpoint}/json`)).json();
  page = await connection(targets.find(target => target.id === targetId).webSocketDebuggerUrl);
  const { call } = page;
  const evaluate = async expression => {
   const response = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
   if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
   return response.result.value;
  };
  async function until(expression, timeout = 30000) {
   const start = Date.now();
   while (Date.now() - start < timeout) {
    if (await evaluate(expression)) return;
    // Poll a real lifecycle/DOM condition; never delay input for animation.
    await new Promise(resolve => setTimeout(resolve, 10));
   }
   throw new Error(`Condition not reached: ${expression}`);
  }
  const snapshot = () => evaluate(`(()=>{const n=document.querySelector('.project-module'),v=n?.__vueParentComponent,r=n?.getBoundingClientRect();return {time:performance.now(),url:location.href,roots:document.querySelectorAll('.topology-page').length,sculptures:document.querySelectorAll('.sculpture').length,oldWrapper:!!document.querySelector('.construction'),oldHeading:!!document.querySelector('.heading'),oldLabels:document.querySelectorAll('.module-index').length,bodies:document.querySelectorAll('.module-body').length,pointerEvents:n&&getComputedStyle(n).pointerEvents,hit:r&&document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.className,selected:document.querySelector('.module.selected')?.dataset.node,detail:document.querySelector('.detail h2')?.textContent,component:v?{uid:v.uid,mounted:v.isMounted,selected:v.setupState.selected}:null,marks:performance.getEntriesByType('mark').filter(x=>x.name.startsWith('spatial-work:')).map(x=>[x.name,x.startTime])}})()`);
  async function click(selector) {
   const point = await evaluate(`(()=>{const n=document.querySelector(${JSON.stringify(selector)}),r=n.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2,hit:n.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))}})()`);
   for (const type of ['mousePressed', 'mouseReleased']) await call('Input.dispatchMouseEvent', { type, x: point.x, y: point.y, button: 'left', clickCount: 1 });
   // Allow Vue's normal event/microtask render, not delayed activation/retry.
   await evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
   return point;
  }
  const mountedControl = `!!document.querySelector('.project-module') && performance.getEntriesByName('spatial-work:mounted').length`;
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const work = `${base}${prefix}/spatial-work`;
  await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
  await call('Network.setCacheDisabled', { cacheDisabled: true });
  await call('Emulation.setDeviceMetricsOverride', { width:1440, height:900, deviceScaleFactor:1, mobile:false });
  if (source === 'hard-reload') {
   await call('Page.navigate', { url: work });
   await until(mountedControl);
   const previous = await evaluate('performance.timeOrigin');
   await call('Page.reload', { ignoreCache: true });
   await until(`performance.timeOrigin !== ${previous} && (${mountedControl})`);
  } else {
   await call('Page.navigate', { url: `${base}${prefix}/spatial-home` });
   // Home currently links its Work plate to Classic /case-studies. Preserve that
   // route; exercise an internal Nuxt navigation from the mounted Home instead.
   await until(`!!document.querySelector('.spatial-home') && !!document.querySelector('#__nuxt')?.__vue_app__`);
   result.homeConsole = page.events.filter(message => message.method === 'Runtime.exceptionThrown' || message.method === 'Runtime.consoleAPICalled' && ['warning','error'].includes(message.params.type));
   page.events.length = 0;
   await evaluate(`document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$router.push(${JSON.stringify(`${prefix}/spatial-work`)})`);
   await until(`location.pathname.includes('spatial-work') && (${mountedControl})`);
  }
  result.initial = await snapshot();
  result.projectPointer = await click('.project-module');
  result.afterProjectClick = await snapshot();
  assert(await evaluate(`document.querySelector('.project-module')?.getAttribute('aria-pressed') === 'true' && !!document.querySelector('.detail-open .detail-heading h2')`), 'First project pointer activation must open its detail');
  assert(result.projectPointer.hit, 'Project pointer must reach the module');
  assert.equal(result.initial.roots, 1, 'Exactly one graph instance');
  assert.equal(result.initial.sculptures, 1, 'Correct sculpture wrapper at initial mount');
  assert.equal(result.initial.oldWrapper, false, 'No obsolete construction wrapper');
  assert.equal(result.initial.oldLabels, 0, 'No obsolete flat node labels');
  await evaluate(`document.querySelector('.close-detail').click()`);
  await until(`!document.querySelector('.module.selected')`);
  result.technologyPointer = await click('.technology-module');
  result.afterTechnologyClick = await snapshot();
  assert(await evaluate(`document.querySelector('.technology-module')?.getAttribute('aria-pressed') === 'true' && document.querySelectorAll('.detail-open .related-projects button').length > 0`), 'First technology pointer activation must show connected projects');
  assert(result.technologyPointer.hit, 'Technology pointer must reach the module');
  const related = await evaluate(`Array.from(document.querySelectorAll('.detail-open .related-projects button')).map(n=>n.textContent.trim().replace(/ ↗$/,''))`);
  const expected = await evaluate(`document.querySelector('.technology-module [id^="relationships-"]').textContent.split(', ')`);
  assert.deepEqual(related, expected, 'Technology lists every linked project');
  result.passed = true;
 } catch (error) { result.error = error.message; }
 finally {
  result.console = page?.events.filter(message => message.method === 'Runtime.exceptionThrown' || message.method === 'Runtime.consoleAPICalled' && ['warning','error'].includes(message.params.type)) ?? [];
  if (result.console.some(message => /Hydration|hydration|Uncaught/.test(JSON.stringify(message)))) { result.passed = false; result.hydrationFailure = true; }
  if (page) page.ws.close();
  await browser.call('Target.disposeBrowserContext', { browserContextId });
  results.push(result);
  console.log(`${locale} ${source}: ${result.passed ? 'PASS' : 'FAIL'} ${result.error ?? ''}`);
 }
}
browser.ws.close();
await fs.writeFile(`${directory}/${label}.json`, JSON.stringify(results,null,2));
assert(results.every(result=>result.passed), `Spatial Work fresh-context regression failed; see ${directory}/${label}.json`);
