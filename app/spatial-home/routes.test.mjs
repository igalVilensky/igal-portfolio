import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import ts from 'typescript';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const source = read('./routes.ts');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { spatialRoutes, spatialExits, destinations } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

test('menu maps to implemented Spatial destinations with an explicit missing Ask fallback', () => {
  assert.deepEqual(destinations, ['/spatial-work', '/spatial-experiments', '/ask-igal', '/spatial-ai-automation', '/spatial-about']);
  assert.equal(spatialExits.ask, '/ask-igal');
  assert(existsSync(new URL('../pages/ask-igal.vue', import.meta.url)));
  for (const [name, route] of Object.entries(spatialRoutes)) {
    if (name === 'home') continue;
    const page = read(`../pages${route}.vue`);
    assert.match(page, /definePageMeta\(\{\s*layout:\s*false/);
    assert.match(page, /localePath\(spatialRoutes.home\)/);
    assert.doesNotMatch(page, /route\.query|useState\(/, `${route} must retain its identity on direct entry`);
  }
});

test('native links, programmatic navigation and animated Work entry share the same mapping', () => {
  const stack = read('./SpatialStack.vue');
  const navigation = read('./useSpatialNavigation.ts');
  assert.match(stack, /import \{ destinations \} from "\.\/routes"/);
  assert.match(stack, /:href="localePath\(destination\)"/);
  assert.match(navigation, /from '\.\/routes'/);
  assert.match(navigation, /\$workEntry.enter\(source, localePath\(destinations\[i\]!\)/);
  assert.match(navigation, /navigateTo\(localePath\(destinations\[i\]!\)\)/);
});

test('Gateway and return exits use the locale helper; EN DE RU retain existing prefix policy', () => {
  const config = read('../../nuxt.config.ts');
  assert.equal(spatialRoutes.home, '/spatial-home');
  assert.match(config, /name: 'spatial-home', path: '\/spatial-home', file:.*app\/spatial-home\/SpatialHome.vue/);
  assert.match(read('../pages/index.vue'), /:to="localePath\(spatialRoutes.home\)"/);
  assert.equal(spatialExits.gateway, '/');
  assert.match(read('./SpatialHome.vue'), /:to="localePath\(spatialExits.gateway\)"/);
  assert.match(config, /strategy: "prefix_except_default"/);
  assert.match(config, /defaultLocale: "en"/);
  for (const locale of ['en', 'de', 'ru']) assert(config.includes(`code: "${locale}"`));
  for (const route of [...Object.values(spatialRoutes), ...Object.values(spatialExits)]) {
    assert(route.startsWith('/'));
    assert.doesNotMatch(route, /^\/(en|de|ru)(\/|$)/);
  }
});
