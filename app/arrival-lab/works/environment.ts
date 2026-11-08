import * as T from 'three';
import { weightedResults } from './matrix';
import { worksCopy } from './copy';
import { worksPalette } from './palette';

/** One engineered annex, reached through the existing light well. No Arrival geometry is moved. */
export function createWorks(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();scene.add(root);
 const geometries:T.BufferGeometry[]=[],materials:T.Material[]=[],textures:T.Texture[]=[];
 const own=(color:string,metalness=0,roughness=.75)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m;};
 const p=worksPalette.light;
 const shell=own(p.shell,0,.88),floor=own(p.floor,.08,.58),metal=own(p.blue,.22,.36),bronze=own(p.yellow,.28,.42),inset=own(p.inset,.25,.48);
 const red=own(p.red,.12,.48),green=own(p.green,.18,.4),steel=own(p.steel,.65,.3);
 const criterionMaterials=[own(p.green,.2,.38),own('#688bbd',.25,.4),own(p.yellow,.25,.42)];
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material= shell,id?:string):T.Mesh{const g=new T.BoxGeometry(w,h,d);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;if(id)mesh.userData.works=id;root.add(mesh);solids.push(mesh);return mesh;}
 function beam(a:T.Vector3,b:T.Vector3,width:number,m:T.Material){const mesh=box(width,1,width,0,0,0,m);mesh.userData.passage=true;const place=(a:T.Vector3,b:T.Vector3)=>{mesh.position.copy(a).add(b).multiplyScalar(.5);mesh.scale.y=a.distanceTo(b);mesh.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());};place(a,b);return {mesh,place};}
 const labels:{canvas:HTMLCanvasElement;texture:T.CanvasTexture;mesh:T.Mesh;draw:(text:string,sub?:string)=>void}[]=[];
 function label(w:number,h:number,x:number,y:number,z:number,rotation=0){
  const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=280;
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
  const m=new T.MeshBasicMaterial({map:texture,toneMapped:false});materials.push(m);const g=new T.PlaneGeometry(w,h);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.rotation.y=rotation;root.add(mesh);
  const draw=(text:string,sub='')=>{const ctx=canvas.getContext('2d')!;ctx.fillStyle='#23343c';ctx.fillRect(0,0,1200,280);ctx.fillStyle='#e1d8c4';ctx.font='48px monospace';ctx.fillText(text,36,108,1120);ctx.fillStyle='#a9bbb8';ctx.font='26px monospace';ctx.fillText(sub,36,205,1120);texture.needsUpdate=true;};
  const entry={canvas,texture,mesh,draw};labels.push(entry);return entry;
 }
 // An offset compression hall: heavy concrete below, pale folded roof, bronze bearing details.
 // Arrival's existing slab reaches x=25.5, z=-108. Tile the remaining footprint;
 // the old full annex slab and bridge duplicated its y=0 surface.
 box(28.5,1,40,39.75,-.5,-94,floor);
 box(11.5,1,6,19.75,-.5,-111,floor);
 box(1,23,16,15,11.5,-84);box(1,23,16,15,11.5,-104);box(1,15,4,15,15.5,-94);
 box(40,24,1,34,12,-114);box(40,24,1,34,12,-74);box(1,24,40,54,12,-94);
 // Passage side cheeks and a low lintel form a deliberate change in scale.
 // Lower light-well wall ends stop at the outer cheek edges; the inner faces stay at z=-92/-96.
 for(const z of [-91.6,-96.4])box(5,8,.8,12,4,z,metal);
 box(7,.8,5,12,8,-94,metal);
 box(40,1.2,13,34,23,-80);box(40,1.2,13,34,21,-108);
 // Three chamfered portal frames run across the annex, perpendicular to entry.
 // They bear against the perimeter, leaving the entire central walking field open.
 const frameShape=new T.Shape();
 const outline=[[-112.8,0],[-112.8,16],[-109,20.3],[-79,20.3],[-75.2,16],[-75.2,0],[-76.6,0],[-76.6,15.5],[-79.7,18.8],[-108.3,18.8],[-111.4,15.5],[-111.4,0]];
 outline.forEach(([z,y],i)=>i?frameShape.lineTo(z!,y!):frameShape.moveTo(z!,y!));frameShape.closePath();
 const frameGeometry=new T.ExtrudeGeometry(frameShape,{depth:1.15,steps:1,bevelEnabled:true,bevelSegments:1,bevelSize:.08,bevelThickness:.08});geometries.push(frameGeometry);
 for(const x of [20,35,53]){
  const frame=new T.Mesh(frameGeometry,metal);frame.rotation.y=-Math.PI/2;frame.position.x=x;frame.castShadow=true;frame.receiveShadow=true;root.add(frame);solids.push(frame);
  box(1.15,2.1,1.1,x-.575,21.35,-80,steel);
  for(const z of [-112,-76])box(2.4,.35,2.5,x,.175,z,steel);
 }
 // The red fascia is the deep edge of the south roof, carried by the blue frames.
 box(38,3.1,1.3,34,19.4,-102.1,red);
 box(38,.16,1.48,34,21.03,-102.1,shell);
 // Open roof bay remains genuinely open. Green fixed solar fins share a perimeter carrier.
 box(.65,.65,14,52.5,22.6,-94,steel);
 for(const z of [-99,-95,-91,-87]){
  const fin=box(3.2,4,.3,51.7,20.6,z,green);fin.rotation.y=-.32;
 }
 // Painted mineral threshold and an inset guide follow the clear approach aisle.
 box(6,.018,3.65,12,.012,-94,bronze);
 box(31,.018,.24,33.5,.012,-88.8,bronze);
 box(.24,.018,17,49,.012,-97.2,bronze);
 // Fine floor joints stay below the visitor disk; no coplanar duplicate slabs.
 for(const x of [26,32,38,44,50])box(.018,.008,38,x,.005,-94,steel);
 for(const z of [-110,-104,-98,-92,-86,-80])box(28,.008,.018,39.5,.005,z,steel);
 const entrance=box(.12,2.2,4.5,9.9,3,-89.5,inset,'gallery');
 const entryLabel=label(4.4,1.1,9.82,3.1,-89.5,-Math.PI/2);entryLabel.mesh.userData.works='gallery';solids.push(entryLabel.mesh);
 const titleLabel=label(9,2,22,13,-113.4);
 // Matrix installation: three weighted input blades feed two stacked sums.
 box(16,.3,8,32,.15,-101,inset,'matrix');
 beam(new T.Vector3(24,1,-104),new T.Vector3(24,17,-104),.45,metal);
 beam(new T.Vector3(40,1,-104),new T.Vector3(40,17,-104),.45,metal);
 beam(new T.Vector3(24,17,-104),new T.Vector3(40,17,-104),.55,bronze);
 const blades=[26,32,38].map((x,i)=>{box(2.8,.35,2.4,x,.3,-98,bronze,'matrix');box(.45,3.5,.6,x,2,-98,metal,'matrix');const blade=box(1.3,1,.55,x,3,-98,criterionMaterials[i],'matrix');const shape=new T.Shape([new T.Vector2(-.65,-.5),new T.Vector2(.65,-.5),new T.Vector2(.65,.15),new T.Vector2(-.25,.5),new T.Vector2(-.65,.5)]);const geometry=new T.ExtrudeGeometry(shape,{depth:.55,bevelEnabled:false});geometries.push(geometry);blade.geometry=geometry;blade.userData.criterion=i;return blade;});
 const criterionLabels=[26,32,38].map(x=>label(3.4,.8,x,1.25,-96.9));
 for(const x of [29,35])box(1.2,3.5,1.2,x,2,-104,metal,'matrix');
 const stacks=[29,35].map(x=>[0,1,2].map(i=>{const mesh=box(2.4,1,1.7,x,3,-104,criterionMaterials[i],'matrix');const geometry=new T.CylinderGeometry(1.15,1.15,1,32);geometries.push(geometry);mesh.geometry=geometry;return mesh;}));
 const links=stacks.map((_,o)=>blades.map((_,i)=>beam(new T.Vector3(),new T.Vector3(1,1,1),.09,criterionMaterials[i]!)));
 const sumLabels=[29,35].map(x=>label(4,1,x,11,-102.9));
 const legend=label(9,1.5,32,14.7,-103.6);legend.mesh.userData.works='matrix';solids.push(legend.mesh);
 // Floor-bearing operator rail: the HTML reading surface follows this physical face.
 box(8.6,3.9,.45,28,2.3,-92.8,inset,'matrix');
 for(const x of [24.5,31.5])box(.4,1,1.4,x,.5,-92.8,metal,'matrix');
 box(9,.18,.85,28,4.3,-92.6,bronze,'matrix');
 const operatorLabel=label(7.8,3.4,28,2.3,-92.55);operatorLabel.mesh.userData.works='matrix';solids.push(operatorLabel.mesh);
 // Archive is cut into the boundary, with a deep reveal and a floor-bearing reading sill.
 box(10,8,.8,46,4,-112,inset,'archive');box(11,.3,1.4,46,8.1,-111.7,bronze,'archive');
 for(const x of [40.8,51.2])box(.35,8,1,x,4,-111.5,metal,'archive');
 box(10,.25,2,46,.7,-110.7,metal,'archive');
 const archiveLabel=label(9.4,4.6,46,4.2,-111.5);archiveLabel.mesh.userData.works='archive';solids.push(archiveLabel.mesh);
 // A single shadowed daylight source shines through the real open roof bay.
 const daylight=new T.SpotLight('#fff0d6',6500,85,.63,.65,1.5);
 daylight.position.set(30,36,-91);daylight.target.position.set(39,0,-96);
 daylight.castShadow=true;daylight.shadow.mapSize.set(1024,1024);daylight.shadow.bias=-.0003;daylight.shadow.normalBias=.06;
 root.add(daylight,daylight.target);
 const lamps=[new T.PointLight('#fff0d4',700,38,1.6),new T.PointLight('#ffdfac',220,22,1.7)];
 lamps[0]!.position.set(24,13,-87);lamps[1]!.position.set(44,11,-107);lamps.forEach(l=>root.add(l));
 let target=[3,3,3],current=[3,3,3],selected=0,locale='en',changing=true;
 function text(){const c=worksCopy[locale as keyof typeof worksCopy]||worksCopy.en;titleLabel.draw(c.name,c.boundary);operatorLabel.draw('Decision Matrix AI',c.inspect+' →');entryLabel.draw(c.name,'→ '+c.open);legend.draw('Decision Matrix AI',c.focus);archiveLabel.draw(c.archive,c.archiveHint);criterionLabels.forEach((l,i)=>l.draw(`${i+1} / ${c.criteria[i]}`,`${c.weight} ${target[i]} × ${c.score} A:${[5,2,3][i]} B:${[2,5,4][i]}`));const r=weightedResults(target);sumLabels.forEach((l,i)=>l.draw(`${c.option} ${i?'B':'A'} / ${r[i]!.total}`,`${r[i]!.percent}% · ${c.total}`));}
 function update(dt:number,reduced:boolean){if(!changing)return false;let changed=false;current=current.map((v,i)=>{const n=reduced?target[i]!:T.MathUtils.damp(v,target[i]!,7,dt);if(Math.abs(n-v)>.0001)changed=true;return Math.abs(n-target[i]!)<.0001?target[i]!:n;});changing=current.some((v,i)=>v!==target[i]);
  blades.forEach((b,i)=>{b.scale.y=1+current[i]!;b.position.y=4+b.scale.y/2;});
  stacks.forEach((stack,o)=>{let y=4;stack.forEach((mesh,i)=>{const h=current[i]!*([5,2,3,2,5,4][o*3+i]!)/5;mesh.scale.y=h;mesh.position.y=y+h/2;links[o]![i]!.place(new T.Vector3(blades[i]!.position.x,blades[i]!.position.y+blades[i]!.scale.y/2,-98),new T.Vector3(mesh.position.x,mesh.position.y,-103.1));y+=h+.08;});sumLabels[o]!.mesh.position.y=y+1;});return changed;
 }
 function setTheme(dark:boolean){
  const p=worksPalette[dark?'dark':'light'];
  for(const [m,color] of [[shell,p.shell],[floor,p.floor],[metal,p.blue],[bronze,p.yellow],[red,p.red],[green,p.green],[steel,p.steel],[inset,p.inset]] as const)m.color.set(color);
  daylight.color.set(dark?'#c5d5e8':'#fff0d6');daylight.intensity=dark?1400:6500;
  lamps[0]!.color.set(dark?'#d5dfeb':'#fff0d4');lamps[0]!.intensity=dark?440:700;
  lamps[1]!.color.set(dark?'#f4d4a5':'#ffdfac');lamps[1]!.intensity=dark?380:220;
 }
 text();update(1,true);
 return {entrance,setTheme,consoleStyle(camera:T.Camera,width:number,height:number){
  camera.updateMatrixWorld();const a=new T.Vector3(24,4.15,-92.55).project(camera),b=new T.Vector3(32,.45,-92.55).project(camera);
  return {left:`${(a.x+1)*width/2}px`,top:`${(1-a.y)*height/2}px`,width:`${(b.x-a.x)*width/2}px`,height:`${(a.y-b.y)*height/2}px`,bottom:'auto'};
 },setLocale(value:string){locale=value;text();},setWeights(values:number[],criterion=selected){target=[...values];changing=true;selected=criterion;criterionMaterials.forEach((m,i)=>{m.emissive.set(i===selected?'#a58b58':'#000000');m.emissiveIntensity=i===selected?.2:0;});text();},update,
 dispose(){daylight.shadow.dispose();root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}}
}
