<template>
  <button
    type="button"
    class="group relative inline-flex items-center overflow-hidden rounded-full border border-secondary-200 bg-white p-1 text-secondary-500 shadow-sm transition-colors duration-300 hover:border-secondary-300 hover:text-secondary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-50 dark:border-dark-border dark:bg-dark-surface dark:text-secondary-400 dark:hover:border-secondary-600 dark:hover:text-white dark:focus-visible:ring-offset-dark-bg"
    :aria-label="toggleLabel"
    @click="toggleColorMode"
  >
    <span
      class="absolute left-1 top-1 h-7 w-7 rounded-full bg-secondary-950 shadow-sm transition-transform duration-300 ease-out dark:bg-secondary-100"
      :class="isDarkMode ? 'translate-x-7' : 'translate-x-0'"
      aria-hidden="true"
    />

    <span
      class="relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300"
      :class="isDarkMode ? 'text-secondary-500 dark:text-secondary-400' : 'text-white'"
    >
      <Sun :size="14" stroke-width="2" />
    </span>

    <span
      class="relative z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-300"
      :class="isDarkMode ? 'text-secondary-950' : 'text-secondary-500 dark:text-secondary-400'"
    >
      <Moon :size="14" stroke-width="2" />
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
