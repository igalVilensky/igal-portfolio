<template>
  <button type="button" class="shell-control" :aria-label="toggleLabel" @click="toggleColorMode">
    <Moon v-if="isDarkMode" :size="18" aria-hidden="true" />
    <Sun v-else :size="18" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";

const colorMode = useColorMode();
const { t } = useI18n();
const isMounted = ref(false);

const isDarkMode = computed(() => isMounted.value && colorMode.value === "dark");

const toggleLabel = computed(() =>
  isDarkMode.value ? t("nav.switchToLight") : t("nav.switchToDark")
);

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

onMounted(() => {
  isMounted.value = true;
});
</script>
