<!-- app/components/Hero.vue -->
<template>
  <section
    class="flex items-center justify-center bg-white dark:bg-secondary-900 px-4 pb-16 pt-24"
  >
    <div class="container-custom">
      <!-- Editorial-style header -->
      <div class="max-w-5xl">
        <div class="mb-12 md:mb-16">
          <div class="inline-block mb-6">
            <span
              class="text-accent-500 font-semibold text-sm uppercase tracking-wider"
            >
              Creative Technologist
            </span>
          </div>

          <h1
            class="text-5xl md:text-7xl lg:text-8xl font-display text-secondary-900 dark:text-white leading-[1.1] mb-8"
          >
            Igal<br />Vilensky
          </h1>

          <div class="border-l-4 border-primary-500 pl-6 md:pl-8 py-2">
            <p
              class="text-xl md:text-2xl lg:text-3xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed"
            >
              Solving complex problems at the intersection of
              <span class="text-primary-500 font-medium">technology</span>,
              <span class="text-accent-500 font-medium">creativity</span>, and
              <span
                class="text-secondary-600 dark:text-secondary-300 font-medium"
                >business</span
              >.
            </p>
          </div>
        </div>

        <!-- Capability highlights - editorial style -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16"
        >
          <div class="space-y-3">
            <div class="w-10 h-0.5 bg-primary-500"></div>
            <h3
              class="text-lg font-semibold text-secondary-900 dark:text-white"
            >
              Technical Depth
            </h3>
            <p
              class="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed"
            >
              Full-stack development, system architecture, and modern web
              technologies.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-0.5 bg-accent-500"></div>
            <h3
              class="text-lg font-semibold text-secondary-900 dark:text-white"
            >
              Creative Vision
            </h3>
            <p
              class="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed"
            >
              From concept to execution, blending design thinking with technical
              feasibility.
            </p>
          </div>

          <div class="space-y-3">
            <div class="w-10 h-0.5 bg-secondary-500"></div>
            <h3
              class="text-lg font-semibold text-secondary-900 dark:text-white"
            >
              Business Acumen
            </h3>
            <p
              class="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed"
            >
              Startup experience, customer insights, and product strategy.
            </p>
          </div>
        </div>

        <!-- Minimal CTA -->
        <div
          class="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
        >
          <NuxtLink
            to="/case-studies"
            class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg"
          >
            <span>Explore my work</span>
            <span class="group-hover:translate-x-1 transition-transform"
              >→</span
            >
          </NuxtLink>

          <span class="text-neutral-300 dark:text-neutral-300 hidden sm:inline"
            >•</span
          >

          <button
            @click="scrollToContact"
            class="inline-flex items-center gap-3 text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group text-lg"
          >
            <span>Start a conversation</span>
            <span class="group-hover:translate-x-1 transition-transform"
              >→</span
            >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToContact = () => {
  const contactSection = document.querySelector("#contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
