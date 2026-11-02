<script setup lang="ts">
import type { PortfolioProject } from '~/composables/useProjects';
import { worksCopy } from './copy';
import { weightedResults, sampleScores } from './matrix';
import { worksModules } from './registry';
const props=defineProps<{mode:'destinations'|'matrix'|'archive';locale:string;projects:PortfolioProject[];weights:number[];selected:number;surfaceStyle?:Record<string,string>}>();
const emit=defineEmits<{close:[];travel:[id:string];weight:[index:number,value:number];criterion:[index:number];reset:[]}>();
const c=computed(()=>worksCopy[props.locale as keyof typeof worksCopy]||worksCopy.en);
const active=ref('decision-matrix-ai'), root=ref<HTMLElement>();
const workProjects=computed(()=>props.projects.filter((p:PortfolioProject)=>p.projectType==='work'));
const project=computed(()=>workProjects.value.find((p:PortfolioProject)=>p.id===(props.mode==='matrix'?'decision-matrix-ai':active.value))!);
const results=computed(()=>weightedResults(props.weights));
const localePath=useLocalePath();
const link=(url:string)=>url.startsWith('/')?localePath(url):url;
const moduleName=(id:string)=>id==='matrix'?c.value.matrix:id==='archive'?c.value.archive:'FlowForge';
watch(()=>props.mode,()=>nextTick(()=>root.value?.querySelector<HTMLButtonElement>('button')?.focus()));
onMounted(()=>root.value?.querySelector<HTMLButtonElement>('button')?.focus());
</script>
<template>
 <section ref="root" class="works-surface" :class="'works-'+mode" :style="mode==='matrix'?surfaceStyle:undefined" :aria-label="mode==='matrix'?c.matrix:mode==='archive'?c.archive:c.choose" @keydown.stop @keydown.esc.prevent="emit('close')" @pointerdown.stop>
  <header><span>{{ c.boundary }} / {{ mode==='archive'?c.archive:mode==='matrix'?'Decision Matrix AI':c.choose }}<small v-if="mode==='matrix'" class="works-demo">{{ c.demo }}</small></span><button data-action="works-close" :aria-label="c.close" :title="c.close" @click="emit('close')">×</button></header>
  <template v-if="mode==='destinations'">
   <h2>{{ c.name }}</h2>
   <nav :aria-label="c.choose"><button v-for="module in worksModules.filter(m=>m.availability==='available')" :key="module.id" :data-destination="module.id" @click="emit('travel',module.id)">{{ moduleName(module.id) }} <span>→</span></button><button data-destination="gallery" @click="emit('travel','gallery')">{{ c.go }} <span>→</span></button><button data-destination="arrival" @click="emit('travel','arrival')">{{ c.arrival }} <span>↶</span></button></nav>
  </template>
  <template v-else-if="mode==='matrix'">
   <h2>{{ c.intro }}</h2><p class="works-instruction">{{ c.instruction }}</p>
   <div class="works-criteria"><div v-for="(name,i) in c.criteria" :key="name" :class="{selected:selected===i}"><button :aria-pressed="selected===i" :data-criterion="i" @click="emit('criterion',i)">{{ String(i+1).padStart(2,'0') }} {{ name }}</button><label :for="'works-weight-'+i">{{ c.weight }} <output>{{ weights[i] }}</output></label><input :id="'works-weight-'+i" :data-weight="i" type="range" min="1" max="5" step="1" :value="weights[i]" @input="emit('weight',i,Number(($event.target as HTMLInputElement).value))"><small>A: {{ sampleScores[0][i] }} · B: {{ sampleScores[1][i] }} / 5</small></div></div>
   <div class="works-totals" aria-live="polite"><span v-for="(result,i) in results" :key="i">{{ c.option }} {{ i?'B':'A' }} <strong>{{ result.total }}</strong> <small>{{ result.percent }}%</small></span><span class="works-rank">{{ results[0]!.total===results[1]!.total?c.tie:c.rank+': '+(results[0]!.total>results[1]!.total?'A':'B') }}</span></div>
   <p class="works-fine">{{ c.formula }}<br>{{ c.sample }}</p>
   <footer><button data-action="matrix-reset" @click="emit('reset')">{{ c.reset }}</button><details><summary>{{ c.project }}</summary><p>{{ project.shortDescription }}</p><p>{{ project.technologies.join(' · ') }}</p><a :href="link(project.liveUrl!)" target="_blank" rel="noopener noreferrer">{{ c.live }} ↗</a><a :href="project.githubUrl" target="_blank" rel="noopener noreferrer">{{ c.source }} ↗</a></details><button data-destination="archive" @click="emit('travel','archive')">{{ c.archive }} →</button></footer>
  </template>
  <template v-else>
   <h2>{{ c.archive }}</h2><p>{{ c.archiveHint }}</p>
   <label class="works-project-select">{{ c.select }}<select data-action="archive-select" v-model="active"><option v-for="p in workProjects" :key="p.id" :value="p.id">{{ p.title }}</option></select></label>
   <article :aria-label="c.summary"><small>{{ project.category }}</small><h3>{{ project.title }}</h3><p>{{ project.shortDescription }}</p><p class="works-stack">{{ project.technologies.join(' · ') }}</p><nav :aria-label="project.title"><a v-if="project.caseStudyUrl" :href="link(project.caseStudyUrl)" target="_blank" rel="noopener noreferrer">{{ c.caseStudy }} ↗</a><a v-if="project.liveUrl" :href="link(project.liveUrl)" target="_blank" rel="noopener noreferrer">{{ c.live }} ↗</a><a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">{{ c.source }} ↗</a><p v-if="!project.caseStudyUrl&&!project.liveUrl&&!project.githubUrl">{{ c.none }}</p></nav></article>
   <footer><button data-destination="matrix" @click="emit('travel','matrix')">{{ c.inspect }} →</button><button @click="emit('close')">{{ c.continue }}</button></footer>
  </template>
 </section>
</template>
