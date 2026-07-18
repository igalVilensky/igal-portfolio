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
    <HomeContactCTA
      :summary="profile.availability.summary"
      :email="profile.links.email"
      :linkedin="profile.links.linkedin"
      :github="profile.links.github"
    />
  </main>
</template>

<script setup lang="ts">
import HomeContactCTA from "~/components/home/HomeContactCTA.vue";
import HomeHero from "~/components/home/HomeHero.vue";
import SelectedWork from "~/components/home/SelectedWork.vue";
import profileData from "../../content/profile.json";
import projectsData from "../../content/projects.json";

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
