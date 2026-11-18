<script setup lang="ts">
import type { PortfolioProject } from '~/composables/useProjects';
import { getRoomCopy } from './project-rooms';
import { worksCopy } from './copy';
const props=defineProps<{locale:string;project:PortfolioProject|undefined;initial:number;received:boolean;routing:boolean}>();
const emit=defineEmits<{close:[];select:[index:number,route:boolean]}>();
const c=computed(()=>getRoomCopy(props.locale));
const wc=computed(()=>worksCopy[props.locale as keyof typeof worksCopy]||worksCopy.en);
const selected=ref(props.initial),root=ref<HTMLElement>();
function choose(i:number){selected.value=i;emit('select',i,false);}
function route(){emit('select',selected.value,true);}
onMounted(()=>root.value?.focus());
function keyboard(e:KeyboardEvent){
 e.stopPropagation();if(e.key==='Escape'){e.preventDefault();emit('close');}
 if(e.key!=='Tab')return;
 const nodes=root.value?.querySelectorAll<HTMLElement>('button,a[href]');if(!nodes?.length)return;
 const first=nodes[0]!,last=nodes[nodes.length-1]!;
 if(e.shiftKey&&(document.activeElement===first||document.activeElement===root.value)){e.preventDefault();last.focus();}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
}
</script>
<template>
 <section ref="root" class="openme-reading" role="dialog" aria-modal="true" aria-labelledby="openme-title" tabindex="-1" @keydown="keyboard" @pointerdown.stop>
  <header><span>Living Works / 02</span><button @click="emit('close')">{{ c.close }} ↙ <small>Esc</small></button></header>
  <h1 id="openme-title">OpenMe<span>↗</span></h1><p class="om-intro">{{ c.intro }}</p>
  <p class="om-fine">{{ c.demo }}</p>
  <h2>{{ c.choose }}</h2>
  <nav class="om-endpoints" :aria-label="c.choose"><button v-for="(name,i) in c.endpoints" :key="i" :aria-pressed="selected===i" @click="choose(i)">{{ String(i+1).padStart(2,'0') }} / {{ name }} ↗</button></nav>
  <div class="om-workflow"><div><h3>{{ c.boundary }}</h3><p>{{ c.boundaryText }}</p><button :disabled="routing" @click="route">{{ c.send }} →</button></div><div aria-live="polite"><h3>{{ c.inbox }}</h3><p v-if="received">✓ {{ c.received }}: <strong>{{ c.endpoints[selected] }}</strong></p><p v-else>{{ routing ? 'Routing sample…' : '' }} 01 / {{ c.endpoints[selected] }} → 02 / {{ c.inbox }}</p><p class="om-fine">{{ c.summary }}</p><button v-if="received" @click="choose(selected)">{{ c.reset }}</button></div></div>
  <details><summary>{{ c.details }}</summary><article v-if="project"><img v-if="project.image" :src="project.image" :alt="project.title" style="width:100%;height:auto"><p>{{ project.shortDescription }}</p><p>{{ c.role }}</p><div lang="en"><p>{{ project.longDescription }}</p><ul><li v-for="item in project.highlights" :key="item">{{ item }}</li></ul></div><p class="om-stack">{{ project.technologies.join(' · ') }}</p><nav class="om-links"><a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer">{{ wc.live }} ↗</a><a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer">{{ wc.source }} ↗</a></nav></article></details>
 </section>
</template>
<style scoped>
.openme-reading{position:absolute;z-index:30;top:12%;bottom:12%;right:18px;width:min(390px,calc(100% - 72px));overflow:auto;background:#142c25;color:#e7f1e5;border:1px solid #63c68a;padding:20px;box-shadow:0 24px 90px #0009;font-family:monospace}.openme-reading header,.om-links{display:flex;justify-content:space-between;gap:16px;align-items:center}.openme-reading h1{font-size:clamp(40px,7vw,76px);margin:28px 0 8px;letter-spacing:-.06em}.openme-reading h1 span{color:#72e3a0;margin-left:24px}.om-intro{font-size:20px}.om-fine{font-size:14px;color:#b8ccb9;line-height:1.7}.openme-reading button,.openme-reading a,.openme-reading summary{min-height:44px;color:inherit;background:transparent;border:1px solid #739782;padding:12px;cursor:pointer;font:inherit;text-align:left}.openme-reading :focus-visible{outline:3px solid #c7ef89;outline-offset:3px}.om-endpoints{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.om-endpoints [aria-pressed=true]{background:#2f6946;border-color:#87eca7}.om-workflow{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:24px 0}.om-workflow>div{border-top:2px solid #72e3a0;padding-top:8px}.openme-reading p,.openme-reading li{line-height:1.7}.openme-reading details{border-top:1px solid #739782;padding-top:16px}.om-stack{color:#a1e1b7}.om-links{justify-content:flex-start;flex-wrap:wrap}@media(max-width:650px){.openme-reading{inset:10px 10px 85px}.om-workflow{grid-template-columns:1fr}.openme-reading header{align-items:start}.openme-reading header span{font-size:11px}}
</style>
