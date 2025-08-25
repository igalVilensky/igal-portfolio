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
          {{ hero.title }}
          <span
            class="bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent"
            >{{ hero.lastName }}</span
          >
        </h1>
        <p
          class="text-lg md:text-2xl text-gray-600 mb-8 font-medium italic max-w-2xl mx-auto"
        >
          {{ hero.subtitle }}
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
            {{ hero.viewProjects }}
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
              {{ hero.downloadCV }}
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
            {{ about.title }}
            <span class="text-teal-500">{{ $t("about.me") }}</span>
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
          ></div>
        </div>

        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ about.description1 }}
            </p>
            <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ about.description2 }}
            </p>

            <!-- Quick Stats -->
            <div class="grid grid-cols-2 gap-6 mt-8">
              <div
                class="text-center p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl"
              >
                <div class="text-3xl font-black text-teal-600">3+</div>
                <div class="text-sm font-semibold text-gray-700">
                  {{ about.yearsExperience }}
                </div>
              </div>
              <div
                class="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
              >
                <div class="text-3xl font-black text-purple-600">50+</div>
                <div class="text-sm font-semibold text-gray-700">
                  {{ about.projectsCompleted }}
                </div>
              </div>
            </div>
          </div>

          <!-- Skills Preview -->
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">
              {{ about.coreTechnologies }}
            </h3>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="(tech, index) in technologies"
                :key="index"
                class="px-4 py-2"
                :class="
                  index % 2 === 0
                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                "
              >
                {{ tech }}
              </span>
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
            {{ skills.title }}
            <span class="text-purple-500">{{ $t("skills.my") }}</span>
          </h2>
          <div
            class="w-20 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
          ></div>
          <p
            class="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            {{ skills.subtitle }}
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
                  {{ skills.frontendMobile }}
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li
                  v-for="(item, index) in frontendSkills"
                  :key="index"
                  class="flex items-start gap-3 group/item"
                >
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-teal-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      {{ item.title }}
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      {{ item.description }}
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
                  {{ skills.backend }}
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li
                  v-for="(item, index) in backendSkills"
                  :key="index"
                  class="flex items-start gap-3 group/item"
                >
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 bg-purple-500 rounded-full group-hover/item:scale-150 transition-transform duration-300"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      {{ item.title }}
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      {{ item.description }}
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
                  {{ skills.devopsTools }}
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li
                  v-for="(item, index) in devopsSkills"
                  :key="index"
                  class="flex items-start gap-3 group/item"
                >
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="index % 2 === 0 ? 'bg-teal-500' : 'bg-purple-500'"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      {{ item.title }}
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      {{ item.description }}
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
                  {{ skills.languages }}
                </h3>
              </div>

              <!-- Skills List -->
              <ul class="space-y-3 sm:space-y-4">
                <li
                  v-for="(item, index) in languageSkills"
                  :key="index"
                  class="flex items-start gap-3 group/item"
                >
                  <div class="flex-shrink-0 mt-2">
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="index % 2 === 0 ? 'bg-teal-500' : 'bg-purple-500'"
                    ></div>
                  </div>
                  <div class="min-w-0">
                    <span
                      class="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 block"
                    >
                      {{ item.title }}
                    </span>
                    <span
                      class="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                    >
                      {{ item.level }}
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
          {{ projects.title }}
          <span class="text-teal-500">{{ $t("projects.featured") }}</span>
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
              <h3 class="text-xl font-bold text-gray-90 dark:text-white mb-2">
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
                  {{ projects.viewProject }}
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
          {{ projects.seeAllProjects }}
        </NuxtLink>
      </div>
    </section>

    <!-- Experience Section Placeholder -->
    <section id="experience" class="py-20 px-4 bg-gray-50">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl md:text-5xl font-black text-gray-900 mb-4">
          {{ experience.title }}
          <span class="text-purple-500">{{ $t("experience.work") }}</span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full mb-8"
        ></div>
        <p
          class="text-gray-600 dark:text-gray-600 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
        >
          {{ experience.comingSoon }}
        </p>
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
            <span class="text-teal-500">{{ education.title }}</span>
            {{ $t("education.and") }}
            <span class="text-purple-500">{{ $t("education.second") }}</span>
          </h2>
          <div
            class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full"
          ></div>
          <p
            class="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            {{ education.subtitle }}
          </p>
        </div>

        <div class="grid md:grid-cols-1 gap-8">
          <div class="relative group">
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
                        {{ education.certification }}
                      </h3>
                      <p
                        class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider"
                      >
                        {{ education.certificationSub }}
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
                        >{{ education.institution }}</span
                      >
                    </div>
                    <div class="flex items-center gap-2">
                      <i
                        class="fas fa-calendar-alt text-purple-500 flex-shrink-0"
                      ></i>
                      <span
                        class="text-teal-600 dark:text-teal-400 font-bold"
                        >{{ education.period }}</span
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
                      <span>{{ education.downloadCertificate }}</span>
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
                    {{ education.months }}
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
                    {{ education.hours }}
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
                    {{ education.technologiesCount }}
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
                    {{ education.projectsCount }}
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
                      {{ education.technicalCurriculum }}
                    </h4>
                  </div>

                  <div class="space-y-3 sm:space-y-4">
                    <div
                      v-for="(item, index) in technicalCurriculum"
                      :key="index"
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
                      :class="
                        index % 2 === 0
                          ? 'bg-gradient-to-r from-teal-50 to-teal-100/50 dark:from-teal-900/10 dark:to-teal-800/10 border border-teal-200/50 dark:border-teal-700/30'
                          : 'bg-gradient-to-r from-purple-50 to-purple-100/50 dark:from-purple-900/10 dark:to-purple-800/10 border border-purple-200/50 dark:border-purple-700/30'
                      "
                    >
                      <i
                        class="fas fa-check-circle mt-1 text-sm sm:text-lg flex-shrink-0"
                        :class="
                          index % 2 === 0 ? 'text-teal-500' : 'text-purple-500'
                        "
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >{{ item.title }}</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          {{ item.description }}
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
                      {{ education.keyAchievements }}
                    </h4>
                  </div>

                  <div class="space-y-3 sm:space-y-4">
                    <div
                      v-for="(item, index) in keyAchievements"
                      :key="index"
                      class="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
                      :class="achievementClasses[index]"
                    >
                      <i
                        class="fas mt-1 text-sm sm:text-lg flex-shrink-0"
                        :class="achievementIcons[index]"
                      ></i>
                      <div class="min-w-0">
                        <span
                          class="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base"
                          >{{ item.title }}</span
                        >
                        <p
                          class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1"
                        >
                          {{ item.description }}
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
          {{ contact.title }}
          <span
            class="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent"
            >{{ $t("contact.lets") }}</span
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
            {{ contact.phone }}
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
          <p class="text-gray-400" v-html="contact.copyright"></p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import { computed } from "vue";

const colorMode = useColorMode();

// Translation computed properties
const hero = computed(() => ({
  title: $t("hero.title"),
  lastName: $t("hero.lastName"),
  subtitle: $t("hero.subtitle"),
  viewProjects: $t("hero.viewProjects"),
  downloadCV: $t("hero.downloadCV"),
}));

const about = computed(() => ({
  title: $t("about.title"),
  description1: $t("about.description1"),
  description2: $t("about.description2"),
  yearsExperience: $t("about.yearsExperience"),
  projectsCompleted: $t("about.projectsCompleted"),
  coreTechnologies: $t("about.coreTechnologies"),
}));

const skills = computed(() => ({
  title: $t("skills.title"),
  subtitle: $t("skills.subtitle"),
  frontendMobile: $t("skills.frontendMobile"),
  backend: $t("skills.backend"),
  devopsTools: $t("skills.devopsTools"),
  languages: $t("skills.languages"),
}));

const projects = computed(() => ({
  title: $t("projects.title"),
  seeAllProjects: $t("projects.seeAllProjects"),
  viewProject: $t("projects.viewProject"),
}));

const experience = computed(() => ({
  title: $t("experience.title"),
  comingSoon: $t("experience.comingSoon"),
}));

const education = computed(() => ({
  title: $t("education.title"),
  subtitle: $t("education.subtitle"),
  certification: $t("education.certification"),
  certificationSub: $t("education.certificationSub"),
  institution: $t("education.institution"),
  period: $t("education.period"),
  downloadCertificate: $t("education.downloadCertificate"),
  months: $t("education.months"),
  hours: $t("education.hours"),
  technologiesCount: $t("education.technologiesCount"),
  projectsCount: $t("education.projectsCount"),
  technicalCurriculum: $t("education.technicalCurriculum"),
  keyAchievements: $t("education.keyAchievements"),
}));

const contact = computed(() => ({
  title: $t("contact.title"),
  email: $t("contact.email"),
  phone: $t("contact.phone"),
  copyright: $t("contact.copyright"),
}));

// Skills data
const technologies = computed(() => [
  "JavaScript",
  "TypeScript",
  "Vue.js",
  "React",
  "Node.js",
  "Nuxt",
]);

const frontendSkills = computed(() => [
  { title: $t("skills.typescript"), description: $t("skills.typescriptDesc") },
  { title: $t("skills.react"), description: $t("skills.reactDesc") },
  { title: $t("skills.vue"), description: $t("skills.vueDesc") },
  {
    title: $t("skills.cssFrameworks"),
    description: $t("skills.cssFrameworksDesc"),
  },
  {
    title: $t("skills.responsiveDesign"),
    description: $t("skills.responsiveDesignDesc"),
  },
]);

const backendSkills = computed(() => [
  { title: $t("skills.nodejs"), description: $t("skills.nodejsDesc") },
  { title: $t("skills.mongodb"), description: $t("skills.mongodbDesc") },
  { title: $t("skills.directus"), description: $t("skills.directusDesc") },
  { title: $t("skills.restApis"), description: $t("skills.restApisDesc") },
]);

const devopsSkills = computed(() => [
  { title: $t("skills.cicd"), description: $t("skills.cicdDesc") },
  { title: $t("skills.docker"), description: $t("skills.dockerDesc") },
  { title: $t("skills.git"), description: $t("skills.gitDesc") },
  { title: $t("skills.agile"), description: $t("skills.agileDesc") },
]);

const languageSkills = computed(() => [
  { title: $t("skills.english"), level: $t("skills.englishLevel") },
  { title: $t("skills.german"), level: $t("skills.germanLevel") },
  { title: $t("skills.russian"), level: $t("skills.russianLevel") },
  { title: $t("skills.hebrew"), level: $t("skills.hebrewLevel") },
]);

// Education data
const technicalCurriculum = computed(() => [
  { title: $t("education.htmlCss"), description: $t("education.htmlCssDesc") },
  { title: $t("education.jsTs"), description: $t("education.jsTsDesc") },
  {
    title: $t("education.reactSkills"),
    description: $t("education.reactSkillsDesc"),
  },
  {
    title: $t("education.nodeSkills"),
    description: $t("education.nodeSkillsDesc"),
  },
  {
    title: $t("education.mongoSkills"),
    description: $t("education.mongoSkillsDesc"),
  },
  {
    title: $t("education.gitSkills"),
    description: $t("education.gitSkillsDesc"),
  },
]);

const keyAchievements = computed(() => [
  {
    title: $t("education.programExcellence"),
    description: $t("education.programExcellenceDesc"),
  },
  {
    title: $t("education.capstoneProject"),
    description: $t("education.capstoneProjectDesc"),
  },
  {
    title: $t("education.languageProficiency"),
    description: $t("education.languageProficiencyDesc"),
  },
  {
    title: $t("education.responsiveDesignEdu"),
    description: $t("education.responsiveDesignEduDesc"),
  },
  {
    title: $t("education.security"),
    description: $t("education.securityDesc"),
  },
  {
    title: $t("education.databaseDevelopment"),
    description: $t("education.databaseDevelopmentDesc"),
  },
]);

const achievementClasses = computed(() => [
  "bg-gradient-to-r from-amber-50 to-amber-100/50 dark:from-amber-900/10 dark:to-amber-800/10 border border-amber-200/50 dark:border-amber-700/30",
  "bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-900/10 dark:to-emerald-800/10 border border-emerald-200/50 dark:border-emerald-700/30",
  "bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/30",
  "bg-gradient-to-r from-rose-50 to-rose-100/50 dark:from-rose-900/10 dark:to-rose-800/10 border border-rose-200/50 dark:border-rose-700/30",
  "bg-gradient-to-r from-violet-50 to-violet-100/50 dark:from-violet-900/10 dark:to-violet-800/10 border border-violet-200/50 dark:border-violet-700/30",
  "bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-indigo-900/10 dark:to-indigo-800/10 border border-indigo-200/50 dark:border-indigo-700/30",
]);

const achievementIcons = computed(() => [
  "fa-star text-amber-500",
  "fa-project-diagram text-emerald-500",
  "fa-language text-blue-500",
  "fa-mobile-alt text-rose-500",
  "fa-shield-alt text-violet-500",
  "fa-database text-indigo-500",
]);

// Featured projects data
const featuredProjects = computed(() => [
  {
    id: 1,
    title: $t("projects.sunlitTales.title"),
    description: $t("projects.sunlitTales.description"),
    image: "/sunlit.jpeg",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity"],
    link: "https://sunlit-tales.netlify.app/",
  },
  {
    id: 2,
    title: $t("projects.psyBlog.title"),
    description: $t("projects.psyBlog.description"),
    image: "/psy.jpeg",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://psy-blog.netlify.app/",
  },
  {
    id: 3,
    title: $t("projects.portfolio.title"),
    description: $t("projects.portfolio.description"),
    image: "/portfolio.jpeg",
    technologies: ["Nuxt", "Tailwind CSS", "TypeScript"],
    link: "#",
  },
]);

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
