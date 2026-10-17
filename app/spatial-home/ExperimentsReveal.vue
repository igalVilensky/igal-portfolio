<script setup lang="ts">
import { gsap } from 'gsap';
import json from './assets/experiments/experiments-json-typescript.png';
import contrast from './assets/experiments/experiments-contrast-checker.png';
import architecture from './assets/experiments/experiments-architecture-sketch.png';
const props = defineProps<{ visible: boolean; suppressed: boolean; paused: boolean }>();
const root = ref<HTMLElement>();
const artwork = [
  { name: 'json', src: json, width: 800, height: 560, depth: 100, yaw: 9, roll: -9 },
  { name: 'contrast', src: contrast, width: 760, height: 460, depth: 25, yaw: -13, roll: 8 },
  { name: 'architecture', src: architecture, width: 1100, height: 760, depth: -140, yaw: -8, roll: -5 },
];
let timeline: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let observer: ResizeObserver | undefined;
let media: MediaQueryList | undefined;
function sync() {
  if (!timeline) return;
  if (props.paused || media?.matches) {
    timeline.progress(props.visible ? 1 : 0).pause();
    // Explicit visibility also covers a media change at the reversed endpoint.
    gsap.set(root.value!.querySelectorAll('img'), { opacity: props.visible ? 1 : 0 });
  }
  else if (props.visible) timeline.timeScale(1).play();
  else timeline.timeScale(props.suppressed ? 2.8 : 1.8).reverse();
}
function build() {
  const progress = timeline?.progress() ?? 0;
  context?.revert();
  context = gsap.context(() => {
    const plate = root.value!.closest('main')?.querySelector<SVGGraphicsElement>('.experiments-plane .spatial-plate');
    const matrix = plate?.getScreenCTM();
    if (!plate || !matrix) return;
    const [x = 360, y = 130] = (plate.dataset.center ?? '').split(',').map(Number);
    const source = new DOMPoint(x, y).matrixTransform(matrix);
    const compact = matchMedia('(max-width: 600px)').matches;
    timeline = gsap.timeline({ paused: true });
    root.value!.querySelectorAll<HTMLElement>('.experiment-position').forEach((position, i) => {
      const asset = artwork[i]!;
      const box = position.getBoundingClientRect();
      timeline!.fromTo(position.firstElementChild, {
        opacity: 0, x: source.x - box.left - box.width / 2,
        y: source.y - box.top - box.height / 2, z: -260, scale: .09,
        rotationX: 18, rotationY: i === 0 ? -22 : 22, rotationZ: i === 1 ? -16 : 14,
      }, {
        opacity: 1, x: i === 0 ? -12 : 8, y: i === 2 ? -14 : 8,
        z: compact ? 0 : asset.depth, scale: 1.025,
        rotationX: compact ? 0 : i === 2 ? 9 : -4,
        rotationY: compact ? 0 : asset.yaw, rotationZ: asset.roll,
        duration: .95, ease: 'power3.out',
      }, .24 + i * .12).to(position.firstElementChild, {
        x: 0, y: 0, scale: 1, rotationZ: asset.roll * .65,
        duration: 1.6, ease: 'sine.inOut',
      }, 1.2 + i * .12);
    });
    timeline.progress(progress);
    sync();
  }, root.value);
}
watch(() => [props.visible, props.paused, props.suppressed], sync);
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  observer = new ResizeObserver(build);
  observer.observe(root.value!);
});
onBeforeUnmount(() => { observer?.disconnect(); context?.revert(); media?.removeEventListener('change', sync); });
</script>

<template>
  <div ref="root" class="experiments-world" aria-hidden="true">
    <div v-for="asset in artwork" :key="asset.name" class="experiment-position" :class="`experiment-${asset.name}`">
      <img :src="asset.src" alt="" :width="asset.width" :height="asset.height" decoding="async" draggable="false">
    </div>
  </div>
</template>

<style scoped>
.experiments-world { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.experiment-position { position: absolute; perspective: 1200px; }
.experiment-json { width: min(30vw, 470px); left: 3%; top: 40%; z-index: 3; }
.experiment-contrast { width: min(27vw, 430px); right: 3%; top: 43%; z-index: 2; }
.experiment-architecture { width: min(28vw, 400px); right: 12%; top: 12%; z-index: 0; perspective: 1500px; }
.experiment-position img { display: block; width: 100%; height: auto; opacity: 0; transform-origin: center; }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .experiment-json { width: 31vw; left: 2%; top: 48%; }
  .experiment-contrast { width: 29vw; right: 2%; top: 51%; }
  .experiment-architecture { width: 32vw; right: 8%; top: 16%; }
}
@media (max-width: 600px) {
  .experiment-json { width: 42vw; left: 2%; top: auto; bottom: 4%; }
  .experiment-contrast { width: 32vw; right: 2%; top: auto; bottom: 5%; }
  .experiment-architecture { display: none; }
  .experiment-position { perspective: none; }
}
@media (max-height: 700px) and (max-width: 600px) {
  .experiment-json { width: 35vw; bottom: 5%; }
  .experiment-contrast { display: none; }
}
</style>
