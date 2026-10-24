<script setup lang="ts">
import ModuleBody from './ModuleBody.vue';
import MobileProjectBody from './MobileProjectBody.vue';
import type { Topology } from './topology';
import { copy } from './copy';
import { mobileCopy } from './mobileCopy';
const props = defineProps<{ graph: Topology; locale: string; activeId: string; selection: string | null; link: (url: string) => string }>();
const emit = defineEmits<{ navigate: [id: string]; select: [id: string | null] }>();
const text = computed(() => copy[props.locale as keyof typeof copy] ?? copy.en);
const words = computed(() => mobileCopy[props.locale as keyof typeof mobileCopy] ?? mobileCopy.en);
const project = computed(() => props.graph.projects.find(p => p.id === props.activeId) ?? props.graph.projects[0]!);
const index = computed(() => props.graph.projects.findIndex(p => p.id === project.value.id));
const technology = computed(() => props.graph.technologies.find(t => t.id === props.selection));
const open = computed(() => !!props.selection);
// Keep every shared visible ID in its slot; fill vacancies in graph order.
const slots = ref<(string | null)[]>([null, null, null, null]);
watch(() => project.value.technologyIds, ids => {
 const next = slots.value.map(id => id && ids.includes(id) ? id : null);
 for (const id of ids) { if (next.includes(id)) continue; const slot = next.indexOf(null); if (slot < 0) break; next[slot] = id; }
 slots.value = next;
}, { immediate: true });
const locations = [{x:68,y:73},{x:232,y:73},{x:68,y:315},{x:232,y:315}];
const nodes = computed(() => slots.value.flatMap((id, slot) => {
 const node = props.graph.technologies.find(t => t.id === id);
 return node ? [{ ...node, ...locations[slot]!, slot }] : [];
}));
const direction = ref(1);
async function navigate(id: string) { if (id === project.value.id) return; direction.value = props.graph.projects.findIndex(p => p.id === id) >= index.value ? 1 : -1; emit('select', null); emit('navigate', id); await nextTick(); if (document.activeElement === document.body) central.value?.focus({ preventScroll: true }); }
function step(delta: number) { const projects = props.graph.projects; navigate(projects[(index.value + delta + projects.length) % projects.length]!.id); }
const central = ref<HTMLElement>();
const panel = ref<HTMLElement>();
let origin: HTMLElement | null = null;
let animation: Animation | undefined;
let disposed = false;
let sequence = 0;
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function choose(id: string, event?: Event) { origin = event?.currentTarget as HTMLElement ?? central.value ?? null; emit('select', id); }
function originFrame() {
 const a = (origin?.isConnected ? origin : central.value)?.getBoundingClientRect();
 const b = panel.value?.getBoundingClientRect();
 return a && b ? { transform: `translate(${a.x+a.width/2-b.x-b.width/2}px,${a.y+a.height/2-b.y-b.height/2-12}px) scale(${a.width/b.width},${a.height/b.height})`, opacity: .35 } : { transform: 'translateY(12px) scale(.9)', opacity: .35 };
}
watch(() => props.selection, async value => {
 const revision = ++sequence; animation?.cancel();
 if (!value) return;
 await nextTick(); if (disposed || revision !== sequence || !panel.value) return;
 if (!reduce()) animation = panel.value.animate([originFrame(), { transform: 'translateY(-8px) scale(.96)', opacity: 1, offset: .6 }, {transform:'none',opacity:1}], { duration: 420, easing:'cubic-bezier(.2,.8,.2,1)' });
 panel.value.focus({preventScroll:true});
});
async function close() {
 const revision = ++sequence; animation?.cancel();
 if (panel.value && !reduce()) {
  animation = panel.value.animate([{transform:'none',opacity:1},originFrame()], {duration:230,easing:'ease-in',fill:'forwards'});
  try { await animation.finished; } catch { return; }
 }
 if (disposed || revision !== sequence) return;
 emit('select',null); await nextTick(); (origin?.isConnected ? origin : central.value)?.focus({preventScroll:true});
}
function keys(event: KeyboardEvent) {
 if (event.key === 'Escape' && open.value) { event.preventDefault(); close(); }
 if (event.key !== 'Tab' || !open.value || !panel.value) return;
 const targets = [...panel.value.querySelectorAll<HTMLElement>('button,a[href],select')];
 const first = targets[0], last = targets.at(-1);
 if (event.shiftKey && (document.activeElement === first || document.activeElement === panel.value)) { event.preventDefault(); last?.focus(); }
 else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel.value)) { event.preventDefault(); first?.focus(); }
}
let gesture: {id:number;x:number;y:number} | null = null;
let suppressUntil = 0;
function down(e: PointerEvent) { if (!e.isPrimary || e.button !== 0 || open.value || e.clientX < 24 || e.clientX > innerWidth-24) return; gesture={id:e.pointerId,x:e.clientX,y:e.clientY}; }
function move(e: PointerEvent) { if (gesture?.id === e.pointerId && Math.abs(e.clientY-gesture.y)>Math.abs(e.clientX-gesture.x)*1.2 && Math.abs(e.clientY-gesture.y)>12) gesture=null; }
function up(e: PointerEvent) {
 if (!gesture || gesture.id !== e.pointerId) return;
 const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y; gesture=null;
 if (Math.abs(dx)>=55 && Math.abs(dx)>Math.abs(dy)*1.6) { suppressUntil=performance.now()+450; step(dx<0?1:-1); }
}
function cancel() { gesture=null; }
function guard(e: MouseEvent) { if (performance.now()<suppressUntil) { e.preventDefault(); e.stopImmediatePropagation(); } }
onMounted(() => { window.addEventListener('keydown',keys); window.addEventListener('pointerup',up); window.addEventListener('pointercancel',cancel); });
onBeforeUnmount(() => { disposed=true; sequence++; animation?.cancel(); window.removeEventListener('keydown',keys); window.removeEventListener('pointerup',up); window.removeEventListener('pointercancel',cancel); });
const wire = (node: {x:number;y:number}) => {
 const top=node.y<194, sign=top?-1:1;
 return `M${node.x<150?100:200} ${194+sign*56} C${node.x<150?100:200} ${194+sign*78},${node.x} ${node.y-sign*48},${node.x} ${node.y-sign*24}`;
};
</script>

<template>
 <section class="mobile-explorer" :aria-label="text.title">
  <div class="explorer-rest" :inert="open || undefined">
   <div class="explorer-index"><span aria-hidden="true">{{ String(index+1).padStart(2,'0') }} / {{ graph.projects.length }}</span><label class="sr-only" for="mobile-project-index">{{ words.choose }}</label><select id="mobile-project-index" :value="project.id" @change="navigate(($event.target as HTMLSelectElement).value)"><option v-for="node in graph.projects" :key="node.id" :value="node.id">{{ node.label }}</option></select></div>
   <div class="explorer-stage" @pointerdown="down" @pointermove="move" @click.capture="guard">
    <div class="explorer-fragment" :class="{ held: open }" :style="{ '--direction': direction }">
     <svg class="explorer-wires" viewBox="0 0 300 388" preserveAspectRatio="none" aria-hidden="true"><TransitionGroup name="wire"><path v-for="node in nodes" :key="node.id" :d="wire(node)" :class="{lit:selection === node.id}" /></TransitionGroup></svg>
     <TransitionGroup name="technology"><button v-for="node in nodes" :key="node.id" class="explorer-tech" :class="{chosen:selection === node.id}" :style="{left:`${node.x/3}%`,top:`${node.y/3.88}%`}" :data-technology="node.id" :aria-label="`${node.label} — ${text.related}`" :aria-pressed="selection === node.id" @click="choose(node.id,$event)"><ModuleBody kind="technology" :height="44" preserveAspectRatio="none"/><span>{{ node.label }}</span></button></TransitionGroup>
     <Transition name="project"><button :key="project.id" :ref="node => { if (node) central = node as HTMLElement }" class="explorer-project" :data-project="project.id" :aria-label="`${project.label} — ${words.open}`" aria-describedby="mobile-relationships" @click="choose(project.id,$event)"><MobileProjectBody/><span class="project-serial">{{ text.projects }} / {{ String(index+1).padStart(2,'0') }}</span><strong>{{ project.label }}</strong><span class="project-open">{{ words.open }} ↗</span></button></Transition>
    </div>
   </div>
   <p id="mobile-relationships" class="sr-only">{{ words.fragment }}: {{ nodes.map(n=>n.label).join(', ') }}. {{ words.all }}: {{ project.technologies.join(', ') }}</p>
   <div class="explorer-navigation"><button :aria-label="words.previous" @click="step(-1)">←</button><button class="explorer-all" @click="choose(project.id,$event)">{{ words.all }} · {{ project.technologies.length }} ↗</button><button :aria-label="words.next" @click="step(1)">→</button></div>
   <p class="explorer-hint">{{ words.hint }}</p>
   <p class="sr-only" role="status" aria-live="polite">{{ project.label }} · {{ index+1 }} / {{ graph.projects.length }}</p>
  </div>
  <div v-if="open" class="explorer-backdrop" @click.self="close">
   <section ref="panel" class="explorer-workspace" role="dialog" aria-modal="true" :aria-label="technology?.label ?? project.label" tabindex="-1">
    <button class="workspace-close" @click="close">× <span>{{ words.close }}</span></button>
    <template v-if="technology"><p class="workspace-eyebrow">{{ text.technologies }}</p><h2>{{ technology.label }}</h2><p>{{ text.source }}</p><h3>{{ text.related }}</h3><div class="workspace-related"><button v-for="node in graph.projects.filter(p=>technology!.projectIds.includes(p.id))" :key="node.id" :aria-current="node.id===project.id?'true':undefined" @click="node.id===project.id ? close() : navigate(node.id)">{{ node.label }} <span>↗</span></button></div></template>
    <template v-else><p class="workspace-eyebrow">{{ text.projects }} / {{ String(index+1).padStart(2,'0') }}</p><h2>{{ project.label }}</h2><p>{{ project.description }}</p><div class="workspace-links"><template v-for="(url,kind) in project.links" :key="kind"><a v-if="url && !(kind==='live' && url===project.links.github)" :href="link(url)" :target="url.startsWith('/')?undefined:'_blank'" :rel="url.startsWith('/')?undefined:'noopener noreferrer'">{{ kind==='github'?'GitHub':kind==='live'?text.live:text.study }} ↗</a></template></div><h3>{{ text.stack }}</h3><ul class="workspace-stack"><li v-for="label in project.technologies" :key="label">{{ label }}</li></ul></template>
   </section>
  </div>
 </section>
</template>

<style scoped src="./mobile-explorer.css"></style>
