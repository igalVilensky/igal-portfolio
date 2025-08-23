<template>
  <div
    class="min-h-screen font-['Poppins']"
    :class="
      colorMode.value === 'dark'
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900'
    "
  >
    <Navbar />

    <!-- Hero Section -->
    <header class="relative pt-20 pb-32 px-4 overflow-hidden">
      <!-- Background Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-teal-50 to-purple-50"
      ></div>
      <div
        class="absolute top-20 right-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
      ></div>

      <div class="relative max-w-6xl mx-auto text-center">
        <!-- Profile Image with Modern Effect -->
        <div class="mb-8 relative inline-block">
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-600 rounded-full blur-lg opacity-75 animate-pulse"
          ></div>
          <img
            src="/igal.jpg"
            alt="Igal Vilensky"
            class="relative w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-white shadow-2xl object-cover"
          />
        </div>

        <!-- Hero Text -->
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-4 leading-tight"
        >
          Igal
          <span
            class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent"
            >Vilensky</span
          >
        </h1>
        <p
          class="text-lg md:text-2xl text-gray-600 mb-8 font-medium italic max-w-2xl mx-auto"
        >
          Crafting digital experiences with 3+ years of passion in web
          development
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <NuxtLink
            to="#projects"
            class="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <i class="fas fa-rocket group-hover:animate-bounce"></i>
            View Projects
          </NuxtLink>
          <NuxtLink
            to="/IgalVilensky_CV.pdf"
            target="_blank"
            class="group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <i class="fas fa-download group-hover:animate-pulse"></i>
            Download CV
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- About Section -->
    <section id="about" class="py-20 px-4 relative">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2
            class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
          >
            About <span class="text-teal-500">Me</span>
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
          ></div>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <p class="text-lg text-gray-600 leading-relaxed">
              Web and Software Developer with
              <strong class="text-teal-600">3+ years</strong> in SaaS and web
              projects. Skilled in JavaScript/TypeScript, React, Vue/Nuxt,
              Node.js, and Directus.
            </p>
            <p class="text-lg text-gray-600 leading-relaxed">
              I'm passionate about creating
              <em class="text-purple-600 font-semibold"
                >beautiful, functional</em
              >
              digital experiences that solve real-world problems and delight
              users.
            </p>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-6 mt-8">
              <div
                class="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl"
              >
                <div class="text-3xl font-black text-teal-600">3+</div>
                <div class="text-sm font-semibold text-gray-700">
                  Years Experience
                </div>
              </div>
              <div
                class="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
              >
                <div class="text-3xl font-black text-purple-600">50+</div>
                <div class="text-sm font-semibold text-gray-700">
                  Projects Completed
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Preview -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">
              Core Technologies
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                class="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-sm font-semibold"
                >JavaScript</span
              >
              <span
                class="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold"
                >TypeScript</span
              >
              <span
                class="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-sm font-semibold"
                >Vue.js</span
              >
              <span
                class="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold"
                >React</span
              >
              <span
                class="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-sm font-semibold"
                >Node.js</span
              >
              <span
                class="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold"
                >Nuxt</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section Placeholder -->
    <section id="skills" class="py-20 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4">
          My <span class="text-purple-500">Skills</span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-8"
        ></div>
        <p class="text-gray-600 text-lg">Skills section coming soon...</p>
      </div>
    </section>

    <!-- Projects Section Placeholder -->
    <section id="projects" class="py-20 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2
          class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
        >
          Featured <span class="text-teal-500">Projects</span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-8"
        ></div>
        <p class="text-gray-600 text-lg">Projects showcase coming soon...</p>
      </div>
    </section>

    <!-- Experience Section Placeholder -->
    <section id="experience" class="py-20 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4">
          Work <span class="text-purple-500">Experience</span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-8"
        ></div>
        <p class="text-gray-600 text-lg">Experience timeline coming soon...</p>
      </div>
    </section>

    <!-- Education Section Placeholder -->
    <section id="education" class="py-20 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4">
          <span class="text-teal-500">Education</span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-8"
        ></div>
        <p class="text-gray-600 text-lg">Education details coming soon...</p>
      </div>
    </section>

    <!-- Contact/Footer -->
    <footer
      id="contact"
      class="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20"
    >
      <div class="max-w-6xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-5xl font-black mb-8">
          Let's
          <span
            class="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"
            >Connect</span
          >
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-12"
        ></div>

        <div
          class="flex flex-col md:flex-row justify-center items-center gap-8 mb-12"
        >
          <a
            href="mailto:vilenskyigal@gmail.com"
            class="group flex items-center gap-3 text-lg hover:text-teal-400 transition-colors duration-300"
          >
            <i class="fas fa-envelope text-2xl group-hover:animate-bounce"></i>
            vilenskyigal@gmail.com
          </a>
          <a
            href="tel:+491783099433"
            class="group flex items-center gap-3 text-lg hover:text-purple-400 transition-colors duration-300"
          >
            <i class="fas fa-phone text-2xl group-hover:animate-pulse"></i>
            +49 1783099433
          </a>
        </div>

        <!-- Social Links Placeholder -->
        <div class="flex justify-center gap-6 mb-8">
          <a
            href="#"
            class="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="#"
            class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-github text-xl"></i>
          </a>
          <a
            href="#"
            class="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-twitter text-xl"></i>
          </a>
        </div>

        <div class="border-t border-gray-700 pt-8">
          <p class="text-gray-400">
            &copy; 2025 Igal Vilensky. Crafted with ❤️ and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import { useColorMode } from "#imports";

const colorMode = useColorMode();

// Add Google Fonts for Poppins
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
  ],
});
</script>
