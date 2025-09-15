<!-- app/pages/education.vue -->
<template>
  <div class="relative pt-12">
    <Orb stage="education" class="hidden lg:block" />
    <EducationContent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";
import Orb from "~/components/Orb.vue";
import EducationContent from "~/components/Education.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

useHead({
  title: t("seo.education"),
});

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.from(".timeline-item", {
    duration: 1,
    x: -100,
    stagger: 0.3,
    ease: "easeInOut",
  });
});
</script>
