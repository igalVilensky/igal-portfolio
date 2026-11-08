<script setup lang="ts">
import { joystickIntent } from './touch-input.mjs';
const props=defineProps<{label:string;help:string}>();
const emit=defineEmits<{move:[x:number,z:number,sprint:boolean]}>();
const pad=ref<HTMLElement>();const thumb=ref({x:0,y:0});const active=ref(false);const fast=ref(false);
let pointer:number|undefined, originX=0,originY=0;
function reset(){pointer=undefined;active.value=false;fast.value=false;thumb.value={x:0,y:0};emit('move',0,0,false);}
function move(e:PointerEvent){if(e.pointerId!==pointer)return;const dx=e.clientX-originX,dy=e.clientY-originY;const n=Math.max(1,Math.hypot(dx,dy)/48);thumb.value={x:dx/n,y:dy/n};const intent=joystickIntent(dx,dy);fast.value=intent.sprint;emit('move',intent.x,intent.z,intent.sprint);}
function down(e:PointerEvent){if(pointer!==undefined)return;pointer=e.pointerId;const r=pad.value!.getBoundingClientRect();originX=r.left+r.width/2;originY=r.top+r.height/2;pad.value!.setPointerCapture(e.pointerId);active.value=true;move(e);}
function up(e:PointerEvent){if(e.pointerId===pointer)reset();}
onMounted(()=>{window.addEventListener('blur',reset);window.addEventListener('orientationchange',reset);window.addEventListener('resize',reset);document.addEventListener('visibilitychange',reset);});
onBeforeUnmount(()=>{reset();window.removeEventListener('blur',reset);window.removeEventListener('orientationchange',reset);window.removeEventListener('resize',reset);document.removeEventListener('visibilitychange',reset);});
</script>
<template><div class="arrival-touch"><div ref="pad" class="arrival-joystick" :class="{active,fast}" role="group" :aria-label="props.label" @pointerdown.prevent="down" @pointermove.prevent="move" @pointerup="up" @pointercancel="up" @lostpointercapture="up"><span class="joystick-thumb" :style="{transform:`translate(${thumb.x}px,${thumb.y}px)`}"/><span class="joystick-direction" aria-hidden="true">↑</span></div><p>{{ help }}</p></div></template>
