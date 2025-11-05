<!-- app/components/CaseStudiesPreview.vue -->
<template>
  <section class="section-y bg-neutral-50 dark:bg-secondary-600 pb-16 px-4">
    <div class="container-custom">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="py-16">
          <div class="inline-block mb-4">
            <span
              class="text-secondary-400 font-semibold text-sm uppercase tracking-wider"
            >
              Recent Work
            </span>
          </div>
          <h2
            class="text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight"
          >
            Projects I'm Building
          </h2>
          <p
            class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl"
          >
            Creating solutions that make a difference through collaboration and
            thoughtful design
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="space-y-20 md:space-y-24 mb-16 md:mb-20">
          <!-- PsyBlog Project -->
          <div class="group grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <!-- Image Container - Always on top on mobile -->
            <div class="order-1">
              <div
                class="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-2"
              >
                <div
                  class="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                >
                  <img
                    :src="projects.psyBlog.image"
                    :alt="projects.psyBlog.title"
                    class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <!-- Browser frame decoration -->
                <div class="absolute top-2 left-2 flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
            </div>

            <!-- Content - Below image on mobile, right side on desktop -->
            <div class="order-2 space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-1 bg-primary-500"></div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white"
                >
                  {{ projects.psyBlog.title }}
                </h3>
              </div>
              <p
                class="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
              >
                {{ projects.psyBlog.description }}
              </p>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="tech in projects.psyBlog.technologies"
                  :key="tech"
                  class="px-4 py-2 bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium border border-primary-200 dark:border-primary-800 shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-6 pt-2">
                <a
                  :href="projects.psyBlog.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-all group text-lg"
                >
                  <span>Visit Website</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
                <a
                  :href="projects.psyBlog.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all group text-lg"
                >
                  <span>GitHub</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
              </div>
            </div>
          </div>

          <!-- Family Space Project -->
          <div class="group grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <!-- Image Container - Always on top on mobile -->
            <div class="order-1 md:order-2">
              <div
                class="relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 p-2"
              >
                <div
                  class="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
                >
                  <img
                    :src="projects.familySpace.image"
                    :alt="projects.familySpace.title"
                    class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <!-- Browser frame decoration -->
                <div class="absolute top-2 left-2 flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
            </div>

            <!-- Content - Below image on mobile, left side on desktop -->
            <div class="order-2 md:order-1 space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-1 bg-accent-500"></div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white"
                >
                  {{ projects.familySpace.title }}
                </h3>
              </div>
              <p
                class="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
              >
                {{ projects.familySpace.description }}
              </p>
              <div class="flex flex-wrap gap-3">
                <span
                  v-for="tech in projects.familySpace.technologies"
                  :key="tech"
                  class="px-4 py-2 bg-white dark:bg-secondary-900 text-accent-700 dark:text-accent-300 rounded-lg text-sm font-medium border border-accent-200 dark:border-accent-800 shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-6 pt-2">
                <a
                  :href="projects.familySpace.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-all group text-lg"
                >
                  <span>Live Demo</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
                <a
                  :href="projects.familySpace.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all group text-lg"
                >
                  <span>GitHub</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center">
          <NuxtLink
            to="/case-studies"
            class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg border-b-2 border-primary-500 pb-1"
          >
            <span>Explore more projects</span>
            <span class="group-hover:translate-x-1 transition-transform"
              >→</span
            >
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Project data with images
const projects = {
  psyBlog: {
    title: "MindQ Lab",
    image: "/mindQlab.jpeg",
    link: "https://www.mindqlab.com/",
    github: "https://github.com/igalvilensky/psy-blog",
    description:
      "A psychology blog platform designed to make mental health resources more accessible. Built with modern web technologies to create an engaging and supportive community space.",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
  },
  familySpace: {
    title: "Family Space",
    image: "/family-space.jpeg",
    link: "https://my-nest.netlify.app/",
    github: "https://github.com/igalVilensky/family-app",
    description:
      "A family organization app featuring shared calendars, task management, and messaging. Created to help families coordinate and stay connected in their daily lives.",
    technologies: ["Nuxt", "Vue 3", "TypeScript", "Tailwind CSS", "Firebase"],
  },
};
</script>
