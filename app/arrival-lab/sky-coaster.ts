import * as T from 'three';
import { skyEase } from './skytube';

/** Arc-length motion and parallel-transport frames keep rails, train and rider in sync. */
export function createSkyCoaster(scene:T.Scene,solids:T.Mesh[]) {
 const root=new T.Group();root.name='Sky Coaster · Cloudbreaker';scene.add(root);
 const points=[[-58,1,96],[-77,1,96],[-96,15,99],[-117,43,107],[-136,47,122],[-149,29,142],[-146,5,162],[-120,3,163],[-111,4,173],[-110,4,180]];
 // A complete vertical loop, with a small lateral drift separating entry and exit.
 for(let i=1;i<=16;i++){const a=i/16*Math.PI*2;points.push([-110+i*.45,18-14*Math.cos(a),180+14*Math.sin(a)]);}
 points.push([-102,4,187],[-91,5,203],[-65,12,203],[-42,24,187],[-31,28,163],[-37,11,143],[-23,8,132],[-25,6,110],[-40,1,96],[-48,1,96]);
 const route=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(p[0]!,p[1]!,p[2]!)),true,'centripetal');route.arcLengthDivisions=4000;route.updateArcLengths();
 const length=route.getLength(),samples=1600;
 const gs=new Set<T.BufferGeometry>(),ms=new Set<T.Material>();
 const mat=(color:string,metalness=0,glow=false)=>{const m=new T.MeshStandardMaterial({color,roughness:.38,metalness,emissive:glow?color:'#000000',emissiveIntensity:glow?.8:0});ms.add(m);return m;};
 const pale=mat('#e9dfcc'),metal=mat('#304957',.75),accent=mat('#f19a50',.5),seat=mat('#244e66'),light=mat('#74f7ed',.3,true);
 function mesh(g:T.BufferGeometry,m:T.Material,parent:T.Object3D=root){gs.add(g);const o=new T.Mesh(g,m);parent.add(o);o.receiveShadow=true;o.userData.noCollision=true;return o;}
 function box(w:number,h:number,d:number,x:number,y:number,z:number,m=pale,parent:T.Object3D=root,solid=false){const o=mesh(new T.BoxGeometry(w,h,d),m,parent);o.position.set(x,y,z);if(solid){o.userData.noCollision=false;o.userData.room='coaster';solids.push(o);}return o;}
 const tangents=Array.from({length:samples+1},(_,i)=>route.getTangentAt(i/samples));
 const rights=[new T.Vector3().crossVectors(tangents[0]!,new T.Vector3(0,1,0)).normalize()];
 const rotation=new T.Quaternion(),axis=new T.Vector3();
 for(let i=1;i<=samples;i++){rotation.setFromUnitVectors(tangents[i-1]!,tangents[i]!);rights.push(rights[i-1]!.clone().applyQuaternion(rotation).normalize());}
 // Distribute any closing twist so the station has no orientation seam.
 const twist=Math.atan2(axis.crossVectors(rights[samples]!,rights[0]!).dot(tangents[0]!),rights[samples]!.dot(rights[0]!));
 // Anchor the loop crown to an inverted frame; ease the roll correction in and out.
 let crown=0,best=Infinity;
 for(let i=0;i<=samples;i++){const d=route.getPointAt(i/samples).distanceToSquared(new T.Vector3(-106.4,32,180));if(d<best){best=d;crown=i;}}
 const crownT=tangents[crown]!,crownRight=rights[crown]!.clone().applyAxisAngle(crownT,twist*crown/samples);
 const desired=new T.Vector3(-1,0,0).addScaledVector(crownT,crownT.x).normalize();
 const crownRoll=Math.atan2(new T.Vector3().crossVectors(crownRight,desired).dot(crownT),crownRight.dot(desired));
 const frames:T.Quaternion[]=[];
 for(let i=0;i<=samples;i++){
  const u=i/samples,t=tangents[i]!,r=rights[i]!.applyAxisAngle(t,twist*u);
  const bend=new T.Vector3().crossVectors(tangents[Math.max(0,i-5)]!,tangents[Math.min(samples,i+5)]!).y;
  const bank=T.MathUtils.clamp(bend*2,-.5,.5)*Math.sin(Math.PI*u);
  const loopWeight=Math.max(0,1-Math.abs(i-crown)/(samples*.19));
  r.applyAxisAngle(t,bank+crownRoll*skyEase(loopWeight));const up=new T.Vector3().crossVectors(r,t).normalize();
  frames.push(new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(r,up,t.clone().negate())));
 }
 const frame=new T.Quaternion(),right=new T.Vector3(),up=new T.Vector3();
 function orientation(u:number,target:T.Quaternion){const f=T.MathUtils.clamp(u,0,1)*samples,i=Math.min(samples-1,Math.floor(f));return target.copy(frames[i]!).slerp(frames[i+1]!,f-i);}
 class Rail extends T.Curve<T.Vector3>{constructor(private side:number,private height=0){super();}getPoint(t:number,target=new T.Vector3()){orientation(t,frame);right.set(1,0,0).applyQuaternion(frame);up.set(0,1,0).applyQuaternion(frame);return route.getPointAt(t,target).addScaledVector(right,this.side).addScaledVector(up,this.height);}}
 for(const side of [-1.05,1.05])mesh(new T.TubeGeometry(new Rail(side),1200,.13,6,true),accent);
 mesh(new T.TubeGeometry(new Rail(0,-.55),1200,.22,6,true),metal);
 const tieG=new T.BoxGeometry(2.65,.16,.2),point=new T.Vector3();
 for(let d=0;d<length;d+=2){const u=d/length,tie=mesh(tieG,metal);route.getPointAt(u,tie.position);orientation(u,tie.quaternion);}
 // Piers remain outside the loop; its two side towers form a clear skyline landmark.
 for(let d=14;d<length;d+=22){const u=d/length;route.getPointAt(u,point);if(point.x> -112&&point.x< -100&&point.z>162)continue;const base=point.z>132||point.x< -112?-17:0;box(.65,point.y-base,.65,point.x,(point.y+base)/2,point.z,metal);box(4,.3,4,point.x,base,point.z,metal);}
 for(const x of [-116,-97]){box(.8,53,.8,x,9.5,180,metal);box(.18,34,.18,x,15,180,light);}
 box(20,.18,6,-58,.09,92,pale,root,true);
 for(const x of [-67,-49]){box(.3,5,.3,x,2.5,90,metal,root,true);box(.15,.15,5,x,4.9,92,light);}
 box(21,.4,7,-58,5.2,92,metal);box(19,.12,.15,-58,4.92,88.6,light);
 // Geometry-only station marquee avoids external assets and canvas resources.
 const sign=box(9,1,.2,-58,4.1,89,accent);sign.name='CLOUDBREAKER · boarding station';
 for(let i=0;i<5;i++)box(.18,.04,1,-58-i*.8,.21,92,light);
 const control=box(1,1.1,.6,-58,.75,90,accent,root,true);control.userData.coaster=true;
 box(.7,.12,.64,-58,1.32,90,light);
 const car=new T.Group();car.name='Cloudbreaker · twin-row launch train';root.add(car);
 box(2.35,.5,5.4,0,.25,0,accent,car);box(1.9,.28,5.6,0,.54,0,pale,car);
 const nose=mesh(new T.ConeGeometry(1.18,1.7,4),accent,car);nose.rotation.x=-Math.PI/2;nose.rotation.z=Math.PI/4;nose.position.set(0,.55,-3.1);nose.scale.z=.55;
 for(const z of [-.85,1.15])for(const x of [-.52,.52]){
  box(.85,.22,1,x,.85,z,seat,car);box(.85,1.1,.23,x,1.32,z+.48,seat,car);
  for(const side of [-1,1])box(.08,.72,.12,x+side*.29,1.42,z+.05,light,car);
  box(.65,.1,.12,x,1.08,z-.35,metal,car);
 }
 for(const x of [-1.16,1.16]){box(.13,.5,4.7,x,.95,0,metal,car);box(.08,.08,4.8,x,1.22,0,light,car);for(const z of [-1.8,1.8]){const wheel=mesh(new T.CylinderGeometry(.3,.3,.25,10),metal,car);wheel.rotation.z=Math.PI/2;wheel.position.set(x,-.05,z);}}
 car.traverse(o=>{if(o instanceof T.Mesh){o.userData.coaster=true;solids.push(o);}});
 let phase:'docked'|'boarding'|'riding'|'arriving'|'exiting'='docked',passenger=false,elapsed=0,distance=0,paused=false;
 const start=new T.Vector3(),anchor=new T.Vector3(),exit=new T.Vector3(-58,1.65,92),startLook=new T.Quaternion(),exitLook=new T.Quaternion();
 const times=[0];let total=0,runningSpeed=3;
 // Potential-energy inspired profile: deliberate lift, fast plunge, sustained loop, station brakes.
 for(let i=0;i<samples;i++){const u=(i+.5)/samples,p=route.getPointAt(u),t=tangents[i]!;let speed=T.MathUtils.clamp(Math.sqrt(160+2*16*Math.max(0,47-p.y)),15,39);if(u<.19&&t.y>.1)speed=9;if(u<.035)speed=T.MathUtils.lerp(3,14,u/.035);if(u>.91)speed=T.MathUtils.lerp(18,3,(u-.91)/.09);runningSpeed=T.MathUtils.lerp(runningSpeed,speed,.045);total+=length/samples/runningSpeed;times.push(total);}
 function pose(){const u=distance/length;route.getPointAt(u,car.position);orientation(u,car.quaternion);car.updateMatrixWorld(true);}
 function rider(camera:T.PerspectiveCamera){car.localToWorld(camera.position.set(0,1.85,-1.25));camera.quaternion.copy(car.quaternion);}
 pose();
 return {
  root,route,car,length,duration:total,
  get ownsPassenger(){return passenger;},get phase(){return phase;},
  canBoard(p:T.Vector3){return !passenger&&phase==='docked'&&p.distanceTo(exit)<4.5;},
  activate(camera:T.PerspectiveCamera){if(passenger){if(phase!=='docked')return false;phase='exiting';elapsed=0;start.copy(camera.position);startLook.copy(camera.quaternion);exitLook.setFromEuler(new T.Euler(0,Math.PI,0));return true;}if(!this.canBoard(camera.position))return false;passenger=true;phase='boarding';elapsed=0;start.copy(camera.position);startLook.copy(camera.quaternion);return true;},
  setPaused(value:boolean){paused=value;},
  update(dt:number,reduced:boolean,camera:T.PerspectiveCamera){if(paused||!passenger||!Number.isFinite(dt)||dt<0)return {changed:false,turn:0};elapsed+=dt;
   if(phase==='boarding'){car.localToWorld(anchor.set(0,1.85,-1.25));const blend=skyEase(elapsed/1.5);camera.position.lerpVectors(start,anchor,blend);camera.quaternion.slerpQuaternions(startLook,car.quaternion,blend);if(elapsed>=1.5){phase='riding';elapsed=0;}}
   else if(phase==='riding'){
    const time=Math.min(total,elapsed/(reduced?1.65:1));let lo=0,hi=samples;while(lo+1<hi){const mid=(lo+hi)>>1;if(times[mid]!<=time)lo=mid;else hi=mid;}
    distance=length*(lo+T.MathUtils.clamp((time-times[lo]!)/(times[lo+1]!-times[lo]!),0,1))/samples;
    if(time>=total){distance=0;phase='arriving';elapsed=0;}pose();rider(camera);
   }else if(phase==='arriving'){rider(camera);if(elapsed>=.7){phase='docked';elapsed=0;}}
   else if(phase==='exiting'){const blend=skyEase(elapsed/1.3);camera.position.lerpVectors(start,exit,blend);camera.quaternion.slerpQuaternions(startLook,exitLook,blend);if(elapsed>=1.3){camera.position.copy(exit);passenger=false;phase='docked';elapsed=0;}}
   else rider(camera);
   return {changed:true,turn:0};
  },
  setTheme(dark:boolean){pale.color.set(dark?'#9daebe':'#e9dfcc');},
  dispose(){root.removeFromParent();gs.forEach(g=>g.dispose());ms.forEach(m=>m.dispose());},
 };
}
