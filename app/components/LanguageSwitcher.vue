<template>
  <div ref="root" class="relative" @keydown.esc.stop="closeAndFocus" :aria-label="t('language.label')">
    <button
      type="button"
      ref="toggle" class="shell-control"
      :aria-label="t('language.label')"
      :aria-expanded="isOpen"
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
        class="language-options"
      >
        <NuxtLink
          v-for="option in languageOptions"
          :key="option.code"
          :to="switchLocalePath(option.code)"
          class="language-option"
          :aria-label="t('language.switchTo', { language: option.name })"
          :aria-current="option.code === locale ? 'true' : undefined"
          @click="selectLanguage"
        >
          <span>{{ option.name }}</span>
          <span class="metadata">
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
const toggle = ref<HTMLButtonElement | null>(null);
const closeAndFocus = () => { isOpen.value = false; toggle.value?.focus(); };

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
