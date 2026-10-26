<script setup lang="ts">
import Continent from '~/world-lab/Continent.client.vue';
import ThemeToggle from '~/components/ThemeToggle.vue';
import {modules,regions,copy,type Locale} from '~/world-lab/registry';
import '~/world-lab/world.css';
definePageMeta({layout:false});
const {locale}=useI18n(),localePath=useLocalePath(),switchLocalePath=useSwitchLocalePath(),color=useColorMode();
const mounted=ref(false),isLight=computed(()=>mounted.value&&color.value==='light');
onMounted(()=>{mounted.value=true;});
const lang=computed(()=>(['en','de','ru'].includes(locale.value)?locale.value:'en') as Locale),c=computed(()=>copy[lang.value]);
useHead(()=>({title:`${c.value.title} — Igal Vilensky`,meta:[{name:'description',content:c.value.subtitle}]}));
const selected=ref<string|null>(null),atlas=ref(false),query=ref(''),region=ref(''),failed=ref(false),world=ref<InstanceType<typeof Continent>>();
const active=computed(()=>modules.find(m=>m.id===selected.value));
const filtered=computed(()=>modules.filter(m=>(!region.value||m.regionId===region.value)&&`${m.title[lang.value]} ${m.tags?.join(' ')??''}`.toLocaleLowerCase().includes(query.value.toLocaleLowerCase())));
function select(id:string){selected.value=id;atlas.value=false;world.value?.focus(id);}
function reset(){selected.value=null;world.value?.reset();}
function failure(){failed.value=true;atlas.value=true;}
function escape(e:KeyboardEvent){if(e.key==='Escape'){if(atlas.value&&!failed.value)atlas.value=false;else reset();}}
onMounted(()=>window.addEventListener('keydown',escape));onBeforeUnmount(()=>window.removeEventListener('keydown',escape));
</script>
<template>
 <main class="world-lab" :class="{'world-light':isLight}">
  <header class="world-header">
   <div><NuxtLink :to="localePath('/')" class="world-back">{{c.brand}} <span>↗ {{ c.back }}</span></NuxtLink><p class="world-edition">{{c.edition}} <span>{{c.review}}</span></p></div>
   <nav class="world-settings" :aria-label="c.preferences"><NuxtLink v-for="l in (['en','de','ru'] as const)" :key="l" :to="switchLocalePath(l)" :aria-current="lang===l?'true':undefined">{{l.toUpperCase()}}</NuxtLink><ThemeToggle/></nav>
  </header>
  <section class="world-stage" :aria-label="c.title">
   <div class="world-heading"><span class="world-eyebrow">01 — {{ c.home }}</span><h1>{{c.title}}</h1><p>{{c.subtitle}}</p></div>
   <ClientOnly><Continent v-if="!failed" ref="world" :selected="selected" :locale="lang" :light="isLight" @select="select" @failure="failure"/></ClientOnly>
   <p v-if="failed" class="world-fallback" role="status">{{c.fallback}}</p>
   <div class="world-compass" aria-hidden="true"><span>N</span><i>↑</i><small>↙ W &nbsp; E ↗</small></div>
   <div class="world-tools"><button @click="atlas=!atlas" :aria-expanded="atlas" aria-controls="world-atlas">☷ {{c.atlas}}</button><button @click="selected=null;world?.overview()">{{c.overview}}</button><button :aria-label="c.reset" @click="reset">↺</button><button :aria-label="c.zoomIn" @click="world?.zoom(1.2)">+</button><button :aria-label="c.zoomOut" @click="world?.zoom(.8)">−</button></div>
   <div v-if="active&&!atlas" class="world-inspector" aria-live="polite">
    <div class="inspector-top"><span>{{regions.find(r=>r.id===active!.regionId)!.name[lang]}} / {{c[active.status]}}</span><button :aria-label="c.close" @click="reset">×</button></div>
    <h2>{{active.title[lang]}}</h2><p>{{active.description[lang]}}</p>
    <NuxtLink v-if="active.route" class="world-enter" @click="world?.saveView()" :to="localePath(active.route)">{{c.enter}} <span>↗</span></NuxtLink><span v-else class="world-planned">◌ {{c.planned}}</span>
   </div>
   <aside v-if="atlas" id="world-atlas" class="world-atlas" :aria-label="c.atlas">
    <div class="atlas-title"><h2>{{c.atlas}}</h2><button v-if="!failed" :aria-label="c.close" @click="atlas=false">×</button></div>
    <label class="sr-only" for="world-search">{{c.search}}</label><input id="world-search" v-model="query" type="search" :placeholder="c.search"/>
    <label class="sr-only" for="world-region">{{c.region}}</label><select id="world-region" v-model="region"><option value="">{{c.all}}</option><option v-for="r in regions" :key="r.id" :value="r.id">{{r.name[lang]}}</option></select>
    <ul><li v-for="m in filtered" :key="m.id"><div><button class="atlas-place" @click="select(m.id)">{{m.title[lang]}}</button><small>{{regions.find(r=>r.id===m.regionId)!.name[lang]}} · {{c[m.status]}}</small></div><NuxtLink v-if="m.route" :to="localePath(m.route)" :aria-label="`${c.enter}: ${m.title[lang]}`">↗</NuxtLink><span v-else>◌</span></li></ul><p v-if="!filtered.length">{{c.empty}}</p>
   </aside>
   <footer class="world-bottom"><span class="desktop-hint">{{c.hint}}</span><span class="mobile-hint">{{c.mobile}}</span><span class="world-scale">{{c.scale}} <span> / {{c.geography}}</span></span></footer>
  </section>
  <nav class="world-quick" :aria-label="c.atlas"><NuxtLink :to="localePath('/spatial-work')">{{modules[0]!.title[lang]}} ↗</NuxtLink><button @click="atlas=true">{{c.atlas}} — {{modules.length}} {{lang==='de'?'Orte':lang==='ru'?'мест':'places'}} ↗</button></nav>
 </main>
</template>
