<!-- app/pages/experience.vue -->
<template>
  <div class="relative pt-12">
    <ExperienceContent />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import ExperienceContent from "~/components/Experience.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

useHead({
  title: t("seo.experience"),
});
</script>
