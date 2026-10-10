<template>
  <section class="page-shell">
    <div class="page-container">
      <header class="page-header">
        <div class="page-header-main">
        <span class="page-kicker">
          {{ t('homePage.contactTitle') }}
        </span>
        <h1 class="page-title">
          {{ t('publicContent.contactTitle') }}
        </h1>
        </div>
        <div class="page-header-side">
        <p class="page-intro">
          {{ t('publicContent.contact') }}
        </p>
        </div>
      </header>

      <div class="mb-12 grid gap-6 lg:grid-cols-3">
        <article
          v-for="item in contactCards"
          :key="item.title"
          class="rounded-3xl border border-neutral-200 bg-white/80 p-7 shadow-xl shadow-secondary-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-dark-surface/50"
        >
          <div :class="['mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg', item.bg]">
            <i :class="item.icon"></i>
          </div>
          <h2 class="mb-3 text-2xl font-display text-secondary-900 dark:text-white">{{ item.title }}</h2>
          <p class="mb-5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">{{ item.description }}</p>
          <a
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            class="contact-link inline-flex items-center gap-2 font-semibold text-primary-600 transition hover:text-primary-500 dark:text-primary-300"
          >
            <span>{{ item.label }}</span>
            <i :class="item.external ? 'fas fa-external-link-alt text-xs' : 'fas fa-arrow-right text-xs'"></i>
          </a>
        </article>
      </div>

      <section class="mb-12 rounded-3xl border border-secondary-100 bg-white/75 p-8 shadow-xl shadow-secondary-900/5 backdrop-blur dark:border-white/10 dark:bg-dark-surface/45">
        <div class="mb-8">
          <p class="text-sm font-bold uppercase tracking-[0.24em] text-primary-600 dark:text-primary-300">
            {{ t('publicContent.topics') }}
          </p>
          <h2 class="mt-3 font-display text-3xl font-bold text-secondary-900 dark:text-white">
            {{ t('publicContent.discuss') }}
          </h2>
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div
            v-for="fit in collaborationFits"
            :key="fit"
            class="rounded-2xl border border-secondary-100 bg-secondary-50 px-5 py-4 text-secondary-700 dark:border-white/10 dark:bg-white/5 dark:text-secondary-300"
          >
            {{ fit }}
          </div>
        </div>
      </section>

      <section>
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 h-1 w-12 bg-primary-500"></div>
          <h2 class="font-display text-3xl text-secondary-900 dark:text-white">
            {{ t('publicContent.online') }}
          </h2>
        </div>

        <div class="flex flex-wrap justify-center gap-5">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            :target="social.external ? '_blank' : undefined"
            :rel="social.external ? 'noopener noreferrer' : undefined"
            class="group flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-600 transition duration-300 hover:-translate-y-1 hover:bg-primary-500 hover:text-white hover:shadow-2xl dark:border-white/10 dark:bg-dark-surface/60 dark:text-neutral-300"
            :aria-label="social.name"
          >
            <i :class="social.icon" class="text-xl"></i>
          </a>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const contactCards = computed(() => [
  {
    title: "Email",
    description: t('publicContent.emailDesc'),
    label: "vilenskyigal@gmail.com",
    href: "mailto:vilenskyigal@gmail.com",
    icon: "fas fa-envelope",
    bg: "bg-primary-500",
    external: false,
  },
  {
    title: "LinkedIn",
    description: t('publicContent.linkedinDesc'),
    label: t('publicContent.linkedinLink'),
    href: "https://www.linkedin.com/in/igalvilensky/",
    icon: "fab fa-linkedin-in",
    bg: "bg-[#0A66C2]",
    external: true,
  },
  {
    title: "GitHub",
    description: t('publicContent.githubDesc'),
    label: t('publicContent.githubLink'),
    href: "https://github.com/igalVilensky",
    icon: "fab fa-github",
    bg: "bg-secondary-800",
    external: true,
  },
]);

const collaborationFits = computed(() => [1, 2, 3, 4].map((n) => t(`publicContent.topic${n}`)));

const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/igalvilensky/",
    external: true,
  },
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalVilensky",
    external: true,
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    url: "mailto:vilenskyigal@gmail.com",
    external: false,
  },
  {
    name: "Portfolio",
    icon: "fas fa-globe",
    url: "https://igalvilensky.netlify.app/",
    external: true,
  },
];
</script>
