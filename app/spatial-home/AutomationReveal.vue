<script setup lang="ts">
const props = defineProps<{ visible: boolean; paused: boolean }>();
const { locale } = useI18n();
const selected = ref<number | null>(null);
const preview = ref<number | null>(null);
const lit = computed(() => preview.value ?? selected.value);
const translations = {
  en: [['Input', 'Documents · Data · Events'], ['Processing', 'Extraction · Validation · Transformation'], ['Integration', 'Interfaces · Services · Systems'], ['AI & Automation', 'Reasoning · Rules · Orchestration'], ['Output', 'Results · Actions · Structured data']],
  de: [['Eingabe', 'Dokumente · Daten · Ereignisse'], ['Verarbeitung', 'Extraktion · Validierung · Transformation'], ['Integration', 'Schnittstellen · Dienste · Systeme'], ['KI & Automation', 'Schlussfolgern · Regeln · Orchestrierung'], ['Ausgabe', 'Ergebnisse · Aktionen · Strukturierte Daten']],
  ru: [['Ввод', 'Документы · Данные · События'], ['Обработка', 'Извлечение · Проверка · Преобразование'], ['Интеграция', 'Интерфейсы · Сервисы · Системы'], ['ИИ и автоматизация', 'Рассуждение · Правила · Оркестрация'], ['Вывод', 'Результаты · Действия · Структурированные данные']],
};
const stages = computed(() => translations[locale.value as keyof typeof translations] ?? translations.en);
const paths = ['M105 115 C105 155 170 170 155 245', 'M155 245 C100 370 180 485 320 485', 'M320 485 C500 565 790 500 850 310', 'M850 310 C940 230 960 130 890 95'];
watch(() => props.visible, visible => { if (!visible) { selected.value = null; preview.value = null; } });
function reset(event: KeyboardEvent) { if (event.key === 'Escape' && selected.value !== null) { selected.value = null; event.stopPropagation(); } }
</script>

<template>
  <section class="automation-world" :class="{ visible, paused }" :inert="!visible" :aria-label="stages[3]![0]" @keydown="reset">
    <svg class="flow-pipes" viewBox="0 0 1000 580" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <g v-for="(path, i) in paths" :key="path">
        <path class="pipe-shadow" :d="path" />
        <path class="pipe" :class="{ lit: lit === i || lit === i + 1 }" :d="path" pathLength="1" />
        <path class="packet" :d="path" pathLength="1" />
      </g>
      <path class="branch" d="M55 95 Q70 115 105 115 M55 135 Q70 115 105 115 M890 95 Q930 95 950 65 M890 95 Q930 95 960 110 M850 310 Q750 330 680 300" />
    </svg>
    <button v-for="(stage, i) in stages" :key="i" type="button" class="flow-station" :class="[`station-${i}`, { chosen: selected === i, lit: lit === i, muted: lit !== null && lit !== i }]" :aria-pressed="selected === i" :aria-label="`${i + 1}. ${stage[0]}: ${stage[1]}`" @pointerenter="preview = i" @pointerleave="preview = null" @focus="preview = i" @blur="preview = null" @click.stop="selected = selected === i ? null : i">
      <span class="station-assembly" aria-hidden="true">
        <span v-if="i === 0" class="intake"><i/><i/><i/></span>
        <span v-else-if="i === 1" class="processor"><i/><i/><i/></span>
        <span v-else-if="i === 2" class="junction"><i/><i/></span>
        <span v-else-if="i === 3" class="resolver"><i/><i/><i/></span>
        <span v-else class="output"><i/><i/><i/></span>
      </span>
      <span class="station-name"><small>0{{ i + 1 }} <span v-if="selected === i" aria-hidden="true">◆</span></small><strong>{{ stage[0] }}</strong></span>
      <span v-if="selected === i" class="station-detail">{{ stage[1] }}</span>
    </button>
  </section>
</template>

<style scoped>
.automation-world { --flow-amber: #9b5414; position: absolute; z-index: 0; inset: -8% -40% -10%; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .25s, visibility .25s; }
:global(.dark .automation-world) { --flow-amber: #e6ad66; }
.automation-world.visible { opacity: 1; visibility: visible; pointer-events: auto; }
.flow-pipes { position: absolute; width: 100%; height: 100%; overflow: visible; fill: none; pointer-events: none; }
.pipe-shadow { stroke: var(--sp-bottom); stroke-width: 7; opacity: .65; }
.pipe { stroke: var(--sp-line); stroke-width: 1; stroke-dasharray: 1; transition: stroke .25s; }
.pipe.lit { stroke: var(--flow-amber); stroke-width: 2; }
.branch { stroke: var(--sp-line); stroke-width: 1; opacity: .6; }
.packet { stroke: var(--sp-cyan); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: .025 .975; opacity: 0; }
.visible .pipe { animation: unfold .85s .2s both; }
.visible .packet { animation: transport 1.8s .75s both; }
.flow-station { position: absolute; width: 150px; min-height: 90px; transform: translate(-50%, -25px); display: flex; align-items: center; flex-direction: column; color: var(--color-text); pointer-events: auto; transition: opacity .25s; }
.station-0 { left: 10.5%; top: 19.8%; }.station-1 { left: 15.5%; top: 42.2%; }.station-2 { left: 32%; top: 83.6%; }.station-3 { left: 85%; top: 53.4%; }.station-4 { left: 89%; top: 16.4%; }
.station-assembly { display: grid; place-items: center; width: 48px; height: 48px; background: var(--sp-bottom); border: 1px solid var(--sp-line); border-radius: 50%; color: var(--sp-cyan); transition: transform .3s, border-radius .3s, box-shadow .3s; }
.lit .station-assembly, .flow-station:focus-visible .station-assembly { transform: scale(1.1); box-shadow: 0 0 0 5px color-mix(in srgb, var(--flow-amber) 12%, transparent); border-color: var(--flow-amber); }
.chosen .station-assembly { border: 2px solid var(--flow-amber); border-radius: 24%; color: var(--flow-amber); }
.flow-station:focus-visible { outline: 2px solid var(--flow-amber); outline-offset: 5px; border-radius: 5px; }
.muted { opacity: .62; }
.station-name { display: flex; flex-direction: column; align-items: center; margin-top: 8px; padding: 2px 5px; background: var(--color-canvas); border-radius: 3px; }
.station-name small { font: 9px/1.5 var(--font-mono); color: var(--flow-amber); }
.station-name strong { font-size: 12px; line-height: 1.4; font-weight: 500; }
.station-detail { width: 190px; margin-top: 7px; padding: 7px; font-size: 11px; line-height: 1.6; background: var(--sp-bottom); border-left: 2px solid var(--flow-amber); animation: detail .2s both; }
.intake, .output { display: flex; gap: 3px; }.intake i { width: 3px; height: 19px; background: currentColor; }.intake i:nth-child(2) { height: 12px; }
.processor { position: relative; width: 22px; height: 22px; }.processor i { position: absolute; inset: 0; border: 1px solid currentColor; }.processor i:nth-child(2) { transform: rotate(30deg); }.processor i:nth-child(3) { transform: rotate(60deg); }
.junction { position: relative; width: 28px; height: 24px; }.junction i { position: absolute; top: 5px; width: 20px; height: 14px; border: 1px solid currentColor; border-radius: 50%; transform: rotate(-35deg); }.junction i:last-child { right: 0; }
.resolver { position: relative; width: 23px; height: 23px; transform: rotate(45deg); }.resolver i { position: absolute; inset: 0; border: 1px solid currentColor; }.resolver i:nth-child(2) { inset: 4px; }.resolver i:nth-child(3) { inset: 8px; }
.output { flex-direction: column; gap: 4px; }.output i { width: 21px; height: 2px; background: currentColor; }.output i:last-child { width: 13px; }
.visible .flow-station { animation: arrive .45s both; animation-delay: .45s; }
@keyframes unfold { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes transport { 0% { opacity: 0; stroke-dashoffset: 0; } 15%,80% { opacity: 1; } 100% { opacity: 0; stroke-dashoffset: -1; } }
@keyframes arrive { from { opacity: 0; translate: 0 8px; } to { translate: 0 0; } }
@keyframes detail { from { opacity: 0; translate: 0 -4px; } }
.paused *, .paused .flow-station { animation-play-state: paused; }
@media(max-width: 1250px) {
  .automation-world { inset: 100% -3% auto; height: 245px; z-index: 6; }
  .flow-pipes { display: none; }
  .automation-world::before { content: ''; position: absolute; inset: 20px 8% 85px; border: 1px solid var(--sp-line); border-radius: 45%; transform: rotate(-8deg); pointer-events: none; }
  .flow-station { width: 31%; min-height: 80px; transform: translateX(-50%); }
  .station-0 { left: 16%; top: 0; }.station-1 { left: 50%; top: 0; }.station-2 { left: 84%; top: 0; }.station-3 { left: 68%; top: 98px; }.station-4 { left: 30%; top: 98px; }
  .station-assembly { width: 44px; height: 44px; }.station-name strong { font-size: 10px; }.station-name { margin-top: 3px; }
  .station-detail { position: absolute; top: 185px; width: 260px; margin: 0; }.station-0 .station-detail { left: 0; }.station-1 .station-detail { left: 50%; transform: translateX(-50%); }.station-2 .station-detail { right: 0; }.station-3 .station-detail { top: 87px; right: 0; }.station-4 .station-detail { top: 87px; left: 0; }
}
@media(prefers-reduced-motion: reduce) { .automation-world, .automation-world * { animation: none !important; transition: none !important; } }
</style>
