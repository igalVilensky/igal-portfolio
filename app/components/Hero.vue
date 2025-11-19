<!-- app/components/Hero.vue -->
<template>
  <section
    class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-primary-500/20 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div class="absolute bottom-0 right-0 w-[800px] h-[800px] bg-accent-500/10 rounded-full blur-[100px] opacity-20"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-5xl mx-auto">
        <!-- Intro Tag -->
        <div class="mb-8 overflow-hidden">
          <div class="hero-anim-element translate-y-full opacity-0">
            <span
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 dark:bg-white/10 text-xs font-medium text-secondary-600 dark:text-secondary-300 tracking-wider uppercase"
            >
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Available for new projects
            </span>
          </div>
        </div>

        <!-- Main Heading -->
        <h1 class="font-display font-bold leading-[0.9] tracking-tight mb-8">
          <div class="overflow-hidden">
            <div class="hero-anim-element translate-y-full opacity-0 text-display-lg md:text-display-xl lg:text-display-2xl text-secondary-900 dark:text-white">
              Creative
            </div>
          </div>
          <div class="overflow-hidden">
            <div class="hero-anim-element translate-y-full opacity-0 text-display-lg md:text-display-xl lg:text-display-2xl text-secondary-900 dark:text-white">
              <span class="text-gradient-primary">Technologist</span> &
            </div>
          </div>
          <div class="overflow-hidden">
            <div class="hero-anim-element pb-2 translate-y-full opacity-0 text-display-lg md:text-display-xl lg:text-display-2xl text-secondary-900 dark:text-white">
              Product Designer
            </div>
          </div>
        </h1>

        <!-- Description -->
        <div class="max-w-2xl mb-12 overflow-hidden">
          <p
            class="hero-anim-element translate-y-full opacity-0 text-lg md:text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed text-balance"
          >
            I craft digital experiences that blend <span class="text-secondary-900 dark:text-white font-semibold">technical excellence</span> with <span class="text-secondary-900 dark:text-white font-semibold">visual storytelling</span>. Currently building the future of web interaction.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-anim-element translate-y-10 opacity-0 flex flex-wrap gap-4">
          <NuxtLink
            to="/case-studies"
            class="btn-primary group flex items-center gap-2"
          >
            <span>View Selected Work</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </NuxtLink>
          
          <NuxtLink
            to="/about"
            class="btn-outline group flex items-center gap-2 text-secondary-900 dark:text-white border-secondary-200 dark:border-white/20 hover:bg-secondary-100 dark:hover:bg-white/10"
          >
            <span>More About Me</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hero-anim-element opacity-0">
      <div class="flex flex-col items-center gap-2 text-secondary-400 dark:text-secondary-500">
        <span class="text-xs uppercase tracking-widest">Scroll</span>
        <div class="w-[1px] h-12 bg-gradient-to-b from-secondary-400/0 via-secondary-400 to-secondary-400/0 dark:from-white/0 dark:via-white/20 dark:to-white/0"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-anim-element', {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.15,
    delay: 0.2
  });
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500;
}
</style>
