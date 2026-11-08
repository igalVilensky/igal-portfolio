import * as T from 'three';
import type { YouTubeRadio } from './YouTubeRadio';
import { audioCopy } from './copy';
export function createReceiver(scene:T.Scene,solids:T.Mesh[],radio:YouTubeRadio){
 const group=new T.Group();group.position.set(-12,0,3);scene.add(group);
 const metal=new T.MeshStandardMaterial({color:'#575c5b',metalness:.65,roughness:.4});const rim=new T.MeshStandardMaterial({color:'#b7b7a7',metalness:.5,roughness:.5});const geometries:T.BufferGeometry[]=[];
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material){const g=new T.BoxGeometry(w,h,d);geometries.push(g);const mesh=new T.Mesh(g,m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;mesh.userData.radio=true;group.add(mesh);solids.push(mesh);}
 box(2.8,.18,1.3,0,.09,0,metal);box(.5,1.15,.6,0,.7,0,metal);box(3.6,4.8,.7,0,2.65,0,metal);box(3.75,.12,.8,0,5.1,0,rim);
 for(const x of [-1.25,1.25])box(.2,.25,.22,x,1.25,.45,rim);
 // The physical display is ordinary scene geometry: architecture occludes every pixel.
 // Playback controls and the single YouTube iframe live in the persistent viewport player.
 const display=document.createElement('canvas');display.width=560;display.height=720;
 const texture=new T.CanvasTexture(display);texture.colorSpace=T.SRGBColorSpace;
 const screenMaterial=new T.MeshBasicMaterial({map:texture,toneMapped:false});
 const screenGeometry=new T.PlaneGeometry(3.28,4.4);geometries.push(screenGeometry);
 const screen=new T.Mesh(screenGeometry,screenMaterial);screen.position.set(0,2.65,.356);screen.userData.radio=true;group.add(screen);solids.push(screen);
 let previous='';
 function update(locale='en',dark=false){
  const c=audioCopy[locale as keyof typeof audioCopy]||audioCopy.en;
  const text=[locale,dark,radio.state.station,radio.title,radio.state.status].join('|');if(text===previous)return;previous=text;
  const ctx=display.getContext('2d')!;ctx.fillStyle=dark?'#15212a':'#26332f';ctx.fillRect(0,0,560,720);
  ctx.strokeStyle='#999c8b';ctx.lineWidth=12;ctx.strokeRect(6,6,548,708);
  ctx.fillStyle='#101d19';ctx.fillRect(24,70,512,530);ctx.fillStyle='#d7ecc7';ctx.font='22px monospace';ctx.fillText(c.receiver.toUpperCase()+' / '+String(radio.state.station+1).padStart(2,'0'),44,120);
  ctx.font='26px monospace';const words=radio.title.split(' ');let line='',y=210;
  for(const word of words){if(ctx.measureText(line+word).width>465){ctx.fillText(line,44,y);y+=38;line='';}line+=word+' ';}ctx.fillText(line,44,y);
  ctx.font='20px monospace';ctx.fillText(String(c[radio.state.status as keyof typeof c]||radio.state.status).toUpperCase(),44,510,465);ctx.fillText('←     ▶ / Ⅱ     →',44,650);texture.needsUpdate=true;
 }
 update();
 const near=new T.Vector3(-12,1.65,9.8);
 function resizeApproach(){const fov=innerWidth<650?72:65;const factor=Math.min(.62,(innerWidth-24)/560,(innerHeight-140)/900);near.z=3.365+innerHeight*.006/(2*Math.tan(T.MathUtils.degToRad(fov/2))*Math.max(.2,factor));}
 resizeApproach();
 return {near,resizeApproach,update,dispose(){texture.dispose();screenMaterial.dispose();group.removeFromParent();geometries.forEach(g=>g.dispose());metal.dispose();rim.dispose();}};
}
