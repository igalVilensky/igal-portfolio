<template>
  <div class="space-y-4">
    <p class="whitespace-pre-line text-sm leading-7 text-secondary-800 dark:text-secondary-100">
      {{ response.answer }}
    </p>

    <div
      v-if="clarificationQuestion"
      class="rounded-lg border-l-2 border-primary-400 bg-primary-50 px-4 py-3 text-sm leading-6 text-primary-950 dark:border-primary-500 dark:bg-primary-950/30 dark:text-primary-100"
    >
      {{ clarificationQuestion }}
    </div>

    <p v-if="showStatusNote" class="text-xs text-secondary-500 dark:text-secondary-400">
      {{ statusNote }}
    </p>

    <PortfolioActions :actions="response.actions" />
    <PortfolioSources :sources="response.sources" />

    <div v-if="response.suggestedQuestions.length" class="flex flex-wrap gap-2 pt-1">
      <button
        v-for="question in response.suggestedQuestions.slice(0, 3)"
        :key="question"
        type="button"
        class="rounded-full border border-secondary-200 px-3 py-1.5 text-left text-xs font-medium text-secondary-600 transition hover:border-primary-300 hover:text-primary-800 dark:border-dark-border dark:text-secondary-300 dark:hover:border-primary-700 dark:hover:text-primary-200"
        @click="$emit('ask', question)"
      >
        {{ question }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PortfolioAgentResponse } from "~/types/portfolio-agent";
import PortfolioActions from "./PortfolioActions.vue";
import PortfolioSources from "./PortfolioSources.vue";

const props = defineProps<{
  response: PortfolioAgentResponse;
}>();

defineEmits<{
  ask: [question: string];
}>();

const clarificationQuestion = computed(() =>
  props.response.clarification?.question === props.response.answer
    ? ""
    : props.response.clarification?.question ?? ""
);

const showStatusNote = computed(
  () => props.response.status !== "answered" || props.response.confidence === "low"
);

const statusNote = computed(() => {
  if (props.response.status === "needs_clarification") {
    return "I need a bit more detail to answer this precisely.";
  }
  if (props.response.status === "partial") {
    return "This is a partial answer based on what's in my portfolio.";
  }
  if (props.response.status === "unknown") {
    return "I couldn't find a confident answer to this one.";
  }
  if (props.response.confidence === "low") {
    return "Take this one with a grain of salt — low confidence.";
  }
  return "";
});
</script>