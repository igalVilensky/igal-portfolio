<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-dark-bg transition-colors duration-500">
    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 px-4 overflow-hidden">
      <!-- Background elements -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-500/5 rounded-full blur-[120px]"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10 max-w-7xl">
        <!-- Back button -->
        <NuxtLink to="/case-studies"
          class="inline-flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 mb-12 transition-colors group">
          <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          <span>Back to Projects</span>
        </NuxtLink>

        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-xs font-mono mb-6 border border-accent-200 dark:border-accent-800">
              <span class="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              SEC_PROTO: ENFORCED
            </div>
            <h1
              class="text-display-lg md:text-display-xl font-display font-bold text-secondary-900 dark:text-white mb-6">
              Industrial-Grade <span class="text-gradient-primary">Interface Security</span>
            </h1>
            <p class="text-xl text-secondary-600 dark:text-secondary-400 mb-8 leading-relaxed max-w-2xl">
              An interactive simulation platform designed to educate developers on common web vulnerabilities and
              defensive architecture. Bridging the gap between raw code and secure user experiences.
            </p>

            <!-- Metrics Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div class="space-y-1 border-l-2 border-primary-500 pl-4">
                <div class="text-2xl font-bold text-secondary-900 dark:text-white">OWASP 10</div>
                <div class="text-xs text-secondary-500 dark:text-secondary-400 uppercase tracking-widest font-bold">
                  Standard</div>
              </div>
              <div class="space-y-1 border-l-2 border-accent-500 pl-4">
                <div class="text-2xl font-bold text-secondary-900 dark:text-white">Full-Stack</div>
                <div class="text-xs text-secondary-500 dark:text-secondary-400 uppercase tracking-widest font-bold">
                  Approach</div>
              </div>
              <div class="space-y-1 border-l-2 border-secondary-400 pl-4">
                <div class="text-2xl font-bold text-secondary-900 dark:text-white">3+ Vectors</div>
                <div class="text-xs text-secondary-500 dark:text-secondary-400 uppercase tracking-widest font-bold">
                  Simulated</div>
              </div>
            </div>
          </div>

          <!-- Hero Visual: Security Score Card -->
          <div class="relative hidden lg:block">
            <div class="glass-card p-10 relative overflow-hidden group">
              <div
                class="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-colors duration-700">
              </div>

              <div class="flex flex-col items-center text-center">
                <div class="relative w-48 h-48 mb-8">
                  <svg class="w-full h-full transform -rotate-90">
                    <circle cx="96" cy="96" r="88" stroke="currentColor" stroke-width="8" fill="transparent"
                      class="text-secondary-100 dark:text-secondary-800" />
                    <circle cx="96" cy="96" r="88" stroke="currentColor" stroke-width="12" fill="transparent"
                      stroke-dasharray="552.92" stroke-dashoffset="55.29"
                      class="text-primary-500 transition-all duration-1000 ease-out" />
                  </svg>
                  <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <span class="text-5xl font-display font-bold text-secondary-900 dark:text-white">90</span>
                    <span class="text-xs text-secondary-500 font-bold uppercase tracking-widest">Health Score</span>
                  </div>
                </div>

                <h4 class="text-xl font-bold text-secondary-900 dark:text-white mb-2">Defense-in-Depth</h4>
                <p class="text-sm text-secondary-600 dark:text-secondary-400">System architecture validated against
                  automated and manual penetration testing.</p>
              </div>

              <div class="mt-8 space-y-4">
                <div class="flex justify-between items-center text-xs">
                  <span class="text-secondary-500 font-mono">ENCRYPTION: AES-256</span>
                  <span class="text-green-500 font-bold">READY</span>
                </div>
                <div class="h-1 bg-secondary-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div class="h-full bg-green-500 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Case Highlights Section -->
    <section
      class="py-24 bg-white dark:bg-dark-surface/30 border-y border-secondary-200 dark:border-white/5 relative overflow-hidden">
      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        <div class="max-w-4xl mx-auto space-y-24">
          <!-- The Challenge -->
          <div class="grid md:grid-cols-12 gap-12">
            <div class="md:col-span-4 shrink-0">
              <h2 class="text-xs font-bold text-primary-500 uppercase tracking-[0.3em] mb-4">01. The Challenge</h2>
              <h3 class="text-3xl font-display font-bold text-secondary-900 dark:text-white leading-tight">Beyond Simple
                Obfuscation</h3>
            </div>
            <div class="md:col-span-8">
              <p class="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed">
                In modern web development, security is often treated as an after-thought or delegated entirely to
                third-party tools. The challenge was to build a system that not only demonstrates vulnerabilities but
                does so in a way that provides clear, actionable "Security Blueprints" for production-grade
                applications.
              </p>
            </div>
          </div>

          <!-- The Strategy -->
          <div class="grid md:grid-cols-12 gap-12">
            <div class="md:col-span-4 shrink-0">
              <h2 class="text-xs font-bold text-accent-500 uppercase tracking-[0.3em] mb-4">02. Defensive Strategy</h2>
              <h3 class="text-3xl font-display font-bold text-secondary-900 dark:text-white leading-tight">Layered
                Protection</h3>
            </div>
            <div class="md:col-span-8">
              <div class="space-y-6">
                <div class="flex gap-4">
                  <div
                    class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                    <i class="fas fa-filter text-primary-500"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-secondary-900 dark:text-white mb-1">Input Sanitization</h4>
                    <p class="text-secondary-600 dark:text-secondary-400 text-sm italic">Eliminating XSS at the point of
                      entry using DOMPurify and strict typing.</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center shrink-0">
                    <i class="fas fa-cookie-bite text-accent-500"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-secondary-900 dark:text-white mb-1">Zero-Storage Architecture</h4>
                    <p class="text-secondary-600 dark:text-secondary-400 text-sm italic">Moving sensitive session data
                      from localStorage to HTTP-only, secure cookies.</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div
                    class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <i class="fas fa-lock text-green-500"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-secondary-900 dark:text-white mb-1">Hashing Standards</h4>
                    <p class="text-secondary-600 dark:text-secondary-400 text-sm italic">Implementing high-entropy
                      hashing (bcrypt) with adaptive work factors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lab Simulation Area -->
    <section class="py-24 px-4 overflow-hidden relative">
      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-secondary-900 dark:text-white mb-6">Interactive
            Simulation Lab</h2>
          <p class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto leading-relaxed">
            Test live hacks in a sandboxed environment to witness the real-world impact of poor technical decisions.
          </p>
        </div>

        <div class="space-y-16">
          <!-- XSS Simulation -->
          <div class="group">
            <div class="flex flex-col lg:flex-row gap-12 items-start">
              <div class="lg:w-7/12">
                <div
                  class="p-8 glass bg-white/50 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/5 shadow-xl relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary-500/30">
                  <XssDemo />
                </div>
              </div>
              <div class="lg:w-5/12 pt-8">
                <div
                  class="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold uppercase mb-6">
                  <i class="fas fa-bug"></i> High Severity
                </div>
                <h3 class="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-4">Cross-Site Scripting
                  (XSS)</h3>
                <p class="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed mb-8 italic">
                  "Attacking the bridge between server data and client-side rendering."
                </p>

                <!-- Recommendation Card -->
                <div class="bg-primary-500/5 border border-primary-500/20 rounded-2xl p-6">
                  <h4 class="font-bold text-primary-500 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i class="fas fa-shield-alt"></i> Defensive Blueprint
                  </h4>
                  <p class="text-sm text-secondary-600 dark:text-secondary-400 mb-6 italic">
                    To prevent malicious script execution, never render untrusted HTML with <code>v-html</code>. If you
                    must, use a robust sanitizer.
                  </p>
                  <div class="relative">
                    <pre
                      class="p-4 bg-secondary-900 text-white rounded-xl text-xs font-mono overflow-auto overflow-x-auto whitespace-pre">import DOMPurify from 'dompurify';
const secureHtml = DOMPurify.sanitize(userInput);</pre>
                    <button
                      @click="copyCode('import DOMPurify from \'dompurify\';\nconst secureHtml = DOMPurify.sanitize(userInput);')"
                      class="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      <i class="fas fa-copy text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- LocalStorage Simulation -->
          <div class="group pt-24 border-t border-secondary-200 dark:border-white/5">
            <div class="flex flex-col lg:flex-row-reverse gap-12 items-start">
              <div class="lg:w-7/12">
                <div
                  class="p-8 glass bg-white/50 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/5 shadow-xl relative overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:border-accent-500/30">
                  <LocalStorageDemo />
                </div>
              </div>
              <div class="lg:w-5/12 pt-8">
                <div
                  class="inline-flex items-center gap-2 px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-lg text-xs font-bold uppercase mb-6">
                  <i class="fas fa-key"></i> Critical Architecture
                </div>
                <h3 class="text-3xl font-display font-bold text-secondary-900 dark:text-white mb-4">Insecure Data
                  Persistance</h3>
                <p class="text-lg text-secondary-600 dark:text-secondary-400 leading-relaxed mb-8 italic">
                  "Why localStorage is a target for session theft."
                </p>

                <!-- Recommendation Card -->
                <div class="bg-accent-500/5 border border-accent-500/20 rounded-2xl p-6">
                  <h4 class="font-bold text-accent-500 text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <i class="fas fa-shield-alt"></i> Defensive Blueprint
                  </h4>
                  <p class="text-sm text-secondary-600 dark:text-secondary-400 mb-6 italic">
                    Always use HTTP-only, Secure, and SameSite cookies for tokens to prevent them from being accessible
                    by malicious client-side scripts.
                  </p>
                  <div class="relative">
                    <pre
                      class="p-4 bg-secondary-900 text-white rounded-xl text-xs font-mono overflow-auto overflow-x-auto whitespace-pre">res.cookie('token', token, { 
  httpOnly: true, 
  secure: true, 
  sameSite: 'strict' 
});</pre>
                    <button
                      @click="copyCode('res.cookie(\'token\', token, { \n  httpOnly: true, \n  secure: true, \n  sameSite: \'strict\' \n});')"
                      class="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                      <i class="fas fa-copy text-[10px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Developer Handbook (Final CTA/Summary) -->
    <section class="py-24 bg-secondary-900 dark:bg-black text-white relative overflow-hidden">
      <div class="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div
          class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#3b82f640_0,transparent_60%)]">
        </div>
      </div>

      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-display font-bold mb-12 flex items-center gap-4">
            <i class="fas fa-book-open text-primary-400"></i>
            The Developer's Security Handbook
          </h2>

          <div class="grid md:grid-cols-2 gap-12">
            <div class="space-y-4">
              <h4 class="text-primary-400 font-bold uppercase tracking-widest text-xs">Always</h4>
              <ul class="space-y-4">
                <li class="flex items-start gap-4">
                  <div class="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <p class="text-secondary-300 text-sm">Use <strong>Content Security Policy (CSP)</strong> headers to
                    restrict where scripts can be loaded from.</p>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <p class="text-secondary-300 text-sm">Validate and sanitize <strong>all</strong> inputs, regardless of
                    whether they come from a trusted user.</p>
                </li>
              </ul>
            </div>
            <div class="space-y-4">
              <h4 class="text-red-400 font-bold uppercase tracking-widest text-xs">Never</h4>
              <ul class="space-y-4">
                <li class="flex items-start gap-4">
                  <div class="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                  <p class="text-secondary-300 text-sm">Log sensitive user data like passwords or full authorization
                    tokens in the console or server logs.</p>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0"></div>
                  <p class="text-secondary-300 text-sm">Trust the client for <strong>authorization logic</strong>.
                    Always verify roles and permissions on every server request.</p>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-16 p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
            <h3 class="text-xl font-bold mb-4">Want to discuss your system's architecture?</h3>
            <p class="text-secondary-400 mb-8 max-w-xl mx-auto italic">"Security is a process, not a product. Let's
              build a defensive roadmap together."</p>
            <NuxtLink to="/contact"
              class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary-500/20">
              Request a Security Audit
              <i class="fas fa-arrow-right"></i>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import XssDemo from "~/components/security/XssDemo.vue";
import LocalStorageDemo from "~/components/security/LocalStorageDemo.vue";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Interface Security Case Study | Igal Vilensky",
  meta: [
    {
      name: "description",
      content: "Interactive exploration of web vulnerabilities including XSS and localStorage misuse, featuring defensive architecture strategies.",
    },
  ],
});

const copyCode = (code: string) => {
  if (code) {
    navigator.clipboard.writeText(code);
    // Simple toast could be added here
  }
};
</script>

<style scoped>
.text-gradient-primary {
  @apply bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent;
}

.glass-card {
  @apply bg-white/80 dark:bg-dark-surface/50 backdrop-blur-xl border border-secondary-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl;
}

.glass {
  @apply backdrop-blur-xl;
}
</style>
