<!-- app/layouts/default.vue -->
<template>
  <div
    class="min-h-screen font-sans bg-neutral-50 text-neutral-900 dark:bg-secondary-900 dark:text-neutral-100 transition-colors duration-300"
  >
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
</script>
