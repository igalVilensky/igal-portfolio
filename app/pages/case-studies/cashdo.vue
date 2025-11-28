<template>
    <div class="min-h-screen bg-neutral-50 dark:bg-secondary-600">
        <!-- Hero Section -->
        <section class="relative pt-32 pb-20 px-4 overflow-hidden">
            <!-- Background gradient -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[120px]">
                </div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-4xl mx-auto">
                    <!-- Back button -->
                    <NuxtLink to="/case-studies"
                        class="inline-flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 mb-8 transition-colors">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back to Projects</span>
                    </NuxtLink>

                    <!-- Project header -->
                    <div class="mb-12">
                        <div
                            class="inline-block px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-800/50 text-secondary-600 dark:text-secondary-300 text-sm font-medium mb-4">
                            Software Development • 2022-2023
                        </div>
                        <h1
                            class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary-900 dark:text-white mb-6">
                            LeanERA: Digital Transition
                        </h1>
                        <p class="text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed">
                            Building scalable, maintainable architecture to support a startup's company-wide digital
                            transition with modern technologies
                        </p>
                    </div>

                    <!-- Key metrics -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-primary-500 mb-2">Vue 3</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Modern Framework</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-accent-500 mb-2">Nuxt 3</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">SSR Platform</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-secondary-500 mb-2">TS</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Type Safety</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-primary-500 mb-2">2022</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Project Year</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Content sections -->
        <section class="pb-20 px-4">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto space-y-12">

                    <!-- Challenge -->
                    <div class="bg-white dark:bg-secondary-900 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                The Challenge
                            </h2>
                        </div>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed mb-4">
                            LeanERA was transitioning from a service-based startup to a product-focused company,
                            requiring a complete digital transformation. The company needed modern, scalable web
                            applications built with cutting-edge technologies that could grow with the business.
                        </p>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed">
                            The challenge was to establish a solid technical foundation using modern frameworks while
                            collaborating with cross-functional teams to evaluate and adopt the right technologies for
                            long-term success.
                        </p>
                    </div>

                    <!-- Approach -->
                    <div class="bg-white dark:bg-secondary-900 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-accent-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                My Approach
                            </h2>
                        </div>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6">
                            I focused on building responsive web applications using Vue 3, Nuxt 3, TypeScript, and
                            Tailwind CSS—a modern stack that prioritizes developer experience, type safety, and
                            maintainability. The goal was to create a scalable architecture that would serve as the
                            foundation for the company's digital products.
                        </p>

                        <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3">Technical Strategy:
                        </h3>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Modern tech stack evaluation
                                    and adoption (Vue 3, Nuxt 3, TypeScript)</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Scalable architecture patterns
                                    for long-term maintainability</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Cross-functional collaboration
                                    for technology decisions</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Responsive design with Tailwind
                                    CSS for rapid development</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Tech Stack -->
                    <div class="bg-white dark:bg-secondary-900 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-secondary-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                Tech Stack
                            </h2>
                        </div>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3
                                    class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                                    <i class="fas fa-laptop-code text-primary-500"></i>
                                    Frontend
                                </h3>
                                <ul class="space-y-2">
                                    <li class="text-secondary-600 dark:text-secondary-300">Vue 3 (Composition API)</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Nuxt 3 (SSR/SSG)</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">TypeScript</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Tailwind CSS</li>
                                </ul>
                            </div>
                            <div>
                                <h3
                                    class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                                    <i class="fas fa-tools text-accent-500"></i>
                                    Practices
                                </h3>
                                <ul class="space-y-2">
                                    <li class="text-secondary-600 dark:text-secondary-300">Component-based architecture
                                    </li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Type-safe development</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Responsive design</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Cross-team collaboration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Results -->
                    <div
                        class="bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-800 dark:to-secondary-900 rounded-lg p-8 shadow-sm border border-secondary-100 dark:border-secondary-800">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-secondary-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                The Results
                            </h2>
                        </div>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6">
                            Successfully established a modern, scalable technical foundation that supported LeanERA's
                            transition to a product-focused company. The architecture and technology choices positioned
                            the company for sustainable growth.
                        </p>

                        <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3">Key Achievements:</h3>
                        <ul class="space-y-2">
                            <li class="flex items-start gap-3">
                                <span class="text-secondary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300"><strong>Modern tech stack
                                        adoption</strong> with Vue 3, Nuxt 3, and TypeScript</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-secondary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Scalable architecture for
                                    company-wide digital transition</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-secondary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Responsive web applications
                                    with excellent developer experience</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-secondary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Cross-functional collaboration
                                    on technology decisions</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Lessons Learned -->
                    <div class="bg-white dark:bg-secondary-900 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                Lessons Learned
                            </h2>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">TypeScript pays
                                        dividends:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Type safety catches bugs
                                        early and improves developer confidence</span>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">Modern frameworks enable rapid
                                        development:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Vue 3 and Nuxt 3 provide
                                        excellent DX and performance</span>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">Architecture matters for
                                        startups:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Scalable patterns from the
                                        start prevent costly rewrites later</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
});

useHead({
    title: "LeanERA: Digital Transition - Igal Vilensky",
    meta: [
        {
            name: "description",
            content: "Building scalable web applications with Vue 3, Nuxt 3, and TypeScript to support LeanERA's digital transition from service to product company.",
        },
    ],
});
</script>
