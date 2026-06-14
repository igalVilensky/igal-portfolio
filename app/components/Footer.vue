<!-- app/components/Footer.vue -->
<template>
  <footer class="border-t border-secondary-200 bg-secondary-50 py-8 dark:border-dark-border dark:bg-dark-bg">
    <div class="mx-auto flex max-w-4xl flex-col gap-4 px-5 text-sm text-secondary-500 dark:text-secondary-400 sm:px-6 md:flex-row md:items-center md:justify-between">
      <p>© {{ currentYear }} Igal Vilensky</p>

      <nav class="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer links">
        <a
          href="mailto:vilenskyigal@gmail.com"
          class="transition-colors hover:text-secondary-950 dark:hover:text-white"
        >
          Email
        </a>
        <a
          href="https://github.com/igalVilensky"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-secondary-950 dark:hover:text-white"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/igalvilensky/"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-secondary-950 dark:hover:text-white"
        >
          LinkedIn
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
