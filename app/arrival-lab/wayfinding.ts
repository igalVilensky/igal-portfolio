import * as T from 'three';

/** Shared destination records can later carry discovery/unlock state. Portal worlds
 * use their hall entrance on the island map, never their unrelated local coordinates. */
export const islandDestinations = [
 {id:'living-lagoon',name:'The Living Lagoon',x:-170,z:65},
 {id:'creation-yard',name:'The Creation Yard',x:-166,z:132},
 {id:'print-lab',name:'Print Lab',x:-66,z:58},
 {id:'arrival',name:'Arrival',x:5,z:8},
 {id:'home',name:'Vilensky home',x:82,z:19},
 {id:'work',name:'Offices / Work Wing',x:-48,z:19},
 {id:'north',name:'North · door',x:-12,z:-69.5},
 {id:'israel',name:'Israel · door',x:12,z:-69.5},
 {id:'explorer',name:'Little Explorer',x:46,z:17},
 {id:'tube',name:'SkyTube → Loop',x:77,z:66},
] as const;

export function createWayfinding(scene:T.Scene){
 const root=new T.Group();root.name='Island wayfinding';scene.add(root);
 const gs:T.BufferGeometry[]=[],ms:T.Material[]=[],textures:T.Texture[]=[];
 const timber=new T.MeshStandardMaterial({color:'#526560',roughness:.8});ms.push(timber);
 function board(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material){const g=new T.BoxGeometry(w,h,d);gs.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);root.add(o);return o;}
 for(const [x,z,ids] of [[20,20,['work','home','print-lab','israel']],[-35,41,['work','print-lab','tube']],[62,49,['home','tube','north','israel']]] as const){
  board(.16,3.8,.16,x,1.9,z,timber);
  ids.forEach((id,i)=>{
   const dest=islandDestinations.find(d=>d.id===id)!;
   const dx=dest.x-x,dz=dest.z-z;
   const arrow=Math.abs(dx)>Math.abs(dz)?dx>0?'→':'←':dz>0?'↓':'↑';
   const canvas=document.createElement('canvas');canvas.width=768;canvas.height=128;
   const ctx=canvas.getContext('2d')!;ctx.fillStyle='#e9dfbf';ctx.fillRect(0,0,768,128);ctx.strokeStyle='#a68a57';ctx.lineWidth=8;ctx.strokeRect(4,4,760,120);ctx.fillStyle='#273d3e';ctx.font='bold 40px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(`${arrow}  ${dest.name}`,384,64);
   const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);
   const m=new T.MeshStandardMaterial({map:texture,roughness:.85});ms.push(m);
   board(3.8,.64,.12,x,3.45-i*.69,z,m);
  });
 }
 return {dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
