<template>
  <section id="selected-work" class="section-compact bg-secondary-50">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div class="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div class="max-w-3xl">
          <p class="page-kicker">Selected work</p>
          <h2 class="section-title">Four projects that show the main proof.</h2>
          <p class="mt-5 text-base leading-7 text-secondary-600">
            The homepage now gives priority to the strongest SaaS, full-stack, and AI-assisted product examples.
          </p>
        </div>
        <NuxtLink to="/case-studies" class="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-800">
          <span>Open full work page</span>
          <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.id"
          class="rounded-md border border-secondary-200 bg-white p-5 shadow-sm shadow-secondary-900/5 transition-colors hover:border-primary-200 md:p-6"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase text-primary-700">
                {{ project.category }}
              </p>
              <h3 class="mt-3 text-xl font-semibold leading-snug text-secondary-950 md:text-2xl">
                {{ project.title }}
              </h3>
            </div>
            <span class="w-fit rounded-md border border-secondary-200 bg-secondary-50 px-2.5 py-1 text-xs font-medium text-secondary-600">
              Featured
            </span>
          </div>

          <p class="mt-4 text-sm leading-6 text-secondary-700">
            {{ project.shortDescription }}
          </p>
          <p class="mt-4 border-l-2 border-secondary-200 pl-4 text-sm leading-6 text-secondary-600">
            {{ project.role }}
          </p>

          <ul class="mt-5 space-y-2">
            <li
              v-for="proof in project.outcomeOrProof.slice(0, 2)"
              :key="proof"
              class="flex gap-3 text-sm leading-6 text-secondary-700"
            >
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600"></span>
              <span>{{ proof }}</span>
            </li>
          </ul>

          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="tech in project.technologies.slice(0, 6)"
              :key="tech"
              class="rounded-md border border-secondary-200 bg-secondary-50 px-2.5 py-1 text-xs text-secondary-700"
            >
              {{ tech }}
            </span>
          </div>

          <div class="mt-6">
            <NuxtLink
              v-if="project.link && project.link.internal"
              :to="project.link.url"
              class="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              <span>{{ project.link.label }}</span>
              <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
            <a
              v-else-if="project.link"
              :href="project.link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              <span>{{ project.link.label }}</span>
              <span aria-hidden="true">&nearr;</span>
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
  category: string;
  shortDescription: string;
  role: string;
  outcomeOrProof: string[];
  technologies: string[];
  link: ProjectLink | null;
};

defineProps<{
  projects: FeaturedProject[];
}>();
</script>
