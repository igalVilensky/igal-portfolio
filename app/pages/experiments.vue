<template>
  <div class="page-shell">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-main">
          <h1 class="page-title">Experiments</h1>
          <p class="page-intro mt-4">
            Small interactive tools and lab projects. Some are usable mini-tools; others are smaller proof points.
          </p>
        </div>
      </header>

      <section aria-labelledby="interactive-tools-title" class="mb-14">
        <div class="mb-6">
          <h2 id="interactive-tools-title" class="section-title">Interactive tools</h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
            Lightweight utilities for sketching, transforming, and checking interface details directly in the browser.
          </p>
        </div>

        <div class="space-y-5">
          <ArchitectSimulator is-featured />

          <div class="grid gap-5 lg:grid-cols-2">
            <JsonToTs />
            <ContrastChecker />
          </div>
        </div>
      </section>

      <section aria-labelledby="lab-shelf-title">
        <div class="mb-6">
          <h2 id="lab-shelf-title" class="section-title">Lab shelf</h2>
          <p class="mt-2 max-w-3xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
            Smaller utilities, learning projects, and exploratory builds kept intentionally quieter than the main Work page.
          </p>
        </div>

        <div class="border-y border-secondary-200 dark:border-dark-border">
          <article
            v-for="project in labRows"
            :key="project.id"
            class="grid gap-3 border-b border-secondary-200 py-5 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div>
              <h3 class="font-medium leading-snug text-secondary-950 dark:text-white">
                {{ project.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
                {{ project.shortDescription }}
              </p>
              <p class="mt-2 text-xs leading-5 text-secondary-500 dark:text-secondary-500">
                {{ project.techLine }}
              </p>
            </div>

            <div class="flex flex-wrap gap-x-4 gap-y-2 md:justify-end md:pt-1">
              <template
                v-for="link in project.links"
                :key="`${project.id}-${link.label}`"
              >
                <NuxtLink
                  v-if="link.internal"
                  :to="link.url"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </a>
              </template>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ArchitectSimulator from "~/components/ArchitectSimulator.vue";
import JsonToTs from "~/components/lab/JsonToTs.vue";
import ContrastChecker from "~/components/lab/ContrastChecker.vue";
import type { PortfolioProject } from "~/composables/useProjects";

type LabLink = {
  label: string;
  url: string;
  internal: boolean;
};

type LabRow = PortfolioProject & {
  techLine: string;
  links: LabLink[];
};

const { projects } = useProjects();

const labProjectIds = [
  "security-playground",
  "page-scope",
  "i18n-lint-cli",
  "family-space",
  "mindq-lab",
  "sunlit-tales",
];

const isInternalUrl = (url: string) => url.startsWith("/");

const getLiveLabel = (url: string) => {
  if (url.startsWith("/")) return "Open tool";
  if (url.includes("npmjs.com/package/")) return "npm";
  return "Live";
};

const getLabLinks = (project: PortfolioProject): LabLink[] => {
  const links: LabLink[] = [];

  if (project.liveUrl && project.liveUrl !== project.githubUrl) {
    links.push({
      label: getLiveLabel(project.liveUrl),
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

  if (project.caseStudyUrl) {
    links.push({
      label: "Case study",
      url: project.caseStudyUrl,
      internal: true,
    });
  }

  return links;
};

const toLabRow = (project: PortfolioProject): LabRow => ({
  ...project,
  techLine: project.technologies.slice(0, 5).join(" / "),
  links: getLabLinks(project),
});

const labRows = computed(() =>
  labProjectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is PortfolioProject => Boolean(project))
    .map(toLabRow)
);

useHead({
  title: "Experiments | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Interactive tools, lab projects, and smaller technical experiments by Igal Vilensky.",
    },
  ],
});
</script>
