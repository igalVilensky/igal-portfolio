<template>
  <div class="page-shell">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-main">
          <h1 class="page-title">AI &amp; Automation</h1>
          <p class="page-intro mt-4">
            AI-assisted tools, LLM integrations, and automation-oriented product work.
            Practical proof across product UX, serverless model calls, workflow handoffs,
            and responsible boundaries.
          </p>
        </div>
      </header>

      <section aria-labelledby="ai-products-title" class="mb-14">
        <div class="mb-6">
          <h2 id="ai-products-title" class="section-title">AI products</h2>
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
                <span class="font-medium text-secondary-800 dark:text-secondary-200">Demonstrates:</span>
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
                  :to="link.url"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </a>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="ai-workflows-title" class="mb-14">
        <div class="mb-6">
          <h2 id="ai-workflows-title" class="section-title">AI workflow / automation systems</h2>
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
                <span class="font-medium text-secondary-800 dark:text-secondary-200">Demonstrates:</span>
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
                  :to="link.url"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </a>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="site-feature-title" class="mb-14">
        <div class="mb-6">
          <h2 id="site-feature-title" class="section-title">Site feature</h2>
        </div>

        <div class="border-y border-secondary-200 dark:border-dark-border">
          <article
            class="grid gap-4 border-b border-secondary-200 py-6 last:border-b-0 dark:border-dark-border md:grid-cols-[minmax(0,1fr)_auto] md:gap-8"
          >
            <div>
              <h3 class="text-lg font-semibold leading-snug text-secondary-950 dark:text-white">
                {{ portfolioAssistantItem.title }}
              </h3>
              <p class="mt-2 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
                {{ portfolioAssistantItem.summary }}
              </p>
              <p class="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
                <span class="font-medium text-secondary-800 dark:text-secondary-200">Demonstrates:</span>
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
                  :to="link.url"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </NuxtLink>
                <a
                  v-else
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
                >
                  {{ link.label }}
                </a>
              </template>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="patterns-title" class="mb-14 max-w-3xl">
        <div class="mb-5">
          <h2 id="patterns-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Patterns demonstrated
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

      <section aria-labelledby="current-learning-title" class="max-w-3xl">
        <div class="mb-5">
          <h2 id="current-learning-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
            Current learning
          </h2>
          <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
            {{ currentCourse.program }}, {{ currentCourse.institution }}.
            This is current specialization work, not a claim of senior AI specialization.
          </p>
        </div>

        <ul class="border-y border-secondary-200 dark:border-dark-border">
          <li
            v-for="item in currentLearning"
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
import projectsData from "../../content/projects.json";
import experienceData from "../../content/experience.json";
import profileData from "../../content/profile.json";

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
  links: WorkLink[];
};

const aiProductsIds = ["decision-matrix-ai", "ai-compliance-compass", "sunlit-tales"];
const aiWorkflowsIds = ["job-command-center", "openme"];

const projectSummaries: Record<string, string> = {
  "decision-matrix-ai":
    "AI-assisted decision matrix app for comparing complex choices with criteria, scores, recommendations, and action checklists.",
  "ai-compliance-compass":
    "Educational AI use-case checker that turns plain-language descriptions into practical EU/Germany compliance prompts and next steps.",
  "sunlit-tales":
    "Poetry/content platform with an AI mood/game feature that creates Russian-language literary quiz rounds from existing poem text.",
  "job-command-center":
    "Self-hosted, budget-aware job search command center that triages job opportunities, extracts useful information, reviews fit against a candidate profile, and keeps AI advisory with human approval.",
  openme:
    "SaaS MVP with public endpoints, owner inbox flows, and an optional Python/FastAPI AI service layer for incoming submission summaries.",
};

const demonstratedRoles: Record<string, string> = {
  "decision-matrix-ai":
    "LLM API integration for structured decision support, editable outputs, serverless AI calls, validation, and persistence.",
  "ai-compliance-compass":
    "Responsible AI boundaries, clarification flows, cautious language, and educational fallback behavior.",
  "sunlit-tales":
    "Server-side Groq call through Netlify Functions, structured JSON generation, and validating model response against source poem text.",
  "job-command-center":
    "AI extraction, AI review, budget-aware processing, rule-based prefiltering, and command queue grouped by next action.",
  openme:
    "Automation-oriented product thinking through public endpoints, owner workflows, and AI-assisted inbox review.",
};

const isInternalUrl = (url: string) => url.startsWith("/");

const getProjectLinks = (project: Project): WorkLink[] => {
  const links: WorkLink[] = [];

  if (project.links.live) {
    links.push({
      label: project.links.live.startsWith("/") ? "Open tool" : "Live",
      url: project.links.live,
      internal: isInternalUrl(project.links.live),
    });
  }

  if (project.links.case_study) {
    links.push({
      label: "Case study",
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
  title: project.title,
  summary: projectSummaries[project.id] ?? project.short_description,
  demonstrates: demonstratedRoles[project.id] ?? project.role,
  techLine: project.technologies.slice(0, 6).join(" / "),
  links: getProjectLinks(project),
});

const getFeaturedItems = (ids: string[]) => ids
  .map((id) => projectsData.projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))
  .map(toAiWorkItem);

const aiProducts = getFeaturedItems(aiProductsIds);
const aiWorkflows = getFeaturedItems(aiWorkflowsIds);

const portfolioAssistantItem: AiWorkItem = {
  id: "ask-my-portfolio",
  title: "Ask My Portfolio",
  summary:
    "Optional portfolio assistant that answers recruiter questions from local structured site content and falls back to saved FAQ answers.",
  demonstrates:
    "Grounded LLM assistant pattern with prompt boundaries, local context, no external actions, and deterministic fallback.",
  techLine: "Nuxt / Vue 3 / TypeScript / Groq API / FAQ fallback",
  links: [
    {
      label: "Open guide",
      url: "/#ask-my-portfolio",
      internal: true,
    },
  ],
};

const patterns = [
  "LLM API integration",
  "Structured prompts",
  "Serverless AI calls",
  "Fallback behavior",
  "Human-in-the-loop review",
  "API/webhook workflow thinking",
  "Responsible AI boundaries",
];

const wbsCourse = experienceData.entries.find((entry) => entry.id === "wbs-ai-agents-automations");

const currentCourse = {
  program: wbsCourse?.title ?? profileData.current_course.program,
  institution: wbsCourse?.organization ?? profileData.current_course.institution,
};

const currentLearning = ["AI agents", "n8n", "Make", "Python automations", "APIs/webhooks", "AI safety"];

useHead({
  title: "AI & Automation | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "AI-assisted tools, LLM integrations, automation-oriented workflows, and current AI Agents & Automations learning by Igal Vilensky.",
    },
  ],
});
</script>
