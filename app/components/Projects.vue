<!-- app/components/ProjectsContent.vue -->
<template>
  <section
    id="projects"
    class="relative bg-slate-50 dark:bg-slate-800 transition-colors duration-300"
  >
    <RainbowBackground v-if="isDesktop" class="opacity-5" />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          {{ $t("projects.title") }}
          <span class="text-blue-600 dark:text-blue-400">{{
            $t("projects.my")
          }}</span>
        </h2>
        <div
          class="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mb-6"
        ></div>
        <p
          class="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          A selection of projects that showcase my technical skills and
          problem-solving approach.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card group bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          <!-- Project Image -->
          <div
            class="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden"
          >
            <img
              :src="project.image"
              :alt="$t(`projects.${project.titleKey}.title`)"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <!-- Status indicator for live projects -->
            <div class="absolute top-3 right-3 flex items-center space-x-2">
              <div
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></div>
              <span
                class="text-xs font-medium text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm"
              >
                Live
              </span>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <!-- Project Title -->
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
            >
              {{ $t(`projects.${project.titleKey}.title`) }}
            </h3>

            <!-- Project Description -->
            <p
              class="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed"
            >
              {{ $t(`projects.${project.titleKey}.description`) }}
            </p>

            <!-- Technology Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Project Links -->
            <div
              class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700"
            >
              <a
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                {{ $t("projects.viewProject") }}
              </a>

              <!-- GitHub link (if available) -->
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                aria-label="View source code"
              >
                <i class="fab fa-github text-lg"></i>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Call to Action -->
      <div class="text-center">
        <div class="space-y-4">
          <!-- Primary CTA -->
          <NuxtLink
            to="/contact"
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
            {{ $t("projects.contactCta") }}
          </NuxtLink>
          <!-- Secondary Info -->
          <p class="text-sm text-slate-600 dark:text-slate-400">
            {{ $t("projects.interested") }}
            <NuxtLink
              to="/contact"
              class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline-offset-4 hover:underline transition-colors duration-200"
            >
              {{ $t("projects.discuss") }}
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  projects: {
    id: string | number;
    titleKey: string;
    image: string;
    technologies: string[];
    link: string;
    github?: string;
  }[];
}>();

// Initialize isDesktop safely
const isDesktop = ref(process.client ? window.innerWidth >= 1024 : false);

// Update isDesktop on window resize
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 1024; // Set initial value
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", handleResize);
  }
});
</script>
