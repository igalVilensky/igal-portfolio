// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  colorMode: {
    preference: "system", // Default to user's system preference
    fallback: "light", // Fallback if no preference
    classSuffix: "", // Use plain 'dark' instead of 'dark-mode'
  },
});
