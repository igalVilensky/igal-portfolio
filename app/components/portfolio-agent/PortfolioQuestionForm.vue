<template>
  <section class="border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface md:p-6">
    <form class="grid gap-4" @submit.prevent="submitQuestion">
      <div>
        <label for="portfolio-question" class="text-sm font-semibold text-secondary-950 dark:text-white">
          {{ t("portfolioAgent.inputLabel") }}
        </label>
        <textarea
          id="portfolio-question"
          v-model="draft"
          rows="4"
          maxlength="500"
          class="mt-3 w-full resize-none rounded-md border border-secondary-300 bg-secondary-50 px-4 py-3 text-base leading-7 text-secondary-900 transition placeholder:text-secondary-400 focus:border-primary-400 dark:border-dark-border dark:bg-dark-bg dark:text-secondary-100 dark:placeholder:text-secondary-500"
          :placeholder="t('portfolioAgent.placeholder')"
          :disabled="isLoading"
          @keydown.meta.enter.prevent="submitQuestion"
          @keydown.ctrl.enter.prevent="submitQuestion"
        />
        <div class="mt-2 flex items-center justify-between gap-3 text-xs text-secondary-500 dark:text-secondary-400">
          <span>{{ t("portfolioAgent.groundingNote") }}</span>
          <span>{{ draft.length }}/500</span>
        </div>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          class="btn-primary inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="isLoading || !draft.trim()"
        >
          <Loader2 v-if="isLoading" :size="17" class="animate-spin" />
          <Send v-else :size="17" />
          <span>{{ isLoading ? t("portfolioAgent.asking") : t("portfolioAgent.ask") }}</span>
        </button>
        <p v-if="errorMessage" class="text-sm text-red-700 dark:text-red-300" role="alert">
          {{ errorMessage }}
        </p>
      </div>
    </form>

    <div class="mt-6">
      <p class="text-xs font-semibold uppercase text-secondary-500 dark:text-secondary-400">
        {{ t("portfolioAgent.suggestedHeading") }}
      </p>
      <div class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="question in suggestedQuestions"
          :key="question"
          type="button"
          class="rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-left text-xs font-medium text-secondary-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border dark:bg-dark-bg dark:text-secondary-300 dark:hover:border-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-200"
          :disabled="isLoading"
          @click="$emit('ask', question)"
        >
          {{ question }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Loader2, Send } from "lucide-vue-next";

const props = defineProps<{
  isLoading: boolean;
  errorMessage: string;
  suggestedQuestions: string[];
}>();

const emit = defineEmits<{
  ask: [question: string];
}>();

const draft = ref("");
const { t } = useI18n();

const submitQuestion = () => {
  const question = draft.value.trim();
  if (!question || props.isLoading) return;
  emit("ask", question);
  draft.value = "";
};

watch(
  () => props.isLoading,
  (isLoading) => {
    if (!isLoading && draft.value.length > 500) {
      draft.value = draft.value.slice(0, 500);
    }
  },
);
</script>
