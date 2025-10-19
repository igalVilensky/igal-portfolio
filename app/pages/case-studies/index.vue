<template>
  <section class="section-y bg-neutral-50 dark:bg-secondary-600 px-4 pt-8">
    <div class="container-custom">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="py-16">
          <div class="inline-block mb-4">
            <span
              class="text-accent-500 font-semibold text-sm uppercase tracking-wider"
            >
              Case Studies
            </span>
          </div>
          <h2
            class="text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight"
          >
            Case Studies
          </h2>
          <p
            class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl"
          >
            In-depth explorations of my work, showcasing technical innovation,
            creative solutions, and measurable impact.
          </p>
        </div>

        <!-- Filter -->
        <div class="mb-12">
          <div class="flex flex-wrap gap-2">
            <button
              @click="selectedTech = ''"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              :class="
                selectedTech === ''
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900'
              "
            >
              All
            </button>
            <button
              v-for="tech in technologies"
              :key="tech"
              @click="selectedTech = tech"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
              :class="
                selectedTech === tech
                  ? 'bg-primary-500 text-white'
                  : 'bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:bg-primary-100 dark:hover:bg-primary-900'
              "
            >
              {{ tech }}
            </button>
          </div>
        </div>

        <!-- Case Studies Grid -->
        <div class="space-y-12 md:space-y-16 mb-16">
          <div
            v-if="filteredCaseStudies.length === 0"
            class="text-center py-16"
          >
            <h3
              class="text-xl font-semibold text-secondary-900 dark:text-white mb-4"
            >
              No case studies found
            </h3>
            <p class="text-neutral-600 dark:text-neutral-300 mb-6">
              Try selecting a different technology filter
            </p>
            <button
              @click="selectedTech = ''"
              class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors text-lg"
            >
              <span>View all case studies</span>
              <span class="group-hover:translate-x-1 transition-transform"
                >→</span
              >
            </button>
          </div>

          <div
            v-for="caseStudy in filteredCaseStudies"
            :key="caseStudy.id"
            class="group"
          >
            <div class="mb-6">
              <div
                class="h-64 md:h-80 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-lg flex items-center justify-center overflow-hidden"
              >
                <img
                  :src="caseStudy.image"
                  :alt="$t(`projects.${caseStudy.titleKey}.title`)"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-10 h-0.5 bg-primary-500"></div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t(`projects.${caseStudy.titleKey}.title`) }}
                </h3>
              </div>
              <p
                class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
              >
                {{ $t(`projects.${caseStudy.titleKey}.description`) }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in caseStudy.technologies"
                  :key="tech"
                  class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium border border-primary-200 dark:border-primary-800"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex flex-wrap gap-4">
                <a
                  v-if="caseStudy.link"
                  :href="caseStudy.link"
                  target="_blank"
                  class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg"
                >
                  <span>Visit live site</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
                <a
                  v-if="caseStudy.github"
                  :href="caseStudy.github"
                  target="_blank"
                  class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg"
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
                  <span>View source</span>
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
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
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
    image: "/i18n-lint-cli.jpeg",
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
</script>
