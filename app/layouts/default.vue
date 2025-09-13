<!-- app/layouts/default.vue -->
<template>
  <div
    class="min-h-screen font-['Poppins']"
    :class="
      colorMode.value === 'dark'
        ? 'bg-gray-900 text-gray-100'
        : 'bg-white text-gray-900'
    "
  >
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from "#imports";
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

const colorMode = useColorMode();
</script>
