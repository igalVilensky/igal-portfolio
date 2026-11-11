import * as T from 'three';
import { createCollision } from './collision';

export type ThresholdState = 'closed' | 'opening' | 'open' | 'crossing';
export const thresholdAnchor = new T.Vector3(-12, 1.65, -69.4);
/** A concealed scene switch, deliberately not a portal renderer. Camera orientation survives. */
export function createImpossibleThreshold(scene:T.Scene, solids:T.Mesh[]) {
 const hallObjects=[...scene.children], hallVisibility=new Map(hallObjects.map(o=>[o,o.visible])), hall=new T.Group(), arctic=new T.Group();scene.add(hall,arctic);arctic.visible=false;
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
 solids.push(...hallSolids,...snowSolids);
 let active=false,state:ThresholdState='closed',progress=0,previous=new T.Vector3(),initialized=false,dark=false;
 let savedBackground:T.Scene['background'],savedFog:T.Scene['fog'];
 const snowCollision=createCollision(snowSolids);
 function appearance(){if(active){scene.background=new T.Color(dark?'#647e98':'#cbdde8');scene.fog=new T.FogExp2(dark?'#92a7ba':'#dde7ed',.0018);sun.intensity=dark?.5:2.1;fill.intensity=dark?1.15:2.3;} }
 function switchWorld(camera:T.PerspectiveCamera){
  state='crossing';active=!active;
  if(active){savedBackground=scene.background;savedFog=scene.fog;}
  if(active)hallObjects.forEach(o=>hallVisibility.set(o,o.visible));
  hallObjects.forEach(o=>o.visible=active?false:hallVisibility.get(o)!);hall.visible=!active;arctic.visible=active;
  // A rigid half-turn maps the two doorway faces; preserve pitch and crossing depth.
  camera.position.x=active?-(camera.position.x+12):-camera.position.x-12;
  camera.position.z=active?-(camera.position.z+69.5):-camera.position.z-69.5;
  camera.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),Math.PI));
  camera.far=active?9000:220;camera.updateProjectionMatrix();
  if(active)appearance();else{scene.background=savedBackground;scene.fog=savedFog;}
  progress=1;state='open';previous.copy(camera.position);
 }
 return {get active(){return active;},get state(){return state;},hallSolids,snowSolids,
  activate(){if(state==='closed')state='opening';},
  move(position:T.Vector3,delta:T.Vector3,hallCollision:ReturnType<typeof createCollision>){(active?snowCollision:hallCollision)(position,delta);if(active){ground.position.x=position.x;ground.position.z=position.z;}},
  update(dt:number,reduced:boolean,camera:T.PerspectiveCamera){let changed=false;if(state==='opening'){progress=Math.min(1,progress+(reduced?1:dt/1.05));if(progress===1)state='open';changed=true;}
   entry.pivot.rotation.y=exit.pivot.rotation.y=-progress*Math.PI*.56;
   const centerX=active?0:-12,plane=active?1:-70.5;
   if(initialized&&state==='open'&&previous.z>plane&&camera.position.z<=plane){const t=(plane-previous.z)/(camera.position.z-previous.z);const crossingX=T.MathUtils.lerp(previous.x,camera.position.x,t);if(Math.abs(crossingX-centerX)<.72){switchWorld(camera);changed=true;}}
   previous.copy(camera.position);initialized=true;return changed;
  },
  returnToHall(camera:T.PerspectiveCamera){if(active){camera.position.set(0,1.65,-1.01);switchWorld(camera);camera.position.copy(thresholdAnchor);previous.copy(camera.position);}},
  setTheme(value:boolean){dark=value;if(active){savedBackground=scene.background;savedFog=scene.fog;}stone.color.set(dark?'#434b57':'#d8d2c6');wood.color.set(dark?'#58616a':'#777a74');appearance();},
  dispose(){hall.removeFromParent();arctic.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
 };
}
