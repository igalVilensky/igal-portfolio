<script setup lang="ts">
import { destinations, type SpatialCopy } from './content';
import type { useSpatialNavigation } from './useSpatialNavigation';
const props = defineProps<{ copy: SpatialCopy; paused: boolean; navigation: ReturnType<typeof useSpatialNavigation> }>();
const emit = defineEmits<{ origin: [point: { x: number; y: number; bottom: number }] }>();
const { active, opening, links, activate, pointerDown, keyboard, enter, leave, focus, blur } = props.navigation;
const localePath = useLocalePath();
const id = useId();
const stage = ref<HTMLElement>();
let observer: ResizeObserver | undefined;
function measure() {
  if (!stage.value) return;
  const rect = stage.value.getBoundingClientRect();
  const compact = window.matchMedia('(max-width: 600px)').matches;
  emit('origin', { bottom: rect.bottom + window.scrollY, x: rect.left + rect.width * (compact ? .944 : .926), y: rect.top + window.scrollY + (compact ? rect.width * .1365 - 7 : rect.width * .16) });
}
onMounted(() => {
  observer = new ResizeObserver(measure);
  observer.observe(document.documentElement);
  observer.observe(stage.value!);
  window.addEventListener('resize', measure);
  measure();
});
onBeforeUnmount(() => { observer?.disconnect(); window.removeEventListener('resize', measure); });
</script>

<template>
  <div class="spatial-object" :class="{ paused, departing: opening !== null, 'work-active': active === 0 }">
    <nav ref="stage" class="stack-stage" :aria-label="copy.navigation">
      <div class="stack-axis" aria-hidden="true" />
      <a v-for="(destination, i) in destinations" :key="destination" ref="links"
        :href="localePath(destination)" class="spatial-plane"
        :class="{ active: active === i, chosen: opening === i }"
        :style="{ '--i': i, zIndex: 5 - i }"
        :aria-label="`${copy.names[i]} — ${copy.open}`" :aria-describedby="active === i ? `${id}-context` : undefined"
        @pointerdown="pointerDown($event)" @pointerenter="enter($event, i)"
        @pointerleave="leave"
        @focus="focus(i)" @blur="blur"
        @keydown="keyboard($event, i)" @click="activate($event, i)">
        <svg viewBox="0 0 720 260" aria-hidden="true">
          <defs>
            <linearGradient :id="`${id}-surface-${i}`" x1="0" y1="0" x2="1" y2="1"><stop class="surface-start"/><stop offset="1" class="surface-end"/></linearGradient>
            <pattern :id="`${id}-grid-${i}`" width="32" height="16" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)"><path d="M32 0H0V16" class="plane-grid" /></pattern>
          </defs>
          <path class="plane-edge" d="M40 100 400 12 680 126V148L320 246 40 122Z" />
          <path class="plane-face" :fill="`url(#${id}-surface-${i})`" d="M40 100 400 12 680 126 320 224Z" />
          <path :fill="`url(#${id}-grid-${i})`" d="M40 100 400 12 680 126 320 224Z" />
          <path class="plane-inset" d="M76 101 398 29 645 125 321 205Z M107 101 397 43 613 124" />
          <path class="plane-trace" :d="i % 2 ? 'M145 94 245 72 300 94 390 75 494 116 460 125' : 'M190 126 269 107 322 129 436 102 535 140'" />
          <path v-if="i === 0" class="work-source" d="M310 98 370 83 414 102 355 118Z M40 100 400 12 680 126" />
          <path class="plane-core" d="M310 98 370 83 414 102 355 118Z M310 104 355 125 414 109" />
          <path class="plane-rim" d="M40 100 320 224 680 126 M320 224V246" />
          <path class="plane-corner" d="M40 115V100L78 91 M644 136 680 126V141" />
        </svg>
        <span class="plane-label"><span class="plane-number">0{{ i + 1 }}</span><span>{{ copy.names[i] }}</span><span class="plane-arrow" aria-hidden="true">↗</span></span>
      </a>
    </nav>
    <div :id="`${id}-context`" class="spatial-context" aria-live="polite" aria-atomic="true">
      <template v-if="active !== null"><p>{{ copy.names[active] }} <span aria-hidden="true">/</span> <span class="context-action">{{ opening !== null ? copy.opening : copy.open }} ↗</span></p><span>{{ copy.descriptions[active] }}</span></template>
      <template v-else><p>{{ copy.idle }}</p><span class="desktop-hint">{{ copy.hint }}</span><span class="touch-hint">{{ copy.touch }}</span></template>
    </div>
  </div>
</template>

<style scoped>
.spatial-object { position: relative; z-index: 2; width: min(900px, 84vw, calc((100svh - 300px) * 1.1)); margin: auto; }
.stack-stage { position: relative; aspect-ratio: 720 / 650; animation: stack-breathe 9s ease-in-out infinite; }
.stack-axis { position: absolute; inset: 12% 48% 5%; border-left: 1px dashed var(--sp-line); transform: rotate(16deg); opacity: .5; }
.stack-stage::after { content: ''; position: absolute; width: 65%; height: 10%; background: var(--sp-shadow); filter: blur(26px); bottom: 0; left: 20%; border-radius: 50%; }
.spatial-plane { position: absolute; width: 100%; top: calc(var(--i) * 14%); display: block; color: var(--color-text); transition: transform 550ms cubic-bezier(.2,.8,.2,1), opacity 350ms, translate 550ms; -webkit-tap-highlight-color: transparent; }
.spatial-plane svg { display: block; width: 100%; overflow: visible; pointer-events: none; filter: drop-shadow(0 16px 10px var(--sp-shadow)); }
.spatial-plane { clip-path: polygon(5.5% 38%, 55.5% 4%, 94.5% 48%, 94.5% 58%, 44.5% 96%, 5.5% 48%); }
.work-source { fill: none; stroke: var(--sp-cyan); stroke-width: 3; opacity: 0; transition: opacity .3s; filter: drop-shadow(0 0 7px var(--sp-cyan)); }
.work-active .work-source { opacity: 1; }
.plane-face { stroke: var(--sp-line); stroke-width: 1.2; }
.surface-start { stop-color: var(--sp-top); }.surface-end { stop-color: var(--sp-bottom); }
.plane-edge { fill: var(--sp-edge); stroke: var(--sp-line); }
.plane-grid { fill: none; stroke: var(--sp-line); stroke-width: .5; opacity: .18; }
.plane-inset, .plane-trace, .plane-core, .plane-rim, .plane-corner { fill: none; stroke: var(--sp-line); stroke-width: 1; }
.plane-trace { stroke: var(--sp-cyan); opacity: .45; }.plane-core { stroke: var(--color-accent); stroke-width: 2; }
.plane-corner { stroke: var(--sp-cyan); stroke-width: 3; }
.plane-label { position: absolute; left: 45%; top: 66%; width: 36%; display: flex; align-items: center; gap: 12px; transform: rotate(-15deg); font-size: clamp(13px, 1.4vw, 19px); white-space: nowrap; font-weight: 500; }
.plane-number { font: 10px var(--font-mono); color: var(--color-text-muted); }.plane-arrow { margin-left: auto; color: var(--color-accent); }
.spatial-plane.active, .spatial-plane:focus-visible { transform: translate(-3%, -4%) scale(1.025); }
.spatial-plane.active .plane-face, .spatial-plane:focus-visible .plane-face { stroke: var(--color-accent); stroke-width: 2.5; }
.spatial-plane:focus-visible { outline: none; }.spatial-plane:focus-visible .plane-inset { stroke: var(--color-accent); stroke-width: 3; stroke-dasharray: 6 4; }
.spatial-plane.active .plane-core { stroke: var(--sp-cyan); }.spatial-plane.active .plane-label { color: var(--color-accent); }
.work-active:not(.departing) .spatial-plane:not(.active) { opacity: 1; translate: 0 3px; }
.departing .spatial-plane:not(.chosen) { opacity: .25; transform: translateY(12%); }.departing .chosen { transform: translate(-5%, -9%) scale(1.07); }
.spatial-context { text-align: center; min-height: 72px; padding: 8px 0; font-size: 13px; color: var(--color-text-muted); }
.spatial-context p { color: var(--color-text); font-size: 15px; margin-bottom: 5px; }.spatial-context p > span { margin-left: 12px; }.context-action { color: var(--color-accent); font-size: 12px; }
.touch-hint { display: none; }.paused .stack-stage, .stack-stage:focus-within, .stack-stage:hover, .departing .stack-stage { animation-play-state: paused; }
@keyframes stack-breathe { 0%,100% { transform: translateY(0) rotate(-.4deg); } 50% { transform: translateY(-7px) rotate(.4deg); } }
@media (max-width: 600px) {
  .spatial-object { width: min(100%, 440px); }
  .stack-stage { aspect-ratio: 400 / 470; }
  .spatial-plane { top: calc(var(--i) * 18%); transform: scaleY(.78); transform-origin: top center; }
  .spatial-plane.active, .spatial-plane:focus-visible { transform: translateY(-7px) scaleY(.78); }
  .plane-label { left: 45%; top: 65%; width: 42%; font-size: clamp(11px, 3.15vw, 14px); gap: 7px; transform: rotate(-15deg) scaleY(1.28); }
  .plane-number { display: none; }.spatial-context { min-height: 94px; padding: 14px 8px 0; }
  .desktop-hint { display: none; }.touch-hint { display: inline; }
  .departing .chosen { transform: translateY(-15px) scaleY(.78); }
}
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .spatial-context { min-height: 124px; padding: 64px 8px 0; }
}
@media (prefers-reduced-motion: reduce) { .stack-stage { animation: none; }.spatial-plane, .work-source { transition: none; } }
</style>
