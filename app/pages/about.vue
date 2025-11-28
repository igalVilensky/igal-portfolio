<template>
  <section class="section-y bg-neutral-50 dark:bg-secondary-600 px-4 pt-8 overflow-hidden">
    <div class="container-custom">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="py-12 md:py-16">
          <div class="inline-block mb-4">
            <span v-for="item in aboutMeChars" :key="item.id"
              class="about-me-char inline-block text-accent-500 font-semibold text-sm uppercase tracking-wider">
              {{ item.char }}
            </span>
          </div>
          <h2
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-secondary-900 dark:text-white mb-4 md:mb-6 leading-tight">
            <span v-for="item in myStoryChars" :key="item.id" class="my-story-char inline-block">
              {{ item.char }}
            </span>
          </h2>
          <p
            class="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl subtitle-anim">
            I'm a <span class="text-primary-600 dark:text-primary-400 font-bold">full-stack developer</span> based in
            <span class="text-secondary-900 dark:text-white font-semibold">Leipzig, Germany</span>, focused on building
            scalable, performant SaaS and web applications. With experience in TypeScript, Vue/Nuxt, React/Next, and
            Node.js, I deliver maintainable, high-quality code driven by component-based architecture and Agile
            practices.
          </p>
        </div>

        <!-- Main Content Grid -->
        <div class="grid lg:grid-cols-3 gap-8 lg:gap-12 pb-16">
          <!-- Main Content Column (2/3) -->
          <div class="lg:col-span-2 space-y-12 about-cards-container">
            <!-- Introduction Card -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm transition-shadow about-card-anim">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                <h3 class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white">
                  {{ $t("about.personalTitle") }}
                </h3>
              </div>
              <p class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                My tech journey started in 2019 when I moved from <span
                  class="font-medium text-secondary-800 dark:text-secondary-100">Israel to Germany</span>. After
                completing web development training at <span
                  class="text-primary-600 dark:text-primary-400 font-semibold">Digital Career Institute</span> in
                Leipzig (2020-2021), I've been building production applications professionally. At <span
                  class="font-bold text-secondary-900 dark:text-white">Flowplace</span> (2023-Present), I lead
                end-to-end development of SaaS features using Vue.js/Nuxt.js and robust backend APIs—the Role Compass
                talent profile I built reached <span class="text-accent-500 font-bold">5,000+ users within one
                  month</span>. At <span class="font-bold text-secondary-900 dark:text-white">LeanERA</span>
                (2022-2023), I built responsive web apps with Vue 3, Nuxt 3, and TypeScript, establishing scalable
                architecture for the company's digital transition. At <span
                  class="font-bold text-secondary-900 dark:text-white">ARI Motors</span> (2021-2022), I designed and
                launched a comparison portal for electric commercial vehicles from scratch to production in <span
                  class="text-accent-500 font-bold">under 3 months</span>, managing full-stack responsibilities
                including website, backend, and databases.
              </p>
            </div>

            <!-- Journey Card -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm transition-shadow about-card-anim">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-accent-500 rounded-full"></div>
                <h3 class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white">
                  {{ $t("about.journeyTitle") }}
                </h3>
              </div>
              <p class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                Before becoming a developer, I was in the startup world at <span class="font-medium">Myfxbook</span> and
                <span class="font-medium">Cashdo</span> in Israel (2017-2019) as Social Media & Web Coordinator. I
                scaled Cashdo into one of Israel's top two cashback platforms, driving <span
                  class="text-accent-500 font-bold">100K+ monthly site visits</span> and partnering with leading
                credit-card companies to deliver white-label cashback platforms. But my life's been anything but
                ordinary. I spent a year and a half in Russia's far north, <span
                  class="text-blue-500 font-semibold">Yamalo-Nenets</span>, braving <span
                  class="font-bold text-blue-600 dark:text-blue-400">-60°C winters</span>. And yes, I was an <span
                  class="text-accent-500 font-bold font-display tracking-wide">actor</span>—from TV series and films to
                commercials and even the Israeli opera. I've always loved telling stories; now I do it through code.
              </p>
            </div>

            <!-- Beyond Code Card -->
            <div
              class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm transition-shadow about-card-anim">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-secondary-500 rounded-full"></div>
                <h3 class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white">
                  {{ $t("about.beyondCodeTitle") }}
                </h3>
              </div>
              <p class="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                Outside the tech world, I’m a <span
                  class="font-medium text-secondary-800 dark:text-secondary-100">dad</span> who cherishes time with my
                kids, a <span class="font-medium text-secondary-800 dark:text-secondary-100">piano player</span> who
                improvises melodies, and a curious soul studying <span
                  class="font-medium text-secondary-800 dark:text-secondary-100">Kabbalah</span> to explore life’s
                deeper meanings. Leipzig’s my home now, where I enjoy cozy cafés and the occasional hike, though I’ll
                admit travel’s lost a bit of its spark lately. I approach life like I approach coding: with <span
                  class="text-primary-600 dark:text-primary-400 font-semibold">curiosity</span>, <span
                  class="text-accent-500 font-semibold">adaptability</span>, and a touch of <span
                  class="text-secondary-500 font-semibold">improvisation</span>.
              </p>
            </div>

            <!-- Skills Section -->
            <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 md:p-8 shadow-sm skills-section-anim">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                <h3 class="text-xl md:text-2xl font-display text-secondary-900 dark:text-white">
                  {{ $t("about.skillsTitle") }}
                </h3>
              </div>
              <div class="grid sm:grid-cols-2 gap-6">
                <!-- Frontend & Mobile -->
                <div class="space-y-3 skill-group-anim">
                  <h4 class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                    <i class="fas fa-laptop-code text-primary-500"></i>
                    {{ $t("skills.frontendMobile") }}
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(skill, index) in frontendSkills" :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></span>
                      <span>{{ skill.title }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Backend -->
                <div class="space-y-3 skill-group-anim">
                  <h4 class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                    <i class="fas fa-server text-accent-500"></i>
                    {{ $t("skills.backend") }}
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(skill, index) in backendSkills" :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0"></span>
                      <span>{{ skill.title }}</span>
                    </li>
                  </ul>
                </div>

                <!-- DevOps & Tools -->
                <div class="space-y-3 skill-group-anim">
                  <h4 class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                    <i class="fas fa-tools text-secondary-500"></i>
                    {{ $t("skills.devopsTools") }}
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(skill, index) in devopsSkills" :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <span class="w-1.5 h-1.5 rounded-full bg-secondary-500 flex-shrink-0"></span>
                      <span>{{ skill.title }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Languages -->
                <div class="space-y-3 skill-group-anim">
                  <h4 class="text-base font-semibold text-secondary-900 dark:text-white flex items-center gap-2">
                    <i class="fas fa-globe text-primary-500"></i>
                    {{ $t("skills.languages") }}
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(language, index) in languageSkills" :key="index"
                      class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></span>
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
            <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm text-center sidebar-anim">
              <div class="mb-4">
                <img src="/profile.jpeg" alt="Igal Vilensky - Creative Technologist"
                  class="w-48 h-48 rounded-full mx-auto object-cover border-4 border-primary-100 dark:border-primary-900 shadow-lg" />
              </div>
              <h3 class="text-xl font-display text-secondary-900 dark:text-white mb-2">
                Igal Vilensky
              </h3>
              <p class="text-primary-500 font-medium mb-3">
                Full-Stack Developer
              </p>
              <p class="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Building scalable SaaS features and web applications with Vue, TypeScript, and Node.js
              </p>
            </div>

            <!-- Current Focus -->
            <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm sidebar-anim">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-accent-500 rounded-full"></div>
                <h3 class="text-xl font-display text-secondary-900 dark:text-white">
                  {{ $t("about.exploringTitle") }}
                </h3>
              </div>

              <!-- Currently Learning -->
              <div class="mb-6">
                <h4 class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                  <i class="fas fa-book-reader text-primary-500"></i>
                  {{ $t("about.currentlyLearning") }}
                </h4>
                <ul class="space-y-2">
                  <li v-for="item in currentlyLearning" :key="item"
                    class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Areas of Interest -->
              <div>
                <h4 class="text-sm font-semibold text-secondary-900 dark:text-white mb-3 flex items-center gap-2">
                  <i class="fas fa-lightbulb text-accent-500"></i>
                  {{ $t("about.areasOfInterest") }}
                </h4>
                <ul class="space-y-2">
                  <li v-for="interest in interests" :key="interest"
                    class="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0"></span>
                    <span>{{ interest }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Fun Facts -->
            <div class="bg-white dark:bg-secondary-900 rounded-lg p-6 shadow-sm sidebar-anim">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-secondary-500 rounded-full"></div>
                <h3 class="text-xl font-display text-secondary-900 dark:text-white">
                  {{ $t("about.funFactsTitle") }}
                </h3>
              </div>
              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <i class="fas fa-theater-masks text-primary-500 mt-0.5 flex-shrink-0"></i>
                  <span>{{ $t("about.funFactActing") }}</span>
                </li>
                <li class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <i class="fas fa-snowflake text-accent-500 mt-0.5 flex-shrink-0"></i>
                  <span>{{ $t("about.funFactYamalo") }}</span>
                </li>
                <li class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <i class="fas fa-users text-secondary-500 mt-0.5 flex-shrink-0"></i>
                  <span>{{ $t("about.funFactBrothers") }}</span>
                </li>
                <li class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                  <i class="fas fa-music text-primary-500 mt-0.5 flex-shrink-0"></i>
                  <span>{{ $t("about.funFactPiano") }}</span>
                </li>
              </ul>
            </div>

            <!-- Availability -->
            <div
              class="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-500 dark:to-secondary-900 rounded-lg p-6 shadow-sm border border-primary-100 dark:border-primary-800 sidebar-anim">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-1 h-8 bg-primary-500 rounded-full"></div>
                <h3 class="text-xl font-display text-secondary-900 dark:text-white">
                  {{ $t("about.connectTitle") }}
                </h3>
              </div>
              <div class="flex items-center gap-2 mb-3">
                <span class="relative flex h-3 w-3">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                </span>
                <span class="text-sm font-medium text-secondary-900 dark:text-white">
                  {{ $t("about.available") }}
                </span>
              </div>
              <p class="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                {{ $t("about.availableDesc") }}
              </p>
              <button @click="scrollToContact"
                class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors w-full justify-center group">
                <span>{{ $t("contact.getInTouch") }}</span>
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>


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
  "Advanced Vue Patterns",
  "Performance Optimization",
  "Testing Strategies",
  "GraphQL",
  "System Design",
];

const interests = [
  "Component Architecture",
  "Developer Experience",
  "Cognitive Science",
  "Piano Improvisation",
];

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

  // Animate Subtitle (Simple Fade Up)
  gsap.from('.subtitle-anim', {
    duration: 1,
    opacity: 0,
    y: 30,
    delay: 0.8,
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
          toggleActions: "play none none none",
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
          toggleActions: "play none none none"
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
          toggleActions: "play none none none"
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
