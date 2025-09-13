<!-- app/pages/projects.vue -->
<template>
  <div class="relative pt-12">
    <Orb stage="projects" />
    <ProjectsContent :projects="featuredProjects" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { useI18n } from "vue-i18n";
import ProjectsContent from "~/components/Projects.vue";
import Orb from "~/components/Orb.vue";

definePageMeta({
  layout: "default",
});

const { t } = useI18n();

const featuredProjects = [
  {
    id: "sunlitTales",
    titleKey: "sunlitTales",
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity"],
    link: "https://sunlit-tales.netlify.app/",
  },
  {
    id: "psyBlog",
    titleKey: "psyBlog",
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
  },
  {
    id: "urlShortener",
    titleKey: "urlShortener",
    image: "/url-shortener.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "Node.js", "MongoDB", "express"],
    link: "https://clean-links.netlify.app/",
  },
  {
    id: "securityPlayground",
    titleKey: "securityPlayground",
    image: "/security.jpeg",
    technologies: ["Nuxt", "Vue 3", "Web Security"],
    link: "/projects/security",
  },
  {
    id: "orderSystem",
    titleKey: "orderSystem",
    image: "/canOrderSystem.jpeg",
    technologies: ["TypeScript", "Next", "React", "Tailwind CSS"],
    link: "https://canordersystem.netlify.app/",
  },
  {
    id: "portfolio",
    titleKey: "portfolio",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
];

useHead({
  title: t("seo.projects"),
});

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.from(".project-card", {
    duration: 1,
    scale: 0.8,
    stagger: 0.2,
    ease: "spring",
  });
});
</script>
