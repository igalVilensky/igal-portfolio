import * as T from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** Static seasonal dressing, confined to home side bays and above circulation. */
export function createWinterHome(parent:T.Group,solids:T.Mesh[]){
 const root=new T.Group();root.name='Vilensky Home · winter holidays';parent.add(root);
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),colliders:T.Mesh[]=[];
 const material=(color:string,emissive=false)=>{const m=new T.MeshStandardMaterial({color,roughness:.72,metalness:emissive?.15:0,emissive:emissive?color:0,emissiveIntensity:emissive?1.1:0});materials.add(m);return m;};
 const pine=material('#315c50'),tips=material('#577b68'),brass=material('#c8a46b'),ivory=material('#f1e8d5'),blue=material('#698da9'),berry=material('#9f5159'),glow=material('#ffd28a',true),wood=material('#8b6950');
 const cube=new T.BoxGeometry(1,1,1),ball=new T.SphereGeometry(1,10,7),cylinder=new T.CylinderGeometry(1,1,1,10);[cube,ball,cylinder].forEach(g=>geometries.add(g));
 const add=(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,sx=1,sy=1,sz=1)=>{geometries.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);o.userData.noCollision=true;root.add(o);return o;};
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material)=>add(cube,m,x,y,z,w,h,d);
 const solid=(o:T.Mesh)=>{o.userData={room:'living-quarters',seasonal:true};solids.push(o);colliders.push(o);return o;};
 // Christmas corner: layered, slightly irregular bough silhouettes and a modest ornament palette.
 const tree=new T.Group();tree.name='Christmas · family tree';tree.position.set(100.4,0,23.5);root.add(tree);
 const parts:T.BufferGeometry[]=[];
 const core=new T.ConeGeometry(.75,2.9,20,6);core.translate(0,1.85,0);parts.push(core);
 for(let tier=0;tier<7;tier++)for(let branch=0;branch<9;branch++){
  const angle=branch/9*Math.PI*2+tier*.41,radius=1.02-tier*.125;
  const g=new T.ConeGeometry(.29-tier*.02,.88-tier*.045,8,2);g.rotateZ(-.78);g.rotateY(-angle);
  g.translate(Math.cos(angle)*radius*.68,.58+tier*.39,Math.sin(angle)*radius*.68);parts.push(g);
 }
 const boughs=mergeGeometries(parts)!;parts.forEach(g=>g.dispose());const foliage=add(boughs,pine,0,0,0);tree.add(foliage);
 const trunk=add(cylinder,wood,100.4,.28,23.5,.18,.56,.18);solid(trunk);
 solid(box(1.85,.4,1.85,100.4,.2,23.5,wood));
 const bulbGlow=glow.clone();materials.add(bulbGlow);const twinkleTime={value:0};
 bulbGlow.onBeforeCompile=shader=>{shader.uniforms.twinkleTime=twinkleTime;shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying float bulbPhase;').replace('#include <begin_vertex>','#include <begin_vertex>\nbulbPhase=instanceMatrix[3].x*2.7+instanceMatrix[3].y*3.1+instanceMatrix[3].z;');shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nuniform float twinkleTime; varying float bulbPhase;').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance*=.80+.20*sin(twinkleTime*.9+bulbPhase);');};
 const ornaments=new T.InstancedMesh(ball,brass,36),bulbs=new T.InstancedMesh(ball,bulbGlow,126),pose=new T.Object3D();
 ornaments.name='Christmas · ornaments';root.add(ornaments,bulbs);let bulb=0;
 for(let i=0;i<36;i++){
  const y=.65+(i%6)*.40,a=i*2.4,r=1.1-(y-.65)*.27;
  pose.position.set(100.4+Math.cos(a)*r,y,23.5+Math.sin(a)*r);pose.scale.setScalar(.075);pose.updateMatrix();ornaments.setMatrixAt(i,pose.matrix);
  ornaments.setColorAt(i,new T.Color(i%3===0?'#9f5159':i%3===1?'#efdfb2':'#8fa9bb'));
 }
 const garland:T.Vector3[]=[];
 for(let i=0;i<128;i++){const y=.52+i*.0215,a=i*.275,r=1.07-(y-.52)*.29;garland.push(new T.Vector3(100.4+Math.cos(a)*r,y,23.5+Math.sin(a)*r));}
 add(new T.TubeGeometry(new T.CatmullRomCurve3(garland),180,.018,5,false),brass,0,0,0);
 // One instanced batch for tree and overhead warm lights; no extra real-time lights.
 for(let i=0;i<64;i++){
  const y=.52+i*.043,a=i*.55,r=1.07-(y-.52)*.29;
  pose.position.set(100.4+Math.cos(a)*r,y,23.5+Math.sin(a)*r);pose.scale.setScalar(.035);pose.updateMatrix();bulbs.setMatrixAt(bulb++,pose.matrix);
 }
 for(const z of [13.2,25]){
  const points:T.Vector3[]=[];
  for(let i=0;i<=30;i++){
   const x=66+i*1.15,y=4.6-.20*Math.sin(i/30*Math.PI*4)**2;points.push(new T.Vector3(x,y,z));
   pose.position.set(x,y-.065,z);pose.scale.setScalar(.032);pose.updateMatrix();bulbs.setMatrixAt(bulb++,pose.matrix);
  }
  add(new T.TubeGeometry(new T.CatmullRomCurve3(points),60,.018,4,false),wood,0,0,0);
 }
 bulbs.count=bulb;bulbs.instanceMatrix.needsUpdate=true;ornaments.instanceMatrix.needsUpdate=true;
 // A small five-point star finial in warm gold.
 const star=new T.Shape();for(let i=0;i<10;i++){const a=i*Math.PI/5+Math.PI/2,r=i%2?.09:.21;const x=Math.cos(a)*r,y=Math.sin(a)*r;i?star.lineTo(x,y):star.moveTo(x,y);}star.closePath();
 add(cylinder,brass,100.4,3.46,23.5,.018,.30,.018);
 const starMaterial=material('#f2d394',true);starMaterial.side=T.DoubleSide;add(new T.ShapeGeometry(star),starMaterial,100.4,3.65,23.5);
 for(let i=0;i<3;i++){box(.38+i*.08,.28+i*.06,.35,99.7+i*.5,.14+i*.03,22.75,i%2?blue:berry);box(.045,.29+i*.06,.36,99.7+i*.5,.145+i*.03,22.75,ivory);}
 // Hanukkiah: eight equal candle holders plus a clearly raised central shamash.
 const hanukkiah=new T.Group();hanukkiah.name='Hanukkah · nine-light hanukkiah';root.add(hanukkiah);
 solid(box(2.3,.12,.85,68.1,.86,24.3,wood));for(const x of [67.15,69.05])box(.12,.8,.6,x,.4,24.3,wood);
 const part=(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number)=>{const o=add(g,m,x,y,z,sx,sy,sz);hanukkiah.attach(o);return o;};
 part(cube,brass,68.1,.985,24.3,1.7,.13,.22);part(cylinder,brass,68.1,1.13,24.3,.055,.32,.055);
 for(let i=0;i<9;i++){
  const x=67.3+i*.2,h=i===4?.48:.29;
  part(cylinder,brass,x,1.02+h/2,24.3,.025,h,.025);
  part(cylinder,brass,x,1.02+h,24.3,.065,.05,.065);
  const candle=part(cylinder,i%2?blue:ivory,x,1.18+h,24.3,.035,.28,.035);candle.name=i===4?'Shamash':'Hanukkah candle';
  const flame=part(ball,glow,x,1.35+h,24.3,.028,.065,.028);flame.name='Warm candle flame';
 }
 // A pair of small dreidels, away from the movement corridor.
 for(const x of [67.35,68.85]){const d=box(.16,.20,.16,x,1.03,24.55,blue);d.rotation.y=Math.PI/4;add(cylinder,brass,x,1.17,24.55,.025,.10,.025);}
 // Snow stays on outdoor canopy/roof tops, never on the indoor walking floor.
 box(5.1,.07,6.1,62.5,5.39,19,ivory);
 for(const [x,w,z] of [[82,36,0],[84,38,38]])box(w!,.07,.7,x!,5.40,z!,ivory);
 for(const x of [78,91]){const folded=box(1.2,.07,.5,x,.515,24,berry);folded.name='Winter · folded wool throw';}
 // Merge stationary decorations by material. Instanced lights remain two shared batches.
 root.updateMatrixWorld(true);const toLocal=root.matrixWorld.clone().invert();
 for(const m of materials){
  const meshes:T.Mesh[]=[];root.traverse(o=>{if(o instanceof T.Mesh&&!(o instanceof T.InstancedMesh)&&o.material===m&&!colliders.includes(o))meshes.push(o);});
  const parts=meshes.map(o=>{const g=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();g.deleteAttribute('uv');g.applyMatrix4(toLocal.clone().multiply(o.matrixWorld));return g;});
  if(parts.length){const merged=mergeGeometries(parts);if(merged){const batch=add(merged,m,0,0,0);batch.name='Winter · static decoration';meshes.forEach(o=>o.removeFromParent());}}
  parts.forEach(g=>g.dispose());
 }
 let time=0;
 return {root,update(dt:number,reduced:boolean){if(reduced){twinkleTime.value=0;return false;}time+=Math.min(.2,Math.max(0,dt));twinkleTime.value=time;return true;},dispose(){root.traverse(o=>{if(o instanceof T.InstancedMesh)o.dispose();});root.removeFromParent();for(const o of colliders){const i=solids.indexOf(o);if(i>=0)solids.splice(i,1);}geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());}};
}
