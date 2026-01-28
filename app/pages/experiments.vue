<template>
  <div
    class="min-h-screen bg-secondary-50 dark:bg-dark-bg transition-colors duration-500 pt-32 pb-24 overflow-hidden relative">
    <!-- Background Patterns -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40">
      <div
        class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#0ea5e910_0,transparent_50%)]">
      </div>
      <div
        class="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,#f43f5e10_0,transparent_50%)]">
      </div>
    </div>

    <div class="container mx-auto px-6 relative z-10 max-w-7xl">
      <!-- Page Header -->
      <div class="max-w-4xl mb-16 px-4">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-xs font-mono text-secondary-500 dark:text-primary-400 mb-6 lab-header-anim">
          <span class="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></span>
          LAB_ENV: PRODUCTION
        </div>
        <h1
          class="text-display-lg md:text-display-xl font-display font-bold text-secondary-900 dark:text-white mb-6 leading-tight lab-header-anim">
          The <span class="text-gradient-primary">Digital Lab</span>
        </h1>
        <p class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl leading-relaxed lab-header-anim">
          A collection of experiments in AI, system architecture, and creative engineering. Most projects here are in
          active development or conceptual stage.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <!-- Main Featured Module -->
        <div class="lg:col-span-8 lab-mod-anim">
          <div class="relative group">
            <div
              class="absolute -top-4 -left-4 z-20 px-3 py-1 bg-primary-600 text-white text-[10px] font-bold rounded-lg shadow-lg uppercase tracking-widest">
              Featured Module
            </div>
            <component :is="modules.find(m => m.id === featuredModule)?.component" :is-featured="true" />
          </div>
        </div>

        <!-- Sidebar / Secondary Experiments -->
        <div class="lg:col-span-4 space-y-8">
          <div class="flex flex-col gap-8">
            <template v-for="mod in modules" :key="mod.id">
              <div v-if="mod.id !== featuredModule" class="lab-mod-anim group cursor-pointer relative"
                @click="swapModule(mod.id)">
                <div class="absolute -top-3 -right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="bg-primary-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg">
                    Swap to Main
                  </div>
                </div>
                <div class="transition-all duration-500 group-hover:scale-[1.02] filter group-hover:brightness-110">
                  <component :is="mod.component" :is-featured="false" />
                </div>
                <div
                  class="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/5 transition-colors rounded-3xl z-10">
                </div>
              </div>
            </template>
          </div>

          <!-- Lab Stats Card -->
          <div
            class="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl lab-mod-anim">
            <div class="relative z-10">
              <h4 class="text-lg font-bold mb-2">Request a Prototype?</h4>
              <p class="text-primary-100 text-sm mb-6">Need a custom solution or want to discuss an experimental
                feature?</p>
              <NuxtLink to="/contact"
                class="inline-flex items-center gap-2 text-sm font-bold bg-white text-primary-700 px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors">
                Let's Talk
                <i class="fas fa-arrow-right"></i>
              </NuxtLink>
            </div>
            <i class="fas fa-flask absolute -bottom-4 -right-4 text-8xl text-white/10 rotate-12"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, markRaw, nextTick } from 'vue';
import gsap from 'gsap';
import ArchitectSimulator from '~/components/ArchitectSimulator.vue';
import JsonToTs from '~/components/lab/JsonToTs.vue';
import ContrastChecker from '~/components/lab/ContrastChecker.vue';

const featuredModule = ref('architect');

const modules = [
  { id: 'architect', component: markRaw(ArchitectSimulator), title: 'AI Architect' },
  { id: 'jsontots', component: markRaw(JsonToTs), title: 'JSON to TS' },
  { id: 'contrast', component: markRaw(ContrastChecker), title: 'A11y Check' }
];

const swapModule = (id: string) => {
  if (featuredModule.value === id) return;

  // Transition effect - ONLY target modules, NOT header
  gsap.to('.lab-mod-anim', {
    opacity: 0,
    y: 20,
    scale: 0.98,
    duration: 0.3,
    stagger: 0.05,
    onComplete: async () => {
      featuredModule.value = id;
      await nextTick();

      // Force visibility and animate in. DO NOT use opacity-0 in template.
      gsap.fromTo('.lab-mod-anim',
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power4.out',
          clearProps: 'all' // Reset GSAP injected styles to avoid stuck opacity
        }
      );
    }
  });
};

onMounted(() => {
  // Initialize states in JS to avoid CSS conflicts
  gsap.set(['.lab-header-anim', '.lab-mod-anim'], { opacity: 0, y: 30 });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.lab-header-anim', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out'
  })
    .to('.lab-mod-anim', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    }, '-=0.6');
});

useHead({
  title: "The Lab | Igal Vilensky",
  meta: [
    { name: 'description', content: 'Experimental digital lab exploring AI, Nuxt 3, and modern web architecture.' }
  ]
});
</script>

<style scoped>
.glass {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.bg-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
