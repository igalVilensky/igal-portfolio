/** Camera-position ownership. UI blocking is separate from a running ride's ownership. */
export type TraversalOwner = 'walk' | 'tower' | 'flight' | 'skyfall' | 'horizon' | 'skytube' | 'coaster' | 'secret' | 'guided' | 'portal' | 'swim';
export type TraversalState = Partial<Record<Exclude<TraversalOwner, 'walk'>, boolean>>;
const owners: Exclude<TraversalOwner, 'walk'>[] = ['portal','tower','guided','horizon','skytube','coaster','secret','skyfall','flight','swim'];
export function traversalOwner(state: TraversalState): TraversalOwner {
 return owners.find(owner=>state[owner]) ?? 'walk';
}
/** New traversal may only start after the current owner releases. No position mutation. */
export function canStartTraversal(state: TraversalState, blocked = false) {
 return !blocked && traversalOwner(state)==='walk';
}
