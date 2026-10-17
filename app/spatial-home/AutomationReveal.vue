<script setup lang="ts">
import { gsap } from 'gsap';
import inputs from './assets/automation/automation-inputs.png';
import processing from './assets/automation/automation-processing.png';
import output from './assets/automation/automation-output.png';
const props = defineProps<{ visible: boolean; paused: boolean; suppressed: boolean }>();
const root = ref<SVGSVGElement>();
let timeline: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let media: MediaQueryList | undefined;
function sync() {
  if (!timeline) return;
  if (props.paused || media?.matches) {
    timeline.progress(props.visible ? 1 : 0).pause();
    // Flush lazy SVG opacity at either endpoint, including a live media change.
    gsap.set(root.value!.querySelectorAll('image'), { opacity: props.visible ? 1 : 0 });
    gsap.set(root.value!.querySelector('.automation-processing'), { opacity: props.visible ? .72 : 0 });
  }
  else if (props.visible) timeline.timeScale(1).play();
  else timeline.timeScale(props.suppressed ? 2.8 : 1.6).reverse();
}
watch(() => [props.visible, props.paused, props.suppressed], sync);
onMounted(() => {
  media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  context = gsap.context(() => {
    const plate = root.value!.parentElement!.querySelector('.plane-art .plane-light');
    timeline = gsap.timeline({ paused: true });
    timeline.fromTo('.automation-input', { opacity: 0, x: 240, y: 100, scale: .12, rotation: 14, transformOrigin: '90% 70%' },
      { opacity: 1, x: 0, y: 0, scale: 1, rotation: -6, duration: .85, ease: 'power3.out' }, .18);
    timeline.fromTo('.automation-inlet', { strokeDashoffset: 1, opacity: 0 },
      { strokeDashoffset: 0, opacity: .85, duration: .65, ease: 'power2.inOut' }, .55);
    timeline.fromTo('.automation-processing', { opacity: 0, scale: .3, y: 80, rotation: -12, transformOrigin: '30% 85%' },
      { opacity: .72, scale: 1, y: 0, rotation: 8, duration: .7, ease: 'power3.out' }, .82);
    if (plate) timeline.fromTo(plate, { opacity: .12 }, { opacity: 1, duration: .2 }, .9)
      .to(plate, { opacity: .48, duration: .5 }, 1.1);
    timeline.fromTo('.automation-outlet', { strokeDashoffset: 1, opacity: 0 },
      { strokeDashoffset: 0, opacity: .85, duration: .7, ease: 'power2.inOut' }, 1.05);
    timeline.fromTo('.automation-output', { opacity: 0, x: -230, y: -75, scale: .12, rotation: -12, transformOrigin: '0% 30%' },
      { opacity: 1, x: 0, y: 0, scale: .92, rotation: 5, duration: .9, ease: 'power3.out' }, 1.4);
    sync();
  }, root.value);
});
onBeforeUnmount(() => { context?.revert(); media?.removeEventListener('change', sync); });
</script>

<template>
  <svg ref="root" class="automation-world" viewBox="0 0 720 260" aria-hidden="true">
    <!-- Behind the rigid plate: the interrupted trajectory enters its surface,
         then emerges on the opposite side. No per-frame path geometry writes. -->
    <g class="automation-routes" fill="none" stroke-linecap="round" stroke-width="2.5">
      <path class="automation-inlet" pathLength="1" d="M-18 108 C70 210 95 33 206 78 S280 150 359 127" />
      <path class="automation-outlet" pathLength="1" d="M359 127 C475 32 518 271 616 218 S695 142 754 178" />
    </g>
    <g class="automation-input-position"><image alt="" class="automation-input" :href="inputs" x="-184" y="-116" width="230" height="310" /></g>
    <g class="automation-processing-position"><image alt="" class="automation-processing" :href="processing" x="460" y="-68" width="158" height="172" /></g>
    <g class="automation-output-position"><image alt="" class="automation-output" :href="output" x="654" y="125" width="266" height="164" /></g>
  </svg>
</template>

<style scoped>
.automation-world { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.automation-world image { opacity: 0; }
.automation-routes path { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.automation-inlet { stroke: #168ca8; }
.automation-outlet { stroke: #8c65ca; }
:global(.dark) .automation-inlet { stroke: #61d9e7; }
:global(.dark) .automation-outlet { stroke: #b29bea; }
@media (min-width: 601px) and (max-width: 1100px) {
  .automation-input-position { transform: translate(150px, 180px) scale(.68); }
  .automation-output-position { transform: translate(90px, 100px) scale(.68); }
}
@media(max-width: 600px) {
  .automation-input-position { transform: translate(200px, 360px) scale(.56); }
  .automation-output-position { transform: translate(190px, 225px) scale(.56); }
  .automation-processing-position, .automation-routes { display: none; }
}
</style>
