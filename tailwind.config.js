/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"], // More professional than Poppins
        display: ["Playfair Display", "serif"], // For your name/headlines
      },
      colors: {
        primary: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          500: "#5D5CDE", // Main brand blue
          600: "#4F46E5",
          900: "#312E81",
        },
        secondary: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          300: "#CBD5E1",
          400: "#9CA3AF",
          500: "#2A2D43", // Charcoal
          600: "#1E2038",
          900: "#0F1024",
        },
        accent: {
          100: "#FFE4E6",
          500: "#FF6B6B", // Coral accent
          600: "#E55555",
          900: "#7F1D1D",
        },
        neutral: {
          50: "#F8F9FA",
          100: "#E9ECEF",
          500: "#6C757D",
          900: "#212529",
        },
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["2.5rem", { lineHeight: "1.2", fontWeight: "600" }],
        h2: ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      spacing: {
        "section-y": "6rem",
        "section-x": "1.5rem",
        container: "min(1200px, 90vw)",
      },
      maxWidth: {
        prose: "65ch", // Optimal reading width
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    backdropFilter: true,
  },
  darkMode: "class",
};
