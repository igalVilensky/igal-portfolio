<template>
  <footer
    id="contact"
    class="relative bg-[#0D0F12] dark:bg-[#0D0F12] text-white overflow-hidden transition-all duration-500"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Floating geometric shapes -->
      <div
        class="absolute top-20 left-10 w-32 h-32 bg-[#809FFF] bg-opacity-10 rounded-full blur-xl animate-float"
      ></div>
      <div
        class="absolute top-40 right-20 w-40 h-40 bg-[#F41A81] bg-opacity-10 rounded-full blur-xl animate-float-delayed"
      ></div>
      <div
        class="absolute bottom-40 left-1/4 w-28 h-28 bg-[#FDDC00] bg-opacity-10 rounded-full blur-xl animate-float-slow"
      ></div>
      <div
        class="absolute bottom-20 right-1/3 w-36 h-36 bg-[#809FFF] bg-opacity-10 rounded-full blur-xl animate-float"
      ></div>

      <!-- Subtle pattern overlay -->
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_#809FFF_2px,_transparent_2px),_radial-gradient(circle_at_75px_75px,_#F41A81_2px,_transparent_2px)] bg-[length:100px_100px]"
        ></div>
      </div>

      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#0D0F12] from-opacity-50 via-transparent to-transparent"
      ></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
      <!-- Contact Section -->
      <div class="mb-16 animate-slide-up">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-[#809FFF] mb-4">
            {{ $t("contact.title") || "Get In Touch" }}
          </h2>
          <p class="text-xl text-slate-300 max-w-3xl mx-auto">
            {{
              $t("contact.description") ||
              "Feel free to reach out for opportunities, collaborations, or just to say hello!"
            }}
          </p>
        </div>

        <!-- Contact Methods -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <!-- Email Contact -->
          <div class="group relative animate-slide-up-delayed">
            <div
              class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#809FFF] from-opacity-50 to-[#F41A81] to-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div
                class="rounded-2xl h-full w-full bg-[#1B2432] bg-opacity-95"
              ></div>
            </div>

            <div
              class="relative z-10 bg-[#1B2432] bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 border border-[#809FFF] border-opacity-20 hover:border-opacity-40 transition-all duration-300 group-hover:scale-105"
            >
              <div
                class="flex items-center justify-center w-16 h-16 bg-[#809FFF] bg-opacity-20 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <i class="fas fa-envelope text-2xl text-[#809FFF]"></i>
              </div>
              <h3 class="text-xl font-semibold text-white text-center mb-2">
                Email
              </h3>
              <a
                href="mailto:igalvilensky@gmail.com"
                class="text-slate-300 hover:text-[#809FFF] transition-colors duration-300 text-center block break-all"
              >
                igalvilensky@gmail.com
              </a>
            </div>
          </div>

          <!-- Phone Contact -->
          <div class="group relative animate-slide-up-delayed-2">
            <div
              class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#F41A81] from-opacity-50 to-[#FDDC00] to-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div
                class="rounded-2xl h-full w-full bg-[#1B2432] bg-opacity-95"
              ></div>
            </div>

            <div
              class="relative z-10 bg-[#1B2432] bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 border border-[#F41A81] border-opacity-20 hover:border-opacity-40 transition-all duration-300 group-hover:scale-105"
            >
              <div
                class="flex items-center justify-center w-16 h-16 bg-[#F41A81] bg-opacity-20 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <i class="fas fa-phone text-2xl text-[#F41A81]"></i>
              </div>
              <h3 class="text-xl font-semibold text-white text-center mb-2">
                Phone
              </h3>
              <a
                href="tel:+972123456789"
                class="text-slate-300 hover:text-[#F41A81] transition-colors duration-300 text-center block"
              >
                +972 123 456 789
              </a>
            </div>
          </div>

          <!-- Location -->
          <div
            class="group relative animate-slide-up-delayed-3 md:col-span-2 lg:col-span-1"
          >
            <div
              class="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-[#FDDC00] from-opacity-50 to-[#809FFF] to-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              <div
                class="rounded-2xl h-full w-full bg-[#1B2432] bg-opacity-95"
              ></div>
            </div>

            <div
              class="relative z-10 bg-[#1B2432] bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 border border-[#FDDC00] border-opacity-20 hover:border-opacity-40 transition-all duration-300 group-hover:scale-105"
            >
              <div
                class="flex items-center justify-center w-16 h-16 bg-[#FDDC00] bg-opacity-20 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <i class="fas fa-map-marker-alt text-2xl text-[#FDDC00]"></i>
              </div>
              <h3 class="text-xl font-semibold text-white text-center mb-2">
                Location
              </h3>
              <p class="text-slate-300 text-center">Leipzig, Germany</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Links -->
      <div class="mb-16 animate-slide-up-delayed-4">
        <h3 class="text-2xl font-semibold text-[#F41A81] text-center mb-8">
          Connect With Me
        </h3>
        <div class="flex justify-center space-x-8">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group w-16 h-16 flex items-center justify-center rounded-2xl bg-[#1B2432] bg-opacity-50 backdrop-blur-lg border border-[#809FFF] border-opacity-20 text-slate-400 hover:text-white hover:border-opacity-60 shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
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

      <!-- CTA Section -->
      <div class="mb-16 animate-slide-up-delayed-5">
        <div class="relative group">
          <div
            class="absolute inset-0 rounded-3xl p-[3px] bg-gradient-to-r from-[#809FFF] via-[#F41A81] to-[#FDDC00] opacity-75 group-hover:opacity-100 transition-all duration-500"
          >
            <div class="rounded-3xl h-full w-full bg-[#0D0F12]"></div>
          </div>

          <div
            class="relative z-10 bg-[#1B2432] bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center border border-[#809FFF] border-opacity-30"
          >
            <h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p class="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Ready to turn your ideas into reality? I'm here to help create
              exceptional digital experiences.
            </p>
            <a
              href="mailto:igalvilensky@gmail.com"
              class="inline-flex items-center justify-center px-8 py-4 bg-[#FDDC00] text-black font-semibold rounded-2xl hover:bg-[#FDDC00] hover:bg-opacity-90 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[#FDDC00] hover:shadow-opacity-25 group"
            >
              <i
                class="fas fa-paper-plane mr-3 group-hover:translate-x-1 transition-transform duration-300"
              ></i>
              Start a Conversation
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-8 border-t border-[#1B2432] animate-slide-up-delayed-6">
        <div
          class="bg-[#1B2432] bg-opacity-30 backdrop-blur-lg rounded-2xl border border-[#809FFF] border-opacity-10 p-6 text-center"
        >
          <p class="text-slate-300">
            <span v-html="$t('contact.copyright')"></span>
            <span class="text-[#F41A81] animate-pulse">♥</span>
            <span class="pl-1">{{ $t("contact.copyright2") }}</span>
          </p>
          <div
            class="mt-4 flex justify-center space-x-6 text-sm text-slate-400"
          >
            <span>Made with <span class="text-[#809FFF]">Vue.js</span></span>
            <span>•</span>
            <span
              >Styled with
              <span class="text-[#F41A81]">Tailwind CSS</span></span
            >
            <span>•</span>
            <span>Powered by <span class="text-[#FDDC00]">Nuxt.js</span></span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Social links with updated styling for new color scheme
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

// Get social hover colors matching the new color scheme
type SocialName = "LinkedIn" | "GitHub" | "Facebook";

const colors: Record<SocialName, string> = {
  LinkedIn:
    "hover:bg-[#809FFF] hover:bg-opacity-20 hover:shadow-lg hover:shadow-[#809FFF] hover:shadow-opacity-25",
  GitHub:
    "hover:bg-[#F41A81] hover:bg-opacity-20 hover:shadow-lg hover:shadow-[#F41A81] hover:shadow-opacity-25",
  Facebook:
    "hover:bg-[#FDDC00] hover:bg-opacity-20 hover:shadow-lg hover:shadow-[#FDDC00] hover:shadow-opacity-25",
};

const getSocialHoverColor = (socialName: string) => {
  return (
    colors[socialName as SocialName] || "hover:bg-[#1B2432] hover:bg-opacity-60"
  );
};
</script>

<style scoped>
/* Custom Animations - matching the new color scheme */
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
    box-shadow: 0 0 5px rgba(128, 159, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(128, 159, 255, 0.6),
      0 0 30px rgba(128, 159, 255, 0.4);
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

.animate-slide-up-delayed-6 {
  animation: slide-up 0.8s ease-out 1.2s forwards;
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

/* Custom hover effects */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Enhanced focus styles for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #809fff;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .animate-slide-up-delayed-3.md\:col-span-2 {
    animation-delay: 0.6s;
  }
}
</style>
