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
          <p class="page-kicker">{{ t('ui.professional_case_study_ari_motors_20212022') }}</p>
          <h1 class="page-title">{{ t('ui.ari_motors_ev_portal') }}</h1>
          <p class="page-intro mt-4">
            {{ t('ui.electric_vehicle_comparison_portal_built_from_scratch_to_production') }}
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
            {{ t('ui.solo_fullstack_developer_responsible_for_frontend_backend_database_data') }}
          </dd>
        </div>
        <div
          class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:border-l sm:px-6"
        >
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            {{ t('ui.stack') }}
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            {{ t('ui.javascript_backend_apis_database_work_responsive_design') }}
          </dd>
        </div>
        <div class="py-5 sm:border-l sm:border-secondary-200 sm:pl-6 sm:dark:border-dark-border">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            {{ t('ui.outcome') }}
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            {{ t('ui.launched_from_concept_to_production_in_under_three_months') }}
          </dd>
        </div>
      </dl>

      <div class="max-w-3xl space-y-11">
        <section aria-labelledby="context-title">
          <h2 id="context-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.context') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.ari_motors_needed_a_comparison_portal_for_electric_commercial') }}
          </p>
        </section>

        <section aria-labelledby="problem-title">
          <h2 id="problem-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.problem') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.the_project_combined_frontend_comparison_workflows_backend_systems_database') }}
          </p>
        </section>

        <section aria-labelledby="role-title">
          <h2 id="role-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.role') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>{{ t('ui.owned_the_build_as_the_solo_fullstack_developer') }}</li>
            <li>{{ t('ui.designed_and_implemented_responsive_comparison_interfaces_for_technical_vehicle') }}</li>
            <li>{{ t('ui.handled_backend_database_datamanagement_and_launch_responsibilities') }}</li>
            <li>{{ t('ui.balanced_fast_delivery_with_maintainable_structure_for_ongoing_use') }}</li>
          </ul>
        </section>

        <section aria-labelledby="implementation-title">
          <h2 id="implementation-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.implementation') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>{{ t('ui.built_responsive_screens_for_comparing_electric_commercial_vehicle_specifications') }}</li>
            <li>{{ t('ui.created_backend_and_database_structures_for_vehicle_data_and') }}</li>
            <li>{{ t('ui.organized_the_interface_around_accessible_customer_decisionmaking_rather_than') }}</li>
            <li>{{ t('ui.focused_on_core_functionality_first_then_refined_the_experience') }}</li>
          </ul>
        </section>

        <section aria-labelledby="outcome-title">
          <h2 id="outcome-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.outcome') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.the_portal_launched_successfully_within_the_underthreemonth_deadline_the') }}
          </p>
        </section>

        <section aria-labelledby="stack-title" class="border-t border-secondary-200 pt-8 dark:border-dark-border">
          <h2 id="stack-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.stack') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.javascript_fullstack_development_database_architecture_responsive_design_rest_apis') }}
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
  title: t('ui.ari_motors_ev_portal_igal_vilensky'),
  meta: [
    {
      name: "description",
      content:
        t('ui.concise_technical_case_study_for_the_ari_motors_ev'),
    },
  ],
}));
</script>
