<!-- app/pages/index.vue -->
<template>
  <main class="min-h-screen bg-secondary-50 text-secondary-900">
    <HomeHero
      :profile-name="profile.identity.name"
      :based-in="profile.identity.based_in"
      :cv-href="profile.links.cv"
      :roles="heroRoles"
      :snapshot-items="heroSnapshot"
    />
    <RecruiterSnapshot :items="recruiterSnapshot" />
    <AskPortfolioPreview
      :prompts="askPrompts"
      :guide-preview="guidePreview"
      :faqs="faqData.faqs"
      :portfolio-context="portfolioGuideContext"
    />
    <SelectedWork :projects="featuredProjects" />
    <HowIWork :steps="workSteps" />
    <AiAutomationFocus :items="aiFocus" />
    <ExperienceSnapshot :entries="experienceSnapshot" />
    <HomeContactCTA
      :summary="profile.availability.summary"
      :email="profile.links.email"
      :linkedin="profile.links.linkedin"
      :github="profile.links.github"
    />
  </main>
</template>

<script setup lang="ts">
import AiAutomationFocus from "~/components/home/AiAutomationFocus.vue";
import AskPortfolioPreview from "~/components/home/AskPortfolioPreview.vue";
import ExperienceSnapshot from "~/components/home/ExperienceSnapshot.vue";
import HomeContactCTA from "~/components/home/HomeContactCTA.vue";
import HomeHero from "~/components/home/HomeHero.vue";
import HowIWork from "~/components/home/HowIWork.vue";
import RecruiterSnapshot from "~/components/home/RecruiterSnapshot.vue";
import SelectedWork from "~/components/home/SelectedWork.vue";
import profileData from "../../content/profile.json";
import projectsData from "../../content/projects.json";
import experienceData from "../../content/experience.json";
import skillsData from "../../content/skills.json";
import roleFitData from "../../content/role-fit.json";
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

type FeaturedProject = {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  role: string;
  outcomeOrProof: string[];
  technologies: string[];
  link: ProjectLink | null;
};

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

const toFeaturedProject = (project: Project): FeaturedProject => ({
  id: project.id,
  title: project.title,
  category: project.category,
  shortDescription: project.short_description,
  role: project.role,
  outcomeOrProof: project.outcome_or_proof,
  technologies: project.technologies,
  link: getProjectLink(project),
});

const featuredProjects = projectsData.featured_project_order
  .map((id) => projectsData.projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))
  .map(toFeaturedProject);

const askPrompts = [
  "role-fit",
  "recruiter-summary",
  "frontend-experience",
  "saas-experience",
  "ai-automation-experience",
  "first-project-to-review",
]
  .map((id) => faqData.faqs.find((item) => item.id === id))
  .filter((item): item is (typeof faqData.faqs)[number] => Boolean(item));

const guidePreview =
  faqData.faqs.find((item) => item.id === "recruiter-summary") ?? faqData.faqs[0];

const portfolioGuideContext = {
  profile: {
    identity: profile.identity,
    headline: profile.headline,
    summary: profile.summary,
    cv_summary: profile.cv_summary,
    experience_level: profile.experience_level,
    current_focus: profile.current_focus,
    current_course: profile.current_course,
    target_roles: profile.target_roles,
    core_technologies: profile.core_technologies,
    ai_automation_technologies: profile.ai_automation_technologies,
    languages: profile.languages,
    availability: profile.availability,
    links: {
      email: profile.links.email,
      github: profile.links.github,
      linkedin: profile.links.linkedin,
      portfolio: profile.links.portfolio,
      cv: profile.links.cv,
    },
  },
  projects: projectsData.projects.map((project) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    priority: project.priority,
    short_description: project.short_description,
    long_description: project.long_description,
    role: project.role,
    technologies: project.technologies,
    highlights: project.highlights,
    outcome_or_proof: project.outcome_or_proof,
    role_relevance: project.role_relevance,
    links: project.links,
  })),
  featured_project_order: projectsData.featured_project_order,
  experience: experienceData.entries.map((entry) => ({
    id: entry.id,
    organization: entry.organization,
    title: entry.title,
    timeframe: entry.timeframe,
    location: entry.location,
    type: entry.type,
    summary: entry.summary,
    highlights: entry.highlights,
    technologies: entry.technologies,
  })),
  skills: skillsData.groups,
  role_fit: roleFitData.roles,
  faqs: faqData.faqs,
};

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
