<script setup lang="ts">
import * as T from 'three';
import { presets,bases,addons,colors,figurine,disposeObject,type PrintDesign } from './print-model';
const props=defineProps<{design:PrintDesign;progress:number|null;count:number;notice:string}>();
const emit=defineEmits<{close:[];change:[PrintDesign];print:[]}>();
const host=ref<HTMLDivElement>(),closeButton=ref<HTMLButtonElement>();
const busy=computed(()=>props.progress!==null);
function change(p:Partial<PrintDesign>){emit('change',{...props.design,...p});}
let renderer:T.WebGLRenderer|undefined,scene:T.Scene, camera:T.PerspectiveCamera,toy:T.Group|undefined,observer:ResizeObserver;
function draw(){if(!renderer)return;if(toy)disposeObject(toy);toy=figurine(props.design);toy.rotation.y=.45;scene.add(toy);renderer.render(scene,camera);}
watch(()=>props.design,draw,{deep:true});
onMounted(()=>{closeButton.value?.focus();try{scene=new T.Scene();scene.background=new T.Color('#e8eee4');camera=new T.PerspectiveCamera(38,1,.1,20);camera.position.set(3,2.3,4);camera.lookAt(0,.9,0);scene.add(new T.HemisphereLight('#ffffff','#687994',3));const lamp=new T.DirectionalLight('#fff2d9',4);lamp.position.set(3,5,4);scene.add(lamp);renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.domElement.setAttribute('aria-label','3D preview of your creation');renderer.domElement.setAttribute('role','img');host.value!.appendChild(renderer.domElement);observer=new ResizeObserver(()=>{const r=host.value!.getBoundingClientRect();renderer!.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();draw();});observer.observe(host.value!);draw();}catch{host.value!.textContent='Your chosen toy will be made in the printer.';}});
onBeforeUnmount(()=>{observer?.disconnect();if(toy)disposeObject(toy);renderer?.dispose();});
function keys(e:KeyboardEvent){if(e.key==='Escape'){e.preventDefault();emit('close');}if(e.key==='Tab'){const buttons=[...((e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('button:not(:disabled)'))];const first=buttons[0],last=buttons.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}}
</script>
<template>
 <div class="print-backdrop" @keydown.stop="keys" @pointerdown.stop>
 <section class="print-panel" role="dialog" aria-modal="true" aria-labelledby="print-title">
 <header><div><small>ARRIVAL / MAKER SPACE</small><h2 id="print-title">Print Lab</h2></div><button ref="closeButton" aria-label="Close Print Lab" @click="emit('close')">✕</button></header>
 <p>Dream up a little toy. Print it. Find it on your display wall.</p>
 <div class="print-layout"><div ref="host" class="print-preview"/><div>
 <fieldset :disabled="busy"><legend>1 · Choose or make</legend><div class="print-options"><button v-for="p in presets" :key="p" :aria-pressed="design.type===p" @click="change({type:p})">{{p}}</button><button :aria-pressed="design.type==='custom'" @click="change({type:'custom'})">Build your own</button></div>
 <template v-if="design.type==='custom'"><p>Body</p><div class="print-options"><button v-for="base in bases" :key="base" :aria-pressed="design.base===base" @click="change({base})">{{base}}</button></div><p>Add a little magic</p><div class="print-options"><button v-for="addon in addons" :key="addon" :aria-pressed="design.addon===addon" @click="change({addon})">{{addon}}</button></div></template>
 </fieldset><fieldset :disabled="busy"><legend>2 · Pick a color</legend><div class="print-options"><button v-for="(color,i) in colors" :key="color" :aria-label="['Coral','Mint','Lilac','Sunshine'][i]" :aria-pressed="design.color===color" :style="{background:color}" @click="change({color})">{{design.color===color?'✓':'○'}}</button></div></fieldset>
 <button class="print-start" :disabled="busy||count>=12" @click="emit('print')">{{busy?'Making your creation…':count>=12?'Display full · 12 creations':'3 · Print my '+(design.type==='custom'?'creation':design.type)}}</button>
 <div v-if="busy"><progress :value="progress??0" max="1" aria-label="Printing progress"/><p>{{Math.round((progress??0)*100)}}% · Watch the printer in the room, or stay here.</p></div>
 <p role="status" aria-live="polite">{{notice}}</p><small>{{count}} / 12 display spots · Saved on this device</small>
 </div></div>
 </section></div>
</template>
<style scoped>
.print-backdrop{position:absolute;inset:0;z-index:42;background:#142b404a;display:grid;place-items:center;padding:20px}.print-panel{background:#fff6e7;color:#283d54;border:2px solid #86d5c4;border-radius:24px;padding:24px;width:min(820px,100%);max-height:90dvh;overflow:auto;box-shadow:0 25px 90px #132b4266;font:15px/1.5 system-ui}.print-panel header{display:flex;justify-content:space-between;align-items:center}.print-panel h2{font-size:32px;margin:0}.print-panel small{letter-spacing:.05em}.print-layout{display:grid;grid-template-columns:1fr 1.25fr;gap:24px}.print-preview{height:300px;border-radius:18px;overflow:hidden;background:#e8eee4}.print-panel button{border:1px solid #b5c8bf;border-radius:12px;padding:9px 13px;background:#fffdf6;color:#283d54;cursor:pointer;text-transform:capitalize}.print-panel button[aria-pressed=true]{outline:3px solid #306d68;outline-offset:1px}.print-options{display:flex;flex-wrap:wrap;gap:9px}.print-panel fieldset{border:0;padding:10px 0 16px}.print-panel legend{font-weight:700}.print-panel button:disabled{opacity:.6;cursor:default}.print-panel .print-start{background:#293e59;color:white;width:100%;font-weight:700}.print-panel progress{width:100%;accent-color:#3ba58d;margin-top:18px}.print-panel button:focus-visible{outline:3px solid #226b91}@media(max-width:650px){.print-layout{grid-template-columns:1fr}.print-preview{height:180px}.print-panel{padding:18px}.print-backdrop{padding:10px}}
</style>
