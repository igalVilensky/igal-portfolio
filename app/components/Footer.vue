<!-- app/components/Footer.vue -->
<template>
  <footer class="site-footer">
    <div class="container-wide footer-content metadata">
      <p>© {{ currentYear }} Igal Vilensky</p>

      <nav class="flex flex-wrap justify-center gap-x-5 gap-y-2" :aria-label="t('ui.footer_links')">
        <NuxtLink :to="localePath('/')" class="nav-link">{{ t('gateway.back') }}</NuxtLink>
        <NuxtLink :to="localePath('/site-directory')" class="nav-link">{{ t('gateway.allPages') }}</NuxtLink>
        <a
          href="mailto:vilenskyigal@gmail.com"
          class="nav-link"
        >
          {{ t('homePage.email') }}
        </a>
        <a
          href="https://github.com/igalVilensky"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/igalvilensky/"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-link"
        >
          LinkedIn
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
const currentYear = new Date().getFullYear();
</script>