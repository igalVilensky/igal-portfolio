<template>
  <div class="glass overflow-hidden rounded-xl border border-secondary-200 dark:border-dark-border">
    <div class="border-b border-secondary-200 bg-secondary-100 px-5 py-4 dark:border-dark-border dark:bg-dark-surface">
      <h3 class="font-medium text-secondary-950 dark:text-white">{{ t('ui.phishing_fake_login_recognition') }}</h3>
      <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
        {{ t('ui.why_visual_familiarity_is_not_proof_of_authenticity') }}
      </p>
    </div>
    
    <div class="p-5">
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Suspicious Login -->
        <div class="rounded-md border border-secondary-200 bg-white p-5 shadow-sm dark:border-dark-border dark:bg-dark-surface">
          <div class="mb-4 rounded bg-red-50 p-2 text-center border border-red-200 dark:bg-red-900/20 dark:border-red-900/30">
            <span class="text-xs font-mono text-red-600 dark:text-red-400">https://secuure-login-update.com/auth</span>
          </div>
          
          <div class="text-center mb-6">
            <div class="mx-auto mb-3 h-8 w-8 rounded-full bg-primary-600"></div>
            <h4 class="text-lg font-medium text-secondary-900 dark:text-white">{{ t('ui.sign_in_to_your_account') }}</h4>
            <p class="mt-1 text-xs font-medium text-red-600 dark:text-red-400">{{ t('ui.action_required_verify_within_24_hours') }}</p>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-secondary-700 dark:text-secondary-300">{{ t('ui.email_address') }}</label>
              <input type="text" disabled class="mt-1 w-full rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 text-sm text-secondary-500 opacity-70 dark:border-dark-border dark:bg-dark-bg cursor-not-allowed" value="mock-user@example.com" />
            </div>
            <div>
              <label class="block text-xs font-medium text-secondary-700 dark:text-secondary-300">{{ t('ui.password') }}</label>
              <input type="password" disabled class="mt-1 w-full rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 text-sm text-secondary-500 opacity-70 dark:border-dark-border dark:bg-dark-bg cursor-not-allowed" value="********" />
            </div>
            <button disabled class="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white opacity-80 cursor-not-allowed">
              {{ t('ui.verify_account') }}
            </button>
          </div>
        </div>

        <!-- Safer Checklist View -->
        <div class="flex flex-col justify-center rounded-md border border-secondary-200 bg-secondary-50 p-5 dark:border-dark-border dark:bg-dark-bg">
          <h4 class="font-medium text-secondary-900 dark:text-white">{{ t('ui.verification_checklist') }}</h4>
          <p class="mt-2 text-sm text-secondary-600 dark:text-secondary-400">{{ t('ui.before_entering_credentials_verify') }}</p>
          
          <ul class="mt-4 space-y-3 text-sm text-secondary-700 dark:text-secondary-300">
            <li class="flex gap-2">
              <span class="text-red-500">❌</span>
              <span><strong>{{ t('ui.check_the_domain') }}</strong> <code class="bg-secondary-200 dark:bg-secondary-800 px-1 rounded">secuure-login-update.com</code> {{ t('ui.is_clearly_suspicious') }}</span>
            </li>
            <li class="flex gap-2">
              <span class="text-red-500">❌</span>
              <span><strong>{{ t('ui.beware_urgency') }}</strong> {{ t('ui.verify_within_24_hours_is_a_classic_social_engineering') }}</span>
            </li>
            <li class="flex gap-2">
              <span class="text-green-500">✅</span>
              <span><strong>{{ t('ui.check_https') }}</strong> {{ t('ui.present_but_a_secure_connection_to_a_fake_site') }}</span>
            </li>
            <li class="flex gap-2">
              <span class="text-green-500">✅</span>
              <span><strong>{{ t('ui.use_a_password_manager') }}</strong> {{ t('ui.it_will_refuse_to_autofill_on_an_unrecognized_domain') }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 rounded-md bg-secondary-50 p-4 text-sm dark:bg-dark-bg">
        <strong class="block mb-2 font-medium text-secondary-900 dark:text-white">{{ t('ui.takeaways') }}</strong>
        <p class="text-secondary-700 dark:text-secondary-400">
          {{ t('ui.phishing_often_relies_on_urgency_and_visual_imitation_an') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
