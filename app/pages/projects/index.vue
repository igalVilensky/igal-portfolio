<template>
  <div
    class="min-h-screen font-['Poppins']"
    :class="
      colorMode.value === 'dark'
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900'
    "
  >
    <!-- Enhanced Projects Header -->
    <header class="relative pt-20 pb-8 sm:pb-12 sm:pt-32 px-4 overflow-hidden">
      <!-- Animated Background Elements -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      >
        <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
          <div
            class="absolute inset-0 bg-[linear-gradient(90deg,_theme(colors.slate.400)_1px,_transparent_1px),_linear-gradient(180deg,_theme(colors.slate.400)_1px,_transparent_1px)] bg-[length:60px_60px]"
          ></div>
        </div>
        <div
          class="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl animate-float"
        ></div>
        <div
          class="absolute top-40 right-20 w-32 h-32 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float-delayed"
        ></div>
        <div
          class="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-xl animate-float-slow"
        ></div>
      </div>

      <div class="relative max-w-7xl mx-auto">
        <!-- Title Section -->
        <div class="text-center mb-8 sm:mb-12">
          <h1
            class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight animate-slide-up"
          >
            {{ $t("projects.title") }}
            <span
              class="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent animate-slide-up-delayed"
            >
              {{ $t("projects.my") }}
            </span>
          </h1>
          <div
            class="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full mb-6"
          ></div>
          <p
            class="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            {{ $t("projects.subtitle") }}
            <em class="text-blue-600 dark:text-blue-400 font-semibold">{{
              $t("projects.subtitleHighlight")
            }}</em>
          </p>
        </div>

        <!-- Stats and Filters Combined -->
        <div
          class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 sm:p-8 shadow-xl"
        >
          <!-- Stats Row -->
          <div class="flex justify-center gap-8 sm:gap-16 mb-8">
            <div class="text-center">
              <div
                class="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1"
              >
                {{ filteredProjects.length }}
              </div>
              <div
                class="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400"
              >
                {{ $t("projects.my") }}
              </div>
            </div>
            <div class="text-center">
              <div
                class="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1"
              >
                {{ technologies.length }}
              </div>
              <div
                class="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-400"
              >
                {{ $t("education.technologiesCount") }}
              </div>
            </div>
          </div>

          <!-- Filter Buttons -->
          <div class="text-center">
            <h3
              class="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-6"
            >
              {{ $t("projects.filterByTech") }}
            </h3>
            <div class="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
              <button
                @click="selectedTech = ''"
                class="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                :class="
                  selectedTech === ''
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-700'
                "
              >
                {{ $t("projects.allProjects") }}
              </button>
              <button
                v-for="tech in technologies"
                :key="tech"
                @click="selectedTech = tech"
                class="px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                :class="
                  selectedTech === tech
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-blue-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-slate-200 dark:border-slate-700'
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
    <section class="py-8 sm:py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Results Info -->
        <div class="text-center mb-8">
          <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {{
              $t("projects.showingProjects", {
                filteredCount: filteredProjects.length,
                totalCount: projects.length,
              })
            }}
            <span
              v-if="selectedTech"
              class="font-semibold text-blue-600 dark:text-blue-400"
            >
              {{ $t("projects.forTech", { selectedTech }) }}
            </span>
          </p>
        </div>

        <!-- Projects Grid -->
        <div
          id="projects-grid"
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden animate-slide-up transform hover:-translate-y-2"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div
              class="relative h-48 sm:h-56 bg-slate-100 dark:bg-slate-800 overflow-hidden"
            >
              <img
                :src="project.image"
                :alt="$t(`projects.${project.titleKey}.title`)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="absolute top-4 right-4 flex items-center space-x-2">
                <div
                  class="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-lg"
                ></div>
                <span
                  class="text-xs font-semibold text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm"
                >
                  {{ $t("projects.live") }}
                </span>
              </div>
            </div>
            <div class="p-6 sm:p-7">
              <h3
                class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
              >
                {{ $t(`projects.${project.titleKey}.title`) }}
              </h3>
              <p
                class="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-3"
              >
                {{ $t(`projects.${project.titleKey}.description`) }}
              </p>
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-600 shadow-sm"
                >
                  {{ tech }}
                </span>
              </div>
              <div
                class="flex gap-3 pt-6 border-t border-slate-200 dark:border-slate-700"
              >
                <a
                  :href="project.link"
                  target="_blank"
                  class="flex-1 group/btn inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg
                    class="w-4 h-4 mr-2 group-hover/btn:animate-bounce"
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
                  {{ $t("projects.viewLive") }}
                </a>
                <a
                  :href="project.github || 'https://github.com/igalVilensky'"
                  target="_blank"
                  class="flex-1 group/btn inline-flex items-center text-sm justify-center px-4 py-3 bg-white/10 dark:bg-slate-800/50 backdrop-blur-lg text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl hover:bg-white/20 dark:hover:bg-slate-700/50 transition-all duration-300"
                >
                  <i
                    class="fab fa-github mr-2 group-hover/btn:animate-bounce text-base"
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
          class="text-center py-16 sm:py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <div class="mb-6">
            <i
              class="fas fa-search text-5xl sm:text-6xl text-blue-600 dark:text-blue-400"
            ></i>
          </div>
          <h3
            class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4"
          >
            {{ $t("projects.noProjectsFound") }}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 mb-8 text-lg">
            {{ $t("projects.noProjectsMatch") }}
          </p>
          <button
            @click="selectedTech = ''"
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300"
          >
            <svg
              class="w-5 h-5 mr-3"
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
            {{ $t("projects.viewAllProjects") }}
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 sm:py-16"
    >
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          {{ $t("contact.title") }}
          <span
            class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
          >
            {{ $t("contact.lets") }}
          </span>
        </h2>
        <div
          class="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-8"
        ></div>
        <div
          class="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mb-8"
        >
          <a
            href="mailto:vilenskyigal@gmail.com"
            class="group flex items-center gap-3 text-base sm:text-lg hover:text-blue-400 transition-colors duration-300"
          >
            <i
              class="fas fa-envelope text-xl sm:text-2xl group-hover:animate-bounce"
            ></i>
            vilenskyigal@gmail.com
          </a>
          <a
            href="tel:+491783099433"
            class="group flex items-center gap-3 text-base sm:text-lg hover:text-blue-400 transition-colors duration-300"
          >
            <i
              class="fas fa-phone text-xl sm:text-2xl group-hover:animate-pulse"
            ></i>
            {{ $t("contact.phone") }}
          </a>
        </div>
        <div class="flex justify-center space-x-6 mb-8">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-white hover:border-transparent shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-3"
            :class="getSocialHoverColor(social.name)"
            :aria-label="social.name"
          >
            <i :class="social.icon" class="text-xl"></i>
          </a>
        </div>
        <div class="border-t border-slate-700 pt-6">
          <p class="text-slate-400 text-sm sm:text-base">
            {{ $t("contact.copyright") }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useHead } from "#imports";
import { ref, computed } from "vue";
import Navbar from "../../components/Navbar.vue";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface Project {
  id: number | string;
  titleKey: string;
  image: string;
  technologies: string[];
  link: string;
  github?: string;
}

// Social links
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalvilensky",
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://linkedin.com/in/igalvilensky",
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    url: "mailto:vilenskyigal@gmail.com",
  },
];

// Colors for social links
const colors: Record<"LinkedIn" | "GitHub" | "Email", string> = {
  LinkedIn: "hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25",
  GitHub: "hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25",
  Email: "hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/25",
};

const getSocialHoverColor = (socialName: keyof typeof colors): string => {
  return colors[socialName] || "hover:bg-slate-600";
};

const colorMode = useColorMode();
const selectedTech = ref<string>("");

// Project data
const projects: Project[] = [
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
    link: "/projects/security",
    github: "https://github.com/igalVilensky/igal-portfolio",
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
    { name: "description", content: $t("projects.seo.description") },
    { name: "keywords", content: $t("projects.seo.keywords") },
    { property: "og:title", content: $t("projects.seo.ogTitle") },
    { property: "og:description", content: $t("projects.seo.ogDescription") },
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

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(2deg);
  }
  66% {
    transform: translateY(5px) rotate(-1deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(-2deg);
  }
  66% {
    transform: translateY(8px) rotate(1deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(3deg);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}
.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}
.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}
.animate-slide-up-delayed {
  animation: slide-up 0.8s ease-out 0.2s forwards;
}

/* Line clamp for description */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
