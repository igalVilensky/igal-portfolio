<!-- app/components/ContactCTA.vue -->
<template>
  <section id="contact" class="section-y bg-white dark:bg-secondary-900 py-16 px-4">
    <div class="container mx-auto max-w-7xl">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="">
          <div class="inline-block mb-4 contact-header-anim">
            <span class="text-primary-500 font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          <h2
            class="contact-header-anim text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight">
            Let's Solve Problems Together
          </h2>
          <p
            class="contact-header-anim text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
            Ready to bring your ideas to life with a cross-functional approach
          </p>
        </div>

        <!-- Contact Options -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 py-16 contact-options-container">
          <div class="space-y-4 contact-option-anim">
            <div class="flex items-center gap-4 mb-5">
              <div class="w-10 h-0.5 bg-primary-500"></div>
              <h3 class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white">
                Project Discussion
              </h3>
            </div>
            <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
              Let's talk about your project requirements and how we can solve
              them together
            </p>
            <a href="mailto:vilenskyigal@gmail.com"
              class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg">
              <span>vilenskyigal@gmail.com</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div class="space-y-4 contact-option-anim">
            <div class="flex items-center gap-4 mb-5">
              <div class="w-10 h-0.5 bg-accent-500"></div>
              <h3 class="text-2xl md:text-3xl font-display text-secondary-900 dark:text-white">
                Quick Chat
              </h3>
            </div>
            <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
              Prefer a conversation? Let's schedule a call to discuss your needs
            </p>
            <a href="tel:+491783099433"
              class="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold transition-colors group text-lg">
              <span>+49 178 3099433</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

        <!-- Final Statement -->
        <div class="contact-statement-anim border-l-4 border-primary-500 pl-6 md:pl-8 py-3">
          <p class="text-xl md:text-2xl text-primary-800 dark:text-primary-200 font-light leading-relaxed">
            Whether you need technical development, creative strategy, or
            business consulting - I bring a unique perspective to every
            challenge.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // Header Animations
  gsap.from('.contact-header-anim', {
    scrollTrigger: {
      trigger: '.contact-header-anim',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Contact Options Animation
  gsap.from('.contact-option-anim', {
    scrollTrigger: {
      trigger: '.contact-options-container',
      start: 'top 75%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  // Final Statement Animation
  gsap.from('.contact-statement-anim', {
    scrollTrigger: {
      trigger: '.contact-statement-anim',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    x: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
});
</script>
