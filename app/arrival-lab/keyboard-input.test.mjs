import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import * as T from 'three';
const source=readFileSync(new URL('./camera.ts',import.meta.url),'utf8');
const exports={};new Function('require','exports',ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(()=>T,exports);
test('movement is ready before canvas focus, respects UI, and clears across interruptions',()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;
 const win=new EventTarget(),doc=new EventTarget(),canvas=new EventTarget();globalThis.window=win;globalThis.document=doc;
 let closest=null;
 const key=()=>{const event=new Event('keydown',{cancelable:true});Object.defineProperties(event,{code:{value:'KeyW'},key:{value:'w'},target:{value:{closest:()=>closest}}});win.dispatchEvent(event);return event;};
 const look=exports.createLook(new T.PerspectiveCamera(),canvas,{activate(){},hover(){},escape(){},manual(){}});
 try{
  assert(key().defaultPrevented);assert(look.movement(.1).active);
  win.dispatchEvent(new Event('blur'));assert(!look.movement(.1).active);
  closest={tagName:'BUTTON'};assert(!key().defaultPrevented);assert(!look.movement(.1).active);
  closest=null;look.setEnabled(false);key();assert(!look.movement(.1).active);
  look.setEnabled(true);key();assert(look.movement(.1).active);
  doc.dispatchEvent(new Event('fullscreenchange'));assert(!look.movement(.1).active);
  key();win.dispatchEvent(new Event('resize'));assert(!look.movement(.1).active);
 }finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
test('vehicle reference turns preserve independent passenger yaw and pitch',()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;
 globalThis.window=new EventTarget();globalThis.document=new EventTarget();const canvas=new EventTarget(),camera=new T.PerspectiveCamera();
 const look=exports.createLook(camera,canvas,{activate(){},hover(){},escape(){},manual(){}});
 try{look.restore(.4,-.2);look.rotateFrame(.3);look.update(.1,true);assert.ok(Math.abs(look.yaw-.7)<1e-8);assert.ok(Math.abs(look.pitch+.2)<1e-8);
 const event=new Event('keydown',{cancelable:true});Object.defineProperties(event,{key:{value:'ArrowLeft'},code:{value:'ArrowLeft'},target:{value:canvas}});window.dispatchEvent(event);look.rotateFrame(-.1);look.update(.1,true);assert.ok(Math.abs(look.yaw-.72)<1e-8);assert.ok(Math.abs(look.pitch+.2)<1e-8);
 }finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
test('Space owns jumping only in exploration focus and never activates a world interaction',()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;
 globalThis.window=new EventTarget();globalThis.document=new EventTarget();const canvas=new EventTarget();let jumps=0,actions=0;
 const look=exports.createLook(new T.PerspectiveCamera(),canvas,{jump(){jumps++;},activate(){actions++;},hover(){},escape(){},manual(){}});
 function space(target=canvas,repeat=false){const e=new Event('keydown',{cancelable:true});Object.defineProperties(e,{key:{value:' '},code:{value:'Space'},target:{value:target},repeat:{value:repeat}});window.dispatchEvent(e);return e;}
 try{assert.ok(space().defaultPrevented);space(canvas,true);assert.equal(jumps,1);assert.equal(actions,0);
  assert.equal(space({closest:()=>({tagName:'INPUT'})}).defaultPrevented,false);assert.equal(jumps,1);
  look.setClimbing(true);space();assert.equal(jumps,1);look.setEnabled(false);space();assert.equal(jumps,1);
 }finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
test('mouse look is direct, clamps pitch, preserves mode orientation and camera-relative movement',()=>{
 const oldWindow=globalThis.window,oldDocument=globalThis.document;
 const win=new EventTarget(),doc=new EventTarget(),canvas=new EventTarget(),camera=new T.PerspectiveCamera();
 globalThis.window=win;globalThis.document=doc;canvas.focus=()=>{};canvas.setPointerCapture=()=>{};
 doc.exitPointerLock=()=>{doc.pointerLockElement=null;doc.dispatchEvent(new Event('pointerlockchange'));};
 let actions=0;const look=exports.createLook(camera,canvas,{activate(){actions++;},hover(){},escape(){},manual(){},jump(){}});
 const pointer=(name,values={})=>{const e=new Event(name);Object.assign(e,{pointerId:1,pointerType:'mouse',button:0,clientX:0,clientY:0,movementX:0,movementY:0},values);canvas.dispatchEvent(e);};
 try{
  look.restore(0,0);doc.pointerLockElement=canvas;doc.dispatchEvent(new Event('pointerlockchange'));
  pointer('pointermove',{movementX:100,movementY:1000});assert.equal(look.yaw,-.22);assert.equal(look.pitch,-1.3);assert.equal(camera.rotation.order,'YXZ');
  look.unlock();look.update(.01);assert.equal(look.yaw,-.22);
  pointer('pointermove',{clientX:20});assert.equal(look.yaw,-.22);
  pointer('pointerdown',{button:2});pointer('pointermove',{clientX:30});assert.equal(look.yaw,-.22);
  pointer('pointerdown');pointer('pointermove',{clientX:100,clientY:10});pointer('pointerup');assert.equal(actions,0);assert.equal(look.yaw,-.44);
  pointer('pointerdown');pointer('pointerup');assert.equal(actions,1);
  look.restore(Math.PI/2,0);look.analog(0,-1);const move=look.movement(.1).delta;assert.ok(move.x<0);assert.ok(Math.abs(move.z)<1e-8);
  doc.pointerLockElement=canvas;look.setEnabled(false);assert.equal(doc.pointerLockElement,null);
 }finally{look.dispose();globalThis.window=oldWindow;globalThis.document=oldDocument;}
});
