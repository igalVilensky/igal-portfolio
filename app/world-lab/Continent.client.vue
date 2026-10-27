<script setup lang="ts">
import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { modules, landmarkDimensions, type Locale } from './registry';
import { height, riverX, crossings, roadHeight, routes, sectors, sectorAt, worldBounds, terrainGeometry } from './terrain';
import { landmark, box, materials, cylinderGeo, coneGeo, mat } from './landmarks';
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
function distanceToRoute(x:number,z:number,points:[number,number][]){let best=Infinity;for(let i=1;i<points.length;i++){const a=points[i-1]!,b=points[i]!,dx=b[0]-a[0],dz=b[1]-a[1],t=T.MathUtils.clamp(((x-a[0])*dx+(z-a[1])*dz)/(dx*dx+dz*dz),0,1);best=Math.min(best,Math.hypot(x-a[0]-dx*t,z-a[1]-dz*t));}return best;}
function path(points:[number,number][],width:number,material:T.Material){
 const curve=new T.CatmullRomCurve3(points.map(([x,z])=>new T.Vector3(x,0,z)));
 const vs:number[]=[],ix:number[]=[];
 for(let i=0;i<=100;i++){const p=curve.getPoint(i/100),d=curve.getTangent(i/100);for(const side of [-1,1]){const x=p.x+d.z*width*side,z=p.z-d.x*width*side;vs.push(x,roadHeight(x,z),z);}if(i<100){const a=i*2;ix.push(a,a+2,a+1,a+1,a+2,a+3);}}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vs,3));geo.setIndex(ix);geo.computeVertexNormals();const m=new T.Mesh(geo,material);m.receiveShadow=true;scene.add(m);
}
function appearance(){if(!scene)return;const bg=props.light?'#dce6e7':'#111827';scene.background=new T.Color(bg);scene.fog=new T.Fog(bg,660,1100);if(water)(water.material as T.MeshStandardMaterial).color.set(props.light?'#709da5':'#294c60');if(sun){sun.color.set(props.light?'#ffe6bb':'#accce5');sun.intensity=props.light?2.5:1.8;sky.intensity=props.light?1.8:1.65;} }
function moveTo(x:number,z:number,zoom:number){destination=new T.Vector3(x,Math.max(0,height(x,z)),z);desiredZoom=zoom;}
function reset(){moveTo(-18,9,innerWidth<600?1.2:1.32);}
function overview(){const width=worldBounds.maxX-worldBounds.minX,depth=worldBounds.maxZ-worldBounds.minZ,right=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0),up=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,1);const projectedWidth=Math.abs(right.x)*width+Math.abs(right.z)*depth,projectedHeight=Math.abs(up.x)*width+Math.abs(up.z)*depth+24*Math.abs(up.y);const zoom=Math.min((camera.right-camera.left)/projectedWidth,(camera.top-camera.bottom)/projectedHeight)*.9;controls.minZoom=Math.min(.07,zoom);moveTo((worldBounds.minX+worldBounds.maxX)/2,(worldBounds.minZ+worldBounds.maxZ)/2,zoom);}
function focus(id:string){const m=modules.find(m=>m.id===id);if(!m)return;moveTo(...m.position,innerWidth<600?1.65:2.1);}
function saveView(){if(!camera)return;sessionStorage.setItem('world-lab-view',JSON.stringify({x:controls.target.x,z:controls.target.z,zoom:camera.zoom}));}
watch(()=>props.selected,id=>id?focus(id):undefined);watch(()=>props.light,appearance);
defineExpose({reset,focus,overview,saveView,zoom:(factor:number)=>{desiredZoom=T.MathUtils.clamp(camera.zoom*factor,.07,3.2);destination=controls.target.clone();}});
function pick(e:PointerEvent){const r=host.value!.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(targets,true)[0]?.object.parent?.userData.id as string|undefined;}
let down={x:0,y:0};
function onDown(e:PointerEvent){down={x:e.clientX,y:e.clientY};destination=null;}
function onMove(e:PointerEvent){if(e.pointerType==='mouse'){hovered=pick(e)??null;host.value!.style.cursor=hovered?'pointer':'grab';}}
function onUp(e:PointerEvent){if(Math.hypot(e.clientX-down.x,e.clientY-down.y)<7){const id=pick(e);if(id)emit('select',id);}}
const fail=(e:Event)=>{e.preventDefault();cancelAnimationFrame(frame);emit('failure');};
onMounted(()=>{
 try{
 scene=new T.Scene();appearance();reduced=matchMedia('(prefers-reduced-motion: reduce)');
 renderer=new T.WebGLRenderer({antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
 host.value!.prepend(renderer.domElement);renderer.domElement.addEventListener('webglcontextlost',fail);
 camera=new T.OrthographicCamera(-24,24,18,-18,.1,1600);camera.position.set(197,297,465);camera.lookAt(-19,1,9);
 controls=new OrbitControls(camera,renderer.domElement);controls.enableRotate=false;controls.enableDamping=true;controls.dampingFactor=.085;controls.minZoom=.07;controls.maxZoom=3.2;controls.zoomSpeed=.7;controls.panSpeed=.75;controls.target.set(-19,1,9);controls.mouseButtons={LEFT:T.MOUSE.PAN,MIDDLE:T.MOUSE.DOLLY,RIGHT:T.MOUSE.PAN};controls.touches={ONE:T.TOUCH.PAN,TWO:T.TOUCH.DOLLY_PAN};controls.screenSpacePanning=false;controls.addEventListener('start',()=>{destination=null;});
 // Gestures belong to the map canvas only; surrounding page remains scrollable.
 renderer.domElement.style.touchAction='none';
 sky=new T.HemisphereLight('#dcefff','#53634f',2.4);scene.add(sky);
 sun=new T.DirectionalLight('#ffe6bb',3.3);sun.position.set(-38,65,24);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-60;sun.shadow.camera.right=60;sun.shadow.camera.top=50;sun.shadow.camera.bottom=-50;sun.shadow.normalBias=.04;scene.add(sun);
 const rim=new T.DirectionalLight('#9fc9e1',1.3);rim.position.set(12,10,-20);scene.add(rim);
 const ground=new T.MeshStandardMaterial({vertexColors:true,roughness:1});for(const sector of sectors){const terrain=new T.Mesh(terrainGeometry(sector),ground);terrain.receiveShadow=true;scene.add(terrain);}
 water=new T.Mesh(new T.PlaneGeometry(4000,4000),new T.MeshStandardMaterial({color:props.light?'#719ca5':'#294c60',metalness:.35,roughness:.32}));water.rotation.x=-Math.PI/2;water.position.y=-.19;water.receiveShadow=true;scene.add(water);
 const road=mat('#c2b698');for(const route of routes)path(route.points,route.width,road);
 // Both river crossings share their deck/approach profile with the road ribbons.
 for(const b of crossings){const bridge=new T.Group();bridge.position.set(b.position[0],b.deck,b.position[1]);bridge.rotation.y=b.angle;scene.add(bridge);const material=materials[b.material];
  box(bridge,material,0,-.145,0,b.length,.26,b.width);
  for(const z of [-b.width/2-.05,b.width/2+.05]){box(bridge,materials.dark,0,.45,z,b.length,.07,.07);for(let x=-b.length/2+.3;x<=b.length/2;x+=1.5){box(bridge,material,x,.2,z,.1,.5,.1);const world=bridge.localToWorld(new T.Vector3(x,0,z)),bottom=Math.max(-.3,height(world.x,world.z));box(bridge,material,x,(bottom-b.deck)/2,z,.2,Math.max(.1,b.deck-bottom),.2);}}
 }
 for(const m of modules){const g=new T.Group();g.userData.id=m.id;g.position.set(m.position[0],height(...m.position)+.03,m.position[1]);landmark(m.landmark,g);scene.add(g);groups.set(m.id,g);targets.push(g);}
 // Seeded, geographically clustered vegetation. Three crown silhouettes, three shared materials.
 let seed=41;const random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 const capacity=1400,trunks=new T.InstancedMesh(cylinderGeo,materials.wood,capacity);
 const crownMeshes=[coneGeo,new T.IcosahedronGeometry(1,1),new T.SphereGeometry(1,7,5)].map((geo,i)=>new T.InstancedMesh(geo,mat(['#355d50','#52775c','#718366'][i]!),capacity));
 const counts=[0,0,0];let count=0;const dummy=new T.Object3D(),tint=new T.Color();
 for(let i=0;i<18000&&count<capacity;i++){const x=worldBounds.minX+random()*(worldBounds.maxX-worldBounds.minX),z=worldBounds.minZ+random()*(worldBounds.maxZ-worldBounds.minZ),y=height(x,z),sector=sectorAt(x,z);if(!sector||y<.6||y>9||Math.abs(x-riverX(z))<2||modules.some(m=>Math.hypot(x-m.position[0],z-m.position[1])<(landmarkDimensions[m.landmark]!.radius+1.2))||routes.some(r=>distanceToRoute(x,z,r.points)<1.5))continue;
 const cluster=(Math.sin(x*.16+Math.cos(z*.12)*2)+Math.cos(z*.22)+2)/4;
 if(random()>sector.vegetation.density*cluster*cluster||((x>-34&&x<-15&&z>-8&&z<20)&&random()>.12))continue;
 const kind=sector.vegetation.kind==='pine'?0:Math.floor(random()*3),s=.75+random()*.8,w=s*(kind===0?.48:.7);
 dummy.rotation.set(0,random()*Math.PI*2,0);dummy.position.set(x,y+s*.4,z);dummy.scale.set(.09,s*.8,.09);dummy.updateMatrix();trunks.setMatrixAt(count++,dummy.matrix);
 dummy.position.y=y+s*(kind===0?1.1:1.05);dummy.scale.set(w,s*(kind===0?1.5:.72),w);dummy.updateMatrix();const crown=crownMeshes[kind]!;crown.setMatrixAt(counts[kind]!,dummy.matrix);tint.setHSL(.29+random()*.05,.16+random()*.12,.73+random()*.2);crown.setColorAt(counts[kind]!,tint);counts[kind]!++;
 }
 trunks.count=count;trunks.castShadow=true;scene.add(trunks);crownMeshes.forEach((c,i)=>{c.count=counts[i]!;c.castShadow=true;scene.add(c);});
 appearance();
 observer=new ResizeObserver(()=>{const {width:w,height:h}=host.value!.getBoundingClientRect();renderer.setSize(w,h);const span=w<600?30:44;camera.left=-span*w/h/2;camera.right=span*w/h/2;camera.top=span/2;camera.bottom=-span/2;camera.updateProjectionMatrix();});observer.observe(host.value!);
 reset();try{const saved=JSON.parse(sessionStorage.getItem('world-lab-view')||'null');if(saved&&[saved.x,saved.z,saved.zoom].every(Number.isFinite))moveTo(T.MathUtils.clamp(saved.x,worldBounds.minX+10,worldBounds.maxX-10),T.MathUtils.clamp(saved.z,worldBounds.minZ+10,worldBounds.maxZ-10),T.MathUtils.clamp(saved.zoom,.07,3.2));}catch{}if(props.selected)focus(props.selected);
 let lastFrame=performance.now();
 const render=()=>{if(dead)return;frame=requestAnimationFrame(render);const now=performance.now(),elapsed=now-lastFrame;lastFrame=now;if(destination){const k=reduced.matches?1:1-Math.exp(-Math.min(1500,elapsed)/450);const shift=destination.clone().sub(controls.target).multiplyScalar(k);camera.position.add(shift);controls.target.add(shift);camera.zoom=T.MathUtils.lerp(camera.zoom,desiredZoom,k);camera.updateProjectionMatrix();if(shift.length()<.001&&Math.abs(camera.zoom-desiredZoom)<.001)destination=null;}
 controls.dampingFactor=1-Math.pow(1-.085,Math.min(elapsed,100)/(1000/60));controls.update(Math.min(elapsed,50)/1000);const x=T.MathUtils.clamp(controls.target.x,worldBounds.minX+10,worldBounds.maxX-10),z=T.MathUtils.clamp(controls.target.z,worldBounds.minZ+10,worldBounds.maxZ-10);
 const correction=new T.Vector3(x-controls.target.x,0,z-controls.target.z).multiplyScalar(1-Math.exp(-Math.min(elapsed,100)/80));camera.position.add(correction);controls.target.add(correction);
 const time=performance.now()*.001;
 if(!reduced.matches){(water.material as T.MeshStandardMaterial).roughness=.34+Math.sin(time*.4)*.035;}
 labels.value=modules.map(m=>{const p=new T.Vector3(m.position[0],height(...m.position)+landmarkDimensions[m.landmark]!.labelHeight,m.position[1]).project(camera);return {id:m.id,x:(p.x+1)*host.value!.clientWidth/2,y:(1-p.y)*host.value!.clientHeight/2,visible:(camera.zoom>.3||props.selected===m.id)&&p.z<1&&Math.abs(p.x)<.91&&Math.abs(p.y)<.88};});renderer.render(scene,camera);};render();
 }catch{emit('failure');}
});
onBeforeUnmount(()=>{saveView();dead=true;cancelAnimationFrame(frame);observer?.disconnect();controls?.dispose();renderer?.domElement.removeEventListener('webglcontextlost',fail);const geometries=new Set<T.BufferGeometry>(),mats=new Set<T.Material>();scene?.traverse(o=>{if(o instanceof T.Mesh){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material])mats.add(m);}});geometries.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());renderer?.dispose();});
</script>
<template>
 <div ref="host" class="continent" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp">
  <button v-for="label in labels" v-show="label.visible" :key="label.id" class="place-label" :class="{chosen:selected===label.id}" :style="{left:label.x+'px',top:label.y+'px'}" @pointerdown.stop @pointerup.stop @click="emit('select',label.id)"><span class="place-dot"/>{{ modules.find(m=>m.id===label.id)!.title[locale] }}<span v-if="modules.find(m=>m.id===label.id)!.status==='planned'" aria-hidden="true"> ◌</span></button>
 </div>
</template>
