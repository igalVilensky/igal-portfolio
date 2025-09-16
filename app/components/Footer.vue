<template>
  <footer
    id="contact"
    class="border-t border-[#1B2432] bg-[#0D0F12] text-white relative overflow-hidden"
  >
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-[0.02]">
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_25px_25px,_#809FFF_1px,_transparent_1px),_radial-gradient(circle_at_75px_75px,_#F41A81_1px,_transparent_1px)] bg-[length:50px_50px]"
      ></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Main Contact Section -->
      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <!-- Site Navigation -->
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-[#809FFF] mb-4">
            Site Map
          </h2>
          <p class="text-slate-300 mb-6 text-sm md:text-base">
            Explore all sections of my portfolio
          </p>

          <!-- Navigation Links -->
          <div class="space-y-3">
            <NuxtLink
              v-for="item in navigationItems"
              :key="item.id"
              :to="item.path"
              class="flex items-center group hover:translate-x-1 transition-all duration-300"
            >
              <div
                class="w-8 h-8 bg-[#1B2432] bg-opacity-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#809FFF] group-hover:bg-opacity-20 transition-all duration-300"
              >
                <i
                  :class="item.icon"
                  class="text-slate-400 group-hover:text-[#809FFF] text-sm transition-colors duration-300"
                ></i>
              </div>
              <span
                class="text-slate-300 group-hover:text-white capitalize text-sm font-medium transition-colors duration-300"
              >
                {{ $t(`nav.${item.id}`) || item.id }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Contact Details Grid -->
        <div class="grid sm:grid-cols-2 gap-4">
          <!-- Email -->
          <div
            class="bg-[#1B2432] bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-[#809FFF] border-opacity-20 hover:border-opacity-40 transition-all duration-300"
          >
            <div class="flex items-center mb-2">
              <div
                class="w-8 h-8 bg-[#809FFF] bg-opacity-20 rounded-lg flex items-center justify-center mr-3"
              >
                <i class="fas fa-envelope text-[#809FFF] text-sm"></i>
              </div>
              <h3 class="font-medium text-white text-sm">Email</h3>
            </div>
            <a
              href="mailto:igalvilensky@gmail.com"
              class="text-slate-300 hover:text-[#809FFF] transition-colors text-xs break-all"
            >
              igalvilensky@gmail.com
            </a>
          </div>

          <!-- Phone -->
          <div
            class="bg-[#1B2432] bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-[#F41A81] border-opacity-20 hover:border-opacity-40 transition-all duration-300"
          >
            <div class="flex items-center mb-2">
              <div
                class="w-8 h-8 bg-[#F41A81] bg-opacity-20 rounded-lg flex items-center justify-center mr-3"
              >
                <i class="fas fa-phone text-[#F41A81] text-sm"></i>
              </div>
              <h3 class="font-medium text-white text-sm">Phone</h3>
            </div>
            <a
              href="tel:+972123456789"
              class="text-slate-300 hover:text-[#F41A81] transition-colors text-xs"
            >
              +972 123 456 789
            </a>
          </div>

          <!-- Location -->
          <div
            class="bg-[#1B2432] bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-[#FDDC00] border-opacity-20 hover:border-opacity-40 transition-all duration-300 sm:col-span-2"
          >
            <div class="flex items-center">
              <div
                class="w-8 h-8 bg-[#FDDC00] bg-opacity-20 rounded-lg flex items-center justify-center mr-3"
              >
                <i class="fas fa-map-marker-alt text-[#FDDC00] text-sm"></i>
              </div>
              <div>
                <h3 class="font-medium text-white text-sm">Location</h3>
                <p class="text-slate-300 text-xs">Leipzig, Germany</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Links & Footer Info -->
      <div class="border-t border-[#1B2432] pt-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1B2432] bg-opacity-50 border border-[#809FFF] border-opacity-20 text-slate-400 hover:text-white hover:border-opacity-60 transition-all duration-300 hover:scale-105"
              :class="getSocialHoverColor(social.name)"
              :aria-label="social.name"
            >
              <i :class="social.icon" class="text-sm"></i>
            </a>
          </div>

          <!-- Copyright -->
          <div class="text-center md:text-right">
            <p class="text-slate-400 text-xs mb-1">
              <span v-html="$t('contact.copyright')"></span>
              <span class="text-[#F41A81]">♥</span>
              <span class="pl-1">{{ $t("contact.copyright2") }}</span>
            </p>
            <div
              class="flex flex-wrap justify-center md:justify-end gap-2 text-xs text-slate-500"
            >
              <span>Made with <span class="text-[#809FFF]">Vue.js</span></span>
              <span>•</span>
              <span
                >Styled with <span class="text-[#F41A81]">Tailwind</span></span
              >
              <span>•</span>
              <span
                >Powered by <span class="text-[#FDDC00]">Nuxt.js</span></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Navigation items
const navigationItems = [
  { id: "home", path: "/", icon: "fas fa-home" },
  { id: "projects", path: "/projects", icon: "fas fa-folder-open" },
  { id: "experience", path: "/experience", icon: "fas fa-briefcase" },
  { id: "education", path: "/education", icon: "fas fa-graduation-cap" },
  { id: "about", path: "/about", icon: "fas fa-user" },
];

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
  LinkedIn: "hover:bg-[#809FFF] hover:bg-opacity-20 hover:shadow-sm",
  GitHub: "hover:bg-[#F41A81] hover:bg-opacity-20 hover:shadow-sm",
  Facebook: "hover:bg-[#FDDC00] hover:bg-opacity-20 hover:shadow-sm",
};

const getSocialHoverColor = (socialName: string) => {
  return (
    colors[socialName as SocialName] || "hover:bg-[#1B2432] hover:bg-opacity-60"
  );
};
</script>

<style scoped>
/* Enhanced focus styles for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #809fff;
  outline-offset: 2px;
  border-radius: 6px;
}

/* Smooth transitions */
* {
  transition: all 0.3s ease;
}
</style>
