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
              Portfolio
            </span>
          </div>
          <h2
            class="text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight"
          >
            Selected Work
          </h2>
          <p
            class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl"
          >
            Projects that demonstrate cross-functional problem-solving
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="space-y-12 md:space-y-16 mb-16 md:mb-20">
          <!-- Family Space Project -->
          <div class="group">
            <div class="mb-6">
              <div
                class="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden"
              >
                <img
                  :src="projects.familySpace.image"
                  :alt="projects.familySpace.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-10 h-0.5 bg-primary-500"></div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white"
                >
                  {{ projects.familySpace.title }}
                </h3>
              </div>
              <p
                class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
              >
                {{ projects.familySpace.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in projects.familySpace.technologies"
                  :key="tech"
                  class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium border border-primary-200 dark:border-primary-800"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 mt-4">
                <a
                  :href="projects.familySpace.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg"
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
                  class="inline-flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group text-lg"
                >
                  <span>GitHub</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
              </div>
            </div>
          </div>

          <!-- Cannabis Order System -->
          <div class="group">
            <div class="mb-6">
              <div
                class="h-64 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden"
              >
                <img
                  :src="projects.orderSystem.image"
                  :alt="projects.orderSystem.title"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-10 h-0.5 bg-accent-500"></div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white"
                >
                  {{ projects.orderSystem.title }}
                </h3>
              </div>
              <p
                class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
              >
                {{ projects.orderSystem.description }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in projects.orderSystem.technologies"
                  :key="tech"
                  class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-accent-700 dark:text-accent-300 rounded-md text-sm font-medium border border-accent-200 dark:border-accent-800"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-4 mt-4">
                <a
                  :href="projects.orderSystem.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg"
                >
                  <span>Live Demo</span>
                  <span class="group-hover:translate-x-1 transition-transform"
                    >→</span
                  >
                </a>
                <a
                  :href="projects.orderSystem.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group text-lg"
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
            <span>View all case studies</span>
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
  familySpace: {
    title: "Family Space",
    image: "/family-space.jpeg",
    link: "https://my-nest.netlify.app/",
    github: "https://github.com/igalVilensky/family-app",
    description:
      "A comprehensive family organization app featuring shared calendars, task management, and family messaging. Built with modern web technologies and real-time Firebase integration for seamless family coordination.",
    technologies: ["Nuxt", "Vue 3", "TypeScript", "Tailwind CSS", "Firebase"],
  },
  orderSystem: {
    title: "Cannabis Order System",
    image: "/canOrderSystem.jpeg",
    link: "https://canordersystem.netlify.app/",
    github: "https://github.com/igalvilensky/order-system",
    description:
      "A specialized e-commerce platform for cannabis products featuring product catalog, shopping cart, and order management. Built with modern React ecosystem and responsive design for optimal user experience.",
    technologies: ["TypeScript", "Next.js", "React", "Tailwind CSS"],
  },
};
</script>
