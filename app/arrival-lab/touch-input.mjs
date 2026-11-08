/** Circular dead zone, continuous analog magnitude and a distinct outer sprint band. */
export function joystickIntent(dx, dy, radius = 48) {
  const length = Math.hypot(dx, dy), magnitude = Math.min(1, length / radius);
  if (magnitude <= .14) return { x: 0, z: 0, sprint: false };
  const strength = Math.min(1, (magnitude - .14) / .68);
  return { x: dx / length * strength, z: dy / length * strength, sprint: magnitude > .94 };
}
