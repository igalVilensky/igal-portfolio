<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      colorMode.value === 'dark'
        ? 'bg-gray-900/95 border-gray-700'
        : 'bg-white/95 border-gray-200',
      isScrolled ? 'backdrop-blur-md shadow-lg border-b' : 'backdrop-blur-sm',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink
            to="#"
            @click="scrollToSection('top')"
            class="text-2xl font-black"
            :class="colorMode.value === 'dark' ? 'text-white' : 'text-gray-900'"
          >
            <span
              class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent"
            >
              Igal
            </span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <button
              v-for="item in navigationItems"
              :key="item.id"
              @click="scrollToSection(item.id)"
              class="px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:scale-105"
              :class="[
                colorMode.value === 'dark'
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
                activeSection === item.id
                  ? colorMode.value === 'dark'
                    ? 'text-teal-400 bg-gray-800'
                    : 'text-teal-600 bg-teal-50'
                  : '',
              ]"
            >
              <i :class="item.icon" class="mr-2"></i>
              {{ item.name }}
            </button>
          </div>
        </div>

        <!-- Desktop Right Side - Dark Mode Toggle -->
        <div class="hidden md:flex items-center space-x-4">
          <button
            @click="toggleColorMode"
            class="p-2 rounded-full transition-all duration-200 hover:scale-110"
            :class="[
              colorMode.value === 'dark'
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
            :title="
              colorMode.value === 'dark'
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            "
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-lg"
            ></i>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Mobile Dark Mode Toggle -->
          <button
            @click="toggleColorMode"
            class="p-2 rounded-full transition-all duration-200"
            :class="[
              colorMode.value === 'dark'
                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
            ]"
          >
            <i
              :class="colorMode.value === 'dark' ? 'fas fa-sun' : 'fas fa-moon'"
              class="text-sm"
            ></i>
          </button>

          <!-- Hamburger Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-md transition-all duration-200"
            :class="[
              colorMode.value === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
            ]"
          >
            <i
              :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"
              class="text-xl transition-transform duration-200"
            ></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-show="isMobileMenuOpen"
        class="md:hidden absolute top-16 right-4 left-4 rounded-lg shadow-xl border overflow-hidden"
        :class="[
          colorMode.value === 'dark'
            ? 'bg-gray-800/95 border-gray-700'
            : 'bg-white/95 border-gray-200',
        ]"
        style="backdrop-filter: blur(12px)"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <button
            v-for="item in navigationItems"
            :key="item.id"
            @click="handleMobileNavClick(item.id)"
            class="w-full text-left block px-3 py-3 rounded-md text-base font-semibold transition-all duration-200"
            :class="[
              colorMode.value === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100',
              activeSection === item.id
                ? colorMode.value === 'dark'
                  ? 'text-teal-400 bg-gray-700'
                  : 'text-teal-600 bg-teal-50'
                : '',
            ]"
          >
            <i :class="item.icon" class="mr-3 w-4"></i>
            {{ item.name }}
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";

const colorMode = useColorMode();
const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref("");

const navigationItems = [
  { id: "about", name: "About", icon: "fas fa-user" },
  { id: "skills", name: "Skills", icon: "fas fa-code" },
  { id: "projects", name: "Projects", icon: "fas fa-folder-open" },
  { id: "experience", name: "Experience", icon: "fas fa-briefcase" },
  { id: "education", name: "Education", icon: "fas fa-graduation-cap" },
  { id: "contact", name: "Contact", icon: "fas fa-envelope" },
];

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const scrollToSection = (sectionId: string) => {
  if (sectionId === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 64;
    const elementPosition = element.offsetTop - navbarHeight - 20; // Extra 20px padding

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};

const handleMobileNavClick = (sectionId: string) => {
  scrollToSection(sectionId);
  isMobileMenuOpen.value = false;
};

// Handle scroll events
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isScrolled.value = scrollTop > 10;

  // Update active section based on scroll position
  const sections = navigationItems.map((item) => item.id);
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar?.offsetHeight || 64;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i] as string);
    if (section) {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      if (scrollTop >= sectionTop) {
        activeSection.value = sections[i] as string;
        break;
      }
    }
  }

  // If at the very top, clear active section
  if (scrollTop < 100) {
    activeSection.value = "";
  }
};

// Close mobile menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  const nav = document.querySelector("nav");

  if (nav && !nav.contains(target) && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  document.addEventListener("click", handleClickOutside);

  // Set initial scroll state
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.removeEventListener("click", handleClickOutside);
});
</script>
