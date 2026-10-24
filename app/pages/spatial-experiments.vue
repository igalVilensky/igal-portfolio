<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue';
import KineticCore from '~/spatial-experiments/KineticCore.client.vue';
import { experiments } from '~/spatial-experiments/registry';
definePageMeta({ layout: false });
const { t, locale } = useI18n();
const localePath = useLocalePath(), switchLocalePath = useSwitchLocalePath();
const selected = ref<string | null>(null), paused = ref(false), unavailable = ref(false);
const active = computed(() => experiments.find(item => item.id === selected.value));
let origin: HTMLElement | null = null;
function select(id: string, event?: MouseEvent) { if(event && event.detail>1) return; origin = document.querySelector<HTMLElement>(`[data-module="${id}"]`); selected.value = selected.value === id ? null : id; }
function clear() { selected.value = null; origin?.focus({ preventScroll: true }); }
function key(event: KeyboardEvent) { if(event.key === 'Escape') clear(); }
onMounted(() => { performance.mark('spatial-core:mounted'); window.addEventListener('keydown',key); });
onBeforeUnmount(() => window.removeEventListener('keydown',key));
useHead(() => ({ title: `${t('spatialLab.title')} — Igal Vilensky`, meta: [{ name: 'description', content: t('spatialLab.description') }] }));
</script>
<template>
 <main class="lab-page">
  <header class="periphery"><NuxtLink class="signature" :to="localePath('/spatial-home')">Igal Vilensky<span>↖ {{ t('spatialLab.back') }}</span></NuxtLink><div class="settings"><nav :aria-label="t('language.label')"><NuxtLink v-for="language in (['en','de','ru'] as const)" :key="language" :to="switchLocalePath(language)" :aria-current="locale === language ? 'page' : undefined">{{ language.toUpperCase() }}</NuxtLink></nav><ThemeToggle /></div></header>
  <h1 class="sr-only">{{ t('spatialLab.title') }}</h1>
  <div class="lab-stage">
   <ClientOnly><KineticCore v-if="!unavailable" :selected="selected" :paused="paused" @select="select" @unavailable="unavailable = true" /></ClientOnly>
   <div v-if="unavailable" class="fallback"><span aria-hidden="true">⌘ · { } · ◐</span><p>{{ t('spatialLab.instrument') }}</p></div>
   <div class="core-controls" role="group" :aria-label="t('spatialLab.instrument')">
    <button v-for="(experiment,i) in experiments" :key="experiment.id" :data-module="experiment.id" :aria-pressed="selected === experiment.id" :style="{ '--accent': experiment.accent }" @click="select(experiment.id,$event)"><span class="index">{{ String(i+1).padStart(2,'0') }}</span><span>{{ t(experiment.title) }}</span><span class="indicator" aria-hidden="true">{{ selected === experiment.id ? '−' : '+' }}</span></button>
   </div>
   <div class="selection-rail" aria-live="polite"><template v-if="active"><span class="selection-name">{{ t(active.title) }}</span><NuxtLink :to="localePath(active.route)">{{ t('spatialLab.classic') }} ↗</NuxtLink><button @click="clear">{{ t('spatialLab.close') }} <kbd>Esc</kbd></button></template><span v-else>{{ t('spatialLab.hint') }}</span></div>
  </div>
  <button class="motion-control" :aria-pressed="paused" @click="paused = !paused">{{ t(paused ? 'spatialLab.resume' : 'spatialLab.pause') }}</button>
 </main>
</template>
<style scoped src="../spatial-experiments/lab.css"></style>
