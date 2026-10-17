<script setup lang="ts">
import { gsap } from 'gsap';
import mindq from './assets/work/work-mindq-lab.png';
import sunlit from './assets/work/work-sunlit-tales.png';
import linter from './assets/work/work-i18n-linter.png';
const props = defineProps<{ visible: boolean; paused: boolean }>();
const root = ref<HTMLElement>();
const artwork = [
  { name: 'mindq', src: mindq, width: 1122, height: 1402, yaw: 12, pitch: -5, roll: -6, depth: 85, delay: .22 },
  { name: 'sunlit', src: sunlit, width: 1672, height: 941, yaw: -16, pitch: 8, roll: 5, depth: -160, delay: .36 },
  { name: 'linter', src: linter, width: 1122, height: 1402, yaw: -9, pitch: -3, roll: 8, depth: 15, delay: .48 },
];
let timeline: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let observer: ResizeObserver | undefined;
let media: MediaQueryList | undefined;
function sync() {
  if (!timeline) return;
  if (props.paused || media?.matches) timeline.progress(props.visible ? 1 : 0).pause();
  else if (props.visible) timeline.timeScale(1).play();
  else timeline.timeScale(1.8).reverse();
}
function build() {
  const progress = timeline?.progress() ?? 0;
  context?.revert();
  context = gsap.context(() => {
    const plate = root.value!.closest('main')?.querySelector<SVGGraphicsElement>('.work-plane .spatial-plate');
    if (!plate?.getScreenCTM()) return;
    const [x = 360, y = 130] = (plate.dataset.center ?? '').split(',').map(Number);
    const source = new DOMPoint(x, y).matrixTransform(plate.getScreenCTM()!);
    const compact = matchMedia('(max-width: 600px)').matches;
    timeline = gsap.timeline({ paused: true });
    root.value!.querySelectorAll<HTMLElement>('.work-position').forEach((position, i) => {
      const asset = artwork[i]!;
      const box = position.getBoundingClientRect();
      // All objects depart from the canonical plate's projected center. Their
      // own perspective stages then give each a different camera-space depth.
      timeline!.fromTo(position.firstElementChild, {
        opacity: 0, x: source.x - box.left - box.width / 2,
        y: source.y - box.top - box.height / 2, z: -240,
        scale: .12, rotationY: 0, rotationX: 24, rotationZ: i * 9 - 9,
      }, {
        opacity: 1, x: 0, y: 0, z: compact ? 0 : asset.depth, scale: 1,
        rotationY: compact ? asset.yaw * .25 : asset.yaw,
        rotationX: compact ? 0 : asset.pitch, rotationZ: compact ? asset.roll * .4 : asset.roll,
        duration: .95 + i * .09, ease: 'power3.out',
      }, asset.delay);
    });
    timeline.progress(progress);
    sync();
  }, root.value);
}
watch(() => [props.visible, props.paused], sync);
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  observer = new ResizeObserver(build);
  observer.observe(root.value!);
});
onBeforeUnmount(() => { observer?.disconnect(); context?.revert(); media?.removeEventListener('change', sync); });
</script>

<template>
  <div ref="root" class="work-collection" aria-hidden="true">
    <div v-for="asset in artwork" :key="asset.name" class="work-position" :class="`work-${asset.name}`">
      <img class="work-art" :src="asset.src" alt="" :width="asset.width" :height="asset.height" decoding="async" draggable="false">
    </div>
  </div>
</template>

<style scoped>
.work-collection { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.work-position { position: absolute; perspective: 1100px; }
.work-mindq { width: min(27vw, 430px); left: 3.5%; top: 19%; z-index: 3; }
.work-sunlit { width: min(41vw, 630px); right: 1%; top: 13%; z-index: 0; perspective: 1400px; }
.work-linter { width: min(23vw, 330px); right: 8%; top: 47%; z-index: 2; }
.work-art { display: block; width: 100%; height: auto; opacity: 0; transform-origin: center; filter: drop-shadow(0 18px 15px #172c4f24); }
:global(.dark .work-art) { filter: drop-shadow(0 22px 18px #0006); }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .work-mindq { width: 29vw; left: 2%; top: 23%; }
  .work-sunlit { width: 41vw; right: 0; top: 19%; }
  .work-linter { width: 27vw; right: 1%; top: 53%; }
}
@media (max-width: 600px) {
  .work-mindq { width: min(26vw, 140px); left: 8%; top: 82.5%; }
  .work-sunlit { width: 42vw; right: 4%; top: 85%; }
  .work-linter { display: none; }
  .work-position { perspective: none; }
  .work-art { filter: none; }
}
@media (max-width: 359px), (max-height: 700px) and (max-width: 600px) {
  .work-sunlit { display: none; }
  .work-mindq { width: 24vw; top: auto; bottom: 2%; }
}
</style>
