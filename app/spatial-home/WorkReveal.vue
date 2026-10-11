<script setup lang="ts">
import { gsap } from 'gsap';
const props = defineProps<{ visible: boolean; paused: boolean; origin: { x: number; y: number; bottom: number } }>();
const { t } = useI18n();
const localePath = useLocalePath();
const { projects } = useProjects();
const lead = computed(() => projects.value.find(project => project.id === 'flowforge'));
const pictured = computed(() => projects.value.find(project => project.id === 'mindq-lab'));
const root = ref<HTMLElement>();
let motion: gsap.core.Timeline | undefined;
let context: gsap.Context | undefined;
let media: MediaQueryList | undefined;
function sync() {
  if (!motion) return;
  if (props.paused || media?.matches) motion.progress(props.visible ? 1 : 0).pause();
  else if (props.visible) motion.play();
  else motion.reverse();
}
watch(() => [props.visible, props.paused], sync);
onMounted(() => {
  media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', sync);
  context = gsap.context(() => {
    const select = gsap.utils.selector(root.value!);
    // One 400 ms playhead. Reversal continues from the current position.
    motion = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
      .fromTo(select('.peek-seam'), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: .65, duration: .24 }, 0)
      .fromTo(select('.peek-copy'), { x: 18, opacity: 0 }, { x: 0, opacity: 1, duration: .32 }, .04)
      .fromTo(select('.peek-opening'), { x: -24, scaleX: .94, opacity: 0 }, { x: 0, scaleX: 1, opacity: 1, duration: .36 }, .04);
    sync();
  }, root.value);
});
onBeforeUnmount(() => { context?.revert(); media?.removeEventListener('change', sync); });
</script>

<template>
  <div ref="root" class="work-peek" aria-hidden="true" :data-visible="visible" :style="{ '--stack-bottom': `${origin.bottom}px`, '--source-x': `${origin.x}px`, '--source-y': `${origin.y}px` }">
    <div class="peek-seam" />
    <div class="peek-copy">
      <span class="peek-route">01 / {{ localePath('/case-studies') }} ↗</span>
      <h2>{{ t('nav.work') }}</h2>
      <p>{{ t('ui.selected_product_and_engineering_work_primary_projects_show_saas') }}</p>
    </div>
    <div class="peek-opening">
      <div class="peek-page">
        <header><span>Igal Vilensky</span><span>{{ t('nav.work') }} ↗</span></header>
        <h3>{{ t('nav.work') }}</h3>
        <p class="peek-section">{{ t('ui.primary_projects') }}</p>
        <div v-if="lead" class="peek-row">
          <h4>{{ lead.title }}</h4>
          <p>{{ lead.shortDescription }}</p>
          <small>{{ lead.technologies.slice(0, 5).join(' · ') }}</small>
        </div>
        <figure v-if="pictured">
          <figcaption><span>{{ t('ui.secondary_work') }}</span><strong>{{ pictured.title }}</strong></figcaption>
          <img :src="pictured.image" alt="" width="1917" height="958" decoding="async" />
        </figure>
      </div>
    </div>
  </div>
</template>

<style scoped>
.work-peek { position: absolute; inset: 0; pointer-events: none; z-index: 1; --peek-paper: #f9fafc; --peek-rule: #ced8e2; --peek-shadow: #19364e26; }
:global(.dark .work-peek) { --peek-paper: #131f2d; --peek-rule: #354455; --peek-shadow: #0008; }
.peek-seam { position: absolute; left: var(--source-x); top: var(--source-y); width: calc(96vw - var(--source-x)); height: 2px; background: linear-gradient(90deg, var(--sp-cyan), var(--peek-rule)); transform-origin: left; }
.peek-copy { position: absolute; left: 4vw; top: 31%; width: 23vw; }
.peek-route { font: 10px var(--font-mono); color: var(--sp-cyan); letter-spacing: .04em; }
.peek-copy h2 { font-size: clamp(38px, 5.4vw, 92px); font-weight: 600; line-height: 1.12; letter-spacing: -.065em; text-transform: uppercase; margin: 20px 0; overflow-wrap: anywhere; }
.peek-copy p { font-size: clamp(12px, 1.05vw, 16px); line-height: 1.75; color: var(--color-text-muted); max-width: 29ch; }
.peek-opening { position: absolute; right: 3vw; top: 23%; width: 29vw; max-width: 540px; perspective: 1200px; transform-origin: left center; }
.peek-page { background: var(--peek-paper); border: 1px solid var(--peek-rule); padding: clamp(18px, 2vw, 32px); transform: rotateY(-9deg) rotateZ(2deg); box-shadow: 12px 18px 0 -10px var(--peek-rule), 22px 32px 40px -18px var(--peek-shadow); }
.peek-page header { display: flex; justify-content: space-between; gap: 12px; font-size: 9px; color: var(--color-text-muted); padding-bottom: 18px; border-bottom: 1px solid var(--peek-rule); }
.peek-page h3 { margin: 20px 0 16px; font-size: 30px; font-weight: 600; letter-spacing: -.03em; }
.peek-section { font-size: 13px; font-weight: 600; padding-bottom: 12px; }
.peek-row { border-block: 1px solid var(--peek-rule); padding: 14px 0; }
.peek-row h4 { font-size: 16px; font-weight: 600; }
.peek-row p { font-size: 11px; line-height: 1.65; color: var(--color-text-muted); margin: 6px 0; }
.peek-row small { font-size: 9px; color: var(--color-text-muted); }
.peek-page figure { margin-top: 20px; }
.peek-page figcaption { display: flex; justify-content: space-between; gap: 8px; font-size: 10px; margin-bottom: 10px; }
.peek-page figcaption span { color: var(--color-text-muted); }
.peek-page img { width: 100%; height: auto; border: 1px solid var(--peek-rule); }
.peek-seam, .peek-copy, .peek-opening { opacity: 0; }
@media (max-width: 1100px), (max-aspect-ratio: 6/5) {
  .peek-copy { left: 5%; top: 100px; width: 90%; display: flex; align-items: baseline; gap: 16px; }
  .peek-copy h2 { font-size: 30px; margin: 0; order: -1; }
  .peek-copy p { display: none; }
  .peek-opening { top: calc(var(--stack-bottom) + 2px); bottom: auto; right: 8%; width: 84%; max-width: none; perspective: none; }
  .peek-page { transform: none; padding: 4px 12px; display: grid; grid-template-columns: 1fr 70px; gap: 0 16px; box-shadow: 0 12px 24px -14px var(--peek-shadow); }
  .peek-page header, .peek-page h3, .peek-section, .peek-row small, .peek-page figcaption span { display: none; }
  .peek-row { border: 0; padding: 0; }
  .peek-row h4 { font-size: 13px; line-height: 16px; }
  .peek-row p { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; font-size: 10px; line-height: 13px; margin: 4px 0 0; }
  .peek-page figure { margin: 0; }
  .peek-page figcaption { margin-bottom: 5px; font-size: 9px; }
  .peek-seam { width: calc(94vw - var(--source-x)); }
}
@media (max-width: 600px) {
  .peek-copy { top: 90px; gap: 10px; }
  .peek-copy h2 { font-size: 24px; }
  .peek-route { font-size: 9px; }
  .peek-opening { right: 4%; width: 92%; }
  .peek-page { padding: 4px 12px; grid-template-columns: 1fr 70px; }
}
@media (max-height: 740px) and (max-width: 1100px) { .peek-copy { display: none; } }
</style>
