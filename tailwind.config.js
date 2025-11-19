/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{vue,js,ts}",
    "./app/layouts/**/*.{vue,js,ts}",
    "./app/pages/**/*.{vue,js,ts}",
    "./app/app.vue",
    "./app/plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9", // Sky blue for a fresh look
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          950: "#082F49",
        },
        secondary: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A", // Deep slate
          950: "#020617",
        },
        accent: {
          500: "#F43F5E", // Rose
          600: "#E11D48",
        },
        dark: {
          bg: "#0B0C15", // Very dark blue/black
          surface: "#151621",
          border: "#2A2B3A",
        },
      },
      fontSize: {
        "display-2xl": ["4.5rem", { lineHeight: "1", fontWeight: "800", letterSpacing: "-0.02em" }],
        "display-xl": ["3.75rem", { lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.1", fontWeight: "700", letterSpacing: "-0.01em" }],
        h1: ["2.25rem", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" }],
        h2: ["1.875rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "section-y": "8rem",
        "section-x": "2rem",
        container: "min(1280px, 92vw)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
