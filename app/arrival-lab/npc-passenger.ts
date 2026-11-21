import * as T from 'three';
/** Vehicle owns transforms only while reserved. Never receives a camera. */
export function createNpcPassenger(){
 let rider:T.Object3D|undefined,parent:T.Object3D|null=null,elapsed=0,exiting=false;
 const start=new T.Vector3(),exit=new T.Vector3(),anchor=new T.Vector3(),boarding=new T.Vector3(),seatRotation=new T.Quaternion(),rotation=new T.Quaternion();
 return {get active(){return !!rider;},
  board(person:T.Object3D,vehicle:T.Object3D,seat:T.Vector3,landing:T.Vector3,yaw=0){if(rider)return false;rider=person;parent=person.parent;start.copy(person.position);rotation.copy(person.quaternion);exit.copy(landing);vehicle.attach(person);boarding.copy(person.position);anchor.copy(seat);seatRotation.setFromAxisAngle(T.Object3D.DEFAULT_UP,yaw);elapsed=0;exiting=false;return true;},
  update(dt:number){if(!rider)return;elapsed=Math.min(1.5,elapsed+Math.max(0,Math.min(dt,.2)));const t=elapsed/1.5,blend=t*t*(3-2*t);rider.position.lerpVectors(boarding,exiting?exit:anchor,blend);rider.quaternion.slerp(exiting?rotation:seatRotation,blend);if(exiting&&elapsed>=1.5){rider.quaternion.copy(rotation);rider=undefined;parent=null;}},
  release(){if(!rider||exiting)return;parent?.attach(rider);boarding.copy(rider.position);elapsed=0;exiting=true;},
  dispose(){if(!rider)return;parent?.attach(rider);rider.position.copy(start);rider.quaternion.copy(rotation);rider=undefined;parent=null;}
 };
}
