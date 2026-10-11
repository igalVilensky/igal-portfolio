<script setup lang="ts">
import { gsap } from 'gsap';
const props = defineProps<{ visible: boolean; label: string; phrase: string }>();
const root = ref<HTMLElement>();
let motion: gsap.core.Timeline | undefined;
let media: gsap.MatchMedia | undefined;
watch(() => props.visible, visible => {
  if (!motion) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) motion.progress(visible ? 1 : 0).pause();
  else if (visible) motion.play();
  else motion.reverse();
});
onMounted(() => {
  media = gsap.matchMedia();
  media.add({ compact: '(max-width: 1100px), (max-aspect-ratio: 6/5)', reduce: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 1101px) and (min-aspect-ratio: 6/5)' }, context => {
    const select = gsap.utils.selector(root.value!);
    // A single playhead reverses from its current position, including interrupted hovers.
    motion = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
      .fromTo(select('.edge-impulse'), { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: .3 }, 0)
      .fromTo(select('.unfold-left, .unfold-right'), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: .5 }, .1)
      .fromTo(select('.fold-line'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .45 }, .12)
      .fromTo(select('.projection'), { opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: .3 }, .4)
      .fromTo(select('.assembly-fragment'), { y: 10 }, { y: 0, duration: .32 }, .38)
      .to(select('.edge-impulse'), { opacity: .22, duration: .3 }, .35);
    motion.progress(props.visible ? 1 : 0);
    if (context.conditions?.reduce) motion.pause();
    return () => { motion = undefined; };
  }, root.value);
});
onBeforeUnmount(() => media?.revert());
</script>

<template>
  <div ref="root" class="work-reveal" :class="{ visible }" :aria-hidden="!visible">
    <div class="work-attachment">
    <svg class="work-edge" viewBox="0 0 720 260" fill="none" aria-hidden="true">
      <path class="edge-impulse" pathLength="1" d="M400 12 40 100 M400 12 680 126" />
    </svg>
    <div class="work-caption unfold-left">
      <svg class="caption-frame" viewBox="0 0 280 150" preserveAspectRatio="none" aria-hidden="true">
        <path class="fold-line" pathLength="1" d="M280 74 235 124H0 M280 74 235 4H0 M235 4V124" />
        <path class="fold-surface" d="M280 74 235 4V124Z" />
      </svg>
      <div class="caption-copy projection">
      <p>{{ label }} <span>/ 01</span></p>
      <h2>{{ phrase }}</h2>
      </div>
    </div>
    <div class="assembly-anchor unfold-right">
    <svg class="work-assembly" viewBox="0 0 340 230" fill="none" aria-hidden="true">
      <g class="assembly-thread"><path class="fold-line" pathLength="1" d="M0 150 78 28H316 M0 150 109 210H316 M0 150H39L86 103H128 M39 150L109 186H231L273 144"/><circle cx="3" cy="150" r="3"/></g>
      <g class="assembly-structure projection">
        <path class="guide" d="M78 28H316 M78 210H316 M96 16V220 M303 16V220"/>
        <path class="surface" d="M107 131 215 96 306 140 198 179Z"/>
        <path d="M107 131V140L198 188 306 149V140 M198 179V188"/>
        <path class="accent" d="m136 133 78-25 61 31-78 26Z"/>
        <path class="guide" d="M153 106V137 M215 67V118 M277 107V139"/>
      </g>
      <g class="assembly-fragment projection">
        <path class="surface" d="M128 49H262V108H128Z"/>
        <path d="M128 63H262 M139 56H142 M147 56H150 M155 56H158"/>
        <path class="accent" d="m150 77-8 7 8 7 m21-14 8 7-8 7 m-10-16-5 18"/>
        <path d="M193 78H246 M193 85H230 M193 92H238"/>
        <path class="accent" d="M121 49H115V68 M256 115H269V97"/>
      </g>
      <g class="assembly-nodes projection"><circle cx="86" cy="103" r="4"/><circle cx="273" cy="144" r="4"/><path d="M81 79H91 M86 74V84 M283 38H293 M288 33V43 M221 201H246"/></g>
    </svg>
    </div>
    </div>
  </div>
</template>

<style scoped>
.work-reveal { position: absolute; inset: 0; pointer-events: none; z-index: 6; }
/* Match the Work plane's coordinate system and active transform exactly. */
.work-attachment { position: absolute; width: 100%; aspect-ratio: 720 / 260; transition: transform 550ms cubic-bezier(.2,.8,.2,1); }
.visible .work-attachment { transform: translate(-3%, -4%) scale(1.025); }
:global(.departing) .visible .work-attachment { transform: translate(-5%, -9%) scale(1.07); }
.work-edge { width: 100%; overflow: visible; position: absolute; }
.edge-impulse { stroke: var(--sp-cyan); stroke-width: 2.5; stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.work-caption { position: absolute; right: 94.444444%; top: 38.461538%; width: min(280px, calc((100vw - 100%) / 2 - 8px)); height: 150px; margin-top: -74px; transform-origin: 100% 74px; }
.caption-frame { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: var(--sp-cyan); stroke-width: 1; }
.fold-line { stroke-dasharray: 1; stroke-dashoffset: 1; }
.fold-surface { fill: var(--sp-cyan); fill-opacity: .035; stroke: none; }
.caption-copy { position: absolute; top: 19px; left: 0; width: 79%; }
.work-caption p { font: 11px var(--font-mono); letter-spacing: .13em; text-transform: uppercase; color: var(--sp-cyan); }
.work-caption p span { color: var(--color-text-muted); margin-left: 10px; }
.work-caption h2 { max-width: 220px; margin-top: 12px; font-size: clamp(17px, 1.7vw, 23px); line-height: 1.45; font-weight: 400; letter-spacing: -.025em; color: var(--color-text); }
.assembly-anchor { position: absolute; left: 94.444444%; top: 48.461538%; width: min(340px, calc((100vw - 100%) / 2 - 24px)); transform-origin: 0 0; }
.work-assembly { width: 100%; display: block; transform: translateY(-65.217391%); overflow: visible; stroke: var(--sp-line); stroke-width: 1; }
.surface { fill: var(--sp-top); fill-opacity: .7; }
.accent, .assembly-nodes { stroke: var(--sp-cyan); }
.guide { stroke-dasharray: 2 6; opacity: .4; }
.assembly-thread { stroke: var(--sp-cyan); opacity: .65; }
.unfold-left, .unfold-right, .projection { opacity: 0; }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .work-attachment, .visible .work-attachment, :global(.departing) .visible .work-attachment { height: 100%; transform: none; }
  .work-caption { right: auto; left: 12%; top: calc(100% + 8px); width: 76%; height: auto; margin: 0; transform-origin: 0 0; }
  .caption-copy { position: relative; top: auto; width: 100%; display: flex; align-items: center; gap: 16px; }
  .work-caption p { flex-shrink: 0; font-size: 10px; }
  .work-caption p span { margin-left: 3px; }
  .work-caption h2 { margin: 0; max-width: 240px; font-size: 13px; line-height: 1.4; }
  .caption-frame, .assembly-anchor, .work-edge { display: none; }
  .work-caption::before { content: ''; position: absolute; left: 0; right: 0; top: -12px; height: 1px; background: linear-gradient(90deg, var(--sp-cyan), transparent); }
}
@media (prefers-reduced-motion: reduce) { .work-attachment { transition: none; } }
</style>
