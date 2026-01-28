<!-- app/components/Footer.vue -->
<template>
  <footer class="bg-secondary-50 dark:bg-dark-bg border-t border-secondary-200 dark:border-white/5 pt-20 pb-10">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <!-- Brand Column -->
        <div class="md:col-span-5 space-y-6">
          <NuxtLink to="/" class="inline-block">
            <span class="text-2xl font-display font-bold text-secondary-900 dark:text-white">
              Igal Vilensky
            </span>
          </NuxtLink>
          <p class="text-secondary-600 dark:text-secondary-400 max-w-sm text-lg leading-relaxed">
            Crafting digital products with a focus on aesthetics, functionality, and user experience.
          </p>
          <div class="flex gap-4 pt-2">
            <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer"
              class="w-12 h-12 rounded-full bg-secondary-100 dark:bg-white/5 flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-all duration-300 group"
              :aria-label="social.name">
              <i :class="social.icon" class="text-xl group-hover:scale-110 transition-transform"></i>
            </a>
          </div>
        </div>

        <!-- Navigation Columns -->
        <div class="md:col-span-3 md:col-start-7">
          <h4 class="text-secondary-900 dark:text-white font-bold mb-6">Sitemap</h4>
          <ul class="space-y-4">
            <li v-for="item in navigationItems" :key="item.id">
              <NuxtLink :to="item.path"
                class="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="md:col-span-3">
          <h4 class="text-secondary-900 dark:text-white font-bold mb-6">Contact</h4>
          <ul class="space-y-4">
            <li>
              <a href="mailto:vilenskyigal@gmail.com"
                class="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                vilenskyigal@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+491783099433"
                class="text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                +49 178 3099433
              </a>
            </li>
            <li class="text-secondary-500 dark:text-secondary-500">
              Leipzig, Germany
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 border-t border-secondary-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-secondary-500 dark:text-secondary-500 text-sm">
          © {{ currentYear }} Igal Vilensky. All rights reserved.
        </p>
        <p class="text-secondary-500 dark:text-secondary-500 text-sm flex items-center gap-2">
          <span>Designed & Built with</span>
          <i class="fas fa-heart text-accent-500 animate-pulse"></i>
          <span>in Nuxt 3</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();

const navigationItems = [
  { id: "home", path: "/", label: "Home" },
  { id: "case-studies", path: "/case-studies", label: "Work" },
  { id: "experiments", path: "/experiments", label: "Experiments" },
  { id: "about", path: "/about", label: "About" },
  { id: "contact", path: "/contact", label: "Contact" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
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
