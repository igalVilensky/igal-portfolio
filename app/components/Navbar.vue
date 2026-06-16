<!-- app/components/Navbar.vue -->
<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-secondary-200 transition-colors duration-200 dark:border-dark-border" :class="[
    isScrolled
      ? 'bg-secondary-50 py-3 dark:bg-dark-bg'
      : 'bg-secondary-50 py-4 dark:bg-dark-bg',
  ]">
    <div class="mx-auto max-w-4xl px-5 sm:px-6">
      <div class="flex items-center justify-between">
        <div class="hidden items-center gap-5 md:flex">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center gap-1.5 border-b border-transparent py-1 text-sm text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
            :class="{
              'border-secondary-400 text-secondary-950 dark:border-secondary-500 dark:text-white': isActive(item.path),
            }"
          >
            <component :is="item.icon" :size="14" />
            {{ item.label }}
          </NuxtLink>
        </div>

        <NuxtLink
          to="/"
          class="py-1 text-sm text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white md:hidden"
          @click="closeMobileMenu"
        >
          Home
        </NuxtLink>

        <div class="hidden items-center md:flex">
          <button
            type="button"
            class="py-1 text-sm text-secondary-500 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
            @click="toggleColorMode"
          >
            {{ colorMode.value === "dark" ? "Light" : "Dark" }}
          </button>
        </div>

        <div class="flex items-center gap-4 md:hidden">
          <button
            type="button"
            class="py-1 text-sm text-secondary-500 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
            @click="toggleColorMode"
          >
            {{ colorMode.value === "dark" ? "Light" : "Dark" }}
          </button>

          <button
            type="button"
            class="py-1 text-sm text-secondary-900 transition-colors hover:text-secondary-600 dark:text-white dark:hover:text-secondary-300"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            {{ isMobileMenuOpen ? "Close" : "Menu" }}
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
        <div class="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-4 sm:px-6">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.id"
            :to="item.path"
            class="flex items-center gap-2 border-b border-transparent py-1 text-base text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
            :class="{
              'border-secondary-400 text-secondary-950 dark:border-secondary-500 dark:text-white': isActive(item.path),
            }"
            @click="closeMobileMenu"
          >
            <component :is="item.icon" :size="16" />
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import { useRoute } from "vue-router";
import { Home, Briefcase, FlaskConical, Bot, User } from "lucide-vue-next";

const colorMode = useColorMode();
const route = useRoute();

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const navigationItems = [
  { id: "home", path: "/", label: "Home", icon: Home },
  { id: "case-studies", path: "/case-studies", label: "Work", icon: Briefcase },
  { id: "experiments", path: "/experiments", label: "Experiments", icon: FlaskConical },
  { id: "ai-automation", path: "/ai-automation", label: "AI", icon: Bot },
  { id: "about", path: "/about", label: "About", icon: User },
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
