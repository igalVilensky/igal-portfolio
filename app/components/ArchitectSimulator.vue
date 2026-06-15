<template>
  <section class="rounded-md border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface md:p-6">
    <div class="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
          Featured tool
        </p>
        <h3 class="mt-1 text-xl font-semibold text-secondary-950 dark:text-white">
          System Design Sketcher
        </h3>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-secondary-600 dark:text-secondary-400">
          Generate a concise first-pass architecture outline from a domain, constraint, and requirement.
        </p>
      </div>
      <p class="text-xs leading-5 text-secondary-500 dark:text-secondary-500">
        Generated sketch, not final architecture.
      </p>
    </div>

    <div v-if="!result" class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2">
        <label class="block">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">Project domain</span>
          <input
            v-model="project.domain"
            type="text"
            placeholder="SaaS, education, ecommerce"
            class="mt-2 w-full rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm text-secondary-950 transition-colors placeholder:text-secondary-400 focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder:text-secondary-500"
          />
        </label>

        <label class="block">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">Primary constraint</span>
          <select
            v-model="project.constraint"
            class="mt-2 w-full rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm text-secondary-950 transition-colors focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white"
          >
            <option value="scalability">Scalability</option>
            <option value="security">Security</option>
            <option value="speed">Fast MVP delivery</option>
            <option value="complexity">Complex product logic</option>
            <option value="performance">Performance</option>
          </select>
        </label>
      </div>

      <label class="block">
        <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">Core requirement</span>
        <textarea
          v-model="project.requirement"
          rows="4"
          placeholder="Example: A small team needs collaborative project notes with roles, comments, and export."
          class="mt-2 w-full resize-none rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm leading-6 text-secondary-950 transition-colors placeholder:text-secondary-400 focus:border-secondary-400 dark:border-dark-border dark:bg-dark-bg dark:text-white dark:placeholder:text-secondary-500"
        ></textarea>
      </label>

      <button
        type="button"
        :disabled="isLoading || !project.domain || !project.requirement"
        class="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
        @click="simulate"
      >
        {{ isLoading ? "Generating sketch..." : "Generate sketch" }}
      </button>
    </div>

    <div v-else class="space-y-5">
      <div class="rounded-md border border-secondary-200 bg-secondary-50 p-4 dark:border-dark-border dark:bg-dark-bg">
        <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-xs font-medium uppercase tracking-normal text-secondary-500 dark:text-secondary-400">
              Generated sketch
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
            Reset
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
          {{ result }}
        </p>
      </div>

      <p class="text-xs leading-5 text-secondary-500 dark:text-secondary-500">
        Treat this as a starting point for discussion, validation, and tradeoff review.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";

const props = withDefaults(defineProps<{ isFeatured?: boolean }>(), {
  isFeatured: true,
});

void props;

const project = reactive({
  domain: "",
  constraint: "scalability",
  requirement: "",
});

const constraintLabels: Record<string, string> = {
  scalability: "Scalability",
  security: "Security",
  speed: "Fast MVP delivery",
  complexity: "Complex product logic",
  performance: "Performance",
};

const isLoading = ref(false);
const result = ref<string | null>(null);
const groqChat = useGroqChat();

const constraintLabel = computed(() => constraintLabels[project.constraint] ?? project.constraint);

const resultSections = computed(() => {
  if (!result.value) return [];

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

  try {
    const rawPrompt = `Create a concise system design sketch for this product idea.

Domain: ${project.domain}
Primary constraint: ${constraintLabel.value}
Core requirement: ${project.requirement}

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
      result.value = `Could not generate sketch: ${(response as any).error}`;
    } else {
      result.value = "Could not generate a sketch from the current response.";
    }
  } catch (error: any) {
    console.error("System design sketch error:", error);
    const errorMsg = error.data?.statusMessage || error.message || "Unknown error";
    result.value = `Could not generate sketch: ${errorMsg}`;
  } finally {
    isLoading.value = false;
  }
};
</script>
