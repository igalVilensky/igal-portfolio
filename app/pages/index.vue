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
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import About from "../components/About.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import Experience from "../components/Experience.vue";
import Education from "../components/Education.vue";
import Footer from "../components/Footer.vue";

const colorMode = useColorMode();

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    title: "Sunlit tales",
    description:
      "Immerse yourself in the world of poetry, where every word is a ray of light illuminating the depths of the soul.",
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity"],
    link: "https://sunlit-tales.netlify.app/",
  },
  {
    id: 2,
    title: "Your Path to Personal Growth",
    description:
      "Psy-Blog blends Kabbalah and psychology into a 10-week journey through the Tree of Self. Daily progress earns points, levels, and balance guided by the Energy of the Day.",
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio showcasing my web development projects.",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
];

// Add Google Fonts for Poppins and Font Awesome
useHead({
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

<style>
@keyframes tilt {
  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}
</style>
