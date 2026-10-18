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

export const moduleSize = (id: string) => id.startsWith('project:')
  ? { width: 160, height: 54, depth: 12 }
  : { width: 92, height: id.slice(11).length > 20 ? 44 : 32, depth: 7 };

// Fixed project scaffold follows the recorded stacks: Vue/Nuxt to the west,
// shared services through the center, React/Python to the east. Technologies
// occupy their neighbors' barycenters, with deterministic collision clearance.
// No force simulation, per-frame layout, or load-time randomness.
export function layoutTopology(graph: Topology) {
  const anchors: Record<string, [number, number]> = {
    'flowforge': [365, 95], 'flowplace-role-compass': [180, 210],
    'openme': [895, 185], 'decision-matrix-ai': [950, 365],
    'ari-motors-ev-portal': [130, 370], 'ai-compliance-compass': [710, 295],
    'user-management-app': [570, 140], 'leanera-digital-transition': [315, 335],
    'mindq-lab': [400, 535], 'security-playground': [160, 510],
    'page-scope': [1000, 535], 'i18n-lint-cli': [720, 70],
    'family-space': [600, 465], 'sunlit-tales': [780, 565],
  };
  const positions: Record<string, { x: number; y: number }> = {};
  graph.projects.forEach(project => {
    const [x, y] = anchors[project.sourceId] ?? [600, 320];
    positions[project.id] = { x, y };
  });
  graph.technologies.forEach(technology => {
    const neighbors = technology.projectIds.map(id => positions[id]!);
    const center = {
      x: neighbors.reduce((sum, p) => sum + p.x, 0) / neighbors.length,
      y: neighbors.reduce((sum, p) => sum + p.y, 0) / neighbors.length,
    };
    // Single-project tools grow inward from their module, rather than covering it.
    if (neighbors.length === 1) {
      const length = Math.hypot(600 - center.x, 320 - center.y) || 1;
      center.x += (600 - center.x) / length * 95;
      center.y += (320 - center.y) / length * 95;
    }
    for (let i = 0; i < 4000; i++) {
      const radius = Math.sqrt(i) * 9;
      const angle = i * 2.399963229728653;
      const point = { x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius * .75 };
      if (point.x < 90 || point.x > 1100 || point.y < 65 || point.y > 575) continue;
      const size = moduleSize(technology.id);
      const collision = Object.entries(positions).some(([id, other]) => {
        const body = moduleSize(id);
        return Math.abs(point.x - other.x) < (size.width + body.width) / 2 + 12
          && Math.abs(point.y - other.y) < (size.height + body.height) / 2 + 13;
      });
      if (!collision) { positions[technology.id] = point; break; }
    }
  });
  return positions;
}

// Attach wires to front-face edge midpoints. All bodies share the same
// orthographic depth vector (+X, -Y); labels remain square to the viewer.
export function moduleAnchor(id: string, from: { x: number; y: number }, toward: { x: number; y: number }) {
  const size = moduleSize(id), dx = toward.x - from.x, dy = toward.y - from.y;
  return Math.abs(dx) / size.width > Math.abs(dy) / size.height
    ? { x: from.x + Math.sign(dx) * size.width / 2, y: from.y }
    : { x: from.x, y: from.y + Math.sign(dy) * size.height / 2 };
}
