<template>
  <div class="space-y-10">
    <!-- Input Section -->
    <div class="space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label class="block font-display font-bold text-lg text-secondary-900 dark:text-white">
          <i class="fas fa-terminal mr-2 text-primary-500"></i>
          Vector Injection Point
        </label>
        <div class="flex flex-wrap gap-2">
          <button @click="insertSamplePayload('basic')"
            class="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-primary-100 hover:bg-primary-200 dark:bg-primary-900/40 dark:hover:bg-primary-900/60 text-primary-700 dark:text-primary-300 rounded-lg transition-all border border-primary-200/50 dark:border-primary-500/20">
            Basic
          </button>
          <button @click="insertSamplePayload('image')"
            class="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-accent-100 hover:bg-accent-200 dark:bg-accent-900/40 dark:hover:bg-accent-900/60 text-accent-700 dark:text-accent-300 rounded-lg transition-all border border-accent-200/50 dark:border-accent-500/20">
            Image
          </button>
          <button @click="insertSamplePayload('advanced')"
            class="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-lg transition-all border border-secondary-200 dark:border-white/10">
            Advanced
          </button>
        </div>
      </div>

      <div class="relative group">
        <textarea v-model="userInput"
          class="w-full p-5 bg-secondary-50 dark:bg-black/60 border border-secondary-200 dark:border-white/10 rounded-3xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-mono text-sm resize-none text-secondary-900 dark:text-white shadow-inner"
          :class="inputBorderClass" placeholder="Inject malicious payload here..." rows="3" />

        <!-- Threat Level Indicator Overlay -->
        <div v-if="threatLevel > 0"
          class="absolute top-4 right-4 flex items-center gap-2 bg-white/80 dark:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-secondary-200/50 dark:border-white/10">
          <div class="flex gap-1">
            <div v-for="i in 5" :key="i" class="w-1.5 h-3.5 rounded-full transition-all duration-300"
              :class="i <= threatLevel ? threatLevelColor : 'bg-secondary-200 dark:bg-white/10'"></div>
          </div>
          <span class="text-[10px] font-black uppercase tracking-widest" :class="threatLevelTextClass">
            {{ threatLevelText }}
          </span>
        </div>

        <div class="absolute bottom-4 right-4 flex items-center gap-4">
          <span class="text-[11px] font-mono text-secondary-400 tabular-nums">{{ userInput.length }}/500</span>
          <button @click="reset"
            class="w-8 h-8 flex items-center justify-center rounded-full bg-secondary-100 dark:bg-white/5 text-secondary-400 hover:text-red-500 transition-colors">
            <i class="fas fa-trash-alt text-xs"></i>
          </button>
        </div>
      </div>

      <!-- Detected Patterns -->
      <div v-if="detectedPatterns.length > 0" class="flex flex-wrap gap-2 pt-2">
        <span v-for="pattern in detectedPatterns" :key="pattern"
          class="px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-500/20">
          <i class="fas fa-shield-virus mr-1"></i> {{ pattern }}
        </span>
      </div>
    </div>

    <!-- Simulation Blueprint -->
    <div class="grid gap-10 lg:grid-cols-2">
      <!-- Vulnerable Side -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Insecure Outlet
            </span>
            <span class="text-[10px] font-mono font-bold text-secondary-400">UNRESTRICTED</span>
          </div>
          <!-- Code preview -->
          <div
            class="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-2.5 font-mono text-[11px] text-red-400/80">
            <span class="text-secondary-500">&lt;div</span> <span class="text-red-400">v-html</span>=<span
              class="text-primary-400">"userInput"</span><span class="text-secondary-500">&gt;&lt;/div&gt;</span>
          </div>
        </div>

        <div
          class="flex-1 p-6 bg-white dark:bg-black/40 rounded-[2rem] border border-red-500/20 min-h-[160px] transition-all duration-500 relative overflow-hidden group shadow-lg"
          :class="{ 'ring-2 ring-red-500/40 shadow-2xl scale-[1.01] bg-red-500/[0.02]': threatLevel > 3 }">

          <div
            class="relative z-10 transition-all duration-300 break-words prose dark:prose-invert max-w-none text-secondary-900 dark:text-white text-sm"
            v-html="userInput || defaultOutput">
          </div>

          <!-- Vulnerability Overlay -->
          <div v-if="threatLevel > 3"
            class="absolute inset-0 pointer-events-none border-2 border-red-500/20 rounded-[2rem] animate-pulse"></div>
        </div>
      </div>

      <!-- Secure Side -->
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-green-500"></span>
              Sanitized Outlet
            </span>
            <span class="text-[10px] font-mono font-bold text-secondary-400">ENFORCED</span>
          </div>
          <!-- Code preview -->
          <div
            class="bg-green-500/5 border border-green-500/20 rounded-xl px-4 py-2.5 font-mono text-[11px] text-green-400/80">
            <span class="text-secondary-500">&lt;div&gt;</span><span v-pre class="text-green-400">{{ </span><span
              class="text-primary-400">userInput</span><span v-pre class="text-green-400"> }}</span><span
              class="text-secondary-500">&lt;/div&gt;</span>
          </div>
        </div>

        <div
          class="flex-1 p-6 bg-white dark:bg-black/40 rounded-[2rem] border border-green-500/20 min-h-[160px] whitespace-pre-wrap break-all font-mono text-sm text-secondary-900 dark:text-white shadow-lg">
          {{ userInput || "Output will appear here..." }}
        </div>
      </div>
    </div>

    <!-- Technical Analysis Footer -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-secondary-200 dark:border-white/5">
      <div class="space-y-1">
        <div class="text-[9px] font-black text-secondary-400 uppercase tracking-widest">Mechanism</div>
        <div class="text-[11px] font-bold text-secondary-900 dark:text-white">DOM Injection</div>
      </div>
      <div class="space-y-1">
        <div class="text-[9px] font-black text-secondary-400 uppercase tracking-widest">Risk Factor</div>
        <div class="text-[11px] font-bold text-red-500">Session Theft</div>
      </div>
      <div class="space-y-1 text-right md:text-left">
        <div class="text-[9px] font-black text-secondary-400 uppercase tracking-widest">Protocol</div>
        <div class="text-[11px] font-bold text-secondary-900 dark:text-white">Escaping</div>
      </div>
      <div class="space-y-1 text-right">
        <div class="text-[9px] font-black text-secondary-400 uppercase tracking-widest">Compliance</div>
        <div class="text-[11px] font-bold text-green-500">OWASP A1</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const userInput = ref("");
const defaultOutput = '<span class="text-secondary-500 italic opacity-50">Awaiting injection...</span>';

const xssPatterns = [
  { pattern: /script/i, name: "script tag", level: 5 },
  { pattern: /javascript:/i, name: "javascript protocol", level: 4 },
  { pattern: /onerror/i, name: "onerror handler", level: 4 },
  { pattern: /onload/i, name: "onload handler", level: 4 },
  { pattern: /onfocus/i, name: "onfocus handler", level: 3 },
  { pattern: /onclick/i, name: "onclick handler", level: 3 },
  { pattern: /onmouseover/i, name: "onmouseover handler", level: 3 },
  { pattern: /iframe/i, name: "iframe tag", level: 4 },
  { pattern: /svg/i, name: "svg tag", level: 3 },
  { pattern: /img/i, name: "img tag", level: 2 },
  { pattern: /alert\(/i, name: "alert function", level: 3 },
  { pattern: /eval\(/i, name: "eval function", level: 5 },
  { pattern: /document\./i, name: "document object", level: 4 },
  { pattern: /window\./i, name: "window object", level: 4 },
];

const detectedPatterns = computed(() => {
  const input = userInput.value.toLowerCase();
  return xssPatterns
    .filter((p) => p.pattern.test(input))
    .map((p) => p.name);
});

const threatLevel = computed(() => {
  const input = userInput.value.toLowerCase();
  let maxLevel = 0;
  xssPatterns.forEach((p) => {
    if (p.pattern.test(input)) {
      maxLevel = Math.max(maxLevel, p.level);
    }
  });
  return maxLevel;
});

const threatLevelColor = computed(() => {
  if (threatLevel.value <= 1) return "bg-green-400";
  if (threatLevel.value <= 2) return "bg-yellow-400";
  if (threatLevel.value <= 3) return "bg-orange-400";
  if (threatLevel.value <= 4) return "bg-red-400";
  return "bg-red-600";
});

const threatLevelText = computed(() => {
  if (threatLevel.value === 0) return "Safe";
  if (threatLevel.value <= 2) return "Low";
  if (threatLevel.value <= 3) return "Medium";
  if (threatLevel.value <= 4) return "High";
  return "Critical";
});

const threatLevelTextClass = computed(() => {
  if (threatLevel.value === 0) return "text-green-500";
  if (threatLevel.value <= 2) return "text-yellow-500";
  if (threatLevel.value <= 3) return "text-orange-500";
  return "text-red-500";
});

const inputBorderClass = computed(() => {
  if (threatLevel.value === 0) return "border-secondary-200 dark:border-white/10";
  if (threatLevel.value <= 2) return "border-yellow-400/50";
  if (threatLevel.value <= 3) return "border-orange-400/50";
  return "border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]";
});

const insertSamplePayload = (type: string) => {
  const payloads: Record<string, string> = {
    basic: "<script>alert('Internal System Alert!')<\/script>",
    image: "<img src=x onerror=alert('Image-based XSS injection')>",
    advanced: "<svg/onload=alert('SVG Vector Active')>",
  };
  userInput.value = (payloads[type] || payloads.basic) as string;
};

const reset = () => {
  userInput.value = "";
};
</script>

<style scoped>
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
  }

  50% {
    opacity: 0.7;
    text-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Ensure images in vulnerable output are responsive */
:deep(.prose) img {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
}
</style>
