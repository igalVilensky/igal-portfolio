<!-- app/pages/contact.vue -->
<template>
  <div class="relative sm:pt-12">
    <section
      id="contact"
      class="section-y dark:bg-secondary-900 pb-16 pt-8 sm:pt-16 px-4"
    >
      <div class="container-custom">
        <div class="max-w-5xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-16">
            <div class="inline-block mb-4">
              <span
                class="text-primary-500 font-semibold text-sm uppercase tracking-wider"
              >
                Get in Touch
              </span>
            </div>
            <h2
              class="text-4xl md:text-6xl font-display text-secondary-900 dark:text-white mb-6 leading-tight"
            >
              Let's Solve Problems Together
            </h2>
            <p
              class="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto"
            >
              Ready to bring your ideas to life with a cross-functional approach
            </p>
          </div>

          <!-- Contact Methods -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <!-- Email Contact -->
            <div
              class="group relative bg-neutral-50 dark:bg-secondary-600 rounded-xl border border-neutral-200 dark:border-secondary-500 p-8 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div class="relative flex items-center space-x-6">
                <div class="relative">
                  <div
                    class="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <svg
                      class="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-xl font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors duration-300"
                  >
                    Email Me
                  </h3>
                  <a
                    href="mailto:vilenskyigal@gmail.com"
                    class="text-neutral-600 dark:text-neutral-300 hover:text-primary-500 transition-colors duration-300 text-base break-all font-medium contact-link"
                  >
                    vilenskyigal@gmail.com
                  </a>
                  <p
                    class="text-sm text-neutral-500 dark:text-neutral-400 mt-1"
                  >
                    I'll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <!-- Phone Contact -->
            <div
              class="group relative bg-neutral-50 dark:bg-secondary-600 rounded-xl border border-neutral-200 dark:border-secondary-500 p-8 hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div class="relative flex items-center space-x-6">
                <div class="relative">
                  <div
                    class="w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <svg
                      class="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <h3
                    class="text-xl font-semibold text-secondary-900 dark:text-white mb-2 group-hover:text-accent-500 transition-colors duration-300"
                  >
                    Call Me
                  </h3>
                  <a
                    href="tel:+491783099433"
                    class="text-neutral-600 dark:text-neutral-300 hover:text-accent-500 transition-colors duration-300 text-base font-medium contact-link"
                  >
                    +49 178 3099433
                  </a>
                  <p
                    class="text-sm text-neutral-500 dark:text-neutral-400 mt-1"
                  >
                    Available Mon-Fri, 9AM-6PM CET
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="text-center mb-16">
            <h3
              class="text-2xl font-display text-secondary-900 dark:text-white mb-8"
            >
              Find me online
            </h3>
            <div class="flex justify-center space-x-6">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 bg-neutral-100 dark:bg-secondary-600 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 contact-link"
                :class="social.hoverClass"
              >
                <i :class="social.icon" class="text-lg"></i>
              </a>
            </div>
          </div>

          <!-- Final Statement -->
          <div class="border-l-4 border-primary-500 pl-6 md:pl-8 py-3">
            <p
              class="text-xl md:text-2xl text-primary-800 dark:text-primary-200 font-light leading-relaxed"
            >
              Whether you need technical development, creative strategy, or
              business consulting - I bring a unique perspective to every
              challenge.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import gsap from "gsap";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Contact - Igal Vilensky",
});

// Social links with Tailwind classes
const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://www.linkedin.com/in/igalvilensky/",
    hoverClass: "hover:bg-primary-500",
  },
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalVilensky",
    hoverClass: "hover:bg-secondary-600",
  },
  {
    name: "Facebook",
    icon: "fab fa-facebook",
    url: "https://www.facebook.com/afawefaw4496546464/",
    hoverClass: "hover:bg-accent-500",
  },
];

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.from(".contact-link", {
    duration: 0.8,
    scale: 1.2,
    stagger: 0.1,
    ease: "back.out(1.7)",
  });
});
</script>

<style scoped>
/* Using your existing Tailwind animations */
</style>
