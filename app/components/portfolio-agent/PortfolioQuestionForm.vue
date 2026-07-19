<template>
  <section class="border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface md:p-6">
    <form class="grid gap-4" @submit.prevent="submitQuestion">
      <fieldset class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <legend class="text-sm font-semibold text-secondary-950 dark:text-white">
          {{ t("portfolioAgent.conversationStyle") }}
        </legend>
        <div class="inline-flex w-fit rounded-md border border-secondary-200 bg-secondary-50 p-1 dark:border-dark-border dark:bg-dark-bg">
          <button
            v-for="option in modeOptions"
            :key="option.value"
            type="button"
            class="rounded px-3 py-1.5 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary-400"
            :class="mode === option.value
              ? 'bg-white text-secondary-950 shadow-sm dark:bg-dark-surface dark:text-white'
              : 'text-secondary-600 hover:text-secondary-950 dark:text-secondary-400 dark:hover:text-white'"
            :aria-pressed="mode === option.value"
            :disabled="isLoading"
            @click="$emit('update:mode', option.value)"
          >
            {{ t(option.labelKey) }}
          </button>
        </div>
      </fieldset>

      <div>
        <label for="portfolio-question" class="text-sm font-semibold text-secondary-950 dark:text-white">
          {{ t("portfolioAgent.inputLabel") }}
        </label>
        <div class="relative mt-3">
          <textarea
            id="portfolio-question"
            v-model="draft"
            rows="4"
            maxlength="500"
            class="w-full resize-none rounded-md border border-secondary-300 bg-secondary-50 px-4 py-3 pr-14 text-base leading-7 text-secondary-900 transition placeholder:text-secondary-400 focus:border-primary-400 dark:border-dark-border dark:bg-dark-bg dark:text-secondary-100 dark:placeholder:text-secondary-500"
            :placeholder="t('portfolioAgent.placeholder')"
            :disabled="isLoading"
            aria-describedby="portfolio-question-hint portfolio-question-meta portfolio-voice-status"
            @keydown="handleKeydown"
          />
          <button
            v-if="isSpeechReady && speechSupported"
            type="button"
            class="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border bg-white text-secondary-600 transition hover:border-primary-300 hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-dark-surface dark:text-secondary-300 dark:hover:border-primary-700 dark:hover:text-primary-200"
            :class="speechStatus === 'listening'
              ? 'border-primary-500 text-primary-700 shadow-sm ring-2 ring-primary-200 dark:border-primary-400 dark:text-primary-200 dark:ring-primary-900'
              : 'border-secondary-200 dark:border-dark-border'"
            :aria-label="voiceButtonLabel"
            :aria-pressed="speechStatus === 'listening'"
            :title="voiceButtonLabel"
            :disabled="isLoading"
            @click="toggleSpeechRecognition"
          >
            <Mic :size="18" :class="speechStatus === 'listening' ? 'animate-pulse' : ''" />
          </button>
        </div>
        <div
          id="portfolio-question-meta"
          class="mt-2 flex flex-col gap-1 text-xs text-secondary-500 dark:text-secondary-400 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
        >
          <span>{{ t("portfolioAgent.groundingNote") }}</span>
          <span>{{ draft.length }}/500</span>
        </div>
        <div
          id="portfolio-question-hint"
          class="mt-1 flex flex-col gap-1 text-xs text-secondary-500 dark:text-secondary-400 sm:flex-row sm:items-center sm:gap-3"
        >
          <span>{{ t("portfolioAgent.keyboardHint") }}</span>
          <span v-if="isSpeechReady && speechSupported">{{ t("portfolioAgent.voice.privacyNote") }}</span>
        </div>
        <p
          v-if="voiceStatusMessage"
          id="portfolio-voice-status"
          class="mt-2 text-xs text-secondary-600 dark:text-secondary-300"
          :class="speechStatus === 'error' || speechStatus === 'permission-denied' || speechStatus === 'unsupported' ? 'text-red-700 dark:text-red-300' : ''"
          aria-live="polite"
        >
          {{ voiceStatusMessage }}
        </p>
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Loader2, Mic, Send } from "lucide-vue-next";
import type { PortfolioAgentMode } from "~/types/portfolio-agent";

type SpeechStatus = "idle" | "listening" | "unsupported" | "permission-denied" | "error";

interface SpeechRecognitionEventLike extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onend: (() => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onstart: (() => void) | null;
  abort: () => void;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

const props = defineProps<{
  isLoading: boolean;
  errorMessage: string;
  suggestedQuestions: string[];
  mode: PortfolioAgentMode;
}>();

const emit = defineEmits<{
  ask: [question: string];
  "update:mode": [mode: PortfolioAgentMode];
}>();

const draft = ref("");
const { locale, t } = useI18n();
const isSpeechReady = ref(false);
const speechSupported = ref(false);
const speechStatus = ref<SpeechStatus>("idle");
const speechMessageKey = ref("");
const recognition = ref<SpeechRecognitionLike | null>(null);
const speechBaseText = ref("");
const modeOptions: Array<{ value: PortfolioAgentMode; labelKey: string }> = [
  { value: "professional", labelKey: "portfolioAgent.mode.professional" },
  { value: "conversational", labelKey: "portfolioAgent.mode.conversational" },
];

const speechLocales: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  ru: "ru-RU",
};

const speechLocale = computed(() => speechLocales[locale.value] ?? speechLocales.en);

const voiceButtonLabel = computed(() =>
  speechStatus.value === "listening"
    ? t("portfolioAgent.voice.stop")
    : t("portfolioAgent.voice.start")
);

const voiceStatusMessage = computed(() => {
  if (speechStatus.value === "listening") return t("portfolioAgent.voice.listening");
  if (speechStatus.value === "unsupported") return t("portfolioAgent.voice.unsupported");
  if (speechMessageKey.value) return t(speechMessageKey.value);
  return "";
});

const getSpeechRecognitionConstructor = (): SpeechRecognitionConstructor | null => {
  if (!import.meta.client) return null;
  const speechWindow = window as Window & {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null;
};

const appendTranscript = (baseText: string, transcript: string) => {
  const cleanTranscript = transcript.replace(/\s+/g, " ").trim();
  if (!cleanTranscript) return baseText;

  const cleanBase = baseText.trimEnd();
  return cleanBase ? `${cleanBase} ${cleanTranscript}` : cleanTranscript;
};

const cleanupRecognition = () => {
  if (!recognition.value) return;
  recognition.value.onend = null;
  recognition.value.onerror = null;
  recognition.value.onresult = null;
  recognition.value.onstart = null;
  recognition.value = null;
};

const stopListening = (abort = false) => {
  if (!recognition.value) return;

  const activeRecognition = recognition.value;
  cleanupRecognition();

  try {
    if (abort) {
      activeRecognition.abort();
    } else {
      activeRecognition.stop();
    }
  } catch {
    // Browsers can throw if recognition has already ended.
  }

  if (speechStatus.value === "listening") {
    speechStatus.value = "idle";
  }
};

const handleSpeechError = (event: SpeechRecognitionErrorEventLike) => {
  if (import.meta.dev) {
    console.info("Speech recognition stopped", { error: event.error, message: event.message });
  }

  if (event.error === "aborted") {
    speechStatus.value = "idle";
    speechMessageKey.value = "";
    return;
  }

  if (event.error === "not-allowed" || event.error === "service-not-allowed") {
    speechStatus.value = "permission-denied";
    speechMessageKey.value = "portfolioAgent.voice.permissionDenied";
    return;
  }

  speechStatus.value = "error";

  if (event.error === "no-speech") {
    speechMessageKey.value = "portfolioAgent.voice.noSpeech";
  } else if (event.error === "audio-capture") {
    speechMessageKey.value = "portfolioAgent.voice.audioCapture";
  } else if (event.error === "network") {
    speechMessageKey.value = "portfolioAgent.voice.networkError";
  } else {
    speechMessageKey.value = "portfolioAgent.voice.genericError";
  }
};

const startListening = () => {
  if (props.isLoading) return;

  const SpeechRecognitionConstructor = getSpeechRecognitionConstructor();
  if (!SpeechRecognitionConstructor) {
    speechSupported.value = false;
    speechStatus.value = "unsupported";
    return;
  }

  stopListening(true);
  speechBaseText.value = draft.value;
  speechMessageKey.value = "";

  const activeRecognition = new SpeechRecognitionConstructor();
  activeRecognition.continuous = false;
  activeRecognition.interimResults = true;
  activeRecognition.lang = speechLocale.value;

  activeRecognition.onstart = () => {
    speechStatus.value = "listening";
  };

  activeRecognition.onresult = (event: SpeechRecognitionEventLike) => {
    let transcript = "";

    for (let index = 0; index < event.results.length; index += 1) {
      transcript += event.results[index][0]?.transcript ?? "";
    }

    draft.value = appendTranscript(speechBaseText.value, transcript);
  };

  activeRecognition.onerror = handleSpeechError;
  activeRecognition.onend = () => {
    cleanupRecognition();
    if (speechStatus.value === "listening") {
      speechStatus.value = "idle";
    }
  };

  recognition.value = activeRecognition;

  try {
    activeRecognition.start();
  } catch {
    cleanupRecognition();
    speechStatus.value = "error";
    speechMessageKey.value = "portfolioAgent.voice.genericError";
  }
};

const toggleSpeechRecognition = () => {
  if (speechStatus.value === "listening") {
    stopListening();
    return;
  }

  startListening();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.isComposing) return;
  if (event.key !== "Enter" || event.shiftKey) return;

  event.preventDefault();
  submitQuestion();
};

const submitQuestion = () => {
  const question = draft.value.trim();
  if (!question || props.isLoading) return;
  stopListening();
  emit("ask", question);
  draft.value = "";
};

onMounted(() => {
  speechSupported.value = Boolean(getSpeechRecognitionConstructor());
  speechStatus.value = speechSupported.value ? "idle" : "unsupported";
  isSpeechReady.value = true;
});

onBeforeUnmount(() => {
  stopListening(true);
});

onBeforeRouteLeave(() => {
  stopListening(true);
});

watch(
  () => props.isLoading,
  (isLoading) => {
    if (isLoading) {
      stopListening();
      return;
    }

    if (!isLoading && draft.value.length > 500) {
      draft.value = draft.value.slice(0, 500);
    }
  },
);

watch(locale, () => {
  if (speechStatus.value === "listening") {
    stopListening(true);
  }
});
</script>
