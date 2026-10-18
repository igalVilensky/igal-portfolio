<script setup lang="ts">
const props = defineProps<{ kind: 'project' | 'technology'; height?: number }>();
const w = computed(() => props.kind === 'project' ? 160 : 92);
const h = computed(() => props.kind === 'project' ? 54 : (props.height ?? 32));
const d = computed(() => props.kind === 'project' ? 12 : 7);
const bevel = computed(() => props.kind === 'project' ? 0 : 6);
const front = computed(() => `M${bevel.value} 0 H${w.value - bevel.value} L${w.value} ${bevel.value} V${h.value - bevel.value} L${w.value - bevel.value} ${h.value} H${bevel.value} L0 ${h.value - bevel.value} V${bevel.value} Z`);
</script>

<template>
 <svg class="module-body" :viewBox="`0 0 ${w} ${h}`" aria-hidden="true">
  <!-- A rigid extrusion, not an offset shadow. Every module uses the same
       camera-plane axes and receding vector; technologies have chamfered ends. -->
  <path class="body-top" :d="`M${bevel} 0 L${bevel + d} ${-d} H${w - bevel + d} L${w + d} ${bevel - d} L${w} ${bevel} L${w - bevel} 0 Z`" />
  <path class="body-side" :d="`M${w} ${bevel} L${w + d} ${bevel - d} V${h - bevel - d} L${w - bevel + d} ${h - d} L${w - bevel} ${h} L${w} ${h - bevel} Z`" />
  <path class="body-front" :d="front" />
  <path class="body-rim" :d="`M${bevel} 1 H${w - bevel} M1 ${bevel + 1} V${h - bevel - 1}`" />
 </svg>
</template>
<style scoped>
.module-body{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;filter:drop-shadow(0 12px 9px var(--shadow))}
.body-front{fill:var(--module-front);stroke:var(--line);stroke-width:.8}
.body-top{fill:var(--module-top);stroke:var(--line);stroke-width:.8}
.body-side{fill:var(--module-side);stroke:var(--line);stroke-width:.8}
.body-rim{fill:none;stroke:var(--module-rim);stroke-width:.65;opacity:.6}
:global(.module.related) .body-front,:global(.module.selected) .body-front{stroke:var(--accent);stroke-width:1.3}
</style>
