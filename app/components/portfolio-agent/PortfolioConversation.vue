<template>
  <section class="min-h-[360px]">
    <div v-if="!items.length && !isLoading" class="border border-dashed border-secondary-300 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
      <h2 class="text-lg font-semibold text-secondary-950 dark:text-white">
        {{ t("portfolioAgent.emptyTitle") }}
      </h2>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
        {{ t("portfolioAgent.emptyDescription") }}
      </p>
    </div>

    <div class="space-y-5" aria-live="polite">
      <div v-for="item in items" :key="item.id" class="grid gap-3">
        <div class="ml-auto max-w-[90%] rounded-md bg-secondary-950 px-4 py-3 text-sm leading-6 text-white dark:bg-secondary-100 dark:text-secondary-950">
          {{ item.question }}
        </div>
        <PortfolioAnswer
          v-if="item.response"
          :response="item.response"
          @ask="$emit('ask', $event)"
        />
      </div>

      <div v-if="isLoading" class="border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
        <div class="flex items-center gap-3 text-sm text-secondary-600 dark:text-secondary-300">
          <Loader2 :size="18" class="animate-spin" />
          {{ t("portfolioAgent.loading") }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import type { PortfolioAgentResponse } from "~/types/portfolio-agent";
import PortfolioAnswer from "./PortfolioAnswer.vue";

const { t } = useI18n();

defineProps<{
  items: Array<{
    id: string;
    question: string;
    response: PortfolioAgentResponse | null;
  }>;
  isLoading: boolean;
}>();

defineEmits<{
  ask: [question: string];
}>();
</script>
