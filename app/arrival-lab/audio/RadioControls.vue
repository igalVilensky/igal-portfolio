<script setup lang="ts">
import type { YouTubeRadio } from './YouTubeRadio';
import RadioTransport from './RadioTransport.vue';
import RadioStationControls from './RadioStationControls.vue';
import { audioCopy } from './copy';
const emit=defineEmits<{close:[]; anchor:[element:HTMLElement|undefined]}>();
const props=defineProps<{radio:YouTubeRadio; locale:string}>();
const c=computed(()=>audioCopy[props.locale as keyof typeof audioCopy]||audioCopy.en);
const s=props.radio.state;
const anchor=ref<HTMLElement>();
const manualId=ref('');
onMounted(()=>emit('anchor',anchor.value));
onBeforeUnmount(()=>emit('anchor',undefined));
</script>
<template>
 <div class="receiver-controls" @keydown.stop @keydown.esc.stop.prevent="emit('close')" @pointerdown.stop>
  <div class="receiver-display"><small>{{ c.channel }} {{ String(s.station+1).padStart(2,'0') }}</small><strong>{{ radio.title }}</strong><span role="status">{{ c[s.status as keyof typeof c] || s.status }} <template v-if="s.errorCode">({{ s.errorCode }})</template></span></div>
  <div ref="anchor" class="receiver-player-anchor" aria-hidden="true"/>
  <RadioTransport :radio="radio" :locale="locale" show-stop/>
  <RadioStationControls :radio="radio" :locale="locale"/>
  <a :href="radio.sourceUrl" target="_blank" rel="noopener noreferrer">{{ c.external }} ↗</a>
  <details><summary>{{ c.manual }}</summary><form @submit.prevent="radio.playManual(manualId)"><label>{{ c.videoId }}<input v-model="manualId" required pattern="[A-Za-z0-9_-]{11}" minlength="11" maxlength="11" autocomplete="off"></label><button type="submit">{{ c.load }}</button></form></details>
 </div>
</template>
