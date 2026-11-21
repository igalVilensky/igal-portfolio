import * as T from 'three';
import {hebrewShops} from './destination-state';
import {separatedStep} from './family-life';
import type {CharacterVisual} from './character-assets';
/** Eastward district expansion, keeping the original entry court and light walk. */
export function createCoastalDistrict(parent:T.Group,solids:T.Mesh[]){
 const root=new T.Group();root.name='Tel Aviv · café lanes and promenade';parent.add(root);
 const gs:T.BufferGeometry[]=[],ms:T.Material[]=[],textures:T.Texture[]=[];const owned:T.Mesh[]=[];
 const mat=(color:string)=>{const m=new T.MeshStandardMaterial({color,roughness:.8});ms.push(m);return m;};
 const plaster=mat('#f5e8d2'),blue=mat('#426d88'),coral=mat('#c77860'),wood=mat('#957750'),leaf=mat('#728e60'),glass=mat('#3f6974'),cream=mat('#f8e0a6');
 const cube=new T.BoxGeometry(1,1,1),sphere=new T.SphereGeometry(1,12,8);gs.push(cube,sphere);
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=plaster,solid=false){const o=new T.Mesh(cube,m);o.scale.set(w,h,d);o.position.set(x,y,z);root.add(o);if(solid){o.userData.room='coastal-district';solids.push(o);owned.push(o);}return o;}
 function ell(x:number,y:number,z:number,r:number,m=leaf){const o=new T.Mesh(sphere,m);o.position.set(x,y,z);o.scale.set(r,r*.7,r);root.add(o);return o;}
 function sign(text:string,x:number,z:number){if(typeof document==='undefined'||typeof document.createElement!=='function')return;const canvas=document.createElement('canvas');canvas.width=768;canvas.height=192;const c=canvas.getContext('2d')!;c.fillStyle='#315562';c.fillRect(0,0,768,192);c.direction='rtl';c.textAlign='center';c.textBaseline='middle';c.fillStyle='#fff1d5';c.font='bold 100px Arial, sans-serif';c.fillText(text,384,100);const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;textures.push(tex);const m=new T.MeshBasicMaterial({map:tex});ms.push(m);box(3.2,.8,.06,x,2.6,z,m);}
 for(let i=0;i<4;i++){const x=35+i*15,h=6+i%3*1.5;
 // Solid façades are shop windows; only the open ice-cream kiosk offers an interaction.
 box(10,h,8,x,h/2,5,i%2?plaster:cream,true);box(11,.25,8.5,x,h,5,plaster);
 box(10,h+1.5,7,x,(h+1.5)/2,22,i%2?cream:plaster,true);
 for(const z of [9.08,25.58]){box(7.8,1.8,.08,x,1.4,z,glass);sign(hebrewShops[i]!,x,z+.07);box(10,.15,2,x,3.2,z+.6,i%2?blue:coral);for(const yy of [4.3,6.5])if(yy<h){box(7,.16,1.5,x,yy,z,plaster);box(7,.65,.06,x,yy+.35,z+.7,blue);for(const dx of [-2.5,0,2.5]){box(1.4,1.4,.08,x+dx,yy+.8,z-.03,blue);box(.06,.65,.6,x+dx,yy+.35,z+.5,plaster);}}}
 }
 // Counter faces a wide plaza; glass vitrine and coloured scoops read at walking scale.
 box(4,.9,1.3,35,.45,11.3,coral,true);box(4,.1,1.6,35,.95,11.3,cream);box(3.7,.5,.12,35,1.24,11.8,glass);for(let i=0;i<6;i++)ell(33.6+i*.55,1.08,11.3,.22,i%2?cream:coral);
 for(const x of [48,53,63]){box(1.5,.12,1.5,x,.78,28.5,wood,true);box(.12,.75,.12,x,.37,28.5,blue);for(const s of [-1,1]){box(.65,.13,.65,x+s*1.2,.43,28.5,blue,true);box(.65,.7,.1,x+s*1.2,.82,28.9,blue);box(.2,.2,.2,x+s*.35,.95,28.5,cream);}box(.08,3,.08,x,1.5,28.5,blue);const canopy=box(4,.12,3.4,x,3,28.5,cream);canopy.rotation.z=.035;}
 for(const x of [29,41,56,71,91]){box(1.6,.5,1.6,x,.25,16,plaster,true);box(.2,3.4,.2,x,1.9,16,wood);ell(x,3.7,16,1.6);box(3,.4,.7,x,.3,34,wood,true);box(3,.7,.12,x,.85,34.35,blue);}
 box(70,.18,5,59,-.05,35,plaster);box(70,.65,.3,59,.325,37.4,plaster,true);box(.4,3,42,94,1.5,20,plaster,true);box(70,3,.4,59,1.5,-.5,plaster,true);
 // Subtle paving bands tie shopping street, cross streets and sea walk together.
 for(const z of [13,18,32])box(70,.02,.12,59,.01,z,coral);
 const people:Array<{root:T.Group;visual?:CharacterVisual;x:number;z:number;wait:number;direction:number;seated:boolean;activity:string;speed:number}>=[];
 for(let i=0;i<7;i++){const g=new T.Group();root.add(g);const seated=i===4||i===5;const x=seated?48+(i===4?-1.2:1.2):i===6?35:30+i*14,z=seated?28.5:i===6?12.5:i%2?33:14.5;g.position.set(x,0,z);people.push({root:g,x,z,wait:i===6?999:4+i*2,direction:i%2?1:-1,seated,activity:seated?'conversation':i===6?'observing':'walking',speed:0});}
 let disposed=false,assets:Awaited<ReturnType<typeof import('./character-assets')['loadCharacterAssets']>>|undefined;
 if(typeof window!=='undefined'&&typeof document!=='undefined'&&typeof document.createElement==='function')import('./character-assets').then(m=>m.loadCharacterAssets()).then(a=>{if(disposed){a.dispose();return;}assets=a;people.forEach((p,i)=>{p.visual=a.create({id:'coastal-'+i,age:28+i*3,height:1.66+i%3*.05,hair:'#473932',shirt:['#dfae76','#6f9f9a','#d3d5bb'][i%3]!,pants:'#566678',skin:'#d7aa87'});p.root.add(p.visual.root);});}).catch(e=>console.error('Coastal inhabitants unavailable',e));
 const lampMat=new T.MeshStandardMaterial({color:'#ffdaa0',emissive:'#ffcc82',emissiveIntensity:.3});ms.push(lampMat);
 for(const x of [28,58,89]){box(.1,3.4,.1,x,1.7,36,blue);box(.7,.18,.5,x,3.4,36,lampMat);}
 const lamps=[new T.PointLight('#ffd4a0',25,18,1.7),new T.PointLight('#ffd4a0',25,18,1.7)];lamps.forEach((l,i)=>{l.position.set(35+i*45,3,13);root.add(l);});
 const serving=new T.Group();serving.position.set(35,1.25,11.3);serving.visible=false;root.add(serving);
 const coneG=new T.ConeGeometry(.14,.4,12);gs.push(coneG);const cone=new T.Mesh(coneG,cream);cone.rotation.x=Math.PI;serving.add(cone);const scoopM=mat('#d5d9a3');const scoop=new T.Mesh(sphere,scoopM);scoop.scale.setScalar(.19);scoop.position.y=.23;serving.add(scoop);
 let elapsed=0,serveAge=0;
 return {setDay(day:number){lampMat.emissiveIntensity=.2+(1-day)*1.3;lamps.forEach(l=>l.intensity=15+(1-day)*65);},chooseScoop(i:number){if(i<0||i>2)return;serving.visible=true;serveAge=0;scoopM.color.set(['#b9cb87','#fff1a8','#78523c'][i]!);},update(dt:number,reduced:boolean,active:boolean){if(!active)return false;elapsed+=dt;if(serving.visible){serveAge+=dt;serving.rotation.y=reduced?0:Math.min(1,serveAge)*Math.PI*2;serving.position.y=1.25+Math.min(1,serveAge)*.35;}for(const p of people){p.speed=0;if(!p.seated&&p.activity==='walking'&&!reduced){p.wait-=dt;if(p.wait<=0){const dx=p.direction*dt*.85;const f=separatedStep(p.root.position.x,p.z,dx,0,.33,people.filter(q=>q!==p).map(q=>({x:q.root.position.x,z:q.z,radius:.33})));p.root.position.x+=dx*f;p.speed=f;if(p.root.position.x<28||p.root.position.x>89){p.direction*=-1;p.wait=8;}if(elapsed%45<dt)p.wait=6;}}p.root.rotation.y=p.seated?(p===people[4]?Math.PI/2:-Math.PI/2):p.activity==='observing'?Math.PI:p.direction*Math.PI/2;p.visual?.update(dt,p.speed>.1,false,reduced,p.seated?1:0,.45,1,p.activity);}return !reduced;},dispose(){disposed=true;assets?.dispose();root.removeFromParent();owned.forEach(o=>{const i=solids.indexOf(o);if(i>=0)solids.splice(i,1);});gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
