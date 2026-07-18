<template>
  <button
    type="button"
    class="group relative inline-grid grid-cols-2 items-center overflow-hidden rounded-full border border-secondary-200 bg-white p-1 text-xs font-semibold text-secondary-500 shadow-sm transition-colors duration-300 hover:border-secondary-300 hover:text-secondary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-50 disabled:cursor-wait dark:border-dark-border dark:bg-dark-surface dark:text-secondary-400 dark:hover:border-secondary-600 dark:hover:text-white dark:focus-visible:ring-offset-dark-bg"
    :aria-label="toggleLabel"
    :disabled="isAnimating"
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
      <span class="hidden sm:inline">{{ t("nav.light") }}</span>
    </span>

    <span
      class="relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors duration-300"
      :class="isDarkMode ? 'text-secondary-950' : 'text-secondary-500 dark:text-secondary-400'"
    >
      <Moon :size="14" />
      <span class="hidden sm:inline">{{ t("nav.dark") }}</span>
    </span>
  </button>

  <Teleport to="body">
    <div
      v-if="isAnimating"
      class="theme-mode-wipe"
      :class="nextMode === 'dark' ? 'theme-mode-wipe--dark' : 'theme-mode-wipe--light'"
      aria-hidden="true"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";

const colorMode = useColorMode();
const { t } = useI18n();
const isMounted = ref(false);
const isAnimating = ref(false);
const nextMode = ref<"dark" | "light">("dark");
let animationTimers: number[] = [];

const isDarkMode = computed(() => isMounted.value && colorMode.value === "dark");

const toggleLabel = computed(() =>
  isDarkMode.value ? t("nav.switchToLight") : t("nav.switchToDark")
);

const clearAnimationTimers = () => {
  animationTimers.forEach((timer) => window.clearTimeout(timer));
  animationTimers = [];
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const toggleColorMode = () => {
  const targetMode = colorMode.value === "dark" ? "light" : "dark";

  if (!import.meta.client || prefersReducedMotion()) {
    colorMode.preference = targetMode;
    return;
  }

  if (isAnimating.value) return;

  clearAnimationTimers();
  nextMode.value = targetMode;
  isAnimating.value = true;

  animationTimers = [
    window.setTimeout(() => {
      colorMode.preference = targetMode;
    }, 820),
    window.setTimeout(() => {
      isAnimating.value = false;
      animationTimers = [];
    }, 900),
  ];
};

onMounted(() => {
  isMounted.value = true;
});

onUnmounted(() => {
  clearAnimationTimers();
});
</script>

<style scoped>
.theme-mode-wipe {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;
}

.theme-mode-wipe::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 118vh;
  content: "";
  background: var(--theme-fill);
  clip-path: polygon(
    0 0,
    100% 0,
    100% 94%,
    91% 96%,
    79% 94%,
    66% 98%,
    52% 95%,
    38% 99%,
    24% 96%,
    11% 98%,
    0 95%
  );
  transform: translateY(-110%);
  animation: theme-fill-sheet 900ms cubic-bezier(0.65, 0, 0.22, 1) forwards;
}

.theme-mode-wipe--light {
  --theme-fill: #fafaf8;
}

.theme-mode-wipe--dark {
  --theme-fill: #111111;
}

@keyframes theme-fill-sheet {
  0% {
    transform: translateY(-110%);
  }

  100% {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .theme-mode-wipe {
    animation: none;
  }
}
</style>
