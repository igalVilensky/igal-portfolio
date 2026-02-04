<template>
  <section class="section-y bg-transparent pt-24 pb-32 px-6 overflow-hidden relative">

    <div class="container mx-auto max-w-7xl">
      <div class="flex flex-col lg:flex-row gap-20">
        <!-- Sticky Header Column -->
        <div class="lg:w-1/3 lg:sticky lg:top-32 lg:h-fit">
          <div class="story-header-anim">
            <span
              class="inline-block px-4 py-1.5 rounded-full bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 dark:text-primary-400 mb-8">
              The Background
            </span>
            <h2
              class="text-4xl md:text-5xl font-display font-bold text-secondary-900 dark:text-white mb-8 leading-[1.1]">
              A Journey of <br />
              <span class="text-gradient-primary">Resilience</span> & <br />
              Invention.
            </h2>
            <div class="w-16 h-1 bg-primary-500 mb-8"></div>
            <p class="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed italic">
              "My journey is defined by a consistent ability to adapt. I build technical systems with the same
              resilience required to navigate and scale within diverse global environments."
            </p>
          </div>
        </div>

        <!-- Scrollable Content Column -->
        <div class="lg:w-2/3 space-y-32">
          <!-- Digital Architect Era -->
          <div class="timeline-item opacity-0 translate-y-20">
            <div class="flex items-center gap-4 mb-6">
              <span class="text-4xl font-display font-bold text-primary-500/20">01</span>
              <h3 class="text-2xl font-bold text-secondary-900 dark:text-white">The Digital Architect</h3>
            </div>
            <p class="text-xl text-secondary-700 dark:text-secondary-300 leading-relaxed mb-8">
              Leading technical development at <span
                class="text-secondary-900 dark:text-white font-bold">Flowplace</span> and formerly <span
                class="text-secondary-900 dark:text-white font-bold">LeanERA</span>.
              I specialize in building complex SaaS ecosystems where performance and user-centric architecture collide.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div
                class="p-4 bg-secondary-50 dark:bg-white/5 rounded-2xl border border-secondary-100 dark:border-white/5">
                <span class="block text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-1">Impact</span>
                <span class="text-sm dark:text-secondary-300">5k+ Users in 1 month</span>
              </div>
              <div
                class="p-4 bg-secondary-50 dark:bg-white/5 rounded-2xl border border-secondary-100 dark:border-white/5">
                <span class="block text-[10px] font-bold text-primary-500 uppercase tracking-widest mb-1">Focus</span>
                <span class="text-sm dark:text-secondary-300">SaaS Scalability</span>
              </div>
            </div>
          </div>

          <!-- Startup & Storytelling Era -->
          <div class="timeline-item opacity-0 translate-y-20">
            <div class="flex items-center gap-4 mb-6">
              <span class="text-4xl font-display font-bold text-primary-500/20">02</span>
              <h3 class="text-2xl font-bold text-secondary-900 dark:text-white">Growth & Storytelling</h3>
            </div>
            <p class="text-xl text-secondary-700 dark:text-secondary-300 leading-relaxed mb-8">
              Scaling startups like <span class="text-secondary-900 dark:text-white font-bold">Cashdo</span> to 100k+
              users while pursuing an acting career in TV and Opera.
              This unique intersection taught me how to bridge technical complexity with human-centered narratives.
            </p>
            <div class="flex flex-wrap gap-3">
              <span
                class="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-xs font-mono text-secondary-500 dark:text-secondary-400">Marketing
                Strategy</span>
              <span
                class="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-xs font-mono text-secondary-500 dark:text-secondary-400">Opera
                & Film</span>
              <span
                class="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-xs font-mono text-secondary-500 dark:text-secondary-400">Product
                Growth</span>
            </div>
          </div>

          <!-- Root Resilience -->
          <div class="timeline-item opacity-0 translate-y-20">
            <div class="flex items-center gap-4 mb-6">
              <span class="text-4xl font-display font-bold text-primary-500/20">03</span>
              <h3 class="text-2xl font-bold text-secondary-900 dark:text-white">Adaptive Foundations</h3>
            </div>
            <p class="text-xl text-secondary-700 dark:text-secondary-300 leading-relaxed">
              Having lived and worked across diverse global contexts, my journey has been a masterclass in rapid
              adaptation.
              Navigating different technical landscapes early on forged an engineering mindset
              that prioritizes flexibility, robustness, and bridge-building between complex technical requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Header Animation
  gsap.from('.story-header-anim', {
    scrollTrigger: {
      trigger: '.story-header-anim',
      start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 1.2,
    ease: 'power4.out'
  });

  // Items Animation
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out'
    });
  });
});
</script>
