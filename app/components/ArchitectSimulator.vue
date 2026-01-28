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
                            placeholder="Describe a complex feature or system requirement..." :class="[
                                'w-full bg-secondary-50 dark:bg-white/5 border border-secondary-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-secondary-900 dark:text-white resize-none',
                                isFeatured ? 'text-base' : 'text-[10px]'
                            ]"></textarea>
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
                    <div class="p-6 bg-primary-500/5 border border-primary-500/20 rounded-2xl">
                        <div class="flex justify-between items-start mb-4">
                            <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-500">System
                                Recommendation</span>
                            <button @click="result = null"
                                class="text-secondary-400 hover:text-primary-500 transition-colors">
                                <i class="fas fa-undo"></i>
                            </button>
                        </div>
                        <div
                            class="prose prose-sm dark:prose-invert max-w-none text-secondary-700 dark:text-secondary-300 leading-relaxed whitespace-pre-wrap">
                            {{ result }}
                        </div>
                    </div>

                    <div class="flex items-center gap-4 text-xs font-mono text-secondary-400">
                        <span class="flex items-center gap-1"><i class="fas fa-check-circle text-green-500"></i>
                            Tech-Stack Verified</span>
                        <span class="flex items-center gap-1"><i class="fas fa-check-circle text-green-500"></i>
                            Security Validated</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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

const simulate = async () => {
    if (isLoading.value) return;
    isLoading.value = true;

    try {
        const rawPrompt = `Generate a technical architecture recommendation for a project in the ${project.domain} domain. 
    The primary constraint is ${project.constraint}. 
    Core requirement: ${project.requirement}.
    
    The recommendation should use Igal Vilensky's tech stack: Nuxt 3, TypeScript, Node.js, Firebase/MongoDB, and Tailwind. 
    Format the response as:
    1. PROPOSED TECH STACK (list items)
    2. KEY ARCHITECTURAL DECISION (explanation)
    3. DATA MODEL STRATEGY (brief overview)
    4. SECURITY CONSIDERATIONS (brief overview)`;

        const response = await $fetch<{ reply: string }>('/api/groqChat', {
            method: 'POST',
            body: {
                prompt: rawPrompt,
                maxLines: 20,
                systemPrompt: "You are a Senior Technical Architect Simulator. Provide deep technical insights and architectural decisions. Be concise, professional, and engineer-focused."
            }
        });

        if (response && response.reply) {
            result.value = response.reply;
        } else {
            result.value = "Simulation failed. Error in data retrieval.";
        }
    } catch (error) {
        console.error("Simulation Error:", error);
        result.value = "CONNECTION_ERROR: Failed to reach the architect core. Check API configuration.";
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
