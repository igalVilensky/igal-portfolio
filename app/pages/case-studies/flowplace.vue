<template>
    <div class="min-h-screen bg-neutral-50 dark:bg-secondary-600">
        <!-- Hero Section -->
        <section class="relative pt-32 pb-20 px-4 overflow-hidden">
            <!-- Background gradient -->
            <div class="absolute inset-0 overflow-hidden pointer-events-none">
                <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px]">
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
                            class="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                            SaaS Development • 2023-Present
                        </div>
                        <h1
                            class="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary-900 dark:text-white mb-6">
                            Flowplace: Role Compass
                        </h1>
                        <p class="text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed">
                            Leading end-to-end development of a talent profile feature that reached <span
                                class="text-accent-500 font-bold">5,000+ users in the first month</span>
                        </p>
                    </div>

                    <!-- Key metrics -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-primary-500 mb-2">5,000+</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Users in Month 1</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-accent-500 mb-2">2023</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Launch Year</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-secondary-500 mb-2">Full-Stack</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Development</div>
                        </div>
                        <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm">
                            <div class="text-3xl font-bold text-primary-500 mb-2">Agile</div>
                            <div class="text-sm text-secondary-600 dark:text-secondary-400">Methodology</div>
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
                            Flowplace needed a comprehensive talent profile feature to help users showcase their skills,
                            experience, and career aspirations. The feature had to integrate seamlessly with the
                            existing SaaS platform while maintaining high performance and user experience standards.
                        </p>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed">
                            The project required rapid development in a high-velocity Agile environment, with continuous
                            feature updates while maintaining clean, testable code and robust CI/CD pipelines.
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
                            I led the end-to-end development across the full stack, focusing on component-based
                            architecture and maintainable code patterns. The solution leveraged modern Vue.js/Nuxt.js
                            for the frontend with a robust backend API architecture.
                        </p>

                        <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3">Key Technical
                            Decisions:</h3>
                        <ul class="space-y-2 mb-6">
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Component-based architecture
                                    for reusability and maintainability</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Agile sprints with continuous
                                    integration and deployment</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Performance optimization for
                                    fast load times and smooth interactions</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></span>
                                <span class="text-secondary-600 dark:text-secondary-300">Comprehensive testing strategy
                                    for reliability</span>
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
                                    <li class="text-secondary-600 dark:text-secondary-300">Vue.js / Nuxt.js</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">TypeScript</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">Component-based architecture
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3
                                    class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                                    <i class="fas fa-server text-accent-500"></i>
                                    Backend & Tools
                                </h3>
                                <ul class="space-y-2">
                                    <li class="text-secondary-600 dark:text-secondary-300">Directus CMS</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">REST APIs</li>
                                    <li class="text-secondary-600 dark:text-secondary-300">CI/CD Pipelines</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Results -->
                    <div
                        class="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-800 dark:to-secondary-900 rounded-lg p-8 shadow-sm border border-primary-100 dark:border-primary-900">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                The Results
                            </h2>
                        </div>
                        <p class="text-base text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6">
                            The Role Compass feature launched successfully and achieved remarkable adoption, reaching
                            over 5,000 users within the first month. The feature has become a core part of Flowplace's
                            value proposition.
                        </p>

                        <h3 class="text-lg font-semibold text-secondary-900 dark:text-white mb-3">Key Achievements:</h3>
                        <ul class="space-y-2">
                            <li class="flex items-start gap-3">
                                <span class="text-primary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300"><strong>5,000+ users</strong>
                                    in the first month post-launch</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-primary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Continuous feature updates in
                                    high-velocity Agile environment</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-primary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Improved CI/CD pipelines for
                                    faster, more reliable releases</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="text-primary-500 mt-1">✓</span>
                                <span class="text-secondary-600 dark:text-secondary-300">Maintained clean, testable
                                    codebase throughout rapid development</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Lessons Learned -->
                    <div class="bg-white dark:bg-secondary-900 rounded-lg p-8 shadow-sm">
                        <div class="flex items-center gap-3 mb-6">
                            <div class="w-1 h-8 bg-accent-500 rounded-full"></div>
                            <h2 class="text-2xl md:text-3xl font-display font-bold text-secondary-900 dark:text-white">
                                Lessons Learned
                            </h2>
                        </div>
                        <ul class="space-y-4">
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">Component-based thinking
                                        scales:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Building reusable
                                        components from the start paid dividends as the feature grew</span>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">CI/CD is non-negotiable:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Investing in robust
                                        pipelines enabled rapid, confident deployments</span>
                                </div>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 flex-shrink-0"></span>
                                <div>
                                    <strong class="text-secondary-900 dark:text-white">Agile velocity requires
                                        discipline:</strong>
                                    <span class="text-secondary-600 dark:text-secondary-300"> Maintaining code quality
                                        while moving fast demands strong patterns and practices</span>
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
    title: "Flowplace: Role Compass - Igal Vilensky",
    meta: [
        {
            name: "description",
            content: "Leading end-to-end SaaS development for Flowplace's Role Compass feature, reaching 5,000+ users in the first month with Vue.js, Nuxt.js, and Directus.",
        },
    ],
});
</script>
