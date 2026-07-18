<template>
  <div class="page-shell">
    <div class="page-container">
      <PortfolioAgentHero />

      <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div class="grid gap-6">
          <PortfolioQuestionForm
            :is-loading="isLoading"
            :error-message="errorMessage"
            :suggested-questions="currentSuggestions"
            @ask="askQuestion"
          />

          <PortfolioConversation
            :items="conversationItems"
            :is-loading="isLoading"
            @ask="askQuestion"
          />
        </div>

        <aside class="border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
          <h2 class="text-sm font-semibold text-secondary-950 dark:text-white">
            {{ t("portfolioAgent.sidebarTitle") }}
          </h2>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
            <li>{{ t("portfolioAgent.sidebarRole") }}</li>
            <li>{{ t("portfolioAgent.sidebarProject") }}</li>
            <li>{{ t("portfolioAgent.sidebarTech") }}</li>
          </ul>
          <div class="mt-5 border-t border-secondary-200 pt-4 dark:border-dark-border">
            <NuxtLink :to="localePath('/case-studies')" class="text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200">
              {{ t("portfolioAgent.browseCaseStudies") }}
            </NuxtLink>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PortfolioAgentHero from "~/components/portfolio-agent/PortfolioAgentHero.vue";
import PortfolioConversation from "~/components/portfolio-agent/PortfolioConversation.vue";
import PortfolioQuestionForm from "~/components/portfolio-agent/PortfolioQuestionForm.vue";
import type {
  PortfolioAgentResponse,
  PortfolioConversationMessage,
} from "~/types/portfolio-agent";
import agentData from "../../content/portfolio-agent.json";

const { locale, t } = useI18n();
const localePath = useLocalePath();

definePageMeta({
  layout: "default",
});

useHead(() => ({
  title: t("portfolioAgent.seoTitle"),
  meta: [
    {
      name: "description",
      content: t("portfolioAgent.seoDescription"),
    },
  ],
}));

type ConversationItem = {
  id: string;
  question: string;
  response: PortfolioAgentResponse | null;
};

const portfolioAgent = usePortfolioAgent();
const conversationItems = ref<ConversationItem[]>([]);
const isLoading = ref(false);
const errorMessage = ref("");

const defaultSuggestions = computed(() =>
  agentData.suggested_questions.map((question) => t(question.translation_key))
);

const currentSuggestions = computed(() => {
  const latestResponse = [...conversationItems.value].reverse().find((item) => item.response)?.response;
  return latestResponse?.suggestedQuestions?.length
    ? latestResponse.suggestedQuestions
    : defaultSuggestions.value;
});

const buildConversationPayload = (): PortfolioConversationMessage[] =>
  conversationItems.value
    .flatMap((item): PortfolioConversationMessage[] => {
      const messages: PortfolioConversationMessage[] = [{ role: "user", content: item.question }];
      if (item.response) {
        messages.push({ role: "assistant", content: item.response.answer });
      }
      return messages;
    })
    .slice(-6);

const askQuestion = async (rawQuestion: string) => {
  const question = rawQuestion.trim();
  if (!question || isLoading.value) return;

  if (question.length > 500) {
    errorMessage.value = t("portfolioAgent.errorTooLong");
    return;
  }

  errorMessage.value = "";
  isLoading.value = true;

  const item: ConversationItem = {
    id: `${Date.now()}-${conversationItems.value.length}`,
    question,
    response: null,
  };

  conversationItems.value.push(item);

  try {
    item.response = await portfolioAgent({
      question,
      locale: locale.value,
      conversation: buildConversationPayload().slice(0, -1),
    });
  } catch {
    errorMessage.value = t("portfolioAgent.errorUnavailable");
    conversationItems.value = conversationItems.value.filter((entry) => entry.id !== item.id);
  } finally {
    isLoading.value = false;
  }
};
</script>
