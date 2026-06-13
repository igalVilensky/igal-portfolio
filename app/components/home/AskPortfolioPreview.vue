<template>
  <section id="ask-my-portfolio" class="section-compact border-y border-secondary-200 bg-secondary-100/60">
    <div class="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
      <div>
        <p class="page-kicker">Ask My Portfolio preview</p>
        <h2 class="section-title">A grounded shortcut for busy reviewers.</h2>
        <p class="mt-5 text-base leading-7 text-secondary-600">
          This preview shows the planned recruiter guide direction: concise answers based on portfolio data,
          selected projects, role fit, and documented experience.
        </p>
      </div>

      <div class="rounded-md border border-secondary-200 bg-white p-5 shadow-sm shadow-secondary-900/5 md:p-6">
        <div class="mb-5 flex flex-wrap gap-2">
          <span
            v-for="item in prompts"
            :key="item.id"
            class="rounded-md border border-secondary-200 bg-secondary-50 px-3 py-1.5 text-sm text-secondary-700"
          >
            {{ item.question }}
          </span>
        </div>

        <div class="rounded-md border border-secondary-200 border-l-4 border-l-primary-600 bg-white p-5">
          <p class="text-xs font-semibold uppercase text-primary-700">
            Sample grounded answer
          </p>
          <h3 class="mt-3 text-lg font-semibold text-secondary-950">
            {{ guidePreview?.question }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-secondary-700">
            {{ guidePreview?.answer }}
          </p>
        </div>

        <p class="mt-4 text-xs leading-5 text-secondary-500">
          Answers should stay grounded in local portfolio content and avoid external actions, browsing, or hiring promises.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type Prompt = {
  id: string;
  question: string;
};

type GuidePreview = {
  question: string;
  answer: string;
};

defineProps<{
  prompts: Prompt[];
  guidePreview?: GuidePreview;
}>();
</script>
