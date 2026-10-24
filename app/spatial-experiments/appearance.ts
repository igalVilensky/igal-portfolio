import type { RingId } from './kineticMotion';

type Surface = { color: string; metalness: number; roughness: number };
const surface = (color: string, metalness: number, roughness: number): Surface => ({ color, metalness, roughness });
export type CoreAppearance = {
 surfaces: { frame: Surface; link: Surface; body: Surface; recess: Surface; fastener: Surface };
 ringFaces: Record<RingId, Surface>;
 ringEdges: Record<RingId, Surface>;
 hover: string;
 accent: Surface & { registryColor: boolean };
 label: { background: string; ink: string };
 lights: { sky: string; ground: string; hemisphere: number; key: string; keyIntensity: number; rim: string; rimIntensity: number; fill: string; fillIntensity: number };
};

/** Light colors are the existing Home plate and Work module palette, not a new metal palette.
 * Home: --sp-top/#f8fcff, --sp-bottom/#d9e6f3, --sp-edge/#b7cce0,
 * --sp-line/#7896b4, --sp-cyan/#087e98 (SpatialHome.vue).
 * Work: --module-front/#e5eef6, --technology-front/#cfdfec,
 * --technology-top/#edf5fb, --technology-side/#a4bccf, --ink/#203b50 (topology.css).
 */
export const coreAppearances: Record<'light' | 'dark', CoreAppearance> = {
 light: {
  surfaces: {
   frame: surface('#d9e6f3', .12, .64), link: surface('#a4bccf', .12, .66),
   body: surface('#e5eef6', .10, .66), recess: surface('#7896b4', .05, .76),
   fastener: surface('#b7cce0', .24, .58),
  },
  ringFaces: { outer: surface('#e5eef6', .12, .64), inner: surface('#cfdfec', .10, .68), carrier: surface('#edf5fb', .12, .64) },
  ringEdges: { outer: surface('#b7cce0', .12, .70), inner: surface('#a4bccf', .10, .72), carrier: surface('#b7cce0', .12, .70) },
  hover: '#087e98', accent: { ...surface('#087e98', .10, .65), registryColor: false },
  label: { background: '#e5eef6', ink: '#203b50' },
  lights: { sky: '#f8fcff', ground: '#b7cce0', hemisphere: 1.65, key: '#f8fcff', keyIntensity: 2.4, rim: '#d9e6f3', rimIntensity: .9, fill: '#edf5fb', fillIntensity: .75 },
 },
 // Preserve the approved 6B.1 Dark material/light values, including the small warm frame.
 dark: {
  surfaces: {
   frame: surface('#9d927f', .63, .32), link: surface('#597a91', .55, .34),
   body: surface('#7a8c99', .64, .30), recess: surface('#202e3a', .45, .40),
   fastener: surface('#c5d4df', .80, .25),
  },
  ringFaces: { outer: surface('#9d927f', .63, .32), inner: surface('#597a91', .55, .32), carrier: surface('#7a8c99', .64, .32) },
  ringEdges: { outer: surface('#9d927f', .63, .32), inner: surface('#597a91', .55, .34), carrier: surface('#7a8c99', .64, .30) },
  hover: '#92b0c0', accent: { ...surface('#92b0c0', .45, .32), registryColor: true },
  label: { background: '#172630', ink: '#e0e9ec' },
  lights: { sky: '#e7f3ff', ground: '#29333d', hemisphere: 2.6, key: '#ffead0', keyIntensity: 3.7, rim: '#92c7ff', rimIntensity: 2.8, fill: '#edf5fb', fillIntensity: 0 },
 },
};

/** Projection only: keep the camera position, axes and mesh proportions untouched. */
export const coreDesktopZoom = 1.08;
