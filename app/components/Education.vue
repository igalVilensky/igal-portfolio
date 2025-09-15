<template>
  <section
    id="education"
    class="min-h-screen bg-[#0D0F12] text-white relative overflow-hidden"
  >
    <Particles v-if="isDesktop" class="opacity-30" />
    <!-- Compact Header -->
    <header class="relative pt-12 px-4 overflow-hidden">
      <div class="relative max-w-6xl mx-auto text-center">
        <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
          <span class="text-[#809FFF]">{{ $t("education.title") }}</span>
          {{ $t("education.and") }}
          <span class="text-[#F41A81]">{{ $t("education.second") }}</span>
        </h1>
        <div class="w-12 h-0.5 bg-[#809FFF] mx-auto mb-6"></div>
        <p class="text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {{ $t("education.subtitle") }}
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <section class="py-6 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Main Education Card -->
        <div
          class="bg-[#1B2432] bg-opacity-40 backdrop-blur-lg rounded-2xl border border-[#809FFF] border-opacity-10 overflow-hidden transition-all duration-300 ease-in-out hover:border-opacity-30 mb-6"
        >
          <!-- Institution Header -->
          <div class="p-6">
            <div class="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
              <!-- Institution Icon -->
              <div
                class="w-16 h-16 bg-gradient-to-br from-[#809FFF] to-[#F41A81] rounded-lg flex items-center justify-center flex-shrink-0"
              >
                <svg
                  class="w-8 h-8 text-white"
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
                <h3 class="text-xl font-bold text-white mb-3">
                  {{ $t("education.certification") }}
                </h3>
                <p class="text-slate-300 text-sm mb-4 leading-relaxed">
                  {{ $t("education.certificationSub") }}
                </p>
                <div class="flex flex-col sm:flex-row gap-4 text-sm">
                  <div class="flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-[#809FFF]"
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
                    <span class="text-slate-300">
                      {{ $t("education.institution") }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <svg
                      class="w-4 h-4 text-[#F41A81]"
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
                    <span class="text-[#F41A81] font-medium">
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
                  class="group inline-flex items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg
                    class="w-4 h-4 mr-2 group-hover:animate-bounce"
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
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div
                class="group bg-[#0D0F12] bg-opacity-50 p-4 rounded-xl border border-[#809FFF] border-opacity-10 hover:border-opacity-30 transition-all duration-300 text-center"
              >
                <div
                  class="text-2xl font-bold text-[#809FFF] mb-1 group-hover:scale-110 transition-transform duration-300"
                >
                  14
                </div>
                <div class="text-xs text-slate-400">
                  {{ $t("education.months") }}
                </div>
              </div>
              <div
                class="group bg-[#0D0F12] bg-opacity-50 p-4 rounded-xl border border-[#F41A81] border-opacity-10 hover:border-opacity-30 transition-all duration-300 text-center"
              >
                <div
                  class="text-2xl font-bold text-[#F41A81] mb-1 group-hover:scale-110 transition-transform duration-300"
                >
                  1200+
                </div>
                <div class="text-xs text-slate-400">
                  {{ $t("education.hours") }}
                </div>
              </div>
              <div
                class="group bg-[#0D0F12] bg-opacity-50 p-4 rounded-xl border border-[#FDDC00] border-opacity-10 hover:border-opacity-30 transition-all duration-300 text-center"
              >
                <div
                  class="text-2xl font-bold text-[#FDDC00] mb-1 group-hover:scale-110 transition-transform duration-300"
                >
                  15+
                </div>
                <div class="text-xs text-slate-400">
                  {{ $t("education.technologiesCount") }}
                </div>
              </div>
              <div
                class="group bg-[#0D0F12] bg-opacity-50 p-4 rounded-xl border border-[#809FFF] border-opacity-10 hover:border-opacity-30 transition-all duration-300 text-center"
              >
                <div
                  class="text-2xl font-bold text-[#809FFF] mb-1 group-hover:scale-110 transition-transform duration-300"
                >
                  10+
                </div>
                <div class="text-xs text-slate-400">
                  {{ $t("education.projectsCount") }}
                </div>
              </div>
            </div>

            <!-- Main Content Grid -->
            <div class="grid lg:grid-cols-2 gap-6">
              <!-- Technical Curriculum -->
              <div class="animate-slide-up">
                <div class="flex items-center space-x-3 mb-4">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-[#809FFF] to-[#F41A81] rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
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
                  <h4 class="text-lg font-semibold text-white">
                    {{ $t("education.technicalCurriculum") }}
                  </h4>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="(item, index) in technicalCurriculum"
                    :key="index"
                    class="group bg-[#0D0F12] bg-opacity-30 backdrop-blur-sm p-3 rounded-lg border border-[#809FFF] border-opacity-10 hover:border-opacity-30 hover:bg-opacity-50 transition-all duration-300"
                  >
                    <div class="flex items-start space-x-3">
                      <div
                        class="w-1.5 h-1.5 bg-[#809FFF] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                      ></div>
                      <div class="flex-1 min-w-0">
                        <h5
                          class="font-semibold text-white text-sm mb-1 group-hover:text-[#809FFF] transition-colors duration-300"
                        >
                          {{ item.title }}
                        </h5>
                        <p class="text-xs text-slate-300 leading-relaxed">
                          {{ $t(`education.${item.descKey}`) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Key Achievements -->
              <div class="animate-slide-up" style="animation-delay: 0.2s">
                <div class="flex items-center space-x-3 mb-4">
                  <div
                    class="w-8 h-8 bg-gradient-to-br from-[#F41A81] to-[#FDDC00] rounded-lg flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
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
                  <h4 class="text-lg font-semibold text-white">
                    {{ $t("education.keyAchievements") }}
                  </h4>
                </div>
                <div class="space-y-3">
                  <div
                    v-for="(achievement, index) in keyAchievements"
                    :key="index"
                    class="group bg-[#0D0F12] bg-opacity-30 backdrop-blur-sm p-3 rounded-lg border border-[#F41A81] border-opacity-10 hover:border-opacity-30 hover:bg-opacity-50 transition-all duration-300"
                  >
                    <div class="flex items-start space-x-3">
                      <div
                        class="w-1.5 h-1.5 bg-[#F41A81] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                      ></div>
                      <div class="flex-1 min-w-0">
                        <h5
                          class="font-semibold text-white text-sm mb-1 group-hover:text-[#F41A81] transition-colors duration-300"
                        >
                          {{ $t(`education.${achievement.titleKey}`) }}
                        </h5>
                        <p class="text-xs text-slate-300 leading-relaxed">
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
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from "vue";

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
    transform: translateY(30px);
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
  animation: slide-up 0.8s ease-out forwards;
  opacity: 0;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
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
</style>
