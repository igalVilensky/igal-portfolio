import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseSfc } from '@vue/compiler-sfc';
import { parse as parseTemplate } from '@vue/compiler-dom';
import { projectsData, sourceLabels } from '../netlify/functions/lib/portfolioKnowledge.js';

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const locales = ['en', 'de', 'ru'];
const catalogs = Object.fromEntries(locales.map((locale) => [locale, readJson(`i18n/locales/${locale}.json`)]));
const get = (object, key) => key.split('.').reduce((value, part) => value?.[part], object);
const normalize = (text) => text.trim().replace(/\s+/g, ' ');
// Brand names, technology lists, and deliberately literal code examples are not prose.
const literalExceptions = new Set([
  'Igal Vilensky', 'GitHub', 'LinkedIn', 'AI Compliance Compass', 'Security Playground',
  'Flowplace: Role Compass', 'RootObject', '{"name": "Igal", "role": "Developer"}',
  'https://secuure-login-update.com/auth', "SELECT * FROM users WHERE username = '",
  'SELECT * FROM users WHERE username = $1;', "> window.localStorage.getItem('auth_token')",
  'Vue 3, Nuxt 3, TypeScript, Tailwind CSS, Agile',
  'Vue.js, Nuxt.js, TypeScript, Directus, REST APIs, CI/CD.',
  'Vue.js, Nuxt.js, TypeScript, Directus, REST APIs, CI/CD',
]);
const failures = [];
const checkLiteral = (text, file) => {
  const value = normalize(text);
  if (/[A-Za-z]{2}/.test(value) && !literalExceptions.has(value)) failures.push(`${file}: untranslated template text ${JSON.stringify(value)}`);
};
const files = fs.readdirSync('app', { recursive: true }).filter((file) => file.endsWith('.vue'));
for (const relative of files) {
  const file = path.join('app', relative);
  const source = fs.readFileSync(file, 'utf8');
  const { descriptor } = parseSfc(source);
  if (descriptor.template) {
    const visit = (node, isCode = false) => {
      isCode ||= ['code', 'pre'].includes(node.tag);
      if (node.type === 2 && !isCode) checkLiteral(node.content, file);
      for (const prop of node.props || []) {
        if (prop.type === 6 && ['placeholder', 'aria-label', 'title', 'alt'].includes(prop.name) && prop.value) checkLiteral(prop.value.content, file);
      }
      for (const child of node.children || []) visit(child, isCode);
    };
    visit(parseTemplate(descriptor.template.content));
  }
  for (const match of source.matchAll(/\bt\(\s*['"]([^'"`]+)['"]/g)) {
    for (const locale of locales) if (typeof get(catalogs[locale], match[1]) !== 'string') failures.push(`${file}: missing ${locale}:${match[1]}`);
  }
}
for (const locale of locales) {
  const mirror = readJson(`app/i18n/locales/${locale}.json`);
  assert.deepEqual(mirror, catalogs[locale], `Locale copies differ: ${locale}`);
}
const projects = readJson('content/projects.json');
for (const project of projects.projects) {
  for (const field of ['category', 'short_description']) for (const locale of locales) assert(project[field][locale]?.trim(), `${project.id}.${field}.${locale}`);
  if (typeof project.title !== 'string') for (const locale of locales) assert(project.title[locale]?.trim(), `${project.id}.title.${locale}`);
}
assert.deepEqual(projectsData, projects, 'Generated project knowledge is stale');
assert.deepEqual(sourceLabels, readJson('content/source-labels.json'), 'Generated source labels are stale');
for (const label of Object.values(sourceLabels)) for (const locale of locales) assert(label[locale]?.trim(), `Missing source label: ${locale}`);
assert.equal(failures.length, 0, failures.join('\n'));
console.log(`Public template audit passed (${files.length} components), translation references and mirrors match, structured translations and generated snapshots are valid.`);
console.log('This check complements browser tests; it does not prove all script-generated states are localized.');
