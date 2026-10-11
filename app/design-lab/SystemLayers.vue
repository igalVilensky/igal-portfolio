<script setup lang="ts">
defineProps<{ stopped: boolean }>();
const layers = [
  { name: 'Applications', verb: 'Experience', copy: 'The surface people touch. Application behavior brings the capabilities beneath it into a coherent experience.' },
  { name: 'APIs & Integrations', verb: 'Connect', copy: 'Boundaries with a purpose. Contracts connect independently evolving parts without hiding their responsibilities.' },
  { name: 'Data', verb: 'Structure', copy: 'A foundation of meaning. Data structures preserve the context that applications and automation depend on.' },
  { name: 'AI & Automation', verb: 'Orchestrate', copy: 'Reasoning and repeatable actions, composed with explicit inputs, constraints, and opportunities for human review.' },
  { name: 'Outcomes', verb: 'Deliver', copy: 'A useful result anchors the whole system. Each layer exists to support this purpose, rather than adding complexity for its own sake.' },
];
const selected = ref(2);
const expanded = ref(true);
const hover = ref<number | null>(null);
function y(i: number) { return 68 + i * (expanded.value ? 76 : 43) + (expanded.value && i > selected.value ? 25 : 0); }
</script>

<template>
  <div class="layers-composition">
    <div class="layer-drawing">
      <svg viewBox="0 0 640 680" role="img" :aria-label="`Five conceptual system layers; ${layers[selected]!.name} pulled forward. Select a layer using the adjacent controls.`">
        <defs><pattern id="lab-layer-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M 28 0 H 0 V 28" fill="none" stroke="currentColor" stroke-width=".7" /></pattern></defs>
        <ellipse class="stack-shadow" cx="300" cy="630" rx="240" ry="42" />
        <path class="stack-spine" d="M 318 70 V 630 M 95 200 V 440 M 545 200 V 440" />
        <g v-for="(_, reverse) in layers" :key="reverse" class="layer-slab" :class="{ 'slab-selected': selected === 4 - reverse, 'slab-hovered': hover === 4 - reverse }" :style="{ transform: `translate(${selected === 4 - reverse ? -22 : 0}px, ${y(4 - reverse)}px)` }">
          <path class="slab-edge" d="M 85 126 L 315 8 L 555 126 V 139 L 315 257 L 85 139 Z" />
          <path class="slab-face" d="M 85 126 L 315 8 L 555 126 L 315 244 Z" />
          <path class="slab-grid" d="M 85 126 L 315 8 L 555 126 L 315 244 Z" fill="url(#lab-layer-grid)" />
          <path class="slab-rails" d="M 130 126 L 315 32 L 505 126 L 315 218 Z M 180 126 L 315 58 L 455 126 L 315 193 Z" />
          <path v-if="4 - reverse === 0" class="slab-glyph" d="M 270 104 L 315 82 L 362 104 L 315 127 Z M 270 117 L 315 140 L 362 117" />
          <path v-else-if="4 - reverse === 1" class="slab-glyph" d="M 264 126 L 290 112 M 310 102 L 335 89 M 290 140 L 315 127 M 335 117 L 362 104 M 290 112 L 335 135" />
          <path v-else-if="4 - reverse === 2" class="slab-glyph" d="M 275 100 L 315 80 L 355 100 L 315 120 Z M 275 112 L 315 132 L 355 112 M 275 124 L 315 144 L 355 124" />
          <path v-else-if="4 - reverse === 3" class="slab-glyph" d="M 270 127 L 315 82 L 310 116 L 355 101 L 310 149 L 316 117 Z" />
          <path v-else class="slab-glyph" d="M 280 113 L 308 136 L 355 92" />
          <text x="120" y="132" class="slab-number">0{{ 5 - reverse }}</text>
        </g>
      </svg>
      <button class="stack-toggle" :aria-pressed="expanded" @click="expanded = !expanded">{{ expanded ? '− Collapse layers' : '+ Separate layers' }}</button>
    </div>
    <div class="layer-index" role="group" aria-label="Focus a system layer">
      <p class="lab-eyebrow">Architecture / Select a plane</p>
      <button v-for="(layer, i) in layers" :key="layer.name" :aria-pressed="selected === i" aria-controls="layer-detail" @click="selected = i; expanded = true" @pointerenter="hover = i" @pointerleave="hover = null" @focus="hover = i" @blur="hover = null">
        <span class="layer-number">0{{ i + 1 }}</span><span><strong>{{ layer.name }}</strong><small>{{ layer.verb }}</small></span><span class="layer-arrow" aria-hidden="true">{{ selected === i ? '↗' : '—' }}</span>
      </button>
    </div>
  </div>
  <div id="layer-detail" class="lab-readout" aria-live="polite" aria-atomic="true"><div><p class="lab-eyebrow">Focused layer / {{ String(selected + 1).padStart(2, '0') }}</p><h3>{{ layers[selected]!.name }}</h3></div><p>{{ layers[selected]!.copy }}</p></div>
</template>

<style scoped>
.layers-composition { display: grid; grid-template-columns: 1.5fr 1fr; align-items: center; padding: 0 7% 22px 3%; gap: 4%; background: linear-gradient(125deg, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent 60%); }
.layer-drawing { position: relative; min-width: 0; }
.layer-drawing svg { width: 100%; height: 520px; overflow: visible; }
.stack-shadow { fill: var(--color-accent); opacity: .07; }
.stack-spine { stroke: var(--color-border-control); stroke-dasharray: 3 7; fill: none; }
.layer-slab { transition: transform 850ms cubic-bezier(.22,1,.36,1); }
.slab-face { fill: var(--color-surface-raised); stroke: var(--color-border-control); stroke-width: 1; transition: fill 400ms; }
.slab-edge { fill: var(--color-border); stroke: var(--color-border-control); stroke-width: 1; }
.slab-grid { color: var(--color-border-control); opacity: .17; }
.slab-rails { fill: none; stroke: var(--color-border-control); opacity: .35; }
.slab-glyph { fill: none; stroke: var(--color-text-muted); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.slab-number { fill: var(--color-text-muted); font: 13px var(--font-mono); }
.slab-selected .slab-face { fill: var(--color-accent); stroke: var(--color-accent); stroke-width: 2; }
.slab-selected .slab-edge { fill: var(--color-accent-hover); }
.slab-selected .slab-glyph, .slab-selected .slab-rails { stroke: var(--color-on-accent); opacity: .8; }
.slab-selected .slab-number { fill: var(--color-on-accent); }
.slab-hovered:not(.slab-selected) .slab-face { stroke: var(--color-system); stroke-width: 3; }
.stack-toggle { position: relative; display: block; margin: -5px auto 0; min-height: 44px; padding: 0 12px; color: var(--color-accent); border-bottom: 1px solid var(--color-accent); font: 12px var(--font-mono); }
.layer-index { min-width: 0; }
.layer-index > p { margin-bottom: 20px; }
.layer-index button { width: 100%; min-height: 75px; display: flex; gap: 18px; align-items: center; text-align: left; border-top: 1px solid var(--color-border); transition: padding 450ms, color 200ms; }
.layer-index button[aria-pressed=true] { padding-left: 16px; border-left: 3px solid var(--color-accent); color: var(--color-accent); }
.layer-number { font: 12px var(--font-mono); color: var(--color-text-muted); }
.layer-index strong { font-size: 17px; font-weight: 500; }
.layer-index small { display: block; font: 11px/1.8 var(--font-mono); color: var(--color-text-muted); }
.layer-arrow { margin-left: auto; }
@media (max-width: 700px) {
  .layers-composition { grid-template-columns: 1fr; padding: 0 16px 20px; gap: 18px; }
  .layer-drawing svg { height: 350px; }
  .layer-index > p { margin-bottom: 10px; }
  .layer-index button { min-height: 54px; }
  .layer-index strong { font-size: 14px; }
  .layer-index small { display: inline; margin-left: 8px; font-size: 10px; }
  .layer-number { font-size: 10px; }
}
</style>
