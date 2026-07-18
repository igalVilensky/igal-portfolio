<template>
  <header class="page-header">
    <div class="page-header-main">
      <p class="page-kicker">{{ t("portfolioAgent.kicker") }}</p>
      <h1 class="page-title">{{ t("portfolioAgent.title") }}</h1>
    </div>
    <div class="page-header-side">
      <p class="page-intro">
        {{ t("portfolioAgent.description") }}
      </p>
      <div class="mt-5 flex flex-wrap gap-2 text-xs text-secondary-600 dark:text-secondary-400">
        <span class="rounded bg-white px-2 py-1 dark:bg-white/5">{{ t("portfolioAgent.badgeKnowledge") }}</span>
        <span class="rounded bg-white px-2 py-1 dark:bg-white/5">{{ t("portfolioAgent.badgeSources") }}</span>
        <span class="rounded bg-white px-2 py-1 dark:bg-white/5">{{ t("portfolioAgent.badgeNoBrowsing") }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>
