<script setup lang="ts">
import type { YouTubeRadio } from './YouTubeRadio';
import { audioCopy } from './copy';
const props=withDefaults(defineProps<{radio:YouTubeRadio;locale:string;showStop?:boolean}>(),{showStop:false});
const c=computed(()=>audioCopy[props.locale as keyof typeof audioCopy]||audioCopy.en);
const playing=computed(()=>['playing','loading'].includes(props.radio.state.status));
</script>
<template>
 <div class="radio-transport">
  <button data-action="radio-previous" :aria-label="c.previous" :title="c.previous" @click="radio.select(radio.state.station-1)">←</button>
  <button data-action="radio-play" :aria-label="playing?c.pause:c.play" :title="playing?c.pause:c.play" @click="radio.togglePlayback()">{{ playing?'Ⅱ':'▶' }}</button>
  <button data-action="radio-next" :aria-label="c.next" :title="c.next" @click="radio.select(radio.state.station+1)">→</button>
  <button v-if="showStop" data-action="radio-stop" :aria-label="c.stop" :title="c.stop" @click="radio.stop()">■</button>
 </div>
</template>
