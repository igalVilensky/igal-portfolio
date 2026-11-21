import * as T from 'three';
import {flightStation} from './flight';
/** Small shared-material propulsion rig; no lights, shadows, particles or additional render pass. */
export function createFlightScene(scene:T.Scene,camera:T.Camera){
 const root=new T.Group(),rig=new T.Group(),equipment=new T.Group();root.name='Sky Explorer station';root.position.set(flightStation.x,0,flightStation.z);scene.add(root);scene.add(camera);camera.add(equipment);
 const gs:T.BufferGeometry[]=[],ms:T.MeshStandardMaterial[]=[];
 const metal=new T.MeshStandardMaterial({color:'#516974',metalness:.7,roughness:.32}),pale=new T.MeshStandardMaterial({color:'#e5deca',roughness:.6}),glow=new T.MeshStandardMaterial({color:'#6fe6d6',emissive:'#38c9c0',emissiveIntensity:.4});ms.push(metal,pale,glow);
 function box(parent:T.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,mat:T.Material){const g=new T.BoxGeometry(w,h,d);gs.push(g);const m=new T.Mesh(g,mat);m.position.set(x,y,z);parent.add(m);return m;}
 box(root,4,.06,4,0,-.03,0,pale);for(const x of [-1.25,1.25])box(root,.12,2.8,.12,x,1.4,-1.2,metal);box(root,2.6,.12,.16,0,2.8,-1.2,glow);root.add(rig);rig.position.set(0,1.45,-1.2);
 box(rig,.65,.85,.22,0,0,0,metal);for(const x of [-.48,.48]){box(rig,.26,.9,.35,x,0,0,pale);box(rig,.2,.16,.28,x,-.5,0,glow);box(rig,.09,.6,.1,x*.55,0,.25,metal);box(equipment,.12,.25,.25,x*.93,-.3,-.48,metal);box(equipment,.08,.08,.15,x*.93,-.43,-.48,glow);}
 const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;const signMat=new T.MeshStandardMaterial({map:texture});ms.push(signMat);box(root,2.5,.42,.08,0,2.5,-1.1,signMat);
 return {setLocale(name:string){const c=canvas.getContext('2d')!;c.fillStyle='#243e48';c.fillRect(0,0,768,128);c.fillStyle='#a8fff0';c.font='bold 46px sans-serif';c.textAlign='center';c.fillText(name,384,82);texture.needsUpdate=true;},update(equipped:boolean,airborne:boolean,speed:number){rig.visible=!equipped;equipment.visible=equipped;glow.emissiveIntensity=airborne?.7+Math.min(1,speed/20):.25;},dispose(){equipment.removeFromParent();root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());texture.dispose();}};
}
