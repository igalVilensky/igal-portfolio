<script setup lang="ts">
import type { PortfolioProject } from '~/composables/useProjects';
import { worksCopy } from './copy';
const props=defineProps<{kind:'matrix'|'archive';locale:string;projects:PortfolioProject[];exiting:boolean}>();
const selected=defineModel<string>('selected',{required:true});
const emit=defineEmits<{close:[]}>();
const c=computed(()=>worksCopy[props.locale as keyof typeof worksCopy]||worksCopy.en);
const items=computed(()=>props.projects.filter(p=>p.projectType==='work'));
const project=computed(()=>items.value.find(p=>p.id===(props.kind==='matrix'?'decision-matrix-ai':selected.value))||items.value[0]!);
const image=computed(()=>project.value.id==='decision-matrix-ai'?'/arrival-lab/decision-matrix.png':project.value.image);
const root=ref<HTMLElement>();
const localePath=useLocalePath();
const link=(url:string)=>url.startsWith('/')?localePath(url):url;
onMounted(()=>root.value?.focus({preventScroll:true}));
function keyboard(e:KeyboardEvent){
 if(e.key==='Escape'){e.stopPropagation();e.preventDefault();if(!e.repeat)emit('close');return;}
 if(e.key!=='Tab'||document.querySelector('[data-radio-player]')?.getClientRects().length)return;
 const nodes=root.value?.querySelectorAll<HTMLElement>('button,a[href]');if(!nodes?.length)return;
 const first=nodes[0]!,last=nodes[nodes.length-1]!;
 if(e.shiftKey&&(document.activeElement===first||document.activeElement===root.value)){e.preventDefault();last.focus();}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
}
</script>
<template>
 <section ref="root" class="project-workspace" :class="{'project-retract':exiting}" tabindex="-1" :aria-label="kind==='archive'?c.archive:project.title" @keydown="keyboard" @pointerdown.stop>
  <header class="project-workspace-header"><span>{{ c.boundary }} / {{ kind==='archive'?c.archive:'Decision Matrix AI' }}</span><button data-action="portal-close" @click="emit('close')">↙ {{ c.continue }} <small>Esc</small></button></header>
  <div class="project-editorial">
   <nav v-if="kind==='archive'" class="project-index" :aria-label="c.select"><h1>{{ c.archive }}</h1><p>{{ c.archiveHint }}</p><button v-for="(p,i) in items" :key="p.id" :data-project="p.id" :aria-current="selected===p.id?'true':undefined" @click="selected=p.id"><small>{{ String(i+1).padStart(2,'0') }}</small>{{ p.title }}<span v-if="selected===p.id">↗</span></button></nav>
   <article :key="project.id" class="project-story" :aria-label="c.summary">
    <p class="project-category">{{ project.category }}</p><h2>{{ project.title }}</h2><p class="project-lead">{{ project.shortDescription }}</p>
    <img v-if="image" class="project-image" :src="image" :alt="project.title">
    <div v-if="kind==='matrix'" class="project-scoring"><span v-for="(criterion,i) in c.criteria" :key="criterion">{{ criterion }}<strong>×</strong>{{ c.weight }}<span>→</span></span><p>Σ → {{ c.total }}</p><small>{{ c.sample }}</small></div>
    <div class="project-source-content" lang="en"><p>{{ project.longDescription }}</p><ul><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul></div>
    <p class="project-stack">{{ project.technologies.join(' · ') }}</p>
    <nav class="project-links" :aria-label="project.title"><a v-if="project.liveUrl" :href="link(project.liveUrl)" target="_blank" rel="noopener noreferrer">{{ c.live }} ↗</a><a v-if="project.caseStudyUrl" :href="link(project.caseStudyUrl)" target="_blank" rel="noopener noreferrer">{{ c.caseStudy }} ↗</a><a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">{{ c.source }} ↗</a><p v-if="!project.liveUrl&&!project.caseStudyUrl&&!project.githubUrl">{{ c.none }}</p></nav>
   </article>
  </div>
 </section>
</template>
