<script setup lang="ts">
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createBeamGeometry, createFacetGeometry, placeBeam, tetrahedronEdges, tetrahedronVertices } from './geometry';
import { SelfMotion, type MotionSnapshot } from './motion';

const props = defineProps<{ selected: number | null; hovered: number | null; playing: boolean; coreHovered: boolean }>();
const emit = defineEmits<{
 state: [MotionSnapshot]; project: [{ core: { x: number; y: number }; anchors: { x: number; y: number }[] }];
 select: [number | null]; toggle: []; coreHover: [boolean]; hover: [number | null]; unavailable: [];
}>();
const host = ref<HTMLDivElement>();
const mode = useColorMode();
const motion = new SelfMotion();
let renderer: THREE.WebGLRenderer | undefined, scene: THREE.Scene, camera: THREE.PerspectiveCamera;
let placement: THREE.Group, levitation: THREE.Group, userOrientation: THREE.Group, focusOrientation: THREE.Group;
let observer: ResizeObserver | undefined, media: MediaQueryList | undefined, environment: THREE.WebGLRenderTarget | undefined;
let frame = 0, lastTime = 0, lastPublish = 0, dead = false, elapsed = 0;
let pointerId: number | null = null, moved = false, startX = 0, startY = 0, lastX = 0, lastY = 0, lastPointerTime = 0;
const deployments: THREE.Group[] = [], alignments: THREE.Group[] = [], spins: THREE.Group[] = [], anchors: THREE.Object3D[] = [];
const frameMaterials: THREE.MeshStandardMaterial[] = [], nodeMaterials: THREE.MeshStandardMaterial[] = [], facets: THREE.MeshStandardMaterial[] = [];
const pickTargets: THREE.Mesh[] = [];
const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2(), projected = new THREE.Vector3();
const unit = new THREE.Vector3(1, 1, 1), focusTarget = new THREE.Quaternion(), defaultPose = new THREE.Quaternion().setFromEuler(new THREE.Euler(-.08, .24, 0));
let core: THREE.Group, coreMaterial: THREE.MeshStandardMaterial, coreFaceMaterial: THREE.MeshStandardMaterial;
let pauseGlyph: THREE.Group, playGlyph: THREE.Mesh;
const partForSection = [0, 0, 1, 1, 0, 1];

function wake() {
 if (!frame && renderer && !dead && !document.hidden) frame = requestAnimationFrame(render);
}
function syncMotion() {
 motion.reduced = media!.matches;
 if (motion.reduced) motion.endDrag(true);
 wake();
}
watch(() => props.selected, value => { motion.select(value); wake(); });
watch(() => props.playing, value => { motion.playing = value; wake(); });
watch(() => [props.hovered, props.coreHovered, mode.value], () => wake());

function hit(event: PointerEvent): number | 'core' | null {
 if (!camera) return null;
 const r = host.value!.getBoundingClientRect();
 pointer.set((event.clientX - r.left) / r.width * 2 - 1, -(event.clientY - r.top) / r.height * 2 + 1);
 raycaster.setFromCamera(pointer, camera);
 return raycaster.intersectObjects(pickTargets)[0]?.object.userData.section ?? null;
}
function down(event: PointerEvent) {
 if (event.button !== 0 || !event.isPrimary || pointerId !== null) return;
 pointerId = event.pointerId; moved = false;
 startX = lastX = event.clientX; startY = lastY = event.clientY; lastPointerTime = event.timeStamp;
 host.value!.setPointerCapture(event.pointerId);
}
function move(event: PointerEvent) {
 if (pointerId === event.pointerId) {
  if (!moved && Math.hypot(event.clientX - startX, event.clientY - startY) > 6) {
   moved = true; motion.beginDrag(); emit('hover', null); emit('coreHover', false);
  }
  if (moved) motion.drag((event.clientX - lastX) * .005, (event.clientY - lastY) * .005, (event.timeStamp - lastPointerTime) / 1000);
  lastX = event.clientX; lastY = event.clientY; lastPointerTime = event.timeStamp; wake();
 } else if (pointerId === null) {
  const target = hit(event); emit('coreHover', target === 'core'); emit('hover', typeof target === 'number' ? target : null);
 }
}
function up(event: PointerEvent) {
 if (pointerId !== event.pointerId) return;
 const wasDrag = moved;
 if (wasDrag) motion.endDrag(event.timeStamp - lastPointerTime > 100);
 pointerId = null;
 if (host.value?.hasPointerCapture(event.pointerId)) host.value.releasePointerCapture(event.pointerId);
 if (!wasDrag) {
  const target = hit(event);
  if (target === 'core') { if (motion.active === null && !motion.reduced) emit('toggle'); }
  else emit('select', target);
 }
 wake();
}
function cancel(event?: PointerEvent) {
 if (event && pointerId !== event.pointerId) return;
 const id = pointerId; pointerId = null; motion.endDrag(true);
 if (id !== null && host.value?.hasPointerCapture(id)) host.value.releasePointerCapture(id);
 emit('hover', null); emit('coreHover', false); wake();
}
function visibility() {
 if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; cancel(); }
 else wake();
}
function resize() {
 if (!renderer || !host.value) return;
 const r = host.value.getBoundingClientRect(); renderer.setSize(r.width, r.height);
 camera.aspect = r.width / Math.max(1, r.height);
 // Preserve readable beam thickness on narrow screens without distorting the geometry.
 camera.position.z = r.width < 650 ? 11.7 : 10.6;
 camera.updateProjectionMatrix(); wake();
}
function build() {
 renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
 renderer.outputColorSpace = THREE.SRGBColorSpace;
 renderer.toneMapping = THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure = .95;
 host.value!.appendChild(renderer.domElement);
 renderer.domElement.addEventListener('webglcontextlost', contextLost);
 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(32, 1, .1, 40); camera.position.set(0, .15, 10.6); camera.lookAt(0, 0, 0);
 const room = new RoomEnvironment(); const pmrem = new THREE.PMREMGenerator(renderer);
 environment = pmrem.fromScene(room, .04); scene.environment = environment.texture; scene.environmentIntensity = .65;
 room.dispose(); pmrem.dispose();
 scene.add(new THREE.HemisphereLight(0xe7f1ff, 0x314256, .85));
 const key = new THREE.DirectionalLight(0xf3f7ff, 3.2); key.position.set(-3, 5, 5); scene.add(key);
 const rim = new THREE.DirectionalLight(0x94b8e0, 3); rim.position.set(4, 2, -3); scene.add(rim);
 const fill = new THREE.DirectionalLight(0xc3d7ec, .75); fill.position.set(3, -1, 4); scene.add(fill);
 placement = new THREE.Group(); placement.name = 'content-placement'; scene.add(placement);
 levitation = new THREE.Group(); levitation.name = 'shared-levitation'; placement.add(levitation);
 userOrientation = new THREE.Group(); userOrientation.name = 'user-orientation'; levitation.add(userOrientation);
 focusOrientation = new THREE.Group(); focusOrientation.name = 'focus-alignment'; userOrientation.add(focusOrientation);

 const vertices = tetrahedronVertices();
 const length = vertices[0]!.distanceTo(vertices[1]!);
 const beamGeometry = createBeamGeometry(length - .075);
 const jointGeometry = new THREE.IcosahedronGeometry(.115, 1);
 const nodeGeometry = new THREE.BoxGeometry(.19, .115, .085);
 for (let part = 0; part < 2; part++) {
  const deployment = new THREE.Group(); deployment.name = `${part ? 'lower' : 'upper'}-deployment`;
  const alignment = new THREE.Group(); alignment.name = 'local-focus-alignment';
  const spin = new THREE.Group(); spin.name = `${part ? 'lower' : 'upper'}-spin`;
  focusOrientation.add(deployment); deployment.add(alignment); alignment.add(spin);
  deployments.push(deployment); alignments.push(alignment); spins.push(spin);
  const points = tetrahedronVertices(part === 1);
  const material = new THREE.MeshStandardMaterial({ metalness: .58, roughness: .35, envMapIntensity: .85 }); frameMaterials.push(material);
  for (const [a, b] of tetrahedronEdges) { const mesh = new THREE.Mesh(beamGeometry, material); placeBeam(mesh, points[a]!, points[b]!); spin.add(mesh); }
  for (const point of points) { const joint = new THREE.Mesh(jointGeometry, material); joint.position.copy(point); spin.add(joint); }
  const membrane = new THREE.MeshStandardMaterial({ transparent: true, opacity: .07, metalness: .18, roughness: .65, side: THREE.DoubleSide, depthWrite: false });
  facets.push(membrane);
  const face = new THREE.Mesh(createFacetGeometry(points), membrane); face.renderOrder = part + 1; spin.add(face);
  for (let j = 0; j < 3; j++) {
   const section = (part === 0 ? [0, 1, 4] : [2, 3, 5])[j]!;
   const node = new THREE.Group(); node.position.copy(points[0]!).lerp(points[j + 1]!, .52);
   const material = new THREE.MeshStandardMaterial({ metalness: .5, roughness: .32 }); nodeMaterials[section] = material;
   const sleeve = new THREE.Mesh(nodeGeometry, material); node.add(sleeve); spin.add(node); anchors[section] = node;
   const target = new THREE.Mesh(new THREE.SphereGeometry(.23, 10, 8), new THREE.MeshBasicMaterial({ visible: false }));
   target.userData.section = section; node.add(target); pickTargets.push(target);
  }
 }
 core = new THREE.Group(); core.name = 'rotation-control'; focusOrientation.add(core);
 coreMaterial = new THREE.MeshStandardMaterial({ metalness: .5, roughness: .32 });
 const hub = new THREE.Mesh(new THREE.IcosahedronGeometry(.225, 2), coreMaterial); hub.scale.z = .65; core.add(hub);
 coreFaceMaterial = new THREE.MeshStandardMaterial({ color: 0xc7e7fa, metalness: .2, roughness: .45 });
 pauseGlyph = new THREE.Group();
 const glyphGeometry = new THREE.BoxGeometry(.035, .12, .018);
 for (const x of [-.045, .045]) { const bar = new THREE.Mesh(glyphGeometry, coreFaceMaterial); bar.position.set(x, 0, .155); pauseGlyph.add(bar); }
 core.add(pauseGlyph);
 const playShape = new THREE.Shape(); playShape.moveTo(-.04, -.07); playShape.lineTo(.07, 0); playShape.lineTo(-.04, .07); playShape.closePath();
 playGlyph = new THREE.Mesh(new THREE.ShapeGeometry(playShape), coreFaceMaterial); playGlyph.position.z = .155; core.add(playGlyph);
 const coreTarget = new THREE.Mesh(new THREE.SphereGeometry(.35, 12, 8), new THREE.MeshBasicMaterial({ visible: false })); coreTarget.userData.section = 'core'; core.add(coreTarget); pickTargets.push(coreTarget);
 resize();
}
function contextLost(event: Event) { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; emit('unavailable'); }
function render(now: number) {
 frame = 0;
 if (dead || document.hidden || !renderer) return;
 const dt = lastTime ? Math.min((now - lastTime) / 1000, .1) : 1 / 60; lastTime = now;
 elapsed += dt; motion.hovered = props.hovered !== null || props.coreHovered;
 motion.tick(dt);
 const dark = mode.value === 'dark', f = motion.focus;
 const mobile = host.value!.clientWidth < 650;
 // Hierarchy ownership: placement → levitation → user orientation → focus →
 // deployment → local alignment → independent spin. No writes compete.
 placement.position.set((mobile ? 0 : -1.5) * f, mobile ? .95 * f : .05 * f, 0);
 placement.scale.setScalar(1 - (mobile ? .28 : .1) * f);
 levitation.position.y = motion.reduced ? 0 : Math.sin(elapsed * .8) * .035 * (1 - f);
 userOrientation.quaternion.setFromEuler(new THREE.Euler(motion.pitch, motion.yaw, 0));
 focusTarget.copy(userOrientation.quaternion).invert().multiply(defaultPose);
 focusOrientation.quaternion.identity().slerp(focusTarget, f);
 deployments[0]!.position.y = .46 * motion.separation;
 deployments[1]!.position.y = -.46 * motion.separation;
 alignments[0]!.rotation.y = motion.upperAlignment * f; alignments[1]!.rotation.y = motion.lowerAlignment * f;
 spins[0]!.rotation.y = motion.upper; spins[1]!.rotation.y = motion.lower;
 for (let part = 0; part < 2; part++) {
  const material = frameMaterials[part]!;
  material.color.set(dark ? (part === 0 ? 0x8faac5 : 0x4c6e91) : (part === 0 ? 0x9eb5ca : 0x526f8a));
  const relevant = props.hovered !== null ? partForSection[props.hovered] === part : motion.active !== null ? partForSection[motion.active] === part : true;
  material.emissive.set(dark ? 0x486d95 : 0x325b83); material.emissiveIntensity = relevant && (props.hovered !== null || motion.active !== null) ? .12 : 0;
  facets[part]!.color.copy(material.color); facets[part]!.opacity = relevant ? .065 : .025;
 }
 for (let section = 0; section < 6; section++) {
  const material = nodeMaterials[section]!, active = props.hovered === section || motion.active === section;
  material.color.set(active ? (dark ? 0xaccbe6 : 0x365f87) : (dark ? 0x5e83a5 : 0x6f8faa));
  material.emissive.copy(material.color); material.emissiveIntensity = active ? .2 : 0;
 }
 coreMaterial.color.set(props.playing ? (dark ? 0x5e87ad : 0x547595) : (dark ? 0x344e68 : 0x8597ab));
 coreMaterial.emissive.set(0x7ca9ce); coreMaterial.emissiveIntensity = props.coreHovered ? .28 : props.playing ? .06 : 0;
 core.scale.lerp(unit.clone().multiplyScalar(props.coreHovered ? 1.1 : 1), motion.reduced ? 1 : 1 - Math.exp(-dt * 10));
 pauseGlyph.visible = props.playing; playGlyph.visible = !props.playing;
 // Keep the physical control face legible under manual orientation.
 core.parent!.getWorldQuaternion(focusTarget); core.quaternion.copy(focusTarget).invert().multiply(camera.quaternion);
 renderer.render(scene, camera);
 if (now - lastPublish > 32 || motion.reduced) {
  const bounds = host.value!.getBoundingClientRect();
  const project = (object: THREE.Object3D) => { object.getWorldPosition(projected); projected.project(camera); return { x: (projected.x + 1) * bounds.width / 2, y: (1 - projected.y) * bounds.height / 2 }; };
  emit('project', { core: project(core), anchors: anchors.map(project) });
  emit('state', motion.snapshot()); lastPublish = now;
 }
 if (!motion.reduced || motion.moving || pointerId !== null) wake();
 else lastTime = 0;
}
onMounted(() => {
 media = matchMedia('(prefers-reduced-motion: reduce)'); motion.reduced = media.matches;
 motion.playing = props.playing; motion.select(props.selected);
 media.addEventListener('change', syncMotion); document.addEventListener('visibilitychange', visibility);
 try { build(); observer = new ResizeObserver(resize); observer.observe(host.value!); wake(); }
 catch { emit('unavailable'); }
});
onBeforeUnmount(() => {
 dead = true; cancelAnimationFrame(frame); observer?.disconnect();
 media?.removeEventListener('change', syncMotion); document.removeEventListener('visibilitychange', visibility);
 renderer?.domElement.removeEventListener('webglcontextlost', contextLost);
 const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
 scene?.traverse(object => { if (object instanceof THREE.Mesh) { geometries.add(object.geometry); (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => materials.add(material)); } });
 geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
 environment?.dispose(); renderer?.dispose();
});
</script>
<template>
 <div ref="host" class="sculpture-canvas" :class="{ 'is-pointer': hovered !== null || coreHovered, 'is-dragging': pointerId !== null }" aria-hidden="true"
  @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="cancel" @lostpointercapture="cancel"
  @pointerleave="pointerId === null && (emit('hover', null), emit('coreHover', false))" />
</template>
<style scoped>
.sculpture-canvas{position:absolute;inset:0;touch-action:pan-y;cursor:grab}.sculpture-canvas.is-pointer{cursor:pointer}.sculpture-canvas:active{cursor:grabbing}.sculpture-canvas :deep(canvas){display:block;width:100%;height:100%;touch-action:none}
</style>
