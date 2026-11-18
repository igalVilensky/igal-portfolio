import * as T from 'three';
import { skyEase } from './skytube';

/** Both discoveries share Arrival's input/render loop. The optical chamber is isolated,
 * while the whale stays in Origin coordinates. No timers, network, or extra renderer. */
export const secretPlaces = {
 entrance: new T.Vector3(-39, 16.05, 53),
 call: new T.Vector3(26, 1.65, 123),
 chamber: new T.Vector3(0, -500, 0),
 dock: new T.Vector3(27, 4, 148),
};
export type SecretWorld = 'observatory' | 'moon' | 'crystal' | 'jungle';
export function createTwoSecrets(scene:T.Scene) {
 const exterior=new T.Group();exterior.name='The two secrets · Origin discoveries';scene.add(exterior);
 const chamber=new T.Group();chamber.name="Nataniel's Universe · optical chamber";chamber.position.copy(secretPlaces.chamber);chamber.visible=false;scene.add(chamber);
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures=new Set<T.Texture>();
 const targets:T.Mesh[]=[];
 function mat(color:string,glow=0,opacity=1){const m=new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:glow,roughness:.42,metalness:.25,transparent:opacity<1,opacity,depthWrite:opacity===1});materials.add(m);return m;}
 const ink=mat('#080d28'),metal=mat('#34486b'),gold=mat('#ffd697',1),cyan=mat('#7de9ff',1.6),violet=mat('#bb8eff',1.4),pink=mat('#ffb6df',1.1),white=mat('#d9f1ff',.25),green=mat('#73ffbb',1.1);
 function mesh(g:T.BufferGeometry,m:T.Material,parent:T.Object3D,x=0,y=0,z=0,action?:string){geometries.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.userData.noCollision=true;parent.add(o);if(action){o.userData.secret=action;targets.push(o);}return o;}
 const sphereGeometry=new T.SphereGeometry(1,24,16);geometries.add(sphereGeometry);
 function orb(parent:T.Object3D,x:number,y:number,z:number,sx:number,sy:number,sz:number,m:T.Material,action?:string){const o=mesh(sphereGeometry,m,parent,x,y,z,action);o.scale.set(sx,sy,sz);return o;}
 function box(parent:T.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material){return mesh(new T.BoxGeometry(w,h,d),m,parent,x,y,z);}
 function ring(parent:T.Object3D,r:number,m:T.Material,x=0,y=0,z=0,t=.045,action?:string){return mesh(new T.TorusGeometry(r,t,8,72),m,parent,x,y,z,action);}
 function label(parent:T.Object3D,text:string,x:number,y:number,z:number,w=5){
  if(typeof document==='undefined')return;
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=128;const ctx=canvas.getContext('2d');if(!ctx)return;
  ctx.clearRect(0,0,1024,128);ctx.fillStyle='#d9eeff';ctx.textAlign='center';ctx.font='500 40px sans-serif';ctx.fillText(text,512,76);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.add(texture);const m=new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,side:T.DoubleSide});materials.add(m);mesh(new T.PlaneGeometry(w,w/8),m,parent,x,y,z);
 }
 // An optical instrument on the existing 14.4m rooftop lookout. No occupied wall is cut.
 const entrance=new T.Group();exterior.add(entrance);entrance.position.set(-39,14.4,54);
 box(entrance,4.3,.12,2,0,.06,0,metal);
 ring(entrance,1.55,metal,0,1.8,0,.16,'enter');ring(entrance,1.35,cyan,0,1.8,.02,.035,'enter');
 const apertureMat=mat('#101a45',.6,.8);apertureMat.side=T.DoubleSide;
 mesh(new T.CircleGeometry(1.3,64),apertureMat,entrance,0,1.8,0,'enter');
 for(let i=0;i<7;i++){const a=i*2.399;orb(entrance,Math.cos(a)*(.25+i*.13),1.8+Math.sin(a)*(.25+i*.13),-.04,.055,.055,.055,gold,'enter');}
 label(entrance,'THE SECRET UNIVERSE',0,3.8,0,4);
 const beacon=ring(entrance,.18,gold,0,1.8,-.06,.025,'enter');
 // Quiet cloud-shell instrument in an existing safe plateau corner, before its parapet.
 const callRoot=new T.Group();callRoot.position.set(26,0,124);exterior.add(callRoot);
 mesh(new T.CylinderGeometry(1.2,1.5,.3,40),metal,callRoot,0,.15,0);
 box(callRoot,.45,1.1,.45,0,.8,0,metal);
 for(let i=0;i<5;i++)orb(callRoot,(i-2)*.25,1.5+Math.sin(i*.8)*.16,0,.4,.3,.32,white,'call');
 const callHalo=ring(callRoot,.8,gold,0,1.45,0,.045,'call');callHalo.rotation.x=Math.PI/2;
 label(callRoot,"ADRIEL'S CLOUD WHALE",0,2.4,0,5);
 for(let i=0;i<5;i++){const o=orb(exterior,25+Math.sin(i)*2,.06,117+i, .1,.035,.1,gold);o.name='Small lights lead to the cloud shell';}

 // The observatory is a bounded optical volume below the world, rendered alone.
 const skyMaterial=new T.MeshBasicMaterial({color:'#020515',side:T.BackSide});materials.add(skyMaterial);
 mesh(new T.SphereGeometry(44,32,24),skyMaterial,chamber,0,5,0);
 const floor=mesh(new T.CylinderGeometry(11.5,11.5,.3,96),ink,chamber,0,-.15,0);
 for(const r of [3,7,10.8]){const o=ring(chamber,r,metal,0,.015,0,.025);o.rotation.x=-Math.PI/2;}
 const starsG=new T.BufferGeometry(),starPositions:number[]=[];
 for(let i=0;i<650;i++){const a=i*2.39996,v=1-2*(i+.5)/650,r=Math.sqrt(1-v*v);starPositions.push(Math.cos(a)*r*40,5+v*40,Math.sin(a)*r*40);}
 starsG.setAttribute('position',new T.Float32BufferAttribute(starPositions,3));geometries.add(starsG);
 const starsM=new T.PointsMaterial({color:'#bfdaff',size:.1,sizeAttenuation:true});materials.add(starsM);const stars=new T.Points(starsG,starsM);chamber.add(stars);
 chamber.add(new T.HemisphereLight('#b2cfff','#22213f',2));const roomLight=new T.PointLight('#8dbbff',45,30,1.4);roomLight.position.set(0,6,0);chamber.add(roomLight);
 const installation=new T.Group();chamber.add(installation);
 mesh(new T.CylinderGeometry(1.65,2,.8,64),metal,installation,0,.4,0);
 const engine=orb(installation,0,2,0,.7,.7,.7,cyan,'wake');
 const orbitRings:T.Mesh[]=[],holograms:T.Mesh[]=[];
 const destinations:SecretWorld[]=['moon','crystal','jungle'];
 for(let i=0;i<3;i++){
  const r=2.3+i*.7,o=ring(installation,r,[cyan,violet,green][i]!,0,2.2,0,.025);o.rotation.set(.4+i*.7,.2*i,.2+i*.4);orbitRings.push(o);
  const a=i*Math.PI*2/3+.4,p=orb(installation,Math.cos(a)*3.8,1.6,Math.sin(a)*3.8,.55,.55,.55,[white,violet,green][i]!,destinations[i]);holograms.push(p);
  const h=ring(installation,.8,[cyan,violet,green][i]!,p.position.x,.12,p.position.z,.035,destinations[i]);h.rotation.x=-Math.PI/2;
  label(installation,['THE MOON','CRYSTAL PLANET','JUNGLE PLANET'][i]!,p.position.x,2.65,p.position.z,2.6);
 }
 label(chamber,"NATANIEL'S UNIVERSE",0,5.8,-7,8);
 label(chamber,'COME CLOSER · WAKE THE UNIVERSE',0,4.9,-7,6);
 // A return instrument always occupies the same place in every transformation.
 const home=new T.Group();home.position.set(0,0,8.8);chamber.add(home);
 ring(home,1.15,gold,0,1.3,0,.08,'home');
 const returnMat=mat('#ffdfaa',.5,.2);returnMat.side=T.DoubleSide;
 mesh(new T.CircleGeometry(1.08,48),returnMat,home,0,1.3,0,'home');
 label(home,'RETURN HOME',0,2.9,0,3.6);
 const worlds={} as Record<'moon'|'crystal'|'jungle',T.Group>;
 for(const name of destinations as ('moon'|'crystal'|'jungle')[]){const g=new T.Group();g.name=name+' · contained transformation';g.visible=false;chamber.add(g);worlds[name]=g;}
 const moon=worlds.moon,moonStone=mat('#a9b5c8',.08);
 mesh(new T.CylinderGeometry(10.7,11,.12,96),moonStone,moon,0,.02,0);
 for(let i=0;i<12;i++){const a=i*2.399,r=4.5+(i%3)*2;const crater=ring(moon,.5+(i%3)*.25,metal,Math.cos(a)*r,.12,Math.sin(a)*r,.11);crater.rotation.x=-Math.PI/2;}
 const pads:T.Mesh[]=[],constellation:T.Mesh[]=[];
 for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const p=mesh(new T.CylinderGeometry(.85,.85,.1,48),cyan,moon,Math.cos(a)*4,.15,Math.sin(a)*4);pads.push(p);const s=orb(moon,-3+i*3,6+(i===1?2:0),-6,.17,.17,.17,gold);s.visible=false;constellation.push(s);}
 const constellationLines=new T.Group();moon.add(constellationLines);constellationLines.visible=false;
 for(const [a,b] of [[constellation[0]!,constellation[1]!],[constellation[1]!,constellation[2]!],[constellation[2]!,constellation[0]!]])mesh(new T.TubeGeometry(new T.LineCurve3(a.position,b.position),1,.035,6,false),gold,constellationLines);
 label(moon,'JUMP ON THE THREE LIGHTS',0,3.8,-8,6);
 const dust=new T.Points(starsG,starsM);dust.scale.setScalar(.22);dust.position.y=5;moon.add(dust);
 const crystal=worlds.crystal,crystalObjects:T.Mesh[]=[],crystalMat=mat('#6964bf',.45),crystalCore=new T.Group();crystal.add(crystalCore);
 for(let i=0;i<18;i++){const a=i*2.399,r=5.8+i%3,h=1.5+(i%5)*.8;const o=mesh(new T.ConeGeometry(.5,h,5),crystalMat,crystal,Math.cos(a)*r,h/2,Math.sin(a)*r);o.rotation.z=Math.sin(i)*.25;}
 for(let i=0;i<3;i++){const a=i*Math.PI*2/3;const o=mesh(new T.OctahedronGeometry(.8),violet,crystal,Math.cos(a)*4,1.3,Math.sin(a)*4,'crystal:'+i);crystalObjects.push(o);ring(crystal,.95,violet,o.position.x,.1,o.position.z).rotation.x=-Math.PI/2;}
 const poly=mesh(new T.IcosahedronGeometry(2.3,0),new T.MeshBasicMaterial({color:'#b4faff',wireframe:true,transparent:true,opacity:0}),crystalCore,0,4,0);materials.add(poly.material);
 const core=orb(crystalCore,0,4,0,.35,.35,.35,gold);core.scale.setScalar(.01);
 label(crystal,'TOUCH THE THREE RESONATING CRYSTALS',0,3.8,-8,7);
 const jungle=worlds.jungle,leafMat=mat('#155e50',.18),stemMat=mat('#24554d'),petalMat=mat('#ffb3d6',1.1);
 for(let i=0;i<20;i++){const a=i*2.399,r=6.5+(i%3)*.9,h=2+i%4;const g=new T.Group();g.position.set(Math.cos(a)*r,0,Math.sin(a)*r);jungle.add(g);mesh(new T.CylinderGeometry(.06,.15,h,8),stemMat,g,0,h/2,0);for(let j=0;j<3;j++){const leaf=orb(g,Math.cos(j*2.1)*.6,h-j*.6,Math.sin(j*2.1)*.6,1.2,.16,.55,leafMat);leaf.rotation.z=.3+j*.5;leaf.rotation.y=j*2.1;orb(g,leaf.position.x,h-j*.6+.15,leaf.position.z,.07,.07,.07,green);}}
 const bloom=new T.Group();jungle.add(bloom);bloom.position.set(0,0,-2);
 mesh(new T.CylinderGeometry(.13,.24,2,12),stemMat,bloom,0,1,0);
 const petals:T.Group[]=[];
 for(let i=0;i<9;i++){const p=new T.Group();p.position.y=2;p.rotation.y=i*Math.PI*2/9;bloom.add(p);const petal=orb(p,0,1.3,.2,.7,1.6,.24,petalMat);petal.rotation.x=.15;petals.push(p);}
 orb(bloom,0,2,0,.5,.5,.5,gold);
 label(jungle,'THE GARDEN WAKES WHEN YOU COME CLOSE',0,4.4,-8,7);

 // A rounded creature, with independent fin/tail joints, eyes and a cloud-white belly.
 const whale=new T.Group();whale.name="Adriel's Cloud Whale";exterior.add(whale);whale.visible=false;
 const skin=mat('#8ecbdc',.25),belly=mat('#ecf5ec',.25),eyeMat=mat('#132644'),blush=mat('#efb8c7',.2);
 orb(whale,0,0,0,5,2.8,8,skin);orb(whale,0,-.9,-1,4.4,1.9,6.8,belly);orb(whale,0,.1,-5,4.4,2.3,3.5,skin);
 for(const side of [-1,1]){
  orb(whale,side*3.4,.6,-6.15,.63,.7,.48,belly);orb(whale,side*3.5,.65,-6.5,.28,.34,.18,eyeMat);orb(whale,side*3.48,.8,-6.65,.09,.11,.06,gold);
  orb(whale,side*3.9,-.05,-5.5,.65,.25,.22,blush);
 }
 const fins:T.Group[]=[];
 for(const side of [-1,1]){const fin=new T.Group();fin.position.set(side*3.8,-.4,0);whale.add(fin);const o=orb(fin,side*2,-.2,1,3,.45,1.7,skin);o.rotation.y=side*.3;fins.push(fin);}
 const tail=new T.Group();tail.position.set(0,.1,6);whale.add(tail);orb(tail,0,0,1.7,2,1.4,3,skin);
 for(const side of [-1,1]){const o=orb(tail,side*2.2,.4,4,3,.4,1.7,skin);o.rotation.y=side*-.4;}
 // Gentle curved smile follows the front of the face.
 const smile=new T.CatmullRomCurve3([new T.Vector3(-2,-.55,-7.4),new T.Vector3(0,-.85,-8.3),new T.Vector3(2,-.55,-7.4)]);
 mesh(new T.TubeGeometry(smile,24,.065,6,false),eyeMat,whale);
 for(let i=0;i<14;i++){const z=-4+i*.65;orb(whale,Math.sin(i*.8)*2,2.55-Math.abs(z)*.07,z,.09,.06,.13,gold);}
 const seat=mesh(new T.CylinderGeometry(1.35,1.55,.18,48),metal,whale,0,2.72,-1,'ride');ring(whale,1.5,gold,0,2.85,-1,.07,'ride').rotation.x=-Math.PI/2;
 // A small cloud nest around the seat; the passenger never walks on the creature.
 for(let i=0;i<9;i++){const a=i*Math.PI*2/9;orb(whale,Math.cos(a)*1.8,2.85,-1+Math.sin(a)*1.8,.55,.3,.55,belly,'ride');}
 const route=new T.CatmullRomCurve3([[27,4,148],[27,24,142],[27,68,140],[43,95,177],[60,100,230],[45,105,295],[-20,105,315],[-55,100,260],[-25,102,200],[0,95,148],[20,65,136],[27,28,139]].map(p=>new T.Vector3(...p as [number,number,number])),true,'centripetal');route.arcLengthDivisions=1800;route.updateArcLengths();
 const magic=new T.Group();exterior.add(magic);magic.visible=false;
 const cloudRings:T.Mesh[]=[];
 for(const u of [.24,.31,.38]){const p=route.getPointAt(u),o=ring(magic,10,gold,p.x,p.y,p.z,.11);o.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),route.getTangentAt(u));cloudRings.push(o);}
 const rainbow=new T.Group();magic.add(rainbow);
 for(let i=0;i<5;i++){const curve=new T.CatmullRomCurve3(Array.from({length:20},(_,j)=>{const a=j/19*Math.PI;return new T.Vector3(72+Math.cos(a)*(20+i*.65),85+Math.sin(a)*(20+i*.65),264);}));mesh(new T.TubeGeometry(curve,48,.23,6,false),mat(['#ffb7bd','#ffdc95','#c2edac','#9fe5f5','#c4baff'][i]!,.9),rainbow);}
 const greatBloom=new T.Group();greatBloom.position.copy(route.getPointAt(.55)).add(new T.Vector3(-12,5,24));magic.add(greatBloom);
 const cloudPetals:T.Group[]=[];
 for(let i=0;i<10;i++){const g=new T.Group();g.rotation.z=i*Math.PI*2/10;greatBloom.add(g);orb(g,0,8,0,3,9,2.5,belly);orb(g,0,13,-2,1.2,1.2,1,gold);cloudPetals.push(g);}
 orb(greatBloom,0,0,-2,4,4,3,gold);
 const friends:T.Mesh[]=[];for(let i=0;i<7;i++)friends.push(mesh(new T.OctahedronGeometry(.35),gold,magic));
 const trailPoint=new T.Vector3();
 const trailGeometry=new T.BufferGeometry(),trailArray=new Float32Array(60*3);trailGeometry.setAttribute('position',new T.BufferAttribute(trailArray,3));geometries.add(trailGeometry);
 const trailMat=new T.PointsMaterial({color:'#ffe8b3',size:.25,transparent:true,opacity:.7,depthWrite:false});materials.add(trailMat);const trail=new T.Points(trailGeometry,trailMat);trail.frustumCulled=false;exterior.add(trail);trail.visible=false;
 // Transition veil is camera-relative; it covers only the midpoint of an optical jump.
 const veilMat=new T.MeshBasicMaterial({color:'#b6dfff',transparent:true,opacity:0,side:T.BackSide,depthTest:false,depthWrite:false});materials.add(veilMat);
 const veil=mesh(new T.SphereGeometry(.7,16,12),veilMat,scene);veil.renderOrder=1000;veil.visible=false;
 let active=false,world:SecretWorld='observatory',awakening=0,time=0,bloomProgress=0;
 const moonDone=new Set<number>(),crystalDone=new Set<number>();
 let whalePhase:'sleeping'|'calling'|'ready'|'boarding'|'riding'|'landed'|'exiting'='sleeping',whaleTime=0,passenger=false,lastYaw=0;
 const boardingLook=new T.Quaternion();
 const savedPosition=new T.Vector3(),savedLook=new T.Quaternion(),rideStart=new T.Vector3(),dockExit=new T.Vector3(26,1.65,122);
 const visibility=new Map<T.Object3D,boolean>();let savedFog=scene.fog,savedBackground=scene.background;
 let transition:{time:number;switched:boolean;apply:()=>void}|null=null;
 function isolate(){for(const o of scene.children)if(o!==chamber&&o!==veil)o.visible=false;chamber.visible=true;scene.fog=null;scene.background=new T.Color('#020515');}
 function restoreWorld(){visibility.forEach((v,o)=>o.visible=v);visibility.clear();chamber.visible=false;scene.fog=savedFog;scene.background=savedBackground;}
 function transform(next:SecretWorld,camera:T.PerspectiveCamera){world=next;installation.visible=next==='observatory';floor.visible=next==='observatory';for(const [name,g] of Object.entries(worlds))g.visible=name===next;camera.position.copy(secretPlaces.chamber).add(new T.Vector3(0,1.65,6));roomLight.color.set(next==='jungle'?'#75ffbd':next==='crystal'?'#c49cff':'#99c8ff');skyMaterial.color.set(next==='jungle'?'#061f20':next==='crystal'?'#110b2c':'#020515');}
 function begin(apply:()=>void){if(transition)return false;transition={time:0,switched:false,apply};return true;}
 function leave(camera:T.PerspectiveCamera){return begin(()=>{active=false;restoreWorld();camera.position.copy(savedPosition);camera.quaternion.copy(savedLook);});}
 function visible(o:T.Object3D){let node:T.Object3D|null=o;while(node){if(!node.visible)return false;node=node.parent;}return true;}
 return {
  exterior,chamber,targets,whale,route,
  get active(){return active;},get world(){return world;},get ownsPassenger(){return passenger;},get ownsMotion(){return passenger||!!transition;},get whalePhase(){return whalePhase;},get transitioning(){return !!transition;},
  get floorEye(){return secretPlaces.chamber.y+1.65;},
  get busy(){return active||passenger||!!transition;},
  get discoveries(){return {moon:moonDone.size,crystal:crystalDone.size,jungle:bloomProgress};},
  setExteriorVisible(value:boolean){exterior.visible=value&&!active;},
  hint(action:string){return ({enter:'Enter the secret universe',wake:'Wake the universe',moon:'Enter the Moon',crystal:'Enter the Crystal Planet',jungle:'Enter the Jungle Planet',home:world==='observatory'?'Return to the rooftop':'Return to the observatory',call:whalePhase==='sleeping'?'Call the Cloud Whale':whalePhase==='calling'?'Watch the clouds…':'Ride with the Cloud Whale',ride:passenger?'Return to the garden':'Ride with the Cloud Whale'} as Record<string,string>)[action]||'Touch the resonating crystal';},
  pick(ray:T.Raycaster){return ray.intersectObjects(targets,false).find(h=>visible(h.object));},
  canActivate(action:string,p:T.Vector3){if(transition)return false;if(action==='enter')return !active&&!passenger&&p.distanceTo(secretPlaces.entrance)<4.5;if(action==='home')return active;if(action==='call'||action==='ride')return !active&&(passenger?whalePhase==='landed':p.distanceTo(secretPlaces.call)<6&&(whalePhase==='sleeping'||whalePhase==='ready'));return active&&(action==='wake'||awakening>.75);},
  activate(action:string,camera:T.PerspectiveCamera){
   if(!this.canActivate(action,camera.position))return false;
   if(action==='enter')return begin(()=>{savedPosition.copy(camera.position);savedLook.copy(camera.quaternion);savedFog=scene.fog;savedBackground=scene.background;scene.children.forEach(o=>visibility.set(o,o.visible));active=true;transform('observatory',camera);camera.lookAt(secretPlaces.chamber.clone().add(new T.Vector3(0,2,0)));isolate();});
   if(action==='home')return world==='observatory'?leave(camera):begin(()=>transform('observatory',camera));
   if(action==='wake'){awakening=Math.max(.01,awakening);return true;}
   if(destinations.includes(action as SecretWorld))return begin(()=>transform(action as SecretWorld,camera));
   if(action.startsWith('crystal:')){crystalDone.add(Number(action.slice(8)));return true;}
   if(action==='call'||action==='ride'){
    if(whalePhase==='sleeping'){whalePhase='calling';whaleTime=0;whale.visible=trail.visible=true;}
    else if(whalePhase==='ready'){whalePhase='boarding';whaleTime=0;passenger=true;rideStart.copy(camera.position);boardingLook.copy(camera.quaternion);lastYaw=whale.rotation.y;}
    else if(whalePhase==='landed'){whalePhase='exiting';whaleTime=0;rideStart.copy(camera.position);}
    return true;
   }return false;
  },
  returnHome(camera:T.PerspectiveCamera){if(active&&!transition)return world==='observatory'?leave(camera):begin(()=>transform('observatory',camera));return false;},
  move(p:T.Vector3,delta:T.Vector3){p.add(delta);const local=p.clone().sub(secretPlaces.chamber),r=Math.hypot(local.x,local.z),limit=10.1;if(r>limit){p.x=local.x*limit/r;p.z=local.z*limit/r;}
   const obstacles: {x:number;z:number;r:number}[]=world==='observatory'?[{x:0,z:0,r:2.1}]:world==='crystal'?crystalObjects.map(o=>({x:o.position.x,z:o.position.z,r:1.15})):world==='jungle'?[{x:0,z:-2,r:1}]:[];
   for(const o of obstacles){const dx=p.x-o.x,dz=p.z-o.z,d=Math.hypot(dx,dz);if(d<o.r){p.x=o.x+(d?dx/d:1)*o.r;p.z=o.z+(d?dz/d:0)*o.r;}}
   p.y=secretPlaces.chamber.y+1.65;},
  update(dt:number,reduced:boolean,camera:T.PerspectiveCamera,paused=false){
   let turn=0,restored=false;if(active)isolate();if(paused)return {changed:false,turn,restored};dt=Math.min(Math.max(0,dt),.1);time+=dt;
   beacon.rotation.z=time*.2;callHalo.scale.setScalar(1+Math.sin(time*1.7)*.08);
   if(transition){transition.time+=dt;const t=Math.min(1,transition.time/(reduced?.65:1.6));veil.visible=true;veil.position.copy(camera.position);veilMat.opacity=Math.sin(Math.PI*t);if(t>=.5&&!transition.switched){transition.switched=true;transition.apply();restored=true;veil.position.copy(camera.position);}if(t>=1){transition=null;veil.visible=false;}}
   if(active){isolate();const local=camera.position.clone().sub(secretPlaces.chamber);
    if(world==='observatory'){
     if(Math.hypot(local.x,local.z)<5.8||awakening>0)awakening=Math.min(1,awakening+dt*.3);
     engine.scale.setScalar(.35+awakening*.65);engine.rotation.y=time*.3;
     orbitRings.forEach((o,i)=>{o.visible=awakening>i*.2;o.scale.setScalar(.15+.85*skyEase(awakening));if(!reduced)o.rotation.z+=dt*(.08+i*.04);});holograms.forEach((p,i)=>{p.scale.setScalar(.15+awakening*.4);p.position.y=1.6+Math.sin(time*.7+i)*.18;});roomLight.intensity=8+awakening*37;
    }else if(world==='moon'){
     pads.forEach((p,i)=>{if(Math.hypot(local.x-p.position.x,local.z-p.position.z)<1&&local.y>2.05)moonDone.add(i);p.material=moonDone.has(i)?gold:cyan;constellation[i]!.visible=moonDone.has(i);});constellationLines.visible=moonDone.size===3;if(!reduced)dust.rotation.y+=dt*.025;
    }else if(world==='crystal'){
     crystalObjects.forEach((o,i)=>{o.rotation.y+=reduced?0:dt*.35;o.material=crystalDone.has(i)?gold:violet;});const opacity=(poly.material as T.MeshBasicMaterial);opacity.opacity=T.MathUtils.damp(opacity.opacity,crystalDone.size===3?1:crystalDone.size*.2,2,dt);core.scale.setScalar(.01+opacity.opacity);if(!reduced)crystalCore.rotation.y+=dt*.15;
    }else{
     if(Math.hypot(local.x,local.z+2)<3.5)bloomProgress=Math.min(1,bloomProgress+dt*.4);petals.forEach(p=>p.rotation.x=skyEase(bloomProgress)*1.25);bloom.scale.setScalar(1+bloomProgress*.65);
    }
   }
   if(whalePhase!=='sleeping'){
    whaleTime+=dt;let u=0;
    if(whalePhase==='calling'){
     const t=skyEase(whaleTime/12);whale.position.lerpVectors(new T.Vector3(45,-28,196),secretPlaces.dock,t);whale.rotation.y=.15*(1-t);if(whaleTime>=12){whalePhase='ready';whaleTime=0;}
    }else if(whalePhase==='boarding'){
     whale.position.copy(secretPlaces.dock);const seatPoint=whale.localToWorld(new T.Vector3(0,4.3,-1));camera.position.lerpVectors(rideStart,seatPoint,skyEase(whaleTime/2.5));camera.quaternion.slerpQuaternions(boardingLook,new T.Quaternion(),skyEase(whaleTime/2.5));restored=true;if(whaleTime>=2.5){whalePhase='riding';whaleTime=0;}
    }else if(whalePhase==='riding'){
     u=skyEase(whaleTime/(reduced?100:80));route.getPointAt(u,whale.position);const t=route.getTangentAt(u),yaw=Math.atan2(-t.x,-t.z);const difference=Math.atan2(Math.sin(yaw-lastYaw),Math.cos(yaw-lastYaw));turn=T.MathUtils.clamp(difference*(1-Math.exp(-dt*1.8)),-dt*.45,dt*.45);lastYaw+=turn;whale.rotation.y=lastYaw;
     whale.localToWorld(camera.position.set(0,4.3,-1));if(u>=1){whalePhase='landed';whaleTime=0;whale.rotation.y=lastYaw;}
    }else if(whalePhase==='exiting'){
     camera.position.lerpVectors(rideStart,dockExit,skyEase(whaleTime/2));if(whaleTime>=2){camera.position.copy(dockExit);passenger=false;whalePhase='ready';whaleTime=0;restored=true;}
    }else{
     whale.position.copy(secretPlaces.dock);const settle=Math.atan2(Math.sin(-lastYaw),Math.cos(-lastYaw))*(1-Math.exp(-dt*1.8));if(passenger)turn=settle;lastYaw+=settle;whale.rotation.y=lastYaw;if(!reduced)whale.position.y+=Math.sin(time*.7)*.16;if(passenger)whale.localToWorld(camera.position.set(0,4.3,-1));
    }
    if(!reduced){tail.rotation.x=Math.sin(time*1.2)*.16;fins.forEach((f,i)=>f.rotation.z=Math.sin(time*.9+i*.5)*.13*(i?1:-1));}whale.scale.y=1+(reduced?0:Math.sin(time*.8)*.012);
    magic.visible=whalePhase==='riding';cloudRings.forEach((o,i)=>{o.visible=u>.15+i*.05&&u<.48;o.scale.setScalar(.85+.15*Math.sin(time));});rainbow.visible=u>.3&&u<.65;
    greatBloom.visible=u>.43&&u<.74;const unfold=skyEase((u-.43)/.1)*(1-skyEase((u-.66)/.08));greatBloom.scale.setScalar(Math.max(.001,unfold));cloudPetals.forEach(g=>g.rotation.x=.6*(1-unfold));
    friends.forEach((o,i)=>{o.visible=u>.55&&u<.86;const a=time*.45+i*Math.PI*2/7;o.position.copy(whale.position).add(new T.Vector3(Math.cos(a)*9,4+Math.sin(a*2),Math.sin(a)*9));});
    for(let i=0;i<60;i++){const a=i*2.399;trailPoint.set(Math.cos(a)*(2+i*.025),-2+Math.sin(time+i)*.7,6+i*.3).applyQuaternion(whale.quaternion).add(whale.position);trailPoint.toArray(trailArray,i*3);}trailGeometry.attributes.position!.needsUpdate=true;
   }
   return {changed:active||whalePhase!=='sleeping'||!!transition||camera.position.distanceTo(secretPlaces.entrance)<20||camera.position.distanceTo(secretPlaces.call)<20,turn,restored};
  },
  dispose(){if(active)restoreWorld();exterior.removeFromParent();chamber.removeFromParent();veil.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());targets.length=0;},
 };
}
