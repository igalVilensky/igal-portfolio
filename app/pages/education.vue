<!-- app/pages/education.vue -->
<template>
  <div class="relative pt-12">
    <section class="page-container pt-16" aria-labelledby="wbs-education">
      <h1 id="wbs-education" class="section-title">{{ t('publicContent.educationTitle') }}</h1>
      <p class="mt-4 text-secondary-700 dark:text-secondary-300">{{ t('publicContent.education') }}</p>
    </section>
    <EducationContent />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import EducationContent from "~/components/Education.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

useHead(() => ({
  title: t("seo.education"),
}));
</script>
