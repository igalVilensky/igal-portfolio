<script setup lang="ts">
import {MapPin,Navigation,Plus,Minus,X,Route,DoorOpen,Layers} from 'lucide-vue-next';
import {originBoundary} from './origin';
import {mapDestinations,mapRooms,projectWorld,selectMapDestination,starAtlasBounds,horizonAtlasBounds} from './world-map';
import {horizonBoundary} from './star-geography';
import {createHorizonRoute} from './horizon-transit';
import {horizonCopy} from './horizon-copy';
import {navigationCopy} from './navigation-copy';
const props=defineProps<{position:{x:number;z:number;yaw?:number};environment:string;notice?:string;device?:{x:number;z:number}}>();
const emit=defineEmits<{close:[];travel:[id:string]}>();
const {locale}=useI18n();
const language=computed(()=>locale.value==='de'||locale.value==='ru'?locale.value:'en');
const c=computed(()=>navigationCopy[language.value]);
const overview=ref(props.position.x>400);
const bounds=computed(()=>overview.value?horizonAtlasBounds:starAtlasBounds);
const hc=computed(()=>horizonCopy[language.value]);
const viewBox=computed(()=>`${bounds.value.minX} ${bounds.value.minZ} ${bounds.value.maxX-bounds.value.minX} ${bounds.value.maxZ-bounds.value.minZ}`);
const remoteOutline=horizonBoundary.map(p=>p.join(',')).join(' ');
const routeLine=createHorizonRoute().getSpacedPoints(80).map(p=>`${p.x},${p.z}`).join(' ');
const visibleDestinations=computed(()=>mapDestinations.filter(d=>overview.value||d.point[0]<400));
const selected=ref(''),zoom=ref(1.5),viewport=ref<HTMLElement>(),panel=ref<HTMLElement>(),closeButton=ref<HTMLButtonElement>();
const destination=computed(()=>selectMapDestination(selected.value));
const local=computed(()=>['antipayuta','sun-world','vault','secret'].includes(props.environment));
const player=computed(()=>projectWorld(props.position.x,props.position.z,bounds.value));
const outline=originBoundary.map(([x,z])=>`${x},${z}`).join(' ');
const marker=(d:typeof mapDestinations[number])=>projectWorld(d.id==='sky-explorer'&&props.device?props.device.x:d.point[0],d.id==='sky-explorer'&&props.device?props.device.z:d.point[2],bounds.value);
function trap(e:KeyboardEvent){if(e.key==='Escape'){e.preventDefault();emit('close');return;}if(e.key!=='Tab')return;const nodes=panel.value?.querySelectorAll<HTMLElement>('button:not(:disabled),[tabindex="0"]');if(!nodes?.length)return;const first=nodes[0]!,last=nodes[nodes.length-1]!;if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
onMounted(()=>{closeButton.value?.focus();if(viewport.value&&!local.value){viewport.value.scrollLeft=Math.max(0,player.value.x/100*viewport.value.scrollWidth-viewport.value.clientWidth/2);viewport.value.scrollTop=Math.max(0,player.value.y/100*viewport.value.scrollHeight-viewport.value.clientHeight/2);}});
</script>
<template>
 <section ref="panel" class="island-map" role="dialog" aria-modal="true" aria-labelledby="island-map-title" @keydown.stop="trap" @pointerdown.stop>
  <header><div><p>ARRIVAL</p><h2 id="island-map-title">{{c.map}}</h2></div><button ref="closeButton" :aria-label="c.close" :title="c.close" @click="emit('close')"><X aria-hidden="true"/></button></header>
  <div class="atlas-toolbar"><span>{{overview?hc.outpost:hc.star}}</span><button @click="overview=!overview">{{overview?hc.star:hc.outpost}}</button><div><button :disabled="zoom<=1" :aria-label="c.zoomOut" @click="zoom=Math.max(1,zoom-.5)"><Minus aria-hidden="true"/></button><button :disabled="zoom>=4" :aria-label="c.zoomIn" @click="zoom=Math.min(4,zoom+.5)"><Plus aria-hidden="true"/></button></div></div>
  <div ref="viewport" class="atlas-viewport" tabindex="0" :aria-label="c.map">
   <div class="atlas-sheet" :style="{width:`${zoom*100}%`,height:`${zoom*420}px`}">
    <svg :viewBox="viewBox" preserveAspectRatio="none" aria-hidden="true">
     <defs><pattern id="atlas-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#b4ccc4" stroke-width=".25"/></pattern></defs>
     <rect :x="bounds.minX" :y="bounds.minZ" :width="bounds.maxX-bounds.minX" :height="bounds.maxZ-bounds.minZ" fill="url(#atlas-grid)"/>
     <polyline :points="routeLine" fill="none" stroke="#997249" stroke-width="2" stroke-dasharray="6 5"/><polygon :points="remoteOutline" fill="#d9d8bd" stroke="#82998e" stroke-width="1"/>
     <polygon :points="outline" fill="#d9d8bd" stroke="#82998e" stroke-width="1"/>
     <ellipse cx="-170" cy="65" rx="41" ry="39" fill="#78b8b3" stroke="#4c8986"/>
     <rect x="-190" y="104" width="48" height="48" rx="3" fill="#a7c2aa" stroke="#6b8b77"/>
     <rect x="210" y="25.5" width="64" height="55" rx="10" fill="#d9d8bd" stroke="#82998e"/>
     <path d="M84 48H212 M-112 62H-134 M-166 101V113" stroke="#c6c8ad" stroke-width="4" fill="none"/>
     <g fill="#eae6d5" stroke="#84958b" stroke-width=".5"><rect v-for="s in mapRooms.filter(d=>!['origin','loop-district','living-lagoon','creation-yard','skybridge'].includes(d.id))" :key="s.id" :x="s.bounds[0]" :y="s.bounds[2]" :width="s.bounds[1]-s.bounds[0]" :height="s.bounds[3]-s.bounds[2]" rx="1"/></g>
     <path d="M0 -95V19H-92 M12 19V62H-104 M20 19H96 M12 62H65V50H210 M-32 19V29H-20V33" stroke="#718d83" stroke-width="1.2" fill="none" stroke-dasharray="3 2"/>
    </svg>
    <button v-for="d in visibleDestinations" :key="d.id" class="atlas-marker" :class="{selected:selected===d.id,major:['arrival','living-lagoon','living-quarters','loop-district','creation-yard','living-works'].includes(d.id)}" :style="{left:`${marker(d).x}%`,top:`${marker(d).y}%`}" :aria-label="d.names[language]" :aria-pressed="selected===d.id" :title="d.names[language]" @click="selected=d.id"><DoorOpen v-if="d.kind==='door'" aria-hidden="true"/><Layers v-else-if="d.kind==='project'" aria-hidden="true"/><Navigation v-else-if="d.kind==='station'" aria-hidden="true"/><MapPin v-else aria-hidden="true"/><span>{{d.names[language]}}</span></button>
    <div v-if="!local" class="atlas-player" :style="{left:`${player.x}%`,top:`${player.y}%`,transform:`translate(-50%,-50%) rotate(${-(position.yaw||0)*180/Math.PI}deg)`}" :aria-label="c.you" role="img"><Navigation aria-hidden="true"/></div>
   </div>
  </div>
  <div v-if="local" class="atlas-local"><strong>{{environment==='antipayuta'?c.north:environment==='sun-world'?c.israel:environment==='vault'?c.vault:c.local}}</strong><p>{{c.local}} · X {{position.x.toFixed(1)}} / Z {{position.z.toFixed(1)}}</p><svg :viewBox="environment==='antipayuta'?'-25 -12 70 115':environment==='sun-world'?'-20 -8 120 55':environment==='vault'?'375 410 50 65':`${position.x-20} ${position.z-12} 40 24`" role="img" :aria-label="c.you"><rect v-if="environment==='vault'" x="383" y="420" width="34" height="46" fill="#54706a"/><rect v-if="environment==='antipayuta'" x="10" y="75.5" width="6" height="5" fill="#b9956e"/><path v-if="environment==='sun-world'" d="M0 0V12H9V32H90M-13 37H94M24 13H90M24 18H90M43 10V32M58 10V32M73 10V32" fill="none" stroke="#b3c5b4" stroke-width="2"/><circle :cx="position.x" :cy="position.z" r="1" fill="#d47c4e"/><path :d="`M${position.x} ${position.z}v-4`" stroke="#fff"/></svg></div>
  <footer aria-live="polite"><template v-if="destination"><h3>{{destination.names[language]}}</h3><p>{{destination.id.startsWith('horizon')?hc.connection:destination.kind==='door'?c.remote:c.description}}</p><button class="atlas-travel" @click="emit('travel',destination.id)"><Route aria-hidden="true"/>{{c.travel}}</button></template><p v-else>{{c.choose}}</p><p v-if="notice" role="status">{{notice}}</p><small>{{c.you}} · {{c.description}}</small></footer>
 </section>
</template>
<style scoped>
.island-map{position:absolute;z-index:35;inset:3dvh auto auto 50%;transform:translateX(-50%);width:min(960px,96vw);max-height:94dvh;overflow:auto;background:#edf0e4;color:#233c3b;border:1px solid #9aafa1;border-radius:18px;box-shadow:0 24px 90px #0d232a66;font:16px/1.45 system-ui,sans-serif}.island-map header{display:flex;align-items:center;justify-content:space-between;padding:16px 22px;border-bottom:1px solid #9aafa150}.island-map h2{font:500 26px Georgia,serif;margin:0}.island-map header p{font-size:12px;letter-spacing:.2em;margin:0}.island-map button{color:inherit;font:inherit;cursor:pointer;border:1px solid #8a9b8d;border-radius:50%;background:#edf0e4;min-width:44px;min-height:44px;display:inline-grid;place-items:center}.island-map button:disabled{opacity:.4;cursor:default}.island-map button:focus-visible,.atlas-viewport:focus-visible{outline:3px solid #226f72;outline-offset:2px}.island-map svg{width:20px;height:20px}.atlas-toolbar{display:flex;align-items:center;justify-content:space-between;padding:8px 18px;font-size:14px}.atlas-toolbar>div{display:flex;gap:8px}.atlas-viewport{height:clamp(240px,48dvh,500px);overflow:auto;overscroll-behavior:contain;background:#d8e6df;touch-action:pan-x pan-y}.atlas-sheet{position:relative;min-width:100%;isolation:isolate}.atlas-sheet>svg{position:absolute;width:100%;height:100%;inset:0}.atlas-marker{position:absolute;transform:translate(-50%,-50%);z-index:1;background:#f8f5e6!important;min-width:36px!important;min-height:36px!important;box-shadow:0 2px 5px #20363322}.atlas-marker svg{width:17px;height:17px}.atlas-marker span{position:absolute;bottom:calc(100% + 3px);width:max-content;max-width:150px;font-size:13px;line-height:1.2;background:#edf0e4ed;border-radius:4px;padding:3px 5px;pointer-events:none;display:none}.atlas-marker.major span{display:block}.atlas-marker:hover,.atlas-marker:focus-visible,.atlas-marker.selected{z-index:4;background:#bad6c9!important;border-color:#236d66}.atlas-marker:is(:hover,:focus-visible,.selected) span{display:block}.atlas-player{position:absolute;z-index:5;border:3px solid #fff7e6;background:#b65b31;border-radius:50%;padding:5px;color:white;pointer-events:none;box-shadow:0 0 0 5px #b65b3133}.atlas-player svg{display:block;transform:rotate(-45deg)}.island-map footer{padding:16px 22px;border-top:1px solid #9aafa150}.island-map footer h3{font-size:20px;margin:0}.island-map footer p{margin:6px 0 12px}.island-map footer small{font-size:13px;display:block;margin-top:10px;color:#4b6360}.island-map .atlas-travel{border-radius:24px;padding:8px 18px;display:inline-flex;gap:10px;background:#264f4e;color:#fff}.atlas-local{padding:12px 22px;background:#233c3b;color:#edf0e4}.atlas-local p{font-size:14px}.atlas-local svg{width:100%;height:70px;background:#344e4d;border-radius:8px}@media(max-width:600px){.island-map{inset:1dvh auto auto 50%;max-height:98dvh}.island-map header,.island-map footer{padding:12px 16px}.atlas-marker{min-width:44px!important;min-height:44px!important}.atlas-viewport{height:42dvh}}
</style>
