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
    path: string; name: string; title: string; category: DirectoryGroup;
    status: AuditStatus; parameters: boolean; catchAll: boolean;
    redirect: boolean; excluded: boolean;
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
      category: annotation?.category ?? (directoryGroups.includes(metaCategory!) ? metaCategory! : category),
      status: annotation?.status ?? (['mainStatus', 'experimental', 'legacy', 'test', 'unclassified'].includes(metaStatus ?? '') ? metaStatus! : main ? 'mainStatus' : 'unclassified'),
      parameters: /:[^/]+/.test(path),
      catchAll: /\(\.\*\)/.test(path),
      redirect: Boolean(route.redirect),
      excluded: route.meta.directoryHidden === true || route.meta.nav === false || route.meta.hidden === true || /noindex/.test(String(route.meta.robots ?? '')),
    });
  }
  return [...pages.values()].sort((a, b) => a.path.localeCompare(b.path));
}
