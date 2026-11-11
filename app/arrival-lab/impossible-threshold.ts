import * as T from 'three';
import { createCollision } from './collision';

export type ThresholdState = 'closed' | 'opening' | 'open' | 'crossing';
export const thresholdAnchor = new T.Vector3(-12, 1.65, -69.4);
/** A concealed scene switch, deliberately not a portal renderer. Camera orientation survives. */
export function createImpossibleThreshold(scene:T.Scene, solids:T.Mesh[]) {
 const hallObjects=[...scene.children], hallVisibility=new Map(hallObjects.map(o=>[o,o.visible])), hall=new T.Group(), arctic=new T.Group(), coast=new T.Group();scene.add(hall,arctic,coast);arctic.visible=coast.visible=false;
 const geometries:T.BufferGeometry[]=[], materials:T.Material[]=[];
 const hallSolids:T.Mesh[]=[], snowSolids:T.Mesh[]=[];
 const material=(color:string,basic=false)=>{const m=basic?new T.MeshBasicMaterial({color,side:T.DoubleSide}):new T.MeshStandardMaterial({color,roughness:.86,side:T.DoubleSide});materials.push(m);return m;};
 const stone=material('#d8d2c6'),wood=material('#777a74'),metal=material('#a3aaa6'),white=material('#edf2f2',true),snow=material('#e3eaf0'),timber=material('#635249'),roof=material('#d9e2e7'),warm=material('#ffcb85',true),blanket=material('#a89987');
 function box(parent:T.Object3D,list:T.Mesh[],w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material){const g=new T.BoxGeometry(w,h,d);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.receiveShadow=true;parent.add(mesh);list.push(mesh);return mesh;}
 function door(parent:T.Group,list:T.Mesh[],x:number,z:number,returning=false){
  const root=new T.Group();root.position.set(x,0,z);parent.add(root);
  for(const side of [-1,1])box(root,list,.16,2.85,.3,side*1.08,1.425,0,metal);
  box(root,list,2.32,.16,.3,0,2.85,0,metal);
  const pivot=new T.Group();pivot.position.set(-.99,0,0);root.add(pivot);
  const leaf=box(pivot,list,1.98,2.7,.12,.99,1.35,0,wood);leaf.userData.threshold=true;
  const handle=box(pivot,list,.3,.055,.13,1.72,1.12,.13,metal);handle.userData.threshold=true;
  // A short, enclosed white reveal fills peripheral vision at the crossing plane.
  for(const side of [-1,1])box(root,list,.12,2.85,2.8,side*1.08,1.425,-1.3,returning?stone:white);
  box(root,list,2.3,.12,2.8,0,2.9,-1.3,white);
  box(root,list,2.3,.08,3,0,-.04,-1.4,returning?snow:stone);
  const veil=box(root,list,2.05,2.75,.025,0,1.375,-1.5,white);veil.userData.noCollision=true;
  return {root,pivot,leaf};
 }
 const entry=door(hall,hallSolids,-12,-69.5);
 const sunEntry=door(hall,hallSolids,12,-69.5);
 const coastSolids:T.Mesh[]=[];
 const sunExit=door(coast,coastSolids,0,0,true);sunExit.root.rotation.y=Math.PI;
 const plaster=material('#fff0d2'),blue=material('#176da1'),coral=material('#e46747'),paving=material('#e9c68e'),green=material('#699746'),sea=material('#258fb4',true),sunGlow=material('#fff0ad',true);
 sunEntry.leaf.material=coral;
 for(const doorway of [sunEntry,sunExit])doorway.root.traverse(object=>{if(object.userData.threshold)object.userData.sunDoor=true;});
 // Warm spill is visible in the hall, but the dogleg keeps the coast concealed.
 const spill=new T.PointLight('#ffd07a',28,9,2);spill.position.set(12,2,-68);hall.add(spill);
 const sky=new T.HemisphereLight('#d5eeff','#bc8956',2.4);coast.add(sky);
 const sunlight=new T.DirectionalLight('#fff0c4',3.1);sunlight.position.set(-18,32,12);sunlight.castShadow=true;
 sunlight.shadow.mapSize.set(1024,1024);Object.assign(sunlight.shadow.camera,{left:-35,right:35,top:35,bottom:-35,far:100});sunlight.shadow.bias=-.001;sunlight.shadow.normalBias=.04;coast.add(sunlight,sunlight.target);
 const build=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material,solid=true)=>{const mesh=box(coast,solid?coastSolids:[],w,h,d,x,y,z,m);mesh.castShadow=true;return mesh;};
 build(38,.3,45,5,-.17,20,paving);
 build(12,4,.4,-7,2,-.5,plaster);build(23,4,.4,12.5,2,-.5,plaster);
 // Entry court, right turn, then a narrow lane out onto the promenade.
 build(.5,6,15,-3,3,8,plaster);build(.5,6,11,3,3,6,plaster);
 build(15,6,.5,4,3,15,plaster);build(12,5,.5,8,2.5,8,plaster);
 build(.5,5,13,14,2.5,14,plaster);build(.5,5,8,4,2.5,22,plaster);
 build(5,7,10,-6,3.5,22,plaster);build(6,8,9,19,4,22,plaster);
 // Recessed blue shutters, projecting balconies, slender rails and coral awnings.
 for(const [x,z] of [[-2.7,5],[-2.7,10],[3.3,5],[4.3,20],[13.7,18]] as const){
  build(.12,1.5,1.2,x,3,z,blue,false);
  for(let i=0;i<5;i++)build(.15,.035,1.22,x,2.4+i*.28,z,plaster,false);
 }
 for(const z of [6,11]){build(1.4,.16,2,-2.1,2.6,z,plaster,false);build(.06,.7,2,-1.4,3,z,blue,false);for(let i=0;i<6;i++)build(.05,.7,.045,-1.4,3,z-.85+i*.34,blue,false);}
 build(2.1,.12,3,2,3.4,6,coral,false);
 for(let i=0;i<8;i++)build(6,.15,.16,0,4,2+i*.65,plaster,false);
 // Planters and a shaded bench provide human scale without filling the walking route.
 for(const [x,z] of [[-1.9,12],[6,9],[5,28],[17,29]] as const){build(.85,.65,.85,x,.32,z,coral);const g=new T.IcosahedronGeometry(.8,1);geometries.push(g);const crown=new T.Mesh(g,green);crown.position.set(x,1.45,z);coast.add(crown);}
 build(2.8,.18,.65,9,.65,26,blue);for(const x of [8,10])build(.12,.65,.5,x,.32,26,blue);
 // Coast: a broad horizon beyond the compressed residential lane.
 build(1600,.2,1500,0,-.7,780,sea,false);
 const waterLight=material('#51afc4',true);
 for(let i=0;i<18;i++)build(80+i*22,.012,.12+(i%3)*.09,Math.sin(i*2.4)*35,-.588,56+i*i*1.7,waterLight,false);
 build(38,.18,5,5,-.05,35,plaster);
 build(38,.65,.3,5,.325,37.4,plaster);
 build(.4,3,40,-13,1.5,20,plaster);build(.4,3,40,24,1.5,20,plaster);
 const diskGeo=new T.SphereGeometry(18,24,12);geometries.push(diskGeo);const disk=new T.Mesh(diskGeo,sunGlow);disk.position.set(-180,110,700);coast.add(disk);
 const coastCollision=createCollision(coastSolids);

 const exit=door(arctic,snowSolids,0,0,true);exit.root.rotation.y=Math.PI;
 // Arctic door opens toward the snowfield; its white reveal conceals the reverse crossing.
 const fill=new T.HemisphereLight('#d6e7f6','#8d9da9',2.3);arctic.add(fill);
 const sun=new T.DirectionalLight('#fff1db',2.1);sun.position.set(-80,90,-130);arctic.add(sun);
 const ground=box(arctic,[],12000,1,12000,0,-.55,0,snow);
 ground.userData.noCollision=true;
 // Low wind-carved tundra ridges, never alpine peaks. Deterministic, shared low-poly geometry.
 const ridgeGeo=new T.SphereGeometry(1,24,10);geometries.push(ridgeGeo);
 for(let i=0;i<38;i++){const angle=i*2.39996, r=210+(i%7)*100;const ridge=new T.Mesh(ridgeGeo,snow);ridge.position.set(Math.cos(angle)*r,-6,Math.sin(angle)*r);ridge.scale.set(95+(i%4)*24,9+(i%5)*2,60);arctic.add(ridge);}
 // The house is a memory-inspired vignette, not a historical reconstruction.
 const house=new T.Group();house.position.set(13,0,78);arctic.add(house);
 box(house,snowSolids,6,3.1,5,0,1.55,0,timber);
 for(let i=0;i<14;i++)box(house,[],6.04,.035,5.04,0,.15+i*.22,0,wood);
 for(const side of [-1,1]){const panel=box(house,[],3.65,.2,6,side*1.52,3.65,0,roof);panel.rotation.z=-side*.42;}
 box(house,[],.3,1.5,.35,1.65,4,1,timber);
 box(house,[],1.05,2.15,.12,-1.7,1.075,-2.57,wood);
 // Recessed warm window with a tiny cradle and folded blanket, readable on approach.
 box(house,[],1.8,1.35,.12,.9,1.8,-2.57,warm);
 for(const x of [-.08,.9,1.88])box(house,[],.07,1.5,.12,x,1.8,-2.66,timber);
 for(const y of [1.08,2.52])box(house,[],2,.07,.12,.9,y,-2.66,timber);
 box(house,[],1.1,.18,.22,.9,1.42,-2.72,blanket);
 for(const x of [.33,1.47])box(house,[],.06,.48,.25,x,1.5,-2.73,timber);
 const glow=new T.PointLight('#ffc78b',18,9,2);glow.position.set(13.9,1.8,75);arctic.add(glow);
 // Soft approach drifts make the field readable at walking height.
 for(let i=0;i<22;i++){const drift=new T.Mesh(ridgeGeo,snow);drift.position.set(Math.sin(i*3.7)*65,-.65,8+i*6);drift.scale.set(9,.75,3);arctic.add(drift);}
 solids.push(...hallSolids,...snowSolids,...coastSolids);
 let sunWorld=false;
 const doors=[{state:'closed' as ThresholdState,progress:0},{state:'closed' as ThresholdState,progress:0}];
 let selected=doors[0]!;
 let active=false,previous=new T.Vector3(),initialized=false,dark=false;
 let savedBackground:T.Scene['background'],savedFog:T.Scene['fog'];
 const snowCollision=createCollision(snowSolids);
 function appearance(){if(active){if(sunWorld){scene.background=new T.Color('#b4def1');scene.fog=new T.Fog('#c5e5ee',150,1100);return;}scene.background=new T.Color(dark?'#647e98':'#cbdde8');scene.fog=new T.FogExp2(dark?'#92a7ba':'#dde7ed',.0018);sun.intensity=dark?.5:2.1;fill.intensity=dark?1.15:2.3;} }
 function switchWorld(camera:T.PerspectiveCamera){
  selected.state='crossing';active=!active;
  if(active){savedBackground=scene.background;savedFog=scene.fog;}
  if(active)hallObjects.forEach(o=>hallVisibility.set(o,o.visible));
  hallObjects.forEach(o=>o.visible=active?false:hallVisibility.get(o)!);hall.visible=!active;arctic.visible=active&&!sunWorld;coast.visible=active&&sunWorld;
  // A rigid half-turn maps the two doorway faces; preserve pitch and crossing depth.
  const hallX=sunWorld?12:-12;
  camera.position.x=active?-(camera.position.x-hallX):-camera.position.x+hallX;
  camera.position.z=active?-(camera.position.z+69.5):-camera.position.z-69.5;
  camera.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),Math.PI));
  camera.far=active?9000:220;camera.updateProjectionMatrix();
  if(active)appearance();else{scene.background=savedBackground;scene.fog=savedFog;}
  selected.progress=1;selected.state='open';previous.copy(camera.position);
 }
 return {get active(){return active;},get environment(){return active?(sunWorld?'sun-world':'antipayuta'):'hall';},get state(){return selected.state;},hallSolids,worldSolids:[...snowSolids,...coastSolids],snowSolids,
  activate(sun=false){if(!active){sunWorld=sun;selected=doors[sun?1:0]!;}if(selected.state==='closed')selected.state='opening';},
  move(position:T.Vector3,delta:T.Vector3,hallCollision:ReturnType<typeof createCollision>){(active?(sunWorld?coastCollision:snowCollision):hallCollision)(position,delta);if(active){ground.position.x=position.x;ground.position.z=position.z;}},
  update(dt:number,reduced:boolean,camera:T.PerspectiveCamera){let changed=false;for(const doorway of doors){if(doorway.state==='opening'){doorway.progress=Math.min(1,doorway.progress+(reduced?1:dt/1.05));if(doorway.progress===1)doorway.state='open';changed=true;}}
   entry.pivot.rotation.y=exit.pivot.rotation.y=-doors[0]!.progress*Math.PI*.56;
   sunEntry.pivot.rotation.y=sunExit.pivot.rotation.y=-doors[1]!.progress*Math.PI*.56;
   if(!active&&Math.abs(camera.position.x)>10){sunWorld=camera.position.x>0;selected=doors[sunWorld?1:0]!;}
   const centerX=active?0:sunWorld?12:-12,plane=active?1:-70.5;
   if(initialized&&selected.state==='open'&&previous.z>plane&&camera.position.z<=plane){const t=(plane-previous.z)/(camera.position.z-previous.z);const crossingX=T.MathUtils.lerp(previous.x,camera.position.x,t);if(Math.abs(crossingX-centerX)<.72){switchWorld(camera);changed=true;}}
   previous.copy(camera.position);initialized=true;return changed;
  },
  returnToHall(camera:T.PerspectiveCamera){if(active){camera.position.set(0,1.65,-1.01);switchWorld(camera);camera.position.copy(thresholdAnchor);if(sunWorld)camera.position.x=12;previous.copy(camera.position);}},
  setTheme(value:boolean){dark=value;if(active){savedBackground=scene.background;savedFog=scene.fog;}stone.color.set(dark?'#434b57':'#d8d2c6');wood.color.set(dark?'#58616a':'#777a74');appearance();},
  dispose(){hall.removeFromParent();arctic.removeFromParent();coast.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
 };
}
