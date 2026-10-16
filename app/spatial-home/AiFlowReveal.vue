<script setup lang="ts">
import ActiveCore from './ActiveCore.vue';
import { projectSurfacePath } from './plateGeometry';
const props = defineProps<{ progress: number }>();
const phase = (start: number, length: number) => Math.max(0, Math.min(1, (props.progress - start) / length));
const incoming = computed(() => phase(0, .38));
const energy = computed(() => phase(.26, .4));
const output = computed(() => phase(.57, .43));
const pulse = computed(() => Math.sin(phase(.35, .58) * Math.PI));
const inputs = ['M-190 112 -94 88 -30 114 40 100 190 166 280 176', 'M-160 167 -62 143 2 169 100 127 220 179 280 176', 'M-110 222 -15 197 65 219 160 154 280 176'].map(projectSurfacePath);
const outputs = ['M402 181 500 176 680 126 746 153 910 111', 'M500 176 566 203 746 153 786 169 950 127', 'M566 203 606 219 786 169 826 185 990 143'].map(projectSurfacePath);
</script>

<template>
  <g class="ai-flow" aria-hidden="true" :opacity="Math.min(1, progress * 12)">
    <ActiveCore :energy="energy" :pulse="pulse" />
    <g class="signals incoming" :opacity=".8">
      <path v-for="path in inputs" :key="path" :d="path" pathLength="1" :stroke-dashoffset="1 - incoming" />
    </g>
    <g class="signals outgoing" :opacity="output">
      <path v-for="path in outputs" :key="path" :d="path" pathLength="1" :stroke-dashoffset="1 - output" />
    </g>
    <!-- Narrow screens use short local intake and output, without scaling a wide scene. -->
    <g class="signals compact-input"><path :d="projectSurfacePath('M8 143 40 135 100 161 170 151 280 176 M18 198 82 181 146 207 220 179 280 176')" pathLength="1" :stroke-dashoffset="1 - incoming" /></g>
    <g class="signals compact-output" :opacity="output"><path :d="projectSurfacePath('M402 181 500 176 630 141 704 171 M500 176 552 198 660 169 704 187')" pathLength="1" :stroke-dashoffset="1 - output" /></g>
    <path class="transfer" :d="projectSurfacePath('M280 176 335 200 402 181')" pathLength="1" :stroke-dashoffset="1 - energy" :opacity="energy" />
  </g>
</template>

<style scoped>
.ai-flow { pointer-events: none; }
.signals, .transfer { fill: none; stroke: var(--sp-cyan); stroke-width: 2.5; stroke-linejoin: round; stroke-linecap: round; }
.signals path, .transfer { stroke-dasharray: 1; }
.outgoing { stroke-width: 3; }.transfer { stroke-width: 4; }
.compact-input, .compact-output { display: none; }
@media (max-width: 600px) { .incoming, .outgoing { display: none; }.compact-input, .compact-output { display: block; } }
</style>
