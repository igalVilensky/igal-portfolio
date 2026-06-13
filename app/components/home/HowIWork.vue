<template>
  <section id="how-i-work" class="section-compact border-y border-secondary-200 bg-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div class="mb-9 max-w-3xl">
        <p class="page-kicker">How I work</p>
        <h2 class="section-title">Product thinking before feature noise.</h2>
        <p class="mt-5 text-base leading-7 text-secondary-600">
          The through-line is practical product engineering: understand the workflow, build the right interface,
          connect the system, test the path, and iterate with the team.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-5">
        <article
          v-for="step in steps"
          :key="step.title"
          class="rounded-md border border-secondary-200 bg-secondary-50 p-5"
        >
          <p class="text-sm font-bold text-primary-700">{{ step.index }}</p>
          <h3 class="mt-3 font-semibold text-secondary-950">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-secondary-600">
            {{ step.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type WorkStep = {
  index: string;
  title: string;
  description: string;
};

defineProps<{
  steps: WorkStep[];
}>();
</script>
