<template>
    <div :class="[
        'glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/5 transition-all duration-500 relative',
        isFeatured ? 'p-8' : 'p-6'
    ]">
        <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <i class="fas fa-code text-xs"></i>
            </div>
            <h3 :class="[
                'font-bold text-secondary-900 dark:text-white uppercase tracking-wider',
                isFeatured ? 'text-xl md:text-2xl' : 'text-sm'
            ]">
                JSON to TS
            </h3>
        </div>

        <div class="space-y-4">
            <textarea v-model="inputJson" placeholder='{"name": "Igal", "role": "Engineer"}' :class="[
                'w-full bg-secondary-50 dark:bg-black/20 border border-secondary-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-secondary-900 dark:text-white font-mono resize-none',
                isFeatured ? 'text-base h-48' : 'text-[10px] h-24'
            ]"></textarea>

            <div v-if="tsInterface" class="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 animate-fade-in">
                <div class="flex justify-between items-center mb-2">
                    <span :class="[
                        'font-mono text-blue-500 uppercase font-bold',
                        isFeatured ? 'text-xs' : 'text-[8px]'
                    ]">
                        Generated Interface
                    </span>

                    <button @click="copyToClipboard" class="flex items-center gap-1.5 transition-colors"
                        :class="copied ? 'text-green-500' : 'text-secondary-400 hover:text-blue-500'">
                        <i :class="copied ? 'fas fa-check' : 'fas fa-copy'" class="text-[10px]"></i>
                        <span v-if="copied" class="text-[8px] font-bold uppercase tracking-tighter">
                            Copied!
                        </span>
                    </button>
                </div>

                <pre :class="[
                    'text-secondary-600 dark:text-secondary-300 font-mono overflow-x-auto whitespace-pre-wrap',
                    isFeatured ? 'text-sm' : 'text-[9px]'
                ]">
{{ tsInterface }}
        </pre>
            </div>

            <div v-if="error" class="text-[9px] text-red-500 font-mono mt-2">
                <i class="fas fa-circle-exclamation mr-1"></i> {{ error }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(
    defineProps<{ isFeatured?: boolean }>(),
    { isFeatured: false }
);

const inputJson = ref('');
const error = ref('');
const copied = ref(false);

const tsInterface = computed(() => {
    if (!inputJson.value.trim()) return '';
    error.value = '';

    try {
        const obj = JSON.parse(inputJson.value);
        return generateInterface(obj, 'RootObject');
    } catch {
        error.value = 'Invalid JSON input';
        return '';
    }
});

function inferType(val: any, key = '', indent = 2): string {
    const spaces = ' '.repeat(indent);
    const innerSpaces = ' '.repeat(indent + 2);
    const lowerKey = key.toLowerCase();

    // ---- null handling (nullable inference)
    if (val === null) {
        if (
            lowerKey.includes('name') ||
            lowerKey.includes('bio') ||
            lowerKey.includes('url') ||
            lowerKey.includes('email') ||
            lowerKey.includes('text')
        ) {
            return 'string | null';
        }

        if (
            lowerKey.includes('date') ||
            lowerKey.includes('time') ||
            lowerKey.includes('login')
        ) {
            return 'string | null';
        }

        return 'unknown | null';
    }

    // ---- arrays
    if (Array.isArray(val)) {
        if (val.length === 0) return 'never[]';

        const rawTypes = val.map(v => inferType(v, key, indent + 2));
        const merged = mergeStructuralTypes(rawTypes);
        const type =
            merged.length > 1 ? `(${merged.join(' | ')})` : merged[0];

        return `${type}[]`;
    }

    // ---- objects
    if (typeof val === 'object') {
        const entries = Object.entries(val);
        if (entries.length === 0) return 'Record<string, unknown>';

        let struct = '{\n';
        for (const [k, v] of entries) {
            struct += `${innerSpaces}${k}: ${inferType(v, k, indent + 2)};\n`;
        }
        struct += `${spaces}}`;
        return struct;
    }

    // ---- string inference (ENUM-SAFE)
    if (typeof val === 'string') {
        const enumLikeKeys = [
            'role',
            'theme',
            'status',
            'type',
            'kind',
            'action',
            'actions',
            'tag',
            'tags'
        ];

        if (enumLikeKeys.some(k => lowerKey.includes(k))) {
            return `"${val}"`;
        }

        return 'string';
    }

    return typeof val;
}

function mergeStructuralTypes(types: string[]): string[] {
    const unique = Array.from(new Set(types)).filter(Boolean);
    if (unique.length <= 1) return unique;

    // unknown | null normalization
    if (unique.includes('unknown | null')) {
        return ['unknown | null'];
    }

    // structural object merging
    const objects = unique.filter(t => t.startsWith('{'));
    const nonObjects = unique.filter(t => !t.startsWith('{'));

    if (objects.length > 1) {
        const longest = objects.sort((a, b) => b.length - a.length)[0];
        return [...nonObjects, longest];
    }

    return unique;
}

function generateInterface(obj: any, name: string): string {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
        return `interface ${name} {}`;
    }

    let result = `interface ${name} {\n`;
    for (const [key, value] of Object.entries(obj)) {
        result += `  ${key}: ${inferType(value, key, 2)};\n`;
    }
    result += '}';
    return result;
}

function copyToClipboard() {
    navigator.clipboard.writeText(tsInterface.value);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
}
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
