<!-- app/layouts/default.vue -->
<template>
  <div
    class="min-h-screen font-sans bg-secondary-50 text-secondary-900 dark:bg-dark-bg dark:text-secondary-100 transition-colors duration-300 selection:bg-primary-500 selection:text-white flex flex-col overflow-x-hidden"
  >
    <Navbar />
    <main class="flex-1 relative z-10">
      <slot />
    </main>
    <Footer v-if="!isHomeRoute" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

const route = useRoute();
const isHomeRoute = computed(() => route.path === "/");
</script>
