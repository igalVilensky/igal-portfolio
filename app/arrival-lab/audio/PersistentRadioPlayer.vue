<script setup lang="ts">
import type { YouTubeRadio } from './YouTubeRadio';
import RadioTransport from './RadioTransport.vue';
import RadioStationControls from './RadioStationControls.vue';
import { audioCopy } from './copy';
const props=defineProps<{radio:YouTubeRadio; locale:string; anchor?:HTMLElement; dock?:HTMLElement}>();
const emit=defineEmits<{leave:[]; stopped:[]}>();
const c=computed(()=>audioCopy[props.locale as keyof typeof audioCopy]||audioCopy.en);
const s=props.radio.state;
const manualId=ref('');
const root=ref<HTMLElement>(), playerHost=ref<HTMLElement>();
const bounds=ref<Record<string,string>>({}), floating=ref<Record<string,string>>({}), expanded=ref<Record<string,string>>({});
let observer:ResizeObserver|undefined, resizeFrame=0, presentationFrame=0;
function layout(){
 cancelAnimationFrame(resizeFrame);
 cancelAnimationFrame(presentationFrame);
 resizeFrame=requestAnimationFrame(()=>{
  const gameDock=props.dock?.getBoundingClientRect();
  const bottom=gameDock?.height ? innerHeight-gameDock.top+12 : 16;
  const available=(gameDock?.height?gameDock.top-12:innerHeight-16)-16;
  const height=Math.min(700,available);
  expanded.value={height:`${height}px`,top:`${16+Math.max(0,(available-height)/2)}px`,transform:'translateX(-50%)'};
  floating.value={bottom:`${bottom}px`};
  // Very short landscape viewports can place the video beside the dock instead.
  if(innerHeight-bottom<252 && gameDock?.height && innerWidth>gameDock.width+336)floating.value={top:'12px',left:'16px',right:'auto',bottom:'auto'};
  const r=props.anchor?.getBoundingClientRect();
  const docked=s.mode==='docked' && r && r.width>=200 && r.height>=200 && r.left>=0 && r.top>=0 && r.right<=innerWidth && r.bottom<=innerHeight;
  if(docked) bounds.value={left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`};
  else {bounds.value={};if(s.mode==='docked' && s.power)props.radio.setMode('mini');}
  // Validate the committed layout, not an intermediate mode/resize render.
  nextTick(()=>{presentationFrame=requestAnimationFrame(()=>props.radio.checkPresentation());});
 });
}
const style=computed(()=>s.mode==='expanded'?expanded.value:s.mode==='docked' && bounds.value.width?bounds.value:floating.value);
const docked=computed(()=>s.mode==='docked' && !!bounds.value.width);
watch(()=>[s.mode,s.power,props.anchor,props.dock],()=>{observer?.disconnect();if(props.anchor){observer?.observe(props.anchor);if(props.anchor.parentElement)observer?.observe(props.anchor.parentElement);}if(props.dock)observer?.observe(props.dock);layout();},{flush:'post'});
onMounted(()=>{props.radio.attach(playerHost.value!);observer=new ResizeObserver(layout);if(props.anchor)observer.observe(props.anchor);if(props.dock)observer.observe(props.dock);window.addEventListener('resize',layout);layout();});
onBeforeUnmount(()=>{observer?.disconnect();cancelAnimationFrame(resizeFrame);cancelAnimationFrame(presentationFrame);window.removeEventListener('resize',layout);});
function releasePointer(){if(document.pointerLockElement)document.exitPointerLock();}
function expand(){releasePointer();props.radio.setMode('expanded');nextTick(()=>root.value?.querySelector<HTMLButtonElement>('button')?.focus());}
function minimize(){props.radio.setMode('mini');emit('leave');nextTick(()=>root.value?.querySelector<HTMLButtonElement>('button')?.focus());}
function stop(){props.radio.stop();emit('stopped');}
</script>
<template>
 <section v-show="s.power || s.mode==='expanded'" ref="root" class="persistent-radio" :class="{'radio-docked':docked,'radio-expanded':s.mode==='expanded','radio-mini':!docked && s.mode!=='expanded'}" :style="style" :aria-label="c.receiver" data-radio-player @pointerdown.stop="releasePointer" @focusin="releasePointer" @keydown.stop @keydown.esc.stop.prevent="minimize">
  <header v-show="!docked" class="radio-player-actions"><span :title="radio.title" :aria-label="radio.title">{{ s.mode==='expanded'?radio.title:s.manualVideoId?'YT':String(s.station+1).padStart(2,'0') }}</span><RadioTransport :radio="radio" :locale="locale" show-stop/><button v-if="s.mode!=='expanded'" data-action="radio-expand" :aria-label="c.expand" :title="c.expand" @click="expand">↗</button><button v-else data-action="radio-minimize" :aria-label="c.minimize" :title="c.minimize" @click="minimize">↙</button><button data-action="radio-close" :aria-label="c.closeStop" :title="c.closeStop" @click="stop">×</button></header>
  <div ref="playerHost" class="persistent-youtube"/>
  <RadioStationControls v-if="s.mode==='expanded'" :radio="radio" :locale="locale"/>
  <details v-if="s.mode==='expanded'" class="radio-manual"><summary>{{ c.manual }}</summary><form @submit.prevent="radio.playManual(manualId)"><label>{{ c.videoId }}<input v-model="manualId" required pattern="[A-Za-z0-9_-]{11}" minlength="11" maxlength="11" autocomplete="off"></label><button type="submit">{{ c.load }}</button></form><a :href="radio.sourceUrl" target="_blank" rel="noopener noreferrer">{{ c.external }} ↗</a></details>
  <p v-if="['error','gesture','unavailable','presentation'].includes(s.status)" class="radio-player-error" role="status">{{ c[s.status as keyof typeof c] }} <a :href="radio.sourceUrl" target="_blank" rel="noopener noreferrer">{{ c.external }}</a></p>
 </section>
</template>
