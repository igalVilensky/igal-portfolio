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
          <p class="page-kicker">Professional case study - ARI Motors - 2021-2022</p>
          <h1 class="page-title">ARI Motors: EV Portal</h1>
          <p class="page-intro mt-4">
            Electric vehicle comparison portal built from scratch to production in under
            three months as a solo full-stack developer.
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
            Solo full-stack developer responsible for frontend, backend, database, data handling, and launch.
          </dd>
        </div>
        <div
          class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:border-l sm:px-6"
        >
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Stack
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            JavaScript, backend APIs, database work, responsive design.
          </dd>
        </div>
        <div class="py-5 sm:border-l sm:border-secondary-200 sm:pl-6 sm:dark:border-dark-border">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Outcome
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Launched from concept to production in under three months.
          </dd>
        </div>
      </dl>

      <div class="max-w-3xl space-y-11">
        <section aria-labelledby="context-title">
          <h2 id="context-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Context
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            ARI Motors needed a comparison portal for electric commercial vehicles. The product
            had to help customers evaluate complex technical specifications in a clear interface
            while supporting vehicle data management behind the scenes.
          </p>
        </section>

        <section aria-labelledby="problem-title">
          <h2 id="problem-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Problem
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            The project combined frontend comparison workflows, backend systems, database
            architecture, and launch work under a tight deadline. The challenge was to move quickly
            without making the data model or user interface difficult to maintain.
          </p>
        </section>

        <section aria-labelledby="role-title">
          <h2 id="role-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Role
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>Owned the build as the solo full-stack developer.</li>
            <li>Designed and implemented responsive comparison interfaces for technical vehicle data.</li>
            <li>Handled backend, database, data-management, and launch responsibilities.</li>
            <li>Balanced fast delivery with maintainable structure for ongoing use.</li>
          </ul>
        </section>

        <section aria-labelledby="implementation-title">
          <h2 id="implementation-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Implementation
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>Built responsive screens for comparing electric commercial vehicle specifications.</li>
            <li>Created backend and database structures for vehicle data and comparison workflows.</li>
            <li>Organized the interface around accessible customer decision-making rather than raw specs.</li>
            <li>Focused on core functionality first, then refined the experience for launch readiness.</li>
          </ul>
        </section>

        <section aria-labelledby="outcome-title">
          <h2 id="outcome-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Outcome
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            The portal launched successfully within the under-three-month deadline. The case study
            demonstrates solo full-stack delivery, practical database and API work, and the ability
            to turn complex product information into a usable comparison workflow.
          </p>
        </section>

        <section aria-labelledby="stack-title" class="border-t border-secondary-200 pt-8 dark:border-dark-border">
          <h2 id="stack-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Stack
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            JavaScript, full-stack development, database architecture, responsive design, REST APIs
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
  title: "ARI Motors: EV Portal | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Concise technical case study for the ARI Motors EV comparison portal, delivered from concept to production in under three months.",
    },
  ],
});
</script>
