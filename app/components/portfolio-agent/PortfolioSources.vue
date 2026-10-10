<template>
  <div v-if="sources.length" class="mt-5">
    <p class="text-xs font-semibold uppercase text-secondary-500 dark:text-secondary-400">
      {{ t("portfolioAgent.evidence") }}
    </p>
    <div class="mt-2 flex flex-wrap gap-2">
      <component
        :is="source.href ? linkComponent(source.href) : 'span'"
        v-for="source in sources"
        :key="source.id"
        v-bind="source.href ? linkBindings(source.href) : {}"
        class="rounded-md border border-secondary-200 bg-secondary-50 px-2.5 py-1.5 text-xs font-medium text-secondary-700 transition hover:border-primary-300 hover:text-primary-800 dark:border-dark-border dark:bg-dark-bg dark:text-secondary-300 dark:hover:border-primary-700 dark:hover:text-primary-200"
      >
        {{ source.label }}
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { resolveComponent } from "vue";
import type { PortfolioAgentSource } from "~/types/portfolio-agent";

defineProps<{
  sources: PortfolioAgentSource[];
}>();

const { t } = useI18n();
const localePath = useLocalePath();
const isInternal = (href: string) => href.startsWith("/") && !/\.[a-z0-9]+(?:[?#]|$)/i.test(href);
const linkComponent = (href: string) => (isInternal(href) ? resolveComponent("NuxtLink") : "a");
const linkBindings = (href: string) =>
  isInternal(href)
    ? { to: localePath(href) }
    : { href, target: href.startsWith("mailto:") ? undefined : "_blank", rel: "noopener noreferrer" };
</script>
