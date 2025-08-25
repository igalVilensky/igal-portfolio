<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      colorMode.value === 'dark'
        ? 'bg-gray-900/95 border-gray-700'
        : 'bg-white/95 border-gray-200',
      isScrolled
        ? 'backdrop-blur-md shadow-2xl border-b-2'
        : 'backdrop-blur-sm shadow-lg border-b',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Enhanced Logo/Brand -->
        <div class="flex-shrink-0 group">
          <div class="relative">
            <NuxtLink
              to="#"
              @click="scrollToSection('top')"
              class="text-2xl font-black transition-all duration-300 hover:scale-105"
              :class="
                colorMode.value === 'dark' ? 'text-white' : 'text-gray-900'
              "
            >
              <span
                class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent relative"
              >
                Igal Vilensky
                <!-- Animated underline -->
                <div
                  class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-purple-600 group-hover:w-full transition-all duration-500"
                ></div>
              </span>
            </NuxtLink>

            <!-- Floating accent -->
            <div
              class="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-teal-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
            ></div>
          </div>
        </div>

        <!-- Enhanced Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-2">
            <div
              v-for="item in navigationItems"
              :key="item.id"
              class="relative group"
            >
              <!-- Gradient border frame for active/hover state -->
              <div
                class="absolute inset-0 rounded-lg p-[1px] transition-all duration-300"
                :class="[
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-teal-500 to-purple-600 opacity-100'
                    : 'bg-gradient-to-r from-teal-500/50 to-purple-600/50 opacity-0 group-hover:opacity-100',
                ]"
              >
                <div
                  class="rounded-lg h-full w-full"
                  :class="
                    colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-white'
                  "
                ></div>
              </div>

              <button
                @click="scrollToSection(item.id)"
                class="relative z-10 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                :class="[
                  colorMode.value === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900',
                  activeSection === item.id
                    ? 'text-teal-600 dark:text-teal-400'
                    : '',
                ]"
              >
                <i
                  :class="item.icon"
                  class="transition-all duration-300"
                  :style="
                    activeSection === item.id ? 'color: rgb(20 184 166)' : ''
                  "
                ></i>
                <span
                  class="group-hover:tracking-wide transition-all duration-300"
                >
                  {{ $t(`nav.${item.id}`) }}
                </span>
              </button>

              <!-- Floating accent dot -->
              <div
                class="absolute top-1 right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
                :class="
                  activeSection === item.id
                    ? 'bg-gradient-to-br from-teal-400 to-purple-600 opacity-70'
                    : 'bg-gradient-to-br from-teal-400 to-purple-600'
                "
              ></div>
            </div>
          </div>
        </div>

        <!-- Enhanced Desktop Right Side -->
        <div class="hidden md:flex items-center space-x-3">
          <!-- Enhanced Language Switcher -->
          <div class="relative group">
            <!-- Gradient border frame -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-purple-600/30 rounded-lg p-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div
                class="rounded-lg h-full w-full"
                :class="colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-white'"
              ></div>
            </div>

            <button
              @click="toggleLanguageMenu"
              class="relative z-10 flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900',
              ]"
              aria-label="Select language"
            >
              <i
                class="fas fa-globe mr-2 group-hover:animate-spin transition-all duration-300"
              ></i>
              <span
                class="group-hover:tracking-wide transition-all duration-300"
              >
                {{ languages.find((lang) => lang.code === locale)?.name }}
              </span>
            </button>

            <!-- Enhanced Language Dropdown -->
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
                class="absolute top-12 right-0 w-40 rounded-xl shadow-2xl border overflow-hidden"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-gray-800/95 border-gray-600'
                    : 'bg-white/95 border-gray-300',
                ]"
                style="backdrop-filter: blur(16px)"
              >
                <!-- Gradient border for dropdown -->
                <div
                  class="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-xl p-[1px]"
                >
                  <div
                    class="rounded-xl h-full w-full"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-gray-800/95'
                        : 'bg-white/95'
                    "
                  ></div>
                </div>

                <div class="relative z-10 p-1">
                  <NuxtLink
                    v-for="lang in languages"
                    :key="lang.code"
                    :to="switchLocalePath(lang.code)"
                    class="block w-full text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 hover:scale-105 relative group/lang"
                    :class="[
                      colorMode.value === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50',
                      locale === lang.code
                        ? colorMode.value === 'dark'
                          ? 'text-teal-400 bg-gray-700/30'
                          : 'text-teal-600 bg-teal-50/30'
                        : '',
                    ]"
                    @click="isLanguageMenuOpen = false"
                  >
                    {{ lang.name }}
                    <!-- Active indicator -->
                    <div
                      v-if="locale === lang.code"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-teal-400 to-purple-600 rounded-full"
                    ></div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>

            <!-- Floating accent -->
            <div
              class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-teal-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
            ></div>
          </div>

          <!-- Enhanced Dark Mode Toggle -->
          <div class="relative group">
            <!-- Gradient border frame -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-blue-600/30 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
            >
              <div
                class="rounded-full h-full w-full"
                :class="colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-white'"
              ></div>
            </div>

            <button
              @click="toggleColorMode"
              class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 hover:scale-110 hover:rotate-12"
              :class="[
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400 hover:from-yellow-400/30 hover:to-yellow-600/30'
                  : 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-600 hover:from-blue-500/30 hover:to-blue-600/30',
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
                class="text-lg group-hover:animate-pulse transition-all duration-300"
              ></i>
            </button>

            <!-- Floating accent -->
            <div
              class="absolute top-0 right-0 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-br from-yellow-200 to-white'
                  : 'bg-gradient-to-br from-blue-200 to-white'
              "
            ></div>
          </div>
        </div>

        <!-- Enhanced Mobile menu controls -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Enhanced Mobile Language Switcher -->
          <div class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-purple-600/30 rounded-full p-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div
                class="rounded-full h-full w-full"
                :class="colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-white'"
              ></div>
            </div>

            <button
              @click="toggleLanguageMenu"
              class="relative z-10 flex items-center w-10 h-10 justify-center rounded-full transition-all duration-300 hover:scale-110"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900',
              ]"
              aria-label="Select language"
            >
              <i class="fas fa-globe text-lg group-hover:animate-spin"></i>
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
                class="absolute top-12 right-0 w-40 rounded-xl shadow-2xl border overflow-hidden"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-gray-800/95 border-gray-600'
                    : 'bg-white/95 border-gray-300',
                ]"
                style="backdrop-filter: blur(16px)"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-xl p-[1px]"
                >
                  <div
                    class="rounded-xl h-full w-full"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-gray-800/95'
                        : 'bg-white/95'
                    "
                  ></div>
                </div>

                <div class="relative z-10 p-1">
                  <NuxtLink
                    v-for="lang in languages"
                    :key="lang.code"
                    :to="switchLocalePath(lang.code)"
                    class="block w-full text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 relative"
                    :class="[
                      colorMode.value === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50',
                      locale === lang.code
                        ? colorMode.value === 'dark'
                          ? 'text-teal-400 bg-gray-700/30'
                          : 'text-teal-600 bg-teal-50/30'
                        : '',
                    ]"
                    @click="isLanguageMenuOpen = false"
                  >
                    {{ lang.name }}
                    <div
                      v-if="locale === lang.code"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-teal-400 to-purple-600 rounded-full"
                    ></div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Enhanced Mobile Dark Mode Toggle -->
          <div class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-blue-600/30 rounded-full p-[1px] group-hover:p-[2px] transition-all duration-300"
            >
              <div
                class="rounded-full h-full w-full"
                :class="colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-white'"
              ></div>
            </div>

            <button
              @click="toggleColorMode"
              class="relative z-10 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12"
              :class="[
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-400'
                  : 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-600',
              ]"
              aria-label="Toggle dark mode"
            >
              <i
                :class="
                  colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'
                "
                class="text-lg group-hover:animate-pulse"
              ></i>
            </button>
          </div>

          <!-- Enhanced Hamburger Button -->
          <div class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-purple-600/30 rounded-md p-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div
                class="rounded-md h-full w-full"
                :class="colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-white'"
              ></div>
            </div>

            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="relative z-10 p-2 rounded-md transition-all duration-300 hover:scale-110"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900',
              ]"
              aria-label="Toggle mobile menu"
            >
              <i
                :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
                class="text-xl transition-transform duration-300 group-hover:animate-pulse"
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

    <!-- Enhanced Mobile Navigation Menu -->
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
        class="md:hidden absolute top-16 right-4 left-4 rounded-2xl shadow-2xl border overflow-hidden"
        :class="[
          colorMode.value === 'dark'
            ? 'bg-gray-800/95 border-gray-600'
            : 'bg-white/95 border-gray-300',
        ]"
        style="backdrop-filter: blur(16px)"
      >
        <!-- Gradient border for mobile menu -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-purple-600/30 rounded-2xl p-[2px]"
        >
          <div
            class="rounded-2xl h-full w-full"
            :class="
              colorMode.value === 'dark' ? 'bg-gray-800/95' : 'bg-white/95'
            "
          ></div>
        </div>

        <div class="relative z-10 px-4 pt-4 pb-6 space-y-2">
          <div
            v-for="item in navigationItems"
            :key="item.id"
            class="relative group"
          >
            <!-- Individual item border frame -->
            <div
              class="absolute inset-0 rounded-xl p-[1px] transition-all duration-300"
              :class="[
                activeSection === item.id
                  ? 'bg-gradient-to-r from-teal-500 to-purple-600 opacity-100'
                  : 'bg-gradient-to-r from-teal-500/50 to-purple-600/50 opacity-0 group-hover:opacity-100',
              ]"
            >
              <div
                class="rounded-xl h-full w-full"
                :class="colorMode.value === 'dark' ? 'bg-gray-800' : 'bg-white'"
              ></div>
            </div>

            <button
              @click="handleMobileNavClick(item.id)"
              class="relative z-10 w-full text-left flex items-center px-4 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-700 hover:text-gray-900',
                activeSection === item.id
                  ? 'text-teal-600 dark:text-teal-400'
                  : '',
              ]"
            >
              <i
                :class="item.icon"
                class="mr-4 w-5 transition-all duration-300"
                :style="
                  activeSection === item.id ? 'color: rgb(20 184 166)' : ''
                "
              ></i>
              <span
                class="group-hover:tracking-wide transition-all duration-300"
              >
                {{ $t(`nav.${item.id}`) }}
              </span>
            </button>

            <!-- Floating accent -->
            <div
              class="absolute top-2 right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
              :class="
                activeSection === item.id
                  ? 'bg-gradient-to-br from-teal-400 to-purple-600 opacity-70'
                  : 'bg-gradient-to-br from-teal-400 to-purple-600'
              "
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

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});
</script>
