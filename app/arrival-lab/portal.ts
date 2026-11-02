import * as T from 'three';
import { worldPath } from './works/registry';

/** A diagram, not a product screenshot. Shared verbatim by WebGL and HTML. */
export const portalVisual = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"><rect width="1200" height="750" fill="#101b2c"/><g fill="none" stroke="#8eafff" stroke-width="2"><path d="M-100 590H270L450 375H740L950 160H1300"/><path d="M-100 630H290L470 415H760L970 200H1300" opacity=".25"/><circle cx="450" cy="375" r="55"/><circle cx="740" cy="375" r="55"/><circle cx="950" cy="160" r="28"/></g><g fill="#c8d8ff" font-family="monospace"><text x="72" y="100" font-size="19" letter-spacing="6">WORK / 01</text><text x="72" y="218" font-size="80">FlowForge</text><text x="72" y="270" font-size="20" letter-spacing="3">AI AUTOMATION COMPILER</text><text x="72" y="690" font-size="16" letter-spacing="3">IDEA → BLUEPRINT → HUMAN REVIEW</text></g></svg>`);
export type PortalState = 'exploring'|'terminal-focused'|'entering'|'workspace-active'|'exiting';

export function createTerminal(scene: T.Scene, solids: T.Mesh[]) {
  const group = new T.Group(); group.position.set(23.25, 2.8, -35); group.rotation.y = -Math.PI / 2; scene.add(group);
  const geometries: T.BufferGeometry[] = [], materials: T.Material[] = [];
  const metal = new T.MeshStandardMaterial({color:'#253346',metalness:.65,roughness:.35});
  const edge = new T.MeshStandardMaterial({color:'#8795a6',metalness:.65,roughness:.4});
  const glow = new T.MeshBasicMaterial({color:'#8eafff',toneMapped:false}); materials.push(metal,edge,glow);
  function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material) {
    const geometry=new T.BoxGeometry(w,h,d); geometries.push(geometry);
    const mesh=new T.Mesh(geometry,m);mesh.position.set(x,y,z);group.add(mesh);solids.push(mesh);mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.terminal=true;return mesh;
  }
  // Wall-backed chassis, floor-bearing uprights and a deep, chamfer-like outer reveal.
  box(7.2,5.6,.6,0,0,-.35,metal);
  for(const x of [-3.2,3.2]) {box(.45,5.6,1.0,x,0,-.05,edge);box(.65,.8,1.3,x,-2.4,.05,metal);}
  for(const y of [-2.05,2.05])box(6.2,.3,.85,0,y,.08,metal);
  box(5.9,.035,.08,0,-1.87,.54,glow);
  const texture=new T.TextureLoader().load(portalVisual);texture.colorSpace=T.SRGBColorSpace;
  const screenMat=new T.MeshBasicMaterial({map:texture,toneMapped:false});materials.push(screenMat);
  const geometry=new T.PlaneGeometry(5.8,3.625);geometries.push(geometry);
  const screen=new T.Mesh(geometry,screenMat);screen.position.z=.51;screen.userData.terminal=true;group.add(screen);solids.push(screen);
  const light=new T.PointLight('#8eafff',25,12,2);light.position.set(0,0,1.1);group.add(light);
  scene.updateMatrixWorld(true);
  const center=screen.getWorldPosition(new T.Vector3()), normal=new T.Vector3(0,0,1).transformDirection(screen.matrixWorld);
  return {screen,center,normal,
    near: center.clone().addScaledVector(normal,4.5).setY(1.65),
    update(distance:number,focused:boolean){light.intensity=focused?65:distance<9?40:25;glow.color.set(focused?'#e4edff':'#8eafff');},
    dispose(){group.removeFromParent();texture.dispose();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());},
  };
}

/** Travel stays in the open hall; passage waypoints prevent cutting the Living Wall. */
export function portalPath(from:T.Vector3,to:T.Vector3) {
  return [...worldPath(from,new T.Vector3(0,1.65,-35)),to.clone()];
}
export function pointOnPath(path:T.Vector3[],t:number) {
  const lengths=path.slice(1).map((p,i)=>p.distanceTo(path[i]!));let d=lengths.reduce((a,b)=>a+b,0)*t;
  for(let i=0;i<lengths.length;i++){const n=lengths[i]!;if(d<=n||i===lengths.length-1)return path[i]!.clone().lerp(path[i+1]!,n?Math.min(d/n,1):1);d-=n;}
  return path[0]!.clone();
}
