<template>
  <header class="relative py-32 px-4 overflow-hidden">
    <!-- Background Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-teal-50 to-purple-50"
    ></div>
    <div
      class="absolute top-20 right-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
    ></div>

    <div class="relative max-w-7xl mx-auto text-center">
      <!-- Enhanced Profile Image with Gradient Border Frame -->
      <div class="mb-8 relative inline-block group">
        <!-- Outer gradient border container -->
        <div
          class="relative p-1.5 bg-gradient-to-br from-teal-500 via-teal-400 to-purple-600 rounded-full group-hover:p-2 transition-all duration-500 shadow-2xl"
        >
          <!-- Inner container -->
          <div class="relative bg-white dark:bg-gray-900 rounded-full p-2">
            <!-- Glowing background effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-purple-600/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 group-hover:scale-110 animate-pulse transition-all duration-500"
            ></div>

            <!-- Profile image -->
            <img
              src="/profile.jpeg"
              :alt="$t('hero.title') + ' ' + $t('hero.lastName')"
              class="relative w-28 h-28 md:w-36 md:h-36 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-500 shadow-lg"
            />
          </div>
        </div>
      </div>

      <!-- Enhanced Hero Text with Gradient Underlines -->
      <div class="mb-8">
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-gray-600 mb-4 leading-tight"
        >
          {{ $t("hero.title") }}
          <span
            class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent relative"
          >
            {{ $t("hero.lastName") }}
            <!-- Animated underline -->
            <div
              class="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-purple-600 opacity-30 rounded-full animate-pulse"
            ></div>
          </span>
        </h1>

        <div class="relative inline-block">
          <p
            class="text-lg md:text-2xl text-gray-600 dark:text-gray-500 mb-2 font-medium italic max-w-2xl mx-auto"
          >
            {{ $t("hero.subtitle") }}
          </p>
          <!-- Subtle gradient underline for subtitle -->
          <div
            class="w-24 h-0.5 bg-gradient-to-r from-teal-500/40 to-purple-600/40 mx-auto rounded-full"
          ></div>
        </div>
      </div>

      <!-- Enhanced CTA Buttons with Consistent Styling -->
      <div
        class="flex flex-col sm:flex-row gap-6 justify-center items-center mt-auto"
      >
        <!-- Projects Button with Enhanced Frame -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
          >
            <div
              class="bg-gradient-to-r from-teal-500 to-teal-600 rounded-full h-full w-full"
            ></div>
          </div>

          <NuxtLink
            to="/projects"
            class="relative z-10 group/btn bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-3"
          >
            <i
              class="fas fa-rocket group-hover/btn:animate-bounce group-hover/btn:text-yellow-200 transition-colors duration-300"
            ></i>
            <span
              class="group-hover/btn:tracking-wide transition-all duration-300"
            >
              {{ $t("hero.viewProjects") }}
            </span>
          </NuxtLink>

          <!-- Floating accent dot -->
          <div
            class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-teal-200 to-white rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"
          ></div>
        </div>

        <!-- CV Download Button with Enhanced Frame -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
          >
            <div
              class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full h-full w-full"
            ></div>
          </div>

          <!-- Glowing background effect -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20 rounded-full blur-lg opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          ></div>

          <NuxtLink
            to="/IgalVilensky_CV.pdf"
            target="_blank"
            class="relative z-10 group/btn bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-3"
          >
            <i
              class="fas fa-download group-hover/btn:animate-pulse group-hover/btn:text-purple-200 transition-colors duration-300"
            ></i>
            <span
              class="group-hover/btn:tracking-wide transition-all duration-300"
            >
              {{ $t("hero.downloadCV") }}
            </span>
          </NuxtLink>

          <!-- Floating accent dot -->
          <div
            class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-purple-200 to-white rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"
          ></div>
        </div>
      </div>

      <!-- Subtle background pattern -->
      <div class="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div
          class="absolute inset-0 bg-gradient-to-br from-teal-500 to-purple-600"
        ></div>
      </div>
    </div>
  </header>
</template>
