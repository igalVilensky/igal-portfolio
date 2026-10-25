// Node 22+: node --experimental-strip-types scripts/check-spatial-about.mjs
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { SelfMotion, rotationSpeeds } from '../app/spatial-about/motion.ts';
import { createBeamGeometry, tetrahedronEdges, tetrahedronVertices, beamWidth, beamDepth } from '../app/spatial-about/geometry.ts';
import { aboutSections, copy } from '../app/spatial-about/copy.ts';
import fs from 'node:fs';
const advance = (model, duration, rate = 60) => { for (let step = 0; step < Math.round(duration * rate); step++) model.tick(1 / rate); };
const upper = tetrahedronVertices(), lower = tetrahedronVertices(true);
const edge = upper[0].distanceTo(upper[1]);
for (const points of [upper, lower]) {
 assert(points.reduce((sum, point) => sum.add(point), new THREE.Vector3()).length() < 1e-12, 'shared centroid at origin');
 for (const [a,b] of tetrahedronEdges) assert(Math.abs(points[a].distanceTo(points[b]) - edge) < 1e-12, 'regular tetrahedron edge lengths');
}
upper.forEach((vertex, i) => assert(vertex.clone().add(lower[i]).length() < 1e-12, 'exact point-dual compound'));
const geometry = createBeamGeometry(edge - .075); geometry.computeBoundingBox();
const size = geometry.boundingBox.getSize(new THREE.Vector3());
assert(Math.abs(size.x - beamWidth) < 1e-6); assert(Math.abs(size.y - beamDepth) < 1e-6);
assert(size.z > 2.9 && geometry.attributes.normal, 'closed volumetric beam, with side faces and normals'); geometry.dispose();
for (const rate of [30, 60, 144]) {
 const model = new SelfMotion(); advance(model, 5, rate);
 assert(Math.abs(model.upper - rotationSpeeds.upper * 5) < 1e-10);
 assert(Math.abs(model.lower - rotationSpeeds.lower * 5) < 1e-10);
 assert(model.upper > 1 && model.lower < -.9, 'immediately perceptible opposite motion');
 model.playing = false; const before = model.upperVelocity; model.tick(1/rate);
 assert(model.upperVelocity > 0 && model.upperVelocity < before, 'pause eases rather than discontinuously stopping');
 advance(model, 4, rate); assert(Math.abs(model.upperVelocity) < 1e-8);
 model.playing = true; advance(model, 2, rate); assert(model.upperVelocity > .23 && model.lowerVelocity < -.19);
 const yaw = model.yaw, pitch = model.pitch; model.select(2); advance(model, 3, rate);
 assert.equal(model.phase, 'open'); assert.equal(model.deployment, 1); assert.equal(model.separation, 1);
 assert.equal(model.yaw, yaw); assert.equal(model.pitch, pitch); assert.equal(model.playing, true);
 const travel = model.travel; model.select(4); assert.equal(model.travel, travel, 'direct switch does not reset assembly');
 advance(model, .2, rate); assert.equal(model.active, 4);
 model.playing = false; model.select(null); advance(model, .7, rate); assert.equal(model.phase, 'closing'); assert(model.deployment < 1);
 model.select(1); advance(model, 2, rate); assert.equal(model.phase, 'open', 'closing reverses cleanly');
 model.select(null); advance(model, 4, rate); assert.equal(model.active, null); assert.equal(model.separation, 0); assert.equal(model.deployment, 0); assert.equal(model.playing, false); assert(Math.abs(model.upperVelocity) < 1e-8);
 model.beginDrag(); model.drag(.3, .2, .05); model.endDrag(); const start = model.yaw; advance(model, 1, rate);
 assert(model.yaw > start); assert.equal(model.active, null); assert.equal(model.phase, 'idle');
 model.reduced = true; model.playing = true; const angle = model.upper; advance(model, 2, rate); assert.equal(model.upper, angle);
 model.select(5); model.tick(1/rate); assert.equal(model.phase, 'open'); model.select(null); model.tick(1/rate); assert.equal(model.active, null);
}
for (const locale of ['en','de','ru']) {
 assert.equal(copy[locale].labels.length, 6);
 assert.deepEqual(Object.keys(copy[locale]).sort(), Object.keys(copy.en).sort());
 const catalog = JSON.parse(fs.readFileSync(`i18n/locales/${locale}.json`, 'utf8'));
 for (const keys of aboutSections) for (const key of keys) assert.equal(typeof key.split('.').reduce((value, field) => value?.[field], catalog), 'string', `${locale}:${key}`);
 for (const value of Object.values(copy[locale])) assert(Array.isArray(value) ? value.every(item => item.trim()) : value.trim());
}
const source = fs.readFileSync('app/pages/spatial-about.vue','utf8');
assert.equal((source.match(/class="spatial-zones"/g)??[]).length, 1);
assert(!source.includes('data-facet') && !source.includes('class="facets"'), 'no duplicate bottom navigation');
console.log('Spatial About: exact compound geometry, beveled beam volume, independent delta-time motion at 30/60/144Hz, pause easing, reversible reveal, preference preservation, drag, reduced motion and three-locale content passed.');
