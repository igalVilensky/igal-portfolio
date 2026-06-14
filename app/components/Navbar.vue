<!-- app/components/Navbar.vue -->
<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-secondary-200 transition-all duration-300 dark:border-dark-border" :class="[
    isScrolled
      ? 'bg-secondary-50 py-3 dark:bg-dark-bg'
      : 'bg-secondary-50 py-4 dark:bg-dark-bg',
  ]">
    <div class="mx-auto max-w-4xl px-5 sm:px-6">
      <div class="flex justify-end md:justify-between items-center">
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink v-for="item in navigationItems" :key="item.id" :to="item.path"
            class="rounded-md px-3 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-primary-700 dark:text-secondary-300 dark:hover:bg-dark-surface dark:hover:text-primary-300"
            :class="{
              'bg-white text-primary-700 dark:bg-dark-surface dark:text-primary-300':
                isActive(item.path),
            }">
            {{ item.label }}
          </NuxtLink>
        </div>

        <div class="hidden md:flex items-center">
          <button @click="toggleColorMode"
            class="w-10 h-10 rounded-md flex items-center justify-center text-secondary-500 transition-colors hover:bg-secondary-100 hover:text-primary-700 dark:text-secondary-400 dark:hover:bg-dark-surface dark:hover:text-primary-300"
            aria-label="Toggle dark mode">
            <i :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'" class="text-lg"></i>
          </button>
        </div>

        <div class="md:hidden flex items-center gap-4">
          <button @click="toggleColorMode"
            class="w-10 h-10 rounded-md flex items-center justify-center text-secondary-500 transition-colors hover:bg-secondary-100 dark:text-secondary-400 dark:hover:bg-dark-surface"
            aria-label="Toggle dark mode">
            <i :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'" class="text-lg"></i>
          </button>

          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="w-10 h-10 rounded-md flex items-center justify-center text-secondary-900 transition-colors hover:bg-secondary-100 hover:text-primary-700 dark:text-white dark:hover:bg-dark-surface dark:hover:text-primary-300"
            aria-label="Toggle mobile menu">
            <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
      <div v-show="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 right-0 border-b border-secondary-200 bg-secondary-50 dark:border-dark-border dark:bg-dark-bg">
        <div class="mx-auto max-w-4xl px-5 py-4 space-y-1 sm:px-6">
          <NuxtLink v-for="item in navigationItems" :key="item.id" :to="item.path"
            class="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-secondary-600 transition-colors hover:bg-secondary-100 hover:text-primary-700 dark:text-secondary-300 dark:hover:bg-dark-surface dark:hover:text-primary-300"
            :class="{
              'bg-white text-primary-700 dark:bg-dark-surface dark:text-primary-300':
                isActive(item.path),
            }" @click="closeMobileMenu">
            <span>{{ item.label }}</span>
            <i class="fas fa-chevron-right text-xs opacity-50"></i>
          </NuxtLink>
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
  { id: "experiments", path: "/experiments", label: "Experiments" },
  { id: "ai-compliance", path: "/ai-compliance-compass", label: "AI Compass" },
  { id: "about", path: "/about", label: "About" },
];

const toggleColorMode = () => {
  const isDark = colorMode.value === 'dark';
  colorMode.preference = isDark ? 'light' : 'dark';
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path === path || route.path.startsWith(`${path}/`);
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
