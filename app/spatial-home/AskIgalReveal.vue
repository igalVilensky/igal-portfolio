<script setup lang="ts">
import { gsap } from 'gsap';
import type { SpatialCopy } from './content';
const props = defineProps<{ visible: boolean; origin: { x: number; y: number; bottom: number; exitX: number; exitY: number }; paused: boolean; copy: SpatialCopy }>();
const root = ref<HTMLElement>();
const lettering = ref<HTMLElement>();
const response = ref<HTMLElement>();
const incoming = ref('');
const outgoing = ref('');
let timeline: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let observer: ResizeObserver | undefined;
let media: MediaQueryList | undefined;
function measure() {
  if (!root.value || !lettering.value || !response.value) return;
  const bounds = root.value.getBoundingClientRect();
  // Measure the stationary containers, never the animated glyphs.
  const word = lettering.value.getBoundingClientRect();
  const reply = response.value.getBoundingClientRect();
  const size = parseFloat(getComputedStyle(lettering.value).fontSize);
  const x = word.left - bounds.left + size * 1.2;
  const y = word.top - bounds.top + size * 1.14;
  const rx = reply.left - bounds.left;
  const score = response.value.querySelector('svg')!;
  const scoreBounds = score.getBoundingClientRect();
  const ry = scoreBounds.top - bounds.top + scoreBounds.width * 42 / 320;
  const { x: cx, y: cy, exitX, exitY } = props.origin;
  incoming.value = `M${x} ${y} C${x} ${y + 55},${cx - 50} ${cy},${cx} ${cy}`;
  outgoing.value = `M${exitX} ${exitY} C${exitX + 45} ${exitY},${rx - 35} ${ry},${rx} ${ry}`;
}
function sync() {
  if (!timeline) return;
  if (props.paused || media?.matches) timeline.progress(props.visible ? 1 : 0).pause();
  else if (props.visible) timeline.timeScale(1).play();
  else timeline.timeScale(1.6).reverse();
}
watch(() => [props.visible, props.paused], sync);
watch(() => props.origin, measure, { flush: 'post' });
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  observer = new ResizeObserver(measure);
  observer.observe(root.value!);
  observer.observe(lettering.value!);
  observer.observe(response.value!);
  context = gsap.context(() => {
    const select = gsap.utils.selector(root.value!);
    const circuit = root.value!.closest('main')!.querySelector('.ask-circuit');
    const core = root.value!.closest('main')!.querySelector('.ask-core-light');
    // One playhead includes the actual selected SVG plane, in both directions.
    timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } })
      .fromTo(select('.ask-lettering'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .18 }, 0)
      .fromTo(select('.ask-question'), { opacity: 0 }, { opacity: 1, duration: .2 }, 0)
      .fromTo(select('.ask-remainder'), { opacity: 1, y: 0 }, { opacity: 0, y: -18, duration: .32, stagger: .04 }, .2)
      .fromTo(select('.ask-a'), { xPercent: 0 }, { xPercent: 70, duration: .38 }, .23)
      .fromTo(select('.ask-i'), { xPercent: 0 }, { xPercent: -70, duration: .38 }, .23)
      .fromTo(select('.ask-mark-rule'), { opacity: 0, scaleX: .2 }, { opacity: 1, scaleX: 1, duration: .18 }, .48)
      .fromTo(select('.ask-incoming'), { opacity: 0, strokeDashoffset: 1 }, { opacity: .85, strokeDashoffset: 0, duration: .26, ease: 'none' }, .57)
      .fromTo(circuit, { opacity: 0, strokeDashoffset: 1 }, { opacity: 1, strokeDashoffset: 0, duration: .3, ease: 'none' }, .8)
      .fromTo(core, { opacity: 0 }, { opacity: .7, duration: .13 }, .91)
      .to(core, { opacity: .22, duration: .3 }, 1.04)
      .fromTo(select('.ask-outgoing'), { opacity: 0, strokeDashoffset: 1 }, { opacity: .85, strokeDashoffset: 0, duration: .22, ease: 'none' }, 1.07)
      .fromTo(select('.ask-response'), { opacity: 0 }, { opacity: 1, duration: .12 }, 1.22)
      .fromTo(select('.response-wave'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .38 }, 1.23)
      .fromTo(select('.response-fragment'), { opacity: 0, x: -12, scaleX: .65 }, { opacity: 1, x: 0, scaleX: 1, duration: .25, stagger: .055 }, 1.32)
      .fromTo(select('.response-cursor'), { opacity: 0 }, { opacity: 1, duration: .12, repeat: 2, yoyo: true }, 1.65);
    sync();
  }, root.value);
  measure();
  document.fonts.ready.then(() => { if (root.value) measure(); });
});
onBeforeUnmount(() => { context?.revert(); observer?.disconnect(); media?.removeEventListener('change', sync); });
</script>

<template>
  <div ref="root" class="ask-identity" aria-hidden="true" :style="{ '--ask-bottom': `${origin.bottom}px` }">
    <svg class="ask-connections"><path class="ask-incoming" :d="incoming" pathLength="1" /><path class="ask-outgoing" :d="outgoing" pathLength="1" /></svg>
    <div ref="lettering" class="ask-type-space">
      <div class="ask-lettering" lang="en"><span class="ask-a">A</span><span class="ask-remainder ask-sk">sk</span><span class="ask-i">I</span><span class="ask-remainder ask-gal">gal</span></div>
      <div class="ask-mark-rule" />
      <div class="ask-question">{{ copy.askQuestion }} <span>?</span></div>
    </div>
    <div ref="response" class="ask-response-space">
      <div class="ask-response">
        <span class="response-caption response-fragment">{{ copy.askResponse }}</span>
        <svg viewBox="0 0 320 150" class="response-score">
          <path class="response-wave" pathLength="1" d="M0 42H28L40 34 52 50 66 13 83 75 100 30 113 42H154L165 37 176 46 186 42H308" />
          <g class="response-fragment"><path d="M40 98H126 M40 104H96"/><path class="response-accent" d="M20 97 26 101 20 105"/></g>
          <g class="response-fragment"><path d="M142 98H223 M112 104H196"/></g>
          <g class="response-fragment"><path d="M64 123H171 M64 129H135"/></g>
          <g class="response-fragment"><path d="M187 123H260 M150 129H226"/></g>
          <path class="response-cursor" d="M274 119V133"/>
        </svg>
        <span class="response-end response-fragment">↳ &nbsp; · · ·</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ask-identity { --ask-ink: #14374c; --ask-light: #087e98; --ask-line: #337491; position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 1; }
:global(.dark .ask-identity) { --ask-ink: #d9f5ff; --ask-light: #65dcec; --ask-line: #83b6cb; }
.ask-connections { position: absolute; width: 100%; height: 100%; overflow: visible; }
.ask-connections path { fill: none; stroke: var(--ask-light); stroke-width: 1.5; stroke-dasharray: 1; }
.ask-type-space { position: absolute; left: 4vw; top: 32%; width: 4em; font-size: clamp(48px, 6.4vw, 108px); color: var(--ask-ink); }
.ask-lettering { position: relative; height: 1.2em; font-family: var(--font-sans); font-weight: 300; letter-spacing: -.065em; line-height: 1; }
.ask-lettering > span { position: absolute; top: 0; display: block; }
.ask-a, .ask-i { width: 1em; font-weight: 500; color: var(--ask-light); }
.ask-a { left: 0; }.ask-sk { left: .69em; }.ask-i { left: 2.12em; }.ask-gal { left: 2.42em; }
.ask-mark-rule { position: absolute; top: 1.13em; left: .72em; width: 1em; height: 2px; background: var(--ask-light); transform-origin: left; }
.ask-question { margin: 20px 0 0 .5em; font: 10px var(--font-mono); letter-spacing: .12em; color: var(--ask-light); }
.ask-question span { margin-left: 18px; font-size: 18px; }
.ask-response-space { position: absolute; left: 75%; top: 35%; width: 22%; max-width: 380px; color: var(--ask-ink); }
.response-caption { display: block; font: 10px var(--font-mono); letter-spacing: .16em; text-transform: uppercase; padding-left: 12%; }
.response-score { width: 100%; overflow: visible; fill: none; stroke: var(--ask-line); stroke-width: 2; }
.response-wave { stroke: var(--ask-light); stroke-width: 1.5; stroke-dasharray: 1; }
.response-accent, .response-cursor { stroke: var(--ask-light); stroke-width: 3; }
.response-fragment { transform-origin: left center; }
.response-end { display: block; margin: 8px 0 0 20%; font: 16px var(--font-mono); color: var(--ask-light); }
.ask-lettering, .ask-question, .ask-mark-rule, .ask-connections path, .ask-response { opacity: 0; }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .ask-type-space { top: 110px; left: 12%; font-size: clamp(38px, 5vw, 60px); }
  .ask-response-space { left: 65%; top: 125px; width: 29%; }
}
@media (max-width: 600px) {
  .ask-type-space { top: calc(var(--ask-bottom) - 30px); left: 7%; font-size: 32px; }
  .ask-question { margin-top: 10px; font-size: 9px; }
  .ask-response-space { top: calc(var(--ask-bottom) - 24px); left: 57%; width: 37%; }
  .response-caption { font-size: 8px; letter-spacing: .08em; }
  .response-end { display: none; }
  .response-score { stroke-width: 2.5; }
}
@media (max-height: 650px) and (min-width: 601px) {
  .ask-type-space { top: 30%; left: 3%; font-size: 42px; }
  .ask-response-space { top: 36%; left: 77%; width: 21%; }
}
</style>
