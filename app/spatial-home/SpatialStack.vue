<script setup lang="ts">
import { destinations, type SpatialCopy } from './content';
import type { useSpatialNavigation } from './useSpatialNavigation';
const props = defineProps<{ copy: SpatialCopy; paused: boolean; navigation: ReturnType<typeof useSpatialNavigation> }>();
const emit = defineEmits<{ 'ask-origin': [point: { x: number; y: number; bottom: number; exitX: number; exitY: number }]; origin: [point: { x: number; y: number; bottom: number }] }>();
const { active, opening, links, activate, pointerDown, keyboard, enter, leave, focus, blur } = props.navigation;
const localePath = useLocalePath();
const id = useId();
const stage = ref<HTMLElement>();
// Right-facing edge: (320,224) → (680,126), with a vertical 22-unit side.
// The affine basis follows that face exactly at every responsive SVG size.
const labelTransform = `matrix(1 ${ (126 - 224) / (680 - 320) } 0 1 320 224)`;
const directions = [-1, 1, -1, 1, -1] as const;
let observer: ResizeObserver | undefined;
let askFrame = 0;
function measureAsk() {
  if (!stage.value) return;
  const rect = stage.value.getBoundingClientRect();
  const svg = stage.value.querySelectorAll('a')[2]?.querySelector('svg');
  const home = stage.value.closest('main')?.getBoundingClientRect();
  const matrix = svg?.getScreenCTM();
  if (svg && matrix && home) {
    const entry = new DOMPoint(40, 100).matrixTransform(matrix);
    const exit = new DOMPoint(680, 126).matrixTransform(matrix);
    emit('ask-origin', { bottom: rect.bottom - home.top, x: entry.x - home.left, y: entry.y - home.top, exitX: exit.x - home.left, exitY: exit.y - home.top });
  }
}
function measure() {
  if (!stage.value) return;
  const rect = stage.value.getBoundingClientRect();
  measureAsk();
  const compact = window.matchMedia('(max-width: 600px)').matches;
  emit('origin', { bottom: rect.bottom + window.scrollY, x: rect.left + rect.width * (compact ? .944 : .926), y: rect.top + window.scrollY + (compact ? rect.width * .1365 - 7 : rect.width * .16) });
}
watch(active, (value, previous) => {
  if (value !== 2 && previous !== 2) return;
  cancelAnimationFrame(askFrame);
  // Follow only the existing layer transition; no permanent animation loop.
  const until = performance.now() + 600;
  const follow = () => { measureAsk(); if (performance.now() < until) askFrame = requestAnimationFrame(follow); };
  askFrame = requestAnimationFrame(follow);
});
onMounted(() => {
  observer = new ResizeObserver(measure);
  observer.observe(document.documentElement);
  observer.observe(stage.value!);
  window.addEventListener('resize', measure);
  measure();
});
onBeforeUnmount(() => { cancelAnimationFrame(askFrame); observer?.disconnect(); window.removeEventListener('resize', measure); });
</script>

<template>
  <div class="spatial-object" :class="{ paused, departing: opening !== null, 'work-active': active === 0, interacting: active !== null }">
    <nav ref="stage" class="stack-stage" :aria-label="copy.navigation">
      <div class="stack-axis" aria-hidden="true" />
      <a v-for="(destination, i) in destinations" :key="destination" ref="links"
        :href="localePath(destination)" class="spatial-plane"
        :class="{ active: active === i, chosen: opening === i }"
        :style="{ '--i': i, '--direction': directions[i], zIndex: 5 - i }"
        :aria-label="`${copy.names[i]} — ${copy.open}`" :aria-describedby="active === i ? `${id}-context` : undefined"
        @pointerdown="pointerDown($event)" @pointerenter="enter($event, i)"
        @pointerleave="leave"
        @focus="focus(i)" @blur="blur"
        @keydown="keyboard($event, i)" @click="activate($event, i)">
        <svg class="plane-art" viewBox="0 0 720 260" aria-hidden="true">
          <defs>
            <linearGradient :id="`${id}-surface-${i}`" x1="0" y1="0" x2="1" y2="1"><stop class="surface-start"/><stop offset="1" class="surface-end"/></linearGradient>
            <linearGradient :id="`${id}-side-${i}`" x1="0" y1="0" x2="0" y2="1"><stop class="side-start"/><stop offset="1" class="side-end"/></linearGradient>
            <radialGradient :id="`${id}-light-${i}`"><stop stop-color="var(--sp-cyan)" stop-opacity=".32"/><stop offset="1" stop-color="var(--sp-cyan)" stop-opacity="0"/></radialGradient>
            <pattern :id="`${id}-grid-${i}`" width="32" height="16" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)"><path d="M32 0H0V16" class="plane-grid" /></pattern>
          </defs>
          <path class="plane-contact" d="M40 119 320 243 680 145 680 158 320 257 40 135Z" />
          <path class="plane-edge" :fill="`url(#${id}-side-${i})`" d="M40 100 400 12 680 126V148L320 246 40 122Z" />
          <path class="plane-face" :fill="`url(#${id}-surface-${i})`" d="M40 100 400 12 680 126 320 224Z" />
          <path :fill="`url(#${id}-grid-${i})`" d="M40 100 400 12 680 126 320 224Z" />
          <path class="plane-light" :fill="`url(#${id}-light-${i})`" d="M40 100 400 12 680 126 320 224Z" />
          <path class="plane-side-shade" d="M40 100 320 224V246L40 122Z" />
          <path class="plane-inset" d="M76 101 398 29 645 125 321 205Z M107 101 397 43 613 124" />
          <path class="plane-trace" :d="i % 2 ? 'M145 94 245 72 300 94 390 75 494 116 460 125' : 'M190 126 269 107 322 129 436 102 535 140'" />
          <path v-if="i === 0" class="work-source" d="M310 98 370 83 414 102 355 118Z M40 100 400 12 680 126" />
          <path v-if="i === 2" class="ask-circuit" pathLength="1" d="M40 100 320 224 680 126" />
          <path v-if="i === 2" class="ask-core-light" d="M280 206 320 216 360 206 320 224Z" />
          <path v-if="i === 1" class="experiments-circuit" pathLength="1" d="M40 100 180 162 230 150 340 198 410 179 455 187 680 126" />
          <path class="plane-core" d="M310 98 370 83 414 102 355 118Z M310 104 355 125 414 109" />
          <path class="plane-rim" d="M40 100 320 224 680 126 M320 224V246" />
          <path class="plane-corner" d="M40 115V100L78 91 M644 136 680 126V141" />
          <path class="plane-spill" d="M40 103 320 227 680 129" />
          <g :transform="labelTransform" class="plane-label">
            <text x="16" y="17" class="plane-number">0{{ i + 1 }}</text>
            <text x="48" y="18" class="plane-title"><template v-if="i === 2"><tspan v-for="(letter, index) in copy.names[i]" :key="index" :class="{ 'ai-initial': index === 0 || index === 4 }" xml:space="preserve">{{ letter }}</tspan></template><template v-else>{{ copy.names[i] }}</template></text>
            <text x="324" y="18" class="plane-arrow">↗</text>
          </g>
        </svg>
        <!-- Stationary geometry owns input; illuminated artwork never changes hit testing. -->
        <svg class="plane-hit" viewBox="0 0 720 260" aria-hidden="true"><path d="M40 100 400 12 680 126V148L320 246 40 122Z" /></svg>
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
.stack-stage { position: relative; aspect-ratio: 720 / 650; animation: stack-breathe 7s ease-in-out infinite; }
.stack-axis { position: absolute; inset: 12% 48% 5%; border-left: 1px dashed var(--sp-line); transform: rotate(16deg); opacity: .5; }
.stack-stage::after { content: ''; position: absolute; width: 65%; height: 10%; background: var(--sp-shadow); filter: blur(18px); bottom: 0; left: 20%; border-radius: 50%; }
.spatial-plane { position: absolute; width: 100%; top: calc(var(--i) * 14%); display: block; color: var(--color-text); transition: transform 550ms cubic-bezier(.2,.8,.2,1), opacity 350ms, translate 550ms; -webkit-tap-highlight-color: transparent; }
.spatial-plane .plane-art { display: block; width: 100%; overflow: visible; pointer-events: none; filter: drop-shadow(0 16px 10px var(--sp-shadow)); }
.spatial-plane { pointer-events: none; }
.plane-art { transition: transform 550ms cubic-bezier(.2,.8,.2,1); animation: layer-breathe 7s ease-in-out infinite; animation-delay: calc(var(--i) * -.65s); }
.spatial-plane .plane-hit { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.plane-hit path { fill: transparent; pointer-events: auto; }
.plane-contact { fill: var(--sp-shadow); opacity: .48; transition: opacity .4s; }
.side-start { stop-color: var(--sp-edge); }.side-end { stop-color: var(--sp-bottom); }
.plane-side-shade { fill: #061728; opacity: .23; }
.plane-light { opacity: .12; transition: opacity .4s; }
.plane-spill { fill: none; stroke: var(--sp-cyan); stroke-width: 7; opacity: 0; transition: opacity .4s; }
.work-source { fill: none; stroke: var(--sp-cyan); stroke-width: 3; opacity: 0; transition: opacity .3s; filter: drop-shadow(0 0 7px var(--sp-cyan)); }
.work-active .work-source { opacity: 1; }
.ask-circuit { fill: none; stroke: var(--sp-cyan); stroke-width: 3; stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.ask-suppressed .ask-circuit, .ask-suppressed .ask-core-light { visibility: hidden; }
.experiments-circuit { fill: none; stroke: var(--sp-cyan); stroke-width: 3; stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.ask-core-light { fill: var(--sp-cyan); opacity: 0; }
.plane-face { stroke: var(--sp-line); stroke-width: 1.2; }
.surface-start { stop-color: var(--sp-top); }.surface-end { stop-color: var(--sp-bottom); }
.plane-edge { stroke: var(--sp-line); }
.plane-grid { fill: none; stroke: var(--sp-line); stroke-width: .5; opacity: .18; }
.plane-inset, .plane-trace, .plane-core, .plane-rim, .plane-corner { fill: none; stroke: var(--sp-line); stroke-width: 1; }
.plane-trace { stroke: var(--sp-cyan); opacity: .45; }.plane-core { stroke: var(--color-accent); stroke-width: 2; }
.plane-corner { stroke: var(--sp-cyan); stroke-width: 3; animation: edge-drift 7s ease-in-out infinite; animation-delay: calc(var(--i) * -.65s); }
@keyframes edge-drift { 0%,100% { opacity: .45; } 50% { opacity: .95; } }
.paused .plane-corner, .interacting .plane-corner { animation-play-state: paused; }.active .plane-corner { opacity: 1; animation: none; }
.plane-label { fill: var(--color-text); font-size: 19px; font-weight: 500; }
.plane-number { font: 12px var(--font-mono); fill: var(--color-text-muted); }
.plane-arrow, .ai-initial { fill: var(--sp-cyan); }.ai-initial { font-weight: 750; }
.spatial-plane.active .plane-art { transform: translate(calc(var(--direction) * 1.7%), -3%); }
.spatial-plane.active .plane-face { stroke: var(--sp-cyan); stroke-width: 2; }
.spatial-plane:focus-visible { outline: none; }.spatial-plane:focus-visible .plane-inset { stroke: var(--sp-cyan); stroke-width: 2; stroke-dasharray: 6 4; }
.spatial-plane.active .plane-core, .spatial-plane.active .plane-rim { stroke: var(--sp-cyan); stroke-width: 2.5; }
.spatial-plane.active .plane-light { opacity: 1; }
.spatial-plane.active .plane-spill { opacity: .16; }
.spatial-plane.active .plane-contact { opacity: .95; }
.spatial-plane.active .plane-title { font-weight: 650; }
.departing .spatial-plane:not(.chosen) { opacity: .25; }.departing .chosen .plane-art { transform: translate(calc(var(--direction) * 2%), -7%); }
.spatial-context { text-align: center; min-height: 72px; padding: 8px 0; font-size: 13px; color: var(--color-text-muted); }
.spatial-context p { color: var(--color-text); font-size: 15px; margin-bottom: 5px; }.spatial-context p > span { margin-left: 12px; }.context-action { color: var(--color-accent); font-size: 12px; }
.touch-hint { display: none; }.paused .stack-stage, .interacting .stack-stage, .departing .stack-stage, .paused .plane-art, .interacting .plane-art, .departing .plane-art { animation-play-state: paused; }
@keyframes stack-breathe { 0%,100% { translate: 0 3px; } 50% { translate: 0 -9px; } }
@keyframes layer-breathe { 0%,100% { translate: 0 1px; } 50% { translate: 0 -2px; } }
@media (max-width: 600px) {
  .spatial-object { width: min(100%, 440px); }
  .stack-stage { aspect-ratio: 400 / 470; }
  .spatial-plane { top: calc(var(--i) * 18%); transform: scaleY(.78); transform-origin: top center; }
  .plane-label { font-size: 22px; }.plane-title { transform: translateX(-24px); }
  .plane-number { display: none; }.spatial-context { min-height: 94px; padding: 14px 8px 0; }
  .desktop-hint { display: none; }.touch-hint { display: inline; }
  .stack-stage { animation-duration: 8s; }.plane-art { animation: none; }
}
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .spatial-context { min-height: 124px; padding: 64px 8px 0; }
}
@media (prefers-reduced-motion: reduce) { .stack-stage, .plane-art, .plane-corner { animation: none; }.spatial-plane, .plane-art, .plane-light, .plane-spill, .plane-contact, .work-source { transition: none; } }
</style>
