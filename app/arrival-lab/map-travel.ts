import * as T from 'three';
import {onHorizon} from './star-geography';
import {roofHeight} from './ascent';
import {originBoundary,originHeight} from './origin';
import {worldSpaces} from './spaces';
import {inBasin} from './lagoon-model';
import {worldPath} from './works/registry';
import {familyNodes,familyEdges,circulationRoute} from './family-navigation';
export type TravelState='idle'|'moving'|'arrived'|'cancelled'|'blocked';
/** Reuse the world route helper and the existing, audited family circulation graph. */
export function planMapRoute(from:T.Vector3,to:T.Vector3,clear:(path:T.Vector3[])=>boolean){
 if(![...from.toArray(),...to.toArray()].every(Number.isFinite))return;
 const direct=worldPath(from,to);if(clear(direct))return direct;
 const nodes=familyNodes.map(n=>new T.Vector3(n[0],1.65,n[1])),edges:number[][]=familyEdges.map(e=>[...e]);
 const add=(x:number,z:number)=>{let index=nodes.findIndex(n=>n.x===x&&n.z===z);if(index<0){index=nodes.length;nodes.push(new T.Vector3(x,1.65,z));}return index;};
 // Additional entrances use the same authored circulation graph, following inspected aisles.
 const aisles=[
 [[12,62],[12,115],[0,140],[-4,140]],
 [[-57,19],[-62,19],[-62,21.8],[-90.5,21.8],[-90.5,11],[-92,11],[-92,6]],
 [[-32,27],[-35,27],[-35,29],[-20,29]],
 [[5,19],[0,-64],[0,-76],[0,-94],[22,-94],[22,-87],[32,-87],[32,-82]],
 [[22,-87],[49,-87],[49,-103],[46,-103]],
 [[35,50],[74,50],[74,63]],
 [[74,50],[76,48],[215,48],[215,58],[238,58],[249,58],[249,43]],
 [[-35,90],[-45,87],[-58,87],[-58,88]],
 [[-104,72],[-104,62],[-134,62],[-136.5,62],[-136.5,73],[-141,83],[-151,94],[-166,99],[-166,110]],
 [[-35,62],[-48,62],[-48,72],[-104,72]],
 ];
 for(const aisle of aisles)for(let i=1;i<aisle.length;i++)edges.push([add(...aisle[i-1] as [number,number]),add(...aisle[i] as [number,number])]);
 const stair=[[-62,1.65,19],[-62,1.65,14],[-63,1.65,14],[-85,6.85,14],[-86,6.85,16.6],[-85,6.85,19.2],[-63,12.05,19.2],[-61.5,12.05,19.2],[-40,12.05,19.2],[-40,12.05,21],[-40,16.05,43],[-39,16.05,50]];
 const add3=(v:number[])=>{const point=new T.Vector3(v[0],v[1],v[2]);let index=nodes.findIndex(n=>n.distanceToSquared(point)<.00001);if(index<0){index=nodes.length;nodes.push(point);}return index;};
 for(let i=1;i<stair.length;i++)edges.push([add3(stair[i-1]!),add3(stair[i]!)]);
 const promenade=[[35,1.65,50],[54,1.65,56],[54,1.65,60],[54,5.65,80],[54,5.65,100]];
 for(let i=1;i<promenade.length;i++)edges.push([add3(promenade[i-1]!),add3(promenade[i]!)]);
 const valid=edges.filter(([a,b])=>clear([nodes[a!]!,nodes[b!]!]));
 const start=nodes.length;nodes.push(from.clone());const end=nodes.length;nodes.push(to.clone());
 const connect=(p:T.Vector3,id:number)=>nodes.slice(0,start).map((n,i)=>({i,d:n.distanceTo(p)})).sort((a,b)=>a.d-b.d).slice(0,8).forEach(({i})=>{if(clear([p,nodes[i]!]))valid.push([id,i]);});
 connect(from,start);connect(to,end);
 const route=circulationRoute(start,end,valid);if(!route.length)return;
 return [from.clone(),...route.map(i=>nodes[i]!.clone())];
}
/** Single-loop polyline travel. Cancellation retains the current valid walking position. */
export function createMapTravel(){
 let state:TravelState='idle',path:T.Vector3[]=[],index=1;const delta=new T.Vector3(),before=new T.Vector3(),expected=new T.Vector3();
 return {get state(){return state;},get ownsMotion(){return state==='moving';},
 start(points:T.Vector3[]){if(this.ownsMotion||points.length<2||points.some(p=>!p.toArray().every(Number.isFinite)))return false;path=points.map(p=>p.clone());index=1;state='moving';return true;},
 cancel(){if(state==='moving')state='cancelled';},
 update(dt:number,p:T.Vector3,move:(p:T.Vector3,d:T.Vector3)=>void){
  if(state!=='moving')return state;let budget=Math.min(.05,Math.max(0,dt))*18;
  while(budget>0&&index<path.length){delta.subVectors(path[index]!,p);const distance=delta.length();if(distance<.025){index++;continue;}delta.multiplyScalar(Math.min(budget,distance)/distance);before.copy(p);move(p,delta);
   if(p.distanceTo(expected.copy(before).add(delta))>.08){p.copy(before);state='blocked';return state;}
   budget-=delta.length();if(p.distanceTo(path[index]!)<.025)index++;
  }
  if(index>=path.length)state='arrived';return state;
 }
 };
}
/** Bounded preflight against the same swept walking collision used during travel. */
export function walkingRouteClear(path:T.Vector3[],move:(p:T.Vector3,d:T.Vector3)=>void,allowed:(p:T.Vector3)=>boolean=()=>true){
 if(path.length<2)return false;
 const p=path[0]!.clone(),target=new T.Vector3(),delta=new T.Vector3();let samples=0;if(!allowed(p))return false;
 for(let i=1;i<path.length;i++){
  const from=p.clone(),length=from.distanceTo(path[i]!),steps=Math.max(1,Math.ceil(length/.6));if(!Number.isFinite(length)||samples+steps>6000)return false;
  for(let n=1;n<=steps;n++){samples++;target.lerpVectors(from,path[i]!,n/steps);if(!allowed(target))return false;delta.subVectors(target,p);move(p,delta);if(p.distanceTo(target)>.04)return false;}
 }return true;
}

/** Ground-only map travel never treats open cloud space or water as a walkway. */
export function onMapGround(p:T.Vector3){
 if(!p.toArray().every(Number.isFinite)||inBasin(p.x,p.z))return false;
 if(onHorizon(p.x,p.z)&&Math.abs(p.y-1.65)<.2)return true;
 if(Math.abs(p.y-1.65)>.2){const roof=roofHeight(p.x,p.z);return roof!==undefined&&Math.abs(p.y-roof-1.65)<.25||originHeight(p.x,p.z)>0&&Math.abs(p.y-originHeight(p.x,p.z)-1.65)<.25;}
 if(p.x>=-134&&p.x<=-106&&p.z>=59&&p.z<=65)return true;
 if(p.x>=-183.2&&p.x<=-152&&p.z>=99&&p.z<=114)return true;
 let inside=false;for(let i=0,j=originBoundary.length-1;i<originBoundary.length;j=i++){
  const a=originBoundary[i]!,b=originBoundary[j]!;if((a[1]>p.z)!==(b[1]>p.z)&&p.x<(b[0]-a[0])*(p.z-a[1])/(b[1]-a[1])+a[0])inside=!inside;
 }
 if(inside&&originHeight(p.x,p.z)<.2)return true;
 return worldSpaces.some(s=>!['origin','loop-vault','living-lagoon'].includes(s.id)&&p.x>=s.bounds[0]&&p.x<=s.bounds[1]&&p.z>=s.bounds[2]&&p.z<=s.bounds[3])||((p.x+170)/41)**2+((p.z-65)/39)**2<=1;
}
/** Existing memory-world lanes and return thresholds, in their own coordinate systems. */
export function planEnvironmentExit(from:T.Vector3,environment:string,clear:(path:T.Vector3[])=>boolean){
 const v=(x:number,z:number)=>new T.Vector3(x,1.65,z);
 const end=environment==='vault'?v(400,419.8):v(0,-.2);
 const candidates:T.Vector3[][]=[[from.clone(),end]];
 if(environment==='sun-world')candidates.push([from.clone(),v(12.7,from.z),v(12.7,12),v(0,12),end],[from.clone(),v(12.7,26),v(12.7,12),v(0,12),end]);
 if(environment==='sun-world'&&from.x>24)for(const x of [27,43,58,73,88])candidates.push([from.clone(),v(x,from.z),v(x,33),v(12.7,33),v(12.7,12),v(0,12),end]);
 if(environment==='antipayuta')candidates.push([from.clone(),v(11.4,from.z),v(11.4,74),v(0,3),end]);
 if(environment==='vault')for(const x of [396,404])candidates.push([from.clone(),v(x,from.z),v(x,423),v(400,423),end]);
 return candidates.find(clear);
}
