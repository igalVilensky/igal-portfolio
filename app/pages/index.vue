<!-- app/pages/index.vue -->
<template>
  <div class="relative">
    <GridSystem />
    <Hero />
    <MyStory />
    <IntegratedSkills />
    <CaseStudiesPreview />
    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/Hero.vue";
import GridSystem from "~/components/GridSystem.vue";
import MyStory from "~/components/MyStory.vue";
import IntegratedSkills from "~/components/IntegratedSkills.vue";
import CaseStudiesPreview from "~/components/CaseStudiesPreview.vue";
import ContactCTA from "~/components/ContactCTA.vue";
definePageMeta({
  layout: "default",
});

useHead({
  title: "Igal Vilensky - Full-Stack Developer for SaaS and AI-Assisted Tools",
  meta: [
    {
      name: "description",
      content:
        "Portfolio of Igal Vilensky, a full-stack developer in Leipzig building SaaS products, AI-assisted tools, and automation-friendly web applications.",
    },
  ],
});
</script>
