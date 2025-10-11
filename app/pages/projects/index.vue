<template>
  <div class="min-h-screen font-['Poppins'] bg-[#0D0F12] text-white">
    <Orb stage="contact" />

    <!-- Compact Header -->
    <header class="relative pt-24 pb-8 px-4 overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-10 left-10 w-24 h-24 bg-[#809FFF] bg-opacity-5 rounded-full blur-xl animate-float"
        ></div>
        <div
          class="absolute top-20 right-20 w-32 h-32 bg-[#F41A81] bg-opacity-5 rounded-full blur-xl animate-float-delayed"
        ></div>
        <div
          class="absolute bottom-10 left-1/4 w-20 h-20 bg-[#FDDC00] bg-opacity-5 rounded-full blur-xl animate-float-slow"
        ></div>

        <!-- Subtle pattern overlay -->
        <div class="absolute inset-0 opacity-[0.02]">
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_#809FFF_2px,_transparent_2px),_radial-gradient(circle_at_75px_75px,_#F41A81_2px,_transparent_2px)] bg-[length:100px_100px]"
          ></div>
        </div>
      </div>

      <div class="relative max-w-6xl mx-auto text-center">
        <h2
          class="text-2xl md:text-3xl font-bold mb-4"
          :class="
            colorMode.value === 'dark'
              ? 'text-white'
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'
          "
        >
          {{ $t("projects.title") }}
          <span class="text-[#809FFF]">{{ $t("projects.my") }}</span>
        </h2>
        <div
          class="w-24 h-1 mx-auto rounded-full mb-6"
          :class="colorMode.value === 'dark' ? 'bg-[#809FFF]' : 'bg-blue-600'"
        ></div>

        <!-- Responsive Filter -->
        <div
          class="bg-[#1B2432] bg-opacity-60 backdrop-blur-lg rounded-2xl p-3 border border-[#809FFF] border-opacity-10"
        >
          <div class="flex flex-wrap gap-2 justify-center">
            <button
              @click="selectedTech = ''"
              class="px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              :class="
                selectedTech === ''
                  ? 'bg-[#809FFF] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-[#809FFF] hover:bg-opacity-20'
              "
            >
              All
            </button>
            <button
              v-for="tech in technologies"
              :key="tech"
              @click="selectedTech = tech"
              class="px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              :class="
                selectedTech === tech
                  ? 'bg-[#809FFF] text-white'
                  : 'text-slate-300 hover:text-white hover:bg-[#809FFF] hover:bg-opacity-20'
              "
            >
              {{ tech }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Projects Grid -->
    <section class="py-6 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            class="group bg-[#1B2432] bg-opacity-40 backdrop-blur-lg rounded-2xl border border-[#809FFF] border-opacity-10 overflow-hidden animate-slide-up flex flex-col h-full transition-all duration-300 ease-in-out hover:border-opacity-30"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Project Image - Fixed height -->
            <div
              class="relative h-48 bg-[#0D0F12] overflow-hidden flex-shrink-0"
            >
              <img
                :src="project.image"
                :alt="$t(`projects.${project.titleKey}.title`)"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-transparent to-transparent"
              ></div>

              <!-- Live indicator -->
              <div class="absolute top-4 right-4 flex items-center space-x-2">
                <div
                  class="w-2 h-2 bg-[#FDDC00] rounded-full animate-pulse"
                ></div>
                <span
                  class="text-xs font-medium text-white bg-black bg-opacity-60 px-2 py-1 rounded-lg backdrop-blur-sm"
                >
                  Live
                </span>
              </div>
            </div>

            <!-- Project Content - Flexible middle -->
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-xl font-bold text-white mb-3">
                {{ $t(`projects.${project.titleKey}.title`) }}
              </h3>

              <p class="text-slate-300 text-sm mb-4 leading-relaxed flex-grow">
                {{ $t(`projects.${project.titleKey}.description`) }}
              </p>

              <!-- Technologies - Show all -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-[#809FFF] bg-opacity-10 text-[#809FFF] rounded-lg text-xs font-medium border border-[#809FFF] border-opacity-20"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Buttons - Stick to bottom -->
              <div class="flex gap-3 mt-auto">
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
                  View Live
                </a>
                <a
                  :href="project.github || 'https://github.com/igalVilensky'"
                  target="_blank"
                  class="flex-1 group/btn inline-flex items-center text-sm justify-center px-4 py-3 bg-white/10 dark:bg-slate-800/50 backdrop-blur-lg text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl hover:bg-white/20 dark:hover:bg-slate-700/50 transition-all duration-300"
                >
                  <i class="fab fa-github text-base"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredProjects.length === 0"
          class="text-center py-16 bg-[#1B2432] bg-opacity-40 backdrop-blur-lg rounded-2xl border border-[#809FFF] border-opacity-10"
        >
          <i class="fas fa-search text-4xl text-[#809FFF] mb-4"></i>
          <h3 class="text-xl font-bold text-white mb-2">No projects found</h3>
          <p class="text-slate-400 mb-6">
            Try selecting a different technology filter
          </p>
          <button
            @click="selectedTech = ''"
            class="inline-flex items-center px-6 py-3 bg-[#809FFF] text-white font-medium rounded-xl transition-all duration-300"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            View All Projects
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useHead } from "#imports";
import { ref, computed } from "vue";

interface Project {
  id: number | string;
  titleKey: string;
  image: string;
  technologies: string[];
  link: string;
  github?: string;
}

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
  title: "Projects - Igal Vilensky",
  meta: [
    {
      name: "description",
      content: "Explore my portfolio of web development projects",
    },
    {
      name: "keywords",
      content: "web development, projects, portfolio, nuxt, vue",
    },
  ],
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
  ],
});
</script>

<style scoped>
/* Custom Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-8px) rotate(1deg);
  }
  66% {
    transform: translateY(4px) rotate(-1deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-12px) rotate(-1deg);
  }
  66% {
    transform: translateY(6px) rotate(1deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(2deg);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation Classes */
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
  animation: slide-up 0.6s ease-out forwards;
  opacity: 0;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
