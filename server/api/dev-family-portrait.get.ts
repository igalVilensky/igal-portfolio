import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/** Loopback-only development preview. Originals are never imported into Vite. */
export default defineEventHandler(async event => {
  if (!import.meta.dev) throw createError({ statusCode: 404 });
  const loopback = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];
  const address = event.node.req.socket.remoteAddress;
  // Nuxt's development proxy uses a Unix socket, so remoteAddress is absent.
  // In that case require a local Host and an entirely loopback forwarded chain.
  const headers = event.node.req.headers;
  const forwarded = String(headers['x-forwarded-for'] || '').split(',').map(value => value.trim());
  const localHost = /^(127\.0\.0\.1|localhost|\[::1\])(:\d+)?$/.test(String(headers.host || ''));
  const local = localHost && (!address || loopback.includes(address))
    && (headers['x-forwarded-for'] ? forwarded.every(value => loopback.includes(value)) : !!address);
  if (!local) throw createError({ statusCode: 404 });
  const files:Record<string,string> = { igal:'igal.jpeg', anastasia:'anastasia.jpg', amelia:'amelia.jpg', nataniel:'nataniel.jpg', adriel:'adriel.jpg' };
  const id = String(getQuery(event).id || '');
  if (!Object.hasOwn(files,id)) throw createError({ statusCode: 404 });
  setHeader(event,'Cache-Control','no-store');setHeader(event,'Content-Type','image/jpeg');
  try { return await readFile(resolve(process.cwd(),'docs/design/design-references/family',files[id]!)); }
  catch { throw createError({ statusCode:404 }); }
});
