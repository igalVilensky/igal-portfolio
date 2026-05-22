<template>
  <section class="relative overflow-x-hidden px-4 pb-6 pt-24 sm:px-6 sm:pt-28 md:pb-8 lg:pt-32">
    <div class="pointer-events-none absolute inset-x-0 top-0 bottom-0 z-0 overflow-hidden">
      <div
        class="absolute inset-0 z-0 bg-cover bg-center opacity-10 mix-blend-luminosity dark:opacity-20"
        style="background-image: url('/images/hero-bg.png'); mask-image: linear-gradient(to bottom, transparent, black 12%, black 86%, transparent);"
      ></div>
    </div>

    <div class="container relative z-10 mx-auto max-w-7xl">
      <div class="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:items-start lg:gap-8">
        <div class="min-w-0">
          <div class="mb-5 overflow-hidden">
            <div class="hero-anim-element translate-y-full opacity-0">
              <span class="inline-flex items-center gap-2 rounded-full border border-primary-200/70 bg-primary-100/70 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-primary-300">
                <span class="h-2 w-2 rounded-full bg-primary-500"></span>
                Full-stack developer in Leipzig
              </span>
            </div>
          </div>

          <h1 class="mb-6 max-w-5xl break-words font-display text-4xl font-bold leading-tight tracking-tight text-secondary-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span class="hero-anim-element block translate-y-full opacity-0">Building SaaS</span>
            <span class="hero-anim-element block translate-y-full opacity-0">
              products and
              <span class="text-gradient-primary">AI-assisted</span>
            </span>
            <span class="hero-anim-element block translate-y-full opacity-0">web tools.</span>
          </h1>

          <div class="mb-8 max-w-3xl overflow-hidden">
            <p class="hero-anim-element translate-y-full opacity-0 text-base leading-relaxed text-secondary-700 dark:text-secondary-300 md:text-lg">
              I am Igal Vilensky, a full-stack software developer focused on practical product engineering with
              TypeScript, Vue/Nuxt, React/Next, Node.js, Python/FastAPI, APIs, and AI-assisted workflows.
              I am currently expanding that background into AI agents and automations through WBS CODING SCHOOL.
            </p>
          </div>

          <div class="hero-anim-element mb-8 flex translate-y-10 flex-wrap gap-3 opacity-0">
            <NuxtLink to="/case-studies" class="btn-primary group inline-flex items-center gap-3 px-7 py-3">
              <span>View Work</span>
              <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="btn-outline group inline-flex items-center gap-3 border-secondary-300 px-7 py-3 text-secondary-900 backdrop-blur-sm hover:bg-secondary-100 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
            >
              <i class="fas fa-paper-plane text-primary-500 transition-transform group-hover:-translate-y-0.5"></i>
              <span>Contact / Collaborate</span>
            </NuxtLink>
          </div>

          <div class="hero-anim-element translate-y-10 opacity-0">
            <div class="flex flex-col gap-4">
              <span class="text-xs font-bold uppercase tracking-[0.22em] text-secondary-500 dark:text-secondary-400">
                Tech ecosystem
              </span>
              <div class="relative flex overflow-x-hidden whitespace-nowrap">
                <div class="animate-marquee flex items-center gap-6 py-2">
                  <span v-for="tech in techStack" :key="tech" class="flex items-center gap-2 font-mono text-sm text-secondary-500 dark:text-secondary-400 md:text-base">
                    <span class="text-primary-500/60">#</span>{{ tech }}
                  </span>
                </div>
                <div class="animate-marquee2 absolute top-0 flex items-center gap-6 py-2">
                  <span v-for="tech in techStack" :key="`copy-${tech}`" class="flex items-center gap-2 font-mono text-sm text-secondary-500 dark:text-secondary-400 md:text-base">
                    <span class="text-primary-500/60">#</span>{{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="relative z-20 w-full min-w-0 self-start lg:sticky lg:top-28">
          <div class="w-full min-w-0 rounded-2xl border border-secondary-200 bg-white/85 p-3 shadow-xl shadow-secondary-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-dark-surface/75 sm:p-5">
            <div class="mb-3 flex min-w-0 items-start justify-between gap-3 sm:mb-4 sm:gap-4">
              <div class="min-w-0">
                <p class="text-[10px] font-bold uppercase tracking-[0.28em] text-primary-600 dark:text-primary-300">
                  Current focus
                </p>
                <h2 class="mt-2 break-words font-display text-lg font-bold leading-tight text-secondary-900 dark:text-white sm:text-2xl">
                  Automation-first product workflows
                </h2>
              </div>
              <div class="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-300 sm:flex">
                <i class="fas fa-diagram-project"></i>
              </div>
            </div>

            <div class="grid min-w-0 grid-cols-2 gap-2 sm:gap-3">
              <div
                v-for="item in currentFocus"
                :key="item.title"
                class="min-w-0 rounded-xl border border-secondary-100 bg-secondary-50/80 p-2.5 dark:border-white/10 dark:bg-white/5 sm:p-3"
              >
                <h3 class="break-words text-xs font-bold leading-snug text-secondary-900 dark:text-white sm:text-sm">{{ item.title }}</h3>
                <p class="mt-1 break-words text-[11px] leading-relaxed text-secondary-600 dark:text-secondary-400 sm:text-xs">
                  {{ item.description }}
                </p>
              </div>
            </div>

            <div class="mt-3 flex min-w-0 flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
              <span
                v-for="tag in focusTags"
                :key="tag"
                class="max-w-full break-words rounded-full border border-primary-200 bg-primary-50 px-2 py-1 text-[9px] font-bold uppercase leading-tight tracking-wide text-primary-700 dark:border-primary-400/20 dark:bg-primary-400/10 dark:text-primary-200 sm:px-2.5 sm:text-[10px]"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

const { currentFocus } = useProjects();

const techStack = [
  "TypeScript",
  "Vue",
  "Nuxt",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Prisma",
  "Firebase",
  "Groq API",
  "LLM APIs",
  "n8n",
  "Make",
  "Webhooks",
  "Netlify",
  "Vercel",
  "Render",
];

const focusTags = ["AI agents", "n8n / Make", "LLM APIs", "APIs / webhooks", "practical automations"];

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(".hero-anim-element", { y: 0, opacity: 1 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.to(".hero-anim-element", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.08,
    delay: 0.2,
  });
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500;
}

.animate-marquee {
  animation: marquee 42s linear infinite;
}

.animate-marquee2 {
  animation: marquee2 42s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0%);
  }
}

.animate-marquee:hover,
.animate-marquee2:hover {
  animation-play-state: paused;
}
</style>
