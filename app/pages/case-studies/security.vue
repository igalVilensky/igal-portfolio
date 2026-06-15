<template>
  <div class="page-shell">
    <div class="page-container">
      <NuxtLink
        to="/experiments"
        class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
      >
        &larr; Back to Experiments
      </NuxtLink>

      <header class="page-header">
        <div class="page-header-main">
          <p class="page-kicker">Lab shelf</p>
          <h1 class="page-title">Security Playground</h1>
          <p class="page-intro mt-4">
            Interactive demos for common web security mistakes and safer implementation patterns.
          </p>
        </div>
      </header>

      <div class="mb-10 rounded-md border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
        <h2 class="text-sm font-semibold text-secondary-900 dark:text-white">Safety Note</h2>
        <ul class="mt-2 list-inside list-disc space-y-1 text-sm text-secondary-700 dark:text-secondary-300">
          <li>These are safe educational simulations.</li>
          <li>They do not attack real systems and are designed not to execute real payloads.</li>
          <li>They are intended to teach secure thinking for frontend and full-stack developers.</li>
        </ul>
      </div>

      <div class="space-y-12 pb-16">
        <section aria-labelledby="xss-demo-title">
          <h2 id="xss-demo-title" class="sr-only">XSS Demo</h2>
          <XssConceptDemo />
        </section>

        <section aria-labelledby="token-storage-demo-title">
          <h2 id="token-storage-demo-title" class="sr-only">Token Storage Demo</h2>
          <TokenStorageDemo />
        </section>

        <section aria-labelledby="phishing-awareness-demo-title">
          <h2 id="phishing-awareness-demo-title" class="sr-only">Phishing Awareness Demo</h2>
          <PhishingAwarenessDemo />
        </section>

        <section aria-labelledby="sql-injection-concept-demo-title">
          <h2 id="sql-injection-concept-demo-title" class="sr-only">SQL Injection Concept Demo</h2>
          <SqlInjectionConceptDemo />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import XssConceptDemo from '~/components/security/XssConceptDemo.vue'
import TokenStorageDemo from '~/components/security/TokenStorageDemo.vue'
import PhishingAwarenessDemo from '~/components/security/PhishingAwarenessDemo.vue'
import SqlInjectionConceptDemo from '~/components/security/SqlInjectionConceptDemo.vue'

definePageMeta({
  layout: "default",
});

useHead({
  title: "Security Playground | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Interactive security lab covering common web vulnerabilities and safe implementation patterns.",
    },
  ],
});
</script>
