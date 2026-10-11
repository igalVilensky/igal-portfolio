<script setup lang="ts">
const props = defineProps<{ stopped: boolean }>();
const domains = [
  { name: 'Applications', x: 25, y: 23, mark: '⌘', copy: 'The human edge of a system. Interfaces turn connected capabilities into something people can understand and use.' },
  { name: 'Data & APIs', x: 76, y: 25, mark: '{ }', copy: 'A shared language between systems. Explicit contracts give information a clear shape as it crosses boundaries.' },
  { name: 'AI & Automation', x: 22, y: 76, mark: '✳', copy: 'A place for assisted reasoning and repeatable work, connected to deliberate human decisions.' },
  { name: 'Outcomes', x: 77, y: 75, mark: '↗', copy: 'The point of connection: a useful result. Feedback returns to the core and informs the next iteration.' },
];
const selected = ref(0);
const preview = ref<number | null>(null);
const highlighted = computed(() => preview.value ?? selected.value);
const space = ref<HTMLElement>();
const tilt = ref('rotateX(0deg) rotateY(0deg)');
function move(event: PointerEvent) {
  if (props.stopped || event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bounds = space.value?.getBoundingClientRect();
  if (bounds) tilt.value = `rotateX(${-(event.clientY - bounds.top - bounds.height / 2) / bounds.height * 5}deg) rotateY(${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 7}deg)`;
}
function path(i: number) {
  const d = domains[i]!;
  return `M 500 260 Q ${i % 2 ? 720 : 280} 260 ${d.x * 10} ${d.y * 5.2}`;
}
</script>

<template>
  <div ref="space" class="network-space" @pointermove="move" @pointerleave="tilt = 'rotateX(0deg) rotateY(0deg)'; preview = null">
    <div class="network-plane" :style="{ transform: tilt }">
      <div class="network-orbit orbit-one" aria-hidden="true" /><div class="network-orbit orbit-two" aria-hidden="true" />
      <svg class="network-wires" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
        <g v-for="(domain, i) in domains" :key="domain.name" :class="{ energized: highlighted === i }">
          <path :d="path(i)" class="wire-shadow"/><path :d="path(i)" class="wire" />
          <path :d="path(i)" class="impulse" pathLength="100" :style="{ animationDelay: `${-i * 1.1}s` }" />
        </g>
      </svg>
      <div class="network-core" :style="{ '--turn': `${selected * 90}deg` }" aria-hidden="true"><div class="core-reticle" /><div class="core-shell"><span class="core-symbol">i<span>v</span></span><span class="core-label">Connect</span><span class="core-domain">{{ domains[selected]!.name }}</span></div></div>
      <button v-for="(domain, i) in domains" :key="domain.name" class="network-node" :class="{ selected: selected === i, highlighted: highlighted === i }" :style="{ left: `${domain.x}%`, top: `${domain.y}%` }" :aria-pressed="selected === i" aria-controls="network-detail" @click="selected = i" @pointerenter="preview = i" @pointerleave="preview = null" @focus="preview = i" @blur="preview = null">
        <span class="node-disc" aria-hidden="true">{{ domain.mark }}<span class="node-tick">{{ selected === i ? '↗' : '+' }}</span></span><span class="node-name">{{ domain.name }}</span>
      </button>
      <span class="network-coordinate" aria-hidden="true">RELATIONSHIP FIELD<br>Four domains. One connected practice.</span>
    </div>
  </div>
  <div id="network-detail" class="lab-readout" aria-live="polite" aria-atomic="true"><div><p class="lab-eyebrow">Selected domain / {{ String(selected + 1).padStart(2, '0') }}</p><h3>{{ domains[selected]!.name }}</h3></div><p>{{ domains[selected]!.copy }}</p></div>
</template>

<style scoped>
.network-space { position: relative; perspective: 1000px; background: radial-gradient(ellipse at 50% 48%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 58%); }
.network-plane { position: relative; height: 520px; transition: transform 600ms ease-out; transform-style: preserve-3d; }
.network-orbit { position: absolute; left: 50%; top: 50%; border: 1px solid var(--color-border); border-radius: 50%; pointer-events: none; }
.orbit-one { width: 67%; height: 73%; transform: translate(-50%, -50%) rotate(-22deg); }
.orbit-two { width: 47%; height: 91%; transform: translate(-50%, -50%) rotate(36deg); border-style: dashed; opacity: .65; }
.network-wires { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; }
.wire { stroke: var(--color-border-control); stroke-width: 1.2; transition: stroke 500ms, stroke-width 500ms; }
.wire-shadow { stroke: var(--color-accent); stroke-width: 12; opacity: 0; transition: opacity 600ms; }
.energized .wire-shadow { opacity: .07; }
.energized .wire { stroke: var(--color-accent); stroke-width: 2.5; }
.impulse { stroke: var(--color-system); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 3 97; animation: network-travel 5s linear infinite; opacity: .5; }
.energized .impulse { opacity: 1; stroke-width: 4; }
.network-core { position: absolute; left: 50%; top: 50%; width: 174px; height: 174px; transform: translate(-50%, -50%); }
.core-shell { position: absolute; inset: 12px; display: flex; align-items: center; justify-content: center; flex-direction: column; border-radius: 50%; border: 1px solid var(--color-accent); background: var(--color-surface); box-shadow: 0 20px 40px color-mix(in srgb, var(--color-accent) 15%, transparent), inset 0 0 25px color-mix(in srgb, var(--color-accent) 10%, transparent); }
.core-reticle { position: absolute; inset: -8px; border: 2px solid var(--color-border); border-right: 4px solid var(--color-system); border-bottom-color: transparent; border-radius: 50%; transform: rotate(var(--turn)); transition: transform 850ms cubic-bezier(.2,.8,.2,1); }
.core-symbol { font-size: 55px; font-weight: 600; line-height: 1; letter-spacing: -.12em; padding-right: 8px; }
.core-symbol span { color: var(--color-accent); }
.core-label { font: 11px var(--font-mono); letter-spacing: .12em; margin-top: 8px; text-transform: uppercase; }
.core-domain { color: var(--color-text-muted); font-size: 10px; margin-top: 6px; }
.network-node { position: absolute; width: 155px; min-height: 110px; transform: translate(-50%, -42%); display: flex; align-items: center; flex-direction: column; gap: 10px; border-radius: 10px; }
.node-disc { display: flex; align-items: center; justify-content: center; position: relative; height: 65px; width: 65px; border: 1px solid var(--color-border-control); border-radius: 50%; background: var(--color-surface); font-size: 27px; font-family: var(--font-mono); transition: transform 550ms cubic-bezier(.2,.8,.2,1), background 350ms, box-shadow 350ms; }
.node-name { font-size: 14px; background: var(--color-surface); padding: 0 5px; }
.node-tick { position: absolute; top: -3px; right: -3px; width: 20px; height: 20px; font-size: 12px; background: var(--color-surface-raised); border-radius: 50%; }
.highlighted .node-disc { box-shadow: 0 0 0 8px color-mix(in srgb, var(--color-accent) 9%, transparent); }
.selected .node-disc { transform: scale(1.18); background: var(--color-accent); color: var(--color-on-accent); border-color: var(--color-accent); }
.selected .node-tick { color: var(--color-accent); }
.selected .node-name { text-decoration: underline; text-underline-offset: 5px; }
.network-coordinate { position: absolute; bottom: 16px; left: 32px; font: 10px/1.8 var(--font-mono); color: var(--color-text-muted); }
@keyframes network-travel { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
@media (max-width: 700px) {
  .network-plane { height: 450px; }
  .network-node { width: 125px; }
  .node-name { font-size: 12px; }
  .node-disc { width: 50px; height: 50px; font-size: 23px; }
  .network-core { width: 130px; height: 130px; }
  .core-symbol { font-size: 40px; }
  .core-domain { display: none; }
  .network-coordinate { left: 16px; font-size: 9px; }
  .orbit-two { width: 68%; height: 78%; }
}
</style>
