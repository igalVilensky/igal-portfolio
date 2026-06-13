<template>
  <section id="ai-automation-focus" class="section-compact bg-secondary-50">
    <div class="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
      <div>
        <p class="page-kicker">AI / Automation focus</p>
        <h2 class="section-title">AI as an extension of software work.</h2>
        <p class="mt-5 text-base leading-7 text-secondary-600">
          The current direction is not a restart. It builds on SaaS, APIs, UX, and workflow experience to create
          AI-assisted systems with clear boundaries and human review.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="item in items"
          :key="item.title"
          class="rounded-md border border-secondary-200 bg-white p-5 shadow-sm shadow-secondary-900/5"
        >
          <h3 class="font-semibold text-secondary-950">{{ item.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-secondary-600">
            {{ item.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type FocusItem = {
  title: string;
  description: string;
};

defineProps<{
  items: FocusItem[];
}>();
</script>
