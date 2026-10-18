<script setup lang="ts">
import type { Topology } from './topology';
import type { copy } from './copy';
defineProps<{
 project?: Topology['projects'][number];
 technology?: Topology['technologies'][number];
 projects: Topology['projects'];
 text: typeof copy.en;
 projectImage?: string;
 link: (url: string) => string;
}>();
const emit = defineEmits<{ select: [id: string] }>();
</script>
<template>
   <template v-if="project"><div class="detail-heading"><img v-if="projectImage" class="project-image" :src="projectImage" alt="" /><div v-else class="geometric-mark" aria-hidden="true"><i /><i /><i /></div><h2>{{ project.label }}</h2><p>{{ project.description }}</p><div class="project-links"><template v-for="(url, kind) in project.links" :key="kind"><a v-if="url && !(kind === 'live' && url === project.links.github)" :href="link(url)" :target="url.startsWith('/') ? undefined : '_blank'" :rel="url.startsWith('/') ? undefined : 'noopener noreferrer'">{{ kind === 'github' ? 'GitHub' : kind === 'live' ? text.live : text.study }} ↗</a></template></div></div><div class="stack"><h3>{{ text.stack }}</h3><span v-for="label in project.technologies" :key="label">{{ label }}</span></div></template>
   <template v-else-if="technology"><div class="detail-heading"><p class="eyebrow">{{ text.technologies }}</p><h2>{{ technology.label }}</h2></div><div class="related-projects"><h3>{{ text.related }}</h3><button v-for="node in projects.filter(node => technology!.projectIds.includes(node.id))" :key="node.id" @click="emit('select', node.id)">{{ node.label }} ↗</button></div></template>
   <p v-else class="empty-detail">{{ text.empty }}</p>
</template>
