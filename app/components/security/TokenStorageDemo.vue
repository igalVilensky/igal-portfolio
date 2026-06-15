<template>
  <div class="glass overflow-hidden rounded-xl border border-secondary-200 dark:border-dark-border">
    <div class="border-b border-secondary-200 bg-secondary-100 px-5 py-4 dark:border-dark-border dark:bg-dark-surface">
      <h3 class="font-medium text-secondary-950 dark:text-white">Browser Storage & Token Exposure</h3>
      <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
        Why storing sensitive tokens in localStorage is risky.
      </p>
    </div>
    
    <div class="p-5">
      <div class="space-y-5">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md border border-secondary-200 bg-white p-4 dark:border-dark-border dark:bg-dark-bg">
          <div class="w-full overflow-hidden">
            <p class="text-xs font-medium text-secondary-500 dark:text-secondary-400">Simulated localStorage state:</p>
            <code class="mt-1 block truncate text-sm text-secondary-900 dark:text-secondary-200">
              { "auth_token": "{{ fakeToken }}" }
            </code>
          </div>
          <button @click="generateNewToken" class="shrink-0 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            Regenerate
          </button>
        </div>

        <div>
          <button
            @click="simulateMaliciousRead"
            class="btn-outline w-full sm:w-auto"
          >
            Simulate malicious script reading token
          </button>

          <div v-if="readLog" class="mt-4 rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
            <p class="text-sm font-medium text-red-800 dark:text-red-400">Script execution result:</p>
            <p class="mt-2 font-mono text-xs text-red-700 dark:text-red-300 break-all">
              > window.localStorage.getItem('auth_token')<br>
              <span class="text-red-600 dark:text-red-400">{{ readLog }}</span>
            </p>
          </div>
        </div>

        <div class="mt-6 rounded-md bg-secondary-50 p-4 text-sm dark:bg-dark-bg">
          <strong class="block mb-2 font-medium text-secondary-900 dark:text-white">Takeaways:</strong>
          <ul class="list-inside list-disc space-y-1 text-secondary-700 dark:text-secondary-400">
            <li>localStorage is accessible to any JavaScript on the page.</li>
            <li>If an XSS vulnerability exists, attackers can steal stored tokens.</li>
            <li>Prefer httpOnly secure cookies for sensitive session identifiers.</li>
            <li>Always reduce token lifetime and scope.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
