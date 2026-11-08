<script setup lang="ts">
import type { YouTubeRadio } from './YouTubeRadio';
import { stations } from './stations';
import { audioCopy } from './copy';
const props=defineProps<{radio:YouTubeRadio;locale:string}>();
const c=computed(()=>audioCopy[props.locale as keyof typeof audioCopy]||audioCopy.en);
const s=props.radio.state;
</script>
<template>
 <div class="radio-station-controls">
  <label>{{ c.channel }}<select data-action="radio-station" :value="s.manualVideoId?'manual':s.station" @change="radio.select(Number(($event.target as HTMLSelectElement).value))"><option v-if="s.manualVideoId" value="manual" disabled>{{ s.manualVideoId }}</option><option v-for="(station,index) in stations" :key="station.id" :value="index">{{ station.name }}</option></select></label>
  <div class="radio-level"><label>{{ c.volume }}<input data-action="radio-volume" type="range" min="0" max="1" step="0.01" :value="s.volume" @input="radio.setVolume(Number(($event.target as HTMLInputElement).value))"></label><button data-action="radio-mute" :aria-pressed="s.muted" :aria-label="c.radioMute" :title="c.radioMute" @click="radio.toggleMute()">{{ s.muted?'♪×':'♪' }}</button></div>
 </div>
</template>
