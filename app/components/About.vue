<template>
  <section
    id="about"
    class="relative bg-slate-50 dark:bg-slate-800 transition-colors duration-300"
  >
    <LiquidInk v-if="isDesktop" class="opacity-5" />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          {{ $t("about.title") }}
          <span class="text-blue-600 dark:text-blue-400">{{
            $t("about.me")
          }}</span>
        </h2>
        <div
          class="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"
        ></div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Main Content - 2/3 width -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Professional Summary -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              Professional Summary
            </h3>
            <div
              class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <p>{{ $t("about.description1") }}</p>
              <p>{{ $t("about.description2") }}</p>
            </div>
          </div>

          <!-- Core Technologies -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              {{ $t("about.coreTechnologies") }}
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div
                v-for="(tech, index) in technologies"
                :key="tech"
                class="flex items-center px-3 py-2 rounded-md border transition-colors duration-200"
                :class="getTechStyle(index)"
              >
                <i
                  :class="getTechIcon(tech)"
                  class="w-4 h-4 mr-2 flex-shrink-0"
                ></i>
                <span class="text-sm font-medium">{{ tech }}</span>
              </div>
            </div>
          </div>

          <!-- Current Focus -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              Current Focus Areas
            </h3>
            <div class="grid md:grid-cols-2 gap-4">
              <div
                v-for="focus in focusAreas"
                :key="focus.title"
                class="flex items-start space-x-3"
              >
                <div
                  class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <i
                    :class="focus.icon"
                    class="text-blue-600 dark:text-blue-400 text-sm"
                  ></i>
                </div>
                <div>
                  <h4
                    class="font-semibold text-slate-900 dark:text-white text-sm"
                  >
                    {{ focus.title }}
                  </h4>
                  <p
                    class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                  >
                    {{ focus.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - 1/3 width -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-white mb-4"
            >
              Quick Stats
            </h3>
            <div class="space-y-4">
              <div
                class="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <div
                  class="text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                  3+
                </div>
                <div
                  class="text-sm text-slate-600 dark:text-slate-400 font-medium"
                >
                  {{ $t("about.yearsExperience") }}
                </div>
              </div>
              <div
                class="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <div
                  class="text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                  50+
                </div>
                <div
                  class="text-sm text-slate-600 dark:text-slate-400 font-medium"
                >
                  {{ $t("about.projectsCompleted") }}
                </div>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-white mb-4"
            >
              Availability
            </h3>
            <div class="flex items-center space-x-3 mb-3">
              <div
                class="w-3 h-3 bg-green-500 rounded-full animate-pulse"
              ></div>
              <span class="text-sm font-medium text-slate-900 dark:text-white"
                >Available for projects</span
              >
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Open to freelance work and interesting full-time opportunities
            </p>
            <NuxtLink
              to="#contact"
              @click.prevent="scrollToSection('contact')"
              class="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Get in touch
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </NuxtLink>
          </div>

          <!-- Location & Work Style -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-white mb-4"
            >
              Work Preferences
            </h3>
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <i class="fas fa-map-marker-alt text-slate-400 w-4"></i>
                <span class="text-sm text-slate-600 dark:text-slate-400"
                  >Leipzig, Germany</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-laptop text-slate-400 w-4"></i>
                <span class="text-sm text-slate-600 dark:text-slate-400"
                  >Remote-first</span
                >
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-users text-slate-400 w-4"></i>
                <span class="text-sm text-slate-600 dark:text-slate-400"
                  >Team collaboration</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const isDesktop = ref(window.innerWidth >= 1024);

// Technologies list with enhanced organization
const technologies = [
  "JavaScript",
  "TypeScript",
  "Vue.js",
  "React",
  "Node.js",
  "Nuxt.js",
];

// Current focus areas for professional development
const focusAreas = [
  {
    title: "Cloud Architecture",
    description: "AWS, Docker, Kubernetes for scalable deployments",
    icon: "fas fa-cloud",
  },
  {
    title: "Performance Optimization",
    description: "Core Web Vitals, bundle optimization, caching strategies",
    icon: "fas fa-tachometer-alt",
  },
  {
    title: "Developer Experience",
    description: "Tooling, CI/CD, and workflow improvements",
    icon: "fas fa-tools",
  },
  {
    title: "Security Best Practices",
    description: "Authentication, authorization, and secure coding",
    icon: "fas fa-shield-alt",
  },
];

// Get technology icon based on tech name
const getTechIcon = (tech: string): string => {
  const icons: Record<string, string> = {
    JavaScript: "fab fa-js-square",
    TypeScript: "fas fa-code",
    "Vue.js": "fab fa-vuejs",
    React: "fab fa-react",
    "Node.js": "fab fa-node-js",
    "Nuxt.js": "fas fa-layer-group",
  };
  return icons[tech] || "fas fa-code";
};

// Get consistent styling for tech items
const getTechStyle = (index: number): string => {
  const baseClasses =
    "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-200 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20";
  return baseClasses;
};

// Scroll to section function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 64;
    const elementPosition = element.offsetTop - navbarHeight - 20;
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  }
};
</script>
