<script setup lang="ts">
import SpatialPlate from './SpatialPlate.vue';
import WorkSurfaceArtwork from './WorkSurfaceArtwork.vue';
import LayerSurfaceArtwork from './LayerSurfaceArtwork.vue';
import { plateHitPath, projectPlate, plateSide, plateThickness } from './plateGeometry';
import { useActiveCore } from './useActiveCore';
import { destinations, type SpatialCopy } from './content';
import type { useSpatialNavigation } from './useSpatialNavigation';
const props = defineProps<{ copy: SpatialCopy; paused: boolean; navigation: ReturnType<typeof useSpatialNavigation> }>();
const { active, opening, links, activate, pointerDown, keyboard, enter, leave, focus, blur } = props.navigation;
const workProgress = useActiveCore(() => active.value === 0, () => props.paused);
const workPose = computed(() => workProgress.value ** 2 * (3 - 2 * workProgress.value));
const experimentsProgress = useActiveCore(() => active.value === 1, () => props.paused);
const experimentsPose = computed(() => experimentsProgress.value ** 2 * (3 - 2 * experimentsProgress.value));
const askProgress = useActiveCore(() => active.value === 2, () => props.paused);
const route = useRoute();
const diagnostics = computed(() => import.meta.dev && route.query.geometry === '1');
const diagnosticPose = ref<number | null>(null);
const askPose = computed(() => diagnostics.value && diagnosticPose.value !== null ? diagnosticPose.value : askProgress.value ** 2 * (3 - 2 * askProgress.value));
const diagnosticGeometry = computed(() => projectPlate(askPose.value));
const aiProgress = useActiveCore(() => active.value === 3, () => props.paused);
const aiPose = computed(() => aiProgress.value ** 2 * (3 - 2 * aiProgress.value));
const aboutProgress = useActiveCore(() => active.value === 4, () => props.paused);
const aboutPose = computed(() => aboutProgress.value ** 2 * (3 - 2 * aboutProgress.value));
const poses = computed(() => [workPose.value, experimentsPose.value, askPose.value, aiPose.value, aboutPose.value]);
const moving = computed(() => [workProgress, experimentsProgress, askProgress, aiProgress, aboutProgress].some(progress => progress.value > 0));
const localePath = useLocalePath();
const id = useId();
</script>

<template>
  <div class="spatial-object" @pointerleave="leave" :class="{ paused, departing: opening !== null, 'layer-active': active !== null, interacting: active !== null || moving || diagnosticPose !== null }">
    <nav class="stack-stage" :aria-label="copy.navigation">
      <a v-for="(destination, i) in destinations" :key="destination" ref="links"
        :href="localePath(destination)" class="spatial-plane"
        :class="{ active: active === i, chosen: opening === i, 'ask-plane': i === 2, 'work-plane': i === 0, 'experiments-plane': i === 1, 'automation-plane': i === 3, 'about-plane': i === 4 }"
        :style="{ '--i': i, '--visual-order': destinations.length - i, '--hit-order': 25 - i }"
        :aria-label="`${copy.names[i]} — ${copy.open}`" :aria-describedby="active === i ? `${id}-context` : undefined"
        @pointerdown="pointerDown($event)" @pointerenter="enter($event, i)"
        @pointerleave="leave()"
        @focus="focus(i)" @blur="blur()"
        @keydown="keyboard($event, i)" @click="activate($event, i)">

        <!-- Fixed elevation order: each SVG composites the complete prism, artwork,
             lighting and shadow before the plate above it. Selection never changes
             this order. Separate stationary hit paths keep neighboring input stable. -->
        <svg class="plane-art" viewBox="0 0 720 260" aria-hidden="true">
          <defs>
            <linearGradient :id="`${id}-surface-${i}`" x1="0" y1="0" x2="1" y2="1"><stop class="surface-start"/><stop offset="1" class="surface-end"/></linearGradient>
            <linearGradient :id="`${id}-side-${i}`" x1="0" y1="0" x2="0" y2="1"><stop class="side-start"/><stop offset="1" class="side-end"/></linearGradient>
            <radialGradient :id="`${id}-light-${i}`"><stop stop-color="var(--sp-cyan)" stop-opacity=".32"/><stop offset="1" stop-color="var(--sp-cyan)" stop-opacity="0"/></radialGradient>
          </defs>
          <SpatialPlate :index="i" :progress="poses[i]!" :name="copy.names[i]!" :prefix="id"
            :illuminated="active === i" :paused="paused || active !== null || moving">
            <template #surface="{ geometry }">
              <WorkSurfaceArtwork v-if="i === 0" :geometry="geometry" :progress="workPose" />
              <LayerSurfaceArtwork v-else :layer="i" :geometry="geometry" :progress="poses[i]!" />
            </template>
          </SpatialPlate>
        </svg>
        <!-- Stationary geometry owns input; illuminated artwork never changes hit testing. -->
        <svg class="plane-hit" viewBox="0 0 720 260" aria-hidden="true"><path :d="plateHitPath" /></svg>
      </a>
      <div v-if="diagnostics" class="geometry-overlay spatial-plane" style="--i: 2; z-index: 6">
        <svg class="plane-art" viewBox="0 0 720 260" aria-hidden="true">
          <g class="diagnostic-lines">
            <path :d="diagnosticGeometry.top" />
            <g v-for="(corner, i) in diagnosticGeometry.vertices.slice(0, 4)" :key="i">
              <circle :cx="corner[0]" :cy="corner[1]" r="5" />
              <text :x="corner[0] + 8" :y="corner[1] - 8">{{ 'ABCD'[i] }}</text>
            </g>
            <g v-for="axis in diagnosticGeometry.axes" :key="axis.name">
              <path :d="`M${diagnosticGeometry.center.join(' ')}L${axis.point.join(' ')}`" />
              <text :x="axis.point[0]" :y="axis.point[1] - 8">{{ axis.name }}</text>
            </g>
            <circle :cx="diagnosticGeometry.center[0]" :cy="diagnosticGeometry.center[1]" r="5" />
            <text :x="diagnosticGeometry.center[0] + 8" :y="diagnosticGeometry.center[1] + 18">O</text>
          </g>
        </svg>
      </div>
    </nav>

    <aside v-if="diagnostics" class="geometry-panel" aria-label="Development geometry diagnostics">
      <strong>Rigid-body diagnostics</strong>
      <p>Local square: {{ plateSide.toFixed(3) }} × {{ plateSide.toFixed(3) }}<br>Thickness: {{ plateThickness.toFixed(3) }}</p>
      <p>Rotation: {{ (diagnosticGeometry.rotationAngle * 180 / Math.PI).toFixed(1) }}°<br>Yaw: {{ (diagnosticGeometry.angle * 180 / Math.PI).toFixed(1) }}°<br>Pivot: (0, 0, 0), fixed</p>
      <p>A–D mark physical corners. X/Y/Z are local axes. Screen lengths change with camera depth; physical lengths stay constant.</p>
      <label>Review pose <input aria-label="Review rotation" type="range" min="0" max="1" step="0.001" :value="askPose" @input="diagnosticPose = Number(($event.target as HTMLInputElement).value)"></label>
      <button type="button" @click="diagnosticPose = null">Live hover / focus</button>
    </aside>
    <div :id="`${id}-context`" class="spatial-context" aria-live="polite" aria-atomic="true">
      <template v-if="active !== null"><p>{{ copy.names[active] }} <span aria-hidden="true">/</span> <span class="context-action">{{ opening !== null ? copy.opening : copy.open }} ↗</span></p><span>{{ copy.descriptions[active] }}</span></template>
      <template v-else><p>{{ copy.idle }}</p><span class="desktop-hint">{{ copy.hint }}</span><span class="touch-hint">{{ copy.touch }}</span></template>
    </div>
  </div>
</template>

<style scoped>
.geometry-overlay { pointer-events: none; }
.spatial-plane.geometry-overlay .plane-art { filter: none; }
.diagnostic-lines { fill: none; stroke: var(--color-text); stroke-width: 1.5; }
.diagnostic-lines text { fill: var(--color-text); stroke: none; font: 14px monospace; }
.geometry-panel { position: fixed; right: 12px; top: 100px; width: 230px; padding: 14px; background: var(--sp-bottom); color: var(--color-text); border: 1px solid var(--sp-line); z-index: 20; font: 12px/1.5 monospace; }
.geometry-panel p { margin: 8px 0; }
.geometry-panel input { width: 100%; }
.geometry-panel button { border: 1px solid currentColor; padding: 4px; margin-top: 8px; }
@media(max-width: 600px) { .geometry-panel { position: relative; top: auto; right: auto; width: 100%; } }
.spatial-object { position: relative; z-index: 2; width: min(900px, 84vw, calc((100svh - 300px) * 1.1)); margin: auto; }
.stack-stage { pointer-events: none; position: relative; aspect-ratio: 720 / 650; animation: stack-breathe 7s ease-in-out infinite; }
.stack-stage::after { content: ''; position: absolute; width: 65%; height: 10%; background: var(--sp-shadow); filter: blur(18px); bottom: 0; left: 20%; border-radius: 50%; }
.spatial-plane { position: absolute; width: 100%; top: calc(var(--i) * 14%); display: block; color: var(--color-text); transition: transform 550ms cubic-bezier(.2,.8,.2,1), opacity 350ms, translate 550ms; -webkit-tap-highlight-color: transparent; }
.spatial-plane .plane-art { position: relative; z-index: var(--visual-order); display: block; width: 100%; overflow: visible; pointer-events: none; filter: drop-shadow(0 16px 10px var(--sp-shadow)); }
.spatial-plane { pointer-events: none; }
.plane-art { transition: transform 550ms cubic-bezier(.2,.8,.2,1); animation: layer-breathe 7s ease-in-out infinite; animation-delay: calc(var(--i) * -.65s); }
.spatial-plane .plane-hit { z-index: var(--hit-order); position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
/* Input-only resting geometry must never inherit a visible SVG stroke. */
.plane-hit path { fill: transparent; stroke: none; pointer-events: auto; }
.side-start { stop-color: var(--sp-edge); }.side-end { stop-color: var(--sp-bottom); }
.surface-start { stop-color: var(--sp-top); }.surface-end { stop-color: var(--sp-bottom); }
.spatial-plane:focus-visible { outline: none; }
.spatial-context { text-align: center; min-height: 72px; padding: 8px 0; font-size: 13px; color: var(--color-text-muted); }
.spatial-context p { color: var(--color-text); font-size: 15px; margin-bottom: 5px; }.spatial-context p > span { margin-left: 12px; }.context-action { color: var(--color-accent); font-size: 12px; }
.touch-hint { display: none; }.paused .stack-stage, .interacting .stack-stage, .departing .stack-stage, .paused .plane-art, .interacting .plane-art, .departing .plane-art { animation-play-state: paused; }
@keyframes stack-breathe { 0%,100% { translate: 0 3px; } 50% { translate: 0 -9px; } }
@keyframes layer-breathe { 0%,100% { translate: 0 1px; } 50% { translate: 0 -2px; } }
@media (max-width: 600px) {
  .spatial-object { width: min(100%, 440px); }
  .stack-stage { aspect-ratio: 400 / 470; }
  .spatial-plane { top: calc(var(--i) * 18%); }
  .spatial-object .spatial-plane.active .plane-art, .spatial-object.departing .chosen .plane-art, .spatial-plane .plane-art, .spatial-plane .plane-hit { transform: scaleY(.78); transform-origin: top center; }
  .spatial-context { min-height: 94px; padding: 14px 8px 0; }
  .desktop-hint { display: none; }.touch-hint { display: inline; }
  .stack-stage { animation-duration: 8s; }.plane-art { animation: none; }
}
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .spatial-context { min-height: 124px; padding: 64px 8px 0; }
}
@media (prefers-reduced-motion: reduce) { .stack-stage, .plane-art, .plane-corner { animation: none; }.spatial-plane, .plane-art, .plane-light, .plane-spill, .plane-contact, .work-source { transition: none; } }

/* All accents and material states belong to the same rotating geometry. */
.work-plane { --sp-cyan: #368aff; }
.experiments-plane { --sp-cyan: #9871df; }
.ask-plane { --sp-cyan: #20b8bd; }
.automation-plane { --sp-cyan: #dc963f; }
.about-plane { --sp-cyan: var(--about-layer-light); }
:global(.dark) .ask-plane { --sp-cyan: #6dddec; }
.spatial-plane.active .plane-art, .departing .chosen .plane-art { transform: none; }
.spatial-plane:focus-visible :deep(.plane-rim) { stroke: var(--sp-cyan); stroke-width: 3; stroke-dasharray: 6 4; }
</style>
