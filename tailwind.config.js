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
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          50: "rgb(248 250 252)",
          100: "rgb(241 245 249)",
          500: "rgb(100 116 139)",
          600: "rgb(71 85 105)",
          900: "rgb(15 23 42)",
        },
        accent: {
          500: "rgb(59 130 246)",
          600: "rgb(37 99 235)",
        },
      },
      fontSize: {
        display: ["4rem", { lineHeight: "1.1", fontWeight: "700" }],
        h1: ["3rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
      },
      spacing: {
        "section-y": "5rem",
        "section-x": "1rem",
      },
    },
  },
  plugins: [],
  corePlugins: {
    backdropFilter: true, // Enable backdrop-filter utilities
  },
  darkMode: "class", // Enable dark mode with class strategy
};
