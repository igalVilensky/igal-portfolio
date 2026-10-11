<template>
  <section id="hero" class="home-hero" aria-labelledby="hero-title">
    <div class="container-wide hero-grid">
      <div class="hero-copy">
        <p class="technical-label hero-role">{{ t('foundation.role') }}</p>
        <h1 id="hero-title" class="display-title">{{ profileName }}</h1>
        <p class="hero-employer">{{ t('foundation.employer') }}</p>
        <p class="hero-headline"><span>{{ t('foundation.headlineBuild') }}</span> <span class="headline-accent">{{ t('foundation.headlineConnect') }}</span> <span>{{ t('foundation.headlineAutomate') }}</span></p>
        <p class="hero-description">{{ t('foundation.description') }}</p>
        <nav class="hero-actions" :aria-label="t('homePage.heroLinksLabel')">
          <a href="#selected-work" class="btn-primary">{{ t('foundation.exploreWork') }}<ArrowRight :size="18" aria-hidden="true" /></a>
          <a :href="`mailto:${email}`" class="btn-outline">{{ t('foundation.contact') }}</a>
        </nav>
        <div class="hero-context metadata">
          <span>{{ basedIn }}</span>
          <a :href="github" target="_blank" rel="noopener noreferrer" class="text-link">GitHub</a>
          <a :href="linkedin" target="_blank" rel="noopener noreferrer" class="text-link">LinkedIn</a>
        </div>
      </div>
      <SystemExplorer />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next';
import SystemExplorer from './SystemExplorer.vue';
defineProps<{ profileName: string; basedIn: string; github: string; linkedin: string; email: string }>();
const { t } = useI18n();
</script>

<style scoped>
.home-hero { position: relative; overflow: hidden; background: var(--color-canvas); border-bottom: 1px solid var(--color-border); }
.home-hero::before { content: ''; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 85% 35%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 58%), radial-gradient(ellipse at 40% 90%, color-mix(in srgb, var(--color-system) 5%, transparent), transparent 45%); }
.hero-grid { display: grid; gap: var(--space-12); padding-block: var(--space-12); max-width: 82rem; }
.hero-copy { min-width: 0; }
.hero-role { display: flex; align-items: center; gap: .75rem; color: var(--color-accent); margin-bottom: var(--space-4); }
.hero-role::before { content: ''; width: 1.5rem; height: 2px; background: currentColor; }
.display-title { font-size: clamp(1.8rem, 3vw, 2.6rem); }
.hero-employer { color: var(--color-text-muted); font-size: .875rem; margin-top: var(--space-3); }
.hero-headline { font-size: clamp(2.2rem, 3.7vw, 3.4rem); letter-spacing: -.045em; line-height: 1.13; font-weight: 650; margin-top: var(--space-8); text-wrap: balance; }
.hero-headline span { display: block; }
.headline-accent { color: var(--color-accent); }
.hero-description { font-size: 1rem; line-height: 1.75; color: var(--color-text-muted); margin-top: var(--space-6); max-width: 48ch; }
.hero-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-top: var(--space-8); }
.hero-context { display: flex; align-items: center; flex-wrap: wrap; column-gap: var(--space-4); row-gap: var(--space-2); margin-top: var(--space-6); }
.hero-context a { display: inline-flex; align-items: center; min-height: 44px; }
@media (min-width: 1024px) {
  .hero-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr); align-items: center; gap: clamp(2rem, 4vw, 4rem); padding-block: var(--space-16); }
}
@media (max-width: 639px) {
  .hero-grid { padding-top: 2rem; gap: 2rem; }
  .hero-headline { font-size: clamp(1.9rem, 7.5vw, 2.65rem); margin-top: 1.5rem; }
  .hero-description { margin-top: 1rem; }
  .hero-actions { margin-top: 1.5rem; }
  .hero-context { margin-top: 1rem; }
}
</style>
