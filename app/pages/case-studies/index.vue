<template>
  <div class="page-shell">
    <CaseStudiesVisualizer />
    <div class="page-container">
      <header class="cs-reveal page-header opacity-0">
        <div class="page-header-main">
          <span class="page-kicker">
            Work
          </span>
          <h1 class="page-title">
            Product work, full-stack systems, and
            <span class="text-gradient-primary">AI-assisted tools.</span>
          </h1>
        </div>
        <div class="page-header-side">
          <p class="page-intro">
            Serious portfolio projects first: SaaS MVPs, decision-support tools, professional case studies, and
            practical admin/product workflows.
          </p>
        </div>
      </header>

      <section class="cs-reveal mb-12 grid gap-4 opacity-0 md:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-3xl border border-secondary-100 bg-white/75 p-6 shadow-xl shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/45"
        >
          <div class="text-2xl font-display font-bold text-secondary-900 dark:text-white">{{ stat.value }}</div>
          <div class="mt-2 text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400">
            {{ stat.label }}
          </div>
        </div>
      </section>

      <section class="mb-16">
        <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-sm font-bold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
              Featured project index
            </p>
            <h2 class="mt-3 section-title">
              Built to be reviewed, not just skimmed.
            </h2>
          </div>
          <NuxtLink to="/contact" class="btn-primary inline-flex items-center gap-3 px-7 py-3">
            <span>Discuss a project</span>
            <i class="fas fa-arrow-right"></i>
          </NuxtLink>
        </div>

        <div class="grid gap-6 lg:grid-cols-2">
          <article
            v-for="project in featuredWorkProjects"
            :key="project.id"
            class="cs-reveal group rounded-3xl border border-secondary-100 bg-white/80 p-5 opacity-0 shadow-xl shadow-secondary-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary-300/60 dark:border-white/10 dark:bg-dark-surface/50"
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

              <ul class="mb-6 space-y-2">
                <li
                  v-for="highlight in project.highlights.slice(0, 3)"
                  :key="highlight"
                  class="flex items-start gap-3 text-sm text-secondary-600 dark:text-secondary-400"
                >
                  <i class="fas fa-check mt-1 text-xs text-primary-500"></i>
                  <span>{{ highlight }}</span>
                </li>
              </ul>

              <div class="mb-6 flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags.slice(0, 8)"
                  :key="tag"
                  class="rounded-xl border border-secondary-200 bg-secondary-50 px-3 py-1.5 text-xs font-medium text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
                >
                  {{ tag }}
                </span>
              </div>

              <ProjectActions :project="project" />
            </div>
          </article>
        </div>
      </section>

      <section v-if="supportingProjects.length" class="border-t border-secondary-100 pt-16 dark:border-white/10">
        <div class="mb-10 max-w-3xl">
          <p class="text-sm font-bold uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
            Additional work
          </p>
          <h2 class="mt-3 font-display text-3xl font-bold text-secondary-900 dark:text-white md:text-4xl">
            More product and engineering context.
          </h2>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
          <article
            v-for="project in supportingProjects"
            :key="project.id"
            class="cs-reveal rounded-3xl border border-secondary-100 bg-white/70 p-6 opacity-0 shadow-lg shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/40"
          >
            <p class="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
              {{ project.category }}
            </p>
            <h3 class="mb-3 text-2xl font-display font-bold text-secondary-900 dark:text-white">
              {{ project.title }}
            </h3>
            <p class="mb-5 text-sm leading-relaxed text-secondary-600 dark:text-secondary-400">
              {{ project.shortDescription }}
            </p>
            <div class="mb-5 flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags.slice(0, 6)"
                :key="tag"
                class="rounded-xl border border-secondary-200 bg-secondary-50 px-3 py-1.5 text-xs font-medium text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
              >
                {{ tag }}
              </span>
            </div>
            <ProjectActions :project="project" compact />
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onMounted, resolveComponent, type PropType } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CaseStudiesVisualizer from "~/components/CaseStudiesVisualizer.vue";
import type { PortfolioProject } from "~/composables/useProjects";

const { workProjects, featuredWorkProjects } = useProjects();

const supportingProjects = computed(() =>
  workProjects.filter((project) => !project.featuredWork)
);

const stats = [
  { value: "Full-stack", label: "Product engineering" },
  { value: "AI", label: "Current specialization" },
  { value: "SaaS", label: "MVP and workflows" },
  { value: "APIs", label: "Automations and webhooks" },
];

const isInternalUrl = (url: string) => url.startsWith("/");

const ProjectActions = defineComponent({
  props: {
    project: {
      type: Object as PropType<PortfolioProject>,
      required: true,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const linkClass =
      "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition";
    const links = () => {
      const nodes = [];

      if (props.project.liveUrl) {
        if (isInternalUrl(props.project.liveUrl)) {
          nodes.push(
            h(
              resolveComponent("NuxtLink"),
              {
                to: props.project.liveUrl,
                class: `${linkClass} text-primary-600 hover:text-primary-500 dark:text-primary-300`,
              },
              () => ["Live tool ", h("i", { class: "fas fa-arrow-right text-xs" })]
            )
          );
        } else {
          nodes.push(
            h(
              "a",
              {
                href: props.project.liveUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                class: `${linkClass} text-primary-600 hover:text-primary-500 dark:text-primary-300`,
              },
              ["Live demo ", h("i", { class: "fas fa-external-link-alt text-xs" })]
            )
          );
        }
      }

      if (props.project.githubUrl) {
        nodes.push(
          h(
            "a",
            {
              href: props.project.githubUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              class: `${linkClass} text-secondary-500 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white`,
            },
            ["GitHub ", h("i", { class: "fab fa-github" })]
          )
        );
      }

      if (props.project.caseStudyUrl) {
        nodes.push(
          h(
            resolveComponent("NuxtLink"),
            {
              to: props.project.caseStudyUrl,
              class: `${linkClass} text-secondary-500 hover:text-secondary-900 dark:text-secondary-400 dark:hover:text-white`,
            },
            () => ["View case study ", h("i", { class: "fas fa-arrow-right text-xs" })]
          )
        );
      }

      return nodes;
    };

    return () =>
      h(
        "div",
        {
          class: props.compact ? "flex flex-wrap gap-4" : "flex flex-wrap gap-5 pt-1",
        },
        links()
      );
  },
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(".cs-reveal", { y: 0, opacity: 1 });
    return;
  }

  document.querySelectorAll(".cs-reveal").forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power4.out",
    });
  });
});

useHead({
  title: "Work | Igal Vilensky - Full-Stack and AI-Assisted Product Engineering",
  meta: [
    {
      name: "description",
      content:
        "Selected portfolio work by Igal Vilensky: full-stack SaaS projects, AI-assisted product tools, automation-friendly workflows, and professional case studies.",
    },
  ],
});
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-primary-400 to-accent-500;
}
</style>
