<template>
  <section id="recruiter-snapshot" class="section-compact bg-white">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div class="mb-9 grid gap-5 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] md:items-end">
        <div>
          <p class="page-kicker">Recruiter snapshot</p>
          <h2 class="section-title">The useful facts first.</h2>
        </div>
        <p class="text-base leading-7 text-secondary-600">
          A compact view of role fit, stack, language coverage, and current AI automation direction.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="item in items"
          :key="item.label"
          class="rounded-md border border-secondary-200 bg-secondary-50 p-5"
        >
          <p class="text-xs font-semibold uppercase text-secondary-500">
            {{ item.label }}
          </p>
          <p class="mt-3 text-base leading-7 text-secondary-900">
            {{ item.value }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
type SnapshotItem = {
  label: string;
  value: string;
};

defineProps<{
  items: SnapshotItem[];
}>();
</script>
