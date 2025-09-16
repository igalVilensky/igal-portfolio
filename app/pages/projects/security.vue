<template>
  <div class="max-w-5xl mx-auto py-24 px-4">
    <!-- Hero Section -->
    <header class="text-center mb-12">
      <h1 class="text-4xl font-black mb-4 flex items-center justify-center">
        <i class="fas fa-shield-alt mr-2 text-teal-500 hidden lg:block"></i>
        Security Playground
      </h1>
      <p class="text-gray-600 dark:text-gray-300 text-lg">
        Interactive Nuxt app showcasing real-world security vulnerabilities and
        their fixes.
      </p>
    </header>

    <!-- Demos -->
    <div class="space-y-8 md:grid md:grid-cols-1 md:gap-6 md:space-y-0">
      <!-- XSS Demo -->
      <SecurityDemo
        title="Cross-Site Scripting (XSS)"
        description="Danger of rendering untrusted HTML."
      >
        <XssDemo />
        <template #fix>
          <p class="my-2">
            To prevent XSS, avoid rendering raw HTML with <code>v-html</code>.
            Use text interpolation or sanitize inputs with libraries like
            DOMPurify.
          </p>
          <pre class="p-4 bg-gray-900 text-white rounded-lg font-mono">
import DOMPurify from 'dompurify';
const sanitizedInput = DOMPurify.sanitize(userInput);
          </pre>
          <button
            @click="copyCode"
            class="mt-2 px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            <i class="fas fa-copy mr-1"></i>
            Copy Code
          </button>
        </template>
      </SecurityDemo>

      <!-- LocalStorage Demo -->
      <SecurityDemo
        title="LocalStorage Misuse"
        description="Why storing sensitive data in localStorage is dangerous."
      >
        <LocalStorageDemo />
        <template #fix>
          <p class="my-2">
            Avoid storing sensitive data in localStorage, as any script can
            access it. Use HTTP-only cookies or server-side sessions.
          </p>
          <pre class="p-4 bg-gray-900 text-white rounded-lg font-mono">
// Backend (e.g., Express.js)
res.cookie('authToken', token, { httpOnly: true, secure: true });
          </pre>
          <button
            @click="copyCode"
            class="mt-2 px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            <i class="fas fa-copy mr-1"></i>
            Copy Code
          </button>
        </template>
      </SecurityDemo>

      <!-- Placeholder for Other Demos -->
      <SecurityDemo
        title="Weak Hashing"
        description="Dangers of using weak hashing algorithms."
      >
        <!-- Add WeakHashingDemo here -->
        <template #fix>
          <p class="my-2">
            Use strong hashing like bcrypt instead of MD5 or SHA-1.
          </p>
        </template>
      </SecurityDemo>
      <!-- Add more SecurityDemo components for SQL Injection, CSRF, etc. -->
    </div>
  </div>
</template>

<script setup>
import SecurityDemo from "~/components/security/SecurityDemo.vue";
import XssDemo from "~/components/security/XssDemo.vue";
import LocalStorageDemo from "~/components/security/LocalStorageDemo.vue";
import { useColorMode } from "#imports";

const colorMode = useColorMode();
function toggleColorMode() {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
}

function copyCode(event) {
  const code = event.target?.parentElement?.querySelector("pre")?.textContent;
  if (code) {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  }
}
</script>
