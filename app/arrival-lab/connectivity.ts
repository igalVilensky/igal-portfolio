/** A paired chevron chain: the central key feeds both jamb locks through shared joints. */
export const wallNodes = Array.from({ length: 14 }, (_, id) => ({
  id, side: id < 7 ? -1 : 1, row: id % 7,
  parent: id % 7 === 0 ? -1 : id - 1,
  delay: (id % 7) * .16,
}));
export const signalDuration = 1.25;
export function signalAt(elapsed: number, delay: number) { return Math.max(0, Math.min(1, (elapsed - delay) / .16)); }
