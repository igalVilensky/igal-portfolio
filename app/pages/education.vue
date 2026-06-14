<!-- app/pages/education.vue -->
<template>
  <div class="relative pt-12">
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

useHead({
  title: t("seo.education"),
});
</script>
