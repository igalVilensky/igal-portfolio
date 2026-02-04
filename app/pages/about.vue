<template>
  <div class="min-h-screen bg-transparent pt-32 pb-24 overflow-hidden relative">
    <AboutVisualizer />
    <div class="container mx-auto px-6 relative z-10 max-w-7xl">
      <!-- Section: Meta & Headline -->
      <div class="grid lg:grid-cols-12 gap-12 mb-32 items-end">
        <div class="lg:col-span-8 about-reveal opacity-0 translate-y-10">
          <span
            class="inline-block px-4 py-1.5 rounded-full bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 dark:text-primary-400 mb-8">
            The Philosophy
          </span>
          <h1
            class="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-secondary-900 dark:text-white leading-[1] tracking-tight">
            Engineering <br />
            <span class="text-gradient-primary">Human</span> Experience.
          </h1>
        </div>
        <div class="lg:col-span-4 about-reveal opacity-0 translate-y-10 lg:pb-4">
          <p
            class="text-xl text-secondary-600 dark:text-secondary-400 leading-relaxed italic border-l-2 border-primary-500 pl-6">
            "I don't just write code; I design systems that empower growth and solve tangible business challenges."
          </p>
        </div>
      </div>

      <!-- Section: The Narrative Grid -->
      <div class="grid lg:grid-cols-12 gap-20 mb-32">
        <!-- Sidebar: The Core -->
        <div class="lg:col-span-4 space-y-12">
          <div class="about-reveal opacity-0 translate-y-10">
            <div
              class="aspect-square rounded-3xl overflow-hidden bg-secondary-100 dark:bg-white/5 mb-8 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <img src="/profile.jpeg" alt="Igal Vilensky"
                class="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" />
            </div>
            <h3 class="text-2xl font-bold dark:text-white mb-2">Igal Vilensky</h3>
            <p class="text-primary-500 font-mono text-xs uppercase tracking-widest mb-6">Product Engineer • Creative
              Technologist</p>
          </div>

          <!-- Quick Context Cards -->
          <div class="space-y-4 about-reveal opacity-0 translate-y-10">
            <div
              class="p-6 rounded-2xl bg-secondary-50 dark:bg-white/5 border border-secondary-100 dark:border-white/5">
              <span class="block text-[10px] font-bold text-secondary-400 uppercase tracking-widest mb-1">Current
                Base</span>
              <span class="text-sm dark:text-secondary-300">Leipzig, Germany</span>
            </div>
            <div
              class="p-6 rounded-2xl bg-secondary-50 dark:bg-white/5 border border-secondary-100 dark:border-white/5">
              <span class="block text-[10px] font-bold text-secondary-400 uppercase tracking-widest mb-1">Key
                Expertise</span>
              <span class="text-sm dark:text-secondary-300">Scalable SaaS Architecture</span>
            </div>
          </div>
        </div>

        <!-- Main Body: The Depth -->
        <div class="lg:col-span-8 space-y-16">
          <div class="prose prose-xl dark:prose-invert max-w-none about-reveal opacity-0 translate-y-10">
            <h2 class="text-3xl font-display font-bold mb-8">Bridging Ambition & Reality.</h2>
            <p class="text-secondary-600 dark:text-secondary-400">
              My transition from a multi-disciplinary background into high-stakes software engineering wasn't
              accidental—it was driven by a fascination with how robust systems can scale human ideas.
              At <span class="text-secondary-900 dark:text-white font-bold">Flowplace</span>, I lead the technical
              evolution of SaaS features that bridge talent profiling with enterprise needs, reaching 5,000+ users in
              record time.
            </p>
            <p class="text-secondary-600 dark:text-secondary-400">
              My engineering philosophy is rooted in <span class="text-primary-500 italic">resilience</span>.
              Having operated in the world's most extreme climates (-60°C environments in the Arctic), I approach system
              design with the same rigor: building for reliability, edge-case failure prevention, and sustainable
              performance.
            </p>
          </div>

          <!-- Skills Editorial Grid -->
          <div class="grid md:grid-cols-2 gap-8 about-reveal opacity-0 translate-y-10">
            <div class="space-y-6">
              <h4 class="text-sm font-bold uppercase tracking-widest text-primary-500">Tech Ecosystem</h4>
              <ul class="space-y-3">
                <li v-for="skill in frontendSkills" :key="skill.title"
                  class="flex items-center gap-3 text-secondary-700 dark:text-secondary-300">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  {{ skill.title }}
                </li>
              </ul>
            </div>
            <div class="space-y-6">
              <h4 class="text-sm font-bold uppercase tracking-widest text-primary-500">Architecture & Ops</h4>
              <ul class="space-y-3">
                <li v-for="skill in backendSkills" :key="skill.title"
                  class="flex items-center gap-3 text-secondary-700 dark:text-secondary-300">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                  {{ skill.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: The Unconventional Path (Editorial Cards) -->
      <div class="grid md:grid-cols-3 gap-8 mb-32">
        <div v-for="(fact, i) in funFacts" :key="i"
          class="p-10 rounded-3xl bg-secondary-50 dark:bg-dark-surface/50 border border-secondary-100 dark:border-white/5 about-reveal opacity-0 translate-y-10">
          <i :class="[fact.icon, 'text-primary-500 text-2xl mb-6']"></i>
          <h4 class="text-xl font-bold dark:text-white mb-4">{{ fact.title }}</h4>
          <p class="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed">{{ fact.desc }}</p>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="text-center about-reveal opacity-0 translate-y-10">
        <h3 class="text-3xl font-display font-bold mb-12">Looking for a Technical Partner?</h3>
        <button @click="scrollToContact"
          class="inline-flex items-center gap-4 py-5 px-12 bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl">
          Get in Touch <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useHead, navigateTo } from "#imports";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutVisualizer from '~/components/AboutVisualizer.vue';

const frontendSkills = [
  { title: "TypeScript / Vue / Nuxt" },
  { title: "React / Next.js / Mobile" },
  { title: "Component Architecture" },
  { title: "Performance Optimization" }
];

const backendSkills = [
  { title: "Node.js / Distributed Systems" },
  { title: "Firebase / NoSQL / CMS" },
  { title: "Security & Auth Protocols" },
  { title: "API Design & Scaling" }
];

const funFacts = [
  {
    title: "Dramatic Arts",
    desc: "A background in TV, Film, and Opera that fuels my ability to communicate complex ideas and present high-stakes product narratives.",
    icon: "fas fa-theater-masks"
  },
  {
    title: "Arctic Resilience",
    desc: "Surviving and working in Yamalo-Nenets (-60°C) taught me mental toughness and the importance of redundant, fail-safe systems.",
    icon: "fas fa-snowflake"
  },
  {
    title: "Creative Improvisation",
    desc: "A piano player who believes that engineering code and improvising melodies share the same fundamental patterns of structure and creativity.",
    icon: "fas fa-music"
  }
];

const scrollToContact = () => {
  return navigateTo("/contact");
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const reveals = document.querySelectorAll('.about-reveal');
  reveals.forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      delay: (i % 3) * 0.1,
      ease: "power4.out"
    });
  });
});

useHead({
  title: "About | Igal Vilensky - Engineering Philosophy",
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400;
}
</style>
