<script setup lang="ts">
import PlateSurfaceContent from './PlateSurfaceContent.vue';
import type { projectPlate } from './plateGeometry';
import json from './assets/experiments/experiments-json-typescript.png';
import contrast from './assets/experiments/experiments-contrast-checker.png';
import architecture from './assets/experiments/experiments-architecture-sketch.png';
import code from './assets/ask-igal-code.png';
import systems from './assets/ask-igal-systems.png';
import experience from './assets/ask-igal-experience.png';
import answer from './assets/ask-igal-answer.png';
import inputs from './assets/automation/automation-inputs.png';
import processing from './assets/automation/automation-processing.png';
import output from './assets/automation/automation-output.png';
import route from './assets/automation/automation-route.png';
const props = defineProps<{ layer: number; geometry: ReturnType<typeof projectPlate>; progress: number; cta: string }>();
// Image fragments live in local surface coordinates; the shared camera and clip
// attach the whole composition to the plate, including intermediate poses.
const artwork: Record<number, { name: string; images: string[] }> = {
  1: { name: 'experiments', images: [json, contrast, architecture] },
  2: { name: 'ask', images: [code, systems, experience, answer] },
  3: { name: 'automation', images: [inputs, processing, output, route] },
  // TODO: Replace About placeholder artwork
  4: { name: 'about', images: [architecture, contrast] },
};
const composition = computed(() => artwork[props.layer]!);
// Match Work's reversible exposure curve and timing exactly.
const exposure = computed(() => {
  const t = Math.max(0, Math.min(1, (props.progress - .45) / .5));
  return t * t * (3 - 2 * t);
});
</script>

<template>
  <PlateSurfaceContent :geometry="geometry" :opacity="exposure">
    <div class="layer-inner-art" :class="composition.name">
      <img v-for="(src, i) in composition.images" :key="src" :src="src" :class="`fragment-${i}`" alt="" draggable="false" decoding="async">
    </div>
    <div class="preview-footer" :style="{ opacity: Math.max(0, (progress - .78) / .22) }"><strong>{{ cta }} ↗</strong></div>
  </PlateSurfaceContent>
</template>

<style scoped>
.preview-footer { position: absolute; left: 12px; right: 12px; bottom: 12px; min-height: 38px; display: flex; align-items: center; justify-content: flex-end; padding: 0 12px; border-top: 1px solid var(--sp-cyan); background: var(--sp-bottom); color: var(--color-text); font-size: 14px; }
@media (max-width: 600px) { .preview-footer { font-size: 24px; } }
.layer-inner-art { position: absolute; inset: 16px 18px 56px; overflow: hidden; opacity: 1; background: #14243a; mask-image: linear-gradient(transparent, #000 7%, #000 93%, transparent); }
.layer-inner-art img { position: absolute; max-width: none; height: auto; pointer-events: none; }
.fragment-0 { width: 220px; left: -45px; top: -26px; transform: rotate(-12deg); }
.fragment-1 { width: 220px; right: -58px; top: 8px; transform: rotate(8deg); }
.fragment-2 { width: 220px; left: 40px; bottom: -65px; transform: rotate(-7deg); }
.ask .fragment-0 { width: 185px; left: -32px; top: -12px; }
.ask .fragment-1 { width: 195px; right: -38px; top: -12px; }
.ask .fragment-2 { width: 180px; left: -25px; bottom: -50px; }
.ask .fragment-3 { width: 185px; right: -24px; bottom: -55px; transform: rotate(6deg); }
.automation .fragment-0 { width: 150px; left: -25px; top: 0; transform: rotate(-6deg); }
.automation .fragment-1 { width: 170px; left: 80px; top: 32px; transform: none; }
.automation .fragment-2 { width: 150px; left: 210px; top: 72px; transform: rotate(6deg); }
.automation .fragment-3 { width: 280px; left: 22px; bottom: -92px; opacity: .55; }
.about .fragment-0 { width: 260px; left: -22px; top: -22px; }
.about .fragment-1 { width: 195px; right: -38px; top: 80px; opacity: .6; }


</style>
