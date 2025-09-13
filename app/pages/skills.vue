<!-- app/pages/skills.vue -->
<template>
  <div class="relative pt-12">
    <Orb stage="skills" />
    <SkillsContent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";
import Orb from "~/components/Orb.vue";
import SkillsContent from "~/components/Skills.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

useHead({
  title: t("seo.skills"),
});

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.from(".skill-item", {
    duration: 0.5,
    scale: 0,
    stagger: 0.1,
    ease: "spring",
  });
});
</script>
