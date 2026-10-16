<script setup lang="ts">
import { restingPlate, plateCenter, projectSurfacePath } from './plateGeometry';
const props = defineProps<{ energy: number; pulse: number }>();
const id = useId();
const face = restingPlate.top;
const intake = restingPlate.vertices[0]!;
</script>

<template>
  <g class="active-core" aria-hidden="true" :opacity="props.energy">
    <defs>
      <clipPath :id="`${id}-clip`"><path :d="face" /></clipPath>
      <linearGradient :id="`${id}-wash`" x1="0" y1="1" x2="1" y2="0"><stop stop-color="var(--sp-cyan)" stop-opacity=".65"/><stop offset=".6" stop-color="#3185e8" stop-opacity=".22"/><stop offset="1" stop-color="var(--sp-cyan)" stop-opacity=".05"/></linearGradient>
    </defs>
    <g :clip-path="`url(#${id}-clip)`">
      <path :d="face" :fill="`url(#${id}-wash)`" :transform="`translate(${intake[0]} ${intake[1]}) scale(${energy} 1) translate(${-intake[0]} ${-intake[1]})`" />
      <!-- Nested contours follow the four corners of the existing surface. -->
      <path class="core-contour" :d="projectSurfacePath('M76 101 398 29 645 125 321 205Z')" :opacity=".35 + pulse * .5" />
      <path class="core-wave" :d="face" :transform="`translate(${plateCenter[0]} ${plateCenter[1]}) scale(${.15 + energy * .85}) translate(${-plateCenter[0]} ${-plateCenter[1]})`" :opacity="pulse" />
      <path class="core-conductor" :d="restingPlate.rim" />
      <path class="core-facet" :d="projectSurfacePath('M280 176 347 158 402 181 335 200Z')" :opacity=".5 + pulse * .5" />
    </g>
  </g>
</template>

<style scoped>
.active-core { pointer-events: none; }
.core-contour, .core-wave, .core-conductor { fill: none; stroke: var(--sp-cyan); stroke-width: 2; }
.core-wave { stroke-width: 4; }.core-conductor { stroke-width: 3; }.core-facet { fill: var(--sp-cyan); }
</style>
