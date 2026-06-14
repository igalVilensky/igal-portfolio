<template>
  <div class="page-shell">
    <article class="page-container">
      <NuxtLink
        to="/case-studies"
        class="mb-8 inline-flex text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
      >
        Back to Work
      </NuxtLink>

      <header class="page-header">
        <div class="page-header-main">
          <p class="page-kicker">Professional case study - LeanERA - 2022-2023</p>
          <h1 class="page-title">LeanERA: Digital Transition</h1>
          <p class="page-intro mt-4">
            Modern Vue/Nuxt applications and product-focused architecture work supporting
            a startup's digital transition.
          </p>
        </div>
      </header>

      <dl
        class="mb-12 grid gap-0 border-y border-secondary-200 text-sm dark:border-dark-border sm:grid-cols-3"
      >
        <div class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:pr-6">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Role
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Software developer contributing frontend architecture and cross-functional technology choices.
          </dd>
        </div>
        <div
          class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:border-l sm:px-6"
        >
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Stack
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Vue 3, Nuxt 3, TypeScript, Tailwind CSS, Agile delivery.
          </dd>
        </div>
        <div class="py-5 sm:border-l sm:border-secondary-200 sm:pl-6 sm:dark:border-dark-border">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Outcome
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Clean, scalable frontend foundations for product-focused systems.
          </dd>
        </div>
      </dl>

      <div class="max-w-3xl space-y-11">
        <section aria-labelledby="context-title">
          <h2 id="context-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Context
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            LeanERA was moving from service work toward product-focused systems. The team needed
            modern, maintainable web applications and technology choices that could support a
            more scalable product foundation.
          </p>
        </section>

        <section aria-labelledby="problem-title">
          <h2 id="problem-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Problem
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            The transition required responsive applications, cleaner frontend architecture, and
            shared technical patterns. The work had to improve developer confidence while remaining
            practical for a startup environment.
          </p>
        </section>

        <section aria-labelledby="role-title">
          <h2 id="role-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Role
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>Built responsive web applications with Vue 3, Nuxt 3, TypeScript, and Tailwind CSS.</li>
            <li>Contributed to scalable frontend architecture and reusable component patterns.</li>
            <li>Collaborated with cross-functional teammates on technology choices and delivery patterns.</li>
            <li>Supported the company's shift toward product-oriented digital systems.</li>
          </ul>
        </section>

        <section aria-labelledby="implementation-title">
          <h2 id="implementation-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Implementation
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>Used Vue 3 and Nuxt 3 to structure modern application flows.</li>
            <li>Applied TypeScript to improve type safety and developer confidence.</li>
            <li>Used Tailwind CSS for responsive interface work and consistent styling.</li>
            <li>Helped establish maintainable patterns suitable for ongoing product development.</li>
          </ul>
        </section>

        <section aria-labelledby="outcome-title">
          <h2 id="outcome-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Outcome
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            The work established cleaner frontend foundations for LeanERA's digital transition.
            It demonstrates Vue/Nuxt product engineering, TypeScript adoption, responsive UI
            development, and collaboration around technical choices in a startup setting.
          </p>
        </section>

        <section aria-labelledby="stack-title" class="border-t border-secondary-200 pt-8 dark:border-dark-border">
          <h2 id="stack-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Stack
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            Vue 3, Nuxt 3, TypeScript, Tailwind CSS, Agile
          </p>
        </section>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "LeanERA: Digital Transition | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Concise technical case study for LeanERA digital transition work with Vue 3, Nuxt 3, TypeScript, and Tailwind CSS.",
    },
  ],
});
</script>
