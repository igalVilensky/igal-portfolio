<script setup lang="ts">
import ThemeToggle from '~/components/ThemeToggle.vue';
import SelfSculpture from '~/spatial-about/SelfSculpture.client.vue';
import { aboutSections, copy } from '~/spatial-about/copy';
import { SelfMotion, type MotionSnapshot } from '~/spatial-about/motion';

definePageMeta({ layout: false });
const { locale, t } = useI18n();
const localePath = useLocalePath(), switchLocalePath = useSwitchLocalePath();
const text = computed(() => copy[locale.value as keyof typeof copy] ?? copy.en);
const requested = ref<number | null>(null), hovered = ref<number | null>(null), playing = ref(true), coreHovered = ref(false), unavailable = ref(false), reduced = ref(false);
const state = shallowRef<MotionSnapshot>(new SelfMotion().snapshot());
const projection = shallowRef({ core: { x: 0, y: 0 }, anchors: [] as { x: number; y: number }[] });
const stage = ref<HTMLElement>(), panel = ref<HTMLElement>(), panelBounds = ref({ x: 0, y: 0, width: 1, height: 1 });
const markerOrigin = ref({ x: 0, y: 0 });
const active = computed(() => unavailable.value ? requested.value : state.value.active);
const deployment = computed(() => unavailable.value ? (requested.value !== null ? 1 : 0) : state.value.deployment);
const visible = computed(() => active.value !== null && deployment.value > 0);
const reading = computed(() => active.value !== null);
const coreLabel = computed(() => reduced.value ? text.value.reduced : reading.value ? text.value.held : playing.value ? text.value.pause : text.value.resume);
const panelStyle = computed(() => {
 const p = deployment.value, b = panelBounds.value, origin = projection.value.core;
 return {
  transform: `translate(${(origin.x - b.x) * (1 - p)}px, ${(origin.y - b.y) * (1 - p)}px) scale(${.08 + .92 * p}, ${.025 + .975 * p})`,
  opacity: Math.min(1, p * 3), '--text-opacity': Math.max(0, (p - .55) / .45),
 };
});
let trigger: HTMLElement | null = null, observer: ResizeObserver | undefined, media: MediaQueryList | undefined;
function select(index: number | null, event?: Event) {
 if (index === null) { close(); return; }
 if (active.value === null) trigger = event?.currentTarget instanceof HTMLElement ? event.currentTarget : document.querySelector<HTMLElement>(`[data-section="${index}"]`);
 requested.value = index;
 hovered.value = null;
}
function close() {
 requested.value = null; hovered.value = null; coreHovered.value = false;
 if (unavailable.value) trigger?.focus({ preventScroll: true });
}
function updateState(value: MotionSnapshot) {
 const previous = state.value; state.value = value;
 if (previous.active !== null && value.active === null) {
  trigger?.focus({ preventScroll: true });
  // Focus remains accessible without leaving a synthetic hover slowing the reassembled object.
  hovered.value = null;
 }
}
function measure() {
 if (!stage.value || !panel.value) return;
 const s = stage.value.getBoundingClientRect(), p = panel.value.getBoundingClientRect();
 if (hovered.value !== null) {
  const marker = stage.value.querySelector<HTMLElement>(`[data-section="${hovered.value}"]`);
  if (marker) { const r = marker.getBoundingClientRect(); const node = projection.value.anchors[hovered.value]; markerOrigin.value = { x: node && node.x > r.x - s.x + r.width / 2 ? r.right - s.x : r.left - s.x, y: r.top - s.y + r.height / 2 }; }
 }
 // offsetLeft/Top reflect layout, unaffected by the deployment transform.
 panelBounds.value = { x: panel.value.offsetLeft, y: panel.value.offsetTop, width: p.width, height: p.height };
 // Keep a meaningful origin before the client renderer's first frame and in WebGL fallback.
 if (unavailable.value || !projection.value.core.x) projection.value = { ...projection.value, core: { x: s.width / 2, y: s.height * .42 } };
}
watch(hovered, async () => { await nextTick(); measure(); });
watch(active, async () => { await nextTick(); measure(); });
function key(event: KeyboardEvent) { if (event.key === 'Escape' && reading.value) { event.preventDefault(); close(); } }
const syncReduced = () => { reduced.value = media!.matches; };
onMounted(() => {
 media = matchMedia('(prefers-reduced-motion: reduce)'); syncReduced(); media.addEventListener('change', syncReduced);
 observer = new ResizeObserver(measure); if (stage.value) observer.observe(stage.value); if (panel.value) observer.observe(panel.value);
 window.addEventListener('keydown', key); measure();
});
onBeforeUnmount(() => { observer?.disconnect(); media?.removeEventListener('change', syncReduced); window.removeEventListener('keydown', key); });
useHead(() => ({ title: `${text.value.title} — Igal Vilensky`, meta: [{ name: 'robots', content: 'noindex, nofollow' }, { name: 'description', content: t('publicContent.seoDescription') }] }));
</script>
<template>
 <main class="self-page" :class="{ 'is-reading': reading, 'is-fallback': unavailable }" :data-phase="unavailable ? (reading ? 'open' : 'idle') : state.phase" :data-playing="playing" :data-upper="state.upper" :data-lower="state.lower" :data-separation="state.separation" :data-deployment="deployment" :data-yaw="state.yaw" :data-pitch="state.pitch">
  <header class="periphery">
   <NuxtLink class="signature" :to="localePath('/spatial-home')">Igal Vilensky<span>↖ {{ text.back }}</span></NuxtLink>
   <div class="settings"><nav :aria-label="t('language.label')"><NuxtLink v-for="language in (['en','de','ru'] as const)" :key="language" :to="switchLocalePath(language)" :aria-current="locale === language ? 'page' : undefined">{{ language.toUpperCase() }}</NuxtLink></nav><ThemeToggle /></div>
  </header>
  <section ref="stage" class="self-stage" :aria-label="text.title">
   <ClientOnly><SelfSculpture v-if="!unavailable" :selected="requested" :hovered="hovered" :playing="playing" :core-hovered="coreHovered" @select="select" @hover="hovered = $event" @core-hover="coreHovered = $event" @toggle="playing = !playing" @unavailable="unavailable = true" @project="projection = $event" @state="updateState" /></ClientOnly>
   <p class="context">{{ text.context }}</p>
   <svg v-if="!unavailable && hovered !== null && projection.anchors[hovered]" class="node-trace" aria-hidden="true"><path :d="`M ${markerOrigin.x} ${markerOrigin.y} L ${projection.anchors[hovered]!.x} ${projection.anchors[hovered]!.y}`" /><circle :cx="projection.anchors[hovered]!.x" :cy="projection.anchors[hovered]!.y" r="12" /></svg>
   <button v-if="!unavailable" class="core-control" :style="{ left: projection.core.x + 'px', top: projection.core.y + 'px' }" :aria-label="coreLabel" :aria-pressed="!playing" :disabled="reading || reduced" @pointerenter="coreHovered = true" @pointerleave="coreHovered = false" @focus="coreHovered = true" @blur="coreHovered = false" @click="playing = !playing">
    <span aria-hidden="true" class="core-caption">{{ reduced ? text.reduced : reading ? '' : playing ? text.coreHint : text.paused }}</span>
   </button>
   <p v-if="unavailable" class="fallback-message" role="status">{{ text.fallback }}</p>
   <nav class="spatial-zones" :aria-label="t('publicContent.about')">
    <button v-for="(label, i) in text.labels" :key="i" class="zone-control" :class="{ active: active === i, hovered: hovered === i }" :data-section="i" :aria-pressed="active === i" aria-controls="self-details" @pointerenter="hovered = i" @pointerleave="hovered = null" @focus="hovered = i" @blur="hovered = null" @click="select(i, $event)"><span class="zone-index">0{{ i + 1 }}</span><span>{{ label }}</span><span class="zone-mark" aria-hidden="true">{{ active === i ? '−' : '+' }}</span></button>
   </nav>
   <svg v-if="visible && !unavailable" class="deployment-link" aria-hidden="true"><path :d="`M ${projection.core.x} ${projection.core.y} L ${panelBounds.x - 20} ${panelBounds.y + 14} L ${panelBounds.x} ${panelBounds.y + 14}`" :style="{ opacity: deployment }" /><circle :cx="projection.core.x" :cy="projection.core.y" r="3" /></svg>
   <section ref="panel" id="self-details" class="information" :class="{ visible }" :style="panelStyle" :inert="deployment < .98" :aria-hidden="!visible" :aria-label="active !== null ? text.labels[active] : undefined">
    <template v-if="active !== null">
     <div class="surface-edge" aria-hidden="true" />
     <div class="information-text">
      <div class="info-top"><span>{{ text.section }} / 0{{ active + 1 }}</span><button class="close-control" :aria-label="text.close" @click="close">×</button></div>
      <h2>{{ text.labels[active] }}</h2>
      <div aria-live="polite" :key="active"><p v-for="key in aboutSections[active]" :key="key">{{ t(key) }}</p></div>
      <button class="reassemble" @click="close">↙ {{ text.close }} <kbd>{{ t('spatialLab.escape') }}</kbd></button>
     </div>
    </template>
   </section>
  </section>
  <footer class="self-footer"><div><span>{{ text.note }}</span><h1>{{ text.title }}</h1></div><p>{{ text.hint }}</p></footer>
 </main>
</template>
<style scoped src="../spatial-about/self.css"></style>
