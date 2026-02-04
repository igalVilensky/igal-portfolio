<!-- app/components/CaseStudiesPreview.vue -->
<template>
  <section class="section-y bg-transparent pb-32 px-6">
    <div class="container mx-auto max-w-7xl">
      <!-- Section Header -->
      <div class="py-24 text-center">
        <span
          class="inline-block px-4 py-1.5 rounded-full bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 dark:text-primary-400 mb-6 projects-header-anim">
          Selected Engineering Work
        </span>
        <h2
          class="text-4xl md:text-6xl font-display font-bold text-secondary-900 dark:text-white mb-8 projects-header-anim">
          Building Digital <span class="text-gradient-primary">Infrastructure.</span>
        </h2>
        <p class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto projects-header-anim">
          A selection of projects where I've bridge complex technical requirements with seamless user experiences.
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="space-y-32">
        <article v-for="(project, key) in projects" :key="key"
          class="group grid lg:grid-cols-2 gap-16 items-center project-card-anim">

          <!-- Image Container with Safari-style Frame -->
          <div :class="['project-image-anim relative', key === 'familySpace' ? 'lg:order-2' : '']">
            <div
              class="relative bg-secondary-100 dark:bg-white/5 rounded-2xl p-3 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
              <!-- Browser Header -->
              <div class="flex items-center gap-1.5 mb-3 px-2">
                <div class="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div class="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                <div class="flex-1"></div>
                <div class="w-1/2 h-2 bg-secondary-200 dark:bg-white/10 rounded-full opacity-50"></div>
                <div class="flex-1"></div>
              </div>
              <!-- Image Content -->
              <div class="overflow-hidden rounded-xl bg-white dark:bg-dark-surface aspect-video relative">
                <img :src="project.image" :alt="project.title"
                  class="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>

          <!-- Content -->
          <div :class="['project-content-anim space-y-8', key === 'familySpace' ? 'lg:order-1' : '']">
            <h3 class="text-3xl md:text-4xl font-display font-bold text-secondary-900 dark:text-white">
              {{ project.title }}
            </h3>
            <p class="text-lg md:text-xl text-secondary-600 dark:text-secondary-400 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech"
                class="px-4 py-2 rounded-xl bg-secondary-50 dark:bg-white/5 border border-secondary-100 dark:border-white/10 text-xs font-mono text-secondary-500">
                {{ tech }}
              </span>
            </div>
            <div class="flex gap-8 pt-4">
              <a :href="project.link" target="_blank"
                class="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-500 hover:text-primary-400 transition-colors">
                View Project <i class="fas fa-external-link-alt text-xs"></i>
              </a>
              <a :href="project.github" target="_blank"
                class="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary-400 hover:text-white transition-colors">
                Repository <i class="fab fa-github"></i>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- CTA -->
      <div class="mt-32 text-center projects-cta-anim">
        <NuxtLink to="/case-studies"
          class="inline-flex items-center gap-4 py-5 px-10 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-primary-500/20 group">
          <span>Explore Architecture Portfolio</span>
          <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



// Project data with images
const projects = {
  psyBlog: {
    title: "MindQ Lab",
    image: "/mindQlab.jpeg",
    link: "https://www.mindqlab.com/",
    github: "https://github.com/igalvilensky/psy-blog",
    description:
      "A psychology blog platform designed to make mental health resources more accessible. Built with modern web technologies to create an engaging and supportive community space.",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
  },
  familySpace: {
    title: "Family Space",
    image: "/family-space.jpeg",
    link: "https://my-nest.netlify.app/",
    github: "https://github.com/igalVilensky/family-app",
    description:
      "A family organization app featuring shared calendars, task management, and messaging. Created to help families coordinate and stay connected in their daily lives.",
    technologies: ["Nuxt", "Vue 3", "TypeScript", "Tailwind CSS", "Firebase"],
  },
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  // Header Animations
  gsap.from('.projects-header-anim', {
    scrollTrigger: {
      trigger: '.projects-header-anim',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Project Cards Animation
  const projects = document.querySelectorAll('.project-card-anim');
  projects.forEach((project) => {
    const image = project.querySelector('.project-image-anim');
    const content = project.querySelector('.project-content-anim');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.from(image, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
      .from(content, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');
  });

  // CTA Animation
  gsap.from('.projects-cta-anim', {
    scrollTrigger: {
      trigger: '.projects-cta-anim',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
});
</script>
