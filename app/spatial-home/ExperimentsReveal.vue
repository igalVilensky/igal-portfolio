<script setup lang="ts">
import { gsap } from 'gsap';
import { restingPlate } from './plateGeometry';
const props = defineProps<{ visible: boolean; suppressed: boolean; paused: boolean }>();
const root = ref<HTMLElement>();
const field = ref<SVGSVGElement>();
const incoming = ref<SVGPathElement>();
const outgoing = ref<SVGPathElement>();
const layout = ref({ left: 'translate(0 0)', right: 'translate(0 0)' });
const id = useId();
const mobile = ref(false);
let timeline: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let observer: ResizeObserver | undefined;
let media: MediaQueryList | undefined;
let frame = 0;
const seeds = [{ x: -100, y: -67, r: 7 }, { x: -48, y: 38, r: 5 }, { x: 32, y: -102, r: 4 }, { x: 76, y: -18, r: 9 }, { x: 0, y: 95, r: 6 }];
const nodes = [{ x: -130, y: -62, r: 11 }, { x: 83, y: -128, r: 8 }, { x: 142, y: 46, r: 15 }, { x: -45, y: 118, r: 7 }];
function measure() {
  if (!root.value || !field.value) return;
  const bounds = root.value.getBoundingClientRect();
  const plane = root.value.closest('main')?.querySelectorAll('.spatial-plane')[1]?.querySelector('svg');
  const matrix = plane?.getScreenCTM();
  if (!matrix) return;
  const a = new DOMPoint(...restingPlate.vertices[0]!).matrixTransform(matrix);
  const b = new DOMPoint(...restingPlate.vertices[2]!).matrixTransform(matrix);
  const compact = bounds.width <= 1100 || bounds.width / bounds.height <= 1.2;
  const isMobile = bounds.width <= 600;
  mobile.value = isMobile;
  const s = isMobile ? .3 : compact ? .58 : Math.min(1.2, bounds.width / 1400);
  const lx = bounds.width * (compact ? .2 : .16);
  const rx = bounds.width * (compact ? .79 : .82);
  const stack = root.value.closest('main')!.querySelector('.stack-stage')!.getBoundingClientRect();
  const y = isMobile ? stack.bottom - bounds.top + 3 : compact ? 174 : bounds.height * .47;
  const left = `translate(${lx} ${y}) scale(${s})`, right = `translate(${rx} ${y}) scale(${s})`;
  if (layout.value.left !== left || layout.value.right !== right) layout.value = { left, right };
  const ax = a.x - bounds.left, ay = a.y - bounds.top, bx = b.x - bounds.left, by = b.y - bounds.top;
  incoming.value?.setAttribute('d', `M${lx + 76 * s} ${y - 18 * s} C${lx + 155 * s} ${y - 18 * s},${Math.max(8, ax - 45)} ${ay},${ax} ${ay}`);
  outgoing.value?.setAttribute('d', `M${bx} ${by} C${Math.min(bounds.width - 8, bx + 45)} ${by},${rx - 180 * s} ${y + 20 * s},${rx - 130 * s} ${y - 62 * s}`);
}
function follow() {
  cancelAnimationFrame(frame);
  const end = performance.now() + 620;
  const step = () => { measure(); if (performance.now() < end) frame = requestAnimationFrame(step); };
  step();
}
function sync() {
  if (!timeline) return;
  // A different selected world clears this playhead immediately, including the plane.
  if (props.suppressed || props.paused || media?.matches) timeline.progress(props.visible && !props.suppressed ? 1 : 0).pause();
  else if (props.visible) timeline.timeScale(1).play();
  else timeline.timeScale(2.4).reverse();
  if (props.suppressed) cancelAnimationFrame(frame);
  else follow();
}
watch(() => [props.visible, props.suppressed, props.paused], sync);
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  observer = new ResizeObserver(follow);
  observer.observe(root.value!);
  context = gsap.context(() => {
    const select = gsap.utils.selector(root.value!);
    const plane = root.value!.closest('main')!.querySelector('.experiments-circuit');
    timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
      .fromTo(select('.network-atmosphere'), { opacity: 0 }, { opacity: 1, duration: .5 }, 0)
      .fromTo(select('.curiosity-node, .curiosity-fragment'), { opacity: 0, y: 7 }, { opacity: 1, y: 0, duration: .22, stagger: .018 }, 0)
      .fromTo(select('.seed-link'), { opacity: 0, strokeDashoffset: 1 }, { opacity: .7, strokeDashoffset: 0, duration: .34, stagger: .035 }, .06)
      .fromTo(select('.network-incoming'), { opacity: 0, strokeDashoffset: 1 }, { opacity: 1, strokeDashoffset: 0, duration: .3, ease: 'none' }, .23)
      .fromTo(plane, { opacity: 0, strokeDashoffset: 1 }, { opacity: 1, strokeDashoffset: 0, duration: .23, ease: 'none' }, .49)
      .fromTo(select('.network-outgoing'), { opacity: 0, strokeDashoffset: 1 }, { opacity: 1, strokeDashoffset: 0, duration: .24, ease: 'none' }, .69)
      .fromTo(select('.discovery-node'), { opacity: 0, scale: .45 }, { opacity: 1, scale: 1, duration: .32, stagger: .09, transformOrigin: 'center', transformBox: 'fill-box' }, .9)
      .fromTo(select('.discovery-link'), { opacity: 0, strokeDashoffset: 1 }, { opacity: .8, strokeDashoffset: 0, duration: .45, stagger: .055 }, .92)
      .fromTo(select('.orbit-draw'), { opacity: 0, strokeDashoffset: 1 }, { opacity: 1, strokeDashoffset: 0, duration: .65, stagger: .08 }, .95)
      .fromTo(select('.discovery-core'), { opacity: 0, scale: .65 }, { opacity: 1, scale: 1, duration: .45, transformOrigin: '0px 0px' }, 1.03)
      .to(plane, { opacity: .5, duration: .5 }, 1.05);
    sync();
  }, root.value);
  measure();
});
onBeforeUnmount(() => { cancelAnimationFrame(frame); context?.revert(); observer?.disconnect(); media?.removeEventListener('change', sync); });
</script>

<template>
  <div ref="root" class="experiments-world" :class="{ 'is-active': visible && !suppressed && !paused }" aria-hidden="true">
    <div class="network-atmosphere" />
    <svg ref="field" class="experiments-field" fill="none">
      <defs>
        <radialGradient :id="`${id}-core`"><stop stop-color="var(--network-cyan)" stop-opacity=".22"/><stop offset="1" stop-color="var(--network-cyan)" stop-opacity="0"/></radialGradient>
      </defs>
      <g :transform="layout.left">
        <path class="seed-link" pathLength="1" :d="mobile ? 'M-100 -67Q-70 40 76 -18' : 'M-100 -67Q-96 8 -48 38Q14 52 76 -18'"/>
        <path class="seed-link desktop-detail" pathLength="1" d="M32 -102Q18 -36 76 -18"/>
        <path class="seed-link" pathLength="1" d="M0 95Q70 86 76 -18"/>
        <g v-for="(node, index) in seeds" :key="index" class="curiosity-node" :class="{ 'desktop-detail': index === 1 || index === 2 }">
          <circle :cx="node.x" :cy="node.y" :r="node.r + 7" class="node-halo"/><circle :cx="node.x" :cy="node.y" :r="node.r" class="node-shell"/><circle :cx="node.x" :cy="node.y" r="2" class="node-center"/>
        </g>
        <path class="curiosity-fragment violet" d="M-115 72l12 -19 14 19Z M-14 -151l10 10 -10 10 -10 -10Z"/>
        <path class="curiosity-fragment" d="M-155 -18h18m-9 -9v18 M67 67h17v17"/>
      </g>
      <path class="network-incoming" ref="incoming" pathLength="1"/>
      <path class="network-outgoing" ref="outgoing" pathLength="1"/>
      <g :transform="layout.right">
        <g class="orbital-depth"><ellipse class="orbit-draw orbit-back" rx="178" ry="99" transform="rotate(-28)" pathLength="1"/><ellipse class="orbit-draw violet" rx="106" ry="163" transform="rotate(33)" pathLength="1"/></g>
        <path class="discovery-link" pathLength="1" :d="mobile ? 'M-130 -62Q-54 -88 0 0' : 'M-130 -62Q-54 -88 0 0Q78 -18 83 -128'"/>
        <path class="discovery-link" pathLength="1" d="M-130 -62Q-98 47 -45 118Q-8 62 0 0Q80 -65 142 46"/>
        <path class="discovery-link faint" pathLength="1" d="M83 -128Q182 -78 142 46Q92 151 -45 118"/>
        <g class="discovery-core"><circle r="70" :fill="`url(#${id}-core)`" stroke="none"/><circle r="31" class="core-ring"/><path class="core-glyph" d="M-19 0 0 -11 19 0 0 11Z M-19 8 0 19 19 8"/><path class="core-reticle" d="M-42 -8V-25H-25 M42 8V25H25"/></g>
        <ellipse class="orbit-draw orbit-front" rx="190" ry="61" transform="rotate(19)" pathLength="1"/>
        <g v-for="(node, index) in nodes" :key="index" class="discovery-node" :class="{ 'desktop-detail': index === 1 }">
          <circle :cx="node.x" :cy="node.y" :r="node.r + 8" class="node-halo"/><circle :cx="node.x" :cy="node.y" :r="node.r" class="node-shell"/><path :d="`M${node.x - 3} ${node.y}h6m-3 -3v6`" class="node-mark"/>
        </g>
        <g class="orbit-draw satellites"><circle cx="-173" cy="-31" r="3" class="node-center"/><circle cx="36" cy="-155" r="3" class="violet-dot"/></g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.experiments-world { --network-cyan: #067e9c; --network-line: #4287ab; --network-violet: #8268b0; --network-surface: #eef8ff; position: absolute; inset: 0; z-index: 1; overflow: hidden; pointer-events: none; }
:global(.dark .experiments-world) { --network-cyan: #7ee6f4; --network-line: #4388b3; --network-violet: #a293d6; --network-surface: #102337; }
.network-atmosphere { position: absolute; inset: 0; background: radial-gradient(ellipse at 81% 47%, #81ceee38, transparent 34%), radial-gradient(ellipse at 15% 47%, #87d5de20, transparent 26%); }
:global(.dark .experiments-world .network-atmosphere) { background: radial-gradient(ellipse at 82% 47%, #164b705c, transparent 36%), radial-gradient(ellipse at 16% 47%, #12495338, transparent 27%), linear-gradient(110deg, #050e1833, transparent 45%, #07101d66); }
.experiments-field { position: absolute; width: 100%; height: 100%; stroke: var(--network-line); stroke-width: 1.3; }
.experiments-field path, .experiments-field ellipse, .experiments-field circle { vector-effect: non-scaling-stroke; }
.seed-link, .network-incoming, .network-outgoing, .discovery-link, .orbit-draw { stroke-dasharray: 1; }
.network-incoming, .network-outgoing { stroke: var(--network-cyan); stroke-width: 1.6; }
.node-shell { fill: var(--network-surface); stroke: var(--network-cyan); stroke-width: 1.5; }
.node-halo { fill: var(--network-cyan); fill-opacity: .055; stroke-opacity: .22; }
.node-center { fill: var(--network-cyan); stroke: none; }.node-mark, .core-glyph, .core-reticle { stroke: var(--network-cyan); }
.core-glyph { stroke-width: 2; }.core-ring { stroke-opacity: .55; }.core-reticle { stroke-width: 1.5; }
.violet { stroke: var(--network-violet); stroke-opacity: .6; }.violet-dot { fill: var(--network-violet); stroke: none; }
.orbit-back { stroke-opacity: .35; }.orbit-front { stroke: var(--network-cyan); stroke-opacity: .65; }.faint { stroke-opacity: .35; }
.network-atmosphere, .curiosity-node, .curiosity-fragment, .seed-link, .network-incoming, .network-outgoing, .discovery-node, .discovery-link, .orbit-draw, .discovery-core { opacity: 0; }
.orbital-depth { transform-origin: 0 0; animation: orbital-drift 12s ease-in-out infinite alternate; animation-play-state: paused; }
.is-active .orbital-depth { animation-play-state: running; }
@keyframes orbital-drift { from { transform: rotate(-3deg); } to { transform: rotate(3deg); } }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) { .network-atmosphere { background: radial-gradient(ellipse at 80% 20%, #81ceee30, transparent 35%); } }
@media (max-width: 600px) { .experiments-field { stroke-width: 1; }.desktop-detail, .satellites, .node-halo, .faint, .curiosity-fragment, .orbit-back { visibility: hidden; }.orbit-front { stroke-opacity: .8; } }
@media (prefers-reduced-motion: reduce) { .orbital-depth { animation: none; } }
</style>
