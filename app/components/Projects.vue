<template>
  <section id="projects" class="py-20 px-4">
    <div class="max-w-7xl mx-auto text-center">
      <h2
        class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 mt-8"
      >
        {{ $t("projects.title") }}
        <span class="text-teal-500">{{ $t("projects.featured") }}</span>
      </h2>
      <div
        class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-12"
      ></div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Enhanced Project Card -->
        <div
          v-for="project in projects"
          :key="project.id"
          class="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col transform hover:-translate-y-2"
        >
          <!-- Gradient Border Effect -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-500 via-teal-400 to-purple-600 rounded-2xl p-[2px] group-hover:p-[3px] transition-all duration-300"
          >
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl h-full w-full"
            ></div>
          </div>

          <!-- Content Container -->
          <div class="relative z-10 flex flex-col h-full">
            <!-- Enhanced Image Section -->
            <div class="relative p-3 pb-0">
              <div
                class="relative overflow-hidden rounded-xl h-48 bg-gradient-to-br from-teal-500/5 to-purple-600/5"
              >
                <img
                  :src="project.image"
                  :alt="$t(`projects.${project.titleKey}.title`)"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <!-- Subtle overlay for consistency -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent group-hover:from-black/0 transition-all duration-300"
                ></div>

                <!-- Floating gradient accent -->
                <div
                  class="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-teal-400 to-purple-600 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
                ></div>
              </div>
            </div>

            <!-- Enhanced Content Section -->
            <div class="p-6 pt-4 flex flex-col flex-grow">
              <!-- Title with gradient underline -->
              <div class="mb-3">
                <h3
                  class="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
                >
                  {{ $t(`projects.${project.titleKey}.title`) }}
                </h3>
                <div
                  class="w-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-600 group-hover:w-12 transition-all duration-500 ease-out"
                ></div>
              </div>

              <p
                class="text-gray-600 dark:text-gray-300 text-sm mb-5 line-height-relaxed"
              >
                {{ $t(`projects.${project.titleKey}.description`) }}
              </p>

              <!-- Enhanced Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1.5 bg-gradient-to-r from-teal-500/10 to-purple-600/10 text-teal-700 dark:text-teal-300 rounded-full text-xs font-semibold border border-teal-500/20 group-hover:from-teal-500/20 group-hover:to-purple-600/20 group-hover:border-teal-500/30 transition-all duration-300"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Enhanced CTA -->
              <div class="mt-auto">
                <a
                  :href="project.link"
                  target="_blank"
                  class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500/10 to-purple-600/10 hover:from-teal-500/20 hover:to-purple-600/20 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold rounded-lg border border-teal-500/20 hover:border-teal-500/40 transition-all duration-300 group/link"
                >
                  <i
                    class="fas fa-external-link-alt mr-2 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                  ></i>
                  {{ $t("projects.viewProject") }}
                </a>
              </div>
            </div>
          </div>

          <!-- Subtle background pattern -->
          <div
            class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
          >
            <div
              class="absolute inset-0 bg-gradient-to-br from-teal-500 to-purple-600"
            ></div>
          </div>
        </div>
      </div>

      <!-- See All Projects Button -->
      <div class="mt-12 flex justify-center">
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-400 to-purple-600 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
          >
            <div
              class="bg-gradient-to-r from-teal-500 to-purple-600 rounded-full h-full w-full"
            ></div>
          </div>

          <!-- Glowing background effect -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-600/20 rounded-full blur-lg opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          ></div>

          <NuxtLink
            to="/projects"
            class="relative z-10 group/btn bg-gradient-to-r from-teal-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-3"
          >
            <i
              class="fas fa-rocket group-hover/btn:animate-bounce group-hover/btn:text-yellow-200 transition-colors duration-300"
            ></i>
            <span
              class="group-hover/btn:tracking-wide transition-all duration-300"
            >
              {{ $t("projects.seeAllProjects") }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Define projects with translation keys
const projects = computed(() => [
  {
    id: 1,
    titleKey: "sunlitTales",
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity"],
    link: "https://sunlit-tales.netlify.app/",
  },
  {
    id: 2,
    titleKey: "psyBlog",
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
  },
  {
    id: 3,
    titleKey: "portfolio",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
]);
</script>
