import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

/** Explicitly opt-in, loopback-only development preview. Never imports photo bytes. */
export default defineEventHandler(async event => {
  if (!import.meta.dev || process.env.ARRIVAL_PRIVATE_PORTRAITS !== '1') throw createError({ statusCode: 404 });
  const address = event.node.req.socket.remoteAddress;
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(address || '')) throw createError({ statusCode: 404 });
  const files:Record<string,string> = { igal:'igal.jpeg', anastasia:'anastasia.jpg', amelia:'amelia.jpg', nataniel:'nataniel.jpg', adriel:'adriel.jpg' };
  const id = String(getQuery(event).id || '');
  if (!Object.hasOwn(files,id)) throw createError({ statusCode: 404 });
  setHeader(event,'Cache-Control','no-store');setHeader(event,'Content-Type','image/jpeg');
  try { return await readFile(resolve(process.cwd(),'docs/design/design-references/family',files[id]!)); }
  catch { throw createError({ statusCode:404 }); }
});
