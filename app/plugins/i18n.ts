import { createI18n } from "vue-i18n";

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: "en", // Default locale on server
    fallbackLocale: "en",
    messages: {
      en: {
        nav: {
          about: "About",
          skills: "Skills",
          projects: "Projects",
          experience: "Experience",
          education: "Education",
          contact: "Contact",
          switchToLight: "Switch to light mode",
          switchToDark: "Switch to dark mode",
        },
        welcome: "Welcome to my portfolio",
      },
      de: {
        nav: {
          about: "Über mich",
          skills: "Fähigkeiten",
          projects: "Projekte",
          experience: "Erfahrung",
          education: "Ausbildung",
          contact: "Kontakt",
          switchToLight: "Zum Hellmodus wechseln",
          switchToDark: "Zum Dunkelmodus wechseln",
        },
        welcome: "Willkommen zu meinem Portfolio",
      },
      ru: {
        nav: {
          about: "Обо мне",
          skills: "Навыки",
          projects: "Проекты",
          experience: "Опыт",
          education: "Образование",
          contact: "Контакты",
          switchToLight: "Переключить на светлый режим",
          switchToDark: "Переключить на темный режим",
        },
        welcome: "Добро пожаловать в мое портфолио",
      },
    },
  });

  nuxtApp.vueApp.use(i18n);
  return {
    provide: {
      i18n,
    },
  };
});
