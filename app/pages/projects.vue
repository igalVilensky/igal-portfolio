<template>
  <div
    class="min-h-screen font-['Poppins']"
    :class="
      colorMode.value === 'dark'
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900'
    "
  >
    <!-- Back to Home Button - Enhanced with better mobile positioning -->
    <div class="fixed top-4 left-4 z-50">
      <NuxtLink
        to="/"
        class="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-1 sm:gap-2 backdrop-blur-sm bg-opacity-95"
      >
        <i
          class="fas fa-home group-hover:animate-bounce text-xs sm:text-sm"
        ></i>
        <span class="hidden xs:inline">Back to Home</span>
        <span class="xs:hidden">Home</span>
      </NuxtLink>
    </div>

    <!-- Enhanced Projects Header -->
    <header class="relative py-20 sm:py-32 px-4 overflow-hidden">
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
        class="absolute top-10 sm:top-20 right-5 sm:right-10 w-48 h-48 sm:w-72 sm:h-72 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-10 left-5 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>

      <div class="relative max-w-7xl mx-auto text-center">
        <!-- Animated Title -->
        <div class="mb-6 sm:mb-8">
          <h1
            class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-black mb-2 sm:mb-4 leading-tight"
          >
            My
            <span
              class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent animate-gradient"
              >Projects</span
            >
          </h1>
          <div
            class="w-16 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-4 sm:mb-6"
          ></div>
        </div>

        <p
          class="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 font-medium max-w-2xl mx-auto px-2"
        >
          Discover my journey through
          <em class="text-teal-600 dark:text-teal-400 font-semibold"
            >innovative solutions</em
          >
          and creative digital experiences
        </p>

        <!-- Stats Section -->
        <div class="flex justify-center gap-4 sm:gap-8 mb-8">
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-black text-teal-600">
              {{ projects.length }}
            </div>
            <div
              class="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400"
            >
              Projects
            </div>
          </div>
          <div class="text-center">
            <div class="text-2xl sm:text-3xl font-black text-purple-600">
              {{ technologies.length }}
            </div>
            <div
              class="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400"
            >
              Technologies
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Enhanced Projects Section -->
    <section class="py-12 sm:py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Enhanced Filters Section -->
        <div class="mb-8 sm:mb-12">
          <h3
            class="text-lg sm:text-xl font-bold text-center mb-4 sm:mb-6 text-gray-900 dark:text-white"
          >
            Filter by Technology
          </h3>
          <div
            class="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-4xl mx-auto"
          >
            <button
              @click="selectedTech = ''"
              class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
              :class="
                selectedTech === ''
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg'
                  : colorMode.value === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              "
            >
              All Projects
            </button>
            <button
              v-for="tech in technologies"
              :key="tech"
              @click="selectedTech = tech"
              class="px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105"
              :class="
                selectedTech === tech
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : colorMode.value === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              "
            >
              {{ tech }}
            </button>
          </div>
        </div>

        <!-- Results Counter -->
        <div class="text-center mb-6 sm:mb-8">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Showing {{ filteredProjects.length }} of
            {{ projects.length }} projects
            <span v-if="selectedTech" class="font-semibold"
              >for "{{ selectedTech }}"</span
            >
          </p>
        </div>

        <!-- Enhanced Projects Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 flex flex-col min-h-full"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <!-- Project Image origin main with Overlay -->
            <div class="relative overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <!-- Project Status Badge -->
              <div class="absolute top-3 right-3">
                <span
                  class="px-2 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white text-xs font-semibold rounded-full"
                >
                  Live
                </span>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-4 sm:p-6 flex flex-col flex-grow">
              <h3
                class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
              >
                {{ project.title }}
              </h3>
              <p
                class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4"
              >
                {{ project.description }}
              </p>
              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4 sm:mb-6">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 sm:px-3 py-1 bg-gradient-to-r from-teal-500/10 to-purple-500/10 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-700 rounded-full text-xs font-medium"
                >
                  {{ tech }}
                </span>
              </div>
              <!-- Action Buttons   -->
              <div class="flex gap-3 mt-auto">
                <a
                  :href="project.link"
                  target="_blank"
                  class="flex-1 group/btn inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold text-sm hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <i
                    class="fas fa-external-link-alt mr-2 group-hover/btn:animate-bounce text-xs"
                  ></i>
                  View Live
                </a>
                <button
                  class="p-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  title="View Details"
                >
                  <i class="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredProjects.length === 0"
          class="text-center py-12 sm:py-20"
        >
          <div class="mb-4">
            <i class="fas fa-search text-4xl sm:text-6xl text-gray-400"></i>
          </div>
          <h3
            class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2"
          >
            No projects found
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            No projects match the selected technology filter.
          </p>
          <button
            @click="selectedTech = ''"
            class="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section
      class="py-12 sm:py-20 px-4 bg-gradient-to-br from-teal-50 to-purple-50 dark:from-gray-800 dark:to-gray-900"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h2
          class="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4"
        >
          Have a Project in Mind?
        </h2>
        <p
          class="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto"
        >
          Let's collaborate and bring your ideas to life with cutting-edge web
          technologies.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:vilenskyigal@gmail.com"
            class="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i class="fas fa-envelope"></i>
            Get in Touch
          </a>
          <NuxtLink
            to="/"
            class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <i class="fas fa-user"></i>
            Learn More About Me
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Enhanced Footer -->
    <footer
      class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 sm:py-20"
    >
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-2xl sm:text-3xl md:text-5xl font-black mb-6 sm:mb-8">
          Let's
          <span
            class="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"
            >Connect</span
          >
        </h2>
        <div
          class="w-16 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-8 sm:mb-12"
        ></div>

        <!-- Contact Links -->
        <div
          class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8 sm:mb-12"
        >
          <a
            href="mailto:vilenskyigal@gmail.com"
            class="group flex items-center gap-3 text-base sm:text-lg hover:text-teal-400 transition-colors duration-300"
          >
            <i
              class="fas fa-envelope text-xl sm:text-2xl group-hover:animate-bounce"
            ></i>
            <span class="break-all sm:break-normal"
              >vilenskyigal@gmail.com</span
            >
          </a>
          <a
            href="tel:+491783099433"
            class="group flex items-center gap-3 text-base sm:text-lg hover:text-purple-400 transition-colors duration-300"
          >
            <i
              class="fas fa-phone text-xl sm:text-2xl group-hover:animate-pulse"
            ></i>
            +49 1783099433
          </a>
        </div>

        <!-- Social Links -->
        <div class="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <a
            href="#"
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-linkedin text-lg sm:text-xl"></i>
          </a>
          <a
            href="#"
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-github text-lg sm:text-xl"></i>
          </a>
          <a
            href="#"
            class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-twitter text-lg sm:text-xl"></i>
          </a>
        </div>

        <div class="border-t border-gray-700 pt-6 sm:pt-8">
          <p class="text-gray-400 text-sm sm:text-base">
            &copy; 2025 Igal Vilensky. Crafted with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useHead } from "#imports";
import { ref, computed } from "vue";

const colorMode = useColorMode();
const selectedTech = ref("");

// Enhanced project data with more realistic projects
const projects = [
  {
    id: 1,
    title: "Sunlit tales",
    description:
      "Immerse yourself in the world of poetry, where every word is a ray of light illuminating the depths of the soul.",
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity", "MongoDB"],
    link: "https://sunlit-tales.netlify.app/",
  },
  {
    id: 2,
    title: "Your Path to Personal Growth",
    description:
      "Psy-Blog blends Kabbalah and psychology into a 10-week journey through the Tree of Self. Daily progress earns points, levels, and balance guided by the Energy of the Day.",
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio showcasing my web development projects.",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
  {
    id: 4,
    title: "Coming soon",
    description:
      "A headless CMS-powered blog platform with rich text editing, SEO optimization, and multi-author support.",
    image: "/coming_soon.jpg",
    technologies: ["Directus", "Vue.js", "Node.js", "PostgreSQL"],
    link: "https://example.com/blog",
  },
  {
    id: 5,
    title: "Coming soon",
    description:
      "A comprehensive property management system with advanced search filters, virtual tours, and market analytics.",
    image: "/coming_soon.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://example.com/realestate",
  },
  {
    id: 6,
    title: "Coming soon",
    description:
      "An interactive online learning platform with video streaming, progress tracking, and certificate generation.",
    image: "/coming_soon.jpg",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS", "Vimeo API"],
    link: "https://example.com/lms",
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

// Enhanced SEO meta tags
useHead({
  title: "Projects | Igal Vilensky - Web Developer Portfolio",
  meta: [
    {
      name: "description",
      content:
        "Explore innovative web and software development projects by Igal Vilensky. From e-commerce platforms to collaborative tools, discover cutting-edge solutions built with modern technologies.",
    },
    {
      name: "keywords",
      content:
        "web development, portfolio, projects, Vue.js, React, Node.js, TypeScript, Nuxt",
    },
    {
      property: "og:title",
      content: "Projects | Igal Vilensky - Web Developer",
    },
    {
      property: "og:description",
      content:
        "Discover innovative web development projects showcasing modern technologies and creative solutions.",
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

/* Smooth entrance animation */
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
