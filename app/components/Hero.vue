<template>
  <section
    class="relative bg-white dark:bg-slate-900 transition-colors duration-300"
  >
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.slate.400)_1px,_transparent_0)] bg-[length:24px_24px]"
      ></div>
    </div>

    <div
      class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28 md:py-28 lg:py-32"
    >
      <div class="text-center">
        <!-- Profile Image -->
        <div class="mb-8 relative inline-block">
          <div class="relative">
            <img
              src="/profile.jpeg"
              :alt="$t('hero.title') + ' ' + $t('hero.lastName')"
              class="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto object-cover border-2 border-slate-200 dark:border-slate-700 shadow-sm"
            />
            <!-- Subtle status indicator -->
            <div
              class="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center"
            >
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Main Heading -->
        <div class="mb-6">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight"
          >
            {{ $t("hero.title") }}
            <span class="text-blue-600 dark:text-blue-400">
              {{ $t("hero.lastName") }}
            </span>
          </h1>

          <!-- Role/Subtitle -->
          <p
            class="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Full-stack developer
          </p>
        </div>

        <!-- Brief Description -->
        <div class="mb-10">
          <p
            class="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {{ $t("hero.subtitle") }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <!-- Primary CTA -->
          <NuxtLink
            to="#projects"
            @click.prevent="scrollToSection('projects')"
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <svg
              class="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0l-4 4m4-4l-4-4"
              ></path>
            </svg>
            {{ $t("hero.viewProjects") }}
          </NuxtLink>

          <!-- Secondary CTA -->
          <NuxtLink
            to="/IgalVilensky_CV.pdf"
            target="_blank"
            class="inline-flex items-center px-6 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg border border-slate-300 dark:border-slate-600 shadow-sm hover:shadow-md transition-all duration-200 group"
          >
            <svg
              class="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform duration-200"
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
            {{ $t("hero.downloadCV") }}
          </NuxtLink>
        </div>

        <!-- Social Links -->
        <div class="mt-8 flex justify-center space-x-4">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200"
            :aria-label="social.name"
          >
            <i :class="social.icon" class="text-lg"></i>
          </a>
        </div>

        <!-- Scroll Indicator -->
        <div class="mt-12 flex justify-center">
          <button
            @click="scrollToSection('about')"
            class="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center pt-2 hover:border-slate-400 dark:hover:border-slate-500 transition-colors duration-200 group"
            aria-label="Scroll to next section"
          >
            <div
              class="w-1 h-2 bg-slate-400 dark:bg-slate-500 rounded-full group-hover:bg-slate-600 dark:group-hover:bg-slate-400 transition-colors duration-200 animate-bounce"
            ></div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Social links
const socialLinks = [
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalvilensky",
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://linkedin.com/in/igalvilensky",
  },
  { name: "Email", icon: "fas fa-envelope", url: "mailto:igal@example.com" },
];

// Scroll to section function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 64;
    const elementPosition = element.offsetTop - navbarHeight - 20;
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  }
};
</script>
