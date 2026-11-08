import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {readFileSync} from 'node:fs';
// Load the pure transform helper without Nuxt or the portal's asset imports.
const source=readFileSync(new URL('./portal.ts',import.meta.url),'utf8');
const helper=source.slice(source.indexOf('export function screenPose')).replace('export function','function').replace('screen:T.Mesh','screen');
const screenPose=new Function('T',helper+';return screenPose;')(T);
test('screen approach respects parent transforms, tilt, visible front, and world up',()=>{
 const parent=new T.Group();parent.position.set(12,3,-40);parent.rotation.set(.07,.6,.12);parent.scale.set(1.2,1.2,1.2);
 const screen=new T.Mesh(new T.PlaneGeometry(9.4,4.6));screen.position.set(2,1,-3);screen.rotation.set(-.08,-.12,0);parent.add(screen);
 const pose=screenPose(screen,5);const center=screen.getWorldPosition(new T.Vector3());
 assert(pose.center.distanceTo(center)<1e-10);assert(Math.abs(pose.position.distanceTo(center)-5)<1e-10);
 assert(pose.position.clone().sub(center).dot(pose.normal)>0);
 const forward=new T.Vector3(0,0,-1).applyQuaternion(pose.quaternion);
 assert(forward.dot(pose.normal)<-.999999);
 const right=new T.Vector3(1,0,0).applyQuaternion(pose.quaternion);assert(Math.abs(right.y)<1e-10);
});
