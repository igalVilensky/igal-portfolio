<script setup lang="ts">
import ArchitectSimulator from '~/components/ArchitectSimulator.vue';
import JsonToTs from '~/components/lab/JsonToTs.vue';
import ContrastChecker from '~/components/lab/ContrastChecker.vue';
import ThemeToggle from '~/components/ThemeToggle.vue';
import KineticCore from '~/spatial-experiments/KineticCore.client.vue';
import { experiments } from '~/spatial-experiments/registry';
definePageMeta({ layout: false, key: 'spatial-experiments' });
const { t, locale } = useI18n();
const localePath = useLocalePath(), switchLocalePath = useSwitchLocalePath();
const selected = ref<string | null>(null), paused = ref(false), unavailable = ref(false), spinning = ref(false), reducedMotion = ref(false);
const active = computed(() => experiments.find(item => item.id === selected.value));
type Phase = 'selected' | 'idle' | 'aligning' | 'extracting' | 'deploying' | 'active-tool' | 'retracting';
const phase=ref<Phase>('idle'), core=ref<InstanceType<typeof KineticCore>>(), surface=ref<HTMLElement>();
const visible=ref(false), controls=ref(false);
const busy=computed(()=>phase.value!=='idle');
const cancelRequested=ref(false);
const toolError=ref(false);
onErrorCaptured(()=>{toolError.value=true;return false;});
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
 if(!active.value||phase.value!=='selected')return;
 spinning.value=false;cancelRequested.value=false;toolError.value=false;
 phase.value='aligning';
 if(!unavailable.value) {
  try { bounds=await core.value?.deploy()??null; }
  catch { unavailable.value=true;bounds=null;toolError.value=true; }
 }
 if(dead)return;
 if(cancelRequested.value){await finishClose();return;}
 visible.value=true;phase.value='deploying';await nextTick();
 core.value?.hideModule();
 await morph(true);if(dead)return;
 if(cancelRequested.value){await finishClose();return;}
 animation?.cancel();controls.value=true;await nextTick();
 await new Promise<void>(resolve=>{finishHandoff=resolve;handoffFrame=requestAnimationFrame(()=>{handoffFrame=0;finishHandoff=undefined;resolve();});});if(dead)return;
 if(cancelRequested.value){await finishClose();return;}
 phase.value='active-tool';await nextTick();
 surface.value?.querySelector<HTMLElement>('input,textarea,select,button')?.focus({preventScroll:true});
}
async function closeTool() {
 if(phase.value==='idle'||phase.value==='retracting')return;
 if(phase.value!=='active-tool'){cancelRequested.value=true;animation?.finish();return;}
 await finishClose();
}
async function finishClose() {
 bounds=core.value?.bounds()??bounds;
 phase.value='retracting';controls.value=false;await nextTick();await morph(false);
 if(dead)return;
 core.value?.showModule();visible.value=false;animation?.cancel();
 await core.value?.retract();if(dead)return;
 phase.value='idle';clear();
}
let origin: HTMLElement | null = null;
async function select(id: string, event?: MouseEvent) {
 if(busy.value || event && event.detail>1)return;
 origin=document.querySelector<HTMLElement>(`[data-module="${id}"]`);
 selected.value=id;
 // Flush the selected prop before asking the renderer to align/extract that module.
 phase.value='selected';spinning.value=false;
 await nextTick();
 void activate();
}
function clear() { if(busy.value)return;phase.value='idle';selected.value = null; nextTick(() => origin?.focus({ preventScroll: true })); }
function key(event: KeyboardEvent) { if(event.key === 'Escape') {if(busy.value) {event.preventDefault();void closeTool();}else clear();}
 if(event.key==='Tab' && visible.value && controls.value && surface.value) {
 const nodes=Array.from(surface.value.querySelectorAll<HTMLElement>('button,input,textarea,select,a[href],[tabindex]')).filter(n=>!n.hasAttribute('disabled'));
 const first=nodes[0],last=nodes.at(-1);
 if(event.shiftKey && document.activeElement===first){event.preventDefault();last?.focus();}
 else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first?.focus();}
 } }
let media: MediaQueryList;
const syncReduced=()=>{reducedMotion.value=media.matches;if(media.matches)spinning.value=false;};
onMounted(() => { media=matchMedia('(prefers-reduced-motion: reduce)');syncReduced();media.addEventListener('change',syncReduced);performance.mark('spatial-core:mounted'); window.addEventListener('keydown',key); });
onBeforeUnmount(() => {dead=true;media?.removeEventListener('change',syncReduced);animation?.cancel();cancelAnimationFrame(handoffFrame);finishHandoff?.();window.removeEventListener('keydown',key);});
useHead(() => ({ title: `${t('spatialLab.title')} — Igal Vilensky`, meta: [{ name: 'description', content: t('spatialLab.description') }] }));
</script>
<template>
 <main class="lab-page" :class="{ 'tool-deployed': visible }" :data-phase="phase">
  <header class="periphery" :inert="visible"><NuxtLink class="signature" :to="localePath('/spatial-home')">Igal Vilensky<span>↖ {{ t('spatialLab.back') }}</span></NuxtLink><div class="settings"><nav :aria-label="t('language.label')"><NuxtLink v-for="language in (['en','de','ru'] as const)" :key="language" :to="switchLocalePath(language)" :aria-current="locale === language ? 'page' : undefined">{{ language.toUpperCase() }}</NuxtLink></nav><ThemeToggle /></div></header>
  <h1 class="sr-only">{{ t('spatialLab.title') }}</h1>
  <div class="lab-stage">
   <ClientOnly><KineticCore ref="core" v-if="!unavailable" :selected="selected" :paused="paused" :spinning="spinning" @spin="spinning = $event" @extracting="phase = 'extracting'" @select="select" @unavailable="unavailable = true" /></ClientOnly>
   <div v-if="unavailable" class="fallback"><span aria-hidden="true">⌘ · { } · ◐</span><p>{{ t('spatialLab.instrument') }}</p></div>
   <div :inert="busy" class="core-controls" role="group" :aria-label="t('spatialLab.instrument')">
    <button v-for="(experiment,i) in experiments" :key="experiment.id" :data-module="experiment.id" :aria-pressed="selected === experiment.id" :style="{ '--accent': experiment.accent }" @click="select(experiment.id,$event)"><span class="index">{{ String(i+1).padStart(2,'0') }}</span><span>{{ t(experiment.title) }}</span><span class="indicator" aria-hidden="true">{{ selected === experiment.id ? '−' : '+' }}</span></button>
   </div>
   <div class="selection-rail" aria-live="polite">{{ t('spatialLab.hint') }}</div>
  </div>
  <section v-if="visible" ref="surface" class="instrument-surface" role="dialog" aria-modal="true" :aria-label="active ? t(active.title) : undefined" :data-controls="controls">
   <div v-if="active" class="surface-stamp" aria-hidden="true">{{ active.glyph }} <span>{{ controls ? t(active.title) : '' }}</span></div>
   <div class="instrument-content" :inert="!controls" :aria-hidden="!controls">
    <button class="retract-control" :disabled="phase !== 'active-tool'" @click="closeTool">{{ t('spatialLab.close') }} ↙ <kbd>{{ t('spatialLab.escape') }}</kbd></button>
    <p v-if="toolError" role="alert">{{ t('spatialLab.toolError') }}</p>
    <ContrastChecker v-else-if="active?.id === 'contrast'" />
    <JsonToTs v-else-if="active?.id === 'json'" />
    <ArchitectSimulator v-else-if="active?.id === 'architect'" />
   </div>
  </section>
  <div class="motion-controls" :inert="visible">
  <button class="spin-control motion-control" :disabled="busy || reducedMotion || unavailable" :aria-pressed="spinning" @click="spinning = !spinning">{{ t(spinning ? 'spatialLab.stop' : 'spatialLab.spin') }}</button>
  <button :disabled="busy" class="motion-control" :aria-pressed="paused" @click="paused = !paused">{{ t(paused ? 'spatialLab.resume' : 'spatialLab.pause') }}</button>
  </div>
 </main>
</template>
<style scoped src="../spatial-experiments/lab.css"></style>
