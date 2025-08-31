<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Header Section -->
    <div class="text-center space-y-4">
      <div
        class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full mb-4"
      >
        <i class="fas fa-code text-white text-2xl"></i>
      </div>
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
      >
        Cross-Site Scripting (XSS) Demo
      </h1>
      <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
        Learn about XSS vulnerabilities by testing malicious payloads in a safe
        environment. See the difference between vulnerable and secure
        implementations.
      </p>
    </div>

    <!-- Security Level Indicator -->
    <div class="flex justify-center">
      <div
        class="inline-flex items-center px-6 py-3 rounded-full border-2 transition-all duration-300"
        :class="securityStatusClass"
      >
        <i class="fas mr-2" :class="securityStatusIcon"></i>
        <span class="font-semibold">{{ securityStatusText }}</span>
      </div>
    </div>

    <!-- Input Section -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <label
          class="block font-semibold text-lg text-gray-800 dark:text-gray-200"
        >
          <i class="fas fa-keyboard mr-2 text-blue-500"></i>
          Test Your XSS Payload
        </label>
        <div class="flex space-x-2">
          <button
            @click="insertSamplePayload('basic')"
            class="px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-full transition-colors"
          >
            Basic Script
          </button>
          <button
            @click="insertSamplePayload('image')"
            class="px-3 py-1 text-xs bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-full transition-colors"
          >
            Image XSS
          </button>
          <button
            @click="insertSamplePayload('advanced')"
            class="px-3 py-1 text-xs bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 text-orange-700 dark:text-orange-300 rounded-full transition-colors"
          >
            Advanced
          </button>
        </div>
      </div>

      <div class="relative">
        <textarea
          v-model="userInput"
          class="w-full p-4 border-2 rounded-xl dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-mono text-sm resize-none"
          :class="inputBorderClass"
          placeholder="Enter XSS payload to test..."
          rows="3"
          aria-label="Enter XSS payload to test"
        />

        <!-- Threat Level Indicator -->
        <div v-if="threatLevel > 0" class="absolute top-3 right-3">
          <div class="flex items-center space-x-1">
            <div class="flex space-x-1">
              <div
                v-for="i in 5"
                :key="i"
                class="w-2 h-6 rounded-full transition-all duration-300"
                :class="
                  i <= threatLevel
                    ? threatLevelColor
                    : 'bg-gray-200 dark:bg-gray-600'
                "
              ></div>
            </div>
            <span
              class="ml-2 text-xs font-semibold px-2 py-1 rounded-full"
              :class="threatLevelTextClass"
            >
              {{ threatLevelText }}
            </span>
          </div>
        </div>
      </div>

      <!-- Detected Patterns -->
      <div v-if="detectedPatterns.length > 0" class="mt-3">
        <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">
          <i class="fas fa-search mr-1"></i>
          Detected patterns:
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="pattern in detectedPatterns"
            :key="pattern"
            class="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full"
          >
            {{ pattern }}
          </span>
        </div>
      </div>

      <!-- Character Counter -->
      <div
        class="flex justify-between items-center mt-3 text-sm text-gray-500 dark:text-gray-400"
      >
        <span>{{ userInput.length }}/500 characters</span>
        <button
          @click="reset"
          class="px-3 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
        >
          <i class="fas fa-trash mr-1"></i>
          Clear
        </button>
      </div>
    </div>

    <!-- Demo Sections -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Vulnerable Section -->
      <div
        class="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-2xl shadow-lg border-2 border-red-200 dark:border-red-800 overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3
              class="font-bold text-xl text-red-700 dark:text-red-400 flex items-center"
            >
              <div
                class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3"
              >
                <i class="fas fa-unlock text-white text-sm"></i>
              </div>
              Vulnerable Rendering
            </h3>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span class="text-xs font-medium text-red-600 dark:text-red-400"
                >LIVE DANGER</span
              >
            </div>
          </div>

          <div
            class="text-sm text-red-600 dark:text-red-400 mb-3 flex items-start space-x-2"
          >
            <i class="fas fa-exclamation-triangle mt-1 flex-shrink-0"></i>
            <span
              >This renders user input directly with
              <code class="bg-red-200 dark:bg-red-800 px-1 rounded"
                >v-html</code
              >
              - extremely dangerous!</span
            >
          </div>

          <div class="relative">
            <div
              class="absolute inset-0 bg-red-500/10 rounded-lg animate-pulse"
              v-if="threatLevel > 3"
            ></div>
            <div
              class="p-4 bg-white dark:bg-gray-900 rounded-lg border-2 border-red-300 dark:border-red-700 min-h-[100px] transition-all duration-300 relative overflow-auto"
              :class="{ 'ring-4 ring-red-500/50': threatLevel > 3 }"
              v-html="userInput || defaultOutput"
            ></div>
          </div>

          <div
            class="mt-3 text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-2 rounded"
          >
            <i class="fas fa-code mr-1"></i>
            Code: <code>&lt;div v-html="userInput"&gt;&lt;/div&gt;</code>
          </div>
        </div>
      </div>

      <!-- Safe Section -->
      <div
        class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-lg border-2 border-green-200 dark:border-green-800 overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3
              class="font-bold text-xl text-green-700 dark:text-green-400 flex items-center"
            >
              <div
                class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3"
              >
                <i class="fas fa-lock text-white text-sm"></i>
              </div>
              Safe Rendering
            </h3>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span
                class="text-xs font-medium text-green-600 dark:text-green-400"
                >PROTECTED</span
              >
            </div>
          </div>

          <div
            class="text-sm text-green-600 dark:text-green-400 mb-3 flex items-start space-x-2"
          >
            <i class="fas fa-shield-alt mt-1 flex-shrink-0"></i>
            <span
              >This escapes HTML automatically with text interpolation
              <code class="bg-green-200 dark:bg-green-800 px-1 rounded"
                >{{ "{" }}{{ "}" }}</code
              ></span
            >
          </div>

          <div
            class="p-4 bg-white dark:bg-gray-900 rounded-lg border-2 border-green-300 dark:border-green-700 min-h-[100px] whitespace-pre-wrap break-words font-mono text-sm"
          >
            {{ userInput || "Output will appear here..." }}
          </div>

          <div
            class="mt-3 text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 p-2 rounded"
          >
            <i class="fas fa-code mr-1"></i>
            Code:
            <code
              >&lt;div&gt;{{ "{" }}{{ userInput }}{{ "}" }}&lt;/div&gt;</code
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Educational Cards -->
    <div class="grid md:grid-cols-3 gap-4">
      <div
        class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800"
      >
        <div class="flex items-center mb-2">
          <i class="fas fa-lightbulb text-blue-500 mr-2"></i>
          <h4 class="font-semibold text-blue-800 dark:text-blue-400">
            What is XSS?
          </h4>
        </div>
        <p class="text-sm text-blue-700 dark:text-blue-300">
          Cross-Site Scripting allows attackers to inject malicious scripts into
          web pages viewed by other users.
        </p>
      </div>

      <div
        class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800"
      >
        <div class="flex items-center mb-2">
          <i class="fas fa-bug text-purple-500 mr-2"></i>
          <h4 class="font-semibold text-purple-800 dark:text-purple-400">
            Impact
          </h4>
        </div>
        <p class="text-sm text-purple-700 dark:text-purple-300">
          XSS can steal cookies, hijack sessions, deface websites, or redirect
          users to malicious sites.
        </p>
      </div>

      <div
        class="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800"
      >
        <div class="flex items-center mb-2">
          <i class="fas fa-shield-alt text-emerald-500 mr-2"></i>
          <h4 class="font-semibold text-emerald-800 dark:text-emerald-400">
            Prevention
          </h4>
        </div>
        <p class="text-sm text-emerald-700 dark:text-emerald-300">
          Always escape user input, validate data, use CSP headers, and avoid
          innerHTML/v-html with user data.
        </p>
      </div>
    </div>

    <!-- Sample Payloads -->
    <details
      class="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
    >
      <summary
        class="font-semibold text-gray-800 dark:text-gray-200 cursor-pointer flex items-center"
      >
        <i class="fas fa-code mr-2 text-gray-500"></i>
        Common XSS Payloads (Educational)
      </summary>
      <div class="mt-4 space-y-3">
        <div
          v-for="(payload, index) in samplePayloads"
          :key="index"
          class="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
        >
          <div class="flex items-center justify-between mb-2">
            <span
              class="font-medium text-sm text-gray-700 dark:text-gray-300"
              >{{ payload.name }}</span
            >
            <button
              @click="userInput = payload.code"
              class="px-2 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs rounded transition-colors"
            >
              Try it
            </button>
          </div>
          <code
            class="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded block overflow-x-auto"
            >{{ payload.code }}</code
          >
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ payload.description }}
          </p>
        </div>
      </div>
    </details>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      defaultOutput:
        '<span class="text-gray-400 italic">Output will appear here...</span>',
      samplePayloads: [
        {
          name: "Basic Script Alert",
          code: "<script>alert('XSS Success!')<\/script>",
          description: "Most common XSS payload - shows a popup alert",
        },
        {
          name: "Image with Error Handler",
          code: "<img src='invalid' onerror='alert(\"Image XSS\")'/>",
          description: "Uses broken image to trigger JavaScript execution",
        },
        {
          name: "SVG with onload",
          code: "<svg onload='alert(\"SVG XSS\")'>",
          description: "SVG element with JavaScript in onload attribute",
        },
        {
          name: "Input with autofocus",
          code: "<input onfocus='alert(\"Input XSS\")' autofocus>",
          description: "Auto-focusing input that triggers XSS immediately",
        },
        {
          name: "Link with JavaScript",
          code: "<a href='javascript:alert(\"Link XSS\")'>Click me</a>",
          description: "Link that executes JavaScript when clicked",
        },
      ],
      xssPatterns: [
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
      ],
    };
  },
  computed: {
    detectedPatterns() {
      const input = this.userInput.toLowerCase();
      return this.xssPatterns
        .filter((p) => p.pattern.test(input))
        .map((p) => p.name);
    },
    threatLevel() {
      const input = this.userInput.toLowerCase();
      let maxLevel = 0;

      this.xssPatterns.forEach((p) => {
        if (p.pattern.test(input)) {
          maxLevel = Math.max(maxLevel, p.level);
        }
      });

      return maxLevel;
    },
    threatLevelColor() {
      if (this.threatLevel <= 1) return "bg-green-400";
      if (this.threatLevel <= 2) return "bg-yellow-400";
      if (this.threatLevel <= 3) return "bg-orange-400";
      if (this.threatLevel <= 4) return "bg-red-400";
      return "bg-red-600";
    },
    threatLevelText() {
      if (this.threatLevel === 0) return "Safe";
      if (this.threatLevel <= 2) return "Low";
      if (this.threatLevel <= 3) return "Medium";
      if (this.threatLevel <= 4) return "High";
      return "Critical";
    },
    threatLevelTextClass() {
      if (this.threatLevel === 0)
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      if (this.threatLevel <= 2)
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      if (this.threatLevel <= 3)
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      if (this.threatLevel <= 4)
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      return "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200";
    },
    inputBorderClass() {
      if (this.threatLevel === 0) return "border-gray-300 dark:border-gray-600";
      if (this.threatLevel <= 2)
        return "border-yellow-400 dark:border-yellow-500";
      if (this.threatLevel <= 3)
        return "border-orange-400 dark:border-orange-500";
      return "border-red-400 dark:border-red-500";
    },
    securityStatusClass() {
      if (this.threatLevel === 0)
        return "border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-900/30 dark:text-green-400";
      if (this.threatLevel <= 2)
        return "border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
      if (this.threatLevel <= 3)
        return "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
      return "border-red-300 bg-red-50 text-red-700 dark:border-red-600 dark:bg-red-900/30 dark:text-red-400";
    },
    securityStatusIcon() {
      if (this.threatLevel === 0) return "fa-shield-alt text-green-500";
      if (this.threatLevel <= 2)
        return "fa-exclamation-triangle text-yellow-500";
      if (this.threatLevel <= 3)
        return "fa-exclamation-triangle text-orange-500";
      return "fa-skull-crossbones text-red-500";
    },
    securityStatusText() {
      if (this.threatLevel === 0) return "System Secure";
      if (this.threatLevel <= 2) return "Potential Risk Detected";
      if (this.threatLevel <= 3) return "Security Threat Identified";
      return "Critical Security Alert";
    },
  },
  methods: {
    insertSamplePayload(type) {
      const payloads = {
        basic: "<script>alert('Basic XSS!')<\/script>",
        image: "<img src=x onerror=alert('Image XSS!')>",
        advanced:
          "<svg onload=alert('Advanced XSS!')><script>alert('Multi-vector')<\/script>",
      };
      this.userInput = payloads[type] || payloads.basic;
    },
    reset() {
      this.userInput = "";
    },
  },
};
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s infinite;
}

/* Custom scrollbar for code blocks */
code {
  scrollbar-width: thin;
  scrollbar-color: rgb(156, 163, 175) transparent;
}

code::-webkit-scrollbar {
  height: 4px;
}

code::-webkit-scrollbar-track {
  background: transparent;
}

code::-webkit-scrollbar-thumb {
  background: rgb(156, 163, 175);
  border-radius: 2px;
}

code::-webkit-scrollbar-thumb:hover {
  background: rgb(107, 114, 128);
}
</style>
