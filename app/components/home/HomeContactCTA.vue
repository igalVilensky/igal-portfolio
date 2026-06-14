<template>
  <section id="contact" class="bg-secondary-50 py-12 dark:bg-dark-bg">
    <div class="mx-auto max-w-4xl px-5 sm:px-6">
      <div class="border-t border-secondary-200 pt-8 dark:border-dark-border">
        <h2 class="text-xl font-semibold text-secondary-950 dark:text-white">
          Contact
        </h2>
        <p class="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
          {{ summary }}
        </p>

        <div class="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
          <a
            :href="`mailto:${email}`"
            class="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
          >
            Email
          </a>
          <a
            :href="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
          >
            LinkedIn
          </a>
          <a
            :href="github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  summary: string;
  email: string;
  linkedin: string;
  github: string;
}>();
</script>
