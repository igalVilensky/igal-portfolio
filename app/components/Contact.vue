<template>
  <section class="section-y bg-transparent px-4 pt-8">
    <div class="container mx-auto max-w-7xl">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="py-16">
          <div class="inline-block mb-4">
            <span class="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          <h2 class="text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight">
            Let's Connect
          </h2>
          <p class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            Ready to collaborate on your next project or discuss how we can work
            together
          </p>
        </div>

        <!-- Contact Methods -->
        <div class="grid md:grid-cols-2 gap-8 md:gap-12 mb-20">
          <!-- Email Contact -->
          <div class="group">
            <div
              class="bg-white dark:bg-secondary-900 rounded-2xl border border-neutral-200 dark:border-secondary-700 p-8 hover:shadow-2xl transition-all duration-300">
              <div class="flex items-start gap-6">
                <div
                  class="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                    </path>
                  </svg>
                </div>
                <div class="flex-1 space-y-3">
                  <div class="flex items-center gap-4">
                    <div class="w-8 h-1 bg-primary-500"></div>
                    <h3 class="text-2xl font-display text-secondary-900 dark:text-white">
                      Email
                    </h3>
                  </div>
                  <a href="mailto:vilenskyigal@gmail.com"
                    class="text-lg text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors duration-300 font-medium block">
                    vilenskyigal@gmail.com
                  </a>
                  <p class="text-neutral-500 dark:text-neutral-400 text-base">
                    I'll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Phone Contact -->
          <div class="group">
            <div
              class="bg-white dark:bg-secondary-900 rounded-2xl border border-neutral-200 dark:border-secondary-700 p-8 hover:shadow-2xl transition-all duration-300">
              <div class="flex items-start gap-6">
                <div
                  class="w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                    </path>
                  </svg>
                </div>
                <div class="flex-1 space-y-3">
                  <div class="flex items-center gap-4">
                    <div class="w-8 h-1 bg-accent-500"></div>
                    <h3 class="text-2xl font-display text-secondary-900 dark:text-white">
                      Phone
                    </h3>
                  </div>
                  <a href="tel:+491783099433"
                    class="text-lg text-neutral-600 dark:text-neutral-300 hover:text-accent-500 transition-colors duration-300 font-medium block">
                    +49 178 3099433
                  </a>
                  <p class="text-neutral-500 dark:text-neutral-400 text-base">
                    Available Mon-Fri, 9AM-6PM CET
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="pb-20">
          <div class="text-center mb-12">
            <div class="inline-block mb-4">
              <div class="w-12 h-1 bg-primary-500 mx-auto"></div>
            </div>
            <h3 class="text-3xl font-display text-secondary-900 dark:text-white mb-8">
              Find Me Online
            </h3>
          </div>

          <div class="flex justify-center gap-6">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer"
              class="group w-16 h-16 bg-white dark:bg-secondary-900 rounded-2xl flex items-center justify-center text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-secondary-700 hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
              :class="social.hoverClass">
              <i :class="social.icon" class="text-2xl group-hover:text-white transition-colors duration-300"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "Contact - Igal Vilensky",
});

// Social links with Tailwind classes
const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://www.linkedin.com/in/igalvilensky/",
    hoverClass: "hover:bg-primary-500",
  },
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalVilensky",
    hoverClass: "hover:bg-secondary-600",
  },
  {
    name: "Facebook",
    icon: "fab fa-facebook",
    url: "https://www.facebook.com/afawefaw4496546464/",
    hoverClass: "hover:bg-accent-500",
  },
];
</script>
