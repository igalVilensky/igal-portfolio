<template>
    <div :class="[
        'glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/5 transition-all duration-500 relative',
        isFeatured ? 'p-8' : 'p-6'
    ]">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i class="fas fa-code text-xs"></i>
            </div>
            <h3
                :class="['font-bold text-secondary-900 dark:text-white uppercase tracking-wider', isFeatured ? 'text-xl md:text-2xl' : 'text-sm']">
                JSON to TS
            </h3>
        </div>

        <div class="space-y-4">
            <div class="relative">
                <textarea v-model="inputJson" placeholder='{"name": "Igal", "role": "Engineer"}' :class="[
                    'w-full bg-secondary-50 dark:bg-black/20 border border-secondary-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-secondary-900 dark:text-white font-mono resize-none',
                    isFeatured ? 'text-base h-48' : 'text-[10px] h-24'
                ]"></textarea>
            </div>

            <div v-if="tsInterface" class="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 animate-fade-in">
                <div class="flex justify-between items-center mb-2">
                    <span
                        :class="['font-mono text-blue-500 uppercase font-bold', isFeatured ? 'text-xs' : 'text-[8px]']">Generated
                        Interface</span>
                    <button @click="copyToClipboard" class="flex items-center gap-1.5 transition-colors"
                        :class="copied ? 'text-green-500' : 'text-secondary-400 hover:text-blue-500'">
                        <i :class="copied ? 'fas fa-check' : 'fas fa-copy'" class="text-[10px]"></i>
                        <span v-if="copied" class="text-[8px] font-bold uppercase tracking-tighter">Copied!</span>
                    </button>
                </div>
                <pre
                    :class="['text-secondary-600 dark:text-secondary-300 font-mono overflow-x-auto whitespace-pre-wrap', isFeatured ? 'text-sm' : 'text-[9px]']">{{ tsInterface }}</pre>
            </div>

            <div v-if="error" class="text-[9px] text-red-500 font-mono mt-2">
                <i class="fas fa-circle-exclamation mr-1"></i> {{ error }}
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

const inputJson = ref('');
const error = ref('');
const copied = ref(false);

const tsInterface = computed(() => {
    if (!inputJson.value.trim()) return '';
    error.value = '';

    try {
        const obj = JSON.parse(inputJson.value);
        return generateInterface(obj, 'RootObject');
    } catch (e: any) {
        error.value = 'Invalid JSON input';
        return '';
    }
});

function inferType(val: any, key: string = '', indent: number = 2): string {
    const spaces = ' '.repeat(indent);
    const innerSpaces = ' '.repeat(indent + 2);

    if (val === null) {
        // Heuristic: if key name suggests a date or login, it's likely a string | null in practice
        const lowerKey = key.toLowerCase();
        if (lowerKey.includes('login') || lowerKey.includes('date') || lowerKey.includes('time')) {
            return 'string | null';
        }
        return 'null';
    }

    if (Array.isArray(val)) {
        if (val.length === 0) return 'never[]';
        const rawTypes = val.map(v => inferType(v, '', indent + 2));
        const mergedTypes = mergeStructuralTypes(rawTypes);
        const typeStr = mergedTypes.length > 1 ? `(${mergedTypes.join(' | ')})` : mergedTypes[0];
        return `${typeStr}[]`;
    }
    if (typeof val === 'object') {
        const entries = Object.entries(val as Record<string, any>);
        if (entries.length === 0) return '{}';

        let struct = '{\n';
        for (const [k, v] of entries) {
            struct += `${innerSpaces}${k}: ${inferType(v, k, indent + 2)};\n`;
        }
        struct += `${spaces}}`;
        return struct;
    }
    return typeof val;
}

function mergeStructuralTypes(types: string[]): string[] {
    const uniqueRaw = Array.from(new Set(types));
    const unique = uniqueRaw.filter((t): t is string => !!t);
    if (unique.length <= 1) return unique;

    // Handle T | null etc.
    if (unique.includes('null') && unique.length === 2) {
        const other = unique.find(t => t !== 'null');
        return [`${other} | null`];
    }

    // Structural merging for objects
    const objects = unique.filter(t => t.startsWith('{'));
    const nonObjects = unique.filter(t => !t.startsWith('{'));

    if (objects.length > 1) {
        const sorted = [...objects].sort((a, b) => b.length - a.length);
        return [...nonObjects, sorted[0]];
    }

    return unique;
}

function generateInterface(obj: any, name: string): string {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return `interface ${name} {}`;
    }

    let result = `interface ${name} {\n`;
    for (const [key, value] of Object.entries(obj as Record<string, any>)) {
        result += `  ${key}: ${inferType(value, key, 2)};\n`;
    }
    result += `}`;
    return result;
}

const copyToClipboard = () => {
    navigator.clipboard.writeText(tsInterface.value);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
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
