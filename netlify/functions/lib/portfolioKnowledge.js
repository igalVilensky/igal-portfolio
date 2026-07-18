// Generated from content/*.json so Netlify bundles portfolioAgent knowledge with the function.
// Update this file when the source content JSON changes.

export const profileData = {
  "identity": {
    "name": "Igal Vilensky",
    "profession": "Full-Stack Software Developer",
    "location": {
      "city": "Leipzig",
      "country": "Germany"
    },
    "based_in": "Leipzig, Germany"
  },
  "headline": "Full-stack software developer building SaaS products and practical AI-assisted workflows.",
  "summary": "Igal Vilensky is a full-stack software developer based in Leipzig, Germany. He builds SaaS products, frontend interfaces, API-connected workflows, and practical AI-assisted tools using TypeScript, Vue/Nuxt, React/Next, Node.js, Python/FastAPI, APIs, and automation platforms.",
  "cv_summary": "Full-Stack Developer with 3+ years of experience in SaaS and web projects. Works with TypeScript, Vue.js/Nuxt.js, React.js, Node.js, and headless CMS to build user-friendly, scalable apps using Agile and test-driven methods.",
  "experience_level": {
    "label": "3+ years",
    "note": "The 3+ years claim appears in the existing CV and locale hero copy."
  },
  "current_focus": [
    "AI agents",
    "automations",
    "practical AI-assisted product workflows",
    "automation-ready web applications"
  ],
  "current_course": {
    "program": "AI Agents & Automations",
    "institution": "WBS CODING SCHOOL",
    "timeframe": "2026 - Present",
    "status": "current",
    "note": "Timeframe provided by the user during the content accuracy correction pass."
  },
  "target_roles": [
    "Full-Stack Software Developer",
    "Frontend Developer",
    "Vue.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Software Developer",
    "AI Software Developer",
    "AI Automation Developer",
    "AI Workflow Developer",
    "SaaS Developer",
    "API Integration Developer"
  ],
  "core_technologies": [
    "TypeScript",
    "JavaScript",
    "Vue",
    "Nuxt",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "Python",
    "FastAPI",
    "REST APIs",
    "Tailwind CSS",
    "Directus",
    "MongoDB",
    "PostgreSQL",
    "Prisma",
    "Firebase"
  ],
  "ai_automation_technologies": [
    "LLM APIs",
    "Groq API",
    "prompt engineering",
    "AI agents",
    "n8n",
    "Make",
    "APIs",
    "webhooks",
    "AI-assisted workflows",
    "AI safety"
  ],
  "languages": [
    {
      "language": "Hebrew",
      "level": "Native",
      "note": "Listed as native in the strategy and Codex docs."
    },
    {
      "language": "Russian",
      "level": "Native",
      "note": "Listed as native in the CV and portfolio locale data."
    },
    {
      "language": "English",
      "level": "C1",
      "note": "Listed as C1 in the CV and portfolio locale data."
    },
    {
      "language": "German",
      "level": "B2",
      "note": "Listed as B2 in the CV and portfolio locale data."
    }
  ],
  "links": {
    "email": "vilenskyigal@gmail.com",
    "phone": "+49 1783099433",
    "github": "https://github.com/igalVilensky",
    "linkedin": "https://www.linkedin.com/in/igalvilensky/",
    "portfolio": "https://igalvilensky.netlify.app/",
    "cv": "/Igal_Vilensky.pdf",
    "certificate": "/certificate.pdf"
  },
  "availability": {
    "summary": "Open to full-stack, frontend, SaaS, and AI automation-related software developer roles in Germany, Leipzig, hybrid, or remote EU contexts.",
    "source_note": "Derived from the positioning and contact docs."
  },
  "source_notes": [
    "Profile facts come from the CV PDF, README, current portfolio copy, project docs, and positioning documentation.",
    "No private or external profile data was added."
  ]
};

export const projectsData = {
  "projects": [
    {
      "id": "flowforge",
      "title": "FlowForge",
      "category": "AI Automation Compiler / Multi-Agent Safety Tool",
      "priority": "featured",
      "short_description": "Multi-agent tool that turns plain-language automation ideas into safe, human-reviewable workflow blueprints and importable n8n JSON drafts.",
      "long_description": "FlowForge is a non-executing safety and observability layer for AI automation prototypes. It guides users through vague requirements, routes requests through a multi-agent compiler, generates structured workflow blueprints, exposes safety decisions and agent traces, and can produce inactive n8n JSON drafts for human review.",
      "role": "Product creator and full-stack developer responsible for the product concept, frontend experience, server-side compiler pipeline, agent orchestration, safety boundaries, and n8n draft generation.",
      "technologies": [
        "Nuxt 4",
        "Vue 3",
        "TypeScript",
        "Nuxt Server Routes",
        "Zod",
        "Groq API",
        "Gemini",
        "n8n",
        "AI Agents"
      ],
      "highlights": [
        "Multi-agent compiler with guided clarification, routing, blueprint generation, and safety review.",
        "Produces structured, non-executing automation blueprints with human approval gates and blocked actions.",
        "Provides agent trace, provider fallback, risk, safety, and run observability information.",
        "Generates inactive n8n JSON drafts with placeholder credentials and validation against unsafe side effects."
      ],
      "outcome_or_proof": [
        "Working application and public GitHub repository are available.",
        "Generated n8n drafts can be copied, downloaded, and imported for further human review.",
        "No production actions are executed by the application."
      ],
      "role_relevance": [
        "Full-Stack Software Developer",
        "AI Software Developer",
        "AI Automation Developer",
        "AI Agent Developer",
        "Vue.js Developer",
        "TypeScript Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": "https://flowforge-igal.netlify.app/",
        "github": "https://github.com/igalVilensky/flowforge",
        "case_study": null
      },
      "source_notes": [
        "Derived from the FlowForge repository and README."
      ]
    },
    {
      "id": "flowplace-role-compass",
      "title": "Flowplace: Role Compass",
      "category": "SaaS Product Engineering / Professional Case Study",
      "priority": "featured",
      "short_description": "Talent profile feature for a SaaS platform, built with Vue/Nuxt and Directus and adopted by 5,000+ users in the first month.",
      "long_description": "A professional SaaS case study focused on end-to-end product engineering, responsive UI workflows, API integration, feature delivery, and sustainable frontend architecture in a high-velocity Agile team.",
      "role": "Software developer working on end-to-end product engineering for a core talent profile feature.",
      "technologies": [
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "Directus",
        "REST APIs",
        "CI/CD"
      ],
      "highlights": [
        "Reached 5,000+ users in the first month.",
        "Led end-to-end development of a core talent profile feature.",
        "Improved usability, accessibility, and consistency across product workflows.",
        "Worked inside Agile delivery with production release discipline."
      ],
      "outcome_or_proof": [
        "5,000+ users in the first month.",
        "Professional SaaS feature in production context."
      ],
      "role_relevance": [
        "Full-Stack Software Developer",
        "Frontend Developer",
        "Vue.js Developer",
        "TypeScript Developer",
        "SaaS Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": null,
        "github": null,
        "case_study": "/case-studies/flowplace"
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts, docs, and the Flowplace case study page."
      ]
    },
    {
      "id": "openme",
      "title": "OpenMe",
      "category": "SaaS MVP / AI-Assisted Platform / Full-Stack Product",
      "priority": "featured",
      "short_description": "Actionable bio/profile platform where people define what others can do with them through public endpoints such as collaboration, questions, feedback, and ideas.",
      "long_description": "OpenMe rethinks the personal link-in-bio page as an interaction menu. Instead of only listing links, a profile exposes clear public endpoints like collaborate, ask me, feedback, and offer help. The MVP includes profile links, custom endpoints, boundaries, inbox flows, and AI-assisted submission summaries.",
      "role": "Builder and full-stack developer for a SaaS MVP with AI-assisted workflow features.",
      "technologies": [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "Python",
        "FastAPI",
        "Docker Compose",
        "Vercel",
        "Render",
        "Neon"
      ],
      "highlights": [
        "Full-stack monorepo architecture with pnpm workspaces and Turbo.",
        "Public profile and endpoint system with authenticated owner flows.",
        "Dashboard and inbox workflow with AI-assisted summaries for incoming submissions.",
        "Production deployment across Vercel, Render, and Neon."
      ],
      "outcome_or_proof": [
        "Live deployment exists.",
        "GitHub repository is available.",
        "No user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "Full-Stack Software Developer",
        "React Developer",
        "TypeScript Developer",
        "AI Software Developer",
        "SaaS Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": "https://openme-web.vercel.app/",
        "github": "https://github.com/igalVilensky/openme",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts and docs."
      ]
    },
    {
      "id": "decision-matrix-ai",
      "title": "Decision Matrix AI",
      "category": "AI Product Tool / Decision Support / Full-Stack App",
      "priority": "featured",
      "short_description": "AI-assisted decision matrix app for comparing complex choices using weighted criteria, scores, explainable recommendations, and action checklists.",
      "long_description": "Decision Matrix AI helps users turn vague decisions into structured comparisons. It supports weighted criteria, must-have requirements, editable scores, ranked results, category breakdowns, AI-generated suggestions, recommendation summaries, and practical next-step checklists.",
      "role": "Builder and full-stack developer for an AI-assisted decision-support product tool.",
      "technologies": [
        "React",
        "Vite",
        "TypeScript",
        "Tailwind CSS",
        "Netlify Functions",
        "Groq API",
        "Firebase Anonymous Auth",
        "Firestore",
        "Zod"
      ],
      "highlights": [
        "AI-generated criteria, options, scores, review, recommendations, and action checklists.",
        "User-specific cloud persistence with Firebase and Firestore.",
        "Import/export JSON backups for decision data.",
        "Serverless AI calls through Netlify Functions with Zod validation."
      ],
      "outcome_or_proof": [
        "Live deployment exists.",
        "GitHub repository is available.",
        "No user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "React Developer",
        "TypeScript Developer",
        "AI Software Developer",
        "AI Workflow Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": "https://decision-matrix-ai.netlify.app/",
        "github": "https://github.com/igalVilensky/decision-matrix-ai",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts and docs."
      ]
    },
    {
      "id": "ari-motors-ev-portal",
      "title": "ARI Motors: EV Portal",
      "category": "Full-Stack Web Platform / Professional Case Study",
      "priority": "featured",
      "short_description": "Electric vehicle comparison portal built from scratch to production in under three months as a solo full-stack developer.",
      "long_description": "A professional case study covering frontend interface work, backend systems, database architecture, responsive design, and a fast production launch for an electric commercial vehicle comparison portal.",
      "role": "Solo full-stack developer responsible for frontend, backend, database, data handling, and launch work.",
      "technologies": [
        "JavaScript",
        "Full-Stack",
        "Database",
        "Responsive Design",
        "REST APIs"
      ],
      "highlights": [
        "Solo full-stack delivery from concept to production.",
        "Built vehicle comparison workflows for complex technical data.",
        "Managed frontend, backend, data handling, and launch work.",
        "Delivered under a tight three-month timeline."
      ],
      "outcome_or_proof": [
        "Launched from concept to production in under three months.",
        "Case study page states the platform launched successfully within the deadline."
      ],
      "role_relevance": [
        "Full-Stack Software Developer",
        "Frontend Developer",
        "Software Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": null,
        "github": null,
        "case_study": "/case-studies/leanera"
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts, CV, and the ARI Motors case study page.",
        "The current route file is leanera.vue, but its page content is ARI Motors: EV Comparison Portal."
      ]
    },
    {
      "id": "ai-compliance-compass",
      "title": "AI Compliance Compass",
      "category": "Responsible AI Tool / Practical Compliance UX",
      "priority": "secondary",
      "short_description": "Educational AI use-case checker that turns plain-language descriptions into practical EU/Germany compliance prompts and next steps.",
      "long_description": "AI Compliance Compass is a practical portfolio tool for exploring AI compliance, safety, and responsible use patterns in a German/EU context. It avoids legal certainty and focuses on educational classification, clarification questions, and next-step checklists.",
      "role": "Builder of a responsible-AI product workflow inside the portfolio.",
      "technologies": [
        "Nuxt",
        "Vue 3",
        "TypeScript",
        "Netlify Functions",
        "Groq API",
        "Tailwind CSS"
      ],
      "highlights": [
        "Plain-language AI use-case intake.",
        "Clarification flow for missing context.",
        "Educational risk, GDPR, copyright, and transparency checks.",
        "Built-in disclaimers to avoid legal overclaiming."
      ],
      "outcome_or_proof": [
        "Implemented as a live route in the portfolio.",
        "No external user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "AI Software Developer",
        "AI Workflow Developer",
        "TypeScript Developer",
        "Frontend Developer"
      ],
      "links": {
        "live": "/ai-compliance-compass",
        "github": "https://github.com/igalVilensky/igal-portfolio",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts and app/pages/ai-compliance-compass.vue."
      ]
    },
    {
      "id": "user-management-app",
      "title": "User Management App",
      "category": "Full-Stack Admin Dashboard",
      "priority": "secondary",
      "short_description": "Full-stack user administration dashboard with FastAPI, Vue 3, CRUD workflows, search, sorting, pagination, validation, and Docker support.",
      "long_description": "A practical admin dashboard focused on efficient user management workflows. It includes real-time CRUD-style interactions, smart username generation, debounced global search, sorting, pagination, inline validation, reusable Vue components, and a FastAPI backend.",
      "role": "Builder and full-stack developer.",
      "technologies": [
        "Vue 3",
        "FastAPI",
        "Python",
        "JavaScript",
        "Docker",
        "Docker Compose",
        "REST API"
      ],
      "highlights": [
        "Full-stack frontend/backend structure.",
        "User CRUD operations with validation and data integrity rules.",
        "Debounced global search, pagination, and sorting.",
        "Docker-based setup with reusable Vue component architecture."
      ],
      "outcome_or_proof": [
        "GitHub repository is available.",
        "No live URL or user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "Full-Stack Software Developer",
        "Vue.js Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": null,
        "github": "https://github.com/igalVilensky/user-management-app",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts."
      ]
    },
    {
      "id": "leanera-digital-transition",
      "title": "LeanERA: Digital Transition",
      "category": "Web Application Engineering / Professional Case Study",
      "priority": "secondary",
      "short_description": "Modern Vue/Nuxt applications and product-focused architecture work supporting a startup's digital transition.",
      "long_description": "A professional case study focused on scalable codebases, cross-functional technology choices, Vue 3/Nuxt 3 delivery, and maintainable product foundations.",
      "role": "Software developer contributing modern frontend architecture and cross-functional technology choices.",
      "technologies": [
        "Vue 3",
        "Nuxt 3",
        "TypeScript",
        "Tailwind CSS",
        "Agile"
      ],
      "highlights": [
        "Established clean, scalable frontend architecture.",
        "Supported transition from service work toward product systems.",
        "Collaborated with teams on technology choices and delivery patterns."
      ],
      "outcome_or_proof": [
        "Professional role documented in CV.",
        "No public product metric is present in the repository."
      ],
      "role_relevance": [
        "Frontend Developer",
        "Vue.js Developer",
        "TypeScript Developer",
        "Software Developer"
      ],
      "links": {
        "live": null,
        "github": null,
        "case_study": "/case-studies/cashdo"
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts, CV, and the LeanERA case study page.",
        "The current route file is cashdo.vue, but its page content is LeanERA: Digital Transition."
      ]
    },
    {
      "id": "mindq-lab",
      "title": "MindQ Lab",
      "category": "Personal Product / Learning Experience",
      "priority": "lab",
      "short_description": "A psychology and personal-growth platform blending structured learning, daily progress, and reflective product UX.",
      "long_description": "MindQ Lab turns a personal learning concept into a polished Nuxt product experience with Firebase-backed flows, structured content, progress mechanics, and a calm interface for reflection.",
      "role": "Builder of a personal product and learning experience.",
      "technologies": [
        "Nuxt",
        "TypeScript",
        "Firebase",
        "Tailwind CSS"
      ],
      "highlights": [
        "Progress-oriented product experience.",
        "Firebase-backed state and user flows.",
        "Content-driven interface with a strong visual identity."
      ],
      "outcome_or_proof": [
        "Live deployment exists.",
        "GitHub repository is available.",
        "No user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "Frontend Developer",
        "Vue.js Developer",
        "TypeScript Developer"
      ],
      "links": {
        "live": "https://www.mindqlab.com/",
        "github": "https://github.com/igalvilensky/psy-blog",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts and locale project copy."
      ]
    },
    {
      "id": "security-playground",
      "title": "Security Playground",
      "category": "Developer Education / Web Security Lab",
      "priority": "lab",
      "short_description": "Interactive demos of common web security issues and safer implementation patterns.",
      "long_description": "A hands-on lab for learning about XSS, LocalStorage misuse, SQL injection simulations, and practical secure interface thinking.",
      "role": "Builder of interactive developer education demos.",
      "technologies": [
        "Nuxt",
        "Vue 3",
        "Web Security",
        "OWASP"
      ],
      "highlights": [
        "Interactive vulnerability simulations.",
        "Educational remediation patterns.",
        "Built as part of the portfolio lab environment."
      ],
      "outcome_or_proof": [
        "Case study route exists in the portfolio.",
        "No external user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "Frontend Developer",
        "Software Developer",
        "TypeScript Developer"
      ],
      "links": {
        "live": null,
        "github": null,
        "case_study": "/case-studies/security"
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts and app/pages/case-studies/security.vue."
      ]
    },
    {
      "id": "page-scope",
      "title": "PageScope",
      "category": "Browser Extension / Developer Utility",
      "priority": "lab",
      "short_description": "Chrome extension that analyzes websites locally and returns summaries, metadata, and technology hints.",
      "long_description": "PageScope explores local-first browser tooling for quick website insight without sending page content away from the user's browser.",
      "role": "Builder of a local-first browser extension utility.",
      "technologies": [
        "Chrome Extensions",
        "JavaScript",
        "Manifest V3",
        "HTML",
        "CSS"
      ],
      "highlights": [
        "Local browser-side analysis.",
        "Website summaries and metadata extraction.",
        "Manifest V3 extension workflow."
      ],
      "outcome_or_proof": [
        "GitHub repository is available.",
        "No user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "Frontend Developer",
        "Software Developer"
      ],
      "links": {
        "live": "https://github.com/igalVilensky/pagescope",
        "github": "https://github.com/igalVilensky/pagescope",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts."
      ]
    },
    {
      "id": "i18n-lint-cli",
      "title": "i18n Linter CLI",
      "category": "CLI Tool / Developer Workflow",
      "priority": "lab",
      "short_description": "CLI utility for checking translation files for missing keys, extra keys, and placeholder mismatches.",
      "long_description": "A focused developer utility that helps multilingual projects keep locale files aligned and reduce release-time translation mistakes.",
      "role": "Builder of a developer workflow CLI.",
      "technologies": [
        "Node.js",
        "TypeScript",
        "CLI",
        "npm"
      ],
      "highlights": [
        "Compares locale files against a base language.",
        "Finds missing and extra translation keys.",
        "Checks placeholder consistency."
      ],
      "outcome_or_proof": [
        "npm package URL is present in the repository.",
        "GitHub repository is available."
      ],
      "role_relevance": [
        "TypeScript Developer",
        "Software Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": "https://www.npmjs.com/package/i18n-lint-cli",
        "github": "https://github.com/igalVilensky/i18n-lint-cli",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts."
      ]
    },
    {
      "id": "family-space",
      "title": "Family Space",
      "category": "Personal Productivity / Firebase App",
      "priority": "lab",
      "short_description": "Family organization app with shared calendars, task management, messaging, and Firebase-backed collaboration.",
      "long_description": "A practical personal productivity app exploring shared household coordination, family workflows, and realtime-feeling collaboration patterns.",
      "role": "Builder of a personal productivity application.",
      "technologies": [
        "Nuxt",
        "Vue 3",
        "TypeScript",
        "Tailwind CSS",
        "Firebase"
      ],
      "highlights": [
        "Shared calendar and task coordination patterns.",
        "Firebase-backed collaboration.",
        "Responsive family-focused interface."
      ],
      "outcome_or_proof": [
        "Live deployment exists.",
        "GitHub repository is available.",
        "No user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "Frontend Developer",
        "Vue.js Developer",
        "TypeScript Developer"
      ],
      "links": {
        "live": "https://my-nest.netlify.app/",
        "github": "https://github.com/igalVilensky/family-app",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts."
      ]
    },
    {
      "id": "sunlit-tales",
      "title": "Sunlit Tales / Poetry Mood Game",
      "category": "Content Platform / Creative Web",
      "priority": "lab",
      "short_description": "Poetry/content platform with an AI mood/game feature that creates Russian-language literary quiz rounds from existing poem text.",
      "long_description": "A creative publishing project exploring content architecture, quiet reading interfaces, and full-stack web delivery.",
      "role": "Builder of a creative content platform.",
      "technologies": [
        "Nuxt",
        "Vue",
        "Tailwind CSS",
        "Sanity",
        "Axios",
        "Node.js",
        "Express",
        "MongoDB",
        "Netlify Functions",
        "Groq API"
      ],
      "highlights": [
        "Headless content workflow.",
        "Reading-focused UI.",
        "Full-stack publishing architecture."
      ],
      "outcome_or_proof": [
        "Live deployment exists.",
        "GitHub repository is available.",
        "No user/adoption metric is present in the repository."
      ],
      "role_relevance": [
        "Full-Stack Software Developer",
        "Frontend Developer",
        "Vue.js Developer"
      ],
      "links": {
        "live": "https://sunlit-tales.netlify.app/",
        "github": "https://github.com/igalVilensky/poetry",
        "case_study": null
      },
      "source_notes": [
        "Derived from app/composables/useProjects.ts and locale project copy."
      ]
    },
    {
      "id": "job-command-center",
      "title": "Job Command Center",
      "category": "AI automation / job workflow command center",
      "priority": "secondary",
      "short_description": "Self-hosted, budget-aware job search command center that triages job opportunities, extracts useful information, reviews fit against a candidate profile, and keeps AI advisory with human approval.",
      "long_description": "Self-hosted, budget-aware job search command center that triages job opportunities, extracts useful information, reviews fit against a candidate profile, and keeps AI advisory with human approval.",
      "role": "Builder and full-stack developer.",
      "technologies": [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind",
        "shadcn/ui",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Prisma",
        "Python",
        "FastAPI",
        "Pydantic",
        "httpx",
        "Docker Compose",
        "pnpm workspaces",
        "Turbo",
        "mock AI",
        "Groq provider",
        "optional Gmail import / Gmail OAuth"
      ],
      "highlights": [
        "AI extraction",
        "AI review",
        "budget-aware processing",
        "rule-based prefiltering",
        "human approval before applying/contacting employers",
        "command queue grouped by next action"
      ],
      "outcome_or_proof": [
        "GitHub repository is available.",
        "Self-hosted application."
      ],
      "role_relevance": [
        "Full-Stack Software Developer",
        "AI Software Developer",
        "API Integration Developer"
      ],
      "links": {
        "live": null,
        "github": "https://github.com/igalVilensky/job-command-center",
        "case_study": null
      },
      "source_notes": [
        "Derived from project documentation."
      ]
    }
  ],
  "featured_project_order": [
    "flowforge",
    "flowplace-role-compass",
    "openme",
    "decision-matrix-ai",
    "ari-motors-ev-portal"
  ],
  "source_notes": [
    "Project data is based on app/composables/useProjects.ts, existing case-study pages, locale copy, README links, and positioning docs.",
    "Secondary and lab projects are included only when they already appear in the repository."
  ]
};

export const experienceData = {
  "entries": [
    {
      "id": "flowplace",
      "organization": "Flowplace",
      "title": "Software Developer",
      "timeframe": "2023 - 2025",
      "location": "Leipzig",
      "type": "work",
      "summary": "Developed SaaS features with Vue.js/Nuxt.js and Directus, implemented responsive UI designs, improved usability and accessibility, and integrated REST APIs.",
      "highlights": [
        "Developed SaaS features with Vue.js/Nuxt.js and Directus.",
        "Implemented responsive UI designs.",
        "Improved usability, accessibility, and consistency of the platform.",
        "Integrated REST APIs and optimized UI workflows.",
        "Worked on the Role Compass talent profile feature, which reached 5,000+ users in the first month."
      ],
      "technologies": [
        "Vue.js",
        "Nuxt.js",
        "TypeScript",
        "Directus",
        "REST APIs",
        "CI/CD"
      ],
      "source_notes": [
        "Role and timeframe were corrected from user-provided information during the content accuracy pass.",
        "Role Compass outcome comes from the project docs and existing case study page."
      ]
    },
    {
      "id": "leanera",
      "organization": "LeanERA GmbH",
      "title": "Software Developer",
      "timeframe": "2022 - 2023",
      "location": "Leipzig",
      "type": "work",
      "summary": "Built dynamic and responsive web applications and supported LeanERA's transition toward product-focused systems.",
      "highlights": [
        "Developed dynamic and responsive web applications using JavaScript, Vue 3, Nuxt 3, TypeScript, Tailwind CSS, and Ionic.",
        "Collaborated with cross-functional teams to evaluate and select technologies.",
        "Established a clean, scalable codebase to support LeanERA's transition to a product-focused company."
      ],
      "technologies": [
        "JavaScript",
        "Vue 3",
        "Nuxt 3",
        "TypeScript",
        "Tailwind CSS",
        "Ionic",
        "Agile"
      ],
      "source_notes": [
        "Details come from the CV, locale files, and the LeanERA case study page."
      ]
    },
    {
      "id": "ari-motors",
      "organization": "ARI Motors GmbH",
      "title": "Full Stack Web Developer",
      "timeframe": "2021 - 2022",
      "location": "Leipzig",
      "type": "work",
      "summary": "Developed user interfaces for an electric commercial vehicle comparison portal and maintained backend systems and databases.",
      "highlights": [
        "Developed and implemented user interfaces for a new comparison portal for electric commercial vehicles and other websites.",
        "Enhanced user functionality and experience.",
        "Managed website administration, backend system maintenance, and database operations.",
        "Delivered the EV comparison portal from concept to production in under three months as the sole developer."
      ],
      "technologies": [
        "JavaScript",
        "Responsive CSS",
        "Backend API",
        "Database management",
        "REST APIs"
      ],
      "source_notes": [
        "Role, timeframe, and responsibilities come from the CV and locale files.",
        "Solo delivery and under-three-month launch come from the ARI Motors case study page."
      ]
    },
    {
      "id": "myfxbook-cashdo",
      "organization": "Myfxbook Ltd / Cashdo",
      "title": "Digital Product & Web Coordinator",
      "timeframe": "2017 - 2019",
      "location": "Ashqelon",
      "type": "work",
      "summary": "Coordinated website and digital product operations, supported feature development coordination, and worked with white-label partner integrations.",
      "highlights": [
        "Managed company website operations and digital product updates.",
        "Coordinated feature development needs between product, web, and partner-facing workflows.",
        "Supported white-label partner integrations.",
        "Conducted market research and affiliate marketing campaigns.",
        "Maintained social media channels as a supporting responsibility."
      ],
      "technologies": [
        "Website administration",
        "Product operations",
        "White-label partner integrations",
        "Feature development coordination",
        "Affiliate marketing"
      ],
      "source_notes": [
        "Title and product-operations framing were corrected from user-provided information during the content accuracy pass.",
        "Market research, affiliate marketing, website administration, and social media support appear in the CV and locale files."
      ]
    },
    {
      "id": "wbs-ai-agents-automations",
      "organization": "WBS CODING SCHOOL",
      "title": "AI Agents & Automations course",
      "timeframe": "2026 - Present",
      "location": "Online",
      "type": "education",
      "summary": "Current course focused on strengthening software development experience with AI agents, automations, LLM workflows, prompt engineering, APIs, webhooks, and AI safety.",
      "highlights": [
        "Learning LLM workflows and prompt engineering.",
        "Learning AI agents and automation workflows.",
        "Working with n8n, Make, APIs, and webhooks.",
        "Connecting Python automations and AI safety to existing full-stack development experience."
      ],
      "technologies": [
        "LLM APIs",
        "prompt engineering",
        "AI agents",
        "n8n",
        "Make",
        "Python automations",
        "APIs",
        "webhooks",
        "AI safety"
      ],
      "source_notes": [
        "Timeframe and location were corrected from user-provided information during the content accuracy pass."
      ]
    },
    {
      "id": "dci-web-software-development",
      "organization": "Digital Career Institute (DCI)",
      "title": "Web- und Softwareentwickler/in",
      "timeframe": "07.12.2020 - 01.02.2022",
      "location": "Leipzig / Remote Learning",
      "type": "education",
      "summary": "Completed comprehensive web and software development training covering frontend, backend, databases, authentication, REST APIs, Git/GitHub workflow, agile methodologies, and job-related German.",
      "highlights": [
        "Completed web and software developer training in remote learning.",
        "Covered HTML, CSS, modern JavaScript, responsive web design, React, Redux, Node.js, Express.js, MongoDB, Mongoose, JWT, REST APIs, GitHub team workflow, and agile methodologies.",
        "Completed final project Plantastic.",
        "Enhanced job-related German language skills at B2.2 level."
      ],
      "technologies": [
        "HTML",
        "CSS",
        "JavaScript ES2015+",
        "React",
        "React Hooks",
        "Redux",
        "Context API",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT",
        "REST APIs",
        "Git",
        "GitHub",
        "Agile methodologies"
      ],
      "source_notes": [
        "Dates and curriculum come from public/certificate.pdf.",
        "Institution location appears as Leipzig in the app locale data."
      ]
    }
  ]
};

export const skillsData = {
  "groups": [
    {
      "id": "frontend",
      "title": "Frontend",
      "summary": "Interfaces that are fast, responsive, and built around real user workflows.",
      "skills": [
        "TypeScript",
        "JavaScript",
        "Vue",
        "Vue 3",
        "Nuxt",
        "Nuxt 3",
        "React",
        "Next.js",
        "React Native",
        "Ionic",
        "Tailwind CSS",
        "Bootstrap",
        "SCSS",
        "HTML5",
        "CSS3",
        "Responsive Design"
      ]
    },
    {
      "id": "backend",
      "title": "Backend",
      "summary": "APIs, data models, auth flows, and production-minded service boundaries.",
      "skills": [
        "Node.js",
        "Express",
        "Python",
        "FastAPI",
        "REST APIs",
        "RESTful API",
        "JWT",
        "MongoDB",
        "Mongoose",
        "PostgreSQL",
        "Prisma",
        "Directus",
        "Headless CMS",
        "Firebase",
        "Firestore"
      ]
    },
    {
      "id": "ai-automation",
      "title": "AI / Automation",
      "summary": "Current specialization around practical AI-assisted systems and automation-first product flows.",
      "skills": [
        "LLM APIs",
        "Groq API",
        "Prompt engineering",
        "AI agents",
        "n8n",
        "Make",
        "Webhooks",
        "API automation",
        "AI-assisted product workflows",
        "AI safety",
        "Python automations",
        "Human-in-the-loop AI features"
      ]
    },
    {
      "id": "engineering",
      "title": "Engineering",
      "summary": "Development habits and tools used to keep products maintainable after launch.",
      "skills": [
        "Git",
        "GitHub",
        "GitHub team workflow",
        "Docker",
        "Docker Compose",
        "CI/CD",
        "Testing / QA",
        "Deployment",
        "Netlify",
        "Vercel",
        "Render",
        "Neon",
        "Agile",
        "Scrum"
      ]
    },
    {
      "id": "transferable",
      "title": "Transferable Skills",
      "summary": "Product and collaboration strengths that connect technical work to business and user needs.",
      "skills": [
        "End-to-end product development",
        "Technical problem-solving",
        "Cross-functional collaboration",
        "User-focused thinking",
        "API and workflow integration",
        "Adaptability and fast learning",
        "Business and product understanding",
        "Market research",
        "Affiliate marketing",
        "Website administration"
      ]
    },
    {
      "id": "languages",
      "title": "Languages",
      "summary": "Working language profile from the CV, locale data, and positioning docs.",
      "skills": [
        "Hebrew - Native",
        "Russian - Native",
        "English - C1",
        "German - B2"
      ]
    }
  ],
  "source_notes": [
    "Skills are consolidated from the CV, DCI certificate, app locale files, app/composables/useProjects.ts, and positioning docs."
  ]
};

export const roleFitData = {
  "roles": [
    {
      "role_title": "Full-Stack Software Developer",
      "fit_summary": "Igal has professional full-stack and SaaS experience, plus portfolio projects that combine frontend interfaces, backend APIs, databases, deployment, and AI-assisted workflows.",
      "relevant_skills": [
        "TypeScript",
        "Vue/Nuxt",
        "React/Next",
        "Node.js",
        "Express",
        "Python",
        "FastAPI",
        "REST APIs",
        "PostgreSQL",
        "MongoDB",
        "Docker"
      ],
      "relevant_projects": [
        "flowplace-role-compass",
        "openme",
        "decision-matrix-ai",
        "ari-motors-ev-portal",
        "user-management-app"
      ],
      "proof_points": [
        "Professional software developer role at Flowplace.",
        "Solo full-stack delivery of ARI Motors EV portal from concept to production in under three months.",
        "OpenMe combines Next.js, Express, PostgreSQL, Prisma, FastAPI, and deployment across Vercel, Render, and Neon."
      ],
      "possible_search_keywords": [
        "Full-Stack Developer",
        "Full Stack Software Developer",
        "TypeScript Developer",
        "SaaS Developer",
        "API Developer"
      ]
    },
    {
      "role_title": "Frontend Developer",
      "fit_summary": "Igal's professional work includes responsive UI implementation, usability improvements, frontend workflows, and modern Vue/Nuxt and React/Next interfaces.",
      "relevant_skills": [
        "TypeScript",
        "JavaScript",
        "Vue",
        "Nuxt",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Responsive Design",
        "Accessibility"
      ],
      "relevant_projects": [
        "flowplace-role-compass",
        "leanera-digital-transition",
        "ari-motors-ev-portal",
        "decision-matrix-ai",
        "mindq-lab"
      ],
      "proof_points": [
        "Implemented responsive UI designs at Flowplace.",
        "Built Vue 3, Nuxt 3, TypeScript, Tailwind CSS, and Ionic applications at LeanERA.",
        "Developed user interfaces for ARI Motors comparison portal."
      ],
      "possible_search_keywords": [
        "Frontend Developer",
        "Frontend Engineer",
        "Vue Developer",
        "React Developer",
        "TypeScript Frontend Developer"
      ]
    },
    {
      "role_title": "Vue.js Developer",
      "fit_summary": "Igal has professional Vue/Nuxt experience at Flowplace and LeanERA, and several Nuxt/Vue portfolio projects.",
      "relevant_skills": [
        "Vue.js",
        "Vue 3",
        "Nuxt.js",
        "Nuxt 3",
        "TypeScript",
        "Tailwind CSS",
        "Directus",
        "REST APIs"
      ],
      "relevant_projects": [
        "flowplace-role-compass",
        "leanera-digital-transition",
        "ai-compliance-compass",
        "user-management-app",
        "family-space"
      ],
      "proof_points": [
        "Developed SaaS features with Vue.js/Nuxt.js and Directus at Flowplace.",
        "Developed Vue 3 and Nuxt 3 applications at LeanERA.",
        "The current portfolio itself is a Nuxt/Vue/TypeScript project."
      ],
      "possible_search_keywords": [
        "Vue.js Developer",
        "Nuxt Developer",
        "Vue Frontend Developer",
        "Vue TypeScript Developer"
      ]
    },
    {
      "role_title": "React Developer",
      "fit_summary": "Igal's React/Next.js experience is represented in the CV, DCI training, and current full-stack portfolio projects such as OpenMe and Decision Matrix AI.",
      "relevant_skills": [
        "React",
        "Next.js",
        "React Hooks",
        "Redux",
        "Context API",
        "TypeScript",
        "Tailwind CSS"
      ],
      "relevant_projects": [
        "openme",
        "decision-matrix-ai"
      ],
      "proof_points": [
        "CV lists React.js and Next.js as core skills.",
        "DCI training covered React, React Hooks, Redux, and Context API.",
        "OpenMe uses Next.js, React, and TypeScript.",
        "Decision Matrix AI uses React, Vite, TypeScript, and Tailwind CSS."
      ],
      "possible_search_keywords": [
        "React Developer",
        "Next.js Developer",
        "React TypeScript Developer",
        "Frontend React Developer"
      ]
    },
    {
      "role_title": "TypeScript Developer",
      "fit_summary": "TypeScript appears across Igal's professional positioning, current stack, and several featured projects.",
      "relevant_skills": [
        "TypeScript",
        "JavaScript",
        "Vue/Nuxt",
        "React/Next",
        "Node.js",
        "Zod"
      ],
      "relevant_projects": [
        "flowplace-role-compass",
        "openme",
        "decision-matrix-ai",
        "leanera-digital-transition",
        "i18n-lint-cli"
      ],
      "proof_points": [
        "Flowplace Role Compass uses TypeScript with Vue/Nuxt.",
        "LeanERA work used Vue 3, Nuxt 3, TypeScript, and Tailwind CSS.",
        "OpenMe and Decision Matrix AI are TypeScript projects."
      ],
      "possible_search_keywords": [
        "TypeScript Developer",
        "TypeScript Engineer",
        "JavaScript Developer",
        "Full-Stack TypeScript Developer"
      ]
    },
    {
      "role_title": "Software Developer",
      "fit_summary": "Igal has software development experience across professional product work, web applications, developer utilities, and practical full-stack systems.",
      "relevant_skills": [
        "JavaScript",
        "TypeScript",
        "REST APIs",
        "Git",
        "Docker",
        "Agile",
        "Testing / QA",
        "Deployment"
      ],
      "relevant_projects": [
        "flowplace-role-compass",
        "ari-motors-ev-portal",
        "leanera-digital-transition",
        "user-management-app",
        "i18n-lint-cli"
      ],
      "proof_points": [
        "Professional Software Developer role at LeanERA.",
        "Professional Software Developer role at Flowplace.",
        "DCI certificate documents web and software developer training."
      ],
      "possible_search_keywords": [
        "Software Developer",
        "Web Developer",
        "Product Developer",
        "Application Developer"
      ]
    },
    {
      "role_title": "AI Software Developer",
      "fit_summary": "Igal is expanding an existing software development background into AI-assisted product workflows through WBS CODING SCHOOL and AI-enabled portfolio projects.",
      "relevant_skills": [
        "LLM APIs",
        "Groq API",
        "Prompt engineering",
        "TypeScript",
        "Netlify Functions",
        "FastAPI",
        "Firebase",
        "Human-in-the-loop AI features"
      ],
      "relevant_projects": [
        "decision-matrix-ai",
        "openme",
        "ai-compliance-compass"
      ],
      "proof_points": [
        "Decision Matrix AI uses Groq API, Netlify Functions, Firebase, Firestore, and Zod.",
        "OpenMe includes AI-assisted submission summaries.",
        "AI Compliance Compass implements an educational AI use-case checker with disclaimers."
      ],
      "possible_search_keywords": [
        "AI Software Developer",
        "AI Application Developer",
        "LLM Developer",
        "AI Product Developer"
      ]
    },
    {
      "role_title": "AI Automation Developer",
      "fit_summary": "Igal's current direction is practical AI automation using APIs, webhooks, n8n, Make, and human-in-the-loop product workflows.",
      "relevant_skills": [
        "AI agents",
        "n8n",
        "Make",
        "Webhooks",
        "API automation",
        "LLM APIs",
        "Prompt engineering",
        "Python automations"
      ],
      "relevant_projects": [
        "openme",
        "decision-matrix-ai",
        "ai-compliance-compass"
      ],
      "proof_points": [
        "The WBS AI Agents & Automations course is documented as the current course.",
        "OpenMe and Decision Matrix AI show AI-assisted workflow thinking.",
        "Current portfolio docs explicitly position AI as an extension of existing software engineering."
      ],
      "possible_search_keywords": [
        "AI Automation Developer",
        "Automation Developer",
        "Workflow Automation Developer",
        "n8n Developer",
        "Make Developer"
      ]
    },
    {
      "role_title": "AI Workflow Developer",
      "fit_summary": "Igal can connect product UX, structured workflows, API integration, and AI-assisted outputs in practical web applications.",
      "relevant_skills": [
        "AI-assisted product workflows",
        "LLM product UX",
        "APIs",
        "Webhooks",
        "Prompt engineering",
        "TypeScript",
        "Netlify Functions"
      ],
      "relevant_projects": [
        "openme",
        "decision-matrix-ai",
        "ai-compliance-compass"
      ],
      "proof_points": [
        "OpenMe includes endpoint workflows and AI-assisted summaries.",
        "Decision Matrix AI turns vague decisions into structured criteria, scores, recommendations, and action checklists.",
        "AI Compliance Compass uses intake, clarification, and next-step workflows."
      ],
      "possible_search_keywords": [
        "AI Workflow Developer",
        "AI Workflow Engineer",
        "AI Product Workflow Developer",
        "LLM Workflow Developer"
      ]
    },
    {
      "role_title": "SaaS Developer",
      "fit_summary": "Igal has professional SaaS feature experience and portfolio SaaS MVP work.",
      "relevant_skills": [
        "SaaS product development",
        "TypeScript",
        "Vue/Nuxt",
        "React/Next",
        "Node.js",
        "REST APIs",
        "PostgreSQL",
        "Prisma",
        "Directus"
      ],
      "relevant_projects": [
        "flowplace-role-compass",
        "openme",
        "decision-matrix-ai"
      ],
      "proof_points": [
        "Flowplace Role Compass is professional SaaS product engineering.",
        "OpenMe is a full-stack SaaS MVP.",
        "CV summary states experience in SaaS and web projects."
      ],
      "possible_search_keywords": [
        "SaaS Developer",
        "SaaS Software Developer",
        "Product Engineer",
        "Full-Stack SaaS Developer"
      ]
    },
    {
      "role_title": "API Integration Developer",
      "fit_summary": "Igal's work includes REST API integrations, serverless AI calls, backend API workflows, webhooks, and automation-focused product integrations.",
      "relevant_skills": [
        "REST APIs",
        "API integration",
        "Webhooks",
        "Node.js",
        "Express",
        "FastAPI",
        "Netlify Functions",
        "Groq API",
        "Firebase"
      ],
      "relevant_projects": [
        "flowplace-role-compass",
        "openme",
        "decision-matrix-ai",
        "ai-compliance-compass",
        "user-management-app"
      ],
      "proof_points": [
        "Flowplace responsibilities include REST API integration and optimized UI workflows.",
        "Decision Matrix AI routes AI calls through Netlify Functions and validates data with Zod.",
        "User Management App uses Vue 3 and FastAPI with REST API workflows."
      ],
      "possible_search_keywords": [
        "API Integration Developer",
        "Backend Integration Developer",
        "Automation API Developer",
        "REST API Developer"
      ]
    }
  ],
  "source_notes": [
    "Role fit is based only on the target role docs, CV, structured project data, and existing repository content.",
    "AI role fit is framed as current specialization and practical project direction, not as senior AI expert positioning."
  ]
};

export const faqData = {
  "faqs": [
    {
      "id": "role-fit",
      "question": "What roles is Igal a good fit for?",
      "answer": "Igal is a good fit for full-stack, frontend, Vue/Nuxt, React/Next, TypeScript, SaaS, API integration, and AI automation-related software developer roles. The strongest match is product-focused software work that combines frontend UX, APIs, SaaS workflows, and practical AI-assisted features.",
      "related_roles": [
        "Full-Stack Software Developer",
        "Frontend Developer",
        "Vue.js Developer",
        "React Developer",
        "TypeScript Developer",
        "SaaS Developer",
        "API Integration Developer",
        "AI Automation Developer"
      ],
      "related_projects": [
        "flowplace-role-compass",
        "openme",
        "decision-matrix-ai",
        "ari-motors-ev-portal"
      ]
    },
    {
      "id": "recruiter-summary",
      "question": "Summarize Igal for a recruiter.",
      "answer": "Igal Vilensky is a full-stack software developer based in Leipzig, Germany. He has professional experience building SaaS and web products with TypeScript, Vue/Nuxt, React/Next, Node.js, REST APIs, and headless CMS tools. He is currently extending that background through an AI Agents & Automations course at WBS CODING SCHOOL, with a focus on LLM workflows, AI agents, n8n, Make, APIs, webhooks, and AI safety.",
      "related_roles": [
        "Full-Stack Software Developer",
        "Frontend Developer",
        "AI Automation Developer"
      ],
      "related_projects": [
        "flowplace-role-compass",
        "openme",
        "decision-matrix-ai"
      ]
    },
    {
      "id": "frontend-experience",
      "question": "What is his frontend experience?",
      "answer": "His frontend experience includes professional Vue.js/Nuxt.js work at Flowplace, Vue 3/Nuxt 3/TypeScript/Tailwind CSS work at LeanERA, and user interface development for ARI Motors. His portfolio projects also include React/Next.js and TypeScript work in OpenMe and Decision Matrix AI.",
      "related_roles": [
        "Frontend Developer",
        "Vue.js Developer",
        "React Developer",
        "TypeScript Developer"
      ],
      "related_projects": [
        "flowplace-role-compass",
        "leanera-digital-transition",
        "ari-motors-ev-portal",
        "openme",
        "decision-matrix-ai"
      ]
    },
    {
      "id": "saas-experience",
      "question": "Does he have SaaS experience?",
      "answer": "Yes. Flowplace Role Compass is documented as professional SaaS product engineering, built with Vue/Nuxt, TypeScript, Directus, and REST APIs, and reached 5,000+ users in the first month. The CV also describes Igal as having 3+ years of experience in SaaS and web projects. OpenMe is a full-stack SaaS MVP in his portfolio.",
      "related_roles": [
        "SaaS Developer",
        "Full-Stack Software Developer"
      ],
      "related_projects": [
        "flowplace-role-compass",
        "openme"
      ]
    },
    {
      "id": "ai-automation-experience",
      "question": "What is his AI/automation experience?",
      "answer": "Since 2026, Igal has been expanding his existing software development background through the AI Agents & Automations course at WBS CODING SCHOOL. The docs list LLM workflows, prompt engineering, AI agents, n8n, Make, Python automations, APIs, webhooks, and AI safety as current focus areas. Project proof includes Decision Matrix AI, OpenMe's AI-assisted submission summaries, and AI Compliance Compass.",
      "related_roles": [
        "AI Software Developer",
        "AI Automation Developer",
        "AI Workflow Developer"
      ],
      "related_projects": [
        "decision-matrix-ai",
        "openme",
        "ai-compliance-compass"
      ]
    },
    {
      "id": "first-project-to-review",
      "question": "Which project should I review first?",
      "answer": "For professional SaaS proof, review Flowplace Role Compass first because it shows production product engineering and a 5,000+ user first-month outcome. For full-stack SaaS and AI-assisted workflow proof, review OpenMe next. For AI product UX, review Decision Matrix AI. For solo full-stack delivery under a tight deadline, review ARI Motors EV Portal.",
      "related_roles": [
        "Full-Stack Software Developer",
        "SaaS Developer",
        "AI Software Developer"
      ],
      "related_projects": [
        "flowplace-role-compass",
        "openme",
        "decision-matrix-ai",
        "ari-motors-ev-portal"
      ]
    },
    {
      "id": "not-junior",
      "question": "What makes him different from a junior developer?",
      "answer": "Igal is not positioned as someone entering tech from zero. The repository documents professional roles at Flowplace, LeanERA, and ARI Motors, including shipped SaaS features, responsive UI work, REST API integration, production bug-fix and release support in the positioning docs, and solo delivery of an EV comparison portal from concept to production in under three months.",
      "related_roles": [
        "Full-Stack Software Developer",
        "Software Developer",
        "Frontend Developer"
      ],
      "related_projects": [
        "flowplace-role-compass",
        "leanera-digital-transition",
        "ari-motors-ev-portal"
      ]
    },
    {
      "id": "technologies",
      "question": "What technologies does he use?",
      "answer": "His core stack includes TypeScript, JavaScript, Vue, Nuxt, React, Next.js, Node.js, Express, Python, FastAPI, REST APIs, Tailwind CSS, Directus, MongoDB, PostgreSQL, Prisma, Firebase, Git, Docker, Netlify, Vercel, and Render. His current AI/automation stack includes LLM APIs, Groq API, prompt engineering, AI agents, n8n, Make, APIs, webhooks, and AI-assisted workflows.",
      "related_roles": [
        "TypeScript Developer",
        "Full-Stack Software Developer",
        "AI Automation Developer"
      ],
      "related_projects": [
        "openme",
        "decision-matrix-ai",
        "flowplace-role-compass"
      ]
    },
    {
      "id": "location",
      "question": "Where is he based?",
      "answer": "Igal is based in Leipzig, Germany. The portfolio positioning is aimed at Germany, Leipzig, hybrid, and remote EU contexts.",
      "related_roles": [
        "Full-Stack Software Developer",
        "Frontend Developer"
      ],
      "related_projects": []
    },
    {
      "id": "languages",
      "question": "What languages does he speak?",
      "answer": "The repository documents Hebrew and Russian as native languages, English at C1, and German at B2. The DCI certificate also mentions job-related German language training at B2.2 level.",
      "related_roles": [],
      "related_projects": []
    },
    {
      "id": "wbs-fit",
      "question": "How does the WBS AI Agents & Automations course fit into his profile?",
      "answer": "The WBS AI Agents & Automations course, running from 2026 to present, is framed as a continuation of Igal's existing software development profile, not a career reset. It strengthens his product engineering background with LLM workflows, prompt engineering, AI agents, n8n, Make, Python automations, APIs, webhooks, and AI safety.",
      "related_roles": [
        "AI Software Developer",
        "AI Automation Developer",
        "AI Workflow Developer"
      ],
      "related_projects": [
        "decision-matrix-ai",
        "openme",
        "ai-compliance-compass"
      ]
    },
    {
      "id": "contact",
      "question": "How can someone contact Igal?",
      "answer": "The repository lists email as vilenskyigal@gmail.com, LinkedIn as https://www.linkedin.com/in/igalvilensky/, GitHub as https://github.com/igalVilensky, and the portfolio as https://igalvilensky.netlify.app/.",
      "related_roles": [],
      "related_projects": []
    }
  ],
  "source_notes": [
    "FAQ answers are written for a future deterministic portfolio guide and use only repository and documentation facts.",
    "Where exact dates or metrics are missing, the answer avoids adding them."
  ]
};

export const agentData = {
  "assistant": {
    "name": "Igal, Explained",
    "description": "A recruiter-focused guide to Igal Vilensky's portfolio."
  },
  "suggested_questions": [
    {
      "id": "role-fit",
      "translation_key": "portfolioAgent.questions.roleFit"
    },
    {
      "id": "frontend-experience",
      "translation_key": "portfolioAgent.questions.frontendExperience"
    },
    {
      "id": "ai-automation",
      "translation_key": "portfolioAgent.questions.aiAutomation"
    },
    {
      "id": "strongest-project",
      "translation_key": "portfolioAgent.questions.strongestProject"
    },
    {
      "id": "debugging",
      "translation_key": "portfolioAgent.questions.debugging"
    },
    {
      "id": "recruiter-summary",
      "translation_key": "portfolioAgent.questions.recruiterSummary"
    }
  ],
  "missing_topics": [
    "Detailed debugging examples",
    "Recent collaboration examples",
    "More measured project outcomes",
    "Preferred team environments",
    "Deeper backend architecture examples"
  ],
  "content_rules": [
    "Use only verified portfolio knowledge.",
    "Do not add unsupported metrics, testimonials, work history, or seniority claims.",
    "Distinguish documented facts from interpretation.",
    "When the knowledge base does not contain enough evidence, say so clearly."
  ]
};
