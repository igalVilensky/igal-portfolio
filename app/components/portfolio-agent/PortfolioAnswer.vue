<template>
  <article class="border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-semibold text-primary-700 dark:text-primary-300">
        {{ t("portfolioAgent.guideLabel") }}
      </span>
      <span class="rounded bg-secondary-100 px-2 py-1 text-xs font-semibold uppercase text-secondary-600 dark:bg-white/5 dark:text-secondary-400">
        {{ statusLabel }}
      </span>
      <span class="text-xs text-secondary-500 dark:text-secondary-400">
        {{ confidenceLabel }}
      </span>
    </div>

    <p class="mt-4 whitespace-pre-line text-sm leading-7 text-secondary-700 dark:text-secondary-200">
      {{ response.answer }}
    </p>

    <div
      v-if="clarificationQuestion"
      class="mt-4 border-l-2 border-primary-400 bg-primary-50 px-4 py-3 text-sm leading-6 text-primary-950 dark:border-primary-500 dark:bg-primary-950/30 dark:text-primary-100"
    >
      {{ clarificationQuestion }}
    </div>

    <PortfolioSources :sources="response.sources" />
    <PortfolioActions :actions="response.actions" />

    <div v-if="response.suggestedQuestions.length" class="mt-5 border-t border-secondary-200 pt-4 dark:border-dark-border">
      <p class="text-xs font-semibold uppercase text-secondary-500 dark:text-secondary-400">
        {{ t("portfolioAgent.followUp") }}
      </p>
      <div class="mt-2 flex flex-wrap gap-2">
        <button
          v-for="question in response.suggestedQuestions"
          :key="question"
          type="button"
          class="rounded-md bg-secondary-50 px-2.5 py-1.5 text-left text-xs font-medium text-secondary-700 transition hover:bg-primary-50 hover:text-primary-800 dark:bg-dark-bg dark:text-secondary-300 dark:hover:bg-primary-950 dark:hover:text-primary-200"
          @click="$emit('ask', question)"
        >
          {{ question }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PortfolioAgentResponse } from "~/types/portfolio-agent";
import PortfolioActions from "./PortfolioActions.vue";
import PortfolioSources from "./PortfolioSources.vue";

const props = defineProps<{
  response: PortfolioAgentResponse;
}>();
const { t } = useI18n();

defineEmits<{
  ask: [question: string];
}>();

const statusLabel = computed(() => {
  if (props.response.status === "answered") return t("portfolioAgent.status.answered");
  if (props.response.status === "partial") return t("portfolioAgent.status.partial");
  if (props.response.status === "needs_clarification") return t("portfolioAgent.status.needsClarification");
  return t("portfolioAgent.status.unknown");
});

const confidenceLabel = computed(() =>
  `${t("portfolioAgent.confidence.label")}: ${t(`portfolioAgent.confidence.${props.response.confidence}`)}`
);

const clarificationQuestion = computed(() =>
  props.response.clarification?.question === props.response.answer
    ? ""
    : props.response.clarification?.question ?? ""
);
</script>
