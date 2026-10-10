<template>
  <div class="page-shell">
    <div class="page-container">
      <NuxtLink
        :to="localePath('/experiments')"
        class="mb-8 inline-flex items-center gap-2 text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
      >
        {{ t('ui.back_to_experiments') }}
      </NuxtLink>

      <header class="page-header">
        <div class="page-header-main">
          <p class="page-kicker">{{ t('ui.lab_shelf') }}</p>
          <h1 class="page-title">Security Playground</h1>
          <p class="page-intro mt-4">
            {{ t('ui.interactive_demos_for_common_web_security_mistakes_and_safer') }}
          </p>
        </div>
      </header>

      <div class="mb-10 rounded-md border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
        <h2 class="text-sm font-semibold text-secondary-900 dark:text-white">{{ t('ui.safety_note') }}</h2>
        <ul class="mt-2 list-inside list-disc space-y-1 text-sm text-secondary-700 dark:text-secondary-300">
          <li>{{ t('ui.these_are_safe_educational_simulations') }}</li>
          <li>{{ t('ui.they_do_not_attack_real_systems_and_are_designed') }}</li>
          <li>{{ t('ui.they_are_intended_to_teach_secure_thinking_for_frontend') }}</li>
        </ul>
      </div>

      <div class="space-y-12 pb-16">
        <section aria-labelledby="xss-demo-title">
          <h2 id="xss-demo-title" class="sr-only">{{ t('ui.xss_demo') }}</h2>
          <XssConceptDemo />
        </section>

        <section aria-labelledby="token-storage-demo-title">
          <h2 id="token-storage-demo-title" class="sr-only">{{ t('ui.token_storage_demo') }}</h2>
          <TokenStorageDemo />
        </section>

        <section aria-labelledby="phishing-awareness-demo-title">
          <h2 id="phishing-awareness-demo-title" class="sr-only">{{ t('ui.phishing_awareness_demo') }}</h2>
          <PhishingAwarenessDemo />
        </section>

        <section aria-labelledby="sql-injection-concept-demo-title">
          <h2 id="sql-injection-concept-demo-title" class="sr-only">{{ t('ui.sql_injection_concept_demo') }}</h2>
          <SqlInjectionConceptDemo />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { t } = useI18n();
import XssConceptDemo from '~/components/security/XssConceptDemo.vue'
import TokenStorageDemo from '~/components/security/TokenStorageDemo.vue'
import PhishingAwarenessDemo from '~/components/security/PhishingAwarenessDemo.vue'
import SqlInjectionConceptDemo from '~/components/security/SqlInjectionConceptDemo.vue'

definePageMeta({
  layout: "default",
});

useHead(() => ({
  title: "Security Playground | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        t('ui.interactive_security_lab_covering_common_web_vulnerabilities_and_safe'),
    },
  ],
}));
</script>
