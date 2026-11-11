<script setup lang="ts">
import * as T from 'three';
import TouchControls from './TouchControls.vue';
import { createInteractables, interactionIntent } from './interactions';
import { interactionCopy } from './interaction-copy';
const ic=computed(()=>interactionCopy[locale.value as keyof typeof interactionCopy]||interactionCopy.en);
const touchMode=ref(false), inputReady=ref(false), candidate=ref<string|false>(false), actionable=ref(false);
let interactables:ReturnType<typeof createInteractables>|undefined;
const freeInput=computed(()=>inputReady.value&&!failed.value&&!textMode.value&&!portalBusy.value&&!worksUI.value&&!worksTrip.value&&!radioOpen.value&&!controlsOpen.value);
const touchVisible=computed(()=>touchMode.value&&freeInput.value);
const hint=computed(()=>{const id=candidate.value;if(!id)return '';if(!actionable.value)return (id==='key'||id==='facet')&&['activated','propagating','opening','closing'].includes(wallState.value)?ic.value.busy:ic.value.approach;return id==='threshold'?ic.value.threshold:id==='key'||id==='facet'?wallState.value==='open'?ic.value.passage:ic.value.wall:id==='passage'?ic.value.passage:id==='terminal'?ic.value.terminal:id==='radio'?ic.value.radio:id.startsWith('atmosphere:')?ic.value.atmosphere:id==='sculpture'?ic.value.sculpture:id==='works:archive'?ic.value.archive:id==='works:matrix-details'?ic.value.details:id.startsWith('works:matrix:')?ic.value.criterion:id==='works:gallery'?ic.value.gallery:ic.value.matrix;});
function mobileMove(x:number,z:number,sprint:boolean){if(freeInput.value)look?.analog(x,z,sprint);else look?.stop();}

import { YouTubeRadio } from './audio/YouTubeRadio';
import PersistentRadioPlayer from './audio/PersistentRadioPlayer.vue';
import { audioCopy } from './audio/copy';
import { createReceiver } from './audio/receiver';
import './audio/audio.css';
import { buildEnvironment, spawn } from './environment';
import { illuminate } from './lighting';
import { createImpossibleThreshold } from './impossible-threshold';
let pickedSunDoor=false;
let threshold:ReturnType<typeof createImpossibleThreshold>|undefined;
import { createCollision } from './collision';
import { createLook } from './camera';
import { createJourney, type JourneyState } from './journey';
import { createMechanism } from './mechanics';
import { arrivalCopy } from './copy';
import './arrival.css';
import './portal.css';
import PortalWorkspace from './PortalWorkspace.vue';
import { createTerminal, screenPose, portalPath, pointOnPath, type PortalState } from './portal';
import { portalCopy } from './portal-copy';
import { createExpansion } from './expansion';
import { createAtmosphere } from './atmosphere';
let atmosphere:ReturnType<typeof createAtmosphere>|undefined;
import { createOrbitalSculpture } from './orbital-sculpture';
import { createHallGallery } from './hall-gallery';
let sculpture: ReturnType<typeof createOrbitalSculpture> | undefined;
let hallGallery: ReturnType<typeof createHallGallery> | undefined;
import { expansionSpaces, spaceAt } from './spaces';
import { createWorks } from './works/environment';
import { worksModules, worksArrival, worldPath } from './works/registry';
import { initialWeights } from './works/matrix';
import { worksCopy } from './works/copy';
import WorksSurface from './works/WorksSurface.vue';
import ProjectWorkspace from './works/ProjectWorkspace.vue';
import './works/works.css';
const worksUI=ref<'destinations'|'matrix'|null>(null), worksTrip=ref('');
const workspaceKind=ref<'flowforge'|'matrix'|'archive'>('flowforge');
const archiveSelection=ref('decision-matrix-ai');
const weights=ref([...initialWeights]), selectedCriterion=ref(0);
const wc=computed(()=>worksCopy[locale.value as keyof typeof worksCopy]||worksCopy.en);
let expansion:ReturnType<typeof createExpansion>|undefined;
let works:ReturnType<typeof createWorks>|undefined, pendingWorks='';
function changeWeight(index:number,value:number){selectedCriterion.value=index;weights.value[index]=value;works?.setWeights(weights.value,index);needsRender=true;}
function resetMatrix(){weights.value=[...initialWeights];selectedCriterion.value=0;works?.setWeights(weights.value,0);needsRender=true;}
function selectCriterion(index:number){selectedCriterion.value=index;works?.setWeights(weights.value,index);needsRender=true;}
function closeWorks(){worksUI.value=null;look?.setEnabled(!portalBusy.value&&radio.state.mode!=='expanded');nextTick(()=>{if(failed.value||textMode.value)document.querySelector<HTMLButtonElement>('[data-action=works-shortcut]')?.focus();else renderer?.domElement.focus();});}
function worksMenu(){if(portalBusy.value||guided)return;if(radioOpen.value)closeRadio();releaseDockPointer();look?.stop();look?.setEnabled(false);worksUI.value=worksUI.value==='destinations'?null:'destinations';if(!worksUI.value)closeWorks();}
function goWorks(id:string){
 if(threshold?.active&&camera){threshold.returnToHall(camera);const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);}
 if(portalBusy.value||guided)return;
 worksUI.value=null;if(radioOpen.value)closeRadio();controlsOpen.value=false;
 if(id==='flowforge'){approachTerminal();return;}
 if(failed.value||textMode.value||!camera){if(id==='arrival'){state.value='arrival';closeWorks();return;}state.value='secondary';if(id==='archive'){activateProjectScreen('archive');return;}worksUI.value=id==='matrix'?'matrix':'destinations';return;}
 releaseDockPointer();look.stop();look.setEnabled(false);journey.cancel();
 pendingWorks=id;worksTrip.value=id;guided=true;
 const room=expansionSpaces.find(s=>s.id===id);
 const to=room?new T.Vector3(...room.anchor):id==='arrival'?spawn:id==='gallery'?worksArrival:new T.Vector3(...worksModules.find(m=>m.id===id)!.destination);
 if(camera.position.distanceTo(to)<1&&(id==='matrix'||id==='archive')){pendingWorks='';worksTrip.value='';guided=false;if(id==='archive')activateProjectScreen('archive');else worksUI.value='matrix';needsRender=true;return;}
 if((camera.position.z<-72)!==(to.z<-72)&&mechanism.state!=='open'){mechanism.activate(performance.now());return;}
 startWorks(id,to);
}
function startWorks(id:string,to:T.Vector3){
 pendingWorks='';guided=true;
 const room=expansionSpaces.find(s=>s.id===id);
 const aim=room?new T.Vector3(...room.lookAt):id==='arrival'?new T.Vector3(0,4,-65):id==='gallery'?new T.Vector3(32,5,-101):new T.Vector3(...worksModules.find(m=>m.id===id)!.lookAt);
 const target=camera.clone();target.position.copy(to);target.lookAt(aim);
 travel={path:worldPath(camera.position,to),from:camera.quaternion.clone(),to:target.quaternion.clone(),start:performance.now(),duration:reduced.value?0:Math.min(6500,Math.max(1600,camera.position.distanceTo(to)*65)),exiting:false};
}
function cancelWorks(){pendingWorks='';worksTrip.value='';travel=undefined;guided=false;if(camera){const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);}closeWorks();}


const radio = new YouTubeRadio();
const radioOpen=computed(()=>radio.state.mode==='expanded'), gameDock=ref<HTMLElement>();
const ac=computed(()=>audioCopy[locale.value as keyof typeof audioCopy]||audioCopy.en);
let receiver:ReturnType<typeof createReceiver>|undefined, radioTravel=false;
function closeRadio(){radio.setMode('mini');look?.setEnabled(!portalBusy.value&&!guided&&!worksUI.value&&!worksTrip.value);if(!portalBusy.value&&!worksUI.value)nextTick(()=>renderer?.domElement.focus());}
function approachRadio(){
 if(threshold?.active){threshold.returnToHall(camera);look.restore(0,0);}

 if(portalBusy.value||guided)return;
 if(worksUI.value)closeWorks();
 if(!camera||failed.value||textMode.value){radio.setMode('expanded');return;}
 if(document.pointerLockElement)document.exitPointerLock();
 receiver!.resizeApproach();journey.cancel();look.stop();look.setEnabled(false);radioTravel=true;guided=true;
 travel={path:worldPath(camera.position,receiver!.near),from:camera.quaternion.clone(),to:new T.Quaternion(),start:performance.now(),duration:reduced.value?0:3200,exiting:false};
 const target=camera.clone();target.position.copy(receiver!.near);target.lookAt(-12,2.65,3);travel.to.copy(target.quaternion);
}
const colorMode = useColorMode();
const dark = computed(() => colorMode.value === 'dark');
const themeLabel = computed(() => locale.value === 'de' ? 'Licht / Dunkel' : locale.value === 'ru' ? 'Свет / Тьма' : 'Light / Dark');
const { locale } = useI18n(), localePath = useLocalePath();
const c = computed(() => arrivalCopy[locale.value as keyof typeof arrivalCopy] ?? arrivalCopy.en);
const host = ref<HTMLDivElement>(), failed = ref(false), textMode = ref(false), controlsOpen = ref(false), reduced = ref(false);
const state = ref<JourneyState>('arrival'), focus = ref(false), mouseUnavailable = ref(false);
const { projects } = useProjects();
const project = computed(() => projects.value.find(p => p.id === 'flowforge')!);
const pc = computed(() => portalCopy[locale.value as keyof typeof portalCopy] ?? portalCopy.en);
const portalState = ref<PortalState>('exploring'), portalNear = ref(false), resumeLook = ref(false);
const workspace = ref(false), visualStyle = ref<Record<string,string>>({});
const portalBusy = computed(() => ['entering','workspace-active','exiting'].includes(portalState.value));
let terminal: ReturnType<typeof createTerminal>;
let saved: {position:T.Vector3; quaternion:T.Quaternion; yaw:number; pitch:number; locked:boolean} | undefined;
let travel: {path:T.Vector3[]; from:T.Quaternion; to:T.Quaternion; start:number; duration:number; exiting:boolean} | undefined;
let entryPath:T.Vector3[]=[];
let travelled:T.Vector3[]=[];
let exitTimer:ReturnType<typeof setTimeout>|undefined;
let returnFocus:HTMLElement|null=null;
let guided=false;
function saveView() {
  if (saved || !camera) return;
  returnFocus=document.activeElement instanceof HTMLElement ? document.activeElement : null;
  saved={position:camera.position.clone(),quaternion:camera.quaternion.clone(),yaw:look.yaw,pitch:look.pitch,locked:document.pointerLockElement===renderer.domElement};
  journey.cancel();look.stop();look.setEnabled(false);
  if(document.pointerLockElement)document.exitPointerLock();
}
function currentScreen(){return workspaceKind.value==='flowforge'?terminal.screen:works!.screens[workspaceKind.value];}
function activateProjectScreen(kind:'matrix'|'archive') {
 if(portalBusy.value||guided)return;
 if(kind==='archive'&&camera&&works&&camera.position.distanceTo(screenPose(works.screens.archive).center)>16){goWorks('archive');return;}
 workspaceKind.value=kind;activateTerminal(false,true);
}
function screenOrientation(position?:T.Vector3) {const pose=screenPose(currentScreen());const dummy=camera.clone();dummy.position.copy(position||pose.position);dummy.up.set(0,1,0);dummy.lookAt(pose.center);return dummy.quaternion.clone();}
function projectVisual() {
  camera.updateMatrixWorld();terminal.screen.updateWorldMatrix(true,false);
  const a=new T.Vector3(-2.9,1.8125,0).applyMatrix4(terminal.screen.matrixWorld).project(camera);
  const b=new T.Vector3(2.9,-1.8125,0).applyMatrix4(terminal.screen.matrixWorld).project(camera);
  const r=renderer.domElement.getBoundingClientRect();
  visualStyle.value={left:`${(a.x+1)*r.width/2}px`,top:`${(1-a.y)*r.height/2}px`,width:`${(b.x-a.x)*r.width/2}px`,height:`${(a.y-b.y)*r.height/2}px`};
}
function openWorkspace() {
  if(travel?.path)travelled=travel.path.map(p=>p.clone());
  travel=undefined;guided=false;
  if(camera && terminal && !failed.value && !textMode.value) {
    const pose=screenPose(currentScreen(),.5);camera.position.copy(pose.position);camera.quaternion.copy(screenOrientation());renderer.render(scene,camera);if(workspaceKind.value==='flowforge')projectVisual();
  }
  portalState.value='workspace-active';workspace.value=true;
}
function activateTerminal(direct=false,keepScreen=false) {
  if(threshold?.active){threshold.returnToHall(camera);look.restore(0,0);}
  if(portalBusy.value)return;
  if(!keepScreen)workspaceKind.value='flowforge';
  if(radioOpen.value)closeRadio();
  if(worksUI.value)closeWorks();
  if(portalBusy.value)return;
  controlsOpen.value=false;resumeLook.value=false;
  if(!camera || failed.value || textMode.value){portalState.value='workspace-active';workspace.value=true;return;}
  saveView();
  portalState.value='entering';travelled=[camera.position.clone()];
  const pose=screenPose(currentScreen(),.5);
  const end=pose.position;
  const near=workspaceKind.value==='flowforge'?terminal.near.clone():screenPose(currentScreen(),5).position;
  entryPath=camera.position.distanceTo(near)<5 ? [camera.position.clone(),near,end] : [...(workspaceKind.value==='flowforge'?portalPath(camera.position,near):[camera.position.clone(),near]),end];
  travel={path:entryPath,from:camera.quaternion.clone(),to:screenOrientation(),start:performance.now(),duration:reduced.value?0:workspaceKind.value==='flowforge'?Math.max(2200,Math.min(6500,camera.position.distanceTo(near)*90)):1800,exiting:false};
  if(direct||reduced.value){travelled=entryPath.map(p=>p.clone());openWorkspace();}
}
function approachTerminal() {
 if(threshold?.active){threshold.returnToHall(camera);look.restore(0,0);}
  if(radioOpen.value)closeRadio();
  if(worksUI.value)closeWorks();
  if(portalBusy.value||guided)return;
  workspaceKind.value='flowforge';
  if(!camera||failed.value||textMode.value){activateTerminal(true);return;}
  if(portalNear.value){activateTerminal();return;}
  saveView();guided=true;
  travel={path:portalPath(camera.position,terminal.near),from:camera.quaternion.clone(),to:screenOrientation(terminal.near),start:performance.now(),duration:reduced.value?0:4500,exiting:false};
}
function restoreExploration() {
  if(saved){camera.position.copy(saved.position);look.restore(saved.yaw,saved.pitch);resumeLook.value=saved.locked;}
  travel=undefined;saved=undefined;guided=false;look?.setEnabled(true);journey?.locate();portalState.value='exploring';needsRender=true;
  nextTick(()=>{const target=returnFocus?.isConnected?returnFocus:renderer?.domElement;target?.focus({preventScroll:true});returnFocus=null;});
}
function closeWorkspace() {
  if(portalState.value==='exiting')return;
  if(failed.value || textMode.value){workspace.value=false;travel=undefined;saved=undefined;portalState.value='exploring';nextTick(()=>document.querySelector<HTMLButtonElement>('[data-action="portal-approach"]')?.focus());return;}
  if(!saved) {workspace.value=false;}
  if(!saved){portalState.value='exploring';nextTick(()=>document.querySelector<HTMLButtonElement>('[data-action="portal-approach"]')?.focus());return;}
  portalState.value='exiting';
  // Reverse the actual travelled route, including a partially completed entry.
  const backPath=[camera.position.clone(),...travelled.slice().reverse()];
  if(!entryPath.length||guided){restoreExploration();return;}
  const reverse={path:backPath,from:camera.quaternion.clone(),to:saved.quaternion.clone(),start:performance.now(),duration:reduced.value?0:3200,exiting:true};
  travel=undefined;
  const begin=()=>{workspace.value=false;reverse.start=performance.now();travel=reverse;};
  if(workspace.value&&!reduced.value)exitTimer=setTimeout(begin,260);else begin();
}
function updatePortal(now:number) {
  if(!travel)return;
  const t=travel.duration?T.MathUtils.clamp((now-travel.start)/travel.duration,0,1):1;
  const eased=t*t*(3-2*t);
  camera.position.copy(pointOnPath(travel.path,eased));if(!worksTrip.value&&!radioTravel&&!guided&&!travel.exiting && (travelled.length===0 || travelled[travelled.length-1]!.distanceTo(camera.position)>.08))travelled.push(camera.position.clone());camera.quaternion.slerpQuaternions(travel.from,travel.to,Math.min(1,eased*1.7));needsRender=true;
  if(t===1){if(worksTrip.value){const id=worksTrip.value;travel=undefined;guided=false;worksTrip.value='';const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);journey.locate();if(id==='archive'){activateProjectScreen('archive');}else if(id==='matrix'){worksUI.value='matrix';look.setEnabled(false);}else look.setEnabled(true);return;}if(radioTravel){travel=undefined;guided=false;radioTravel=false;look.restore(0,Math.atan2(1,receiver!.near.z-3));radioShortcut();return;}if(travel.exiting)restoreExploration();else if(guided){travel=undefined;guided=false;saved=undefined;look.restore(-Math.PI/2,Math.atan2(1.15,4.5));look.setEnabled(true);portalState.value='terminal-focused';renderer.domElement.focus();}else openWorkspace();}
}
const wallState=ref('dormant');
const actionLabel=computed(()=>state.value==='secondary'?c.value.back:state.value==='arrival'?c.value.approach:wallState.value==='open'?c.value.passage:c.value.activate);
const status = computed(() => ['activated','propagating','opening'].includes(wallState.value)?c.value.signal:wallState.value==='open'&&state.value==='investigating'?c.value.opened: state.value === 'outbound' ? c.value.moving : state.value === 'returning' ? c.value.returning : state.value === 'secondary' ? c.value.secondary : c.value.ready);
let renderer: T.WebGLRenderer, scene: T.Scene, camera: T.PerspectiveCamera, observer: ResizeObserver, frame = 0;
let architecture: ReturnType<typeof buildEnvironment>, lighting: ReturnType<typeof illuminate>;
let look: ReturnType<typeof createLook>, journey: ReturnType<typeof createJourney>;
let collide: ReturnType<typeof createCollision>;
let mechanism: ReturnType<typeof createMechanism>;
let media: MediaQueryList, lastTime = 0, pointerHover = false, nextTelemetry = 0;
let hoveredFacet = -1, terminalHover=false;
let needsRender = true, previousView = '', previousOpening = -1;
const ray = new T.Raycaster(), pointer = new T.Vector2();
const cleanups: (() => void)[] = [];

function pick(x: number, y: number, center = false) {
  if (!renderer || failed.value || textMode.value || portalBusy.value || guided) return false;
  const rect = renderer.domElement.getBoundingClientRect();
  if (!center && (x < rect.left || y < rect.top || x > rect.right || y > rect.bottom)) return false;
  pointer.set(center ? 0 : (x - rect.left) / rect.width * 2 - 1, center ? 0 : -(y - rect.top) / rect.height * 2 + 1);
  ray.setFromCamera(pointer, camera);
  const first = ray.intersectObjects(threshold?.active?threshold.worldSolids:architecture.solids.filter(m=>!threshold?.worldSolids.includes(m)), false).filter(hit=>{let node:T.Object3D|null=hit.object;while(node){if(!node.visible)return false;node=node.parent;}return true;})[0];
  const data = first?.object.userData;
  const entry=interactables?.entries.find(e=>e.mesh===first?.object);
  actionable.value=!!entry&&first!.distance<=entry.range && !(entry.id==='passage'&&mechanism.state!=='open') && !(['activated','propagating','opening','closing'].includes(mechanism.state)&&(entry.id==='key'||entry.id==='facet'));
  if(!entry)return false;
  if(data?.threshold){pickedSunDoor=!!data.sunDoor;return 'threshold';}
  if(data?.works)return 'works:'+data.works+(data.criterion!==undefined?':'+data.criterion:'');
  if(data?.radio)return 'radio';
  if(data?.atmosphere!==undefined)return 'atmosphere:'+data.atmosphere;
  if(data?.sculpture)return 'sculpture';
  if(data?.terminal) {hoveredFacet=-1;return 'terminal';}
  hoveredFacet = data?.facet ?? (data?.key ? 0 : -1);
  return data?.key ? 'key' : data?.facet !== undefined ? 'facet' : data?.passage && mechanism.state === 'open' ? 'passage' : false;
}
function activateWorld(x:number,y:number,center:boolean,direct=false) { if(portalBusy.value||guided)return; let hit=pick(x,y,center);
        if(!center&&touchMode.value&&!hit){for(const [dx,dy] of [[-10,0],[10,0],[0,-10],[0,10]]){hit=pick(x+dx!,y+dy!,false);if(hit&&actionable.value)break;}}
        if (!hit || !freeInput.value) return;
        const intent=interactionIntent(hit,actionable.value,direct);
        if(intent==='none')return;
        if(hit==='threshold'){if(actionable.value){threshold?.activate(pickedSunDoor);needsRender=true;}return;}
        if(hit.startsWith('atmosphere:')){if(actionable.value){atmosphere?.activate(Number(hit.split(':')[1]));needsRender=true;}return;}
        if(hit==='sculpture'){if(actionable.value){sculpture?.activate(performance.now());needsRender=true;}return;}
        if(intent==='approach'){
          // Reuse collision-safe routes instead of silently dropping a distant object click.
          if(hit==='terminal'){activateTerminal();return;}
          if(hit==='radio'){approachRadio();return;}
          if(hit==='works:archive'){activateProjectScreen('archive');return;}
          if(hit.startsWith('works:')){goWorks(hit==='works:matrix-details'||hit.startsWith('works:matrix:')?'matrix':hit.slice(6));return;}
          if(!['activated','propagating','opening','closing'].includes(mechanism.state))enter();
          return;
        }
        if(hit==='works:archive'){activateProjectScreen('archive');return;}
        if(hit==='works:matrix-details'){activateProjectScreen('matrix');return;}
        if(typeof hit==='string'&&hit.startsWith('works:')){const [,id,criterion]=hit.split(':');if(criterion!==undefined){const i=Number(criterion);changeWeight(i,weights.value[i]!%5+1);return;}goWorks(id!);return;}
        if(hit==='radio'){approachRadio();return;}
        if(hit==='terminal'){activateTerminal();return;}
        if ((hit==='key'||hit==='facet') && camera.position.z < -50) {if(mechanism.state==='open')enter();else mechanism.activate(performance.now());}
        else if (journey.state==='arrival' || hit==='key' || hit==='passage' || journey.state==='secondary') enter();
        else mechanism.react(performance.now()); }
function enter() {
  if(threshold?.active){threshold.returnToHall(camera);const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);needsRender=true;return;}
  if(radioOpen.value)closeRadio();
  if(portalBusy.value||guided)return;
  if (failed.value || textMode.value) { state.value = state.value === 'secondary' ? 'arrival' : 'secondary'; return; }
  renderer.domElement.focus({ preventScroll: true });
  if (journey.state === 'outbound' || journey.state === 'returning') return;
  if (journey.state === 'arrival') { look.stop(); journey.approach(); mechanism.discover(); look.orient(0,.02); return; }
  if (journey.state === 'approaching') return;
  if (journey.state === 'secondary' || mechanism.state === 'open') {
    const returning=journey.state==='secondary'; look.stop(); journey.activate(); look.orient(returning ? Math.PI : 0,.02);
  } else mechanism.activate(performance.now());
}
function back() {
  if(threshold?.active){enter();return;}
  if(worksTrip.value){cancelWorks();return;}
  if(worksUI.value)closeWorks();
  if(radioTravel){travel=undefined;guided=false;radioTravel=false;closeRadio();return;}
  if(radioOpen.value)closeRadio();
  if(portalBusy.value||guided){closeWorkspace();return;}
  if (failed.value || textMode.value) { state.value = 'arrival'; return; }
  if (!journey) return;
  renderer.domElement.focus({ preventScroll: true }); look.stop(); journey.return();
}
async function mouseLook() { if(worksUI.value)closeWorks(); if(radioOpen.value)closeRadio(); if(portalBusy.value||guided)return; resumeLook.value=false; controlsOpen.value = false; mouseUnavailable.value = !(await look?.lock()); }
function applyReduced(value: boolean) { reduced.value = value; journey?.setReduced(value); }
function onMotion(event: MediaQueryListEvent) { applyReduced(event.matches); }
function failure() { clearTimeout(exitTimer);pendingWorks='';worksTrip.value='';guided=false;travel=undefined;if(portalBusy.value) {workspace.value=true;portalState.value='workspace-active';} failed.value = true; cancelAnimationFrame(frame); }
function showText() {
  if(radioOpen.value)closeRadio();
  if(portalBusy.value||guided)return;
  journey?.reset();
  textMode.value = !textMode.value;
  if (textMode.value) { if (document.pointerLockElement) document.exitPointerLock(); cancelAnimationFrame(frame); }
  else if (!failed.value) { lastTime = performance.now(); animate(lastTime); }
}
function animate(now: number) {
  if (failed.value || textMode.value) return;
  frame = requestAnimationFrame(animate);
  const dt = Math.min((now - lastTime) / 1000, .2); lastTime = now;
  if(!portalBusy.value && !guided && !worksUI.value && !worksTrip.value && radio.state.mode!=='expanded') {
  look.update(dt, reduced.value);
  const movement = look.movement(dt);
  if (movement.active && journey.moving) journey.cancel();
  if (journey.moving) journey.update(now, dt);
  else { scene.updateMatrixWorld(true); threshold!.move(camera.position, movement.delta,collide); journey.locate(); }
  }
  const wasExterior=threshold?.active;
  if(threshold?.update(dt,reduced.value,camera)){
    if(threshold.active!==wasExterior){const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x,Math.PI);}
    needsRender=true;renderer.shadowMap.needsUpdate=true;
  }
  if(pendingWorks&&['dormant','discovered'].includes(mechanism.state))mechanism.activate(now);
  if(pendingWorks&&mechanism.state==='open'){const id=pendingWorks,room=expansionSpaces.find(s=>s.id===id);startWorks(id,room?new T.Vector3(...room.anchor):id==='arrival'?spawn:id==='gallery'?worksArrival:new T.Vector3(...worksModules.find(m=>m.id===id)!.destination));}
  if(radio.state.mode!=='expanded')updatePortal(now);
  if(atmosphere?.update(now,dt,reduced.value,camera.position))needsRender=true;
  if(sculpture?.update(now,dt,reduced.value))needsRender=true;
  if(works?.update(dt,reduced.value)){needsRender=true;renderer.shadowMap.needsUpdate=true;}
  if(!portalBusy.value && !guided && document.pointerLockElement===renderer.domElement) terminalHover=pick(0,0,true)==='terminal';
  if(terminal){const distance=camera.position.distanceTo(terminal.center);portalNear.value=distance<9;terminal.update(distance,terminalHover||portalState.value==='entering');if(!portalBusy.value&&!guided)portalState.value=portalNear.value&&terminalHover?'terminal-focused':'exploring';}
  if (!worksTrip.value && camera.position.distanceTo(spawn) < 3 && mechanism.state === 'open') mechanism.close(now);
  mechanism.focus(focus.value ? 0 : candidate.value==='key'?0:hoveredFacet); mechanism.update(now,reduced.value);
  if(interactables?.update(now,candidate.value,actionable.value,!freeInput.value,reduced.value))needsRender=true;
  lighting.portal.intensity = T.MathUtils.damp(lighting.portal.intensity, pointerHover || focus.value ? 80 : 40, 7, dt);
  if(portalState.value==='entering'||portalState.value==='exiting'||guided)needsRender=true;
  receiver?.update(locale.value,dark.value);
  const view = [locale.value,radio.state.station,radio.state.status,radio.title,camera.position.x,camera.position.z,look.yaw,look.pitch,mechanism.opening,lighting.portal.intensity,Number(terminalHover),Number(portalNear.value),architecture.wall.key.position.z,...architecture.wall.signals.map(m=>m.emissiveIntensity),...architecture.wall.panels.map(p=>p.position.z)].map(v=>typeof v==='number'?v.toFixed(5):v).join(',');
  if (Math.abs(mechanism.opening - previousOpening) > .025) { renderer.shadowMap.needsUpdate = true; previousOpening = mechanism.opening; }
  if (needsRender || (portalState.value!=='workspace-active' && view !== previousView)) { renderer.render(scene, camera); needsRender = false; previousView = view; }
  if (now > nextTelemetry) {
    nextTelemetry = now + 100;
    inputReady.value=!guided&&!journey.moving&&!portalBusy.value;
    if(freeInput.value){candidate.value=pick(0,0,true);}else{candidate.value=false;actionable.value=false;}
    renderer.domElement.dataset.interaction=String(candidate.value||'');renderer.domElement.dataset.actionable=String(actionable.value); wallState.value=mechanism.state;
    const canvas = renderer.domElement;
    canvas.dataset.environment=threshold?.environment||'hall';canvas.dataset.threshold=threshold?.state||'closed';canvas.dataset.room=threshold?.active?threshold.environment:spaceAt(camera.position)?.id||'';canvas.dataset.works=worksUI.value||worksTrip.value||(camera.position.x>15&&camera.position.z<-72?'gallery':'');canvas.dataset.portal=portalState.value;canvas.dataset.guided=String(guided);canvas.dataset.ready = 'true'; canvas.dataset.state = journey.state;
    canvas.dataset.position = camera.position.toArray().map(n => n.toFixed(4)).join(',');
    canvas.dataset.look = [look.yaw, look.pitch].map(n => n.toFixed(4)).join(',');
    canvas.dataset.wall = mechanism.state; canvas.dataset.opening = mechanism.opening.toFixed(4); canvas.dataset.triangles = String(renderer.info.render.triangles);
  }
}
function applyTheme() {
  if (!architecture || !lighting) return;
  architecture.setTheme(dark.value); lighting.setTheme(dark.value);works?.setTheme(dark.value);expansion?.setTheme(dark.value);atmosphere?.setTheme(dark.value);threshold?.setTheme(dark.value);
  renderer.toneMappingExposure = dark.value ? 1.12 : 1.0;
  needsRender = true; renderer.shadowMap.needsUpdate = true;
}
let radioPausedAt:number|undefined;
watch(()=>radio.state.mode,mode=>{
 const expanded=mode==='expanded';journey?.setPaused(expanded);
 if(renderer)renderer.domElement.inert=expanded;
 if(expanded){radioPausedAt=performance.now();if(document.pointerLockElement)document.exitPointerLock();look?.stop();look?.setEnabled(false);}
 else {
  if(travel&&radioPausedAt!==undefined)travel.start+=performance.now()-radioPausedAt;
  radioPausedAt=undefined;
  if(!radioOpen.value&&!portalBusy.value&&!worksUI.value&&!guided&&!worksTrip.value)look?.setEnabled(true);
 }
}, {flush:'sync'});
watch(portalBusy,busy=>{if(busy)radio.setMode('mini');});
function playerStopped(){closeRadio();nextTick(()=>document.querySelector<HTMLButtonElement>(portalBusy.value?'[data-action=portal-close]':'[data-action=radio-shortcut]')?.focus());}
function releaseDockPointer(){if(document.pointerLockElement)document.exitPointerLock();}
function radioShortcut(){
 if(document.pointerLockElement)document.exitPointerLock();
 look?.stop();look?.setEnabled(false);radio.setMode('expanded');
 nextTick(()=>document.querySelector<HTMLButtonElement>('.persistent-radio [data-action=radio-play]')?.focus());
}
watch(freeInput,value=>{look?.setEnabled(value);if(!value){candidate.value=false;actionable.value=false;}},{flush:'sync'});
watch(dark, applyTheme);
watch(locale,value=>{atmosphere?.setLocale(value);expansion?.setLocale(value);works?.setLocale(value);needsRender=true;});
watch(reduced, value => {journey?.setReduced(value);if(value && travel)travel.duration=0;});
onMounted(() => {
  radio.mount();
  try {
    media = matchMedia('(prefers-reduced-motion: reduce)'); reduced.value = media.matches;
    media.addEventListener('change', onMotion); cleanups.push(() => media.removeEventListener('change', onMotion));
    scene = new T.Scene();
    renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 650 ? 1.35 : 1.65));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap; renderer.shadowMap.autoUpdate = false; renderer.shadowMap.needsUpdate = true;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.06; renderer.outputColorSpace = T.SRGBColorSpace;
    const canvas = renderer.domElement; canvas.tabIndex = 0; canvas.setAttribute('role', 'application'); canvas.setAttribute('aria-label', c.value.canvas);
    host.value!.appendChild(canvas);
    camera = new T.PerspectiveCamera(innerWidth < 650 ? 72 : 65, 1, .08, 220); camera.position.copy(spawn);
    architecture = buildEnvironment(scene); receiver=createReceiver(scene,architecture.solids,radio); expansion=createExpansion(scene,architecture.solids);expansion.setLocale(locale.value);atmosphere=createAtmosphere(scene,architecture.solids);atmosphere.setLocale(locale.value);sculpture=createOrbitalSculpture(scene,architecture.solids);hallGallery=createHallGallery(scene,architecture.solids,()=>{needsRender=true;});works=createWorks(scene,architecture.solids);works.setLocale(locale.value);mechanism=createMechanism(architecture.wall); lighting = illuminate(scene); terminal=createTerminal(scene,architecture.solids);threshold=createImpossibleThreshold(scene,architecture.solids);interactables=createInteractables(architecture.solids); collide = createCollision(architecture.solids.filter(m=>!threshold!.worldSolids.includes(m))); applyTheme();
    if (innerWidth < 650) lighting.sun.shadow.mapSize.set(1024, 1024);
    journey = createJourney(camera, architecture, next => { state.value = next; if (next === 'arrival' && camera.position.distanceTo(spawn) < .1) { mechanism.close(performance.now()); } });
    journey.setReduced(reduced.value);
    look = createLook(camera, canvas, {
      activate: activateWorld,
      hover(x, y, center) { const hit=pick(x,y,center); terminalHover=hit==='terminal';pointerHover = !!hit;needsRender=true; canvas.style.cursor = pointerHover ? 'pointer' : 'grab'; },
      manual() { if(portalBusy.value||guided)return; if (journey.moving) journey.cancel(); },
      escape() { if(worksTrip.value){cancelWorks();return;}if(worksUI.value){closeWorks();return;}if(radioOpen.value){closeRadio();return;} if(portalBusy.value||guided){closeWorkspace();return;} controlsOpen.value = false; look.stop(); if (journey.moving) journey.cancel(); },
    });
    const capability=matchMedia('(pointer: coarse)');touchMode.value=capability.matches;
    const detect=(e:PointerEvent)=>{if(e.pointerType==='touch')touchMode.value=true;else if(e.pointerType==='mouse')touchMode.value=false;};
    window.addEventListener('pointerdown',detect);cleanups.push(()=>window.removeEventListener('pointerdown',detect));
    observer = new ResizeObserver(() => {
      if (!host.value) return;
      const rect = host.value.getBoundingClientRect(); renderer.setSize(rect.width, rect.height); camera.aspect = rect.width / rect.height;
      camera.fov = rect.width < 650 ? 72 : 65; camera.updateProjectionMatrix(); if(workspace.value && saved && workspaceKind.value==='flowforge')projectVisual(); needsRender = true;
    }); observer.observe(host.value!);
    const lost = (e: Event) => { e.preventDefault(); failure(); };
    canvas.addEventListener('webglcontextlost', lost); cleanups.push(() => canvas.removeEventListener('webglcontextlost', lost));
    const escapePortal=(e:KeyboardEvent)=>{if(e.repeat||e.defaultPrevented)return;if(e.key==='Escape'&&radioOpen.value){e.preventDefault();closeRadio();return;}if(e.key==='Escape'&&worksTrip.value){e.preventDefault();cancelWorks();return;}if(e.key==='Escape'&&worksUI.value){e.preventDefault();closeWorks();return;}if(e.key==='Escape'&&radioTravel){e.preventDefault();travel=undefined;guided=false;radioTravel=false;closeRadio();return;}if(e.key==='Escape'&&(portalBusy.value||guided)){e.preventDefault();closeWorkspace();}};
    window.addEventListener('keydown',escapePortal);cleanups.push(()=>window.removeEventListener('keydown',escapePortal));
    lastTime = performance.now(); animate(lastTime);
  } catch (error) { console.error('Arrival Chamber:', error); failure(); }
});
onBeforeUnmount(() => {
  radio.dispose(); receiver?.dispose(); clearTimeout(exitTimer); cancelAnimationFrame(frame); observer?.disconnect(); look?.dispose(); for (const cleanup of cleanups) cleanup();
  interactables?.dispose();threshold?.dispose();atmosphere?.dispose();sculpture?.dispose();hallGallery?.dispose();expansion?.dispose();works?.dispose();terminal?.dispose(); architecture?.dispose(); lighting?.dispose(); renderer?.dispose(); renderer?.domElement.remove();
});
</script>
<template>
  <main class="arrival-world" :class="{ 'arrival-dark': dark, 'arrival-radio-active': radioOpen, 'arrival-player-active': radio.state.power, 'arrival-works-reading':worksUI==='matrix' }" :aria-label="c.name">
    <div v-show="!failed && !textMode" ref="host" :inert="portalBusy || guided || !!worksUI || !!worksTrip" class="arrival-canvas"/>
    <nav v-show="!portalBusy" ref="gameDock" :inert="guided" class="arrival-tools" @focusin="releaseDockPointer" @pointerdown="releaseDockPointer" @keydown.stop :aria-label="c.controls">
      <button data-action="radio-shortcut" @keydown.stop :aria-label="ac.receiver" :title="ac.receiver" @click="radioShortcut">♫</button>
      <button data-action="works-shortcut" :aria-label="wc.go" :title="wc.go" :aria-expanded="!!worksUI" @click="worksMenu">⋈</button>
      <button data-action="portal-approach" :aria-label="portalNear?pc.activate:pc.approach" :title="portalNear?pc.activate:pc.approach" @click="approachTerminal">▣</button>
      <button :aria-label="themeLabel" :title="themeLabel" :aria-pressed="dark" data-action="theme" @click="colorMode.preference = dark ? 'light' : 'dark'">{{ dark ? '◐' : '◑' }}</button>
      <button :aria-label="resumeLook?pc.resume:c.mouse" :title="resumeLook?pc.resume:c.mouse" data-action="look" @click="mouseLook">⌖</button>
      <button :aria-label="c.back" :title="c.back" data-action="return" @click="back">↶</button>
      <button :aria-label="c.controls" :title="c.controls" :aria-expanded="controlsOpen" aria-controls="arrival-controls" @click="controlsOpen = !controlsOpen">?</button>
      <NuxtLink data-action="world-exit" :to="localePath('/')" :aria-label="c.exit" :title="c.exit">↗</NuxtLink>
    </nav>
    <section v-if="controlsOpen && !portalBusy" id="arrival-controls" class="arrival-controls" :aria-label="c.controls">
      <p>{{ c.instructions }}</p>
      <p>{{ ic.atmosphereDescription }}</p>
      <button v-if="!failed && !textMode" @click="mouseLook">{{ c.mouse }}</button>
      <p class="arrival-fine">{{ c.release }}</p>
      <label><input v-model="reduced" type="checkbox">{{ c.reduce }}</label>
      <button :aria-pressed="textMode" @click="showText">{{ c.alternative }}</button>
    </section>
    <p v-if="mouseUnavailable" class="arrival-mouse-note" role="status">{{ c.unsupported }}</p>
    <nav v-show="!portalBusy" :inert="guided" class="arrival-access" :class="{ 'arrival-text': failed || textMode }" :aria-label="c.name">
      <p v-if="failed">{{ c.fallback }}</p>
      <p v-if="failed || textMode">{{ ic.atmosphereDescription }}</p>
      <button v-if="failed || textMode" @click="goWorks('atmosphere')">{{ ic.atmosphereName }}</button>
      <p v-if="failed || textMode">{{ state === 'secondary' ? c.inside : c.intro }}</p>
      <button :disabled="state === 'outbound' || state === 'returning' || state === 'approaching'" @focus="focus = true" @blur="focus = false" @click="enter">{{ actionLabel }}</button>
      <button @click="goWorks('gallery')">{{ wc.go }}</button>
      <button @click="goWorks('matrix')">{{ wc.inspect }}</button>
      <button @click="goWorks('archive')">{{ wc.archive }}</button>
      <button :aria-label="ac.approach" @keydown.stop @click="approachRadio">{{ ac.approach }}</button>
    </nav>
    <TouchControls v-if="touchVisible" :label="ic.move" :help="ic.help" @move="mobileMove"/>
    <p v-if="touchVisible" class="arrival-look-hint">{{ ic.look }}</p>
    <button v-if="freeInput && candidate" class="arrival-context" :class="{'arrival-context-touch':touchMode}" :disabled="!actionable" @click="activateWorld(0,0,true)">{{ hint }}<kbd v-if="!touchMode && actionable">E</kbd></button>
    <span v-if="!portalBusy && portalNear" class="portal-reticle" aria-hidden="true">+</span>
    <div v-if="portalState==='entering'" class="portal-progress" role="status">{{ pc.entering }} <button @click="openWorkspace">{{ pc.skip }}</button></div>
    <p v-if="portalState==='exiting'" class="portal-progress" role="status">{{ pc.exiting }}</p>
    <WorksSurface v-if="worksUI && !portalBusy" :spaces="expansionSpaces" :mode="worksUI" :locale="locale" :projects="projects" :weights="weights" :selected="selectedCriterion" @close="closeWorks" @travel="goWorks" @weight="changeWeight" @criterion="selectCriterion" @reset="resetMatrix" @details="activateProjectScreen('matrix')"/>
    <p v-if="worksTrip" class="works-travel" role="status">{{ wc.travel }} <button data-action="works-cancel" @click="cancelWorks">{{ ac.close }}</button></p>
    <ProjectWorkspace v-if="workspace && workspaceKind!=='flowforge'" :kind="workspaceKind" :locale="locale" :projects="projects" v-model:selected="archiveSelection" :exiting="portalState==='exiting'" @close="closeWorkspace"/>
    <PortalWorkspace v-if="workspace && workspaceKind==='flowforge'" :project="project" :labels="pc" :visual-style="visualStyle" :exiting="portalState==='exiting'" @close="closeWorkspace"/>
    <PersistentRadioPlayer :radio="radio" :locale="locale" :dock="gameDock" @leave="closeRadio" @stopped="playerStopped"/>
    <p class="arrival-status" aria-live="polite">{{ status }}</p>
  </main>
</template>
