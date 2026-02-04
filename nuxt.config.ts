export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxtjs/i18n", '@vueuse/motion/nuxt'],
  i18n: {
    strategy: "prefix_except_default",
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English 🇬🇧" },
      { code: "de", iso: "de-DE", file: "de.json", name: "Deutsch 🇩🇪" },
      { code: "ru", iso: "ru-RU", file: "ru.json", name: "Русский 🇷🇺" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: false, // Disable cookie-based persistence
      redirectOn: "root",
      alwaysRedirect: false,
    },
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
    classSuffix: "",
  },
});
