<!-- app/components/Footer.vue -->
<template>
  <footer class="relative z-10 py-12 px-6 overflow-hidden">
    <div class="container mx-auto max-w-7xl relative z-10">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-start opacity-80 mb-12">

        <!-- Brand Section -->
        <div class="md:col-span-5 space-y-4 text-center md:text-left">
          <NuxtLink to="/" class="inline-block group">
            <span
              class="text-2xl font-display font-bold text-secondary-900 dark:text-white group-hover:text-primary-500 transition-colors uppercase tracking-widest">
              Igal Vilensky
            </span>
          </NuxtLink>
          <p class="text-sm text-secondary-600 dark:text-secondary-400 max-w-xs mx-auto md:mx-0 leading-tight">
            Engineering digital infrastructure // resilient systems.
          </p>
        </div>

        <!-- Sitemap -->
        <div class="md:col-span-3 md:col-start-7 text-center md:text-left">
          <h4 class="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary-400 mb-6">Sitemap</h4>
          <ul class="space-y-2">
            <li v-for="item in navigationItems" :key="item.id">
              <NuxtLink :to="item.path"
                class="text-xs text-secondary-600 dark:text-secondary-400 hover:text-primary-500 transition-colors">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact/Social -->
        <div class="md:col-span-3 text-center md:text-left">
          <h4 class="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary-400 mb-6">Connect</h4>
          <div class="space-y-4">
            <a href="mailto:vilenskyigal@gmail.com"
              class="block text-xs text-secondary-600 dark:text-secondary-400 hover:text-primary-500 transition-colors">
              vilenskyigal@gmail.com
            </a>
            <div class="flex justify-center md:justify-start gap-5">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                class="text-secondary-400 hover:text-primary-500 transition-colors" :aria-label="social.name">
                <i :class="social.icon" class="text-base"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-6 border-t border-secondary-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.4em] text-secondary-400/60">
        <p>© {{ currentYear }} Igal Vilensky</p>
        <div class="flex items-center gap-3">
          <span>Nuxt 4</span>
          <span class="w-1 h-1 rounded-full bg-primary-500/50"></span>
          <span>SSR</span>
        </div>
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
