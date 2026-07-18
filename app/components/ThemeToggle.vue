<template>
  <button
    type="button"
    class="group relative inline-grid grid-cols-2 items-center overflow-hidden rounded-full border border-secondary-200 bg-white p-1 text-secondary-500 shadow-sm transition-colors duration-300 hover:border-secondary-300 hover:text-secondary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-50 dark:border-dark-border dark:bg-dark-surface dark:text-secondary-400 dark:hover:border-secondary-600 dark:hover:text-white dark:focus-visible:ring-offset-dark-bg"
    :aria-label="toggleLabel"
    @click="toggleColorMode"
  >
    <span
      class="absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded-full bg-secondary-950 shadow-sm transition-transform duration-300 ease-out dark:bg-secondary-100"
      :class="isDarkMode ? 'translate-x-[calc(100%+0.25rem)]' : 'translate-x-0'"
      aria-hidden="true"
    />

    <span
      class="relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors duration-300"
      :class="isDarkMode ? 'text-secondary-500 dark:text-secondary-400' : 'text-white'"
    >
      <Sun :size="14" />
    </span>

    <span
      class="relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors duration-300"
      :class="isDarkMode ? 'text-secondary-950' : 'text-secondary-500 dark:text-secondary-400'"
    >
      <Moon :size="14" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";

const colorMode = useColorMode();
const { t } = useI18n();
const isMounted = ref(false);

const isDarkMode = computed(() => isMounted.value && colorMode.value === "dark");

const toggleLabel = computed(() =>
  isDarkMode.value ? t("nav.switchToLight") : t("nav.switchToDark")
);

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

onMounted(() => {
  isMounted.value = true;
});
</script>
