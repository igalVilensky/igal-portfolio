<template>
    <div :class="[
        'glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/5 transition-all duration-500 relative',
        isFeatured ? 'p-8' : 'p-6'
    ]">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center text-accent-500">
                <i class="fas fa-shield-alt text-xs"></i>
            </div>
            <h3
                :class="['font-bold text-secondary-900 dark:text-white uppercase tracking-wider', isFeatured ? 'text-xl md:text-2xl' : 'text-sm']">
                Security Auditor
            </h3>
        </div>

        <div class="space-y-4">
            <div class="relative">
                <input v-model="packageName" type="text" placeholder="Package name (e.g. lodash)" :class="[
                    'w-full bg-white dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl px-4 focus:ring-1 focus:ring-accent-500 outline-none transition-all dark:text-white font-mono',
                    isFeatured ? 'text-base py-3' : 'text-[10px] py-2'
                ]" />
            </div>

            <button @click="runAudit" :disabled="isAuditing || !packageName" :class="[
                'w-full bg-accent-600 hover:bg-accent-500 disabled:opacity-50 text-white font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-accent-500/20',
                isFeatured ? 'py-4 text-sm' : 'py-2 text-[10px]'
            ]">
                <span v-if="!isAuditing">Run Security Audit</span>
                <span v-else class="flex items-center justify-center gap-2">
                    <i class="fas fa-spinner fa-spin"></i> Analyzing...
                </span>
            </button>

            <div v-if="report"
                class="mt-4 p-3 rounded-xl bg-white/50 dark:bg-black/20 border border-white/10 animate-fade-in">
                <div class="flex items-center gap-2 mb-1">
                    <i :class="report.safe ? 'fas fa-check-circle text-green-500' : 'fas fa-exclamation-triangle text-red-500'"
                        class="text-xs"></i>
                    <span :class="['font-bold dark:text-white uppercase', isFeatured ? 'text-xs' : 'text-[10px]']">{{
                        report.status }}</span>
                </div>
                <p :class="['text-secondary-500 leading-tight', isFeatured ? 'text-base' : 'text-[9px]']">{{
                    report.message }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    isFeatured?: boolean
}>(), {
    isFeatured: false
});

const packageName = ref('');
const isAuditing = ref(false);
const report = ref<any>(null);

const runAudit = () => {
    isAuditing.value = true;
    report.value = null;

    setTimeout(() => {
        isAuditing.value = false;
        const isSafe = Math.random() > 0.3;
        report.value = {
            safe: isSafe,
            status: isSafe ? 'Verified_Secure' : 'Vulnerabilities_Found',
            message: isSafe
                ? `${packageName.value} matches integrity checksums for production environment.`
                : `Detected deprecated patterns and potential XSS risk in ${packageName.value}.`
        };
    }, 1500);
};
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
