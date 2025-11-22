<!-- app/components/MyStory.vue -->
<template>
  <section class="section-y bg-neutral-50 dark:bg-secondary-600 pt-16 px-4">
    <div class="container-custom">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="">
          <div class="inline-block mb-4 story-header-anim">
            <span
              class="text-accent-500 font-semibold text-sm uppercase tracking-wider"
            >
              Background
            </span>
          </div>
          <h2
            class="story-header-anim text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight"
          >
            My Journey
          </h2>
          <p
            class="story-header-anim text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl pb-8"
          >
            An unconventional path through technology, creativity, and
            entrepreneurship
          </p>
        </div>

        <!-- Timeline -->
        <div class="relative pl-8 md:pl-0 timeline-container">
          <!-- Vertical line -->
          <div
            class="timeline-line absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-neutral-300 dark:bg-neutral-600 md:transform md:-translate-x-1/2"
          ></div>

          <!-- Timeline Items -->
          <div class="space-y-16 md:space-y-20">
            <!-- Current Focus -->
            <div class="relative md:grid md:grid-cols-2 md:gap-12 timeline-item">
              <div class="hidden md:block text-right pr-12">
                <span
                  class="inline-block px-4 py-1.5 bg-primary-500 text-white rounded-full text-sm font-semibold shadow-sm"
                >
                  Present
                </span>
              </div>
              <div class="relative">
                <div
                  class="absolute -left-10 md:-left-8 top-2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-secondary-900 shadow-md"
                ></div>
                <div class="md:hidden mb-4">
                  <span
                    class="inline-block px-4 py-1.5 bg-primary-500 text-white rounded-full text-sm font-semibold shadow-sm"
                  >
                    Present
                  </span>
                </div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white mb-4"
                >
                  Creative Technologist
                </h3>
                <p
                  class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
                >
                  Blending technical expertise with creative problem-solving to
                  build digital solutions that bridge business objectives and
                  user needs across multiple industries.
                </p>
              </div>
            </div>

            <!-- Tech Career -->
            <div class="relative md:grid md:grid-cols-2 md:gap-12 timeline-item">
              <div class="hidden md:block text-right pr-12">
                <span
                  class="text-lg md:text-xl font-semibold text-secondary-900 dark:text-white"
                >
                  2020 – Present
                </span>
              </div>
              <div class="relative">
                <div
                  class="absolute -left-10 md:-left-8 top-2 w-4 h-4 bg-accent-500 rounded-full border-4 border-white dark:border-secondary-900 shadow-md"
                ></div>
                <div class="md:hidden mb-4">
                  <span
                    class="text-lg font-semibold text-secondary-900 dark:text-white"
                  >
                    2020 – Present
                  </span>
                </div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white mb-4"
                >
                  Software Development
                </h3>
                <p
                  class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5"
                >
                  Full-stack development roles at Flowplace, LeanERA, and ARI
                  Motors, building scalable web applications with modern
                  JavaScript frameworks and cloud architecture.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium border border-primary-200 dark:border-primary-800"
                  >
                    Vue.js / Nuxt
                  </span>
                  <span
                    class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium border border-primary-200 dark:border-primary-800"
                  >
                    React / TypeScript
                  </span>
                  <span
                    class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-primary-700 dark:text-primary-300 rounded-md text-sm font-medium border border-primary-200 dark:border-primary-800"
                  >
                    Node.js
                  </span>
                </div>
              </div>
            </div>

            <!-- Startup & Creative -->
            <div class="relative md:grid md:grid-cols-2 md:gap-12 timeline-item">
              <div class="hidden md:block text-right pr-12">
                <span
                  class="text-lg md:text-xl font-semibold text-secondary-900 dark:text-white"
                >
                  2017 – 2019
                </span>
              </div>
              <div class="relative">
                <div
                  class="absolute -left-10 md:-left-8 top-2 w-4 h-4 bg-secondary-500 rounded-full border-4 border-white dark:border-secondary-900 shadow-md"
                ></div>
                <div class="md:hidden mb-4">
                  <span
                    class="text-lg font-semibold text-secondary-900 dark:text-white"
                  >
                    2017 – 2019
                  </span>
                </div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white mb-4"
                >
                  Startup World & Creative Roles
                </h3>
                <p
                  class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5"
                >
                  At Myfxbook and Cashdo, managed web presence, social media,
                  and content creation. Simultaneously pursued acting career in
                  TV, film, and opera—developing storytelling and communication
                  skills.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-accent-700 dark:text-accent-300 rounded-md text-sm font-medium border border-accent-200 dark:border-accent-800"
                  >
                    Content Creation
                  </span>
                  <span
                    class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-accent-700 dark:text-accent-300 rounded-md text-sm font-medium border border-accent-200 dark:border-accent-800"
                  >
                    Social Media
                  </span>
                  <span
                    class="px-3 py-1.5 bg-white dark:bg-secondary-900 text-accent-700 dark:text-accent-300 rounded-md text-sm font-medium border border-accent-200 dark:border-accent-800"
                  >
                    Storytelling
                  </span>
                </div>
              </div>
            </div>

            <!-- Early Adventures -->
            <div class="relative md:grid md:grid-cols-2 md:gap-12 timeline-item">
              <div class="hidden md:block text-right pr-12">
                <span
                  class="text-lg md:text-xl font-semibold text-secondary-900 dark:text-white"
                >
                  Earlier
                </span>
              </div>
              <div class="relative">
                <div
                  class="absolute -left-10 md:-left-8 top-2 w-4 h-4 bg-neutral-400 dark:bg-neutral-500 rounded-full border-4 border-white dark:border-secondary-900 shadow-md"
                ></div>
                <div class="md:hidden mb-4">
                  <span
                    class="text-lg font-semibold text-secondary-900 dark:text-white"
                  >
                    Earlier
                  </span>
                </div>
                <h3
                  class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white mb-4"
                >
                  Diverse Experiences
                </h3>
                <p
                  class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed"
                >
                  From telecommunications technician to surviving -60°C winters
                  in Russia's far north, these experiences built resilience,
                  adaptability, and problem-solving skills.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Insight -->
        <div class="py-16">
          <div class="insight-anim border-l-4 border-primary-500 pl-6 md:pl-8 py-3">
            <p
              class="text-xl md:text-2xl text-primary-800 dark:text-primary-200 font-light leading-relaxed italic"
            >
              "My diverse background gives me a unique perspective on
              problem-solving—I see connections between technology, human
              behavior, and business needs that others might miss."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Header Animations
  gsap.from('.story-header-anim', {
    scrollTrigger: {
      trigger: '.story-header-anim',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Timeline Line Animation
  gsap.from('.timeline-line', {
    scrollTrigger: {
      trigger: '.timeline-container',
      start: 'top 70%',
      end: 'bottom 70%',
      scrub: 1
    },
    scaleY: 0,
    transformOrigin: 'top center',
    ease: 'none'
  });

  // Timeline Items Animation
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Key Insight Animation
  gsap.from('.insight-anim', {
    scrollTrigger: {
      trigger: '.insight-anim',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    x: -30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
});
</script>
