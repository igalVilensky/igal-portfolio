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
