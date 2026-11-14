import * as T from 'three';

/** Add a country here: the open perimeter arc redistributes without changing the hub. */
export const explorerCountries = [
 {id:'germany',name:'Germany',color:'#efae48',cue:'gate'},
 {id:'israel',name:'Israel',color:'#4c9edc',cue:'sun'},
 {id:'bulgaria',name:'Bulgaria',color:'#dc7c9a',cue:'rose'},
 {id:'poland',name:'Poland',color:'#e76f78',cue:'bird'},
 {id:'czechia',name:'Czechia',color:'#788fd3',cue:'town'},
 {id:'italy',name:'Italy',color:'#65b99a',cue:'arch'},
 {id:'spain',name:'Spain',color:'#edaa44',cue:'sun'},
 {id:'albania',name:'Albania',color:'#dc4848',cue:'bird'},
 {id:'croatia',name:'Croatia',color:'#569fc2',cue:'town'},
] as const;
const translations:Record<string,Record<string,string>>={
 de:{Germany:'Deutschland',Israel:'Israel',Bulgaria:'Bulgarien',Poland:'Polen',Czechia:'Tschechien',Italy:'Italien',Spain:'Spanien',Albania:'Albanien',Croatia:'Kroatien','Little Explorer  →':'Kleine Entdecker  →','Around our world':'Rund um unsere Welt','← Arrival':'← Ankunft','Touch a flag · follow the glow':'Flagge berühren · dem Licht folgen'},
 ru:{Germany:'Германия',Israel:'Израиль',Bulgaria:'Болгария',Poland:'Польша',Czechia:'Чехия',Italy:'Италия',Spain:'Испания',Albania:'Албания',Croatia:'Хорватия','Little Explorer  →':'Маленький исследователь  →','Around our world':'Вокруг нашего мира','← Arrival':'← Прибытие','Touch a flag · follow the glow':'Коснись флага · следуй за светом'},
};
export const explorerCountryName=(id:string,locale:string)=>{const name=explorerCountries.find(c=>c.id===id)?.name||id;return translations[locale]?.[name]||name;};
export function createLittleExplorer(scene:T.Scene, solids:T.Mesh[]) {
 const root=new T.Group();root.name='little-explorer';scene.add(root);
 const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures:T.Texture[]=[];
 const mat=(color:string,basic=false)=>{const m=basic?new T.MeshBasicMaterial({color}):new T.MeshStandardMaterial({color,roughness:.65});materials.add(m);return m;};
 let locale='en';
 const labels:{text:string,ctx:CanvasRenderingContext2D,texture:T.CanvasTexture}[]=[];
 const cream=mat('#fff0d5'),floor=mat('#eee4ce'),teal=mat('#95c9c7'),gold=mat('#edb75e'),ink=mat('#326b79');
 function mesh(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,parent:T.Object3D=root,solid=false){geometries.add(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.userData.room='little-explorer';o.userData.noCollision=!solid;o.receiveShadow=true;parent.add(o);solids.push(o);return o;}
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=cream,parent:T.Object3D=root,solid=false)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z,parent,solid);
 function label(text:string,w:number,h:number,x:number,y:number,z:number,parent:T.Object3D=root){const c=document.createElement('canvas');c.width=1024;c.height=192;const ctx=c.getContext('2d')!;ctx.fillStyle='#fff4dc';ctx.fillRect(0,0,1024,192);ctx.fillStyle='#245361';ctx.font='600 92px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,512,100);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;textures.push(t);labels.push({text,ctx,texture:t});const m=new T.MeshBasicMaterial({map:t});materials.add(m);return mesh(new T.PlaneGeometry(w,h),m,x,y,z,parent);}
 // A six-metre opening, level corridor, and a pavilion with a genuinely open west threshold.
 box(6,1,6,29,-.5,19,floor);box(6,6,.5,29,3,15.75,teal,root,true);box(6,6,.5,29,3,22.25,teal,root,true);box(6,.5,6,29,6.25,19);
 box(28,1,26,46,-.5,11,floor);
 box(28,8,.5,46,4,-2,cream,root,true);box(28,8,.5,46,4,24,cream,root,true);box(.5,8,26,60,4,11,cream,root,true);
 box(.5,8,18,32,4,7,cream,root,true);box(.5,8,2,32,4,23,cream,root,true);box(.5,2,6,32,7,19,cream,root,true);
 // Perimeter canopy frames a sky-like luminous oculus, keeping the centre airy.
 box(28,.5,4,46,8,-.25,teal);box(28,.5,4,46,8,22.25,teal);box(4,.5,22,34,8,11,teal);box(4,.5,22,58,8,11,teal);
 mesh(new T.CircleGeometry(10,64),mat('#d9f2ee',true),46,8.3,11).rotation.x=Math.PI/2;
 const entrance=label('Little Explorer  →',5.4,.9,23.85,4,19);entrance.rotation.y=-Math.PI/2;
 const welcome=label('Around our world',6.5,1.15,46,6.1,-1.7);
 const back=label('← Arrival',4,.72,32.4,4.3,19);back.rotation.y=Math.PI/2;
 const light=new T.PointLight('#ffe6b9',180,38,1.5);light.position.set(46,6,11);root.add(light);
 const hub=new T.Group();hub.position.set(46,0,11);root.add(hub);
 mesh(new T.CylinderGeometry(2.3,2.6,.45,48),teal,0,.225,0,hub,true);
 mesh(new T.CylinderGeometry(.7,1,1.5,32),gold,0,1.1,0,hub,true);
 const globe=new T.Group();globe.position.y=3.15;hub.add(globe);
 mesh(new T.SphereGeometry(1.8,32,20),mat('#65bfd2'),0,0,0,globe);
 // Toy-like land patches: geometric silhouettes, deliberately no cartographic claims.
 for(const [lat,lon,size] of [[.4,.2,.8],[-.2,2,.7],[.75,3.6,.65],[-.65,4.8,.5],[.2,5.4,.6]]){const p=new T.Vector3(Math.cos(lat!)*Math.cos(lon!),Math.sin(lat!),Math.cos(lat!)*Math.sin(lon!)).multiplyScalar(1.76);const land=mesh(new T.IcosahedronGeometry(size!,0),mat('#d3df99'),p.x,p.y,p.z,globe);land.scale.set(1,.65,.3);land.lookAt(0,0,0);}
 const orbit=mesh(new T.TorusGeometry(2.2,.055,8,80),gold,0,3.15,0,hub);orbit.rotation.x=1.1;orbit.rotation.y=.4;
 label('Touch a flag · follow the glow',5.2,.75,46,5.1,-1.65);
 function flag(id:string){const c=document.createElement('canvas');c.width=600;c.height=400;const q=c.getContext('2d')!;q.fillStyle='#fff';q.fillRect(0,0,600,400);const bands=(colors:string[],vertical=false)=>colors.forEach((col,i)=>{q.fillStyle=col;q.fillRect(vertical?i*600/colors.length:0,vertical?0:i*400/colors.length,vertical?600/colors.length:600,vertical?400:400/colors.length);});
 if(id==='germany')bands(['#171717','#d92b35','#ffce38']);if(id==='bulgaria')bands(['#fff','#16966b','#d4313e']);if(id==='poland')bands(['#fff','#dc3152']);if(id==='italy')bands(['#17996b','#fff','#df3441'],true);
 if(id==='czechia'){bands(['#fff','#d92c3f']);q.fillStyle='#1758a1';q.beginPath();q.moveTo(0,0);q.lineTo(300,200);q.lineTo(0,400);q.fill();}
 if(id==='israel'){q.fillStyle='#1764bd';q.fillRect(0,50,600,48);q.fillRect(0,302,600,48);q.strokeStyle='#1764bd';q.lineWidth=12;for(const sign of [-1,1]){q.beginPath();for(let i=0;i<3;i++){const a=sign*Math.PI/2+i*Math.PI*2/3;const x=300+86*Math.cos(a),y=200+86*Math.sin(a);i?q.lineTo(x,y):q.moveTo(x,y);}q.closePath();q.stroke();}}
 if(id==='spain'){bands(['#b91d32','#ffcf37','#ffcf37','#b91d32']);q.fillStyle='#ad3037';q.fillRect(174,170,38,57);q.fillStyle='#dca842';q.fillRect(168,157,50,15);q.fillStyle='#fff0ba';q.fillRect(183,181,9,16);q.fillRect(198,181,9,16);}
 if(id==='albania'||id==='croatia'){const image=new Image();image.onload=()=>{q.clearRect(0,0,600,400);q.drawImage(image,0,0,600,400);t.needsUpdate=true;};image.src='/flags/'+(id==='albania'?'al':'hr')+'.svg';}
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;textures.push(t);const m=new T.MeshBasicMaterial({map:t});materials.add(m);return m;}
 label('',5.2,.72,46,6.95,-1.65);
 function refreshLabels(){for(const l of labels){const text=l.text?translations[locale]?.[l.text]||l.text:(({de:'Reisepass',ru:'Паспорт'} as Record<string,string>)[locale]||'Passport')+' · '+stations.filter(s=>s.visited).length+' / '+explorerCountries.length;l.ctx.fillStyle='#fff4dc';l.ctx.fillRect(0,0,1024,192);l.ctx.fillStyle='#245361';l.ctx.font='600 92px sans-serif';l.ctx.fillText(text,512,100,980);l.texture.needsUpdate=true;}}
 const stations=explorerCountries.map((country,i)=>{
 // Reserve the southwest arc for arrival; this formula supports an expanding registry.
 const angle=T.MathUtils.degToRad(-100+i*280/Math.max(1,explorerCountries.length-1));
 const x=46+10*Math.sin(angle),z=11-10*Math.cos(angle);const group=new T.Group();group.position.set(x,0,z);group.rotation.y=Math.atan2(46-x,11-z);root.add(group);
 const accent=mat(country.color),glow=new T.MeshBasicMaterial({color:country.color});materials.add(glow);
 mesh(new T.CylinderGeometry(1.65,1.85,.22,32),accent,0,.11,0,group,true);
 box(2.8,1,.7,0,.7,0,cream,group,true);
 const frame=box(3.45,2.45,.22,0,2.5,0,accent,group,true);frame.userData.explorer=country.id;
 const panel=mesh(new T.PlaneGeometry(3.16,2.1,12,6),flag(country.id),0,2.5,.24,group);panel.userData.explorer=country.id;
 const name=label(country.name,3.6,.68,0,4.05,.1,group);name.userData.explorer=country.id;
 const cue=new T.Group();cue.position.set(0,1.35,.6);group.add(cue);if(country.id==='albania'||country.id==='croatia'){cue.position.y=1.15;cue.scale.setScalar(.45);}
 if(country.cue==='sun'||country.cue==='rose'){mesh(new T.SphereGeometry(.25,12,8),accent,0,.15,0,cue);for(let j=0;j<8;j++){const a=j*Math.PI/4;mesh(new T.SphereGeometry(.11,8,6),gold,Math.cos(a)*.4,.15+Math.sin(a)*.4,0,cue);}}
 else if(country.cue==='bird'){for(const s of [-1,1]){const wing=box(.62,.12,.16,s*.26,.2,0,accent,cue);wing.rotation.z=s*.4;}}
 else {for(const s of [-1,1])box(.16,.65,.2,s*.45,.25,0,accent,cue);box(1.1,.18,.24,0,.6,0,accent,cue);if(country.cue==='gate')box(.15,.55,.2,0,.2,0,accent,cue);if(country.cue==='town')mesh(new T.ConeGeometry(.25,.45,4),gold,.45,.9,0,cue);}
 const route=new T.Group();root.add(route);for(let j=0;j<13;j++){const t=.27+j*.05;mesh(new T.CylinderGeometry(.075,.075,.025,8),glow,46+(x-46)*t,.025,11+(z-11)*t,route);}
 const token=mesh(new T.SphereGeometry(.16,10,6),mat('#b5c9c2'),Math.sin(angle)*2.25,.5,-Math.cos(angle)*2.25,hub);
 token.userData.explorer=country.id;
 const sparks=Array.from({length:6},(_,j)=>{const star=mesh(new T.OctahedronGeometry(.12),glow,0,0,0,group);star.visible=false;return star;});
 return {id:country.id,group,panel,frame,cue,route,token,sparks,glow,last:-Infinity,visited:false,base:panel.geometry.getAttribute('position').array.slice()};
 });
 refreshLabels();
 let active='';
 return {activate(id:string,now:number){const s=stations.find(s=>s.id===id);if(!s)return;active=id;s.last=now;s.visited=true;refreshLabels();(s.token.material as T.MeshStandardMaterial).color.set(s.glow.color);},
 update(now:number,dt:number,reduced:boolean,position:T.Vector3,focus:string|false){if(position.x<22||position.x>65||position.z< -8||position.z>30)return false;
 if(!reduced)globe.rotation.y+=dt*.14;
 for(const s of stations){const age=(now-s.last)/1000,burst=age<1.4,focused=focus===`explorer:${s.id}`;
 s.frame.scale.setScalar(focused?1.04:1);s.glow.color.set(explorerCountries.find(c=>c.id===s.id)!.color).multiplyScalar(active===s.id?1.35:.65);
 s.cue.rotation.z=reduced?0:burst?Math.sin(age*12)*.15:0;
 const p=s.panel.geometry.getAttribute('position');for(let j=0;j<p.count;j++)p.setZ(j,s.base[j*3+2]!+(reduced?0:Math.sin(p.getX(j)*2+now*.002)*(burst?.1:.025)));p.needsUpdate=true;
 s.sparks.forEach((star,j)=>{star.visible=burst;if(burst){const a=j*Math.PI/3;star.position.set(Math.cos(a)*age,4.8+age*.7+Math.sin(a)*age,.5);star.scale.setScalar(reduced?.7:Math.max(.05,1-age/1.4));}});
 }return true;},
 setLocale(value:string){locale=value;refreshLabels();},
 get visited(){return stations.filter(s=>s.visited).map(s=>s.id);},
 setTheme(dark:boolean){cream.color.set(dark?'#455d69':'#fff0d5');floor.color.set(dark?'#294754':'#eee4ce');teal.color.set(dark?'#418e9d':'#95c9c7');ink.color.set(dark?'#91d7dd':'#326b79');light.intensity=dark?140:180;},
 dispose(){root.removeFromParent();geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());}};
}
