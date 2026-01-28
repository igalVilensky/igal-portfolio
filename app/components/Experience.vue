<template>
  <section id="experience" class="relative transition-colors duration-300" :class="colorMode.value === 'dark'
      ? 'bg-[#0D0F12]'
      : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    ">
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_#809FFF_2px,_transparent_2px),_radial-gradient(circle_at_75px_75px,_#F41A81_2px,_transparent_2px)] bg-[length:100px_100px]">
      </div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Section Header -->
      <div class="text-center mb-8 animate-slide-up">
        <h2 class="text-2xl md:text-3xl font-bold mb-4" :class="colorMode.value === 'dark'
            ? 'text-white'
            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'
          ">
          {{ $t("experience.title") }}
          <span :class="colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
            ">
            {{ $t("experience.title_highlight") }}
          </span>
        </h2>
        <div class="w-24 h-1 mx-auto rounded-full mb-6"
          :class="colorMode.value === 'dark' ? 'bg-[#809FFF]' : 'bg-blue-600'"></div>
        <p class="max-w-3xl mx-auto leading-relaxed" :class="colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
          ">
          {{ $t("experience.description") }}
        </p>
      </div>

      <!-- Experience Timeline -->
      <div class="relative">
        <!-- Timeline line - visible on larger screens -->
        <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5"
          :class="colorMode.value === 'dark' ? 'bg-[#1B2432]' : 'bg-slate-200'"></div>

        <!-- Experience Items -->
        <div class="space-y-8 md:space-y-12">
          <!-- Current Position - Flowplace -->
          <div class="relative md:flex md:items-center animate-slide-up-delayed">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 rounded-full border-4 shadow-lg transform -translate-x-1/2 z-10"
              :class="colorMode.value === 'dark'
                  ? 'bg-[#809FFF] border-[#0D0F12]'
                  : 'bg-blue-600 border-white'
                "></div>

            <!-- Content Card -->
            <div class="md:w-1/2 md:pr-8 group">
              <div class="rounded-xl border p-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                :class="colorMode.value === 'dark'
                    ? 'bg-[#1B2432] border-[#809FFF]/20'
                    : 'bg-white border-slate-200/50'
                  ">
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 transition-all duration-300 group-hover:scale-105"
                  :class="colorMode.value === 'dark'
                      ? 'bg-[#809FFF]/20 text-[#809FFF]'
                      : 'bg-blue-100 text-blue-600'
                    ">
                  <i class="fas fa-calendar-alt w-4 h-4 mr-2"></i>
                  {{ $t("experience.flowplace.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
                    :class="colorMode.value === 'dark'
                        ? 'bg-[#0D0F12] border-[#809FFF]/20'
                        : 'bg-white border-slate-200'
                      ">
                    <img :src="flowplaceLogo" alt="Flowplace Logo" class="w-8 h-8 object-contain rounded" />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xl font-semibold mb-1" :class="colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                      ">
                      {{ $t("experience.flowplace.title") }}
                    </h3>
                    <p class="text-base font-medium" :class="colorMode.value === 'dark'
                        ? 'text-[#809FFF]'
                        : 'text-blue-600'
                      ">
                      {{ $t("experience.flowplace.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li v-for="(responsibility, index) in 4" :key="index" class="flex items-start space-x-3 text-sm"
                    :class="colorMode.value === 'dark'
                        ? 'text-slate-400'
                        : 'text-slate-600'
                      ">
                    <div class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" :class="colorMode.value === 'dark'
                        ? 'bg-[#F41A81]'
                        : 'bg-blue-600'
                      "></div>
                    <span>{{
                      $t(`experience.flowplace.responsibilities.${index + 1}`)
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- LeanERA GmbH -->
          <div class="relative md:flex md:items-center animate-slide-up-delayed-2">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 rounded-full border-4 shadow-lg transform -translate-x-1/2 z-10"
              :class="colorMode.value === 'dark'
                  ? 'bg-[#809FFF] border-[#0D0F12]'
                  : 'bg-blue-600 border-white'
                "></div>

            <!-- Content Card - Right side -->
            <div class="md:w-1/2 md:ml-auto md:pl-8 group">
              <div class="rounded-xl border p-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                :class="colorMode.value === 'dark'
                    ? 'bg-[#1B2432] border-[#809FFF]/20'
                    : 'bg-white border-slate-200/50'
                  ">
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 transition-all duration-300 group-hover:scale-105"
                  :class="colorMode.value === 'dark'
                      ? 'bg-[#809FFF]/20 text-[#809FFF]'
                      : 'bg-blue-100 text-blue-600'
                    ">
                  <i class="fas fa-calendar-alt w-4 h-4 mr-2"></i>
                  {{ $t("experience.leanera.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
                    :class="colorMode.value === 'dark'
                        ? 'bg-[#0D0F12] border-[#809FFF]/20'
                        : 'bg-white border-slate-200'
                      ">
                    <img :src="LeanEraLogo" alt="LeanERA Logo" class="w-8 h-8 object-contain rounded" />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xl font-semibold mb-1" :class="colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                      ">
                      {{ $t("experience.leanera.title") }}
                    </h3>
                    <p class="text-base font-medium" :class="colorMode.value === 'dark'
                        ? 'text-[#809FFF]'
                        : 'text-blue-600'
                      ">
                      {{ $t("experience.leanera.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li v-for="(responsibility, index) in 3" :key="index" class="flex items-start space-x-3 text-sm"
                    :class="colorMode.value === 'dark'
                        ? 'text-slate-400'
                        : 'text-slate-600'
                      ">
                    <div class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" :class="colorMode.value === 'dark'
                        ? 'bg-[#F41A81]'
                        : 'bg-blue-600'
                      "></div>
                    <span>{{
                      $t(`experience.leanera.responsibilities.${index + 1}`)
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- ARI Motors GmbH -->
          <div class="relative md:flex md:items-center animate-slide-up-delayed-3">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 rounded-full border-4 shadow-lg transform -translate-x-1/2 z-10"
              :class="colorMode.value === 'dark'
                  ? 'bg-[#809FFF] border-[#0D0F12]'
                  : 'bg-blue-600 border-white'
                "></div>

            <!-- Content Card -->
            <div class="md:w-1/2 md:pr-8 group">
              <div class="rounded-xl border p-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                :class="colorMode.value === 'dark'
                    ? 'bg-[#1B2432] border-[#809FFF]/20'
                    : 'bg-white border-slate-200/50'
                  ">
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 transition-all duration-300 group-hover:scale-105"
                  :class="colorMode.value === 'dark'
                      ? 'bg-[#809FFF]/20 text-[#809FFF]'
                      : 'bg-blue-100 text-blue-600'
                    ">
                  <i class="fas fa-calendar-alt w-4 h-4 mr-2"></i>
                  {{ $t("experience.ari_motors.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
                    :class="colorMode.value === 'dark'
                        ? 'bg-[#0D0F12] border-[#809FFF]/20'
                        : 'bg-white border-slate-200'
                      ">
                    <img :src="arimotorsLogo" alt="ARI Motors Logo" class="w-8 h-8 object-contain rounded" />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xl font-semibold mb-1" :class="colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                      ">
                      {{ $t("experience.ari_motors.title") }}
                    </h3>
                    <p class="text-base font-medium" :class="colorMode.value === 'dark'
                        ? 'text-[#809FFF]'
                        : 'text-blue-600'
                      ">
                      {{ $t("experience.ari_motors.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li v-for="(responsibility, index) in 3" :key="index" class="flex items-start space-x-3 text-sm"
                    :class="colorMode.value === 'dark'
                        ? 'text-slate-400'
                        : 'text-slate-600'
                      ">
                    <div class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" :class="colorMode.value === 'dark'
                        ? 'bg-[#F41A81]'
                        : 'bg-blue-600'
                      "></div>
                    <span>{{
                      $t(`experience.ari_motors.responsibilities.${index + 1}`)
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Myfxbook Ltd -->
          <div class="relative md:flex md:items-center animate-slide-up-delayed-4">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 rounded-full border-4 shadow-lg transform -translate-x-1/2 z-10"
              :class="colorMode.value === 'dark'
                  ? 'bg-[#809FFF] border-[#0D0F12]'
                  : 'bg-blue-600 border-white'
                "></div>

            <!-- Content Card - Right side -->
            <div class="md:w-1/2 md:ml-auto md:pl-8 group">
              <div class="rounded-xl border p-6 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                :class="colorMode.value === 'dark'
                    ? 'bg-[#1B2432] border-[#809FFF]/20'
                    : 'bg-white border-slate-200/50'
                  ">
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 transition-all duration-300 group-hover:scale-105"
                  :class="colorMode.value === 'dark'
                      ? 'bg-[#809FFF]/20 text-[#809FFF]'
                      : 'bg-blue-100 text-blue-600'
                    ">
                  <i class="fas fa-calendar-alt w-4 h-4 mr-2"></i>
                  {{ $t("experience.myfxbook.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
                    :class="colorMode.value === 'dark'
                        ? 'bg-[#0D0F12] border-[#809FFF]/20'
                        : 'bg-white border-slate-200'
                      ">
                    <img :src="myfxbookLogo" alt="Myfxbook Logo" class="w-8 h-8 object-contain rounded" />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xl font-semibold mb-1" :class="colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                      ">
                      {{ $t("experience.myfxbook.title") }}
                    </h3>
                    <p class="text-base font-medium" :class="colorMode.value === 'dark'
                        ? 'text-[#809FFF]'
                        : 'text-blue-600'
                      ">
                      {{ $t("experience.myfxbook.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li v-for="(responsibility, index) in 2" :key="index" class="flex items-start space-x-3 text-sm"
                    :class="colorMode.value === 'dark'
                        ? 'text-slate-400'
                        : 'text-slate-600'
                      ">
                    <div class="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" :class="colorMode.value === 'dark'
                        ? 'bg-[#F41A81]'
                        : 'bg-blue-600'
                      "></div>
                    <span>{{
                      $t(`experience.myfxbook.responsibilities.${index + 1}`)
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import LeanEraLogo from "../../public/experience-logos/LeanEraLogo.jpeg";
import flowplaceLogo from "../../public/experience-logos/flowplaceLogo.jpeg";
import arimotorsLogo from "../../public/experience-logos/arimotorsLogo.jpeg";
import myfxbookLogo from "../../public/experience-logos/myfxbookLogo.jpeg";

// Color mode
const colorMode = useColorMode();
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

.animate-slide-up-delayed-4 {
  animation: slide-up 0.8s ease-out 0.8s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-5 {
  animation: slide-up 0.8s ease-out 1s forwards;
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .md\:w-1\/2 {
    width: 100%;
  }

  .md\:pr-8,
  .md\:pl-8 {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
