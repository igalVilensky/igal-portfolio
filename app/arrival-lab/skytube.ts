import * as T from 'three';
import { districtOffset } from './geography';
import { createCollision } from './collision';

export type StationId = 'origin' | 'district';
export type TransitPhase = 'docked' | 'opening' | 'boarding' | 'closing' | 'riding' | 'calling' | 'arriving' | 'exiting';
export const skyStations = {
 origin: { point: [77, 2.12, 66], names: { en: 'The Origin', de: 'Der Ursprung', ru: 'Исток' } },
 district: { point: [201 + districtOffset, 2.12, 74], names: { en: 'Loop District', de: 'Loop-Viertel', ru: 'Квартал петель' } },
} as const;
export const skyCopy = {
 en: { call: 'Call capsule', approach: 'Approach the side door', board: 'Board capsule', exit: 'Exit to platform', opening: 'Doors opening', boarding: 'Boarding', closing: 'Doors closing', riding: 'In transit', calling: 'Capsule approaching', arriving: 'Arriving', exiting: 'Exiting', unavailable: 'Capsule in transit', docked: 'Capsule ready', destination: 'Destination' },
 de: { call: 'Kapsel rufen', approach: 'Zur Seitentür gehen', board: 'Kapsel betreten', exit: 'Zum Bahnsteig', opening: 'Türen öffnen', boarding: 'Einsteigen', closing: 'Türen schließen', riding: 'Unterwegs', calling: 'Kapsel kommt', arriving: 'Ankunft', exiting: 'Aussteigen', unavailable: 'Kapsel unterwegs', docked: 'Kapsel bereit', destination: 'Ziel' },
 ru: { call: 'Вызвать капсулу', approach: 'Подойдите к боковой двери', board: 'Войти в капсулу', exit: 'Выйти на платформу', opening: 'Двери открываются', boarding: 'Посадка', closing: 'Двери закрываются', riding: 'В пути', calling: 'Капсула приближается', arriving: 'Прибытие', exiting: 'Выход', unavailable: 'Капсула в пути', docked: 'Капсула готова', destination: 'Направление' },
};
export const skyEase = (t: number) => { t = T.MathUtils.clamp(t, 0, 1); return t * t * t * (10 + t * (-15 + 6 * t)); };
export function createSkyRoute() {
 return new T.CatmullRomCurve3([
  new T.Vector3(...skyStations.origin.point), new T.Vector3(91,8,76), new T.Vector3(130,14,92),
  new T.Vector3(177,16,104), new T.Vector3(230,12,92), new T.Vector3(...skyStations.district.point),
 ], false, 'centripetal');
}
const other = (station: StationId): StationId => station === 'origin' ? 'district' : 'origin';

/** One exterior vehicle, updated by Arrival's loop. Look ownership stays in createLook. */
export function createSkyTube(scene: T.Scene, allSolids: T.Mesh[]) {
 const root = new T.Group(); root.name = 'SkyTube · Origin / Loop District'; scene.add(root);
 const vehicle = new T.Group(); vehicle.name = 'SkyTube passenger capsule'; root.add(vehicle);
 const route = createSkyRoute(), length = route.getLength(), duration = Math.max(18, length / 6.5);
 const gs = new Set<T.BufferGeometry>(), ms = new Set<T.Material>(), solids: T.Mesh[] = [];
 const boxes = new Map<string,T.BoxGeometry>();
 function material(color: string, metalness = 0) { const m = new T.MeshStandardMaterial({ color, roughness: .55, metalness }); ms.add(m); return m; }
 const stone = material('#e5e4d7'), metal = material('#43616b',.65), accent = material('#5dabb0'), coral = material('#cc805d');
 const glow = material('#f2d69a'); glow.emissive.set('#f2cb77'); glow.emissiveIntensity = .3;
 const glass = material('#a6d9e3',.12); glass.transparent = true; glass.opacity = .14; glass.depthWrite = false; glass.side = T.DoubleSide; glass.forceSinglePass = true;
 const tubeGlass = glass.clone(); tubeGlass.opacity = .065; ms.add(tubeGlass);
 function mesh(g: T.BufferGeometry, m: T.Material, parent: T.Object3D, solid = false) {
  gs.add(g); const o = new T.Mesh(g,m); o.receiveShadow = true; parent.add(o); o.userData.noCollision = !solid;
  if(parent === root) o.userData.room = 'skytube'; solids.push(o); allSolids.push(o); return o;
 }
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m=stone,parent:T.Object3D=root,solid=true) {
  const key=[w,h,d].join(); let g=boxes.get(key); if(!g){g=new T.BoxGeometry(w,h,d);boxes.set(key,g);}
  const o=mesh(g,m,parent,solid);o.position.set(x,y,z);o.castShadow=solid&&h>2;return o;
 }
 class RouteSection extends T.Curve<T.Vector3> {
  constructor(private offsetY=0){super();}
  getPoint(t:number,target=new T.Vector3()) { route.getPointAt(T.MathUtils.lerp(7/length,1-7/length,t),target);target.y+=this.offsetY;return target; }
 }
 const tube=mesh(new T.TubeGeometry(new RouteSection(),120,3.2,20,false),tubeGlass,root);tube.name='SkyTube continuous glass shell';
 const railGeometry=new T.TubeGeometry(new RouteSection(-2.35),120,.065,6,false);
 mesh(railGeometry,metal,root);
 const ribGeometry=new T.TorusGeometry(3.22,.045,6,32),zAxis=new T.Vector3(0,0,1);
 for(let distance=7;distance<length-6;distance+=8){const u=distance/length,rib=mesh(ribGeometry,metal,root);rib.position.copy(route.getPointAt(u));rib.quaternion.setFromUnitVectors(zAxis,route.getTangentAt(u));}
 // Level platforms reuse the existing ground: no added floor planes or stacked paving.
 const stationRoots={} as Record<StationId,T.Group>, lamps={} as Record<StationId,T.Mesh>;
 const poses={} as Record<StationId,{position:T.Vector3;yaw:number}>;
 for(const id of ['origin','district'] as const) {
  const u=id==='origin'?0:1,p=route.getPointAt(u),t=route.getTangentAt(u),yaw=Math.atan2(t.x,t.z);
  const station=new T.Group();station.name='SkyTube station · '+id;station.position.set(p.x,0,p.z);station.rotation.y=yaw;root.add(station);stationRoots[id]=station;poses[id]={position:station.position.clone(),yaw};
  for(const z of [-3.5,3.5]) { box(.18,4.5,.22,-4.8,2.25,z,metal,station);box(3.2,.18,.22,-3.3,4.5,z,accent,station,false); }
  box(3.2,.16,7.5,-3.3,4.6,0,stone,station,false);box(.1,.1,6.8,-4.6,4.44,0,glow,station,false);
  // A small structural bearing and dock beacons frame the vehicle without covering views.
  for(const z of [-3.15,3.15]){box(.3,.6,.3,-2.25,.3,z,metal,station);box(.34,.12,.34,-2.25,.68,z,glow,station,false);}
  box(.55,1.05,.55,-3.55,.525,2.65,metal,station);
  const control=box(.7,.32,.22,-3.55,1.15,2.36,coral,station,false);control.userData.skytube='call:'+id;
  const lamp=box(.3,.12,.12,-3.55,1.47,2.36,glow.clone(),station,false);ms.add(lamp.material as T.Material);lamps[id]=lamp;
  // Physical station plaque, rendered once per locale change; no floating destination UI.
 }
 // Rounded structural keel and a transparent, generously proportioned greenhouse cabin.
 const keelGeometry=new T.CapsuleGeometry(1.9,2.3,4,16);keelGeometry.rotateX(Math.PI/2);keelGeometry.scale(1,.14,1);
 const keel=mesh(keelGeometry,metal,vehicle);keel.position.y=-.4;
 box(3.5,.16,5.4,0,-.08,0,stone,vehicle,false).name='SkyTube cabin floor';
 box(.1,.08,5.3,1.73,.1,0,accent,vehicle,false);box(.1,.08,5.3,-1.73,.1,0,accent,vehicle,false);
 const roofVertices:number[]=[],roofIndices:number[]=[];
 for(let i=0;i<=20;i++){const a=i*Math.PI/20;for(const z of [-2.7,2.7])roofVertices.push(Math.cos(a)*1.8,1.8+Math.sin(a)*1.8,z);}
 for(let i=0;i<20;i++){const b=i*2;roofIndices.push(b,b+1,b+2,b+1,b+3,b+2);}
 const roofGeometry=new T.BufferGeometry();roofGeometry.setAttribute('position',new T.Float32BufferAttribute(roofVertices,3));roofGeometry.setIndex(roofIndices);roofGeometry.computeVertexNormals();mesh(roofGeometry,glass,vehicle);
 box(.055,1.8,5.4,1.8,.9,0,glass,vehicle,true);
 for(const z of [-2.25,2.25])box(.055,1.8,.9,-1.8,.9,z,glass,vehicle,true);
 const archGeometry=new T.TorusGeometry(1.8,.055,6,24,Math.PI);
 for(const z of [-2.7,2.7]) {
  const arch=mesh(archGeometry,accent,vehicle);arch.position.set(0,1.8,z);
  for(const x of [-1.8,1.8])box(.09,1.8,.1,x,.9,z,metal,vehicle,true);
  const shape=new T.Shape();shape.moveTo(-1.8,0);shape.lineTo(1.8,0);shape.lineTo(1.8,1.8);shape.absarc(0,1.8,1.8,0,Math.PI,false);shape.lineTo(-1.8,0);
  const window=mesh(new T.ShapeGeometry(shape,16),glass,vehicle,true);window.position.z=z;
 }
 const doorPanels=[-1,1].map(side=>{const panel=box(.06,1.84,1.8,-1.91,.94,side*.9,glass,vehicle,true);panel.userData.skytube='board';return panel;});
 for(const z of [-1.83,1.83])box(.08,2,.08,-1.92,1,z,accent,vehicle,false);
 box(.12,.12,5.5,-1.91,1.95,0,metal,vehicle,false);
 box(.5,.5,2.8,1.15,.5,0,accent,vehicle,true);box(.15,.9,2.8,1.45,.95,0,stone,vehicle,true);
 // A broad door-side sill is also an interaction target; no tiny handle targeting.
 const sill=box(.12,.18,3.5,-1.94,.13,0,accent,vehicle,false);sill.userData.skytube='board';
 // The whole visible capsule is one generous target; eligibility still requires the nearby side entrance.
 vehicle.traverse(object=>{if(object instanceof T.Mesh)object.userData.skytube='board';});
 const collision=createCollision(solids);
 let phase:TransitPhase='docked',docked:StationId='origin',destination:StationId='district',u=0,elapsed=0,door=0;
 let openingStart=0,closingStart=1;
 let passenger=false,paused=false,pendingCall:StationId|null=null,travelDuration=duration,reducedTrip=false,lastYaw=poses.origin.yaw;
 const boardStart=new T.Vector3(),exitStart=new T.Vector3(),anchor=new T.Vector3(),cabin=new T.Vector3();
 const labels:{canvas:HTMLCanvasElement;ctx:CanvasRenderingContext2D;texture:T.CanvasTexture;material:T.MeshBasicMaterial;id:StationId}[]=[];
 if(typeof document!=='undefined')for(const id of ['origin','district'] as const){
  const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;const ctx=canvas.getContext('2d');if(!ctx)continue;
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
  const m=new T.MeshBasicMaterial({map:texture});ms.add(m);
  const plaque=mesh(new T.PlaneGeometry(2.4,.6),m,stationRoots[id]);plaque.position.set(-3.4,3.8,3.38);plaque.rotation.y=Math.PI;
  labels.push({canvas,ctx,texture,material:m,id});
 }
 function setLocale(locale:string){const language=locale==='de'||locale==='ru'?locale:'en';for(const l of labels){l.ctx.fillStyle='#304c57';l.ctx.fillRect(0,0,512,128);l.ctx.fillStyle='#e6eee7';l.ctx.font='30px sans-serif';l.ctx.fillText('SKYTUBE',22,45);l.ctx.font='24px sans-serif';l.ctx.fillText(skyStations[other(l.id)].names[language],22,93);l.texture.needsUpdate=true;}}
 function pose() {
  const point=route.getPointAt(u),tangent=route.getTangentAt(u),yaw=Math.atan2(tangent.x,tangent.z);
  const pitch=-Math.atan2(tangent.y,Math.hypot(tangent.x,tangent.z))*T.MathUtils.smoothstep(Math.min(u,1-u)*length,0,4);
  vehicle.rotation.set(pitch,yaw,0,'YXZ');vehicle.position.copy(point).sub(new T.Vector3(0,2,0).applyEuler(vehicle.rotation));vehicle.updateMatrixWorld(true);
  return yaw;
 }
 function localPoint(x:number,y:number,z:number,target:T.Vector3){return vehicle.localToWorld(target.set(x,y,z));}
 function setPhase(next:TransitPhase){if(next==='closing')closingStart=door;if(next==='opening')openingStart=door;phase=next;elapsed=0;}
 function phaseDuration(){return phase==='opening'||phase==='arriving'?.8:phase==='boarding'?1.8:phase==='closing'?.85:phase==='exiting'?1.6:phase==='riding'||phase==='calling'?travelDuration:Infinity;}
 function canBoard(position:T.Vector3){const p=vehicle.worldToLocal(position.clone());return phase==='docked'&&!passenger&&p.x< -1.6&&p.x> -5.3&&Math.abs(p.z)<3.1&&Math.abs(p.y-1.65)<.6;}
 pose();setLocale('en');
 return {
  root,vehicle,route,stations:stationRoots,duration,length,
  get phase(){return phase;},get ownsPassenger(){return passenger;},get station(){return docked;},get destination(){return destination;},get progress(){return u;},get doorProgress(){return door;},
  canActivate(action:string,position:T.Vector3){if(action==='exit')return passenger&&phase==='docked';if(action==='board')return canBoard(position);if(action.startsWith('call:'))return !passenger&&phase==='docked';return false;},
  activate(action:string,camera:T.PerspectiveCamera,reduced=false){
   if(!this.canActivate(action,camera.position))return false;
   if(action==='board'){destination=other(docked);passenger=true;boardStart.copy(camera.position);lastYaw=vehicle.rotation.y;reducedTrip=reduced;setPhase('opening');return true;}
   if(action==='exit'){exitStart.copy(camera.position);setPhase('exiting');return true;}
   const id=action.slice(5) as StationId;if(id!=='origin'&&id!=='district')return false;
   if(id===docked)return true;
   pendingCall=id;destination=id;reducedTrip=reduced;setPhase('closing');return true;
  },
  setPaused(value:boolean){paused=value;},
  update(dt:number,reduced:boolean,camera:T.PerspectiveCamera,environmentPaused=false){
   if(paused||environmentPaused||!Number.isFinite(dt)||dt<0)return {changed:false,turn:0};
   const before=phase,oldU=u,oldDoor=door;let remaining=dt,transitions=0;
   while(remaining>1e-8&&phase!=='docked'&&transitions<12){
    const limit=phaseDuration(),step=Math.min(remaining,Math.max(0,limit-elapsed));elapsed+=step;remaining-=step;
    const t=elapsed>=limit-1e-8?1:elapsed/limit;
    if(phase==='opening')door=T.MathUtils.lerp(openingStart,1,skyEase(t));if(phase==='arriving')door=skyEase(t);
    if(phase==='closing')door=closingStart*(1-skyEase(t));
    if(phase==='riding'||phase==='calling')u=T.MathUtils.lerp(destination==='district'?0:1,destination==='district'?1:0,skyEase(t));
    if(t<1)break;
    transitions++;
    if(phase==='opening')setPhase('boarding');
    else if(phase==='boarding')setPhase('closing');
    else if(phase==='closing'){
     destination=pendingCall||other(docked);travelDuration=duration*(reducedTrip?1.35:1);door=0;
     setPhase(pendingCall?'calling':'riding');pendingCall=null;
    }else if(phase==='riding'||phase==='calling'){u=destination==='district'?1:0;docked=destination;setPhase('arriving');}
    else if(phase==='arriving'){door=1;setPhase('docked');}
    else if(phase==='exiting'){passenger=false;setPhase('docked');}
   }
   const yaw=pose();let turn=0;
   if(passenger){
    localPoint(0,1.65,0,cabin);localPoint(-3.55,1.65-vehicle.position.y,0,anchor);
    if(phase==='opening')camera.position.copy(boardStart);
    else if(phase==='boarding'){
     const t=elapsed/1.8;
     if(t<.35)camera.position.lerpVectors(boardStart,anchor,skyEase(t/.35));else camera.position.lerpVectors(anchor,cabin,skyEase((t-.35)/.65));
    }else if(phase==='exiting')camera.position.lerpVectors(exitStart,anchor,skyEase(elapsed/1.6));
    else camera.position.copy(cabin);
    if(!reduced)turn=Math.atan2(Math.sin(yaw-lastYaw),Math.cos(yaw-lastYaw));
   }else if(before==='exiting'){localPoint(-3.55,1.65-vehicle.position.y,0,camera.position);}
   lastYaw=yaw;
   doorPanels.forEach((panel,i)=>panel.position.z=(i===0?-1:1)*(.9+.95*door));
   for(const id of ['origin','district'] as const){const m=lamps[id].material as T.MeshStandardMaterial;m.color.set(phase==='docked'&&docked===id?'#b5dfbe':'#e1b36d');m.emissive.copy(m.color);}
   return {changed:before!==phase||oldU!==u||oldDoor!==door||passenger,turn};
  },
  constrain(start:T.Vector3,end:T.Vector3){const y=end.y,p=start.clone();collision(p,end.clone().sub(start));end.x=p.x;end.z=p.z;end.y=y;},
  setLocale,
  setTheme(dark:boolean){stone.color.set(dark?'#8a9cac':'#e5e4d7');metal.color.set(dark?'#6b95a5':'#43616b');accent.color.set(dark?'#80b8c2':'#5dabb0');glass.opacity=dark?.11:.14;tubeGlass.opacity=dark?.045:.065;glow.emissiveIntensity=dark?.85:.3;},
  dispose(){passenger=false;labels.forEach(l=>l.texture.dispose());root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());},
 };
}
