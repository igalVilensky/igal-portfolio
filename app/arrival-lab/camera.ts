import * as T from 'three';

/** Orientation and movement intent; the scene loop alone applies translation. */
export function createLook(camera: T.PerspectiveCamera, canvas: HTMLCanvasElement, callbacks: {
  activate: (x: number, y: number, locked: boolean, direct: boolean) => void;
  hover: (x: number, y: number, locked: boolean) => void;
  escape: () => void;
  manual: () => void;
}) {
  const keys = new Set<string>();
  const velocity = new T.Vector3();
  let analogX=0, analogZ=0, sprint=false;
  const reset=()=>{keys.clear();velocity.set(0,0,0);analogX=analogZ=0;sprint=false;dragging=false;pointers.clear();multiple=false;};
  let yaw = .0574, pitch = .0855, targetYaw = yaw, targetPitch = pitch;
  let enabled = true;
  let dragging = false, distance = 0, lastX = 0, lastY = 0, multiple = false;
  const pointers = new Set<number>();
  const removers: (() => void)[] = [];
  const listen = (target: EventTarget, name: string, handler: EventListener, options?: AddEventListenerOptions) => {
    target.addEventListener(name, handler, options); removers.push(() => target.removeEventListener(name, handler, options));
  };
  function down(event: PointerEvent) {
    if (!enabled) return;
    pointers.add(event.pointerId); if (pointers.size > 1) multiple = true;
    dragging = true; distance = 0; lastX = event.clientX; lastY = event.clientY;
    canvas.focus({ preventScroll: true });
    if (document.pointerLockElement !== canvas) canvas.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent) {
    if (!enabled || (event.pointerType==='touch' && !pointers.has(event.pointerId))) return;
    const locked = document.pointerLockElement === canvas;
    if ((dragging || locked) && !multiple) {
      const dx = locked ? event.movementX : event.clientX - lastX;
      const dy = locked ? event.movementY : event.clientY - lastY;
      if (dragging) distance += Math.hypot(dx, dy);
      targetYaw -= T.MathUtils.clamp(dx, -100, 100) * (event.pointerType === 'touch' ? .003 : .0021);
      targetPitch = T.MathUtils.clamp(targetPitch - T.MathUtils.clamp(dy, -100, 100) * .0021, -1.25, 1.35);
    }
    lastX = event.clientX; lastY = event.clientY;
    if (!dragging || locked) callbacks.hover(event.clientX, event.clientY, locked);
  }
  function up(event: PointerEvent) {
    if (!enabled || !pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);
    if (dragging && distance < 6 && !multiple) callbacks.activate(event.clientX, event.clientY, document.pointerLockElement === canvas, true);
    if (!pointers.size) { dragging = false; multiple = false; }
  }
  function cancel(event: PointerEvent) {
    pointers.delete(event.pointerId); distance = 100; dragging = false; if (!pointers.size) multiple = false;
  }
  function keyboard(event: KeyboardEvent) {
    if (!enabled) return;
    if (event.key === 'Escape') {
      if (document.pointerLockElement === canvas) document.exitPointerLock(); else callbacks.escape(); return;
    }
    // Page focus is movement-ready; focused UI owns its own keyboard input.
    const target=event.target as HTMLElement | null;
    if (target !== canvas && target?.closest?.('button,a,input,textarea,select,[contenteditable=true],[role=dialog],[tabindex]')) return;
    if (['KeyW','KeyA','KeyS','KeyD','ShiftLeft','ShiftRight'].includes(event.code)) { keys.add(event.code); event.preventDefault(); if (event.code.startsWith('Key')) callbacks.manual(); }

    const steps: Record<string, [number, number]> = { ArrowLeft: [.12, 0], ArrowRight: [-.12, 0], ArrowUp: [0, .09], ArrowDown: [0, -.09] };
    const step = steps[event.key];
    if (step) { event.preventDefault(); targetYaw += step[0]; targetPitch = T.MathUtils.clamp(targetPitch + step[1], -1.25, 1.35); }
    if (!event.repeat && (event.code === 'KeyE' || event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); callbacks.activate(0, 0, true, false); }
  }
  listen(canvas, 'pointerdown', down as EventListener);
  listen(canvas, 'pointermove', move as EventListener);
  listen(canvas, 'pointerup', up as EventListener);
  listen(canvas, 'pointercancel', cancel as EventListener);
  listen(canvas, 'lostpointercapture', cancel as EventListener);
  listen(canvas, 'pointerleave', (() => callbacks.hover(-1, -1, false)) as EventListener);
  listen(canvas, 'contextmenu', (e => e.preventDefault()) as EventListener);
  listen(window, 'keydown', keyboard as EventListener);
  listen(window, 'keyup', ((e: KeyboardEvent) => { keys.delete(e.code); }) as EventListener);
  listen(window, 'focusin', (event => { if (event.target !== canvas) reset(); }) as EventListener);
  listen(document, 'pointerlockchange',reset as EventListener);
  listen(window,'orientationchange',reset as EventListener);
  listen(window,'resize',reset as EventListener);
  listen(document,'fullscreenchange',reset as EventListener);
  listen(window,'blur',reset as EventListener);
  listen(document,'visibilitychange',reset as EventListener);
  return {
    setEnabled(value: boolean) { enabled = value; reset(); },
    analog(x:number,z:number,fast=false) { if(!enabled)return;analogX=x;analogZ=z;sprint=fast;if(x||z)callbacks.manual();else velocity.set(0,0,0); },
    reset,
    // Transport momentum with the doorway's rigid turn without clearing held keys/touch intent.
    restore(nextYaw:number,nextPitch:number,movementTurn=0) { velocity.applyAxisAngle(new T.Vector3(0,1,0),movementTurn); yaw=targetYaw=nextYaw; pitch=targetPitch=nextPitch; camera.rotation.set(pitch,yaw,0,'YXZ'); },
    stop: reset,
    movement(dt: number) {
      const x = analogX || Number(keys.has('KeyD')) - Number(keys.has('KeyA'));
      const z = analogZ || Number(keys.has('KeyS')) - Number(keys.has('KeyW'));
      const target = new T.Vector3(x,0,z).clampLength(0,1).applyAxisAngle(new T.Vector3(0,1,0),yaw).multiplyScalar(sprint || keys.has('ShiftLeft') || keys.has('ShiftRight') ? 10.8 : 4.8);
      velocity.lerp(target, 1 - Math.exp(-12 * dt));
      return { active: !!(x || z), delta: velocity.clone().multiplyScalar(dt) };
    },
    update(dt: number, reduced = false) {
      yaw = reduced ? targetYaw : T.MathUtils.damp(yaw, targetYaw, 18, dt);
      pitch = reduced ? targetPitch : T.MathUtils.damp(pitch, targetPitch, 18, dt);
      camera.rotation.set(pitch, yaw, 0, 'YXZ');
    },
    orient(nextYaw: number, nextPitch: number) { targetYaw = yaw + Math.atan2(Math.sin(nextYaw - yaw), Math.cos(nextYaw - yaw)); targetPitch = nextPitch; },
    get yaw() { return yaw; }, get pitch() { return pitch; },
    async lock() {
      try { await canvas.requestPointerLock(); return document.pointerLockElement === canvas; } catch { canvas.focus(); return false; }
    },
    dispose() { if (document.pointerLockElement === canvas) document.exitPointerLock(); for (const remove of removers) remove(); },
  };
}
