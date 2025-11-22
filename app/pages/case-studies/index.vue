<template>
  <section class="section-y bg-neutral-50 dark:bg-secondary-600 px-4 pt-8">
    <div class="container-custom">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="py-16">
          <div class="inline-block mb-4 cs-header-anim">
            <span
              class="text-accent-500 font-semibold text-sm uppercase tracking-wider"
            >
              Case Studies
            </span>
          </div>
          <h2
            class="text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight cs-header-anim"
          >
            Project Explorations
          </h2>
          <p
            class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl cs-header-anim"
          >
            Detailed journeys through my projects, highlighting technical
            approaches, creative problem-solving, and real-world impact.
          </p>
        </div>

        <!-- Filter -->
        <div class="mb-16">
          <div class="flex flex-wrap gap-3">
            <button
              @click="selectedTech = ''"
              class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cs-filter-anim"
              :class="
                selectedTech === ''
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:shadow-md'
              "
            >
              All Projects
            </button>
            <button
              v-for="tech in technologies"
              :key="tech"
              @click="selectedTech = tech"
              class="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cs-filter-anim"
              :class="
                selectedTech === tech
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:shadow-md'
              "
            >
              {{ tech }}
            </button>
          </div>
        </div>

        <!-- Case Studies Grid -->
        <div class="grid gap-12 md:gap-16 pb-20">
          <div
            v-if="filteredCaseStudies.length === 0"
            class="text-center py-20"
          >
            <div
              class="w-24 h-24 mx-auto mb-6 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center"
            >
              <span class="text-4xl">🔍</span>
            </div>
            <h3
              class="text-2xl font-semibold text-secondary-900 dark:text-white mb-4"
            >
              No projects found
            </h3>
            <p class="text-neutral-600 dark:text-neutral-300 mb-8 text-lg">
              Try selecting a different technology filter
            </p>
            <button
              @click="selectedTech = ''"
              class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors text-lg border-b-2 border-primary-500 pb-1"
            >
              <span>View all projects</span>
              <span class="group-hover:translate-x-1 transition-transform"
                >→</span
              >
            </button>
          </div>

          <div
            v-for="(caseStudy, index) in filteredCaseStudies"
            :key="caseStudy.id"
            class="group grid md:grid-cols-2 gap-8 md:gap-12 items-center cs-card-anim"
            :class="index % 2 === 1 ? 'md:grid-flow-dense' : ''"
          >
            <!-- Image Container -->
            <div
              class="order-1 cs-image-anim"
              :class="index % 2 === 1 ? 'md:order-2 md:col-start-2' : ''"
            >
              <div
                class="relative rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 p-3"
              >
                <div
                  class="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600"
                >
                  <img
                    :src="caseStudy.image"
                    :alt="$t(`projects.${caseStudy.titleKey}.title`)"
                    class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <!-- Browser frame decoration -->
                <div class="absolute top-4 left-4 flex gap-2">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div
              class="order-2 space-y-6 cs-content-anim"
              :class="
                index % 2 === 1
                  ? 'md:order-1 md:col-start-1 md:row-start-1'
                  : ''
              "
            >
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-1"
                    :class="
                      index % 2 === 0 ? 'bg-primary-500' : 'bg-accent-500'
                    "
                  ></div>
                  <h3
                    class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white"
                  >
                    {{ $t(`projects.${caseStudy.titleKey}.title`) }}
                  </h3>
                </div>
                <p
                  class="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
                >
                  {{ $t(`projects.${caseStudy.titleKey}.description`) }}
                </p>
              </div>

              <div class="flex flex-wrap gap-3">
                <span
                  v-for="tech in caseStudy.technologies"
                  :key="tech"
                  class="px-4 py-2 bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium border border-primary-200 dark:border-primary-800 shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>

              <div class="flex flex-wrap gap-6 pt-2">
                <a
                  v-if="caseStudy.link && caseStudy.link !== '#'"
                  :href="caseStudy.link"
                  target="_blank"
                  class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-all group text-lg"
                >
                  <span>Visit Live Site</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
                <a
                  v-if="caseStudy.github"
                  :href="caseStudy.github"
                  target="_blank"
                  class="inline-flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all group text-lg"
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.138 6.839 9.465.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.606-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.983 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.563 9.563 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.203 2.393.1 2.646.64.7 1.028 1.592 1.028 2.683 0 3.842-2.339 4.688-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>View Source</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useColorMode, useHead } from "#imports";
import { ref, computed } from "vue";

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
    technologies: [
      "Chrome Extensions",
      "JavaScript",
      "Manifest V3",
      "HTML",
      "CSS",
    ],
    link: "https://github.com/igalVilensky/pagescope",
    github: "https://github.com/igalVilensky/pagescope",
  },
];

const technologies = computed(() => {
  const techSet = new Set<string>();
  caseStudies.forEach((caseStudy) => {
    caseStudy.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
});

const filteredCaseStudies = computed(() => {
  if (!selectedTech.value) return caseStudies;
  return caseStudies.filter((caseStudy) =>
    caseStudy.technologies.includes(selectedTech.value)
  );
});

useHead({
  title: "Case Studies - Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Explore my case studies showcasing innovative solutions in web development and technology",
    },
    {
      name: "keywords",
      content:
        "case studies, web development, portfolio, nuxt, vue, typescript",
    },
  ],
});

import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Header Animation
  gsap.from('.cs-header-anim', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Filter Animation
  gsap.set('.cs-filter-anim', { opacity: 0, y: 20 });
  gsap.to('.cs-filter-anim', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.05,
    delay: 0.5,
    ease: 'back.out(1.7)',
    clearProps: 'all'
  });

  // Case Study Cards Animation
  const cards = document.querySelectorAll('.cs-card-anim');
  cards.forEach((card, index) => {
    const image = card.querySelector('.cs-image-anim');
    const content = card.querySelector('.cs-content-anim');
    const isEven = index % 2 === 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    tl.from(image, {
      x: isEven ? -50 : 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from(content, {
      x: isEven ? 50 : -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.8");
  });
});

</script>
