<!-- app/components/Navbar.vue -->
<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4"
    :class="[
      isScrolled
        ? 'bg-white/95 dark:bg-secondary-900/95 backdrop-blur-lg shadow-lg border-b border-neutral-200 dark:border-secondary-700'
        : 'bg-transparent',
    ]"
  >
    <div class="container-custom">
      <div class="flex justify-between items-center h-16 sm:h-20">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink
            to="/"
            class="flex items-center gap-2 text-2xl font-display text-secondary-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors group"
            @click="closeMobileMenu"
          >
            <div
              class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform"
            >
              IV
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors relative group rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"
            :class="{
              'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30':
                route.path === item.path,
            }"
            @click="closeMobileMenu"
          >
            <i :class="item.icon" class="text-base w-5 text-center"></i>
            <span>{{ item.label }}</span>
            <span
              class="absolute -bottom-1 left-4 right-4 h-0.5 bg-primary-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
              :class="{ 'opacity-100': route.path === item.path }"
            ></span>
          </NuxtLink>
        </div>

        <!-- Desktop Right Side -->
        <div class="hidden md:flex items-center space-x-3">
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleColorMode"
            class="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all group"
            :title="
              colorMode.value === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-base group-hover:scale-110 transition-transform"
            ></i>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Mobile Dark Mode Toggle -->
          <button
            @click="toggleColorMode"
            class="w-9 h-9 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-sm"
            ></i>
          </button>

          <!-- Hamburger Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-9 h-9 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors rounded-lg"
            aria-label="Toggle mobile menu"
          >
            <i
              :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
              class="text-lg transition-transform duration-300"
            ></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden bg-white dark:bg-secondary-900 border-t border-neutral-200 dark:border-secondary-700 shadow-xl"
      >
        <div class="container-custom py-4 space-y-2">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center gap-6 px-4 py-3 text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors group"
            :class="{
              'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30':
                route.path === item.path,
            }"
            @click="closeMobileMenu"
          >
            <i
              :class="item.icon"
              class="text-lg w-6 text-center text-primary-500 dark:text-primary-400"
            ></i>
            <div class="flex-1">
              <div>{{ item.label }}</div>
              <div
                class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5"
              >
                {{ item.description }}
              </div>
            </div>
            <i
              class="fas fa-chevron-right text-xs text-neutral-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-transform"
            ></i>
          </NuxtLink>

          <!-- Mobile Contact Section -->
          <div
            class="pt-4 border-t border-neutral-200 dark:border-secondary-700"
          >
            <NuxtLink
              to="/contact"
              class="flex items-center gap-3 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all group justify-center"
              @click="closeMobileMenu"
            >
              <i class="fas fa-paper-plane"></i>
              <span>Start a Project</span>
              <i
                class="fas fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"
              ></i>
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

// Dark mode
const colorMode = useColorMode();

// Route
const route = useRoute();

// State
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

// Navigation items with icons
const navigationItems = [
  {
    id: "home",
    path: "/",
    label: "Home",
    description: "Overview & Introduction",
    icon: "fas fa-home",
  },
  {
    id: "case-studies",
    path: "/case-studies",
    label: "Case Studies",
    description: "Technical work & deep dives",
    icon: "fas fa-laptop-code",
  },
  {
    id: "writing",
    path: "/writing",
    label: "Writing",
    description: "Creative writing & articles",
    icon: "fas fa-pen-nib",
  },
  {
    id: "about",
    path: "/about",
    label: "About",
    description: "My story & timeline",
    icon: "fas fa-user",
  },
  {
    id: "contact",
    path: "/contact",
    label: "Contact",
    description: "Work together & services",
    icon: "fas fa-envelope",
  },
];

// Dark mode toggle
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Scroll detection for navbar background
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

// Close menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  const nav = document.querySelector("nav");
  if (nav && !nav.contains(target) && isMobileMenuOpen.value) {
    closeMobileMenu();
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

<style scoped>
/* Ensure smooth transitions */
nav {
  transition: background-color 0.3s ease, box-shadow 0.3s ease,
    border-color 0.3s ease;
}

/* Custom scroll behavior */
.container-custom {
  scroll-behavior: smooth;
}
</style>
