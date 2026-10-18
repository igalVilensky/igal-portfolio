<script setup lang="ts">
import type { projectPlate } from './plateGeometry';
const props = defineProps<{ geometry: ReturnType<typeof projectPlate>; opacity: number }>();
const id = useId();
const mapping = computed(() => {
  // Texture coordinates follow the existing camera's four projected surface
  // corners. This homography adds no camera, pose, or geometry of its own.
  const [p, q, r, s] = [[0, 0], [360, 0], [360, 280], [0, 280]].map(
    point => props.geometry.surfacePoint(point as [number, number]),
  ) as [readonly [number, number], readonly [number, number], readonly [number, number], readonly [number, number]];
  const dx1 = q[0] - r[0], dx2 = s[0] - r[0], dx3 = p[0] - q[0] + r[0] - s[0];
  const dy1 = q[1] - r[1], dy2 = s[1] - r[1], dy3 = p[1] - q[1] + r[1] - s[1];
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  return `matrix3d(${[
    (q[0] - p[0] + g * q[0]) / 360, (q[1] - p[1] + g * q[1]) / 360, 0, g / 360,
    (s[0] - p[0] + h * s[0]) / 280, (s[1] - p[1] + h * s[1]) / 280, 0, h / 280,
    0, 0, 1, 0, p[0], p[1], 0, 1,
  ].join(',')})`;
});
</script>

<template>
  <g class="plate-surface-content" :opacity="opacity" aria-hidden="true" pointer-events="none">
    <defs><clipPath :id="id"><path :d="geometry.top" /></clipPath></defs>
    <g :clip-path="`url(#${id})`">
      <foreignObject x="0" y="0" width="720" height="260" overflow="visible">
        <div class="surface-texture" :style="{ transform: mapping }"><slot /></div>
      </foreignObject>
    </g>
  </g>
</template>

<style scoped>
.plate-surface-content { pointer-events: none; }
.surface-texture { position: relative; width: 360px; height: 280px; overflow: hidden; transform-origin: 0 0; pointer-events: none; filter: contrast(1.1) saturate(1.08); }
</style>
