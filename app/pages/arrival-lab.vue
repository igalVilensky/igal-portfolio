<script setup lang="ts">
import ArrivalChamber from '~/arrival-lab/ArrivalChamber.client.vue';
definePageMeta({ layout: false });
useHead({ title: 'Arrival Chamber — The Living Wall', meta: [{ name: 'description', content: 'An experimental first-person journey through luminous monumental architecture.' }] });
const { locale } = useI18n();
const loading = computed(() => locale.value === 'de' ? 'Raum wird vorbereitet…' : locale.value === 'ru' ? 'Подготовка пространства…' : 'Preparing the chamber…');
</script>
<template><ClientOnly><ArrivalChamber/><template #fallback><main class="arrival-loading" role="status">{{ loading }}</main></template></ClientOnly></template>
<style>.arrival-loading{position:fixed;inset:0;display:grid;place-items:center;background:#dedfd8;color:#4b4c47;font:14px system-ui}</style>
