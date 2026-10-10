<template>
  <div class="glass overflow-hidden rounded-xl border border-secondary-200 dark:border-dark-border">
    <div class="border-b border-secondary-200 bg-secondary-100 px-5 py-4 dark:border-dark-border dark:bg-dark-surface">
      <h3 class="font-medium text-secondary-950 dark:text-white">{{ t('ui.browser_storage_token_exposure') }}</h3>
      <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
        {{ t('ui.why_storing_sensitive_tokens_in_localstorage_is_risky') }}
      </p>
      <p class="mt-2 text-xs font-semibold uppercase tracking-widest text-secondary-400 dark:text-secondary-500">
        {{ t('ui.demonstrates_how_any_script_on_the_page_can_read') }}
      </p>
    </div>
    
    <div class="p-5">
      <div class="space-y-5">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md border border-secondary-200 bg-white p-4 dark:border-dark-border dark:bg-dark-bg">
          <div class="w-full overflow-hidden">
            <p class="text-xs font-medium text-secondary-500 dark:text-secondary-400">{{ t('ui.simulated_localstorage_state') }}</p>
            <code class="mt-1 block truncate text-sm text-secondary-900 dark:text-secondary-200">
              { "auth_token": "{{ fakeToken }}" }
            </code>
          </div>
          <button @click="generateNewToken" class="shrink-0 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            {{ t('ui.regenerate') }}
          </button>
        </div>

        <div>
          <button
            @click="simulateMaliciousRead"
            class="btn-outline w-full sm:w-auto"
          >
            {{ t('ui.simulate_malicious_script_reading_token') }}
          </button>

          <div v-if="readLog" class="mt-4 rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
            <p class="text-sm font-medium text-red-800 dark:text-red-400">{{ t('ui.script_execution_result') }}</p>
            <p class="mt-2 font-mono text-xs text-red-700 dark:text-red-300 break-all">
              > window.localStorage.getItem('auth_token')<br>
              <span class="text-red-600 dark:text-red-400">{{ readLog }}</span>
            </p>
          </div>
        </div>

        <div class="mt-6 rounded-md bg-secondary-50 p-4 text-sm dark:bg-dark-bg">
          <strong class="block mb-2 font-medium text-secondary-900 dark:text-white">{{ t('ui.takeaways') }}</strong>
          <ul class="list-inside list-disc space-y-1 text-secondary-700 dark:text-secondary-400">
            <li>{{ t('ui.localstorage_is_accessible_to_any_javascript_on_the_page') }}</li>
            <li>{{ t('ui.if_an_xss_vulnerability_exists_attackers_can_steal_stored') }}</li>
            <li>{{ t('ui.prefer_httponly_secure_cookies_for_sensitive_session_identifiers') }}</li>
            <li>{{ t('ui.always_reduce_token_lifetime_and_scope') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
import { ref } from 'vue'

const generateFakeToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.simulated_mock_token_' + Math.random().toString(36).substring(2, 10)
}

const fakeToken = ref(generateFakeToken())
const readLog = ref('')

const generateNewToken = () => {
  fakeToken.value = generateFakeToken()
  readLog.value = ''
}

const simulateMaliciousRead = () => {
  readLog.value = fakeToken.value
}
</script>
