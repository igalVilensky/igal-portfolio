<template>
  <section id="experience-snapshot" class="section-compact border-y border-secondary-200 bg-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div class="mb-9 max-w-3xl">
        <p class="page-kicker">Experience snapshot</p>
        <h2 class="section-title">Professional context, scanned quickly.</h2>
        <p class="mt-5 text-base leading-7 text-secondary-600">
          A concise timeline linking software development, product operations, and the current AI automation course.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <article
          v-for="entry in entries"
          :key="entry.id"
          class="rounded-md border border-secondary-200 bg-secondary-50 p-5"
        >
          <p class="text-xs font-semibold uppercase text-secondary-500">
            {{ entry.timeframe }} · {{ entry.location }}
          </p>
          <h3 class="mt-3 text-lg font-semibold text-secondary-950">
            {{ entry.title }}
          </h3>
          <p class="mt-1 text-sm font-medium text-primary-700">
            {{ entry.organization }}
          </p>
          <p class="mt-3 text-sm leading-6 text-secondary-600">
            {{ entry.summary }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type ExperienceEntry = {
  id: string;
  organization: string;
  title: string;
  timeframe: string;
  location: string;
  summary: string;
};

defineProps<{
  entries: ExperienceEntry[];
}>();
</script>
