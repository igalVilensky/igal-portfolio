<template>
  <section class="bg-transparent px-6 py-12 md:py-14">
    <div class="container mx-auto max-w-7xl">
      <div class="mb-6 max-w-3xl md:mb-8">
        <span class="skills-header-anim mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary-500">
          Skills and tools
        </span>
        <h2 class="skills-header-anim mb-5 section-title">
          Full-stack foundations, AI workflow direction.
        </h2>
        <p class="skills-header-anim text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
          The stack is intentionally practical: product interfaces, APIs, databases, deployment, and the automation
          layer that can connect them.
        </p>
      </div>

      <div class="skills-grid grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <article
          v-for="group in skillGroups"
          :key="group.title"
          class="skill-category rounded-3xl border border-secondary-100 bg-white/75 p-7 shadow-xl shadow-secondary-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary-300/60 dark:border-white/10 dark:bg-dark-surface/45 md:p-8"
        >
          <div class="mb-6 flex items-start justify-between gap-5">
            <div>
              <div :class="['mb-5 h-1 w-12 rounded-full', accentClass(group.accent)]"></div>
              <h3 class="text-2xl font-display font-bold text-secondary-900 dark:text-white">
                {{ group.title }}
              </h3>
            </div>
            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary-50 text-primary-600 dark:bg-white/5 dark:text-primary-300">
              <i :class="iconClass(group.title)"></i>
            </div>
          </div>

          <p class="mb-6 leading-relaxed text-secondary-600 dark:text-secondary-400">
            {{ group.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in group.items"
              :key="item"
              class="rounded-xl border border-secondary-200 bg-secondary-50 px-3 py-2 text-xs font-medium text-secondary-700 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
            >
              {{ item }}
            </span>
          </div>
        </article>
      </div>

      <div class="skills-quote-anim mt-6 rounded-2xl border border-primary-200 bg-primary-50/80 p-5 dark:border-primary-400/20 dark:bg-primary-400/10 md:mt-7 md:p-6">
        <p class="text-lg font-light leading-relaxed text-primary-900 dark:text-primary-100 md:text-xl">
          I am strongest where product UX, frontend polish, backend structure, and practical automation meet.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const { skillGroups } = useProjects();

const accentClass = (accent: string) => {
  const classes: Record<string, string> = {
    primary: "bg-primary-500",
    accent: "bg-accent-500",
    emerald: "bg-emerald-500",
    secondary: "bg-secondary-500",
  };
  return classes[accent] || "bg-primary-500";
};

const iconClass = (title: string) => {
  const icons: Record<string, string> = {
    Frontend: "fas fa-window-maximize",
    Backend: "fas fa-server",
    "AI / Automation": "fas fa-wand-magic-sparkles",
    Engineering: "fas fa-code-branch",
  };
  return icons[title] || "fas fa-code";
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set([".skills-header-anim", ".skill-category", ".skills-quote-anim"], { y: 0, x: 0, opacity: 1 });
    return;
  }

  gsap.from(".skills-header-anim", {
    scrollTrigger: {
      trigger: ".skills-header-anim",
      start: "top 80%",
      once: true,
    },
    y: 40,
    duration: 0.8,
    stagger: 0.16,
    ease: "power3.out",
  });

  gsap.from(".skill-category", {
    scrollTrigger: {
      trigger: ".skills-grid",
      start: "top 78%",
      once: true,
    },
    y: 40,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
  });

  gsap.from(".skills-quote-anim", {
    scrollTrigger: {
      trigger: ".skills-quote-anim",
      start: "top 88%",
      once: true,
    },
    y: 24,
    duration: 0.8,
    ease: "power3.out",
  });
});
</script>
