<template>
  <div class="page-shell">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-main">
          <div class="flex items-center gap-3">
            <User :size="32" class="text-secondary-900 dark:text-white" />
            <h1 class="page-title m-0">About</h1>
          </div>
          <p class="page-intro mt-4">
            I'm a full-stack developer based in Leipzig, focused on SaaS products,
            web applications, and AI-assisted workflows.
          </p>
        </div>
      </header>

      <section aria-labelledby="background-title" class="mb-14 max-w-3xl">
        <h2 id="background-title" class="section-title">Short background</h2>
        <div class="mt-6 space-y-5 text-sm leading-7 text-secondary-700 dark:text-secondary-300 md:text-base">
          <p v-for="paragraph in backgroundParagraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <section aria-labelledby="snapshot-title" class="mb-14 max-w-3xl">
        <h2 id="snapshot-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
          Snapshot
        </h2>

        <dl class="mt-6 border-y border-secondary-200 dark:border-dark-border">
          <div
            v-for="item in snapshotItems"
            :key="item.label"
            class="grid gap-2 border-b border-secondary-200 py-4 last:border-b-0 dark:border-dark-border sm:grid-cols-[10rem_minmax(0,1fr)]"
          >
            <dt class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
              {{ item.label }}
            </dt>
            <dd class="text-sm leading-6 text-secondary-600 dark:text-secondary-400">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="links-title" class="max-w-3xl">
        <h2 id="links-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
          Links
        </h2>

        <div class="mt-5 flex flex-wrap gap-x-5 gap-y-3">
          <template v-for="link in links" :key="link.label">
            <NuxtLink
              v-if="link.internal"
              :to="link.href"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
            >
              {{ link.label }}
            </NuxtLink>
            <a
              v-else
              :href="link.href"
              :target="link.target"
              :rel="link.target ? 'noopener noreferrer' : undefined"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200"
            >
              {{ link.label }}
              <ExternalLink :size="14" />
            </a>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, ExternalLink } from "lucide-vue-next";
import experienceData from "../../content/experience.json";
import profileData from "../../content/profile.json";
import skillsData from "../../content/skills.json";

definePageMeta({
  layout: "default",
});

type SnapshotItem = {
  label: string;
  value: string;
};

type AboutLink = {
  label: string;
  href: string;
  internal: boolean;
  target?: "_blank";
};

const profile = profileData;

const wbsCourse = experienceData.entries.find((entry) => entry.id === "wbs-ai-agents-automations");
const languageGroup = skillsData.groups.find((group) => group.id === "languages");

const currentCourse = {
  title: wbsCourse?.title ?? profile.current_course.program,
  organization: wbsCourse?.organization ?? profile.current_course.institution,
  timeframe: wbsCourse?.timeframe ?? profile.current_course.timeframe,
};

const backgroundParagraphs = [
  `${profile.identity.name} is a full-stack software developer based in ${profile.identity.based_in}. He builds SaaS products, web applications, frontend interfaces, API-connected workflows, and practical AI-assisted tools.`,
  "His day-to-day stack is TypeScript-heavy, with Vue/Nuxt, React/Next, Node.js, and REST APIs as recurring parts of the work. He is most interested in clear product flows, maintainable implementation, and software that is useful after the first demo.",
  `He is currently extending that software development background through the ${currentCourse.title} at ${currentCourse.organization}, with a focus on AI agents, LLM workflows, n8n, Make, APIs/webhooks, and AI safety.`,
];

const snapshotItems: SnapshotItem[] = [
  {
    label: "Location",
    value: profile.identity.based_in,
  },
  {
    label: "Core stack",
    value: "TypeScript, Vue/Nuxt, React/Next, Node.js, APIs",
  },
  {
    label: "AI focus",
    value: "LLM workflows, AI agents, n8n, Make, APIs/webhooks",
  },
  {
    label: "Languages",
    value:
      languageGroup?.skills.join(", ") ??
      profile.languages.map((item) => `${item.language} - ${item.level}`).join(", "),
  },
  {
    label: "Current",
    value: `${currentCourse.organization}: ${currentCourse.title}, ${currentCourse.timeframe}`,
  },
];

const links: AboutLink[] = [
  {
    label: "Work",
    href: "/case-studies",
    internal: true,
  },
  {
    label: "AI",
    href: "/ai-automation",
    internal: true,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    internal: false,
    target: "_blank",
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    internal: false,
    target: "_blank",
  },
  {
    label: "Email",
    href: `mailto:${profile.links.email}`,
    internal: false,
  },
  {
    label: "CV",
    href: profile.links.cv,
    internal: true,
  },
];

useHead({
  title: "About | Igal Vilensky",
  meta: [
    {
      name: "description",
      content:
        "Short professional profile for Igal Vilensky, a Leipzig-based full-stack software developer focused on SaaS products, web applications, and AI-assisted workflows.",
    },
  ],
});
</script>
