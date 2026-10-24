/** One owner for ring angles, free dynamics and presentation transitions. No renderer dependency. */
export const ringIds = ['outer', 'inner', 'carrier'] as const;
export type RingId = typeof ringIds[number];
export type HoverTarget = { kind: 'ring'; id: RingId } | { kind: 'module'; id: string } | null;
type Phase = 'free' | 'stabilizing' | 'aligning' | 'selected' | 'returning';
export type KineticPose = Record<RingId | 'index' | 'x' | 'y' | 'z' | 'float', number>;
export const spinSpeeds: Record<RingId, number> = { outer: .18, inner: -.26, carrier: .22 };
const damping: Record<RingId, number> = { outer: 1.9, inner: 2.4, carrier: 2.8 };
const keys = ['outer', 'inner', 'carrier', 'index', 'x', 'y', 'z', 'float'] as const;
export const angularDifference = (target: number, current: number) => Math.atan2(Math.sin(target-current), Math.cos(target-current));
const idle = (t: number) => ({ outer: Math.sin(t*.075)*.08, inner: Math.sin(t*.13)*.22, carrier: Math.sin(t*.19)*.16, index: Math.sin(t*.09)*.14 });
export class KineticMotion {
 pose: KineticPose = { outer: 0, inner: .85, carrier: -.35, index: 0, x: .32, y: -.4, z: -.12, float: 0 };
 velocity: Record<RingId, number> = { outer: 0, inner: 0, carrier: 0 };
 phase: Phase = 'free';
 hover: HoverTarget = null;
 dragging: RingId | null = null;
 selected: string | null = null;
 spinning = false;
 private spinCoasting = false;
 paused = false;
 reduced = false;
 private time = 0;
 private elapsed = 0;
 private presentationAngle = 0;
 private saved: KineticPose | null = null;
 private samples: { time: number; angle: number }[] = [];
 get state() {
  if(this.phase !== 'free') return this.phase;
  if(this.dragging) return 'dragging';
  if(this.spinning) return 'spinning';
  if(this.spinCoasting) return 'stopping';
  if(ringIds.some(id => Math.abs(this.velocity[id]) > .01)) return 'inertia';
  return this.hover ? `hover-${this.hover.kind}` : 'idle';
 }
 get canGrab() { return this.phase === 'free'; }
 configure(paused: boolean, reduced: boolean) {
  this.paused = paused; this.reduced = reduced;
  if(reduced) { this.spinning=false; this.spinCoasting=false; this.stop(); }
  else if(paused && !this.spinning && !this.spinCoasting) this.stop();
 }
 setSpin(enabled: boolean) {
  if(enabled && (!this.canGrab || this.dragging || this.reduced)) return;
  this.spinning=enabled;
  this.spinCoasting=!enabled && ringIds.some(id=>Math.abs(this.velocity[id])>.008);
 }
 stop() { for(const id of ringIds) this.velocity[id] = 0; }
 beginDrag(id: RingId, stamp: number) {
  if(!this.canGrab || this.dragging) return false;
  if(this.spinning || this.spinCoasting) this.stop();
  this.spinning=false; this.spinCoasting=false; this.velocity[id]=0;
  this.dragging = id;
  this.samples = [{ time: stamp, angle: this.pose[id] }];
  return true;
 }
 drag(delta: number, stamp: number) {
  if(!this.dragging || !Number.isFinite(delta)) return;
  this.pose[this.dragging] += Math.max(-.55, Math.min(.55, delta));
  this.samples.push({ time: stamp, angle: this.pose[this.dragging] });
  // Keep a short trailing window, including its leading sample.
  while(this.samples.length > 2 && this.samples[1]!.time < stamp-100) this.samples.shift();
 }
 endDrag(stamp: number, cancel = false) {
  const id = this.dragging;
  if(!id) return;
  const first = this.samples[0], last = this.samples.at(-1);
  if(!cancel && !this.reduced && !this.paused && first && last && stamp-last.time < 85) {
   const duration = (stamp-first.time)/1000;
   this.velocity[id] = duration > .008 ? Math.max(-6, Math.min(6, (last.angle-first.angle)/duration)) : 0;
  } else this.velocity[id] = 0;
  this.dragging = null; this.samples = [];
 }
 select(id: string | null, angle = 0) {
  if(id === this.selected) return;
  this.spinning=false; this.spinCoasting=false;
  this.endDrag(0,true); this.hover = null; this.elapsed = 0;
  if(id) {
   if(!this.saved) this.saved = { ...this.pose };
   this.selected = id; this.presentationAngle = Math.PI/2-angle;
   this.phase = 'stabilizing';
  } else if(this.selected) { this.selected = null; this.phase = 'returning'; this.stop(); }
 }
 moduleLift(id: string) {
  if(this.selected) return this.selected === id && this.phase === 'selected' ? .32 : 0;
  return this.phase === 'free' && !this.dragging && this.hover?.kind === 'module' && this.hover.id === id ? .075 : 0;
 }
 private coast(dt: number, forced = false) {
  for(const id of ringIds) {
   if(id === this.dragging) continue;
   const rate = forced ? 16 : damping[id], decay = Math.exp(-rate*dt);
   this.pose[id] += this.velocity[id]*(1-decay)/rate;
   this.velocity[id] *= decay;
   if(Math.abs(this.velocity[id]) < .008) this.velocity[id] = 0;
  }
 }
 private approach(target: KineticPose, dt: number) {
  const blend = this.reduced ? 1 : 1-Math.exp(-dt*7);
  let error = 0;
  for(const key of keys) {
   const delta = key === 'float' ? target[key]-this.pose[key] : angularDifference(target[key],this.pose[key]);
   this.pose[key] += delta*blend;
   error = Math.max(error,Math.abs(delta)*(1-blend));
  }
  return error < .002;
 }
 tick(dt: number) {
  if(!Number.isFinite(dt) || dt < 0) return;
  this.elapsed += dt;
  if(this.phase === 'free') {
   if(this.spinning && !this.reduced) {
    // Analytic acceleration and integration: independent of frame rate.
    const rate=2.8, decay=Math.exp(-rate*dt);
    for(const id of ringIds) {
     this.pose[id]+=spinSpeeds[id]*dt+(this.velocity[id]-spinSpeeds[id])*(1-decay)/rate;
     this.velocity[id]=spinSpeeds[id]+(this.velocity[id]-spinSpeeds[id])*decay;
    }
    return;
   }
   if(this.spinCoasting) {
    this.coast(dt);
    this.spinCoasting=ringIds.some(id=>this.velocity[id]!==0);
    return;
   }
   if(!this.paused && !this.reduced) {
    this.coast(dt);
    if(!this.dragging) {
     const previous = idle(this.time); this.time += dt; const next = idle(this.time);
     for(const key of ['outer','inner','carrier','index'] as const) this.pose[key] += next[key]-previous[key];
     this.pose.float += (Math.sin(this.time*.65)*.045-this.pose.float)*(1-Math.exp(-dt*5));
    }
   }
   return;
  }
  if(this.phase === 'stabilizing') {
   if(this.reduced) this.stop(); else this.coast(dt,true);
   if(ringIds.every(id=>Math.abs(this.velocity[id])<.04)) { this.stop(); this.phase='aligning'; this.elapsed=0; }
  }
  if(this.phase === 'aligning') {
   const aligned = this.approach({ outer:0,inner:.65,carrier:-.35,index:this.presentationAngle,x:.14,y:-.18,z:-.12,float:0 },dt);
   if(aligned) { this.phase='selected'; this.elapsed=0; }
  }
  if(this.phase === 'returning') {
   if(this.approach(this.saved ?? this.pose,dt)) { this.phase='free'; this.saved=null; this.elapsed=0; }
  }
  if(this.reduced && this.phase === 'free') this.pose.float=0;
 }
 get moving() {
  return this.phase !== 'free' && this.phase !== 'selected' || this.dragging !== null ||
   this.phase === 'free' && (this.spinning || this.spinCoasting || !this.paused && !this.reduced);
 }
}
