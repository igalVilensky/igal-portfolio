// composables/useProjects.ts
export type ProjectType = "work" | "experiment";

export interface ProjectVisual {
  initials: string;
  accent: string;
  soft: string;
  metricA?: string;
  metricB?: string;
  metricC?: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  tags: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  image?: string;
  visual: ProjectVisual;
  projectType: ProjectType;
  featuredHome?: boolean;
  featuredWork?: boolean;
}

export interface SkillGroup {
  title: string;
  accent: string;
  description: string;
  items: string[];
}

export const currentFocus = [
  {
    title: "AI agents",
    description: "Learning how agentic systems plan, use tools, and stay useful inside real product workflows.",
  },
  {
    title: "Automation workflows",
    description: "Exploring n8n, Make, APIs, and webhooks for practical handoffs between apps and teams.",
  },
  {
    title: "LLM product UX",
    description: "Building interfaces where AI suggestions are editable, explainable, and grounded in user intent.",
  },
  {
    title: "Full-stack AI apps",
    description: "Connecting TypeScript interfaces, serverless functions, Python APIs, persistence, and model calls.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    accent: "primary",
    description: "Interfaces that are fast, responsive, and built around real user workflows.",
    items: ["TypeScript", "JavaScript", "Vue", "Nuxt", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    accent: "accent",
    description: "APIs, data models, auth flows, and production-minded service boundaries.",
    items: ["Node.js", "Express", "Python", "FastAPI", "REST APIs", "PostgreSQL", "Prisma", "Firebase / Firestore"],
  },
  {
    title: "AI / Automation",
    accent: "emerald",
    description: "Current specialization: practical AI-assisted systems and automation-first product flows.",
    items: ["LLM APIs", "Groq API", "Prompt engineering", "AI agents", "n8n", "Make", "Webhooks", "API automation", "AI-assisted product workflows"],
  },
  {
    title: "Engineering",
    accent: "secondary",
    description: "The habits that keep products maintainable after the exciting demo works.",
    items: ["Git", "Docker", "CI/CD basics", "Testing / QA", "Deployment", "Netlify", "Vercel", "Render"],
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "openme",
    title: "OpenMe",
    category: "SaaS MVP / AI-Assisted Platform / Full-Stack Product",
    shortDescription:
      "Actionable bio/profile platform where people define what others can do with them through public endpoints such as collaboration, questions, feedback, and ideas.",
    longDescription:
      "OpenMe rethinks the personal link-in-bio page as an interaction menu. Instead of only listing links, a profile exposes clear public endpoints like collaborate, ask me, feedback, and offer help. The MVP includes profile links, custom endpoints, boundaries, inbox flows, and AI-assisted submission summaries.",
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "FastAPI", "Docker Compose", "Vercel", "Render", "Neon"],
    tags: ["Next.js", "TypeScript", "Express", "PostgreSQL", "Prisma", "FastAPI", "AI", "Monorepo", "SaaS", "Vercel"],
    highlights: [
      "Full-stack monorepo architecture with pnpm workspaces and Turbo",
      "Public profile and endpoint system with authenticated owner flows",
      "Dashboard/inbox workflow with AI-assisted summaries for incoming submissions",
      "Production deployment across Vercel, Render, and Neon",
    ],
    liveUrl: "https://openme-web.vercel.app/",
    githubUrl: "https://github.com/igalVilensky/openme",
    visual: {
      initials: "OM",
      accent: "#22c55e",
      soft: "#dcfce7",
      metricA: "SaaS",
      metricB: "AI inbox",
      metricC: "Monorepo",
    },
    projectType: "work",
    featuredHome: true,
    featuredWork: true,
  },
  {
    id: "decision-matrix-ai",
    title: "Decision Matrix AI",
    category: "AI Product Tool / Decision Support / Full-Stack App",
    shortDescription:
      "AI-assisted decision matrix app for comparing complex choices using weighted criteria, scores, explainable recommendations, and action checklists.",
    longDescription:
      "Decision Matrix AI helps users turn vague decisions into structured comparisons. It supports weighted criteria, must-have requirements, editable scores, ranked results, category breakdowns, AI-generated suggestions, recommendation summaries, and practical next-step checklists.",
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Netlify Functions", "Groq API", "Firebase Anonymous Auth", "Firestore", "Zod"],
    tags: ["React", "TypeScript", "AI", "Groq", "Firebase", "Firestore", "Netlify Functions", "Tailwind"],
    highlights: [
      "AI-generated criteria, options, scores, review, recommendations, and action checklists",
      "User-specific cloud persistence with Firebase and Firestore",
      "Import/export JSON backups for decision data",
      "Serverless AI calls through Netlify Functions with Zod validation",
    ],
    liveUrl: "https://decision-matrix-ai.netlify.app/",
    githubUrl: "https://github.com/igalVilensky/decision-matrix-ai",
    visual: {
      initials: "DM",
      accent: "#0ea5e9",
      soft: "#e0f2fe",
      metricA: "Criteria",
      metricB: "Scores",
      metricC: "Actions",
    },
    projectType: "work",
    featuredHome: true,
    featuredWork: true,
  },
  {
    id: "flowplace-role-compass",
    title: "Flowplace: Role Compass",
    category: "SaaS Product Engineering / Professional Case Study",
    shortDescription:
      "Talent profile feature for a SaaS platform, built with Vue/Nuxt and Directus and adopted by 5,000+ users in the first month.",
    longDescription:
      "A professional SaaS case study focused on end-to-end product engineering, responsive UI workflows, API integration, feature delivery, and sustainable frontend architecture in a high-velocity Agile team.",
    technologies: ["Vue.js", "Nuxt.js", "TypeScript", "Directus", "REST APIs", "CI/CD"],
    tags: ["Vue", "Nuxt", "TypeScript", "SaaS", "Directus", "Product Engineering"],
    highlights: [
      "Reached 5,000+ users in the first month",
      "Led end-to-end development of a core talent profile feature",
      "Improved usability, accessibility, and consistency across product workflows",
      "Worked inside Agile delivery with production release discipline",
    ],
    caseStudyUrl: "/case-studies/flowplace",
    visual: {
      initials: "FP",
      accent: "#6366f1",
      soft: "#e0e7ff",
      metricA: "5K+",
      metricB: "SaaS",
      metricC: "Vue",
    },
    projectType: "work",
    featuredHome: true,
    featuredWork: true,
  },
  {
    id: "ai-compliance-compass",
    title: "AI Compliance Compass",
    category: "Responsible AI Tool / Practical Compliance UX",
    shortDescription:
      "Educational AI use-case checker that turns plain-language descriptions into practical EU/Germany compliance prompts and next steps.",
    longDescription:
      "AI Compass is a practical portfolio tool for exploring AI compliance, safety, and responsible use patterns in a German/EU context. It avoids legal certainty and focuses on educational classification, clarification questions, and next-step checklists.",
    technologies: ["Nuxt", "Vue 3", "TypeScript", "Netlify Functions", "Groq API", "Tailwind CSS"],
    tags: ["Nuxt", "AI", "Groq", "Responsible AI", "EU AI Act", "UX"],
    highlights: [
      "Plain-language AI use-case intake",
      "Clarification flow for missing context",
      "Educational risk, GDPR, copyright, and transparency checks",
      "Built-in disclaimers to avoid legal overclaiming",
    ],
    liveUrl: "/ai-compliance-compass",
    githubUrl: "https://github.com/igalVilensky/igal-portfolio",
    visual: {
      initials: "AI",
      accent: "#f59e0b",
      soft: "#fef3c7",
      metricA: "EU",
      metricB: "Safety",
      metricC: "Checklist",
    },
    projectType: "work",
    featuredHome: true,
    featuredWork: true,
  },
  {
    id: "ari-motors-ev-portal",
    title: "ARI Motors: EV Portal",
    category: "Full-Stack Web Platform / Professional Case Study",
    shortDescription:
      "Electric vehicle comparison portal built from scratch to production in under three months as a solo full-stack developer.",
    longDescription:
      "A professional case study covering frontend interface work, backend systems, database architecture, responsive design, and a fast production launch for an electric commercial vehicle comparison portal.",
    technologies: ["JavaScript", "Full-Stack", "Database", "Responsive Design", "REST APIs"],
    tags: ["JavaScript", "Full-Stack", "EV Portal", "Database", "Responsive UI"],
    highlights: [
      "Solo full-stack delivery from concept to production",
      "Built vehicle comparison workflows for complex technical data",
      "Managed frontend, backend, data handling, and launch work",
      "Delivered under a tight three-month timeline",
    ],
    caseStudyUrl: "/case-studies/leanera",
    visual: {
      initials: "EV",
      accent: "#14b8a6",
      soft: "#ccfbf1",
      metricA: "<3 mo",
      metricB: "Solo",
      metricC: "Full-stack",
    },
    projectType: "work",
    featuredWork: true,
  },
  {
    id: "user-management-app",
    title: "User Management App",
    category: "Full-Stack Admin Dashboard",
    shortDescription:
      "Full-stack user administration dashboard with FastAPI, Vue 3, CRUD workflows, search, sorting, pagination, validation, and Docker support.",
    longDescription:
      "A practical admin dashboard focused on efficient user management workflows. It includes real-time CRUD-style interactions, smart username generation, debounced global search, sorting, pagination, inline validation, reusable Vue components, and a FastAPI backend.",
    technologies: ["Vue 3", "FastAPI", "Python", "JavaScript", "Docker", "Docker Compose", "REST API"],
    tags: ["Vue 3", "FastAPI", "Python", "REST API", "Docker", "Admin Dashboard"],
    highlights: [
      "Full-stack frontend/backend structure",
      "User CRUD operations with validation and data integrity rules",
      "Debounced global search, pagination, and sorting",
      "Docker-based setup with reusable Vue component architecture",
    ],
    githubUrl: "https://github.com/igalVilensky/user-management-app",
    visual: {
      initials: "UA",
      accent: "#8b5cf6",
      soft: "#ede9fe",
      metricA: "CRUD",
      metricB: "FastAPI",
      metricC: "Docker",
    },
    projectType: "work",
    featuredWork: true,
  },
  {
    id: "leanera-digital-transition",
    title: "LeanERA: Digital Transition",
    category: "Web Application Engineering / Professional Case Study",
    shortDescription:
      "Modern Vue/Nuxt applications and product-focused architecture work supporting a startup's digital transition.",
    longDescription:
      "A professional case study focused on scalable codebases, cross-functional technology choices, Vue 3/Nuxt 3 delivery, and maintainable product foundations.",
    technologies: ["Vue 3", "Nuxt 3", "TypeScript", "Tailwind CSS", "Agile"],
    tags: ["Vue 3", "Nuxt 3", "TypeScript", "Tailwind", "Product Engineering"],
    highlights: [
      "Established clean, scalable frontend architecture",
      "Supported transition from service work toward product systems",
      "Collaborated with teams on technology choices and delivery patterns",
    ],
    caseStudyUrl: "/case-studies/cashdo",
    visual: {
      initials: "LE",
      accent: "#f43f5e",
      soft: "#ffe4e6",
      metricA: "Vue 3",
      metricB: "Nuxt",
      metricC: "TS",
    },
    projectType: "work",
  },
  {
    id: "mindq-lab",
    title: "MindQ Lab",
    category: "Personal Product / Learning Experience",
    shortDescription:
      "A psychology and personal-growth platform blending structured learning, daily progress, and reflective product UX.",
    longDescription:
      "MindQ Lab turns a personal learning concept into a polished Nuxt product experience with Firebase-backed flows, structured content, progress mechanics, and a calm interface for reflection.",
    technologies: ["Nuxt", "TypeScript", "Firebase", "Tailwind CSS"],
    tags: ["Nuxt", "TypeScript", "Firebase", "Product UX", "Personal Growth"],
    highlights: [
      "Progress-oriented product experience",
      "Firebase-backed state and user flows",
      "Content-driven interface with a strong visual identity",
    ],
    liveUrl: "https://www.mindqlab.com/",
    githubUrl: "https://github.com/igalvilensky/psy-blog",
    image: "/mindQlab.jpeg",
    visual: {
      initials: "MQ",
      accent: "#ec4899",
      soft: "#fce7f3",
      metricA: "Nuxt",
      metricB: "Growth",
      metricC: "UX",
    },
    projectType: "work",
  },
  {
    id: "security-playground",
    title: "Security Playground",
    category: "Developer Education / Web Security Lab",
    shortDescription:
      "Interactive demos of common web security issues and safer implementation patterns.",
    longDescription:
      "A hands-on lab for learning about XSS, LocalStorage misuse, SQL injection simulations, and practical secure interface thinking.",
    technologies: ["Nuxt", "Vue 3", "Web Security", "OWASP"],
    tags: ["Nuxt", "Vue 3", "Security", "Developer Education"],
    highlights: [
      "Interactive vulnerability simulations",
      "Educational remediation patterns",
      "Built as part of the portfolio lab environment",
    ],
    caseStudyUrl: "/case-studies/security",
    image: "/security.jpeg",
    visual: {
      initials: "SP",
      accent: "#ef4444",
      soft: "#fee2e2",
      metricA: "OWASP",
      metricB: "XSS",
      metricC: "A11y",
    },
    projectType: "experiment",
  },
  {
    id: "page-scope",
    title: "PageScope",
    category: "Browser Extension / Developer Utility",
    shortDescription:
      "Chrome extension that analyzes websites locally and returns summaries, metadata, and technology hints.",
    longDescription:
      "PageScope explores local-first browser tooling for quick website insight without sending page content away from the user's browser.",
    technologies: ["Chrome Extensions", "JavaScript", "Manifest V3", "HTML", "CSS"],
    tags: ["Chrome Extension", "JavaScript", "Manifest V3", "Developer Tool"],
    highlights: [
      "Local browser-side analysis",
      "Website summaries and metadata extraction",
      "Manifest V3 extension workflow",
    ],
    liveUrl: "https://github.com/igalVilensky/pagescope",
    githubUrl: "https://github.com/igalVilensky/pagescope",
    image: "/pagescope.jpeg",
    visual: {
      initials: "PS",
      accent: "#06b6d4",
      soft: "#cffafe",
      metricA: "MV3",
      metricB: "Local",
      metricC: "Tool",
    },
    projectType: "experiment",
  },
  {
    id: "i18n-lint-cli",
    title: "i18n Linter CLI",
    category: "CLI Tool / Developer Workflow",
    shortDescription:
      "CLI utility for checking translation files for missing keys, extra keys, and placeholder mismatches.",
    longDescription:
      "A focused developer utility that helps multilingual projects keep locale files aligned and reduce release-time translation mistakes.",
    technologies: ["Node.js", "TypeScript", "CLI", "npm"],
    tags: ["Node.js", "TypeScript", "CLI", "npm", "Developer Tool"],
    highlights: [
      "Compares locale files against a base language",
      "Finds missing and extra translation keys",
      "Checks placeholder consistency",
    ],
    liveUrl: "https://www.npmjs.com/package/i18n-lint-cli",
    githubUrl: "https://github.com/igalVilensky/i18n-lint-cli",
    image: "/i18-lint-cli.jpeg",
    visual: {
      initials: "i18n",
      accent: "#64748b",
      soft: "#e2e8f0",
      metricA: "CLI",
      metricB: "npm",
      metricC: "QA",
    },
    projectType: "experiment",
  },
  {
    id: "family-space",
    title: "Family Space",
    category: "Personal Productivity / Firebase App",
    shortDescription:
      "Family organization app with shared calendars, task management, messaging, and Firebase-backed collaboration.",
    longDescription:
      "A practical personal productivity app exploring shared household coordination, family workflows, and realtime-feeling collaboration patterns.",
    technologies: ["Nuxt", "Vue 3", "TypeScript", "Tailwind CSS", "Firebase"],
    tags: ["Nuxt", "Vue", "TypeScript", "Firebase", "Productivity"],
    highlights: [
      "Shared calendar and task coordination patterns",
      "Firebase-backed collaboration",
      "Responsive family-focused interface",
    ],
    liveUrl: "https://my-nest.netlify.app/",
    githubUrl: "https://github.com/igalVilensky/family-app",
    image: "/family-space.jpeg",
    visual: {
      initials: "FS",
      accent: "#84cc16",
      soft: "#ecfccb",
      metricA: "Tasks",
      metricB: "Firebase",
      metricC: "Family",
    },
    projectType: "experiment",
  },
  {
    id: "sunlit-tales",
    title: "Sunlit Tales",
    category: "Content Platform / Creative Web",
    shortDescription:
      "Poetry and creative content platform built with Nuxt, Node.js, Sanity, MongoDB, and Tailwind.",
    longDescription:
      "A creative publishing project exploring content architecture, quiet reading interfaces, and full-stack web delivery.",
    technologies: ["Node.js", "Nuxt", "Tailwind CSS", "Sanity", "MongoDB"],
    tags: ["Nuxt", "Node.js", "Sanity", "MongoDB", "Creative Web"],
    highlights: [
      "Headless content workflow",
      "Reading-focused UI",
      "Full-stack publishing architecture",
    ],
    liveUrl: "https://sunlit-tales.netlify.app/",
    githubUrl: "https://github.com/igalvilensky/sunlit-tales",
    image: "/sunlit.jpeg",
    visual: {
      initials: "ST",
      accent: "#f97316",
      soft: "#ffedd5",
      metricA: "CMS",
      metricB: "Nuxt",
      metricC: "Poetry",
    },
    projectType: "experiment",
  },
];

export const useProjects = () => {
  const workProjects = portfolioProjects.filter((project) => project.projectType === "work");
  const experimentProjects = portfolioProjects.filter((project) => project.projectType === "experiment");
  const homeFeaturedProjects = portfolioProjects.filter((project) => project.featuredHome);
  const featuredWorkProjects = portfolioProjects.filter((project) => project.featuredWork);

  return {
    projects: portfolioProjects,
    workProjects,
    experimentProjects,
    homeFeaturedProjects,
    featuredWorkProjects,
    currentFocus,
    skillGroups,
  };
};
