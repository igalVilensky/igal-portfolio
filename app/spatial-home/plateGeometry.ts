type Point = readonly [number, number];
type Vector = readonly [number, number, number];

// One square prism and one shared camera; each pose transforms the full body.
export const plateCenter: Point = [359.38056523422375, 127.30816879597367];
export const plateElevation = Math.sqrt((93 * 119) / (360 * 280));
const elevationCos = Math.sqrt(1 - plateElevation ** 2);
export const plateSide = (Math.hypot(360, 93 / plateElevation) + Math.hypot(280, 119 / plateElevation)) / 2;
export const plateThickness = 22 / elevationCos;
export const plateYaw = -Math.atan2(93 / plateElevation, 360);
export const cameraDistance = 1800;
// Stable SVG serialization avoids insignificant server/browser trig rounding differences.
const coordinates = (point: Point) => point.map(value => Number(value.toFixed(6))).join(' ');
const polygon = (points: readonly Point[]) => `M${points.map(coordinates).join('L')}Z`;
const midpoint = (a: Point, b: Point): Point => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

// Camera looks toward the origin from negative Z and positive Y. Positive
// camera depth points AWAY from the viewer: farther points have a larger
// denominator and a smaller scale. No CSS perspective is added to this SVG.
export function cameraProject([x, y, z]: Vector) {
  const depth = cameraDistance - y * plateElevation + z * elevationCos;
  const scale = cameraDistance / depth;
  return { depth, scale, point: [plateCenter[0] + x * scale, plateCenter[1] - (elevationCos * y + plateElevation * z) * scale] as Point };
}
const corners: Vector[] = [plateThickness / 2, -plateThickness / 2].flatMap(y => [
  [-plateSide / 2, y, plateSide / 2] as Vector,
  [plateSide / 2, y, plateSide / 2] as Vector,
  [plateSide / 2, y, -plateSide / 2] as Vector,
  [-plateSide / 2, y, -plateSide / 2] as Vector,
]);

export function projectPlate(progress: number, work = false, previewRail = 0) {
  const smooth = (t: number) => t * t * (3 - 2 * t);
  // A 300ms linear travel followed by a 600ms opening. Each phase has
  // zero endpoint velocity; reversing the clock retraces this exact path.
  const extract = work ? smooth(Math.min(1, progress * 3)) : 0;
  const opening = work ? smooth(Math.max(0, (progress - 1 / 3) * 1.5)) : 0;
  const angle = -plateYaw * (work ? 1 - opening : 1 - progress);
  const cos = Math.cos(angle), sin = Math.sin(angle);
  // At the endpoint the normal is (0, elevationSin, -elevationCos),
  // exactly opposite camera depth. The leveling carrier removes the initial
  // azimuth while the central trunnion hinge raises the back of the rigid slab.
  const hinge = opening * Math.acos(plateElevation);
  // A horizontal trunnion through the top-face center, parallel to its front
  // edge, avoids swinging the entire plate sideways as the carrier levels.
  const hingeX = 0, hingeZ = 0;
  // Extract along the horizontal projection of camera-forward. Distance is
  // measured from the existing square footprint, not screen-space offsets.
  const travel = plateSide * .32 * extract;
  const rotate = ([x, y, z]: Vector): Vector => {
    if (!work || progress === 0) return [x * cos - z * sin, y, x * sin + z * cos];
    const dy = y - plateThickness / 2, dz = z;
    const raisedY = dy * Math.cos(hinge) + dz * Math.sin(hinge);
    const hingedZ = -dy * Math.sin(hinge) + dz * Math.cos(hinge);
    return [hingeX + x * cos - hingedZ * sin,
      plateThickness / 2 + raisedY,
      hingeZ - travel + x * sin + hingedZ * cos];
  };
  const rawWorld = corners.map(rotate);
  // The carrier travels down a camera-plane rail only as needed to retain
  // the original upper envelope. This is a uniform body translation, never
  // independently corrected corners or an interpolation to a card layout.
  const clearance = work ? Math.max(0, ...rawWorld.slice(0, 4).map(vertex => {
    const p = cameraProject(vertex);
    return (restingPlate.vertices.reduce((min, point) => Math.min(min, point[1]), Infinity) - p.point[1]) / p.scale;
  })) : 0;
  const cradle = ([x, y, z]: Vector): Vector => [x, y - (clearance - previewRail * opening) * elevationCos, z - (clearance - previewRail * opening) * plateElevation];
  const world = rawWorld.map(cradle);
  const projected = world.map(cameraProject);
  const vertices = projected.map(vertex => vertex.point);
  const face = (indices: number[]) => polygon(indices.map(index => vertices[index]!));
  const topPoint = ([u, v]: Point) => cameraProject(cradle(rotate([(u / 360 - .5) * plateSide, plateThickness / 2, (.5 - v / 280) * plateSide]))).point;
  const detail = (points: Point[], closed = false) => `M${points.map(point => coordinates(topPoint(point))).join('L')}${closed ? 'Z' : ''}`;
  // Face-normal visibility includes the finite camera position, not only yaw.
  const sideNormal: Vector = [-cos, 0, -sin];
  const sideCenter = world[0]!.map((_, j) => (world[0]![j]! + world[3]![j]! + world[7]![j]! + world[4]![j]!) / 4);
  const camera: Vector = [0, cameraDistance * plateElevation, -cameraDistance * elevationCos];
  const sideVisible = sideNormal.reduce((sum, n, j) => sum + n * (camera[j]! - sideCenter[j]!), 0) > 1e-8;
  const frontNormal: Vector = [sin * Math.cos(hinge), -Math.sin(hinge), -cos * Math.cos(hinge)];
  const frontCenter = world[3]!.map((_, j) => (world[3]![j]! + world[2]![j]! + world[6]![j]! + world[7]![j]!) / 4);
  const frontVisible = !work || frontNormal.reduce((sum, n, j) => sum + n * (camera[j]! - frontCenter[j]!), 0) > 1e-8;
  const frontMidpoint = midpoint(vertices[3]!, vertices[2]!);
  const bottomMidpoint = midpoint(vertices[7]!, vertices[6]!);
  const edge = [vertices[2]![0] - vertices[3]![0], vertices[2]![1] - vertices[3]![1]];
  // The title is anchored at the PROJECTED endpoint midpoint (not the projected
  // world-space midpoint). Its baseline follows the edge; its vertical basis
  // follows the projected face centerline. At the final pose both are symmetric.
  const label = `matrix(${edge[0]! / 360} ${edge[1]! / 360} ${(bottomMidpoint[0] - frontMidpoint[0]) / 22} ${(bottomMidpoint[1] - frontMidpoint[1]) / 22} ${frontMidpoint[0]} ${frontMidpoint[1]})`;
  return {
    angle, rotationAngle: plateYaw * progress,
    axes: ([['X', [plateSide * .32, 0, 0]], ['Y', [0, plateSide * .32, 0]], ['Z', [0, 0, plateSide * .32]]] as const)
      .map(([name, vector]) => ({ name, point: cameraProject(cradle(rotate(vector))).point })),
    surfacePoint: topPoint,
    center: cameraProject(cradle(rotate([0, 0, 0]))).point, world, vertices, projected, label, frontMidpoint, sideVisible, frontVisible,
    top: face([0, 1, 2, 3]), side: face([0, 3, 7, 4]), front: face([3, 2, 6, 7]),
    rim: `M${coordinates(vertices[0]!)}L${coordinates(vertices[3]!)}L${coordinates(vertices[2]!)}`,
    // Surface markings are projected point-by-point by the SAME camera. An
    // affine SVG group would incorrectly keep parallel lines under perspective.
    inset: detail([[26.153,10.466],[331.787,26.832],[344.922,260.698],[26.336,255.283]], true) + detail([[45.434,22.186],[310.678,46.942],[326.483,247.137]]),
    trace: detail([[60.470,90.149],[137.409,92.210],[138.178,144.442],[248.592,148.027],[254.556,241.064]]),
    core: detail([[176.080,94.539],[235.348,95.271],[234.909,139.710],[174.800,140.820]], true) + detail([[167.300,103.320],[164.556,151.064],[224.666,149.954]]),
    corner: detail([[0,252],[0,280],[28,280]]) + detail([[332,280],[360,280],[360,252]]),
    grid: [...Array.from({length: 10}, (_, i) => detail([[(i + 1) * 32,0],[(i + 1) * 32,280]])), ...Array.from({length: 16}, (_, i) => detail([[0,(i + 1) * 16],[360,(i + 1) * 16]]))].join(''),
  };
}

// All five instances share this exact resting projection and stationary hit outline.
export const restingPlate = projectPlate(0);
export const plateHitPath = polygon([0, 1, 2, 6, 7, 4].map(index => restingPlate.vertices[index]!));

// Existing reveal strokes were authored in the original surface's SVG coordinates.
// Convert those decorations to the shared physical face without defining another plate.
export function projectSurfacePoint([x, y]: Point): Point {
  const originalCorners: readonly Point[] = [[40,100],[400,12],[680,126],[320,224]];
  const corner = originalCorners.findIndex(point => point[0] === x && point[1] === y);
  if (corner !== -1) return restingPlate.vertices[corner]!;
  const dx = x - 39.38056523422375, dy = y - 103.30816879597367;
  const v = (dy + 93 / 360 * dx) / (119 / 280 + 93 / 360);
  return restingPlate.surfacePoint([dx - v, v]);
}
export function projectSurfacePath(path: string): string {
  return path.replace(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g,
    (_pair, x: string, y: string) => coordinates(projectSurfacePoint([Number(x), Number(y)])));
}

// Shared extract-and-hinge pose. The optional camera-plane rail keeps lower
// previews within the viewport after extraction; Work retains its original rail.
export const projectWorkPlate = (progress: number, previewRail = 0) => projectPlate(progress, true, previewRail);
