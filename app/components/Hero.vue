<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden transition-all duration-500"
  >
    <Particles v-if="isDesktop" class="opacity-30" />

    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating geometric shapes -->
      <div
        class="absolute top-20 left-10 w-20 h-20 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-xl animate-float"
      ></div>
      <div
        class="absolute top-40 right-20 w-32 h-32 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-xl animate-float-delayed"
      ></div>
      <div
        class="absolute bottom-40 left-1/4 w-24 h-24 bg-cyan-200/20 dark:bg-cyan-500/10 rounded-full blur-xl animate-float-slow"
      ></div>

      <!-- Grid pattern -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
        <div
          class="absolute inset-0 bg-[linear-gradient(90deg,_theme(colors.slate.400)_1px,_transparent_1px),_linear-gradient(180deg,_theme(colors.slate.400)_1px,_transparent_1px)] bg-[length:60px_60px]"
        ></div>
      </div>

      <!-- Subtle spotlight effect -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-100/30 via-transparent to-transparent dark:from-blue-900/20 blur-3xl"
      ></div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 sm:pb-16 min-h-screen flex items-center"
    >
      <div class="w-full text-center">
        <!-- Profile Image with styling -->
        <div class="sm:mb-8 relative inline-block group">
          <div class="relative">
            <!-- Animated ring around profile -->
            <div
              class="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse-slow"
            ></div>

            <div class="relative bg-white dark:bg-slate-800 p-1 rounded-full">
              <img
                src="/profile.jpeg"
                :alt="$t('hero.title') + ' ' + $t('hero.lastName')"
                class="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover shadow-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- status indicator -->
            <div
              class="absolute bottom-2 right-2 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <div
                class="w-3 h-3 bg-white rounded-full animate-ping absolute"
              ></div>
              <div class="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Animated Main Heading -->
        <div class="mb-8 space-y-4">
          <div>
            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-blue-300 dark:to-white bg-clip-text text-transparent mb-4 tracking-tight animate-slide-up leading-tight"
            >
              {{ $t("hero.title") }}
              <span
                class="block md:inline bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-slide-up-delayed"
              >
                {{ $t("hero.lastName") }}
              </span>
            </h1>
          </div>

          <!-- Animated typing effect for role -->
          <div>
            <div
              class="inline-flex items-center space-x-2 animate-slide-up-delayed-2"
            >
              <div
                class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              ></div>
              <p
                class="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600 dark:text-slate-300 tracking-wide"
              >
                <span class="typing-text"></span>
                <span class="typing-cursor opacity-0">|</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 sm:mb-12 animate-slide-up-delayed-4"
        >
          <!-- Primary CTA with styling -->
          <NuxtLink
            to="/projects"
            class="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
          >
            <!-- Button background animation -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <div class="relative flex items-center">
              <svg
                class="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0l-4 4m4-4l-4-4"
                ></path>
              </svg>
              {{ $t("hero.viewProjects") }}
            </div>
          </NuxtLink>

          <!-- Secondary CTA with glassmorphism effect -->
          <a
            href="/certificate.pdf"
            target="_blank"
            class="group relative inline-flex items-center px-8 py-4 bg-white/10 dark:bg-slate-800/50 backdrop-blur-lg text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 dark:hover:bg-slate-700/50"
          >
            <svg
              class="w-5 h-5 mr-3 group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            {{ $t("hero.downloadCV") }}
          </a>
        </div>

        <!-- Social Links -->
        <div
          class="flex justify-center space-x-6 mb-16 animate-slide-up-delayed-5"
        >
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:text-white hover:border-transparent shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-3"
            :class="getSocialHoverColor(social.name)"
            :aria-label="social.name"
          >
            <i :class="social.icon" class="text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const socialLinks = [
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalvilensky",
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://linkedin.com/in/igalvilensky",
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    url: "mailto:igal@example.com",
  },
];

type SocialName = "LinkedIn" | "GitHub" | "Facebook";

const colors: Record<SocialName, string> = {
  LinkedIn: "hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25",
  GitHub: "hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25",
  Facebook: "hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25",
};

// Initialize isDesktop safely
const isDesktop = ref(process.client ? window.innerWidth >= 1024 : false);

// Update isDesktop on window resize
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 1024; // Set initial value
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", handleResize);
  }
});

const getSocialHoverColor = (socialName: string) => {
  return colors[socialName as SocialName] || "hover:bg-slate-600";
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 64;
    const elementPosition = element.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

// Add page load animations and typing effect
onMounted(() => {
  // Start typing animation after slide-up animation is complete
  setTimeout(() => {
    const typingText = document.querySelector(".typing-text");
    const typingCursor = document.querySelector(".typing-cursor");
    const textToType = "Full-stack Developer";

    if (typingText && typingCursor) {
      // Make cursor visible and start blinking
      typingCursor.classList.remove("opacity-0");
      typingCursor.classList.add("animate-blink");

      // Type text character by character
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= textToType.length) {
          typingText.textContent = textToType.substring(0, currentIndex);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100); // Type a character every 100ms
    }
  }, 1000); // Start after 1 second (after the slide-up animations)
});
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(2deg);
  }
  66% {
    transform: translateY(5px) rotate(-1deg);
  }
}

@keyframes float-delayed {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(-2deg);
  }
  66% {
    transform: translateY(8px) rotate(1deg);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(3deg);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-soft {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes scroll-indicator {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.5;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-up-delayed {
  animation: slide-up 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-2 {
  animation: slide-up 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-3 {
  animation: slide-up 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-4 {
  animation: slide-up 0.8s ease-out 0.8s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-5 {
  animation: slide-up 0.8s ease-out 1s forwards;
  opacity: 0;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out 0.6s forwards;
  opacity: 0;
}

.animate-fade-in-up-delayed {
  animation: fade-in-up 0.8s ease-out 0.8s forwards;
  opacity: 0;
}

.animate-fade-in-up-delayed-2 {
  animation: fade-in-up 0.8s ease-out 1s forwards;
  opacity: 0;
}

.animate-bounce-soft {
  animation: bounce-soft 2s ease-in-out infinite;
}

.animate-scroll-indicator {
  animation: scroll-indicator 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-blink {
  animation: blink 1s infinite;
}

/* Gradient utilities */
.bg-gradient-radial {
  background: radial-gradient(var(--tw-gradient-stops));
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .typing-text {
    animation: typing 3s steps(18) 1s both;
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
}

/* Dark mode transitions */
.dark * {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-slate-100 dark:bg-slate-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-slate-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-slate-400 dark:bg-slate-500;
}
</style>
