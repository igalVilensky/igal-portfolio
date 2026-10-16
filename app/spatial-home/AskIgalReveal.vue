<script setup lang="ts">
import { gsap } from 'gsap';
import code from './assets/ask-igal-code.png';
import systems from './assets/ask-igal-systems.png';
import experience from './assets/ask-igal-experience.png';
import answer from './assets/ask-igal-answer.png';
const props = defineProps<{ visible: boolean; paused: boolean }>();
const root = ref<HTMLElement>();
const connections = ref<string[]>([]);
const artwork = [
  { name: 'code', src: code }, { name: 'systems', src: systems },
  { name: 'experience', src: experience }, { name: 'answer', src: answer },
];
let timeline: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let observer: ResizeObserver | undefined;
let media: MediaQueryList | undefined;
function measure() {
  if (!root.value) return;
  const bounds = root.value.getBoundingClientRect();
  const plate = root.value.closest('main')?.querySelector<SVGGraphicsElement>('.ask-plane .spatial-plate');
  if (!plate) return;
  const [x = 360, y = 130] = (plate.dataset.center ?? '').split(',').map(Number);
  const center = new DOMPoint(x, y).matrixTransform(plate.getScreenCTM()!);
  const cx = center.x - bounds.left, cy = center.y - bounds.top;
  connections.value = Array.from(root.value.querySelectorAll<HTMLElement>('.knowledge-position')).map((el, i) => {
    const box = el.getBoundingClientRect();
    const left = i === 0 || i === 2;
    const ex = box.left - bounds.left + box.width * (left ? .83 : .17);
    const ey = box.top - bounds.top + box.height * .52;
    return `M${ex} ${ey} C${(ex + cx) / 2} ${ey},${(ex + cx) / 2} ${cy},${cx} ${cy}`;
  });
}
function sync() {
  if (!timeline) return;
  measure();
  if (props.paused || media?.matches) timeline.progress(props.visible ? 1 : 0).pause();
  else if (props.visible) timeline.timeScale(1).play();
  else timeline.timeScale(1.8).reverse();
}
watch(() => [props.visible, props.paused], sync, { flush: 'post' });
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  observer = new ResizeObserver(measure);
  observer.observe(root.value!);
  context = gsap.context(() => {
    timeline = gsap.timeline({ paused: true });
    const elements = root.value!.querySelectorAll('.knowledge-art');
    elements.forEach((element, i) => {
      const left = i === 0 || i === 2;
      const upper = i < 2;
      timeline!.fromTo(element, { opacity: 0, scale: .88, xPercent: left ? 24 : -24, yPercent: upper ? 20 : -18 },
        { opacity: 1, scale: 1, xPercent: 0, yPercent: 0, duration: .75, ease: 'power3.out' }, i === 3 ? .78 : .18 + i * .1);
    });
    timeline.fromTo('.knowledge-connections', { opacity: 0 },
      { opacity: 1, duration: .65, ease: 'power2.out' }, .24);
    sync();
  }, root.value);
  measure();
});
onBeforeUnmount(() => { context?.revert(); observer?.disconnect(); media?.removeEventListener('change', sync); });
</script>

<template>
  <div ref="root" class="ask-knowledge" aria-hidden="true">
    <svg class="knowledge-connections"><path v-for="(path, i) in connections" :key="i" class="knowledge-link" :class="{ 'answer-link': i === 3 }" :d="path" pathLength="1" /></svg>
    <div v-for="asset in artwork" :key="asset.name" class="knowledge-position" :class="`knowledge-${asset.name}`">
      <img class="knowledge-art" :src="asset.src" alt="" width="768" height="512" decoding="async" draggable="false">
    </div>
  </div>
</template>

<style scoped>
.ask-knowledge { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.knowledge-connections { position: absolute; width: 100%; height: 100%; overflow: visible; opacity: 0; }
.knowledge-link { fill: none; stroke: var(--sp-cyan); stroke-width: 1; opacity: .38; }
.answer-link { stroke-width: 1.5; }
.knowledge-position { position: absolute; }
.knowledge-code { width: min(29vw, 450px); left: 2%; top: 20%; }
.knowledge-systems { width: min(26vw, 410px); right: 4%; top: 13%; }
.knowledge-experience { width: min(25vw, 390px); left: 8%; top: 55%; }
.knowledge-answer { width: min(32vw, 500px); right: 1%; top: 49%; }
.knowledge-art { display: block; width: 100%; height: auto; opacity: 0; transform-origin: center; mask-image: radial-gradient(ellipse at center, #000 52%, transparent 73%); }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .knowledge-code { width: 34vw; left: 0; top: 20%; }
  .knowledge-systems { width: 31vw; right: 0; top: 17%; }
  .knowledge-experience { width: 29vw; left: 1%; top: 56%; }
  .knowledge-answer { width: 36vw; right: 0; top: 54%; }
}
@media (max-width: 600px) {
  .knowledge-code, .knowledge-systems { display: none; }
  .knowledge-experience { width: 44vw; left: 1%; top: 58%; }
  .knowledge-answer { width: 49vw; right: 1%; top: 61%; }
  .knowledge-link:nth-child(-n+2) { display: none; }
}
</style>
