<script setup lang="ts">
defineProps<{ stopped: boolean }>();
const stages = [
  { name: 'Input', action: 'Receive', copy: 'Separate signals enter the workflow. The intake gathers them before any transformation begins.', x: 12, y: 33 },
  { name: 'Processing', action: 'Shape', copy: 'Inputs gain a consistent shape. The rotating assembly represents validation and transformation, not measured processing activity.', x: 38, y: 33 },
  { name: 'Integration', action: 'Join', copy: 'A crossing of boundaries. Independent strands converge into a shared path through explicit interfaces.', x: 64, y: 33 },
  { name: 'AI / Automation', action: 'Resolve', copy: 'The route branches through assisted reasoning and repeatable actions. Human review remains part of the conceptual workflow.', x: 64, y: 78 },
  { name: 'Output', action: 'Deliver', copy: 'A shaped result leaves the engine. The trail connects it visibly to the information that entered upstream.', x: 28, y: 78 },
];
const selected = ref(1);
const preview = ref<number | null>(null);
const lit = computed(() => preview.value ?? selected.value);
</script>

<template>
  <div class="flow-engine">
    <div class="flow-track">
      <svg class="flow-pipes" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
        <defs><pattern id="lab-flow-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 H 0 V 32" fill="none" stroke="currentColor" stroke-width=".5" /></pattern></defs>
        <rect width="1000" height="500" fill="url(#lab-flow-grid)" class="flow-grid" />
        <path class="pipe-shadow" d="M 40 165 H 640 C 890 165 890 390 640 390 H 145" />
        <path class="pipe" d="M 40 165 H 640 C 890 165 890 390 640 390 H 145" />
        <path class="packet" pathLength="100" d="M 40 165 H 640 C 890 165 890 390 640 390 H 145" />
        <path class="pipe-branch" d="M 40 128 Q 90 128 120 165 M 40 202 Q 90 202 120 165 M 570 165 Q 620 105 688 165 M 688 390 Q 640 450 580 390" />
        <path class="flow-arrow" d="M 243 157 L 253 165 L 243 173 M 500 157 L 510 165 L 500 173 M 810 273 L 818 283 L 826 273 M 453 382 L 443 390 L 453 398" />
      </svg>
      <button v-for="(stage, i) in stages" :key="stage.name" class="flow-station" :class="[`station-${i}`, { chosen: selected === i, lit: lit === i }]" :style="{ '--x': `${stage.x}%`, '--y': `${stage.y}%` }" :aria-pressed="selected === i" aria-controls="flow-detail" @click="selected = i" @pointerenter="preview = i" @pointerleave="preview = null" @focus="preview = i" @blur="preview = null">
        <span class="station-assembly" aria-hidden="true">
          <span v-if="i === 0" class="intake"><i/><i/><i/></span>
          <span v-else-if="i === 1" class="processor"><i/><i/><i/></span>
          <span v-else-if="i === 2" class="junction"><i/><i/></span>
          <span v-else-if="i === 3" class="resolver"><i/><i/><i/></span>
          <span v-else class="output"><i/><i/><i/></span>
        </span>
        <span class="station-name"><small>0{{ i + 1 }} / {{ stage.action }}</small><strong>{{ stage.name }}</strong><span v-if="selected === i" class="station-selected">Selected</span></span>
      </button>
      <span class="flow-annotation" aria-hidden="true">SIGNAL → STRUCTURE → ACTION</span>
    </div>
  </div>
  <div id="flow-detail" class="lab-readout" aria-live="polite" aria-atomic="true"><div><p class="lab-eyebrow">Inspecting stage / {{ String(selected + 1).padStart(2, '0') }}</p><h3>{{ stages[selected]!.name }}</h3></div><p>{{ stages[selected]!.copy }}</p></div>
</template>

<style scoped>
.flow-engine { padding: 0 24px 35px; }
.flow-track { position: relative; height: 500px; }
.flow-pipes { position: absolute; width: 100%; height: 100%; fill: none; }
.flow-grid { color: var(--color-border-control); opacity: .12; }
.pipe-shadow { stroke: var(--color-surface-raised); stroke-width: 28; }
.pipe { stroke: var(--color-border-control); stroke-width: 1.5; }
.packet { stroke: var(--color-system); stroke-width: 4; stroke-linecap: round; stroke-dasharray: 1 19; animation: transport 12s linear infinite; }
.pipe-branch { stroke: var(--color-border-control); stroke-width: 1; }
.flow-arrow { stroke: var(--color-system); stroke-width: 2; }
.flow-station { position: absolute; left: var(--x); top: var(--y); width: 150px; height: 155px; transform: translate(-50%, -40px); display: flex; align-items: center; flex-direction: column; border-radius: 10px; }
.station-assembly { display: grid; place-items: center; flex-shrink: 0; width: 80px; height: 80px; background: var(--color-surface); border: 1px solid var(--color-border-control); border-radius: 50%; transition: box-shadow 450ms, transform 600ms cubic-bezier(.2,.8,.2,1), border-radius 600ms; color: var(--color-text-muted); }
.lit .station-assembly { box-shadow: 0 0 0 9px color-mix(in srgb, var(--color-system) 9%, transparent); color: var(--color-system); }
.chosen .station-assembly { transform: scale(1.15); border: 2px solid var(--color-accent); border-radius: 24%; color: var(--color-accent); }
.station-name { display: flex; align-items: center; flex-direction: column; margin-top: 19px; padding: 0 3px; background: var(--color-surface); }
.station-name small { font: 10px/1.7 var(--font-mono); color: var(--color-text-muted); }
.station-name strong { font-size: 14px; font-weight: 500; }
.station-selected { font: 10px/1.6 var(--font-mono); color: var(--color-accent); }
.intake, .output { display: flex; gap: 4px; }
.intake i { width: 5px; height: 26px; background: currentColor; animation: intake 2.4s ease-in-out infinite; }
.intake i:nth-child(2) { animation-delay: -.8s; }.intake i:nth-child(3) { animation-delay: -1.6s; }
.processor { width: 34px; height: 34px; position: relative; animation: process 9s linear infinite; }
.processor i { position: absolute; inset: 0; border: 1.5px solid currentColor; }.processor i:nth-child(2) { transform: rotate(30deg); }.processor i:nth-child(3) { transform: rotate(60deg); }
.junction { position: relative; width: 40px; height: 35px; }
.junction i { position: absolute; width: 29px; height: 20px; border: 2px solid currentColor; border-radius: 50%; top: 7px; transform: rotate(-35deg); animation: join 3s ease-in-out infinite alternate; }.junction i:last-child { right: 0; animation-delay: -3s; }
.resolver { position: relative; width: 33px; height: 33px; transform: rotate(45deg); }
.resolver i { position: absolute; inset: 0; border: 1.5px solid currentColor; animation: resolve 3.6s ease-in-out infinite; }.resolver i:nth-child(2) { inset: 6px; animation-delay: -1.2s; }.resolver i:nth-child(3) { inset: 12px; animation-delay: -2.4s; }
.output { flex-direction: column; gap: 5px; }.output i { width: 30px; height: 3px; background: currentColor; transform-origin: left; animation: deliver 3s ease-in-out infinite; }.output i:nth-child(2) { animation-delay: -.3s; }.output i:nth-child(3) { animation-delay: -.6s; }
.flow-annotation { position: absolute; top: 30px; left: 20px; color: var(--color-text-muted); font: 10px var(--font-mono); letter-spacing: .15em; }
@keyframes transport { to { stroke-dashoffset: -100; } }
@keyframes intake { 50% { transform: scaleY(.4); } }
@keyframes process { to { transform: rotate(360deg); } }
@keyframes join { to { transform: translateX(4px) rotate(-35deg); } }
@keyframes resolve { 50% { opacity: .35; transform: scale(.8); } }
@keyframes deliver { 50% { transform: scaleX(.55); } }
@media (max-width: 700px) {
  .flow-engine { padding: 22px 16px 20px; }
  .flow-track { height: 620px; }
  .flow-pipes { display: none; }
  .flow-track::before { content: ''; position: absolute; top: 35px; bottom: 75px; left: 39px; width: 3px; background: repeating-linear-gradient(to bottom, var(--color-system) 0 8px, var(--color-border) 8px 28px); background-size: 3px 28px; animation: mobile-transport 2s linear infinite; }
  .flow-station { left: 0; top: auto; width: 100%; height: 115px; transform: none; flex-direction: row; gap: 24px; text-align: left; }
  .station-0 { top: 0; }.station-1 { top: 120px; }.station-2 { top: 240px; }.station-3 { top: 360px; }.station-4 { top: 480px; }
  .station-assembly { width: 80px; height: 80px; }
  .station-name { align-items: flex-start; margin-top: 0; }
  .station-name strong { font-size: 16px; }
  .flow-annotation { top: auto; bottom: 0; left: 0; font-size: 9px; letter-spacing: .08em; }
}
@keyframes mobile-transport { to { background-position: 0 28px; } }
</style>
