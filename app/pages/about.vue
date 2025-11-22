<template>
  <section class="section-y bg-neutral-50 dark:bg-secondary-600 px-4 pt-8 overflow-hidden">
    <div class="container-custom">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="py-12 md:py-16">
          <div class="inline-block mb-4">
            <span
              v-for="item in aboutMeChars"
              :key="item.id"
              class="about-me-char inline-block text-accent-500 font-semibold text-sm uppercase tracking-wider"
            >
              {{ item.char }}
            </span>
          </div>
          <h2
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-secondary-900 dark:text-white mb-4 md:mb-6 leading-tight"
          >
            <span
              v-for="item in myStoryChars"
              :key="item.id"
              class="my-story-char inline-block"
            >
              {{ item.char }}
            </span>
          </h2>
          <p
            class="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl"
          >
            <span 
              v-for="word in subtitleWords" 
              :key="word.id" 
              class="inline-block whitespace-nowrap mr-2"
            >
              <span 
                v-for="char in word.chars" 
                :key="char.id" 
                class="subtitle-char inline-block"
              >
                {{ char.char }}
              </span>
            </span>
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-3 gap-8 lg:gap-12 pb-16">
          <!-- Main Content Column (2/3) -->
          <div class="lg:col-span-2 space-y-12 about-cards-container">
            <!-- Introduction Card -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm transition-shadow about-card-anim"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                <h3
                  class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t("about.personalTitle") }}
                </h3>
              </div>
              <p
                class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4"
              >
                {{ $t("about.personalDesc1") }}
              </p>
              <button
                @click="openModal('introduction')"
                class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors group"
              >
                <span>Read more</span>
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Journey Card -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm transition-shadow about-card-anim"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-accent-500 rounded-full"></div>
                <h3
                  class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t("about.journeyTitle") }}
                </h3>
              </div>
              <p
                class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4"
              >
                {{ $t("about.personalDesc2") }}
              </p>
              <button
                @click="openModal('journey')"
                class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors group"
              >
                <span>Read more</span>
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Beyond Code Card -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm transition-shadow about-card-anim"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-secondary-500 rounded-full"></div>
                <h3
                  class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t("about.beyondCodeTitle") }}
                </h3>
              </div>
              <p
                class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4"
              >
                {{ $t("about.personalDesc3") }}
              </p>
              <button
                @click="openModal('beyondCode')"
                class="inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors group"
              >
                <span>Read more</span>
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Skills Section -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm skills-section-anim"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                <h3
                  class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t("about.skillsTitle") }}
                </h3>
              </div>
              <div class="grid sm:grid-cols-2 gap-6">
                <!-- Frontend & Mobile -->
                <div class="space-y-3 skill-group-anim">
                  <h4
                    class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2"
                  >
                    <i class="fas fa-laptop-code text-primary-500"></i>
                    {{ $t("skills.frontendMobile") }}
                  </h4>
                  <ul class="space-y-2">
                    <li
                      v-for="(skill, index) in frontendSkills"
                      :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"
                      ></span>
                      <span>{{ skill.title }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Backend -->
                <div class="space-y-3 skill-group-anim">
                  <h4
                    class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2"
                  >
                    <i class="fas fa-server text-accent-500"></i>
                    {{ $t("skills.backend") }}
                  </h4>
                  <ul class="space-y-2">
                    <li
                      v-for="(skill, index) in backendSkills"
                      :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0"
                      ></span>
                      <span>{{ skill.title }}</span>
                    </li>
                  </ul>
                </div>

                <!-- DevOps & Tools -->
                <div class="space-y-3 skill-group-anim">
                  <h4
                    class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2"
                  >
                    <i class="fas fa-tools text-secondary-500"></i>
                    {{ $t("skills.devopsTools") }}
                  </h4>
                  <ul class="space-y-2">
                    <li
                      v-for="(skill, index) in devopsSkills"
                      :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-secondary-500 flex-shrink-0"
                      ></span>
                      <span>{{ skill.title }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Languages -->
                <div class="space-y-3 skill-group-anim">
                  <h4
                    class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2"
                  >
                    <i class="fas fa-globe text-primary-500"></i>
                    {{ $t("skills.languages") }}
                  </h4>
                  <ul class="space-y-2">
                    <li
                      v-for="(language, index) in languageSkills"
                      :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                    >
                      <span
                        class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"
                      ></span>
                      <span>{{ $t(`skills.${language.titleKey}`) }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar Column (1/3) -->
          <div class="space-y-8 sidebar-container">
            <!-- Profile Picture -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm text-center sidebar-anim"
            >
              <div class="mb-4">
                <img
                  src="/profile.jpeg"
                  alt="Igal Vilensky - Creative Technologist"
                  class="w-48 h-48 rounded-full mx-auto object-cover border-4 border-primary-100 dark:border-primary-900 shadow-lg"
                />
              </div>
              <h3
                class="text-xl font-display text-secondary-900 dark:text-white mb-2"
              >
                Igal Vilensky
              </h3>
              <p class="text-primary-500 font-medium mb-3">
                Creative Technologist
              </p>
              <p
                class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
              >
                Bridging technology, creativity, and business to solve complex
                problems
              </p>
            </div>

            <!-- Current Focus -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm sidebar-anim"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-accent-500 rounded-full"></div>
                <h3
                  class="text-xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t("about.exploringTitle") }}
                </h3>
              </div>

              <!-- Currently Learning -->
              <div class="mb-6">
                <h4
                  class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2"
                >
                  <i class="fas fa-book-reader text-primary-500"></i>
                  {{ $t("about.currentlyLearning") }}
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="item in currentlyLearning"
                    :key="item"
                    class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"
                    ></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Areas of Interest -->
              <div>
                <h4
                  class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2"
                >
                  <i class="fas fa-lightbulb text-accent-500"></i>
                  {{ $t("about.areasOfInterest") }}
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="interest in interests"
                    :key="interest"
                    class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0"
                    ></span>
                    <span>{{ interest }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Fun Facts -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm sidebar-anim"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-secondary-500 rounded-full"></div>
                <h3
                  class="text-xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t("about.funFactsTitle") }}
                </h3>
              </div>
              <ul class="space-y-3">
                <li
                  class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300"
                >
                  <i
                    class="fas fa-theater-masks text-primary-500 mt-0.5 flex-shrink-0"
                  ></i>
                  <span>{{ $t("about.funFactActing") }}</span>
                </li>
                <li
                  class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300"
                >
                  <i
                    class="fas fa-snowflake text-accent-500 mt-0.5 flex-shrink-0"
                  ></i>
                  <span>{{ $t("about.funFactYamalo") }}</span>
                </li>
                <li
                  class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300"
                >
                  <i
                    class="fas fa-users text-secondary-500 mt-0.5 flex-shrink-0"
                  ></i>
                  <span>{{ $t("about.funFactBrothers") }}</span>
                </li>
                <li
                  class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300"
                >
                  <i
                    class="fas fa-music text-primary-500 mt-0.5 flex-shrink-0"
                  ></i>
                  <span>{{ $t("about.funFactPiano") }}</span>
                </li>
              </ul>
            </div>

            <!-- Availability -->
            <div
              class="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-500 dark:to-secondary-900 rounded-lg p-6 shadow-sm border border-primary-100 dark:border-primary-800 sidebar-anim"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                <h3
                  class="text-xl font-display text-secondary-900 dark:text-white"
                >
                  {{ $t("about.connectTitle") }}
                </h3>
              </div>
              <div class="flex items-center gap-2 mb-3">
                <span class="relative flex h-3 w-3">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-3 w-3 bg-primary-500"
                  ></span>
                </span>
                <span
                  class="text-sm font-medium text-secondary-900 dark:text-white"
                >
                  {{ $t("about.available") }}
                </span>
              </div>
              <p class="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                {{ $t("about.availableDesc") }}
              </p>
              <button
                @click="scrollToContact"
                class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors w-full justify-center group"
              >
                <span>{{ $t("contact.getInTouch") }}</span>
                <svg
                  class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <Transition
          @enter="onModalEnter"
          @leave="onModalLeave"
          :css="false"
        >
          <div
            v-if="showModal"
            class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            @click="closeModal"
          >
            <div
              class="relative w-[90%] md:w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-secondary-800 rounded-xl shadow-2xl modal-content"
              @click.stop
            >
              <div
                class="sticky top-0 bg-white dark:bg-secondary-800 border-b border-neutral-200 dark:border-secondary-900 px-6 py-4 flex items-center justify-between"
              >
                <h3
                  class="text-xl font-display text-secondary-900 dark:text-white"
                >
                  {{
                    activeModal === "introduction"
                      ? $t("about.personalTitle")
                      : activeModal === "journey"
                      ? $t("about.journeyTitle")
                      : $t("about.beyondCodeTitle")
                  }}
                </h3>
                <button
                  @click="closeModal"
                  class="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-secondary-900 transition-colors"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="p-6">
                <div v-if="activeModal === 'introduction'">
                  <p
                    class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    {{ $t("about.personalDesc1") }}
                  </p>
                </div>

                <div v-if="activeModal === 'journey'">
                  <p
                    class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    {{ $t("about.personalDesc2") }}
                  </p>
                </div>

                <div v-if="activeModal === 'beyondCode'">
                  <p
                    class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed"
                  >
                    {{ $t("about.personalDesc3") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useColorMode, useHead } from "#imports";
import { useI18n } from "vue-i18n";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



const { t } = useI18n();
const colorMode = useColorMode();

// Modal state
const showModal = ref(false);
const activeModal = ref<string | null>(null);

// Skills data
const frontendSkills = [
  { title: "TypeScript / JavaScript" },
  { title: "React / React Native" },
  { title: "Vue.js / Nuxt.js" },
  { title: "CSS Frameworks" },
  { title: "Responsive Design" },
];

const backendSkills = [
  { title: "Node.js / Express.js" },
  { title: "MongoDB / Mongoose" },
  { title: "Directus CMS" },
  { title: "REST APIs" },
];

const devopsSkills = [
  { title: "CI/CD Pipelines" },
  { title: "Docker" },
  { title: "Git / GitHub" },
  { title: "Agile & Scrum" },
];

const languageSkills = [
  { titleKey: "english", levelKey: "englishLevel" },
  { titleKey: "german", levelKey: "germanLevel" },
  { titleKey: "russian", levelKey: "russianLevel" },
  { titleKey: "hebrew", levelKey: "hebrewLevel" },
];

const currentlyLearning = [
  "AWS Cloud Architecture",
  "Kubernetes",
  "GraphQL",
  "Rust Programming",
  "WebAssembly",
];

const interests = [
  "Machine Learning",
  "Web3 Technologies",
  "Performance Optimization",
  "Developer Experience",
];

// Modal controls
const openModal = (modalType: string) => {
  activeModal.value = modalType;
  showModal.value = true;
};

const closeModal = () => {
  activeModal.value = null;
  showModal.value = false;
};

// Modal Animations
const onModalEnter = (el: Element, done: () => void) => {
  const modalContent = el.querySelector('.modal-content');
  
  gsap.set(el, { opacity: 0 });
  gsap.set(modalContent, { 
    scale: 0.5, 
    rotationX: 45, 
    y: 100, 
    opacity: 0,
    transformPerspective: 1000
  });

  const tl = gsap.timeline({ onComplete: done });
  
  tl.to(el, { opacity: 1, duration: 0.3 })
    .to(modalContent, { 
      scale: 1, 
      rotationX: 0, 
      y: 0, 
      opacity: 1, 
      duration: 0.6, 
      ease: "back.out(1.7)" 
    }, "-=0.2");
};

const onModalLeave = (el: Element, done: () => void) => {
  const modalContent = el.querySelector('.modal-content');
  
  const tl = gsap.timeline({ onComplete: done });
  
  tl.to(modalContent, { 
      scale: 0.8, 
      opacity: 0, 
      y: -50, 
      duration: 0.4, 
      ease: "power2.in" 
    })
    .to(el, { opacity: 0, duration: 0.3 }, "-=0.2");
};

// Navigate to contact page
const scrollToContact = () => {
  return navigateTo("/contact");
};

// Helper to split text
const splitText = (text: string) => {
  return text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char,
    id: index
  }));
};

// Helper to split paragraph into words and then chars (preserves wrapping)
const splitParagraph = (text: string) => {
  return text.split(' ').map((word, wordIndex) => ({
    id: wordIndex,
    chars: word.split('').map((char, charIndex) => ({
      char,
      id: `${wordIndex}-${charIndex}`
    }))
  }));
};

const aboutMeChars = computed(() => splitText("About Me"));
const myStoryChars = computed(() => splitText("My Story"));
const subtitleWords = computed(() => splitParagraph(t("about.subtitle")));

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  // 1. Particle Text Animation
  
  // Animate "About Me" chars
  gsap.from('.about-me-char', {
    duration: 1.5,
    opacity: 0,
    x: () => (Math.random() - 0.5) * 200,
    y: () => (Math.random() - 0.5) * 200,
    z: () => (Math.random() - 0.5) * 200,
    rotation: () => Math.random() * 360,
    scale: 0,
    stagger: {
      amount: 0.5,
      from: "random"
    },
    ease: "power3.out"
  });

  // Animate "My Story" chars
  gsap.from('.my-story-char', {
    duration: 1.5,
    opacity: 0,
    x: () => (Math.random() - 0.5) * 300,
    y: () => (Math.random() - 0.5) * 300,
    z: () => (Math.random() - 0.5) * 300,
    rotation: () => Math.random() * 360,
    scale: 0,
    delay: 0.3,
    stagger: {
      amount: 0.6,
      from: "random"
    },
    ease: "power3.out"
  });

  // Animate Subtitle chars (Particle Effect)
  gsap.from('.subtitle-char', {
    duration: 2,
    opacity: 0,
    x: () => (Math.random() - 0.5) * 400,
    y: () => (Math.random() - 0.5) * 400,
    z: () => (Math.random() - 0.5) * 400,
    rotation: () => Math.random() * 360,
    scale: 0,
    delay: 0.5,
    stagger: {
      amount: 1.5,
      from: "random"
    },
    ease: "power3.out"
  });

  // 2. 3D Blur Materialize Effect for Cards
  const cards = document.querySelectorAll('.about-card-anim');
  cards.forEach((card) => {
    // Set initial state for 3D effect
    gsap.set(card, { 
      transformPerspective: 1000,
      transformStyle: "preserve-3d"
    });

    gsap.fromTo(card, 
      { 
        opacity: 0,
        scale: 0.8,
        z: -100,
        rotationX: 10,
        filter: 'blur(10px)'
      },
      {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          scrub: false
        },
        opacity: 1,
        scale: 1,
        z: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power2.out"
      }
    );

    // 3. Scroll-tied Exit Animation (Dissolve)
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: "top -10%",
        end: "top -50%",
        scrub: 1
      },
      opacity: 0,
      scale: 0.9,
      filter: 'blur(10px)',
      y: -50
    });
  });

  // Skills Section 3D Reveal
  const skillsSection = document.querySelector('.skills-section-anim');
  if (skillsSection) {
    gsap.set(skillsSection, { transformPerspective: 1000 });
    gsap.fromTo(skillsSection,
      {
        opacity: 0,
        y: 100,
        rotationX: 20,
        filter: 'blur(10px)'
      },
      {
        scrollTrigger: {
          trigger: skillsSection,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        y: 0,
        rotationX: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: "power3.out"
      }
    );
  }

  // Sidebar 3D Reveal
  const sidebarItems = document.querySelectorAll('.sidebar-anim');
  sidebarItems.forEach((item, index) => {
    gsap.set(item, { transformPerspective: 1000 });
    gsap.fromTo(item,
      {
        opacity: 0,
        x: 50,
        rotationY: -15,
        filter: 'blur(5px)'
      },
      {
        scrollTrigger: {
          trigger: item, // Changed from .sidebar-container to item
          start: "top 85%", // Adjusted start position
          toggleActions: "play none none reverse"
        },
        opacity: 1,
        x: 0,
        rotationY: 0,
        filter: 'blur(0px)',
        duration: 1,
        // delay: index * 0.15, // Removed delay to let them trigger naturally or keep if needed
        ease: "power3.out"
      }
    );
  });

  // Hover Effects (Enhanced)
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.15)', 
        duration: 0.4, 
        ease: 'power2.out' 
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { 
        y: 0, 
        scale: 1,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
        duration: 0.4, 
        ease: 'power2.out' 
      });
    });
  });
});

definePageMeta({
  layout: "default",
});

useHead({
  title: t("seo.about"),
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
