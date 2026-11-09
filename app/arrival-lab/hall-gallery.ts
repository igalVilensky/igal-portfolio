import * as T from 'three';

/** Physical prints beneath the west gallery overhang, facing into Arrival. */
export function createHallGallery(scene: T.Scene, solids: T.Mesh[], invalidate: () => void) {
  const root = new T.Group(); root.name = 'arrival-project-gallery'; scene.add(root);
  const geometries: T.BufferGeometry[] = [], textures: T.Texture[] = [];
  const frame = new T.MeshStandardMaterial({ color: '#655c4a', roughness: .45, metalness: .45 });
  const mount = new T.MeshStandardMaterial({ color: '#e9e1cf', roughness: .85 });
  const materials: T.Material[] = [frame, mount];
  const loader = new T.TextureLoader(); let disposed = false;
  function box(w: number, h: number, d: number, x: number, y: number, z: number, m: T.Material) {
    const g = new T.BoxGeometry(w, h, d); geometries.push(g);
    const mesh = new T.Mesh(g, m); mesh.position.set(x, y, z); root.add(mesh); solids.push(mesh); return mesh;
  }
  for (const [i, path] of ['/pagescope.jpeg', '/mindQlab.jpeg', '/family-space.jpeg', '/security.jpeg'].entries()) {
    const z = 1 - i * 13;
    // The supporting wall's inner face is x=-22. Keep each layer physically separated.
    box(.18, 4.55, 7.45, -21.88, 3.9, z, frame);
    box(.08, 4.3, 7.2, -21.72, 3.9, z, mount);
    const m = new T.MeshBasicMaterial({ color: '#bdb5a3' }); materials.push(m);
    const g = new T.PlaneGeometry(6.7, 3.8); geometries.push(g);
    const print = new T.Mesh(g, m); print.position.set(-21.66, 3.9, z); print.rotation.y = Math.PI / 2; root.add(print); solids.push(print);
    const texture = loader.load(path, loaded => {
      if (disposed) { loaded.dispose(); return; }
      loaded.colorSpace = T.SRGBColorSpace;
      // Preserve the complete artwork and its native proportions inside the mount.
      const aspect = loaded.image.width / loaded.image.height;
      print.scale.set(Math.min(1, aspect / (6.7 / 3.8)), Math.min(1, (6.7 / 3.8) / aspect), 1);
      m.map = loaded; m.color.set('#ffffff'); m.needsUpdate = true; invalidate();
    });
    textures.push(texture);
    box(.6, .09, 7.6, -21.6, 6.45, z, frame);
    const light = new T.PointLight('#ffe9be', 12, 9, 1.5); light.position.set(-19.5, 5.7, z); root.add(light);
  }
  return { dispose() { disposed = true; root.removeFromParent(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose()); } };
}
