<template>
  <div class="page-shell">
    <article class="page-container">
      <NuxtLink
        :to="localePath('/case-studies')"
        class="mb-8 inline-flex text-sm font-medium text-secondary-600 transition-colors hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white"
      >
        {{ t('ui.back_to_work') }}
      </NuxtLink>

      <header class="page-header">
        <div class="page-header-main">
          <p class="page-kicker">{{ t('ui.professional_case_study_flowplace_20232025') }}</p>
          <h1 class="page-title">Flowplace: Role Compass</h1>
          <p class="page-intro mt-4">
            {{ t('ui.talent_profile_feature_for_a_saas_platform_built_with') }}
          </p>
        </div>
      </header>

      <dl
        class="mb-12 grid gap-0 border-y border-secondary-200 text-sm dark:border-dark-border sm:grid-cols-3"
      >
        <div class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:pr-6">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            {{ t('ui.role') }}
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            {{ t('ui.software_developer_leading_endtoend_product_engineering_for_a_core') }}
          </dd>
        </div>
        <div
          class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:border-l sm:px-6"
        >
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            {{ t('ui.stack') }}
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            Vue.js, Nuxt.js, TypeScript, Directus, REST APIs, CI/CD.
          </dd>
        </div>
        <div class="py-5 sm:border-l sm:border-secondary-200 sm:pl-6 sm:dark:border-dark-border">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            {{ t('ui.outcome') }}
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            {{ t('ui.reached_5000_users_in_the_first_month_after_launch') }}
          </dd>
        </div>
      </dl>

      <div class="max-w-3xl space-y-11">
        <section aria-labelledby="context-title">
          <h2 id="context-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.context') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.flowplace_needed_a_comprehensive_talent_profile_feature_that_helped') }}
          </p>
        </section>

        <section aria-labelledby="problem-title">
          <h2 id="problem-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.problem') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.the_feature_combined_userfacing_profile_flows_backend_content_structures') }}
          </p>
        </section>

        <section aria-labelledby="role-title">
          <h2 id="role-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.role') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>{{ t('ui.led_endtoend_development_of_the_role_compass_feature') }}</li>
            <li>{{ t('ui.worked_across_responsive_ui_workflows_api_integration_and_directusbacked') }}</li>
            <li>{{ t('ui.improved_usability_accessibility_and_interface_consistency_across_the_feature') }}</li>
            <li>{{ t('ui.delivered_inside_agile_release_cycles_with_cicd_and_production') }}</li>
          </ul>
        </section>

        <section aria-labelledby="implementation-title">
          <h2 id="implementation-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.implementation') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>{{ t('ui.built_reusable_vuenuxt_components_for_profile_editing_and_display') }}</li>
            <li>{{ t('ui.integrated_rest_apis_and_directus_content_structures_with_the') }}</li>
            <li>{{ t('ui.kept_the_interface_responsive_and_consistent_across_product_states') }}</li>
            <li>{{ t('ui.maintained_clean_testable_code_while_the_feature_evolved_through') }}</li>
          </ul>
        </section>

        <section aria-labelledby="outcome-title">
          <h2 id="outcome-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.outcome') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.role_compass_launched_as_a_production_saas_feature_and') }}
          </p>
        </section>

        <section aria-labelledby="stack-title" class="border-t border-secondary-200 pt-8 dark:border-dark-border">
          <h2 id="stack-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.stack') }}
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
const localePath = useLocalePath();
const { t } = useI18n();
definePageMeta({
  layout: "default",
});

useHead(() => ({
  title: "Flowplace: Role Compass | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        t('ui.concise_technical_case_study_for_flowplace_role_compass_a'),
    },
  ],
}));
</script>
