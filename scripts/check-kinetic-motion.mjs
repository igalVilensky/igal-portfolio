// Run with Node 22+: node --experimental-strip-types scripts/check-kinetic-motion.mjs
import assert from 'node:assert/strict';
import { KineticMotion, angularDifference } from '../app/spatial-experiments/kineticMotion.ts';
const advance=(model,seconds,rate=60)=>{for(let i=0;i<seconds*rate;i++)model.tick(1/rate)};
function flick(rate) {
 const model=new KineticMotion();
 model.beginDrag('inner',0); model.drag(.3,50); model.drag(.3,100);model.endDrag(100);
 const start=model.pose.inner;
 advance(model,1,rate);
 return { model, displacement:model.pose.inner-start };
}
const at30=flick(30),at60=flick(60),at144=flick(144);
assert(Math.abs(at30.displacement-at144.displacement)<1e-10,'Coast and idle displacement must be frame-rate invariant');
assert(Math.abs(at60.displacement-at144.displacement)<1e-10);
assert(at60.model.velocity.inner>0 && at60.model.velocity.inner<.55,'A flick must coast and substantially damp');
advance(at60.model,5);assert.equal(at60.model.velocity.inner,0,'Inertia must settle');
const reversed=new KineticMotion();reversed.beginDrag('carrier',0);reversed.drag(-.4,50);reversed.endDrag(70);assert(reversed.velocity.carrier<0);
reversed.beginDrag('carrier',100);reversed.drag(.4,120);reversed.endDrag(121,true);assert.equal(reversed.velocity.carrier,0,'Cancellation must not launch inertia');
const precise=new KineticMotion();precise.beginDrag('outer',0);precise.drag(.01,100);precise.endDrag(300);assert.equal(precise.velocity.outer,0,'Holding the ring before release must stop a flick');
const reduced=flick(60).model;reduced.configure(false,true);assert.equal(reduced.velocity.inner,0);reduced.beginDrag('outer',0);reduced.drag(.2,50);reduced.endDrag(50);assert.equal(reduced.velocity.outer,0);
reduced.select('json',Math.PI/2+2*Math.PI/3);reduced.tick(1/60);assert.equal(reduced.phase,'selected');assert.equal(reduced.moduleLift('json'),.32);reduced.select(null);reduced.tick(1/60);assert.equal(reduced.phase,'free');
const model=flick(60).model;const resting={...model.pose};model.select('contrast',Math.PI/2+4*Math.PI/3);
assert.equal(model.moduleLift('contrast'),0,'Selection must stabilize and align before lifting');
assert.equal(model.beginDrag('outer',0),false,'Alignment owns transforms');
advance(model,4);assert.equal(model.phase,'selected');assert(Math.abs(angularDifference(2*Math.PI/3,model.pose.index))<.002,'Use the short presentation path');
model.select(null);advance(model,.3);assert.equal(model.phase,'returning','Dock before returning the mechanism');advance(model,3);assert.equal(model.phase,'free');assert(Math.abs(angularDifference(resting.inner,model.pose.inner))<.12,'Return near the manipulated pose');
console.log('Angular dynamics: frame-rate invariance, bounded damping, reversal, cancellation, held release, reduced motion, phased selection and return pass.');
// Coordinated spin shares the angular integrator with drag, coast and alignment.
function spin(rate) { const m=new KineticMotion();m.configure(true,false);m.setSpin(true);advance(m,3,rate);return m; }
const spin30=spin(30),spin144=spin(144);
for(const id of ['outer','inner','carrier'])assert(Math.abs(spin30.pose[id]-spin144.pose[id])<1e-10,'Spin must be frame-rate invariant');
assert(spin30.velocity.outer>0 && spin30.velocity.inner<0 && spin30.velocity.carrier>0);
spin30.setSpin(false);const stopPose={...spin30.pose};advance(spin30,4);
assert.equal(spin30.state,'idle');assert(spin30.pose.outer>stopPose.outer,'Stop coasts forward');assert(spin30.pose.outer-stopPose.outer<.11,'Stop is controlled');
const stopped={...spin30.pose};advance(spin30,1);assert.deepEqual(spin30.pose,stopped,'Stopped pose is preserved with ambient paused');
const grab=spin(60);assert(grab.beginDrag('inner',0));assert(!grab.spinning);assert.deepEqual(grab.velocity,{outer:0,inner:0,carrier:0});grab.drag(.2,40);grab.endDrag(40,true);advance(grab,1);assert.equal(grab.velocity.inner,0);
const opening=spin(60);opening.select('json');assert(!opening.spinning);opening.setSpin(true);assert(!opening.spinning,'Alignment rejects spin');advance(opening,4);assert.equal(opening.phase,'selected');opening.select(null);advance(opening,3);assert(!opening.spinning);
const preference=spin(60);preference.configure(false,true);preference.setSpin(true);assert(!preference.spinning);assert.equal(preference.velocity.outer,0);
console.log('Coordinated spin: frame-rate invariance, stop continuity, drag takeover, alignment precedence and reduced motion pass.');
