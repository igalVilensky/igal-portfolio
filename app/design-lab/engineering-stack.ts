import content from '../../content/projects.json';

// Editorial lenses on documented work, never edges in a deployed architecture.
const definitions = [
  { name: 'Applications', verb: 'Make it usable.', copy: 'Turn a practical need into an interface people can work with.', projectId: 'family-space', evidence: 'Shared calendars, tasks and messaging bring household coordination into one application.', kind: 'Independent application', glyph: 'M270 95h90v55h-90z M270 110h90 M290 110v40' },
  { name: 'APIs & Integrations', verb: 'Connect the pieces.', copy: 'Give separate systems a useful way to work together.', projectId: 'user-management-app', evidence: 'A Vue 3 interface and FastAPI backend support user administration workflows.', kind: 'Independent application', glyph: 'M290 95l-25 25 25 25 M340 95l25 25-25 25 M325 90l-20 60' },
  { name: 'Data', verb: 'Give complexity structure.', copy: 'Make information understandable enough to support a useful decision.', projectId: 'ari-motors-ev-portal', evidence: 'Vehicle comparison workflows organize complex technical data.', kind: 'Professional work', glyph: 'M275 100l40-20 40 20-40 20z M275 115l40 20 40-20 M275 130l40 20 40-20' },
  { name: 'AI & Automation', verb: 'Keep people in control.', copy: 'Use AI to help with the work, with room for human judgment.', projectId: 'flowforge', evidence: 'Automation ideas become human-reviewable workflow blueprints and importable n8n JSON drafts.', kind: 'Independent project', glyph: 'M325 80l-50 50h35l-5 35 50-55h-35z' },
  { name: 'Outcomes', verb: 'Make the result useful.', copy: 'Bring engineering back to a concrete task it helps someone accomplish.', projectId: 'i18n-lint-cli', evidence: 'Checks translation files for missing keys, extra keys and placeholder mismatches.', kind: 'Independent developer tool', glyph: 'M278 120l25 25 50-50' },
] as const;

export const engineeringLayers = definitions.map(layer => {
  const project = content.projects.find(project => project.id === layer.projectId);
  if (!project) throw new Error(`Missing portfolio project: ${layer.projectId}`);
  return { ...layer, project: { title: typeof project.title === 'string' ? project.title : project.title.en, description: project.short_description.en, href: project.links.case_study || project.links.github || project.links.live } };
});
