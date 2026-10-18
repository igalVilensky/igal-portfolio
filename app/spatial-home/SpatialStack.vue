<script setup lang="ts">
import { gsap } from "gsap";
import SpatialPlate from "./SpatialPlate.vue";
import WorkSurfaceArtwork from "./WorkSurfaceArtwork.vue";
import LayerSurfaceArtwork from "./LayerSurfaceArtwork.vue";
import {
  plateHitPath,
  projectWorkPlate,
  plateSide,
  plateThickness,
} from "./plateGeometry";
import { useActiveCore } from "./useActiveCore";
import { destinations, type SpatialCopy } from "./content";
import type { useSpatialNavigation } from "./useSpatialNavigation";
const props = defineProps<{
  copy: SpatialCopy;
  paused: boolean;
  navigation: ReturnType<typeof useSpatialNavigation>;
}>();
const {
  active,
  opening,
  links,
  activate,
  pointerDown,
  keyboard,
  enter,
  leave,
  focus,
  blur,
} = props.navigation;
// Every instance starts in its own CSS stack level and uses Work's exact clock.
const progress = destinations.map((_, i) =>
  useActiveCore(
    () => active.value === i,
    () => props.paused,
    900,
  ),
);
const route = useRoute();
const diagnostics = computed(
  () => import.meta.dev && route.query.geometry === "1",
);
const diagnosticPose = ref<number | null>(null);
const diagnosticWorkPose = computed(() =>
  route.query.workPose !== undefined
    ? Math.max(0, Math.min(1, Number(route.query.workPose) || 0))
    : null,
);
const poses = computed(() =>
  progress.map((clock, i) =>
    diagnostics.value &&
    (i === 0 ? diagnosticWorkPose.value : diagnosticPose.value) !== null
      ? i === 0
        ? diagnosticWorkPose.value!
        : diagnosticPose.value!
      : clock.value,
  ),
);
const workPose = computed(() => poses.value[0]!);
const askPose = computed(() => poses.value[2]!);
const previewRails = ref<number[]>([0, 0, 0, 0, 0]);
const geometries = computed(() =>
  poses.value.map((pose, i) => projectWorkPlate(pose, previewRails.value[i])),
);
// Read layout only on mount/resize. Rail length comes from the projected prism,
// actual per-layer origin, and available viewport, never individual X/Y offsets.
function fitPreviews() {
  const endpoint = projectWorkPlate(1);
  const bottom = Math.max(...endpoint.vertices.map((point) => point[1]));
  const scale = endpoint.projected[0]!.scale;
  previewRails.value = links.value.map((link, i) => {
    if (i === 0) return 0;
    const svg = link.querySelector<SVGSVGElement>(".plane-art");
    const matrix = svg?.getScreenCTM();
    if (!matrix) return 0;
    const projectedBottom = matrix.f + bottom * matrix.a;
    return Math.max(0, projectedBottom - (innerHeight - 32)) / matrix.a / scale;
  });
}
const diagnosticGeometry = computed(() => geometries.value[2]!);
const moving = computed(() => progress.some((clock) => clock.value > 0));
const localePath = useLocalePath();
const id = useId();
// Entrance owns only an inner SVG group; hover owns projected geometry and
// idle owns CSS translate on the outer SVG. No transform has two writers.
const root = ref<HTMLElement>();
const assembling = ref(true);
let entrance: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let reduced: MediaQueryList | undefined;
function settleEntrance() {
  entrance?.progress(1);
  assembling.value = false;
}
function motionPreference() {
  if (reduced?.matches) settleEntrance();
}
watch(
  () => props.paused,
  (value) => {
    if (value) settleEntrance();
  },
);
onMounted(() => {
  nextTick(fitPreviews);
  window.addEventListener("resize", fitPreviews);
  reduced = matchMedia("(prefers-reduced-motion: reduce)");
  reduced.addEventListener("change", motionPreference);
  if (
    reduced.matches ||
    props.paused ||
    active.value !== null ||
    !assembling.value
  ) {
    assembling.value = false;
    return;
  }
  const mobile = matchMedia("(max-width: 600px)").matches;
  const amount = mobile ? 0.55 : 1;
  context = gsap.context(() => {
    const groups = Array.from(
      root.value!.querySelectorAll<SVGGElement>(".assembly-component"),
    );
    const offsets = [
      [-22, -52, -1.3],
      [18, -31, 0.9],
      [-14, -8, -0.7],
      [16, 25, 1],
      [-12, 44, -0.8],
    ];
    entrance = gsap.timeline({
      onComplete: () => {
        assembling.value = false;
      },
    });
    groups.forEach((group, i) => {
      const [x, y, angle] = offsets[i]!;
      const start = i * (mobile ? 0.035 : 0.045);
      entrance!
        .fromTo(
          group,
          {
            attr: {
              transform: `translate(${x! * amount} ${y! * amount}) rotate(${angle! * amount} 359.38 127.31)`,
            },
            opacity: 0,
          },
          { opacity: 1, duration: 0.18, ease: "power1.out" },
          start,
        )
        .to(
          group,
          {
            attr: {
              transform: `translate(0 ${i < 2 ? 1 : -1}) rotate(0 359.38 127.31)`,
            },
            duration: mobile ? 0.56 : 0.7,
            ease: "power3.inOut",
          },
          start,
        )
        .to(
          group,
          {
            attr: { transform: "translate(0 0) rotate(0 359.38 127.31)" },
            duration: 0.14,
            ease: "power2.out",
          },
          start + (mobile ? 0.56 : 0.7),
        );
    });
    const pulseStart = mobile ? 0.86 : 1.03;
    groups.forEach((group, i) => {
      entrance!
        .to(
          group,
          { "--initialization": 1, duration: 0.07, ease: "power1.out" },
          pulseStart + i * 0.055,
        )
        .to(
          group,
          { "--initialization": 0, duration: 0.15, ease: "power2.out" },
          pulseStart + i * 0.055 + 0.07,
        );
    });
    // Remove every temporary attribute so the canonical rendering is exact.
    entrance.set(groups, { clearProps: "opacity,--initialization" });
    entrance.call(() =>
      groups.forEach((group) => group.removeAttribute("transform")),
    );
  }, root.value);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", fitPreviews);
  reduced?.removeEventListener("change", motionPreference);
  context?.revert();
});
</script>

<template>
  <div
    ref="root"
    class="spatial-object"
    @pointerover.capture="settleEntrance"
    @pointerdown.capture="settleEntrance"
    @focusin.capture="settleEntrance"
    @keydown.capture="settleEntrance"
    @click.capture="settleEntrance"
    @pointerleave="leave"
    :class="{
      assembling,
      paused,
      departing: opening !== null,
      'layer-active': active !== null,
      interacting: active !== null || moving || diagnosticPose !== null,
    }"
  >
    <nav class="stack-stage" :aria-label="copy.navigation">
      <a
        v-for="(destination, i) in destinations"
        :key="destination"
        ref="links"
        :href="localePath(destination)"
        class="spatial-plane"
        :class="{
          active: active === i,
          chosen: opening === i,
          'ask-plane': i === 2,
          'work-plane': i === 0,
          'experiments-plane': i === 1,
          'automation-plane': i === 3,
          'about-plane': i === 4,
        }"
        :style="{
          '--i': i,
          '--mobile-scale':
            0.78 + 0.22 * Math.max(0, Math.min(1, (poses[i]! - 1 / 3) * 1.5)),
          '--visual-order':
            poses[i]! > 1 / 3
              ? 10 + destinations.length - i
              : destinations.length - i,
          '--hit-order': 25 - i,
        }"
        :aria-label="
          active === i && poses[i]! >= 0.98
            ? copy.actions[i]
            : `${copy.names[i]} — ${copy.open}`
        "
        :aria-expanded="active === i"
        :aria-describedby="active === i ? `${id}-context` : undefined"
        @pointerdown="pointerDown($event)"
        @pointerenter="enter($event, i)"
        @focus="focus(i)"
        @blur="blur()"
        @keydown="keyboard($event, i)"
        @keydown.space.prevent="activate($event, i, poses[i]! >= (i === 0 ? 1 : 0.98))"
        @click="activate($event, i, poses[i]! >= (i === 0 ? 1 : 0.98))"
      >
        <!-- Stack order is fixed until extraction clears the stack. The complete
             prism, artwork and lighting then composite together in front of it.
             Stationary selection and moving preview hits stay independent. -->
        <svg class="plane-art" viewBox="0 0 720 260" aria-hidden="true">
          <defs>
            <linearGradient
              :id="`${id}-surface-${i}`"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop class="surface-start" />
              <stop offset="1" class="surface-end" />
            </linearGradient>
            <linearGradient :id="`${id}-side-${i}`" x1="0" y1="0" x2="0" y2="1">
              <stop class="side-start" />
              <stop offset="1" class="side-end" />
            </linearGradient>
            <radialGradient :id="`${id}-light-${i}`">
              <stop stop-color="var(--sp-cyan)" stop-opacity=".32" />
              <stop offset="1" stop-color="var(--sp-cyan)" stop-opacity="0" />
            </radialGradient>
          </defs>
          <g class="assembly-component">
            <SpatialPlate
              :index="i"
              :progress="poses[i]!"
              :geometry="geometries[i]!"
              :name="copy.names[i]!"
              :prefix="id"
              :illuminated="active === i"
              :paused="paused || active !== null || moving"
            >
              <template #surface="{ geometry }">
                <WorkSurfaceArtwork
                  v-if="i === 0"
                  :geometry="geometry"
                  :progress="workPose"
                  :cta="copy.actions[0]"
                />
                <LayerSurfaceArtwork
                  v-else
                  :layer="i"
                  :geometry="geometry"
                  :progress="poses[i]!"
                  :cta="copy.actions[i]!"
                />
              </template>
            </SpatialPlate>
          </g>
        </svg>
        <!-- Stationary selection and moving preview hits have distinct ownership. -->
        <svg class="plane-hit" viewBox="0 0 720 260" aria-hidden="true">
          <path :d="plateHitPath" />
        </svg>
        <svg
          v-if="active === i && poses[i]! > 0.02"
          class="plane-hit preview-hit"
          viewBox="0 0 720 260"
          aria-hidden="true"
        >
          <path :d="geometries[i]!.top" />
        </svg>
      </a>
      <div
        v-if="diagnostics"
        class="geometry-overlay spatial-plane"
        style="--i: 2; z-index: 6"
      >
        <svg class="plane-art" viewBox="0 0 720 260" aria-hidden="true">
          <g class="diagnostic-lines">
            <path :d="diagnosticGeometry.top" />
            <g
              v-for="(corner, i) in diagnosticGeometry.vertices.slice(0, 4)"
              :key="i"
            >
              <circle :cx="corner[0]" :cy="corner[1]" r="5" />
              <text :x="corner[0] + 8" :y="corner[1] - 8">{{ "ABCD"[i] }}</text>
            </g>
            <g v-for="axis in diagnosticGeometry.axes" :key="axis.name">
              <path
                :d="`M${diagnosticGeometry.center.join(' ')}L${axis.point.join(' ')}`"
              />
              <text :x="axis.point[0]" :y="axis.point[1] - 8">
                {{ axis.name }}
              </text>
            </g>
            <circle
              :cx="diagnosticGeometry.center[0]"
              :cy="diagnosticGeometry.center[1]"
              r="5"
            />
            <text
              :x="diagnosticGeometry.center[0] + 8"
              :y="diagnosticGeometry.center[1] + 18"
            >
              O
            </text>
          </g>
        </svg>
      </div>
    </nav>

    <aside
      v-if="diagnostics"
      class="geometry-panel"
      aria-label="Development geometry diagnostics"
    >
      <strong>Rigid-body diagnostics</strong>
      <p>
        Local square: {{ plateSide.toFixed(3) }} × {{ plateSide.toFixed(3)
        }}<br />Thickness: {{ plateThickness.toFixed(3) }}
      </p>
      <p>
        Rotation:
        {{
          ((diagnosticGeometry.rotationAngle * 180) / Math.PI).toFixed(1)
        }}°<br />Yaw:
        {{
          ((diagnosticGeometry.angle * 180) / Math.PI).toFixed(1)
        }}°<br />Pivot: (0, 0, 0), fixed
      </p>
      <p>
        A–D mark physical corners. X/Y/Z are local axes. Screen lengths change
        with camera depth; physical lengths stay constant.
      </p>
      <label
        >Review pose
        <input
          aria-label="Review rotation"
          type="range"
          min="0"
          max="1"
          step="0.001"
          :value="askPose"
          @input="
            diagnosticPose = Number(($event.target as HTMLInputElement).value)
          "
      /></label>
      <button type="button" @click="diagnosticPose = null">
        Live hover / focus
      </button>
    </aside>
    <div
      :id="`${id}-context`"
      class="spatial-context"
      aria-live="polite"
      aria-atomic="true"
    >
      <template v-if="active !== null"
        ><p>
          {{ copy.names[active] }} <span aria-hidden="true">/</span>
          <span class="context-action"
            >{{ opening !== null ? copy.opening : copy.open }} ↗</span
          >
        </p>
        <span>{{ copy.descriptions[active] }}</span></template
      >
      <template v-else
        ><p>{{ copy.idle }}</p>
        <span class="desktop-hint">{{ copy.hint }}</span
        ><span class="touch-hint">{{ copy.touch }}</span></template
      >
    </div>
  </div>
</template>

<style scoped>
/* SSR and hydration share the hidden first frame; reduced motion is visible
   immediately, including before hydration. Hit paths remain available. */
.assembling .assembly-component {
  opacity: 0;
}
.assembling .stack-stage,
.assembling .plane-art {
  animation: none;
}
@media (prefers-reduced-motion: reduce) {
  .assembling .assembly-component {
    opacity: 1;
  }
}
.geometry-overlay {
  pointer-events: none;
}
.spatial-plane.geometry-overlay .plane-art {
  filter: none;
}
.diagnostic-lines {
  fill: none;
  stroke: var(--color-text);
  stroke-width: 1.5;
}
.diagnostic-lines text {
  fill: var(--color-text);
  stroke: none;
  font: 14px monospace;
}
.geometry-panel {
  position: fixed;
  right: 12px;
  top: 100px;
  width: 230px;
  padding: 14px;
  background: var(--sp-bottom);
  color: var(--color-text);
  border: 1px solid var(--sp-line);
  z-index: 20;
  font: 12px/1.5 monospace;
}
.geometry-panel p {
  margin: 8px 0;
}
.geometry-panel input {
  width: 100%;
}
.geometry-panel button {
  border: 1px solid currentColor;
  padding: 4px;
  margin-top: 8px;
}
@media (max-width: 600px) {
  .geometry-panel {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
  }
}
.spatial-object {
  position: relative;
  z-index: 2;
  width: min(900px, 84vw, calc((100svh - 300px) * 1.1));
  margin: auto;
}
.stack-stage {
  pointer-events: none;
  position: relative;
  aspect-ratio: 720 / 650;
  animation: stack-breathe 7s ease-in-out infinite;
}
.stack-stage::after {
  content: "";
  position: absolute;
  width: 65%;
  height: 10%;
  background: var(--sp-shadow);
  filter: blur(18px);
  bottom: 0;
  left: 20%;
  border-radius: 50%;
}
.spatial-plane {
  position: absolute;
  width: 100%;
  top: calc(var(--i) * 14%);
  display: block;
  color: var(--color-text);
  transition:
    transform 550ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 350ms,
    translate 550ms;
  -webkit-tap-highlight-color: transparent;
}
.spatial-plane .plane-art {
  position: relative;
  z-index: var(--visual-order);
  display: block;
  width: 100%;
  overflow: visible;
  pointer-events: none;
  filter: drop-shadow(0 16px 10px var(--sp-shadow));
}
.spatial-plane {
  pointer-events: none;
}
.plane-art {
  transition: transform 550ms cubic-bezier(0.2, 0.8, 0.2, 1);
  animation: layer-breathe 7s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.65s);
}
.spatial-plane .plane-hit {
  z-index: var(--hit-order);
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.spatial-plane .preview-hit {
  z-index: 30;
}
/* Input-only resting geometry must never inherit a visible SVG stroke. */
.plane-hit path {
  fill: transparent;
  stroke: none;
  pointer-events: auto;
}
.side-start {
  stop-color: var(--sp-edge);
}
.side-end {
  stop-color: var(--sp-bottom);
}
.surface-start {
  stop-color: var(--sp-top);
}
.surface-end {
  stop-color: var(--sp-bottom);
}
.spatial-plane:focus-visible {
  outline: none;
}
.spatial-context {
  text-align: center;
  min-height: 72px;
  padding: 8px 0;
  font-size: 13px;
  color: var(--color-text-muted);
}
.spatial-context p {
  color: var(--color-text);
  font-size: 15px;
  margin-bottom: 5px;
}
.spatial-context p > span {
  margin-left: 12px;
}
.context-action {
  color: var(--color-accent);
  font-size: 12px;
}
.touch-hint {
  display: none;
}
.paused .stack-stage,
.interacting .stack-stage,
.departing .stack-stage,
.paused .plane-art,
.interacting .plane-art,
.departing .plane-art {
  animation-play-state: paused;
}
@keyframes stack-breathe {
  0%,
  100% {
    translate: 0 3px;
  }
  50% {
    translate: 0 -9px;
  }
}
@keyframes layer-breathe {
  0%,
  100% {
    translate: 0 1px;
  }
  50% {
    translate: 0 -2px;
  }
}
@media (max-width: 600px) {
  .spatial-object {
    width: min(100%, 440px);
  }
  .stack-stage {
    aspect-ratio: 400 / 470;
  }
  .spatial-plane {
    top: calc(var(--i) * 18%);
  }
  .spatial-object .spatial-plane.active .plane-art,
  .spatial-object.departing .chosen .plane-art,
  .spatial-plane .plane-art,
  .spatial-plane .plane-hit {
    transform: scaleY(var(--mobile-scale));
    transform-origin: top center;
  }
  .spatial-context {
    min-height: 94px;
    padding: 14px 8px 0;
  }
  .desktop-hint {
    display: none;
  }
  .touch-hint {
    display: inline;
  }
  .stack-stage {
    animation-duration: 8s;
  }
  .plane-art {
    animation: none;
  }
}
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .spatial-context {
    min-height: 124px;
    padding: 64px 8px 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .stack-stage,
  .plane-art,
  .plane-corner {
    animation: none;
  }
  .spatial-plane,
  .plane-art,
  .plane-light,
  .plane-spill,
  .plane-contact,
  .work-source {
    transition: none;
  }
}

/* All accents and material states belong to the same rotating geometry. */
.work-plane {
  --sp-cyan: #368aff;
}
.experiments-plane {
  --sp-cyan: #9871df;
}
.ask-plane {
  --sp-cyan: #20b8bd;
}
.automation-plane {
  --sp-cyan: #ed922b;
}
.about-plane {
  --sp-cyan: var(--about-layer-light);
}
:global(.dark) .ask-plane {
  --sp-cyan: #6dddec;
}
.spatial-plane.active .plane-art,
.departing .chosen .plane-art {
  transform: none;
}
.spatial-plane:focus-visible :deep(.plane-rim) {
  stroke: var(--sp-cyan);
  stroke-width: 3;
  stroke-dasharray: 6 4;
}
</style>
