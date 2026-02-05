<template>
    <div :class="[
        'glass bg-white/80 dark:bg-dark-surface/50 rounded-3xl border border-secondary-200 dark:border-white/10 transition-all duration-500 relative group',
        isFeatured ? 'p-8 shadow-2xl' : 'p-6 shadow-lg'
    ]">
        <!-- Decorative Elements -->
        <div
            class="absolute -top-24 -right-24 w-48 h-48 bg-primary-500/10 blur-3xl rounded-full group-hover:bg-primary-500/20 transition-colors duration-700">
        </div>

        <div class="relative z-10">
            <div class="flex items-center gap-4 mb-8">
                <div
                    :class="['bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg ring-4 ring-primary-500/20', isFeatured ? 'w-12 h-12 text-xl' : 'w-8 h-8 text-sm']">
                    <i class="fas fa-microchip animate-pulse"></i>
                </div>
                <div>
                    <h3
                        :class="['font-display font-bold text-secondary-900 dark:text-white', isFeatured ? 'text-2xl' : 'text-sm']">
                        Architect Simulator
                    </h3>
                    <p :class="['text-secondary-500 dark:text-secondary-400', isFeatured ? 'text-sm' : 'text-[10px]']">
                        Technical Strategy & System Design
                        v1.0</p>
                </div>
            </div>

            <div class="space-y-8">
                <!-- Input Form -->
                <div v-if="!result" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400">Project
                                Domain</label>
                            <input v-model="project.domain" type="text" placeholder="e.g. Fintech, SaaS, Health" :class="[
                                'w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl px-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white',
                                isFeatured ? 'py-3 text-base' : 'py-2 text-[10px]'
                            ]" />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400">Key
                                Constraint</label>
                            <div class="relative">
                                <select v-model="project.constraint" :class="[
                                    'w-full bg-secondary-50 dark:bg-secondary-800 border border-secondary-200 dark:border-white/10 rounded-xl px-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white appearance-none cursor-pointer',
                                    isFeatured ? 'py-3 text-base' : 'py-2 text-[10px]'
                                ]">
                                    <option value="scalability">High Scalability (10M+ Users)</option>
                                    <option value="security">Maximum Data Security (Fintech Grade)</option>
                                    <option value="speed">Fastest TTM (Lean MVP Architecture)</option>
                                    <option value="complexity">Complex Multi-Tenant Logic</option>
                                    <option value="performance">Sub-100ms Performance</option>
                                </select>
                                <div
                                    class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-400">
                                    <i class="fas fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label
                            class="text-xs font-bold uppercase tracking-widest text-secondary-500 dark:text-secondary-400">Core
                            Requirement</label>
                        <textarea v-model="project.requirement" :rows="isFeatured ? 3 : 2"
                            placeholder="e.g. Real-time collaborative document editing with version history and offline support..."
                            :class="[
                                'w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white resize-none',
                                isFeatured ? 'text-base' : 'text-[10px]'
                            ]"></textarea>
                        <p class="text-[10px] text-secondary-400 mt-1 italic">Be specific about features, scale, or
                            technical hurdles.</p>
                    </div>

                    <button @click="simulate" :disabled="isLoading || !project.domain || !project.requirement" :class="[
                        'w-full bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed group',
                        isFeatured ? 'py-4 text-base' : 'py-2 text-[10px]'
                    ]">
                        <i class="fas fa-cogs" :class="{ 'fa-spin': isLoading }"></i>
                        <span>{{ isLoading ? 'Processing Architecture...' : 'Run Simulation' }}</span>
                    </button>
                </div>

                <!-- Result View -->
                <div v-else class="space-y-6 animate-fade-in">
                    <!-- Input Summary (The "Context") -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        <div
                            class="px-3 py-1 bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-full text-[10px] font-medium text-secondary-600 dark:text-secondary-400">
                            <span class="opacity-50 uppercase tracking-tighter mr-1">Domain:</span> {{ project.domain }}
                        </div>
                        <div
                            class="px-3 py-1 bg-secondary-100 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-full text-[10px] font-medium text-secondary-600 dark:text-secondary-400">
                            <span class="opacity-50 uppercase tracking-tighter mr-1">Constraint:</span> {{
                                project.constraint }}
                        </div>
                        <div v-if="project.requirement"
                            class="w-full px-3 py-2 bg-secondary-100/50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl text-[10px] font-medium text-secondary-600 dark:text-secondary-400 mt-2">
                            <span class="opacity-50 uppercase tracking-tighter block mb-1">Requirement:</span>
                            <span class="italic">"{{ project.requirement }}"</span>
                        </div>
                    </div>

                    <div class="relative group/result">
                        <div
                            class="absolute -inset-1 bg-gradient-to-r from-primary-500/20 to-primary-600/20 rounded-3xl blur opacity-0 group-hover/result:opacity-100 transition duration-500">
                        </div>
                        <div
                            class="relative p-8 bg-white dark:bg-dark-surface border border-secondary-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden">
                            <!-- Background Accent -->
                            <div
                                class="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 -mr-16 -mt-16 rounded-full blur-2xl">
                            </div>

                            <div class="flex justify-between items-center mb-6">
                                <h4
                                    class="text-xs font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                                    Architectural Blueprint
                                </h4>
                                <button @click="result = null"
                                    class="w-8 h-8 flex items-center justify-center rounded-xl bg-secondary-50 dark:bg-white/5 text-secondary-400 hover:text-primary-500 hover:bg-primary-500/10 transition-all">
                                    <i class="fas fa-redo-alt text-sm"></i>
                                </button>
                            </div>

                            <div class="prose prose-stone dark:prose-invert max-w-none">
                                <div class="space-y-8">
                                    <component :is="'div'" v-for="(section, index) in resultSections" :key="index"
                                        class="relative pl-6 border-l border-primary-500/20">
                                        <h5
                                            class="text-xs font-bold text-secondary-900 dark:text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <span class="absolute left-0 w-3 h-[1px] bg-primary-500 -ml-3"></span>
                                            {{ section.title }}
                                        </h5>
                                        <div
                                            class="text-sm text-secondary-600 dark:text-secondary-400 leading-relaxed whitespace-pre-wrap font-sans">
                                            {{ section.content }}
                                        </div>
                                    </component>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-6 pt-2">
                        <div class="flex items-center gap-2 text-[10px] font-mono text-secondary-500">
                            <i class="fas fa-shield-halved text-green-500"></i>
                            <span class="uppercase tracking-widest">Enterprise Grade Architecture</span>
                        </div>
                        <div class="flex items-center gap-2 text-[10px] font-mono text-secondary-500">
                            <i class="fas fa-bolt text-amber-500"></i>
                            <span class="uppercase tracking-widest">Optimized for Performance</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

const props = withDefaults(defineProps<{
    isFeatured?: boolean
}>(), {
    isFeatured: true
});

const project = reactive({
    domain: '',
    constraint: 'scalability',
    requirement: ''
});

const isLoading = ref(false);
const result = ref<string | null>(null);

const resultSections = computed(() => {
    if (!result.value) return [];

    const sections: { title: string, content: string }[] = [];
    const lines = result.value.split('\n');
    let currentTitle = '';
    let currentContent: string[] = [];

    lines.forEach(line => {
        const titleMatch = line.match(/^\d+\.\s+(.+)$/);
        if (titleMatch && titleMatch[1]) {
            if (currentTitle) {
                sections.push({ title: currentTitle, content: currentContent.join('\n').trim() });
            }
            currentTitle = titleMatch[1];
            currentContent = [];
        } else {
            currentContent.push(line);
        }
    });

    if (currentTitle) {
        sections.push({ title: currentTitle, content: currentContent.join('\n').trim() });
    }

    return sections;
});

const simulate = async () => {
    if (isLoading.value) return;
    isLoading.value = true;

    try {
        const rawPrompt = `Generate a professional technical architecture recommendation for a project in the ${project.domain} domain. 
    The primary constraint is ${project.constraint}. 
    Core requirement: ${project.requirement}.
    
    Recommend the most appropriate and industry-standard tech stack for this specific use case. While Nuxt 4 and Node.js are preferred for web-centric layers, feel free to suggest more specialized languages or architectures (e.g. Go, Rust, Python, Spring, Microservices, etc.) if they are better suited for the domain's security, performance, or compliance needs.
    
    Format the response as:
    1. PROPOSED TECH STACK (list items)
    2. KEY ARCHITECTURAL DECISION (explanation)
    3. DATA MODEL STRATEGY (brief overview)
    4. SECURITY CONSIDERATIONS (brief overview)`;

        const response = await $fetch<{ reply: string }>('/.netlify/functions/groqChat', {
            method: 'POST',
            body: {
                prompt: rawPrompt,
                maxLines: 20,
                systemPrompt: "You are a Senior Technical Architect Simulator. Provide deep technical insights and architectural decisions. Be concise, professional, and engineer-focused."
            }
        });

        if (response && response.reply) {
            result.value = response.reply;
        } else if (response && (response as any).error) {
            result.value = `API_ERROR: ${(response as any).error}`;
        } else {
            result.value = "Simulation failed. Error in data retrieval.";
        }
    } catch (error: any) {
        console.error("Simulation Error:", error);
        const errorMsg = error.data?.statusMessage || error.message || "Unknown error";
        result.value = `CONNECTION_ERROR: ${errorMsg}`;
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
