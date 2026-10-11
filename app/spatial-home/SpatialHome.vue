<script setup lang="ts">
import SpatialStack from './SpatialStack.vue';
import WorkReveal from './WorkReveal.vue';
import AskIgalReveal from './AskIgalReveal.vue';
import ExperimentsReveal from './ExperimentsReveal.vue';
import { useSpatialNavigation } from './useSpatialNavigation';
import { copy } from './content';
import ThemeToggle from '~/components/ThemeToggle.vue';
definePageMeta({ layout: false });
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const text = computed(() => copy[locale.value as keyof typeof copy] ?? copy.en);
const paused = ref(false);
const navigation = useSpatialNavigation();
const askSuppressed = ref(false);
// Keep an interrupted Ask reversal hidden until Ask is explicitly selected again.
watch(navigation.active, (active) => {
  if (active === 1) askSuppressed.value = true;
  else if (active === 2) askSuppressed.value = false;
});
const askOrigin = ref({ x: 0, y: 0, bottom: 0, exitX: 0, exitY: 0 });
const origin = ref({ x: 0, y: 0, bottom: 0 });
useHead({ title: 'Igal Vilensky — Spatial Home', meta: [{ name: 'robots', content: 'noindex, nofollow' }] });
</script>

<template>
  <main class="spatial-home" @pointerdown="navigation.dismissTouch">
    <WorkReveal :visible="navigation.active.value === 0" :origin="origin" :paused="paused" />
    <ExperimentsReveal :visible="navigation.active.value === 1" :suppressed="navigation.active.value !== null && navigation.active.value !== 1" :paused="paused" />
    <AskIgalReveal :class="{ 'environment-suppressed': askSuppressed }" :visible="navigation.active.value === 2" :origin="askOrigin" :paused="paused" :copy="text" />
    <header class="spatial-periphery">
      <div class="spatial-signature"><p>Igal Vilensky</p><span>{{ text.role }}</span></div>
      <div class="spatial-settings">
        <div class="spatial-languages" :aria-label="t('language.label')" role="group">
          <NuxtLink v-for="language in (['en', 'de', 'ru'] as const)" :key="language" :to="switchLocalePath(language)" :lang="language" :aria-current="locale === language ? 'true' : undefined" :aria-label="t('language.switchTo', { language: { en: 'English', de: 'Deutsch', ru: 'Русский' }[language] })">{{ language.toUpperCase() }}</NuxtLink>
        </div>
        <ThemeToggle />
      </div>
    </header>
    <SpatialStack :class="{ 'ask-suppressed': askSuppressed }" :copy="text" :paused="paused" :navigation="navigation" @origin="origin = $event" @ask-origin="askOrigin = $event" />
    <div class="spatial-motion"><button type="button" :aria-pressed="paused" @click="paused = !paused"><span aria-hidden="true">{{ paused ? '▷' : 'Ⅱ' }}</span> {{ paused ? text.resume : text.pause }}</button></div>
  </main>
</template>

<style scoped>
.environment-suppressed { visibility: hidden; }
.spatial-home { position: relative; isolation: isolate; overflow: clip; --sp-top: #f8fcff; --sp-bottom: #d9e6f3; --sp-edge: #b7cce0; --sp-line: #7896b4; --sp-cyan: #087e98; --sp-shadow: #25496b22; min-height: 100svh; display: flex; flex-direction: column; padding: clamp(18px, 3vw, 42px); background: radial-gradient(ellipse at 50% 48%, #dceaf780, transparent 64%), var(--color-canvas); }
:global(.dark .spatial-home) { --sp-top: #263e56; --sp-bottom: #102032; --sp-edge: #0b1724; --sp-line: #50718e; --sp-cyan: #6dddec; --sp-shadow: #0008; background: radial-gradient(ellipse at 50% 45%, #19395466, transparent 65%), #0a111b; }
.spatial-periphery { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; position: relative; z-index: 10; }
.spatial-signature p { font-size: 15px; font-weight: 600; letter-spacing: -.02em; }.spatial-signature span { display: block; font-size: 11px; color: var(--color-text-muted); }
.spatial-settings { display: flex; gap: 14px; align-items: center; }.spatial-languages { display: flex; }.spatial-languages a { display: grid; place-items: center; width: 44px; min-height: 44px; font: 11px var(--font-mono); color: var(--color-text-muted); }.spatial-languages a[aria-current] { color: var(--color-accent); text-decoration: underline; text-underline-offset: 7px; }
.spatial-settings :deep(.shell-control) { min-width: 44px; min-height: 44px; background: transparent; border-color: transparent; }
.spatial-motion { position: relative; z-index: 3; text-align: right; }.spatial-motion button { min-height: 44px; font: 11px var(--font-mono); color: var(--color-text-muted); }.spatial-motion button span { margin-right: 6px; }
@media (max-width: 600px) { .spatial-home { padding: 18px 12px 8px; gap: 16px; }.spatial-periphery { gap: 8px; }.spatial-signature p { font-size: 13px; }.spatial-signature span { font-size: 10px; }.spatial-settings { gap: 0; }.spatial-languages a { width: 44px; }.spatial-motion { text-align: center; } }
@media (max-width: 359px) { .spatial-periphery { flex-wrap: wrap; }.spatial-settings { margin-left: auto; } }
@media (max-height: 600px) and (min-width: 601px) { .spatial-object { width: min(64vw, 480px); } }
@media (prefers-reduced-motion: reduce) { .spatial-motion { visibility: hidden; } }
</style>
