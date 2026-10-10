<template>
  <div v-if="actions.length" class="mt-5 flex flex-wrap gap-2">
    <component
      :is="isPageLink(action) ? resolveComponent('NuxtLink') : 'a'"
      v-for="action in actions"
      :key="`${action.label}-${action.href}`"
      v-bind="isPageLink(action) ? { to: localePath(action.href) } : externalBindings(action.href)"
      class="inline-flex min-h-9 items-center gap-1.5 rounded-md border border-secondary-300 px-3 py-1.5 text-xs font-semibold text-secondary-800 transition hover:border-secondary-500 hover:text-secondary-950 dark:border-dark-border dark:text-secondary-200 dark:hover:border-secondary-500 dark:hover:text-white"
    >
      <Mail v-if="action.type === 'email'" :size="14" />
      <ExternalLink v-else-if="action.type === 'external'" :size="14" />
      <ArrowRight v-else :size="14" />
      {{ action.label }}
    </component>
  </div>
</template>

<script setup lang="ts">
import { resolveComponent } from "vue";
import { ArrowRight, ExternalLink, Mail } from "lucide-vue-next";
import type { PortfolioAgentAction } from "~/types/portfolio-agent";

defineProps<{
  actions: PortfolioAgentAction[];
}>();

const localePath = useLocalePath();
const isPageLink = (action: PortfolioAgentAction) => action.type === "internal" && !/\.[a-z0-9]+(?:[?#]|$)/i.test(action.href);
const externalBindings = (href: string) =>
  href.startsWith("mailto:")
    ? { href }
    : { href, target: "_blank", rel: "noopener noreferrer" };
</script>
