// Run after npm run generate. Spatial Home is public, but stays separate from
// the main homepage. Optionally pass a static production origin for HTTP checks.
import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const output = 'dist';
const routes = ['/spatial-home', '/de/spatial-home', '/ru/spatial-home'];
for (const route of routes) {
  const html = await readFile(join(output, route, 'index.html'), 'utf8');
  assert(html.includes('class="spatial-home"'), `${route}: missing spatial interface`);
  assert.equal((html.match(/class="spatial-plate(?: |")/g) ?? []).length, 5, `${route}: missing plates`);
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/_nuxt\/[^"?#]+)/g)) {
    await access(join(output, asset));
  }
  assert(!/class="[^"]*(?:automation-world|flow-station|work-collection|ask-knowledge|about-constellation|experiments-world)/.test(html), `${route}: external composition mounted`);
  assert(!html.includes('class="geometry-panel"'), `${route}: development diagnostics shipped`);
}
for (const locale of ['', 'de', 'ru']) {
  const html = await readFile(join(output, locale, 'index.html'), 'utf8');
  assert(!html.includes('class="spatial-home"'), `${locale || 'en'}: homepage replaced`);
}

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  }))).flat();
}
// Compare actual PNG contents, independent of Vite's hashed output filenames.
const shipped = await files(join(output, '_nuxt'));
const pngs = shipped.filter(path => path.endsWith('.png'));
const buffers = await Promise.all(pngs.map(path => readFile(path)));
// Only internal plate dependencies must ship; disconnected prototypes may tree-shake.
const internal = await Promise.all(['WorkSurfaceArtwork.vue', 'LayerSurfaceArtwork.vue'].map(file => readFile(join('app/spatial-home', file), 'utf8')));
const artwork = [...new Set(internal.flatMap(source => [...source.matchAll(/from '\.\/(assets\/[^']+\.png)'/g)].map(match => join('app/spatial-home', match[1]))))];
for (const source of artwork) {
  const original = await readFile(source);
  assert(buffers.some(buffer => buffer.equals(original)), `Missing spatial artwork: ${source}`);
}
if (process.argv[2]) {
  for (const route of routes) for (const suffix of ['', '/']) {
    const response = await fetch(new URL(route + suffix, process.argv[2]));
    assert.equal(response.status, 200, `${route + suffix}: must be public`);
    assert((await response.text()).includes('class="spatial-home"'), `${route}: missing markup`);
  }
}
console.log(`Spatial Home generated in all three locales; ${artwork.length} PNG assets verified; main homepages remain separate${process.argv[2] ? '; all six public URLs return 200' : ''}.`);
