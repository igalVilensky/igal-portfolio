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
    <header class="relative py-32 px-4 overflow-hidden">
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
            src="/profile.jpeg"
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
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-auto"
        >
          <NuxtLink
            to="/projects"
            class="group bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <i class="fas fa-rocket group-hover:animate-bounce"></i>
            View Projects
          </NuxtLink>
          <div class="relative group">
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
            <NuxtLink
              to="/IgalVilensky_CV.pdf"
              target="_blank"
              class="relative group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <i class="fas fa-download group-hover:animate-pulse"></i>
              Download CV
            </NuxtLink>
          </div>
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
    <!-- Enhanced Skills Section -->
    <section
      id="skills"
      class="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden"
      :class="colorMode.value === 'dark' ? 'bg-gray-800' : 'bg-gray-50'"
    >
      <!-- Background Effects -->
      <div
        class="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-teal-400/5 dark:bg-teal-400/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-purple-400/5 dark:bg-purple-400/10 rounded-full blur-3xl"
      ></div>

      <div class="max-w-6xl mx-auto relative">
        <!-- Section Header -->
        <div class="text-center mb-12 sm:mb-16">
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4"
          >
            My <span class="text-purple-500">Skills</span>
          </h2>
          <div
            class="w-20 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
          ></div>
          <p
            class="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            Building scalable, user-focused solutions with modern technologies
            and Agile methodologies
          </p>
        </div>

        <!-- Skills Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          <!-- Frontend & Mobile -->
          <div
            class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transform hover:-translate-y-2"
          >
            <!-- Card Glow Effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-teal-600/5 dark:from-teal-400/10 dark:to-teal-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="relative">
              <!-- Icon and Title -->
              <div
                class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
              >
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                >
                  <i
                    class="fas fa-laptop-code text-white text-lg sm:text-xl"
                  ></i>
                </div>
                <h3
                  class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
                >
                  Frontend & Mobile
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      TypeScript / JavaScript
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      ES2015+, Modern syntax
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      React / React Native
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Hooks, Redux, Context
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Vue.js / Nuxt.js
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Composition API, SSR
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      CSS Frameworks
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      TailwindCSS, Bootstrap, SCSS
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Responsive Design
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Mobile-first, Ionic
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Backend -->
          <div
            class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transform hover:-translate-y-2"
          >
            <!-- Card Glow Effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-purple-600/5 dark:from-purple-400/10 dark:to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="relative">
              <!-- Icon and Title -->
              <div
                class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
              >
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                >
                  <i class="fas fa-server text-white text-lg sm:text-xl"></i>
                </div>
                <h3
                  class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
                >
                  Backend
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Node.js / Express.js
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Server-side JavaScript
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      MongoDB / Mongoose
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      NoSQL database, ODM
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Directus CMS
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Headless CMS solution
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      REST APIs
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      JWT Authentication
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- DevOps & Tools -->
          <div
            class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-teal-200 dark:hover:border-teal-800 transform hover:-translate-y-2"
          >
            <!-- Card Glow Effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-purple-500/5 dark:from-teal-400/10 dark:to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="relative">
              <!-- Icon and Title -->
              <div
                class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
              >
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-teal-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                >
                  <i class="fas fa-tools text-white text-lg sm:text-xl"></i>
                </div>
                <h3
                  class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
                >
                  DevOps & Tools
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      CI/CD Pipelines
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Automated deployment
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Docker
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Containerization
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Git / GitHub
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Team workflow, Version control
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Agile & Scrum
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Project methodologies
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Languages -->
          <div
            class="group relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800 transform hover:-translate-y-2"
          >
            <!-- Card Glow Effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-teal-500/5 dark:from-purple-400/10 dark:to-teal-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></div>

            <div class="relative">
              <!-- Icon and Title -->
              <div
                class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
              >
                <div
                  class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                >
                  <i class="fas fa-language text-white text-lg sm:text-xl"></i>
                </div>
                <h3
                  class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white min-w-0"
                >
                  Languages
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      English
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      C1 - Advanced
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      German
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      B2 - Upper Intermediate
                    </span>
                  </div>
                </li>

                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Russian
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Native Speaker
                    </span>
                  </div>
                </li>
                <li class="flex items-start gap-3 group/item">
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      Hebrew
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      Native Speaker
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <h2
          class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
        >
          Featured <span class="text-teal-500">Projects</span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-12"
        ></div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Project Card -->
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {{ project.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-xs font-semibold"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="mt-auto">
                <a
                  :href="project.link"
                  target="_blank"
                  class="inline-flex items-center text-teal-500 hover:text-teal-600 font-semibold"
                >
                  <i class="fas fa-external-link-alt mr-2"></i>
                  View Project
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- See All Projects Button -->
        <NuxtLink
          to="/projects"
          class="mt-12 inline-block bg-gradient-to-r from-teal-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
        >
          See All Projects
        </NuxtLink>
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

    <!-- Enhanced Education Section -->
    <section id="education" class="py-20 px-4 relative overflow-hidden">
      <!-- Background Effects -->
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-teal-400/5 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"
      ></div>

      <div class="max-w-6xl mx-auto relative">
        <div class="text-center mb-16">
          <h2
            class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4"
          >
            <span class="text-teal-500">Education</span> &
            <span class="text-purple-500">Certification</span>
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
          ></div>
          <p
            class="text-gray-600 dark:text-gray-300 text-lg mt-6 max-w-2xl mx-auto"
          >
            Comprehensive training in modern web development technologies and
            methodologies
          </p>
        </div>

        <div class="grid md:grid-cols-1 gap-8">
          <div class="relative group">
            <!-- Card Glow Effect -->

            <div
              class="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700"
            >
              <!-- Institution Header -->
              <div class="flex flex-col gap-6 mb-8">
                <!-- Title and Institution -->
                <div>
                  <div
                    class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4"
                  >
                    <div
                      class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                    >
                      <i
                        class="fas fa-graduation-cap text-white text-lg sm:text-2xl"
                      ></i>
                    </div>
                    <div class="min-w-0 flex-1">
                      <h3
                        class="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-2 break-words"
                      >
                        Web- und Softwareentwickler/in
                      </h3>
                      <p
                        class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider"
                      >
                        Web & Software Developer Certification
                      </p>
                    </div>
                  </div>

                  <div
                    class="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base lg:text-lg"
                  >
                    <div class="flex items-center gap-2">
                      <i
                        class="fas fa-university text-teal-500 flex-shrink-0"
                      ></i>
                      <span
                        class="text-gray-700 dark:text-gray-300 font-medium min-w-0"
                        >Digital Career Institute (DCI), Leipzig</span
                      >
                    </div>
                    <div class="flex items-center gap-2">
                      <i
                        class="fas fa-calendar-alt text-purple-500 flex-shrink-0"
                      ></i>
                      <span class="text-teal-600 dark:text-teal-400 font-bold"
                        >2020 - 2022</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Enhanced Download Button -->
                <div class="flex justify-center sm:justify-start">
                  <div class="relative group/btn">
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-600 rounded-full blur-lg opacity-75 group-hover/btn:opacity-100 transition-opacity duration-300 animate-pulse"
                    ></div>
                    <a
                      href="/DCI_Igal Vilensky.pdf"
                      target="_blank"
                      class="relative bg-gradient-to-r from-teal-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 text-sm sm:text-base lg:text-lg"
                    >
                      <i
                        class="fas fa-download group-hover/btn:animate-bounce"
                      ></i>
                      <span>Download Certificate</span>
                      <i
                        class="fas fa-arrow-right transform group-hover/btn:translate-x-1 transition-transform duration-300"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Program Stats -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                <div
                  class="text-center p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-xl"
                >
                  <div
                    class="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400"
                  >
                    14
                  </div>
                  <div
                    class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Months
                  </div>
                </div>
                <div
                  class="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl"
                >
                  <div
                    class="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400"
                  >
                    1200+
                  </div>
                  <div
                    class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Hours
                  </div>
                </div>
                <div
                  class="text-center p-3 sm:p-4 bg-gradient-to-br from-teal-50 to-purple-50 dark:from-teal-900/10 dark:to-purple-900/10 rounded-xl"
                >
                  <div
                    class="text-xl sm:text-2xl font-black text-gray-700 dark:text-gray-300"
                  >
                    15+
                  </div>
                  <div
                    class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Technologies
                  </div>
                </div>
                <div
                  class="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-teal-50 dark:from-purple-900/10 dark:to-teal-900/10 rounded-xl"
                >
                  <div
                    class="text-xl sm:text-2xl font-black text-gray-700 dark:text-gray-300"
                  >
                    10+
                  </div>
                  <div
                    class="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Projects
                  </div>
                </div>
              </div>

              <!-- Main Content Grid -->
              <div class="grid lg:grid-cols-2 gap-6 sm:gap-8">
                <!-- Technical Curriculum -->
                <div class="space-y-4 sm:space-y-6">
                  <div class="flex items-center gap-3 mb-4 sm:mb-6">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <i
                        class="fas fa-code text-white text-sm sm:text-base"
                      ></i>
                    </div>
                    <h4
                      class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                    >
                      Technical Curriculum
                    </h4>
                  </div>

                  <div class="space-y-3 sm:space-y-4">
                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/10 dark:to-teal-800/10 border border-teal-200/50 dark:border-teal-700/30"
                    >
                      <i
                        class="fas fa-check-circle text-teal-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >HTML5 & CSS3</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Semantic markup, responsive design, CSS Grid & Flexbox
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10 border border-purple-200/50 dark:border-purple-700/30"
                    >
                      <i
                        class="fas fa-check-circle text-purple-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >JavaScript ES2015+ & TypeScript</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Modern JavaScript, async/await, type safety
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/10 dark:to-teal-800/10 border border-teal-200/50 dark:border-teal-700/30"
                    >
                      <i
                        class="fas fa-check-circle text-teal-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >React, React Hooks & Redux</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Component architecture, state management
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10 border border-purple-200/50 dark:border-purple-700/30"
                    >
                      <i
                        class="fas fa-check-circle text-purple-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Node.js, Express.js & REST APIs</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Server-side development, API design
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/10 dark:to-teal-800/10 border border-teal-200/50 dark:border-teal-700/30"
                    >
                      <i
                        class="fas fa-check-circle text-teal-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >MongoDB & Mongoose</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          NoSQL database design, ODM
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10 border border-purple-200/50 dark:border-purple-700/30"
                    >
                      <i
                        class="fas fa-check-circle text-purple-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Git, GitHub & Agile Methodologies</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Version control, collaborative development
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Key Achievements -->
                <div class="space-y-4 sm:space-y-6">
                  <div class="flex items-center gap-3 mb-4 sm:mb-6">
                    <div
                      class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0"
                    >
                      <i
                        class="fas fa-trophy text-white text-sm sm:text-base"
                      ></i>
                    </div>
                    <h4
                      class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white"
                    >
                      Key Achievements
                    </h4>
                  </div>

                  <div class="space-y-3 sm:space-y-4">
                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/10 dark:to-amber-800/10 border border-amber-200/50 dark:border-amber-700/30"
                    >
                      <i
                        class="fas fa-star text-amber-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Program Excellence</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Successfully completed comprehensive 14-month
                          intensive program
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/10 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/30"
                    >
                      <i
                        class="fas fa-project-diagram text-emerald-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Capstone Project</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Developed "Plantastic" - a full-stack plant care
                          application
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/30"
                    >
                      <i
                        class="fas fa-language text-blue-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Language Proficiency</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Enhanced professional German language skills
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-rose-50 to-rose-100/50 dark:from-rose-900/10 dark:to-rose-800/10 border border-rose-200/50 dark:border-rose-700/30"
                    >
                      <i
                        class="fas fa-mobile-alt text-rose-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Responsive Design</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Mastered modern frameworks and responsive web design
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-violet-50 to-violet-100/50 dark:from-violet-900/10 dark:to-violet-800/10 border border-violet-200/50 dark:border-violet-700/30"
                    >
                      <i
                        class="fas fa-shield-alt text-violet-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Security & Authentication</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          JWT implementation and security best practices
                        </p>
                      </div>
                    </div>

                    <div
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-indigo-900/10 dark:to-indigo-800/10 border border-indigo-200/50 dark:border-indigo-700/30"
                    >
                      <i
                        class="fas fa-database text-indigo-500 mt-1 text-sm sm:text-lg flex-shrink-0"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >Database Development</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          Advanced database design and optimization techniques
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
            target="_blank"
            href="https://www.linkedin.com/in/igalvilensky/"
            class="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-linkedin text-xl"></i>
          </a>
          <a
            target="_blank"
            href="https://github.com/igalVilensky"
            class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-github text-xl"></i>
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/afawefaw4496546464/"
            class="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <i class="fab fa-facebook text-xl"></i>
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
import { useColorMode } from "#imports";

const colorMode = useColorMode();

// Featured projects data
const featuredProjects = [
  {
    id: 1,
    title: "Sunlit tales",
    description:
      "Immerse yourself in the world of poetry, where every word is a ray of light illuminating the depths of the soul.",
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity"],
    link: "https://sunlit-tales.netlify.app/",
  },
  {
    id: 2,
    title: "Your Path to Personal Growth",
    description:
      "Psy-Blog blends Kabbalah and psychology into a 10-week journey through the Tree of Self. Daily progress earns points, levels, and balance guided by the Energy of the Day.",
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern portfolio showcasing my web development projects.",
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
];

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

<style>
@keyframes tilt {
  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}
</style>
