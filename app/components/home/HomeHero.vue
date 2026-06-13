<template>
  <section id="hero" class="border-b border-secondary-200 bg-secondary-50 pt-24">
    <div class="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:items-center">
      <div>
        <p class="mb-5 text-xs font-semibold uppercase text-primary-700">
          {{ profileName }} · {{ basedIn }}
        </p>
        <h1 class="max-w-4xl text-4xl font-semibold leading-tight text-secondary-950 sm:text-5xl md:text-6xl">
          Full-stack software developer building SaaS products and practical AI-assisted workflows.
        </h1>
        <p class="mt-6 max-w-3xl text-base leading-8 text-secondary-700 md:text-lg">
          I build user-focused web applications with TypeScript, Vue/Nuxt, React/Next, Node.js, APIs, and Python/FastAPI.
          My current AI agents and automation work extends that product engineering foundation into practical workflows.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <NuxtLink to="/case-studies" class="btn-primary inline-flex w-full items-center justify-center px-5 py-3 sm:w-auto">
            View selected work
          </NuxtLink>
          <a
            :href="cvHref"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-full items-center justify-center rounded-md border border-secondary-300 bg-white px-5 py-3 font-semibold text-secondary-900 shadow-sm shadow-secondary-900/5 transition hover:border-primary-300 hover:bg-primary-50 sm:w-auto"
          >
            View CV
          </a>
          <a
            href="#ask-my-portfolio"
            class="inline-flex w-full items-center justify-center rounded-md border border-secondary-300 bg-secondary-50 px-5 py-3 font-semibold text-secondary-900 transition hover:border-primary-300 hover:bg-primary-50 sm:w-auto"
          >
            Ask My Portfolio
          </a>
        </div>

        <div class="mt-8 flex flex-wrap gap-2">
          <span
            v-for="role in roles"
            :key="role"
            class="rounded-md border border-secondary-200 bg-white px-3 py-1.5 text-sm font-medium text-secondary-700"
          >
            {{ role }}
          </span>
        </div>
      </div>

      <aside class="rounded-md border border-secondary-200 bg-white p-6 shadow-sm shadow-secondary-900/5">
        <div class="border-b border-secondary-200 pb-5">
          <p class="text-xs font-semibold uppercase text-primary-700">
            30-second recruiter read
          </p>
          <p class="mt-2 text-sm leading-6 text-secondary-600">
            Stack, focus, and strongest proof in one place.
          </p>
        </div>
        <dl class="divide-y divide-secondary-100">
          <div v-for="item in snapshotItems" :key="item.label" class="py-5 last:pb-0">
            <dt class="text-xs font-semibold uppercase text-secondary-500">
              {{ item.label }}
            </dt>
            <dd class="mt-2 text-base font-medium leading-7 text-secondary-950">
              {{ item.value }}
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
type SnapshotItem = {
  label: string;
  value: string;
};

defineProps<{
  profileName: string;
  basedIn: string;
  cvHref: string;
  roles: string[];
  snapshotItems: SnapshotItem[];
}>();
</script>
