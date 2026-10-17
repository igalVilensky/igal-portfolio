// Run after npm run generate. The lab is public and English-only, and must
// remain separate from the main portfolio pages. Optionally check a static host.
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const output = 'dist';
const html = await readFile(join(output, 'design-lab/index.html'), 'utf8');
assert(html.includes('class="identity-lab"'), 'Missing generated Design Lab');
assert(html.includes('integrated-hero'), 'Missing initial lab composition');
for (const [, asset] of html.matchAll(/(?:src|href)="(\/_nuxt\/[^"?#]+)/g)) {
  await access(join(output, asset));
}
const chunks = await readdir(join(output, '_nuxt'));
const scripts = (await Promise.all(chunks.filter(name => name.endsWith('.js'))
  .map(name => readFile(join(output, '_nuxt', name), 'utf8')))).join('\n');
for (const marker of ['integrated-hero', 'network-space', 'layer-drawing', 'flow-engine']) {
  assert(scripts.includes(marker), `Missing lab composition in client bundle: ${marker}`);
}
for (const locale of ['', 'de', 'ru']) {
  const home = await readFile(join(output, locale, 'index.html'), 'utf8');
  assert(!home.includes('class="identity-lab"'), `${locale || 'en'}: homepage replaced`);
}
// Lab.vue explicitly opts out of localization with defineI18nRoute(false).
for (const locale of ['de', 'ru']) {
  await assert.rejects(access(join(output, locale, 'design-lab/index.html')), { code: 'ENOENT' });
}
if (process.argv[2]) {
  for (const path of ['/design-lab', '/design-lab/']) {
    const response = await fetch(new URL(path, process.argv[2]));
    assert.equal(response.status, 200, `${path} must be public`);
    assert((await response.text()).includes('class="identity-lab"'), `${path}: missing markup`);
  }
  for (const path of ['/de/design-lab', '/ru/design-lab']) {
    const response = await fetch(new URL(path, process.argv[2]));
    assert.equal(response.status, 404, `${path}: lab remains English-only`);
  }
}
console.log(`Design Lab generated with its entry assets; main homepages remain separate; existing English-only routing preserved${process.argv[2] ? '; public URLs return 200 and localized URLs return 404' : ''}.`);
