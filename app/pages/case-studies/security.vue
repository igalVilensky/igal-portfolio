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
          <p class="page-kicker">Lab case study - Security Playground</p>
          <h1 class="page-title">Security Playground</h1>
          <p class="page-intro mt-4">
            Interactive demos of common web security issues and safer implementation patterns,
            built as a developer education lab inside the portfolio.
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
            Builder of interactive developer education demos.
          </dd>
        </div>
        <div
          class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:border-l sm:px-6"
        >
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Stack
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Nuxt, Vue 3, web security concepts, OWASP-oriented examples.
          </dd>
        </div>
        <div class="py-5 sm:border-l sm:border-secondary-200 sm:pl-6 sm:dark:border-dark-border">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            Outcome
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Portfolio lab showing vulnerability simulations and remediation patterns.
          </dd>
        </div>
      </dl>

      <div class="max-w-3xl space-y-11">
        <section aria-labelledby="context-title">
          <h2 id="context-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Context
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            Security Playground is a hands-on lab for learning about common web security
            mistakes. It exists as part of the portfolio's lab environment rather than as a
            commercial product or client case study.
          </p>
        </section>

        <section aria-labelledby="problem-title">
          <h2 id="problem-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Problem
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            Web security concepts can feel abstract when they are only described in prose. The
            goal was to make vulnerabilities and safer implementation patterns easier to compare
            through focused examples.
          </p>
        </section>

        <section aria-labelledby="implementation-title">
          <h2 id="implementation-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Implementation
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>Built demonstrations around XSS, localStorage misuse, and SQL injection simulations.</li>
            <li>Contrasted unsafe patterns with safer remediation ideas for frontend developers.</li>
            <li>Used Nuxt and Vue 3 to keep examples interactive and close to real interface work.</li>
            <li>Framed the lab around practical secure-interface thinking instead of security theater.</li>
          </ul>
        </section>

        <section aria-labelledby="examples-title">
          <h2 id="examples-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Examples Covered
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>XSS risk from rendering untrusted HTML and safer output escaping patterns.</li>
            <li>Token exposure risk from browser storage and safer session handling guidance.</li>
            <li>SQL injection simulation concepts and the importance of validated server-side inputs.</li>
          </ul>
        </section>

        <section aria-labelledby="outcome-title">
          <h2 id="outcome-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Outcome
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            The lab gives the portfolio a small security-focused proof point: interactive
            vulnerability thinking, accessible remediation explanations, and practical awareness
            of how frontend decisions can affect application safety.
          </p>
        </section>

        <section aria-labelledby="stack-title" class="border-t border-secondary-200 pt-8 dark:border-dark-border">
          <h2 id="stack-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Stack
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            Nuxt, Vue 3, Web Security, OWASP
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
  title: "Security Playground | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Concise lab case study for Security Playground, a Nuxt/Vue web security education project covering common vulnerabilities and safer patterns.",
    },
  ],
});
</script>
