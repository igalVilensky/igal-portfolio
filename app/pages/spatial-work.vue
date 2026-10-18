<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue';
import { buildTopology, layoutTopology } from '~/spatial-work/topology';
import { copy } from '~/spatial-work/copy';
definePageMeta({ layout: false });
const { locale, t } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const text = computed(() => copy[locale.value as keyof typeof copy] ?? copy.en);
const graph = computed(() => buildTopology(locale.value));
const positions = computed(() => layoutTopology(graph.value));
const selected = ref<string | null>(null);
const hovered = ref<string | null>(null);
const focused = ref<string | null>(null);
const mobileView = ref<'projects' | 'technologies'>('projects');
const active = computed(() => hovered.value ?? focused.value ?? selected.value);
const project = computed(() => graph.value.projects.find(node => node.id === selected.value));
const technology = computed(() => graph.value.technologies.find(node => node.id === selected.value));
const connected = computed(() => new Set([active.value, ...graph.value.edges.filter(edge => edge.project === active.value || edge.technology === active.value).flatMap(edge => [edge.project, edge.technology])]));
const details = ref<HTMLElement>();
let trigger: HTMLElement | null = null;
function select(id: string, event?: Event) {
 selected.value = id;
 if (event?.currentTarget instanceof HTMLElement) trigger = event.currentTarget;
 if (import.meta.client && window.matchMedia('(max-width: 1100px)').matches) {
  nextTick(() => details.value?.scrollIntoView({ block: 'start', behavior: 'instant' }));
 }
}
function clear() { selected.value = null; hovered.value = null; focused.value = null; trigger?.focus({ preventScroll: true }); }
function escape(event: KeyboardEvent) { if (event.key === 'Escape') clear(); }
onMounted(() => window.addEventListener('keydown', escape));
onBeforeUnmount(() => window.removeEventListener('keydown', escape));
const style = (id: string) => ({ left: `${positions.value[id]!.x / 12}%`, top: `${positions.value[id]!.y / 8}%` });
const edgePath = (edge: { project: string; technology: string }) => { const a = positions.value[edge.project]!, b = positions.value[edge.technology]!; return `M${a.x} ${a.y} C${(a.x + b.x) / 2} ${a.y},${(a.x + b.x) / 2} ${b.y},${b.x} ${b.y}`; };
const link = (url: string) => url.startsWith('/') ? localePath(url) : url;
useHead(() => ({ title: `${text.value.title} — Igal Vilensky`, meta: [{ name: 'robots', content: 'noindex, nofollow' }] }));
</script>

<template>
 <main class="topology-page">
  <header class="periphery">
   <NuxtLink :to="localePath('/spatial-home')" class="signature">Igal Vilensky <span>↖ {{ text.back }}</span></NuxtLink>
   <div class="settings"><nav :aria-label="t('language.label')"><NuxtLink v-for="language in (['en','de','ru'] as const)" :key="language" :to="switchLocalePath(language)" :aria-current="locale === language ? 'page' : undefined">{{ language.toUpperCase() }}</NuxtLink></nav><ThemeToggle /></div>
  </header>
  <div class="heading"><p class="eyebrow">{{ text.projects }} / {{ text.technologies }}</p><h1>{{ text.title }}</h1><p>{{ text.intro }}</p></div>
  <div class="mobile-tabs" role="group"><button :aria-pressed="mobileView === 'projects'" @click="mobileView = 'projects'">{{ text.projects }} · {{ graph.projects.length }}</button><button :aria-pressed="mobileView === 'technologies'" @click="mobileView = 'technologies'">{{ text.technologies }} · {{ graph.technologies.length }}</button></div>
  <section class="topology-scene" :aria-label="text.title" :class="{ 'has-active': active }">
   <div class="construction" aria-hidden="true"><span>01 / {{ graph.projects.length }}</span><span>{{ graph.technologies.length }} / {{ text.technologies }}</span></div>
   <svg class="connections" viewBox="0 0 1200 800" aria-hidden="true"><path v-for="edge in graph.edges" :key="edge.id" :d="edgePath(edge)" :class="{ lit: edge.project === active || edge.technology === active }" /></svg>
   <div class="project-modules" :class="{ 'mobile-hidden': mobileView !== 'projects' }">
    <button v-for="(node, i) in graph.projects" :key="node.id" class="module project-module" :class="[node.priority, { related: connected.has(node.id), selected: selected === node.id }]" :style="{ ...style(node.id), '--order': i }" :data-node="node.id" :aria-pressed="selected === node.id" aria-controls="topology-details" @pointerenter="event => { if(event.pointerType === 'mouse') hovered = node.id }" @pointerleave="hovered = null" @focus="focused = node.id" @blur="focused = null" @click="select(node.id, $event)">
     <span class="module-index">{{ String(i + 1).padStart(2, '0') }} <span>{{ text[node.priority as 'featured' | 'secondary' | 'lab'] }}</span></span><strong>{{ node.label }}</strong><span class="module-corner" aria-hidden="true">↗</span>
    </button>
   </div>
   <div class="technology-modules" :class="{ 'mobile-hidden': mobileView !== 'technologies' }">
    <button v-for="(node, i) in graph.technologies" :key="node.id" class="module technology-module" :class="{ related: connected.has(node.id), selected: selected === node.id, hub: node.projectIds.length > 3 }" :style="{ ...style(node.id), '--order': i + 5 }" :data-node="node.id" :aria-pressed="selected === node.id" aria-controls="topology-details" @pointerenter="event => { if(event.pointerType === 'mouse') hovered = node.id }" @pointerleave="hovered = null" @focus="focused = node.id" @blur="focused = null" @click="select(node.id, $event)"><span aria-hidden="true" class="tech-pin" />{{ node.label }}</button>
   </div>
  </section>
  <p class="scene-hint">{{ text.hint }}</p>
  <section id="topology-details" ref="details" class="detail" :class="{ 'detail-open': selected }" :aria-label="text.detail" aria-live="polite">
   <template v-if="project"><div class="detail-heading"><p class="eyebrow">{{ text[project.priority as 'featured' | 'secondary' | 'lab'] }}</p><h2>{{ project.label }}</h2><p>{{ project.description }}</p><div class="project-links"><template v-for="(url, kind) in project.links" :key="kind"><a v-if="url && !(kind === 'live' && url === project.links.github)" :href="link(url)" :target="url.startsWith('/') ? undefined : '_blank'" :rel="url.startsWith('/') ? undefined : 'noopener noreferrer'">{{ kind === 'github' ? 'GitHub' : kind === 'live' ? text.live : text.study }} ↗</a></template></div></div><div class="stack"><h3>{{ text.stack }}</h3><span v-for="label in project.technologies" :key="label">{{ label }}</span></div></template>
   <template v-else-if="technology"><div class="detail-heading"><p class="eyebrow">{{ text.technologies }}</p><h2>{{ technology.label }}</h2><p>{{ text.source }}</p></div><div class="related-projects"><h3>{{ text.related }}</h3><button v-for="node in graph.projects.filter(node => technology!.projectIds.includes(node.id))" :key="node.id" @click="select(node.id)">{{ node.label }} ↗</button></div></template>
   <p v-else class="empty-detail">{{ text.empty }}</p>
   <button v-if="selected" class="close-detail" @click="clear">× <span>{{ text.close }}</span></button>
  </section>
 </main>
</template>

<style scoped src="../spatial-work/topology.css"></style>
