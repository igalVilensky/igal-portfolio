import * as T from 'three';
export type EncounterState='idle'|'noticing'|'ready'|'listening'|'thinking'|'responding'|'returning';
export const chamberEntities=[
 {id:'archivist',x:-103,z:-24,color:'#d8bd89',height:3.5},
 {id:'engineer',x:-94,z:-12,color:'#95c2c4',height:2.8},
 {id:'wanderer',x:-104,z:-3,color:'#b8b9df',height:2.5},
] as const;
/** One scene owner, restrained low-poly sculpture, no secondary renderer or animation loop. */
export function createIntelligence(scene:T.Scene,solids:T.Mesh[]){
 const root=new T.Group();root.name='The Intelligence Chamber';scene.add(root);
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>();
 const mat=(color:string,metalness=0,emissive=false)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness:.52,emissive:emissive?color:0,emissiveIntensity:emissive?.6:0});ms.add(m);return m;};
 const stone=mat('#222c30'),edge=mat('#4c5657',.55),floor=mat('#343c3d',.25),ivory=mat('#bfbbaa'),light=mat('#d7d3b5',0,true);
 function mesh(g:T.BufferGeometry,m:T.Material,parent:T.Object3D=root,solid=false){gs.add(g);const o=new T.Mesh(g,m);parent.add(o);o.receiveShadow=true;o.castShadow=solid;o.userData={room:'intelligence-chamber',noCollision:!solid};solids.push(o);return o;}
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m:T.Material=stone,parent:T.Object3D=root,solid=true){const o=mesh(new T.BoxGeometry(w,h,d),m,parent,solid);o.position.set(x,y,z);return o;}
 // Origin surface is y=-.06. Keep the chamber finish at y=0, clear of that slab.
 box(22,1,40,-99,-.5,-12,floor);box(22,2,40,-99,-2,-12,stone);
 box(.8,23,40,-110,11.5,-12);box(.8,23,40,-88,11.5,-12);box(22,23,.8,-99,11.5,-32);
 // Entrance axis compresses under a deep lintel, then releases into the high volume.
 box(15,23,.7,-102.5,11.5,8);box(1,23,.7,-88.5,11.5,8);box(6,16,.7,-92,15,8);
 for(const x of [-95.2,-88.8]){box(.35,7.4,2,x,3.7,8,edge);box(.045,6,.04,x+(x<-92?.2:-.2),3.1,9.03,light,root,false);}
 box(6.7,.35,2,-92,7.4,8,ivory);
 // Two retracting leaves always reveal actual geometry, never a portal texture.
 const door=box(5.8,6.8,.24,-92,3.4,8,edge);delete door.userData.room;door.userData.chamberDoor=true;
 box(.08,2,.06,-91.8,1.8,8.15,light,root,false).userData.chamberDoor=true;
 for(let i=0;i<10;i++){
  const z=5-i*3.8;box(.6,21,1.1,-109.3,10.5,z,edge);box(.6,21,1.1,-88.7,10.5,z,edge);
  box(.09,15,.08,-108.92,11,z-.46,i%3===0?light:ivory,root,false);
 }
 // Layered ceiling leaves narrow pale slots; no forest of floating screens.
 for(let i=0;i<5;i++){box(3.9,.8,40,-108+i*4.4,23,-12,stone);box(.12,.08,35,-105.9+i*4.4,22.55,-12,light,root,false);}
 for(const [x,z] of [[-103,-24],[-94,-12],[-104,-3]] as const){
  const pool=new T.SpotLight('#e6e0c7',240,34,.25,.7,1.3);pool.position.set(x,21,z+2);pool.target.position.set(x,0,z);root.add(pool,pool.target);
  box(3,.025,3,x,.025,z,ivory,root,false);
 }
 const fill=new T.PointLight('#afc8d1',70,55,1.5);fill.position.set(-99,9,-12);root.add(fill);
 const entities=chamberEntities.map((spec,i)=>{
  const person=new T.Group();person.position.set(spec.x,0,spec.z);root.add(person);
  const body=new T.Group();person.add(body);const shell=mat(i===0?'#7b776e':i===1?'#52686e':'#737383',.65),glow=mat(spec.color,.2,true);
  const head=new T.Group();head.position.y=spec.height;body.add(head);
  if(i===0){
   // An articulated mantle, suspended stacked vertebrae, inclined head and long arms.
   for(let n=0;n<8;n++){const plate=box(1.45-n*.09,.19,.68,0,1.05+n*.25,0,shell,body,false);plate.rotation.y=n*.12;}
   for(const side of [-1,1]){const arm=box(.22,1.9,.32,side*.88,2.15,0,shell,body,false);arm.rotation.z=side*.16;box(.045,1.35,.04,side*.89,2.2,.18,glow,body,false);}
   const face=mesh(new T.OctahedronGeometry(.48,0),ivory,head);face.scale.set(.72,1.2,.7);face.rotation.z=.12;
   box(.35,.035,.05,0,0,.35,glow,head,false);
  }else if(i===1){
   for(const side of [-1,1]){box(.24,.95,.28,side*.33,.8,0,shell,body,false);const shoulder=box(.36,1.2,.4,side*.8,2.12,0,shell,body,false);shoulder.rotation.z=side*.38;}
   const chest=mesh(new T.OctahedronGeometry(.8),shell,body);chest.position.y=1.95;chest.scale.set(.8,1,.5);
   box(.06,.85,.06,0,1.95,.42,glow,body,false);box(.66,.5,.5,0,0,0,shell,head,false);box(.45,.045,.05,0,.02,.27,glow,head,false);
   for(let n=0;n<3;n++)box(.85,.05,.65,0,1.2+n*.36,0,edge,body,false);
  }else{
   for(let n=0;n<4;n++){const ring=mesh(new T.TorusGeometry(.7-n*.1,.055,6,32),n%2?shell:glow,body);ring.rotation.x=Math.PI/2+n*.28;ring.position.y=1.1+n*.26;}
   const face=mesh(new T.TetrahedronGeometry(.42),ivory,head);face.scale.set(.8,1.2,.7);box(.17,.045,.05,0,0,.32,glow,head,false);
  }
  const orbit=new T.Group();orbit.position.y=1.8;body.add(orbit);
  for(let n=0;n<(i===2?5:2);n++){const bit=mesh(new T.OctahedronGeometry(i===2?.12:.09),glow,orbit);const a=n*Math.PI*2/(i===2?5:2);bit.position.set(Math.cos(a)*1.15,Math.sin(a)*.3,Math.sin(a)*1.15);}
  const target=mesh(new T.BoxGeometry(2.1,spec.height+1,1.5),new T.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}),person);ms.add(target.material as T.Material);target.position.y=(spec.height+1)/2;target.userData.entity=spec.id;
  return {spec,person,body,head,orbit,glow,state:'idle' as EncounterState,settle:0};
 });
 let open=false,progress=0;
 const plaques:{canvas:HTMLCanvasElement;texture:T.CanvasTexture;title:boolean;index:number}[]=[];
 function plaque(x:number,y:number,z:number,w:number,title:boolean,index=0){const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=128;const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;const m=new T.MeshBasicMaterial({map:texture});ms.add(m);const o=mesh(new T.PlaneGeometry(w,w/8),m);o.position.set(x,y,z);plaques.push({canvas,texture,title,index});}
 plaque(-92,5.9,9.04,5.2,true);
 entities.forEach((e,i)=>plaque(e.spec.x,.35,e.spec.z+1.55,2.4,false,i));
 function setLocale(locale:string){const l=locale==='de'?'de':locale==='ru'?'ru':'en';for(const p of plaques){const ctx=p.canvas.getContext('2d')!;ctx.fillStyle='#222c30';ctx.fillRect(0,0,1024,128);ctx.fillStyle='#ddd9c6';ctx.textAlign='center';ctx.font='38px monospace';ctx.fillText(p.title?({en:'THE INTELLIGENCE CHAMBER',de:'DIE INTELLIGENZKAMMER',ru:'ПАЛАТА РАЗУМА'})[l]:({en:['THE ARCHIVIST','THE ENGINEER','THE WANDERER'],de:['DER ARCHIVAR','DER INGENIEUR','DER WANDERER'],ru:['АРХИВАРИУС','ИНЖЕНЕР','СТРАННИК']})[l][p.index]!,512,77);p.texture.needsUpdate=true;}}
 setLocale('en');
 return {root,entities,door,setLocale,activate(){open=!open;},
 update(now:number,dt:number,reduced:boolean,player:T.Vector3,active:string|null,phase:EncounterState){
  // Never close a door onto the visitor. The leaf retracts upward and cannot block return.
  const occupied=Math.abs(player.x+92)<4&&Math.abs(player.z-8)<2;
  progress=T.MathUtils.damp(progress,open||occupied?1:0,4,dt);door.position.y=3.4+progress*7;
  for(const [i,e] of entities.entries()){
   const distance=e.person.position.distanceTo(player),engaged=active===e.spec.id;
   const next=engaged?phase:distance<4?'ready':distance<9?'noticing':e.state!=='idle'&&e.settle<1?'returning':'idle';
   if(next!==e.state){e.state=next;e.settle=0;}e.settle+=dt;
   const attentive=engaged||distance<9;
   const yaw=attentive?Math.atan2(player.x-e.spec.x,player.z-e.spec.z):0;
   e.person.rotation.y+=Math.atan2(Math.sin(yaw-e.person.rotation.y),Math.cos(yaw-e.person.rotation.y))*(1-Math.exp(-dt*3));
   const t=now/1000+i*2,thinking=next==='thinking',responding=next==='responding';
   e.body.position.y=reduced?0:Math.sin(t*(i===2?1.5:.8))*(i===2?.16:.035)+(responding?Math.sin(t*3)*.04:0);
   e.head.rotation.z=reduced?0:Math.sin(t*1.3)*.035;
   if(!reduced)e.orbit.rotation.y+=dt*(thinking?1.4:i===2?.45:.12);
   e.glow.emissiveIntensity=T.MathUtils.damp(e.glow.emissiveIntensity,thinking?.8+Math.sin(t*4)*.25:responding?1:attentive?.7:.35,5,dt);
  }return player.x<-88&&player.z<32;
 },dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());plaques.forEach(p=>p.texture.dispose());}};
}
