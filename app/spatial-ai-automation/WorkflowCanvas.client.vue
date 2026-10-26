<script setup lang="ts">
import * as T from 'three';
import { createGraph } from './geometry';
import { nodes, type Language } from './model';
import type { WorkflowMotion } from './motion';
const props=defineProps<{motion:WorkflowMotion;language:Language;selected:string|null;edge:string|null;view:number;zoom:number;label:string}>();
const emit=defineEmits<{select:[string];connection:[string];unavailable:[]}>();
const host=ref<HTMLDivElement>();const mode=useColorMode();
let renderer:T.WebGLRenderer|undefined,scene:T.Scene,camera:T.PerspectiveCamera,graph:ReturnType<typeof createGraph>|undefined,observer:ResizeObserver,frame=0,dead=false;
let width=1,height=1,pan=0,vertical=0,yaw=-.07,pitch=.10,zoom=1;
let pointer:number|null=null,sx=0,sy=0,px=0,py=0,dragged=false;
const ray=new T.Raycaster();
function wake(){if(!dead&&!frame&&!document.hidden)frame=requestAnimationFrame(draw);}
function draw(){frame=0;if(!renderer||!graph)return;graph.update({phase:props.motion.phase,time:props.motion.time,active:props.motion.active,selected:props.selected,edge:props.edge,events:props.motion.events,reduced:props.motion.reduced});graph.root.rotation.set(pitch,yaw,0);camera.position.set(pan,vertical,zoom);camera.lookAt(pan,vertical,0);renderer.render(scene,camera);}
function fit(){pan=0;vertical=-.45;yaw=-.07;pitch=.10;const distance=width<600?9:Math.max(10,9.6/(width/height*Math.tan(T.MathUtils.degToRad(19))));zoom=distance;wake();}
function resize(){if(!renderer)return;width=host.value!.clientWidth;height=host.value!.clientHeight;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();fit();if(width<600)focus(props.selected??props.motion.active??'request');}
function focus(id:string|null){if(width<600&&id){const n=nodes.find(n=>n.id===id);if(n){pan=n.position[0];vertical=n.position[1];wake();}}}
function rebuild(){if(!scene)return;if(graph){scene.remove(graph.root);graph.dispose();}graph=createGraph(props.language,mode.value==='dark');scene.add(graph.root);wake();}
function down(e:PointerEvent){if(e.button!==0||!e.isPrimary)return;pointer=e.pointerId;sx=px=e.clientX;sy=py=e.clientY;dragged=false;}
function move(e:PointerEvent){if(pointer!==e.pointerId)return;if(Math.hypot(e.clientX-sx,e.clientY-sy)>8){if(e.pointerType==='touch'&&Math.abs(e.clientY-sy)>Math.abs(e.clientX-sx)){pointer=null;return;}dragged=true;host.value?.setPointerCapture(e.pointerId);}
 if(dragged){if(e.shiftKey){yaw=T.MathUtils.clamp(yaw+(e.clientX-px)*.003,-.35,.35);pitch=T.MathUtils.clamp(pitch+(e.clientY-py)*.003,-.2,.3);}else{const scale=2*zoom*Math.tan(T.MathUtils.degToRad(19))/height;pan=T.MathUtils.clamp(pan-(e.clientX-px)*scale,-8,8);vertical=T.MathUtils.clamp(vertical+(e.clientY-py)*scale,-4,4);}wake();}px=e.clientX;py=e.clientY;}
function cancel(){if(pointer!==null&&host.value?.hasPointerCapture(pointer))host.value.releasePointerCapture(pointer);pointer=null;}
function up(e:PointerEvent){if(pointer!==e.pointerId)return;if(!dragged&&graph){const r=host.value!.getBoundingClientRect();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2),camera);const hit=ray.intersectObjects(graph.picks).find(h=>h.object.visible);if(hit?.object.userData.node)emit('select',hit.object.userData.node);else if(hit?.object.userData.edge)emit('connection',hit.object.userData.edge);}cancel();}
watch(()=>[props.motion.time,props.motion.phase,props.motion.reduced,props.selected,props.edge],wake);
watch(()=>props.selected,focus);watch(()=>props.motion.active,id=>{if(props.motion.playing)focus(id);});
watch(()=>props.view,()=>{fit();if(width<600){zoom=Math.max(10,9.6/(width/height*Math.tan(T.MathUtils.degToRad(19))));wake();}});
watch(()=>props.zoom,(value,old)=>{zoom=T.MathUtils.clamp(zoom*(value>old?.82:1.22),5,48);wake();});
watch(()=>[props.language,mode.value],rebuild);
function visibility(){if(!document.hidden)wake();}
function lost(e:Event){e.preventDefault();cleanup();emit('unavailable');}
function cleanup(){dead=true;cancelAnimationFrame(frame);observer?.disconnect();document.removeEventListener('visibilitychange',visibility);renderer?.domElement.removeEventListener('webglcontextlost',lost);graph?.dispose();renderer?.dispose();renderer?.domElement.remove();}
onMounted(()=>{try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=T.SRGBColorSpace;host.value!.appendChild(renderer.domElement);scene=new T.Scene();camera=new T.PerspectiveCamera(38,1,.1,100);scene.add(new T.HemisphereLight('#ecf6ff','#243b53',2.8));const light=new T.DirectionalLight('#f1f7ff',3);light.position.set(-4,6,10);scene.add(light);rebuild();observer=new ResizeObserver(resize);observer.observe(host.value!);resize();if(width<600)focus(props.selected??'request');document.addEventListener('visibilitychange',visibility);renderer.domElement.addEventListener('webglcontextlost',lost);}catch{cleanup();emit('unavailable');}});
onBeforeUnmount(cleanup);
</script>
<template><div ref="host" class="workflow-canvas" role="img" :aria-label="label" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="cancel" @lostpointercapture="cancel" /></template>
<style scoped>.workflow-canvas{position:absolute;inset:0;touch-action:pan-y;cursor:grab}.workflow-canvas:active{cursor:grabbing}.workflow-canvas :deep(canvas){display:block;width:100%;height:100%}</style>
