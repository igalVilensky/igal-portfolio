import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { lagoon, inBasin, inTunnel, tunnelFloor, lagoonFloor, inExpansion, marineRoute, marinePositionValid } from './lagoon-model';
import { expansionCopy } from './lagoon-copy';

/** Shared-scene aquatic sanctuary. Decorative instances never enter collision/pick lists. */
export function createLagoon(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='Living Lagoon & Creation Yard';scene.add(root);
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures:T.Texture[]=[];
 const own=<G extends T.BufferGeometry>(g:G)=>{geometries.add(g);return g;};
 const submersion={value:0};
 const mat=(color:string,extra:T.MeshStandardMaterialParameters={})=>{const m=new T.MeshStandardMaterial({color,roughness:.75,...extra});m.onBeforeCompile=shader=>{shader.uniforms.lagoonSubmersion=submersion;shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform float lagoonSubmersion;').replace('#include <opaque_fragment>','outgoingLight=mix(outgoingLight,vec3(.035,.32,.36),min(.65,max(0.,length(vViewPosition)-3.)*.025)*lagoonSubmersion);\n#include <opaque_fragment>');};materials.add(m);return m;};
 const stone=mat('#e5d8bd'),dark=mat('#466c73'),mint=mat('#78bfb0'),gold=mat('#c5a263',{metalness:.4}),sand=mat('#b3cdb7');
 function mesh(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,solid=false){const o=new T.Mesh(own(g),m);o.position.set(x,y,z);o.receiveShadow=true;root.add(o);if(solid){o.userData.room='living-lagoon';solids.push(o);}return o;}
 const cube=own(new T.BoxGeometry(1,1,1));
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=stone,solid=false){const o=mesh(cube,m,x,y,z,solid);o.scale.set(w,h,d);return o;}
 function rail(a:T.Vector3,b:T.Vector3){const o=box(a.distanceTo(b),.9,.25,(a.x+b.x)/2,.45,(a.z+b.z)/2,stone,true);o.rotation.y=-Math.atan2(b.z-a.z,b.x-a.x);o.userData.safetyBarrier=true;}
 // Clip terrace and basin triangles against the actual open tunnel corridor.
 // Shared cut edges leave neither a deck across the ramps nor a wall across the glass.
 function openCorridor(target:number[],vertices:number[][]){
  for(const [edge,sign] of [[-183.1,-1],[-176.9,1]]){
   let polygon=vertices;
   const clipped:number[][]=[];
   for(let i=0;i<polygon.length;i++){
    const a=polygon[i]!,b=polygon[(i+1)%polygon.length]!,insideA=(a[0]!-edge!)*sign!>=0,insideB=(b[0]!-edge!)*sign!>=0;
    if(insideA)clipped.push(a);
    if(insideA!==insideB){const t=(edge!-a[0]!)/(b[0]!-a[0]!);clipped.push([edge!,a[1]!+(b[1]!-a[1]!)*t,a[2]!+(b[2]!-a[2]!)*t]);}
   }
   for(let i=1;i+1<clipped.length;i++)for(const v of [clipped[0]!,clipped[i]!,clipped[i+1]!])target.push(...v);
  }
 }
 // Island shell with a true open basin: triangulated ring, no opaque deck over water.
 const positions:number[]=[];const count=64;
 for(let i=0;i<count;i++){const a=i/count*Math.PI*2,b=(i+1)/count*Math.PI*2;
  const p=[new T.Vector3(-170+32*Math.cos(a),0,65+27*Math.sin(a)),new T.Vector3(-170+32*Math.cos(b),0,65+27*Math.sin(b)),new T.Vector3(-170+41*Math.cos(a),0,65+39*Math.sin(a)),new T.Vector3(-170+41*Math.cos(b),0,65+39*Math.sin(b))];
  for(const tri of [[p[0]!,p[1]!,p[2]!],[p[1]!,p[3]!,p[2]!]])openCorridor(positions,tri.map(v=>v.toArray()));
  // Leave clear portals for the east bridge and south yard connection.
  const mid=(a+b)/2,x=-170+41*Math.cos(mid),z=65+39*Math.sin(mid);
  if(!(x> -184&&x< -176)&&!(x> -133&&Math.abs(z-62)<7)&&!(z>99&&x> -191&&x< -141))rail(p[2]!,p[3]!);
 }
 const ring=own(new T.BufferGeometry());ring.setAttribute('position',new T.Float32BufferAttribute(positions,3));ring.computeVertexNormals();mesh(ring,stone,0,0,0);
 const outerShell=mesh(new T.CylinderGeometry(41,41,11,64,1,true),stone,-170,-5.5,65);outerShell.scale.z=39/41;
 const keel=mesh(new T.CylinderGeometry(41,20,14,32,1,true),dark,-170,-18,65);keel.scale.z=39/41;
 const bed=mesh(new T.CylinderGeometry(32,24,5,48),sand,-170,-13.5,65);bed.scale.z=27/32;
 // Basin walls join the seabed and terrace, stopping at the beach opening.
 const wallPositions:number[]=[];
 for(let i=0;i<64;i++){const a=i/64*Math.PI*2,b=(i+1)/64*Math.PI*2;if(Math.cos((a+b)/2)>.96&&Math.abs(65+27*Math.sin((a+b)/2)-62)<7)continue;const p=[[-170+32*Math.cos(a),0,65+27*Math.sin(a)],[-170+32*Math.cos(b),0,65+27*Math.sin(b)],[-170+32*Math.cos(a),-11,65+27*Math.sin(a)],[-170+32*Math.cos(b),-11,65+27*Math.sin(b)]];for(const tri of [[p[0]!,p[1]!,p[2]!],[p[1]!,p[3]!,p[2]!]])openCorridor(wallPositions,tri);}
 const wall=own(new T.BufferGeometry());wall.setAttribute('position',new T.Float32BufferAttribute(wallPositions,3));wall.computeVertexNormals();const basinWall=mat('#9bbdb2',{side:T.DoubleSide});mesh(wall,basinWall,0,0,0);
 // Broad beach built with the exact height function used by swimming.
 const rampPositions:number[]=[];for(let i=0;i<17;i++){const x=-138-i;for(const v of [[x,lagoonFloor(x,62),56],[x-1,lagoonFloor(x-1,62),56],[x,lagoonFloor(x,62),68],[x,lagoonFloor(x,62),68],[x-1,lagoonFloor(x-1,62),56],[x-1,lagoonFloor(x-1,62),68]])rampPositions.push(...v);}
 const beach=own(new T.BufferGeometry());beach.setAttribute('position',new T.Float32BufferAttribute(rampPositions,3));beach.computeVertexNormals();mesh(beach,stone,0,.015,0);
 // Two physical approaches, with protective rails and open portals.
 box(26,.5,6,-120,-.25,62);for(const z of [59,65])rail(new T.Vector3(-108,0,z),new T.Vector3(-132,0,z));
 box(24.8,.5,14,-164.4,-.25,107);for(const x of [-183.2,-152])rail(new T.Vector3(x,0,100),new T.Vector3(x,0,114));
 box(48,2,40,-166,-1,132);box(43,.08,35,-166,.04,132,dark);
 rail(new T.Vector3(-190,0,152),new T.Vector3(-142,0,152));
 rail(new T.Vector3(-190,0,112),new T.Vector3(-181,0,112));rail(new T.Vector3(-151,0,112),new T.Vector3(-142,0,112));
 for(const x of [-190,-142])rail(new T.Vector3(x,0,112),new T.Vector3(x,0,152));
 for(const x of [-187,-145]){box(.7,8,.7,x,4,132,mint,true);box(.7,8,.7,x,4,149,mint,true);}
 box(44,.6,2,-166,8,132,mint);box(44,.6,2,-166,8,149,mint);
 // Grid is one draw, raised away from the platform to avoid z fighting.
 const grid=new T.GridHelper(40,40,'#91d2c6','#587d82');grid.position.set(-166,.09,132);grid.scale.z=.8;root.add(grid);geometries.add(grid.geometry);(Array.isArray(grid.material)?grid.material:[grid.material]).forEach(m=>materials.add(m));
 const station=box(2,1.4,1,-166,.7,114,mint,true);station.userData.creationYard=true;
 box(2.5,.15,1.5,-166,1.5,114,gold);
 // Terrace gate and monumental split stone crown.
 for(const z of [54,70])box(1.5,9,1.5,-134,4.5,z,stone,true);
 box(3,.65,19,-134,9,62,gold);
 const crown=mesh(new T.TorusGeometry(9,.65,8,40,Math.PI*1.6),stone,-178,6,34);crown.rotation.z=-.3;
 // Transparent dry passage: one open-ended viewing shell and regularly spaced structural ribs.
 const glass=mat('#b9e5df',{transparent:true,opacity:.16,roughness:.15,metalness:.1,side:T.DoubleSide,depthWrite:false});
 const tubePositions:number[]=[];
 for(let z=30;z<100;z+=5)for(let i=0;i<24;i++){
 const a=i/24*Math.PI,b=(i+1)/24*Math.PI;
 const p=[[-180+2.6*Math.cos(a),tunnelFloor(z)+4.8*Math.sin(a),z],[-180+2.6*Math.cos(b),tunnelFloor(z)+4.8*Math.sin(b),z],[-180+2.6*Math.cos(a),tunnelFloor(z+5)+4.8*Math.sin(a),z+5],[-180+2.6*Math.cos(b),tunnelFloor(z+5)+4.8*Math.sin(b),z+5]];
 for(const v of [p[0],p[1],p[2],p[1],p[3],p[2]])tubePositions.push(...v!);
 }
 const tube=own(new T.BufferGeometry());tube.setAttribute('position',new T.Float32BufferAttribute(tubePositions,3));tube.computeVertexNormals();mesh(tube,glass,0,0,0).renderOrder=2;
 for(let z=30;z<100;z++){const f0=tunnelFloor(z),f1=tunnelFloor(z+1);const g=own(new T.BufferGeometry());g.setAttribute('position',new T.Float32BufferAttribute([-183.1,f0,z,-183.1,f1,z+1,-176.9,f0,z,-176.9,f0,z,-183.1,f1,z+1,-176.9,f1,z+1],3));g.computeVertexNormals();mesh(g,stone,0,.02,0);}
 box(6.2,.25,4,-180,-.125,28);box(6.2,.25,4,-180,-.125,102);
 // Shared rib geometry; inexpensive opaque details, no lights per rib.
 const rib=own(new T.TorusGeometry(1,.045,5,24,Math.PI));
 for(let z=30;z<=100;z+=5){const f=tunnelFloor(z);const o=mesh(rib,gold,-180,f,z);o.scale.set(2.65,4.9,1);for(const x of [-182.2,-177.8])box(.09,.07,4.5,x,f+.12,z,mint);}
 // Continuous lower sills connect the viewing shell to the walking deck.
 for(const x of [-182.5,-177.5]){
  const path=new T.CurvePath<T.Vector3>();
  for(let z=30;z<100;z+=5)path.add(new T.LineCurve3(new T.Vector3(x,tunnelFloor(z)+.12,z),new T.Vector3(x,tunnelFloor(z+5)+.12,z+5)));
  mesh(new T.TubeGeometry(path,70,.12,5,false),mint,0,0,0);
 }
 for(const z of [30,100]){
  const frame=mesh(rib,stone,-180,tunnelFloor(z),z);frame.scale.set(2.8,5.05,3);
 }
 // Reef families use shared geometry and one instanced draw per family.
 const coralMats=['#ee977e','#ae82c5','#e0c779','#72b6ba'].map(c=>mat(c));
 const composite=(parts:T.BufferGeometry[])=>{const copies=parts.map(p=>{const q=p.index?p.toNonIndexed():p.clone();p.dispose();q.deleteAttribute('uv');return q;});const g=mergeGeometries(copies);copies.forEach(g=>g.dispose());if(!g)throw Error('Reef geometry');return own(g);};
 // Branching, lobed, layered plates, hollow tubes and fans: each colony is one shared geometry.
 const branches:T.BufferGeometry[]=[];
 for(let i=0;i<7;i++){
  const h=i===0?2:1.1+(i%3)*.25,a=i*2.4;
  const g=new T.CylinderGeometry(.07,.16,h,6);g.rotateZ(i===0?0:.5);g.rotateY(a);g.translate(Math.cos(a)*.4,h*.48,Math.sin(a)*.4);branches.push(g);
 }
 const lobes=Array.from({length:7},(_,i)=>new T.IcosahedronGeometry(.6,1).translate(Math.cos(i*2.4)*.55,.5+(i%3)*.28,Math.sin(i*2.4)*.55));
 const plates=Array.from({length:4},(_,i)=>new T.CylinderGeometry(1-i*.15,.85-i*.12,.13,12).translate(i%2*.25,.3+i*.4,0));
 const tubes=Array.from({length:5},(_,i)=>{const g=new T.CylinderGeometry(.19,.25,1+i%3*.35,9,1,true);g.translate(Math.cos(i*2.4)*.5,.5+i%3*.175,Math.sin(i*2.4)*.5);return g;});
 const fanParts:T.BufferGeometry[]=[];
 for(let i=0;i<9;i++){const g=new T.CylinderGeometry(.035,.075,1.8,5);g.rotateZ((i-4)*.19);g.translate(Math.sin((i-4)*.19)*.8,.9,0);fanParts.push(g);}
 const forms=[composite(branches),composite(lobes),composite(plates),composite(tubes),composite(fanParts)];
 const dummy=new T.Object3D();
 const clusters=[[-195,57],[-163,47],[-157,79],[-193,77]];
 forms.forEach((g,f)=>{const inst=new T.InstancedMesh(g,coralMats[f%4]!,36);inst.name='Lagoon · coral colonies';root.add(inst);for(let i=0;i<36;i++){
  const c=clusters[i%4]!,a=i*2.399+f*.7,r=i<4?0:1.5+(i%7)*.38;
  const scale=i<4?1.6:.35+(i%5)*.13;
  dummy.position.set(c[0]!+Math.cos(a)*r,-10.95,c[1]!+Math.sin(a)*r);
  dummy.rotation.set(0,a,0);dummy.scale.setScalar(scale);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix);
 }inst.instanceMatrix.needsUpdate=true;});
 // Recognizable landmarks: coral gate and pearl observatory, generous swim clearance.
 const arch=mesh(new T.TorusGeometry(4,.65,7,24,Math.PI),coralMats[0]!,-162,-10.8,57);arch.rotation.y=.5;
 const pearl=mesh(new T.IcosahedronGeometry(1.6,2),mat('#a7f3dc',{emissive:'#449b8f',emissiveIntensity:.5}),-193,-6.5,69);
 for(const x of [-196,-190])box(.6,5,.6,x,-8.5,69,stone);
 box(8,.5,5,-193,-10.5,69,stone);
 // Fish are a single instance batch. Their two schooling orbits avoid the dry passage.
 const body=new T.SphereGeometry(1,12,8);body.scale(.52,.25,.16);
 const head=new T.SphereGeometry(1,8,6);head.scale(.2,.22,.15);head.translate(.36,0,0);
 const fins=new T.BufferGeometry();fins.setAttribute('position',new T.Float32BufferAttribute([
 -.45,0,0,-.85,.32,0,-.85,-.32,0,
 -.12,.18,0,.05,.48,0,.3,.15,0,
 .1,-.1,0,-.12,-.36,.16,-.25,-.1,0,
 .1,-.1,0,-.25,-.1,0,-.12,-.36,-.16
 ],3));fins.computeVertexNormals();
 const fishGeo=composite([body,head,fins]);
 const fishMaterial=mat('#ffffff',{metalness:.15,side:T.DoubleSide});
 const fishTime={value:0},baseCompile=fishMaterial.onBeforeCompile;
 fishMaterial.onBeforeCompile=function(shader,renderer){baseCompile.call(this,shader,renderer);shader.uniforms.fishTime=fishTime;shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nuniform float fishTime;').replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed.z += sin(fishTime*6. + instanceMatrix[3].z)*.12*smoothstep(.25,.85,-position.x);');};
 const fish=new T.InstancedMesh(fishGeo,fishMaterial,48);fish.name='Lagoon · schooling fish';fish.instanceMatrix.setUsage(T.DynamicDrawUsage);for(let i=0;i<48;i++)fish.setColorAt(i,new T.Color(i<24?'#f3cd6a':'#86d9e1'));root.add(fish);
 // Five larger companions share body/fin geometry; only joints animate.
 const raySkin=mat('#537f91',{side:T.DoubleSide}),sharkSkin=mat('#8faeb7',{side:T.DoubleSide}),belly=mat('#d6e8d9');
 const rayBody=own(new T.SphereGeometry(1,16,10));rayBody.scale(.95,.18,.62);
 const sharkBody=own(new T.SphereGeometry(1,16,10));sharkBody.scale(1.2,.32,.36);
 const wingGeo=own(new T.BufferGeometry());wingGeo.setAttribute('position',new T.Float32BufferAttribute([
 .85,0,0,-.8,0,0,-.55,.06,.85, .85,0,0,-.55,.06,.85,.25,.08,1.05,
 .25,.08,1.05,-.55,.06,.85,-.35,-.02,1.65
 ],3));wingGeo.computeVertexNormals();
 const finGeo=own(new T.BufferGeometry());finGeo.setAttribute('position',new T.Float32BufferAttribute([.3,0,0,-.5,0,0,-.3,.7,0],3));finGeo.computeVertexNormals();
 const caudalGeo=own(new T.BufferGeometry());caudalGeo.setAttribute('position',new T.Float32BufferAttribute([0,0,0,-.75,.65,0,-.4,0,0,-.4,0,0,-.75,-.5,0,0,0,0],3));caudalGeo.computeVertexNormals();
 const eyeGeo=own(new T.SphereGeometry(.055,8,6)),eyeMaterial=mat('#243f4b');
 const tailGeo=own(new T.ConeGeometry(.065,2.1,7));tailGeo.rotateZ(-Math.PI/2);tailGeo.translate(-1.7,0,0);
 const companions=Array.from({length:5},(_,i)=>{
  const group=new T.Group();group.name=i<3?'Lagoon · gliding ray':'Lagoon · small peaceful shark';root.add(group);
  const add=(g:T.BufferGeometry,m:T.Material,parent:T.Object3D=group)=>{const o=new T.Mesh(g,m);parent.add(o);return o;};
  add(i<3?rayBody:sharkBody,i<3?raySkin:sharkSkin);
  for(const side of [-1,1]){const eye=add(eyeGeo,eyeMaterial);eye.position.set(i<3?.65:.92,.13,side*(i<3?.24:.25));}
  const underside=add(i<3?rayBody:sharkBody,belly);underside.scale.set(.85,.55,.88);underside.position.y=-.12;
  const joints:T.Group[]=[];
  if(i<3){add(tailGeo,raySkin);for(const side of [-1,1]){const joint=new T.Group();joint.scale.z=side;group.add(joint);add(wingGeo,raySkin,joint);joints.push(joint);}}
  else{
   const dorsal=add(finGeo,sharkSkin);dorsal.position.set(-.1,.22,0);
   for(const side of [-1,1]){const fin=add(finGeo,sharkSkin);fin.rotation.x=side*Math.PI/2;fin.position.set(.15,-.13,side*.22);fin.scale.set(1,.85,1);}
   const tail=new T.Group();tail.position.x=-1.05;group.add(tail);add(caudalGeo,sharkSkin,tail);joints.push(tail);
  }
  return {group,joints};
 });
 const marinePoint=new T.Vector3();
 const waterMaterial=new T.ShaderMaterial({transparent:true,side:T.DoubleSide,depthWrite:false,uniforms:{time:{value:0},night:{value:0}},vertexShader:`varying vec3 world;varying vec3 norm;uniform float time;void main(){vec4 w=modelMatrix*vec4(position,1.);w.y+=sin(w.x*.7+time)*.015+cos(w.z*.9-time*.7)*.01;world=w.xyz;norm=normalize(vec3(-.0105*cos(w.x*.7+time),1.,.009*sin(w.z*.9-time*.7)));gl_Position=projectionMatrix*viewMatrix*w;}`,fragmentShader:`varying vec3 world;varying vec3 norm;uniform float time;uniform float night;void main(){float tx=(world.x+180.)/2.6;float tf=-7.*min(clamp((world.z-30.)/15.,0.,1.),clamp((100.-world.z)/15.,0.,1.));if(abs(tx)<1.&&world.z>30.&&world.z<100.&&tf+4.8*sqrt(1.-tx*tx)>world.y)discard;vec3 view=normalize(cameraPosition-world);float f=pow(1.-abs(dot(view,norm)),3.);float ripple=sin(world.x*2.+world.z*1.1+time)*.5+.5;vec3 color=mix(vec3(.06,.58,.57),vec3(.39,.83,.76),f*.7+ripple*.12);color*=1.-night*.4;gl_FragColor=vec4(color,.28+f*.37);\n#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}`});materials.add(waterMaterial);
 const water=mesh(new T.CircleGeometry(1,64),waterMaterial,-170,lagoon.water,65);water.rotation.x=-Math.PI/2;water.scale.set(32,27,1);water.renderOrder=3;
 // Scoped underwater veil: only visible inside this volume, never mutates scene fog.
 const veilMat=new T.MeshBasicMaterial({color:'#087d8d',transparent:true,opacity:0,depthTest:false,depthWrite:false,side:T.DoubleSide});materials.add(veilMat);
 const veil=new T.Mesh(own(new T.PlaneGeometry(2,2)),veilMat);veil.frustumCulled=false;veil.renderOrder=100;root.add(veil);veil.visible=false;
 const particlesG=own(new T.BufferGeometry());const pts:number[]=[];for(let i=0;i<100;i++){const a=i*2.4,r=5+i%22;pts.push(-170+Math.cos(a)*r,-2-(i%17)*.47,65+Math.sin(a)*r*.8);}particlesG.setAttribute('position',new T.Float32BufferAttribute(pts,3));const particlesM=new T.PointsMaterial({color:'#d0f4df',size:.045,transparent:true,opacity:.4,depthWrite:false});materials.add(particlesM);const particles=new T.Points(particlesG,particlesM);root.add(particles);
 const signs:T.Mesh[]=[];
 function sign(x:number,y:number,z:number,rotation:number,key:'lagoon'|'yard'|'tunnel'|'build'){
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;const ctx=canvas.getContext('2d')!;
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
  const m=mat('#ffffff',{map:texture});const o=mesh(new T.BoxGeometry(6,1,.12),m,x,y,z);o.rotation.y=rotation;o.userData.label={canvas,ctx,texture,key};signs.push(o);
 }
 sign(-107,3,62,Math.PI/2,'lagoon');sign(-166,2.5,102,0,'yard');sign(-180,5.7,100,0,'tunnel');
 sign(-134,7.5,62,Math.PI/2,'lagoon');sign(-166,6.5,132,0,'yard');sign(-180,5.7,30,0,'tunnel');sign(-166,2.8,114,0,'build');
 function setLocale(locale:string){const c=expansionCopy[locale==='de'||locale==='ru'?locale:'en'];for(const o of signs){const {canvas,ctx,texture,key}=o.userData.label;ctx.fillStyle='#244b50';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#eff8db';ctx.font='bold 46px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(c[key as keyof typeof c],384,64);texture.needsUpdate=true;}}
 const batches=new Map<string,{material:T.Material;parts:T.BufferGeometry[];objects:T.Mesh[]}>();
 root.updateMatrixWorld(true);
 for(const o of [...root.children]){
  if(!(o instanceof T.Mesh)||o instanceof T.InstancedMesh||solids.includes(o)||![stone,dark,mint,gold,sand].includes(o.material as T.MeshStandardMaterial))continue;
  const material=o.material as T.Material,key=material.uuid+Object.keys(o.geometry.attributes).sort().join(',');
  if(!batches.has(key))batches.set(key,{material,parts:[],objects:[]});
  const part=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();part.applyMatrix4(o.matrixWorld);batches.get(key)!.parts.push(part);batches.get(key)!.objects.push(o);
 }
 for(const batch of batches.values()){
  if(batch.parts.length>1){const g=mergeGeometries(batch.parts);if(g){const m=new T.Mesh(own(g),batch.material);m.receiveShadow=true;root.add(m);batch.objects.forEach(o=>o.removeFromParent());}}
  batch.parts.forEach(g=>g.dispose());
 }
 const supportBounds:T.Box3[]=[];
 const nearby=new T.Vector3(-170,0,65),veilOffset=new T.Vector3();
 let time=0,initialized=false;

 return {root,setLocale,supportBounds,
 registerSupports(transport:T.Object3D){transport.updateMatrixWorld(true);transport.traverse(o=>{if(o instanceof T.Mesh&&o.name==='Cloudbreaker · offset bearing mast'&&inExpansion(o.position.x,o.position.z)){o.userData.room='coaster-support';o.userData.noCollision=false;if(!solids.includes(o))solids.push(o);supportBounds.push(new T.Box3().setFromObject(o));}});},
 update(dt:number,reduced:boolean,camera:T.PerspectiveCamera,present=true){
  const near=present&&camera.position.distanceToSquared(nearby)<160**2;
  const underwater=present&&inBasin(camera.position.x,camera.position.z)&&!inTunnel(camera.position.x,camera.position.y,camera.position.z);
  const target=underwater?T.MathUtils.smoothstep(lagoon.water-camera.position.y,0,.7)*.24:0;
  submersion.value=T.MathUtils.damp(submersion.value,target/.24,6,dt);
  const before=veilMat.opacity;veilMat.opacity=T.MathUtils.damp(before,target,6,dt);veil.visible=veilMat.opacity>.001;
  if(veil.visible){veil.position.copy(camera.position).add(veilOffset.set(0,0,-.12).applyQuaternion(camera.quaternion));veil.quaternion.copy(camera.quaternion);const h=Math.tan(T.MathUtils.degToRad(camera.fov/2))*.12;veil.scale.set(h*camera.aspect,h,1);}
  if(!near&&initialized)return Math.abs(before-veilMat.opacity)>.0001;
  if(reduced&&initialized)return Math.abs(before-veilMat.opacity)>.0001;
  initialized=true;
  if(!reduced)time+=dt;waterMaterial.uniforms.time!.value=time;
  fishTime.value=time;
  // Analytic clear swimming lanes keep schools away from reef masses and the dry shell.
  for(let i=0;i<48;i++){
   const east=i>=24,speed=east?.18:-.14,a=time*speed+(i%24)*Math.PI*2/24;
   const rx=east?2:.6,rz=east?7:17,dx=-Math.sin(a)*rx*speed,dz=Math.cos(a)*rz*speed;
   dummy.position.set((east?-151:-186)+Math.cos(a)*rx,-3-(i%6)*.65+Math.sin(a*2+i)*.12,64+Math.sin(a)*rz);
   dummy.rotation.set(0,Math.atan2(-dz,dx),Math.sin(a+i)*.035);dummy.scale.setScalar(.65+(i%4)*.1);dummy.updateMatrix();fish.setMatrixAt(i,dummy.matrix);
  }fish.instanceMatrix.needsUpdate=true;
  companions.forEach(({group,joints},i)=>{
   const distance=group.position.distanceTo(camera.position),response=distance<4?1-distance/4:0;
   const p=marineRoute(i,time,response);marinePoint.set(p.x,p.y,p.z);
   if(marinePositionValid(p)&&!supportBounds.some(b=>b.distanceToPoint(marinePoint)<2))group.position.copy(marinePoint);
   group.rotation.y=p.yaw;
   joints.forEach((joint,j)=>{if(i<3)joint.rotation.x=(j===0?1:-1)*Math.sin(time*1.6+i)*.24;else joint.rotation.y=Math.sin(time*4+i)*.18;});
  });
  pearl.rotation.y=reduced?0:time*.1;
  return !reduced||Math.abs(before-veilMat.opacity)>.0001;
 },setTheme(night:boolean){waterMaterial.uniforms.night!.value=night?1:0;},
 dispose(){root.traverse(o=>{if(o instanceof T.InstancedMesh)o.dispose();});root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}
 };
}
