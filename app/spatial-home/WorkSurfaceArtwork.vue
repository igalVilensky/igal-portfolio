<script setup lang="ts">
import PlateSurfaceContent from './PlateSurfaceContent.vue';
import type { projectPlate } from './plateGeometry';
import mindq from './assets/work/work-mindq-lab.png';
import sunlit from './assets/work/work-sunlit-tales.png';
import linter from './assets/work/work-i18n-linter.png';
const props = defineProps<{ geometry: ReturnType<typeof projectPlate>; progress: number; cta: string }>();
// The existing reversible plate clock owns the reveal: no competing timeline.
const exposure = computed(() => {
  const t = Math.max(0, Math.min(1, (props.progress - .45) / .5));
  return t * t * (3 - 2 * t);
});
</script>

<template>
  <PlateSurfaceContent :geometry="geometry" :opacity="exposure">
    <div class="work-inner-art">
      <img class="inner-mindq" :src="mindq" alt="" draggable="false" decoding="async">
      <img class="inner-sunlit" :src="sunlit" alt="" draggable="false" decoding="async">
      <img class="inner-linter" :src="linter" alt="" draggable="false" decoding="async">
    </div>
    <div class="work-preview-footer" :style="{ opacity: Math.max(0, (progress - .78) / .22), transform: `translateY(${(1 - progress) * 12}px)` }">
      <span>01 / PORTFOLIO</span><strong>{{ cta }} <span>↗</span></strong>
    </div>
  </PlateSurfaceContent>
</template>

<style scoped>
/* Keep the existing crops, with a solid image field and only a narrow edge fade.
   The shared projected face clip keeps every pixel inside the rotating plate. */
.work-inner-art { position: absolute; inset: 12px 12px 56px; overflow: hidden; background: #14243a; opacity: 1; border-radius: 3px; }
.work-inner-art img { position: absolute; max-width: none; height: auto; pointer-events: none; }
.inner-mindq { width: 235px; left: -64px; top: -32px; transform: rotate(-13deg); mask-image: linear-gradient(90deg, #000 40%, transparent 96%); }
.inner-sunlit { width: 355px; right: -112px; top: -8px; transform: rotate(9deg); mask-image: linear-gradient(110deg, transparent 7%, #000 48%); }
.inner-linter { width: 176px; left: 94px; bottom: -107px; transform: rotate(-8deg); opacity: 1; mask-image: linear-gradient(0deg, transparent 12%, #000 76%); }

.work-preview-footer { position: absolute; left: 12px; right: 12px; bottom: 12px; height: 38px; display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 0 12px; border-top: 1px solid var(--sp-cyan); background: var(--sp-bottom); color: var(--color-text); }
.work-preview-footer > span { font: 8px var(--font-mono); letter-spacing: .1em; color: var(--color-text-muted); }
.work-preview-footer strong { font-size: 14px; font-weight: 600; }
.work-preview-footer strong span { color: var(--sp-cyan); margin-left: 8px; }
@media (max-width: 600px) { .work-preview-footer { justify-content: flex-end; } .work-preview-footer > span { display: none; } .work-preview-footer strong { font-size: 24px; } }
</style>
