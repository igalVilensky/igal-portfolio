<script setup lang="ts">
import { gsap } from 'gsap';
const props = defineProps<{ activeLayer: number | null; origin: { x: number; y: number }; paused: boolean }>();
const root = ref<HTMLElement>();
const size = ref({ width: 1600, height: 1000 });
const source = computed(() => ({ x: props.origin.x / Math.max(1, size.value.width) * 1600, y: props.origin.y / Math.max(1, size.value.height) * 1000 }));
const id = useId();
let motion: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let media: MediaQueryList | undefined;
let observer: ResizeObserver | undefined;
let parallax: gsap.core.Tween | undefined;
const frames = [
  'M-100 980V60L1640 -80V1060Z',
  'M145 865V155L1410 45V895Z',
  'M345 765V230L1230 135V765Z',
  'M505 690V285L1085 215V670Z',
];
function sync() {
  if (!motion) return;
  const active = props.activeLayer === 0;
  // Each environment owns an interruptible presentation weight, never navigation state.
  // Future worlds can crossfade concurrently from the same activeLayer input.
  if (props.paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) motion.progress(active ? 1 : 0).pause();
  else if (active) motion.play();
  else motion.reverse();
  if (!active || props.paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) center();
}
function move(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || props.activeLayer !== 0 || props.paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  parallax?.kill();
  parallax = gsap.to(root.value, { '--drift-x': `${(event.clientX / window.innerWidth - .5) * 16}px`, '--drift-y': `${(event.clientY / window.innerHeight - .5) * 10}px`, duration: 1.2, ease: 'power2.out' });
}
function center() {
  parallax?.kill();
  if (root.value) parallax = gsap.to(root.value, { '--drift-x': '0px', '--drift-y': '0px', duration: props.paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .7 });
}
watch(() => [props.activeLayer, props.paused], sync);
onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    if (entry) size.value = { width: entry.contentRect.width, height: entry.contentRect.height };
  });
  observer.observe(root.value!);
  media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  context = gsap.context(() => {
    const select = gsap.utils.selector(root.value!);
    motion = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
      .fromTo(select('.world-impulse'), { opacity: 0, scale: .15 }, { opacity: .85, scale: 1, duration: .7, ease: 'power2.out' }, 0)
      .fromTo(select('.world-atmosphere'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, .05)
      .fromTo(select('.light-path'), { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: .85, stagger: .05 }, .08)
      .fromTo(select('.world-floor'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.15 }, .18)
      .fromTo(select('.world-structure'), { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: 1.35 }, .2)
      .fromTo(select('.world-section'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, .45)
      .to(select('.world-impulse'), { opacity: .18, duration: .65 }, .65);
    sync();
    center();
  }, root.value);
  window.addEventListener('pointermove', move, { passive: true });
  document.documentElement.addEventListener('pointerleave', center);
});
onBeforeUnmount(() => {
  context?.revert(); observer?.disconnect(); parallax?.kill();
  media?.removeEventListener('change', sync);
  window.removeEventListener('pointermove', move);
  document.documentElement.removeEventListener('pointerleave', center);
});
</script>

<template>
  <div ref="root" class="spatial-environment" aria-hidden="true" :data-world="activeLayer === 0 ? 'work' : 'idle'" :style="{ '--source-x': `${origin.x}px`, '--source-y': `${origin.y}px` }">
    <div class="world-atmosphere" />
    <div class="world-impulse" />
    <svg class="work-world" viewBox="0 0 1600 1000" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient :id="`${id}-plane`" x1="0" y1="0" x2="1" y2="1"><stop class="plane-tint" stop-opacity=".2"/><stop offset="1" class="plane-tint" stop-opacity=".015"/></linearGradient>
        <linearGradient :id="`${id}-floor`" x1="0" y1="0" x2="0" y2="1"><stop class="plane-tint" stop-opacity="0"/><stop offset="1" class="plane-tint" stop-opacity=".12"/></linearGradient>
        <radialGradient :id="`${id}-mask`"><stop offset="0" stop-color="white" stop-opacity=".08"/><stop offset=".28" stop-color="white" stop-opacity=".25"/><stop offset=".6" stop-color="white"/></radialGradient>
        <mask :id="`${id}-quiet-center`"><rect width="1600" height="1000" :fill="`url(#${id}-mask)`"/></mask>
      </defs>
      <g class="depth-near"><g class="world-floor" :mask="`url(#${id}-quiet-center)`">
        <path :fill="`url(#${id}-floor)`" d="M0 590 800 420 1600 590V1000H0Z" stroke="none" />
        <path v-for="x in [-2200, -1300, -700, -250, 100, 450, 800, 1150, 1500, 1850, 2300, 2900, 3800]" :key="x" :d="`M800 420 ${x} 1080`" />
        <path v-for="y in [490, 535, 595, 680, 790, 930, 1100]" :key="y" :d="`M-200 ${y + 90} 800 ${y} 1800 ${y + 90}`" />
      </g></g>
      <g class="depth-far"><g class="world-structure" :mask="`url(#${id}-quiet-center)`">
        <!-- One continuous structural volume, with four receding cross sections. -->
        <path class="structural-skin" :fill="`url(#${id}-plane)`" d="M145 865V155L505 285V690Z M145 155 1410 45 1085 215 505 285Z M1230 135V765L1410 895V45Z" />
        <path v-for="(frame, i) in frames" :key="frame" class="structural-frame" :d="frame" :style="{ opacity: 1 - i * .15 }" />
        <path class="structural-rail" d="M-100 60 505 285 1085 215 1640 -80 M-100 980 505 690 1085 670 1640 1060 M145 155 1410 45 M345 230 1230 135 M145 865 1410 895 M345 765 1230 765" />
        <path class="structural-detail" d="M169 841V176L1386 70V868 M366 746V249L1209 158V742 M525 669V304L1065 238V649 M145 400 505 405 M145 630 505 552 M1410 330 1085 363 M1410 610 1085 516" />
        <path class="structural-light" d="M145 700V155L690 108 M1040 77 1410 45V410 M345 690V230L640 198 M1100 149 1230 135V440" />
      </g></g>
      <g class="depth-near"><g class="world-section">
        <!-- A single suspended engineering section crosses the whole chamber. -->
        <path class="section-surface" :fill="`url(#${id}-plane)`" d="M-180 400 960 95 1760 370 610 710Z" />
        <path class="section-edge" d="M-180 400 960 95 1760 370 M-180 424 610 734 1760 394 M-180 400 610 710 1760 370 M610 710V734" />
        <path class="section-rule" d="M-80 400 960 123 1660 370 M-50 450 365 336 M1085 216 1460 350 M80 455 240 412 M1190 470 1480 384" />
      </g></g>
      <g class="world-paths">
        <path class="light-path" pathLength="1" :d="`M${source.x} ${source.y} L345 230 145 155 145 865 -120 995`" />
        <path class="light-path" pathLength="1" :d="`M${source.x} ${source.y} L1085 215 1410 45 1410 895 1700 1070`" />
        <path class="light-path light-path-secondary" pathLength="1" :d="`M${source.x} ${source.y} L960 95 1760 370 610 710 -180 400`" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.spatial-environment { --world-line: #648ca6; --world-strong: #37677f; --world-light: #07819b; --world-tint: #6598b1; --drift-x: 0px; --drift-y: 0px; position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; mask-image: linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent); }
:global(.dark .spatial-environment) { --world-line: #355a74; --world-strong: #537f97; --world-light: #6acfe6; --world-tint: #397eaa; }
.world-atmosphere { position: absolute; inset: 0; background: radial-gradient(ellipse at var(--source-x) var(--source-y), #8ce8f143, transparent 45%), linear-gradient(145deg, #bbd8e65c, #f1f7fb33 45%, #8eafc24a); }
:global(.dark .spatial-environment .world-atmosphere) { background: radial-gradient(ellipse at var(--source-x) var(--source-y), #2481a94a, transparent 55%), radial-gradient(ellipse at 95% 75%, #153f5a77, transparent 65%), linear-gradient(160deg, #06101ab3, #102b4366 60%, #071521aa); }
.world-impulse { position: absolute; left: calc(var(--source-x) - 42vw); top: calc(var(--source-y) - 30vh); width: 84vw; height: 60vh; border-radius: 50%; background: radial-gradient(ellipse, transparent 30%, #49c0d22b 58%, #6acfe65c 59%, transparent 60%); transform-origin: center; }
.work-world { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }

.work-world path { vector-effect: non-scaling-stroke; }
.plane-tint { stop-color: var(--world-tint); }
.world-floor { stroke: var(--world-line); stroke-width: .75; transform-origin: 50% 42%; }
.world-structure { transform-origin: 50% 32%; }
.depth-far { translate: calc(var(--drift-x) * .45) calc(var(--drift-y) * .45); }
.depth-near { translate: var(--drift-x) var(--drift-y); }
.structural-frame { stroke: var(--world-strong); stroke-width: 1.4; }
.structural-rail { stroke: var(--world-line); stroke-width: 1; }
.structural-detail { stroke: var(--world-line); stroke-width: .65; stroke-dasharray: 3 9; opacity: .7; }
.structural-light { stroke: var(--world-light); stroke-width: 1.8; opacity: .75; }
.section-surface { stroke: var(--world-line); stroke-width: .6; }
.section-edge { stroke: var(--world-strong); stroke-width: 1; opacity: .65; }
.section-rule { stroke: var(--world-line); stroke-width: .7; stroke-dasharray: 60 8 3 8; opacity: .65; }
.light-path { stroke: var(--world-light); stroke-width: 1.7; stroke-dasharray: 1; stroke-dashoffset: 1; }
.light-path-secondary { stroke-width: 1; }
.world-atmosphere, .world-impulse, .world-floor, .world-structure, .world-section, .light-path { opacity: 0; }
@media (max-width: 600px) {
  .structural-frame { stroke-width: 1; }
  .structural-detail, .section-rule { display: none; }
  .section-surface { fill-opacity: .45; }
  .light-path { stroke-width: 1.2; }
  .world-impulse { left: calc(var(--source-x) - 80vw); width: 160vw; }
}
</style>
