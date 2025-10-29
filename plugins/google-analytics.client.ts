export default defineNuxtPlugin((nuxtApp) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-4KG5Z26HTF";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    (window.dataLayer as any).push(args);
  }

  // Wait until GA script is loaded
  script.onload = () => {
    gtag("js", new Date());
    gtag("config", "G-4KG5Z26HTF");
  };

  // Track route changes
  nuxtApp.hook("page:finish", () => {
    gtag("event", "page_view", {
      page_path: window.location.pathname,
    });
  });
});
