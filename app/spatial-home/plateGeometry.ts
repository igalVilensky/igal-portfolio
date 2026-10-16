type Point = readonly [number, number];
type Vector = readonly [number, number, number];

// One square prism, one camera, and one fixed projected world-origin pivot.
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

export function projectPlate(progress: number) {
  const angle = -plateYaw * (1 - progress);
  const cos = Math.cos(angle), sin = Math.sin(angle);
  const rotate = ([x, y, z]: Vector): Vector => [x * cos - z * sin, y, x * sin + z * cos];
  const world = corners.map(rotate);
  const projected = world.map(cameraProject);
  const vertices = projected.map(vertex => vertex.point);
  const face = (indices: number[]) => polygon(indices.map(index => vertices[index]!));
  const topPoint = ([u, v]: Point) => cameraProject(rotate([(u / 360 - .5) * plateSide, plateThickness / 2, (.5 - v / 280) * plateSide])).point;
  const detail = (points: Point[], closed = false) => `M${points.map(point => coordinates(topPoint(point))).join('L')}${closed ? 'Z' : ''}`;
  // Face-normal visibility includes the finite camera position, not only yaw.
  const sideVisible = cameraDistance * elevationCos * sin - plateSide / 2 > 1e-8;
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
      .map(([name, vector]) => ({ name, point: cameraProject(rotate(vector)).point })),
    surfacePoint: topPoint,
    center: cameraProject([0, 0, 0]).point, world, vertices, projected, label, frontMidpoint, sideVisible,
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
