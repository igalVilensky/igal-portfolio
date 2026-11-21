import * as T from 'three';
import {wildlifePose,wildlifeRoutes} from './destination-state';
/** Shared sculpted ellipsoids, articulated limbs and species-specific facial anatomy. */
export function createArcticWildlife(parent:T.Group){
 const root=new T.Group();root.name='Arctic wildlife territories';parent.add(root);const geometry:T.BufferGeometry[]=[];
 const fur=new T.MeshStandardMaterial({color:'#eee9dc',roughness:1}),foxFur=new T.MeshStandardMaterial({color:'#f3f2ee',roughness:1}),brown=new T.MeshStandardMaterial({color:'#8b7969',roughness:1}),dark=new T.MeshStandardMaterial({color:'#222d35',roughness:.8}),antler=new T.MeshStandardMaterial({color:'#c7ba9c',roughness:1});const mats=[fur,foxFur,brown,dark,antler];
 const sphere=new T.SphereGeometry(1,16,12);geometry.push(sphere);
 function ell(p:T.Object3D,m:T.Material,x:number,y:number,z:number,sx:number,sy:number,sz:number){const o=new T.Mesh(sphere,m);o.position.set(x,y,z);o.scale.set(sx,sy,sz);p.add(o);return o;}
 function twig(p:T.Object3D,a:T.Vector3,b:T.Vector3,r=.035){const g=new T.CylinderGeometry(r*.6,r,a.distanceTo(b),6);geometry.push(g);const o=new T.Mesh(g,antler);o.position.copy(a).add(b).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().sub(a).normalize());p.add(o);}
 const animals=wildlifeRoutes.map((r,index)=>{const body=new T.Group();root.add(body);const bear=index===0,fox=index===1,m=bear?fur:fox?foxFur:brown;
 const height=bear?1.25:fox?.42:1.35,length=bear?1.35:fox?.48:.95,width=bear?.6:fox?.22:.38;
 ell(body,m,0,height,0,width,bear?.7:fox?.25:.55,length);
 if(bear)ell(body,m,0,height+.12,.7,.58,.65,.6); // powerful shoulder hump
 const head=new T.Group();head.position.set(0,height+(bear?.25:fox?.09:.75),length*.9);body.add(head);
 ell(head,m,0,0,0,bear?.38:fox?.21:.25,bear?.38:fox?.21:.32,bear?.48:fox?.23:.4);
 ell(head,m,0,-.09,bear?.45:fox?.25:.33,bear?.25:fox?.11:.15,bear?.19:fox?.10:.19,bear?.35:fox?.22:.27);
 ell(head,dark,0,-.05,bear?.73:fox?.44:.57,bear?.13:fox?.065:.09,bear?.08:.06,bear?.08:.055);
 for(const s of [-1,1]){ell(head,dark,s*(bear?.3:fox?.16:.2),.05,bear?.28:fox?.15:.19,bear?.045:.027,.035,.035);
 if(fox){const earG=new T.ConeGeometry(.10,.28,4);geometry.push(earG);const ear=new T.Mesh(earG,m);ear.position.set(s*.16,.25,-.05);head.add(ear);ell(head,brown,s*.16,.26,-.005,.045,.09,.025);}else ell(head,m,s*(bear?.28:.24),bear?.32:.24,-.03,bear?.12:.17,bear?.14:.09,.09);
 }
 if(!bear&&!fox){ell(body,m,0,1.9,.65,.28,.65,.32);ell(body,fur,0,1.8,.87,.17,.4,.13);for(const s of [-1,1]){const a=new T.Vector3(s*.17,.25,-.1),b=new T.Vector3(s*.48,1.08,-.3);twig(head,a,b,.045);for(let j=0;j<3;j++){const t=j/4+.25;const c=a.clone().lerp(b,t);twig(head,c,c.clone().add(new T.Vector3(s*.2,.27,.12)),.025);}}}
 const legs:T.Group[]=[];for(const s of [-1,1])for(const end of [-1,1]){const pivot=new T.Group();pivot.position.set(s*width*.68,height-.2,end*length*.62);body.add(pivot);const h=height-.2;ell(pivot,m,0,-h*.42,0,bear?.19:fox?.055:.075,h*.6,bear?.22:fox?.07:.08);ell(pivot,bear?m:dark,0,-h+.04,.08,bear?.22:fox?.07:.09,bear?.13:.06,bear?.32:fox?.1:.13);legs.push(pivot);}
 const tail=ell(body,m,0,fox?.5:height,-length,bear?.14:fox?.16:.11,bear?.14:fox?.17:.15,bear?.16:fox?.48:.24);tail.rotation.x=fox?-.4:0;
 return {body,head,legs,time:index*15,travel:index*15};});
 return {update(dt:number,reduced:boolean,player:T.Vector3,active:boolean){root.visible=active;if(!active)return false;for(let i=0;i<animals.length;i++){const a=animals[i]!;if(Math.hypot(player.x-wildlifeRoutes[i]!.x,player.z-wildlifeRoutes[i]!.z)>180)continue;if(!reduced)a.time+=dt;const pose=wildlifePose(i,a.time);if(!reduced&&pose.moving)a.travel+=dt;const p=wildlifePose(i,a.travel);a.body.position.set(p.x,0,p.z);a.body.rotation.y=p.heading;a.head.rotation.y=reduced?0:Math.sin(a.time*.6)*.14;a.head.rotation.x=i===2&&!pose.moving?.6:0;a.legs.forEach((leg,j)=>leg.rotation.x=reduced||!pose.moving?0:Math.sin(a.time*(i===1?9:3)+(j===0||j===3?0:Math.PI))*(i===1?.35:.2));}return !reduced;},dispose(){root.removeFromParent();geometry.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());}};
}
