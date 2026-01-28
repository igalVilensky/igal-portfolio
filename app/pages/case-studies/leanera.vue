<template>
    <div class="min-h-screen bg-neutral-50 dark:bg-secondary-600">
        <!-- Hero Section -->
        <section class="relative pt-32 pb-20 px-4 overflow-hidden">
            <!-- Background gradient -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-0 left-0 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div class="container mx-auto px-6 relative z-10 max-w-7xl">
                <div class="max-w-7xl mx-auto">
                    <!-- Back button -->
                    <NuxtLink to="/case-studies"
                        class="inline-flex items-center gap-2 text-sm text-secondary-600 dark:text-secondary-400 hover:text-primary-500 dark:hover:text-primary-400 mb-8 transition-colors">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back to Projects</span>
                    </NuxtLink>

                    <!-- Project header -->
                    <div class="mb-12">
                        <div
                            class="inline-block px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-medium mb-4">
                            Full-Stack Development • 2021-2022
                        </div>
                        <h1
                            class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary-900 dark:text-white mb-6">
                            ARI Motors: EV Comparison Portal
                        </h1>
                        <p class="text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed">
                            Designed, developed, and launched a comparison portal for electric commercial vehicles from
                            scratch to production in <span class="text-accent-500 font-bold">under 3 months</span>
                        </p>
                    </div>

                    <!-- Key metrics -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-accent-500 mb-2">&lt;3</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Months to Launch</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-primary-500 mb-2">Solo</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Developer</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-secondary-500 mb-2">Full</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Stack</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-accent-500 mb-2">2021</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Launch Year</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Content sections -->
        <section class="pb-20 px-4">
            <div class="container mx-auto px-6 max-w-7xl">
                <div class="max-w-7xl mx-auto space-y-12">

                    <!-- Challenge -->
                    <div class="bg-white dark:bg-secondary-900 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                The Challenge
                            </h2>
                        </div>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed mb-4">
                            ARI Motors needed a comprehensive comparison portal to help customers evaluate electric
                            commercial vehicles. The platform had to present complex technical specifications in an
                            accessible, user-friendly format while handling vehicle data management on the backend.
                        </p>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed">
                            As the sole developer, I was responsible for the entire stack: frontend interface, backend
                            systems, database architecture, and deployment—all within a tight 3-month deadline.
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
                            I took a pragmatic, iterative approach focusing on core functionality first, then
                            progressively enhancing the user experience. The key was balancing speed with
                            maintainability—building something that could launch quickly but wouldn't become a
                            maintenance nightmare.
                        </p>

                        <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3">Development Strategy:
                        </h3>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Responsive-first design for
                                    mobile and desktop users</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Structured database schema for
                                    vehicle specifications and comparisons</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Clean, maintainable codebase
                                    for long-term sustainability</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Performance optimization for
                                    fast page loads</span>
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
                                    <li class="text-secondary-600 dark:text-secondary-300">Modern JavaScript</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Responsive CSS</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">User-friendly interfaces</li>
                                </ul>
                            </div>
                            <div>
                                <h3
                                    class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                                    <i class="fas fa-server text-accent-500"></i>
                                    Backend & Database
                                </h3>
                                <ul class="space-y-2">
                                    <li class="text-secondary-600 dark:text-secondary-300">Backend API</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Database management</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Content administration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Results -->
                    <div
                        class="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-secondary-800 dark:to-secondary-900 rounded-lg p-8 shadow-sm border border-accent-100 dark:border-accent-900">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-accent-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                The Results
                            </h2>
                        </div>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6">
                            The comparison portal launched successfully within the 3-month deadline and has been serving
                            customers reliably since. The platform makes it easy for potential buyers to compare
                            electric commercial vehicles and make informed decisions.
                        </p>

                        <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3">Key Achievements:</h3>
                        <ul class="space-y-2">
                            <li class="flex items-start gap-3">
                                <span class="text-accent-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300"><strong>On-time
                                        delivery</strong> from concept to production in under 3 months</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-accent-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Full-stack ownership: website,
                                    backend, and database</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-accent-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">High performance under
                                    production load</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-accent-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Maintainable codebase for
                                    long-term sustainability</span>
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
                                    <strong class="text-secondary-900 dark:text-white">Solo full-stack builds require
                                        discipline:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Clear architecture
                                        decisions upfront prevent technical debt later</span>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">Responsive design is
                                        non-negotiable:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Users access comparison
                                        tools from all devices</span>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">Tight deadlines demand
                                        pragmatism:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Focus on core features
                                        first, enhance progressively</span>
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
    title: "ARI Motors: EV Comparison Portal - Igal Vilensky",
    meta: [
        {
            name: "description",
            content: "Solo full-stack development of an electric vehicle comparison portal from scratch to production in under 3 months for ARI Motors.",
        },
    ],
});
</script>
