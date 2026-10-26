<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue';
import WorkflowCanvas from '~/spatial-ai-automation/WorkflowCanvas.client.vue';
import { nodes,connections,copy,type Language,type Scenario } from '~/spatial-ai-automation/model';
import { WorkflowMotion } from '~/spatial-ai-automation/motion';
import { portfolioProjects } from '~/composables/useProjects';
definePageMeta({layout:false});
const {locale,t}=useI18n(),localePath=useLocalePath(),switchLocalePath=useSwitchLocalePath();
const language=computed<Language>(()=>locale.value==='de'?'de':locale.value==='ru'?'ru':'en'),text=computed(()=>copy[language.value]);
const project=portfolioProjects.find(p=>p.id==='flowforge')!;
const motion=reactive(new WorkflowMotion()),selected=ref<string|null>(null),edge=ref<string|null>(null),view=ref(0),zoom=ref(0),unavailable=ref(false);
const current=computed(()=>nodes.find(n=>n.id===selected.value)),connection=computed(()=>connections.find(e=>e.id===edge.value));
const status=computed(()=>motion.complete?(motion.phase==='build'?text.value.ready:text.value.complete):!motion.playing&&motion.phase!=='idle'?text.value.pause:motion.phase==='build'?text.value.building:motion.phase==='execute'?text.value.running:text.value.ready);
const related=computed(()=>connections.filter(e=>e.source===selected.value||e.target===selected.value));
let frame=0,last=0,media:MediaQueryList|undefined;
function tick(now:number){frame=0;const dt=last?(now-last)/1000:0;last=now;motion.tick(dt);if(motion.playing)wake();else last=0;}
function wake(){if(!frame&&!document.hidden)frame=requestAnimationFrame(tick);}
function start(phase:'build'|'execute'){selected.value=null;edge.value=null;motion.start(phase);last=0;wake();}
function pause(){motion.playing=!motion.playing;last=0;wake();}
function reveal(){nextTick(()=>document.querySelector('.inspection')?.scrollIntoView({block:'nearest',behavior:'instant'}));}
function select(id:string){selected.value=id;edge.value=null;reveal();}
function inspectEdge(id:string){edge.value=id;selected.value=null;reveal();}
function reset(){motion.reset();selected.value=null;edge.value=null;view.value++;}
function scenario(e:Event){motion.reset();motion.scenario=(e.target as HTMLSelectElement).value as Scenario;}
function visibility(){cancelAnimationFrame(frame);frame=0;last=0;if(!document.hidden&&motion.playing)wake();}
function reduced(){motion.reduced=media!.matches;}
onMounted(()=>{media=matchMedia('(prefers-reduced-motion: reduce)');reduced();media.addEventListener('change',reduced);document.addEventListener('visibilitychange',visibility);});
onBeforeUnmount(()=>{cancelAnimationFrame(frame);media?.removeEventListener('change',reduced);document.removeEventListener('visibilitychange',visibility);});
useHead(()=>({title:`${text.value.title} — Igal Vilensky`,meta:[{name:'robots',content:'noindex, nofollow'},{name:'description',content:project.shortDescription}]}));
</script>
<template>
 <main class="engine-page" :data-phase="motion.phase" :data-time="motion.time.toFixed(3)" :data-active="motion.active" :data-playing="motion.playing" @keydown.esc="selected=null;edge=null">
  <header class="periphery"><NuxtLink class="signature" :to="localePath('/spatial-home')">Igal Vilensky<span>↖ {{ text.back }}</span></NuxtLink><div class="settings"><nav :aria-label="t('language.label')"><NuxtLink v-for="lang in (['en','de','ru'] as const)" :key="lang" :to="switchLocalePath(lang)" :aria-current="locale===lang?'page':undefined">{{ lang.toUpperCase() }}</NuxtLink></nav><ThemeToggle /></div></header>
  <div class="heading"><p>{{ text.context }}</p><h1>{{ text.title }}</h1></div>
  <section class="workspace" :aria-label="text.title">
   <div class="toolbar"><div class="playback"><button data-action="build" @click="start('build')">{{ text.build }} <span>↗</span></button><button class="primary" data-action="run" @click="start('execute')">{{ text.run }} <span>▷</span></button><button v-if="motion.phase!=='idle'&&!motion.complete" data-action="pause" @click="pause">{{ motion.playing?text.pause:text.resume }}</button><button data-action="reset" @click="reset">{{ text.reset }}</button></div><label class="scenario"><span>{{ text.scenario }}</span><select :value="motion.scenario" @change="scenario"><option value="ready">{{ text.direct }}</option><option value="clarify">{{ text.clarify }}</option></select></label></div>
   <div class="graph-stage">
    <ClientOnly><WorkflowCanvas v-if="!unavailable" :motion="motion" :language="language" :selected="selected" :edge="edge" :view="view" :zoom="zoom" :label="text.title" @select="select" @connection="inspectEdge" @unavailable="unavailable=true" /></ClientOnly>
    <div class="graph-caption" aria-hidden="true"><span>01 / {{ text.brand }}</span><span>{{ text.branch }}</span><span>07 / {{ text.complete }}</span></div>
    <div v-if="unavailable" class="fallback" role="status">{{ text.fallback }}</div>
    <div class="view-controls"><span>{{ text.hint }}</span><button :aria-label="text.zoom+' −'" @click="zoom--">−</button><button :aria-label="text.zoom+' +'" @click="zoom++">+</button><button data-action="fit" @click="view++">⌖ {{ text.fit }}</button></div>
   </div>
   <div class="status-line" role="status" aria-live="polite"><span :class="{running:motion.playing}" />{{ status }}<strong v-if="motion.active"> / {{ nodes.find(n=>n.id===motion.active)?.title[language] }}</strong></div>
   <div class="node-index"><label for="node-select">{{ text.inspect }}</label><select id="node-select" :value="selected??''" @change="select(($event.target as HTMLSelectElement).value)"><option value="" disabled>—</option><option v-for="(n,i) in nodes" :key="n.id" :value="n.id">{{ String(i+1).padStart(2,'0') }} / {{ n.title[language] }}</option></select><span>{{ text.note }}</span></div>
   <section v-if="current" class="inspection" aria-labelledby="inspection-title"><button class="close" :aria-label="text.close" @click="selected=null">×</button><div><p class="eyebrow">{{ String(nodes.indexOf(current)+1).padStart(2,'0') }} / {{ text.brand }}</p><h2 id="inspection-title">{{ current.title[language] }}</h2><p>{{ current.description[language] }}</p><p><strong>{{ text.why }}:</strong> {{ current.why[language] }}</p></div><dl><div><dt>{{ text.input }}</dt><dd>{{ current.input[language] }}</dd></div><div><dt>{{ text.output }}</dt><dd>{{ current.output[language] }}</dd></div></dl><div class="related"><span>{{ text.connections }}</span><button v-for="e in related" :key="e.id" @click="inspectEdge(e.id)">{{ nodes.find(n=>n.id===e.source)!.title[language] }} → {{ nodes.find(n=>n.id===e.target)!.title[language] }}</button></div></section>
   <section v-else-if="connection" class="inspection edge-inspection" aria-live="polite"><button class="close" :aria-label="text.close" @click="edge=null">×</button><div><p class="eyebrow">{{ text.connections }}</p><h2>{{ connection.label?.[language]??text.connections }}</h2><p><button @click="select(connection.source)">{{ nodes.find(n=>n.id===connection!.source)!.title[language] }}</button> <span>→</span> <button @click="select(connection.target)">{{ nodes.find(n=>n.id===connection!.target)!.title[language] }}</button></p><code>{{ connection.sourcePort }} → {{ connection.targetPort }}</code></div></section>
  </section>
  <footer><p v-if="motion.reduced">{{ text.reduced }}</p><details :open="unavailable"><summary>{{ text.structure }}</summary><ol><li v-for="n in nodes" :key="n.id"><button @click="select(n.id)">{{ n.title[language] }}</button><p>{{ n.description[language] }}</p><p>{{ text.input }}: {{ n.input[language] }}<br>{{ text.output }}: {{ n.output[language] }}</p><ul><li v-for="e in connections.filter(e=>e.source===n.id)" :key="e.id"><button @click="inspectEdge(e.id)">→ {{ nodes.find(n=>n.id===e.target)!.title[language] }} {{ e.label?'· '+e.label[language]:'' }}</button></li></ul></li></ol></details><a :href="project.githubUrl" target="_blank" rel="noopener noreferrer">{{ text.source }} ↗</a></footer>
 </main>
</template>
<style scoped src="../spatial-ai-automation/engine.css"></style>
