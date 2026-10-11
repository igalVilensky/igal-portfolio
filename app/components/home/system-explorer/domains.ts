import { Database, PanelsTopLeft, Network, Workflow, ArrowUpRight } from 'lucide-vue-next';

// Editorial associations, not an architecture or a claim that every project uses every domain.
// IDs resolve through useProjects; project titles and destinations stay in the existing data.
export const domains = [
  { id: 'data', icon: Database, projectIds: ['ari-motors-ev-portal'], path: 'M 130 100 H 205 Q 225 100 225 120 V 175 Q 225 195 245 195 H 300' },
  { id: 'applications', icon: PanelsTopLeft, projectIds: ['flowplace-role-compass'], path: 'M 470 100 H 395 Q 375 100 375 120 V 175 Q 375 195 355 195 H 300' },
  { id: 'integrations', icon: Network, projectIds: ['flowplace-role-compass'], path: '' },
  { id: 'automation', icon: Workflow, projectIds: ['flowforge'], path: 'M 130 300 H 205 Q 225 300 225 280 V 215 Q 225 195 245 195 H 300' },
  { id: 'outcomes', icon: ArrowUpRight, projectIds: ['ari-motors-ev-portal'], path: 'M 470 300 H 395 Q 375 300 375 280 V 215 Q 375 195 355 195 H 300' },
] as const;
export type DomainId = typeof domains[number]['id'];
