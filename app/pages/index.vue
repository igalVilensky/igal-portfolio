<!-- app/pages/index.vue -->
<template>
  <main class="min-h-screen bg-secondary-50 text-secondary-900 dark:bg-dark-bg dark:text-secondary-100">
    <HomeHero
      :profile-name="profile.identity.name"
      :based-in="profile.identity.based_in"
      :cv-href="profile.links.cv"
      :github="profile.links.github"
      :linkedin="profile.links.linkedin"
      :email="profile.links.email"
    />
    <SelectedWork :projects="featuredProjects" />
    <AskPortfolioPreview
      :prompts="askPrompts"
      :faqs="faqData.faqs"
      :portfolio-context="portfolioGuideContext"
    />
    <HomeContactCTA
      :summary="profile.availability.summary"
      :email="profile.links.email"
      :linkedin="profile.links.linkedin"
      :github="profile.links.github"
    />
  </main>
</template>

<script setup lang="ts">
import AskPortfolioPreview from "~/components/home/AskPortfolioPreview.vue";
import HomeContactCTA from "~/components/home/HomeContactCTA.vue";
import HomeHero from "~/components/home/HomeHero.vue";
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
  shortDescription: string;
  techLine: string;
  badges: string[];
  link: ProjectLink | null;
};

const profile = profileData;

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
  shortDescription: project.short_description,
  techLine: project.technologies.slice(0, 5).join(" · "),
  badges: project.category.split(" / ").slice(0, 3),
  link: getProjectLink(project),
});

const featuredProjects = projectsData.featured_project_order
  .map((id) => projectsData.projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))
  .map(toFeaturedProject);

const askPrompts = [
  "role-fit",
  "frontend-experience",
  "first-project-to-review",
]
  .map((id) => faqData.faqs.find((item) => item.id === id))
  .filter((item): item is (typeof faqData.faqs)[number] => Boolean(item));

const formatProjectForGuide = (project: Project) => [
  `${project.title}: ${project.short_description}`,
  `Role: ${project.role}`,
  `Technologies: ${project.technologies.slice(0, 8).join(", ")}`,
  `Proof: ${project.outcome_or_proof.join(" ")}`,
].join("\n");

const featuredProjectBrief = featuredProjects
  .map((project) => projectsData.projects.find((item) => item.id === project.id))
  .filter((project): project is Project => Boolean(project))
  .map(formatProjectForGuide)
  .join("\n\n");

const experienceBrief = experienceData.entries
  .filter((entry) => entry.type === "work" || entry.id === "wbs-ai-agents-automations")
  .map((entry) => `${entry.title}, ${entry.organization}, ${entry.timeframe}: ${entry.summary}`)
  .join("\n");

const skillBrief = skillsData.groups
  .filter((group) => ["frontend", "backend", "ai-automation", "engineering"].includes(group.id))
  .map((group) => `${group.title}: ${group.skills.slice(0, 10).join(", ")}`)
  .join("\n");

const roleFitBrief = roleFitData.roles
  .slice(0, 6)
  .map((role) => `${role.role_title}: ${role.fit_summary}`)
  .join("\n");

const faqBrief = faqData.faqs
  .map((faq) => `${faq.question}\n${faq.answer}`)
  .join("\n\n");

const portfolioGuideContext = [
  `Name: ${profile.identity.name}`,
  `Location: ${profile.identity.based_in}`,
  "Positioning: Full-stack developer building SaaS products, web applications, and AI-assisted tools.",
  `Summary: ${profile.cv_summary}`,
  `Availability: ${profile.availability.summary}`,
  `Target roles: ${profile.target_roles.join(", ")}`,
  `Current course: ${profile.current_course.program}, ${profile.current_course.institution}, ${profile.current_course.timeframe}.`,
  `Languages: ${profile.languages.map((item) => `${item.language} ${item.level}`).join(", ")}`,
  `Contact: email ${profile.links.email}, LinkedIn ${profile.links.linkedin}, GitHub ${profile.links.github}, CV ${profile.links.cv}.`,
  `Featured projects:\n${featuredProjectBrief}`,
  `Experience:\n${experienceBrief}`,
  `Skills:\n${skillBrief}`,
  `Role fit:\n${roleFitBrief}`,
  `Saved portfolio answers:\n${faqBrief}`,
].join("\n\n");

useHead({
  title: "Igal Vilensky - Full-Stack Developer",
  meta: [
    {
      name: "description",
      content:
        "Portfolio of Igal Vilensky, a Leipzig-based full-stack developer building SaaS products, web applications, and AI-assisted tools.",
    },
  ],
});
</script>
