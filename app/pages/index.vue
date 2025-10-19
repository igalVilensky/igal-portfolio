<!-- app/pages/index.vue -->
<template>
  <div>
    <Hero />
    <MyStory />
    <IntegratedSkills />
    <CaseStudiesPreview />
    <ContactCTA />
  </div>
</template>

<script setup lang="ts">
import Hero from "~/components/Hero.vue";
import MyStory from "~/components/MyStory.vue";
import IntegratedSkills from "~/components/IntegratedSkills.vue";
import CaseStudiesPreview from "~/components/CaseStudiesPreview.vue";
import ContactCTA from "~/components/ContactCTA.vue";
definePageMeta({
  layout: "default",
});

useHead({
  title: "Igal Vilensky - Creative Technologist & Problem Solver",
});
</script>
