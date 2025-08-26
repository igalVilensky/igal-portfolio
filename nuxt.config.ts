// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxtjs/i18n"],
  i18n: {
    strategy: "prefix_except_default",
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English 🇬🇧" },
      { code: "de", iso: "de-DE", file: "de.json", name: "Deutsch 🇩🇪" },
      { code: "ru", iso: "ru-RU", file: "ru.json", name: "Русский 🇷🇺" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
  },
});
