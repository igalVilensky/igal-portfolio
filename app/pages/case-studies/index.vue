<template>
  <div
    class="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-500 pt-32 pb-24 overflow-hidden relative">
    <!-- Background Patterns -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] bg-dot-grid"></div>

    <div class="container mx-auto px-6 relative z-10 max-w-7xl">
      <!-- Page Header -->
      <div class="grid lg:grid-cols-12 gap-12 mb-32 items-end">
        <div class="lg:col-span-8 cs-reveal opacity-0 translate-y-10">
          <span
            class="inline-block px-4 py-1.5 rounded-full bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 dark:text-primary-400 mb-8">
            Case Studies
          </span>
          <h1
            class="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-secondary-900 dark:text-white leading-[1] tracking-tight">
            Selected <br />
            <span class="text-gradient-primary">Architectures.</span>
          </h1>
        </div>
        <div
          class="lg:col-span-4 cs-reveal opacity-0 translate-y-10 lg:pb-4 text-secondary-600 dark:text-secondary-400 italic border-l-2 border-primary-500 pl-6 text-xl">
          Real projects with measurable impact, from high-scale SaaS to precision fintech tools.
        </div>
      </div>

      <!-- Projects Feed -->
      <div class="space-y-48 mb-32">
        <div v-for="(project, index) in professionalProjects" :key="project.id"
          class="grid lg:grid-cols-12 gap-16 items-center cs-reveal opacity-0 translate-y-20">

          <!-- Large Image/Visual Column -->
          <div :class="['lg:col-span-7', index % 2 === 1 ? 'lg:order-2' : '']">
            <div
              class="relative group rounded-3xl overflow-hidden shadow-2xl bg-secondary-100 dark:bg-white/5 p-4 border border-secondary-100 dark:border-white/5">
              <div class="aspect-[16/10] rounded-2xl overflow-hidden bg-white dark:bg-dark-surface relative">
                <div
                  class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-500/10 to-accent-500/10 group-hover:opacity-0 transition-opacity duration-700">
                  <span class="text-8xl font-display font-bold text-secondary-900/5 dark:text-white/5">{{ project.icon
                  }}</span>
                </div>
                <!-- Browser Header Decoration -->
                <div class="absolute top-4 left-4 flex gap-1.5 z-10">
                  <div class="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                  <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                </div>
                <!-- Content Metrics overlay -->
                <div
                  class="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div
                    class="p-4 rounded-xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl border border-white/20">
                    <div class="text-2xl font-bold text-primary-500">{{ project.metric1Value }}</div>
                    <div class="text-[10px] font-bold uppercase tracking-widest text-secondary-400">{{
                      project.metric1Label }}</div>
                  </div>
                  <div
                    class="p-4 rounded-xl bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl border border-white/20">
                    <div class="text-2xl font-bold text-accent-500">{{ project.metric2Value }}</div>
                    <div class="text-[10px] font-bold uppercase tracking-widest text-secondary-400">{{
                      project.metric2Label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content Column -->
          <div :class="['lg:col-span-5 space-y-8', index % 2 === 1 ? 'lg:order-1' : '']">
            <div class="space-y-4">
              <span class="font-mono text-xs text-primary-500 uppercase tracking-widest">{{ project.company }} — {{
                project.period }}</span>
              <h2 class="text-3xl md:text-5xl font-display font-bold text-secondary-900 dark:text-white">
                {{ project.title }}
              </h2>
              <p class="text-xl text-secondary-600 dark:text-secondary-400 leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech"
                class="px-4 py-2 rounded-xl bg-secondary-50 dark:bg-white/5 border border-secondary-100 dark:border-white/5 text-xs font-mono text-secondary-500">
                {{ tech }}
              </span>
            </div>

            <div class="pt-8">
              <NuxtLink :to="project.link"
                class="inline-flex items-center gap-4 py-4 px-8 bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl">
                Deep Dive Case Study <i class="fas fa-arrow-right"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Mini Project Grid (The Lab Overflow) -->
      <div class="pt-32 border-t border-secondary-100 dark:border-white/5">
        <h3 class="text-3xl font-display font-bold mb-16 text-center">Experimental & Side Projects</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="caseStudy in filteredCaseStudies" :key="caseStudy.id"
            class="group p-8 rounded-3xl bg-secondary-50 dark:bg-dark-surface/50 border border-secondary-100 dark:border-white/5 hover:border-primary-500/30 transition-all duration-500 cs-reveal opacity-0 translate-y-10">
            <div class="mb-6 relative aspect-video rounded-xl overflow-hidden bg-white/50 dark:bg-white/5 p-2">
              <img :src="caseStudy.image" :alt="caseStudy.titleKey"
                class="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h4 class="text-xl font-bold dark:text-white mb-2">{{ $t(`projects.${caseStudy.titleKey}.title`) }}</h4>
            <p class="text-sm text-secondary-600 dark:text-secondary-400 mb-6 line-clamp-2">{{
              $t(`projects.${caseStudy.titleKey}.description`) }}</p>
            <div class="flex gap-4">
              <a v-if="caseStudy.link && caseStudy.link !== '#'" :href="caseStudy.link" target="_blank"
                class="text-xs font-bold uppercase tracking-widest text-primary-500">Demo</a>
              <a v-if="caseStudy.github" :href="caseStudy.github" target="_blank"
                class="text-xs font-bold uppercase tracking-widest text-secondary-500">Source</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useHead, onMounted } from "#imports";
import { ref, computed } from "vue";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CaseStudy {
  id: number | string;
  titleKey: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
}

const colorMode = useColorMode();
const selectedTech = ref<string>("");

const professionalProjects = [
  {
    id: 'flowplace',
    title: 'Flowplace: Role Compass',
    company: 'Flowplace',
    period: '2023-Present',
    description: 'Leading end-to-end SaaS development for a talent profile feature that reached 5,000+ users in the first month. Built with Vue.js/Nuxt.js and Directus in a high-velocity Agile environment.',
    technologies: ['Vue.js', 'Nuxt.js', 'Directus', 'TypeScript', 'CI/CD'],
    link: '/case-studies/flowplace',
    icon: 'F',
    metric1Value: '5K+',
    metric1Label: 'Users Month 1',
    metric2Value: '2023',
    metric2Label: 'Launch',
  },
  {
    id: 'ari-motors',
    title: 'ARI Motors: EV Portal',
    company: 'ARI Motors',
    period: '2021-2022',
    description: 'Solo full-stack development of an electric vehicle comparison portal from scratch to production in under 3 months. Managed website, backend, and database architecture.',
    technologies: ['JavaScript', 'Full-Stack', 'Database', 'Responsive Design'],
    link: '/case-studies/leanera',
    icon: 'A',
    metric1Value: '<3',
    metric1Label: 'Months',
    metric2Value: 'Solo',
    metric2Label: 'Developer',
  },
  {
    id: 'leanera',
    title: 'LeanERA: Digital Transition',
    company: 'LeanERA',
    period: '2022-2023',
    description: 'Built scalable web applications with Vue 3, Nuxt 3, and TypeScript to support company-wide digital transformation. Established modern architecture for sustainable growth.',
    technologies: ['Vue 3', 'Nuxt 3', 'TypeScript', 'Tailwind CSS'],
    link: '/case-studies/cashdo',
    icon: 'L',
    metric1Value: 'Vue 3',
    metric1Label: 'Framework',
    metric2Value: 'TS',
    metric2Label: 'Type Safe',
  },
];

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    titleKey: "sunlitTales",
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity", "MongoDB"],
    link: "https://sunlit-tales.netlify.app/",
    github: "https://github.com/igalvilensky/sunlit-tales",
  },
  {
    id: 2,
    titleKey: "psyBlog",
    image: "/mindQlab.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS", "Sanity"],
    link: "https://www.mindqlab.com/",
    github: "https://github.com/igalvilensky/psy-blog",
  },
  {
    id: 3,
    titleKey: "urlShortener",
    image: "/url-shortener.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "Node.js", "MongoDB", "express"],
    link: "https://clean-links.netlify.app/",
    github: "https://github.com/igalvilensky/url-shortener",
  },
  {
    id: 4,
    titleKey: "portfolio",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
    github: "https://github.com/igalVilensky/igal-portfolio",
  },
  {
    id: 5,
    titleKey: "orderSystem",
    image: "/canOrderSystem.jpeg",
    technologies: ["TypeScript", "Next", "React", "Tailwind CSS"],
    link: "https://canordersystem.netlify.app/",
    github: "https://github.com/igalvilensky/order-system",
  },
  {
    id: 6,
    titleKey: "securityPlayground",
    image: "/security.jpeg",
    technologies: ["Nuxt", "Vue 3", "Web Security"],
    link: "/case-studies/security",
    github: "https://github.com/igalVilensky/igal-portfolio",
  },
  {
    id: 7,
    titleKey: "i18nLint",
    image: "/i18-lint-cli.jpeg",
    technologies: ["Node.js", "TypeScript", "CLI", "npm"],
    link: "https://www.npmjs.com/package/i18n-lint-cli",
    github: "https://github.com/igalVilensky/i18n-lint-cli",
  },
  {
    id: 8,
    titleKey: "familySpace",
    image: "/family-space.jpeg",
    technologies: ["Nuxt", "Vue 3", "TypeScript", "Tailwind CSS", "Firebase"],
    link: "https://my-nest.netlify.app/",
    github: "https://github.com/igalVilensky/family-app",
  },
  {
    id: 9,
    titleKey: "globalCommunityMap",
    image: "/comap.jpeg",
    technologies: ["Next", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    link: "https://commoodmap.netlify.app/",
    github: "https://github.com/igalVilensky/Global-Community-Map",
  },
  {
    id: 10,
    titleKey: "pageScope",
    image: "/pagescope.jpeg",
    technologies: ["Chrome Extensions", "JavaScript", "Manifest V3"],
    link: "https://github.com/igalVilensky/pagescope",
    github: "https://github.com/igalVilensky/pagescope",
  },
];

const filteredCaseStudies = computed(() => {
  if (!selectedTech.value) return caseStudies;
  return caseStudies.filter((caseStudy) =>
    caseStudy.technologies.includes(selectedTech.value)
  );
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const reveals = document.querySelectorAll('.cs-reveal');
  reveals.forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    });
  });
});

useHead({
  title: "Case Studies | Igal Vilensky",
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400;
}

.bg-dot-grid {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
</style>
