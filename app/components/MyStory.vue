<template>
  <section class="relative overflow-hidden bg-transparent px-6 pb-12 pt-4 md:pb-14 md:pt-6">
    <div class="container mx-auto max-w-7xl">
      <div class="grid gap-10 lg:grid-cols-12">
        <div class="story-header-anim lg:col-span-4 lg:sticky lg:top-32 lg:h-fit">
          <span class="mb-8 inline-block rounded-full border border-secondary-200 bg-secondary-100 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-500 dark:border-white/10 dark:bg-white/5 dark:text-primary-300">
            The direction
          </span>
          <h2 class="mb-6 section-title">
            Product engineering with an
            <span class="text-gradient-primary">AI automation</span>
            edge.
          </h2>
          <div class="mb-8 h-1 w-16 bg-primary-500"></div>
          <p class="text-lg italic leading-relaxed text-secondary-600 dark:text-secondary-400">
            I like tools that make complicated choices, workflows, and systems feel usable. The current chapter is
            connecting that product mindset with agents, automations, APIs, and LLMs.
          </p>
        </div>

        <div class="space-y-6 lg:col-span-8">
          <article
            v-for="item in storyItems"
            :key="item.title"
            class="timeline-item rounded-3xl border border-secondary-100 bg-white/70 p-7 shadow-xl shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/45 md:p-9"
          >
            <div class="mb-5 flex items-center gap-4">
              <span class="font-display text-4xl font-bold text-primary-500/25">{{ item.index }}</span>
              <div>
                <p class="text-[10px] font-bold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
                  {{ item.kicker }}
                </p>
                <h3 class="mt-1 text-2xl font-bold text-secondary-900 dark:text-white">
                  {{ item.title }}
                </h3>
              </div>
            </div>
            <p class="text-lg leading-relaxed text-secondary-700 dark:text-secondary-300 md:text-xl">
              {{ item.description }}
            </p>
            <div class="mt-7 flex flex-wrap gap-3">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="rounded-xl border border-secondary-200 bg-secondary-50 px-4 py-2 font-mono text-xs text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const storyItems = [
  {
    index: "01",
    kicker: "Full-stack product work",
    title: "Building usable SaaS systems",
    description:
      "My core work is product engineering: Vue/Nuxt and React/Next interfaces, Node and Python services, API integrations, data models, deployment, and the everyday decisions that make software usable after launch.",
    tags: ["SaaS", "TypeScript", "Vue/Nuxt", "React/Next", "Node.js", "FastAPI"],
  },
  {
    index: "02",
    kicker: "Current specialization",
    title: "AI agents and automations",
    description:
      "I recently started the AI Agents & Automations course at WBS CODING SCHOOL. I am using it to deepen practical skills around LLM APIs, n8n, Make, webhooks, tool use, and automation-first product workflows.",
    tags: ["LLM APIs", "n8n", "Make", "Webhooks", "AI agents", "Groq API"],
  },
  {
    index: "03",
    kicker: "Creative systems thinking",
    title: "A technical path with a human center",
    description:
      "Before and alongside engineering I worked in creative, startup, and cross-cultural environments. That background still shapes how I think: clear interfaces, strong narratives, resilient systems, and tools that respect the person using them.",
    tags: ["Product thinking", "UX", "Storytelling", "Resilience", "Collaboration"],
  },
];

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set([".story-header-anim", ".timeline-item"], { y: 0, opacity: 1 });
    return;
  }

  gsap.from(".story-header-anim", {
    scrollTrigger: {
      trigger: ".story-header-anim",
      start: "top 85%",
      once: true,
    },
    y: 24,
    duration: 1,
    ease: "power4.out",
  });

  document.querySelectorAll(".timeline-item").forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 82%",
        once: true,
      },
      y: 24,
      duration: 0.9,
      ease: "power4.out",
    });
  });
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500;
}
</style>
