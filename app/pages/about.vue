<template>
  <div class="page-shell">
    <AboutVisualizer />
    <div class="page-container">
      <header class="about-reveal page-header opacity-0">
        <div class="page-header-main">
          <span class="page-kicker">
            About
          </span>
          <h1 class="page-title">
            Full-stack developer building practical products and
            <span class="text-gradient-primary">AI workflows.</span>
          </h1>
        </div>
        <div class="page-header-side">
          <p class="page-intro">
            I build practical web products, then keep asking how the workflow could be clearer, faster, and more useful.
          </p>
        </div>
      </header>

      <section class="mb-16 grid gap-10 lg:grid-cols-12">
        <aside class="about-reveal opacity-0 lg:col-span-4">
          <div class="sticky top-28 space-y-6">
            <div class="overflow-hidden rounded-3xl border border-secondary-100 bg-secondary-100 shadow-2xl shadow-secondary-900/10 dark:border-white/10 dark:bg-white/5">
              <img
                src="/profile.jpeg"
                alt="Igal Vilensky"
                class="aspect-square h-full w-full object-cover grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>

            <div class="rounded-3xl border border-secondary-100 bg-white/75 p-6 shadow-xl shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/50">
              <h2 class="text-2xl font-bold text-secondary-900 dark:text-white">Igal Vilensky</h2>
              <p class="mt-2 font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
                Full-stack developer / Creative technologist
              </p>
              <div class="mt-6 grid gap-3">
                <div v-for="item in quickContext" :key="item.label" class="rounded-2xl bg-secondary-50 p-4 dark:bg-white/5">
                  <span class="block text-[10px] font-bold uppercase tracking-widest text-secondary-400">
                    {{ item.label }}
                  </span>
                  <span class="mt-1 block text-sm text-secondary-700 dark:text-secondary-300">
                    {{ item.value }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div class="space-y-12 lg:col-span-8">
          <section class="about-reveal rounded-3xl border border-secondary-100 bg-white/75 p-7 opacity-0 shadow-xl shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/45 md:p-10">
            <h2 class="mb-6 font-display text-3xl font-bold text-secondary-900 dark:text-white">
              Building from interface to infrastructure.
            </h2>
            <div class="space-y-5 text-lg leading-relaxed text-secondary-700 dark:text-secondary-300">
              <p>
                I am a full-stack software developer based in Leipzig, Germany. My work sits between product thinking
                and implementation: shaping user flows, building responsive interfaces, connecting APIs, structuring
                data, and deploying working software.
              </p>
              <p>
                My current stack is TypeScript-heavy across Vue/Nuxt and React/Next, with Node.js, Express, Python,
                FastAPI, PostgreSQL, Prisma, Firebase, and Firestore on the backend side. I care about clean UX, clear
                architecture, and practical delivery more than shiny complexity.
              </p>
              <p>
                I am currently expanding my full-stack background into AI agents and automation workflows through the AI
                Agents & Automations course at WBS CODING SCHOOL, with a focus on practical systems that connect APIs,
                LLMs, webhooks, and product interfaces.
              </p>
            </div>
          </section>

          <section class="about-reveal opacity-0">
            <div class="mb-8">
              <p class="text-sm font-bold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
                Working areas
              </p>
              <h2 class="mt-3 font-display text-3xl font-bold text-secondary-900 dark:text-white md:text-4xl">
                What I bring into a team or project.
              </h2>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <article
                v-for="area in workingAreas"
                :key="area.title"
                class="rounded-3xl border border-secondary-100 bg-white/75 p-6 shadow-lg shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/45"
              >
                <i :class="[area.icon, 'mb-5 text-2xl text-primary-500']"></i>
                <h3 class="mb-3 text-xl font-bold text-secondary-900 dark:text-white">{{ area.title }}</h3>
                <p class="text-sm leading-relaxed text-secondary-600 dark:text-secondary-400">
                  {{ area.description }}
                </p>
              </article>
            </div>
          </section>

          <section class="about-reveal opacity-0">
            <div class="mb-8">
              <p class="text-sm font-bold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
                Stack snapshot
              </p>
              <h2 class="mt-3 font-display text-3xl font-bold text-secondary-900 dark:text-white md:text-4xl">
                Practical tools, not a buzzword wall.
              </h2>
            </div>

            <div class="grid gap-5 md:grid-cols-2">
              <div
                v-for="group in skillGroups"
                :key="group.title"
                class="rounded-3xl border border-secondary-100 bg-white/75 p-6 shadow-lg shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/45"
              >
                <h3 class="mb-4 text-lg font-bold text-secondary-900 dark:text-white">{{ group.title }}</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="item in group.items"
                    :key="item"
                    class="rounded-xl border border-secondary-200 bg-secondary-50 px-3 py-1.5 text-xs font-medium text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section class="about-reveal rounded-3xl border border-primary-200 bg-primary-50/80 p-8 opacity-0 shadow-xl shadow-primary-500/10 dark:border-primary-400/20 dark:bg-primary-400/10 md:p-10">
        <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div class="max-w-3xl">
            <h2 class="font-display text-3xl font-bold text-secondary-900 dark:text-white">
              Open to product engineering and AI automation work.
            </h2>
            <p class="mt-4 text-lg leading-relaxed text-secondary-700 dark:text-primary-100">
              I am interested in developer roles, SaaS/product teams, practical AI tools, and automation projects that
              need thoughtful implementation rather than vague AI promises.
            </p>
          </div>
          <NuxtLink to="/contact" class="btn-primary inline-flex shrink-0 items-center justify-center gap-3 px-8 py-4">
            <span>Get in touch</span>
            <i class="fas fa-paper-plane"></i>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutVisualizer from "~/components/AboutVisualizer.vue";

const { skillGroups } = useProjects();

const quickContext = [
  { label: "Base", value: "Leipzig, Germany" },
  { label: "Core", value: "Full-stack product engineering" },
  { label: "Current learning", value: "AI Agents & Automations at WBS CODING SCHOOL" },
  { label: "Direction", value: "AI-assisted workflows, agents, APIs, webhooks" },
];

const workingAreas = [
  {
    title: "SaaS and product development",
    description:
      "I enjoy translating messy product needs into screens, flows, APIs, data models, and deployable increments.",
    icon: "fas fa-layer-group",
  },
  {
    title: "AI-assisted product workflows",
    description:
      "I am exploring AI as a practical workflow layer: summaries, decision support, structured recommendations, and human-in-the-loop tools.",
    icon: "fas fa-wand-magic-sparkles",
  },
  {
    title: "Automation systems",
    description:
      "I am building knowledge around agents, n8n, Make, webhooks, and API orchestration so products can trigger useful work beyond the UI.",
    icon: "fas fa-diagram-project",
  },
  {
    title: "Human-centered systems thinking",
    description:
      "Creative technology, performance, startup work, and cross-cultural experience all feed into how I communicate and design technical systems.",
    icon: "fas fa-compass",
  },
];

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(".about-reveal", { y: 0, opacity: 1 });
    return;
  }

  document.querySelectorAll(".about-reveal").forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay: (i % 3) * 0.08,
      ease: "power4.out",
    });
  });
});

useHead({
  title: "About | Igal Vilensky - Full-Stack Developer and AI Automation Learner",
  meta: [
    {
      name: "description",
      content:
        "Igal Vilensky is a full-stack software developer in Leipzig, Germany, focused on SaaS/product engineering and currently specializing in AI agents and automation workflows.",
    },
  ],
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-400 to-accent-500;
}
</style>
