<template>
  <section id="education" class="py-20 px-4 relative overflow-hidden">
    <!-- Background Effects -->
    <div
      class="absolute top-0 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"
    ></div>

    <div class="max-w-7xl mx-auto relative">
      <div class="text-center mb-16">
        <h2
          class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 mt-8"
        >
          <span class="text-teal-500">{{ $t("education.title") }}</span>
          {{ $t("education.and") }}
          <span class="text-purple-500">{{ $t("education.second") }}</span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
        ></div>
        <p
          class="text-gray-600 dark:text-gray-300 text-lg mt-6 max-w-2xl mx-auto"
        >
          {{ $t("education.subtitle") }}
        </p>
      </div>

      <div class="grid md:grid-cols-1 gap-8">
        <div class="relative group">
          <div
            class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700"
          >
            <!-- Institution Header -->
            <div class="flex flex-col gap-6 mb-8">
              <div>
                <div
                  class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4"
                >
                  <div
                    class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                  >
                    <i
                      class="fas fa-graduation-cap text-white text-lg sm:text-2xl"
                    ></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3
                      class="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-2 break-words"
                    >
                      {{ $t("education.certification") }}
                    </h3>
                    <p
                      class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider"
                    >
                      {{ $t("education.certificationSub") }}
                    </p>
                  </div>
                </div>
                <div
                  class="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base lg:text-lg"
                >
                  <div class="flex items-center gap-2">
                    <i
                      class="fas fa-university text-teal-500 flex-shrink-0"
                    ></i>
                    <span
                      class="text-gray-700 dark:text-gray-300 font-medium min-w-0"
                    >
                      {{ $t("education.institution") }}
                    </span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i
                      class="fas fa-calendar-alt text-purple-500 flex-shrink-0"
                    ></i>
                    <span class="text-teal-600 dark:text-teal-400 font-bold">
                      {{ $t("education.period") }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex justify-center sm:justify-start">
                <!-- Enhanced Button with Hero Styling -->
                <div class="relative group">
                  <!-- Gradient border frame -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-teal-500 via-purple-400 to-purple-600 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
                  >
                    <div
                      class="bg-gradient-to-r from-teal-500 to-purple-600 rounded-full h-full w-full"
                    ></div>
                  </div>

                  <!-- Glowing background effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-600/20 rounded-full blur-lg opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  ></div>

                  <a
                    href="/DCI_Igal Vilensky.pdf"
                    target="_blank"
                    class="relative z-10 group/btn bg-gradient-to-r from-teal-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 text-sm sm:text-base lg:text-lg"
                  >
                    <i
                      class="fas fa-download group-hover/btn:animate-pulse group-hover/btn:text-purple-200 transition-colors duration-300"
                    ></i>
                    <span
                      class="group-hover/btn:tracking-wide transition-all duration-300"
                    >
                      {{ $t("education.downloadCertificate") }}
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Program Stats -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div
                class="text-center p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl"
              >
                <div
                  class="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400"
                >
                  14
                </div>
                <div
                  class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {{ $t("education.months") }}
                </div>
              </div>
              <div
                class="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl"
              >
                <div
                  class="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400"
                >
                  1200+
                </div>
                <div
                  class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {{ $t("education.hours") }}
                </div>
              </div>
              <div
                class="text-center p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-purple-50 dark:from-teal-900/10 dark:to-purple-900/10 rounded-xl"
              >
                <div
                  class="text-xl sm:text-2xl font-black text-gray-700 dark:text-gray-300"
                >
                  15+
                </div>
                <div
                  class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {{ $t("education.technologiesCount") }}
                </div>
              </div>
              <div
                class="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-teal-50 dark:from-purple-900/10 dark:to-teal-900/10 rounded-xl"
              >
                <div
                  class="text-xl sm:text-2xl font-black text-gray-700 dark:text-gray-300"
                >
                  10+
                </div>
                <div
                  class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {{ $t("education.projectsCount") }}
                </div>
              </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid lg:grid-cols-2 gap-6 sm:gap-8">
              <!-- Technical Curriculum -->
              <div class="space-y-4 sm:space-y-6">
                <div class="flex items-center gap-3 mb-4 sm:mb-6">
                  <div
                    class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <i class="fas fa-code text-white text-sm sm:text-base"></i>
                  </div>
                  <h4
                    class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {{ $t("education.technicalCurriculum") }}
                  </h4>
                </div>
                <div class="space-y-3 sm:space-y-4">
                  <div
                    v-for="(item, index) in technicalCurriculum"
                    :key="index"
                    class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
                    :class="
                      index % 2 === 0
                        ? 'bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/10 dark:to-teal-800/10 border border-teal-200/50 dark:border-teal-700/30'
                        : 'bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10 border border-purple-200/50 dark:border-purple-700/30'
                    "
                  >
                    <i
                      class="fas fa-check-circle mt-1 text-sm sm:text-lg flex-shrink-0"
                      :class="
                        index % 2 === 0 ? 'text-teal-500' : 'text-purple-500'
                      "
                    ></i>
                    <div class="min-w-0">
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                      >
                        {{ item.title }}
                      </span>
                      <p
                        class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                      >
                        {{ $t(`education.${item.descKey}`) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Key Achievements -->
              <div class="space-y-4 sm:space-y-6">
                <div class="flex items-center gap-3 mb-4 sm:mb-6">
                  <div
                    class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <i
                      class="fas fa-trophy text-white text-sm sm:text-base"
                    ></i>
                  </div>
                  <h4
                    class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {{ $t("education.keyAchievements") }}
                  </h4>
                </div>
                <div class="space-y-3 sm:space-y-4">
                  <div
                    v-for="(achievement, index) in keyAchievements"
                    :key="index"
                    class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
                    :class="achievementClasses[index]"
                  >
                    <i
                      class="fas mt-1 text-sm sm:text-lg flex-shrink-0"
                      :class="achievementIcons[index]"
                    ></i>
                    <div class="min-w-0">
                      <span
                        class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                      >
                        {{ $t(`education.${achievement.titleKey}`) }}
                      </span>
                      <p
                        class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                      >
                        {{ $t(`education.${achievement.descKey}`) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Technical curriculum (titles are static, descriptions are translated)
const technicalCurriculum = computed(() => [
  { title: "HTML5 & CSS3", descKey: "htmlCssDesc" },
  { title: "JavaScript ES2015+ & TypeScript", descKey: "jsTsDesc" },
  { title: "React, React Hooks & Redux", descKey: "reactSkillsDesc" },
  { title: "Node.js, Express.js & REST APIs", descKey: "nodeSkillsDesc" },
  { title: "MongoDB & Mongoose", descKey: "mongoSkillsDesc" },
  { title: "Git, GitHub & Agile Methodologies", descKey: "gitSkillsDesc" },
]);

// Key achievements (both titles and descriptions are translated)
const keyAchievements = computed(() => [
  { titleKey: "programExcellence", descKey: "programExcellenceDesc" },
  { titleKey: "capstoneProject", descKey: "capstoneProjectDesc" },
  { titleKey: "languageProficiency", descKey: "languageProficiencyDesc" },
  { titleKey: "responsiveDesignEdu", descKey: "responsiveDesignEduDesc" },
  { titleKey: "security", descKey: "securityDesc" },
  { titleKey: "databaseDevelopment", descKey: "databaseDevelopmentDesc" },
]);

// Achievement classes for styling
const achievementClasses = computed(() => [
  "bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/10 dark:to-amber-800/10 border border-amber-200/50 dark:border-amber-700/30",
  "bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/10 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/30",
  "bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/30",
  "bg-gradient-to-r from-rose-50 to-rose-100/50 dark:from-rose-900/10 dark:to-rose-800/10 border border-rose-200/50 dark:border-rose-700/30",
  "bg-gradient-to-r from-violet-50 to-violet-100/50 dark:from-violet-900/10 dark:to-violet-800/10 border border-violet-200/50 dark:border-violet-700/30",
  "bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-indigo-900/10 dark:to-indigo-800/10 border border-indigo-200/50 dark:border-indigo-700/30",
]);

// Achievement icons for styling
const achievementIcons = computed(() => [
  "fa-star text-amber-500",
  "fa-project-diagram text-emerald-500",
  "fa-language text-blue-500",
  "fa-mobile-alt text-rose-500",
  "fa-shield-alt text-violet-500",
  "fa-database text-indigo-500",
]);
</script>
