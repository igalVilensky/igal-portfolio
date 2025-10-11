<template>
  <section
    class="relative min-h-screen overflow-hidden transition-all duration-500 -mb-12"
    :style="{
      background: isCustomized
        ? isDarkMode
          ? currentTheme.darkBackground
          : currentTheme.lightBackground
        : isDarkMode
        ? 'linear-gradient(135deg, #0D0F12 0%, #1B2432 50%, #0D0F12 100%)'
        : 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, #dbeafe 100%)',
      '--primary-color': currentTheme.primary,
      '--secondary-color': currentTheme.secondary,
      '--accent-color': currentTheme.accent,
    }"
    @mousemove="handleMouseMove"
    @scroll="handleScroll"
  >
    <Orb stage="contact" />

    <!-- Interactive Control Panel -->
    <div
      class="fixed top-20 right-4 z-50 transition-all duration-300"
      :class="{ 'translate-x-full': !showControls }"
    >
      <button
        @click="toggleControls"
        class="absolute -left-12 top-4 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-l-xl shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
        :style="{ color: currentTheme.primary }"
      >
        <i
          :class="showControls ? 'fas fa-times' : 'fas fa-cog'"
          class="text-lg"
        ></i>
      </button>

      <div
        class="w-72 max-h-[calc(100vh-6rem)] bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 overflow-y-auto sm:overflow-y-visible"
      >
        <h3
          class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center"
        >
          <i
            class="fas fa-palette mr-2"
            :style="{ color: currentTheme.primary }"
          ></i>
          Interactive Controls
        </h3>

        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Color Theme</label
          >
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="(theme, key) in themes"
              :key="key"
              @click="setTheme(theme)"
              class="h-12 rounded-lg border-2 hover:scale-105 transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
              :class="
                currentTheme === theme
                  ? 'border-gray-800 dark:border-white shadow-lg'
                  : 'border-gray-200 dark:border-gray-600'
              "
              :style="{
                background: `linear-gradient(45deg, ${theme.primary}, ${theme.secondary})`,
              }"
            >
              <span class="sr-only">{{ key }} theme</span>
            </button>
          </div>
        </div>

        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Animation Speed: {{ animationSpeed }}x
          </label>
          <input
            v-model="animationSpeed"
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
            :style="{
              background: `linear-gradient(to right, ${
                currentTheme.primary
              } 0%, ${currentTheme.primary} ${
                ((animationSpeed - 0.5) / 2.5) * 100
              }%, #e5e7eb ${
                ((animationSpeed - 0.5) / 2.5) * 100
              }%, #e5e7eb 100%)`,
            }"
          />
        </div>

        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Floating Elements: {{ particleCount }}
          </label>
          <input
            v-model="particleCount"
            type="range"
            min="3"
            max="20"
            step="1"
            class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
            :style="{
              background: `linear-gradient(to right, ${
                currentTheme.secondary
              } 0%, ${currentTheme.secondary} ${
                ((particleCount - 3) / 17) * 100
              }%, #e5e7eb ${((particleCount - 3) / 17) * 100}%, #e5e7eb 100%)`,
            }"
          />
        </div>

        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Interactive Effects</label
          >
          <div class="space-y-2">
            <label class="flex items-center space-x-2">
              <input
                v-model="enableMouseTrail"
                type="checkbox"
                class="h-4 w-4 text-[var(--primary-color)] rounded focus:ring-[var(--primary-color)]"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300"
                >Mouse Trail</span
              >
            </label>
            <label v-if="isDesktop" class="flex items-center space-x-2">
              <input
                v-model="enableParallax"
                type="checkbox"
                class="h-4 w-4 text-[var(--primary-color)] rounded focus:ring-[var(--primary-color)]"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300"
                >Parallax Effects</span
              >
            </label>
            <label class="flex items-center space-x-2">
              <input
                v-model="enableMusicVisualizer"
                type="checkbox"
                class="h-4 w-4 text-[var(--primary-color)] rounded focus:ring-[var(--primary-color)]"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300"
                >Music Visualizer</span
              >
            </label>
          </div>
        </div>

        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Fun Effects</label
          >
          <div class="space-y-2">
            <button
              @click="triggerEffect('shake')"
              class="w-full py-2 px-4 rounded-lg font-medium text-white hover:scale-105 transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
              :style="{
                background: `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              }"
            >
              <i class="fas fa-bolt mr-2"></i> Shake Effect
            </button>
            <button
              @click="triggerEffect('rainbow')"
              class="w-full py-2 px-4 rounded-lg font-medium text-white hover:scale-105 transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
              :style="{
                background: `linear-gradient(45deg, ${currentTheme.secondary}, ${currentTheme.accent})`,
              }"
            >
              <i class="fas fa-rainbow mr-2"></i> Rainbow Mode
            </button>
          </div>
        </div>

        <button
          @click="resetSettings"
          class="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
        >
          <i class="fas fa-undo mr-2"></i> Reset to Default
        </button>
      </div>
    </div>

    <!-- Music Visualizer -->
    <div
      v-if="enableMusicVisualizer && !prefersReducedMotion"
      class="fixed bottom-4 left-4 z-40 flex flex-col items-center space-y-1 opacity-50 hover:opacity-100 transition-opacity duration-300"
    >
      <div
        v-for="i in 8"
        :key="`bar-${i}`"
        class="w-8 h-8 bg-[var(--primary-color)] rounded"
        :style="{
          height: `${Math.sin(Date.now() / 400 + i * 0.5) * 10 + 20}px`,
          animation: `visualizer ${1.5 / animationSpeed}s ease-in-out infinite`,
          animationDelay: `${i * 0.1}s`,
        }"
      ></div>
    </div>

    <!-- Click Effect Canvas -->
    <canvas
      ref="clickCanvas"
      @click="createClickEffect"
      class="absolute inset-0 pointer-events-none"
      :class="{ 'pointer-events-auto': enableMouseTrail }"
    ></canvas>

    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-br opacity-20"
        :class="{ 'parallax-bg': enableParallax && !prefersReducedMotion }"
        :style="{
          background: isCustomized
            ? `radial-gradient(circle at center, ${currentTheme.accent}33, transparent 70%)`
            : isDarkMode
            ? 'radial-gradient(circle at center, #00D4FF33, transparent 70%)'
            : 'radial-gradient(circle at center, #3B82F633, transparent 70%)',
          transform:
            enableParallax && !prefersReducedMotion
              ? `translate(${parallaxOffset.x * 0.5}px, ${
                  parallaxOffset.y * 0.5 + scrollOffset * 0.1
                }px) scale(1.2)`
              : 'none',
          willChange: 'transform',
        }"
      ></div>

      <div
        class="absolute inset-0 opacity-30"
        :class="{ 'parallax-mid': enableParallax && !prefersReducedMotion }"
        :style="{
          background: isCustomized
            ? `radial-gradient(circle at 30% 30%, ${currentTheme.secondary}20, transparent 60%)`
            : isDarkMode
            ? 'radial-gradient(circle at 30% 30%, #F41A8120, transparent 60%)'
            : 'radial-gradient(circle at 30% 30%, #EC489920, transparent 60%)',
          transform:
            enableParallax && !prefersReducedMotion
              ? `translate(${parallaxOffset.x * 1.5}px, ${
                  parallaxOffset.y * 1.5 + scrollOffset * 0.3
                }px) scale(1.1)`
              : 'none',
          willChange: 'transform',
        }"
      ></div>

      <div
        v-for="i in computedParticleCount"
        :key="`particle-${i}`"
        class="absolute rounded-full blur-xl transition-all duration-1000"
        :class="[
          `animate-float-${i % 3}`,
          { 'animate-shake': shakeEffect && !prefersReducedMotion },
          { 'animate-rainbow': rainbowEffect && !prefersReducedMotion },
          { 'parallax-fg': enableParallax && !prefersReducedMotion },
        ]"
        :style="{
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 80 + 10}%`,
          width: `${Math.random() * (40 + particleCount * 4) + 20}px`,
          height: `${Math.random() * (40 + particleCount * 4) + 20}px`,
          background: isCustomized
            ? `linear-gradient(45deg, ${currentTheme.primary}33, ${currentTheme.secondary}33)`
            : `linear-gradient(45deg, ${
                isDarkMode ? '#809FFF20' : '#809FFF33'
              }, ${isDarkMode ? '#F41A8120' : '#F41A8133'})`,
          animationDuration: `calc(${6 / animationSpeed}s)`,
          animationDelay: `${Math.random() * 2}s`,
          transform:
            enableParallax && !prefersReducedMotion
              ? `translate(${
                  parallaxOffset.x * (3 + i * 0.3) * animationSpeed
                }px, ${
                  (parallaxOffset.y * (3 + i * 0.3) + scrollOffset * 0.5) *
                  animationSpeed
                }px)`
              : 'none',
          willChange: 'transform',
        }"
      ></div>

      <div
        class="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] transition-opacity duration-500"
        :class="{ 'parallax-grid': enableParallax && !prefersReducedMotion }"
        :style="{
          backgroundImage: isCustomized
            ? `linear-gradient(90deg, ${currentTheme.primary} 1px, transparent 1px), linear-gradient(180deg, ${currentTheme.primary} 1px, transparent 1px)`
            : `linear-gradient(90deg, ${
                isDarkMode ? '#809FFF' : '#94A3B8'
              } 1px, transparent 1px), linear-gradient(180deg, ${
                isDarkMode ? '#809FFF' : '#94A3B8'
              } 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform:
            enableParallax && !prefersReducedMotion
              ? `translate(${parallaxOffset.x * 0.8}px, ${
                  parallaxOffset.y * 0.8 + scrollOffset * 0.2
                }px)`
              : 'none',
          willChange: 'transform',
        }"
      ></div>
    </div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
    >
      <div class="w-full text-center mb-8 sm:mb-16">
        <div
          class="sm:mb-8 relative inline-block group/profile"
          :style="parallaxStyle(4, 0.4)"
        >
          <div class="relative">
            <div
              class="absolute -inset-2 rounded-full blur opacity-30 group-hover/profile:opacity-50 transition-opacity duration-500"
              :class="{
                'animate-pulse-slow':
                  !shakeEffect && !profileClicked && !prefersReducedMotion,
                'animate-shake': shakeEffect && !prefersReducedMotion,
                'animate-bounce': profileClicked && !prefersReducedMotion,
              }"
              :style="{
                background: isCustomized
                  ? `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.secondary}, ${currentTheme.accent}, ${currentTheme.primary})`
                  : `linear-gradient(45deg, ${
                      isDarkMode ? '#809FFF' : '#809FFF'
                    }, ${isDarkMode ? '#F41A81' : '#F41A81'}, ${
                      isDarkMode ? '#809FFF' : '#809FFF'
                    }, ${isDarkMode ? '#809FFF' : '#809FFF'})`,
                animationDuration: `calc(${4 / animationSpeed}s)`,
              }"
            ></div>

            <div
              class="relative bg-white dark:bg-[#1B2432] p-1 rounded-full cursor-pointer"
              @click="triggerProfileBounce"
            >
              <img
                src="/profile.jpeg"
                :alt="$t('hero.title') + ' ' + $t('hero.lastName')"
                class="w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover shadow-xl group-hover/profile:scale-105 transition-transform duration-300"
                :class="{
                  'animate-shake': shakeEffect && !prefersReducedMotion,
                  'animate-bounce': profileClicked && !prefersReducedMotion,
                }"
              />
            </div>

            <div
              class="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              :style="{
                background: isCustomized
                  ? `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.secondary})`
                  : `linear-gradient(45deg, ${
                      isDarkMode ? '#809FFF' : '#809FFF'
                    }, ${isDarkMode ? '#F41A81' : '#F41A81'})`,
              }"
              @click="triggerStatusFeedback"
            >
              <div
                class="w-3 h-3 bg-white rounded-full animate-ping absolute"
                :class="{
                  'animate-pulse-fast': statusClicked && !prefersReducedMotion,
                }"
              ></div>
              <div
                class="w-3 h-3 bg-white rounded-full"
                :class="{
                  'animate-pulse-fast': statusClicked && !prefersReducedMotion,
                }"
              ></div>
            </div>
          </div>
        </div>

        <div class="mb-8 space-y-4">
          <div>
            <h1
              class="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-4 animate-slide-up cursor-pointer"
              :class="{
                'animate-shake': shakeEffect && !prefersReducedMotion,
                'animate-pulse': titleClicked && !prefersReducedMotion,
              }"
              :style="parallaxStyle(2, 0.3)"
              @click="triggerTitleAnimation"
            >
              <span
                class="bg-clip-text text-transparent"
                :style="{
                  backgroundImage: isCustomized
                    ? `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.accent})`
                    : `linear-gradient(45deg, ${
                        isDarkMode ? '#FFFFFF' : '#0F172A'
                      }, ${isDarkMode ? '#809FFF' : '#1E3A8A'}, ${
                        isDarkMode ? '#FFFFFF' : '#0F172A'
                      })`,
                }"
              >
                {{ $t("hero.title") }}
              </span>
              <span
                class="block md:inline bg-clip-text text-transparent animate-slide-up-delayed"
                :style="{
                  backgroundImage: isCustomized
                    ? `linear-gradient(45deg, ${currentTheme.secondary}, ${currentTheme.primary})`
                    : `linear-gradient(45deg, ${
                        isDarkMode ? '#809FFF' : '#809FFF'
                      }, ${isDarkMode ? '#F41A81' : '#F41A81'}, ${
                        isDarkMode ? '#809FFF' : '#809FFF'
                      })`,
                }"
              >
                {{ $t("hero.lastName") }}
              </span>
            </h1>
          </div>

          <div>
            <div
              class="inline-flex items-center space-x-2 animate-slide-up-delayed-2"
              :style="parallaxStyle(1.5, 0.2)"
            >
              <div
                class="w-2 h-2 rounded-full animate-pulse"
                :style="{
                  background: isCustomized
                    ? `linear-gradient(45deg, ${currentTheme.primary}, ${currentTheme.secondary})`
                    : `linear-gradient(45deg, ${
                        isDarkMode ? '#809FFF' : '#809FFF'
                      }, ${isDarkMode ? '#F41A81' : '#F41A81'})`,
                }"
              ></div>
              <p
                class="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600 dark:text-slate-300 tracking-wide"
              >
                <span class="typing-text">{{ typedText }}</span>
                <span
                  class="typing-cursor animate-blink"
                  :style="{
                    color: isCustomized
                      ? currentTheme.primary
                      : isDarkMode
                      ? '#809FFF'
                      : '#809FFF',
                  }"
                  >|</span
                >
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 sm:mb-12 animate-slide-up-delayed-4"
          :style="parallaxStyle(2.5, 0.35)"
        >
          <div class="group/btn-primary relative">
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/btn-primary:opacity-100 transition-opacity duration-300"
              :style="{ background: gradientStyle }"
            >
              <div
                class="rounded-xl h-full w-full bg-gradient-to-br from-slate-50/95 via-white/95 to-blue-50/95 dark:bg-[#0D0F12]/95"
              ></div>
            </div>
            <NuxtLink
              to="/projects"
              class="relative z-10 inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
              :style="{ background: gradientStyle }"
              :class="{ 'animate-shake': shakeEffect && !prefersReducedMotion }"
              @click="closeControlsOnMobile"
            >
              <div class="relative flex items-center">
                <i
                  class="fas fa-rocket mr-3 group-hover/btn-primary:translate-x-1 transition-transform duration-300"
                ></i>
                {{ $t("hero.viewProjects") }}
              </div>
              <div
                class="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover/btn-primary:opacity-100 group-hover/btn-primary:scale-125 transition-all duration-300"
              ></div>
            </NuxtLink>
          </div>

          <div class="group/btn-secondary relative">
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/btn-secondary:opacity-100 transition-opacity duration-300"
              :style="{ background: gradientStyleSecondary }"
            >
              <div
                class="rounded-xl h-full w-full bg-white/95 dark:bg-[#1B2432]/95"
              ></div>
            </div>
            <a
              href="/Igal_Vilensky.pdf"
              target="_blank"
              class="relative z-10 inline-flex items-center px-8 py-4 backdrop-blur-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
              :style="{
                backgroundColor: isCustomized
                  ? 'rgba(255, 255, 255, 0.1)'
                  : isDarkMode
                  ? 'rgba(27, 36, 50, 0.5)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: isCustomized
                  ? currentTheme.primary
                  : isDarkMode
                  ? '#E2E8F0'
                  : '#1F2937',
                borderColor: isCustomized
                  ? currentTheme.primary + '50'
                  : isDarkMode
                  ? '#809FFF20'
                  : '#E2E8F050',
              }"
              :class="{ 'animate-shake': shakeEffect && !prefersReducedMotion }"
              @click="closeControlsOnMobile"
            >
              <i
                class="fas fa-download mr-3 group-hover/btn-secondary:-translate-y-1 transition-transform duration-300"
              ></i>
              {{ $t("hero.downloadCV") }}
              <div
                class="absolute top-1 right-1 w-2 h-2 rounded-full opacity-0 group-hover/btn-secondary:opacity-100 group-hover/btn-secondary:scale-125 transition-all duration-300"
                :style="{
                  background: isCustomized
                    ? currentTheme.accent
                    : isDarkMode
                    ? '#F41A81'
                    : '#3B82F6',
                }"
              ></div>
            </a>
          </div>
        </div>

        <div
          class="flex justify-center space-x-6 animate-slide-up-delayed-5"
          :style="parallaxStyle(-3, 0.25)"
        >
          <div
            v-for="social in socialLinks"
            :key="social.name"
            class="relative group/social"
          >
            <div
              class="absolute inset-0 rounded-xl p-[1px] opacity-0 group-hover/social:opacity-100 transition-opacity duration-300"
              :style="{
                background: isCustomized
                  ? social.gradientBorder
                  : isDarkMode
                  ? social.gradientBorderDark
                  : social.gradientBorderLight,
              }"
            >
              <div
                class="rounded-xl h-full w-full bg-white/95 dark:bg-[#1B2432]/95"
              ></div>
            </div>
            <a
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="relative z-10 w-12 h-12 flex items-center justify-center rounded-xl backdrop-blur-sm shadow-lg hover:scale-110 hover:rotate-3 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
              :style="{
                backgroundColor: isCustomized
                  ? 'rgba(255, 255, 255, 0.1)'
                  : isDarkMode
                  ? 'rgba(27, 36, 50, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
                borderColor: isCustomized
                  ? currentTheme.primary + '30'
                  : isDarkMode
                  ? '#809FFF20'
                  : '#E2E8F050',
                color: social.hovered
                  ? isCustomized
                    ? social.customHoverColor
                    : isDarkMode
                    ? social.darkHoverColor
                    : social.lightHoverColor
                  : isDarkMode
                  ? '#94A3B8'
                  : '#475569',
              }"
              :class="{ 'animate-shake': shakeEffect && !prefersReducedMotion }"
              @mouseenter="social.hovered = true"
              @mouseleave="social.hovered = false"
              @click="closeControlsOnMobile"
            >
              <i
                :class="social.icon"
                class="text-xl transition-colors duration-300"
              ></i>
              <div
                class="absolute top-1 right-1 w-2 h-2 rounded-full opacity-0 group-hover/social:opacity-100 group-hover/social:scale-125 transition-all duration-300"
                :style="{
                  background: isCustomized
                    ? social.accentDot
                    : isDarkMode
                    ? social.darkAccentDot
                    : social.lightAccentDot,
                }"
              ></div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch, nextTick, computed } from "vue";

const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const showControls = ref(false);
const animationSpeed = ref(1);
const particleCount = ref(6);
const shakeEffect = ref(false);
const rainbowEffect = ref(false);
const typedText = ref("");
const clickCanvas = ref<HTMLCanvasElement | null>(null);
const isCustomized = ref(false);
const enableMouseTrail = ref(false);
const enableParallax = ref(false);
const enableMusicVisualizer = ref(false);
const profileClicked = ref(false);
const statusClicked = ref(false);
const titleClicked = ref(false);
const parallaxOffset = ref({ x: 0, y: 0 });
const scrollOffset = ref(0);
const mouseTrail = ref<
  { x: number; y: number; size: number; alpha: number; color: string }[]
>([]);

const isDarkMode = computed(
  () => process.client && document.documentElement.classList.contains("dark")
);
const isDesktop = computed(() => process.client && window.innerWidth >= 640);
const prefersReducedMotion = computed(
  () =>
    process.client &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
);
const computedParticleCount = computed(() => Math.min(particleCount.value, 20));
const gradientStyle = computed(() =>
  isCustomized.value
    ? `linear-gradient(45deg, ${currentTheme.value.primary}, ${currentTheme.value.secondary})`
    : `linear-gradient(45deg, ${isDarkMode.value ? "#809FFF" : "#809FFF"}, ${
        isDarkMode.value ? "#F41A81" : "#F41A81"
      })`
);
const gradientStyleSecondary = computed(() =>
  isCustomized.value
    ? `linear-gradient(45deg, ${currentTheme.value.primary}30, ${currentTheme.value.secondary}30)`
    : `linear-gradient(45deg, ${
        isDarkMode.value ? "#809FFF30" : "#3B82F630"
      }, ${isDarkMode.value ? "#F41A8130" : "#EC489930"})`
);

const themes = reactive({
  default: {
    primary: "#809FFF",
    secondary: "#F41A81",
    accent: "#00D4FF",
    lightBackground:
      "linear-gradient(135deg, #f1f5f9 0%, #ffffff 50%, #dbeafe 100%)",
    darkBackground:
      "linear-gradient(135deg, #0D0F12 0%, #1B2432 50%, #0D0F12 100%)",
  },
  sunset: {
    primary: "#FF6B6B",
    secondary: "#FFE66D",
    accent: "#FF8E53",
    lightBackground:
      "linear-gradient(135deg, #fff5f5 0%, #ffffff 50%, #fef3c7 100%)",
    darkBackground:
      "linear-gradient(135deg, #2D1B1B 0%, #3F2A1D 50%, #2D1B1B 100%)",
  },
  ocean: {
    primary: "#4ECDC4",
    secondary: "#44A08D",
    accent: "#096DD9",
    lightBackground:
      "linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #e0f2fe 100%)",
    darkBackground:
      "linear-gradient(135deg, #1A2E2D 0%, #2A3F3E 50%, #1A2E2D 100%)",
  },
  purple: {
    primary: "#A855F7",
    secondary: "#EC4899",
    accent: "#8B5CF6",
    lightBackground:
      "linear-gradient(135deg, #faf5ff 0%, #ffffff 50%, #fdf4ff 100%)",
    darkBackground:
      "linear-gradient(135deg, #2A1B3D 0%, #3F2A5C 50%, #2A1B3D 100%)",
  },
  forest: {
    primary: "#10B981",
    secondary: "#059669",
    accent: "#34D399",
    lightBackground:
      "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #ecfdf5 100%)",
    darkBackground:
      "linear-gradient(135deg, #1A2E1F 0%, #2A3F2E 50%, #1A2E1F 100%)",
  },
  night: {
    primary: "#3B82F6",
    secondary: "#8B5CF6",
    accent: "#D946EF",
    lightBackground:
      "linear-gradient(135deg, #e0f2fe 0%, #ffffff 50%, #f3e8ff 100%)",
    darkBackground:
      "linear-gradient(135deg, #1E1B4B 0%, #2E236C 50%, #1E1B4B 100%)",
  },
  aurora: {
    primary: "#22D3EE",
    secondary: "#A3E635",
    accent: "#F472B6",
    lightBackground:
      "linear-gradient(135deg, #ecfeff 0%, #ffffff 50%, #f5d0fe 100%)",
    darkBackground:
      "linear-gradient(135deg, #164E63 0%, #1E3A8A 50%, #701A75 100%)",
  },
});

const currentTheme = ref(themes.default);

const socialLinks = reactive([
  {
    name: "GitHub",
    icon: "fab fa-github",
    url: "https://github.com/igalvilensky",
    hovered: false,
    gradientBorder: "linear-gradient(45deg, #809FFF30, #F41A8130)",
    gradientBorderLight: "linear-gradient(45deg, #809FFF30, #F41A8130)",
    gradientBorderDark: "linear-gradient(45deg, #809FFF30, #F41A8130)",
    lightHoverColor: "#F41A81",
    darkHoverColor: "#F41A81",
    customHoverColor: "#FFFFFF",
    accentDot: "#F41A81",
    darkAccentDot: "#F41A81",
    lightAccentDot: "#F41A81",
  },
  {
    name: "LinkedIn",
    icon: "fab fa-linkedin",
    url: "https://linkedin.com/in/igalvilensky",
    hovered: false,
    gradientBorder: "linear-gradient(45deg, #3B82F630, #22D3EE30)",
    gradientBorderLight: "linear-gradient(45deg, #3B82F630, #22D3EE30)",
    gradientBorderDark: "linear-gradient(45deg, #3B82F630, #22D3EE30)",
    lightHoverColor: "#3B82F6",
    darkHoverColor: "#3B82F6",
    customHoverColor: "#FFFFFF",
    accentDot: "#3B82F6",
    darkAccentDot: "#3B82F6",
    lightAccentDot: "#3B82F6",
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    url: "mailto:igal@example.com",
    hovered: false,
    gradientBorder: "linear-gradient(45deg, #A855F730, #EC489930)",
    gradientBorderLight: "linear-gradient(45deg, #A855F730, #EC489930)",
    gradientBorderDark: "linear-gradient(45deg, #A855F730, #EC489930)",
    lightHoverColor: "#A855F7",
    darkHoverColor: "#A855F7",
    customHoverColor: "#FFFFFF",
    accentDot: "#A855F7",
    darkAccentDot: "#A855F7",
    lightAccentDot: "#A855F7",
  },
]);

const toggleControls = () => {
  showControls.value = !showControls.value;
};

const setTheme = (theme) => {
  currentTheme.value = theme;
  isCustomized.value = true;
};

const triggerEffect = (effect: string) => {
  if (process.client && window.innerWidth < 640) showControls.value = false;
  if (effect === "shake") {
    shakeEffect.value = true;
    setTimeout(() => (shakeEffect.value = false), 1000);
  } else if (effect === "rainbow") {
    rainbowEffect.value = true;
    let colorIndex = 0;
    const rainbowColors = Object.values(themes);
    const rainbowInterval = setInterval(() => {
      currentTheme.value = rainbowColors[colorIndex % rainbowColors.length];
      isCustomized.value = true;
      colorIndex++;
    }, 500);
    setTimeout(() => {
      clearInterval(rainbowInterval);
      rainbowEffect.value = false;
    }, 4000);
  }
};

const resetSettings = () => {
  animationSpeed.value = 1;
  particleCount.value = 6;
  currentTheme.value = themes.default;
  shakeEffect.value = false;
  rainbowEffect.value = false;
  isCustomized.value = false;
  enableMouseTrail.value = false;
  enableParallax.value = false;
  enableMusicVisualizer.value = true;
};

const triggerProfileBounce = () => {
  if (prefersReducedMotion.value) return;
  profileClicked.value = true;
  setTimeout(() => (profileClicked.value = false), 500);
};

const triggerStatusFeedback = () => {
  if (prefersReducedMotion.value) return;
  statusClicked.value = true;
  setTimeout(() => (statusClicked.value = false), 1000);
};

const triggerTitleAnimation = () => {
  if (prefersReducedMotion.value) return;
  titleClicked.value = true;
  setTimeout(() => (titleClicked.value = false), 1000);
};

const createClickEffect = (event: MouseEvent) => {
  if (prefersReducedMotion.value || !process.client) return;
  const canvas = clickCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  let radius = 0;
  const maxRadius = 100;
  const animate = (timestamp: number) => {
    radius += 2;
    const alpha = 1 - radius / maxRadius;
    if (alpha > 0) {
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = isCustomized.value
        ? currentTheme.value.primary
        : isDarkMode.value
        ? "#809FFF"
        : "#809FFF";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.globalAlpha = alpha * 0.5;
      ctx.strokeStyle = isCustomized.value
        ? currentTheme.value.secondary
        : isDarkMode.value
        ? "#F41A81"
        : "#F41A81";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.7, 0, 2 * Math.PI);
      ctx.stroke();

      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (enableMouseTrail.value) drawMouseTrail();
    }
  };
  requestAnimationFrame(animate);
};

const parallaxStyle = (mouseFactor: number, scrollFactor: number) => ({
  transform:
    enableParallax.value && !prefersReducedMotion.value
      ? `translate(${
          parallaxOffset.value.x * mouseFactor * animationSpeed.value
        }px, ${
          (parallaxOffset.value.y * mouseFactor +
            scrollOffset.value * scrollFactor) *
          animationSpeed.value
        }px)`
      : "none",
  willChange: "transform",
});

const handleMouseMove = throttle((event: MouseEvent) => {
  if (prefersReducedMotion.value || !process.client) return;
  if (enableParallax.value) {
    const rect = document.documentElement.getBoundingClientRect();
    parallaxOffset.value = {
      x: Math.min(Math.max((event.clientX - rect.width / 2) / 50, -20), 20),
      y: Math.min(Math.max((event.clientY - rect.height / 2) / 50, -20), 20),
    };
  }
  if (enableMouseTrail.value) {
    const rect = clickCanvas.value?.getBoundingClientRect();
    if (!rect) return;
    mouseTrail.value.push({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      size: Math.random() * 8 + 4,
      alpha: 1,
      color: isCustomized.value
        ? currentTheme.value.accent
        : isDarkMode.value
        ? "#00D4FF"
        : "#00D4FF",
    });
    if (mouseTrail.value.length > 15) mouseTrail.value.shift();
  }
}, 50);

const handleScroll = throttle(() => {
  if (prefersReducedMotion.value || !process.client) return;
  if (enableParallax.value) {
    scrollOffset.value = Math.min(
      (window.scrollY || window.pageYOffset) / 2,
      200
    );
  }
}, 50);

const drawMouseTrail = () => {
  if (prefersReducedMotion.value || !enableMouseTrail.value || !process.client)
    return;
  const canvas = clickCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  mouseTrail.value.forEach((particle, index) => {
    particle.alpha -= 0.05;
    particle.size *= 0.96;
    if (particle.alpha <= 0) {
      mouseTrail.value.splice(index, 1);
      return;
    }
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.alpha;
    ctx.fill();
  });
  requestAnimationFrame(drawMouseTrail);
};

const startTypingEffect = () => {
  const titles = ["Full-stack Developer", "UI/UX Enthusiast", "Tech Innovator"];
  let currentTitleIndex = 0;
  let currentIndex = 0;
  let isDeleting = false;

  const type = () => {
    if (prefersReducedMotion.value) {
      typedText.value = titles[0];
      return;
    }
    const currentTitle = titles[currentTitleIndex];
    typedText.value = currentTitle.substring(
      0,
      isDeleting ? currentIndex - 1 : currentIndex + 1
    );
    currentIndex = isDeleting ? currentIndex - 1 : currentIndex + 1;

    if (!isDeleting && currentIndex === currentTitle.length + 1) {
      setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && currentIndex === 0) {
      isDeleting = false;
      currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    }
    setTimeout(type, isDeleting ? 50 : 100);
  };
  setTimeout(type, 1000);
};

const setupCanvas = () => {
  if (!process.client) return;
  const canvas = clickCanvas.value;
  if (!canvas) return;
  const updateCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  updateCanvasSize();
  window.addEventListener("resize", updateCanvasSize);
  if (enableMouseTrail.value) drawMouseTrail();
};

onMounted(() => {
  startTypingEffect();
  nextTick(() => {
    setupCanvas();
    if (process.client) window.addEventListener("scroll", handleScroll);
  });
});

onUnmounted(() => {
  if (process.client) window.removeEventListener("scroll", handleScroll);
});

watch(enableMouseTrail, (newValue) => {
  if (prefersReducedMotion.value || !process.client) return;
  if (newValue) {
    drawMouseTrail();
  } else {
    mouseTrail.value = [];
    const canvas = clickCanvas.value;
    if (canvas && canvas.getContext("2d"))
      canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
  }
});

watch(animationSpeed, (newSpeed) => {
  if (process.client)
    document.documentElement.style.setProperty(
      "--animation-speed",
      newSpeed.toString()
    );
});

watch(prefersReducedMotion, (reduceMotion) => {
  if (reduceMotion) {
    enableParallax.value = false;
    enableMouseTrail.value = false;
    enableMusicVisualizer.value = false;
    shakeEffect.value = false;
    rainbowEffect.value = false;
    scrollOffset.value = 0;
  }
});

watch(enableMusicVisualizer, () => {
  nextTick(() => {
    // Force DOM update to ensure visualizer renders
  });
});

const closeControlsOnMobile = () => {
  if (process.client && window.innerWidth < 640) showControls.value = false;
};
</script>

<style scoped>
@keyframes float-0 {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(calc(-15px * var(--animation-speed)));
  }
}
@keyframes float-1 {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(calc(-20px * var(--animation-speed)));
  }
}
@keyframes float-2 {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(calc(-25px * var(--animation-speed)));
  }
}
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
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
    opacity: 0.5;
  }
}
@keyframes pulse-fast {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
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
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-3px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(3px);
  }
}
@keyframes rainbow {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
@keyframes visualizer {
  0%,
  100% {
    transform: scaleX(1);
  }
  50% {
    transform: scaleX(calc(1.3 * var(--animation-speed)));
  }
}

.animate-float-0 {
  animation: float-0 calc(6s / var(--animation-speed)) ease-in-out infinite;
}
.animate-float-1 {
  animation: float-1 calc(8s / var(--animation-speed)) ease-in-out infinite;
}
.animate-float-2 {
  animation: float-2 calc(10s / var(--animation-speed)) ease-in-out infinite;
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
  animation: pulse-slow calc(4s / var(--animation-speed)) ease-in-out infinite;
}
.animate-pulse-fast {
  animation: pulse-fast 0.5s ease-in-out;
}
.animate-blink {
  animation: blink 1s infinite;
}
.animate-shake {
  animation: shake 0.5s ease-in-out infinite;
}
.animate-rainbow {
  animation: rainbow 2s linear infinite;
}
.animate-bounce {
  animation: bounce 0.5s ease-in-out;
}

.parallax-bg,
.parallax-mid,
.parallax-fg,
.parallax-grid,
.parallax-profile,
.parallax-title,
.parallax-text,
.parallax-buttons,
.parallax-social {
  transition: transform 0.2s ease-out;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary-color);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .animate-float-0,
  .animate-float-1,
  .animate-float-2,
  .animate-slide-up,
  .animate-slide-up-delayed,
  .animate-slide-up-delayed-2,
  .animate-slide-up-delayed-4,
  .animate-slide-up-delayed-5,
  .animate-pulse-slow,
  .animate-pulse-fast,
  .animate-blink,
  .animate-shake,
  .animate-rainbow,
  .animate-bounce,
  .parallax-bg,
  .parallax-mid,
  .parallax-fg,
  .parallax-grid,
  .parallax-profile,
  .parallax-title,
  .parallax-text,
  .parallax-buttons,
  .parallax-social,
  [class*="animate-"] {
    animation: none !important;
    transform: none !important;
    transition: none !important;
  }
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
  @apply outline outline-2 outline-offset-2 outline-[var(--primary-color)] rounded-lg;
}

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
