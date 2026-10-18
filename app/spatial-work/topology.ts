import content from '../../content/projects.json';
import { portfolioProjects } from '../composables/useProjects';
import { getLocalizedValue } from '../utils/localizedContent';

// Match the existing public inventory, including experiments. JSON-only records
// are not implicitly published by introducing another presentation.
const published = new Set(portfolioProjects.map(project => project.id));
const aliases: Record<string, string> = {
  'Nuxt 4': 'Nuxt', 'Nuxt 3': 'Nuxt', 'Nuxt.js': 'Nuxt',
  'Vue.js': 'Vue', 'Vue 3': 'Vue', 'REST API': 'REST APIs',
  Tailwind: 'Tailwind CSS',
};
const contextual = new Set(['Full-Stack', 'Database', 'Responsive Design', 'Agile', 'AI Agents', 'Web Security', 'OWASP', 'CLI']);
export const normalizeTechnology = (label: string) => contextual.has(label) ? null : aliases[label] ?? label;
export function buildTopology(locale = 'en') {
  const projects = content.projects.filter(project => published.has(project.id)).map(project => ({
    id: `project:${project.id}`, sourceId: project.id, kind: 'project' as const,
    label: getLocalizedValue(project.title, locale),
    description: getLocalizedValue(project.short_description, locale),
    priority: project.priority, technologies: project.technologies, links: project.links,
    technologyIds: [...new Set(project.technologies.map(normalizeTechnology).filter((label): label is string => !!label))].map(label => `technology:${label}`),
  }));
  const technologies = [...new Set(projects.flatMap(project => project.technologyIds))].map(id => ({
    id, kind: 'technology' as const, label: id.slice(11),
    projectIds: projects.filter(project => project.technologyIds.includes(id)).map(project => project.id),
  })).sort((a, b) => b.projectIds.length - a.projectIds.length || a.label.localeCompare(b.label, 'en'));
  const edges = projects.flatMap(project => project.technologyIds.map(technology => ({ id: `${project.id}|${technology}`, project: project.id, technology })));
  return { projects, technologies, edges };
}
export type Topology = ReturnType<typeof buildTopology>;

// Stable similarity order, seeded by source priority. No physics or randomness.
export function layoutTopology(graph: Topology) {
  const remaining = [...graph.projects];
  const ordered: typeof remaining = [];
  while (remaining.length) {
    const previous = ordered.at(-1);
    let best = 0;
    if (previous) {
      let score = -1;
      remaining.forEach((project, i) => {
        const shared = project.technologyIds.filter(id => previous.technologyIds.includes(id)).length;
        if (shared > score) { score = shared; best = i; }
      });
    }
    ordered.push(remaining.splice(best, 1)[0]!);
  }
  const positions: Record<string, { x: number; y: number }> = {};
  ordered.forEach((project, i) => { positions[project.id] = { x: i < 7 ? 155 : 1045, y: 92 + (i % 7) * 104 }; });
  // Hubs have generous slots at the top; less shared tools form a quiet service lattice.
  graph.technologies.forEach((technology, i) => {
    positions[technology.id] = { x: 390 + (i % 4) * 140, y: 70 + Math.floor(i / 4) * 76 };
  });
  return positions;
}
