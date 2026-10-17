// Run after build/generate; pass a running production origin for HTTP assertions.
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
let checked = 0;
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    assert(!/work-(?:mindq-lab|sunlit-tales|i18n-linter)|ask-igal-(?:code|systems|experience|answer)|spatial-home|SpatialStack|SpatialHome|SpatialEnvironment|AboutReveal|WorkReveal|AskIgalReveal|ExperimentsReveal|useSpatialNavigation/.test(entry.name), `Prototype path shipped: ${path}`);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules') await inspect(path);
    } else if (/\.(?:m?js|css|html|json|xml|txt)$/.test(entry.name)) {
      assert(!/about-constellation|about-thread|spatial-home|spatial-plane|spatial-environment|world-structure|work-collection|work-art|work-peek|experiments-world|experiments-circuit|ask-knowledge|knowledge-art|ask-identity|ask-lettering|peek-opening|stack-breathe|Five directions\. One place\./.test(await readFile(path, 'utf8')), `Prototype code shipped: ${path}`);
      checked++;
    }
  }
}
await inspect('.output');
if (process.argv[2]) {
  for (const prefix of ['', '/en', '/de', '/ru']) for (const suffix of ['', '/']) {
    const path = `${prefix}/spatial-home${suffix}`;
    const response = await fetch(new URL(path, process.argv[2]));
    assert.equal(response.status, 404, `${path} must return 404`);
    assert(!(await response.text()).includes('spatial-plane'), `${path} leaked markup`);
  }
}
console.log(`Spatial home excluded from ${checked} production artifacts${process.argv[2] ? '; all eight production URLs return 404' : ''}.`);
