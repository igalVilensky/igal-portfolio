// Run after npm run build (or generate). No browser or extra dependencies required.
// Optionally pass a production origin to also verify HTTP and localized fallbacks.
import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const output = '.output';
await access(join(output, 'public'));
let checked = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    assert(!entry.name.includes('design-lab'), `Lab path shipped: ${path}`);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') await inspect(path);
    } else if (/\.(?:m?js|css|html|json)$/.test(entry.name)) {
      const text = await readFile(path, 'utf8');
      assert(!/design-lab|network-space|layer-drawing|flow-engine|Engineering, in motion\./.test(text), `Lab code shipped: ${path}`);
      checked++;
    }
  }
}
await inspect(output);
if (process.argv[2]) {
  for (const path of ['/design-lab', '/design-lab/', '/de/design-lab', '/ru/design-lab']) {
    const response = await fetch(new URL(path, process.argv[2]));
    assert.equal(response.status, 404, `${path} must be inaccessible in production`);
    assert(!(await response.text()).includes('identity-lab'), `${path} leaked lab markup`);
  }
}
console.log(`Design lab excluded from ${checked} production artifacts${process.argv[2] ? '; all four production URLs return 404' : ''}.`);
