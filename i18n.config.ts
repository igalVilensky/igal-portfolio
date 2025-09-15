import { defineI18nConfig } from "@nuxtjs/i18n";

export default defineI18nConfig(() => ({
  legacy: false, // Use Composition API
  locale: "en", // Fallback locale
}));
