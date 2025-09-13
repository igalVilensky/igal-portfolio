<template>
  <section
    id="education"
    class="relative bg-slate-50 dark:bg-slate-800 transition-colors duration-300"
  >
    <Particles v-if="isDesktop" class="opacity-30" />
    <!-- <KnowledgeNodes class="opacity-30" /> -->

    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.slate.400)_1px,_transparent_0)] bg-[length:24px_24px]"
      ></div>
    </div>

    <div
      class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24"
    >
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          <span class="text-blue-600 dark:text-blue-400">{{
            $t("education.title")
          }}</span>
          {{ $t("education.and") }}
          <span class="text-blue-600 dark:text-blue-400">{{
            $t("education.second")
          }}</span>
        </h2>
        <div
          class="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mb-6"
        ></div>
        <p
          class="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          {{ $t("education.subtitle") }}
        </p>
      </div>

      <!-- Main Education Card -->
      <div
        class="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8 mb-8"
      >
        <!-- Institution Header -->
        <div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
          <!-- Institution Icon -->
          <div
            class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <svg
              class="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              ></path>
            </svg>
          </div>

          <!-- Institution Info -->
          <div class="flex-1 min-w-0">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {{ $t("education.certification") }}
            </h3>
            <p class="text-base text-slate-600 dark:text-slate-400 mb-3">
              {{ $t("education.certificationSub") }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 text-sm">
              <div class="flex items-center space-x-2">
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
                <span class="text-slate-700 dark:text-slate-300">
                  {{ $t("education.institution") }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span class="text-blue-600 dark:text-blue-400 font-medium">
                  {{ $t("education.period") }}
                </span>
              </div>
            </div>
          </div>

          <!-- Download Certificate Button -->
          <div class="flex-shrink-0">
            <a
              href="/certificate.pdf"
              target="_blank"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              {{ $t("education.downloadCertificate") }}
            </a>
          </div>
        </div>

        <!-- Program Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div class="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              14
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              {{ $t("education.months") }}
            </div>
          </div>
          <div class="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              1200+
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              {{ $t("education.hours") }}
            </div>
          </div>
          <div class="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              15+
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              {{ $t("education.technologiesCount") }}
            </div>
          </div>
          <div class="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              10+
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              {{ $t("education.projectsCount") }}
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Technical Curriculum -->
          <div>
            <div class="flex items-center space-x-3 mb-6">
              <div
                class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  ></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-slate-900 dark:text-white">
                {{ $t("education.technicalCurriculum") }}
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="(item, index) in technicalCurriculum"
                :key="index"
                class="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <div
                  class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <span
                    class="font-semibold text-slate-900 dark:text-white text-sm"
                  >
                    {{ item.title }}
                  </span>
                  <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {{ $t(`education.${item.descKey}`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Achievements -->
          <div>
            <div class="flex items-center space-x-3 mb-6">
              <div
                class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-4 h-4 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
              </div>
              <h4 class="text-xl font-semibold text-slate-900 dark:text-white">
                {{ $t("education.keyAchievements") }}
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="(achievement, index) in keyAchievements"
                :key="index"
                class="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              >
                <div
                  class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                ></div>
                <div class="flex-1 min-w-0">
                  <span
                    class="font-semibold text-slate-900 dark:text-white text-sm"
                  >
                    {{ $t(`education.${achievement.titleKey}`) }}
                  </span>
                  <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {{ $t(`education.${achievement.descKey}`) }}
                  </p>
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
const isDesktop = ref(window.innerWidth >= 1024);

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
</script>
