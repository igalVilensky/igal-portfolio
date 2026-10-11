<template>
  <nav class="site-navbar" :aria-label="t('foundation.navigation')" @keydown.esc="dismissMenu">
    <div class="container-wide navbar-row">
      <NuxtLink :to="localePath('/')" class="nav-link nav-identity" @click="closeMobileMenu">{{ t('foundation.identity') }}</NuxtLink>
      <div class="hidden items-center gap-4 xl:flex">
        <NuxtLink v-for="item in navigationItems" :key="item.id" :to="localePath(item.path)"
          class="nav-link" :aria-current="isActive(item.path) ? 'page' : undefined">
          <component :is="item.icon" :size="16" aria-hidden="true" />
          {{ item.label }}
        </NuxtLink>
      </div>
      <div class="flex items-center gap-2">
        <LanguageSwitcher class="hidden xl:block" />
        <ThemeToggle />
        <button ref="menuToggle" type="button" class="shell-control xl:hidden" :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-navigation" @click="isMobileMenuOpen = !isMobileMenuOpen">
          {{ isMobileMenuOpen ? t('nav.close') : t('nav.menu') }}
        </button>
      </div>
    </div>
    <div v-show="isMobileMenuOpen" id="mobile-navigation" class="mobile-navigation xl:hidden">
      <div class="container-wide flex flex-col gap-2">
        <NuxtLink v-for="item in navigationItems" :key="item.id" :to="localePath(item.path)"
          class="nav-link" :aria-current="isActive(item.path) ? 'page' : undefined" @click="closeMobileMenu">
          <component :is="item.icon" :size="16" aria-hidden="true" />{{ item.label }}
        </NuxtLink>
        <div class="flex items-center justify-between gap-4 border-t border-line pt-4">
          <span class="metadata">{{ t('nav.language') }}</span>
          <LanguageSwitcher @selected="closeMobileMenu" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { Home, Briefcase, FlaskConical, MessageCircle, Bot, User } from "lucide-vue-next";
import LanguageSwitcher from "~/components/LanguageSwitcher.vue";
import ThemeToggle from "~/components/ThemeToggle.vue";

const route = useRoute();
const { t } = useI18n();
const localePath = useLocalePath();

const isMobileMenuOpen = ref(false);
const menuToggle = ref<HTMLButtonElement | null>(null);
const dismissMenu = () => { closeMobileMenu(); menuToggle.value?.focus(); };
watch(() => route.fullPath, () => closeMobileMenu());

const navigationItems = computed(() => [
  { id: "home", path: "/", label: t("nav.home"), icon: Home },
  { id: "case-studies", path: "/case-studies", label: t("nav.work"), icon: Briefcase },
  { id: "experiments", path: "/experiments", label: t("nav.experiments"), icon: FlaskConical },
  { id: "ask-igal", path: "/ask-igal", label: t("nav.askIgal"), icon: MessageCircle },
  { id: "ai-automation", path: "/ai-automation", label: t("nav.ai"), icon: Bot },
  { id: "about", path: "/about", label: t("nav.about"), icon: User },
]);

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const isActive = (path: string) => {
  const targetPath = localePath(path);
  if (path === "/") return route.path === targetPath;
  return route.path === targetPath || route.path.startsWith(`${targetPath}/`);
};

</script>
