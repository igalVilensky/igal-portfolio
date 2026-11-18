import * as T from 'three';
import { figurine, disposeObject, type PrintDesign } from './print-model';
export function createPrintLab(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='Print Lab';scene.add(root);
 const cream=new T.MeshStandardMaterial({color:'#f2e5cf',roughness:.65});
 const ink=new T.MeshStandardMaterial({color:'#293d58',roughness:.4});
 const mint=new T.MeshStandardMaterial({color:'#6cdbcc',emissive:'#308f86',emissiveIntensity:.3});
 const pink=new T.MeshStandardMaterial({color:'#c1a0ec'});
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=cream,solid=true)=>{const o=new T.Mesh(new T.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;o.userData.room='print-lab';o.userData.noCollision=!solid;root.add(o);solids.push(o);return o;};
 const textures:T.Texture[]=[];
 const glow=new T.PointLight('#b8ffdf',90,24,2);glow.position.set(-66,4.8,57);root.add(glow);
 function sign(text:string,x:number,y:number,z:number,w:number,rotation=0){const c=document.createElement('canvas');c.width=1024;c.height=160;const ctx=c.getContext('2d')!;ctx.fillStyle='#293d58';ctx.fillRect(0,0,1024,160);ctx.fillStyle='#b4f5dc';ctx.font='bold 48px sans-serif';ctx.textAlign='center';ctx.fillText(text,512,100);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;textures.push(t);const o=new T.Mesh(new T.PlaneGeometry(w,w*160/1024),new T.MeshBasicMaterial({map:t}));o.position.set(x,y,z);o.rotation.y=rotation;root.add(o);}
 // Open east doorway joins the plateau's existing east-west promenade at z=62.
 box(32,.025,4,-40,.035,62,mint,false);
 box(20,.12,20,-66,.04,58,cream,false);
 box(.4,6,20,-76,3,58);box(20,6,.4,-66,3,48);box(20,6,.4,-66,3,68);
 box(.4,6,10,-56,3,53);box(.4,6,4,-56,3,66);box(.4,1.4,6,-56,5.3,61);
 box(20,.3,20,-66,6,58,pink,false);
 for(const z of [58,64])box(.16,4.5,.25,-55.7,2.25,z,mint,false);
 sign('PRINT LAB  /  MAKE SOMETHING',-55.72,4.7,61,6,Math.PI/2);
 sign('PRINT LAB  ←',-24,2.8,62,5,Math.PI/2);
 sign('YOUR LITTLE UNIVERSE',-75.7,4.9,58,10,Math.PI/2);
 // Printer: an open frame, moving head and a lit fabrication bed.
 box(5,.9,3.5,-66,.5,52,ink);box(4,.16,2.7,-66,1.05,52,mint);
 for(const x of [-68,-64])box(.2,3,.2,x,2.6,52.9,ink);
 box(4.4,.2,.3,-66,4.1,52.9,ink);
 const head=box(.55,.35,.65,-66,3.7,52,mint,false);
 const button=box(2,.8,.18,-66,1.7,53.8,mint);button.userData.printLab=true;
 sign('CHOOSE • MAKE • PRINT',-66,2.5,53.91,4);
 for(const x of [-70,-62]){const spool=new T.Mesh(new T.TorusGeometry(.5,.18,10,24),x===-70?pink:mint);spool.position.set(x,1.6,52);root.add(spool);}
 box(5,.85,2,-61,.5,57,pink);sign('IDEA BENCH',-61,1.6,58.05,3);
 // Every print gets a numbered position; later rows expand upwards.
 const exhibits=new T.Group();root.add(exhibits);let printing:T.Group|undefined;
 function setCollection(items:PrintDesign[]){for(const child of [...exhibits.children])disposeObject(child);items.forEach((d,i)=>{const col=i%6,row=Math.floor(i/6);const y=.9+row*2.3;const plinth=new T.Mesh(new T.BoxGeometry(1.9,.16,1.8),cream.clone());plinth.position.set(-74.5,y,49.8+col*3);exhibits.add(plinth);const toy=figurine(d);toy.position.set(-74.5,y+.09,49.8+col*3);toy.rotation.y=Math.PI/2;toy.scale.setScalar(.8);exhibits.add(toy);});}
 for(let i=0;i<3;i++){const toy=figurine({type:(['rocket','robot','planet'] as const)[i]!,base:'sphere',addon:'ears',color:['#fa795f','#66d8cb','#ffd36b'][i]!});toy.position.set(-69+i*2,1.1,66.5);root.add(toy);box(1.7,1,1.8,-69+i*2,.5,66.5,ink);}
 function preview(d:PrintDesign){if(printing)disposeObject(printing);printing=figurine(d);printing.position.set(-66,1.15,52);root.add(printing);}
 return {setCollection,preview,update(progress:number|null,reduced:boolean){if(progress===null){head.position.set(-66,3.7,52);return false;}if(printing){printing.scale.y=Math.max(.001,progress);printing.visible=progress>0;}head.position.set(-66+(reduced?0:Math.sin(progress*80)*1.3),1.4+progress*2,52+(reduced?0:Math.cos(progress*65)*.65));mint.emissiveIntensity=.8;return true;},finish(){if(printing){disposeObject(printing);printing=undefined;}mint.emissiveIntensity=.3;},dispose(){disposeObject(root);textures.forEach(t=>t.dispose());}};
}
