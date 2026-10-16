<script setup lang="ts">
import { useActiveCore } from './useActiveCore';
const props = defineProps<{ visible: boolean; paused: boolean }>();
const progress = useActiveCore(() => props.visible, () => props.paused);
const root = ref<SVGSVGElement>();
const compact = ref(false);
const placement = ref({ left: '0px', top: '0px', width: '0px', height: '0px' });
const id = useId();
const phase = (start: number, length: number) => Math.max(0, Math.min(1, (progress.value - start) / length));
const nodes = computed(() => compact.value
  ? [{ x: 355, y: 100, r: 4 }, { x: 60, y: 160, r: 5 }, { x: 280, y: 245, r: 4 }, { x: 650, y: 170, r: 6 }]
  : [{ x: 355, y: 100, r: 4 }, { x: -135, y: 90, r: 6 }, { x: -270, y: -115, r: 4 }, { x: -180, y: -340, r: 5 }, { x: 850, y: -300, r: 7 }]);
const trajectory = computed(() => compact.value
  ? 'M355 100 C220 65 45 75 60 160 S170 260 280 245 S555 245 650 170'
  : 'M355 100 C185 185 -20 190 -135 90 S-295 -30 -270 -115 S-290 -290 -180 -340 C100 -475 590 -160 850 -300');
let observer: ResizeObserver | undefined;
let frame = 0;
function measure() {
  const home = root.value?.closest('main');
  const plane = home?.querySelectorAll<SVGSVGElement>('.plane-art')[4];
  const matrix = plane?.getScreenCTM();
  if (!home || !matrix) return;
  const bounds = home.getBoundingClientRect();
  compact.value = window.matchMedia('(max-width: 1100px)').matches;
  placement.value = {
    left: `${matrix.e - bounds.left - 500 * matrix.a}px`,
    top: `${matrix.f - bounds.top - 550 * matrix.d}px`,
    width: `${1720 * matrix.a}px`, height: `${950 * matrix.d}px`,
  };
}
function follow() {
  cancelAnimationFrame(frame);
  const until = performance.now() + 650;
  const tick = () => { measure(); if (performance.now() < until) frame = requestAnimationFrame(tick); };
  frame = requestAnimationFrame(tick);
}
watch(() => props.visible, follow);
onMounted(() => {
  observer = new ResizeObserver(follow);
  if (root.value?.parentElement) observer.observe(root.value.parentElement);
  window.addEventListener('resize', follow);
  follow();
});
onBeforeUnmount(() => { cancelAnimationFrame(frame); observer?.disconnect(); window.removeEventListener('resize', follow); });
</script>

<template>
  <svg ref="root" class="about-constellation" :style="placement" viewBox="-500 -550 1720 950" preserveAspectRatio="none" aria-hidden="true" focusable="false" :data-progress="progress" :opacity="phase(0, .12)">
    <defs>
      <radialGradient :id="`${id}-halo`"><stop stop-color="var(--about-light)" stop-opacity=".24"/><stop offset="1" stop-color="var(--about-light)" stop-opacity="0"/></radialGradient>
      <linearGradient :id="`${id}-thread`" x1="0" y1="1" x2="1" y2="0"><stop stop-color="var(--about-ink)"/><stop offset=".6" stop-color="var(--about-ink)"/><stop offset="1" stop-color="var(--sp-cyan)"/></linearGradient>
    </defs>
    <path class="about-trail" :d="trajectory" :stroke="`url(#${id}-thread)`" pathLength="1" :stroke-dashoffset="1 - phase(.28, .72)" />
    <path class="about-thread" :d="trajectory" :stroke="`url(#${id}-thread)`" pathLength="1" :stroke-dashoffset="1 - phase(.28, .72)" />
    <g v-for="(node, index) in nodes" :key="index" :opacity="phase(.06 + index * .09, .2)" :transform="`translate(${node.x} ${node.y + 12 * (1 - phase(.06 + index * .09, .3))})`">
      <circle :r="node.r * 9" :fill="`url(#${id}-halo)`" />
      <circle class="about-node" :r="node.r" />
      <circle class="about-glint" :r="node.r * .35" cy="-1" />
    </g>
  </svg>
</template>

<style scoped>
.about-constellation { --about-ink: #92582e; --about-light: #ba743f; position: absolute; z-index: 1; pointer-events: none; overflow: visible; }
:global(.dark .about-constellation) { --about-ink: #dab18a; --about-light: #edbd90; }
.about-thread, .about-trail { fill: none; stroke-linecap: round; stroke-dasharray: 1; }
.about-thread { stroke-width: 1.7; }
.about-trail { stroke-width: 9; opacity: .065; }
.about-node { fill: var(--about-ink); }
.about-glint { fill: var(--sp-top); }
</style>
