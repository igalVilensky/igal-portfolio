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
          <p class="page-kicker">{{ t('ui.professional_case_study_leanera_20222023') }}</p>
          <h1 class="page-title">{{ t('ui.leanera_digital_transition') }}</h1>
          <p class="page-intro mt-4">
            {{ t('ui.modern_vuenuxt_applications_and_productfocused_architecture_work_supporting_a') }}
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
            {{ t('ui.software_developer_contributing_frontend_architecture_and_crossfunctional_technology_choices') }}
          </dd>
        </div>
        <div
          class="border-b border-secondary-200 py-5 dark:border-dark-border sm:border-b-0 sm:border-l sm:px-6"
        >
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            {{ t('ui.stack') }}
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            {{ t('ui.vue_3_nuxt_3_typescript_tailwind_css_agile_delivery') }}
          </dd>
        </div>
        <div class="py-5 sm:border-l sm:border-secondary-200 sm:pl-6 sm:dark:border-dark-border">
          <dt class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
            {{ t('ui.outcome') }}
          </dt>
          <dd class="mt-2 leading-6 text-secondary-800 dark:text-secondary-200">
            {{ t('ui.clean_scalable_frontend_foundations_for_productfocused_systems') }}
          </dd>
        </div>
      </dl>

      <div class="max-w-3xl space-y-11">
        <section aria-labelledby="context-title">
          <h2 id="context-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.context') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.leanera_was_moving_from_service_work_toward_productfocused_systems') }}
          </p>
        </section>

        <section aria-labelledby="problem-title">
          <h2 id="problem-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.problem') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.the_transition_required_responsive_applications_cleaner_frontend_architecture_and') }}
          </p>
        </section>

        <section aria-labelledby="role-title">
          <h2 id="role-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.role') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>{{ t('ui.built_responsive_web_applications_with_vue_3_nuxt_3') }}</li>
            <li>{{ t('ui.contributed_to_scalable_frontend_architecture_and_reusable_component_patterns') }}</li>
            <li>{{ t('ui.collaborated_with_crossfunctional_teammates_on_technology_choices_and_delivery') }}</li>
            <li>{{ t('ui.supported_the_companys_shift_toward_productoriented_digital_systems') }}</li>
          </ul>
        </section>

        <section aria-labelledby="implementation-title">
          <h2 id="implementation-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.implementation') }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            <li>{{ t('ui.used_vue_3_and_nuxt_3_to_structure_modern') }}</li>
            <li>{{ t('ui.applied_typescript_to_improve_type_safety_and_developer_confidence') }}</li>
            <li>{{ t('ui.used_tailwind_css_for_responsive_interface_work_and_consistent') }}</li>
            <li>{{ t('ui.helped_establish_maintainable_patterns_suitable_for_ongoing_product_development') }}</li>
          </ul>
        </section>

        <section aria-labelledby="outcome-title">
          <h2 id="outcome-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.outcome') }}
          </h2>
          <p class="mt-3 text-sm leading-7 text-secondary-700 dark:text-secondary-300">
            {{ t('ui.the_work_established_cleaner_frontend_foundations_for_leaneras_digital') }}
          </p>
        </section>

        <section aria-labelledby="stack-title" class="border-t border-secondary-200 pt-8 dark:border-dark-border">
          <h2 id="stack-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.stack') }}
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
const localePath = useLocalePath();
const { t } = useI18n();
definePageMeta({
  layout: "default",
});

useHead(() => ({
  title: t('ui.leanera_digital_transition_igal_vilensky'),
  meta: [
    {
      name: "description",
      content:
        t('ui.concise_technical_case_study_for_leanera_digital_transition_work'),
    },
  ],
}));
</script>
