import * as T from 'three';
export const mat=(color:string,metalness=0)=>new T.MeshStandardMaterial({color,roughness:.8,metalness});
export const materials={stone:mat('#c1c9bf'),wall:mat('#9eafb4'),roof:mat('#385b6b',.25),wood:mat('#a7815b'),glass:mat('#8dc2c8',.35),gold:mat('#cbb68a',.2),dark:mat('#3c5159')};
export const boxGeo=new T.BoxGeometry(1,1,1), cylinderGeo=new T.CylinderGeometry(1,1,1,32),coneGeo=new T.ConeGeometry(1,1,7);
function mesh(geo:T.BufferGeometry,material:T.Material,parent:T.Object3D,x:number,y:number,z:number,sx=1,sy=1,sz=1){const m=new T.Mesh(geo,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
export function box(p:T.Object3D,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){return mesh(boxGeo,m,p,x,y,z,sx,sy,sz);}

export function landmark(type:string,g:T.Group){
 const pad=type==='stage'?5.1:type==='commons'?3.4:type==='station'?2.6:type==='pavilion'?2.7:type==='workshop'?4.2:3.5;
 mesh(cylinderGeo,materials.stone,g,0,.08,0,pad,.24,pad);
 if(type==='workshop'){
  // Sawtooth workshop hall, glazed research wing, and a sheltered entry court.
  box(g,materials.wall,0,1.15,0,5.6,2.1,3.8);
  for(let i=0;i<4;i++){const roof=box(g,materials.roof,-2.1+i*1.4,2.36,0,1.5,.2,4.1);roof.rotation.z=.17;box(g,materials.glass,-1.5+i*1.4,2.32,0,.13,.45,3.8);box(g,materials.glass,-2.05+i*1.35,1.35,1.92,.85,.8,.04);}
  box(g,materials.stone,-4.1,.85,-.7,2,1.5,3);box(g,materials.roof,-4.1,1.67,-.7,2.3,.15,3.3);
  box(g,materials.dark,3.8,1.7,-.6,1.5,3.2,2.8);box(g,materials.glass,3.8,1.8,.82,1.25,2.4,.04);box(g,materials.roof,3.8,3.36,-.6,1.8,.18,3);
  box(g,materials.wood,0,.18,3,3.4,.12,1.8);box(g,materials.roof,0,1.8,2.6,2.8,.12,1.5);for(const x of [-1.25,1.25])box(g,materials.dark,x,.95,3.15,.1,1.7,.1);
 }else if(type==='station'){
  box(g,materials.wall,0,.65,0,1.9,1.1,1.5);box(g,materials.roof,0,1.28,0,2.1,.16,1.7);
  const dish=mesh(new T.SphereGeometry(.65,24,12,0,Math.PI*2,0,Math.PI/2),materials.stone,g,0,1.85,0);dish.rotation.z=-.5;
  box(g,materials.gold,.3,2.2,0,.05,1,.05);
  for(let i=0;i<3;i++){const p=box(g,materials.glass,-1.9, .65, -.9+i*.85,.9,.08,.65);p.rotation.z=.25;}
 }else if(type==='pavilion'){
  for(let i=0;i<8;i++){const a=i*Math.PI/4;box(g,materials.wood,Math.cos(a)*1.1,.8,Math.sin(a)*1.1,.1,1.5,.1);}
  mesh(new T.ConeGeometry(1.65,.6,8),materials.roof,g,0,1.75,0);
  mesh(new T.SphereGeometry(.42,24,16),materials.glass,g,0,.85,0);
  for(let i=0;i<5;i++){box(g,materials.wood,-2,.15,-1+i*.55,.7,.25,.35);}
 }else if(type==='observatory'){
  for(let i=0;i<3;i++)mesh(cylinderGeo,materials.stone,g,0,.12+i*.14,0,3.7-i*.4,.24,3.7-i*.4);
  mesh(cylinderGeo,materials.wall,g,0,1.6,0,2.2,2.4,2.2);
  mesh(new T.SphereGeometry(2.25,32,16,0,Math.PI*2,0,Math.PI/2),materials.roof,g,0,2.8,0);
  const scope=mesh(cylinderGeo,materials.stone,g,.9,3.8,.15,.33,2.6,.33);scope.rotation.z=-.85;
  const lens=mesh(cylinderGeo,materials.glass,g,1.9,4.67,.15,.34,.06,.34);lens.rotation.z=-.85;
  box(g,materials.wall,-2.7,.8,-.6,2.2,1.1,2);box(g,materials.roof,-2.7,1.4,-.6,2.4,.14,2.2);
 }else if(type==='archive'){
  box(g,materials.stone,0,1.3,0,3.8,2.4,2.4);const roof=box(g,materials.roof,0,2.65,0,4.2,.24,2.8);roof.rotation.z=.08;
  box(g,materials.stone,-2.4,2.1,-.2,1.25,4,1.5);box(g,materials.roof,-2.4,4.2,-.2,1.6,.18,1.8);
  for(let i=0;i<5;i++)box(g,materials.wood,-1.4+i*.7,1.3,1.22,.22,1.7,.08);
  for(let i=0;i<5;i++)box(g,materials.stone,0,.08+i*.08,2.4-i*.23,2,.16,.5);
 }else if(type==='stage'){
  // Solid seating terraces and a structural acoustic shell, all in one scale.
  for(let i=0;i<5;i++){
   const radius=2.6+i*.55,start=-.55,end=start+Math.PI*1.35,shape=new T.Shape();
   shape.absarc(0,0,radius+.28,start,end,false);shape.lineTo(Math.cos(end)*(radius-.28),Math.sin(end)*(radius-.28));shape.absarc(0,0,radius-.28,end,start,true);shape.closePath();
   const tier=mesh(new T.ExtrudeGeometry(shape,{depth:.3+i*.3,bevelEnabled:false,curveSegments:40}),materials.stone,g,0,.05,0);tier.rotation.x=-Math.PI/2;
  }
  mesh(cylinderGeo,materials.wood,g,0,.3,0,2.2,.35,2.2);
  const shellMaterial=materials.roof.clone();shellMaterial.side=T.DoubleSide;
  const shell=mesh(new T.CylinderGeometry(2.2,2.2,1.5,32,1,true,-Math.PI/2,Math.PI),shellMaterial,g,0,.45,-.8);shell.rotation.x=-Math.PI/2;
  for(const x of [-2.15,2.15])box(g,materials.wood,x,.5,-.8,.16,.8,.2);
 }else{
  mesh(new T.ConeGeometry(3,.7,6),materials.roof,g,0,2.7,0);for(let i=0;i<6;i++){const a=i*Math.PI/3;box(g,materials.wood,Math.cos(a)*2.5,1.35,Math.sin(a)*2.5,.18,2.7,.18);}
  for(let i=0;i<6;i++){const a=i*Math.PI/3;box(g,materials.stone,Math.cos(a)*4.6,.15,Math.sin(a)*4.6,1.6,.24,1.6);}
 }
}
