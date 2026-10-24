<script setup lang="ts">
import * as THREE from 'three';
import { experiments, type Experiment } from './registry';
import { coreAppearances, coreDesktopZoom, type CoreAppearance } from './appearance';
import { KineticMotion, ringIds, type RingId, type HoverTarget } from './kineticMotion';
const props = defineProps<{ selected: string | null; paused: boolean }>();
const emit = defineEmits<{ select: [id: string]; unavailable: []; extracting: [] }>();
const host = ref<HTMLElement>();
export type FaceBounds = { x:number; y:number; width:number; height:number };
let deploy = async ():Promise<FaceBounds | null> => null;
let retract = async () => {};
let showModule = () => {};
let hideModule = () => {};
let currentBounds = ():FaceBounds|null => null;
defineExpose({ deploy: () => deploy(), retract: () => retract(), showModule: () => showModule(), hideModule: () => hideModule(), bounds: () => currentBounds() });
let dispose = () => {};
onMounted(() => {
 const element = host.value!;
 let renderer: THREE.WebGLRenderer;
 try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
 catch { emit('unavailable'); return; }
 renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
 renderer.outputColorSpace = THREE.SRGBColorSpace;
 // Explicitly retain the existing renderer response; balance Light through its preset.
 renderer.toneMapping = THREE.NoToneMapping; renderer.toneMappingExposure = 1;
 element.append(renderer.domElement);
 const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(34, 1, .1, 50);
 camera.position.set(0, .1, 11.8); camera.lookAt(0,0,0);
 const assembly = new THREE.Group(), outer = new THREE.Group(), inner = new THREE.Group(), carrier = new THREE.Group(), rotor = new THREE.Group();
 scene.add(assembly); assembly.add(outer); outer.add(inner); inner.add(carrier); carrier.add(rotor);
 const initialAppearance=coreAppearances[document.documentElement.classList.contains('dark')?'dark':'light'];
 const hemisphere = new THREE.HemisphereLight(); scene.add(hemisphere);
 const key = new THREE.DirectionalLight(); key.position.set(-3,5,7); scene.add(key);
 const rim = new THREE.DirectionalLight(); rim.position.set(4,-1,-3); scene.add(rim);
 const fill = new THREE.DirectionalLight(); fill.position.set(3,2,5); scene.add(fill);
 const metal = new THREE.MeshStandardMaterial(initialAppearance.surfaces.frame);
 const steel = new THREE.MeshStandardMaterial(initialAppearance.surfaces.link);
 const body = new THREE.MeshStandardMaterial(initialAppearance.surfaces.body);
 const dark = new THREE.MeshStandardMaterial(initialAppearance.surfaces.recess);
 const screw = new THREE.MeshStandardMaterial(initialAppearance.surfaces.fastener);
 const ringSurfaces = { outer: new THREE.MeshStandardMaterial(initialAppearance.ringFaces.outer), inner: new THREE.MeshStandardMaterial(initialAppearance.ringFaces.inner), carrier: new THREE.MeshStandardMaterial(initialAppearance.ringFaces.carrier) };
 for(const material of Object.values(ringSurfaces)) material.emissiveIntensity=0;
 const ringEdges = { outer: new THREE.MeshStandardMaterial(initialAppearance.ringEdges.outer), inner: new THREE.MeshStandardMaterial(initialAppearance.ringEdges.inner), carrier: new THREE.MeshStandardMaterial(initialAppearance.ringEdges.carrier) };
 const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>([metal,steel,body,dark,screw]), textures: THREE.Texture[] = [];
 function mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material | THREE.Material[], x=0,y=0,z=0) {
  geometries.add(geometry); (Array.isArray(material) ? material : [material]).forEach(m=>materials.add(m));
  const object = new THREE.Mesh(geometry,material); object.position.set(x,y,z); parent.add(object); return object;
 }
 function rod(parent: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3, radius: number, material=steel) {
  const v = b.clone().sub(a), object = mesh(parent,new THREE.CylinderGeometry(radius,radius,v.length(),20),material);
  object.position.copy(a).add(b).multiplyScalar(.5); object.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),v.normalize()); return object;
 }
 function ring(parent: THREE.Group, radius: number, width: number, depth: number, id: RingId) {
  const shape = new THREE.Shape(); shape.absarc(0,0,radius,0,Math.PI*2,false);
  const hole = new THREE.Path(); hole.absarc(0,0,radius-width,0,Math.PI*2,true); shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape,{ depth, bevelEnabled:true, bevelSegments:2, steps:1, bevelSize:.025, bevelThickness:.025, curveSegments:96 }); geometry.translate(0,0,-depth/2);
  mesh(parent,geometry,[ringSurfaces[id],ringEdges[id]]).userData.ring = id;
  for(let i=0;i<12;i++) {
   const a=i*Math.PI/6;
   mesh(parent,new THREE.CylinderGeometry(.028,.028,.025,12).rotateX(Math.PI/2),screw,Math.cos(a)*(radius-width/2),Math.sin(a)*(radius-width/2),depth/2+.025).userData.ring = id;
  }
 }
 ring(outer,2.65,.17,.21,'outer'); ring(inner,2.2,.14,.17,'inner'); ring(carrier,1.7,.12,.16,'carrier');
 // Parent-side journals and child-side shafts share the exact hinge axis.
 for(const sign of [-1,1]) {
  rod(outer,new THREE.Vector3(0,sign*2.16,0),new THREE.Vector3(0,sign*2.57,0),.105,dark);
  rod(outer,new THREE.Vector3(0,sign*2.34,0),new THREE.Vector3(0,sign*2.48,0),.17,metal);
  rod(inner,new THREE.Vector3(sign*1.65,0,0),new THREE.Vector3(sign*2.14,0,0),.085,dark);
  rod(inner,new THREE.Vector3(sign*1.87,0,0),new THREE.Vector3(sign*2.02,0,0),.14,steel);
 }
 mesh(rotor,new THREE.CylinderGeometry(.48,.48,.46,6).rotateX(Math.PI/2),body);
 mesh(rotor,new THREE.CylinderGeometry(.31,.31,.06,48).rotateX(Math.PI/2),dark,0,0,.26);
 mesh(rotor,new THREE.CylinderGeometry(.12,.12,.09,6).rotateX(Math.PI/2),metal,0,0,.31);
 const cartridges: { mount: THREE.Group; cap: THREE.Group; hit: THREE.Mesh; angle: number; bank: number; id: string; surface: THREE.MeshStandardMaterial; accent: THREE.MeshStandardMaterial; labelCanvas: HTMLCanvasElement; texture: THREE.CanvasTexture; experiment: Experiment }[] = [];
 // Six fixed positions per bank. Extra banks replace the cartridge set, never scale the rings.
 experiments.forEach((experiment,index) => {
  const bank = Math.floor(index / 6), bankSize = Math.min(6, experiments.length - bank * 6);
  const angle = Math.PI/2 + (index % 6)*Math.PI*2/bankSize;
  const mount = new THREE.Group(); mount.rotation.z=angle-Math.PI/2; rotor.add(mount);
  rod(mount,new THREE.Vector3(0,.43,0),new THREE.Vector3(0,1.6,0),.065,steel);
  mesh(mount,new THREE.BoxGeometry(1,.72,.14),dark,0,1.62,.09).userData.module=experiment.id;
  const cap = new THREE.Group(); cap.position.set(0,1.62,.23); mount.add(cap); cap.userData.module=experiment.id;
  for(const x of [-.32,.32]) rod(cap,new THREE.Vector3(x,0,-.42),new THREE.Vector3(x,0,-.04),.035,screw);
  const accent = new THREE.MeshStandardMaterial({color:initialAppearance.accent.color,metalness:initialAppearance.accent.metalness,roughness:initialAppearance.accent.roughness});
  const surface = body.clone(); surface.emissiveIntensity=0; accent.emissiveIntensity=0;
  const hit = mesh(cap,new THREE.BoxGeometry(.94,.64,.25),surface); hit.userData.id=experiment.id;
  mesh(cap,new THREE.BoxGeometry(.045,.52,.018),accent,-.4,0,.137);
  const canvas=document.createElement('canvas'); canvas.width=384; canvas.height=192;
  const texture=new THREE.CanvasTexture(canvas); texture.colorSpace=THREE.SRGBColorSpace; textures.push(texture);
  const label = new THREE.MeshBasicMaterial({map:texture});
  mesh(cap,new THREE.PlaneGeometry(.76,.48),label,.025,0,.131);
  cartridges.push({mount,cap,hit,angle,bank,id:experiment.id,surface,accent,labelCanvas:canvas,texture,experiment});
 });
 const canvas = renderer.domElement;
 const media = matchMedia('(prefers-reduced-motion: reduce)');
 const motion = new KineticMotion();
 const pivots = { outer, inner, carrier };
 const localAxes = { outer: new THREE.Vector3(0,0,1), inner: new THREE.Vector3(0,1,0), carrier: new THREE.Vector3(1,0,0) };
 const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
 const inverse = new THREE.Matrix4(), plane = new THREE.Plane(), fromRay = new THREE.Ray(), toRay = new THREE.Ray();
 const from = new THREE.Vector3(), to = new THREE.Vector3(), cross = new THREE.Vector3();
 const worldAxis = new THREE.Vector3(), worldPoint = new THREE.Vector3(), tangent = new THREE.Vector3(), projected = new THREE.Vector3();
 const quaternion = new THREE.Quaternion(), intersections: THREE.Intersection[] = [];
 let frame=0, last=0, bank=0, entrance=media.matches?1:0, dead=false, inside=false, hoverClock=0;
 let lastX=0, lastY=0;
 type Cartridge = typeof cartridges[number];
 let deployed: Cartridge | undefined, locked=false;
 let travel: { elapsed:number; duration:number; update:(t:number)=>void; done:()=>void } | null=null;
 const extraction = new THREE.Group(); scene.add(extraction);
 const homePosition=new THREE.Vector3(), homeQuaternion=new THREE.Quaternion();
 const releasedPosition=new THREE.Vector3(), releasedQuaternion=new THREE.Quaternion();
 let alignmentDone: (()=>void) | null=null;
 function animate(duration:number, update:(t:number)=>void) {
  if(dead)return Promise.resolve();
  return new Promise<void>(done=>{travel={elapsed:0,duration:media.matches?0:duration,update,done};wake();});
 }
 function faceBounds(item:Cartridge):FaceBounds {
  scene.updateMatrixWorld(true);
  const rect=canvas.getBoundingClientRect();
  const points=[[-.47,-.32],[.47,-.32],[-.47,.32],[.47,.32]].map(([x,y])=>item.cap.localToWorld(new THREE.Vector3(x,y,.137)).project(camera));
  const xs=points.map(p=>rect.left+(p.x+1)*rect.width/2), ys=points.map(p=>rect.top+(1-p.y)*rect.height/2);
  return {x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};
 }
 currentBounds=()=>deployed?faceBounds(deployed):null;
 deploy=async()=>{
  if(locked) return null;
  locked=true;cancelPress();
  if(motion.phase!=='selected') await new Promise<void>(resolve=>{alignmentDone=resolve;wake();});
  if(dead) return null;
  deployed=cartridges.find(item=>item.id===props.selected);
  if(!deployed) {locked=false;return null;}
  const item=deployed;emit('extracting');
  item.cap.getWorldPosition(homePosition);item.cap.getWorldQuaternion(homeQuaternion);
  extraction.attach(item.cap); // attach preserves the full world transform.
  const direction=new THREE.Vector3(0,0,1).applyQuaternion(homeQuaternion);
  releasedPosition.copy(homePosition).addScaledVector(direction,.95);
  await animate(.46,t=>{item.cap.position.lerpVectors(homePosition,releasedPosition,t);});
  releasedQuaternion.copy(camera.quaternion);
  await animate(.32,t=>{item.cap.quaternion.slerpQuaternions(homeQuaternion,releasedQuaternion,t);});
  return dead?null:faceBounds(item);
 };
 hideModule=()=>{if(deployed){deployed.cap.visible=false;wake();}};
 showModule=()=>{if(deployed){deployed.cap.visible=true;wake();}};
 retract=async()=>{
  const item=deployed;if(!item) {locked=false;return;}
  showModule();
  await animate(.32,t=>item.cap.quaternion.slerpQuaternions(releasedQuaternion,homeQuaternion,t));
  await animate(.46,t=>item.cap.position.lerpVectors(releasedPosition,homePosition,t));
  item.mount.attach(item.cap);deployed=undefined;locked=false;wake();
 };
 type Press = { id:number; x:number; y:number; previousX:number; previousY:number; target:HoverTarget; point:THREE.Vector3; moved:boolean };
 let press: Press | null = null;
 let lastActivation = { id:'', time:-Infinity };
 function setRay(x:number,y:number) {
  const rect=canvas.getBoundingClientRect();
  pointer.set((x-rect.left)/rect.width*2-1,-(y-rect.top)/rect.height*2+1);
  raycaster.setFromCamera(pointer,camera);
 }
 function pick(x:number,y:number) {
  setRay(x,y); intersections.length=0;
  raycaster.intersectObjects(scene.children,true,intersections);
  for(const hit of intersections) {
   let node:THREE.Object3D|null=hit.object, target:HoverTarget=null, visible=true;
   while(node) {
    if(!node.visible) { visible=false; break; }
    if(!target && node.userData.module) target={kind:'module',id:node.userData.module};
    if(!target && node.userData.ring) target={kind:'ring',id:node.userData.ring};
    node=node.parent;
   }
   // The nearest visible physical surface owns the hit, even if it is not interactive.
   if(visible) return { target, point:hit.point };
  }
  return { target:null, point:null };
 }
 function updateHover(x:number,y:number) {
  motion.hover=!locked && !press && (motion.canGrab || motion.phase==='selected') ? pick(x,y).target : null;
  if(motion.hover?.kind==='ring' && !motion.canGrab) motion.hover=null;
  const target=motion.hover;
  element.dataset.hover=target ? `${target.kind}:${target.id}` : '';
  canvas.style.cursor=press?.moved && motion.dragging ? 'grabbing' : motion.canGrab && target?.kind==='ring' ? 'grab' : target?.kind==='module' ? 'pointer' : 'default';
 }
 function releaseCapture() {
  const old=press; press=null;
  if(old && canvas.hasPointerCapture(old.id)) canvas.releasePointerCapture(old.id);
 }
 function cancelPress() {
  motion.endDrag(performance.now(),true); releaseCapture(); motion.hover=null;
  element.dataset.hover=''; canvas.style.cursor='default'; wake();
 }
 function down(event:PointerEvent) {
  if(!event.isPrimary) { if(press) cancelPress(); return; }
  if(locked || event.button!==0 || press || !(motion.canGrab || motion.phase==='selected')) return;
  scene.updateMatrixWorld(true);
  const hit=pick(event.clientX,event.clientY);
  if(!hit.target || !hit.point || hit.target.kind==='ring' && !motion.canGrab) return;
  // A ring rotation is measured in its parent's coordinate system, around its bearing axis.
  const point=hit.target.kind==='ring' ? pivots[hit.target.id].worldToLocal(hit.point.clone()) : hit.point.clone();
  press={id:event.pointerId,x:event.clientX,y:event.clientY,previousX:event.clientX,previousY:event.clientY,target:hit.target,point,moved:false};
  motion.hover=null;
  canvas.setPointerCapture(event.pointerId);
  if(hit.target.kind==='ring') motion.beginDrag(hit.target.id,event.timeStamp);
  event.preventDefault(); wake();
 }
 function dragAngle(id:RingId,event:PointerEvent,p:Press) {
  const pivot=pivots[id], axis=localAxes[id], parent=pivot.parent!;
  inverse.copy(parent.matrixWorld).invert();
  setRay(p.previousX,p.previousY); fromRay.copy(raycaster.ray).applyMatrix4(inverse);
  setRay(event.clientX,event.clientY); toRay.copy(raycaster.ray).applyMatrix4(inverse);
  // Exact signed angular displacement on the plane perpendicular to the real axle.
  worldPoint.copy(p.point); pivot.localToWorld(worldPoint); parent.worldToLocal(worldPoint);
  plane.set(axis,-axis.dot(worldPoint));
  const axial=axis.dot(worldPoint);
  if(Math.abs(fromRay.direction.dot(axis))>.18 && Math.abs(toRay.direction.dot(axis))>.18 && fromRay.intersectPlane(plane,from) && toRay.intersectPlane(plane,to)) {
   from.addScaledVector(axis,-axial); to.addScaledVector(axis,-axial);
   if(from.lengthSq()>.04 && to.lengthSq()>.04) return Math.atan2(axis.dot(cross.crossVectors(from,to)),from.dot(to));
  }
  // Near edge-on, ray/plane intersections are ill-conditioned. Project the local
  // angular tangent instead; this is still rotation about this axle, never camera orbit.
  worldPoint.copy(p.point); pivot.localToWorld(worldPoint);
  parent.getWorldQuaternion(quaternion); worldAxis.copy(axis).applyQuaternion(quaternion);
  parent.getWorldPosition(from); tangent.subVectors(worldPoint,from).crossVectors(worldAxis,tangent);
  projected.copy(worldPoint).addScaledVector(tangent,.01).project(camera); worldPoint.project(camera);
  const rect=canvas.getBoundingClientRect(), tx=(projected.x-worldPoint.x)*rect.width*50, ty=-(projected.y-worldPoint.y)*rect.height*50;
  const length=tx*tx+ty*ty;
  return length>36 ? ((event.clientX-p.previousX)*tx+(event.clientY-p.previousY)*ty)/length : 0;
 }
 function move(event:PointerEvent) {
  lastX=event.clientX; lastY=event.clientY; inside=true;
  if(press && event.pointerId===press.id) {
   const threshold=event.pointerType==='touch' ? 9 : 5;
   if(Math.hypot(event.clientX-press.x,event.clientY-press.y)>threshold) press.moved=true;
   if(press.moved && press.target?.kind==='ring') {
    scene.updateMatrixWorld(true);
    motion.drag(dragAngle(press.target.id,event,press),event.timeStamp);
    press.previousX=event.clientX; press.previousY=event.clientY;
    canvas.style.cursor='grabbing'; wake();
   }
  } else { updateHover(lastX,lastY); wake(); }
 }
 function up(event:PointerEvent) {
  if(!press || event.pointerId!==press.id) return;
  const old=press;
  if(Math.hypot(event.clientX-old.x,event.clientY-old.y)>(event.pointerType==='touch'?9:5)) old.moved=true;
  motion.endDrag(event.timeStamp); releaseCapture();
  // A module drag never becomes a click. Pointer-up alone cannot activate anything.
  if(!old.moved && old.target?.kind==='module') {
   const hit=pick(event.clientX,event.clientY).target;
   if(hit?.kind==='module' && hit.id===old.target.id && (lastActivation.id!==hit.id || event.timeStamp-lastActivation.time>350)) {
    lastActivation={id:hit.id,time:event.timeStamp}; emit('select',hit.id);
   }
  }
  const rect=canvas.getBoundingClientRect(); inside=event.clientX>=rect.left && event.clientX<=rect.right && event.clientY>=rect.top && event.clientY<=rect.bottom;
  if(inside && event.pointerType!=='touch') updateHover(event.clientX,event.clientY);
  else { motion.hover=null; element.dataset.hover=''; canvas.style.cursor='default'; }
  wake();
 }
 function cancel(event:PointerEvent) { if(press?.id===event.pointerId) cancelPress(); }
 function leave() { inside=false; if(!press) {motion.hover=null; element.dataset.hover='';canvas.style.cursor='default';wake();} }
 canvas.style.touchAction='none';
 canvas.addEventListener('pointerdown',down); canvas.addEventListener('pointermove',move);
 canvas.addEventListener('pointerup',up); canvas.addEventListener('pointercancel',cancel);
 canvas.addEventListener('lostpointercapture',cancel); canvas.addEventListener('pointerleave',leave);
 const escape=(event:KeyboardEvent)=>{if(event.key==='Escape' && press) cancelPress();};
 window.addEventListener('blur',cancelPress); window.addEventListener('keydown',escape);
 function syncSelection() {
  cancelPress();
  const selected=cartridges.find(item=>item.id===props.selected);
  if(selected) bank=selected.bank;
  motion.select(selected?.id ?? null,selected?.angle);
  wake();
 }
 function syncPreferences() { motion.configure(props.paused,media.matches); wake(); }
 function visibility() {
  cancelPress();
  if(document.hidden) { cancelAnimationFrame(frame);frame=0; } else wake();
 }
 function draw(stamp:number) {
  frame=0; if(dead || document.hidden) return;
  const interval=motion.dragging || motion.state==='inertia' ? 1000/60 : 1000/30;
  if(stamp-last<interval) { frame=requestAnimationFrame(draw); return; }
  const dt=Math.min((stamp-last)/1000,.1); last=stamp;
  motion.tick(dt);
  if(alignmentDone && motion.phase==='selected') {const resolve=alignmentDone;alignmentDone=null;resolve();}
  if(travel) {
   const current=travel;current.elapsed+=dt;
   const t=current.duration?Math.min(1,current.elapsed/current.duration):1;
   current.update(t*t*(3-2*t));
   if(t===1){travel=null;current.done();}
  }
  entrance=media.matches?1:Math.min(1,entrance+dt/1.15);
  const ease=1-Math.pow(1-entrance,3), blend=media.matches?1:1-Math.exp(-dt*10), pose=motion.pose;
  assembly.position.y=pose.float+(1-ease)*.22;
  assembly.rotation.set(pose.x,pose.y,pose.z);
  outer.rotation.z=pose.outer; outer.scale.setScalar(.94+.06*ease);
  inner.rotation.y=pose.inner+(1-ease)*.3;
  carrier.rotation.x=pose.carrier-(1-ease)*.25;
  rotor.rotation.z=pose.index;
  let settling=false;
  for(const item of cartridges) {
   item.mount.visible=item.bank===bank;
   const target=.23+motion.moduleLift(item.id)+(1-ease)*.2;
   if(item!==deployed) item.cap.position.z+=(target-item.cap.position.z)*blend;
   if(item!==deployed && Math.abs(target-item.cap.position.z)>.0001) settling=true;
   const emphasis=motion.moduleLift(item.id)>0 ? 1 : 0;
   item.surface.emissiveIntensity+=(emphasis*.09-item.surface.emissiveIntensity)*blend;
   item.accent.emissiveIntensity+=(emphasis*.22-item.accent.emissiveIntensity)*blend;
   if(Math.abs(emphasis*.09-item.surface.emissiveIntensity)>.0001) settling=true;
  }
  for(const id of ringIds) {
   const hovered=motion.dragging===id || motion.canGrab && motion.hover?.kind==='ring' && motion.hover.id===id;
   const surface=ringSurfaces[id], target=hovered ? .11 : 0;
   surface.emissiveIntensity+=(target-surface.emissiveIntensity)*blend;
   if(Math.abs(target-surface.emissiveIntensity)>.0001) settling=true;
  }
  scene.updateMatrixWorld(true);
  if(inside && !press && motion.canGrab && (hoverClock+=dt)>.1) {hoverClock=0;updateHover(lastX,lastY);}
  renderer.render(scene,camera);
  element.dataset.ready='true'; element.dataset.assembly=entrance===1?'complete':'entering'; element.dataset.selected=props.selected??'';
  element.dataset.state=motion.state; element.dataset.deployment=travel?'extracting':locked?'deployed':'idle'; element.dataset.lift=String(cartridges.find(item=>item.id===props.selected)?.cap.position.z??.23);
  element.dataset.hoverLift=String(cartridges.find(item=>motion.hover?.kind==='module' && item.id===motion.hover.id)?.cap.position.z??.23);
  element.dataset.angles=`${pose.outer},${pose.inner},${pose.carrier},${pose.index}`;
  element.dataset.velocity=`${motion.velocity.outer},${motion.velocity.inner},${motion.velocity.carrier}`;
  if(motion.moving || entrance<1 || settling || travel || alignmentDone) frame=requestAnimationFrame(draw);
 }
 function wake() { if(!frame && !document.hidden && !dead){last=performance.now();frame=requestAnimationFrame(draw);} }
 const observer=new ResizeObserver(()=>{const w=element.clientWidth,h=element.clientHeight; renderer.setSize(w,h); camera.aspect=w/h; camera.zoom=window.innerWidth>600?coreDesktopZoom:1; camera.updateProjectionMatrix(); wake();}); observer.observe(element);
 function updateSurface(material:THREE.MeshStandardMaterial, preset:CoreAppearance['surfaces']['body']) {
  material.color.set(preset.color); material.metalness=preset.metalness; material.roughness=preset.roughness;
 }
 let appliedTheme: 'dark' | 'light' | undefined;
 function applyTheme() {
  const themeName=document.documentElement.classList.contains('dark')?'dark':'light';
  if(appliedTheme===themeName) return;
  appliedTheme=themeName;
  const preset=coreAppearances[themeName], lights=preset.lights;
  updateSurface(metal,preset.surfaces.frame); updateSurface(steel,preset.surfaces.link);
  updateSurface(body,preset.surfaces.body); updateSurface(dark,preset.surfaces.recess); updateSurface(screw,preset.surfaces.fastener);
  for(const id of ringIds) {
   updateSurface(ringSurfaces[id],preset.ringFaces[id]); updateSurface(ringEdges[id],preset.ringEdges[id]);
   ringSurfaces[id].emissive.set(preset.hover);
  }
  for(const item of cartridges) {
   updateSurface(item.surface,preset.surfaces.body); updateSurface(item.accent,preset.accent);
   if(preset.accent.registryColor) item.accent.color.set(item.experiment.accent);
   item.surface.emissive.copy(item.accent.color); item.accent.emissive.copy(item.accent.color);
   const context=item.labelCanvas.getContext('2d')!;
   context.fillStyle=preset.label.background; context.fillRect(0,0,384,192);
   context.textAlign='center'; context.fillStyle=preset.accent.registryColor?item.experiment.accent:preset.accent.color;
   context.font='90px monospace'; context.fillText(item.experiment.glyph,192,102);
   context.fillStyle=preset.label.ink; context.font='30px monospace';
   context.fillText(({architect:'SYS',json:'TS',contrast:'AA'} as Record<string,string>)[item.id] ?? item.id.toUpperCase().slice(0,6),192,155);
   item.texture.needsUpdate=true;
  }
  hemisphere.color.set(lights.sky); hemisphere.groundColor.set(lights.ground); hemisphere.intensity=lights.hemisphere;
  key.color.set(lights.key); key.intensity=lights.keyIntensity;
  rim.color.set(lights.rim); rim.intensity=lights.rimIntensity;
  fill.color.set(lights.fill); fill.intensity=lights.fillIntensity; fill.visible=lights.fillIntensity>0;
  element.dataset.theme=themeName;
  wake();
 }
 const theme=new MutationObserver(applyTheme); theme.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 const unselect=watch(()=>props.selected,syncSelection);
 const unpause=watch(()=>props.paused,syncPreferences);
 document.addEventListener('visibilitychange',visibility); media.addEventListener('change',syncPreferences);
 const lost=(event:Event)=>{event.preventDefault();cancelPress();emit('unavailable');}; canvas.addEventListener('webglcontextlost',lost);
 syncPreferences(); syncSelection(); applyTheme();
 dispose=()=>{
  dead=true;alignmentDone?.();alignmentDone=null;if(travel){travel.done();travel=null;}cancelPress();cancelAnimationFrame(frame);unselect();unpause();observer.disconnect();theme.disconnect();
  document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',syncPreferences);window.removeEventListener('blur',cancelPress);window.removeEventListener('keydown',escape);
  canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);
  canvas.removeEventListener('pointercancel',cancel);canvas.removeEventListener('lostpointercapture',cancel);canvas.removeEventListener('pointerleave',leave);canvas.removeEventListener('webglcontextlost',lost);
  geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();canvas.remove();
 };
});
onBeforeUnmount(()=>dispose());
</script>
<template><div ref="host" class="kinetic-canvas" aria-hidden="true" /></template>
