<template>
  <section id="hero" class="border-b border-secondary-200 bg-secondary-50 pt-24 dark:border-dark-border dark:bg-dark-bg">
    <div class="mx-auto max-w-4xl px-5 py-14 sm:px-6 md:py-18">
      <h1 class="text-4xl font-semibold leading-tight text-secondary-950 dark:text-white sm:text-5xl">
        {{ profileName }}
      </h1>
      <p class="mt-5 text-lg leading-8 text-secondary-800 dark:text-secondary-200">
        {{ t("homePage.heroSubtitle") }}
      </p>
      <p class="mt-3 text-sm leading-6 text-secondary-500 dark:text-secondary-400">
        {{ basedIn }}
      </p>

      <nav class="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium" :aria-label="t('homePage.heroLinksLabel')">
        <a href="#selected-work" class="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200">
          {{ t("homePage.work") }}
        </a>
        <a
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
        >
          GitHub
        </a>
        <a
          :href="linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
        >
          LinkedIn
        </a>
        <a :href="`mailto:${email}`" class="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200">
          {{ t("homePage.email") }}
        </a>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  profileName: string;
  basedIn: string;
  github: string;
  linkedin: string;
  email: string;
}>();

const { t } = useI18n();
</script>
