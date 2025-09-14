<template>
  <section
    id="about"
    class="relative bg-slate-50 dark:bg-slate-800 transition-colors duration-300"
  >
    <!-- <LiquidInk v-if="isDesktop" class="opacity-5" /> -->

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
          class="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mb-6"
        ></div>
        <p
          class="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          {{ $t("about.subtitle") }}
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Main Content - 2/3 width -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Me (Personal + Professional) -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              {{ $t("about.personalTitle") }}
            </h3>
            <div
              class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              <p>{{ $t("about.personalDesc1") }}</p>
              <p>{{ $t("about.personalDesc2") }}</p>
              <p>{{ $t("about.personalDesc3") }}</p>
            </div>
          </div>

          <!-- My Skills -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              {{ $t("about.skillsTitle") }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Frontend & Mobile -->
              <div>
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3"
                  >
                    <i
                      class="fas fa-laptop-code text-blue-600 dark:text-blue-400"
                    ></i>
                  </div>
                  <h4
                    class="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    {{ $t("skills.frontendMobile") }}
                  </h4>
                </div>
                <ul
                  class="space-y-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <li
                    v-for="(skill, index) in frontendSkills"
                    :key="index"
                    class="flex items-start space-x-2"
                  >
                    <i
                      :class="getSkillIcon(skill.title)"
                      class="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400"
                    ></i>
                    <span>{{ skill.title }}</span>
                  </li>
                </ul>
              </div>
              <!-- Backend -->
              <div>
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3"
                  >
                    <i
                      class="fas fa-server text-green-600 dark:text-green-400"
                    ></i>
                  </div>
                  <h4
                    class="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    {{ $t("skills.backend") }}
                  </h4>
                </div>
                <ul
                  class="space-y-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <li
                    v-for="(skill, index) in backendSkills"
                    :key="index"
                    class="flex items-start space-x-2"
                  >
                    <i
                      :class="getSkillIcon(skill.title)"
                      class="w-4 h-4 mt-0.5 text-green-600 dark:text-green-400"
                    ></i>
                    <span>{{ skill.title }}</span>
                  </li>
                </ul>
              </div>
              <!-- DevOps & Tools -->
              <div>
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3"
                  >
                    <i
                      class="fas fa-tools text-purple-600 dark:text-purple-400"
                    ></i>
                  </div>
                  <h4
                    class="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    {{ $t("skills.devopsTools") }}
                  </h4>
                </div>
                <ul
                  class="space-y-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <li
                    v-for="(skill, index) in devopsSkills"
                    :key="index"
                    class="flex items-start space-x-2"
                  >
                    <i
                      :class="getSkillIcon(skill.title)"
                      class="w-4 h-4 mt-0.5 text-purple-600 dark:text-purple-400"
                    ></i>
                    <span>{{ skill.title }}</span>
                  </li>
                </ul>
              </div>
              <!-- Languages -->
              <div>
                <div class="flex items-center mb-3">
                  <div
                    class="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3"
                  >
                    <i
                      class="fas fa-language text-orange-600 dark:text-orange-400"
                    ></i>
                  </div>
                  <h4
                    class="text-base font-semibold text-slate-900 dark:text-white"
                  >
                    {{ $t("skills.languages") }}
                  </h4>
                </div>
                <ul
                  class="space-y-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <li
                    v-for="(language, index) in languageSkills"
                    :key="index"
                    class="flex items-start space-x-2"
                  >
                    <i
                      class="fas fa-globe w-4 h-4 mt-0.5 text-orange-600 dark:text-orange-400"
                    ></i>
                    <span>{{ $t(`skills.${language.titleKey}`) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Current Focus & Interests -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-xl font-semibold text-slate-900 dark:text-white mb-4"
            >
              {{ $t("about.exploringTitle") }}
            </h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4
                  class="text-base font-semibold text-slate-900 dark:text-white mb-3"
                >
                  {{ $t("about.currentlyLearning") }}
                </h4>
                <ul
                  class="space-y-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <li
                    v-for="item in currentlyLearning"
                    :key="item"
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
                    ></div>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4
                  class="text-base font-semibold text-slate-900 dark:text-white mb-3"
                >
                  {{ $t("about.areasOfInterest") }}
                </h4>
                <ul
                  class="space-y-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <li
                    v-for="interest in interests"
                    :key="interest"
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"
                    ></div>
                    <span>{{ interest }}</span>
                  </li>
                </ul>
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
              {{ $t("about.glanceTitle") }}
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

          <!-- Personal Tidbits -->
          <div
            class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm"
          >
            <h3
              class="text-lg font-semibold text-slate-900 dark:text-white mb-4"
            >
              {{ $t("about.funFactsTitle") }}
            </h3>
            <div class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div class="flex items-center space-x-3">
                <i class="fas fa-film w-4"></i>
                <span>{{ $t("about.funFactActing") }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-snowflake w-4"></i>
                <span>{{ $t("about.funFactYamalo") }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-users w-4"></i>
                <span>{{ $t("about.funFactBrothers") }}</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-music w-4"></i>
                <span>{{ $t("about.funFactPiano") }}</span>
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
              {{ $t("about.connectTitle") }}
            </h3>
            <div class="flex items-center space-x-3 mb-3">
              <div
                class="w-3 h-3 bg-green-500 rounded-full animate-pulse"
              ></div>
              <span
                class="text-sm font-medium text-slate-900 dark:text-white"
                >{{ $t("about.available") }}</span
              >
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 mb-4">
              {{ $t("about.availableDesc") }}
            </p>
            <NuxtLink
              to="#contact"
              @click.prevent="scrollToSection('contact')"
              class="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              {{ $t("contact.getInTouch") }}
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

// Initialize isDesktop safely
const isDesktop = ref(process.client ? window.innerWidth >= 1024 : false);

// Update isDesktop on window resize
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 1024;
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", handleResize);
  }
});

// Frontend skills
const frontendSkills = [
  { title: "TypeScript / JavaScript" },
  { title: "React / React Native" },
  { title: "Vue.js / Nuxt.js" },
  { title: "CSS Frameworks" },
  { title: "Responsive Design" },
];

// Backend skills
const backendSkills = [
  { title: "Node.js / Express.js" },
  { title: "MongoDB / Mongoose" },
  { title: "Directus CMS" },
  { title: "REST APIs" },
];

// DevOps skills
const devopsSkills = [
  { title: "CI/CD Pipelines" },
  { title: "Docker" },
  { title: "Git / GitHub" },
  { title: "Agile & Scrum" },
];

// Language skills
const languageSkills = [
  { titleKey: "english", levelKey: "englishLevel" },
  { titleKey: "german", levelKey: "germanLevel" },
  { titleKey: "russian", levelKey: "russianLevel" },
  { titleKey: "hebrew", levelKey: "hebrewLevel" },
];

// Currently learning
const currentlyLearning = [
  "AWS Cloud Architecture",
  "Kubernetes",
  "GraphQL",
  "Rust Programming",
];

// Areas of interest
const interests = [
  "Machine Learning",
  "Web3 Technologies",
  "Performance Optimization",
  "Developer Experience",
];

// Get skill icon based on skill name
const getSkillIcon = (skill: string): string => {
  const icons: Record<string, string> = {
    "TypeScript / JavaScript": "fab fa-js-square",
    "React / React Native": "fab fa-react",
    "Vue.js / Nuxt.js": "fab fa-vuejs",
    "CSS Frameworks": "fas fa-paint-brush",
    "Responsive Design": "fas fa-mobile-alt",
    "Node.js / Express.js": "fab fa-node-js",
    "MongoDB / Mongoose": "fas fa-database",
    "Directus CMS": "fas fa-cogs",
    "REST APIs": "fas fa-exchange-alt",
    "CI/CD Pipelines": "fas fa-tools",
    Docker: "fab fa-docker",
    "Git / GitHub": "fab fa-github",
    "Agile & Scrum": "fas fa-users",
  };
  return icons[skill] || "fas fa-code";
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
