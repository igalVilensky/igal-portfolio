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
          <p class="page-kicker">Professional case study - Flowplace - 2023-2025</p>
          <h1 class="page-title">Flowplace: Role Compass</h1>
          <p class="page-intro mt-4">
            Talent profile feature for a SaaS platform, built with Vue/Nuxt and Directus
            and adopted by 5,000+ users in the first month.
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
            Software developer leading end-to-end product engineering for a core talent profile feature.
          </dd>
        </div>
        <div
          class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:border-l sm:px-6"
        >
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Stack
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Vue.js, Nuxt.js, TypeScript, Directus, REST APIs, CI/CD.
          </dd>
        </div>
        <div class="py-5 sm:border-l sm:border-secondary-200 sm:pl-6 sm:dark:border-dark-border">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Outcome
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Reached 5,000+ users in the first month after launch.
          </dd>
        </div>
      </dl>

      <div class="max-w-3xl space-y-11">
        <section aria-labelledby="context-title">
          <h2 id="context-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Context
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            Flowplace needed a comprehensive talent profile feature that helped users present
            skills, experience, and career aspirations inside an existing SaaS product. The work
            had to fit the current platform, support responsive product workflows, and hold up in
            a high-velocity Agile delivery environment.
          </p>
        </section>

        <section aria-labelledby="problem-title">
          <h2 id="problem-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Problem
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            The feature combined user-facing profile flows, backend content structures, and API
            integration. It needed to be usable, consistent with the broader product, accessible,
            and maintainable while continuing to ship through regular product releases.
          </p>
        </section>

        <section aria-labelledby="role-title">
          <h2 id="role-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Role
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>Led end-to-end development of the Role Compass feature.</li>
            <li>Worked across responsive UI workflows, API integration, and Directus-backed content.</li>
            <li>Improved usability, accessibility, and interface consistency across the feature.</li>
            <li>Delivered inside Agile release cycles with CI/CD and production release discipline.</li>
          </ul>
        </section>

        <section aria-labelledby="implementation-title">
          <h2 id="implementation-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Implementation
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>Built reusable Vue/Nuxt components for profile editing and display workflows.</li>
            <li>Integrated REST APIs and Directus content structures with the frontend feature.</li>
            <li>Kept the interface responsive and consistent across product states and viewport sizes.</li>
            <li>Maintained clean, testable code while the feature evolved through rapid iteration.</li>
          </ul>
        </section>

        <section aria-labelledby="outcome-title">
          <h2 id="outcome-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Outcome
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            Role Compass launched as a production SaaS feature and reached 5,000+ users in the
            first month. The work demonstrates full-stack product engineering, Vue/Nuxt delivery,
            API integration, and the ability to keep quality visible during fast product cycles.
          </p>
        </section>

        <section aria-labelledby="stack-title" class="border-t border-secondary-200 pt-8 dark:border-dark-border">
          <h2 id="stack-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Stack
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            Vue.js, Nuxt.js, TypeScript, Directus, REST APIs, CI/CD
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
  title: "Flowplace: Role Compass | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Concise technical case study for Flowplace Role Compass, a Vue/Nuxt SaaS feature adopted by 5,000+ users in the first month.",
    },
  ],
});
</script>
