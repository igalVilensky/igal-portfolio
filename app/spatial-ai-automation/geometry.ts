import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { flowforge, TRANSMISSION_SECONDS, type WorkflowGraph, type Language } from './model';
export function createGraph(language:Language,dark:boolean,definition:WorkflowGraph=flowforge){
 const {nodes,connections}=definition;
 const root=new T.Group(),picks:T.Object3D[]=[],materials:T.Material[]=[],textures:T.Texture[]=[],geometries:T.BufferGeometry[]=[];
 const mat=(color:string,metalness=.45)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness:.35});materials.push(m);return m;};
 const body=mat(dark?'#263e56':'#a9bfd1'),front=mat(dark?'#142539':'#e6eff6',.25),accent=mat(dark?'#82d4de':'#087e98');
 const box=new RoundedBoxGeometry(2.05,1.22,.34,3,.10);geometries.push(box);
 const face=new RoundedBoxGeometry(1.93,1.10,.06,3,.07);geometries.push(face);
 const portGeo=new T.CylinderGeometry(.075,.075,.13,12);portGeo.rotateZ(Math.PI/2);geometries.push(portGeo);
 const labelGeo=new T.PlaneGeometry(1.8,.85);geometries.push(labelGeo);
 const nodeObjects=new Map<string,T.Group>();
 function port(id:string,name:string,input=false){const n=nodes.find(n=>n.id===id)!;const ports=input?n.inputs:n.outputs;return new T.Vector3(n.position[0]+(input?-1.10:1.10),n.position[1]+(ports.length===2?(ports.indexOf(name)===0?.22:-.22):0),n.position[2]+.18);}
 for(const [i,n] of nodes.entries()){
  const group=new T.Group();group.position.set(...n.position);root.add(group);nodeObjects.set(n.id,group);
  const b=new T.Mesh(box,body);group.add(b);b.userData={node:n.id};picks.push(b);
  const f=new T.Mesh(face,front);f.position.z=.19;group.add(f);
  const canvas=document.createElement('canvas');canvas.width=768;canvas.height=360;const ctx=canvas.getContext('2d')!;
  ctx.fillStyle=dark?'#9db2c4':'#516b7e';ctx.font='32px monospace';ctx.fillText(`${String(i+1).padStart(2,'0')} / ${({input:{en:'INPUT',de:'EINGABE',ru:'ВХОД'},decision:{en:'CHECK',de:'PRÜFUNG',ru:'ПРОВЕРКА'},operation:{en:'PROCESS',de:'PROZESS',ru:'ОБРАБОТКА'},output:{en:'OUTPUT',de:'AUSGABE',ru:'ВЫХОД'}}[n.type])[language]}`,32,62);
  ctx.fillStyle=dark?'#e0edf4':'#203b50';ctx.font='500 80px sans-serif';let y=150,line='';for(const word of n.title[language].split(' ')){if(ctx.measureText(line+word).width>680){ctx.fillText(line.trim(),32,y,700);line='';y+=88;}line+=word+' ';}ctx.fillText(line.trim(),32,y,700);
  ctx.fillStyle=dark?'#82d4de':'#087e98';ctx.font='30px monospace';ctx.fillText(n.type==='output'?({en:'◈  DRAFT / OFFLINE',de:'◈  ENTWURF / OFFLINE',ru:'◈  ЧЕРНОВИК / ОФЛАЙН'})[language]:'→  FLOWFORGE',32,310);
  const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);const lm=new T.MeshBasicMaterial({map:texture,transparent:true});materials.push(lm);const label=new T.Mesh(labelGeo,lm);label.position.z=.231;group.add(label);
  for(const input of [true,false])for(const name of input?n.inputs:n.outputs){const p=new T.Mesh(portGeo,accent);p.position.copy(port(n.id,name,input)).sub(new T.Vector3(...n.position));group.add(p);}
 }
 const edges=connections.map(e=>{
  const a=port(e.source,e.sourcePort),b=port(e.target,e.targetPort,true);const distance=Math.max(.5,(b.x-a.x)*.48);
  const curve=new T.CubicBezierCurve3(a,a.clone().add(new T.Vector3(distance,0,0)),b.clone().sub(new T.Vector3(distance,0,0)),b);
  const geo=new T.TubeGeometry(curve,48,.022,6,false);geometries.push(geo);const material=mat(dark?'#50718e':'#6e8ba4');const mesh=new T.Mesh(geo,material);mesh.userData={edge:e.id};root.add(mesh);picks.push(mesh);
  const pickGeo=new T.TubeGeometry(curve,32,.11,5,false);geometries.push(pickGeo);const invisible=new T.MeshBasicMaterial({visible:false});materials.push(invisible);const pick=new T.Mesh(pickGeo,invisible);pick.userData={edge:e.id};root.add(pick);picks.push(pick);
  if(e.label){const c=document.createElement('canvas');c.width=640;c.height=96;const ctx=c.getContext('2d')!;ctx.fillStyle=dark?'#9db2c4':'#516b7e';ctx.font='48px sans-serif';ctx.textAlign='center';ctx.fillText(e.label[language],320,64,610);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;textures.push(tex);const m=new T.SpriteMaterial({map:tex,depthTest:false});materials.push(m);const label=new T.Sprite(m);label.scale.set(2.5,.40,1);label.position.copy(curve.getPoint(e.condition==='ready'?.5:.4)).add(new T.Vector3(e.condition==='ready'?0:-.8,e.condition==='ready'?.80:0,.15));root.add(label);mesh.userData.label=label;}
  const arrowGeo=new T.ConeGeometry(.075,.18,8);geometries.push(arrowGeo);const arrow=new T.Mesh(arrowGeo,material);arrow.position.copy(curve.getPoint(.78));arrow.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),curve.getTangent(.78).normalize());root.add(arrow);
  return {e,curve,mesh,material,arrow};
 });
 const signalGeo=new T.SphereGeometry(.075,12,8);geometries.push(signalGeo);const signal=new T.Mesh(signalGeo,accent);root.add(signal);signal.visible=false;
 return {root,picks,nodeObjects,edges,signal,update(state:{phase:string;time:number;active:string|null;selected:string|null;edge:string|null;events:{at:number;type:string;edge?:string}[];reduced:boolean}){
  nodes.forEach((n,i)=>{const g=nodeObjects.get(n.id)!;const progress=state.phase==='build'?T.MathUtils.clamp((state.time-i*.30)/.45,0,1):1;g.visible=progress>0;for(const child of g.children.slice(0,3))child.scale.setScalar(Math.max(.001,1-Math.pow(1-progress,3)));g.position.z=n.position[2];const f=g.children[1] as T.Mesh;f.position.z=state.selected===n.id?.24:.19;g.children[2]!.position.z=state.selected===n.id?.281:.231;f.material=front;(g.children[0] as T.Mesh).material=state.active===n.id||state.selected===n.id?accent:body;});
  edges.forEach(({e,mesh,material,arrow})=>{const index=nodes.findIndex(n=>n.id===e.target);const progress=state.phase==='build'?T.MathUtils.clamp((state.time-index*.30+.17)/.30,0,1):1;mesh.visible=progress>0;mesh.geometry.setDrawRange(0,Math.floor(48*progress)*6*6);arrow.visible=progress>.85;if(mesh.userData.label)mesh.userData.label.visible=progress>.85;const relevant=state.selected&&(e.source===state.selected||e.target===state.selected);const used=state.phase==='execute'&&state.events.some(x=>x.edge===e.id&&x.type==='output-transmitted'&&x.at<=state.time);material.color.set(relevant||used||state.edge===e.id?(dark?'#82d4de':'#087e98'):(dark?'#50718e':'#6e8ba4'));});
  signal.visible=false;if(state.phase==='execute'&&!state.reduced){const event=state.events.find(e=>e.type==='output-transmitted'&&state.time>=e.at&&state.time<e.at+TRANSMISSION_SECONDS);const edge=edges.find(e=>e.e.id===event?.edge);if(edge&&event){signal.visible=true;signal.position.copy(edge.curve.getPoint((state.time-event.at)/TRANSMISSION_SECONDS));}}
 },dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
