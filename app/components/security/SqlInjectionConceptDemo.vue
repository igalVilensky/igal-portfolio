<template>
  <div class="glass overflow-hidden rounded-xl border border-secondary-200 dark:border-dark-border">
    <div class="border-b border-secondary-200 bg-secondary-100 px-5 py-4 dark:border-dark-border dark:bg-dark-surface">
      <h3 class="font-medium text-secondary-950 dark:text-white">{{ t('ui.sql_injection_concept') }}</h3>
      <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
        {{ t('ui.why_stringconcatenated_sql_is_dangerous_and_parameterized_queries_are') }}
      </p>
    </div>
    
    <div class="p-5">
      <div class="space-y-4">
        <div>
          <label for="sql-input" class="mb-2 block text-sm font-medium text-secondary-800 dark:text-secondary-200">
            {{ t('ui.simulated_username_search_input') }}
          </label>
          <div class="flex gap-3">
            <input
              id="sql-input"
              v-model="inputPayload"
              type="text"
              class="w-full rounded-md border border-secondary-300 bg-white px-3 py-2 text-sm font-mono text-secondary-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-dark-border dark:bg-dark-bg dark:text-white"
              :placeholder="t('ui.eg_admin')"
            />
            <button
              @click="injectPayload"
              class="btn-outline shrink-0"
            >
              {{ t('ui.inject_payload') }}
            </button>
          </div>
        </div>

        <div class="space-y-4 mt-6">
          <div class="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
            <h4 class="text-sm font-medium text-red-800 dark:text-red-400">{{ t('ui.unsafe_string_concatenation') }}</h4>
            <p class="mt-2 font-mono text-sm text-secondary-900 dark:text-secondary-200 break-all">
              SELECT * FROM users WHERE username = '<span class="text-red-600 font-bold dark:text-red-400">{{ inputPayload }}</span>';
            </p>
            <p v-if="isSqlInjection" class="mt-2 text-xs text-red-700 dark:text-red-400">
              {{ t('ui.result_the_query_structure_is_altered_11_is_always') }}
            </p>
          </div>

          <div class="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
            <h4 class="text-sm font-medium text-green-800 dark:text-green-400">{{ t('ui.safe_parameterized_query') }}</h4>
            <p class="mt-2 font-mono text-sm text-secondary-900 dark:text-secondary-200 break-all">
              SELECT * FROM users WHERE username = $1;
            </p>
            <div class="mt-2 flex flex-wrap gap-2 font-mono text-sm text-secondary-900 dark:text-secondary-200 break-all">
              <span class="text-green-700 dark:text-green-400 font-bold shrink-0">$1 =</span>
              <span>"{{ inputPayload }}"</span>
            </div>
            <p v-if="isSqlInjection" class="mt-2 text-xs text-green-700 dark:text-green-400">
              {{ t('ui.result_the_database_treats_the_payload_as_a_literal', { input: inputPayload }) }}
            </p>
          </div>
        </div>

        <div class="mt-6 rounded-md bg-secondary-50 p-4 text-sm dark:bg-dark-bg">
          <strong class="block mb-2 font-medium text-secondary-900 dark:text-white">{{ t('ui.takeaways') }}</strong>
          <ul class="list-inside list-disc space-y-1 text-secondary-700 dark:text-secondary-400">
            <li>{{ t('ui.never_concatenate_untrusted_input_into_database_queries') }}</li>
            <li>{{ t('ui.always_use_parameterized_queries_or_trusted_orms') }}</li>
            <li>{{ t('ui.validate_and_constrain_input_data_types_on_the_server') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
import { ref, computed } from 'vue'

const inputPayload = ref('admin')

const injectPayload = () => {
  inputPayload.value = "' OR '1'='1"
}

const isSqlInjection = computed(() => {
  return inputPayload.value.includes("' OR") || inputPayload.value.includes("'=")
})
</script>
