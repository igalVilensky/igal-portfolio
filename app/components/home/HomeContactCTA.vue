<template>
  <section id="contact" class="section-compact bg-secondary-50">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div class="rounded-md border border-secondary-200 bg-white p-6 text-secondary-950 shadow-sm shadow-secondary-900/5 md:p-8">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <p class="text-xs font-semibold uppercase text-primary-700">Contact</p>
            <h2 class="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-3xl">
              Looking for a full-stack, frontend, SaaS, or AI automation developer?
            </h2>
            <p class="mt-5 max-w-3xl text-base leading-7 text-secondary-600">
              {{ summary }}
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <a
              :href="`mailto:${email}`"
              class="btn-primary inline-flex w-full items-center justify-center px-5 py-3 sm:w-auto"
            >
              Email
            </a>
            <a
              :href="linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center rounded-md border border-secondary-300 bg-white px-5 py-3 font-semibold text-secondary-900 transition hover:border-primary-300 hover:bg-primary-50 sm:w-auto"
            >
              LinkedIn
            </a>
            <a
              :href="github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center rounded-md border border-secondary-300 bg-white px-5 py-3 font-semibold text-secondary-900 transition hover:border-primary-300 hover:bg-primary-50 sm:w-auto"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  summary: string;
  email: string;
  linkedin: string;
  github: string;
}>();
</script>
