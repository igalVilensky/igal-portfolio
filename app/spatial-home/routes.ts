// Pass these unprefixed paths to useLocalePath at the point of navigation.
export const spatialRoutes = {
  home: '/spatial-home',
  work: '/spatial-work',
  experiments: '/spatial-experiments',
  aiAutomation: '/spatial-ai-automation',
  about: '/spatial-about',
} as const;

// Deliberate exits. A Spatial Ask experience has not been implemented.
export const spatialExits = {
  ask: '/ask-igal', // Preserve the existing Classic Ask fallback.
  gateway: '/',
  directory: '/site-directory',
} as const;

// Order matches the five existing visual layers and their localized copy.
export const destinations = [
  spatialRoutes.work,
  spatialRoutes.experiments,
  spatialExits.ask,
  spatialRoutes.aiAutomation,
  spatialRoutes.about,
] as const;
