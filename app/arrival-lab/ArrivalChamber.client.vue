<script setup lang="ts">
import * as T from 'three';
import { buildEnvironment, spawn } from './environment';
import { illuminate } from './lighting';
import { createCollision } from './collision';
import { createLook } from './camera';
import { createJourney, type JourneyState } from './journey';
import { createMechanism } from './mechanics';
import { arrivalCopy } from './copy';
import './arrival.css';
import './portal.css';
import PortalWorkspace from './PortalWorkspace.vue';
import { createTerminal, portalPath, pointOnPath, type PortalState } from './portal';
import { portalCopy } from './portal-copy';

const colorMode = useColorMode();
const dark = computed(() => colorMode.value === 'dark');
const themeLabel = computed(() => locale.value === 'de' ? 'Licht / Dunkel' : locale.value === 'ru' ? 'Свет / Тьма' : 'Light / Dark');
const { locale } = useI18n(), localePath = useLocalePath();
const c = computed(() => arrivalCopy[locale.value as keyof typeof arrivalCopy] ?? arrivalCopy.en);
const host = ref<HTMLDivElement>(), failed = ref(false), textMode = ref(false), controlsOpen = ref(false), reduced = ref(false);
const state = ref<JourneyState>('arrival'), focus = ref(false), mouseUnavailable = ref(false);
const { projects } = useProjects();
const project = computed(() => projects.value.find(p => p.id === 'flowforge')!);
const pc = computed(() => portalCopy[locale.value as keyof typeof portalCopy] ?? portalCopy.en);
const portalState = ref<PortalState>('exploring'), portalNear = ref(false), resumeLook = ref(false);
const workspace = ref(false), visualStyle = ref<Record<string,string>>({});
const portalBusy = computed(() => ['entering','workspace-active','exiting'].includes(portalState.value));
let terminal: ReturnType<typeof createTerminal>;
let saved: {position:T.Vector3; quaternion:T.Quaternion; yaw:number; pitch:number; locked:boolean} | undefined;
let travel: {path:T.Vector3[]; from:T.Quaternion; to:T.Quaternion; start:number; duration:number; exiting:boolean} | undefined;
let entryPath:T.Vector3[]=[];
let travelled:T.Vector3[]=[];
let exitTimer:ReturnType<typeof setTimeout>|undefined;
let returnFocus:HTMLElement|null=null;
let guided=false;
function saveView() {
  if (saved || !camera) return;
  returnFocus=document.activeElement instanceof HTMLElement ? document.activeElement : null;
  saved={position:camera.position.clone(),quaternion:camera.quaternion.clone(),yaw:look.yaw,pitch:look.pitch,locked:document.pointerLockElement===renderer.domElement};
  journey.cancel();look.stop();look.setEnabled(false);
  if(document.pointerLockElement)document.exitPointerLock();
}
function screenOrientation(position=terminal.center.clone().add(terminal.normal)) {const dummy=camera.clone();dummy.position.copy(position);dummy.lookAt(terminal.center);return dummy.quaternion.clone();}
function projectVisual() {
  camera.updateMatrixWorld();terminal.screen.updateWorldMatrix(true,false);
  const a=new T.Vector3(-2.9,1.8125,0).applyMatrix4(terminal.screen.matrixWorld).project(camera);
  const b=new T.Vector3(2.9,-1.8125,0).applyMatrix4(terminal.screen.matrixWorld).project(camera);
  const r=renderer.domElement.getBoundingClientRect();
  visualStyle.value={left:`${(a.x+1)*r.width/2}px`,top:`${(1-a.y)*r.height/2}px`,width:`${(b.x-a.x)*r.width/2}px`,height:`${(a.y-b.y)*r.height/2}px`};
}
function openWorkspace() {
  if(travel?.path)travelled=travel.path.map(p=>p.clone());
  travel=undefined;guided=false;
  if(camera && terminal && !failed.value && !textMode.value) {
    camera.position.copy(terminal.center).addScaledVector(terminal.normal,.5);camera.quaternion.copy(screenOrientation());renderer.render(scene,camera);projectVisual();
  }
  portalState.value='workspace-active';workspace.value=true;
}
function activateTerminal(direct=false) {
  if(portalBusy.value)return;
  controlsOpen.value=false;resumeLook.value=false;
  if(!camera || failed.value || textMode.value){portalState.value='workspace-active';workspace.value=true;return;}
  saveView();
  portalState.value='entering';travelled=[camera.position.clone()];
  const end=terminal.center.clone().addScaledVector(terminal.normal,.5);
  const near=terminal.near.clone();
  entryPath=camera.position.distanceTo(near)<5 ? [camera.position.clone(),near,end] : [...portalPath(camera.position,near),end];
  travel={path:entryPath,from:camera.quaternion.clone(),to:screenOrientation(),start:performance.now(),duration:reduced.value?0:Math.max(2200,Math.min(6500,camera.position.distanceTo(near)*90)),exiting:false};
  if(direct||reduced.value){travelled=entryPath.map(p=>p.clone());openWorkspace();}
}
function approachTerminal() {
  if(portalBusy.value||guided)return;
  if(!camera||failed.value||textMode.value){activateTerminal(true);return;}
  if(portalNear.value){activateTerminal();return;}
  saveView();guided=true;
  travel={path:portalPath(camera.position,terminal.near),from:camera.quaternion.clone(),to:screenOrientation(terminal.near),start:performance.now(),duration:reduced.value?0:4500,exiting:false};
}
function restoreExploration() {
  if(saved){camera.position.copy(saved.position);look.restore(saved.yaw,saved.pitch);resumeLook.value=saved.locked;}
  travel=undefined;saved=undefined;guided=false;look?.setEnabled(true);journey?.locate();portalState.value='exploring';needsRender=true;
  nextTick(()=>{const target=returnFocus?.isConnected?returnFocus:renderer?.domElement;target?.focus({preventScroll:true});returnFocus=null;});
}
function closeWorkspace() {
  if(portalState.value==='exiting')return;
  if(failed.value || textMode.value){workspace.value=false;travel=undefined;saved=undefined;portalState.value='exploring';nextTick(()=>document.querySelector<HTMLButtonElement>('[data-action="project-direct"]')?.focus());return;}
  if(!saved) {workspace.value=false;}
  if(!saved){portalState.value='exploring';nextTick(()=>document.querySelector<HTMLButtonElement>('[data-action="project-direct"]')?.focus());return;}
  portalState.value='exiting';
  // Reverse the actual travelled route, including a partially completed entry.
  const backPath=[camera.position.clone(),...travelled.slice().reverse()];
  if(!entryPath.length||guided){restoreExploration();return;}
  const reverse={path:backPath,from:camera.quaternion.clone(),to:saved.quaternion.clone(),start:performance.now(),duration:reduced.value?0:3200,exiting:true};
  travel=undefined;
  const begin=()=>{workspace.value=false;reverse.start=performance.now();travel=reverse;};
  if(workspace.value&&!reduced.value)exitTimer=setTimeout(begin,260);else begin();
}
function updatePortal(now:number) {
  if(!travel)return;
  const t=travel.duration?T.MathUtils.clamp((now-travel.start)/travel.duration,0,1):1;
  const eased=t*t*(3-2*t);
  camera.position.copy(pointOnPath(travel.path,eased));if(!travel.exiting && (travelled.length===0 || travelled[travelled.length-1]!.distanceTo(camera.position)>.08))travelled.push(camera.position.clone());camera.quaternion.slerpQuaternions(travel.from,travel.to,Math.min(1,eased*1.7));needsRender=true;
  if(t===1){if(travel.exiting)restoreExploration();else if(guided){travel=undefined;guided=false;saved=undefined;look.restore(-Math.PI/2,Math.atan2(1.15,4.5));look.setEnabled(true);portalState.value='terminal-focused';renderer.domElement.focus();}else openWorkspace();}
}
const wallState=ref('dormant');
const actionLabel=computed(()=>state.value==='secondary'?c.value.back:state.value==='arrival'?c.value.approach:wallState.value==='open'?c.value.passage:c.value.activate);
const status = computed(() => ['activated','propagating','opening'].includes(wallState.value)?c.value.signal:wallState.value==='open'&&state.value==='investigating'?c.value.opened: state.value === 'outbound' ? c.value.moving : state.value === 'returning' ? c.value.returning : state.value === 'secondary' ? c.value.secondary : c.value.ready);
let renderer: T.WebGLRenderer, scene: T.Scene, camera: T.PerspectiveCamera, observer: ResizeObserver, frame = 0;
let architecture: ReturnType<typeof buildEnvironment>, lighting: ReturnType<typeof illuminate>;
let look: ReturnType<typeof createLook>, journey: ReturnType<typeof createJourney>;
let collide: ReturnType<typeof createCollision>;
let mechanism: ReturnType<typeof createMechanism>;
let media: MediaQueryList, lastTime = 0, pointerHover = false, nextTelemetry = 0;
let hoveredFacet = -1, terminalHover=false;
let needsRender = true, previousView = '', previousOpening = -1;
const ray = new T.Raycaster(), pointer = new T.Vector2();
const cleanups: (() => void)[] = [];

function pick(x: number, y: number, center = false) {
  if (!renderer || failed.value || textMode.value || portalBusy.value || guided) return false;
  const rect = renderer.domElement.getBoundingClientRect();
  if (!center && (x < rect.left || y < rect.top || x > rect.right || y > rect.bottom)) return false;
  pointer.set(center ? 0 : (x - rect.left) / rect.width * 2 - 1, center ? 0 : -(y - rect.top) / rect.height * 2 + 1);
  ray.setFromCamera(pointer, camera);
  const first = ray.intersectObjects(architecture.solids, false)[0];
  const data = first?.object.userData;
  if(data?.terminal) {hoveredFacet=-1;return 'terminal';}
  hoveredFacet = data?.facet ?? (data?.key ? 0 : -1);
  return data?.key ? 'key' : data?.facet !== undefined ? 'facet' : data?.passage && mechanism.state === 'open' ? 'passage' : false;
}
function enter() {
  if(portalBusy.value||guided)return;
  if (failed.value || textMode.value) { state.value = state.value === 'secondary' ? 'arrival' : 'secondary'; return; }
  renderer.domElement.focus({ preventScroll: true });
  if (journey.state === 'outbound' || journey.state === 'returning') return;
  if (journey.state === 'arrival') { look.stop(); journey.approach(); mechanism.discover(); look.orient(0,.02); return; }
  if (journey.state === 'approaching') return;
  if (journey.state === 'secondary' || mechanism.state === 'open') {
    const returning=journey.state==='secondary'; look.stop(); journey.activate(); look.orient(returning ? Math.PI : 0,.02);
  } else mechanism.activate(performance.now());
}
function back() {
  if(portalBusy.value||guided){closeWorkspace();return;}
  if (failed.value || textMode.value) { state.value = 'arrival'; return; }
  if (!journey) return;
  renderer.domElement.focus({ preventScroll: true }); look.stop(); journey.return();
}
async function mouseLook() { if(portalBusy.value||guided)return; resumeLook.value=false; controlsOpen.value = false; mouseUnavailable.value = !(await look?.lock()); }
function applyReduced(value: boolean) { reduced.value = value; journey?.setReduced(value); }
function onMotion(event: MediaQueryListEvent) { applyReduced(event.matches); }
function failure() { clearTimeout(exitTimer);travel=undefined;if(portalBusy.value) {workspace.value=true;portalState.value='workspace-active';} failed.value = true; cancelAnimationFrame(frame); }
function showText() {
  if(portalBusy.value||guided)return;
  journey?.reset();
  textMode.value = !textMode.value;
  if (textMode.value) { if (document.pointerLockElement) document.exitPointerLock(); cancelAnimationFrame(frame); }
  else if (!failed.value) { lastTime = performance.now(); animate(lastTime); }
}
function animate(now: number) {
  if (failed.value || textMode.value) return;
  frame = requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, .2); lastTime = now;
  if(!portalBusy.value && !guided) {
  look.update(dt, reduced.value);
  const movement = look.movement(dt);
  if (movement.active && journey.moving) journey.cancel();
  if (journey.moving) journey.update(now, dt);
  else { scene.updateMatrixWorld(true); collide(camera.position, movement.delta); journey.locate(); }
  }
  updatePortal(now);
  if(!portalBusy.value && !guided && document.pointerLockElement===renderer.domElement) terminalHover=pick(0,0,true)==='terminal';
  if(terminal){const distance=camera.position.distanceTo(terminal.center);portalNear.value=distance<9;terminal.update(distance,terminalHover||portalState.value==='entering');if(!portalBusy.value&&!guided)portalState.value=portalNear.value&&terminalHover?'terminal-focused':'exploring';}
  if (camera.position.distanceTo(spawn) < 3 && mechanism.state === 'open') mechanism.close(now);
  mechanism.focus(focus.value ? 0 : hoveredFacet); mechanism.update(now,reduced.value);
  lighting.portal.intensity = T.MathUtils.damp(lighting.portal.intensity, pointerHover || focus.value ? 80 : 40, 7, dt);
  if(portalState.value==='entering'||portalState.value==='exiting'||guided)needsRender=true;
  const view = [camera.position.x,camera.position.z,look.yaw,look.pitch,mechanism.opening,lighting.portal.intensity,Number(terminalHover),Number(portalNear.value),architecture.wall.key.position.z,...architecture.wall.signals.map(m=>m.emissiveIntensity),...architecture.wall.panels.map(p=>p.position.z)].map(v=>v.toFixed(5)).join(',');
  if (Math.abs(mechanism.opening - previousOpening) > .025) { renderer.shadowMap.needsUpdate = true; previousOpening = mechanism.opening; }
  if (needsRender || (portalState.value!=='workspace-active' && view !== previousView)) { renderer.render(scene, camera); needsRender = false; previousView = view; }
  if (now > nextTelemetry) {
    nextTelemetry = now + 100; wallState.value=mechanism.state;
    const canvas = renderer.domElement;
    canvas.dataset.portal=portalState.value;canvas.dataset.guided=String(guided);canvas.dataset.ready = 'true'; canvas.dataset.state = journey.state;
    canvas.dataset.position = camera.position.toArray().map(n => n.toFixed(4)).join(',');
    canvas.dataset.look = [look.yaw, look.pitch].map(n => n.toFixed(4)).join(',');
    canvas.dataset.wall = mechanism.state; canvas.dataset.opening = mechanism.opening.toFixed(4); canvas.dataset.triangles = String(renderer.info.render.triangles);
  }
}
function applyTheme() {
  if (!architecture || !lighting) return;
  architecture.setTheme(dark.value); lighting.setTheme(dark.value);
  renderer.toneMappingExposure = dark.value ? 1.12 : 1.0;
  needsRender = true; renderer.shadowMap.needsUpdate = true;
}
watch(dark, applyTheme);
watch(reduced, value => {journey?.setReduced(value);if(value && travel)travel.duration=0;});
onMounted(() => {
  try {
    media = matchMedia('(prefers-reduced-motion: reduce)'); reduced.value = media.matches;
    media.addEventListener('change', onMotion); cleanups.push(() => media.removeEventListener('change', onMotion));
    scene = new T.Scene();
    renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 650 ? 1.35 : 1.65));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false; renderer.shadowMap.needsUpdate = true;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.06; renderer.outputColorSpace = T.SRGBColorSpace;
    const canvas = renderer.domElement; canvas.tabIndex = 0; canvas.setAttribute('role', 'application'); canvas.setAttribute('aria-label', c.value.canvas);
    host.value!.appendChild(canvas);
    camera = new T.PerspectiveCamera(innerWidth < 650 ? 72 : 65, 1, .08, 220); camera.position.copy(spawn);
    architecture = buildEnvironment(scene); mechanism=createMechanism(architecture.wall); lighting = illuminate(scene); terminal=createTerminal(scene,architecture.solids); collide = createCollision(architecture.solids); applyTheme();
    if (innerWidth < 650) lighting.sun.shadow.mapSize.set(1024, 1024);
    journey = createJourney(camera, architecture, next => { state.value = next; if (next === 'arrival' && camera.position.distanceTo(spawn) < .1) { mechanism.close(performance.now()); } });
    journey.setReduced(reduced.value);
    look = createLook(camera, canvas, {
      activate(x, y, center) { if(portalBusy.value||guided)return; const hit=pick(x,y,center); if (!hit) return;
        if(hit==='terminal'){activateTerminal();return;}
        if (hit==='key' && camera.position.z < -50) mechanism.activate(performance.now());
        else if (journey.state==='arrival' || hit==='key' || hit==='passage' || journey.state==='secondary') enter();
        else mechanism.react(performance.now()); },
      hover(x, y, center) { const hit=pick(x,y,center); terminalHover=hit==='terminal';pointerHover = !!hit;needsRender=true; canvas.style.cursor = pointerHover ? 'pointer' : 'grab'; },
      manual() { if(portalBusy.value||guided)return; if (journey.moving) journey.cancel(); },
      escape() { if(portalBusy.value||guided){closeWorkspace();return;} controlsOpen.value = false; look.stop(); if (journey.moving) journey.cancel(); },
    });
    observer = new ResizeObserver(() => {
      if (!host.value) return;
      const rect = host.value.getBoundingClientRect(); renderer.setSize(rect.width, rect.height); camera.aspect = rect.width / rect.height;
      camera.fov = rect.width < 650 ? 72 : 65; camera.updateProjectionMatrix(); if(workspace.value && saved)projectVisual(); needsRender = true;
    }); observer.observe(host.value!);
    const lost = (e: Event) => { e.preventDefault(); failure(); };
    canvas.addEventListener('webglcontextlost', lost); cleanups.push(() => canvas.removeEventListener('webglcontextlost', lost));
    const escapePortal=(e:KeyboardEvent)=>{if(e.key==='Escape'&&(portalBusy.value||guided)){e.preventDefault();closeWorkspace();}};
    window.addEventListener('keydown',escapePortal);cleanups.push(()=>window.removeEventListener('keydown',escapePortal));
    lastTime = performance.now(); animate(lastTime);
  } catch (error) { console.error('Arrival Chamber:', error); failure(); }
});
onBeforeUnmount(() => {
  clearTimeout(exitTimer); cancelAnimationFrame(frame); observer?.disconnect(); look?.dispose(); for (const cleanup of cleanups) cleanup();
  terminal?.dispose(); architecture?.dispose(); lighting?.dispose(); renderer?.dispose(); renderer?.domElement.remove();
});
</script>
<template>
  <main class="arrival-world" :class="{ 'arrival-dark': dark }" :aria-label="c.name">
    <div v-show="!failed && !textMode" ref="host" :inert="portalBusy || guided" class="arrival-canvas"/>
    <nav v-show="!portalBusy" :inert="guided" class="arrival-tools" :aria-label="c.controls">
      <button :aria-label="themeLabel" :title="themeLabel" :aria-pressed="dark" data-action="theme" @click="colorMode.preference = dark ? 'light' : 'dark'">{{ dark ? '◐' : '◑' }}</button>
      <button :aria-label="c.mouse" :title="c.mouse" data-action="look" @click="mouseLook">⌖</button>
      <button :aria-label="c.back" :title="c.back" data-action="return" @click="back">↶</button>
      <button :aria-label="c.controls" :title="c.controls" :aria-expanded="controlsOpen" aria-controls="arrival-controls" @click="controlsOpen = !controlsOpen">?</button>
      <NuxtLink :to="localePath('/')" :aria-label="c.exit" :title="c.exit">↗</NuxtLink>
    </nav>
    <section v-if="controlsOpen && !portalBusy" id="arrival-controls" class="arrival-controls" :aria-label="c.controls">
      <p>{{ c.instructions }}</p>
      <button v-if="!failed && !textMode" @click="mouseLook">{{ c.mouse }}</button>
      <p class="arrival-fine">{{ c.release }}</p>
      <label><input v-model="reduced" type="checkbox">{{ c.reduce }}</label>
      <button :aria-pressed="textMode" @click="showText">{{ c.alternative }}</button>
    </section>
    <p v-if="mouseUnavailable" class="arrival-mouse-note" role="status">{{ c.unsupported }}</p>
    <nav v-show="!portalBusy" :inert="guided" class="arrival-access" :class="{ 'arrival-text': failed || textMode }" :aria-label="c.name">
      <p v-if="failed">{{ c.fallback }}</p>
      <p v-if="failed || textMode">{{ state === 'secondary' ? c.inside : c.intro }}</p>
      <button :disabled="state === 'outbound' || state === 'returning' || state === 'approaching'" @focus="focus = true" @blur="focus = false" @click="enter">{{ actionLabel }}</button>
    </nav>
    <div v-if="!portalBusy && !guided" class="portal-discover">
      <button data-action="portal-approach" @click="approachTerminal">{{ portalNear ? pc.activate : pc.approach }} <span>↗</span></button>
      <button class="portal-direct" data-action="project-direct" @click="activateTerminal(true)">{{ pc.details }}</button>
      <button v-if="resumeLook" @click="mouseLook">{{ pc.resume }}</button>
    </div>
    <span v-if="!portalBusy && portalNear" class="portal-reticle" aria-hidden="true">+</span>
    <div v-if="portalState==='entering'" class="portal-progress" role="status">{{ pc.entering }} <button @click="openWorkspace">{{ pc.skip }}</button></div>
    <p v-if="portalState==='exiting'" class="portal-progress" role="status">{{ pc.exiting }}</p>
    <PortalWorkspace v-if="workspace" :project="project" :labels="pc" :visual-style="visualStyle" :exiting="portalState==='exiting'" @close="closeWorkspace"/>
    <p class="arrival-status" aria-live="polite">{{ status }}</p>
  </main>
</template>
