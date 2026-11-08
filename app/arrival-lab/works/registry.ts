import * as T from 'three';
import { expansionLeg } from '../spaces';
export interface WorksModule {
 id:string; type:'portal'|'mechanism'|'archive'; projectId?:string;
 location:readonly [number,number,number]; destination:readonly [number,number,number];
 lookAt:readonly [number,number,number]; interaction:'enter'|'manipulate'|'browse'; availability:'available'|'planned';
}
export const worksModules:readonly WorksModule[]=[
 {id:'flowforge',type:'portal',projectId:'flowforge',location:[23.25,2.8,-35],destination:[18.75,1.65,-35],lookAt:[23.25,2.8,-35],interaction:'enter',availability:'available'},
 {id:'matrix',type:'mechanism',projectId:'decision-matrix-ai',location:[32,3,-100],destination:[32,1.65,-82],lookAt:[32,5.5,-100],interaction:'manipulate',availability:'available'},
 {id:'archive',type:'archive',location:[46,3.5,-110.5],destination:[46,1.65,-103],lookAt:[46,3.5,-110.5],interaction:'browse',availability:'available'},
];
export const worksArrival=new T.Vector3(22,1.65,-87);
/** Shared passage waypoints keep guided routes on the floor and through actual openings. */
export function worldPath(from:T.Vector3,to:T.Vector3):T.Vector3[]{
 if(from.distanceToSquared(to)<.0001)return [from.clone(),to.clone()];
 const a=expansionLeg(from),b=expansionLeg(to);
 if(a.length&&b.length)return [...a.slice(0,-1),...b.slice(0,-1).reverse()];
 if(a.length||b.length){const start=a.at(-1)||from,end=b.at(-1)||to;return [...a,...worldPath(start,end),...b.reverse()];}
 const path=[from.clone()], fromWorks=from.x>10&&from.z<-72, toWorks=to.x>10&&to.z<-72;
 if(fromWorks){path.push(new T.Vector3(from.x,1.65,-87));if(!toWorks)path.push(new T.Vector3(22,1.65,-94),new T.Vector3(0,1.65,-94));}
 if(from.z<-72&&to.z>-72)path.push(new T.Vector3(0,1.65,-76),new T.Vector3(0,1.65,-64));
 if(from.z>-72&&to.z<-72)path.push(new T.Vector3(0,1.65,-64),new T.Vector3(0,1.65,-76));
 if(toWorks){if(!fromWorks)path.push(new T.Vector3(0,1.65,-94),new T.Vector3(22,1.65,-94));path.push(new T.Vector3(to.x,1.65,-87));}
 path.push(to.clone());return path;
}
