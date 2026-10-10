<template>
  <section class="rounded-md border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface md:p-6">
    <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
          {{ t('ui.featured_tool') }}
        </p>
        <h3 class="mt-1 text-xl font-semibold text-secondary-950 dark:text-white">
          {{ t('ui.system_design_sketcher') }}
        </h3>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
          {{ t('ui.generate_a_concise_firstpass_architecture_outline_from_a_domain') }}
        </p>
      </div>
      <p class="text-xs leading-5 text-secondary-500 dark:text-secondary-500">
        {{ t('ui.generated_sketch_not_final_architecture') }}
      </p>
    </div>

    <div v-if="!result" class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2">
        <label class="block">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">{{ t('ui.project_domain') }}</span>
          <input
            v-model="project.domain"
            type="text"
            :placeholder="t('ui.saas_education_ecommerce')"
            class="mt-2 w-full rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm text-secondary-950 transition-colors placeholder:text-secondary-400 focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder:text-secondary-500"
          />
        </label>

        <label class="block">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">{{ t('ui.primary_constraint') }}</span>
          <select
            v-model="project.constraint"
            class="mt-2 w-full rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm text-secondary-950 transition-colors focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white"
          >
            <option value="scalability">{{ t('ui.scalability') }}</option>
            <option value="security">{{ t('ui.security') }}</option>
            <option value="speed">{{ t('ui.fast_mvp_delivery') }}</option>
            <option value="complexity">{{ t('ui.complex_product_logic') }}</option>
            <option value="performance">{{ t('ui.performance') }}</option>
          </select>
        </label>
      </div>

      <label class="block">
        <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">{{ t('ui.core_requirement') }}</span>
        <textarea
          v-model="project.requirement"
          rows="4"
          :placeholder="t('ui.example_a_small_team_needs_collaborative_project_notes_with')"
          class="mt-2 w-full resize-none rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm leading-6 text-secondary-950 transition-colors placeholder:text-secondary-400 focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder:text-secondary-500"
        ></textarea>
      </label>

      <button
        type="button"
        :disabled="isLoading || !project.domain || !project.requirement"
        class="btn-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
        @click="simulate"
      >
        <Loader2 v-if="isLoading" :size="16" class="animate-spin" />
        <span>{{ isLoading ? t('ui.generating_sketch') : t('ui.generate_sketch') }}</span>
      </button>
    </div>

    <div v-else class="space-y-5">
      <div class="rounded-md border border-secondary-200 bg-secondary-50 p-4 dark:border-dark-border dark:bg-dark-bg">
        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
              {{ t('ui.generated_sketch') }}
            </p>
            <p class="mt-1 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
              {{ project.domain }} / {{ constraintLabel }}
            </p>
          </div>
          <button
            type="button"
            class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
            @click="result = null"
          >
            {{ t('ui.reset') }}
          </button>
        </div>

        <div v-if="resultSections.length" class="space-y-4">
          <section
            v-for="section in resultSections"
            :key="section.title"
            class="border-t border-secondary-200 pt-4 first:border-t-0 first:pt-0 dark:border-dark-border"
          >
            <h4 class="text-sm font-semibold text-secondary-950 dark:text-white">
              {{ section.title }}
            </h4>
            <p class="mt-2 whitespace-pre-wrap text-sm leading-6 text-secondary-700 dark:text-secondary-300">
              {{ section.content }}
            </p>
          </section>
        </div>

        <p v-else class="whitespace-pre-wrap text-sm leading-6 text-secondary-700 dark:text-secondary-300">
          {{ resultText }}
        </p>
      </div>

      <p class="text-xs leading-5 text-secondary-500 dark:text-secondary-500">
        {{ t('ui.treat_this_as_a_starting_point_for_discussion_validation') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
import { computed, reactive, ref } from "vue";
import { Loader2 } from "lucide-vue-next";

const props = withDefaults(defineProps<{ isFeatured?: boolean }>(), {
  isFeatured: true,
});

void props;

const project = reactive({
  domain: "",
  constraint: "scalability",
  requirement: "",
});

const constraintLabels = computed<Record<string, string>>(() => ({
  scalability: t('ui.scalability'),
  security: t('ui.security'),
  speed: t('ui.fast_mvp_delivery'),
  complexity: t('ui.complex_product_logic'),
  performance: t('ui.performance'),
}));

const isLoading = ref(false);
const result = ref<string | null>(null);
const resultError = ref(false);
const resultText = computed(() => resultError.value ? t("ui.could_not_generate_sketch_please_try_again") : result.value);
const groqChat = useGroqChat();

const constraintLabel = computed(() => constraintLabels.value[project.constraint] ?? project.constraint);

const resultSections = computed(() => {
  if (!result.value || resultError.value) return [];

  const sections: { title: string; content: string }[] = [];
  const lines = result.value.split("\n");
  let currentTitle = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    const titleMatch = line.match(/^\s*\d+\.\s+(.+)$/);

    if (titleMatch?.[1]) {
      if (currentTitle) {
        sections.push({
          title: currentTitle,
          content: currentContent.join("\n").trim(),
        });
      }

      currentTitle = titleMatch[1].replace(/\*\*/g, "").trim();
      currentContent = [];
    } else {
      currentContent.push(line.replace(/^\s*[-*]\s?/, "").trim());
    }
  }

  if (currentTitle) {
    sections.push({
      title: currentTitle,
      content: currentContent.join("\n").trim(),
    });
  }

  return sections.filter((section) => section.content);
});

const simulate = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  resultError.value = false;

  try {
    const rawPrompt = `Create a concise system design sketch for this product idea.

Domain: ${project.domain}
Primary constraint: ${constraintLabel.value}
Core requirement: ${project.requirement}

Write the entire response, including section titles, in ${locale.value === "de" ? "German" : locale.value === "ru" ? "Russian" : "English"}.
Return exactly these numbered sections:
1. Suggested stack
2. Architecture shape
3. Data/storage choice
4. Key tradeoff
5. MVP first step

Keep each section to 1-3 short sentences. Avoid certainty, inflated claims, and final-architecture language.`;

    const response = await groqChat({
      prompt: rawPrompt,
      maxLines: 16,
      systemPrompt:
        "You create concise, practical system design sketches for early product exploration. Be cautious, specific, and concise.",
    });

    if (response?.reply) {
      result.value = response.reply;
    } else if (response && (response as any).error) {
      resultError.value = true;
      result.value = "error";
    } else {
      resultError.value = true;
      result.value = "error";
    }
  } catch (error: any) {
    console.error("System design sketch error:", error);
    resultError.value = true;
      result.value = "error";
  } finally {
    isLoading.value = false;
  }
};
</script>
