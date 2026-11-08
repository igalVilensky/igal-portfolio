<script setup lang="ts">
import type { WorldSpace } from '../spaces';
import type { PortfolioProject } from '~/composables/useProjects';
import { worksCopy } from './copy';
import { weightedResults, sampleScores } from './matrix';
import { worksModules } from './registry';
const props=defineProps<{spaces:readonly WorldSpace[];mode:'destinations'|'matrix';locale:string;projects:PortfolioProject[];weights:number[];selected:number}>();
const emit=defineEmits<{close:[];travel:[id:string];weight:[index:number,value:number];criterion:[index:number];reset:[];details:[]}>();
const c=computed(()=>worksCopy[props.locale as keyof typeof worksCopy]||worksCopy.en);
const root=ref<HTMLElement>();
const results=computed(()=>weightedResults(props.weights));
const moduleName=(id:string)=>id==='matrix'?c.value.matrix:id==='archive'?c.value.archive:'FlowForge';
watch(()=>props.mode,()=>nextTick(()=>root.value?.querySelector<HTMLButtonElement>('button')?.focus()));
onMounted(()=>root.value?.querySelector<HTMLButtonElement>('button')?.focus());
</script>
<template>
 <section ref="root" class="works-surface" :class="'works-'+mode"  :aria-label="mode==='matrix'?c.matrix:c.choose" @keydown.stop @keydown.esc.prevent="emit('close')" @pointerdown.stop>
  <header><span>{{ c.boundary }} / {{ mode==='matrix'?'Decision Matrix AI':c.choose }}<small v-if="mode==='matrix'" class="works-demo">{{ c.demo }}</small></span><button data-action="works-close" :aria-label="c.close" :title="c.close" @click="emit('close')">×</button></header>
  <template v-if="mode==='destinations'">
   <h2>{{ c.choose }}</h2>
   <nav :aria-label="c.choose"><button v-for="room in spaces" :key="room.id" :data-space="room.id" @click="emit('travel',room.id)">{{ room.names[locale as 'en'] || room.names.en }} <span>→</span></button><button v-for="module in worksModules.filter(m=>m.availability==='available')" :key="module.id" :data-destination="module.id" @click="emit('travel',module.id)">{{ moduleName(module.id) }} <span>→</span></button><button data-destination="gallery" @click="emit('travel','gallery')">{{ c.go }} <span>→</span></button><button data-destination="arrival" @click="emit('travel','arrival')">{{ c.arrival }} <span>↶</span></button></nav>
  </template>
  <template v-else-if="mode==='matrix'">
   <div class="works-criteria"><div v-for="(name,i) in c.criteria" :key="name" :class="{selected:selected===i}"><button :aria-pressed="selected===i" :data-criterion="i" @click="emit('criterion',i)">{{ String(i+1).padStart(2,'0') }} {{ name }}</button><label :for="'works-weight-'+i">{{ c.weight }} <output>{{ weights[i] }}</output></label><input :id="'works-weight-'+i" :data-weight="i" type="range" min="1" max="5" step="1" :value="weights[i]" @input="emit('weight',i,Number(($event.target as HTMLInputElement).value))"><small>A: {{ sampleScores[0][i] }} · B: {{ sampleScores[1][i] }} / 5</small></div></div>
   <div class="works-totals" aria-live="polite"><span v-for="(result,i) in results" :key="i">{{ c.option }} {{ i?'B':'A' }} <strong>{{ result.total }}</strong> <small>{{ result.percent }}%</small></span><span class="works-rank">{{ results[0]!.total===results[1]!.total?c.tie:c.rank+': '+(results[0]!.total>results[1]!.total?'A':'B') }}</span></div>
   <p class="works-fine">{{ c.formula }} · {{ c.demo }}</p>
   <footer><button data-action="matrix-reset" @click="emit('reset')">{{ c.reset }}</button><button data-action="matrix-details" @click="emit('details')">{{ c.project }} ↗</button></footer>
  </template>
 </section>
</template>
