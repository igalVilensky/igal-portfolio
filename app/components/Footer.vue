<template>
  <footer
    id="contact"
    class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white overflow-hidden transition-all duration-500"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating geometric shapes -->
      <div
        class="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"
      ></div>
      <div
        class="absolute top-40 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-float-delayed"
      ></div>
      <div
        class="absolute bottom-40 left-1/4 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl animate-float-slow"
      ></div>
      <div
        class="absolute bottom-20 right-1/3 w-36 h-36 bg-indigo-500/10 rounded-full blur-xl animate-float"
      ></div>

      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_theme(colors.slate.400)_2px,_transparent_2px),_radial-gradient(circle_at_75px_75px,_theme(colors.blue.500)_2px,_transparent_2px)] bg-[length:100px_100px]"
        ></div>
      </div>

      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
      ></div>
    </div>

    <div
      class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 min-h-[70vh] flex flex-col justify-center"
    >
      <!-- Section Header with styling -->
      <div class="text-center mb-16">
        <div class="mb-8 relative inline-block group">
          <h2
            class="relative text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-300 to-white bg-clip-text text-transparent mb-4 tracking-tight animate-slide-up"
          >
            {{ $t("contact.title") }}
            <span
              class="block md:inline bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-slide-up-delayed"
            >
              {{ $t("contact.lets") }}
            </span>
          </h2>
        </div>

        <!-- divider -->
        <div
          class="w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto rounded-full mb-8 animate-pulse-glow"
        ></div>

        <p
          class="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light animate-slide-up-delayed-2"
        >
          Ready to bring your ideas to life? Let's discuss your next project and
          create something
          <span class="text-blue-400 font-medium">amazing</span> together.
        </p>
      </div>

      <!-- Contact Methods -->
      <div class="grid md:grid-cols-2 gap-8 mb-16 animate-slide-up-delayed-3">
        <!-- Email Contact -->
        <div
          class="group relative bg-white/5 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 dark:border-slate-600/50 p-8 hover:border-blue-400/50 dark:hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden"
        >
          <!-- Hover gradient background -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <div class="relative flex items-center space-x-6">
            <div class="relative">
              <div
                class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
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
              <!-- Animated ring -->
              <div
                class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300"
              >
                Email Me
              </h3>
              <a
                href="mailto:vilenskyigal@gmail.com"
                class="text-slate-300 hover:text-blue-400 transition-colors duration-300 text-base break-all font-medium"
              >
                vilenskyigal@gmail.com
              </a>
              <p class="text-sm text-slate-400 mt-1">
                I'll get back to you within 24 hours
              </p>
            </div>
          </div>
        </div>

        <!-- Phone Contact -->
        <div
          class="group relative bg-white/5 dark:bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700/50 dark:border-slate-600/50 p-8 hover:border-emerald-400/50 dark:hover:border-emerald-400/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden"
        >
          <!-- Hover gradient background -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>

          <div class="relative flex items-center space-x-6">
            <div class="relative">
              <div
                class="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
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
              <!-- Animated ring -->
              <div
                class="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <h3
                class="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300"
              >
                Call Me
              </h3>
              <a
                href="tel:+491783099433"
                class="text-slate-300 hover:text-emerald-400 transition-colors duration-300 text-base font-medium"
              >
                +49 1783099433
              </a>
              <p class="text-sm text-slate-400 mt-1">
                Available Mon-Fri, 9AM-6PM CET
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div class="mb-16 animate-slide-up-delayed-4">
        <h3 class="text-2xl font-semibold text-white text-center mb-8">
          Connect With Me
        </h3>
        <div class="flex justify-center space-x-8">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 dark:bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 dark:border-slate-600/50 text-slate-400 hover:text-white hover:border-transparent shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
            :class="getSocialHoverColor(social.name)"
            :aria-label="social.name"
          >
            <i
              :class="social.icon"
              class="text-2xl group-hover:scale-110 transition-transform duration-300"
            ></i>
          </a>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-8 border-t border-slate-700/50 animate-slide-up-delayed-5">
        <div
          class="bg-white/5 dark:bg-slate-800/30 backdrop-blur-lg rounded-2xl border border-slate-700/50 dark:border-slate-600/50 p-6 text-center"
        >
          <p class="text-slate-300">
            <span v-html="$t('contact.copyright')"></span>
            <span class="text-red-400 animate-pulse">♥</span>
            <span class="pl-1">{{ $t("contact.copyright2") }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Social links with styling
const socialLinks = [
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://www.linkedin.com/in/igalvilensky/",
  },
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalVilensky",
  },
  {
    name: "Facebook",
    icon: "fab fa-facebook",
    url: "https://www.facebook.com/afawefaw4496546464/",
  },
];

// Get social hover colors matching the hero section style
type SocialName = "LinkedIn" | "GitHub" | "Facebook";

const colors: Record<SocialName, string> = {
  LinkedIn: "hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25",
  GitHub: "hover:bg-purple-600 hover:shadow-lg hover:shadow-purple-500/25",
  Facebook: "hover:bg-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25",
};

const getSocialHoverColor = (socialName: string) => {
  return colors[socialName as SocialName] || "hover:bg-slate-600";
};
</script>

<style scoped>
/* Custom Animations - matching hero section style */
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

@keyframes pulse-glow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6),
      0 0 30px rgba(59, 130, 246, 0.4);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

/* Animation Classes */
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

.animate-pulse-glow {
  animation: pulse-glow 3s ease-in-out infinite;
}

/* Dark mode transitions */
.dark * {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}
</style>
