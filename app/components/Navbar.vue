<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      colorMode.value === 'dark'
        ? 'bg-gray-900/95 border-gray-700'
        : 'bg-white/95 border-gray-200',
      isScrolled ? 'backdrop-blur-md shadow-lg border-b' : 'backdrop-blur-sm',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink
            to="#"
            @click="scrollToSection('top')"
            class="text-2xl font-black"
            :class="colorMode.value === 'dark' ? 'text-white' : 'text-gray-900'"
          >
            <span
              class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent"
            >
              Igal Vilensky
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <button
              v-for="item in navigationItems"
              :key="item.id"
              @click="scrollToSection(item.id)"
              class="px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
                activeSection === item.id
                  ? colorMode.value === 'dark'
                    ? 'text-teal-400 bg-gray-800'
                    : 'text-teal-600 bg-teal-50'
                  : '',
              ]"
            >
              <i :class="item.icon" class="mr-2"></i>
              {{ t(`nav.${item.id}`) }}
            </button>
          </div>
        </div>

        <!-- Desktop Right Side - Dark Mode Toggle and Language Switcher -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="relative">
            <button
              @click="toggleLanguageMenu"
              class="flex items-center px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
              ]"
              aria-label="Select language"
            >
              <i class="fas fa-globe mr-2"></i>
              {{
                languages.find((lang) => lang.code === currentLanguage)?.name
              }}
            </button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-show="isLanguageMenuOpen"
                class="absolute top-12 right-0 w-32 rounded-lg shadow-xl border overflow-hidden"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-gray-800/95 border-gray-700'
                    : 'bg-white/95 border-gray-200',
                ]"
                style="backdrop-filter: blur(12px)"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="setLanguage(lang.code)"
                  class="w-full text-left block px-4 py-2 text-sm font-semibold transition-all duration-200"
                  :class="[
                    colorMode.value === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
                    currentLanguage === lang.code
                      ? colorMode.value === 'dark'
                        ? 'text-teal-400 bg-gray-700'
                        : 'text-teal-600 bg-teal-50'
                      : '',
                  ]"
                >
                  {{ lang.name }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleColorMode"
            class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
            :class="[
              colorMode.value === 'dark'
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            :title="
              colorMode.value === 'dark'
                ? t('nav.switchToLight')
                : t('nav.switchToDark')
            "
            aria-label="Toggle dark mode"
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-lg"
            ></i>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Mobile Language Switcher -->
          <div class="relative">
            <button
              @click="toggleLanguageMenu"
              class="flex items-center w-10 h-10 justify-center rounded-full transition-all duration-200"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
              ]"
              aria-label="Select language"
            >
              <i class="fas fa-globe text-lg"></i>
            </button>
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-show="isLanguageMenuOpen"
                class="absolute top-12 right-0 w-32 rounded-lg shadow-xl border overflow-hidden"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-gray-800/95 border-gray-700'
                    : 'bg-white/95 border-gray-200',
                ]"
                style="backdrop-filter: blur(12px)"
              >
                <button
                  v-for="lang in languages"
                  :key="lang.code"
                  @click="setLanguage(lang.code)"
                  class="w-full text-left block px-4 py-2 text-sm font-semibold transition-all duration-200"
                  :class="[
                    colorMode.value === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
                    currentLanguage === lang.code
                      ? colorMode.value === 'dark'
                        ? 'text-teal-400 bg-gray-700'
                        : 'text-teal-600 bg-teal-50'
                      : '',
                  ]"
                >
                  {{ lang.name }}
                </button>
              </div>
            </Transition>
          </div>

          <!-- Mobile Dark Mode Toggle -->
          <button
            @click="toggleColorMode"
            class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
            :class="[
              colorMode.value === 'dark'
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            aria-label="Toggle dark mode"
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-lg"
            ></i>
          </button>

          <!-- Hamburger Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-md transition-all duration-200"
            :class="[
              colorMode.value === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
            ]"
            aria-label="Toggle mobile menu"
          >
            <i
              :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
              class="text-xl transition-transform duration-200"
            ></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-16 right-4 left-4 rounded-lg shadow-xl border overflow-hidden"
        :class="[
          colorMode.value === 'dark'
            ? 'bg-gray-800/95 border-gray-700'
            : 'bg-white/95 border-gray-200',
        ]"
        style="backdrop-filter: blur(12px)"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <button
            v-for="item in navigationItems"
            :key="item.id"
            @click="handleMobileNavClick(item.id)"
            class="w-full text-left block px-3 py-3 rounded-md text-base font-semibold transition-all duration-200"
            :class="[
              colorMode.value === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
              activeSection === item.id
                ? colorMode.value === 'dark'
                  ? 'text-teal-400 bg-gray-700'
                  : 'text-teal-600 bg-teal-50'
                : '',
            ]"
          >
            <i :class="item.icon" class="mr-3 w-4"></i>
            {{ t(`nav.${item.id}`) }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import { useI18n } from "vue-i18n";

// Initialize reactive state
const { t, locale } = useI18n();
const colorMode = useColorMode();
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref("");
const isLanguageMenuOpen = ref(false);
const currentLanguage = ref("en"); // Default to 'en' on server

// Navigation items (without translations, as they come from i18n)
const navigationItems = [
  { id: "about", icon: "fas fa-user" },
  { id: "skills", icon: "fas fa-code" },
  { id: "projects", icon: "fas fa-folder-open" },
  { id: "experience", icon: "fas fa-briefcase" },
  { id: "education", icon: "fas fa-graduation-cap" },
  { id: "contact", icon: "fas fa-envelope" },
];

// Language options
const languages = [
  { code: "en", name: "English 🇬🇧" },
  { code: "de", name: "Deutsch 🇩🇪" },
  { code: "ru", name: "Русский 🇷🇺" },
];

// Toggle dark mode
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// Toggle language menu
const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
};

// Set language
const setLanguage = (code: string) => {
  currentLanguage.value = code;
  if (process.client) {
    localStorage.setItem("language", code);
  }
  locale.value = code; // Update i18n locale
  isLanguageMenuOpen.value = false;
};

// Scroll to section
const scrollToSection = (sectionId: string) => {
  if (sectionId === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 64;
    const elementPosition = element.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

// Handle mobile nav click
const handleMobileNavClick = (sectionId: string) => {
  scrollToSection(sectionId);
  isMobileMenuOpen.value = false;
};

// Handle scroll events
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isScrolled.value = scrollTop > 10;

  const sections = navigationItems.map((item) => item.id);
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar?.offsetHeight || 64;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      if (scrollTop >= sectionTop) {
        activeSection.value = sections[i];
        break;
      }
    }
  }

  if (scrollTop < 100) {
    activeSection.value = "";
  }
};

// Close mobile menu and language menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  const nav = document.querySelector("nav");

  if (nav && !nav.contains(target)) {
    if (isMobileMenuOpen.value) isMobileMenuOpen.value = false;
    if (isLanguageMenuOpen.value) isLanguageMenuOpen.value = false;
  }
};

// Initialize language on client side
onMounted(() => {
  if (process.client) {
    const savedLanguage = localStorage.getItem("language") || "en";
    currentLanguage.value = savedLanguage;
    locale.value = savedLanguage; // Update i18n locale
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});
</script>
