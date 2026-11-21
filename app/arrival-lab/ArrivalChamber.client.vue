<script setup lang="ts">
import * as T from 'three';
import {createFlight,createFlightCollision,flightStation,flightAllowed,type FlightPhase} from './flight';
import {createFlightScene} from './flight-scene';
import {flightCopy} from './flight-copy';
import {originBoundary,originHeight} from './origin';
import {roofHeight} from './ascent';
let flight:ReturnType<typeof createFlight>|undefined,flightScene:ReturnType<typeof createFlightScene>|undefined;
const flightPhase=ref<FlightPhase>('docked'),flightAltitude=ref(0),flightSpeed=ref(0),flightUnsafe=ref(false),flightNotice=ref('');
const flightText=computed(()=>flightCopy[locale.value==='de'||locale.value==='ru'?locale.value:'en']);
const flightEquipped=computed(()=>flightPhase.value!=='docked');
function flightPermitted(){return flightAllowed({skyfall:!!sculpture?.ownsMotion,passenger:!!skytube?.ownsPassenger||!!coaster?.ownsPassenger||!!secrets?.busy,guided:guided||!!journey?.moving,otherWorld:!!threshold?.active||!!district?.active||!!secrets?.active,ui:!freeInput.value,water:swimmingActive.value});}
function flightAction(){if(!flight||!freeInput.value)return;if(flight.equipped){flight.unequip();}else if(flight.equip(camera.position,flightPermitted())){journey.cancel();jumping?.reset();swimming.reset();}flightPhase.value=flight.phase;look.setFlying(flight.equipped);look.stop();nextTick(()=>renderer.domElement.focus());needsRender=true;}
function recoverFlight(){if(!flight?.equipped)return;flight.recover(camera.position);flightPhase.value=flight.phase;look.stop();jumping?.reset();journey.locate();flightNotice.value=flightText.value.recovered;needsRender=true;}

import { createLagoon } from './lagoon';
import { createSwimming, inExpansion, onExpansionApproach, inBasin, inTunnel, tunnelFloor, expansionGround, waterState, motionOwner } from './lagoon-model';
import { createCreationYard } from './creation-yard';
import { expansionCopy } from './lagoon-copy';
import CreationYardPanel from './CreationYardPanel.vue';
import { builderPointer,builderSessionActive,type PieceType } from './builder-model';
let lagoonWorld:ReturnType<typeof createLagoon>|undefined, builder:ReturnType<typeof createCreationYard>|undefined;
const buildPointer={x:0,y:0};
function updateBuildPointer(x:number,y:number,center:boolean){if(center){buildPointer.x=buildPointer.y=0;}else if(x>=0&&y>=0){const r=renderer.domElement.getBoundingClientRect();Object.assign(buildPointer,builderPointer(x,y,r,false));}}
function refreshBuild(){if(builder&&camera){builder.update(camera,document.pointerLockElement===renderer.domElement?0:buildPointer.x,document.pointerLockElement===renderer.domElement?0:buildPointer.y);}}
function cancelBuildAction(){if(builder?.cancel()){buildRevision.value++;return;}closeBuilder();}
const swimming=createSwimming(),buildOpen=ref(false),swimmingActive=ref(false),buildRevision=ref(0);
const aquaticCopy=computed(()=>expansionCopy[locale.value==='de'||locale.value==='ru'?locale.value:'en']);
const buildUI=computed(()=>{buildRevision.value;return {count:builder?.store.pieces.length||0,saved:builder?.store.saved??true,valid:builder?.valid??false,selected:builder?.selected!==null,type:builder?.type||'cube',color:builder?.color||'#ed896a',canUndo:builder?.store.canUndo||false,selecting:builder?.selecting||false,moving:builder?.moving||false};});
function openBuilder(){if(flight?.equipped)return;journey?.cancel();look?.stop();releaseDockPointer();buildPointer.x=buildPointer.y=0;buildOpen.value=true;refreshBuild();nextTick(()=>renderer?.domElement.focus());}
function closeBuilder(){buildOpen.value=false;builder?.close();look?.stop();nextTick(()=>renderer?.domElement.focus());needsRender=true;}
function builderAction(action:'place'|'rotate'|'move'|'remove'|'undo'|'reset'|'select'){builder?.[action]();buildRevision.value++;needsRender=true;if(renderer)renderer.shadowMap.needsUpdate=true;}
function choosePiece(type:PieceType){builder?.choose(type);buildRevision.value++;}
function chooseColor(color:string){builder?.setColor(color);buildRevision.value++;needsRender=true;}
function recoverBeach(){if(!camera||!freeInput.value||guided)return;camera.position.set(-135,1.65,62);swimming.reset();jumping?.reset();look?.stop();needsRender=true;}

import { arrivalMetrics, createArrivalDiagnostics } from './performance';
let diagnostics:ReturnType<typeof createArrivalDiagnostics>|undefined;
const movementScratch=new T.Vector3(), oldPositionScratch=new T.Vector3(), coasterLook=new T.Quaternion(), coasterEuler=new T.Euler();
let hallPickSolids:T.Mesh[]=[], remotePickSolids:T.Mesh[]=[];
import PrintLabPanel from './PrintLabPanel.vue';
import { createPrintLab } from './print-lab';
import { defaultDesign, readPrints, storageKey, type PrintDesign } from './print-model';
let printLab:ReturnType<typeof createPrintLab>|undefined;
const printOpen=ref(false),printDesign=ref<PrintDesign>({...defaultDesign}),printCollection=ref<PrintDesign[]>([]),printProgress=ref<number|null>(null),printNotice=ref('');
let printElapsed=0;
function savePrintLab(){try{localStorage.setItem(storageKey,JSON.stringify({selected:printDesign.value,collection:printCollection.value}));}catch{printNotice.value='Your creation is here, but this browser could not save it after reload.';}}
function changePrintDesign(d:PrintDesign){if(printProgress.value!==null)return;printDesign.value={...d};savePrintLab();}
function openPrintLab(){journey?.cancel();look?.stop();releaseDockPointer();printOpen.value=true;}
function closePrintLab(){printOpen.value=false;nextTick(()=>renderer?.domElement.focus());}
function startPrint(){if(printProgress.value!==null||printCollection.value.length>=12)return;printNotice.value='Printing! You can close this panel to watch the printer.';printElapsed=0;printProgress.value=0;printLab?.preview(printDesign.value);needsRender=true;}

import IslandMap from './IslandMap.vue';
import { createWayfinding } from './wayfinding';
let wayfinding:ReturnType<typeof createWayfinding>|undefined;
const mapOpen=ref(false),mapPosition=ref({x:0,z:0}),mapEnvironment=ref('hall');
function closeMap(){mapOpen.value=false;nextTick(()=>{document.querySelector<HTMLButtonElement>('[data-action="map"]')?.focus();});}
function toggleMap(){if(mapOpen.value){closeMap();return;}if(skyfallBusy.value||guided||portalBusy.value||secrets?.busy)return;mapPosition.value={x:camera.position.x,z:camera.position.z};mapEnvironment.value=threshold?.active?threshold.environment:district?.active?'vault':district?.contains(camera.position)?'loop':'hall';journey?.cancel();look?.stop();releaseDockPointer();mapOpen.value=true;}

import { createIntelligence } from './intelligence';
import EntityConversation from './EntityConversation.vue';
import { useWorldConversation,conversationCopy,entityOrder,type EntityId } from './conversation';
const encounter=useWorldConversation();
const activeEntity=encounter.active;
const encounterCopy=computed(()=>conversationCopy[locale.value==='de'||locale.value==='ru'?locale.value:'en']);
let intelligence:ReturnType<typeof createIntelligence>|undefined;
function openEncounter(id:EntityId){
 if(!freeInput.value)return;
 journey.cancel();look.stop();look.setEnabled(false);releaseDockPointer();
 const entity=intelligence?.entities.find(e=>e.spec.id===id);
 const person=entity?.person||family?.people.find(p=>p.spec.id===id)?.person;
 if(person){const aim=person.position.clone();aim.y=entity?entity.spec.height-0.6:1.3;const target=camera.clone();target.lookAt(aim);if(window.innerWidth>850){aim.add(new T.Vector3(1,0,0).applyQuaternion(target.quaternion).multiplyScalar(camera.position.distanceTo(aim)*.32));target.lookAt(aim);}const e=new T.Euler().setFromQuaternion(target.quaternion,'YXZ');look.orient(e.y,e.x);}
 encounter.open(id);family?.converse(id);needsRender=true;
}
function closeEncounter(){encounter.close();family?.converse(null);look?.stop();look?.setEnabled(freeInput.value);nextTick(()=>renderer?.domElement.focus());needsRender=true;}

import { createJump } from './jumping';
import { createSkyCoaster } from './sky-coaster';
import { createTwoSecrets } from './two-secrets';
let secrets:ReturnType<typeof createTwoSecrets>|undefined;
const secretPassenger=ref(false),secretBusy=ref(false);
let jumping:ReturnType<typeof createJump>|undefined;
let coaster:ReturnType<typeof createSkyCoaster>|undefined;
const coasterPassenger=ref(false);
function requestJump(){if(flight?.equipped){if(freeInput.value&&!swimmingActive.value)flight.takeoff();return;}if(swimmingActive.value)return;if(freeInput.value&&!guided&&!journey?.moving&&!skytube?.ownsPassenger&&!coaster?.ownsPassenger&&!secrets?.ownsMotion)jumping?.request();}
import TouchControls from './TouchControls.vue';
import { createSkyNetwork, skyCopy, skyStations, type TransitPhase, type StationId } from './skytube';
let skytube:ReturnType<typeof createSkyNetwork>|undefined;
const transitPassenger=ref(false),transitPhase=ref<TransitPhase>('docked'),transitDestination=ref<StationId>('district');
const skyLanguage=computed(()=>locale.value==='de'||locale.value==='ru'?locale.value:'en');
const skyText=computed(()=>skyCopy[skyLanguage.value]);
const transitStatus=computed(()=>skyText.value[transitPhase.value]+' · '+(skytube?.serviceName==='Grand Scenic Loop'?'Grand Scenic Loop':skyStations[transitDestination.value].names[skyLanguage.value]));
import { createAscent, accessHeight, inStairHall, ascent } from './ascent';
let rooftop:ReturnType<typeof createAscent>|undefined;

import { createInteractables, interactionIntent } from './interactions';
import { interactionCopy } from './interaction-copy';
const ic=computed(()=>interactionCopy[locale.value as keyof typeof interactionCopy]||interactionCopy.en);
const touchMode=ref(false), inputReady=ref(false), candidate=ref<string|false>(false), actionable=ref(false);
let interactables:ReturnType<typeof createInteractables>|undefined;
const freeInput=computed(()=>inputReady.value&&!skyfallBusy.value&&!buildOpen.value&&!printOpen.value&&!mapOpen.value&&!activeEntity.value&&!failed.value&&!textMode.value&&!portalBusy.value&&!worksUI.value&&!worksTrip.value&&!radioOpen.value&&!controlsOpen.value);
const touchVisible=computed(()=>touchMode.value&&(freeInput.value||buildOpen.value)&&!transitPassenger.value&&!coasterPassenger.value&&!secretPassenger.value&&!guided);
const hint=computed(()=>{const id=candidate.value;if(id==='sky-explorer')return flightText.value.name+' · '+flightText.value.equip;if(id==='sculpture')return ringStatus.value;if(id==='creation-yard')return aquaticCopy.value.build;if(!id)return '';if(id.startsWith('atmosphere:')){const c=atmosphereCopy[locale.value==='de'||locale.value==='ru'?locale.value:'en'];return c.select+' · '+c.states[Number(id.split(':')[1])];}if(id.startsWith('works:openme'))return actionable.value?getRoomCopy(locale.value).action:ic.value.approach;if(id.startsWith('secret:'))return secrets?.hint(id.slice(7))||'';if(id==='print-lab')return actionable.value?'Print Lab · Choose / make / print':'Approach the Print Lab station';if(id.startsWith('entity:'))return encounterCopy.value.names[entityOrder.indexOf(id.slice(7) as EntityId)]+' · '+encounterCopy.value.talk;if(id.startsWith('npc:'))return (family?.people.find(p=>p.spec.id===id.slice(4))?.spec.name||'')+' · '+encounterCopy.value.talk;if(id==='coaster')return coasterPassenger.value?(({de:'Aussteigen',ru:'Выйти'} as Record<string,string>)[locale.value]||'Exit carriage'):(({de:'Sky Coaster · Einsteigen',ru:'Небесные горки · Сесть'} as Record<string,string>)[locale.value]||'Cloudbreaker · Ride coaster');if(id.startsWith('skytube:'))return !actionable.value?(skytube?.phase==='docked'?skyText.value.approach:skyText.value.unavailable):id==='skytube:exit'?skyText.value.exit:id.includes('scenic:')?'Grand Scenic Loop · '+skyText.value.board:id==='skytube:board'?'Loop District · '+skyText.value.board:skyText.value.call;if(id.startsWith('loop:'))return ({de:'Tür öffnen · hindurchgehen',ru:'Открыть дверь · пройти'} as Record<string,string>)[locale.value]||'Open door · walk through';if(!actionable.value)return (id==='key'||id==='facet')&&['activated','propagating','opening','closing'].includes(wallState.value)?ic.value.busy:ic.value.approach;return id.startsWith('explorer:')?(({de:'Berühren',ru:'Коснуться'} as Record<string,string>)[locale.value]||'Touch')+' · '+explorerCountryName(id.slice(9),locale.value):id==='origin-door'?ic.value.originDoor:id==='threshold'?ic.value.threshold:id==='key'||id==='facet'?wallState.value==='open'?ic.value.passage:ic.value.wall:id==='passage'?ic.value.passage:id==='terminal'?ic.value.terminal:id==='radio'?ic.value.radio:id.startsWith('atmosphere:')?ic.value.atmosphere:id==='sculpture'?ic.value.sculpture:id==='works:archive'?ic.value.archive:id==='works:matrix-details'?ic.value.details:id.startsWith('works:matrix:')?ic.value.criterion:id==='works:gallery'?ic.value.gallery:ic.value.matrix;});
function mobileMove(x:number,z:number,sprint:boolean){if(freeInput.value||buildOpen.value)look?.analog(x,z,sprint);else look?.stop();}

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
import { createLoopDistrict } from './loop-district';
let district:ReturnType<typeof createLoopDistrict>|undefined;
import { createOrigin } from './origin';
let origin:ReturnType<typeof createOrigin>|undefined;
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
import { createLittleExplorer, explorerCountryName } from './little-explorer';
let explorer:ReturnType<typeof createLittleExplorer>|undefined;
import { createFamily } from './family';
import { createLivingQuarters } from './living-quarters';
let livingQuarters:ReturnType<typeof createLivingQuarters>|undefined;
import { createWorkWing } from './work-wing';
let family:ReturnType<typeof createFamily>|undefined,workWing:ReturnType<typeof createWorkWing>|undefined;
import { createExpansion } from './expansion';
import { createAtmosphere } from './atmosphere';
import { atmosphereCopy } from './atmosphere-copy';
let atmosphere:ReturnType<typeof createAtmosphere>|undefined;
import { createOrbitalSculpture } from './orbital-sculpture';
import { ringCopy,type RingPhase } from './ring-skyfall';
const skyfallBusy=ref(false),ringPhase=ref<RingPhase>('idle'),ringCount=ref(0),ringNearby=ref(false);
const ringText=computed(()=>ringCopy[locale.value==='de'||locale.value==='ru'?locale.value:'en']);
const ringStatus=computed(()=>ringPhase.value==='idle'||ringPhase.value==='charging'?`${ringText.value.charge} · ${ringCount.value} / 4`:ringText.value[ringPhase.value]);
let pickedRing:number|undefined;
function cancelSkyfall(){if(sculpture?.cancel(camera)){skyfallBusy.value=false;ringPhase.value=sculpture.sequence.phase;look?.stop();jumping?.reset();swimming.reset();journey?.locate();needsRender=true;}}
import { createHallGallery } from './hall-gallery';
let sculpture: ReturnType<typeof createOrbitalSculpture> | undefined;
let hallGallery: ReturnType<typeof createHallGallery> | undefined;
import { expansionSpaces, lagoonSpaces, spaceAt } from './spaces';
import { createWorks } from './works/environment';
import { worksModules, worksArrival, worldPath } from './works/registry';
import { initialWeights } from './works/matrix';
import { worksCopy } from './works/copy';
import WorksSurface from './works/WorksSurface.vue';
import OpenMeRoom from './works/OpenMeRoom.vue';
import { getRoomCopy } from './works/project-rooms';
import ProjectWorkspace from './works/ProjectWorkspace.vue';
import './works/works.css';
const worksUI=ref<'destinations'|'matrix'|'openme'|null>(null), worksTrip=ref('');
const workspaceKind=ref<'flowforge'|'matrix'|'archive'>('flowforge');
const archiveSelection=ref('decision-matrix-ai');
const openMeEndpoint=ref(0),openMeReceived=ref(false),openMeRouting=ref(false);
function openMeRoom(index=0,route=false){journey?.cancel();look?.stop();releaseDockPointer();look?.setEnabled(false);openMeEndpoint.value=index;works?.projectGallery.select(index,route);worksUI.value='openme';needsRender=true;}
function selectOpenMe(index:number,route:boolean){openMeEndpoint.value=index;works?.projectGallery.select(index,route);needsRender=true;}

const weights=ref([...initialWeights]), selectedCriterion=ref(0);
const wc=computed(()=>worksCopy[locale.value as keyof typeof worksCopy]||worksCopy.en);
let expansion:ReturnType<typeof createExpansion>|undefined;
let works:ReturnType<typeof createWorks>|undefined, pendingWorks='';
function changeWeight(index:number,value:number){selectedCriterion.value=index;weights.value[index]=value;works?.setWeights(weights.value,index);needsRender=true;}
function resetMatrix(){weights.value=[...initialWeights];selectedCriterion.value=0;works?.setWeights(weights.value,0);needsRender=true;}
function selectCriterion(index:number){selectedCriterion.value=index;works?.setWeights(weights.value,index);needsRender=true;}
function closeWorks(){worksUI.value=null;look?.setEnabled(!portalBusy.value&&radio.state.mode!=='expanded');nextTick(()=>{if(failed.value||textMode.value)document.querySelector<HTMLButtonElement>('[data-action=works-shortcut]')?.focus();else renderer?.domElement.focus();});}
function worksMenu(){if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;if(camera?.position.y>7)return;if(portalBusy.value||guided)return;if(radioOpen.value)closeRadio();releaseDockPointer();look?.stop();look?.setEnabled(false);worksUI.value=worksUI.value==='destinations'?null:'destinations';if(!worksUI.value)closeWorks();}
function goWorks(id:string){if(flight?.equipped)return;if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;if(camera?.position.y>7)return;
 if(threshold?.active&&camera){threshold.returnToHall(camera);const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);}
 if(portalBusy.value||guided)return;
 worksUI.value=null;if(radioOpen.value)closeRadio();controlsOpen.value=false;
 if(id==='flowforge'){approachTerminal();return;}
 if(failed.value||textMode.value||!camera){if(id==='arrival'){state.value='arrival';closeWorks();return;}state.value='secondary';if(id==='archive'){activateProjectScreen('archive');return;}worksUI.value=id==='matrix'?'matrix':'destinations';return;}
 releaseDockPointer();look.stop();look.setEnabled(false);journey.cancel();
 pendingWorks=id;worksTrip.value=id;guided=true;
 const room=[...expansionSpaces,...lagoonSpaces].find(s=>s.id===id);
 const to=room?new T.Vector3(...room.anchor):id==='sky-explorer'?flightStation.clone():id==='arrival'?spawn:id==='gallery'?worksArrival:new T.Vector3(...worksModules.find(m=>m.id===id)!.destination);
 if(camera.position.distanceTo(to)<1&&(id==='matrix'||id==='archive')){pendingWorks='';worksTrip.value='';guided=false;if(id==='archive')activateProjectScreen('archive');else worksUI.value='matrix';needsRender=true;return;}
 if((camera.position.z<-72)!==(to.z<-72)&&mechanism.state!=='open'){mechanism.activate(performance.now());return;}
 startWorks(id,to);
}
function startWorks(id:string,to:T.Vector3){
 pendingWorks='';guided=true;
 const room=[...expansionSpaces,...lagoonSpaces].find(s=>s.id===id);
 const aim=room?new T.Vector3(...room.lookAt):id==='sky-explorer'?new T.Vector3(-8,2,89.8):id==='arrival'?new T.Vector3(0,4,-65):id==='gallery'?new T.Vector3(32,5,-101):new T.Vector3(...worksModules.find(m=>m.id===id)!.lookAt);
 const target=camera.clone();target.position.copy(to);target.lookAt(aim);
 travel={path:worldPath(camera.position,to),from:camera.quaternion.clone(),to:target.quaternion.clone(),start:performance.now(),duration:reduced.value?0:Math.min(6500,Math.max(1600,camera.position.distanceTo(to)*65)),exiting:false};
}
function cancelWorks(){pendingWorks='';worksTrip.value='';travel=undefined;guided=false;if(camera){const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);}closeWorks();}


const radio = new YouTubeRadio();
const radioOpen=computed(()=>radio.state.mode==='expanded'), gameDock=ref<HTMLElement>();
const ac=computed(()=>audioCopy[locale.value as keyof typeof audioCopy]||audioCopy.en);
let receiver:ReturnType<typeof createReceiver>|undefined, radioTravel=false;
function closeRadio(){radio.setMode('mini');look?.setEnabled(!portalBusy.value&&!guided&&!worksUI.value&&!worksTrip.value);if(!portalBusy.value&&!worksUI.value)nextTick(()=>renderer?.domElement.focus());}
function approachRadio(){if(flight?.equipped)return;if(secrets?.busy){radioShortcut();return;}if(skytube?.ownsPassenger){radioShortcut();return;}if(camera?.position.y>7)return;
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
function activateProjectScreen(kind:'matrix'|'archive') {if(flight?.equipped)return;if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;
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
function activateTerminal(direct=false,keepScreen=false) {if(flight?.equipped)return;if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;
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
function approachTerminal() {if(flight?.equipped)return;if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;if(camera?.position.y>7)return;
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
const pickHits:T.Intersection[]=[];
const cleanups: (() => void)[] = [];

function pick(x: number, y: number, center = false) {
  if(flight?.equipped){actionable.value=false;return false;}
  if(flight&&flightPermitted()&&camera.position.distanceTo(flightStation)<4){actionable.value=true;return 'sky-explorer';}
  if(skyfallBusy.value){actionable.value=false;return false;}
  if (!renderer || failed.value || textMode.value || portalBusy.value || guided) return false;
  if(secrets?.ownsMotion){actionable.value=secrets.ownsPassenger&&secrets.whalePhase==='landed';return actionable.value?'secret:ride':false;}
  if(coaster?.ownsPassenger){actionable.value=coaster.phase==='docked';return actionable.value?'coaster':false;}
  if(skytube?.ownsPassenger){actionable.value=skytube.phase==='docked';return actionable.value?'skytube:exit':false;}
  diagnostics?.enter('interaction');
  try {
  if(arrivalMetrics.enabled)arrivalMetrics.picks++;
  const rect = renderer.domElement.getBoundingClientRect();
  if (!center && (x < rect.left || y < rect.top || x > rect.right || y > rect.bottom)) return false;
  pointer.set(center ? 0 : (x - rect.left) / rect.width * 2 - 1, center ? 0 : -(y - rect.top) / rect.height * 2 + 1);
  ray.setFromCamera(pointer, camera);
  const secretHit=secrets?.pick(ray);
  pickHits.length=0;
  const first = secrets?.active?undefined:ray.intersectObjects(threshold?.active?remotePickSolids:hallPickSolids, false,pickHits).find(hit=>{let node:T.Object3D|null=hit.object;while(node){if(!node.visible)return false;node=node.parent;}return true;});
  if(secretHit&&(!first||secretHit.distance<first.distance)){const action=String(secretHit.object.userData.secret);actionable.value=secretHit.distance<6&&!!secrets?.canActivate(action,camera.position);return 'secret:'+action;}
  const data = first?.object.userData;
  if(data?.creationYard){actionable.value=first!.distance<6;return 'creation-yard';}
  if(data?.printLab){actionable.value=first!.distance<6;return 'print-lab';}
  if(data?.coaster){actionable.value=!!coaster?.canBoard(camera.position);return 'coaster';}
  const entry=interactables?.entries.find(e=>e.mesh===first?.object);
  actionable.value=!!entry&&first!.distance<=entry.range&&(!data?.skytube||!!skytube?.canActivate(data.skytube,camera.position)) && !(entry.id==='passage'&&mechanism.state!=='open') && !(['activated','propagating','opening','closing'].includes(mechanism.state)&&(entry.id==='key'||entry.id==='facet'));
  if(!entry)return false;
  if(data?.entity)return 'entity:'+data.entity;

  if(data?.npc)return 'npc:'+data.npc;
  if(data?.skytube)return 'skytube:'+data.skytube;
  if(data?.explorer)return 'explorer:'+data.explorer;
  if(data?.loopDoor)return 'loop:'+data.loopDoor;
  if(data?.originDoor)return 'origin-door';
  if(data?.threshold){pickedSunDoor=!!data.sunDoor;return 'threshold';}
  if(data?.works)return 'works:'+data.works+(data.criterion!==undefined?':'+data.criterion:'');
  if(data?.radio)return 'radio';
  if(data?.atmosphere!==undefined)return 'atmosphere:'+data.atmosphere;
  if(data?.sculpture){pickedRing=data.ringIndex;return 'sculpture';}
  if(data?.terminal) {hoveredFacet=-1;return 'terminal';}
  hoveredFacet = data?.facet ?? (data?.key ? 0 : -1);
  return data?.key ? 'key' : data?.facet !== undefined ? 'facet' : data?.passage && mechanism.state === 'open' ? 'passage' : false;
  } finally { diagnostics?.leave(); }
}
function activateWorld(x:number,y:number,center:boolean,direct=false) {if(flight?.equipped){flightAction();return;}if(flight&&flightPermitted()&&camera.position.distanceTo(flightStation)<4){flightAction();return;}if(skyfallBusy.value)return;if(buildOpen.value&&builder){builder.activate(camera,document.pointerLockElement===renderer.domElement?0:buildPointer.x,document.pointerLockElement===renderer.domElement?0:buildPointer.y);buildRevision.value++;needsRender=true;return;}if(secrets?.ownsMotion){if(freeInput.value&&secrets.ownsPassenger)secrets.activate('ride',camera);return;}if(coaster?.ownsPassenger){if(freeInput.value)coaster.activate(camera);return;}if(skytube?.ownsPassenger){if(freeInput.value)skytube.activate('exit',camera,reduced.value);return;} if(portalBusy.value||guided)return;
 let hit=pick(x,y,center);
        if(!center&&touchMode.value&&!hit){for(const [dx,dy] of [[-10,0],[10,0],[0,-10],[0,10]]){hit=pick(x+dx!,y+dy!,false);if(hit&&actionable.value)break;}}
        if (!hit || !freeInput.value) return;
        const intent=interactionIntent(hit,actionable.value,direct);
        if(intent==='none')return;
        if(hit.startsWith('secret:')){if(actionable.value&&secrets?.activate(hit.slice(7),camera)){jumping?.reset();journey.cancel();look.stop();needsRender=true;}return;}
        if(hit==='creation-yard'){if(actionable.value)openBuilder();return;}
        if(hit==='print-lab'){if(actionable.value)openPrintLab();return;}
        if(hit==='coaster'){if(actionable.value&&coaster?.activate(camera)){jumping?.reset();journey.cancel();look.stop();look.restore(0,0);needsRender=true;}return;}
        if(hit.startsWith('skytube:')){if(actionable.value&&skytube?.activate(hit.slice(8),camera,reduced.value)){jumping?.reset();journey.cancel();look.stop();needsRender=true;}return;}
        if(hit.startsWith('entity:')){if(actionable.value)openEncounter(hit.slice(7) as EntityId);return;}
        if(hit.startsWith('npc:')){if(actionable.value)openEncounter(hit.slice(4) as EntityId);return;}
        if(hit.startsWith('explorer:')){if(actionable.value){explorer?.activate(hit.slice(9),performance.now());needsRender=true;}return;}
        if(typeof hit==='string'&&hit.startsWith('loop:')){if(actionable.value){district?.activate(hit.slice(5));needsRender=true;}return;}
        if(hit==='origin-door'){if(actionable.value){origin?.activate();needsRender=true;}return;}
        if(hit==='threshold'){if(actionable.value){threshold?.activate(pickedSunDoor);needsRender=true;}return;}
        if(hit.startsWith('atmosphere:')){if(actionable.value){atmosphere?.activate(Number(hit.split(':')[1]));needsRender=true;}return;}
        if(hit==='works:openme'||hit.startsWith('works:openme-endpoint-')){if(actionable.value)openMeRoom(hit==='works:openme'?0:Number(hit.split('-').at(-1)),hit!=='works:openme');return;}
        if(hit==='sculpture'){if(actionable.value){sculpture?.activate(performance.now(),pickedRing);needsRender=true;}return;}
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
function enter() {if(flight?.equipped)return;if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;
  if(camera?.position.y>7)return;
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
function back() {if(flight?.equipped)return;if(skyfallBusy.value){cancelSkyfall();return;}if(secrets?.active){if(secrets.returnHome(camera)){jumping?.reset();look?.stop();}return;}if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;
  if(camera?.position.y>7)return;
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
const pointerLocked=ref(false);
onMounted(()=>{const sync=()=>{pointerLocked.value=!!document.pointerLockElement;if(buildOpen.value){if(pointerLocked.value)buildPointer.x=buildPointer.y=0;refreshBuild();buildRevision.value++;}};document.addEventListener('pointerlockchange',sync);cleanups.push(()=>document.removeEventListener('pointerlockchange',sync));});
function dragLook(){look?.unlock();pointerLocked.value=false;}
async function mouseLook() { if(worksUI.value)closeWorks(); if(radioOpen.value)closeRadio(); if(portalBusy.value||guided)return; resumeLook.value=false; controlsOpen.value = false; mouseUnavailable.value = !(await look?.lock());pointerLocked.value=!mouseUnavailable.value; }
function applyReduced(value: boolean) { reduced.value = value; journey?.setReduced(value); }
function onMotion(event: MediaQueryListEvent) { applyReduced(event.matches); }
function failure() { clearTimeout(exitTimer);pendingWorks='';worksTrip.value='';guided=false;travel=undefined;if(portalBusy.value) {workspace.value=true;portalState.value='workspace-active';} failed.value = true; cancelAnimationFrame(frame); }
function showText() {if(flight?.equipped)return;if(skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.busy)return;
  if(radioOpen.value)closeRadio();
  if(portalBusy.value||guided)return;
  if(camera?.position.y<7)journey?.reset();
  textMode.value = !textMode.value;
  if (textMode.value) { if (document.pointerLockElement) document.exitPointerLock(); cancelAnimationFrame(frame); }
  else if (!failed.value) { diagnostics?.reset();lastTime = performance.now(); animate(lastTime); }
}
function animate(now: number) {
  if (failed.value || textMode.value || document.hidden) return;
  diagnostics?.beginFrame(now);
  frame = requestAnimationFrame(animate);
  const rawDt=Math.max(0,(now-lastTime)/1000),dt=Math.min(rawDt,.2);lastTime=now;
  if(mapOpen.value){mapPosition.value={x:camera.position.x,z:camera.position.z};mapEnvironment.value=threshold?.active?threshold.environment:district?.active?'vault':district?.contains(camera.position)?'loop':'hall';}
  diagnostics?.phase('movement');
  const movementStart=movementScratch.copy(camera.position);
  if(activeEntity.value)look.update(dt,reduced.value);
  if(!printOpen.value && !mapOpen.value && !controlsOpen.value && !portalBusy.value && !guided && !worksUI.value && !worksTrip.value && radio.state.mode!=='expanded' && !activeEntity.value) {
  if(skytube?.ownsPassenger&&!transitPassenger.value)look.stop();
  look.update(dt, reduced.value);
  const movement = look.movement(dt,!!jumping?.airborne);
  const owner=motionOwner({otherWorld:!!threshold?.active||!!secrets?.active||!!district?.active,passenger:!!skytube?.ownsPassenger||!!coaster?.ownsPassenger||!!secrets?.ownsMotion,guided:guided||journey.moving,ui:!freeInput.value&&!buildOpen.value,water:inExpansion(camera.position.x,camera.position.z)&&['surface','underwater'].includes(waterState(camera.position))});
  if(owner!=='swimming')swimming.reset();
  if (movement.active && journey.moving) journey.cancel();
  if(flight?.equipped&&!swimmingActive.value&&!flight.airborne&&look.flightIntent().vertical>0)flight.takeoff();
  if(flight?.airborne){scene.updateMatrixWorld();jumping?.reset();swimming.reset();flight.update(dt,camera.position,look.flightIntent(),freeInput.value);needsRender=true;journey.locate();}
  else if(sculpture?.ownsMotion||skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.ownsMotion) { /* capsule owns position; the existing look controller stays active */ }
  else if(secrets?.active)secrets.move(camera.position,movement.delta);
  else if (journey.moving) journey.update(now, dt);
  else if(owner==='swimming'){jumping?.reset();swimming.update(dt,camera.position,movement.delta,look.swimAxis());}
  else if(!threshold?.active&&inExpansion(camera.position.x,camera.position.z)){
    const old=oldPositionScratch.copy(camera.position);const wasTunnel=inTunnel(old.x,old.y,old.z);
    collide(camera.position,movement.delta);
    if(!inExpansion(camera.position.x,camera.position.z)&&!onExpansionApproach(camera.position.x,camera.position.z)){camera.position.copy(old);}
    // Dry passage walls are analytical, so they cannot disappear from collision broad phase.
    if(wasTunnel&&old.z>32&&old.z<98&&Math.abs(camera.position.x+180)>2.05)camera.position.x=old.x;
    const constructionFloor=camera.position.z>=112?(builder?.constrain(old,camera.position)||0):0;
    const dry=wasTunnel||inTunnel(camera.position.x,old.y,camera.position.z);
    const floor=(dry?tunnelFloor(camera.position.z):Math.max(constructionFloor,expansionGround(camera.position.x,camera.position.z)))+1.65;
    camera.position.y=!dry&&inBasin(camera.position.x,camera.position.z)&&floor<-.35?Math.max(old.y,floor):floor;
    journey.locate();
  }
  else if(!threshold?.active&&district?.contains(camera.position)){scene.updateMatrixWorld();district.move(camera.position,movement.delta);journey.locate();}
  else if(camera.position.y>7&&!threshold?.active){
    const old=oldPositionScratch.copy(camera.position);collide(camera.position,movement.delta);
    const height=accessHeight(camera.position.x,camera.position.z,old.y-(jumping?.offset||0));
    if(height===undefined)camera.position.copy(old);else camera.position.y=height+ascent.eye;
  }else { scene.updateMatrixWorld(); threshold!.move(camera.position, movement.delta,collide); journey.locate(); if(!threshold?.active&&(inStairHall(camera.position)||inStairHall(movementStart))){const h=accessHeight(camera.position.x,camera.position.z,movementStart.y-(jumping?.offset||0));if(h===undefined)camera.position.copy(movementStart);else camera.position.y=h+ascent.eye;} }
  }
  if(!flight?.equipped&&!sculpture?.ownsMotion&&!secrets?.busy&&!coaster?.ownsPassenger&&!skytube?.ownsPassenger&&!journey.moving&&!guided&&movementStart.distanceToSquared(camera.position)>1e-10)skytube?.constrain(movementStart,camera.position);
  if(flight){flightPhase.value=flight.phase;flightSpeed.value=Math.round(flight.speed);flightAltitude.value=Math.round(camera.position.y-1.65);mapPosition.value={x:camera.position.x,z:camera.position.z};flightUnsafe.value=flight.unsafe;flightScene?.update(flight.equipped,flight.airborne,flight.speed);if(!freeInput.value)flight.pause();}
  diagnostics?.phase('world');
  const transitUpdate=skytube?.update(rawDt,reduced.value,camera,!!threshold?.active||!!district?.active);
  if(transitUpdate?.turn)look.rotateFrame(transitUpdate.turn);
  if(transitUpdate?.changed)needsRender=true;
  if(skytube){if(transitPassenger.value!==skytube.ownsPassenger)look.stop();transitPassenger.value=skytube.ownsPassenger;transitPhase.value=skytube.phase;transitDestination.value=skytube.destination;}
  const coasterUpdate=coaster?.update(rawDt,reduced.value,camera,coasterLook.setFromEuler(coasterEuler.set(look.pitch,look.yaw,0,'YXZ')));
  if(coasterUpdate?.turn)look.rotateFrame(coasterUpdate.turn);
  if(coasterUpdate?.changed)needsRender=true;
  if(coasterPassenger.value!==!!coaster?.ownsPassenger){coasterPassenger.value=!!coaster?.ownsPassenger;look.stop();if(!coasterPassenger.value){const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);}jumping?.reset();}
  if(sculpture?.update(now,dt,reduced.value,camera,!flight?.equipped&&freeInput.value&&!guided&&!journey.moving&&!skytube?.ownsPassenger&&!coaster?.ownsPassenger&&!secrets?.busy&&!threshold?.active&&!district?.active))needsRender=true;
  if(sculpture){const was=skyfallBusy.value;const previous=ringPhase.value;skyfallBusy.value=sculpture.ownsMotion;ringPhase.value=sculpture.sequence.phase;ringCount.value=sculpture.sequence.count;ringNearby.value=!threshold?.active&&!district?.active&&!secrets?.active&&Math.hypot(camera.position.x+49,camera.position.z)<14;if(was!==skyfallBusy.value||previous!==ringPhase.value&&ringPhase.value==='reveal'){look.stop();jumping?.reset();const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);if(!skyfallBusy.value)journey.locate();}}
  if(!secrets?.active&&origin?.update(dt,reduced.value,camera.position,!threshold?.active,(!!skytube?.ownsPassenger||!!coaster?.ownsPassenger)||spaceAt(camera.position)?.id==='origin'||(!!district?.contains(camera.position)&&!district.active),journey.moving||guided,(!!skytube?.ownsPassenger||!!coaster?.ownsPassenger)||camera.position.y>7||!!district?.contains(camera.position),!!flight?.equipped||!!sculpture?.ownsMotion||inStairHall(camera.position)||inExpansion(camera.position.x,camera.position.z))){needsRender=true;renderer.shadowMap.needsUpdate=true;}
  diagnostics?.enter('movement');
  if(!flight?.equipped&&!sculpture?.ownsMotion&&jumping&&!(inExpansion(camera.position.x,camera.position.z)&&['surface','underwater'].includes(waterState(camera.position)))&&freeInput.value&&!guided&&!journey.moving&&!skytube?.ownsPassenger&&!coaster?.ownsPassenger&&!secrets?.ownsMotion){
    const floorEye=camera.position.y;
    camera.position.y=movementStart.y;
    jumping.update(dt,camera.position,floorEye,true);
    if(jumping.airborne)needsRender=true;
  }else if(journey.moving||guided)jumping?.reset();
  diagnostics?.leave();
  if(!threshold?.active&&spaceAt(camera.position)?.id==='origin'&&!reduced.value)needsRender=true;
  if(!flight?.equipped&&!sculpture?.ownsMotion&&!secrets?.busy&&!coaster?.ownsPassenger&&!skytube?.ownsPassenger&&!jumping?.airborne&&!threshold?.active&&district?.update(dt,reduced.value,camera)){const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);needsRender=true;renderer.shadowMap.needsUpdate=true;}
  const wasExterior=threshold?.active;
  if(!flight?.equipped&&!sculpture?.ownsMotion&&!secrets?.busy&&threshold?.update(dt,reduced.value,camera)){
    if(threshold.active!==wasExterior){const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x,Math.PI);}
    needsRender=true;renderer.shadowMap.needsUpdate=true;
  }
  if(pendingWorks&&['dormant','discovered'].includes(mechanism.state))mechanism.activate(now);
  if(pendingWorks&&mechanism.state==='open'){const id=pendingWorks,room=[...expansionSpaces,...lagoonSpaces].find(s=>s.id===id);startWorks(id,room?new T.Vector3(...room.anchor):id==='sky-explorer'?flightStation.clone():id==='arrival'?spawn:id==='gallery'?worksArrival:new T.Vector3(...worksModules.find(m=>m.id===id)!.destination));}
  if(radio.state.mode!=='expanded')updatePortal(now);
  diagnostics?.phase('npc');
  family?.converse(activeEntity.value,encounter.phase.value);
  if(intelligence?.update(now,dt,reduced.value,camera.position,activeEntity.value,encounter.phase.value))needsRender=true;
  if(family?.root.visible&&family.people.some(p=>Math.abs(p.person.position.x-12)<3&&p.person.position.z>18&&p.person.position.z<38))origin?.welcome();
  if(family?.update(now,dt,reduced.value,camera.position,!threshold?.active&&!district?.active))needsRender=true;
  if(workWing?.update(dt,camera.position,reduced.value,family?.root.visible?family.people.map(p=>p.person.position):[]))needsRender=true;
  if(explorer?.update(now,dt,reduced.value,camera.position,candidate.value))needsRender=true;
  diagnostics?.phase('world');
  const aquatic= !flight?.equipped&&!threshold?.active&&!district?.active&&!secrets?.active&&inExpansion(camera.position.x,camera.position.z)&&['surface','underwater'].includes(waterState(camera.position));
  if(swimmingActive.value!==aquatic){swimmingActive.value=aquatic;look.setSwimming(aquatic);jumping?.reset();}
  if((!freeInput.value&&!buildOpen.value)||guided||journey.moving||skytube?.ownsPassenger||coaster?.ownsPassenger||secrets?.ownsMotion||threshold?.active||district?.active)swimming.reset();
  if(buildOpen.value&&builder){if(!builderSessionActive({guided,passenger:!!skytube?.ownsPassenger||!!coaster?.ownsPassenger||!!secrets?.ownsMotion,otherWorld:!!threshold?.active||!!district?.active}))closeBuilder();else {const valid=builder.valid;refreshBuild();if(valid!==builder.valid)buildRevision.value++;needsRender=true;}}
  if(lagoonWorld?.update(dt,reduced.value,camera))needsRender=true;
  if(atmosphere?.update(now,dt,reduced.value,camera.position))needsRender=true;
  if(printProgress.value!==null){printElapsed+=dt;printProgress.value=Math.min(1,printElapsed/6);printLab?.update(printProgress.value,reduced.value);needsRender=true;if(printProgress.value>=1){printCollection.value.push({...printDesign.value});printLab?.setCollection(printCollection.value);printLab?.finish();printProgress.value=null;printNotice.value='Print complete! Your creation is on the display wall.';savePrintLab();renderer.shadowMap.needsUpdate=true;}}
  if(livingQuarters?.update(dt,reduced.value))needsRender=true;
  if(works?.projectGallery.update(dt,reduced.value)){needsRender=true;}
  openMeReceived.value=works?.projectGallery.received??false;openMeRouting.value=works?.projectGallery.routing??false;
  if(works?.update(dt,reduced.value)){needsRender=true;renderer.shadowMap.needsUpdate=true;}
  if(now>nextTelemetry && !portalBusy.value && !guided && document.pointerLockElement===renderer.domElement) terminalHover=pick(0,0,true)==='terminal';
  if(terminal){const distance=camera.position.distanceTo(terminal.center);portalNear.value=distance<9;terminal.update(distance,terminalHover||portalState.value==='entering');if(!portalBusy.value&&!guided)portalState.value=portalNear.value&&terminalHover?'terminal-focused':'exploring';}
  if (!worksTrip.value && camera.position.distanceTo(spawn) < 3 && mechanism.state === 'open') mechanism.close(now);
  mechanism.focus(focus.value ? 0 : candidate.value==='key'?0:hoveredFacet); mechanism.update(now,reduced.value);
  if(interactables?.update(now,candidate.value,actionable.value,!freeInput.value,reduced.value))needsRender=true;
  lighting.portal.intensity = T.MathUtils.damp(lighting.portal.intensity, pointerHover || focus.value ? 80 : 40, 7, dt);
  if(portalState.value==='entering'||portalState.value==='exiting'||guided)needsRender=true;
  secrets?.setExteriorVisible(!threshold?.active&&!district?.active);
  const secretUpdate=secrets?.update(dt,reduced.value,camera,document.hidden||!freeInput.value||!!threshold?.active||!!district?.active);
  if(secretUpdate?.turn)look.rotateFrame(secretUpdate.turn);
  if(secretUpdate?.restored){const e=new T.Euler().setFromQuaternion(camera.quaternion,'YXZ');look.restore(e.y,e.x);jumping?.reset();}
  if(secretUpdate?.changed)needsRender=true;
  if(secretPassenger.value!==!!secrets?.ownsPassenger){secretPassenger.value=!!secrets?.ownsPassenger;look.stop();jumping?.reset();}
  secretBusy.value=!!secrets?.busy;
  receiver?.update(locale.value,dark.value);
  diagnostics?.phase('other');
  const view = [locale.value,radio.state.station,radio.state.status,radio.title,camera.position.x,camera.position.y,camera.position.z,look.yaw,look.pitch,mechanism.opening,lighting.portal.intensity,Number(terminalHover),Number(portalNear.value),architecture.wall.key.position.z,...architecture.wall.signals.map(m=>m.emissiveIntensity),...architecture.wall.panels.map(p=>p.position.z)].map(v=>typeof v==='number'?v.toFixed(5):v).join(',');
  if (Math.abs(mechanism.opening - previousOpening) > .025) { renderer.shadowMap.needsUpdate = true; previousOpening = mechanism.opening; }
  diagnostics?.phase('world');
  if (needsRender || (portalState.value!=='workspace-active' && view !== previousView)) { if(!secrets?.active){threshold?.renderViews(renderer,camera);if(!threshold?.active)district?.renderViews(renderer,camera);}renderer.render(scene, camera); needsRender = false; previousView = view; }
  diagnostics?.phase('other');
  if (now > nextTelemetry) {
    nextTelemetry = now + 100;
    inputReady.value=!guided&&!journey.moving&&!portalBusy.value;
    if(freeInput.value){candidate.value=pick(0,0,true);}else{candidate.value=false;actionable.value=false;}
    renderer.domElement.dataset.interaction=String(candidate.value||'');renderer.domElement.dataset.actionable=String(actionable.value); wallState.value=mechanism.state;
    const canvas = renderer.domElement;
    canvas.dataset.access=camera.position.y>2?'stair-or-roof':'ground';canvas.dataset.rooftop=String(camera.position.y>7);canvas.dataset.explorerVisited=explorer?.visited.join(',')||'';canvas.dataset.originDoor=origin?.opened?'open':'closed';canvas.dataset.environment=threshold?.active?threshold.environment:district?.active?'loop-vault':district?.contains(camera.position)?'loop-district':spaceAt(camera.position)?.id==='origin'?'origin':'hall';canvas.dataset.threshold=threshold?.state||'closed';canvas.dataset.room=threshold?.active?threshold.environment:spaceAt(camera.position)?.id||'';canvas.dataset.works=worksUI.value||worksTrip.value||(camera.position.x>15&&camera.position.z<-72?'gallery':'');canvas.dataset.portal=portalState.value;canvas.dataset.guided=String(guided);canvas.dataset.ready = 'true'; canvas.dataset.state = journey.state;
    canvas.dataset.transit=skytube?.phase||'docked';canvas.dataset.transitPassenger=String(!!skytube?.ownsPassenger);canvas.dataset.transitStation=skytube?.station||'origin';canvas.dataset.transitProgress=skytube?.progress.toFixed(5)||'0';canvas.dataset.transitDoor=skytube?.doorProgress.toFixed(3)||'0';
    canvas.dataset.position = camera.position.toArray().map(n => n.toFixed(4)).join(',');
    canvas.dataset.look = [look.yaw, look.pitch].map(n => n.toFixed(4)).join(',');
    canvas.dataset.wall = mechanism.state; canvas.dataset.opening = mechanism.opening.toFixed(4); canvas.dataset.triangles = String(renderer.info.render.triangles);
  }
  diagnostics?.endFrame(now,secrets?.active?'secret':threshold?.active?threshold.environment:district?.active?'loop-vault':district?.contains(camera.position)?'loop-district':spaceAt(camera.position)?.id||'hall',family?.assetStatus.state);
}
function applyTheme() {
  if (!architecture || !lighting) return;
  lagoonWorld?.setTheme(dark.value);livingQuarters?.setTheme(dark.value);workWing?.setTheme(dark.value);rooftop?.setTheme(dark.value);explorer?.setTheme(dark.value);architecture.setTheme(dark.value); lighting.setTheme(dark.value);works?.setTheme(dark.value);expansion?.setTheme(dark.value);atmosphere?.setTheme(dark.value);threshold?.setTheme(dark.value);origin?.setTheme(dark.value);district?.setTheme(dark.value);coaster?.setTheme(dark.value);skytube?.setTheme(dark.value);
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
watch(flightText,value=>{flightScene?.setLocale(value.name);if(wayfinding){wayfinding.dispose();wayfinding=createWayfinding(scene,locale.value);needsRender=true;}});
watch([freeInput,buildOpen,skyfallBusy],([value,building,falling])=>{look?.setEnabled(value||building||falling);if(!value){candidate.value=false;actionable.value=false;}},{flush:'sync'});
watch(dark, applyTheme);
watch(locale,value=>{lagoonWorld?.setLocale(value);skytube?.setLocale(value);explorer?.setLocale(value);atmosphere?.setLocale(value);expansion?.setLocale(value);works?.setLocale(value);needsRender=true;});
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
    camera = new T.PerspectiveCamera(innerWidth < 650 ? 72 : 65, 1, .08, 4000); camera.position.copy(spawn);
    architecture = buildEnvironment(scene);lagoonWorld=createLagoon(scene,architecture.solids);lagoonWorld.setLocale(locale.value);builder=createCreationYard(scene); printLab=createPrintLab(scene,architecture.solids);try{const stored=readPrints(localStorage.getItem(storageKey));printDesign.value=stored.selected;printCollection.value=stored.collection.slice(0,12);}catch{}printLab.setCollection(printCollection.value); receiver=createReceiver(scene,architecture.solids,radio); expansion=createExpansion(scene,architecture.solids);expansion.setLocale(locale.value);atmosphere=createAtmosphere(scene,architecture.solids);atmosphere.setLocale(locale.value);sculpture=createOrbitalSculpture(scene,architecture.solids);hallGallery=createHallGallery(scene,architecture.solids,()=>{needsRender=true;});works=createWorks(scene,architecture.solids);works.setLocale(locale.value);mechanism=createMechanism(architecture.wall); lighting = illuminate(scene); terminal=createTerminal(scene,architecture.solids);origin=createOrigin(scene,architecture.solids);rooftop=createAscent(scene,architecture.solids);district=createLoopDistrict(scene,architecture.solids);skytube=createSkyNetwork(scene,architecture.solids);coaster=createSkyCoaster(scene,architecture.solids);lagoonWorld.registerSupports(coaster.root);swimming.setObstacles(lagoonWorld.supportBounds);skytube.setLocale(locale.value);explorer=createLittleExplorer(scene,architecture.solids);explorer.setLocale(locale.value);livingQuarters=createLivingQuarters(scene,architecture.solids);intelligence=createIntelligence(scene,architecture.solids);workWing=createWorkWing(scene,architecture.solids);family=createFamily(scene,architecture.solids);wayfinding=createWayfinding(scene,locale.value);threshold=createImpossibleThreshold(scene,architecture.solids);secrets=createTwoSecrets(scene,architecture.solids);interactables=createInteractables(architecture.solids);scene.updateMatrixWorld(true);
    flightScene=createFlightScene(scene,camera);flightScene.setLocale(flightText.value.name);
    const aerialBodies=[...architecture.solids];coaster.root.traverse(o=>{if(o instanceof T.Mesh&&o.geometry.type!=='TubeGeometry'&&!aerialBodies.includes(o))aerialBodies.push(o);});
    const aerial=createFlightCollision(aerialBodies,(x,z)=>{
      // Handoff uses the same terrain/roof heights as walking, with footprint and headroom validation below.
      const roof=roofHeight(x,z);if(roof!==undefined)return roof;
      if(inExpansion(x,z)&&!inBasin(x,z))return expansionGround(x,z);
      let inside=false;for(let i=0,j=originBoundary.length-1;i<originBoundary.length;j=i++){
        const a=originBoundary[i]!,b=originBoundary[j]!;
        if((a[1]>z)!==(b[1]>z)&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
      }
      return inside?originHeight(x,z):undefined;
    });
    // Occupied ride corridors are conservative segmented volumes, never a single enormous route box.
    for(const [route,radius] of [[coaster.route,2],[skytube.transport.route,3.8],[skytube.scenic.route,3.8]] as const){if(route)aerial.addRoute(route,radius);}
    flight=createFlight(aerial.move,aerial.support);
    jumping=createJump(architecture.solids); remotePickSolids=threshold.worldSolids;const remoteSolids=new Set(remotePickSolids);hallPickSolids=architecture.solids.filter(m=>!remoteSolids.has(m)); collide = createCollision(hallPickSolids,'player-hall'); applyTheme();
    if (innerWidth < 650) lighting.sun.shadow.mapSize.set(1024, 1024);
    journey = createJourney(camera, architecture, next => { state.value = next; if (next === 'arrival' && camera.position.distanceTo(spawn) < .1) { mechanism.close(performance.now()); } });
    journey.setReduced(reduced.value);
    look = createLook(camera, canvas, {
      activate: activateWorld,
      jump: requestJump,
      lockChanged(locked){pointerLocked.value=locked;flight?.pause();},
      cancelMotion(){if(!skyfallBusy.value)return false;cancelSkyfall();return true;},
      target(x,y,center){if(buildOpen.value){updateBuildPointer(x,y,center);refreshBuild();buildRevision.value++;needsRender=true;}},
      hover(x, y, center) { if(buildOpen.value)return;const hit=pick(x,y,center); terminalHover=hit==='terminal';pointerHover = !!hit;needsRender=true; canvas.style.cursor = pointerHover ? 'pointer' : 'grab'; },
      manual() { if(portalBusy.value||guided)return; if (journey.moving) journey.cancel(); },
      escape() { if(skyfallBusy.value){cancelSkyfall();return;}if(buildOpen.value){cancelBuildAction();return;}if(worksTrip.value){cancelWorks();return;}if(worksUI.value){closeWorks();return;}if(radioOpen.value){closeRadio();return;} if(portalBusy.value||guided){closeWorkspace();return;} controlsOpen.value = false; look.stop(); if (journey.moving) journey.cancel(); },
    });
    if(import.meta.dev){
      const review={family,livingQuarters,collide,workWing,rooftop,camera,look,skytube,origin,district,threshold,scene,renderer};
      (window as any).__skyReview=review;
      cleanups.push(()=>{if((window as any).__skyReview===review)delete (window as any).__skyReview;});
    }
    let hiddenAt:number|undefined;
    const pauseTransit=()=>{flight?.pause();if(document.hidden)hiddenAt=performance.now();else if(hiddenAt!==undefined){if(travel)travel.start+=performance.now()-hiddenAt;hiddenAt=undefined;}journey?.setPaused(document.hidden||radio.state.mode==='expanded');skytube?.setPaused(document.hidden);coaster?.setPaused(document.hidden);cancelAnimationFrame(frame);lastTime=performance.now();diagnostics?.reset();if(!document.hidden&&!textMode.value&&!failed.value)animate(lastTime);};document.addEventListener('visibilitychange',pauseTransit);cleanups.push(()=>document.removeEventListener('visibilitychange',pauseTransit));
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
    const escapePortal=(e:KeyboardEvent)=>{if(e.repeat||e.defaultPrevented)return;if(e.key==='Escape'&&skyfallBusy.value){e.preventDefault();cancelSkyfall();return;}if(e.key==='Escape'&&buildOpen.value){e.preventDefault();if(pointerLocked.value){look?.unlock();return;}cancelBuildAction();return;}if(e.key==='Escape'&&printOpen.value){e.preventDefault();closePrintLab();return;}if(e.key==='Escape'&&mapOpen.value){e.preventDefault();closeMap();return;}if(e.key==='Escape'&&radioOpen.value){e.preventDefault();closeRadio();return;}if(e.key==='Escape'&&worksTrip.value){e.preventDefault();cancelWorks();return;}if(e.key==='Escape'&&worksUI.value){e.preventDefault();closeWorks();return;}if(e.key==='Escape'&&radioTravel){e.preventDefault();travel=undefined;guided=false;radioTravel=false;closeRadio();return;}if(e.key==='Escape'&&(portalBusy.value||guided)){e.preventDefault();closeWorkspace();}};
    window.addEventListener('keydown',escapePortal);cleanups.push(()=>window.removeEventListener('keydown',escapePortal));
    // Production instrumentation is restricted to an explicit query on local preview hosts.
    if((import.meta.dev||['localhost','127.0.0.1','[::1]'].includes(location.hostname))&&new URLSearchParams(location.search).has('arrivalPerf')){
      diagnostics=createArrivalDiagnostics(renderer);diagnostics.observeMatrices(scene);diagnostics.observeMatrices(district.root);
    }
    lastTime = performance.now(); animate(lastTime);
  } catch (error) { console.error('Arrival Chamber:', error); failure(); }
});
onBeforeUnmount(() => {
  flightScene?.dispose();diagnostics?.dispose();radio.dispose(); receiver?.dispose(); clearTimeout(exitTimer); cancelAnimationFrame(frame); observer?.disconnect(); look?.dispose(); for (const cleanup of cleanups) cleanup();
  builder?.dispose();lagoonWorld?.dispose();secrets?.dispose();printLab?.dispose();wayfinding?.dispose();intelligence?.dispose();livingQuarters?.dispose();family?.dispose();workWing?.dispose();coaster?.dispose();skytube?.dispose();district?.dispose();rooftop?.dispose();explorer?.dispose();interactables?.dispose();threshold?.dispose();origin?.dispose();atmosphere?.dispose();sculpture?.dispose();hallGallery?.dispose();expansion?.dispose();works?.dispose();terminal?.dispose(); architecture?.dispose(); lighting?.dispose(); renderer?.dispose(); renderer?.domElement.remove();
});
</script>
<template>
  <main class="arrival-world" :class="{ 'arrival-dark': dark, 'arrival-radio-active': radioOpen, 'arrival-player-active': radio.state.power, 'arrival-works-reading':worksUI==='matrix' }" :aria-label="c.name">
    <div v-show="!failed && !textMode" ref="host" :inert="printOpen || mapOpen || portalBusy || guided || !!worksUI || !!worksTrip || !!activeEntity" class="arrival-canvas"/>
    <span v-if="buildOpen && pointerLocked" class="portal-reticle" aria-hidden="true">+</span>
    <CreationYardPanel v-if="buildOpen" :locale="locale" v-bind="buildUI" @close="closeBuilder" @cancel="cancelBuildAction" @aim="mouseLook" @select="builderAction('select')" @choose="choosePiece" @color="chooseColor" @place="builderAction('place')" @rotate="builderAction('rotate')" @move="builderAction('move')" @remove="builderAction('remove')" @undo="builderAction('undo')" @reset="builderAction('reset')"/>
    <section v-if="flightEquipped" class="flight-status" role="status"><strong>{{flightText.name}} · {{flightText.states[flightPhase]}}</strong><p>{{flightAltitude}} m · {{flightSpeed}} m/s</p><p>{{flightText.controls}}</p><p v-if="flightUnsafe">{{flightText.unsafe}}</p><p v-if="flightNotice">{{flightNotice}}</p><button v-if="flightPhase==='equipped'" @click="requestJump();renderer.domElement.focus()">{{flightText.takeoff}}</button><button v-if="flightPhase==='equipped'" @click="flightAction">{{flightText.off}}</button><button @click="recoverFlight">{{flightText.recover}}</button><p>{{flightText.return}} · {{Math.round(Math.hypot(mapPosition.x-flightStation.x,mapPosition.z-flightStation.z))}} m · X −8 / Z 91</p></section>
    <div v-if="ringPhase==='launching'||ringPhase==='reveal'" class="skyfall-flash" :class="{'is-reveal':ringPhase==='reveal'}" aria-hidden="true"/>
    <section v-if="skyfallBusy || ringNearby && ringPhase!=='idle'" class="ring-status" role="status" aria-live="polite"><p>{{ringStatus}}</p><button v-if="skyfallBusy" @pointerdown.stop @click.stop="cancelSkyfall">{{ringText.rescue}}</button></section>
    <div v-if="swimmingActive && freeInput" class="lagoon-hint"><p>{{aquaticCopy.swim}}</p><button @click="recoverBeach">{{aquaticCopy.recover}}</button></div>
    <PrintLabPanel v-if="printOpen" :design="printDesign" :progress="printProgress" :count="printCollection.length" :notice="printNotice" @close="closePrintLab" @change="changePrintDesign" @print="startPrint"/>
    <IslandMap v-if="mapOpen" :position="mapPosition" :environment="mapEnvironment" @close="closeMap" @travel="id=>{closeMap();goWorks(id)}"/>
    <nav v-show="!portalBusy" ref="gameDock" :inert="skyfallBusy || buildOpen || printOpen || mapOpen || guided || !!activeEntity" class="arrival-tools" @focusin="releaseDockPointer" @pointerdown="releaseDockPointer" @keydown.stop :aria-label="c.controls">
      <button data-action="map" :aria-expanded="mapOpen" aria-label="Open island map" title="Island map" @click="toggleMap">Map</button>
      <button data-action="radio-shortcut" @keydown.stop :aria-label="ac.receiver" :title="ac.receiver" @click="radioShortcut">♫</button>
      <button data-action="works-shortcut" :disabled="transitPassenger" :aria-label="wc.go" :title="wc.go" :aria-expanded="!!worksUI" @click="worksMenu">⋈</button>
      <button data-action="portal-approach" :disabled="transitPassenger" :aria-label="portalNear?pc.activate:pc.approach" :title="portalNear?pc.activate:pc.approach" @click="approachTerminal">▣</button>
      <button :aria-label="themeLabel" :title="themeLabel" :aria-pressed="dark" data-action="theme" @click="colorMode.preference = dark ? 'light' : 'dark'">{{ dark ? '◐' : '◑' }}</button>
      <button class="arrival-mouse-mode" v-if="!touchMode" :aria-pressed="pointerLocked" :aria-label="resumeLook?pc.resume:c.mouse" :title="resumeLook?pc.resume:c.mouse" data-action="look" @click="mouseLook">{{ pointerLocked ? 'Pointer Lock · Esc' : 'Pointer Lock' }}</button>
      <button class="arrival-mouse-mode" v-if="!touchMode" :aria-pressed="!pointerLocked" title="Hold left mouse button and drag to look" @click="dragLook">Drag Look</button>
      <button :aria-label="c.back" :title="c.back" data-action="return" :disabled="transitPassenger" @click="back">↶</button>
      <button :aria-label="c.controls" :title="c.controls" :aria-expanded="controlsOpen" aria-controls="arrival-controls" @click="controlsOpen = !controlsOpen">?</button>
      <NuxtLink data-action="world-exit" :to="localePath('/')" :aria-label="$t('gateway.back')" :title="$t('gateway.back')">↗</NuxtLink>
    </nav>
    <section v-if="controlsOpen && !portalBusy" id="arrival-controls" class="arrival-controls" :aria-label="c.controls">
      <p><NuxtLink :to="localePath('/')">{{ $t('gateway.back') }}</NuxtLink> · <NuxtLink :to="localePath('/site-directory')">{{ $t('gateway.allPages') }}</NuxtLink></p>
      <p>{{ c.instructions }}</p>
      <p>{{ ic.atmosphereDescription }}</p>
      <button v-if="!failed && !textMode" @click="mouseLook">{{ c.mouse }}</button>
      <p class="arrival-fine">{{ c.release }}</p>
      <label><input v-model="reduced" type="checkbox">{{ c.reduce }}</label>
      <button :aria-pressed="textMode" @click="showText">{{ c.alternative }}</button>
    </section>
    <p v-if="mouseUnavailable" class="arrival-mouse-note" role="status">{{ c.unsupported }}</p>
    <nav v-show="!portalBusy" :inert="skyfallBusy||buildOpen||printOpen||mapOpen||guided||transitPassenger||secretBusy||!!activeEntity" class="arrival-access" :class="{ 'arrival-text': failed || textMode }" :aria-label="c.name">
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
    <p v-if="transitPassenger && transitPhase!=='docked'" class="arrival-context" role="status" aria-live="polite">{{ transitStatus }}</p>
    <p v-if="touchMode && transitPassenger" class="arrival-look-hint">{{ ic.look }}</p>
    <TouchControls v-if="touchVisible && !skyfallBusy" :label="ic.move" :help="ic.help" @move="mobileMove" :swimming="swimmingActive || flightEquipped" :up-label="flightEquipped?flightText.up:aquaticCopy.up" :down-label="flightEquipped?flightText.down:aquaticCopy.down" @vertical="look?.swimAnalog($event)" :jump-label="({de:'Springen',ru:'Прыжок'} as Record<string,string>)[locale]||'Jump'" @jump="requestJump"/>
<p v-if="touchVisible" class="arrival-look-hint">{{ ic.look }}</p>
    <button v-if="freeInput && candidate" class="arrival-context" :class="{'arrival-context-touch':touchMode}" :disabled="!actionable" @click="activateWorld(0,0,true)">{{ hint }}<kbd v-if="!touchMode && actionable">E</kbd></button>
    <span v-if="!portalBusy && portalNear" class="portal-reticle" aria-hidden="true">+</span>
    <div v-if="portalState==='entering'" class="portal-progress" role="status">{{ pc.entering }} <button @click="openWorkspace">{{ pc.skip }}</button></div>
    <p v-if="portalState==='exiting'" class="portal-progress" role="status">{{ pc.exiting }}</p>
    <WorksSurface v-if="worksUI && worksUI!=='openme' && !portalBusy" :spaces="expansionSpaces" :mode="worksUI" :locale="locale" :projects="projects" :weights="weights" :selected="selectedCriterion" @close="closeWorks" @travel="goWorks" @weight="changeWeight" @criterion="selectCriterion" @reset="resetMatrix" @details="activateProjectScreen('matrix')"/>
    <OpenMeRoom v-if="worksUI==='openme'" :locale="locale" :project="projects.find(p=>p.id==='openme')" :initial="openMeEndpoint" :received="openMeReceived" :routing="openMeRouting" @close="closeWorks" @select="selectOpenMe"/>
    <p v-if="worksTrip" class="works-travel" role="status">{{ wc.travel }} <button data-action="works-cancel" @click="cancelWorks">{{ ac.close }}</button></p>
    <EntityConversation v-if="activeEntity" :entity="activeEntity" :locale="locale" :messages="encounter.messages.value" :pending="encounter.pending.value" :error="encounter.error.value" @close="closeEncounter" @ask="encounter.ask($event,locale)"/>
    <ProjectWorkspace v-if="workspace && workspaceKind!=='flowforge'" :kind="workspaceKind" :locale="locale" :projects="projects" v-model:selected="archiveSelection" :exiting="portalState==='exiting'" @close="closeWorkspace"/>
    <PortalWorkspace v-if="workspace && workspaceKind==='flowforge'" :project="project" :labels="pc" :visual-style="visualStyle" :exiting="portalState==='exiting'" @close="closeWorkspace"/>
    <div :inert="!!activeEntity"><PersistentRadioPlayer :radio="radio" :locale="locale" :dock="gameDock" @leave="closeRadio" @stopped="playerStopped"/></div>
    <p class="arrival-status" aria-live="polite">{{ status }}</p>
  </main>
</template>

<style scoped>
.flight-status{position:absolute;top:1rem;left:1rem;z-index:12;max-width:min(26rem,75vw);padding:.8rem 1rem;border:1px solid #72c6be;border-radius:14px;background:#16343de8;color:#e1fff7;font:14px/1.4 sans-serif;pointer-events:auto}.flight-status p{margin:.35rem 0}.flight-status button{min-height:44px;padding:.4rem .7rem;margin:.2rem;border:1px solid #72c6be;border-radius:8px;background:#244e58;color:inherit}@media(max-width:650px){.flight-status{max-width:65vw;font-size:12px}.flight-status p:nth-child(3){display:none}}
</style>
