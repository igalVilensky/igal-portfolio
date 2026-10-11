<!-- app/layouts/default.vue -->
<template>
  <div class="site-shell">
    <a href="#main-content" class="skip-link btn-primary">{{ t('foundation.skipContent') }}</a>
    <Navbar />
    <main id="main-content" tabindex="-1" class="flex-1 relative">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

const { t } = useI18n();
</script>
