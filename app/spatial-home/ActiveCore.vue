<script setup lang="ts">
const props = defineProps<{ energy: number; pulse: number }>();
const id = useId();
const face = 'M40 100 400 12 680 126 320 224Z';
</script>

<template>
  <g class="active-core" aria-hidden="true" :opacity="props.energy">
    <defs>
      <clipPath :id="`${id}-clip`"><path :d="face" /></clipPath>
      <linearGradient :id="`${id}-wash`" x1="0" y1="1" x2="1" y2="0"><stop stop-color="var(--sp-cyan)" stop-opacity=".65"/><stop offset=".6" stop-color="#3185e8" stop-opacity=".22"/><stop offset="1" stop-color="var(--sp-cyan)" stop-opacity=".05"/></linearGradient>
    </defs>
    <g :clip-path="`url(#${id}-clip)`">
      <path :d="face" :fill="`url(#${id}-wash)`" :transform="`translate(40 100) scale(${energy} 1) translate(-40 -100)`" />
      <!-- Nested contours follow the four corners of the existing surface. -->
      <path class="core-contour" d="M76 101 398 29 645 125 321 205Z" :opacity=".35 + pulse * .5" />
      <path class="core-wave" :d="face" :transform="`translate(360 118) scale(${.15 + energy * .85}) translate(-360 -118)`" :opacity="pulse" />
      <path class="core-conductor" d="M40 100 320 224 680 126" />
      <path class="core-facet" d="M280 176 347 158 402 181 335 200Z" :opacity=".5 + pulse * .5" />
    </g>
  </g>
</template>

<style scoped>
.active-core { pointer-events: none; }
.core-contour, .core-wave, .core-conductor { fill: none; stroke: var(--sp-cyan); stroke-width: 2; }
.core-wave { stroke-width: 4; }.core-conductor { stroke-width: 3; }.core-facet { fill: var(--sp-cyan); }
</style>
