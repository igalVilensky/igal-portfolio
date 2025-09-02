<template>
  <nav
    id="navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      colorMode.value === 'dark'
        ? 'bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 text-slate-300'
        : 'bg-gradient-to-br from-slate-50/95 via-white/95 to-blue-50/95 text-slate-700',
      isScrolled
        ? 'backdrop-blur-lg shadow-xl border-b-2 border-slate-200/50 dark:border-slate-700/50'
        : 'backdrop-blur-md shadow-lg border-b border-slate-200/30 dark:border-slate-700/30',
    ]"
  >
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0 group/logo">
          <NuxtLink
            to="#"
            @click="scrollToSection('top')"
            class="text-2xl font-bold tracking-tight"
            :class="
              colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
            "
          >
            <span
              class="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent relative group-hover/logo:scale-105 transition-transform duration-300"
            >
              Igal Vilensky
              <!-- Animated underline -->
              <div
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover/logo:w-full transition-all duration-500"
              ></div>
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-6">
            <div
              v-for="item in navigationItems"
              :key="item.id"
              class="relative group/nav-item"
            >
              <!-- Gradient border frame -->
              <div
                class="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 opacity-0 group-hover/nav-item:opacity-100 transition-all duration-300"
              >
                <div
                  class="rounded-xl h-full w-full"
                  :class="
                    colorMode.value === 'dark'
                      ? 'bg-slate-900/95'
                      : 'bg-white/95'
                  "
                ></div>
              </div>

              <button
                @click="scrollToSection(item.id)"
                class="relative z-10 px-4 py-2 rounded-xl text-sm font-medium transition-transform duration-300 group-hover/nav-item:scale-105 flex items-center gap-2"
                :class="[
                  colorMode.value === 'dark'
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-700 hover:text-slate-900',
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400'
                    : '',
                ]"
              >
                <i
                  :class="item.icon"
                  class="transition-all duration-300"
                  :style="
                    activeSection === item.id ? 'color: rgb(59, 130, 246)' : ''
                  "
                ></i>
                <span class="transition-all duration-300 whitespace-nowrap">
                  {{ $t(`nav.${item.id}`) }}
                </span>
              </button>

              <!-- Floating accent dot -->
              <div
                class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-0 group-hover/nav-item:opacity-100 group-hover/nav-item:scale-125 transition-all duration-300"
              ></div>
            </div>
          </div>
        </div>

        <!-- Desktop Right Side -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="relative group/lang-selector">
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl p-[1px] opacity-0 group-hover/lang-selector:opacity-100 transition-all duration-300"
            >
              <div
                class="rounded-xl h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'
                "
              ></div>
            </div>

            <button
              @click="toggleLanguageMenu"
              class="relative z-10 flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-transform duration-300 group-hover/lang-selector:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900',
              ]"
              aria-label="Select language"
            >
              <i
                class="fas fa-globe mr-1.5 group-hover/lang-selector:animate-spin transition-all duration-300"
              ></i>
              <span
                class="group-hover/lang-selector:tracking-wide transition-all duration-300 whitespace-nowrap"
              >
                {{
                  languages
                    .find(
                      (lang: { code: LanguageCode; name: string }) =>
                        lang.code === locale
                    )
                    ?.code.toUpperCase()
                }}
              </span>
            </button>

            <!-- Language Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-1"
            >
              <div
                v-show="isLanguageMenuOpen"
                class="absolute top-12 right-0 w-36 rounded-xl shadow-2xl border overflow-hidden backdrop-blur-lg"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-slate-800/95 border-slate-700/50 text-slate-300'
                    : 'bg-white/95 border-slate-200/50 text-slate-700',
                ]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-[1px]"
                >
                  <div
                    class="rounded-xl h-full w-full"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-slate-800/95'
                        : 'bg-white/95'
                    "
                  ></div>
                </div>

                <div class="relative z-10 p-1">
                  <NuxtLink
                    v-for="lang in languages"
                    :key="lang.code"
                    :to="switchLocalePath(lang.code)"
                    class="block w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-transform duration-300 hover:scale-105 relative group/lang-item"
                    :class="[
                      colorMode.value === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50',
                      locale === lang.code
                        ? colorMode.value === 'dark'
                          ? 'text-blue-400 bg-slate-700/30'
                          : 'text-blue-600 bg-blue-50/30'
                        : '',
                    ]"
                    @click="isLanguageMenuOpen = false"
                  >
                    {{ lang.name }}
                    <div
                      v-if="locale === lang.code"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"
                    ></div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Dark Mode Toggle -->
          <div class="relative group/dark-toggle">
            <div
              class="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-blue-500/30 rounded-full p-[2px] group-hover/dark-toggle:p-[3px] transition-all duration-300"
            >
              <div
                class="rounded-full h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'
                "
              ></div>
            </div>

            <button
              @click="toggleColorMode"
              class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-500 group-hover/dark-toggle:scale-110 group-hover/dark-toggle:rotate-12 animate-slide-up-delayed-3"
              :class="[
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-400'
                  : 'bg-gradient-to-r from-blue-400/20 to-blue-500/20 text-blue-500',
              ]"
              :title="
                colorMode.value === 'dark'
                  ? $t('nav.switchToLight')
                  : $t('nav.switchToDark')
              "
              aria-label="Toggle dark mode"
            >
              <i
                :class="
                  colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
                "
                class="text-lg group-hover/dark-toggle:animate-pulse transition-all duration-300"
              ></i>
            </button>

            <!-- Animated ring -->
            <div
              class="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full blur opacity-0 group-hover/dark-toggle:opacity-30 transition-opacity duration-500 animate-pulse-slow"
            ></div>
          </div>
        </div>

        <!-- Mobile Menu Controls -->
        <div class="md:hidden flex items-center space-x-3">
          <!-- Mobile Language Switcher -->
          <div class="relative group/lang-selector">
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full p-[1px] opacity-0 group-hover/lang-selector:opacity-100 transition-all duration-300"
            >
              <div
                class="rounded-full h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'
                "
              ></div>
            </div>

            <button
              @click="toggleLanguageMenu"
              class="relative z-10 flex items-center w-10 h-10 justify-center rounded-full transition-transform duration-300 group-hover/lang-selector:scale-110"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900',
              ]"
              aria-label="Select language"
            >
              <i
                class="fas fa-globe text-lg group-hover/lang-selector:animate-spin transition-all duration-300"
              ></i>
            </button>

            <!-- Mobile Language Dropdown -->
            <Transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95 translate-y-1"
              enter-to-class="opacity-100 scale-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100 translate-y-0"
              leave-to-class="opacity-0 scale-95 translate-y-1"
            >
              <div
                v-show="isLanguageMenuOpen"
                class="absolute top-12 right-0 w-36 rounded-xl shadow-2xl border overflow-hidden backdrop-blur-lg"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-slate-800/95 border-slate-700/50 text-slate-300'
                    : 'bg-white/95 border-slate-200/50 text-slate-700',
                ]"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-[1px]"
                >
                  <div
                    class="rounded-xl h-full w-full"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-slate-800/95'
                        : 'bg-white/95'
                    "
                  ></div>
                </div>

                <div class="relative z-10 p-1">
                  <NuxtLink
                    v-for="lang in languages"
                    :key="lang.code"
                    :to="switchLocalePath(lang.code)"
                    class="block w-full text-left px-3 py-2 text-xs font-medium rounded-lg transition-transform duration-300 hover:scale-105 relative group/lang-item"
                    :class="[
                      colorMode.value === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50',
                      locale === lang.code
                        ? colorMode.value === 'dark'
                          ? 'text-blue-400 bg-slate-700/30'
                          : 'text-blue-600 bg-blue-50/30'
                        : '',
                    ]"
                    @click="isLanguageMenuOpen = false"
                  >
                    {{ lang.name }}
                    <div
                      v-if="locale === lang.code"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full"
                    ></div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Mobile Dark Mode Toggle -->
          <div class="relative group/dark-toggle">
            <div
              class="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-blue-500/30 rounded-full p-[1px] group-hover/dark-toggle:p-[2px] transition-all duration-300"
            >
              <div
                class="rounded-full h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'
                "
              ></div>
            </div>

            <button
              @click="toggleColorMode"
              class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-transform duration-300 group-hover/dark-toggle:scale-110 group-hover/dark-toggle:rotate-12 animate-slide-up-delayed"
              :class="[
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 text-yellow-400'
                  : 'bg-gradient-to-r from-blue-400/20 to-blue-500/20 text-blue-500',
              ]"
              aria-label="Toggle dark mode"
            >
              <i
                :class="
                  colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
                "
                class="text-lg group-hover/dark-toggle:animate-pulse"
              ></i>
            </button>

            <!-- Animated ring -->
            <div
              class="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full blur opacity-0 group-hover/dark-toggle:opacity-30 transition-opacity duration-500 animate-pulse-slow"
            ></div>
          </div>

          <!-- Hamburger Button -->
          <div class="relative group/hamburger">
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl p-[1px] opacity-0 group-hover/hamburger:opacity-100 transition-all duration-300"
            >
              <div
                class="rounded-xl h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'
                "
              ></div>
            </div>

            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="relative z-10 p-2 rounded-xl transition-transform duration-300 group-hover/hamburger:scale-110"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900',
              ]"
              aria-label="Toggle mobile menu"
            >
              <i
                :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
                class="text-xl transition-transform duration-300 group-hover/hamburger:animate-pulse"
                :style="{
                  transform: isMobileMenuOpen
                    ? 'rotate(90deg)'
                    : 'rotate(0deg)',
                }"
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95 translate-y-2"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-2"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-16 right-4 left-4 rounded-2xl shadow-2xl border overflow-hidden backdrop-blur-lg"
        :class="[
          colorMode.value === 'dark'
            ? 'bg-slate-800/95 border-slate-700/50 text-slate-300'
            : 'bg-white/95 border-slate-200/50 text-slate-700',
        ]"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-[2px]"
        >
          <div
            class="rounded-2xl h-full w-full"
            :class="
              colorMode.value === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'
            "
          ></div>
        </div>

        <div class="relative z-10 px-4 pt-4 pb-6 space-y-2">
          <div
            v-for="item in navigationItems"
            :key="item.id"
            class="relative group/nav-item"
          >
            <div
              class="absolute inset-0 rounded-xl p-[1px] transition-all duration-300"
              :class="[
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 opacity-100'
                  : 'bg-gradient-to-r from-blue-500/50 to-cyan-500/50 opacity-0 group-hover/nav-item:opacity-100',
              ]"
            >
              <div
                class="rounded-xl h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-slate-800/95' : 'bg-white/95'
                "
              ></div>
            </div>

            <button
              @click="handleMobileNavClick(item.id)"
              class="relative z-10 w-full text-left flex items-center px-4 py-4 rounded-xl text-base font-medium transition-transform duration-300 group-hover/nav-item:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900',
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400'
                  : '',
              ]"
            >
              <i
                :class="item.icon"
                class="mr-4 w-5 transition-all duration-300"
                :style="
                  activeSection === item.id ? 'color: rgb(59, 130, 246)' : ''
                "
              ></i>
              <span
                class="group-hover/nav-item:tracking-wide transition-all duration-300 whitespace-nowrap"
              >
                {{ $t(`nav.${item.id}`) }}
              </span>
            </button>

            <!-- Floating accent -->
            <div
              class="absolute top-2 right-2 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-0 group-hover/nav-item:opacity-100 group-hover/nav-item:scale-125 transition-all duration-300"
            ></div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useSwitchLocalePath } from "#i18n";
import { useColorMode } from "#imports";

// i18n
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

// Dark mode
const colorMode = useColorMode();

// State
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref("");
const isLanguageMenuOpen = ref(false);

// Navigation items
const navigationItems = [
  { id: "about", icon: "fas fa-user" },
  { id: "skills", icon: "fas fa-code" },
  { id: "projects", icon: "fas fa-folder-open" },
  { id: "experience", icon: "fas fa-briefcase" },
  { id: "education", icon: "fas fa-graduation-cap" },
  { id: "contact", icon: "fas fa-envelope" },
];

// Available languages (sync with nuxt.config.ts i18n.locales)
type LanguageCode = "en" | "de" | "ru";
const languages: { code: LanguageCode; name: string }[] = [
  { code: "en", name: "English 🇬🇧" },
  { code: "de", name: "Deutsch 🇩🇪" },
  { code: "ru", name: "Русский 🇷🇺" },
];

// Dark mode toggle
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// Toggle language menu
const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
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
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  }
};

// Handle mobile nav click
const handleMobileNavClick = (sectionId: string) => {
  scrollToSection(sectionId);
  isMobileMenuOpen.value = false;
};

// Scroll detection
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isScrolled.value = scrollTop > 10;

  const sections = navigationItems.map((item) => item.id);
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar?.offsetHeight || 64;

  for (let i = sections.length - 1; i >= 0; i--) {
    const sectionId = sections[i];
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        if (scrollTop >= sectionTop && sections[i]) {
          const currentSection = sections[i];
          if (currentSection) {
            activeSection.value = currentSection;
            break;
          }
        }
      }
    }
  }
  if (scrollTop < 100) activeSection.value = "";
};

// Close menus when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  const nav = document.querySelector("nav");
  if (nav && !nav.contains(target)) {
    if (isMobileMenuOpen.value) isMobileMenuOpen.value = false;
    if (isLanguageMenuOpen.value) isLanguageMenuOpen.value = false;
  }
};

// Force re-render on color mode change to ensure consistent dark mode application
watch(
  () => colorMode.value,
  () => {
    // Trigger a re-render by updating a reactive property
    isScrolled.value = isScrolled.value;
  }
);

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleClickOutside);
  handleScroll();
  // Ensure initial color mode is applied
  colorMode.preference = colorMode.value;
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Custom Animations (matching Hero and Footer) */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(2deg);
  }
  66% {
    transform: translateY(5px) rotate(-1deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(-2deg);
  }
  66% {
    transform: translateY(8px) rotate(1deg);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

/* Animation Classes */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-slide-up-delayed {
  animation: slide-up 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-3 {
  animation: slide-up 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

/* Dark mode transitions */
.dark * {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, transform 0.3s ease;
}
</style>
