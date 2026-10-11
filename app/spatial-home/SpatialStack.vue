<script setup lang="ts">
import { destinations, type SpatialCopy } from './content';
const props = defineProps<{ copy: SpatialCopy; paused: boolean }>();
const localePath = useLocalePath();
const active = ref<number | null>(null);
const opening = ref<number | null>(null);
const touched = ref<number | null>(null);
const links = ref<HTMLAnchorElement[]>([]);
let timer: ReturnType<typeof setTimeout> | undefined;
const id = useId();
function activate(event: MouseEvent, i: number) {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
  if (touched.value !== null && touched.value !== i) {
    event.preventDefault(); touched.value = i; active.value = i; return;
  }
  event.preventDefault();
  if (opening.value !== null) return;
  active.value = i; opening.value = i;
  const target = localePath(destinations[i]!);
  timer = setTimeout(async () => {
    try { await navigateTo(target); } finally { opening.value = null; }
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420);
}
function pointerDown(event: PointerEvent) {
  if (event.pointerType !== 'mouse') {
    // Focus events must not turn a first tap into immediate navigation.
    if (touched.value === null) touched.value = -1;
  } else touched.value = null;
}
function keyboard(event: KeyboardEvent, i: number) {
  touched.value = null;
  let next = i;
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (i + 1) % 5;
  else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (i + 4) % 5;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = 4;
  else if (event.key === 'Escape') { active.value = null; links.value[i]?.blur(); return; }
  else return;
  event.preventDefault(); links.value[next]?.focus();
}
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
  <div class="spatial-object" :class="{ paused, departing: opening !== null }">
    <nav class="stack-stage" :aria-label="copy.navigation" @pointerleave="active = touched !== null && touched >= 0 ? touched : null">
      <div class="stack-axis" aria-hidden="true" />
      <a v-for="(destination, i) in destinations" :key="destination" ref="links"
        :href="localePath(destination)" class="spatial-plane"
        :class="{ active: active === i, chosen: opening === i }"
        :style="{ '--i': i, zIndex: 5 - i }"
        :aria-label="`${copy.names[i]} — ${copy.open}`" :aria-describedby="active === i ? `${id}-context` : undefined"
        @pointerdown="pointerDown($event)" @pointerenter="event => { if (event.pointerType === 'mouse') active = i }"
        @focus="active = i" @blur="active = touched !== null && touched >= 0 ? touched : null"
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
.spatial-object { width: min(900px, 84vw, calc((100svh - 300px) * 1.1)); margin: auto; }
.stack-stage { position: relative; aspect-ratio: 720 / 650; animation: stack-breathe 9s ease-in-out infinite; }
.stack-axis { position: absolute; inset: 12% 48% 5%; border-left: 1px dashed var(--sp-line); transform: rotate(16deg); opacity: .5; }
.stack-stage::after { content: ''; position: absolute; width: 65%; height: 10%; background: var(--sp-shadow); filter: blur(26px); bottom: 0; left: 20%; border-radius: 50%; }
.spatial-plane { position: absolute; width: 100%; top: calc(var(--i) * 14%); display: block; color: var(--color-text); transition: transform 550ms cubic-bezier(.2,.8,.2,1), opacity 350ms; -webkit-tap-highlight-color: transparent; }
.spatial-plane svg { display: block; width: 100%; overflow: visible; pointer-events: none; filter: drop-shadow(0 16px 10px var(--sp-shadow)); }
.spatial-plane { clip-path: polygon(5.5% 38%, 55.5% 4%, 94.5% 48%, 94.5% 58%, 44.5% 96%, 5.5% 48%); }
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
@media (prefers-reduced-motion: reduce) { .stack-stage { animation: none; }.spatial-plane { transition: none; } }
</style>
