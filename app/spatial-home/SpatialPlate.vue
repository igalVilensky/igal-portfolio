<script setup lang="ts">
import { projectPlate, projectWorkPlate, restingPlate } from './plateGeometry';
const props = defineProps<{ progress: number; name: string; prefix: string; index: number; illuminated: boolean; paused: boolean }>();
const geometry = computed(() => props.progress === 0 ? restingPlate : props.index === 0 ? projectWorkPlate(props.progress) : projectPlate(props.progress));
// Fade technical markings before the artwork starts to reveal. Both directions
// follow the reversible pose clock, including interrupted hover and reduced motion.
const decoration = computed(() => 1 - Math.min(1, props.progress / .45));
const title = ref<SVGTextElement>();
const titlePlacement = ref('translate(0 17)');
let compact: MediaQueryList | undefined;
function fitTitle() {
  if (!title.value) return;
  // Never measure the rendered, transformed text: fractional CTMs alter SVG
  // glyph bounds in Chromium and an observer/write cycle feeds that into scale.
  // This temporary 1:1 SVG is outside the animated hierarchy and is not observed.
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '720');
  svg.setAttribute('height', '260');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:fixed;left:-10000px;top:0;visibility:hidden;pointer-events:none';
  const clone = title.value.cloneNode(true) as SVGTextElement;
  const style = getComputedStyle(title.value);
  clone.style.fontFamily = style.fontFamily;
  clone.style.fontSize = style.fontSize;
  clone.style.fontWeight = style.fontWeight;
  clone.style.letterSpacing = style.letterSpacing;
  clone.querySelectorAll('tspan').forEach((span, i) => {
    span.style.fontWeight = getComputedStyle(title.value!.querySelectorAll('tspan')[i]!).fontWeight;
  });
  svg.append(clone);
  document.body.append(svg);
  const box = clone.getBBox();
  svg.remove();
  if (!box.height || !box.width) return;
  const scale = Math.min(1, 22 * .84 / box.height, 360 * .72 / box.width);
  titlePlacement.value = `matrix(${scale} 0 0 ${scale} ${-(box.x + box.width / 2) * scale} ${11 - (box.y + box.height / 2) * scale})`;
}
watch(() => [props.name, props.illuminated], () => nextTick(fitTitle), { flush: 'post' });
onMounted(() => {
  compact = matchMedia('(max-width: 600px)');
  compact.addEventListener('change', fitTitle);
  document.fonts.addEventListener('loadingdone', fitTitle);
  fitTitle();
  document.fonts.ready.then(fitTitle);
});
onBeforeUnmount(() => {
  compact?.removeEventListener('change', fitTitle);
  document.fonts.removeEventListener('loadingdone', fitTitle);
});
</script>

<template>
  <g class="spatial-plate" :class="{ illuminated, paused, 'ask-lit': index === 2 && progress > 0 }" :style="{ '--surface-decoration': decoration, '--surface-pose': progress }" :data-layer="index" :data-progress="progress" :data-center="geometry.center.join(',')">
    <!-- Every layer uses these same faces, corners and thickness. Only pose varies. -->
    <path class="plane-face" :fill="`url(#${prefix}-surface-${index})`" :d="geometry.top" />
    <path class="plane-light" :fill="`url(#${prefix}-light-${index})`" :d="geometry.top" />
    <slot name="surface" :geometry="geometry" />
    <path class="plane-grid" :d="geometry.grid" />
    <path class="plane-inset" :d="geometry.inset" />
    <path class="plane-trace" :d="geometry.trace" />
    <path class="plane-core" :d="geometry.core" />
    <path class="plane-corner" :d="geometry.corner" />
    <slot />
    <template v-if="geometry.sideVisible">
      <path class="plane-edge plate-side" :fill="`url(#${prefix}-side-${index})`" :d="geometry.side" />
      <path class="plane-side-shade" :d="geometry.side" />
    </template>
    <path v-if="geometry.frontVisible" class="plane-edge plate-front" :fill="`url(#${prefix}-side-${index})`" :d="geometry.front" />
    <path class="plane-rim" :d="geometry.rim" />
    <path class="plane-spill" :d="geometry.rim" />
    <!-- Centered on the projected front edge, with its slope and face thickness. -->
    <g v-if="geometry.frontVisible" :transform="geometry.label" class="plane-label">
      <text x="-164" y="17" class="plane-number">0{{ index + 1 }}</text>
      <g :transform="titlePlacement"><text ref="title" x="0" y="0" text-anchor="middle" class="plane-title"><tspan v-for="(letter, letterIndex) in name" :key="letterIndex" :class="{ 'ai-initial': index === 2 && (letterIndex === 0 || letterIndex === 4) }" xml:space="preserve">{{ letter }}</tspan></text></g>
      <text x="144" y="18" class="plane-arrow">↗</text>
    </g>
  </g>
</template>

<style scoped>
.spatial-plate .plane-grid,
.spatial-plate .plane-inset,
.spatial-plate .plane-trace,
.spatial-plate .plane-core,
.spatial-plate .plane-corner { opacity: var(--surface-decoration); animation: none; }
.spatial-plate .plane-grid { opacity: calc(var(--surface-decoration) * .18); }
.spatial-plate .plane-trace { opacity: calc(var(--surface-decoration) * .45); }
.spatial-plate .plane-corner { opacity: calc(var(--surface-decoration) * .7); }
.spatial-plate .plane-light { opacity: calc(.12 + var(--surface-pose) * .28); transition: none; }
.plane-face { stroke: var(--sp-line); stroke-width: 1.2; }
.plane-edge { stroke: var(--sp-line); }
.plane-side-shade { fill: #061728; opacity: .23; }
.plane-light { opacity: .12; transition: opacity .4s; }
.plane-grid { fill: none; stroke: var(--sp-line); stroke-width: .5; opacity: .18; }
.plane-inset, .plane-trace, .plane-core, .plane-rim, .plane-corner { fill: none; stroke: var(--sp-line); stroke-width: 1; }
.plane-trace { stroke: var(--sp-cyan); opacity: .45; }
.plane-core { stroke: var(--color-accent); stroke-width: 2; }
.plane-corner { stroke: var(--sp-cyan); stroke-width: 3; animation: edge-drift 7s ease-in-out infinite; animation-delay: calc(var(--i) * -.65s); }
@keyframes edge-drift { 0%,100% { opacity: .45; } 50% { opacity: .95; } }
.paused .plane-corner { animation-play-state: paused; }
.plane-label { fill: var(--color-text); font-size: 19px; font-weight: 500; }
.plane-number { font: 12px var(--font-mono); fill: var(--color-text-muted); }
.plane-arrow, .ai-initial { fill: var(--sp-cyan); }
.ai-initial { font-weight: 750; transition: filter .35s; }
.ask-lit .ai-initial { filter: drop-shadow(0 0 3px var(--sp-cyan)); }
.plane-spill { fill: none; stroke: var(--sp-cyan); stroke-width: 5; opacity: 0; transition: opacity .4s; }
/* Activation uses the existing physical edge paths, with no overlay or filter. */
.plane-rim { stroke: color-mix(in srgb, var(--sp-line), var(--sp-cyan) calc(var(--initialization, 0) * 100%)); stroke-width: calc(1 + var(--initialization, 0) * 1.5); }
.plane-spill { opacity: calc(var(--initialization, 0) * .24); transition: none; }
.illuminated .plane-edge { stroke: var(--sp-cyan); stroke-width: 1.5; }
.illuminated .plane-face { stroke: var(--sp-cyan); stroke-width: 2; }
.illuminated .plane-rim { stroke: var(--sp-cyan); stroke-width: 2.5; }
.illuminated .plane-spill { opacity: .16; }
.illuminated .plane-title { font-weight: 650; }
@media (max-width: 600px) { .plane-label { font-size: 22px; } .plane-number { display: none; } }
@media (prefers-reduced-motion: reduce) { .plane-corner { animation: none; } .plane-light, .plane-spill, .ai-initial { transition: none; } }
</style>
