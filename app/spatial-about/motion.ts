export type MotionPhase = 'idle' | 'dragging' | 'decelerating' | 'aligning' | 'separating' | 'revealing' | 'open' | 'closing';
export const rotationSpeeds = { upper: .24, lower: -.20 };
export const revealTiming = { align: .85, separate: .50, deploy: .65, total: 2 };
const smooth = (n: number) => { const t = Math.max(0, Math.min(1, n)); return t * t * (3 - 2 * t); };
export const angularDifference = (a: number, b: number) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

/** One owner of motion and deployment. Rendering only reads this model.
 * User orientation, spin angles, alignment corrections, and deployment are
 * separate values. Closing traverses the same timeline in reverse. */
export class SelfMotion {
 phase: MotionPhase = 'idle';
 playing = true;
 reduced = false;
 hovered = false;
 requested: number | null = null;
 active: number | null = null;
 upper = 0;
 lower = 0;
 upperVelocity = rotationSpeeds.upper;
 lowerVelocity = rotationSpeeds.lower;
 upperAlignment = 0;
 lowerAlignment = 0;
 yaw = .24;
 pitch = -.08;
 yawVelocity = 0;
 pitchVelocity = 0;
 travel = 0;
 private dragging = false;
 get focus() { return smooth(this.travel / revealTiming.align); }
 get separation() { return smooth((this.travel - revealTiming.align) / revealTiming.separate); }
 get deployment() { return smooth((this.travel - revealTiming.align - revealTiming.separate) / revealTiming.deploy); }
 get moving() { return this.phase !== 'idle' && this.phase !== 'open'; }
 select(index: number | null) {
  this.requested = index;
  this.dragging = false;
  this.yawVelocity = this.pitchVelocity = 0;
  if (index !== null) {
   if (this.active === null) {
    this.upperAlignment = angularDifference(-this.upper, 0);
    this.lowerAlignment = angularDifference(-this.lower, 0);
   }
   this.active = index;
  }
 }
 beginDrag() {
  if (this.active !== null) return false;
  this.dragging = true; this.phase = 'dragging';
  this.yawVelocity = this.pitchVelocity = 0;
  return true;
 }
 drag(dx: number, dy: number, seconds: number) {
  if (!this.dragging) return;
  this.yaw += dx;
  this.pitch = Math.max(-1.1, Math.min(1.1, this.pitch + dy));
  const dt = Math.max(seconds, 1 / 120);
  this.yawVelocity = Math.max(-1.2, Math.min(1.2, dx / dt));
  this.pitchVelocity = Math.max(-.8, Math.min(.8, dy / dt));
 }
 endDrag(cancelled = false) {
  this.dragging = false;
  if (cancelled || this.reduced) this.yawVelocity = this.pitchVelocity = 0;
  this.phase = Math.abs(this.yawVelocity) + Math.abs(this.pitchVelocity) > .01 ? 'decelerating' : 'idle';
 }
 tick(dt: number) {
  if (this.requested !== null) this.travel = Math.min(revealTiming.total, this.travel + (this.reduced ? revealTiming.total : dt));
  else this.travel = Math.max(0, this.travel - (this.reduced ? revealTiming.total : dt));
  if (this.travel === 0 && this.requested === null) this.active = null;
  if (this.active !== null) {
   this.phase = this.requested === null ? 'closing' : this.travel < .85 ? 'aligning' : this.travel < 1.35 ? 'separating' : this.travel < 2 ? 'revealing' : 'open';
  } else if (this.dragging) this.phase = 'dragging';
  else this.phase = Math.abs(this.yawVelocity) + Math.abs(this.pitchVelocity) > .01 ? 'decelerating' : 'idle';

  const running = this.playing && !this.reduced && this.active === null && !this.dragging;
  const slow = this.hovered ? .45 : 1;
  // Exact exponential integration: easing the velocity never changes speed abruptly.
  const decay = Math.exp(-5 * dt), integral = (1 - decay) / 5;
  const update = (velocity: number, target: number) => ({ delta: target * dt + (velocity - target) * integral, velocity: target + (velocity - target) * decay });
  const up = update(this.upperVelocity, running ? rotationSpeeds.upper * slow : 0);
  const down = update(this.lowerVelocity, running ? rotationSpeeds.lower * slow : 0);
  if (!this.reduced) { this.upper += up.delta; this.lower += down.delta; }
  this.upperVelocity = this.reduced ? 0 : up.velocity;
  this.lowerVelocity = this.reduced ? 0 : down.velocity;
  // Each focus pivot counteracts its own spin locally; no controller rewrites spin angles.
  if (this.active !== null) {
   const ease = this.reduced ? 1 : 1 - Math.exp(-7 * dt);
   this.upperAlignment += angularDifference(-this.upper, this.upperAlignment) * ease;
   this.lowerAlignment += angularDifference(-this.lower, this.lowerAlignment) * ease;
  }
  if (!this.dragging && this.active === null && !this.reduced) {
   const dragDecay = Math.exp(-8 * dt), dragIntegral = (1 - dragDecay) / 8;
   this.yaw += this.yawVelocity * dragIntegral;
   this.pitch = Math.max(-1.1, Math.min(1.1, this.pitch + this.pitchVelocity * dragIntegral));
   this.yawVelocity *= dragDecay; this.pitchVelocity *= dragDecay;
   if (Math.abs(this.yawVelocity) + Math.abs(this.pitchVelocity) < .01) this.yawVelocity = this.pitchVelocity = 0;
  }
 }
 snapshot() {
  return { phase: this.phase, active: this.active, focus: this.focus, separation: this.separation,
   deployment: this.deployment, upper: this.upper, lower: this.lower,
   upperVelocity: this.upperVelocity, lowerVelocity: this.lowerVelocity, yaw: this.yaw, pitch: this.pitch };
 }
}
export type MotionSnapshot = ReturnType<SelfMotion['snapshot']>;
