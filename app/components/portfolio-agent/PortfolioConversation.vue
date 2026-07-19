<template>
  <section class="min-h-[360px]" :class="{ 'pb-[45vh]': items.length }">
    <div v-if="!items.length && !isLoading" class="border border-dashed border-secondary-300 bg-white p-6 dark:border-dark-border dark:bg-dark-surface">
      <h2 class="text-lg font-semibold text-secondary-950 dark:text-white">
        {{ t("portfolioAgent.emptyTitle") }}
      </h2>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
        {{ t("portfolioAgent.emptyDescription") }}
      </p>
    </div>

    <div class="space-y-7" aria-live="polite">
      <div
        v-for="item in items"
        :id="`portfolio-entry-${item.id}`"
        :key="item.id"
        class="grid scroll-mt-28 gap-3"
      >
        <div class="ml-auto max-w-[88%] rounded-md bg-secondary-950 px-4 py-3 text-sm leading-6 text-white shadow-sm dark:bg-secondary-100 dark:text-secondary-950 sm:max-w-[76%]">
          {{ item.question }}
        </div>
        <div v-if="item.response" :id="`portfolio-answer-${item.id}`" class="max-w-3xl scroll-mt-28">
          <PortfolioAnswer
            :response="item.response"
            @ask="$emit('ask', $event)"
          />
        </div>
      </div>

      <div
        v-if="isLoading"
        id="portfolio-answer-loading"
        class="scroll-mt-28 border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface"
      >
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
