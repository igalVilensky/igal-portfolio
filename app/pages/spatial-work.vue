<script setup lang="ts">
import MobileProjectExplorer from '~/spatial-work/MobileProjectExplorer.vue';
import ModuleBody from '~/spatial-work/ModuleBody.vue';
import TopologyDetail from '~/spatial-work/TopologyDetail.vue';
import { portfolioProjects } from '~/composables/useProjects';
import ThemeToggle from '~/components/ThemeToggle.vue';
import { buildTopology, layoutTopology, moduleSize, moduleAnchor } from '~/spatial-work/topology';
import { copy } from '~/spatial-work/copy';
definePageMeta({ layout: false });
const { locale, t } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const text = computed(() => copy[locale.value as keyof typeof copy] ?? copy.en);
const graph = computed(() => buildTopology(locale.value));
// Geometry depends on topology, never translated labels or interaction state.
const positions = layoutTopology(buildTopology());
const selected = ref<string | null>(null);
const hovered = ref<string | null>(null);
const focused = ref<string | null>(null);
// Match the approved desktop CSS boundary; mount only the needed scene.
const isMobile = ref<boolean | null>(null);
const mobileProject = ref(graph.value.projects[0]!.id);
let breakpoint: MediaQueryList | undefined;
function updateBreakpoint() { isMobile.value = breakpoint!.matches; }
watch(selected, id => { if (id?.startsWith('project:')) mobileProject.value = id; });
const active = computed(() => selected.value ?? hovered.value ?? focused.value);
const project = computed(() => graph.value.projects.find(node => node.id === selected.value));
const technology = computed(() => graph.value.technologies.find(node => node.id === selected.value));
const connected = computed(() => new Set([active.value, ...graph.value.edges.filter(edge => edge.project === active.value || edge.technology === active.value).flatMap(edge => [edge.project, edge.technology])]));
const details = ref<HTMLElement>();
const scene = ref<HTMLElement>();
const entering = ref(false);
const closing = ref(false);
const origin = ref({ x: 0, y: 0, width: 160, height: 54 });
let trigger: HTMLElement | null = null;
let reveal: Animation | undefined;
let entrance: Animation | undefined;
let disposed = false;
let revision = 0;
const mark = (name: string) => { if (import.meta.client) performance.mark(`spatial-work:${name}`); };
const unhookHydration = useNuxtApp().hook('app:mounted', () => mark('hydration-complete'));
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function finishEntrance() {
 entrance?.finish();
 entrance = undefined;
 entering.value = false;
}
function readOrigin(node: HTMLElement) {
 const bounds = node.getBoundingClientRect();
 origin.value = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2, width: bounds.width, height: bounds.height };
}
function originFrame(lift = 0) {
 const panel = details.value!.getBoundingClientRect();
 return { transform: `translate(${origin.value.x - panel.x - panel.width / 2}px, ${origin.value.y - panel.y - panel.height / 2 - lift}px) scale(${origin.value.width / panel.width}, ${origin.value.height / panel.height})`, opacity: .25 };
}
async function select(id: string) {
 const token = ++revision;
 reveal?.cancel();
 closing.value = false;
 // Finish only decorative assembly. Mounted controls are always available.
 finishEntrance();
 trigger = document.querySelector<HTMLElement>(`[data-node="${CSS.escape(id)}"]`);
 scene.value?.classList.add('has-selection');
 if (trigger) readOrigin(trigger);
 selected.value = id;
 hovered.value = null;
 focused.value = null;
 mark(id.startsWith('project:') ? 'project-activation' : 'technology-activation');
 await nextTick();
 if (disposed || token !== revision || !details.value) return;
 const panel = details.value;
 if (!reduced() && window.matchMedia('(min-width: 1101px)').matches) {
  reveal = panel.animate([originFrame(), { ...originFrame(18), opacity: .85, offset: .25 }, { transform: 'none', opacity: 1 }], { duration: project.value ? 480 : 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
 }
 panel.focus({ preventScroll: true });
}
async function clear() {
 if (!selected.value || closing.value) return;
 const token = ++revision;
 const current = details.value ? { transform: getComputedStyle(details.value).transform, opacity: getComputedStyle(details.value).opacity } : { transform: 'none', opacity: '1' };
 reveal?.cancel();
 closing.value = true;
 if (trigger?.isConnected) readOrigin(trigger);
 if (details.value && !reduced() && window.matchMedia('(min-width: 1101px)').matches) {
  reveal = details.value.animate([current, originFrame()], { duration: 280, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
  try { await reveal.finished; } catch { return; }
 }
 if (disposed || token !== revision) return;
 selected.value = null;
 closing.value = false;
 hovered.value = null;
 focused.value = null;
 reveal?.cancel();
 trigger?.focus({ preventScroll: true });
 focused.value = null;
}
function escape(event: KeyboardEvent) { if (isMobile.value === false && event.key === 'Escape' && selected.value) { event.preventDefault(); clear(); } }
onMounted(() => {
 breakpoint = window.matchMedia('(max-width: 1100px)');
 updateBreakpoint();
 breakpoint.addEventListener('change', updateBreakpoint);
 mark('mounted');
 window.addEventListener('keydown', escape);
 if (reduced() || !window.matchMedia('(min-width: 1101px)').matches) { mark('entrance-complete'); return; }
 entering.value = true;
 nextTick(() => {
  if (disposed || !entering.value || !scene.value) return;
  entrance = scene.value.animate([{ transform: 'translateY(8px) scale(.992)' }, { transform: 'none' }], { duration: 1000, easing: 'cubic-bezier(.2,.7,.2,1)' });
  entrance.onfinish = () => { entering.value = false; mark('entrance-complete'); };
 });
});
onBeforeUnmount(() => { disposed = true; breakpoint?.removeEventListener('change', updateBreakpoint); revision++; unhookHydration(); entrance?.cancel(); reveal?.cancel(); window.removeEventListener('keydown', escape); });
const style = (id: string) => ({ left: `${positions[id]!.x / 12}%`, top: `${positions[id]!.y / 6.4}%`, '--body-width': `${moduleSize(id).width / 12}%`, '--body-height': `${moduleSize(id).height / 6.4}%` });
const edgePath = (edge: { project: string; technology: string }) => {
 const a = positions[edge.project]!, b = positions[edge.technology]!;
 const start = moduleAnchor(edge.project, a, b), end = moduleAnchor(edge.technology, b, a);
 const control = (point: typeof a, center: typeof a) => ({ x: point.x + Math.sign(point.x - center.x) * 28, y: point.y + Math.sign(point.y - center.y) * 28 });
 const c = control(start, a), d = control(end, b);
 return `M${start.x} ${start.y} C${c.x} ${c.y},${d.x} ${d.y},${end.x} ${end.y}`;
};
const projectImage = computed(() => portfolioProjects.find(node => node.id === project.value?.sourceId)?.image);
const link = (url: string) => url.startsWith('/') ? localePath(url) : url;
useHead(() => ({ title: `${text.value.title} — Igal Vilensky`, meta: [{ name: 'description', content: text.value.intro }, { name: 'robots', content: 'noindex, nofollow' }] }));
</script>

<template>
 <main class="topology-page">
  <header class="periphery">
   <NuxtLink :to="localePath('/spatial-home')" class="signature">Igal Vilensky <span>↖ {{ text.back }}</span></NuxtLink>
   <div class="settings"><nav :aria-label="t('language.label')"><NuxtLink v-for="language in (['en','de','ru'] as const)" :key="language" :to="switchLocalePath(language)" :aria-current="locale === language ? 'page' : undefined">{{ language.toUpperCase() }}</NuxtLink></nav><ThemeToggle /></div>
  </header>
  <h1 class="sr-only">{{ text.title }}</h1>
  <MobileProjectExplorer v-if="isMobile === true" :graph="graph" :locale="locale" :active-id="mobileProject" :selection="selected" :link="link" @navigate="mobileProject = $event" @select="selected = $event" />
  <template v-if="isMobile === false">
  <section ref="scene" class="topology-scene" :aria-label="text.title" :class="{ 'has-active': active, entering, 'has-selection': selected }">
   <div class="sculpture">
   <svg class="connections" viewBox="0 0 1200 640" aria-hidden="true"><path v-for="edge in graph.edges" :key="edge.id" :d="edgePath(edge)" pathLength="1" :class="{ lit: edge.project === active || edge.technology === active }" /></svg>
   <div class="project-modules">
    <button v-for="(node, i) in graph.projects" :key="node.id" class="module project-module" :class="[node.priority, { related: connected.has(node.id), selected: selected === node.id }]" :style="{ ...style(node.id), '--order': i }" :data-node="node.id" :aria-pressed="selected === node.id" :aria-describedby="`relationships-${node.id}`" aria-controls="topology-details" @pointerenter="event => { if(event.pointerType === 'mouse') hovered = node.id }" @pointerleave="hovered = null" @focus="focused = node.id" @blur="focused = null" @click="select(node.id)">
     <span :id="`relationships-${node.id}`" class="sr-only">{{ node.technologies.join(', ') }}</span><ModuleBody kind="project" /><strong>{{ node.label }}</strong><span class="sr-only">{{ node.description }}</span>
    </button>
   </div>
   <div class="technology-modules">
    <button v-for="(node, i) in graph.technologies" :key="node.id" class="module technology-module" :class="{ related: connected.has(node.id), selected: selected === node.id, hub: node.projectIds.length > 3 }" :style="{ ...style(node.id), '--order': i + 5 }" :data-node="node.id" :aria-pressed="selected === node.id" :aria-describedby="`relationships-${node.id}`" aria-controls="topology-details" @pointerenter="event => { if(event.pointerType === 'mouse') hovered = node.id }" @pointerleave="hovered = null" @focus="focused = node.id" @blur="focused = null" @click="select(node.id)"><span :id="`relationships-${node.id}`" class="sr-only">{{ graph.projects.filter(project => node.projectIds.includes(project.id)).map(project => project.label).join(', ') }}</span><ModuleBody kind="technology" :height="moduleSize(node.id).height" /><span class="technology-label">{{ node.label }}</span></button>
   </div>
   </div>
  </section>
  <section id="topology-details" ref="details" class="detail" :class="{ 'detail-open': selected, 'technology-detail': technology, closing }" :key="selected ?? 'empty'" tabindex="-1" :aria-label="text.detail" aria-live="polite">
   <TopologyDetail :project="project" :technology="technology" :projects="graph.projects" :text="text" :project-image="projectImage" :link="link" @select="select" />
   <button v-if="selected" class="close-detail" @click="clear">× <span>{{ text.close }}</span></button>
  </section>
  </template>
 </main>
</template>

<style scoped src="../spatial-work/topology.css"></style>

<style scoped>
@media(max-width:1100px){
.topology-page{height:100svh;height:100dvh;min-height:0;display:flex;flex-direction:column;overflow:clip;padding: max(12px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(12px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))}
.periphery{flex:none;position:relative;z-index:5}
}
</style>
