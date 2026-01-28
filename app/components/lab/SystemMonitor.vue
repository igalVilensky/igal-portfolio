<template>
    <div :class="[
        'glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/5 transition-all duration-500 overflow-hidden relative',
        isFeatured ? 'p-8' : 'p-6'
    ]">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                    <i class="fas fa-microchip text-xs"></i>
                </div>
                <h3
                    :class="['font-bold text-secondary-900 dark:text-white uppercase tracking-wider', isFeatured ? 'text-xl md:text-2xl' : 'text-sm']">
                    System Monitor
                </h3>
            </div>
            <span
                :class="['font-mono p-1 rounded bg-green-500/10 text-green-500 uppercase tracking-tighter', isFeatured ? 'text-xs px-2 py-1' : 'text-[8px]']">Live_Feed</span>
        </div>

        <div class="space-y-4">
            <div v-for="(val, key) in metrics" :key="key" class="space-y-1">
                <div
                    :class="['flex justify-between font-mono text-secondary-500 uppercase', isFeatured ? 'text-sm' : 'text-[10px]']">
                    <span>{{ key }}</span>
                    <span class="text-primary-400">{{ val }}{{ key === 'latency' ? 'ms' : '%' }}</span>
                </div>
                <div class="h-1 bg-secondary-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div :class="['h-full bg-primary-500 transition-all duration-1000 ease-out', isFeatured ? 'rounded-full' : '']"
                        :style="{ width: key === 'latency' ? (val / 2) + '%' : val + '%' }"></div>
                </div>
            </div>
        </div>

        <button @click="calibrate" :class="[
            'w-full mt-6 bg-secondary-100 dark:bg-white/5 hover:bg-primary-500/20 text-secondary-600 dark:text-secondary-400 font-bold uppercase tracking-widest rounded-xl transition-all border border-secondary-200 dark:border-white/5',
            isFeatured ? 'py-4 text-sm' : 'py-2 text-[10px]'
        ]">
            Calibrate Sensors
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = withDefaults(defineProps<{
    isFeatured?: boolean
}>(), {
    isFeatured: false
});

const metrics = ref({
    cpu: 12,
    memory: 45,
    latency: 18
});

let interval: any;

const updateMetrics = () => {
    metrics.value.cpu = Math.floor(Math.random() * 30 + 10);
    metrics.value.memory = Math.floor(Math.random() * 10 + 40);
    metrics.value.latency = Math.floor(Math.random() * 50 + 10);
};

const calibrate = () => {
    metrics.value = { cpu: 2, memory: 30, latency: 5 };
    setTimeout(updateMetrics, 500);
};

onMounted(() => {
    interval = setInterval(updateMetrics, 3000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>
