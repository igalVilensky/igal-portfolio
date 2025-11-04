// plugins/google-analytics.client.ts (recommended name)
export default defineNuxtPlugin((nuxtApp) => {
  // Ensure we are in a browser environment (process.client check is still good practice)
  if (process.client) {
    const gaId = "G-4KG5Z26HTF";

    // Create the script element
    const script = document.createElement("script");
    script.async = true; // Load asynchronously
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;

    // Append to head
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function globally
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      // Added 'any[]' for TypeScript safety
      window.dataLayer.push(args);
    }
    // Make gtag globally accessible if it isn't already set by the script
    // This is important for subsequent calls and app:mounted/page:finish hooks
    if (!("gtag" in window)) {
      window.gtag = gtag;
    }

    // Wait until GA script is loaded, then configure
    script.onload = () => {
      gtag("js", new Date());
      gtag("config", gaId, {
        send_page_view: false, // Disable automatic page view if you're tracking manually
      });
      console.log("Google Analytics script loaded and configured."); // Add a console log
    };

    // Track initial page view (important for the first load)
    nuxtApp.hook("app:mounted", () => {
      if (typeof window.gtag === "function") {
        // Added safety check
        gtag("event", "page_view", {
          page_path: window.location.pathname,
          page_location: window.location.href,
          page_title: document.title,
        });
        console.log("GA: Initial page view tracked."); // Add a console log
      } else {
        console.error("GA: gtag not available for app:mounted hook.");
      }
    });

    // Track route changes
    nuxtApp.hook("page:finish", () => {
      if (typeof window.gtag === "function") {
        // Added safety check
        gtag("event", "page_view", {
          page_path: window.location.pathname,
          page_location: window.location.href,
          page_title: document.title,
        });
        console.log("GA: Route change page view tracked."); // Add a console log
      } else {
        console.error("GA: gtag not available for page:finish hook.");
      }
    });
  }
});
