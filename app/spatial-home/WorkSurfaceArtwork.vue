<script setup lang="ts">
import PlateSurfaceContent from './PlateSurfaceContent.vue';
import type { projectPlate } from './plateGeometry';
import mindq from './assets/work/work-mindq-lab.png';
import sunlit from './assets/work/work-sunlit-tales.png';
import linter from './assets/work/work-i18n-linter.png';
const props = defineProps<{ geometry: ReturnType<typeof projectPlate>; progress: number }>();
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
  </PlateSurfaceContent>
</template>

<style scoped>
/* Keep the existing crops, with a solid image field and only a narrow edge fade.
   The shared projected face clip keeps every pixel inside the rotating plate. */
.work-inner-art { position: absolute; inset: 16px 18px 25px; overflow: hidden; background: #14243a; opacity: 1; mask-image: linear-gradient(transparent, #000 7%, #000 93%, transparent); }
.work-inner-art img { position: absolute; max-width: none; height: auto; pointer-events: none; }
.inner-mindq { width: 235px; left: -64px; top: -32px; transform: rotate(-13deg); mask-image: linear-gradient(90deg, #000 40%, transparent 96%); }
.inner-sunlit { width: 355px; right: -112px; top: -8px; transform: rotate(9deg); mask-image: linear-gradient(110deg, transparent 7%, #000 48%); }
.inner-linter { width: 176px; left: 94px; bottom: -107px; transform: rotate(-8deg); opacity: 1; mask-image: linear-gradient(0deg, transparent 12%, #000 76%); }

</style>
