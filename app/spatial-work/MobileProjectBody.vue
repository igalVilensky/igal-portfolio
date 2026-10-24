<template>
 <!-- Mobile's taller reading face uses the same extrusion vector and material
      faces as ModuleBody. Its proportions are independent of desktop geometry. -->
 <svg class="mobile-project-body" viewBox="0 0 200 112" preserveAspectRatio="none" aria-hidden="true">
  <path class="body-top" d="M0 0 L12 -12 H212 L200 0 Z" />
  <path class="body-side" d="M200 0 L212 -12 V100 L200 112 Z" />
  <path class="body-front" d="M0 0 H200 V112 H0 Z" />
  <path class="body-rim" d="M0 1 H200 M1 1 V111" />
 </svg>
</template>
<style scoped>
.mobile-project-body{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;filter:drop-shadow(0 12px 9px var(--shadow))}
.body-top{fill:var(--module-top)}.body-side{fill:var(--module-side)}.body-front{fill:var(--module-front)}
.body-top,.body-side,.body-front{stroke:var(--line);stroke-width:.8}
.body-rim{fill:none;stroke:var(--module-rim);stroke-width:.65;opacity:.6}
</style>
