<!-- app/pages/contact.vue -->
<template>
  <div class="relative min-h-screen bg-transparent overflow-hidden">
    <ContactVisualizer />
    <ContactContent class="relative z-10" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import ContactContent from "~/components/Contact.vue";
import ContactVisualizer from "~/components/ContactVisualizer.vue";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Contact | Igal Vilensky - Full-Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "Contact Igal Vilensky for full-stack developer roles, SaaS/product engineering, AI automation projects, and collaborations.",
    },
  ],
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
