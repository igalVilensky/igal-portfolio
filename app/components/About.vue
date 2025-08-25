<template>
  <section id="about" class="py-20 px-4 relative rounded-lg">
    <!-- Background elements -->
    <div
      class="absolute top-10 left-10 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"
    ></div>

    <div class="max-w-7xl mx-auto relative">
      <!-- Enhanced Header -->
      <div class="text-center mb-16">
        <div class="inline-block group">
          <h2
            class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 mt-8"
          >
            {{ $t("about.title") }}
            <span class="text-teal-500 relative">
              {{ $t("about.me") }}
              <!-- Animated underline -->
              <div
                class="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-600 opacity-40 rounded-full group-hover:opacity-70 transition-opacity duration-300"
              ></div>
            </span>
          </h2>
        </div>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full group-hover:w-32 transition-all duration-500"
        ></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Enhanced Content Section -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-transparent to-purple-600/20 rounded-2xl p-[1px] group-hover:from-teal-500/30 group-hover:to-purple-600/30 transition-all duration-500"
          >
            <div
              class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl h-full w-full"
            ></div>
          </div>

          <div class="relative z-10 p-8 space-y-6">
            <!-- Description paragraphs with enhanced styling -->
            <div class="space-y-6">
              <p
                class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
              >
                {{ $t("about.description1") }}
              </p>
              <p
                class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300"
              >
                {{ $t("about.description2") }}
              </p>
            </div>

            <!-- Enhanced Quick Stats -->
            <div class="grid grid-cols-2 gap-6 mt-8">
              <!-- Years Experience Card -->
              <div class="relative group/stat">
                <!-- Gradient border -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-[2px] group-hover/stat:p-[3px] transition-all duration-300"
                >
                  <div
                    class="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/40 dark:to-teal-800/40 rounded-xl h-full w-full"
                  ></div>
                </div>

                <div class="relative z-10 text-center p-4">
                  <div
                    class="text-3xl font-black text-teal-600 dark:text-teal-400 group-hover/stat:scale-110 transition-transform duration-300"
                  >
                    3+
                  </div>
                  <div
                    class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {{ $t("about.yearsExperience") }}
                  </div>
                </div>

                <!-- Floating accent -->
                <div
                  class="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-60 group-hover/stat:opacity-100 group-hover/stat:scale-125 transition-all duration-300"
                ></div>
              </div>

              <!-- Projects Completed Card -->
              <div class="relative group/stat">
                <!-- Gradient border -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-[2px] group-hover/stat:p-[3px] transition-all duration-300"
                >
                  <div
                    class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-800/40 rounded-xl h-full w-full"
                  ></div>
                </div>

                <div class="relative z-10 text-center p-4">
                  <div
                    class="text-3xl font-black text-purple-600 dark:text-purple-400 group-hover/stat:scale-110 transition-transform duration-300"
                  >
                    50+
                  </div>
                  <div
                    class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    {{ $t("about.projectsCompleted") }}
                  </div>
                </div>

                <!-- Floating accent -->
                <div
                  class="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-60 group-hover/stat:opacity-100 group-hover/stat:scale-125 transition-all duration-300"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Skills Section -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-teal-600/20 rounded-2xl p-[1px] group-hover:from-purple-500/30 group-hover:to-teal-600/30 transition-all duration-500"
          >
            <div
              class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl h-full w-full"
            ></div>
          </div>

          <div class="relative z-10 p-8">
            <!-- Enhanced section title -->
            <div class="mb-6">
              <h3
                class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300"
              >
                {{ $t("about.coreTechnologies") }}
              </h3>
              <!-- Animated underline -->
              <div
                class="w-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-600 group-hover:w-16 transition-all duration-500 ease-out mt-1"
              ></div>
            </div>

            <!-- Enhanced technology tags -->
            <div class="flex flex-wrap gap-3">
              <span
                v-for="(tech, index) in technologies"
                :key="index"
                class="relative px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-default group/tech"
                :class="
                  index % 2 === 0
                    ? 'bg-gradient-to-r from-teal-500/10 to-teal-600/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 hover:from-teal-500/20 hover:to-teal-600/20 hover:border-teal-500/40'
                    : 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 hover:from-purple-500/20 hover:to-purple-600/20 hover:border-purple-500/40'
                "
              >
                {{ tech }}

                <!-- Floating accent dot for each tech -->
                <div
                  class="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover/tech:opacity-100 transition-all duration-300"
                  :class="
                    index % 2 === 0
                      ? 'bg-gradient-to-br from-teal-400 to-teal-600'
                      : 'bg-gradient-to-br from-purple-400 to-purple-600'
                  "
                ></div>
              </span>
            </div>

            <!-- Skills section floating accent -->
            <div
              class="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-teal-600 rounded-full opacity-40 group-hover:opacity-70 group-hover:scale-125 transition-all duration-500"
            ></div>
          </div>
        </div>
      </div>

      <!-- Subtle background pattern -->
      <div
        class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-teal-500 to-purple-600"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Initialize i18n

// Technologies list (not translated, as they are proper nouns)
const technologies = [
  "JavaScript",
  "TypeScript",
  "Vue.js",
  "React",
  "Node.js",
  "Nuxt",
];
</script>
