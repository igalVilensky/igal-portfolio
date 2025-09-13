<!-- app/pages/experience.vue -->
<template>
  <div class="relative pt-12">
    <Orb stage="experience" />
    <ExperienceContent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";
import Orb from "~/components/Orb.vue";
import ExperienceContent from "~/components/Experience.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

useHead({
  title: t("seo.experience"),
});

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.from(".experience-item", {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: "easeInOut",
  });
});
</script>
