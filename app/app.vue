<!-- app/app.vue -->
<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useHead, useNuxtApp } from "#app"; // Import useNuxtApp as well

const gaId = "G-4KG5Z26HTF"; // Your Google Analytics Measurement ID

useHead({
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
    { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
    { rel: "shortcut icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
    },
  ],
  // Add the Google Analytics scripts here
  script: [
    // Google Tag Manager script for gtag.js
    {
      src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
      async: true,
      // Key is important for useHead to track unique scripts, especially if you have multiple
      key: "google-gtag-script",
    },
    // Inline script for dataLayer and gtag initialization
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { send_page_view: false }); // Disable automatic page view
      `,
      type: "text/javascript",
      tagPosition: "head", // Explicitly place in head
      key: "google-gtag-init-script", // Unique key for the inline script
      // Nuxt automatically handles client-side only execution for script innerHTML in useHead
    },
  ],
});

// Now, handle page view tracking for route changes outside of useHead
const nuxtApp = useNuxtApp();

nuxtApp.hook("app:mounted", () => {
  // Check if gtag is available before calling
  if (process.client && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "page_view", {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
    console.log("GA: Initial page view tracked via useHead.");
  } else if (process.client) {
    console.error("GA: gtag not available for app:mounted hook.");
  }
});

nuxtApp.hook("page:finish", () => {
  if (process.client && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "page_view", {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
    console.log("GA: Route change page view tracked via useHead.");
  } else if (process.client) {
    console.error("GA: gtag not available for page:finish hook.");
  }
});
</script>
