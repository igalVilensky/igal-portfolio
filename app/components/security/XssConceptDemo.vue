<template>
  <div class="glass overflow-hidden rounded-xl border border-secondary-200 dark:border-dark-border">
    <div class="border-b border-secondary-200 bg-secondary-100 px-5 py-4 dark:border-dark-border dark:bg-dark-surface">
      <h3 class="font-medium text-secondary-950 dark:text-white">{{ t('ui.xss_unsafe_html_rendering') }}</h3>
      <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
        {{ t('ui.why_rendering_untrusted_html_is_dangerous') }}
      </p>
      <p class="mt-2 text-xs font-semibold uppercase tracking-widest text-secondary-400 dark:text-secondary-500">
        {{ t('ui.shows_how_a_frontend_rendering_choice_can_introduce_script') }}
      </p>
    </div>
    
    <div class="p-5">
      <div class="space-y-4">
        <div>
          <label for="xss-input" class="mb-2 block text-sm font-medium text-secondary-800 dark:text-secondary-200">
            {{ t('ui.simulated_comment_input') }}
          </label>
          <div class="flex gap-3">
            <input
              id="xss-input"
              v-model="inputPayload"
              type="text"
              class="w-full rounded-md border border-secondary-300 bg-white px-3 py-2 text-sm text-secondary-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:border-dark-border dark:bg-dark-bg dark:text-white"
              :placeholder="t('ui.type_a_comment')"
            />
            <button
              @click="injectPayload"
              class="btn-outline shrink-0"
            >
              {{ t('ui.inject_payload') }}
            </button>
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 mt-6">
          <div class="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
            <h4 class="text-sm font-medium text-red-800 dark:text-red-400">{{ t('ui.unsafe_rendering_concept') }}</h4>
            <p class="mt-1 text-xs text-red-600 dark:text-red-500">{{ t('ui.vhtml_binding_simulated') }}</p>
            <div class="mt-3 min-h-[40px] rounded border border-red-200 bg-white p-3 text-sm text-secondary-900 dark:border-red-900/30 dark:bg-dark-bg dark:text-secondary-300">
              <span v-if="hasScriptTag" class="font-medium text-red-600">
                {{ t('ui.scripts_would_execute_here') }}
              </span>
              <span v-else>{{ inputPayload || t('ui.waiting_for_input') }}</span>
            </div>
          </div>

          <div class="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
            <h4 class="text-sm font-medium text-green-800 dark:text-green-400">{{ t('ui.safe_escaped_rendering') }}</h4>
            <p class="mt-1 text-xs text-green-600 dark:text-green-500">{{ t('ui.standard_interpolation') }}</p>
            <div class="mt-3 min-h-[40px] rounded border border-green-200 bg-white p-3 text-sm text-secondary-900 dark:border-green-900/30 dark:bg-dark-bg dark:text-secondary-300">
              {{ inputPayload || t('ui.waiting_for_input') }}
            </div>
          </div>
        </div>

        <div class="mt-6 rounded-md bg-secondary-50 p-4 text-sm dark:bg-dark-bg">
          <strong class="block mb-2 font-medium text-secondary-900 dark:text-white">{{ t('ui.takeaways') }}</strong>
          <ul class="list-inside list-disc space-y-1 text-secondary-700 dark:text-secondary-400">
            <li>{{ t('ui.never_trust_user_input') }}</li>
            <li>{{ t('ui.avoid_rendering_raw_html_from_users') }}</li>
            <li>{{ t('ui.always_escape_output_default_in_vuereact') }}</li>
            <li>{{ t('ui.if_html_is_required_sanitize_it_with_trusted_libraries') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
import { ref, computed } from 'vue'

const inputPayload = ref('')

const injectPayload = () => {
  inputPayload.value = `<img src=x onerror="alert('xss')">`
}

const hasScriptTag = computed(() => {
  return inputPayload.value.includes('<img') || inputPayload.value.includes('<script') || inputPayload.value.includes('onerror=')
})
</script>
