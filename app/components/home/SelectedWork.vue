<template>
  <section id="selected-work" class="section-compact bg-secondary-50 dark:bg-dark-bg">
    <div class="mx-auto max-w-4xl px-5 sm:px-6">
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-2xl font-semibold leading-tight text-secondary-950 dark:text-white">
            Selected work
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
            Four projects that show SaaS product work, full-stack delivery, and practical AI-assisted tooling.
          </p>
        </div>
        <NuxtLink to="/case-studies" class="text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200">
          More work
        </NuxtLink>
      </div>

      <div class="border-y border-secondary-200 dark:border-dark-border">
        <article
          v-for="project in projects"
          :key="project.id"
          class="grid gap-3 border-b border-secondary-200 py-6 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
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

          <div class="md:pt-1">
            <NuxtLink
              v-if="project.link && project.link.internal"
              :to="project.link.url"
              class="inline-flex text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
            >
              {{ project.link.label }}
            </NuxtLink>
            <a
              v-else-if="project.link"
              :href="project.link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
            >
              {{ project.link.label }}
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type ProjectLink = {
  url: string;
  label: string;
  internal: boolean;
};

type FeaturedProject = {
  id: string;
  title: string;
  shortDescription: string;
  techLine: string;
  link: ProjectLink | null;
};

defineProps<{
  projects: FeaturedProject[];
}>();
</script>
