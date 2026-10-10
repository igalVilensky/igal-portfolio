<template>
  <div class="page-shell">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-main">
          <div class="flex items-center gap-3">
            <User :size="32" class="text-secondary-900 dark:text-white" />
            <h1 class="page-title m-0">{{ t('publicContent.about') }}</h1>
          </div>
          <p class="page-intro mt-4">
            {{ t('publicContent.intro') }}
          </p>
        </div>
      </header>

      <section aria-labelledby="background-title" class="mb-14 max-w-3xl">
        <h2 id="background-title" class="section-title">{{ t('publicContent.backgroundTitle') }}</h2>
        <div class="mt-6 space-y-5 text-sm leading-7 text-secondary-700 dark:text-secondary-300 md:text-base">
          <p v-for="paragraph in backgroundParagraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </section>

      <section aria-labelledby="snapshot-title" class="mb-14 max-w-3xl">
        <h2 id="snapshot-title" class="text-xl font-semibold text-secondary-950 dark:text-white">
          {{ t('publicContent.snapshot') }}
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
          {{ t('publicContent.links') }}
        </h2>

        <div class="mt-5 flex flex-wrap gap-x-5 gap-y-3">
          <template v-for="link in links" :key="link.label">
            <NuxtLink
              v-if="link.internal"
              :to="localePath(link.href)"
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
import profileData from "../../content/profile.json";

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

const { t } = useI18n();
const localePath = useLocalePath();
const backgroundParagraphs = computed(() => [
  t('publicContent.role'), t('publicContent.focus'), t('publicContent.background'),
  t('publicContent.stack'), t('publicContent.education'),
]);
const snapshotItems = computed<SnapshotItem[]>(() => [
  { label: t('publicContent.location'), value: profile.identity.based_in },
  { label: t('publicContent.focusTitle'), value: t('publicContent.role') },
  { label: t('publicContent.educationTitle'), value: t('publicContent.education') },
]);

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
    internal: false,
    target: "_blank",
  },
];

useHead(() => ({
  title: `${t('publicContent.about')} | Igal Vilensky`,
  meta: [{ name: 'description', content: t('publicContent.seoDescription') }],
}));
</script>
