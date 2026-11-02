<script setup lang="ts">
import type { PortfolioProject } from '~/composables/useProjects';
import { portalVisual } from './portal';
defineProps<{ exiting:boolean; project: PortfolioProject; labels: { behavior:string; index:string; escape:string; github:string; back:string; stack:string; diagram:string; live:string; details:string }; visualStyle:Record<string,string> }>();
defineEmits<{ close:[] }>();
const { t }=useI18n();
const root=ref<HTMLElement>();
onMounted(()=>root.value?.focus({preventScroll:true}));
function trap(event:KeyboardEvent) {
  if(event.key!=='Tab')return;
  // The persistent radio is a sibling of this workspace and must remain keyboard reachable.
  if(document.querySelector('[data-radio-player]')?.getClientRects().length)return;
  const items=root.value?.querySelectorAll<HTMLElement>('button,a[href]');if(!items?.length)return;
  const first=items[0]!,last=items[items.length-1]!;
  if(event.shiftKey && (document.activeElement===first||document.activeElement===root.value)){event.preventDefault();last.focus();}
  else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
}
</script>
<template>
  <section ref="root" class="portal-workspace" :class="{'portal-retract':exiting}" tabindex="-1" :aria-label="project.title" @keydown="trap" @keydown.esc.stop.prevent="$emit('close')">
    <img class="portal-continuity" :src="portalVisual" :style="visualStyle" alt="">
    <header class="portal-header"><span>{{ labels.index }} — {{ project.title }}</span><button data-action="portal-close" @click="$emit('close')">↙ {{ labels.back }} <small>{{ labels.escape }}</small></button></header>
    <div class="portal-reading">
      <p class="portal-category">{{ project.category }}</p>
      <h1>{{ project.title }}</h1>
      <p class="portal-description">{{ project.shortDescription }}</p>
      <figure><img :src="portalVisual" :alt="labels.diagram"><figcaption>{{ labels.diagram }}</figcaption></figure>
      <section class="portal-behavior"><h2>{{ labels.behavior }}</h2><p>{{ t('ui.guided_clarification_multiagent_routing_and_blueprint_generation_safety_review') }}</p></section>
      <section><h2>{{ labels.stack }}</h2><ul class="portal-stack"><li v-for="tech in project.technologies" :key="tech">{{ tech }}</li></ul></section>
      <nav :aria-label="project.title"><a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer">{{ labels.live }} ↗</a><a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">{{ labels.github }} ↗</a></nav>
    </div>
  </section>
</template>
