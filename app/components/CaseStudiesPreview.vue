<template>
  <section class="section-compact bg-transparent px-6">
    <div class="container mx-auto max-w-7xl">
      <div class="projects-header-anim mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-3xl">
          <span class="mb-5 inline-block rounded-full border border-secondary-200 bg-secondary-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 dark:border-white/10 dark:bg-white/5 dark:text-primary-300">
            Selected work
          </span>
          <h2 class="mb-5 section-title">
            Recent full-stack and AI-assisted products.
          </h2>
          <p class="text-lg leading-relaxed text-secondary-600 dark:text-secondary-400">
            A quick look at the projects that best show my current direction: SaaS MVPs, AI product UX, practical
            automations, and production-minded web engineering.
          </p>
        </div>

        <NuxtLink to="/case-studies" class="btn-outline inline-flex items-center gap-3 border-secondary-300 text-secondary-900 dark:border-white/20 dark:text-white">
          <span>Open Work Index</span>
          <i class="fas fa-arrow-right"></i>
        </NuxtLink>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <article
          v-for="project in homeFeaturedProjects"
          :key="project.id"
          class="project-card-anim group rounded-3xl border border-secondary-100 bg-white/75 p-5 shadow-xl shadow-secondary-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary-300/60 dark:border-white/10 dark:bg-dark-surface/45"
        >
          <ProjectVisual :project="project" />

          <div class="pt-6">
            <p class="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
              {{ project.category }}
            </p>
            <h3 class="mb-4 text-2xl font-display font-bold text-secondary-900 dark:text-white md:text-3xl">
              {{ project.title }}
            </h3>
            <p class="mb-5 leading-relaxed text-secondary-600 dark:text-secondary-400">
              {{ project.shortDescription }}
            </p>

            <div class="mb-6 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags.slice(0, 7)"
                :key="tag"
                class="rounded-xl border border-secondary-200 bg-secondary-50 px-3 py-1.5 text-xs font-medium text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex flex-wrap gap-3">
              <NuxtLink
                v-if="project.liveUrl && isInternalUrl(project.liveUrl)"
                :to="project.liveUrl"
                class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-600 transition hover:text-primary-500 dark:text-primary-300"
              >
                Live tool <i class="fas fa-arrow-right text-xs"></i>
              </NuxtLink>
              <a
                v-else-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary-600 transition hover:text-primary-500 dark:text-primary-300"
              >
                Live demo <i class="fas fa-external-link-alt text-xs"></i>
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary-500 transition hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white"
              >
                GitHub <i class="fab fa-github"></i>
              </a>
              <NuxtLink
                v-if="project.caseStudyUrl"
                :to="project.caseStudyUrl"
                class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary-500 transition hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white"
              >
                Case study <i class="fas fa-arrow-right text-xs"></i>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { homeFeaturedProjects } = useProjects();

const isInternalUrl = (url: string) => url.startsWith("/");

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set([".projects-header-anim", ".project-card-anim"], { y: 0 });
    return;
  }

  gsap.from(".projects-header-anim", {
    scrollTrigger: {
      trigger: ".projects-header-anim",
      start: "top 82%",
      once: true,
    },
    y: 24,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.utils.toArray<HTMLElement>(".project-card-anim").forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        once: true,
      },
      y: 24,
      duration: 0.8,
      delay: index * 0.04,
      ease: "power3.out",
    });
  });
});
</script>
