import * as T from 'three';
import {destinationCopy} from '../destination-state';
import {createFragmentState} from '../destination-state';
/** A conceptual exhibit grounded in content/projects.json, never generated poetry. */
export function createSunlitRoom(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='Sunlit Tales · reading garden';scene.add(root);const state=createFragmentState();const gs:T.BufferGeometry[]=[],ms:T.Material[]=[],owned:T.Mesh[]=[],textures:T.Texture[]=[];let disposed=false;
 const mat=(color:string,emissive=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.7,emissive:color,emissiveIntensity:emissive});ms.push(m);return m;};
 const plaster=mat('#efe0c8'),ochre=mat('#bd8957'),paper=mat('#fff4d8'),ink=mat('#576e74'),gold=mat('#f6bd66',.25),leaf=mat('#78947a');
 function mesh(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,solid=false){gs.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);root.add(o);if(solid){owned.push(o);solids.push(o);}return o;}
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m=plaster,solid=false)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z,solid);
 box(16,1,18,87,-.5,-101,plaster,true);box(.4,9,18,95,4.5,-101,plaster,true);box(.4,9,18,79,4.5,-101,plaster,true);box(16,9,.4,87,4.5,-110,plaster,true);
 // A stepped open pergola makes a warm storybook silhouette instead of another closed gallery.
 for(let i=0;i<6;i++){box(.18,8,.18,80+i*2.7,4,-109,ochre);box(.16,.22,17,80+i*2.7,8+i%2*.4,-101,ochre);}
 const positions=[new T.Vector3(82,1.2,-99),new T.Vector3(91,1.2,-102),new T.Vector3(85,1.2,-107)];
 const captions:{canvas:HTMLCanvasElement;texture:T.CanvasTexture}[]=[];
 if(typeof document!=='undefined')for(const p of positions){const c=document.createElement('canvas');c.width=1024;c.height=256;const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;textures.push(t);const m=new T.MeshBasicMaterial({map:t,side:T.DoubleSide});ms.push(m);mesh(new T.PlaneGeometry(2.8,.7),m,p.x,2,p.z-.5);captions.push({canvas:c,texture:t});}
 function setLocale(locale:string){const text=destinationCopy[locale==='de'||locale==='ru'?locale:'en'];captions.forEach((label,i)=>{const c=label.canvas.getContext('2d')!;c.fillStyle='#ede0c6';c.fillRect(0,0,1024,256);c.fillStyle='#576e74';c.textAlign='center';c.font='48px Georgia, serif';c.fillText(text.fragments[i]!,512,100,970);c.font='32px sans-serif';c.fillText(text.next,512,190,970);label.texture.needsUpdate=true;});}
 setLocale('en');
 // Reuse the portfolio's own artwork instead of inventing poems or characters.
 if(typeof window!=='undefined'){const m=new T.MeshBasicMaterial({color:'#ffffff'});ms.push(m);const art=mesh(new T.PlaneGeometry(5,3),m,87,4,-109.72);art.visible=false;new T.TextureLoader().load('/sunlit.jpeg',texture=>{if(disposed){texture.dispose();return;}texture.colorSpace=T.SRGBColorSpace;textures.push(texture);m.map=texture;m.needsUpdate=true;art.visible=true;},undefined,()=>{});}
 const books=positions.map((p,i)=>{box(1.5,.7,1,p.x,.35,p.z,ochre,true);const g=new T.Group();g.position.copy(p);root.add(g);for(const side of [-1,1]){const page=box(.72,.08,.95,0,0,0,paper);g.add(page);page.position.set(side*.35,0,0);page.rotation.z=side*.18;for(let j=0;j<4;j++){const line=box(.42,.012,.018,0,0,0,ink);g.add(line);line.position.set(side*.35,.08,-.3+j*.17);line.rotation.z=side*.18;}}const ribbon=mesh(new T.TorusGeometry(.9,.028,5,32),gold,p.x,2.6,p.z);ribbon.rotation.x=Math.PI/2;return {g,ribbon};});
 for(const x of [80,94]){box(1,.6,2,x,.3,-106,ochre,true);for(let j=0;j<3;j++){const o=mesh(new T.SphereGeometry(.6,12,8),leaf,x,1+j*.45,-106);o.scale.set(.6,1,.5);}}
 const rays:T.Mesh[]=[];for(let i=0;i<18;i++){const o=box(.1,.06,4,80+i*.8,6+(i%3)*.5,-104+Math.sin(i)*2,gold);o.rotation.z=.2; rays.push(o);}
 const lamp=new T.PointLight('#ffd48e',100,20,1.8);lamp.position.set(87,5,-103);root.add(lamp);let amount=0,time=0;
 return {state,positions,setLocale,update(dt:number,reduced:boolean,player:T.Vector3,active:boolean){if(!active||Math.hypot(player.x-87,player.z+101)>45)return false;time+=dt;amount=T.MathUtils.damp(amount,state.count/3,3,dt);gold.emissiveIntensity=.2+amount;lamp.intensity=90+amount*120;books.forEach((b,i)=>{b.ribbon.visible=state.has(i);b.ribbon.position.y=2.6+amount*1.5;if(!reduced)b.g.rotation.y=Math.sin(time*.2+i)*.04;});rays.forEach((r,i)=>{r.scale.z=1+amount*(1+i%3)*.45;r.rotation.y=amount*.6;});return !reduced||Math.abs(amount-state.count/3)>.001;},dispose(){disposed=true;textures.forEach(t=>t.dispose());root.removeFromParent();owned.forEach(o=>{const i=solids.indexOf(o);if(i>=0)solids.splice(i,1);});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());}};
}
