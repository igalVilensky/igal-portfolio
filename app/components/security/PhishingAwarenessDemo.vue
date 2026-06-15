<template>
  <div class="glass overflow-hidden rounded-xl border border-secondary-200 dark:border-dark-border">
    <div class="border-b border-secondary-200 bg-secondary-100 px-5 py-4 dark:border-dark-border dark:bg-dark-surface">
      <h3 class="font-medium text-secondary-950 dark:text-white">Phishing & Fake Login Recognition</h3>
      <p class="mt-1 text-sm text-secondary-600 dark:text-secondary-400">
        Why visual familiarity is not proof of authenticity.
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
            <h4 class="text-lg font-medium text-secondary-900 dark:text-white">Sign in to your account</h4>
            <p class="mt-1 text-xs font-medium text-red-600 dark:text-red-400">Action Required: Verify within 24 hours</p>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-secondary-700 dark:text-secondary-300">Email address</label>
              <input type="text" disabled class="mt-1 w-full rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 text-sm text-secondary-500 opacity-70 dark:border-dark-border dark:bg-dark-bg cursor-not-allowed" value="mock-user@example.com" />
            </div>
            <div>
              <label class="block text-xs font-medium text-secondary-700 dark:text-secondary-300">Password</label>
              <input type="password" disabled class="mt-1 w-full rounded-md border border-secondary-300 bg-secondary-50 px-3 py-2 text-sm text-secondary-500 opacity-70 dark:border-dark-border dark:bg-dark-bg cursor-not-allowed" value="********" />
            </div>
            <button disabled class="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white opacity-80 cursor-not-allowed">
              Verify Account
            </button>
          </div>
        </div>

        <!-- Safer Checklist View -->
        <div class="flex flex-col justify-center rounded-md border border-secondary-200 bg-secondary-50 p-5 dark:border-dark-border dark:bg-dark-bg">
          <h4 class="font-medium text-secondary-900 dark:text-white">Verification Checklist</h4>
          <p class="mt-2 text-sm text-secondary-600 dark:text-secondary-400">Before entering credentials, verify:</p>
          
          <ul class="mt-4 space-y-3 text-sm text-secondary-700 dark:text-secondary-300">
            <li class="flex gap-2">
              <span class="text-red-500">❌</span>
              <span><strong>Check the domain:</strong> <code class="bg-secondary-200 dark:bg-secondary-800 px-1 rounded">secuure-login-update.com</code> is clearly suspicious.</span>
            </li>
            <li class="flex gap-2">
              <span class="text-red-500">❌</span>
              <span><strong>Beware urgency:</strong> "Verify within 24 hours" is a classic social engineering tactic.</span>
            </li>
            <li class="flex gap-2">
              <span class="text-green-500">✅</span>
              <span><strong>Check HTTPS:</strong> Present, but a secure connection to a fake site does not make it legitimate.</span>
            </li>
            <li class="flex gap-2">
              <span class="text-green-500">✅</span>
              <span><strong>Use a password manager:</strong> It will refuse to autofill on an unrecognized domain.</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-6 rounded-md bg-secondary-50 p-4 text-sm dark:bg-dark-bg">
        <strong class="block mb-2 font-medium text-secondary-900 dark:text-white">Takeaways:</strong>
        <p class="text-secondary-700 dark:text-secondary-400">
          Phishing often relies on urgency and visual imitation. An interface that looks identical to a trusted service is trivial to create. UI familiarity is never proof of authenticity. Always verify the domain and trust your password manager's autofill signals.
        </p>
      </div>
    </div>
  </div>
</template>
