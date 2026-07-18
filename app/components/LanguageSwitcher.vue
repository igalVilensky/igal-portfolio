<template>
  <div ref="root" class="relative" :aria-label="t('language.label')">
    <button
      type="button"
      class="inline-flex h-9 items-center gap-1.5 rounded-full border border-secondary-200 bg-white px-3 text-xs font-semibold uppercase text-secondary-700 shadow-sm transition-colors hover:border-secondary-300 hover:text-secondary-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-50 dark:border-dark-border dark:bg-dark-surface dark:text-secondary-300 dark:hover:border-secondary-600 dark:hover:text-white dark:focus-visible:ring-offset-dark-bg"
      :aria-label="t('language.label')"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="isOpen = !isOpen"
    >
      <Languages :size="14" aria-hidden="true" />
      <span>{{ currentOption.short }}</span>
      <ChevronDown
        :size="14"
        class="transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        aria-hidden="true"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="-translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-1 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 min-w-36 overflow-hidden rounded-md border border-secondary-200 bg-white py-1 shadow-lg shadow-secondary-900/10 dark:border-dark-border dark:bg-dark-surface dark:shadow-black/30"
        role="menu"
      >
        <NuxtLink
          v-for="option in languageOptions"
          :key="option.code"
          :to="switchLocalePath(option.code)"
          class="flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium transition-colors"
          :class="option.code === locale
            ? 'bg-secondary-100 text-secondary-950 dark:bg-white/10 dark:text-white'
            : 'text-secondary-600 hover:bg-secondary-50 hover:text-secondary-950 dark:text-secondary-300 dark:hover:bg-white/5 dark:hover:text-white'"
          :aria-label="t('language.switchTo', { language: option.name })"
          :aria-current="option.code === locale ? 'true' : undefined"
          role="menuitem"
          @click="selectLanguage"
        >
          <span>{{ option.name }}</span>
          <span class="text-xs uppercase text-secondary-400 dark:text-secondary-500">
            {{ option.short }}
          </span>
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown, Languages } from "lucide-vue-next";

const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const root = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const emit = defineEmits<{
  selected: [];
}>();

const languageOptions = [
  { code: "en", short: "EN", name: "English" },
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "ru", short: "RU", name: "Русский" },
] as const;

const currentOption = computed(() =>
  languageOptions.find((option) => option.code === locale.value) ?? languageOptions[0]
);

const selectLanguage = () => {
  isOpen.value = false;
  emit("selected");
};

const handleDocumentClick = (event: MouseEvent) => {
  if (!root.value?.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

watch(() => route.fullPath, () => {
  isOpen.value = false;
});

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>
