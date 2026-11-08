import * as T from 'three';
import { weightedResults } from './matrix';
import { worksCopy } from './copy';

/** One engineered annex, reached through the existing light well. No Arrival geometry is moved. */
export function createWorks(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();scene.add(root);
 const geometries:T.BufferGeometry[]=[],materials:T.Material[]=[],textures:T.Texture[]=[];
 const own=(color:string,metalness=0,roughness=.75)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m;};
 const shell=own('#cec7b6'),floor=own('#bdb9ad',.12),metal=own('#677477',.6,.35),bronze=own('#a08758',.65,.4),inset=own('#26383e',.3);
 const criterionMaterials=[own('#ae8550',.6),own('#768f91',.6),own('#898778',.6)];
 const lightMat=new T.MeshBasicMaterial({color:'#ecede4'});materials.push(lightMat);
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
 box(7,.8,5,12,8,-94,bronze);
 box(40,1.2,13,34,23,-80);box(40,1.2,13,34,21,-108);
 box(38,.12,3,34,23.6,-94,lightMat);
 for(const x of [19,53]){
  const rib=beam(new T.Vector3(x,0,-112),new T.Vector3(x-3,22,-78),1.4,metal);rib.mesh.castShadow=true;
  box(2.8,.4,4,x,.2,-111,bronze);
 }
 // A single oblique overhead load path, rather than repeated exhibition stands.
 beam(new T.Vector3(18,18,-111),new T.Vector3(52,22,-78),2,shell);
 for(const z of [-86,-94])box(37,.025,.045,34,.015,z,bronze);
 box(.05,.025,33,22,.02,-95,bronze);
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
 const lamps=[new T.PointLight('#e6e8da',1000,60,1.6),new T.PointLight('#dfbd83',280,28,1.7)];lamps[0]!.position.set(32,18,-90);lamps[1]!.position.set(32,8,-100);lamps.forEach(l=>root.add(l));
 let target=[3,3,3],current=[3,3,3],selected=0,locale='en',changing=true;
 function text(){const c=worksCopy[locale as keyof typeof worksCopy]||worksCopy.en;titleLabel.draw(c.name,c.boundary);operatorLabel.draw('Decision Matrix AI',c.inspect+' →');entryLabel.draw(c.name,'→ '+c.open);legend.draw('Decision Matrix AI',c.focus);archiveLabel.draw(c.archive,c.archiveHint);criterionLabels.forEach((l,i)=>l.draw(`${i+1} / ${c.criteria[i]}`,`${c.weight} ${target[i]} × ${c.score} A:${[5,2,3][i]} B:${[2,5,4][i]}`));const r=weightedResults(target);sumLabels.forEach((l,i)=>l.draw(`${c.option} ${i?'B':'A'} / ${r[i]!.total}`,`${r[i]!.percent}% · ${c.total}`));}
 function update(dt:number,reduced:boolean){if(!changing)return false;let changed=false;current=current.map((v,i)=>{const n=reduced?target[i]!:T.MathUtils.damp(v,target[i]!,7,dt);if(Math.abs(n-v)>.0001)changed=true;return Math.abs(n-target[i]!)<.0001?target[i]!:n;});changing=current.some((v,i)=>v!==target[i]);
  blades.forEach((b,i)=>{b.scale.y=1+current[i]!;b.position.y=4+b.scale.y/2;});
  stacks.forEach((stack,o)=>{let y=4;stack.forEach((mesh,i)=>{const h=current[i]!*([5,2,3,2,5,4][o*3+i]!)/5;mesh.scale.y=h;mesh.position.y=y+h/2;links[o]![i]!.place(new T.Vector3(blades[i]!.position.x,blades[i]!.position.y+blades[i]!.scale.y/2,-98),new T.Vector3(mesh.position.x,mesh.position.y,-103.1));y+=h+.08;});sumLabels[o]!.mesh.position.y=y+1;});return changed;
 }
 function setTheme(dark:boolean){shell.color.set(dark?'#303c48':'#cec7b6');floor.color.set(dark?'#242f39':'#bdb9ad');metal.color.set(dark?'#6c8290':'#677477');bronze.color.set(dark?'#b19c72':'#a08758');inset.color.set(dark?'#192b38':'#26383e');lamps[0]!.color.set(dark?'#a7c5dd':'#e6e8da');lamps[0]!.intensity=dark?1300:1000;}
 text();update(1,true);
 return {entrance,setTheme,consoleStyle(camera:T.Camera,width:number,height:number){
  camera.updateMatrixWorld();const a=new T.Vector3(24,4.15,-92.55).project(camera),b=new T.Vector3(32,.45,-92.55).project(camera);
  return {left:`${(a.x+1)*width/2}px`,top:`${(1-a.y)*height/2}px`,width:`${(b.x-a.x)*width/2}px`,height:`${(a.y-b.y)*height/2}px`,bottom:'auto'};
 },setLocale(value:string){locale=value;text();},setWeights(values:number[],criterion=selected){target=[...values];changing=true;selected=criterion;criterionMaterials.forEach((m,i)=>{m.emissive.set(i===selected?'#a58b58':'#000000');m.emissiveIntensity=i===selected?.2:0;});text();},update,
 dispose(){root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}}
}
