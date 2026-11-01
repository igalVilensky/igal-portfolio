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

const colorMode = useColorMode();
const dark = computed(() => colorMode.value === 'dark');
const themeLabel = computed(() => locale.value === 'de' ? 'Licht / Dunkel' : locale.value === 'ru' ? 'Свет / Тьма' : 'Light / Dark');
const { locale } = useI18n(), localePath = useLocalePath();
const c = computed(() => arrivalCopy[locale.value as keyof typeof arrivalCopy] ?? arrivalCopy.en);
const host = ref<HTMLDivElement>(), failed = ref(false), textMode = ref(false), controlsOpen = ref(false), reduced = ref(false);
const state = ref<JourneyState>('arrival'), focus = ref(false), mouseUnavailable = ref(false);
const wallState=ref('dormant');
const actionLabel=computed(()=>state.value==='secondary'?c.value.back:state.value==='arrival'?c.value.approach:wallState.value==='open'?c.value.passage:c.value.activate);
const status = computed(() => ['activated','propagating','opening'].includes(wallState.value)?c.value.signal:wallState.value==='open'&&state.value==='investigating'?c.value.opened: state.value === 'outbound' ? c.value.moving : state.value === 'returning' ? c.value.returning : state.value === 'secondary' ? c.value.secondary : c.value.ready);
let renderer: T.WebGLRenderer, scene: T.Scene, camera: T.PerspectiveCamera, observer: ResizeObserver, frame = 0;
let architecture: ReturnType<typeof buildEnvironment>, lighting: ReturnType<typeof illuminate>;
let look: ReturnType<typeof createLook>, journey: ReturnType<typeof createJourney>;
let collide: ReturnType<typeof createCollision>;
let mechanism: ReturnType<typeof createMechanism>;
let media: MediaQueryList, lastTime = 0, pointerHover = false, nextTelemetry = 0;
let hoveredFacet = -1;
let needsRender = true, previousView = '', previousOpening = -1;
const ray = new T.Raycaster(), pointer = new T.Vector2();
const cleanups: (() => void)[] = [];

function pick(x: number, y: number, center = false) {
  if (!renderer || failed.value || textMode.value) return false;
  const rect = renderer.domElement.getBoundingClientRect();
  if (!center && (x < rect.left || y < rect.top || x > rect.right || y > rect.bottom)) return false;
  pointer.set(center ? 0 : (x - rect.left) / rect.width * 2 - 1, center ? 0 : -(y - rect.top) / rect.height * 2 + 1);
  ray.setFromCamera(pointer, camera);
  const first = ray.intersectObjects(architecture.solids, false)[0];
  const data = first?.object.userData;
  hoveredFacet = data?.facet ?? (data?.key ? 0 : -1);
  return data?.key ? 'key' : data?.facet !== undefined ? 'facet' : data?.passage && mechanism.state === 'open' ? 'passage' : false;
}
function enter() {
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
  if (failed.value || textMode.value) { state.value = 'arrival'; return; }
  if (!journey) return;
  renderer.domElement.focus({ preventScroll: true }); look.stop(); journey.return();
}
async function mouseLook() { controlsOpen.value = false; mouseUnavailable.value = !(await look?.lock()); }
function applyReduced(value: boolean) { reduced.value = value; journey?.setReduced(value); }
function onMotion(event: MediaQueryListEvent) { applyReduced(event.matches); }
function failure() { failed.value = true; cancelAnimationFrame(frame); }
function showText() {
  journey?.reset();
  textMode.value = !textMode.value;
  if (textMode.value) { if (document.pointerLockElement) document.exitPointerLock(); cancelAnimationFrame(frame); }
  else if (!failed.value) { lastTime = performance.now(); animate(lastTime); }
}
function animate(now: number) {
  if (failed.value || textMode.value) return;
  frame = requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, .2); lastTime = now;
  look.update(dt, reduced.value);
  const movement = look.movement(dt);
  if (movement.active && journey.moving) journey.cancel();
  if (journey.moving) journey.update(now, dt);
  else { scene.updateMatrixWorld(true); collide(camera.position, movement.delta); journey.locate(); }
  if (camera.position.distanceTo(spawn) < 3 && mechanism.state === 'open') mechanism.close(now);
  mechanism.focus(focus.value ? 0 : hoveredFacet); mechanism.update(now,reduced.value);
  lighting.portal.intensity = T.MathUtils.damp(lighting.portal.intensity, pointerHover || focus.value ? 80 : 40, 7, dt);
  const view = [camera.position.x,camera.position.z,look.yaw,look.pitch,mechanism.opening,lighting.portal.intensity,architecture.wall.key.position.z,...architecture.wall.signals.map(m=>m.emissiveIntensity),...architecture.wall.panels.map(p=>p.position.z)].map(v=>v.toFixed(5)).join(',');
  if (Math.abs(mechanism.opening - previousOpening) > .025) { renderer.shadowMap.needsUpdate = true; previousOpening = mechanism.opening; }
  if (needsRender || view !== previousView) { renderer.render(scene, camera); needsRender = false; previousView = view; }
  if (now > nextTelemetry) {
    nextTelemetry = now + 100; wallState.value=mechanism.state;
    const canvas = renderer.domElement;
    canvas.dataset.ready = 'true'; canvas.dataset.state = journey.state;
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
watch(reduced, value => journey?.setReduced(value));
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
    architecture = buildEnvironment(scene); mechanism=createMechanism(architecture.wall); lighting = illuminate(scene); collide = createCollision(architecture.solids); applyTheme();
    if (innerWidth < 650) lighting.sun.shadow.mapSize.set(1024, 1024);
    journey = createJourney(camera, architecture, next => { state.value = next; if (next === 'arrival' && camera.position.distanceTo(spawn) < .1) { mechanism.close(performance.now()); } });
    journey.setReduced(reduced.value);
    look = createLook(camera, canvas, {
      activate(x, y, center) { const hit=pick(x,y,center); if (!hit) return;
        if (hit==='key' && camera.position.z < -50) mechanism.activate(performance.now());
        else if (journey.state==='arrival' || hit==='key' || hit==='passage' || journey.state==='secondary') enter();
        else mechanism.react(performance.now()); },
      hover(x, y, center) { pointerHover = !!pick(x, y, center); canvas.style.cursor = pointerHover ? 'pointer' : 'grab'; },
      manual() { if (journey.moving) journey.cancel(); },
      escape() { controlsOpen.value = false; look.stop(); if (journey.moving) journey.cancel(); },
    });
    observer = new ResizeObserver(() => {
      if (!host.value) return;
      const rect = host.value.getBoundingClientRect(); renderer.setSize(rect.width, rect.height); camera.aspect = rect.width / rect.height;
      camera.fov = rect.width < 650 ? 72 : 65; camera.updateProjectionMatrix(); needsRender = true;
    }); observer.observe(host.value!);
    const lost = (e: Event) => { e.preventDefault(); failure(); };
    canvas.addEventListener('webglcontextlost', lost); cleanups.push(() => canvas.removeEventListener('webglcontextlost', lost));
    lastTime = performance.now(); animate(lastTime);
  } catch (error) { console.error('Arrival Chamber:', error); failure(); }
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frame); observer?.disconnect(); look?.dispose(); for (const cleanup of cleanups) cleanup();
  architecture?.dispose(); lighting?.dispose(); renderer?.dispose(); renderer?.domElement.remove();
});
</script>
<template>
  <main class="arrival-world" :class="{ 'arrival-dark': dark }" :aria-label="c.name">
    <div v-show="!failed && !textMode" ref="host" class="arrival-canvas"/>
    <nav class="arrival-tools" :aria-label="c.controls">
      <button :aria-label="themeLabel" :title="themeLabel" :aria-pressed="dark" data-action="theme" @click="colorMode.preference = dark ? 'light' : 'dark'">{{ dark ? '◐' : '◑' }}</button>
      <button :aria-label="c.mouse" :title="c.mouse" data-action="look" @click="mouseLook">⌖</button>
      <button :aria-label="c.back" :title="c.back" data-action="return" @click="back">↶</button>
      <button :aria-label="c.controls" :title="c.controls" :aria-expanded="controlsOpen" aria-controls="arrival-controls" @click="controlsOpen = !controlsOpen">?</button>
      <NuxtLink :to="localePath('/')" :aria-label="c.exit" :title="c.exit">↗</NuxtLink>
    </nav>
    <section v-if="controlsOpen" id="arrival-controls" class="arrival-controls" :aria-label="c.controls">
      <p>{{ c.instructions }}</p>
      <button v-if="!failed && !textMode" @click="mouseLook">{{ c.mouse }}</button>
      <p class="arrival-fine">{{ c.release }}</p>
      <label><input v-model="reduced" type="checkbox">{{ c.reduce }}</label>
      <button :aria-pressed="textMode" @click="showText">{{ c.alternative }}</button>
    </section>
    <p v-if="mouseUnavailable" class="arrival-mouse-note" role="status">{{ c.unsupported }}</p>
    <nav class="arrival-access" :class="{ 'arrival-text': failed || textMode }" :aria-label="c.name">
      <p v-if="failed">{{ c.fallback }}</p>
      <p v-if="failed || textMode">{{ state === 'secondary' ? c.inside : c.intro }}</p>
      <button :disabled="state === 'outbound' || state === 'returning' || state === 'approaching'" @focus="focus = true" @blur="focus = false" @click="enter">{{ actionLabel }}</button>
    </nav>
    <p class="arrival-status" aria-live="polite">{{ status }}</p>
  </main>
</template>
