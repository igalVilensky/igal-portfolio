<script setup lang="ts">
import { engineeringLayers as layers } from './engineering-stack';
defineProps<{ stopped: boolean }>();
const selected = ref<number | null>(null);
const hovered = ref<number | null>(null);
const current = computed(() => selected.value === null ? null : layers[selected.value]);
function select(index: number) { selected.value = selected.value === index ? null : index; }
function placement(index: number) {
  const focused = selected.value === index;
  return { transform: `translate(${focused ? -48 : 0}px, ${index * 67 + (selected.value !== null && index > selected.value ? 38 : 0) - (focused ? 20 : hovered.value === index ? 10 : 0)}px)` };
}
</script>

<template>
  <section class="integrated-hero" :class="{ 'has-selection': current }" aria-labelledby="integrated-title">
    <div class="hero-introduction">
      <p class="hero-identity">Igal Vilensky <span>AI Software Engineer</span></p>
      <h2 id="integrated-title">From<br><span class="complexity-word">complexity</span><br>to <span class="clarity-word">clarity<span class="clarity-dot">.</span></span></h2>
      <p class="hero-statement">I build practical software, connect systems, and use AI and automation to solve real problems.</p>
      <p class="hero-employer">Currently at <strong>Agorando Technologies GmbH</strong></p>
      <a class="hero-explore" href="#engineering-evidence" @click="selected ??= 0">Explore the work <span aria-hidden="true">↗</span></a>
    </div>

    <div class="engineering-canvas">
      <div class="canvas-heading"><span>Engineering Stack</span><span>Five lenses. One approach.</span></div>
      <div class="spatial-field">
        <div class="stack-orbit" aria-hidden="true"></div>
        <svg class="hero-stack" viewBox="0 0 660 620" role="img" :aria-label="current ? `${current.name} separated from five conceptual engineering domains.` : 'Five conceptual engineering domains. Choose a labeled control below to explore related work.'">
          <defs>
            <pattern id="integrated-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="currentColor" stroke-width=".65" /></pattern>
            <linearGradient id="integrated-plane" x1="0" y1="0" x2="1" y2="1"><stop stop-color="var(--plane-start)"/><stop offset="1" stop-color="var(--plane-end)"/></linearGradient>
          </defs>
          <g class="stack-drift">
            <path class="hero-spine" d="M315 28V576 M65 155V440 M575 155V440" />
            <g v-for="(_, reverse) in layers" :key="reverse" class="hero-plane" :class="{ chosen: selected === 4 - reverse, previewed: hovered === 4 - reverse }" :style="placement(4 - reverse)" @pointerenter="hovered = 4 - reverse" @pointerleave="hovered = null" @click="select(4 - reverse)" aria-hidden="true">
              <path class="plane-edge" d="M65 155L315 32 575 155V169L315 294 65 169Z" />
              <path class="plane-face" d="M65 155L315 32 575 155 315 280Z" />
              <path class="plane-grid" d="M65 155L315 32 575 155 315 280Z" fill="url(#integrated-grid)" />
              <path class="plane-inset" d="M90 155L315 45 548 155 315 265Z" />
              <path class="plane-symbol" :d="layers[4 - reverse]!.glyph" />
              <text x="109" y="163">0{{ 5 - reverse }}</text>
              <path class="plane-corner" d="M315 257v10l35-17" />
            </g>
          </g>
        </svg>
        <span class="stack-side-note" aria-hidden="true">IDEA / STRUCTURE / USE</span>
      </div>
      <div class="engineering-controls" role="group" aria-label="Explore engineering domains">
        <button v-for="(layer, index) in layers" :key="layer.name" :aria-pressed="selected === index" aria-controls="engineering-evidence" @click="select(index)" @pointerenter="hovered = index" @pointerleave="hovered = null" @focus="hovered = index" @blur="hovered = null"><span class="domain-number">0{{ index + 1 }}</span><span>{{ layer.name }}</span><span class="domain-state" aria-hidden="true">{{ selected === index ? '−' : '+' }}</span></button>
      </div>
      <p class="stack-instruction">Select a domain to pull it into focus.</p>
    </div>

    <div id="engineering-evidence" class="engineering-evidence" aria-live="polite" aria-atomic="true">
      <template v-if="current">
        <div class="domain-context"><p class="lab-eyebrow">{{ current.name }} / {{ String(selected! + 1).padStart(2, '0') }}</p><h3>{{ current.verb }}</h3><p>{{ current.copy }}</p></div>
        <div class="project-evidence"><p class="lab-eyebrow">{{ current.kind }}</p><a :href="current.project.href ?? undefined">{{ current.project.title }} <span aria-hidden="true">↗</span></a><p>{{ current.project.description }}</p><p class="evidence-reason">{{ current.evidence }}</p></div>
      </template>
      <template v-else><div class="domain-context"><p class="lab-eyebrow">A way of working</p><h3>Different layers.<br>One useful result.</h3></div><p class="evidence-intro">Explore the connections between my engineering focus and real work. These are areas of practice, not components of a single deployed architecture.</p></template>
    </div>
  </section>
</template>

<style scoped>
.integrated-hero { --plane-start: #e4edff; --plane-end: #f9fbff; position: relative; isolation: isolate; padding: 64px 44px 0; display: grid; grid-template-columns: .95fr 1.15fr; column-gap: 24px; background: radial-gradient(ellipse at 78% 33%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 48%); }
:global(.dark .integrated-hero) { --plane-start: #193353; --plane-end: #0d1b30; }
.hero-introduction { position: relative; z-index: 1; padding-top: 16px; }
.hero-identity { font-size: 18px; font-weight: 650; letter-spacing: -.025em; }
.hero-identity span { display: block; font: 12px/2 var(--font-mono); color: var(--color-text-muted); letter-spacing: 0; }
.hero-introduction h2 { font-size: clamp(52px, 5.9vw, 84px); line-height: .99; font-weight: 650; letter-spacing: -.075em; margin: 36px 0 27px; }
.complexity-word { color: var(--color-text-muted); }
.clarity-word { color: var(--color-accent); }
.clarity-dot { color: var(--color-system); }
.hero-statement { max-width: 34ch; font-size: 17px; line-height: 1.75; color: var(--color-text-muted); }
.hero-employer { font-size: 12px; line-height: 1.8; color: var(--color-text-muted); margin-top: 18px; }
.hero-employer strong { font-weight: 500; color: var(--color-text-muted); }
.hero-explore { display: inline-flex; gap: 45px; align-items: center; min-height: 48px; border-bottom: 2px solid var(--color-accent); margin-top: 23px; font-size: 14px; font-weight: 600; }
.hero-explore span { color: var(--color-accent); font-size: 22px; }
.engineering-canvas { min-width: 0; position: relative; }
.canvas-heading { display: flex; justify-content: space-between; gap: 12px; font: 10px/1.6 var(--font-mono); color: var(--color-text-muted); }
.canvas-heading span:first-child { color: var(--color-text); }
.spatial-field { position: relative; }
.hero-stack { position: relative; width: 100%; height: 455px; overflow: visible; }
.stack-orbit { position: absolute; width: 85%; height: 33%; left: 7%; bottom: 4%; border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent); border-radius: 50%; transform: rotate(-15deg); box-shadow: 0 0 80px color-mix(in srgb, var(--color-accent) 9%, transparent); }
.stack-side-note { position: absolute; right: -22px; top: 43%; writing-mode: vertical-rl; font: 9px var(--font-mono); letter-spacing: .16em; color: var(--color-text-muted); }
.stack-drift { animation: engineering-drift 8s ease-in-out infinite; }
@keyframes engineering-drift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
.hero-spine { fill: none; stroke: var(--color-border-control); stroke-dasharray: 2 7; }
.hero-plane { cursor: pointer; transition: transform 650ms cubic-bezier(.22,1,.36,1), filter 300ms; }
.plane-face { fill: url(#integrated-plane); stroke: color-mix(in srgb, var(--color-accent) 45%, var(--color-border)); transition: fill 300ms; }
.plane-edge { fill: color-mix(in srgb, var(--color-accent) 24%, var(--color-surface)); stroke: var(--color-border-control); }
.plane-grid { color: var(--color-accent); opacity: .12; }
.plane-inset { fill: none; stroke: var(--color-accent); opacity: .25; }
.plane-symbol { fill: none; stroke: var(--color-accent); stroke-width: 2; stroke-linejoin: round; }
.hero-plane text { fill: var(--color-text-muted); font: 14px var(--font-mono); }
.plane-corner { fill: none; stroke: var(--color-system); stroke-width: 3; }
.hero-plane.previewed { filter: drop-shadow(0 -8px 9px color-mix(in srgb, var(--color-accent) 24%, transparent)); }
.hero-plane.previewed .plane-face { stroke-width: 3; }
.hero-plane.chosen .plane-face { fill: #215bea; stroke: #78bdff; stroke-width: 2; }
.hero-plane.chosen .plane-edge { fill: #133ba5; }
.hero-plane.chosen .plane-symbol, .hero-plane.chosen .plane-inset { stroke: #fff; opacity: .8; }
.hero-plane.chosen text { fill: #fff; }
.hero-plane.chosen .plane-grid { color: #fff; }
.engineering-controls { display: flex; flex-wrap: wrap; gap: 0 18px; position: relative; }
.engineering-controls button { display: flex; align-items: center; gap: 8px; min-height: 44px; border-bottom: 1px solid var(--color-border-control); font-size: 12px; text-align: left; transition: transform 250ms; }
.engineering-controls button:hover { transform: translateY(-3px); }
.engineering-controls button[aria-pressed=true] { border-bottom: 2px solid var(--color-accent); color: var(--color-accent); }
.domain-number { font: 9px var(--font-mono); color: var(--color-text-muted); }
.domain-state { font-size: 16px; }
.stack-instruction { font-size: 11px; color: var(--color-text-muted); margin-top: 13px; }
.engineering-evidence { scroll-margin-top: 100px; display: grid; grid-template-columns: .95fr 1.15fr; gap: 35px; grid-column: 1/-1; border-top: 1px solid var(--color-border-control); margin-top: 45px; padding: 28px 0 32px; min-height: 232px; }
.domain-context h3 { font-size: 28px; line-height: 1.2; letter-spacing: -.04em; margin: 10px 0; font-weight: 550; }
.domain-context > p:last-child, .project-evidence > p:not(.lab-eyebrow), .evidence-intro { font-size: 14px; line-height: 1.7; color: var(--color-text-muted); max-width: 54ch; }
.project-evidence a { display: inline-block; font-size: 22px; font-weight: 550; letter-spacing: -.035em; margin: 7px 0; text-decoration: underline; text-decoration-color: var(--color-border-control); text-underline-offset: 5px; }
.project-evidence a span { color: var(--color-accent); }
.project-evidence .evidence-reason { border-left: 2px solid var(--color-system); padding-left: 12px; margin-top: 12px; }
.evidence-intro { align-self: center; }
@media (max-width: 1000px) and (min-width: 701px) { .integrated-hero { padding: 40px 24px 0; gap: 20px; } .hero-introduction h2 { font-size: 55px; } .hero-stack { height: 390px; } .canvas-heading { flex-direction: column; } }
@media (max-width: 700px) {
 .integrated-hero { display: block; padding: 30px 18px 0; }
 .hero-introduction { padding: 0; } .hero-identity { font-size: 17px; } .hero-identity span { font-size: 11px; }
 .hero-introduction h2 { font-size: clamp(43px, 11.5vw, 70px); margin: 22px 0 18px; } .hero-introduction h2 > br:first-child { display: none; } .complexity-word::before { content: ' '; }
 .hero-statement { font-size: 14px; line-height: 1.65; max-width: 40ch; } .hero-employer { margin-top: 12px; font-size: 11px; } .hero-explore { margin-top: 8px; min-height: 44px; }
 .engineering-canvas { margin-top: 28px; } .canvas-heading { font-size: 9px; } .hero-stack { height: 255px; } .stack-side-note { right: -7px; font-size: 8px; }
 .engineering-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 0 12px; } .engineering-controls button { min-height: 44px; font-size: 11px; } .domain-state { margin-left: auto; }
 .engineering-controls button:last-child { grid-column: 1/-1; } .stack-instruction { margin-top: 9px; font-size: 10px; }
 .engineering-evidence { display: block; margin-top: 22px; padding: 22px 0; min-height: 0; } .domain-context h3 { font-size: 25px; } .project-evidence { margin-top: 22px; } .project-evidence a { font-size: 21px; } .evidence-intro { margin-top: 12px; }
}
</style>
