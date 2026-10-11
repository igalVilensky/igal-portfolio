<template>
  <section class="explorer" :aria-labelledby="`${uid}-title`" :aria-describedby="`${uid}-caption`">
    <header class="explorer-header">
      <h2 :id="`${uid}-title`" class="technical-label">{{ t('explorer.title') }}</h2>
      <Network :size="18" aria-hidden="true" />
    </header>
    <p class="explorer-hint">{{ t('explorer.hint') }}</p>
    <div class="system-map" role="group" :aria-label="t('explorer.domainsLabel')">
      <div class="orbit orbit-outer" aria-hidden="true" />
      <div class="orbit orbit-inner" aria-hidden="true" />
      <svg class="connections" viewBox="0 0 600 400" preserveAspectRatio="none" aria-hidden="true">
        <g v-for="domain in connections" :key="domain.id" :class="{ connected: highlighted === domain.id || highlighted === 'integrations' }">
          <path :d="domain.path" class="connection-base" />
          <path :d="domain.path" class="connection-flow" />
        </g>
      </svg>
      <button v-for="domain in domains" :key="domain.id" type="button"
        class="system-node" :class="[domain.id, { selected: selected === domain.id, highlighted: highlighted === domain.id }]"
        :aria-pressed="selected === domain.id" :aria-controls="`${uid}-details`"
        @pointerenter="hovered = domain.id" @pointerleave="hovered = null"
        @focus="focused = domain.id" @blur="focused = null" @click="selected = domain.id">
        <component :is="domain.icon" :size="23" aria-hidden="true" />
        <span>{{ t(`explorer.${domain.id}.title`) }}</span>
        <Check v-if="selected === domain.id" class="selection-mark" :size="14" aria-hidden="true" />
      </button>
    </div>
    <div :id="`${uid}-details`" class="domain-details" aria-live="polite" aria-atomic="true">
      <div :key="selected" class="detail-content">
        <p class="detail-label technical-label">{{ t('explorer.focus') }}</p>
        <h3>{{ t(`explorer.${selected}.title`) }}</h3>
        <p class="detail-description">{{ t(`explorer.${selected}.description`) }}</p>
        <div v-if="relatedProjects.length" class="related-projects">
          <span>{{ t('explorer.related') }}</span>
          <template v-for="project in relatedProjects" :key="project.id">
            <NuxtLink v-if="project.caseStudyUrl" :to="localePath(project.caseStudyUrl)" class="project-link">{{ project.title }}<ArrowUpRight :size="15" aria-hidden="true" /></NuxtLink>
            <a v-else-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="project-link">{{ project.title }}<ArrowUpRight :size="15" aria-hidden="true" /><span class="sr-only">{{ t('explorer.newTab') }}</span></a>
          </template>
        </div>
      </div>
    </div>
    <p :id="`${uid}-caption`" class="explorer-caption">{{ t('explorer.caption') }}</p>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, Check, Network } from 'lucide-vue-next';
import { domains, type DomainId } from './system-explorer/domains';

const { t } = useI18n();
const localePath = useLocalePath();
const { projects } = useProjects();
const uid = useId();
const selected = ref<DomainId>('integrations');
const hovered = ref<DomainId | null>(null);
const focused = ref<DomainId | null>(null);
const highlighted = computed(() => hovered.value ?? focused.value ?? selected.value);
const connections = domains.filter(domain => domain.path);
const relatedProjects = computed(() => {
  const ids: readonly string[] = domains.find(domain => domain.id === selected.value)!.projectIds;
  return projects.value.filter(project => ids.includes(project.id) && (project.caseStudyUrl || project.liveUrl));
});
</script>

<style scoped>
.explorer { position: relative; isolation: isolate; min-width: 0; border: 1px solid var(--color-border-control); border-radius: 18px; background: var(--color-surface); box-shadow: 0 24px 65px -35px color-mix(in srgb, var(--color-accent) 38%, transparent), 0 2px 5px #17233408; }
.explorer::before { content: ''; position: absolute; z-index: -1; inset: 18px -9px -10px 18px; border-right: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); border-radius: 18px; pointer-events: none; }
.explorer-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem 0; color: var(--color-accent); }
.explorer-header h2 { color: var(--color-text); }
.explorer-hint { padding: .35rem 1.5rem 0; font-size: .8125rem; color: var(--color-text-muted); }
.system-map { position: relative; height: 360px; margin-top: .75rem; background-image: radial-gradient(ellipse at center, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 65%), linear-gradient(color-mix(in srgb, var(--color-border) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-border) 45%, transparent) 1px, transparent 1px); background-size: auto, 24px 24px, 24px 24px; }
.orbit { position: absolute; border: 1px solid var(--color-border); border-radius: 50%; left: 50%; top: 49%; transform: translate(-50%, -50%); pointer-events: none; }
.orbit-outer { width: 66%; height: 86%; opacity: .6; }
.orbit-inner { width: 42%; height: 57%; border-style: dashed; }
.connections { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; fill: none; }
.connection-base { stroke: var(--color-border-control); stroke-width: 1.5; transition: stroke 180ms; }
.connection-flow { stroke: var(--color-system); stroke-width: 2; stroke-dasharray: 7 14; opacity: 0; }
.connected .connection-base { stroke: var(--color-system); }
.connected .connection-flow { opacity: 1; animation: flow 9s linear infinite; }
.system-node { position: absolute; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: .6rem; width: 27%; min-height: 90px; padding: .8rem .5rem; border: 1px solid var(--color-border-control); border-radius: 10px; background: var(--color-surface); color: var(--color-text); font-size: .875rem; font-weight: 550; line-height: 1.35; text-align: center; transform: translate(-50%, -50%); box-shadow: 0 5px 16px #1723340a; transition: border-color 180ms, background-color 180ms, box-shadow 180ms; }
.system-node > svg:first-child { color: var(--color-accent); }
.data { left: 21.667%; top: 25%; }
.applications { left: 78.333%; top: 25%; }
.integrations { left: 50%; top: 48.75%; width: 28%; min-height: 100px; z-index: 1; }
.automation { left: 21.667%; top: 75%; }
.outcomes { left: 78.333%; top: 75%; }
.system-node.highlighted { border-color: var(--color-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-accent) 9%, transparent); }
.system-node.selected { border: 2px solid var(--color-accent); background: var(--color-surface-raised); box-shadow: 0 0 28px color-mix(in srgb, var(--color-accent) 17%, transparent); }
.system-node:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 4px; }
.selection-mark { position: absolute; top: 6px; right: 6px; color: var(--color-accent); }
.domain-details { border-top: 1px solid var(--color-border); margin-inline: 1.5rem; padding-block: 1.15rem; min-height: 205px; }
.detail-content { animation: detail-in 180ms ease-out; }
.detail-label { font-size: .6875rem; letter-spacing: .1em; text-transform: uppercase; color: var(--color-system); }
.domain-details h3 { font-size: 1.125rem; font-weight: 600; margin-top: .25rem; }
.detail-description { font-size: .875rem; line-height: 1.6; color: var(--color-text-muted); margin-top: .4rem; }
.related-projects { display: flex; flex-wrap: wrap; align-items: center; column-gap: .65rem; margin-top: .6rem; font-size: .75rem; color: var(--color-text-muted); }
.project-link { display: inline-flex; align-items: center; gap: .25rem; min-height: 44px; color: var(--color-accent); text-decoration: underline; text-underline-offset: 3px; }
.explorer-caption { font-size: .6875rem; line-height: 1.6; color: var(--color-text-muted); padding: .8rem 1.5rem; background: var(--color-surface-raised); border-top: 1px solid var(--color-border); border-radius: 0 0 18px 18px; }
@keyframes flow { to { stroke-dashoffset: -84; } }
@keyframes detail-in { from { opacity: .6; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 639px) {
  .explorer-header { padding: 1rem 1rem 0; }
  .explorer-hint { padding-inline: 1rem; }
  .system-map { height: auto; display: grid; grid-template-columns: 1fr 1fr; gap: .65rem; padding: 1rem; }
  .connections, .orbit { display: none; }
  .system-map::before { content: ''; position: absolute; width: 1px; background: var(--color-system); left: 50%; top: 20px; bottom: 20px; }
  .system-node { position: relative; inset: auto; transform: none; width: auto; min-height: 75px; font-size: .8125rem; }
  .integrations { grid-column: 1 / -1; grid-row: 1; width: 66%; justify-self: center; min-height: 70px; }
  .domain-details { margin-inline: 1rem; min-height: 215px; }
  .explorer-caption { padding-inline: 1rem; }
}
@media (prefers-reduced-motion: reduce) {
  .connected .connection-flow, .detail-content { animation: none; }
  .system-node, .connection-base { transition: none; }
}
@media (forced-colors: active) {
  .system-node.selected { outline: 2px solid Highlight; outline-offset: 2px; }
  .connection-base { stroke: CanvasText; }
}
</style>
