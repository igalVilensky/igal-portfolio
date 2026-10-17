<script setup lang="ts">
import LivingNetwork from './LivingNetwork.vue';
import SystemLayers from './SystemLayers.vue';
import DataFlowEngine from './DataFlowEngine.vue';
import IntegratedHero from './IntegratedHero.vue';
import ThemeToggle from '../components/ThemeToggle.vue';
import './lab.css';

defineI18nRoute(false);
useHead({ title: 'Visual Identity Lab — Igal Vilensky', meta: [{ name: 'robots', content: 'noindex, nofollow' }] });
const directions = [
  { name: 'Living Network', subtitle: 'Relationships, made tangible.', component: LivingNetwork },
  { name: 'System Layers', subtitle: 'Complexity, given dimension.', component: SystemLayers },
  { name: 'Data Flow Engine', subtitle: 'Intent, carried into action.', component: DataFlowEngine },
  { name: 'Integrated Hero', subtitle: 'From complexity to clarity.', component: IntegratedHero },
];
const active = ref(3);
const revision = ref(0);
const paused = ref(false);
const visible = ref(false);
const hidden = ref(false);
const stage = ref<HTMLElement>();
let observer: IntersectionObserver | undefined;
function visibility() { hidden.value = document.hidden; }
onMounted(() => {
  observer = new IntersectionObserver(([entry]) => { visible.value = !!entry?.isIntersecting; }, { threshold: 0.05 });
  if (stage.value) observer.observe(stage.value);
  visibility();
  document.addEventListener('visibilitychange', visibility);
});
onBeforeUnmount(() => { observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); });
const stopped = computed(() => paused.value || !visible.value || hidden.value);
</script>

<template>
  <section class="identity-lab" lang="en" aria-labelledby="lab-title">
    <header class="lab-heading">
      <div><p class="lab-eyebrow">Igal Vilensky / Visual research / 4D</p><h1 id="lab-title">Engineering, <em>in motion.</em></h1></div>
      <div class="lab-theme"><span>Experimental</span><ThemeToggle /></div>
    </header>
    <div class="lab-navigation" role="group" aria-label="Prototype">
      <button v-for="(direction, index) in directions" :key="direction.name" :aria-pressed="active === index" aria-controls="lab-stage" @click="active = index; revision = 0">
        <span class="lab-letter">{{ String.fromCharCode(65 + index) }}</span>{{ direction.name }}<span class="lab-choice" aria-hidden="true">{{ active === index ? '↗' : '·' }}</span>
      </button>
    </div>
    <section id="lab-stage" ref="stage" class="lab-stage" :class="{ 'motion-stopped': stopped }" :aria-label="directions[active]!.name">
      <div class="lab-stage-heading"><div><p class="lab-eyebrow">Prototype {{ String.fromCharCode(65 + active) }}</p><h2>{{ directions[active]!.subtitle }}</h2></div>
        <div class="lab-tools"><button :aria-pressed="paused" @click="paused = !paused">{{ paused ? 'Resume motion' : 'Pause motion' }}</button><button @click="revision++">Reset</button></div>
      </div>
      <component :is="directions[active]!.component" :key="`${active}-${revision}`" :stopped="stopped" />
    </section>
    <footer class="lab-caption"><p>Conceptual engineering studies. Illustrative motion, not live activity or an employer’s architecture.</p><p>Select with a pointer, touch, or Tab + Enter / Space. Your reduced-motion preference is respected.</p></footer>
  </section>
</template>
