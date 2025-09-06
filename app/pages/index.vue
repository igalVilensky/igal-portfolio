<template>
  <div
    class="min-h-screen font-['Poppins']"
    :class="
      colorMode.value === 'dark'
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900'
    "
  >
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Projects :projects="featuredProjects" />
    <Experience />
    <Education />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import { useI18n } from "vue-i18n";
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import About from "../components/About.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import Experience from "../components/Experience.vue";
import Education from "../components/Education.vue";
import Footer from "../components/Footer.vue";

const colorMode = useColorMode();
const { t } = useI18n();
// Featured projects data with corrected titleKey
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
    description: "portfolio",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
];

// Add Google Fonts for Poppins and Font Awesome
useHead({
  title: t("seo.title"),
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
  ],
});
</script>
