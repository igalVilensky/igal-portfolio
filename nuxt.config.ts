// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxtjs/i18n"],
  i18n: {
    langDir: "locales/",
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English 🇬🇧" },
      { code: "de", iso: "de-DE", file: "de.json", name: "Deutsch 🇩🇪" },
      { code: "ru", iso: "ru-RU", file: "ru.json", name: "Русский 🇷🇺" },
    ],
    defaultLocale: "en",
  },

  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
});
