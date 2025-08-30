// composables/useProjects.ts
import { ref } from "vue";

export const useProjects = () => {
  const projects = ref([
    {
      id: "sunlitTales",
      titleKey: "sunlitTales",
      image: "/sunlit.jpeg",
      technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity", "MongoDB"],
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
      id: "portfolio",
      titleKey: "portfolio",
      image: "/portfolio.jpeg",
      technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
      link: "#",
    },
    {
      id: "blogPlatform",
      titleKey: "blogPlatform",
      image: "/coming_soon.jpg",
      technologies: ["Directus", "Vue.js", "Node.js", "PostgreSQL"],
      link: "https://example.com/blog",
    },
    {
      id: "propertyManagement",
      titleKey: "propertyManagement",
      image: "/coming_soon.jpg",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "https://example.com/realestate",
    },
  ]);

  const featuredProjects = ref([
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
  ]);

  return { projects, featuredProjects };
};
