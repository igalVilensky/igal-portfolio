<template>
  <section class="rounded-md border border-secondary-200 bg-white p-5 dark:border-dark-border dark:bg-dark-surface">
    <div class="mb-5">
      <h3 class="text-lg font-semibold text-secondary-950 dark:text-white">
        {{ t('ui.a11y_contrast_checker') }}
      </h3>
      <p class="mt-2 text-sm leading-6 text-secondary-600 dark:text-secondary-400">
        {{ t('ui.check_foreground_and_background_contrast_against_common_wcag_text') }}
      </p>
    </div>

    <div class="space-y-4">
      <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-end">
        <label class="block">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">{{ t('ui.text_color') }}</span>
          <span class="mt-2 flex items-center gap-2 rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 dark:border-dark-border dark:bg-dark-bg">
            <input v-model="fg" type="color" class="h-7 w-7 cursor-pointer border-0 bg-transparent p-0" />
            <input
              v-model="fg"
              type="text"
              class="min-w-0 flex-1 bg-transparent font-mono text-xs uppercase text-secondary-950 dark:text-white"
            />
          </span>
        </label>

        <button
          type="button"
          class="rounded-md border border-secondary-200 px-3 py-2 text-xs font-medium text-secondary-600 transition-colors hover:border-secondary-400 hover:text-secondary-950 dark:border-dark-border dark:text-secondary-400 dark:hover:text-white"
          @click="swapColors"
        >
          {{ t('ui.swap') }}
        </button>

        <label class="block">
          <span class="text-xs font-medium text-secondary-600 dark:text-secondary-400">{{ t('ui.background_color') }}</span>
          <span class="mt-2 flex items-center gap-2 rounded-md border border-secondary-200 bg-secondary-50 px-3 py-2 dark:border-dark-border dark:bg-dark-bg">
            <input v-model="bg" type="color" class="h-7 w-7 cursor-pointer border-0 bg-transparent p-0" />
            <input
              v-model="bg"
              type="text"
              class="min-w-0 flex-1 bg-transparent font-mono text-xs uppercase text-secondary-950 dark:text-white"
            />
          </span>
        </label>
      </div>

      <div
        class="rounded-md border p-4 transition-colors"
        :style="{ backgroundColor: safeBg, color: safeFg, borderColor: previewBorder }"
      >
        <p class="text-base font-semibold">{{ t('ui.visual_preview') }}</p>
        <p class="mt-2 text-sm leading-6">
          {{ t('ui.this_sample_approximates_normal_interface_text_on_the_selected') }}
        </p>
        <p class="mt-3 text-lg font-semibold">
          {{ t('ui.large_text_preview') }}
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div>
          <p class="text-xs font-medium text-secondary-500 dark:text-secondary-500">{{ t('ui.contrast_ratio') }}</p>
          <p
            class="mt-1 text-3xl font-semibold"
            :class="passesAaNormal ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'"
          >
            {{ ratio }}:1
          </p>
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <div
            v-for="item in contrastStates"
            :key="item.label"
            class="flex items-center justify-between rounded-md border border-secondary-200 px-3 py-2 dark:border-dark-border"
          >
            <span class="text-xs text-secondary-600 dark:text-secondary-400">{{ item.label }}</span>
            <span
              class="text-xs font-medium"
              :class="item.passes ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'"
            >
              {{ item.passes ? t('ui.pass') : t('ui.fail') }}
            </span>
          </div>
        </div>
      </div>

      <p class="text-sm leading-6 text-secondary-600 dark:text-secondary-400">
        {{ guidance }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ isFeatured?: boolean }>(), {
  isFeatured: false,
});

void props;

const fg = ref("#334155");
const bg = ref("#f8fafc");

const isHexColor = (value: string) => /^#[0-9A-Fa-f]{6}$/.test(value);

const safeFg = computed(() => (isHexColor(fg.value) ? fg.value : "#334155"));
const safeBg = computed(() => (isHexColor(bg.value) ? bg.value : "#f8fafc"));

const previewBorder = computed(() => `${safeFg.value}33`);

const getLuminance = (hex: string) => {
  const match = hex.match(/[A-Fa-f0-9]{2}/g);
  if (!match || match.length < 3) return 0;

  const rgb: [number, number, number] = [
    parseInt(match[0], 16) / 255,
    parseInt(match[1], 16) / 255,
    parseInt(match[2], 16) / 255,
  ];

  const weights = rgb.map((value) =>
    value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
  );

  return 0.2126 * weights[0] + 0.7152 * weights[1] + 0.0722 * weights[2];
};

const ratioNumber = computed(() => {
  const l1 = getLuminance(safeFg.value);
  const l2 = getLuminance(safeBg.value);

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
});

const ratio = computed(() => ratioNumber.value.toFixed(2));

const passesAaNormal = computed(() => ratioNumber.value >= 4.5);
const passesAaLarge = computed(() => ratioNumber.value >= 3);
const passesAaaNormal = computed(() => ratioNumber.value >= 7);
const passesAaaLarge = computed(() => ratioNumber.value >= 4.5);

const contrastStates = computed(() => [
  { label: t('ui.normal_text_aa'), passes: passesAaNormal.value },
  { label: t('ui.large_text_aa'), passes: passesAaLarge.value },
  { label: t('ui.normal_text_aaa'), passes: passesAaaNormal.value },
  { label: t('ui.large_text_aaa'), passes: passesAaaLarge.value },
]);

const guidance = computed(() => {
  if (passesAaaNormal.value) {
    return t('ui.strong_contrast_for_normal_and_large_text');
  }

  if (passesAaNormal.value) {
    return t('ui.good_for_normal_aa_text_and_large_aaa_text');
  }

  if (passesAaLarge.value) {
    return t('ui.usable_for_large_aa_text_only_normal_interface_text');
  }

  return t('ui.increase_contrast_before_using_this_pairing_for_readable_interface');
});

const swapColors = () => {
  const nextFg = bg.value;
  bg.value = fg.value;
  fg.value = nextFg;
};
</script>
