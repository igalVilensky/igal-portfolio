import * as T from 'three';
import { skyEase } from './skytube';

/** One compact southwest attraction, driven exclusively by Arrival's scene loop. */
export function createSkyCoaster(scene:T.Scene,solids:T.Mesh[]) {
 const root=new T.Group();root.name='Sky Coaster · above the clouds';scene.add(root);
 const route=new T.CatmullRomCurve3([
  new T.Vector3(-58,1,96),new T.Vector3(-74,5,96),new T.Vector3(-94,18,106),
  new T.Vector3(-111,23,126),new T.Vector3(-92,9,149),new T.Vector3(-60,5,145),
  new T.Vector3(-36,12,128),new T.Vector3(-30,16,108),new T.Vector3(-42,4,96),
 ],true,'centripetal');
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>();
 const mat=(color:string,metalness=0)=>{const m=new T.MeshStandardMaterial({color,roughness:.55,metalness});ms.add(m);return m;};
 const pale=mat('#e9dfcc'),metal=mat('#476974',.7),accent=mat('#d18456'),seat=mat('#487d81');
 const car=new T.Group();car.name='Sky Coaster · single passenger carriage';root.add(car);
 function mesh(g:T.BufferGeometry,m:T.Material,parent:T.Object3D=root){gs.add(g);const o=new T.Mesh(g,m);parent.add(o);o.receiveShadow=true;o.userData.noCollision=true;return o;}
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m=pale,parent:T.Object3D=root,solid=false){const o=mesh(new T.BoxGeometry(w,h,d),m,parent);o.position.set(x,y,z);if(solid){o.userData.noCollision=false;o.userData.room='coaster';solids.push(o);}return o;}
 class Rail extends T.Curve<T.Vector3>{constructor(private side:number){super();}getPoint(t:number,target=new T.Vector3()){const tangent=route.getTangentAt(t);route.getPointAt(t,target);target.x+=tangent.z*this.side;target.z-=tangent.x*this.side;return target;}}
 for(const side of [-.7,.7])mesh(new T.TubeGeometry(new Rail(side),240,.095,6,true),metal);
 const tieG=new T.BoxGeometry(1.9,.12,.16),tangent=new T.Vector3(),point=new T.Vector3();
 const length=route.getLength();
 for(let distance=0;distance<length;distance+=1.8){const u=distance/length;route.getPointAt(u,point);route.getTangentAt(u,tangent);const tie=mesh(tieG,accent);tie.position.copy(point);tie.rotation.y=Math.atan2(tangent.x,tangent.z);}
 for(let distance=12;distance<length;distance+=18){route.getPointAt(distance/length,point);const base=point.z>132||point.x< -112?-17:0;const support=box(.38,point.y-base, .38,point.x,(point.y+base)/2,point.z,metal);support.name='Coaster structural pier';box(3,.25,2,point.x,base,point.z,metal);}
 // Ground-level side boarding, outside the main entrance and all eastern transport routes.
 box(19,.08,6,-58,.04,92,pale);box(19,.18,5,-58,4,92,pale);
 for(const x of [-66,-50])box(.22,4,.22,x,2,90,metal,root,true);
 box(13,.6,.22,-58,3.4,89.5,accent);
 box(1.8,.24,3.2,0,.25,0,accent,car);box(1.5,.25,1.35,0,.62,.2,seat,car);
 box(1.5,1,.22,0,1.1,1,seat,car);box(.12,.55,2.6,.9,.7,0,metal,car);box(.12,.55,2.6,-.9,.7,0,metal,car);
 box(1.7,.12,.12,0,1.15,-.65,metal,car);box(1.8,.5,.32,0,.6,-1.5,pale,car);
 // Broad visible boarding target, with proximity checked separately.
 const control=box(1,.9,.5,-58,.5,90,accent,root,true);control.userData.coaster=true;
 car.traverse(o=>{if(o instanceof T.Mesh){o.userData.coaster=true;solids.push(o);}});
 let phase:'docked'|'boarding'|'riding'|'arriving'|'exiting'='docked',passenger=false,elapsed=0,distance=0,lastYaw=0,paused=false;
 const start=new T.Vector3(),anchor=new T.Vector3(),exit=new T.Vector3(-58,1.65,92),forward=new T.Vector3();
 // Arc-length speed table: slower climb/curves, faster descent, smooth station envelope.
 const samples=600,times=[0];let total=0;
 for(let i=0;i<samples;i++){const u=(i+.5)/samples,t=route.getTangentAt(u),a=route.getTangentAt(Math.max(0,u-.008)),b=route.getTangentAt(Math.min(1,u+.008));const bend=a.angleTo(b);const envelope=.22+.78*Math.sin(Math.PI*u)**.45;const speed=T.MathUtils.clamp(9-t.y*8-bend*14,4,14)*envelope;total+=length/samples/speed;times.push(total);}
 function pose(){const u=distance/length;route.getPointAt(u,car.position);route.getTangentAt(u,forward);const yaw=Math.atan2(-forward.x,-forward.z);car.rotation.set(Math.atan2(forward.y,Math.hypot(forward.x,forward.z)),yaw,0,'YXZ');car.updateMatrixWorld(true);return yaw;}
 lastYaw=pose();
 return {
  root,route,car,length,duration:total,
  get ownsPassenger(){return passenger;},get phase(){return phase;},
  canBoard(p:T.Vector3){return !passenger&&phase==='docked'&&p.distanceTo(exit)<4.5;},
  activate(camera:T.PerspectiveCamera){if(passenger){if(phase!=='docked')return false;phase='exiting';elapsed=0;start.copy(camera.position);return true;}if(!this.canBoard(camera.position))return false;passenger=true;phase='boarding';elapsed=0;start.copy(camera.position);lastYaw=car.rotation.y;return true;},
  setPaused(value:boolean){paused=value;},
  update(dt:number,reduced:boolean,camera:T.PerspectiveCamera){if(paused||!passenger)return {changed:false,turn:0};if(!Number.isFinite(dt)||dt<0)return {changed:false,turn:0};elapsed+=dt;let turn=0;
   if(phase==='boarding'){car.localToWorld(anchor.set(0,1.65,.3));camera.position.lerpVectors(start,anchor,skyEase(elapsed/1.5));if(elapsed>=1.5){phase='riding';elapsed=0;}}
   else if(phase==='riding'){
    const time=Math.min(total,elapsed/(reduced?1.35:1));let lo=0,hi=samples;while(lo+1<hi){const mid=(lo+hi)>>1;if(times[mid]!<=time)lo=mid;else hi=mid;}
    distance=length*(lo+T.MathUtils.clamp((time-times[lo]!)/(times[lo+1]!-times[lo]!),0,1))/samples;
    if(time>=total){distance=0;phase='arriving';elapsed=0;}const yaw=pose();turn=Math.atan2(Math.sin(yaw-lastYaw),Math.cos(yaw-lastYaw));lastYaw=yaw;car.localToWorld(camera.position.set(0,1.65,.3));
   }else if(phase==='arriving'){car.localToWorld(camera.position.set(0,1.65,.3));if(elapsed>=.7){phase='docked';elapsed=0;}}
   else if(phase==='exiting'){camera.position.lerpVectors(start,exit,skyEase(elapsed/1.3));if(elapsed>=1.3){camera.position.copy(exit);passenger=false;phase='docked';elapsed=0;}}
   else car.localToWorld(camera.position.set(0,1.65,.3));
   return {changed:true,turn};
  },
  setTheme(dark:boolean){pale.color.set(dark?'#9daebe':'#e9dfcc');},
  dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());},
 };
}
