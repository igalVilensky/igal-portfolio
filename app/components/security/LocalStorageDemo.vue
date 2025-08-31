<template>
  <div class="space-y-6">
    <!-- Warning Banner -->
    <div
      class="p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center"
    >
      <span class="mr-2">⚠️</span>
      This form stores sensitive data insecurely in localStorage.
    </div>

    <!-- Fake Login -->
    <div>
      <label class="block font-semibold mb-2">Username</label>
      <div class="relative">
        <input
          v-model="username"
          type="text"
          class="w-full p-3 border rounded-lg dark:bg-gray-900 pl-10"
          placeholder="Enter username"
          aria-label="Username"
        />
        <span class="absolute left-3 top-3">👤</span>
      </div>

      <label class="block font-semibold mt-4 mb-2">Password</label>
      <div class="relative">
        <input
          v-model="password"
          type="password"
          class="w-full p-3 border rounded-lg dark:bg-gray-900 pl-10"
          placeholder="Enter password"
          aria-label="Password"
        />
        <span class="absolute left-3 top-3">🔒</span>
      </div>

      <button
        @click="login"
        class="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
        :disabled="!username || !password"
      >
        Login (insecure)
      </button>
    </div>

    <!-- Stored Data -->
    <div v-if="token" class="mt-6">
      <h3 class="font-bold text-red-600 mb-2 flex items-center">
        <span class="mr-2">🔓</span> Token stored in localStorage
      </h3>
      <pre
        class="p-4 bg-red-900 dark:bg-red-800 text-white rounded-lg border border-red-700 animate-slide-in"
        >{{ token }}</pre
      >
      <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Any script can access this token via
        <code>localStorage.getItem("authToken")</code>.
      </p>
      <button
        @click="simulateAttack"
        class="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Simulate Attack
      </button>
    </div>

    <!-- Safe Alternative -->
    <div class="mt-6">
      <h3 class="font-bold text-green-600 mb-2 flex items-center">
        <span class="mr-2">🔒</span> Safe Storage
      </h3>
      <div
        class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200"
      >
        ✅ Use HTTP-only cookies to store tokens securely, preventing
        client-side script access.
      </div>
    </div>

    <!-- Reset Button -->
    <button
      @click="reset"
      class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
    >
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");
const token = ref<string | null>(null);

function login() {
  token.value = btoa(`${username.value}:${password.value}`);
  localStorage.setItem("authToken", token.value);
}

function simulateAttack() {
  console.log(
    "Malicious script accessed token:",
    localStorage.getItem("authToken")
  );
  alert("Check the console! A malicious script just stole your token.");
}

function reset() {
  username.value = "";
  password.value = "";
  token.value = null;
  localStorage.removeItem("authToken");
}
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.5s ease-in;
}
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
