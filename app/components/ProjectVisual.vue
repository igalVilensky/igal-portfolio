<template>
  <div class="project-visual relative overflow-hidden rounded-2xl border border-secondary-200/80 bg-white shadow-xl shadow-secondary-900/5 dark:border-white/10 dark:bg-dark-surface/70"
    :style="visualStyle">
    <div class="flex items-center gap-1.5 border-b border-secondary-100 bg-secondary-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/5">
      <span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
      <span class="ml-3 h-2 flex-1 rounded-full bg-secondary-200/80 dark:bg-white/10"></span>
    </div>

    <div v-if="project.image" class="aspect-[16/10] overflow-hidden bg-secondary-100 dark:bg-white/5">
      <img
        :src="project.image"
        :alt="`${project.title} preview`"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </div>

    <div v-else class="relative aspect-[16/10] p-5 md:p-6">
      <div class="absolute inset-0 opacity-80 project-grid"></div>
      <div class="relative flex h-full flex-col justify-between">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary-500 dark:text-secondary-400">
              {{ project.category.split("/")[0].trim() }}
            </div>
            <div class="text-3xl font-display font-bold text-secondary-900 dark:text-white">
              {{ project.visual.initials }}
            </div>
          </div>
          <div class="rounded-xl px-3 py-2 text-right text-[10px] font-bold uppercase tracking-widest text-secondary-700 ring-1 ring-secondary-200 dark:text-secondary-200 dark:ring-white/10"
            style="background: color-mix(in srgb, var(--visual-soft) 70%, transparent);">
            Live system
          </div>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-3 gap-2">
            <div v-for="metric in metrics" :key="metric"
              class="rounded-xl border border-secondary-200/80 bg-white/80 px-3 py-2 text-[10px] font-bold text-secondary-600 shadow-sm backdrop-blur dark:border-white/10 dark:bg-dark-surface/70 dark:text-secondary-300">
              {{ metric }}
            </div>
          </div>
          <div class="space-y-2">
            <span class="block h-2 w-full rounded-full bg-secondary-200/80 dark:bg-white/10"></span>
            <span class="block h-2 w-2/3 rounded-full" style="background: var(--visual-accent);"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PortfolioProject } from "~/composables/useProjects";

const props = defineProps<{
  project: PortfolioProject;
}>();

const metrics = computed(() => [
  props.project.visual.metricA,
  props.project.visual.metricB,
  props.project.visual.metricC,
].filter(Boolean));

const visualStyle = computed(() => ({
  "--visual-accent": props.project.visual.accent,
  "--visual-soft": props.project.visual.soft,
}));
</script>

<style scoped>
.project-visual {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--visual-soft) 28%, transparent), transparent 45%),
    white;
}

.dark .project-visual {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--visual-accent) 18%, transparent), transparent 50%),
    rgba(21, 22, 33, 0.78);
}

.project-grid {
  background-image:
    linear-gradient(color-mix(in srgb, var(--visual-accent) 18%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--visual-accent) 18%, transparent) 1px, transparent 1px);
  background-size: 28px 28px;
}
</style>
