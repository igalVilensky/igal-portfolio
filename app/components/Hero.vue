<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-32">
    <!-- Background Layer with Top Mask -->
    <div class="absolute inset-x-0 top-0 bottom-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 z-0 bg-cover bg-center opacity-10 dark:opacity-20 mix-blend-luminosity"
        style="background-image: url('/images/hero-bg.png'); mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);">
      </div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-7xl mx-auto">
        <!-- Intro Tag -->
        <div class="mb-8 overflow-hidden">
          <div class="hero-anim-element translate-y-full opacity-0">
            <span
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100/50 dark:bg-white/10 backdrop-blur-md text-xs font-medium text-primary-700 dark:text-secondary-300 tracking-wider uppercase border border-primary-200/50 dark:border-white/5">
              <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
              Available for New Projects
            </span>
          </div>
        </div>

        <!-- Main Heading -->
        <h1 class="font-display font-bold leading-[0.9] tracking-tight mb-8">
          <div class="overflow-hidden">
            <div
              class="hero-anim-element translate-y-full opacity-0 text-display-lg md:text-display-xl lg:text-display-2xl text-secondary-900 dark:text-white">
              Creative
            </div>
          </div>
          <div class="overflow-hidden">
            <div
              class="hero-anim-element pb-2 translate-y-full opacity-0 text-display-lg md:text-display-xl lg:text-display-2xl text-secondary-900 dark:text-white">
              <span class="text-gradient-primary">Technologist</span>
            </div>
          </div>
          <div class="overflow-hidden">
            <div
              class="hero-anim-element pb-2 translate-y-full opacity-0 text-display-lg md:text-display-xl lg:text-display-2xl text-secondary-900 dark:text-white">
              & Product Engineer
            </div>
          </div>
        </h1>

        <!-- Tech Stack Scroller -->
        <div class="mb-12 overflow-hidden">
          <div class="hero-anim-element translate-y-full opacity-0">
            <div class="flex flex-col gap-4">
              <span class="text-xs uppercase tracking-[0.2em] text-secondary-400 dark:text-secondary-500 font-bold">Tech
                Ecosystem</span>
              <div class="relative flex overflow-x-hidden group whitespace-nowrap">
                <div class="animate-marquee py-2 flex items-center gap-8">
                  <span v-for="(tech, index) in techStack" :key="index"
                    class="text-sm md:text-base font-mono text-secondary-500 dark:text-secondary-400 flex items-center gap-2">
                    <span class="text-primary-500/50">#</span>{{ tech }}
                  </span>
                </div>
                <div class="absolute top-0 animate-marquee2 py-2 flex items-center gap-8">
                  <span v-for="(tech, index) in techStack" :key="'copy-' + index"
                    class="text-sm md:text-base font-mono text-secondary-500 dark:text-secondary-400 flex items-center gap-2">
                    <span class="text-primary-500/50">#</span>{{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="max-w-2xl mb-12 overflow-hidden">
          <p
            class="hero-anim-element translate-y-full opacity-0 text-lg md:text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed text-balance">
            Engineering robust <span class="text-secondary-900 dark:text-white font-semibold italic">digital
              experiences</span> with a focus on
            <span class="text-secondary-900 dark:text-white font-semibold">performance</span>,
            <span class="text-secondary-900 dark:text-white font-semibold">scalability</span>, and
            <span class="text-secondary-900 dark:text-white font-semibold">user-centric design</span>.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="hero-anim-element translate-y-10 opacity-0 flex flex-wrap gap-4">
          <NuxtLink to="/case-studies" class="btn-primary group flex items-center gap-3 py-4 px-8">
            <span>Explore Engineering Work</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </NuxtLink>

          <NuxtLink to="/experiments"
            class="btn-outline group flex items-center gap-3 py-4 px-8 text-secondary-900 dark:text-white border-secondary-200 dark:border-white/20 hover:bg-secondary-100 dark:hover:bg-white/10 backdrop-blur-sm">
            <i class="fas fa-flask text-primary-500 group-hover:rotate-12 transition-transform"></i>
            <span>The Lab</span>
          </NuxtLink>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import CursorNeuralVisualizer from "~/components/CursorNeuralVisualizer.vue";

const techStack = [
  "Vue 3", "Nuxt 3", "TypeScript", "Node.js", "React", "Next.js",
  "Tailwind CSS", "Firebase", "MongoDB", "Sanity", "Express",
  "Web Security", "Chrome Extensions", "Manifest V3", "npm",
  "CLI Tools", "App Architecture", "Performance Tuning"
];

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.to(".hero-anim-element", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.1,
    delay: 0.3,
  });
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500;
}

@keyframes scroll-wheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(15px);
    opacity: 0;
  }
}

.animate-scroll-wheel {
  animation: scroll-wheel 1.5s ease-in-out infinite;
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 40s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}

.animate-marquee:hover,
.animate-marquee2:hover {
  animation-play-state: paused;
}
</style>
