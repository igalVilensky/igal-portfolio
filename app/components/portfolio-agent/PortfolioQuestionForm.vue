<template>
  <div>
    <form class="relative" @submit.prevent="submitQuestion">
      <div
        class="flex items-end gap-2 rounded-2xl border border-secondary-300 bg-white px-3 py-2 shadow-sm transition focus-within:border-primary-400 dark:border-dark-border dark:bg-dark-surface"
      >
        <button
          v-if="isSpeechReady && speechSupported"
          type="button"
          class="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-secondary-500 transition hover:bg-secondary-100 hover:text-secondary-800 disabled:cursor-not-allowed disabled:opacity-50 dark:text-secondary-400 dark:hover:bg-white/10 dark:hover:text-secondary-100"
          :class="speechStatus === 'listening' ? 'text-primary-700 dark:text-primary-300' : ''"
          :aria-label="voiceButtonLabel"
          :aria-pressed="speechStatus === 'listening'"
          :title="voiceButtonLabel"
          :disabled="isLoading"
          @click="toggleSpeechRecognition"
        >
          <Mic :size="17" :class="speechStatus === 'listening' ? 'animate-pulse' : ''" />
        </button>

        <textarea
          id="portfolio-question"
          ref="textareaRef"
          v-model="draft"
          rows="1"
          maxlength="500"
          class="max-h-40 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-base leading-6 text-secondary-900 placeholder:text-secondary-400 focus:outline-none dark:text-secondary-100 dark:placeholder:text-secondary-500"
          placeholder="Ask about a skill, or role fit…"
          :disabled="isLoading"
          aria-describedby="portfolio-voice-status"
          @keydown="handleKeydown"
          @input="autoGrow"
        />

        <button
          type="submit"
          class="mb-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-950 text-white transition hover:bg-secondary-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-secondary-950 dark:hover:bg-secondary-100"
          :disabled="isLoading || !draft.trim()"
          aria-label="Send"
        >
          <Loader2 v-if="isLoading" :size="16" class="animate-spin" />
          <Send v-else :size="16" />
        </button>
      </div>

      <div class="mt-1.5 flex items-center justify-between px-1">
        <div class="flex items-center gap-3 text-[11px] text-secondary-400 dark:text-secondary-500">
          <span class="hidden sm:inline">Enter to send, Shift+Enter for a new line</span>
          <span v-if="draft.length > 400">{{ draft.length }}/500</span>
        </div>

        <div class="inline-flex items-center gap-1 text-[11px]">
          <button
            v-for="option in modeOptions"
            :key="option.value"
            type="button"
            class="rounded-full px-2 py-0.5 font-medium transition"
            :class="mode === option.value
              ? 'bg-secondary-100 text-secondary-800 dark:bg-white/10 dark:text-secondary-100'
              : 'text-secondary-400 hover:text-secondary-700 dark:text-secondary-500 dark:hover:text-secondary-200'"
            :aria-pressed="mode === option.value"
            :disabled="isLoading"
            @click="$emit('update:mode', option.value)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <p
        v-if="voiceStatusMessage"
        id="portfolio-voice-status"
        class="mt-1.5 px-1 text-xs"
        :class="speechStatus === 'error' || speechStatus === 'permission-denied' || speechStatus === 'unsupported'
          ? 'text-red-700 dark:text-red-300'
          : 'text-secondary-500 dark:text-secondary-400'"
        aria-live="polite"
      >
        {{ voiceStatusMessage }}
      </p>

      <p v-if="errorMessage" class="mt-1.5 px-1 text-sm text-red-700 dark:text-red-300" role="alert">
        {{ errorMessage }}
      </p>
    </form>

    <div v-if="showSuggestions && suggestedQuestions.length" class="mt-4 flex flex-wrap justify-center gap-2">
      <button
        v-for="question in suggestedQuestions.slice(0, 4)"
        :key="question"
        type="button"
        class="rounded-full border border-secondary-200 bg-white px-3 py-1.5 text-xs font-medium text-secondary-600 transition hover:border-primary-300 hover:text-primary-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-dark-border dark:bg-dark-surface dark:text-secondary-300 dark:hover:border-primary-700 dark:hover:text-primary-200"
        :disabled="isLoading"
        @click="$emit('ask', question)"
      >
        {{ question }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
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
  showSuggestions: boolean;
}>();

const emit = defineEmits<{
  ask: [question: string];
  "update:mode": [mode: PortfolioAgentMode];
}>();

const draft = ref("");
const { locale } = useI18n();
const isSpeechReady = ref(false);
const speechSupported = ref(false);
const speechStatus = ref<SpeechStatus>("idle");
const speechMessage = ref("");
const recognition = ref<SpeechRecognitionLike | null>(null);
const speechBaseText = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const modeOptions: Array<{ value: PortfolioAgentMode; label: string }> = [
  { value: "professional", label: "Professional" },
  { value: "conversational", label: "Casual" },
];

const speechLocales: Record<string, string> = {
  en: "en-US",
  de: "de-DE",
  ru: "ru-RU",
};

const speechLocale = computed(() => speechLocales[locale.value] ?? speechLocales.en);

const voiceButtonLabel = computed(() =>
  speechStatus.value === "listening" ? "Stop voice input" : "Ask with your voice"
);

const voiceStatusMessage = computed(() => {
  if (speechStatus.value === "listening") return "Listening…";
  if (speechStatus.value === "unsupported") return "";
  return speechMessage.value;
});

const autoGrow = () => {
  const el = textareaRef.value;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight}px`;
};

const resetHeight = () => {
  nextTick(() => {
    const el = textareaRef.value;
    if (el) el.style.height = "auto";
  });
};

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
    speechMessage.value = "";
    return;
  }

  if (event.error === "not-allowed" || event.error === "service-not-allowed") {
    speechStatus.value = "permission-denied";
    speechMessage.value = "Microphone access was denied.";
    return;
  }

  speechStatus.value = "error";

  if (event.error === "no-speech") {
    speechMessage.value = "Didn't catch that — try again.";
  } else if (event.error === "audio-capture") {
    speechMessage.value = "No microphone was found.";
  } else if (event.error === "network") {
    speechMessage.value = "Voice input needs a network connection.";
  } else {
    speechMessage.value = "Voice input hit an error — try typing instead.";
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
  speechMessage.value = "";

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
      transcript += event.results?.[index]?.[0]?.transcript ?? "";
    }

    draft.value = appendTranscript(speechBaseText.value, transcript);
    autoGrow();
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
    speechMessage.value = "Voice input hit an error — try typing instead.";
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
  resetHeight();
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