<!-- app/components/Navbar.vue -->
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
    :class="[
      isScrolled
        ? 'glass py-4'
        : 'bg-transparent py-6',
    ]"
  >
    <div class="container mx-auto px-6">
      <div class="flex justify-between items-center">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink
            to="/"
            class="flex items-center gap-3 group"
            @click="closeMobileMenu"
          >
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300"
            >
              IV
            </div>
            <span class="text-xl font-display font-bold text-secondary-900 dark:text-white tracking-tight group-hover:text-primary-500 transition-colors">
              Igal Vilensky
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.id"
            :to="item.path"
            class="px-5 py-2.5 text-sm font-medium text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all rounded-full hover:bg-secondary-100 dark:hover:bg-white/5 relative group"
            :class="{
              'text-primary-600 dark:text-primary-400 bg-secondary-50 dark:bg-white/5':
                route.path === item.path,
            }"
          >
            {{ item.label }}
          </NuxtLink>
        </div>

        <!-- Desktop Right Side -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleColorMode"
            class="w-10 h-10 rounded-full flex items-center justify-center text-secondary-500 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-secondary-100 dark:hover:bg-white/5 transition-all"
            aria-label="Toggle dark mode"
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-lg"
            ></i>
          </button>

          <NuxtLink
            to="/contact"
            class="btn-primary text-sm px-6 py-2.5"
          >
            Let's Talk
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-4">
          <button
            @click="toggleColorMode"
            class="w-10 h-10 rounded-full flex items-center justify-center text-secondary-500 dark:text-secondary-400 hover:bg-secondary-100 dark:hover:bg-white/5 transition-all"
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-lg"
            ></i>
          </button>

          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-10 h-10 flex items-center justify-center text-secondary-900 dark:text-white hover:text-primary-500 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <i
              :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
              class="text-xl"
            ></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl border-b border-secondary-200 dark:border-white/5 shadow-xl"
      >
        <div class="container mx-auto px-6 py-6 space-y-2">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center justify-between px-4 py-4 text-lg font-medium text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-white/5 rounded-xl transition-all"
            :class="{
              'text-primary-600 dark:text-primary-400 bg-secondary-50 dark:bg-white/5':
                route.path === item.path,
            }"
            @click="closeMobileMenu"
          >
            <span>{{ item.label }}</span>
            <i class="fas fa-chevron-right text-xs opacity-50"></i>
          </NuxtLink>

          <div class="pt-4 mt-4 border-t border-secondary-100 dark:border-white/5">
            <NuxtLink
              to="/contact"
              class="flex items-center justify-center w-full btn-primary"
              @click="closeMobileMenu"
            >
              Start a Project
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import { useRoute } from "vue-router";

const colorMode = useColorMode();
const route = useRoute();

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const navigationItems = [
  { id: "home", path: "/", label: "Home" },
  { id: "case-studies", path: "/case-studies", label: "Work" },
  { id: "writing", path: "/writing", label: "Writing" },
  { id: "about", path: "/about", label: "About" },
];

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
