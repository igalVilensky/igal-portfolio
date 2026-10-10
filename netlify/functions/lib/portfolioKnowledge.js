// Generated from content/*.json so Netlify bundles portfolioAgent knowledge with the function.
// Update this file when the source content JSON changes.

export const profileData = {
  "identity": {
    "name": "Igal Vilensky",
    "profession": "AI Software Engineer",
    "location": {
      "city": "Leipzig",
      "country": "Germany"
    },
    "based_in": "Leipzig, Germany"
  },
  "headline": "Software engineering, AI, automation, and system integrations.",
  "summary": "Igal Vilensky is a software engineer based in Leipzig, Germany, working as an AI Software Engineer at Agorando Technologies GmbH since August 2026. His current focus includes software development, enterprise integrations, internal applications, AI and process automation. His previous SaaS and web application experience includes Flowplace GmbH, LeanERA, and ARI Motors.",
  "cv_summary": "Software engineer with professional SaaS and web application experience, currently at Agorando Technologies GmbH. Professional Vue/Nuxt, TypeScript, and API work is documented at Flowplace and LeanERA; React, Node.js, Python, and automation workflows also appear in independent projects and training. Experience varies by technology and context; this background is not a claim of equal professional depth across the stack.",
  "experience_level": {
    "label": "3+ years",
    "note": "The 3+ years claim appears in the existing CV and locale hero copy."
  },
  "current_focus": [
    "Software development",
    "Enterprise integrations",
    "Internal applications",
    "AI workflows",
    "Process automation"
  ],
  "current_course": {
    "program": "AI Agents & Automations",
    "institution": "WBS CODING SCHOOL",
    "timeframe": "Completed July 2026",
    "status": "completed",
    "note": "Completion in July 2026 confirmed by the user in October 2026. The legacy current_course key is retained for existing consumers; this is completed education."
  },
  "target_roles": [],
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
    "summary": "For questions about my work, projects, or engineering ideas, get in touch by email or LinkedIn.",
    "source_note": "Neutral contact wording; no availability for employment or freelance work is asserted."
  },
  "source_notes": [
    "Current role at Agorando Technologies GmbH since August 2026, Flowplace GmbH employment in 2023–2025, WBS completion in July 2026, Leipzig location, and current professional scope were confirmed by the user in October 2026.",
    "Earlier career, project, language, and technology details are retained from existing repository sources; technology lists span professional work, independent projects, and education and do not imply equal experience.",
    "Professional focus areas are recorded in current_focus. target_roles remains an empty array for assistant compatibility and does not represent a job search.",
    "Only confirmed high-level Agorando work areas are included; no employer-specific technologies, internal project details, or outcomes are asserted."
  ]
};

export const personalProfileData = {
  "visibility": "agent_answerable",
  "identity": {
    "full_name": "Igal Vilensky",
    "date_of_birth": "1985-03-28",
    "current_age": 41,
    "birth_country": "Belarus",
    "current_location": "Leipzig, Germany"
  },
  "personal_history": [
    {
      "period": "1985-1996",
      "summary": "Born in Belarus and lived there until the age of 11."
    },
    {
      "period": "1996-2019",
      "summary": "Moved to Israel at age 11 and lived there until 2019."
    },
    {
      "period": "2019-present",
      "summary": "Moved to Germany in 2019 and currently lives in Leipzig."
    }
  ],
  "family": {
    "visibility": "agent_answerable",
    "has_family": true,
    "children_count": 3,
    "approved_scope": "The assistant may answer only the general fact that Igal has a family and three children when directly relevant or directly asked. It must not reveal or invent names, ages, schools, addresses, or other family-member details."
  },
  "personal_traits": [
    "open-minded",
    "communicative",
    "creative"
  ],
  "creative_background": [
    "Played piano before moving into IT.",
    "Worked as an actor in theatre.",
    "Appeared in movies.",
    "Appeared in television series.",
    "Appeared in commercials."
  ],
  "salary": {
    "visibility": "agent_answerable",
    "internal_minimum_eur_gross_yearly": 45000,
    "public_answer_policy": "Do not immediately state a salary number. First ask about the role, responsibilities, seniority expectations, location, employment type, and compensation structure. After receiving enough context, provide a reasonable range starting around EUR 45,000 gross per year and explain that Igal is flexible and prefers to discuss the exact figure directly."
  }
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
      "organization": "Flowplace GmbH",
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
        "Employer name and 2023–2025 timeframe confirmed by the user in October 2026; the Software Developer title is retained from the earlier user-provided correction.",
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
      "id": "agorando",
      "organization": "Agorando Technologies GmbH",
      "title": "AI Software Engineer",
      "timeframe": "August 2026 - Present",
      "location": "",
      "type": "work",
      "summary": "Current employment since August 2026, covering software development, enterprise integrations, internal applications, AI and process automation.",
      "highlights": [
        "Software engineering and internal business tools.",
        "Enterprise system integrations.",
        "AI-related workflows and process automation.",
        "Requirements analysis and operational process improvements."
      ],
      "technologies": [],
      "source_notes": [
        "Current role, start month, and high-level work areas confirmed by the user in October 2026.",
        "Employer location, specific technologies, project details, and outcomes are not specified. Leipzig is the personal location, not an asserted employer location."
      ]
    },
    {
      "id": "wbs-ai-agents-automations",
      "organization": "WBS CODING SCHOOL",
      "title": "AI Agents & Automations",
      "timeframe": "Completed July 2026",
      "location": "Online",
      "type": "education",
      "summary": "Completed the AI Agents & Automations program in July 2026. The documented curriculum covered AI agents, automation, LLM workflows, prompt engineering, APIs, webhooks, and AI safety.",
      "highlights": [
        "Completed the program in July 2026.",
        "Studied LLM workflows, prompt engineering, AI agents, and automation workflows.",
        "Coursework included n8n, Make, APIs, and webhooks.",
        "Covered Python automations and AI safety alongside an existing software development background."
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
        "Completion in July 2026 confirmed by the user in October 2026; no exact start date is asserted.",
        "Online location and curriculum topics are retained from existing repository content; coursework does not imply equivalent professional experience with each technology."
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
      "fit_summary": "Igal's professional frontend work includes Vue/Nuxt, TypeScript, responsive interfaces, usability improvements, and API-connected workflows. React/Next.js experience is also represented in independent projects and training, rather than being asserted here as equivalent employer experience.",
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
      "fit_summary": "Igal is an AI Software Engineer at Agorando Technologies GmbH since August 2026, working across software development, enterprise integrations, internal applications, AI and process automation. He completed AI Agents & Automations at WBS CODING SCHOOL in July 2026; AI-enabled independent projects provide separate public examples.",
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
      "fit_summary": "Igal’s current professional scope includes AI and process automation at Agorando Technologies GmbH. His broader background includes APIs, automation coursework, and independent AI-assisted applications; specific tools are not attributed to his employer.",
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
        "Completed AI Agents & Automations at WBS CODING SCHOOL in July 2026; coursework included n8n, Make, APIs, webhooks, and Python automations.",
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
    "Legacy role labels and search keywords remain for assistant compatibility; they organize existing evidence and do not describe current job targets or availability.",
    "Current employment and WBS completion were corrected from user-confirmed information in October 2026. Earlier project evidence is retained from repository sources.",
    "Relevant skill lists span professional work, independent projects, and education; they are not a claim of equal professional experience or senior AI expertise."
  ]
};

export const faqData = {
  "faqs": [
    {
      "id": "role-fit",
      "question": "What roles is Igal a good fit for?",
      "answer": "Igal's professional focus is software development, enterprise integrations, internal applications, AI and process automation. He is an AI Software Engineer at Agorando Technologies GmbH since August 2026. His previous professional work includes Vue/Nuxt, TypeScript, SaaS features, and API integration; independent projects and training broaden that background. This describes his work, not availability for a new role.",
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
      "answer": "Igal Vilensky is a software engineer based in Leipzig, Germany, working as an AI Software Engineer at Agorando Technologies GmbH since August 2026. His current focus includes software development, enterprise integrations, internal applications, AI and process automation. His previous SaaS and web application experience includes Flowplace GmbH, LeanERA, and ARI Motors. He completed AI Agents & Automations at WBS CODING SCHOOL in July 2026. Professional Vue/Nuxt and TypeScript experience is distinct from technologies explored in independent projects and training.",
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
      "answer": "Since August 2026, Igal has worked as an AI Software Engineer at Agorando Technologies GmbH, with a high-level scope that includes enterprise integrations, internal applications, AI and process automation. He completed AI Agents & Automations at WBS CODING SCHOOL in July 2026. Independent project examples include Decision Matrix AI, OpenMe’s AI-assisted submission summaries, and AI Compliance Compass; these are separate from his employer’s internal work.",
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
      "answer": "Igal has professional software development experience at Flowplace GmbH (2023–2025), LeanERA, and ARI Motors, including SaaS features, responsive interfaces, API integration, and a production EV comparison portal. Since August 2026, he has worked as an AI Software Engineer at Agorando Technologies GmbH. These are documented work contexts rather than a claim of a particular seniority level.",
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
      "answer": "His background includes Vue, Nuxt, TypeScript, React, Node.js, APIs, Python, and automation workflows. Professional Vue/Nuxt, TypeScript, and API work is documented at Flowplace and LeanERA. React/Next.js, Node.js, and Python/FastAPI also appear in independent projects such as OpenMe, while WBS coursework covered AI agents and automation tools. The depth and context of experience vary by technology; no specific employer stack is asserted for Agorando.",
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
      "answer": "Igal is based in Leipzig, Germany.",
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
      "answer": "Igal completed AI Agents & Automations at WBS CODING SCHOOL in July 2026. The documented curriculum covered LLM workflows, prompt engineering, AI agents, n8n, Make, Python automations, APIs, webhooks, and AI safety. It complements his software engineering background; coursework is distinct from shipped professional work.",
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
    "Employment and education facts were updated from user-confirmed information in October 2026; existing project evidence and links are preserved.",
    "Legacy question IDs, question wording, and related-role fields remain compatible with the existing assistant pending its coordinated purpose review. They do not establish job availability.",
    "Professional work, independent projects, and coursework provide different kinds of evidence; technology lists do not imply equal professional depth."
  ]
};

export const agentData = {
  "assistant": {
    "name": "Igal, Explained",
    "description": "A guide to Igal Vilensky's projects, software engineering experience, and experiments."
  },
  "suggested_questions": {
    "professional": [
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
    "conversational": [
      {
        "id": "personal-journey",
        "translation_key": "portfolioAgent.questions.personalJourney"
      },
      {
        "id": "before-it",
        "translation_key": "portfolioAgent.questions.beforeIt"
      },
      {
        "id": "creative-background",
        "translation_key": "portfolioAgent.questions.creativeBackground"
      },
      {
        "id": "unusual-background",
        "translation_key": "portfolioAgent.questions.unusualBackground"
      },
      {
        "id": "frontend-experience",
        "translation_key": "portfolioAgent.questions.frontendExperience"
      },
      {
        "id": "ai-automation",
        "translation_key": "portfolioAgent.questions.aiAutomation"
      }
    ]
  },
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
