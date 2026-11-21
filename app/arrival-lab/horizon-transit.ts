import * as T from 'three';
export const horizonTerminals=[new T.Vector3(0,0,140),new T.Vector3(930,0,-720)] as const;
export const horizonExits=[new T.Vector3(-4,1.65,140),new T.Vector3(926,1.65,-716)] as const;
export const horizonDuration=22;
export type HorizonPhase='docked'|'boarding'|'launching'|'cruising'|'approaching'|'docking'|'disembarking';
export function createHorizonRoute(){const route=new T.CatmullRomCurve3([
 horizonTerminals[0].clone(),new T.Vector3(0,100,140),new T.Vector3(250,160,100),new T.Vector3(570,180,-270),new T.Vector3(900,100,-720),horizonTerminals[1].clone()
 ],false,'centripetal');route.arcLengthDivisions=2000;route.updateArcLengths();return route;}
/** Integral of a trapezoidal velocity profile: finite acceleration, constant cruise, symmetric braking. */
export function horizonDistance(t:number){t=T.MathUtils.clamp(t,0,1);const a=.2,v=1/(1-a);return t<a?v*t*t/(2*a):t>1-a?1-v*(1-t)**2/(2*a):v*(t-a/2);}
export function horizonCanBoard(s:{passenger:boolean;flight:boolean;swimming:boolean;skyfall:boolean;guided:boolean;otherWorld:boolean;builder:boolean;airborne:boolean;carrying:boolean}){return !Object.values(s).some(Boolean);}
/** No renderer, input listeners or independent clock. Scene and passenger share this exact path sample. */
export function createHorizonTransit(){
 const route=createHorizonRoute(),point=new T.Vector3(),tangent=new T.Vector3();
 let phase:HorizonPhase='docked',source:0|1=0,age=0,paused=false,disposed=false,u=0;
 const owns=()=>phase!=='docked';
 function recover(camera:T.Camera){camera.position.copy(horizonExits[source]);phase='docked';age=0;u=source;}
 return {route,get phase(){return phase;},get ownsPassenger(){return owns();},get source(){return source;},get progress(){return u;},
 board(station:0|1,camera:T.Camera,allowed:boolean){if(disposed||owns()||!allowed||camera.position.distanceTo(horizonExits[station])>7)return false;source=station;age=0;u=source;phase='boarding';return true;},
 cancel(camera:T.Camera){if(phase!=='boarding')return false;recover(camera);return true;},
 recover,setPaused(value:boolean){paused=value;},
 update(dt:number,camera:T.Camera){
  if(disposed||!owns()||paused)return;
  if(!Number.isFinite(dt)||dt<0||!camera.position.toArray().every(Number.isFinite)){recover(camera);return 'recovered';}
  age+=Math.min(dt,.1);
  if(age<1.2)phase='boarding';
  else if(age<1.2+horizonDuration){const t=(age-1.2)/horizonDuration;phase=t<.2?'launching':t>.8?'approaching':'cruising';u=source===0?horizonDistance(t):1-horizonDistance(t);}
  else {u=1-source;phase=age<24?'docking':'disembarking';}
  route.getPointAt(u,point);camera.position.copy(point);camera.position.y+=1.65;
  if(age>=24.6){const target=(1-source) as 0|1;camera.position.copy(horizonExits[target]);if(!camera.position.toArray().every(Number.isFinite)){recover(camera);return 'recovered';}phase='docked';return 'arrived';}
 },
 sample(){route.getPointAt(u,point);route.getTangentAt(u,tangent);if(source)tangent.negate();return {point,tangent};},
 dispose(){disposed=true;phase='docked';paused=true;}
 };
}
