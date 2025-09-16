<template>
  <section
    id="education"
    class="relative transition-colors duration-300"
    :class="
      colorMode.value === 'dark'
        ? 'bg-[#0D0F12]'
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    "
  >
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_#809FFF_2px,_transparent_2px),_radial-gradient(circle_at_75px_75px,_#F41A81_2px,_transparent_2px)] bg-[length:100px_100px]"
      ></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Section Header -->
      <div class="text-center mb-8 animate-slide-up">
        <h2
          class="text-2xl md:text-3xl font-bold mb-4"
          :class="
            colorMode.value === 'dark'
              ? 'text-white'
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'
          "
        >
          {{ $t("education.title") }}
          <span
            :class="
              colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
            "
          >
            {{ $t("education.second") }}
          </span>
        </h2>
        <div
          class="w-24 h-1 mx-auto rounded-full mb-6"
          :class="colorMode.value === 'dark' ? 'bg-[#809FFF]' : 'bg-blue-600'"
        ></div>
        <p
          class="max-w-3xl mx-auto leading-relaxed"
          :class="
            colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
          "
        >
          {{ $t("education.subtitle") }}
        </p>
      </div>

      <!-- Main Education Card -->
      <div
        class="rounded-xl border p-6 transition-all duration-300 animate-slide-up-delayed"
        :class="
          colorMode.value === 'dark'
            ? 'bg-[#1B2432] border-[#809FFF]/20'
            : 'bg-white border-slate-200/50'
        "
      >
        <!-- Institution Header -->
        <div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
          <!-- Institution Icon -->
          <div
            class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="
              colorMode.value === 'dark' ? 'bg-[#809FFF]/20' : 'bg-blue-100'
            "
          >
            <i
              class="fas fa-graduation-cap text-lg"
              :class="
                colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
              "
            ></i>
          </div>

          <!-- Institution Info -->
          <div class="flex-1 min-w-0">
            <h3
              class="text-xl font-semibold mb-3"
              :class="
                colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
              "
            >
              {{ $t("education.certification") }}
            </h3>
            <p
              class="text-sm leading-relaxed"
              :class="
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
              "
            >
              {{ $t("education.certificationSub") }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 text-sm mt-4">
              <div class="flex items-center space-x-2">
                <i
                  class="fas fa-university w-4 h-4"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#809FFF]'
                      : 'text-blue-600'
                  "
                ></i>
                <span
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-slate-400'
                      : 'text-slate-600'
                  "
                >
                  {{ $t("education.institution") }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <i
                  class="fas fa-calendar-alt w-4 h-4"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#F41A81]'
                      : 'text-blue-600'
                  "
                ></i>
                <span
                  class="font-medium"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#F41A81]'
                      : 'text-blue-600'
                  "
                >
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
              class="group inline-flex items-center px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-[#809FFF]/20 text-[#809FFF] hover:bg-[#809FFF]/30'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              "
            >
              <i
                class="fas fa-download w-4 h-4 mr-2 group-hover:animate-bounce"
              ></i>
              {{ $t("education.downloadCertificate") }}
            </a>
          </div>
        </div>

        <!-- Program Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div
            class="group p-4 rounded-xl border transition-all duration-300 text-center"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20'
                : 'bg-white border-slate-200/50'
            "
          >
            <div
              class="text-2xl font-bold transition-all duration-300 group-hover:scale-110"
              :class="
                colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
              "
            >
              14
            </div>
            <div
              class="text-xs"
              :class="
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
              "
            >
              {{ $t("education.months") }}
            </div>
          </div>
          <div
            class="group p-4 rounded-xl border transition-all duration-300 text-center"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20'
                : 'bg-white border-slate-200/50'
            "
          >
            <div
              class="text-2xl font-bold transition-all duration-300 group-hover:scale-110"
              :class="
                colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
              "
            >
              1200+
            </div>
            <div
              class="text-xs"
              :class="
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
              "
            >
              {{ $t("education.hours") }}
            </div>
          </div>
          <div
            class="group p-4 rounded-xl border transition-all duration-300 text-center"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20'
                : 'bg-white border-slate-200/50'
            "
          >
            <div
              class="text-2xl font-bold transition-all duration-300 group-hover:scale-110"
              :class="
                colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
              "
            >
              15+
            </div>
            <div
              class="text-xs"
              :class="
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
              "
            >
              {{ $t("education.technologiesCount") }}
            </div>
          </div>
          <div
            class="group p-4 rounded-xl border transition-all duration-300 text-center"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20'
                : 'bg-white border-slate-200/50'
            "
          >
            <div
              class="text-2xl font-bold transition-all duration-300 group-hover:scale-110"
              :class="
                colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
              "
            >
              10+
            </div>
            <div
              class="text-xs"
              :class="
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
              "
            >
              {{ $t("education.projectsCount") }}
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Technical Curriculum -->
          <div class="animate-slide-up-delayed-2">
            <div class="flex items-center space-x-3 mb-4">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :class="
                  colorMode.value === 'dark' ? 'bg-[#809FFF]/20' : 'bg-blue-100'
                "
              >
                <i
                  class="fas fa-code text-lg"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#809FFF]'
                      : 'text-blue-600'
                  "
                ></i>
              </div>
              <h4
                class="text-lg font-semibold"
                :class="
                  colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                "
              >
                {{ $t("education.technicalCurriculum") }}
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="(item, index) in technicalCurriculum"
                :key="index"
                class="group rounded-lg border p-3 transition-all duration-300"
                :class="
                  colorMode.value === 'dark'
                    ? 'bg-[#1B2432] border-[#809FFF]/20'
                    : 'bg-white border-slate-200/50'
                "
              >
                <div class="flex items-start space-x-3">
                  <div
                    class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                    :class="
                      colorMode.value === 'dark'
                        ? 'text-[#809FFF]'
                        : 'text-blue-600'
                    "
                  ></div>
                  <div class="flex-1 min-w-0">
                    <h5
                      class="font-semibold text-sm transition-colors duration-300"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-white group-hover:text-[#809FFF]'
                          : 'text-slate-900 group-hover:text-blue-600'
                      "
                    >
                      {{ item.title }}
                    </h5>
                    <p
                      class="text-xs leading-relaxed"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
                    >
                      {{ $t(`education.${item.descKey}`) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Achievements -->
          <div class="animate-slide-up-delayed-3">
            <div class="flex items-center space-x-3 mb-4">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :class="
                  colorMode.value === 'dark' ? 'bg-[#F41A81]/20' : 'bg-blue-100'
                "
              >
                <i
                  class="fas fa-trophy text-lg"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#F41A81]'
                      : 'text-blue-600'
                  "
                ></i>
              </div>
              <h4
                class="text-lg font-semibold"
                :class="
                  colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                "
              >
                {{ $t("education.keyAchievements") }}
              </h4>
            </div>
            <div class="space-y-3">
              <div
                v-for="(achievement, index) in keyAchievements"
                :key="index"
                class="group rounded-lg border p-3 transition-all duration-300"
                :class="
                  colorMode.value === 'dark'
                    ? 'bg-[#1B2432] border-[#809FFF]/20'
                    : 'bg-white border-slate-200/50'
                "
              >
                <div class="flex items-start space-x-3">
                  <div
                    class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-[#F41A81]'
                        : 'bg-blue-600'
                    "
                  ></div>
                  <div class="flex-1 min-w-0">
                    <h5
                      class="font-semibold text-sm transition-colors duration-300"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-white group-hover:text-[#F41A81]'
                          : 'text-slate-900 group-hover:text-blue-600'
                      "
                    >
                      {{ $t(`education.${achievement.titleKey}`) }}
                    </h5>
                    <p
                      class="text-xs leading-relaxed"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
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
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useColorMode } from "#imports";

// Color mode
const colorMode = useColorMode();

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

<style scoped>
/* Custom Animations */
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

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-up-delayed {
  animation: slide-up 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-2 {
  animation: slide-up 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-3 {
  animation: slide-up 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

/* Smooth transitions for all interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced focus styles for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #809fff;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Dark mode transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1b2432;
}

::-webkit-scrollbar-thumb {
  background: #809fff;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #f41a81;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .lg\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>
