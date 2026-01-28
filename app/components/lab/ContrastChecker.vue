<template>
    <div :class="[
        'glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/5 transition-all duration-500 relative',
        isFeatured ? 'p-8' : 'p-6'
    ]">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <i class="fas fa-eye text-xs"></i>
            </div>
            <h3
                :class="['font-bold text-secondary-900 dark:text-white uppercase tracking-wider', isFeatured ? 'text-xl md:text-2xl' : 'text-sm']">
                A11y Contrast
            </h3>
        </div>

        <div class="space-y-4">
            <div class="flex gap-2">
                <div class="flex-1 space-y-1">
                    <label :class="['font-mono text-secondary-400 uppercase', isFeatured ? 'text-xs' : 'text-[8px]']">FG
                        Color</label>
                    <div
                        class="flex items-center gap-2 bg-secondary-50 dark:bg-black/20 border border-secondary-200 dark:border-white/10 rounded-xl px-2 py-1.5">
                        <input v-model="fg" type="color" class="w-6 h-6 bg-transparent border-none cursor-pointer" />
                        <span
                            :class="['font-mono text-secondary-900 dark:text-white uppercase', isFeatured ? 'text-xs' : 'text-[9px]']">{{
                            fg }}</span>
                    </div>
                </div>
                <div class="flex-1 space-y-1">
                    <label :class="['font-mono text-secondary-400 uppercase', isFeatured ? 'text-xs' : 'text-[8px]']">BG
                        Color</label>
                    <div
                        class="flex items-center gap-2 bg-secondary-50 dark:bg-black/20 border border-secondary-200 dark:border-white/10 rounded-xl px-2 py-1.5">
                        <input v-model="bg" type="color" class="w-6 h-6 bg-transparent border-none cursor-pointer" />
                        <span
                            :class="['font-mono text-secondary-900 dark:text-white uppercase', isFeatured ? 'text-sm' : 'text-[9px]']">{{
                            bg }}</span>
                    </div>
                </div>
            </div>

            <div class="p-4 rounded-2xl transition-all duration-500 border shadow-inner"
                :style="{ backgroundColor: bg, color: fg, borderColor: fg + '20' }">
                <p :class="['font-bold mb-1', isFeatured ? 'text-lg' : 'text-[10px]']">Visual Preview</p>
                <p :class="['leading-tight', isFeatured ? 'text-sm' : 'text-[9px]']">Checking accessibility standards
                    for inclusive design.</p>
            </div>

            <div class="flex justify-between items-end">
                <div>
                    <span class="text-[8px] font-mono text-secondary-400 uppercase block mb-1">Ratio</span>
                    <span
                        :class="['font-display font-bold', isFeatured ? 'text-4xl' : 'text-xl', passAA ? 'text-emerald-500' : 'text-red-500']">{{
                        ratio }}:1</span>
                </div>
                <div class="flex gap-2">
                    <div :class="passAA ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'"
                        class="px-2 py-1 rounded text-[8px] font-bold font-mono">AA</div>
                    <div :class="passAAA ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'"
                        class="px-2 py-1 rounded text-[8px] font-bold font-mono">AAA</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(defineProps<{
    isFeatured?: boolean
}>(), {
    isFeatured: false
});

const fg = ref('#3b82f6');
const bg = ref('#0f172a');

const getLuminance = (hex: string) => {
    const match = hex.match(/[A-Za-z0-9]{2}/g);
    if (!match || match.length < 3) return 0;
    const rgb: [number, number, number] = [
        parseInt(match[0], 16) / 255,
        parseInt(match[1], 16) / 255,
        parseInt(match[2], 16) / 255
    ];
    const weights = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * weights[0] + 0.7152 * weights[1] + 0.0722 * weights[2];
};

const ratio = computed(() => {
    const l1 = getLuminance(fg.value);
    const l2 = getLuminance(bg.value);
    const r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    return r.toFixed(2);
});

const passAA = computed(() => parseFloat(ratio.value) >= 4.5);
const passAAA = computed(() => parseFloat(ratio.value) >= 7);
</script>
