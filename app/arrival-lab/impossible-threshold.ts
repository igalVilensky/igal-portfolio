import * as T from 'three';
import { createCollision } from './collision';

export type ThresholdState = 'closed' | 'opening' | 'open' | 'crossing';
export const thresholdAnchor = new T.Vector3(-12, 1.65, -69.4);
/** Live apertures preview isolated destinations; rigid crossings preserve camera orientation. */
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
  // A thin framed aperture carries a live destination view, never a blank mask.
  for(const side of [-1,1]){
   box(root,list,.10,3.1,.4,side*1.23,1.55,0,metal);
   const brace=box(root,list,.5,.12,.4,side*1.05,2.95,0,metal);brace.rotation.z=-side*.55;
  }
  box(root,list,2.4,.08,.4,0,3.1,0,warm);
  box(root,list,2.3,.06,.7,0,-.03,0,stone);
  const viewMaterial=new T.ShaderMaterial({uniforms:{view:{value:null}},vertexShader:`varying vec4 projected; void main(){projected=projectionMatrix*modelViewMatrix*vec4(position,1.0);gl_Position=projected;gl_Position.z=max(gl_Position.z,-gl_Position.w+.00001);}`,fragmentShader:`uniform sampler2D view; varying vec4 projected; void main(){vec2 uv=projected.xy/projected.w*.5+.5;gl_FragColor=texture2D(view,uv);
#include <colorspace_fragment>
}`,side:T.DoubleSide,toneMapped:false});
  materials.push(viewMaterial);const viewGeometry=new T.PlaneGeometry(2.04,2.77);geometries.push(viewGeometry);
  const aperture=new T.Mesh(viewGeometry,viewMaterial);aperture.position.set(0,1.385,-.015);aperture.userData.noCollision=true;root.add(aperture);
  return {root,pivot,leaf,aperture,viewMaterial};
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
 // Coastal street details: pale limestone, olive crowns, pergola and striped sunshades.
 const leaf=material('#71835a'),sand=material('#e5d2a6'),cloth=material('#f6faf1');
 build(38,.08,3,5,-.1,40,sand,false);
 for(const [x,z] of [[-9,29],[20,31]] as const){
  build(.22,2.6,.22,x,1.3,z,wood);
  const g=new T.IcosahedronGeometry(1.5,1);geometries.push(g);const crown=new T.Mesh(g,leaf);crown.scale.set(1,.65,1);crown.position.set(x,2.9,z);coast.add(crown);
 }
 for(const x of [6,12])build(.15,3,.15,x,1.5,30,wood);
 for(let i=0;i<8;i++)build(6.4,.12,.16,9,3,28+i*.5,wood,false);
 for(const x of [-7,18]){build(.08,2.6,.08,x,1.3,34,blue);for(let i=0;i<6;i++)build(.45,.1,2.5,x-1.125+i*.45,2.65,34,i%2?blue:cloth,false);}
 const walkers:Array<{root:T.Group;legs:T.Mesh[];x:number;z:number;range:number;phase:number}>=[];
 for(let i=0;i<4;i++){
  const person=new T.Group();coast.add(person);const legs:T.Mesh[]=[];
  box(person,[],.42,.65,.27,0,1.05,0,i%2?blue:coral);
  const headGeo=new T.SphereGeometry(.17,8,6);geometries.push(headGeo);const head=new T.Mesh(headGeo,blanket);head.position.y=1.58;person.add(head);
  for(const side of [-1,1])legs.push(box(person,[],.13,.7,.16,side*.12,.37,0,wood));
  const walker={root:person,legs,x:i<2?7+i*.85:17,z:i<2?32:28+i,range:i===3?0:i<2?4:2,phase:i<2?0:1.8};person.position.set(walker.x,0,walker.z);walkers.push(walker);
 }
 let ambientTime=0;
 const coastCollision=createCollision(coastSolids,'coast');

 const exit=door(arctic,snowSolids,0,0,true);exit.root.rotation.y=Math.PI;
 // The Arctic return frame shares the same live aperture and reversible crossing.
 const fill=new T.HemisphereLight('#d6e7f6','#8d9da9',2.3);arctic.add(fill);
 const sun=new T.DirectionalLight('#fff1db',2.1);sun.position.set(-80,90,-130);arctic.add(sun);
 const ground=box(arctic,[],12000,1,12000,0,-.55,0,snow);
 ground.userData.noCollision=true;
 // Low wind-carved tundra ridges, never alpine peaks. Deterministic, shared low-poly geometry.
 const ridgeGeo=new T.SphereGeometry(1,24,10);geometries.push(ridgeGeo);
 for(let i=0;i<38;i++){const angle=i*2.39996, r=210+(i%7)*100;const ridge=new T.Mesh(ridgeGeo,snow);ridge.position.set(Math.cos(angle)*r,-6,Math.sin(angle)*r);ridge.scale.set(95+(i%4)*24,9+(i%5)*2,60);arctic.add(ridge);}
 // The house is a memory-inspired vignette, not a historical reconstruction.
 const house=new T.Group();house.position.set(13,0,78);arctic.add(house);
 // Separate wall panels leave a 1.4m walk-through doorway and a real glazed opening.
 const wall=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=timber)=>box(house,snowSolids,w,h,d,x,y,z,m);
 wall(.22,3.1,5,-3,1.55,0);wall(.22,3.1,5,3,1.55,0);wall(6,3.1,.22,0,1.55,2.5);
 wall(.6,3.1,.22,-2.7,1.55,-2.5);wall(.7,3.1,.22,-.65,1.55,-2.5);
 wall(1.4,.7,.22,-1.7,2.75,-2.5);wall(1.2,3.1,.22,2.4,1.55,-2.5);
 wall(2.1,1.05,.22,.75,.525,-2.5);wall(2.1,.55,.22,.75,2.825,-2.5);
 box(house,[],5.8,.08,4.8,0,-.01,0,blanket);
 for(const side of [-1,1]){const panel=box(house,[],3.65,.2,6,side*1.52,3.65,0,roof);panel.rotation.z=-side*.42;}
 box(house,[],6,.16,5,0,3.12,0,timber);
 const glass=new T.MeshStandardMaterial({color:'#ffdfb3',transparent:true,opacity:.15,roughness:.18,depthWrite:false,side:T.DoubleSide});materials.push(glass);
 box(house,snowSolids,2.1,1.5,.035,.75,1.8,-2.5,glass);
 for(const x of [-.3,.75,1.8])box(house,[],.06,1.55,.12,x,1.8,-2.54,timber);
 for(const y of [1.04,2.56])box(house,[],2.2,.07,.18,.75,y,-2.54,blanket);
 // An open leaf rests against the inside wall; no trigger or teleport is needed.
 const cabinDoor=wall(.12,2.35,1.3,-2.35,1.175,-1.85,wood);cabinDoor.rotation.y=.08;
 wall(1.45,.35,2.15,1.85,.25,1,wood);box(house,[],1.4,.16,2.05,1.85,.5,1,blanket);
 wall(1.25,.12,.85,.25,.82,.6,wood);
 for(const x of [-.22,.72])wall(.08,.78,.08,x,.39,.6);
 box(house,[],.35,.06,.35,.25,.92,.6,metal);box(house,[],.07,.45,.07,.25,1.15,.6,metal);
 const shadeGeo=new T.ConeGeometry(.32,.35,12,1,true);geometries.push(shadeGeo);
 const shade=new T.Mesh(shadeGeo,warm);shade.position.set(.25,1.45,.6);house.add(shade);
 const glow=new T.PointLight('#ffc078',32,10,2);glow.position.set(.25,1.3,.6);house.add(glow);
 // Shadowed point lighting transmits through the window and open doorway only.
 glow.castShadow=true;glow.shadow.mapSize.set(512,512);glow.shadow.bias=-.002;
 house.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=o.material!==glass;o.receiveShadow=true;}});shade.castShadow=false;
 // Soft approach drifts make the field readable at walking height.
 for(let i=0;i<22;i++){const drift=new T.Mesh(ridgeGeo,snow);drift.position.set(Math.sin(i*3.7)*65,-.65,8+i*6);drift.scale.set(9,.75,3);arctic.add(drift);}
 solids.push(...hallSolids,...snowSolids,...coastSolids);
 let sunWorld=false;
 const doors=[{state:'closed' as ThresholdState,progress:0},{state:'closed' as ThresholdState,progress:0}];
 let selected=doors[0]!;
 let active=false,previous=new T.Vector3(),initialized=false,dark=false;
 let savedBackground:T.Scene['background'],savedFog:T.Scene['fog'],savedFar=220;
 const snowCollision=createCollision(snowSolids,'snow');
 function appearance(){if(active){if(sunWorld){scene.background=new T.Color('#b4def1');scene.fog=new T.Fog('#c5e5ee',150,1100);return;}scene.background=new T.Color(dark?'#647e98':'#cbdde8');scene.fog=new T.FogExp2(dark?'#92a7ba':'#dde7ed',.0018);sun.intensity=dark?.5:2.1;fill.intensity=dark?1.15:2.3;} }
 function switchWorld(camera:T.PerspectiveCamera){
  selected.state='crossing';active=!active;
  if(active){savedBackground=scene.background;savedFog=scene.fog;savedFar=camera.far;}
  if(active)hallObjects.forEach(o=>hallVisibility.set(o,o.visible));
  hallObjects.forEach(o=>o.visible=active?false:hallVisibility.get(o)!);hall.visible=!active;arctic.visible=active&&!sunWorld;coast.visible=active&&sunWorld;
  // A rigid half-turn maps the two doorway faces; preserve pitch and crossing depth.
  const hallX=sunWorld?12:-12;
  camera.position.x=active?-(camera.position.x-hallX):-camera.position.x+hallX;
  camera.position.z=active?-(camera.position.z+69.5):-camera.position.z-69.5;
  camera.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),Math.PI));
  camera.far=active?9000:savedFar;camera.updateProjectionMatrix();
  if(active)appearance();else{scene.background=savedBackground;scene.fog=savedFog;}
  selected.progress=1;selected.state='open';previous.copy(camera.position);
 }
 // One bounded offscreen pass per nearby open aperture, no recursive portals.
 const targets=[new T.WebGLRenderTarget(768,768),new T.WebGLRenderTarget(768,768)];
 targets.forEach(t=>{t.texture.colorSpace=T.SRGBColorSpace;});
 const portalCamera=new T.PerspectiveCamera(),primedViews=new Set<number>();
 const viewFrustum=new T.Frustum(),viewProjection=new T.Matrix4();
 function renderViews(renderer:T.WebGLRenderer,camera:T.PerspectiveCamera){
  camera.updateMatrixWorld();viewFrustum.setFromProjectionMatrix(viewProjection.multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  const candidates=active?[{door:sunWorld?sunExit:exit,index:sunWorld?1:0,x:0,z:0}]:[{door:entry,index:0,x:-12,z:-69.5},{door:sunEntry,index:1,x:12,z:-69.5}];
  for(const item of candidates){
   if(doors[item.index]!.progress<=0||Math.hypot(camera.position.x-item.x,camera.position.z-item.z)>22)continue;
   item.door.aperture.updateWorldMatrix(true,false);
   if(!viewFrustum.intersectsObject(item.door.aperture))continue;
   const target=targets[item.index]!,height=Math.max(256,Math.round(768/camera.aspect));if(target.height!==height)target.setSize(768,height);
   const visibility=scene.children.map(o=>[o,o.visible] as const),background=scene.background,fog=scene.fog,renderTarget=renderer.getRenderTarget(),clip=renderer.clippingPlanes;
   const shadowAuto=renderer.shadowMap.autoUpdate,shadowNeeds=renderer.shadowMap.needsUpdate;
   portalCamera.copy(camera);portalCamera.position.set(active?-camera.position.x+(sunWorld?12:-12):-(camera.position.x-item.x),camera.position.y,active?-camera.position.z-69.5:-(camera.position.z+69.5));
   portalCamera.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),Math.PI));portalCamera.far=active?savedFar:9000;portalCamera.updateProjectionMatrix();
   try{
    hallObjects.forEach(o=>o.visible=active?(hallVisibility.get(o)??true):false);hall.visible=active;arctic.visible=!active&&item.index===0;coast.visible=!active&&item.index===1;
    for(const d of [entry,sunEntry,exit,sunExit])d.aperture.visible=false;
    if(active){scene.background=savedBackground;scene.fog=savedFog;}else{scene.background=new T.Color(item.index?'#b4def1':dark?'#647e98':'#cbdde8');scene.fog=item.index?new T.Fog('#c5e5ee',150,1100):new T.FogExp2(dark?'#92a7ba':'#dde7ed',.0018);}
    renderer.clippingPlanes=[new T.Plane(new T.Vector3(0,0,1),active?69.49:-.01)];
    renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=!primedViews.has(item.index);renderer.setRenderTarget(target);renderer.render(scene,portalCamera);primedViews.add(item.index);
    item.door.viewMaterial.uniforms.view!.value=target.texture;
   }finally{
    visibility.forEach(([o,v])=>o.visible=v);for(const d of [entry,sunEntry,exit,sunExit])d.aperture.visible=true;
    scene.background=background;scene.fog=fog;renderer.clippingPlanes=clip;renderer.setRenderTarget(renderTarget);renderer.shadowMap.autoUpdate=shadowAuto;renderer.shadowMap.needsUpdate=shadowNeeds;
   }
  }
 }
 return {renderViews,get active(){return active;},get environment(){return active?(sunWorld?'sun-world':'antipayuta'):'hall';},get state(){return selected.state;},hallSolids,worldSolids:[...snowSolids,...coastSolids],snowSolids,
  activate(sun=false){if(!active){sunWorld=sun;selected=doors[sun?1:0]!;}if(selected.state==='closed')selected.state='opening';},
  move(position:T.Vector3,delta:T.Vector3,hallCollision:ReturnType<typeof createCollision>){(active?(sunWorld?coastCollision:snowCollision):hallCollision)(position,delta);if(active){ground.position.x=position.x;ground.position.z=position.z;}},
  update(dt:number,reduced:boolean,camera:T.PerspectiveCamera){let changed=false;
   if(active&&sunWorld&&!reduced){ambientTime+=dt;for(const p of walkers){const phase=ambientTime*.13+p.phase,travel=Math.sin(phase);p.root.position.set(p.x+travel*p.range,0,p.z);p.root.rotation.y=Math.cos(phase)>0?Math.PI/2:-Math.PI/2;for(const [i,leg] of p.legs.entries())leg.rotation.x=p.range?Math.sin(ambientTime*3+i*Math.PI)*.25*Math.abs(Math.cos(phase)):0;}changed=true;}
for(const doorway of doors){if(doorway.state==='opening'){doorway.progress=Math.min(1,doorway.progress+(reduced?1:dt/1.05));if(doorway.progress===1)doorway.state='open';changed=true;}}
   entry.pivot.rotation.y=exit.pivot.rotation.y=-doors[0]!.progress*Math.PI*.56;
   sunEntry.pivot.rotation.y=sunExit.pivot.rotation.y=-doors[1]!.progress*Math.PI*.56;
   if(!active&&Math.abs(camera.position.x)>10){sunWorld=camera.position.x>0;selected=doors[sunWorld?1:0]!;}
   const centerX=active?0:sunWorld?12:-12,plane=active?.02:-69.52;
   if(initialized&&selected.state==='open'&&previous.z>plane&&camera.position.z<=plane){const t=(plane-previous.z)/(camera.position.z-previous.z);const crossingX=T.MathUtils.lerp(previous.x,camera.position.x,t);if(Math.abs(crossingX-centerX)<.72){switchWorld(camera);changed=true;}}
   previous.copy(camera.position);initialized=true;return changed;
  },
  returnToHall(camera:T.PerspectiveCamera){if(active){camera.position.set(0,1.65,-1.01);switchWorld(camera);camera.position.copy(thresholdAnchor);if(sunWorld)camera.position.x=12;previous.copy(camera.position);}},
  setTheme(value:boolean){primedViews.clear();dark=value;if(active){savedBackground=scene.background;savedFog=scene.fog;}stone.color.set(dark?'#434b57':'#d8d2c6');wood.color.set(dark?'#58616a':'#777a74');appearance();},
  dispose(){targets.forEach(t=>t.dispose());hall.removeFromParent();arctic.removeFromParent();coast.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}
 };
}
