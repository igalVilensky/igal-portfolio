<script setup lang="ts">
import ContrastChecker from '~/components/lab/ContrastChecker.vue';
import ThemeToggle from '~/components/ThemeToggle.vue';
import KineticCore from '~/spatial-experiments/KineticCore.client.vue';
import { experiments } from '~/spatial-experiments/registry';
definePageMeta({ layout: false, key: 'spatial-experiments' });
const { t, locale } = useI18n();
const localePath = useLocalePath(), switchLocalePath = useSwitchLocalePath();
const selected = ref<string | null>(null), paused = ref(false), unavailable = ref(false);
const active = computed(() => experiments.find(item => item.id === selected.value));
type Phase = 'selected' | 'idle' | 'aligning' | 'extracting' | 'deploying' | 'active-tool' | 'retracting';
const phase=ref<Phase>('idle'), core=ref<InstanceType<typeof KineticCore>>(), surface=ref<HTMLElement>();
const visible=ref(false), controls=ref(false);
const busy=computed(()=>!['idle','selected'].includes(phase.value));
let bounds: {x:number;y:number;width:number;height:number}|null=null;
let animation:Animation|undefined, dead=false, handoffFrame=0;
let finishHandoff:(()=>void)|undefined;
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
function transform() {
 const r=surface.value!.getBoundingClientRect();
 const b=bounds??{x:r.x+r.width/2,y:r.y+r.height/2,width:1,height:1};
 return `translate(${b.x-r.x}px,${b.y-r.y}px) scale(${b.width/r.width},${b.height/r.height})`;
}
async function morph(open:boolean) {
 const node=surface.value;if(!node)return;
 animation=node.animate([{transform:open?transform():'none'},{transform:open?'none':transform()}],{duration:reduced()?0:620,easing:'cubic-bezier(.22,.7,.18,1)',fill:'forwards'});
 try{await animation.finished;}catch{}
}
async function activate() {
 if(!active.value||busy.value)return;
 phase.value='aligning';
 if(!unavailable.value && !reduced()) {
  bounds=await core.value?.deploy()??null;
 }
 if(dead)return;
 visible.value=true;phase.value='deploying';await nextTick();
 core.value?.hideModule();
 await morph(true);if(dead)return;
 animation?.cancel();controls.value=true;await nextTick();
 await new Promise<void>(resolve=>{finishHandoff=resolve;handoffFrame=requestAnimationFrame(()=>{handoffFrame=0;finishHandoff=undefined;resolve();});});if(dead)return;
 phase.value='active-tool';await nextTick();
 surface.value?.querySelector<HTMLElement>('button')?.focus({preventScroll:true});
}
async function closeTool() {
 if(phase.value!=='active-tool')return;
 bounds=core.value?.bounds()??bounds;
 phase.value='retracting';controls.value=false;await nextTick();await morph(false);
 if(dead)return;
 core.value?.showModule();visible.value=false;animation?.cancel();
 await core.value?.retract();if(dead)return;
 phase.value='selected';clear();
}
let origin: HTMLElement | null = null;
function select(id: string, event?: MouseEvent) { if(busy.value || event && event.detail>1) return; origin = document.querySelector<HTMLElement>(`[data-module="${id}"]`); selected.value = selected.value === id ? null : id; phase.value=selected.value?'selected':'idle'; }
function clear() { if(busy.value)return;phase.value='idle';selected.value = null; nextTick(() => origin?.focus({ preventScroll: true })); }
function key(event: KeyboardEvent) { if(event.key === 'Escape') {if(busy.value) {event.preventDefault();void closeTool();}else clear();}
 if(event.key==='Tab' && visible.value && controls.value && surface.value) {
 const nodes=Array.from(surface.value.querySelectorAll<HTMLElement>('button,input,a[href]')).filter(n=>!n.hasAttribute('disabled'));
 const first=nodes[0],last=nodes.at(-1);
 if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
 else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
 } }
onMounted(() => { performance.mark('spatial-core:mounted'); window.addEventListener('keydown',key); });
onBeforeUnmount(() => {dead=true;animation?.cancel();cancelAnimationFrame(handoffFrame);finishHandoff?.();window.removeEventListener('keydown',key);});
useHead(() => ({ title: `${t('spatialLab.title')} — Igal Vilensky`, meta: [{ name: 'description', content: t('spatialLab.description') }] }));
</script>
<template>
 <main class="lab-page" :class="{ 'tool-deployed': visible }" :data-phase="phase">
  <header class="periphery"><NuxtLink class="signature" :to="localePath('/spatial-home')">Igal Vilensky<span>↖ {{ t('spatialLab.back') }}</span></NuxtLink><div class="settings"><nav :aria-label="t('language.label')"><NuxtLink v-for="language in (['en','de','ru'] as const)" :key="language" :to="switchLocalePath(language)" :aria-current="locale === language ? 'page' : undefined">{{ language.toUpperCase() }}</NuxtLink></nav><ThemeToggle /></div></header>
  <h1 class="sr-only">{{ t('spatialLab.title') }}</h1>
  <div class="lab-stage">
   <ClientOnly><KineticCore ref="core" v-if="!unavailable" :selected="selected" :paused="paused" @extracting="phase = 'extracting'" @select="select" @unavailable="unavailable = true" /></ClientOnly>
   <div v-if="unavailable" class="fallback"><span aria-hidden="true">⌘ · { } · ◐</span><p>{{ t('spatialLab.instrument') }}</p></div>
   <div :inert="busy" class="core-controls" role="group" :aria-label="t('spatialLab.instrument')">
    <button v-for="(experiment,i) in experiments" :key="experiment.id" :data-module="experiment.id" :aria-pressed="selected === experiment.id" :style="{ '--accent': experiment.accent }" @click="select(experiment.id,$event)"><span class="index">{{ String(i+1).padStart(2,'0') }}</span><span>{{ t(experiment.title) }}</span><span class="indicator" aria-hidden="true">{{ selected === experiment.id ? '−' : '+' }}</span></button>
   </div>
   <div :inert="busy" class="selection-rail" aria-live="polite"><template v-if="active"><span class="selection-name">{{ t(active.title) }}</span><button class="deploy-control" @click="activate">{{ t('spatialLab.deploy') }} ↗</button><NuxtLink :to="localePath(active.route)">{{ t('spatialLab.classic') }} ↗</NuxtLink><button @click="clear">{{ t('spatialLab.close') }} <kbd>{{ t('spatialLab.escape') }}</kbd></button></template><span v-else>{{ t('spatialLab.hint') }}</span></div>
  </div>
  <section v-if="visible" ref="surface" class="instrument-surface" role="dialog" aria-modal="true" :aria-label="active ? t(active.title) : undefined" :data-controls="controls">
   <div v-if="active" class="surface-stamp" aria-hidden="true">{{ active.glyph }} <span>{{ controls ? t(active.title) : '' }}</span></div>
   <div class="instrument-content" :inert="!controls" :aria-hidden="!controls">
    <button class="retract-control" :disabled="phase !== 'active-tool'" @click="closeTool">{{ t('spatialLab.close') }} ↙ <kbd>{{ t('spatialLab.escape') }}</kbd></button>
    <ContrastChecker v-if="active?.id === 'contrast'" />
    <div v-else-if="active" class="tool-preview"><h2>{{ t(active.title) }}</h2><p>{{ t(active.description) }}</p><NuxtLink :to="localePath(active.route)">{{ t('spatialLab.classic') }} ↗</NuxtLink></div>
   </div>
  </section>
  <button :inert="busy" class="motion-control" :aria-pressed="paused" @click="paused = !paused">{{ t(paused ? 'spatialLab.resume' : 'spatialLab.pause') }}</button>
 </main>
</template>
<style scoped src="../spatial-experiments/lab.css"></style>
