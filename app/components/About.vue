<template>
  <section
    id="about"
    class="relative transition-colors duration-300"
    :class="
      colorMode.value === 'dark'
        ? 'bg-[#0D0F12]'
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    "
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold mb-4"
          :class="
            colorMode.value === 'dark'
              ? 'text-white'
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent'
          "
        >
          {{ $t("about.title") }}
          <span
            :class="
              colorMode.value === 'dark' ? 'text-[#809FFF]' : 'text-blue-600'
            "
          >
            {{ $t("about.me") }}
          </span>
        </h2>
        <div
          class="w-24 h-1 mx-auto rounded-full mb-6"
          :class="
            colorMode.value === 'dark'
              ? 'bg-gradient-to-r from-[#809FFF] to-[#F41A81]'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          "
        ></div>
        <p
          class="text-lg max-w-3xl mx-auto leading-relaxed"
          :class="
            colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
          "
        >
          {{ $t("about.subtitle") }}
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <!-- Main Content - 2/3 width -->
        <div class="lg:col-span-2 space-y-6">
          <!-- About Me Cards -->
          <div class="grid gap-6">
            <!-- Introduction Card -->
            <div
              class="rounded-xl border p-6 cursor-pointer transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-[#1B2432] border-[#809FFF]/20 text-slate-300'
                  : 'bg-white border-slate-200/50 text-slate-700'
              "
              @click="openModal('introduction')"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-[#809FFF]/20'
                        : 'bg-blue-100'
                    "
                  >
                    <i
                      class="fas fa-user text-lg"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#809FFF]'
                          : 'text-blue-600'
                      "
                    ></i>
                  </div>
                  <h3
                    class="text-xl font-semibold"
                    :class="
                      colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                    "
                  >
                    {{ $t("about.personalTitle") }}
                  </h3>
                </div>
                <i
                  class="fas fa-chevron-right transition-transform duration-300"
                  :class="
                    activeModal === 'introduction' ? 'rotate-90' : 'rotate-0'
                  "
                ></i>
              </div>
              <p class="leading-relaxed line-clamp-2">
                {{ $t("about.personalDesc1") }}
              </p>
            </div>

            <!-- Journey Card -->
            <div
              class="rounded-xl border p-6 cursor-pointer transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-[#1B2432] border-[#F41A81]/20 text-slate-300'
                  : 'bg-white border-slate-200/50 text-slate-700'
              "
              @click="openModal('journey')"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-[#F41A81]/20'
                        : 'bg-purple-100'
                    "
                  >
                    <i
                      class="fas fa-route text-lg"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#F41A81]'
                          : 'text-purple-600'
                      "
                    ></i>
                  </div>
                  <h3
                    class="text-xl font-semibold"
                    :class="
                      colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                    "
                  >
                    {{ $t("about.journeyTitle") }}
                  </h3>
                </div>
                <i
                  class="fas fa-chevron-right transition-transform duration-300"
                  :class="activeModal === 'journey' ? 'rotate-90' : 'rotate-0'"
                ></i>
              </div>
              <p class="leading-relaxed line-clamp-2">
                {{ $t("about.personalDesc2") }}
              </p>
            </div>

            <!-- Beyond Code Card -->
            <div
              class="rounded-xl border p-6 cursor-pointer transition-all duration-300"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-[#1B2432] border-[#809FFF]/20 text-slate-300'
                  : 'bg-white border-slate-200/50 text-slate-700'
              "
              @click="openModal('beyondCode')"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-gradient-to-br from-[#809FFF]/20 to-[#F41A81]/20'
                        : 'bg-gradient-to-br from-cyan-100 to-blue-100'
                    "
                  >
                    <i
                      class="fas fa-heart text-lg"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#F41A81]'
                          : 'text-cyan-600'
                      "
                    ></i>
                  </div>
                  <h3
                    class="text-xl font-semibold"
                    :class="
                      colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                    "
                  >
                    {{ $t("about.beyondCodeTitle") }}
                  </h3>
                </div>
                <i
                  class="fas fa-chevron-right transition-transform duration-300"
                  :class="
                    activeModal === 'beyondCode' ? 'rotate-90' : 'rotate-0'
                  "
                ></i>
              </div>
              <p class="leading-relaxed line-clamp-2">
                {{ $t("about.personalDesc3") }}
              </p>
            </div>
          </div>

          <!-- My Skills -->
          <div
            class="rounded-xl border p-6 cursor-pointer transition-all duration-300"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20 text-slate-300'
                : 'bg-white border-slate-200/50 text-slate-700'
            "
            @click="openModal('skills')"
          >
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-xl font-semibold"
                :class="
                  colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                "
              >
                {{ $t("about.skillsTitle") }}
              </h3>
              <i
                class="fas fa-chevron-right transition-transform duration-300"
                :class="activeModal === 'skills' ? 'rotate-90' : 'rotate-0'"
              ></i>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <i
                  class="fas fa-laptop-code text-2xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#809FFF]'
                      : 'text-blue-600'
                  "
                ></i>
                <p class="text-sm">{{ $t("skills.frontendMobile") }}</p>
              </div>
              <div class="text-center">
                <i
                  class="fas fa-server text-2xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#F41A81]'
                      : 'text-green-600'
                  "
                ></i>
                <p class="text-sm">{{ $t("skills.backend") }}</p>
              </div>
              <div class="text-center">
                <i
                  class="fas fa-tools text-2xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#809FFF]'
                      : 'text-purple-600'
                  "
                ></i>
                <p class="text-sm">{{ $t("skills.devopsTools") }}</p>
              </div>
              <div class="text-center">
                <i
                  class="fas fa-language text-2xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#F41A81]'
                      : 'text-orange-600'
                  "
                ></i>
                <p class="text-sm">{{ $t("skills.languages") }}</p>
              </div>
            </div>
          </div>

          <!-- Current Focus & Interests -->
          <div
            class="rounded-xl border p-6 cursor-pointer transition-all duration-300"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20 text-slate-300'
                : 'bg-white border-slate-200/50 text-slate-700'
            "
            @click="openModal('focus')"
          >
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-xl font-semibold"
                :class="
                  colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                "
              >
                {{ $t("about.exploringTitle") }}
              </h3>
              <i
                class="fas fa-chevron-right transition-transform duration-300"
                :class="activeModal === 'focus' ? 'rotate-90' : 'rotate-0'"
              ></i>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <i
                  class="fas fa-book text-2xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#809FFF]'
                      : 'text-blue-600'
                  "
                ></i>
                <p class="text-sm">{{ $t("about.currentlyLearning") }}</p>
              </div>
              <div class="text-center">
                <i
                  class="fas fa-lightbulb text-2xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#F41A81]'
                      : 'text-green-600'
                  "
                ></i>
                <p class="text-sm">{{ $t("about.areasOfInterest") }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar - 1/3 width -->
        <div class="space-y-6">
          <!-- Personal Tidbits -->
          <div
            class="rounded-xl border p-6 cursor-pointer transition-all duration-300"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20 text-slate-300'
                : 'bg-white border-slate-200/50 text-slate-700'
            "
            @click="openModal('tidbits')"
          >
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-lg font-semibold"
                :class="
                  colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                "
              >
                {{ $t("about.funFactsTitle") }}
              </h3>
              <i
                class="fas fa-chevron-right transition-transform duration-300"
                :class="activeModal === 'tidbits' ? 'rotate-90' : 'rotate-0'"
              ></i>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="text-center">
                <i
                  class="fas fa-film text-xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#F41A81]'
                      : 'text-purple-600'
                  "
                ></i>
                <p class="text-xs">{{ $t("about.funFactActing") }}</p>
              </div>
              <div class="text-center">
                <i
                  class="fas fa-snowflake text-xl mb-2"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-[#809FFF]'
                      : 'text-blue-600'
                  "
                ></i>
                <p class="text-xs">{{ $t("about.funFactYamalo") }}</p>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div
            class="rounded-xl border p-6"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20'
                : 'bg-white border-slate-200/50'
            "
          >
            <h3
              class="text-lg font-semibold mb-4"
              :class="
                colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
              "
            >
              {{ $t("about.connectTitle") }}
            </h3>
            <div class="flex items-center space-x-3 mb-3">
              <div
                class="w-3 h-3 rounded-full animate-pulse"
                :class="
                  colorMode.value === 'dark' ? 'bg-[#F41A81]' : 'bg-green-500'
                "
              ></div>
              <span
                class="text-sm font-medium"
                :class="
                  colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                "
                >{{ $t("about.available") }}</span
              >
            </div>
            <p
              class="text-xs mb-4"
              :class="
                colorMode.value === 'dark' ? 'text-slate-400' : 'text-slate-600'
              "
            >
              {{ $t("about.availableDesc") }}
            </p>
            <button
              @click="scrollToContact"
              class="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
              :class="
                colorMode.value === 'dark'
                  ? 'bg-[#809FFF]/20 text-[#809FFF] hover:bg-[#809FFF]/30'
                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
              "
            >
              {{ $t("contact.getInTouch") }}
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal Overlay -->
      <Transition name="modal">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          @click="closeModal"
        >
          <div
            class="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl border"
            :class="
              colorMode.value === 'dark'
                ? 'bg-[#1B2432] border-[#809FFF]/20 text-slate-300'
                : 'bg-white border-slate-200/50 text-slate-700'
            "
            @click.stop
          >
            <button
              @click="closeModal"
              class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
              :class="
                colorMode.value === 'dark'
                  ? 'hover:bg-[#809FFF]/20 text-slate-300'
                  : 'hover:bg-blue-100 text-slate-700'
              "
            >
              <i class="fas fa-times"></i>
            </button>

            <div class="p-6">
              <!-- Modal content based on activeModal -->
              <div v-if="activeModal === 'introduction'">
                <div class="flex items-center mb-4">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-[#809FFF]/20'
                        : 'bg-blue-100'
                    "
                  >
                    <i
                      class="fas fa-hand-wave text-lg"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#809FFF]'
                          : 'text-blue-600'
                      "
                    ></i>
                  </div>
                  <h3
                    class="text-xl font-semibold"
                    :class="
                      colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                    "
                  >
                    {{ $t("about.personalTitle") }}
                  </h3>
                </div>
                <p class="leading-relaxed mb-4">
                  {{ $t("about.personalDesc1") }}
                </p>
              </div>

              <div v-if="activeModal === 'journey'">
                <div class="flex items-center mb-4">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-[#F41A81]/20'
                        : 'bg-purple-100'
                    "
                  >
                    <i
                      class="fas fa-route text-lg"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#F41A81]'
                          : 'text-purple-600'
                      "
                    ></i>
                  </div>
                  <h3
                    class="text-xl font-semibold"
                    :class="
                      colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                    "
                  >
                    {{ $t("about.journeyTitle") }}
                  </h3>
                </div>
                <p class="leading-relaxed mb-4">
                  {{ $t("about.personalDesc2") }}
                </p>
              </div>

              <div v-if="activeModal === 'beyondCode'">
                <div class="flex items-center mb-4">
                  <div
                    class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                    :class="
                      colorMode.value === 'dark'
                        ? 'bg-gradient-to-br from-[#809FFF]/20 to-[#F41A81]/20'
                        : 'bg-gradient-to-br from-cyan-100 to-blue-100'
                    "
                  >
                    <i
                      class="fas fa-heart text-lg"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#F41A81]'
                          : 'text-cyan-600'
                      "
                    ></i>
                  </div>
                  <h3
                    class="text-xl font-semibold"
                    :class="
                      colorMode.value === 'dark'
                        ? 'text-white'
                        : 'text-slate-900'
                    "
                  >
                    {{ $t("about.beyondCodeTitle") }}
                  </h3>
                </div>
                <p class="leading-relaxed mb-4">
                  {{ $t("about.personalDesc3") }}
                </p>
              </div>

              <div v-if="activeModal === 'skills'">
                <h3
                  class="text-xl font-semibold mb-6"
                  :class="
                    colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                  "
                >
                  {{ $t("about.skillsTitle") }}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- Frontend & Mobile -->
                  <div>
                    <div class="flex items-center mb-4">
                      <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                        :class="
                          colorMode.value === 'dark'
                            ? 'bg-[#809FFF]/20'
                            : 'bg-blue-100'
                        "
                      >
                        <i
                          class="fas fa-laptop-code"
                          :class="
                            colorMode.value === 'dark'
                              ? 'text-[#809FFF]'
                              : 'text-blue-600'
                          "
                        ></i>
                      </div>
                      <h4
                        class="text-base font-semibold"
                        :class="
                          colorMode.value === 'dark'
                            ? 'text-white'
                            : 'text-slate-900'
                        "
                      >
                        {{ $t("skills.frontendMobile") }}
                      </h4>
                    </div>
                    <ul
                      class="space-y-2 text-sm"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
                    >
                      <li
                        v-for="(skill, index) in frontendSkills"
                        :key="index"
                        class="flex items-start space-x-2"
                      >
                        <i
                          :class="getSkillIcon(skill.title)"
                          class="w-4 h-4 mt-0.5"
                          :style="{
                            color:
                              colorMode.value === 'dark'
                                ? '#809FFF'
                                : 'rgb(59, 130, 246)',
                          }"
                        ></i>
                        <span>{{ skill.title }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Backend -->
                  <div>
                    <div class="flex items-center mb-4">
                      <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                        :class="
                          colorMode.value === 'dark'
                            ? 'bg-[#F41A81]/20'
                            : 'bg-green-100'
                        "
                      >
                        <i
                          class="fas fa-server"
                          :class="
                            colorMode.value === 'dark'
                              ? 'text-[#F41A81]'
                              : 'text-green-600'
                          "
                        ></i>
                      </div>
                      <h4
                        class="text-base font-semibold"
                        :class="
                          colorMode.value === 'dark'
                            ? 'text-white'
                            : 'text-slate-900'
                        "
                      >
                        {{ $t("skills.backend") }}
                      </h4>
                    </div>
                    <ul
                      class="space-y-2 text-sm"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
                    >
                      <li
                        v-for="(skill, index) in backendSkills"
                        :key="index"
                        class="flex items-start space-x-2"
                      >
                        <i
                          :class="getSkillIcon(skill.title)"
                          class="w-4 h-4 mt-0.5"
                          :style="{
                            color:
                              colorMode.value === 'dark'
                                ? '#F41A81'
                                : 'rgb(34, 197, 94)',
                          }"
                        ></i>
                        <span>{{ skill.title }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- DevOps & Tools -->
                  <div>
                    <div class="flex items-center mb-4">
                      <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                        :class="
                          colorMode.value === 'dark'
                            ? 'bg-gradient-to-br from-[#809FFF]/20 to-[#F41A81]/20'
                            : 'bg-purple-100'
                        "
                      >
                        <i
                          class="fas fa-tools"
                          :class="
                            colorMode.value === 'dark'
                              ? 'text-[#809FFF]'
                              : 'text-purple-600'
                          "
                        ></i>
                      </div>
                      <h4
                        class="text-base font-semibold"
                        :class="
                          colorMode.value === 'dark'
                            ? 'text-white'
                            : 'text-slate-900'
                        "
                      >
                        {{ $t("skills.devopsTools") }}
                      </h4>
                    </div>
                    <ul
                      class="space-y-2 text-sm"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
                    >
                      <li
                        v-for="(skill, index) in devopsSkills"
                        :key="index"
                        class="flex items-start space-x-2"
                      >
                        <i
                          :class="getSkillIcon(skill.title)"
                          class="w-4 h-4 mt-0.5"
                          :style="{
                            color:
                              colorMode.value === 'dark'
                                ? '#809FFF'
                                : 'rgb(147, 51, 234)',
                          }"
                        ></i>
                        <span>{{ skill.title }}</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Languages -->
                  <div>
                    <div class="flex items-center mb-4">
                      <div
                        class="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                        :class="
                          colorMode.value === 'dark'
                            ? 'bg-[#F41A81]/20'
                            : 'bg-orange-100'
                        "
                      >
                        <i
                          class="fas fa-language"
                          :class="
                            colorMode.value === 'dark'
                              ? 'text-[#F41A81]'
                              : 'text-orange-600'
                          "
                        ></i>
                      </div>
                      <h4
                        class="text-base font-semibold"
                        :class="
                          colorMode.value === 'dark'
                            ? 'text-white'
                            : 'text-slate-900'
                        "
                      >
                        {{ $t("skills.languages") }}
                      </h4>
                    </div>
                    <ul
                      class="space-y-2 text-sm"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
                    >
                      <li
                        v-for="(language, index) in languageSkills"
                        :key="index"
                        class="flex items-start space-x-2"
                      >
                        <i
                          class="fas fa-globe w-4 h-4 mt-0.5"
                          :style="{
                            color:
                              colorMode.value === 'dark'
                                ? '#F41A81'
                                : 'rgb(234, 88, 12)',
                          }"
                        ></i>
                        <span>{{ $t(`skills.${language.titleKey}`) }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div v-if="activeModal === 'focus'">
                <h3
                  class="text-xl font-semibold mb-6"
                  :class="
                    colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                  "
                >
                  {{ $t("about.exploringTitle") }}
                </h3>
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4
                      class="text-base font-semibold mb-3 flex items-center"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-white'
                          : 'text-slate-900'
                      "
                    >
                      <div
                        class="w-2 h-2 rounded-full mr-2 animate-pulse"
                        :class="
                          colorMode.value === 'dark'
                            ? 'bg-[#809FFF]'
                            : 'bg-blue-600'
                        "
                      ></div>
                      {{ $t("about.currentlyLearning") }}
                    </h4>
                    <ul
                      class="space-y-2 text-sm"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
                    >
                      <li
                        v-for="item in currentlyLearning"
                        :key="item"
                        class="flex items-center space-x-2"
                      >
                        <div
                          class="w-2 h-2 rounded-full animate-pulse"
                          :class="
                            colorMode.value === 'dark'
                              ? 'bg-[#809FFF]'
                              : 'bg-blue-600'
                          "
                        ></div>
                        <span>{{ item }}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4
                      class="text-base font-semibold mb-3 flex items-center"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-white'
                          : 'text-slate-900'
                      "
                    >
                      <div
                        class="w-2 h-2 rounded-full mr-2"
                        :class="
                          colorMode.value === 'dark'
                            ? 'bg-[#F41A81]'
                            : 'bg-green-600'
                        "
                      ></div>
                      {{ $t("about.areasOfInterest") }}
                    </h4>
                    <ul
                      class="space-y-2 text-sm"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      "
                    >
                      <li
                        v-for="interest in interests"
                        :key="interest"
                        class="flex items-center space-x-2"
                      >
                        <div
                          class="w-2 h-2 rounded-full"
                          :class="
                            colorMode.value === 'dark'
                              ? 'bg-[#F41A81]'
                              : 'bg-green-600'
                          "
                        ></div>
                        <span>{{ interest }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div v-if="activeModal === 'tidbits'">
                <h3
                  class="text-lg font-semibold mb-4"
                  :class="
                    colorMode.value === 'dark' ? 'text-white' : 'text-slate-900'
                  "
                >
                  {{ $t("about.funFactsTitle") }}
                </h3>
                <div
                  class="space-y-3 text-sm"
                  :class="
                    colorMode.value === 'dark'
                      ? 'text-slate-400'
                      : 'text-slate-600'
                  "
                >
                  <div class="flex items-baseline space-x-3">
                    <i
                      class="fas fa-film w-4"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#F41A81]'
                          : 'text-purple-600'
                      "
                    ></i>
                    <span>{{ $t("about.funFactActing") }}</span>
                  </div>
                  <div class="flex items-baseline space-x-3">
                    <i
                      class="fas fa-snowflake w-4"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#809FFF]'
                          : 'text-blue-600'
                      "
                    ></i>
                    <span>{{ $t("about.funFactYamalo") }}</span>
                  </div>
                  <div class="flex items-baseline space-x-3">
                    <i
                      class="fas fa-users w-4"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#F41A81]'
                          : 'text-purple-600'
                      "
                    ></i>
                    <span>{{ $t("about.funFactBrothers") }}</span>
                  </div>
                  <div class="flex items-baseline space-x-3">
                    <i
                      class="fas fa-music w-4"
                      :class="
                        colorMode.value === 'dark'
                          ? 'text-[#809FFF]'
                          : 'text-blue-600'
                      "
                    ></i>
                    <span>{{ $t("about.funFactPiano") }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useColorMode } from "#imports";

// Color mode
const colorMode = useColorMode();

// Modal state
const showModal = ref(false);
const activeModal = ref<string | null>(null);

// Initialize isDesktop safely
const isDesktop = ref(process.client ? window.innerWidth >= 1024 : false);

// Update isDesktop on window resize
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  if (process.client) {
    isDesktop.value = window.innerWidth >= 1024;
    window.addEventListener("resize", handleResize);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", handleResize);
  }
});

// Frontend skills
const frontendSkills = [
  { title: "TypeScript / JavaScript" },
  { title: "React / React Native" },
  { title: "Vue.js / Nuxt.js" },
  { title: "CSS Frameworks" },
  { title: "Responsive Design" },
];

// Backend skills
const backendSkills = [
  { title: "Node.js / Express.js" },
  { title: "MongoDB / Mongoose" },
  { title: "Directus CMS" },
  { title: "REST APIs" },
];

// DevOps skills
const devopsSkills = [
  { title: "CI/CD Pipelines" },
  { title: "Docker" },
  { title: "Git / GitHub" },
  { title: "Agile & Scrum" },
];

// Language skills
const languageSkills = [
  { titleKey: "english", levelKey: "englishLevel" },
  { titleKey: "german", levelKey: "germanLevel" },
  { titleKey: "russian", levelKey: "russianLevel" },
  { titleKey: "hebrew", levelKey: "hebrewLevel" },
];

// Currently learning
const currentlyLearning = [
  "AWS Cloud Architecture",
  "Kubernetes",
  "GraphQL",
  "Rust Programming",
];

// Areas of interest
const interests = [
  "Machine Learning",
  "Web3 Technologies",
  "Performance Optimization",
  "Developer Experience",
];

// Get skill icon based on skill name
const getSkillIcon = (skill: string): string => {
  const icons: Record<string, string> = {
    "TypeScript / JavaScript": "fab fa-js-square",
    "React / React Native": "fab fa-react",
    "Vue.js / Nuxt.js": "fab fa-vuejs",
    "CSS Frameworks": "fas fa-paint-brush",
    "Responsive Design": "fas fa-mobile-alt",
    "Node.js / Express.js": "fab fa-node-js",
    "MongoDB / Mongoose": "fas fa-database",
    "Directus CMS": "fas fa-cogs",
    "REST APIs": "fas fa-exchange-alt",
    "CI/CD Pipelines": "fas fa-tools",
    Docker: "fab fa-docker",
    "Git / GitHub": "fab fa-github",
    "Agile & Scrum": "fas fa-users",
  };
  return icons[skill] || "fas fa-code";
};

// Modal controls
const openModal = (modalType: string) => {
  activeModal.value = modalType;
  showModal.value = true;
};

const closeModal = () => {
  activeModal.value = null;
  showModal.value = false;
};

// Smooth scroll to contact section
const scrollToContact = () => {
  const contactElement = document.getElementById("contact");
  if (contactElement) {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.offsetHeight || 64;
    const elementPosition = contactElement.offsetTop - navbarHeight - 20;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}

/* Custom animations for enhanced UX */
@keyframes pulse-glow {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Smooth transitions for all interactive elements */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced focus styles for accessibility */
button:focus-visible {
  outline: 2px solid;
  outline-offset: 2px;
  border-radius: 8px;
}

/* Custom backdrop blur fallback */
@supports not (backdrop-filter: blur(12px)) {
  .backdrop-blur-lg {
    background-color: rgba(27, 36, 50, 0.95);
  }
}

/* Dark mode transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease;
}
</style>
