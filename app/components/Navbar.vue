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
            :to="localePath(item.path)"
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
          :to="localePath('/')"
          class="py-1 text-sm text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white md:hidden"
          @click="closeMobileMenu"
        >
          {{ t("nav.home") }}
        </NuxtLink>

        <div class="hidden items-center md:flex">
          <LanguageSwitcher class="mr-5" />
          <button
            type="button"
            class="py-1 text-sm text-secondary-500 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
            :aria-label="colorMode.value === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')"
            @click="toggleColorMode"
          >
            {{ colorMode.value === "dark" ? t("nav.light") : t("nav.dark") }}
          </button>
        </div>

        <div class="flex items-center gap-4 md:hidden">
          <button
            type="button"
            class="py-1 text-sm text-secondary-500 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
            :aria-label="colorMode.value === 'dark' ? t('nav.switchToLight') : t('nav.switchToDark')"
            @click="toggleColorMode"
          >
            {{ colorMode.value === "dark" ? t("nav.light") : t("nav.dark") }}
          </button>

          <button
            type="button"
            class="py-1 text-sm text-secondary-900 transition-colors hover:text-secondary-600 dark:text-white dark:hover:text-secondary-300"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            {{ isMobileMenuOpen ? t("nav.close") : t("nav.menu") }}
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
            :to="localePath(item.path)"
            class="flex items-center gap-2 border-b border-transparent py-1 text-base text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
            :class="{
              'border-secondary-400 text-secondary-950 dark:border-secondary-500 dark:text-white': isActive(item.path),
            }"
            @click="closeMobileMenu"
          >
            <component :is="item.icon" :size="16" />
            {{ item.label }}
          </NuxtLink>
          <div class="border-t border-secondary-200 pt-3 dark:border-dark-border">
            <p class="mb-2 text-xs font-semibold uppercase text-secondary-500 dark:text-secondary-400">
              {{ t("nav.language") }}
            </p>
            <LanguageSwitcher @selected="closeMobileMenu" />
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { Home, Briefcase, FlaskConical, MessageCircle, Bot, User } from "lucide-vue-next";
import LanguageSwitcher from "~/components/LanguageSwitcher.vue";

const colorMode = useColorMode();
const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const navigationItems = computed(() => [
  { id: "home", path: "/", label: t("nav.home"), icon: Home },
  { id: "case-studies", path: "/case-studies", label: t("nav.work"), icon: Briefcase },
  { id: "experiments", path: "/experiments", label: t("nav.experiments"), icon: FlaskConical },
  { id: "ask-igal", path: "/ask-igal", label: t("nav.askIgal"), icon: MessageCircle },
  { id: "ai-automation", path: "/ai-automation", label: t("nav.ai"), icon: Bot },
  { id: "about", path: "/about", label: t("nav.about"), icon: User },
]);

const toggleColorMode = () => {
  const isDark = colorMode.value === 'dark';
  colorMode.preference = isDark ? 'light' : 'dark';
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const isActive = (path: string) => {
  const targetPath = localePath(path);
  if (path === "/") return route.path === targetPath;
  return route.path === targetPath || route.path.startsWith(`${targetPath}/`);
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
