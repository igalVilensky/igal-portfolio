import * as THREE from 'three';

export const tetrahedronRadius = 1.85;
export const beamWidth = .17;
export const beamDepth = .135;
export const tetrahedronEdges = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [3, 1]] as const;

/** Both tetrahedra are regular and share their centroid. Point inversion, rather
 * than just mirroring Y, gives the exact compound of two dual tetrahedra. */
export function tetrahedronVertices(inverted = false) {
 const radius = tetrahedronRadius;
 const ring = radius * Math.sqrt(8) / 3;
 const vertices = [new THREE.Vector3(0, radius, 0), ...Array.from({ length: 3 }, (_, i) => {
  const angle = i * Math.PI * 2 / 3;
  return new THREE.Vector3(Math.sin(angle) * ring, -radius / 3, Math.cos(angle) * ring);
 })];
 return inverted ? vertices.map(vertex => vertex.negate()) : vertices;
}

/** Closed, beveled rectangular beam. Its long axis is local Z, with the bevel
 * included in the final dimensions. All six edges reuse this one geometry. */
export function createBeamGeometry(length: number, width = beamWidth, depth = beamDepth) {
 const bevel = .018;
 const shape = new THREE.Shape();
 const w = width / 2 - bevel, h = depth / 2 - bevel;
 shape.moveTo(-w, -h); shape.lineTo(w, -h); shape.lineTo(w, h); shape.lineTo(-w, h); shape.closePath();
 const geometry = new THREE.ExtrudeGeometry(shape, {
  depth: length - 2 * bevel, bevelEnabled: true,
  bevelSize: bevel, bevelThickness: bevel, bevelSegments: 1, steps: 1, curveSegments: 1,
 });
 geometry.translate(0, 0, -length / 2 + bevel);
 geometry.computeVertexNormals();
 return geometry;
}

export function placeBeam(mesh: THREE.Mesh, from: THREE.Vector3, to: THREE.Vector3) {
 mesh.position.copy(from).add(to).multiplyScalar(.5);
 mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), to.clone().sub(from).normalize());
}

export function createFacetGeometry(vertices: THREE.Vector3[]) {
 const positions: number[] = [];
 for (const indices of [[0, 2, 1], [0, 3, 2], [0, 1, 3], [1, 2, 3]]) {
  const face = indices.map(index => vertices[index]!.clone());
  const center = face.reduce((sum, vertex) => sum.add(vertex), new THREE.Vector3()).divideScalar(3);
  // Restrained inset membranes leave the load-bearing edges and intersections exposed.
  for (const vertex of face) positions.push(...vertex.lerp(center, .16).toArray());
 }
 const geometry = new THREE.BufferGeometry();
 geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
 geometry.computeVertexNormals();
 return geometry;
}
