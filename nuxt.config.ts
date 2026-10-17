import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxtjs/i18n", '@vueuse/motion/nuxt',
    function designLab(_options, nuxt) {
      // Register both standalone routes for development and production.
      nuxt.hook('pages:extend', (pages) => {
        pages.push({ name: 'spatial-home', path: '/spatial-home', file: fileURLToPath(new URL('./app/spatial-home/SpatialHome.vue', import.meta.url)) });
        pages.push({ name: 'design-lab', path: '/design-lab', file: fileURLToPath(new URL('./app/design-lab/Lab.vue', import.meta.url)) });
      });
    },
  ],
  nitro: {
    prerender: { routes: ['/spatial-home', '/de/spatial-home', '/ru/spatial-home', '/design-lab'] },
  },
  i18n: {
    strategy: "prefix_except_default",
    baseUrl: "https://igalvilensky.netlify.app",
    locales: [
      { code: "en", iso: "en-US", language: "en-US", name: "English" },
      { code: "de", iso: "de-DE", language: "de-DE", name: "Deutsch" },
      { code: "ru", iso: "ru-RU", language: "ru-RU", name: "Русский" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
    },
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
    classSuffix: "",
    storageKey: 'nuxt-color-mode'
  },
});
