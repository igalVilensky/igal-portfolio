<template>
  <section
    class="p-6 border rounded-2xl shadow-md bg-white dark:bg-gray-800 mb-6 transition-all hover:shadow-lg"
  >
    <h2 class="text-xl font-bold mb-2 flex items-center">
      <i class="fas fa-shield-alt mr-2 text-teal-500"></i>
      {{ title }}
    </h2>
    <p class="text-gray-600 dark:text-gray-300 mb-4">{{ description }}</p>
    <div class="mb-4">
      <slot />
    </div>
    <details class="text-sm text-gray-500 dark:text-gray-400 cursor-pointer">
      <summary class="font-semibold flex items-center">
        <i class="fas fa-tools mr-2"></i>
        See Fix
      </summary>
      <div class="mt-2">
        <slot name="fix" />
      </div>
    </details>
  </section>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
