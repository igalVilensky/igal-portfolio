<template>
  <div class="page-shell">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-main">
          <h1 class="page-title">{{ t('publicContent.aiTitle') }}</h1>
          <p class="page-intro mt-4">
            {{ t('publicContent.aiIntro') }}
          </p>
        </div>
      </header>

      <section aria-labelledby="ai-products-title" class="mb-14">
        <div class="mb-6 flex items-center gap-2">
          <Bot :size="24" class="text-secondary-900 dark:text-white" />
          <h2 id="ai-products-title" class="section-title m-0">{{ t('ui.ai_products') }}</h2>
        </div>

        <div class="border-y border-secondary-200 dark:border-dark-border">
          <article
            v-for="item in aiProducts"
            :key="item.id"
            class="grid gap-4 border-b border-secondary-200 py-6 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div>
              <h3 class="text-lg font-semibold leading-snug text-secondary-950 dark:text-white">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
                {{ item.summary }}
              </p>
              <p class="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
                <span class="font-medium text-secondary-800 dark:text-secondary-200">{{ t('ui.demonstrates') }}</span>
                {{ item.demonstrates }}
              </p>
              <p class="mt-3 text-xs leading-5 text-secondary-500 dark:text-secondary-500">
                {{ item.techLine }}
              </p>
            </div>

            <div class="flex flex-wrap gap-x-4 gap-y-2 md:justify-end md:pt-1">
              <template
                v-for="link in item.links"
                :key="`${item.id}-${link.label}`"
              >
                <NuxtLink
                  v-if="link.internal"
                  :to="localePath(link.url)"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                  <ExternalLink :size="14" />
                </a>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="ai-workflows-title" class="mb-14">
        <div class="mb-6 flex items-center gap-2">
          <Workflow :size="24" class="text-secondary-900 dark:text-white" />
          <h2 id="ai-workflows-title" class="section-title m-0">{{ t('ui.ai_workflow_automation_systems') }}</h2>
        </div>

        <div class="border-y border-secondary-200 dark:border-dark-border">
          <article
            v-for="item in aiWorkflows"
            :key="item.id"
            class="grid gap-4 border-b border-secondary-200 py-6 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div>
              <h3 class="text-lg font-semibold leading-snug text-secondary-950 dark:text-white">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
                {{ item.summary }}
              </p>
              <p class="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
                <span class="font-medium text-secondary-800 dark:text-secondary-200">{{ t('ui.demonstrates') }}</span>
                {{ item.demonstrates }}
              </p>
              <p class="mt-3 text-xs leading-5 text-secondary-500 dark:text-secondary-500">
                {{ item.techLine }}
              </p>
            </div>

            <div class="flex flex-wrap gap-x-4 gap-y-2 md:justify-end md:pt-1">
              <template
                v-for="link in item.links"
                :key="`${item.id}-${link.label}`"
              >
                <NuxtLink
                  v-if="link.internal"
                  :to="localePath(link.url)"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                  <ExternalLink :size="14" />
                </a>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="site-feature-title" class="mb-14">
        <div class="mb-6 flex items-center gap-2">
          <Sparkles :size="24" class="text-secondary-900 dark:text-white" />
          <h2 id="site-feature-title" class="section-title m-0">{{ t('ui.site_feature') }}</h2>
        </div>

        <div class="border-y border-secondary-200 dark:border-dark-border">
          <article
            class="grid gap-4 border-b border-secondary-200 py-6 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div>
              <h3 class="text-lg font-semibold leading-snug text-secondary-950 dark:text-white">
                {{ portfolioAssistantItem.title }}
              </h3>
              <div v-if="portfolioAssistantItem.badges && portfolioAssistantItem.badges.length" class="mt-2 flex flex-wrap gap-2">
                <span v-for="badge in portfolioAssistantItem.badges" :key="badge" class="rounded bg-secondary-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-600 dark:bg-white/5 dark:text-secondary-400">
                  {{ badge }}
                </span>
              </div>
              <p class="mt-2 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
                {{ portfolioAssistantItem.summary }}
              </p>
              <p class="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
                <span class="font-medium text-secondary-800 dark:text-secondary-200">{{ t('ui.demonstrates') }}</span>
                {{ portfolioAssistantItem.demonstrates }}
              </p>
              <p class="mt-3 text-xs leading-5 text-secondary-500 dark:text-secondary-500">
                {{ portfolioAssistantItem.techLine }}
              </p>
            </div>

            <div class="flex flex-wrap gap-x-4 gap-y-2 md:justify-end md:pt-1">
              <template
                v-for="link in portfolioAssistantItem.links"
                :key="`${portfolioAssistantItem.id}-${link.label}`"
              >
                <NuxtLink
                  v-if="link.internal"
                  :to="localePath(link.url)"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                  <ExternalLink :size="14" />
                </a>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="patterns-title" class="mb-14 max-w-3xl">
        <div class="mb-5">
          <h2 id="patterns-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('ui.patterns_demonstrated') }}
          </h2>
        </div>

        <ul class="border-y border-secondary-200 dark:border-dark-border">
          <li
            v-for="pattern in patterns"
            :key="pattern"
            class="border-b border-secondary-200 py-3 text-sm leading-6 text-secondary-700 last:border-b-0 dark:border-dark-border dark:text-secondary-300"
          >
            {{ pattern }}
          </li>
        </ul>
      </section>

      <section aria-labelledby="completed-education-title" class="max-w-3xl">
        <div class="mb-5">
          <h2 id="completed-education-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            {{ t('publicContent.educationTitle') }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
            {{ t('publicContent.education') }}
          </p>
        </div>

        <ul class="border-y border-secondary-200 dark:border-dark-border">
          <li
            v-for="item in courseTopics"
            :key="item"
            class="border-b border-secondary-200 py-3 text-sm leading-6 text-secondary-700 last:border-b-0 dark:border-dark-border dark:text-secondary-300"
          >
            {{ item }}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bot, Workflow, Sparkles, ExternalLink } from "lucide-vue-next";
import { getLocalizedValue } from "~/utils/localizedContent";
import projectsData from "../../content/projects.json";

definePageMeta({
  layout: "default",
});

type Project = (typeof projectsData.projects)[number];

type WorkLink = {
  label: string;
  url: string;
  internal: boolean;
};

type AiWorkItem = {
  id: string;
  title: string;
  summary: string;
  demonstrates: string;
  techLine: string;
  badges?: string[];
  links: WorkLink[];
};

const { t, locale } = useI18n();
const localePath = useLocalePath();

const aiProductsIds = ["decision-matrix-ai", "ai-compliance-compass", "sunlit-tales"];
const aiWorkflowsIds = ["flowforge", "job-command-center", "openme"];

const projectSummaries = computed<Record<string, string>>(() => ({
  "decision-matrix-ai":
    t('ui.aiassisted_decision_matrix_app_for_comparing_complex_choices_with'),
  "ai-compliance-compass":
    t('ui.educational_ai_usecase_checker_that_turns_plainlanguage_descriptions_into'),
  "sunlit-tales":
    t('ui.poetrycontent_platform_with_an_ai_moodgame_feature_that_creates'),
  "job-command-center":
    t('ui.selfhosted_budgetaware_job_search_command_center_that_triages_job'),
  flowforge:
    t('ui.multiagent_automation_compiler_that_turns_plainlanguage_ideas_into_safe'),
  openme:
    t('ui.saas_mvp_with_public_endpoints_owner_inbox_flows_and'),
}));

const demonstratedRoles = computed<Record<string, string>>(() => ({
  "decision-matrix-ai":
    t('ui.llm_api_integration_for_structured_decision_support_editable_outputs'),
  "ai-compliance-compass":
    t('ui.responsible_ai_boundaries_clarification_flows_cautious_language_and_educational'),
  "sunlit-tales":
    t('ui.serverside_groq_call_through_netlify_functions_structured_json_generation'),
  "job-command-center":
    t('ui.ai_extraction_ai_review_budgetaware_processing_rulebased_prefiltering_and'),
  flowforge:
    t('ui.guided_clarification_multiagent_routing_and_blueprint_generation_safety_review'),
  openme:
    t('ui.automationoriented_product_thinking_through_public_endpoints_owner_workflows_and'),
}));

const isInternalUrl = (url: string) => url.startsWith("/");

const getProjectLinks = (project: Project): WorkLink[] => {
  const links: WorkLink[] = [];

  if (project.links.live) {
    links.push({
      label: project.links.live.startsWith("/") ? t('ui.open_tool') : t('ui.live'),
      url: project.links.live,
      internal: isInternalUrl(project.links.live),
    });
  }

  if (project.links.case_study) {
    links.push({
      label: t('ui.case_study'),
      url: project.links.case_study,
      internal: true,
    });
  }

  if (project.links.github) {
    links.push({
      label: "GitHub",
      url: project.links.github,
      internal: false,
    });
  }

  return links;
};

const toAiWorkItem = (project: Project): AiWorkItem => ({
  id: project.id,
  title: getLocalizedValue(project.title, locale.value),
  summary: projectSummaries.value[project.id] ?? getLocalizedValue(project.short_description, locale.value),
  demonstrates: demonstratedRoles.value[project.id] ?? project.role,
  techLine: project.technologies.slice(0, 6).join(" / "),
  badges: getLocalizedValue(project.category, locale.value).split(" / ").slice(0, 3),
  links: getProjectLinks(project),
});

const getFeaturedItems = (ids: string[]) => ids
  .map((id) => projectsData.projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))
  .map(toAiWorkItem);

const aiProducts = computed(() => (getFeaturedItems(aiProductsIds)));
const aiWorkflows = computed(() => (getFeaturedItems(aiWorkflowsIds)));

const portfolioAssistantItem = computed<AiWorkItem>(() => ({
  id: "ask-my-portfolio",
  title: "Igal, Explained",
  summary:
    t('publicContent.assistant'),
  demonstrates:
    t('ui.grounded_llm_assistant_pattern_with_retrieval_structured_responses_prompt'),
  techLine: "Nuxt / Vue 3 / TypeScript / Netlify Functions / Groq API",
  badges: [t('ui.portfolio_feature'), t('ui.ai_assistant')],
  links: [
    {
      label: t('ui.open_guide'),
      url: "/ask-igal",
      internal: true,
    },
  ],
}));

const patterns = computed(() => ([
  t('ui.llm_api_integration'),
  t('ui.structured_prompts'),
  t('ui.serverless_ai_calls'),
  t('ui.fallback_behavior'),
  t('ui.humanintheloop_review'),
  t('ui.apiwebhook_workflow_thinking'),
  t('ui.responsible_ai_boundaries'),
]));

const courseTopics = computed(() => ([t('ui.ai_agents'), "n8n", "Make", t('ui.python_automations'), "APIs/webhooks", t('ui.ai_safety')]));

useHead(() => ({
  title: `${t('publicContent.aiTitle')} | Igal Vilensky`,
  meta: [{ name: 'description', content: `${t('publicContent.aiIntro')} ${t('publicContent.education')}` }],
}));
</script>
