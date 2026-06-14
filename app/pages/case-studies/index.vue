<template>
  <div class="page-shell">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-main">
          <h1 class="page-title">Work</h1>
          <p class="page-intro mt-4">
            Selected product and engineering work. Primary projects show SaaS product delivery,
            full-stack systems, and practical AI-assisted tools.
          </p>
        </div>
      </header>

      <section aria-labelledby="primary-work-title" class="mb-14">
        <div class="mb-6">
          <h2 id="primary-work-title" class="section-title">Primary projects</h2>
        </div>

        <div class="border-y border-secondary-200 dark:border-dark-border">
          <article
            v-for="project in primaryProjects"
            :key="project.id"
            class="grid gap-4 border-b border-secondary-200 py-6 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div>
              <h3 class="text-lg font-semibold leading-snug text-secondary-950 dark:text-white">
                {{ project.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
                {{ project.shortDescription }}
              </p>
              <p class="mt-3 text-xs leading-5 text-secondary-500 dark:text-secondary-400">
                {{ project.techLine }}
              </p>
            </div>

            <ProjectLinks :links="project.links" />
          </article>
        </div>
      </section>

      <section v-if="secondaryProjects.length" aria-labelledby="secondary-work-title">
        <div class="mb-5">
          <h2 id="secondary-work-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Secondary work
          </h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
            Additional product, utility, and lab projects.
          </p>
        </div>

        <div class="border-y border-secondary-200 dark:border-dark-border">
          <article
            v-for="project in secondaryProjects"
            :key="project.id"
            class="grid gap-3 border-b border-secondary-200 py-5 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div>
              <h3 class="font-medium text-secondary-950 dark:text-white">
                {{ project.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
                {{ project.shortDescription }}
              </p>
              <p class="mt-2 text-xs leading-5 text-secondary-500 dark:text-secondary-500">
                {{ project.techLine }}
              </p>
            </div>

            <ProjectLinks :links="project.links" compact />
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, resolveComponent, type PropType } from "vue";
import type { PortfolioProject } from "~/composables/useProjects";

type ProjectLink = {
  label: string;
  url: string;
  internal: boolean;
};

type ProjectRow = PortfolioProject & {
  techLine: string;
  links: ProjectLink[];
};

const { projects } = useProjects();

const primaryProjectIds = [
  "flowplace-role-compass",
  "openme",
  "decision-matrix-ai",
  "ari-motors-ev-portal",
];

const isInternalUrl = (url: string) => url.startsWith("/");

const getProjectLinks = (project: PortfolioProject): ProjectLink[] => {
  const links: ProjectLink[] = [];

  if (project.caseStudyUrl) {
    links.push({
      label: "Case study",
      url: project.caseStudyUrl,
      internal: true,
    });
  }

  if (project.liveUrl && project.liveUrl !== project.githubUrl) {
    links.push({
      label: project.liveUrl.startsWith("/") ? "Open tool" : "Live",
      url: project.liveUrl,
      internal: isInternalUrl(project.liveUrl),
    });
  }

  if (project.githubUrl) {
    links.push({
      label: "GitHub",
      url: project.githubUrl,
      internal: false,
    });
  }

  return links;
};

const toProjectRow = (project: PortfolioProject): ProjectRow => ({
  ...project,
  techLine: project.technologies.slice(0, 5).join(" · "),
  links: getProjectLinks(project),
});

const primaryProjects = computed(() =>
  primaryProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is PortfolioProject => Boolean(project))
    .map(toProjectRow)
);

const secondaryProjects = computed(() =>
  projects
    .filter((project) => !primaryProjectIds.includes(project.id))
    .map(toProjectRow)
);

const ProjectLinks = defineComponent({
  props: {
    links: {
      type: Array as PropType<ProjectLink[]>,
      required: true,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const linkClass =
      "text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200";

    return () =>
      h(
        "div",
        {
          class: [
            "flex flex-wrap gap-x-4 gap-y-2 md:justify-end md:pt-1",
            props.compact ? "text-sm" : "",
          ],
        },
        props.links.map((link) =>
          link.internal
            ? h(
                resolveComponent("NuxtLink"),
                {
                  to: link.url,
                  class: linkClass,
                },
                () => link.label
              )
            : h(
                "a",
                {
                  href: link.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: linkClass,
                },
                link.label
              )
        )
      );
  },
});

useHead({
  title: "Work | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Selected work by Igal Vilensky: SaaS product engineering, full-stack projects, AI-assisted tools, and compact project case studies.",
    },
  ],
});
</script>
