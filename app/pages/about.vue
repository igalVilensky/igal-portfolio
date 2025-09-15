<template>
  <div class="relative pt-12">
    <AboutContent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";
import AboutContent from "~/components/About.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

useHead({
  title: t("seo.about"),
});

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.from(".about-section", {
    duration: 1.5,
    opacity: 0,
    y: 100,
    ease: "power2.inOut",
  });
});
</script>
