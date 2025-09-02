<template>
  <section
    id="experience"
    class="relative bg-white dark:bg-slate-900 transition-colors duration-300"
  >
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
          {{ $t("experience.title") }}
          <span class="text-blue-600 dark:text-blue-400">{{
            $t("experience.title_highlight")
          }}</span>
        </h2>
        <div
          class="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full mb-6"
        ></div>
        <p
          class="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          {{ $t("experience.description") }}
        </p>
      </div>

      <!-- Experience Timeline -->
      <div class="relative">
        <!-- Timeline line - visible on larger screens -->
        <div
          class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-600 transform -translate-x-1/2"
        ></div>

        <!-- Experience Items -->
        <div class="space-y-8 md:space-y-12">
          <!-- Current Position - Flowplace -->
          <div class="relative md:flex md:items-center">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-slate-900 shadow-lg transform -translate-x-1/2 z-10"
            ></div>

            <!-- Content Card -->
            <div class="md:w-1/2 md:pr-8">
              <div
                class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-4"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {{ $t("experience.flowplace.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      :src="flowplaceLogo"
                      alt="Flowplace Logo"
                      class="w-8 h-8 object-contain rounded"
                    />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3
                      class="text-xl font-semibold text-slate-900 dark:text-white mb-1"
                    >
                      {{ $t("experience.flowplace.title") }}
                    </h3>
                    <p
                      class="text-base text-blue-600 dark:text-blue-400 font-medium"
                    >
                      {{ $t("experience.flowplace.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.flowplace.responsibilities.1")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.flowplace.responsibilities.2")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.flowplace.responsibilities.3")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.flowplace.responsibilities.4")
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- LeanERA GmbH -->
          <div class="relative md:flex md:items-center">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-slate-900 shadow-lg transform -translate-x-1/2 z-10"
            ></div>

            <!-- Content Card - Right side -->
            <div class="md:w-1/2 md:ml-auto md:pl-8">
              <div
                class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-4"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {{ $t("experience.leanera.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      :src="LeanEraLogo"
                      alt="LeanERA Logo"
                      class="w-8 h-8 object-contain rounded"
                    />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3
                      class="text-xl font-semibold text-slate-900 dark:text-white mb-1"
                    >
                      {{ $t("experience.leanera.title") }}
                    </h3>
                    <p
                      class="text-base text-blue-600 dark:text-blue-400 font-medium"
                    >
                      {{ $t("experience.leanera.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.leanera.responsibilities.1")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.leanera.responsibilities.2")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.leanera.responsibilities.3")
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- ARI Motors GmbH -->
          <div class="relative md:flex md:items-center">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-slate-900 shadow-lg transform -translate-x-1/2 z-10"
            ></div>

            <!-- Content Card -->
            <div class="md:w-1/2 md:pr-8">
              <div
                class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-4"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {{ $t("experience.ari_motors.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      :src="arimotorsLogo"
                      alt="ARI Motors Logo"
                      class="w-8 h-8 object-contain rounded"
                    />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3
                      class="text-xl font-semibold text-slate-900 dark:text-white mb-1"
                    >
                      {{ $t("experience.ari_motors.title") }}
                    </h3>
                    <p
                      class="text-base text-blue-600 dark:text-blue-400 font-medium"
                    >
                      {{ $t("experience.ari_motors.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.ari_motors.responsibilities.1")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.ari_motors.responsibilities.2")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.ari_motors.responsibilities.3")
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Myfxbook Ltd -->
          <div class="relative md:flex md:items-center">
            <!-- Timeline dot -->
            <div
              class="hidden md:block absolute left-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-slate-900 shadow-lg transform -translate-x-1/2 z-10"
            ></div>

            <!-- Content Card - Right side -->
            <div class="md:w-1/2 md:ml-auto md:pl-8">
              <div
                class="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <!-- Period Badge -->
                <div
                  class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-4"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {{ $t("experience.myfxbook.period") }}
                </div>

                <!-- Company & Role -->
                <div class="flex items-start space-x-4 mb-4">
                  <!-- Company Logo -->
                  <div
                    class="w-12 h-12 bg-white dark:bg-slate-900 rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700"
                  >
                    <img
                      :src="myfxbookLogo"
                      alt="Myfxbook Logo"
                      class="w-8 h-8 object-contain rounded"
                    />
                  </div>

                  <!-- Company & Title Info -->
                  <div class="flex-1 min-w-0">
                    <h3
                      class="text-xl font-semibold text-slate-900 dark:text-white mb-1"
                    >
                      {{ $t("experience.myfxbook.title") }}
                    </h3>
                    <p
                      class="text-base text-blue-600 dark:text-blue-400 font-medium"
                    >
                      {{ $t("experience.myfxbook.company") }}
                    </p>
                  </div>
                </div>

                <!-- Responsibilities -->
                <ul class="space-y-2">
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.myfxbook.responsibilities.1")
                    }}</span>
                  </li>
                  <li
                    class="flex items-start space-x-3 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <div
                      class="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"
                    ></div>
                    <span>{{
                      $t("experience.myfxbook.responsibilities.2")
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Stats -->
      <div
        class="mt-16 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="space-y-2">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              3+
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              Years Experience
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              4
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              Companies
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              50+
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              Projects
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
              15+
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-400">
              Technologies
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LeanEraLogo from "../../public/experience-logos/LeanEraLogo.jpeg";
import flowplaceLogo from "../../public/experience-logos/flowplaceLogo.jpeg";
import arimotorsLogo from "../../public/experience-logos/arimotorsLogo.jpeg";
import myfxbookLogo from "../../public/experience-logos/myfxbookLogo.jpeg";
</script>
