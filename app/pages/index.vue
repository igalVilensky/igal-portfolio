<!-- app/pages/index.vue -->
<template>
  <main class="min-h-screen bg-secondary-50 text-secondary-900 dark:bg-dark-bg dark:text-secondary-100">
    <HomeHero
      :profile-name="profile.identity.name"
      :based-in="profile.identity.based_in"
      :github="profile.links.github"
      :linkedin="profile.links.linkedin"
      :email="profile.links.email"
    />
    <section aria-labelledby="current-focus" class="section-compact bg-secondary-50 dark:bg-dark-bg">
      <div class="mx-auto max-w-4xl px-5 sm:px-6">
        <h2 id="current-focus" class="text-2xl font-semibold text-secondary-950 dark:text-white">{{ t('publicContent.focusTitle') }}</h2>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-secondary-700 dark:text-secondary-300">{{ t('publicContent.role') }}</p>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-secondary-700 dark:text-secondary-300">{{ t('publicContent.focus') }}</p>
      </div>
    </section>
    <SelectedWork :projects="featuredProjects" />
    <section aria-labelledby="experiments-ideas" class="section-compact bg-secondary-50 dark:bg-dark-bg">
      <div class="mx-auto max-w-4xl px-5 sm:px-6">
        <h2 id="experiments-ideas" class="text-2xl font-semibold text-secondary-950 dark:text-white">{{ t('publicContent.experimentsTitle') }}</h2>
        <p class="mt-3 max-w-3xl text-sm leading-7 text-secondary-700 dark:text-secondary-300">{{ t('publicContent.experiments') }}</p>
        <NuxtLink :to="localePath('/experiments')" class="mt-5 inline-flex text-sm font-medium text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-200">{{ t('publicContent.explore') }}</NuxtLink>
      </div>
    </section>
    <HomeContactCTA
      :summary="t('publicContent.contact')"
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
import { getLocalizedValue } from "~/utils/localizedContent";
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
const localePath = useLocalePath();
const { locale, t } = useI18n();

const getProjectLink = (project: Project): ProjectLink | null => {
  if (project.links.case_study) {
    return {
      url: project.links.case_study,
      label: t("homePage.viewCaseStudy"),
      internal: project.links.case_study.startsWith("/"),
    };
  }

  if (project.links.live) {
    return {
      url: project.links.live,
      label: project.links.live.startsWith("/") ? t("homePage.openTool") : t("homePage.openLiveDemo"),
      internal: project.links.live.startsWith("/"),
    };
  }

  if (project.links.github) {
    return {
      url: project.links.github,
      label: t("homePage.viewGithub"),
      internal: false,
    };
  }

  return null;
};

const toFeaturedProject = (project: Project): FeaturedProject => ({
  id: project.id,
  title: getLocalizedValue(project.title, locale.value),
  shortDescription: getLocalizedValue(project.short_description, locale.value),
  techLine: project.technologies.slice(0, 5).join(" · "),
  badges: getLocalizedValue(project.category, locale.value).split(" / ").slice(0, 3),
  link: getProjectLink(project),
});

const featuredProjects = computed(() => projectsData.featured_project_order
  .map((id) => projectsData.projects.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project))
  .map(toFeaturedProject));

useHead(() => ({
  title: t("homePage.seoTitle"),
  meta: [
    {
      name: "description",
      content: t("homePage.seoDescription"),
    },
  ],
}));
</script>
