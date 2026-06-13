<!-- app/pages/index.vue -->
<template>
  <main class="min-h-screen bg-secondary-50 text-secondary-900 dark:bg-dark-bg dark:text-secondary-100">
    <section id="hero" class="border-b border-secondary-200 bg-white pt-24 dark:border-white/10 dark:bg-dark-bg">
      <div class="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 md:py-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(20rem,0.88fr)] lg:items-center">
        <div>
          <p class="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">
            {{ profile.identity.name }} · {{ profile.identity.based_in }}
          </p>
          <h1 class="max-w-4xl text-3xl font-semibold leading-tight text-secondary-950 dark:text-white sm:text-4xl md:text-5xl">
            Full-stack software developer building SaaS products and practical AI-assisted workflows.
          </h1>
          <p class="mt-5 max-w-3xl text-base leading-7 text-secondary-700 dark:text-secondary-300 md:text-lg">
            I build user-focused web applications with TypeScript, Vue/Nuxt, React/Next, Node.js, APIs, and Python/FastAPI.
            My current AI agents and automation work extends that product engineering foundation into practical workflows.
          </p>

          <div class="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <NuxtLink to="/case-studies" class="btn-primary inline-flex w-full items-center justify-center gap-3 rounded-lg px-5 py-3 sm:w-auto">
              <span>View selected work</span>
              <i class="fas fa-arrow-right text-sm"></i>
            </NuxtLink>
            <a
              :href="profile.links.cv"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-secondary-300 bg-white px-5 py-3 font-medium text-secondary-900 transition hover:border-primary-500 hover:bg-secondary-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-primary-300 sm:w-auto"
            >
              <i class="fas fa-file-lines text-primary-600 dark:text-primary-300"></i>
              <span>View CV</span>
            </a>
            <a
              href="#ask-my-portfolio"
              class="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-secondary-300 px-5 py-3 font-medium text-secondary-800 transition hover:border-primary-500 hover:bg-secondary-50 dark:border-white/15 dark:text-secondary-100 dark:hover:border-primary-300 sm:w-auto"
            >
              <i class="fas fa-search text-primary-600 dark:text-primary-300"></i>
              <span>Ask My Portfolio</span>
            </a>
          </div>

          <div class="mt-8 flex flex-wrap gap-2">
            <span
              v-for="role in heroRoles"
              :key="role"
              class="rounded-full border border-secondary-200 bg-secondary-100 px-3 py-1 text-sm text-secondary-700 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
            >
              {{ role }}
            </span>
          </div>
        </div>

        <aside class="rounded-lg border border-secondary-200 bg-secondary-50 p-5 dark:border-white/10 dark:bg-dark-surface md:p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-300">
            30-second recruiter read
          </p>
          <dl class="mt-6 space-y-5">
            <div v-for="item in heroSnapshot" :key="item.label">
              <dt class="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-500 dark:text-secondary-400">
                {{ item.label }}
              </dt>
              <dd class="mt-1 text-base font-medium text-secondary-950 dark:text-white">
                {{ item.value }}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <section id="recruiter-snapshot" class="section-compact">
      <div class="mx-auto max-w-7xl px-5 sm:px-6">
        <div class="mb-7 grid gap-4 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] md:items-end">
          <div>
            <p class="page-kicker">Recruiter snapshot</p>
            <h2 class="section-title">The useful facts first.</h2>
          </div>
          <p class="text-base leading-7 text-secondary-600 dark:text-secondary-400">
            A compact view of role fit, stack, language coverage, and current AI automation direction.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="item in recruiterSnapshot"
            :key="item.label"
            class="rounded-lg border border-secondary-200 bg-white p-5 dark:border-white/10 dark:bg-dark-surface"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-500 dark:text-secondary-400">
              {{ item.label }}
            </p>
            <p class="mt-3 text-base leading-7 text-secondary-900 dark:text-white">
              {{ item.value }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="ask-my-portfolio" class="section-compact border-y border-secondary-200 bg-white dark:border-white/10 dark:bg-dark-surface/35">
      <div class="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <p class="page-kicker">Ask My Portfolio preview</p>
          <h2 class="section-title">A grounded shortcut for busy reviewers.</h2>
          <p class="mt-5 text-base leading-7 text-secondary-600 dark:text-secondary-400">
            This preview shows the planned recruiter guide direction: concise answers based on portfolio data,
            selected projects, role fit, and documented experience.
          </p>
        </div>

        <div class="rounded-lg border border-secondary-200 bg-secondary-50 p-5 dark:border-white/10 dark:bg-dark-bg md:p-6">
          <div class="mb-5 flex flex-wrap gap-2">
            <span
              v-for="item in askPrompts"
              :key="item.id"
              class="rounded-md border border-secondary-200 bg-white px-3 py-1.5 text-sm text-secondary-700 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
            >
              {{ item.question }}
            </span>
          </div>

          <div class="rounded-lg border border-secondary-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 dark:text-primary-300">
              Sample grounded answer
            </p>
            <h3 class="mt-3 text-lg font-semibold text-secondary-950 dark:text-white">
              {{ guidePreview.question }}
            </h3>
            <p class="mt-3 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
              {{ guidePreview.answer }}
            </p>
          </div>

          <p class="mt-4 text-xs leading-5 text-secondary-500 dark:text-secondary-400">
            Answers should stay grounded in local portfolio content and avoid external actions, browsing, or hiring promises.
          </p>
        </div>
      </div>
    </section>

    <section id="selected-work" class="section-compact">
      <div class="mx-auto max-w-7xl px-5 sm:px-6">
        <div class="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div class="max-w-3xl">
            <p class="page-kicker">Selected work</p>
            <h2 class="section-title">Four projects that show the main proof.</h2>
            <p class="mt-5 text-base leading-7 text-secondary-600 dark:text-secondary-400">
              The homepage now gives priority to the strongest SaaS, full-stack, and AI-assisted product examples.
            </p>
          </div>
          <NuxtLink to="/case-studies" class="inline-flex items-center gap-2 font-semibold text-primary-700 hover:text-primary-600 dark:text-primary-300">
            <span>Open full work page</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </NuxtLink>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="project in featuredProjects"
            :key="project.id"
            class="rounded-lg border border-secondary-200 bg-white p-5 dark:border-white/10 dark:bg-dark-surface md:p-6"
          >
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 dark:text-primary-300">
                  {{ project.category }}
                </p>
                <h3 class="mt-3 text-xl font-semibold leading-snug text-secondary-950 dark:text-white md:text-2xl">
                  {{ project.title }}
                </h3>
              </div>
              <span class="w-fit rounded-md border border-secondary-200 bg-secondary-50 px-2.5 py-1 text-xs font-medium text-secondary-600 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300">
                Featured
              </span>
            </div>

            <p class="mt-4 text-sm leading-6 text-secondary-700 dark:text-secondary-300">
              {{ project.short_description }}
            </p>
            <p class="mt-4 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
              {{ project.role }}
            </p>

            <ul class="mt-5 space-y-2">
              <li
                v-for="proof in project.outcome_or_proof.slice(0, 2)"
                :key="proof"
                class="flex gap-3 text-sm text-secondary-700 dark:text-secondary-300"
              >
                <i class="fas fa-check mt-1 text-xs text-primary-600 dark:text-primary-300"></i>
                <span>{{ proof }}</span>
              </li>
            </ul>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies.slice(0, 6)"
                :key="tech"
                class="rounded-md border border-secondary-200 bg-secondary-50 px-2.5 py-1 text-xs text-secondary-700 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
              >
                {{ tech }}
              </span>
            </div>

            <div class="mt-6">
              <NuxtLink
                v-if="getProjectLink(project)?.internal"
                :to="getProjectLink(project)?.url"
                class="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-600 dark:text-primary-300"
              >
                <span>{{ getProjectLink(project)?.label }}</span>
                <i class="fas fa-arrow-right text-xs"></i>
              </NuxtLink>
              <a
                v-else-if="getProjectLink(project)"
                :href="getProjectLink(project)?.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-600 dark:text-primary-300"
              >
                <span>{{ getProjectLink(project)?.label }}</span>
                <i class="fas fa-external-link-alt text-xs"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="how-i-work" class="section-compact border-y border-secondary-200 bg-white dark:border-white/10 dark:bg-dark-surface/35">
      <div class="mx-auto max-w-7xl px-5 sm:px-6">
        <div class="mb-7 max-w-3xl">
          <p class="page-kicker">How I work</p>
          <h2 class="section-title">Product thinking before feature noise.</h2>
          <p class="mt-5 text-base leading-7 text-secondary-600 dark:text-secondary-400">
            The through-line is practical product engineering: understand the workflow, build the right interface,
            connect the system, test the path, and iterate with the team.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-5">
          <article
            v-for="step in workSteps"
            :key="step.title"
            class="rounded-lg border border-secondary-200 bg-secondary-50 p-5 dark:border-white/10 dark:bg-dark-bg"
          >
            <p class="text-sm font-bold text-primary-700 dark:text-primary-300">{{ step.index }}</p>
            <h3 class="mt-3 font-semibold text-secondary-950 dark:text-white">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
              {{ step.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="ai-automation-focus" class="section-compact">
      <div class="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <p class="page-kicker">AI / Automation focus</p>
          <h2 class="section-title">AI as an extension of software work.</h2>
          <p class="mt-5 text-base leading-7 text-secondary-600 dark:text-secondary-400">
            The current direction is not a restart. It builds on SaaS, APIs, UX, and workflow experience to create
            AI-assisted systems with clear boundaries and human review.
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="item in aiFocus"
            :key="item.title"
            class="rounded-lg border border-secondary-200 bg-white p-5 dark:border-white/10 dark:bg-dark-surface"
          >
            <h3 class="font-semibold text-secondary-950 dark:text-white">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="experience-snapshot" class="section-compact border-y border-secondary-200 bg-white dark:border-white/10 dark:bg-dark-surface/35">
      <div class="mx-auto max-w-7xl px-5 sm:px-6">
        <div class="mb-7 max-w-3xl">
          <p class="page-kicker">Experience snapshot</p>
          <h2 class="section-title">Professional context, scanned quickly.</h2>
          <p class="mt-5 text-base leading-7 text-secondary-600 dark:text-secondary-400">
            A concise timeline linking software development, product operations, and the current AI automation course.
          </p>
        </div>

        <div class="grid gap-4 lg:grid-cols-3">
          <article
            v-for="entry in experienceSnapshot"
            :key="entry.id"
            class="rounded-lg border border-secondary-200 bg-secondary-50 p-5 dark:border-white/10 dark:bg-dark-bg"
          >
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-secondary-500 dark:text-secondary-400">
              {{ entry.timeframe }} · {{ entry.location }}
            </p>
            <h3 class="mt-3 text-lg font-semibold text-secondary-950 dark:text-white">
              {{ entry.title }}
            </h3>
            <p class="mt-1 text-sm font-medium text-primary-700 dark:text-primary-300">
              {{ entry.organization }}
            </p>
            <p class="mt-3 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
              {{ entry.summary }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" class="section-compact">
      <div class="mx-auto max-w-7xl px-5 sm:px-6">
        <div class="rounded-lg border border-secondary-200 bg-white p-6 text-secondary-950 dark:border-white/10 dark:bg-dark-surface dark:text-white md:p-8">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">Contact</p>
              <h2 class="mt-4 max-w-3xl text-2xl font-semibold leading-tight md:text-3xl">
                Looking for a full-stack, frontend, SaaS, or AI automation developer?
              </h2>
              <p class="mt-5 max-w-3xl text-base leading-7 text-secondary-600 dark:text-secondary-300">
                {{ profile.availability.summary }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
              <a
                :href="`mailto:${profile.links.email}`"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-700 sm:w-auto"
              >
                <i class="fas fa-envelope"></i>
                <span>Email</span>
              </a>
              <a
                :href="profile.links.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-secondary-300 px-5 py-3 font-semibold text-secondary-800 transition hover:border-primary-500 hover:bg-secondary-50 dark:border-white/15 dark:text-white dark:hover:border-primary-300 sm:w-auto"
              >
                <i class="fab fa-linkedin-in"></i>
                <span>LinkedIn</span>
              </a>
              <a
                :href="profile.links.github"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-secondary-300 px-5 py-3 font-semibold text-secondary-800 transition hover:border-primary-500 hover:bg-secondary-50 dark:border-white/15 dark:text-white dark:hover:border-primary-300 sm:w-auto"
              >
                <i class="fab fa-github"></i>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import profileData from "../../content/profile.json";
import projectsData from "../../content/projects.json";
import experienceData from "../../content/experience.json";
import skillsData from "../../content/skills.json";
import faqData from "../../content/faq.json";

definePageMeta({
  layout: "default",
});

type ProjectLink = {
  url: string;
  label: string;
  internal: boolean;
};

type Project = (typeof projectsData.projects)[number];

const profile = profileData;

const heroRoles = [
  "Full-stack",
  "Frontend",
  "Vue/Nuxt",
  "React/Next",
  "SaaS",
  "AI automation",
];

const heroSnapshot = [
  {
    label: "Core stack",
    value: "TypeScript, Vue/Nuxt, React/Next, Node.js, APIs, Python/FastAPI",
  },
  {
    label: "Current focus",
    value: "AI agents, automations, LLM workflows, n8n, Make, webhooks",
  },
  {
    label: "Strongest proof",
    value: "SaaS features, full-stack MVPs, AI-assisted product tools, EV portal delivery",
  },
];

const recruiterSnapshot = [
  {
    label: "Location",
    value: profile.identity.based_in,
  },
  {
    label: "Target roles",
    value: "Full-stack, Frontend, Vue/Nuxt, React/Next, TypeScript, AI Automation",
  },
  {
    label: "Core stack",
    value: "TypeScript, Vue/Nuxt, React/Next, Node.js, Express, APIs, Python/FastAPI",
  },
  {
    label: "AI focus",
    value: "LLM APIs, prompt engineering, AI agents, n8n, Make, APIs, webhooks, AI safety",
  },
  {
    label: "Languages",
    value: profile.languages.map((item) => `${item.language} ${item.level}`).join(", "),
  },
  {
    label: "Current",
    value: `${profile.current_course.program}, ${profile.current_course.institution}, ${profile.current_course.timeframe}`,
  },
];

const featuredProjects = projectsData.featured_project_order
  .map((id) => projectsData.projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project));

const askPrompts = ["role-fit", "recruiter-summary", "saas-experience", "first-project-to-review"]
  .map((id) => faqData.faqs.find((item) => item.id === id))
  .filter((item): item is (typeof faqData.faqs)[number] => Boolean(item));

const guidePreview =
  faqData.faqs.find((item) => item.id === "recruiter-summary") ?? faqData.faqs[0];

const workSteps = [
  {
    index: "01",
    title: "Clarify the workflow",
    description: "Translate ambiguous needs into user flows, product constraints, and useful scope.",
  },
  {
    index: "02",
    title: "Design the interface",
    description: "Shape responsive screens around clarity, accessibility, and real user tasks.",
  },
  {
    index: "03",
    title: "Connect the system",
    description: "Build frontend and backend paths with APIs, data models, integrations, and deployment in mind.",
  },
  {
    index: "04",
    title: "Test the path",
    description: "Check user flows, edge cases, data handling, and release readiness.",
  },
  {
    index: "05",
    title: "Iterate with context",
    description: "Use feedback, bugs, and product priorities to keep improving the shipped experience.",
  },
];

const aiAutomationSkills = skillsData.groups.find((group) => group.id === "ai-automation");
const aiFocus = [
  {
    title: "LLM product UX",
    description: "Interfaces where AI suggestions are editable, explainable, and grounded in user intent.",
  },
  {
    title: "Automation workflows",
    description: "n8n, Make, APIs, and webhooks used as practical handoffs between tools and teams.",
  },
  {
    title: "Human-in-the-loop systems",
    description: "AI-assisted outputs with clear boundaries, review points, and no unsupported claims.",
  },
  {
    title: "Current course layer",
    description: `${profile.current_course.program} at ${profile.current_course.institution}, supported by ${aiAutomationSkills?.skills.slice(0, 5).join(", ")}.`,
  },
];

const experienceSnapshotIds = [
  "flowplace",
  "leanera",
  "ari-motors",
  "myfxbook-cashdo",
  "wbs-ai-agents-automations",
  "dci-web-software-development",
];

const experienceSnapshot = experienceSnapshotIds
  .map((id) => experienceData.entries.find((entry) => entry.id === id))
  .filter((entry): entry is (typeof experienceData.entries)[number] => Boolean(entry));

const getProjectLink = (project: Project): ProjectLink | null => {
  if (project.links.case_study) {
    return {
      url: project.links.case_study,
      label: "View case study",
      internal: project.links.case_study.startsWith("/"),
    };
  }

  if (project.links.live) {
    return {
      url: project.links.live,
      label: project.links.live.startsWith("/") ? "Open tool" : "Open live demo",
      internal: project.links.live.startsWith("/"),
    };
  }

  if (project.links.github) {
    return {
      url: project.links.github,
      label: "View GitHub",
      internal: false,
    };
  }

  return null;
};

useHead({
  title: "Igal Vilensky - Full-Stack Developer for SaaS and AI-Assisted Workflows",
  meta: [
    {
      name: "description",
      content:
        "Recruiter-friendly portfolio of Igal Vilensky, a Leipzig-based full-stack software developer building SaaS products, frontend interfaces, API-connected workflows, and practical AI-assisted tools.",
    },
  ],
});
</script>
