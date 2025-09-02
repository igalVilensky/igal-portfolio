<template>
  <section
    id="skills"
    class="relative bg-white dark:bg-slate-900 transition-colors duration-300"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          {{ $t("skills.title") }}
          <span class="text-blue-600 dark:text-blue-400">{{
            $t("skills.my")
          }}</span>
        </h2>
        <div
          class="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mb-6"
        ></div>
        <p
          class="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          {{ $t("skills.subtitle") }}
        </p>
      </div>

      <!-- Skills Categories -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <!-- Frontend & Mobile -->
        <div
          class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3"
            >
              <i
                class="fas fa-laptop-code text-blue-600 dark:text-blue-400"
              ></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ $t("skills.frontendMobile") }}
            </h3>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(skill, index) in frontendSkills"
              :key="index"
              class="flex items-start space-x-3"
            >
              <div
                class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
              ></div>
              <div>
                <div class="text-sm font-medium text-slate-900 dark:text-white">
                  {{ skill.title }}
                </div>
                <div class="text-xs text-slate-600 dark:text-slate-400">
                  {{ $t(`skills.${skill.descKey}`) }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Backend -->
        <div
          class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3"
            >
              <i class="fas fa-server text-green-600 dark:text-green-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ $t("skills.backend") }}
            </h3>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(skill, index) in backendSkills"
              :key="index"
              class="flex items-start space-x-3"
            >
              <div
                class="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"
              ></div>
              <div>
                <div class="text-sm font-medium text-slate-900 dark:text-white">
                  {{ skill.title }}
                </div>
                <div class="text-xs text-slate-600 dark:text-slate-400">
                  {{ $t(`skills.${skill.descKey}`) }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- DevOps & Tools -->
        <div
          class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3"
            >
              <i class="fas fa-tools text-purple-600 dark:text-purple-400"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ $t("skills.devopsTools") }}
            </h3>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(skill, index) in devopsSkills"
              :key="index"
              class="flex items-start space-x-3"
            >
              <div
                class="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"
              ></div>
              <div>
                <div class="text-sm font-medium text-slate-900 dark:text-white">
                  {{ skill.title }}
                </div>
                <div class="text-xs text-slate-600 dark:text-slate-400">
                  {{ $t(`skills.${skill.descKey}`) }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- Languages -->
        <div
          class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3"
            >
              <i
                class="fas fa-language text-orange-600 dark:text-orange-400"
              ></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ $t("skills.languages") }}
            </h3>
          </div>
          <ul class="space-y-2">
            <li
              v-for="(language, index) in languageSkills"
              :key="index"
              class="flex items-start space-x-3"
            >
              <div
                class="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"
              ></div>
              <div>
                <div class="text-sm font-medium text-slate-900 dark:text-white">
                  {{ $t(`skills.${language.titleKey}`) }}
                </div>
                <div class="text-xs text-slate-600 dark:text-slate-400">
                  {{ $t(`skills.${language.levelKey}`) }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Technical Proficiency Bars -->
      <div
        class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <h3
          class="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center"
        >
          Technical Proficiency
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(skill, index) in technicalProficiency"
            :key="skill.name"
            class="space-y-2"
          >
            <div class="flex justify-between items-center">
              <span
                class="text-sm font-medium text-slate-900 dark:text-white"
                >{{ skill.name }}</span
              >
              <span class="text-xs text-slate-600 dark:text-slate-400"
                >{{ skill.level }}%</span
              >
            </div>
            <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-1000 ease-out"
                :class="skill.color"
                :style="{ width: `${skill.level}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications & Learning -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Currently Learning -->
        <div
          class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3"
            >
              <i class="fas fa-graduation-cap text-white text-sm"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              Currently Learning
            </h3>
          </div>
          <ul class="space-y-2">
            <li
              v-for="item in currentlyLearning"
              :key="item"
              class="flex items-center space-x-3"
            >
              <div
                class="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"
              ></div>
              <span class="text-sm text-slate-700 dark:text-slate-300">{{
                item
              }}</span>
            </li>
          </ul>
        </div>

        <!-- Interests -->
        <div
          class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3"
            >
              <i class="fas fa-lightbulb text-white text-sm"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              Areas of Interest
            </h3>
          </div>
          <ul class="space-y-2">
            <li
              v-for="interest in interests"
              :key="interest"
              class="flex items-center space-x-3"
            >
              <div
                class="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"
              ></div>
              <span class="text-sm text-slate-700 dark:text-slate-300">{{
                interest
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Frontend skills
const frontendSkills = [
  { title: "TypeScript / JavaScript", descKey: "typescriptDesc" },
  { title: "React / React Native", descKey: "reactDesc" },
  { title: "Vue.js / Nuxt.js", descKey: "vueDesc" },
  { title: "CSS Frameworks", descKey: "cssFrameworksDesc" },
  { title: "Responsive Design", descKey: "responsiveDesignDesc" },
];

// Backend skills
const backendSkills = [
  { title: "Node.js / Express.js", descKey: "nodejsDesc" },
  { title: "MongoDB / Mongoose", descKey: "mongodbDesc" },
  { title: "Directus CMS", descKey: "directusDesc" },
  { title: "REST APIs", descKey: "restApisDesc" },
];

// DevOps skills
const devopsSkills = [
  { title: "CI/CD Pipelines", descKey: "cicdDesc" },
  { title: "Docker", descKey: "dockerDesc" },
  { title: "Git / GitHub", descKey: "gitDesc" },
  { title: "Agile & Scrum", descKey: "agileDesc" },
];

// Language skills
const languageSkills = [
  { titleKey: "english", levelKey: "englishLevel" },
  { titleKey: "german", levelKey: "germanLevel" },
  { titleKey: "russian", levelKey: "russianLevel" },
  { titleKey: "hebrew", levelKey: "hebrewLevel" },
];

// Technical proficiency with visual representation
const technicalProficiency = [
  {
    name: "JavaScript/TypeScript",
    level: 90,
    color: "bg-blue-600 dark:bg-blue-400",
  },
  {
    name: "Vue.js/Nuxt.js",
    level: 85,
    color: "bg-green-600 dark:bg-green-400",
  },
  {
    name: "React/Next.js",
    level: 80,
    color: "bg-purple-600 dark:bg-purple-400",
  },
  { name: "Node.js", level: 85, color: "bg-orange-600 dark:bg-orange-400" },
  { name: "Database Design", level: 75, color: "bg-red-600 dark:bg-red-400" },
  {
    name: "DevOps/Docker",
    level: 70,
    color: "bg-indigo-600 dark:bg-indigo-400",
  },
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
</script>
