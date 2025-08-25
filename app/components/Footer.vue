<template>
  <footer
    id="contact"
    class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 overflow-hidden"
  >
    <!-- Background elements -->
    <div
      class="absolute top-10 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"
    ></div>

    <div class="max-w-7xl mx-auto px-4 text-center relative z-10">
      <!-- Enhanced Header -->
      <div class="mb-12 group pt-8">
        <h2 class="text-3xl md:text-5xl font-black mb-8">
          Let's
          <span
            class="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent relative"
          >
            Connect
            <!-- Animated underline -->
            <div
              class="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-teal-400/40 to-purple-400/40 rounded-full group-hover:from-teal-400/70 group-hover:to-purple-400/70 transition-all duration-300"
            ></div>
          </span>
        </h2>
        <div
          class="w-24 h-1 bg-gradient-to-r from-teal-500 to-purple-600 mx-auto rounded-full group-hover:w-32 group-hover:h-1.5 transition-all duration-500"
        ></div>
      </div>

      <!-- Enhanced Contact Information -->
      <div
        class="flex flex-col md:flex-row justify-center items-center gap-8 mb-12"
      >
        <!-- Email Contact -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full p-[1px] group-hover:p-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <div class="bg-gray-800 rounded-full h-full w-full"></div>
          </div>

          <a
            href="mailto:vilenskyigal@gmail.com"
            class="relative z-10 group/email flex items-center gap-3 text-lg hover:text-teal-400 transition-all duration-300 px-6 py-3 rounded-full hover:bg-teal-500/10"
          >
            <div class="relative">
              <i
                class="fas fa-envelope text-2xl group-hover/email:animate-bounce transition-colors duration-300"
              ></i>
              <!-- Icon accent -->
              <div
                class="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full opacity-0 group-hover/email:opacity-100 transition-all duration-300"
              ></div>
            </div>
            <span
              class="group-hover/email:tracking-wide transition-all duration-300"
            >
              vilenskyigal@gmail.com
            </span>
          </a>
        </div>

        <!-- Phone Contact -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full p-[1px] group-hover:p-[2px] transition-all duration-300 opacity-0 group-hover:opacity-100"
          >
            <div class="bg-gray-800 rounded-full h-full w-full"></div>
          </div>

          <a
            href="tel:+491783099433"
            class="relative z-10 group/phone flex items-center gap-3 text-lg hover:text-purple-400 transition-all duration-300 px-6 py-3 rounded-full hover:bg-purple-500/10"
          >
            <div class="relative">
              <i
                class="fas fa-phone text-2xl group-hover/phone:animate-pulse transition-colors duration-300"
              ></i>
              <!-- Icon accent -->
              <div
                class="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-0 group-hover/phone:opacity-100 transition-all duration-300"
              ></div>
            </div>
            <span
              class="group-hover/phone:tracking-wide transition-all duration-300"
            >
              +49 1783099433
            </span>
          </a>
        </div>
      </div>

      <!-- Enhanced Social Links -->
      <div class="flex justify-center gap-6 mb-12">
        <!-- LinkedIn -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
          >
            <div class="bg-gray-800 rounded-full h-full w-full"></div>
          </div>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/igalvilensky/"
            class="relative z-10 w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-500 group/social"
          >
            <i
              class="fab fa-linkedin text-xl group-hover/social:text-white transition-colors duration-300"
            ></i>
          </a>

          <!-- Floating accent -->
          <div
            class="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-teal-200 to-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
          ></div>
        </div>

        <!-- GitHub -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
          >
            <div class="bg-gray-800 rounded-full h-full w-full"></div>
          </div>

          <a
            target="_blank"
            href="https://github.com/igalVilensky"
            class="relative z-10 w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-500 group/social"
          >
            <i
              class="fab fa-github text-xl group-hover/social:text-white transition-colors duration-300"
            ></i>
          </a>

          <!-- Floating accent -->
          <div
            class="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-purple-200 to-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
          ></div>
        </div>

        <!-- Facebook -->
        <div class="relative group">
          <!-- Gradient border frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300"
          >
            <div class="bg-gray-800 rounded-full h-full w-full"></div>
          </div>

          <a
            target="_blank"
            href="https://www.facebook.com/afawefaw4496546464/"
            class="relative z-10 w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-500 group/social"
          >
            <i
              class="fab fa-facebook text-xl group-hover/social:text-white transition-colors duration-300"
            ></i>
          </a>

          <!-- Floating accent -->
          <div
            class="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-teal-200 via-purple-200 to-white rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"
          ></div>
        </div>
      </div>

      <!-- Enhanced Footer Bottom -->
      <div class="relative">
        <!-- Gradient border line -->
        <div
          class="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"
        ></div>

        <div class="relative group">
          <!-- Subtle background frame -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
          ></div>

          <p
            class="relative z-10 text-gray-400 group-hover:text-gray-300 transition-colors duration-300 py-4"
          >
            &copy; 2025 Igal Vilensky.
            <span class="inline-flex items-center gap-1">
              Crafted with
              <span class="text-red-400 animate-pulse">❤️</span>
              and lots of
              <span class="text-yellow-400 group-hover:animate-bounce">☕</span>
            </span>
          </p>
        </div>
      </div>

      <!-- Subtle background pattern -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          class="absolute inset-0 bg-gradient-to-br from-teal-500 to-purple-600"
        ></div>
      </div>
    </div>
  </footer>
</template>
