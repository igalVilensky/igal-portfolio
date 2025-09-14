<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-[#0D0F12] dark:via-[#1B2432] dark:to-[#0D0F12] overflow-hidden transition-all duration-500"
  >
    <!-- Animated background elements matching navbar aesthetic -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating geometric shapes with navbar colors -->
      <div
        class="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-[#809FFF]/20 to-[#F41A81]/20 dark:from-[#809FFF]/10 dark:to-[#F41A81]/10 rounded-full blur-xl animate-float"
      ></div>
      <div
        class="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10 rounded-full blur-xl animate-float-delayed"
      ></div>
      <div
        class="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-xl animate-float-slow"
      ></div>

      <!-- Grid pattern matching navbar style -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
        <div
          class="absolute inset-0 bg-[linear-gradient(90deg,_theme(colors.slate.400)_1px,_transparent_1px),_linear-gradient(180deg,_theme(colors.slate.400)_1px,_transparent_1px)] bg-[length:60px_60px]"
        ></div>
      </div>

      <!-- Spotlight effect with navbar color scheme -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-100/30 via-transparent to-transparent dark:from-[#809FFF]/20 blur-3xl"
      ></div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 sm:pb-16 min-h-screen flex items-center"
    >
      <div class="w-full text-center">
        <!-- Profile Image with navbar-style gradient frames -->
        <div class="sm:mb-8 relative inline-block group/profile">
          <div class="relative">
            <!-- Gradient border frame matching navbar -->
            <div
              class="absolute -inset-2 bg-gradient-to-r from-[#809FFF] via-[#F41A81] to-[#809FFF] rounded-full blur opacity-30 group-hover/profile:opacity-50 transition-opacity duration-500 animate-pulse-slow"
            ></div>

            <div class="relative bg-white dark:bg-[#1B2432] p-1 rounded-full">
              <img
                src="/profile.jpeg"
                :alt="$t('hero.title') + ' ' + $t('hero.lastName')"
                class="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover shadow-xl group-hover/profile:scale-105 transition-transform duration-300"
              />
            </div>

            <!-- Status indicator with navbar accent color -->
            <div
              class="absolute bottom-2 right-2 w-7 h-7 bg-gradient-to-r from-[#809FFF] to-[#F41A81] rounded-full flex items-center justify-center shadow-lg"
            >
              <div
                class="w-3 h-3 bg-white rounded-full animate-ping absolute"
              ></div>
              <div class="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <!-- Main Heading with navbar typography style -->
        <div class="mb-8 space-y-4">
          <div>
            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4 animate-slide-up"
            >
              <span
                class="bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 dark:from-white dark:via-[#809FFF] dark:to-white bg-clip-text text-transparent"
              >
                {{ $t("hero.title") }}
              </span>
              <span
                class="block md:inline bg-gradient-to-r from-[#809FFF] via-[#F41A81] to-[#809FFF] bg-clip-text text-transparent animate-slide-up-delayed"
              >
                {{ $t("hero.lastName") }}
              </span>
            </h1>
          </div>

          <!-- Typing effect with navbar-style indicator -->
          <div>
            <div
              class="inline-flex items-center space-x-2 animate-slide-up-delayed-2"
            >
              <div
                class="w-2 h-2 bg-gradient-to-r from-[#809FFF] to-[#F41A81] rounded-full animate-pulse"
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

        <!-- Action Buttons with navbar styling -->
        <div
          class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 sm:mb-12 animate-slide-up-delayed-4"
        >
          <!-- Primary CTA with navbar gradient -->
          <div class="group/btn-primary relative">
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/btn-primary:opacity-100 transition-all duration-300 bg-gradient-to-r from-[#809FFF] to-[#F41A81]"
            >
              <div
                class="rounded-xl h-full w-full bg-gradient-to-br from-slate-50/95 via-white/95 to-blue-50/95 dark:bg-[#0D0F12]/95"
              ></div>
            </div>

            <NuxtLink
              to="/projects"
              class="relative z-10 inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#809FFF] to-[#F41A81] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/btn-primary:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="relative flex items-center">
                <i
                  class="fas fa-rocket mr-3 group-hover/btn-primary:translate-x-1 transition-transform duration-300"
                ></i>
                {{ $t("hero.viewProjects") }}
              </div>

              <!-- Floating accent dot -->
              <div
                class="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover/btn-primary:opacity-100 group-hover/btn-primary:scale-125 transition-all duration-300"
              ></div>
            </NuxtLink>
          </div>

          <!-- Secondary CTA with glassmorphism matching navbar -->
          <div class="group/btn-secondary relative">
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/btn-secondary:opacity-100 transition-all duration-300 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30"
            >
              <div
                class="rounded-xl h-full w-full bg-white/95 dark:bg-[#1B2432]/95"
              ></div>
            </div>

            <a
              href="/Igal_Vilensky.pdf"
              target="_blank"
              class="relative z-10 inline-flex items-center px-8 py-4 bg-white/10 dark:bg-[#1B2432]/50 backdrop-blur-lg text-slate-700 dark:text-slate-200 font-semibold rounded-xl border border-slate-200/50 dark:border-[#809FFF]/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-white/20 dark:hover:bg-[#1B2432]/70"
            >
              <i
                class="fas fa-download mr-3 group-hover/btn-secondary:-translate-y-1 transition-transform duration-300"
              ></i>
              {{ $t("hero.downloadCV") }}

              <!-- Floating accent dot -->
              <div
                class="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 dark:bg-[#F41A81] rounded-full opacity-0 group-hover/btn-secondary:opacity-100 group-hover/btn-secondary:scale-125 transition-all duration-300"
              ></div>
            </a>
          </div>
        </div>

        <!-- Social Links with navbar-style frames -->
        <div
          class="flex justify-center space-x-6 mb-16 animate-slide-up-delayed-5"
        >
          <div
            v-for="social in socialLinks"
            :key="social.name"
            class="relative group/social"
          >
            <!-- Gradient border frame -->
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/social:opacity-100 transition-all duration-300"
              :class="social.gradientBorder"
            >
              <div
                class="rounded-xl h-full w-full bg-white/95 dark:bg-[#1B2432]/95"
              ></div>
            </div>

            <a
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/80 dark:bg-[#1B2432]/80 backdrop-blur-sm border border-slate-200/50 dark:border-[#809FFF]/20 text-slate-600 dark:text-slate-400 shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-3 hover:text-white hover:border-transparent"
              :class="social.hoverBg"
              :aria-label="social.name"
            >
              <i :class="social.icon" class="text-xl"></i>

              <!-- Floating accent dot -->
              <div
                class="absolute top-1 right-1 w-2 h-2 rounded-full opacity-0 group-hover/social:opacity-100 group-hover/social:scale-125 transition-all duration-300"
                :class="social.accentDot"
              ></div>
            </a>
          </div>
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
    hoverBg: "hover:bg-gradient-to-r hover:from-[#809FFF] hover:to-[#F41A81]",
    gradientBorder: "bg-gradient-to-r from-[#809FFF]/30 to-[#F41A81]/30",
    accentDot: "bg-[#F41A81]",
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://linkedin.com/in/igalvilensky",
    hoverBg: "hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500",
    gradientBorder: "bg-gradient-to-r from-blue-500/30 to-cyan-500/30",
    accentDot: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    url: "mailto:igal@example.com",
    hoverBg: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
    gradientBorder: "bg-gradient-to-r from-purple-500/30 to-pink-500/30",
    accentDot: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

// Typing effect
onMounted(() => {
  setTimeout(() => {
    const typingText = document.querySelector(".typing-text");
    const typingCursor = document.querySelector(".typing-cursor");
    const textToType = "Full-stack Developer";

    if (typingText && typingCursor) {
      typingCursor.classList.remove("opacity-0");
      typingCursor.classList.add("animate-blink");

      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= textToType.length) {
          typingText.textContent = textToType.substring(0, currentIndex);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    }
  }, 1000);
});
</script>

<style scoped>
/* Animations matching navbar style */
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

.animate-slide-up-delayed-4 {
  animation: slide-up 0.8s ease-out 0.8s forwards;
  opacity: 0;
}

.animate-slide-up-delayed-5 {
  animation: slide-up 0.8s ease-out 1s forwards;
  opacity: 0;
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

/* Dark mode transitions */
.dark * {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}

/* Focus styles for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #809fff;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Custom scrollbar */
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
