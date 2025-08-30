<template>
  <section
    id="skills"
    class="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden"
    :class="colorMode.value === 'dark' ? 'bg-gray-800' : 'bg-gray-50'"
  >
    <!-- Background Effects -->
    <div
      class="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-teal-400/5 dark:bg-teal-400/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-purple-400/5 dark:bg-purple-400/10 rounded-full blur-3xl"
    ></div>

    <div class="max-w-7xl mx-auto relative">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4"
        >
          {{ $t("skills.title") }}
          <span class="text-purple-500">{{ $t("skills.my") }}</span>
        </h2>
        <div
          class="w-20 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
        ></div>
        <p
          class="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          {{ $t("skills.subtitle") }}
        </p>
      </div>

      <!-- Skills Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
      >
        <!-- Frontend & Mobile -->
        <div
          class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transform hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-teal-600/5 dark:from-teal-400/10 dark:to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative">
            <div class="flex flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
              >
                <i class="fas fa-laptop-code text-white text-lg sm:text-xl"></i>
              </div>
              <h3
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
              >
                {{ $t("skills.frontendMobile") }}
              </h3>
            </div>
            <ul class="space-y-3 sm:space-y-4">
              <li
                v-for="(skill, index) in frontendSkills"
                :key="index"
                class="flex items-start gap-3 group/item"
              >
                <div class="flex-shrink-0 mt-2">
                  <div
                    class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                  ></div>
                </div>
                <div class="min-w-0">
                  <span
                    class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                  >
                    {{ skill.title }}
                  </span>
                  <span
                    class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    {{ $t(`skills.${skill.descKey}`) }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Backend -->
        <div
          class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transform hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 dark:from-purple-400/10 dark:to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative">
            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
              >
                <i class="fas fa-server text-white text-lg sm:text-xl"></i>
              </div>
              <h3
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
              >
                {{ $t("skills.backend") }}
              </h3>
            </div>
            <ul class="space-y-3 sm:space-y-4">
              <li
                v-for="(skill, index) in backendSkills"
                :key="index"
                class="flex items-start gap-3 group/item"
              >
                <div class="flex-shrink-0 mt-2">
                  <div
                    class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                  ></div>
                </div>
                <div class="min-w-0">
                  <span
                    class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                  >
                    {{ skill.title }}
                  </span>
                  <span
                    class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    {{ $t(`skills.${skill.descKey}`) }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- DevOps & Tools -->
        <div
          class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transform hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-400/10 dark:to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative">
            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
              >
                <i class="fas fa-tools text-white text-lg sm:text-xl"></i>
              </div>
              <h3
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
              >
                {{ $t("skills.devopsTools") }}
              </h3>
            </div>
            <ul class="space-y-3 sm:space-y-4">
              <li
                v-for="(skill, index) in devopsSkills"
                :key="index"
                class="flex items-start gap-3 group/item"
              >
                <div class="flex-shrink-0 mt-2">
                  <div
                    class="w-2 h-2 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    :class="index % 2 === 0 ? 'bg-teal-500' : 'bg-purple-500'"
                  ></div>
                </div>
                <div class="min-w-0">
                  <span
                    class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                  >
                    {{ skill.title }}
                  </span>
                  <span
                    class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    {{ $t(`skills.${skill.descKey}`) }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Languages -->
        <div
          class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transform hover:-translate-y-2"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-teal-500/5 dark:from-purple-400/10 dark:to-teal-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
          <div class="relative">
            <div class="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
              >
                <i class="fas fa-language text-white text-lg sm:text-xl"></i>
              </div>
              <h3
                class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
              >
                {{ $t("skills.languages") }}
              </h3>
            </div>
            <ul class="space-y-3 sm:space-y-4">
              <li
                v-for="(language, index) in languageSkills"
                :key="index"
                class="flex items-start gap-3 group/item"
              >
                <div class="flex-shrink-0 mt-2">
                  <div
                    class="w-2 h-2 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    :class="index % 2 === 0 ? 'bg-purple-500' : 'bg-teal-500'"
                  ></div>
                </div>
                <div class="min-w-0">
                  <span
                    class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                  >
                    {{ $t(`skills.${language.titleKey}`) }}
                  </span>
                  <span
                    class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                  >
                    {{ $t(`skills.${language.levelKey}`) }}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";

// Initialize color mode
const colorMode = useColorMode();

// Frontend skills (titles are static, descriptions are translated)
const frontendSkills = [
  { title: "TypeScript / JavaScript", descKey: "typescriptDesc" },
  { title: "React / React Native", descKey: "reactDesc" },
  { title: "Vue.js / Nuxt.js", descKey: "vueDesc" },
  { title: "CSS Frameworks", descKey: "cssFrameworksDesc" },
  { title: "Responsive Design", descKey: "responsiveDesignDesc" },
];

// Backend skills (titles are static, descriptions are translated)
const backendSkills = [
  { title: "Node.js / Express.js", descKey: "nodejsDesc" },
  { title: "MongoDB / Mongoose", descKey: "mongodbDesc" },
  { title: "Directus CMS", descKey: "directusDesc" },
  { title: "REST APIs", descKey: "restApisDesc" },
];

// DevOps skills (titles are static, descriptions are translated)
const devopsSkills = [
  { title: "CI/CD Pipelines", descKey: "cicdDesc" },
  { title: "Docker", descKey: "dockerDesc" },
  { title: "Git / GitHub", descKey: "gitDesc" },
  { title: "Agile & Scrum", descKey: "agileDesc" },
];

// Language skills (both titles and levels are translated)
const languageSkills = [
  { titleKey: "english", levelKey: "englishLevel" },
  { titleKey: "german", levelKey: "germanLevel" },
  { titleKey: "russian", levelKey: "russianLevel" },
  { titleKey: "hebrew", levelKey: "hebrewLevel" },
];
</script>
