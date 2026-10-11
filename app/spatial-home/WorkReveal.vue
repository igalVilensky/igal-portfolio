<script setup lang="ts">
defineProps<{ visible: boolean; label: string; phrase: string }>();
</script>

<template>
  <div class="work-reveal" :class="{ visible }" :aria-hidden="!visible">
    <div class="work-caption">
      <p>{{ label }} <span>/ 01</span></p>
      <h2>{{ phrase }}</h2>
      <svg class="caption-thread" viewBox="0 0 280 64" aria-hidden="true"><path d="M0 64H218L238 1H280"/><circle cx="277" cy="1" r="3"/></svg>
    </div>
    <svg class="work-assembly" viewBox="0 0 340 230" fill="none" aria-hidden="true">
      <g class="assembly-thread"><path d="M0 150H39L86 103H128 M39 150L109 186H231L273 144"/><circle cx="3" cy="150" r="3"/></g>
      <g class="assembly-structure">
        <path class="guide" d="M78 28H316 M78 210H316 M96 16V220 M303 16V220"/>
        <path class="surface" d="M107 131 215 96 306 140 198 179Z"/>
        <path d="M107 131V140L198 188 306 149V140 M198 179V188"/>
        <path class="accent" d="m136 133 78-25 61 31-78 26Z"/>
        <path class="guide" d="M153 106V137 M215 67V118 M277 107V139"/>
      </g>
      <g class="assembly-fragment">
        <path class="surface" d="M128 49H262V108H128Z"/>
        <path d="M128 63H262 M139 56H142 M147 56H150 M155 56H158"/>
        <path class="accent" d="m150 77-8 7 8 7 m21-14 8 7-8 7 m-10-16-5 18"/>
        <path d="M193 78H246 M193 85H230 M193 92H238"/>
        <path class="accent" d="M121 49H115V68 M256 115H269V97"/>
      </g>
      <g class="assembly-nodes"><circle cx="86" cy="103" r="4"/><circle cx="273" cy="144" r="4"/><path d="M81 79H91 M86 74V84 M283 38H293 M288 33V43 M221 201H246"/></g>
    </svg>
  </div>
</template>

<style scoped>
.work-reveal { position: absolute; inset: 0; pointer-events: none; --reveal-ease: cubic-bezier(.22,.8,.25,1); }
.work-caption { position: absolute; right: 96%; top: 7%; width: min(240px, calc((100vw - 100%) / 2 - 20px)); }
.work-caption p { font: 11px var(--font-mono); letter-spacing: .13em; text-transform: uppercase; color: var(--sp-cyan); }
.work-caption p span { color: var(--color-text-muted); margin-left: 10px; }
.work-caption h2 { max-width: 220px; margin-top: 17px; font-size: clamp(17px, 1.7vw, 23px); line-height: 1.45; font-weight: 400; letter-spacing: -.025em; color: var(--color-text); }
.caption-thread { position: absolute; top: 45px; left: 0; width: 120%; height: auto; overflow: visible; fill: none; stroke: var(--sp-cyan); stroke-width: 1; }
.work-assembly { position: absolute; left: 91%; top: -6%; width: min(340px, calc((100vw - 100%) / 2 + 3% - 24px)); overflow: visible; stroke: var(--sp-line); stroke-width: 1; }
.surface { fill: var(--sp-top); fill-opacity: .7; }
.accent, .assembly-nodes { stroke: var(--sp-cyan); }
.guide { stroke-dasharray: 2 6; opacity: .4; }
.assembly-thread { stroke: var(--sp-cyan); opacity: .6; }
.work-caption, .work-assembly { opacity: 0; transition: opacity 300ms ease, transform 550ms var(--reveal-ease); }
.work-caption { transform: translate(24px, 9px); }
.work-assembly { transform: translate(-30px, 12px); }
.visible .work-caption, .visible .work-assembly { opacity: 1; transform: translate(0, 0); }
.caption-thread path, .assembly-thread path { stroke-dasharray: 400; stroke-dashoffset: 400; transition: stroke-dashoffset 550ms var(--reveal-ease); }
.visible .caption-thread path, .visible .assembly-thread path { stroke-dashoffset: 0; }
.assembly-fragment { transform: translateY(12px); transition: transform 600ms var(--reveal-ease); }
.visible .assembly-fragment { transform: translateY(0); }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .work-caption { right: auto; left: 12%; top: calc(100% + 8px); width: 76%; display: flex; align-items: center; gap: 16px; }
  .work-caption p { flex-shrink: 0; font-size: 10px; }
  .work-caption p span { margin-left: 3px; }
  .work-caption h2 { margin: 0; max-width: 240px; font-size: 13px; line-height: 1.4; }
  .caption-thread, .work-assembly { display: none; }
  .work-caption::before { content: ''; position: absolute; left: 0; right: 0; top: -12px; height: 1px; background: linear-gradient(90deg, var(--sp-cyan), transparent); }
}
@media (prefers-reduced-motion: reduce) {
  .work-caption, .work-assembly, .assembly-fragment, .caption-thread path, .assembly-thread path { transition: none; transform: none; }
}
</style>
