<template>
  <div class="page-shell">
    <div class="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col px-4 sm:px-6">
      <PortfolioAgentHero v-if="!conversationItems.length" />

      <PortfolioConversation
        :items="conversationItems"
        :is-loading="isLoading"
        class="flex-1"
        @ask="askQuestion"
      />

      <div
        class="sticky bottom-0 z-10"
        :class="conversationItems.length
          ? '-mx-4 border-t border-secondary-200/70 bg-white/90 px-4 pb-4 pt-3 backdrop-blur dark:border-dark-border/70 dark:bg-dark-surface/90 sm:-mx-6 sm:px-6'
          : 'static mt-2'"
      >
        <PortfolioQuestionForm
          :is-loading="isLoading"
          :error-message="errorMessage"
          :suggested-questions="currentSuggestions"
          :mode="selectedMode"
          :show-suggestions="!conversationItems.length"
          @update:mode="setMode"
          @ask="askQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import PortfolioAgentHero from "~/components/portfolio-agent/PortfolioAgentHero.vue";
import PortfolioConversation from "~/components/portfolio-agent/PortfolioConversation.vue";
import PortfolioQuestionForm from "~/components/portfolio-agent/PortfolioQuestionForm.vue";
import type {
  PortfolioAgentResponse,
  PortfolioAgentMode,
  PortfolioConversationMessage,
} from "~/types/portfolio-agent";
import agentData from "../../content/portfolio-agent.json";

const { locale, t } = useI18n();

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
const selectedMode = ref<PortfolioAgentMode>("professional");

const defaultSuggestions = computed(() =>
  (agentData.suggested_questions[selectedMode.value] ?? agentData.suggested_questions.professional)
    .map((question) => t(question.translation_key))
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

const waitForPaint = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

const scrollToElement = async (elementId: string, behavior: ScrollBehavior = "smooth") => {
  await nextTick();
  if (!import.meta.client) return;

  await waitForPaint();

  const element = document.getElementById(elementId);
  const scrollingElement = document.scrollingElement || document.documentElement;
  if (!element || !scrollingElement) return;

  const navbarOffset = 112;
  const top = element.getBoundingClientRect().top + window.scrollY - navbarOffset;
  scrollingElement.scrollTo({
    top: Math.max(top, 0),
    behavior,
  });
};

const setMode = (mode: PortfolioAgentMode) => {
  selectedMode.value = mode;
  if (import.meta.client) {
    sessionStorage.setItem("ask-igal-mode", mode);
  }
};

onMounted(() => {
  const storedMode = sessionStorage.getItem("ask-igal-mode");
  if (storedMode === "professional" || storedMode === "conversational") {
    selectedMode.value = storedMode;
  }
});

const askQuestion = async (rawQuestion: string) => {
  const question = rawQuestion.trim();
  if (!question || isLoading.value) return;

  if (question.length > 500) {
    errorMessage.value = "That question is a bit too long — try trimming it to 500 characters.";
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
  void scrollToElement("portfolio-answer-loading");

  try {
    const response = await portfolioAgent({
      question,
      locale: locale.value,
      mode: selectedMode.value,
      conversation: buildConversationPayload().slice(0, -1),
    });
    item.response = response;
    isLoading.value = false;
    await scrollToElement(`portfolio-answer-${item.id}`);
  } catch {
    errorMessage.value = "Something went wrong reaching the assistant. Please try again.";
    conversationItems.value = conversationItems.value.filter((entry) => entry.id !== item.id);
  } finally {
    isLoading.value = false;
  }
};
</script>