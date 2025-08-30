<template>
  <section
    id="experience"
    class="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden"
    :class="colorMode.value === 'dark' ? 'bg-gray-800' : 'bg-gray-50'"
  >
    <!-- Background Effects -->
    <div
      class="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-purple-400/5 dark:bg-purple-400/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-0 right-0 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-teal-400/5 dark:bg-teal-400/10 rounded-full blur-3xl"
    ></div>

    <div class="max-w-6xl mx-auto relative">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        <h2
          class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4"
        >
          {{ $t("experience.title") }}
          <span class="text-purple-500">{{
            $t("experience.title_highlight")
          }}</span>
        </h2>
        <div
          class="w-20 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
        ></div>
        <p
          class="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          {{ $t("experience.description") }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline Line -->
        <div
          class="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-purple-500 to-teal-500 transform sm:-translate-x-1/2"
        ></div>

        <!-- Experience Items -->
        <div class="space-y-8 sm:space-y-12">
          <!-- Current Position - Flowplace -->
          <div class="relative flex items-start sm:items-center">
            <!-- Timeline Dot -->
            <div
              class="absolute left-6 sm:left-1/2 w-3 h-3 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full border-3 border-white dark:border-gray-800 shadow-lg transform -translate-x-1/2 sm:-translate-x-1/2 z-10"
            ></div>

            <!-- Content -->
            <div class="ml-12 sm:ml-0 sm:w-1/2" :class="{ 'sm:pr-8': true }">
              <div
                class="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transform hover:-translate-y-2"
              >
                <!-- Hover Background Effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-teal-600/5 dark:from-teal-400/10 dark:to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <div class="relative">
                  <!-- Period Badge - Mobile Optimized -->
                  <div
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-teal-500 to-teal-600 text-white mb-3"
                  >
                    <i class="fas fa-calendar-alt mr-1.5 text-xs"></i>
                    <span class="whitespace-nowrap">{{
                      $t("experience.flowplace.period")
                    }}</span>
                  </div>

                  <!-- Job Title & Company - Mobile Optimized -->
                  <div class="mb-4">
                    <!-- Company Logo - Mobile Optimized -->
                    <div class="flex items-center gap-3 mb-3">
                      <div class="flex-shrink-0">
                        <div
                          class="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-600 group-hover:scale-110 transition-transform duration-300"
                        >
                          <img
                            :src="flowplaceLogo"
                            alt="Flowplace Logo"
                            class="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded"
                          />
                        </div>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center">
                          <span
                            class="text-teal-600 dark:text-teal-400 font-semibold text-sm sm:text-base"
                          >
                            {{ $t("experience.flowplace.company") }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Job Title - Mobile Optimized -->
                    <h3
                      class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight"
                    >
                      {{ $t("experience.flowplace.title") }}
                    </h3>
                  </div>

                  <!-- Responsibilities -->
                  <ul class="space-y-2.5">
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.flowplace.responsibilities.1") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.flowplace.responsibilities.2") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.flowplace.responsibilities.3") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.flowplace.responsibilities.4") }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- LeanERA GmbH -->
          <div class="relative flex items-start sm:items-center">
            <!-- Timeline Dot -->
            <div
              class="absolute left-6 sm:left-1/2 w-3 h-3 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full border-3 border-white dark:border-gray-800 shadow-lg transform -translate-x-1/2 sm:-translate-x-1/2 z-10"
            ></div>

            <!-- Content -->
            <div
              class="ml-12 sm:ml-0 sm:w-1/2"
              :class="{ 'sm:ml-auto sm:pl-8': true }"
            >
              <div
                class="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transform hover:-translate-y-2"
              >
                <!-- Hover Background Effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 dark:from-purple-400/10 dark:to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <div class="relative">
                  <!-- Period Badge - Mobile Optimized -->
                  <div
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-purple-600 text-white mb-3"
                  >
                    <i class="fas fa-calendar-alt mr-1.5 text-xs"></i>
                    <span class="whitespace-nowrap">{{
                      $t("experience.leanera.period")
                    }}</span>
                  </div>

                  <!-- Job Title & Company - Mobile Optimized -->
                  <div class="mb-4">
                    <!-- Company Logo - Mobile Optimized -->
                    <div class="flex items-center gap-3 mb-3">
                      <div class="flex-shrink-0">
                        <div
                          class="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-600 group-hover:scale-110 transition-transform duration-300"
                        >
                          <img
                            :src="LeanEraLogo"
                            alt="LeanERA Logo"
                            class="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded"
                          />
                        </div>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center">
                          <span
                            class="text-purple-600 dark:text-purple-400 font-semibold text-sm sm:text-base"
                          >
                            {{ $t("experience.leanera.company") }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Job Title - Mobile Optimized -->
                    <h3
                      class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight"
                    >
                      {{ $t("experience.leanera.title") }}
                    </h3>
                  </div>

                  <!-- Responsibilities -->
                  <ul class="space-y-2.5">
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.leanera.responsibilities.1") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.leanera.responsibilities.2") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.leanera.responsibilities.3") }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- ARI Motors GmbH -->
          <div class="relative flex items-start sm:items-center">
            <!-- Timeline Dot -->
            <div
              class="absolute left-6 sm:left-1/2 w-3 h-3 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full border-3 border-white dark:border-gray-800 shadow-lg transform -translate-x-1/2 sm:-translate-x-1/2 z-10"
            ></div>

            <!-- Content -->
            <div class="ml-12 sm:ml-0 sm:w-1/2" :class="{ 'sm:pr-8': true }">
              <div
                class="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transform hover:-translate-y-2"
              >
                <!-- Hover Background Effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-400/10 dark:to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <div class="relative">
                  <!-- Period Badge - Mobile Optimized -->
                  <div
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-teal-500 to-purple-500 text-white mb-3"
                  >
                    <i class="fas fa-calendar-alt mr-1.5 text-xs"></i>
                    <span class="whitespace-nowrap">{{
                      $t("experience.ari_motors.period")
                    }}</span>
                  </div>

                  <!-- Job Title & Company - Mobile Optimized -->
                  <div class="mb-4">
                    <!-- Company Logo - Mobile Optimized -->
                    <div class="flex items-center gap-3 mb-3">
                      <div class="flex-shrink-0">
                        <div
                          class="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-600 group-hover:scale-110 transition-transform duration-300"
                        >
                          <img
                            :src="arimotorsLogo"
                            alt="ARI Motors Logo"
                            class="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded"
                          />
                        </div>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center">
                          <span
                            class="text-teal-600 dark:text-teal-400 font-semibold text-sm sm:text-base"
                          >
                            {{ $t("experience.ari_motors.company") }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Job Title - Mobile Optimized -->
                    <h3
                      class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight"
                    >
                      {{ $t("experience.ari_motors.title") }}
                    </h3>
                  </div>

                  <!-- Responsibilities -->
                  <ul class="space-y-2.5">
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.ari_motors.responsibilities.1") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.ari_motors.responsibilities.2") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.ari_motors.responsibilities.3") }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Myfxbook Ltd -->
          <div class="relative flex items-start sm:items-center">
            <!-- Timeline Dot -->
            <div
              class="absolute left-6 sm:left-1/2 w-3 h-3 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full border-3 border-white dark:border-gray-800 shadow-lg transform -translate-x-1/2 sm:-translate-x-1/2 z-10"
            ></div>

            <!-- Content -->
            <div
              class="ml-12 sm:ml-0 sm:w-1/2"
              :class="{ 'sm:ml-auto sm:pl-8': true }"
            >
              <div
                class="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transform hover:-translate-y-2"
              >
                <!-- Hover Background Effect -->
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-teal-500/5 dark:from-purple-400/10 dark:to-teal-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                ></div>

                <div class="relative">
                  <!-- Period Badge - Mobile Optimized -->
                  <div
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-teal-500 text-white mb-3"
                  >
                    <i class="fas fa-calendar-alt mr-1.5 text-xs"></i>
                    <span class="whitespace-nowrap">{{
                      $t("experience.myfxbook.period")
                    }}</span>
                  </div>

                  <!-- Job Title & Company - Mobile Optimized -->
                  <div class="mb-4">
                    <!-- Company Logo - Mobile Optimized -->
                    <div class="flex items-center gap-3 mb-3">
                      <div class="flex-shrink-0">
                        <div
                          class="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-600 group-hover:scale-110 transition-transform duration-300"
                        >
                          <img
                            :src="myfxbookLogo"
                            alt="Myfxbook Logo"
                            class="w-6 h-6 sm:w-8 sm:h-8 object-contain rounded"
                          />
                        </div>
                      </div>
                      <div class="min-w-0 flex-1">
                        <div class="flex items-center">
                          <span
                            class="text-purple-600 dark:text-purple-400 font-semibold text-sm sm:text-base"
                          >
                            {{ $t("experience.myfxbook.company") }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Job Title - Mobile Optimized -->
                    <h3
                      class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white leading-tight"
                    >
                      {{ $t("experience.myfxbook.title") }}
                    </h3>
                  </div>

                  <!-- Responsibilities -->
                  <ul class="space-y-2.5">
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.myfxbook.responsibilities.1") }}
                      </span>
                    </li>
                    <li class="flex items-start gap-2.5 group/item">
                      <div class="flex-shrink-0 mt-2">
                        <div
                          class="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                        ></div>
                      </div>
                      <span
                        class="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
                      >
                        {{ $t("experience.myfxbook.responsibilities.2") }}
                      </span>
                    </li>
                  </ul>
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
import { useColorMode } from "#imports";
import LeanEraLogo from "../../public/experience-logos/LeanEraLogo.jpeg";
import flowplaceLogo from "../../public/experience-logos/flowplaceLogo.jpeg";
import arimotorsLogo from "../../public/experience-logos/arimotorsLogo.jpeg";
import myfxbookLogo from "../../public/experience-logos/myfxbookLogo.jpeg";

// Initialize color mode
const colorMode = useColorMode();
</script>
