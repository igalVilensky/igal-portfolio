<!-- app/pages/contact.vue -->
<template>
  <div class="relative pt-12">
    <ContactContent />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";
import ContactContent from "~/components/Contact.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

useHead({
  title: t("seo.contact"),
});

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.from(".contact-link", {
    duration: 0.8,
    scale: 1.2,
    stagger: 0.1,
    ease: "spring",
  });
});
</script>
