<template>
  <div
    class="min-h-screen font-['Poppins']"
    :class="
      colorMode.value === 'dark'
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900'
    "
  >
    <!-- Navbar -->
    <Navbar />

    <!-- Back to Home Button -->
    <div class="fixed top-4 left-4 z-50">
      <NuxtLink
        to="/"
        class="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-1 sm:gap-2 backdrop-blur-sm bg-opacity-95"
      >
        <i
          class="fas fa-home group-hover:animate-bounce text-xs sm:text-sm"
        ></i>
        <span class="hidden xs:inline">{{ $t("nav.backToHome") }}</span>
        <span class="xs:hidden">{{ $t("nav.home") }}</span>
      </NuxtLink>
    </div>

    <!-- Enhanced Projects Header -->
    <header class="relative pt-20 pb-12 sm:pb-16 sm:pt-32 px-4 overflow-hidden">
      <!-- Animated Background Elements -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-teal-50 via-purple-25 to-purple-50"
        :class="
          colorMode.value === 'dark'
            ? 'from-gray-800 via-gray-850 to-gray-900'
            : 'from-teal-50 via-purple-25 to-purple-50'
        "
      ></div>
      <div
        class="absolute top-5 right-5 w-32 h-32 sm:w-48 sm:h-48 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-5 left-5 w-40 h-40 sm:w-64 sm:h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>

      <div class="relative max-w-7xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-8">
          <h1
            class="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 dark:text-black mb-2 leading-tight"
          >
            {{ $t("projects.title") }}
            <span
              class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent animate-gradient"
              >{{ $t("projects.my") }}</span
            >
          </h1>
          <div
            class="w-12 sm:w-16 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-3"
          ></div>
          <p
            class="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-500 font-medium max-w-xl mx-auto"
          >
            {{ $t("projects.subtitle") }}
            <em class="text-teal-600 dark:text-teal-400 font-semibold">{{
              $t("projects.subtitleHighlight")
            }}</em>
          </p>
        </div>

        <!-- Stats and Filters Combined -->
        <div
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6"
        >
          <!-- Stats Row -->
          <div class="flex justify-center gap-6 sm:gap-12 mb-6">
            <div class="text-center">
              <div class="text-xl sm:text-2xl font-black text-teal-600">
                {{ filteredProjects.length }}
              </div>
              <div
                class="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400"
              >
                {{ selectedTech ? $t("projects.my") : $t("projects.my") }}
              </div>
            </div>
            <div class="text-center">
              <div class="text-xl sm:text-2xl font-black text-purple-600">
                {{ technologies.length }}
              </div>
              <div
                class="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400"
              >
                {{ $t("education.technologiesCount") }}
              </div>
            </div>
          </div>

          <!-- Filter Buttons -->
          <div class="text-center">
            <h3
              class="text-sm sm:text-base font-bold mb-4 text-gray-900 dark:text-white"
            >
              {{ $t("projects.filterByTech") }}
            </h3>
            <div class="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              <button
                @click="selectedTech = ''"
                class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                :class="
                  selectedTech === ''
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                    : colorMode.value === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                "
              >
                {{ $t("projects.allProjects") }}
              </button>
              <button
                v-for="tech in technologies"
                :key="tech"
                @click="selectedTech = tech"
                class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
                :class="
                  selectedTech === tech
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                    : colorMode.value === 'dark'
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                "
              >
                {{ tech }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Projects Section -->
    <section class="py-8 sm:py-12 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Results Info -->
        <div class="text-center mb-6">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{
              $t("projects.showingProjects", {
                filteredCount: filteredProjects.length,
                totalCount: projects.length,
              })
            }}
            <span
              v-if="selectedTech"
              class="font-semibold text-teal-600 dark:text-teal-400"
            >
              {{ $t("projects.forTech", { selectedTech }) }}
            </span>
          </p>
        </div>

        <!-- Projects Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 flex flex-col"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="relative overflow-hidden">
              <img
                :src="project.image"
                :alt="$t(`projects.${project.title}.title`)"
                class="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="absolute top-3 right-3">
                <span
                  class="px-2 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold rounded-full"
                >
                  {{ $t("projects.live") }}
                </span>
              </div>
            </div>
            <div class="p-4 sm:p-6 flex flex-col flex-grow">
              <h3
                class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
              >
                {{ $t(`projects.${project.title}.title`) }}
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4"
              >
                {{ $t(`projects.${project.title}.description`) }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 sm:px-3 py-1 bg-gradient-to-r from-teal-500/10 to-purple-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-700 rounded-full text-xs font-medium"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex gap-3 mt-auto">
                <a
                  :href="project.link"
                  target="_blank"
                  class="flex-1 group/btn inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold text-sm hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <i
                    class="fas fa-external-link-alt mr-2 group-hover/btn:animate-bounce text-xs"
                  ></i>
                  {{ $t("projects.viewLive") }}
                </a>
                <a
                  href="https://github.com/igalVilensky"
                  target="_blank"
                  class="flex-1 group/btn inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <i
                    class="fas fa-info-circle mr-2 group-hover/btn:animate-bounce text-xs"
                  ></i>
                  {{ $t("projects.viewDetails") }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredProjects.length === 0"
          class="text-center py-12 sm:py-16"
        >
          <div class="mb-4">
            <i class="fas fa-search text-4xl sm:text-5xl text-gray-400"></i>
          </div>
          <h3
            class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {{ $t("projects.noProjectsFound") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {{ $t("projects.noProjectsMatch") }}
          </p>
          <button
            @click="selectedTech = ''"
            class="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            {{ $t("projects.viewAllProjects") }}
          </button>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section
      class="py-12 sm:py-16 px-4 bg-gradient-to-br from-teal-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h2
          class="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4"
        >
          {{ $t("contact.subtitle") }}
        </h2>
        <p
          class="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 max-w-2xl mx-auto"
        >
          {{ $t("contact.description") }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:vilenskyigal@gmail.com"
            class="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i class="fas fa-envelope"></i>
            {{ $t("contact.getInTouch") }}
          </a>
          <NuxtLink
            to="/"
            class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i class="fas fa-user"></i>
            {{ $t("contact.learnMore") }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 sm:py-16"
    >
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
          {{ $t("contact.title") }}
          <span
            class="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"
            >{{ $t("contact.lets") }}</span
          >
        </h2>
        <div
          class="w-16 sm:w-20 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-8"
        ></div>
        <div
          class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8"
        >
          <a
            href="mailto:vilenskyigal@gmail.com"
            class="group flex items-center gap-3 text-base sm:text-lg hover:text-teal-400 transition-colors duration-300"
          >
            <i
              class="fas fa-envelope text-xl sm:text-2xl group-hover:animate-bounce"
            ></i>
            igalVilensky@gmail.com
          </a>
          <a
            href="tel:+491783099433"
            class="group flex items-center gap-3 text-base sm:text-lg hover:text-purple-400 transition-colors duration-300"
          >
            <i
              class="fas fa-phone text-xl sm:text-2xl group-hover:animate-pulse"
            ></i>
            {{ $t("contact.phone") }}
          </a>
        </div>
        <div class="border-t border-gray-700 pt-6">
          <p class="text-gray-400 text-sm sm:text-base">
            {{ $t("contact.copyright") }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useHead } from "#imports";
import Navbar from "../components/Navbar.vue";

const colorMode = useColorMode();
const selectedTech = ref("");

// Enhanced project data with more realistic projects
const projects = [
  {
    id: 1,
    title: "sunlitTales",
    description: "sunlitTales",
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity", "MongoDB"],
    link: "https://sunlit-tales.netlify.app/",
  },
  {
    id: 2,
    title: "psyBlog",
    description: "psyBlog",
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
  },
  {
    id: 3,
    title: "urlShortener",
    description: "urlShortener",
    image: "/url-shortener.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "Node.js", "MongoDB", "express"],
    link: "https://clean-links.netlify.app/",
  },
  {
    id: 4,
    title: "portfolio",
    description: "portfolio",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
  {
    id: 5,
    title: "blogPlatform",
    description: "blogPlatform",
    image: "/coming_soon.jpg",
    technologies: ["Directus", "Vue.js", "Node.js", "PostgreSQL"],
    link: "https://example.com/blog",
  },
  {
    id: 6,
    title: "propertyManagement",
    description: "propertyManagement",
    image: "/coming_soon.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com/realestate",
  },
];

// Unique technologies for filters
const technologies = computed(() => {
  const techSet = new Set<string>();
  projects.forEach((project) => {
    project.technologies.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
});

// Filtered projects based on selected technology
const filteredProjects = computed(() => {
  if (!selectedTech.value) return projects;
  return projects.filter((project) =>
    project.technologies.includes(selectedTech.value)
  );
});

// SEO meta tags
useHead({
  title: $t("projects.seo.title"),
  meta: [
    {
      name: "description",
      content: $t("projects.seo.description"),
    },
    {
      name: "keywords",
      content: $t("projects.seo.keywords"),
    },
    {
      property: "og:title",
      content: $t("projects.seo.ogTitle"),
    },
    {
      property: "og:description",
      content: $t("projects.seo.ogDescription"),
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
  ],
});
</script>

<style>
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 400% 400%;
  animation: gradient 3s ease infinite;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: slideInUp 0.6s ease forwards;
}
</style>
