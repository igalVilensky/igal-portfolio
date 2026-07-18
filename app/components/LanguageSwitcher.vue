<template>
  <div class="flex items-center gap-1" role="group" :aria-label="t('language.label')">
    <NuxtLink
      v-for="option in languageOptions"
      :key="option.code"
      :to="switchLocalePath(option.code)"
      class="rounded px-2 py-1 text-xs font-semibold transition-colors"
      :class="option.code === locale
        ? 'bg-secondary-950 text-white dark:bg-secondary-100 dark:text-secondary-950'
        : 'text-secondary-500 hover:bg-secondary-100 hover:text-secondary-950 dark:text-secondary-400 dark:hover:bg-white/5 dark:hover:text-white'"
      :aria-label="t('language.switchTo', { language: option.name })"
      :aria-current="option.code === locale ? 'true' : undefined"
      @click="$emit('selected')"
    >
      {{ option.short }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();

defineEmits<{
  selected: [];
}>();

const languageOptions = [
  { code: "en", short: "EN", name: "English" },
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "ru", short: "RU", name: "Русский" },
] as const;
</script>
