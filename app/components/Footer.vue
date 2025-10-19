<!-- app/components/Footer.vue -->
<template>
  <footer
    class="bg-neutral-50 dark:bg-secondary-900 border-t border-neutral-200 dark:border-secondary-700 px-4"
  >
    <div class="container-custom py-12">
      <div class="max-w-5xl mx-auto">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <!-- Left Column: Brand & Contact -->
          <div class="space-y-6">
            <div>
              <h2
                class="text-2xl font-display text-secondary-900 dark:text-white mb-2"
              >
                Igal Vilensky
              </h2>
              <p class="text-base text-neutral-600 dark:text-neutral-300">
                Creative Technologist
              </p>
            </div>

            <div class="space-y-3">
              <a
                href="mailto:vilenskyigal@gmail.com"
                class="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group"
              >
                <span class="text-sm">vilenskyigal@gmail.com</span>
                <span
                  class="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  >→</span
                >
              </a>

              <a
                href="tel:+491783099433"
                class="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group"
              >
                <span class="text-sm">+49 178 3099433</span>
                <span
                  class="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  >→</span
                >
              </a>

              <p class="text-sm text-neutral-600 dark:text-neutral-300">
                Leipzig, Germany
              </p>
            </div>
          </div>

          <!-- Right Column: Navigation -->
          <div>
            <h3
              class="text-lg font-semibold text-secondary-900 dark:text-white mb-4"
            >
              Navigate
            </h3>
            <nav class="space-y-2">
              <NuxtLink
                v-for="item in navigationItems"
                :key="item.id"
                :to="item.path"
                class="block text-sm text-neutral-600 dark:text-neutral-300 hover:text-secondary-900 dark:hover:text-white transition-colors"
              >
                {{ item.label }}
              </NuxtLink>
            </nav>
          </div>
        </div>

        <!-- Bottom Section: Social & Copyright -->
        <div class="pt-8 border-t border-neutral-200 dark:border-secondary-700">
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <!-- Social Links -->
            <div class="flex items-center gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-secondary-800 transition-all"
                :aria-label="social.name"
              >
                <i :class="social.icon" class="text-lg"></i>
              </a>
            </div>

            <!-- Copyright -->
            <div class="text-center md:text-right">
              <p class="text-sm text-neutral-500 dark:text-neutral-400">
                © {{ currentYear }} Igal Vilensky. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Current year
const currentYear = new Date().getFullYear();

// Navigation items matching navbar
const navigationItems = [
  { id: "home", path: "/", label: "Home" },
  { id: "case-studies", path: "/case-studies", label: "Case Studies" },
  { id: "writing", path: "/writing", label: "Writing" },
  { id: "about", path: "/about", label: "About" },
  { id: "contact", path: "/contact", label: "Contact" },
];

// Social links
const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://www.linkedin.com/in/igalvilensky/",
  },
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalVilensky",
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    url: "mailto:vilenskyigal@gmail.com",
  },
];
</script>

<style scoped>
/* Smooth transitions */
a {
  transition: all 0.2s ease;
}
</style>
