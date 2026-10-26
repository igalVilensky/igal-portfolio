<script setup lang="ts">
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { modules, type Locale } from './registry';
import { height, riverX, routes, terrainGeometry } from './terrain';
const props=defineProps<{selected:string|null; locale:Locale; light:boolean}>();
const emit=defineEmits<{select:[id:string];failure:[]}>();
const host=ref<HTMLDivElement>();
const labels=ref<{id:string;x:number;y:number;visible:boolean}[]>([]);
let renderer:T.WebGLRenderer,scene:T.Scene,camera:T.OrthographicCamera,controls:OrbitControls,observer:ResizeObserver,frame=0;
let dead=false,hovered:string|null=null, reduced:MediaQueryList;
const groups=new Map<string,T.Group>(), targets:T.Object3D[]=[];
let sun:T.DirectionalLight,sky:T.HemisphereLight;
let destination:T.Vector3|null=null,desiredZoom=1,water:T.Mesh;
const pointer=new T.Vector2(),ray=new T.Raycaster();
const mat=(color:string,metalness=0)=>new T.MeshStandardMaterial({color,roughness:.8,metalness});
const materials={stone:mat('#c1c9bf'),wall:mat('#9eafb4'),roof:mat('#385b6b',.25),wood:mat('#a7815b'),glass:mat('#8dc2c8',.35),gold:mat('#cbb68a',.2),dark:mat('#3c5159')};
const boxGeo=new T.BoxGeometry(1,1,1), cylinderGeo=new T.CylinderGeometry(1,1,1,32),coneGeo=new T.ConeGeometry(1,1,7);
function mesh(geo:T.BufferGeometry,material:T.Material,parent:T.Object3D,x:number,y:number,z:number,sx=1,sy=1,sz=1){const m=new T.Mesh(geo,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function box(p:T.Object3D,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){return mesh(boxGeo,m,p,x,y,z,sx,sy,sz);}
function landmark(type:string,g:T.Group){
 mesh(cylinderGeo,materials.stone,g,0,.08,0,1.6,.16,1.6);
 if(type==='workshop'){
  box(g,materials.wall,0,.7,0,2.6,1.2,1.6);box(g,materials.roof,0,1.38,0,2.9,.18,1.9);
  for(let i=0;i<4;i++){box(g,materials.glass,-.9+i*.6,.8,.82,.35,.55,.03);box(g,materials.roof,-.9+i*.6,1.6,0,.45,.28,1.6);}
  box(g,materials.dark,1.05,1.7,-.4,.3,1.6,.35);box(g,materials.wood,-1.7,.25,.1,.55,.4,1.3);
  box(g,materials.wall,-2.5,.5,-1.5,1.5,.9,1.8);box(g,materials.roof,-2.5,1,-1.5,1.7,.12,2);box(g,materials.glass,1.9,.45,-1,1,.8,2.4);
 }else if(type==='station'){
  box(g,materials.wall,0,.65,0,1.9,1.1,1.5);box(g,materials.roof,0,1.28,0,2.1,.16,1.7);
  const dish=mesh(new T.SphereGeometry(.65,24,12,0,Math.PI*2,0,Math.PI/2),materials.stone,g,0,1.85,0);dish.rotation.z=-.5;
  box(g,materials.gold,.3,2.2,0,.05,1,.05);
  for(let i=0;i<3;i++){const p=box(g,materials.glass,-1.9, .65, -.9+i*.85,.9,.08,.65);p.rotation.z=.25;}
 }else if(type==='pavilion'){
  for(let i=0;i<8;i++){const a=i*Math.PI/4;box(g,materials.wood,Math.cos(a)*1.1,.8,Math.sin(a)*1.1,.1,1.5,.1);}
  mesh(new T.ConeGeometry(1.65,.6,8),materials.roof,g,0,1.75,0);
  mesh(new T.SphereGeometry(.42,24,16),materials.glass,g,0,.85,0);
  for(let i=0;i<5;i++){box(g,materials.wood,-2,.15,-1+i*.55,.7,.25,.35);}
 }else if(type==='observatory'){
  mesh(cylinderGeo,materials.wall,g,0,.7,0,1,1.3,1);
  mesh(new T.SphereGeometry(1.05,32,16,0,Math.PI*2,0,Math.PI/2),materials.roof,g,0,1.32,0);
  const scope=mesh(cylinderGeo,materials.gold,g,.5,1.9,.2,.18,1.6,.18);scope.rotation.z=-.85;
 }else if(type==='archive'){
  box(g,materials.stone,0,.9,0,2.1,1.7,1.25);box(g,materials.roof,0,1.85,0,2.4,.18,1.6);
  for(let i=0;i<5;i++)box(g,materials.wood,-.8+i*.4,1,.65,.15,1.2,.06);
  for(let i=0;i<4;i++)box(g,materials.stone,0,.1+i*.07,1.45-i*.19,1.5,.12,.4);
 }else if(type==='stage'){
  for(let i=0;i<5;i++){const tier=mesh(new T.TorusGeometry(1.8+i*.36,.16,4,40,Math.PI*1.35),materials.stone,g,0,.2+i*.18,0);tier.rotation.x=-Math.PI/2;tier.rotation.z=-.55;}mesh(cylinderGeo,materials.wood,g,0,.18,0,1.3,.25,1.3);
  const arch=mesh(new T.TorusGeometry(1.15,.1,8,40,Math.PI),materials.gold,g,0,.4,0);arch.rotation.z=0;
 }else{mesh(new T.ConeGeometry(1.7,.45,6),materials.roof,g,0,1.6,0);for(let i=0;i<6;i++){const a=i*Math.PI/3;box(g,materials.wood,Math.cos(a)*1.4,.8,Math.sin(a)*1.4,.12,1.6,.12);}for(let i=0;i<7;i++){const a=i*Math.PI*2/7;box(g,materials.stone,Math.cos(a),.22,Math.sin(a),.45,.35,.45);} }
}
function path(points:[number,number][],width:number,material:T.Material){
 const curve=new T.CatmullRomCurve3(points.map(([x,z])=>new T.Vector3(x,height(x,z)+.09,z)));
 const vs:number[]=[],ix:number[]=[];
 for(let i=0;i<=100;i++){const p=curve.getPoint(i/100),d=curve.getTangent(i/100);for(const side of [-1,1]){const x=p.x+d.z*width*side,z=p.z-d.x*width*side;vs.push(x,height(x,z)+.08,z);}if(i<100){const a=i*2;ix.push(a,a+2,a+1,a+1,a+2,a+3);}}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vs,3));geo.setIndex(ix);geo.computeVertexNormals();const m=new T.Mesh(geo,material);m.receiveShadow=true;scene.add(m);
}
function appearance(){if(!scene)return;if(renderer)renderer.shadowMap.needsUpdate=true;const bg=props.light?'#dce6e7':'#172a35';scene.background=new T.Color(bg);scene.fog=new T.Fog(bg,110,240);if(water)(water.material as T.MeshStandardMaterial).color.set(props.light?'#709da5':'#294c60');if(sun){sun.color.set(props.light?'#ffe6bb':'#accce5');sun.intensity=props.light?3.3:1.7;sky.intensity=props.light?2.3:1.35;} }
function moveTo(x:number,z:number,zoom:number){destination=new T.Vector3(x,Math.max(0,height(x,z)),z);desiredZoom=zoom;}
function reset(){moveTo(-19,9,1);}
function overview(){moveTo(0,0,innerWidth<600?.23:.46);}
function focus(id:string){const m=modules.find(m=>m.id===id);if(!m)return;moveTo(...m.position,innerWidth<600?1.25:1.65);}
function saveView(){if(!camera)return;sessionStorage.setItem('world-lab-view',JSON.stringify({x:controls.target.x,z:controls.target.z,zoom:camera.zoom}));}
watch(()=>props.selected,id=>id?focus(id):undefined);watch(()=>props.light,appearance);
defineExpose({reset,focus,overview,saveView,zoom:(factor:number)=>{desiredZoom=T.MathUtils.clamp(camera.zoom*factor,.23,2.8);destination=controls.target.clone();}});
function pick(e:PointerEvent){const r=host.value!.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(targets,true)[0]?.object.parent?.userData.id as string|undefined;}
let down={x:0,y:0};
function onDown(e:PointerEvent){down={x:e.clientX,y:e.clientY};destination=null;}
function onMove(e:PointerEvent){if(e.pointerType==='mouse'){hovered=pick(e)??null;host.value!.style.cursor=hovered?'pointer':'grab';}}
function onUp(e:PointerEvent){if(Math.hypot(e.clientX-down.x,e.clientY-down.y)<7){const id=pick(e);if(id)emit('select',id);}}
const fail=(e:Event)=>{e.preventDefault();cancelAnimationFrame(frame);emit('failure');};
onMounted(()=>{
 try{
 scene=new T.Scene();appearance();reduced=matchMedia('(prefers-reduced-motion: reduce)');
 renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
 host.value!.prepend(renderer.domElement);renderer.domElement.addEventListener('webglcontextlost',fail);
 camera=new T.OrthographicCamera(-24,24,18,-18,.1,650);camera.far=350;camera.position.set(18,48,61);camera.lookAt(-19,1,9);
 controls=new OrbitControls(camera,renderer.domElement);controls.enableRotate=false;controls.enableDamping=true;controls.dampingFactor=.1;controls.minZoom=.23;controls.maxZoom=2.8;controls.zoomSpeed=.7;controls.panSpeed=.75;controls.target.set(-19,1,9);controls.mouseButtons={LEFT:T.MOUSE.PAN,MIDDLE:T.MOUSE.DOLLY,RIGHT:T.MOUSE.PAN};controls.touches={ONE:T.TOUCH.PAN,TWO:T.TOUCH.DOLLY_PAN};controls.screenSpacePanning=false;controls.addEventListener('start',()=>{destination=null;});
 // Gestures belong to the map canvas only; surrounding page remains scrollable.
 renderer.domElement.style.touchAction='none';
 sky=new T.HemisphereLight('#dcefff','#53634f',2.4);scene.add(sky);
 sun=new T.DirectionalLight('#ffe6bb',3.3);sun.position.set(-38,65,24);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-60;sun.shadow.camera.right=60;sun.shadow.camera.top=50;sun.shadow.camera.bottom=-50;sun.shadow.normalBias=.04;scene.add(sun);
 const rim=new T.DirectionalLight('#9fc9e1',1.3);rim.position.set(12,10,-20);scene.add(rim);
 const terrain=new T.Mesh(terrainGeometry(),new T.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true}));terrain.receiveShadow=true;terrain.castShadow=false;scene.add(terrain);
 water=new T.Mesh(new T.PlaneGeometry(1000,1000),new T.MeshStandardMaterial({color:props.light?'#719ca5':'#294c60',metalness:.35,roughness:.32}));water.rotation.x=-Math.PI/2;water.position.y=-.19;water.receiveShadow=true;scene.add(water);
 const road=mat('#c2b698');for(const route of routes)path(route.points,route.width,road);
 // A level viaduct carries the valley road across the river; abutments follow the banks.
 const bx=riverX(10),bridgeY=2.4;
 box(scene,materials.stone,bx,bridgeY,10,8,.3,1.1);
 for(const z of [9.43,10.57]){box(scene,materials.dark,bx,bridgeY+.55,z,8,.09,.08);for(let x=bx-3.5;x<bx+4;x+=1.4)box(scene,materials.stone,x,bridgeY-.1,z,.2,1.5,.2);}
 const footbridge=new T.Group();footbridge.position.set(riverX(30),2,30);footbridge.rotation.y=-.22;scene.add(footbridge);
 box(footbridge,materials.wood,0,0,0,6,.2,.85);for(const z of [-.48,.48]){box(footbridge,materials.wood,0,.5,z,6,.08,.07);for(const x of [-2.8,0,2.8])box(footbridge,materials.wood,x,0,z,.12,1.1,.12);}
 for(const m of modules){const g=new T.Group();g.userData.id=m.id;g.position.set(m.position[0],height(...m.position)+.03,m.position[1]);landmark(m.landmark,g);scene.add(g);groups.set(m.id,g);targets.push(g);}
 // Seeded groves: reject roads, river and landmark footprints.
 let seed=41;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const trunks=new T.InstancedMesh(cylinderGeo,materials.wood,650),crowns=new T.InstancedMesh(coneGeo,mat('#395f56'),650);let count=0;const dummy=new T.Object3D();
 for(let i=0;i<4000&&count<650;i++){const x=(random()-.5)*100,z=(random()-.5)*78,y=height(x,z);if(y<.45||y>6.5||Math.abs(x-riverX(z))<1.7||modules.some(m=>Math.hypot(x-m.position[0],z-m.position[1])<3.6)||routes.some(r=>r.points.some(p=>Math.hypot(x-p[0],z-p[1])<2))||!((x<-29)||(z<-5&&x>6)||(z>16&&x<-8)))continue;const s=.65+random()*.65;dummy.position.set(x,y+s*.35,z);dummy.scale.set(.1,s*.7,.1);dummy.updateMatrix();trunks.setMatrixAt(count,dummy.matrix);dummy.position.y=y+s;dummy.scale.set(s*.5,s*1.3,s*.5);dummy.updateMatrix();crowns.setMatrixAt(count++,dummy.matrix);}
 trunks.count=crowns.count=count;trunks.castShadow=crowns.castShadow=true;scene.add(trunks,crowns);
 appearance();
 observer=new ResizeObserver(()=>{const {width:w,height:h}=host.value!.getBoundingClientRect();renderer.setSize(w,h);const span=w<600?34:44;camera.left=-span*w/h/2;camera.right=span*w/h/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();});observer.observe(host.value!);
 reset();try{const saved=JSON.parse(sessionStorage.getItem('world-lab-view')||'null');if(saved&&[saved.x,saved.z,saved.zoom].every(Number.isFinite))moveTo(T.MathUtils.clamp(saved.x,-40,40),T.MathUtils.clamp(saved.z,-30,32),T.MathUtils.clamp(saved.zoom,.23,2.8));}catch{}if(props.selected)focus(props.selected);
 let lastFrame=performance.now();
 const render=()=>{if(dead)return;frame=requestAnimationFrame(render);const now=performance.now(),elapsed=now-lastFrame;lastFrame=now;if(destination){const k=reduced.matches?1:1-Math.exp(-Math.min(1500,elapsed)/450);const shift=destination.clone().sub(controls.target).multiplyScalar(k);camera.position.add(shift);controls.target.add(shift);camera.zoom=T.MathUtils.lerp(camera.zoom,desiredZoom,k);camera.updateProjectionMatrix();if(shift.length()<.001&&Math.abs(camera.zoom-desiredZoom)<.001)destination=null;}
 controls.update();const x=T.MathUtils.clamp(controls.target.x,-40,40),z=T.MathUtils.clamp(controls.target.z,-30,32);
 const correction=new T.Vector3(x-controls.target.x,0,z-controls.target.z).multiplyScalar(.18);camera.position.add(correction);controls.target.add(correction);
 const time=performance.now()*.001;for(const [id,g] of groups){const s=id===props.selected?1.09:id===hovered?1.05:1;g.scale.lerp(new T.Vector3(s,s,s),reduced.matches?1:.15);}
 if(!reduced.matches){(water.material as T.MeshStandardMaterial).roughness=.34+Math.sin(time*.4)*.035;}
 labels.value=modules.map(m=>{const p=new T.Vector3(m.position[0],height(...m.position)+2.9,m.position[1]).project(camera);return {id:m.id,x:(p.x+1)*host.value!.clientWidth/2,y:(1-p.y)*host.value!.clientHeight/2,visible:p.z<1&&Math.abs(p.x)<.91&&Math.abs(p.y)<.88};});renderer.render(scene,camera);};render();
 }catch{emit('failure');}
});
onBeforeUnmount(()=>{saveView();dead=true;cancelAnimationFrame(frame);observer?.disconnect();controls?.dispose();renderer?.domElement.removeEventListener('webglcontextlost',fail);const geometries=new Set<T.BufferGeometry>(),mats=new Set<T.Material>();scene?.traverse(o=>{if(o instanceof T.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material])mats.add(m);}});geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());renderer?.dispose();});
</script>
<template>
 <div ref="host" class="continent" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp">
  <button v-for="label in labels" v-show="label.visible" :key="label.id" class="place-label" :class="{chosen:selected===label.id}" :style="{left:label.x+'px',top:label.y+'px'}" @pointerdown.stop @pointerup.stop @click="emit('select',label.id)"><span class="place-dot"/>{{ modules.find(m=>m.id===label.id)!.title[locale] }}<span v-if="modules.find(m=>m.id===label.id)!.status==='planned'" aria-hidden="true"> ◌</span></button>
 </div>
</template>
