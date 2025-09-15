<template>
  <nav
    id="navbar"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      colorMode.value === 'dark'
        ? 'bg-[#0D0F12]/95 text-white border-b border-[#1B2432]'
        : 'bg-gradient-to-br from-slate-50/95 via-white/95 to-blue-50/95 text-black border-b border-slate-200/30',
      isScrolled ? 'backdrop-blur-lg shadow-xl' : 'backdrop-blur-md shadow-lg',
    ]"
  >
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0 group/logo">
          <NuxtLink
            to="/"
            class="text-2xl font-bold tracking-tight"
            :class="
              colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-slate-900'
            "
            @click="isMobileMenuOpen = false"
          >
            <span
              class="relative group-hover/logo:scale-105 transition-transform duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'text-[#809FFF]'
                  : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'
              "
            >
              Igal Vilensky
              <!-- Animated underline -->
              <div
                class="absolute -bottom-1 left-0 w-0 h-0.5 group-hover/logo:w-full transition-all duration-500"
                :class="
                  colorMode.value === 'dark'
                    ? 'bg-[#F41A81]'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                "
              ></div>
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:block">
          <div class="ml-10 flex items-center space-x-6">
            <div
              v-for="item in navigationItems"
              :key="item.id"
              class="relative group/nav-item"
            >
              <!-- Gradient border frame -->
              <div
                class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/nav-item:opacity-100 transition-all duration-300"
                :class="
                  colorMode.value === 'dark'
                    ? 'bg-gradient-to-r from-[#809FFF]/30 via-[#F41A81]/30 to-[#809FFF]/30'
                    : 'bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30'
                "
              >
                <div
                  class="rounded-xl h-full w-full"
                  :class="
                    colorMode.value === 'dark'
                      ? 'bg-[#0D0F12]/95'
                      : 'bg-white/95'
                  "
                ></div>
              </div>

              <NuxtLink
                :to="item.path"
                class="relative z-10 px-4 py-2 rounded-xl text-sm font-medium transition-transform duration-300 group-hover/nav-item:scale-105 flex items-center gap-2"
                :class="[
                  colorMode.value === 'dark'
                    ? 'text-slate-300 hover:text-white'
                    : 'text-slate-700 hover:text-slate-900',
                  route.path === item.path
                    ? colorMode.value === 'dark'
                      ? 'bg-[#1B2432] text-[#809FFF] shadow-lg shadow-[#809FFF]/10'
                      : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600'
                    : '',
                ]"
                @click="isMobileMenuOpen = false"
              >
                <i
                  :class="item.icon"
                  class="transition-all duration-300"
                  :style="
                    route.path === item.path
                      ? colorMode.value === 'dark'
                        ? 'color: #809FFF'
                        : 'color: rgb(59, 130, 246)'
                      : ''
                  "
                ></i>
                <span class="transition-all duration-300 whitespace-nowrap">
                  {{ $t(`nav.${item.id}`) }}
                </span>
              </NuxtLink>

              <!-- Floating accent dot -->
              <div
                class="absolute top-1 right-1 w-2 h-2 rounded-full opacity-0 group-hover/nav-item:opacity-100 group-hover/nav-item:scale-125 transition-all duration-300"
                :class="
                  colorMode.value === 'dark'
                    ? 'bg-[#F41A81]'
                    : 'bg-gradient-to-br from-blue-400 to-cyan-500'
                "
              ></div>
            </div>
          </div>
        </div>

        <!-- Desktop Right Side -->
        <div class="hidden lg:flex items-center space-x-4">
          <!-- Language Switcher -->
          <div class="relative group/lang-selector">
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/lang-selector:opacity-100 transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-[#809FFF]/30 to-[#F41A81]/30'
                  : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30'
              "
            >
              <div
                class="rounded-xl h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-[#0D0F12]/95' : 'bg-white/95'
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
                :class="colorMode.value === 'dark' ? 'text-[#809FFF]' : ''"
              ></i>
              <span
                class="group-hover/lang-selector:tracking-wide transition-all duration-300 whitespace-nowrap"
              >
                {{
                  languages
                    .find((lang) => lang.code === locale)
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
                    ? 'bg-[#1B2432]/95 border-[#809FFF]/20 text-slate-300'
                    : 'bg-white/95 border-slate-200/50 text-slate-700',
                ]"
              >
                <div
                  class="absolute inset-0 rounded-xl p-[1px]"
                  :class="
                    colorMode.value === 'dark'
                      ? 'bg-gradient-to-br from-[#809FFF]/20 to-[#F41A81]/20'
                      : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
                  "
                >
                  <div
                    class="rounded-xl h-full w-full"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-[#1B2432]/95'
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
                        ? 'text-slate-300 hover:text-white hover:bg-[#0D0F12]/50'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50',
                      locale === lang.code
                        ? colorMode.value === 'dark'
                          ? 'text-[#809FFF] bg-[#0D0F12]/30'
                          : 'text-blue-600 bg-blue-50/30'
                        : '',
                    ]"
                    @click="handleLanguageSwitch(lang.code)"
                  >
                    {{ lang.name }}
                    <div
                      v-if="locale === lang.code"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full"
                      :class="
                        colorMode.value === 'dark'
                          ? 'bg-[#F41A81]'
                          : 'bg-gradient-to-br from-blue-400 to-cyan-500'
                      "
                    ></div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Dark Mode Toggle -->
          <div class="relative group/dark-toggle">
            <button
              @click="toggleColorMode"
              class="relative w-8 h-8 rounded-full p-1 transition-all duration-700 ease-in-out transform hover:scale-110"
              :class="[
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-br from-[#809FFF] to-[#F41A81] shadow-lg shadow-[#F41A81]/25'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25',
              ]"
              :title="
                colorMode.value === 'dark'
                  ? $t('nav.switchToLight')
                  : $t('nav.switchToDark')
              "
            >
              <div
                class="relative w-full h-full flex items-center justify-center"
              >
                <!-- Sun Icon -->
                <div
                  class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                  :class="[
                    colorMode.value === 'dark'
                      ? 'opacity-0 rotate-180 scale-50'
                      : 'opacity-100 rotate-0 scale-100',
                  ]"
                >
                  <i class="fas fa-sun text-white text-lg animate-pulse"></i>
                  <!-- Sun rays -->
                  <div class="absolute inset-0">
                    <div
                      v-for="i in 8"
                      :key="`ray-${i}`"
                      class="absolute w-0.5 h-2 bg-white rounded-full opacity-60"
                      :style="{
                        transform: `rotate(${i * 45}deg)`,
                        top: '-4px',
                        left: '50%',
                        marginLeft: '-1px',
                      }"
                    ></div>
                  </div>
                </div>

                <!-- Moon Icon -->
                <div
                  class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                  :class="[
                    colorMode.value === 'dark'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-180 scale-50',
                  ]"
                >
                  <i class="fas fa-moon text-[#FDDC00] text-lg"></i>
                  <!-- Stars around moon -->
                  <div
                    v-for="star in 3"
                    :key="`star-${star}`"
                    class="absolute w-1 h-1 bg-[#FDDC00] rounded-full animate-twinkle"
                    :style="{
                      top: `${15 + star * 10}%`,
                      right: `${10 + star * 8}%`,
                      animationDelay: `${star * 0.5}s`,
                    }"
                  ></div>
                </div>
              </div>

              <!-- Hover glow effect -->
              <div
                class="absolute -inset-2 rounded-full opacity-0 group-hover/dark-toggle:opacity-100 transition-opacity duration-500 blur-sm"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-[#F41A81]/30'
                    : 'bg-amber-400/30',
                ]"
              ></div>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Controls -->
        <div class="lg:hidden flex items-center space-x-3">
          <!-- Mobile Language Switcher -->
          <div class="relative group/lang-selector">
            <div
              class="absolute inset-0 rounded-full p-[1px] opacity-0 group-hover/lang-selector:opacity-100 transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-[#809FFF]/30 to-[#F41A81]/30'
                  : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30'
              "
            >
              <div
                class="rounded-full h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-[#0D0F12]/95' : 'bg-white/95'
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
                :class="colorMode.value === 'dark' ? 'text-[#809FFF]' : ''"
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
                    ? 'bg-[#1B2432]/95 border-[#809FFF]/20 text-slate-300'
                    : 'bg-white/95 border-slate-200/50 text-slate-700',
                ]"
              >
                <div
                  class="absolute inset-0 rounded-xl p-[1px]"
                  :class="
                    colorMode.value === 'dark'
                      ? 'bg-gradient-to-br from-[#809FFF]/20 to-[#F41A81]/20'
                      : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
                  "
                >
                  <div
                    class="rounded-xl h-full w-full"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-[#1B2432]/95'
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
                        ? 'text-slate-300 hover:text-white hover:bg-[#0D0F12]/50'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50',
                      locale === lang.code
                        ? colorMode.value === 'dark'
                          ? 'text-[#809FFF] bg-[#0D0F12]/30'
                          : 'text-blue-600 bg-blue-50/30'
                        : '',
                    ]"
                    @click="handleLanguageSwitch(lang.code)"
                  >
                    {{ lang.name }}
                    <div
                      v-if="locale === lang.code"
                      class="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full"
                      :class="
                        colorMode.value === 'dark'
                          ? 'bg-[#F41A81]'
                          : 'bg-gradient-to-br from-blue-400 to-cyan-500'
                      "
                    ></div>
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Mobile Dark Mode Toggle -->
          <div class="relative group/dark-toggle">
            <button
              @click="toggleColorMode"
              class="relative w-6 h-6 rounded-full p-2 transition-all duration-700 ease-in-out transform hover:scale-110"
              :class="[
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-br from-[#809FFF] to-[#F41A81] shadow-lg shadow-[#F41A81]/25'
                  : 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25',
              ]"
              :title="
                colorMode.value === 'dark'
                  ? $t('nav.switchToLight')
                  : $t('nav.switchToDark')
              "
            >
              <div
                class="relative w-full h-full flex items-center justify-center"
              >
                <!-- Sun Icon -->
                <div
                  class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                  :class="[
                    colorMode.value === 'dark'
                      ? 'opacity-0 rotate-180 scale-50'
                      : 'opacity-100 rotate-0 scale-100',
                  ]"
                >
                  <i class="fas fa-sun text-white text-lg animate-pulse"></i>
                  <!-- Sun rays -->
                  <div class="absolute inset-0">
                    <div
                      v-for="i in 8"
                      :key="`ray-${i}`"
                      class="absolute w-0.5 h-2 bg-white rounded-full opacity-60"
                      :style="{
                        transform: `rotate(${i * 45}deg)`,
                        top: '-4px',
                        left: '50%',
                        marginLeft: '-1px',
                      }"
                    ></div>
                  </div>
                </div>

                <!-- Moon Icon -->
                <div
                  class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out"
                  :class="[
                    colorMode.value === 'dark'
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-180 scale-50',
                  ]"
                >
                  <i class="fas fa-moon text-[#FDDC00] text-lg"></i>
                  <!-- Stars around moon -->
                  <div
                    v-for="star in 3"
                    :key="`star-${star}`"
                    class="absolute w-1 h-1 bg-[#FDDC00] rounded-full animate-twinkle"
                    :style="{
                      top: `${15 + star * 10}%`,
                      right: `${10 + star * 8}%`,
                      animationDelay: `${star * 0.5}s`,
                    }"
                  ></div>
                </div>
              </div>

              <!-- Hover glow effect -->
              <div
                class="absolute -inset-2 rounded-full opacity-0 group-hover/dark-toggle:opacity-100 transition-opacity duration-500 blur-sm"
                :class="[
                  colorMode.value === 'dark'
                    ? 'bg-[#F41A81]/30'
                    : 'bg-amber-400/30',
                ]"
              ></div>
            </button>
          </div>

          <!-- Hamburger Button -->
          <div class="relative group/hamburger">
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/hamburger:opacity-100 transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-[#809FFF]/30 to-[#F41A81]/30'
                  : 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30'
              "
            >
              <div
                class="rounded-xl h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-[#0D0F12]/95' : 'bg-white/95'
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
            ? 'bg-[#1B2432]/95 border-[#809FFF]/20 text-slate-300'
            : 'bg-white/95 border-slate-200/50 text-slate-700',
        ]"
      >
        <div
          class="absolute inset-0 rounded-2xl p-[2px]"
          :class="
            colorMode.value === 'dark'
              ? 'bg-gradient-to-br from-[#809FFF]/20 to-[#F41A81]/20'
              : 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
          "
        >
          <div
            class="rounded-2xl h-full w-full"
            :class="
              colorMode.value === 'dark' ? 'bg-[#1B2432]/95' : 'bg-white/95'
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
                route.path === item.path
                  ? colorMode.value === 'dark'
                    ? 'bg-gradient-to-r from-[#809FFF] to-[#F41A81] opacity-100'
                    : 'bg-gradient-to-r from-blue-500 to-cyan-500 opacity-100'
                  : colorMode.value === 'dark'
                  ? 'bg-gradient-to-r from-[#809FFF]/50 to-[#F41A81]/50 opacity-0 group-hover/nav-item:opacity-100'
                  : 'bg-gradient-to-r from-blue-500/50 to-cyan-500/50 opacity-0 group-hover/nav-item:opacity-100',
              ]"
            >
              <div
                class="rounded-xl h-full w-full"
                :class="
                  colorMode.value === 'dark' ? 'bg-[#1B2432]/95' : 'bg-white/95'
                "
              ></div>
            </div>

            <NuxtLink
              :to="item.path"
              class="relative z-10 w-full text-left flex items-center px-4 py-4 rounded-xl text-base font-medium transition-transform duration-300 group-hover/nav-item:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-700 hover:text-slate-900',
                route.path === item.path
                  ? colorMode.value === 'dark'
                    ? 'bg-[#0D0F12]/50 text-[#809FFF]'
                    : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-600'
                  : '',
              ]"
              @click="isMobileMenuOpen = false"
            >
              <i
                :class="item.icon"
                class="mr-4 w-5 transition-all duration-300"
                :style="
                  route.path === item.path
                    ? colorMode.value === 'dark'
                      ? 'color: #809FFF'
                      : 'color: rgb(59, 130, 246)'
                    : ''
                "
              ></i>
              <span
                class="group-hover/nav-item:tracking-wide transition-all duration-300 whitespace-nowrap"
              >
                {{ $t(`nav.${item.id}`) }}
              </span>
            </NuxtLink>

            <!-- Floating accent -->
            <div
              class="absolute top-2 right-2 w-2 h-2 rounded-full opacity-0 group-hover/nav-item:opacity-100 group-hover/nav-item:scale-125 transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-[#F41A81]'
                  : 'bg-gradient-to-br from-blue-400 to-cyan-500'
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
import { useRoute } from "vue-router";

// i18n
const { locale, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

// Dark mode
const colorMode = useColorMode();

// Route
const route = useRoute();

// State
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const isLanguageMenuOpen = ref(false);

// Navigation items
const navigationItems = [
  { id: "home", path: "/", icon: "fas fa-home" },
  { id: "about", path: "/about", icon: "fas fa-user" },
  { id: "projects", path: "/projects", icon: "fas fa-folder-open" },
  { id: "education", path: "/education", icon: "fas fa-graduation-cap" },
  { id: "experience", path: "/experience", icon: "fas fa-briefcase" },
];

// Available languages
type LanguageCode = "en" | "de" | "ru";
const languages: { code: LanguageCode; name: string }[] = [
  { code: "en", name: "English 🇬🇧" },
  { code: "de", name: "Deutsch 🇩🇪" },
  { code: "ru", name: "Русский 🇷🇺" },
];

// Initialize locale from localStorage
const initLocale = () => {
  const savedLocale = localStorage.getItem("i18n_locale");
  if (savedLocale && ["en", "de", "ru"].includes(savedLocale)) {
    setLocale(savedLocale as LanguageCode);
  }
};

// Dark mode toggle
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// Toggle language menu
const toggleLanguageMenu = () => {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
};

// Handle language switch
const handleLanguageSwitch = async (langCode: LanguageCode) => {
  await setLocale(langCode); // Update i18n locale

  localStorage.setItem("i18n_locale", langCode); // Save to localStorage
  isLanguageMenuOpen.value = false;
};

// Scroll detection for navbar shadow
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isScrolled.value = scrollTop > 10;
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

// Watch route changes to sync locale
watch(
  () => route.path,
  () => {
    initLocale(); // Re-sync locale on route change
  }
);

onMounted(() => {
  initLocale(); // Set initial locale
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
/* Custom Animations */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Animation Classes */
.animate-spin-slow {
  animation: spin-slow 3s linear infinite;
}

.animate-twinkle {
  animation: twinkle 2s ease-in-out infinite;
}

/* Dark mode transitions */
.dark * {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, transform 0.3s ease;
}

/* Additional custom styles for the Josh Comeau inspired design */
@media (prefers-reduced-motion: no-preference) {
  .group\/nav-item:hover .animate-pulse {
    animation-duration: 1.5s;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .w-16 {
    width: 3.5rem;
  }
  .h-16 {
    height: 3.5rem;
  }
  .w-14 {
    width: 3rem;
  }
  .h-14 {
    height: 3rem;
  }
}

@supports not (background-clip: text) {
  .bg-clip-text {
    background: none;
    color: #809fff;
  }
}

/* Enhanced focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #809fff;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Smooth transitions for all interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom backdrop blur fallback */
@supports not (backdrop-filter: blur(12px)) {
  .backdrop-blur-lg {
    background-color: #0d0f12;
    background-color: rgba(13, 15, 18, 0.9);
  }

  .backdrop-blur-md {
    background-color: #0d0f12;
    background-color: rgba(13, 15, 18, 0.8);
  }
}
</style>
