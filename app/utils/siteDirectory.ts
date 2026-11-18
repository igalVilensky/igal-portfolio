import type { RouteRecordNormalized } from 'vue-router';

export const directoryGroups = ['main', 'spatialGroup', 'projects', 'experiments', 'tests', 'other'] as const;
export type DirectoryGroup = typeof directoryGroups[number];
export type AuditStatus = 'mainStatus' | 'experimental' | 'legacy' | 'test' | 'unclassified';

// Optional owner annotations. Discovery always comes from the router, never this map.
// Future cleanup decisions can set directoryStatus / directoryCategory in page meta,
// or annotate a route here without removing it from the inventory.
const annotations: Record<string, { category?: DirectoryGroup; status?: AuditStatus }> = {};

export function discoverPages(records: RouteRecordNormalized[]) {
  const pages = new Map<string, {
    path: string; name: string; title: string; category: string;
    status: AuditStatus; parameters: boolean; catchAll: boolean;
    redirect: boolean; excluded: boolean;
    parameterDetails: DirectoryParameter[]; redirectDescription: string;
  }>();
  for (const route of records) {
    const path = route.path.replace(/^\/(de|ru)(?=\/|$)/, '') || '/';
    if (pages.has(path)) continue;
    const name = String(route.name ?? '').replace(/___(?:en|de|ru)(?:___default)?$/, '');
    const main = ['/', '/portfolio', '/spatial-home', '/arrival-lab', '/site-directory'].includes(path);
    const category: DirectoryGroup = main ? 'main'
      : path.startsWith('/spatial-') ? 'spatialGroup'
      : path.startsWith('/case-studies') ? 'projects'
      : /(?:test|prototype|design-lab|world-lab)/.test(path) ? 'tests'
      : /experiment/.test(path) ? 'experiments' : 'other';
    const annotation = annotations[path];
    const metaCategory = route.meta.directoryCategory as DirectoryGroup | undefined;
    const metaStatus = route.meta.directoryStatus as AuditStatus | undefined;
    pages.set(path, {
      path, name, title: typeof route.meta.title === 'string' ? route.meta.title : '',
      category: annotation?.category ?? (typeof metaCategory === 'string' && metaCategory.trim() ? metaCategory : category),
      status: annotation?.status ?? (['mainStatus', 'experimental', 'legacy', 'test', 'unclassified'].includes(metaStatus ?? '') ? metaStatus! : main ? 'mainStatus' : 'unclassified'),
      parameters: /:[^/]+/.test(path),
      parameterDetails: routeParameters(path),
      redirectDescription: typeof route.redirect === 'string' ? route.redirect : typeof route.redirect === 'function' ? 'Resolved by router' : route.redirect ? JSON.stringify(route.redirect) : '',
      catchAll: /\(\.\*\)/.test(path),
      redirect: Boolean(route.redirect),
      excluded: route.meta.directoryHidden === true || route.meta.nav === false || route.meta.hidden === true || /noindex/.test(String(route.meta.robots ?? '')),
    });
  }
  return [...pages.values()].sort((a, b) => a.path.localeCompare(b.path));
}

export interface DirectoryParameter {
  token: string;
  name: string;
  optional: boolean;
  repeatable: boolean;
  pattern: string;
}

// Vue Router path tokens, including escaped characters in custom expressions.
export function routeParameters(path: string): DirectoryParameter[] {
  return Array.from(path.matchAll(/:([A-Za-z0-9_]+)(\((?:\\.|[^)])*\))?([?*+]?)/g), ([token, name, expression, modifier]) => ({
    token, name: name!, optional: modifier === '?' || modifier === '*',
    repeatable: modifier === '*' || modifier === '+', pattern: expression?.slice(1, -1) ?? '',
  }));
}

export function directoryDestination(page: ReturnType<typeof discoverPages>[number], values: Record<string, string>): string | null {
  if (page.catchAll) return null;
  let path = page.path;
  for (const param of page.parameterDetails) {
    const value = (values[param.name] ?? '').trim();
    if (!value && !param.optional) return null;
    const parts = param.repeatable ? value.split('/') : [value];
    if (value && param.pattern) {
      try { if (parts.some(part => !new RegExp(`^(?:${param.pattern})$`).test(part))) return null; }
      catch { return null; }
    }
    const encoded = value ? parts.map(encodeURIComponent).join('/') : '';
    path = path.replace(!value && path.includes('/' + param.token) ? '/' + param.token : param.token, encoded);
  }
  return path || '/';
}
