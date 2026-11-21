<script setup lang="ts">
import { islandDestinations } from './wayfinding';
import { expansionCopy } from './lagoon-copy';
const {locale}=useI18n();
const aquatic=computed(()=>expansionCopy[locale.value==='de'||locale.value==='ru'?locale.value:'en']);
import { originBoundary } from './origin';
const props=defineProps<{position:{x:number;z:number};environment:string}>();
defineEmits<{close:[];travel:[id:string]}>();
const local=computed(()=>props.environment==='antipayuta'||props.environment==='sun-world');
const north=computed(()=>props.environment==='antipayuta');
const points=originBoundary.map(([x,z])=>`${x},${z}`).join(' ');
const player=computed(()=>({x:Math.max(-212,Math.min(100,props.position.x)),z:Math.max(-120,Math.min(153,props.position.z))}));
const closeButton=ref<HTMLButtonElement>();
onMounted(()=>closeButton.value?.focus());
</script>
<template>
 <section class="island-map" role="dialog" aria-modal="true" aria-labelledby="island-map-title" @keydown.esc.stop.prevent="$emit('close')">
  <header><div><p>ARRIVAL · FIELD GUIDE</p><h2 id="island-map-title">{{ local ? north ? 'North memory' : 'Israel memory' : environment==='vault' ? 'Impossible House' : environment==='loop' ? 'Loop District' : 'The island' }}</h2></div><button ref="closeButton" @click="$emit('close')">Close map ×</button></header>
  <svg v-if="!local && environment!=='loop' && environment!=='vault'" viewBox="-230 -150 380 330" role="img" aria-label="Island layout with your location and destinations">
   <ellipse cx="-170" cy="65" rx="41" ry="39" fill="#73c6c0" stroke="#4d9394"/><rect x="-190" y="112" width="48" height="40" rx="4" fill="#a6c9af"/><path d="M-112 62H-134 M-166 101V114" stroke="#a4b4a3" stroke-width="5"/><path d="M-180 30V100" stroke="#e6efd6" stroke-width="2"/>
   <polygon :points="points" fill="#d9d8bd" stroke="#7e988d" stroke-width="2"/>
   <path d="M-24 -100H24V24H-24Z M-62 10H-24 M24 19H100 M12 26V115 M-35 40V90 M35 35V90 M35 62H70" fill="none" stroke="#a4b4a3" stroke-width="6"/>
   <g v-for="d in islandDestinations" :key="d.id"><circle :cx="d.x" :cy="d.z" r="2.5" fill="#4b6a66"/><text :x="d.x" :y="d.z+(d.id==='israel'?14:-7)" text-anchor="middle">{{d.id==='living-lagoon'?aquatic.lagoon:d.id==='creation-yard'?aquatic.yard:d.name}}</text></g>
   <circle :cx="player.x" :cy="player.z" r="5" fill="#c45e35" stroke="#fff9df" stroke-width="2"/>
   <text x="-118" y="-125">↑ Hall / memory doors</text>
  </svg>
  <svg v-else-if="local" :viewBox="north ? '-25 -12 70 115' : '-20 -8 55 55'" role="img" :aria-label="north?'North cabin and return door':'Israel lane and promenade'">
   <rect x="-25" y="-12" width="80" height="120" :fill="north?'#dce7e9':'#ead9b5'"/>
   <template v-if="north"><rect x="10" y="75.5" width="6" height="5" fill="#997453"/><text x="13" y="87" text-anchor="middle">Warm cabin</text></template>
   <template v-else><path d="M0 0V12H9V32H20" fill="none" stroke="#bdaf8a" stroke-width="2"/><path d="M-13 37H24" stroke="#469bb0" stroke-width="5"/><text x="7" y="42" text-anchor="middle">Sea / promenade</text></template>
   <circle cx="0" cy="0" r="1" fill="#496c67"/><text x="0" y="-3" text-anchor="middle">Return to Arrival</text>
   <circle :cx="position.x" :cy="position.z" :r="north?1.5:.8" fill="#c45e35" stroke="#fff9df" stroke-width=".4"/>
  </svg>
  <svg v-else-if="environment==='vault'" viewBox="375 410 50 65" role="img" aria-label="Impossible House interior and your location"><rect x="382" y="420" width="36" height="46" fill="#d9d8bd" stroke="#7e988d"/><text x="385" y="417">Impossible House</text><circle :cx="position.x" :cy="position.z" r="1.5" fill="#c45e35"/></svg>
  <svg v-else viewBox="70 12 220 90" role="img" aria-label="Loop district and your location">
   <ellipse cx="242" cy="53" rx="34" ry="31" fill="#d9d8bd" stroke="#7e988d"/>
   <path d="M80 48H242L265 74" fill="none" stroke="#a4b4a3" stroke-width="3"/>
   <text x="214" y="43">← Island bridge</text><text x="249" y="83">SkyTube</text>
   <circle cx="265" cy="74" r="1.5" fill="#4b6a66"/><circle :cx="position.x" :cy="position.z" r="2" fill="#c45e35" stroke="#fff9df" stroke-width=".7"/>
  </svg>
  <template v-if="!local && environment!=='loop' && environment!=='vault'"><p>{{aquatic.guide}}</p><div class="map-expansion"><button @click="$emit('travel','living-lagoon')">{{aquatic.lagoon}}</button><button @click="$emit('travel','creation-yard')">{{aquatic.yard}}</button></div></template>
  <p class="island-map-key"><span>●</span> You are here · Schematic, distances approximate</p>
  <p>North and Israel are entered through the memory doors inside Arrival. Loop is reached by SkyTube.</p>
 </section>
</template>
<style scoped>
.island-map{position:absolute;z-index:35;inset: max(20px,6vh) auto auto 50%;transform:translateX(-50%);width:min(680px,92vw);max-height:86vh;overflow:auto;padding:24px;background:#f3eedb;color:#293f40;border:1px solid #a6b4a4;border-radius:18px;box-shadow:0 24px 90px #0d232a66;font:14px/1.5 sans-serif}.island-map header{display:flex;align-items:center;justify-content:space-between;gap:12px}.island-map h2{font-size:24px;margin:0}.island-map p{margin:8px 0}.island-map header p{font-size:10px;letter-spacing:.18em}.island-map button{border:1px solid #8a9b8d;border-radius:20px;padding:9px 14px;background:transparent;color:inherit;cursor:pointer}.island-map svg{display:block;width:100%;max-height:53vh;margin:12px 0}.island-map text{font:6px sans-serif;fill:#293f40}.island-map svg[viewBox='-25 -12 70 115'] text{font-size:3px}.island-map svg[viewBox='-20 -8 55 55'] text{font-size:2.4px}.island-map-key span{color:#c45e35}.island-map-loop{padding:40px 0}
</style>
