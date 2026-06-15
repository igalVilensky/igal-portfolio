# Site Map

## Purpose

This document defines the target structure for the repositioned portfolio.

The portfolio should be simple, recruiter-friendly, and easy to scan.

The goal is not to create many pages. The goal is to create a clear path from first impression to proof.

## Primary User Journeys

### Recruiter / HR Screener

Goal: quickly understand if Igal fits the role.

Expected path:

1. Land on homepage.
2. Read hero positioning.
3. Scan recruiter snapshot.
4. Review selected work.
5. Check skills/experience.
6. Open CV, LinkedIn, GitHub, or contact.

### Hiring Manager / Engineering Manager

Goal: evaluate technical/product credibility.

Expected path:

1. Land on homepage.
2. Review selected projects.
3. Open one or two case studies.
4. Check stack, role, architecture, and outcomes.
5. Check GitHub links.
6. Contact or save profile.

### Technical Interviewer

Goal: understand technical depth and project ownership.

Expected path:

1. Open selected work or projects page.
2. Review case studies.
3. Check implementation details and GitHub links.
4. Review AI/automation focus.
5. Ask AI guide targeted questions if available.

### Busy Visitor

Goal: get the 30-second summary.

Expected path:

1. Land on homepage.
2. Read hero.
3. Use “Ask My Portfolio” or recruiter snapshot.
4. Click CV or contact.

## Target Navigation

Primary navigation:

```text
Igal Vilensky
Work
Experience
AI Guide
Contact
```

Optional external actions:

```text
CV
GitHub
LinkedIn
```

Keep navigation minimal.

## Target Pages

### 1. Home

Route:

```text
/
```

Purpose:

The main recruiter-facing landing page.

Sections:

1. Hero
2. Recruiter Snapshot
3. Ask My Portfolio preview
4. Selected Work
5. How I Work
6. AI / Automation Focus
7. Experience Snapshot
8. Contact CTA

The homepage should be strong enough that many visitors do not need to open other pages.

### 2. Work / Case Studies

Route:

```text
/work
```

or preserve existing route:

```text
/case-studies
```

Purpose:

Show selected professional and portfolio work in a structured way.

Recommended approach:

Use `/case-studies` if it already exists and works. Avoid unnecessary route migration unless useful.

Sections:

1. Page intro
2. Featured professional case studies
3. AI / automation projects
4. Additional projects / lab
5. CTA to contact or ask AI guide

Featured work:

* Flowplace Role Compass
* OpenMe
* Decision Matrix AI
* ARI Motors EV Portal

Secondary/lab work:

* AI Compliance Compass
* User Management App
* MindQ Lab
* PageScope
* i18n Linter CLI
* Security Playground
* Family Space
* other older experiments only if still relevant

### 3. Individual Case Study Pages

Routes can remain existing routes where available.

Possible target routes:

```text
/case-studies/flowplace
/case-studies/openme
/case-studies/decision-matrix-ai
/case-studies/ari-motors
```

Purpose:

Provide deeper proof for hiring managers and technical reviewers.

Each case study should include:

1. Summary
2. Problem/context
3. Igal’s role
4. Tech stack
5. Key features or contributions
6. Outcome/proof
7. Technical decisions
8. What it demonstrates for target roles
9. Links if available

Not every project needs a full case study. Prioritize quality over quantity.

### 4. Experience Content

Standalone route:

```text
None
```

Experience should not be a separate public page in the current portfolio structure. Keep it as structured source content for About, Work/case-study context, and Ask My Portfolio.

Content:

* Flowplace
* LeanERA
* ARI Motors
* Myfxbook/Cashdo
* WBS Coding School AI Agents & Automations
* DCI Web & Software Development

This should not duplicate the CV exactly. It should frame experience for recruiter scanning.

### 5. AI Guide

Route:

```text
/ai-guide
```

Optional for MVP. The first version can be a homepage component only.

Purpose:

Let visitors ask or select recruiter-focused questions about Igal.

MVP version:

* suggested prompt buttons
* predefined grounded answers
* links to relevant sections/projects
* no real LLM required

Later version:

* server-side AI route
* grounded structured context
* optional provider key
* fallback if unavailable

### 6. Contact

Route:

```text
/contact
```

Purpose:

Make it easy to contact Igal or open external profiles.

Content:

* email
* LinkedIn
* GitHub
* location
* target role availability
* CV download/link if available
* short note about open roles

Avoid overcomplication.

## Homepage Detail

### Section 1: Hero

Goal:

Explain the positioning immediately.

Should include:

* name
* professional title
* clear headline
* short supporting paragraph
* role tags
* primary CTA: View selected work
* secondary CTA: Download/View CV
* tertiary CTA: Ask My Portfolio

Suggested headline:

```text
Full-stack developer building SaaS products and AI-assisted workflows.
```

Suggested supporting copy:

```text
I’m a software developer based in Leipzig, working with TypeScript, Vue/Nuxt, React/Next, Node.js, APIs, and practical AI automation. I help product teams turn ambiguous ideas into reliable, user-focused software.
```

### Section 2: Recruiter Snapshot

Goal:

Give fast structured facts.

Possible fields:

* Location: Leipzig, Germany
* Target roles: Full-stack, Frontend, AI Automation
* Core stack: TypeScript, Vue/Nuxt, React/Next, Node.js, APIs
* AI focus: LLM APIs, n8n, Make, webhooks, AI agents
* Languages: English C1, German B2, Hebrew/Russian native
* Current: WBS AI Agents & Automations

### Section 3: Ask My Portfolio Preview

Goal:

Show AI capability and help visitors navigate.

Should include:

* short intro
* suggested questions
* answer preview or interactive panel
* clear limitation text

Possible intro:

```text
Short on time? Ask a grounded portfolio guide about my experience, projects, stack, or role fit.
```

### Section 4: Selected Work

Goal:

Show strongest proof.

Display 3–4 projects maximum on homepage.

Each card should include:

* project name
* type/category
* short description
* role/proof
* stack
* why it matters
* link to case study or GitHub

### Section 5: How I Work

Goal:

Show product engineering maturity.

Possible flow:

```text
Ambiguous idea
→ product/user flow
→ technical implementation
→ testing/release support
→ iteration
```

This section should connect transferable skills to software work.

### Section 6: AI / Automation Focus

Goal:

Explain the current shift without making it sound like a restart.

Content should show that AI is an extension of the existing software profile.

Include:

* LLM API integration
* prompt/product UX
* AI agents
* n8n / Make
* APIs / webhooks
* human-in-the-loop workflows
* AI safety

### Section 7: Experience Snapshot

Goal:

Show professional credibility.

Use concise timeline/cards.

Do not overload.

### Section 8: Contact CTA

Goal:

Make next action obvious.

Possible copy:

```text
Looking for a full-stack, frontend, or AI automation developer?
I’m open to product-focused software roles in Germany, Leipzig, hybrid, or remote EU contexts.
```

Actions:

* Email
* LinkedIn
* GitHub
* CV

## Content Hierarchy

Highest priority:

1. Role positioning
2. Professional experience
3. Selected project proof
4. AI/automation direction
5. Contact

Lower priority:

1. Older experiments
2. creative writing/content projects
3. personal background details
4. decorative visuals

## Route Strategy

Avoid unnecessary route churn.

If existing routes work, keep them.

Possible final routes:

```text
/
/case-studies
/case-studies/flowplace
/case-studies/openme
/case-studies/decision-matrix-ai
/case-studies/ari-motors
/contact
```

Optional later:

```text
/ai-guide
/lab
```

## MVP Site Map

For first major refactor, target:

```text
/
  HomeHero
  SelectedWork
  AskPortfolioPreview
  HomeContactCTA

/case-studies
  Work index
  Concise case-study documents
  Secondary work rows

/contact
  Contact details
  Role availability
  External links
```

This is enough for a strong first version.

## Success Criteria

The site map is successful if:

* visitors can understand Igal quickly from the homepage
* the strongest work is easy to find
* the site does not feel overloaded
* AI guide is visible but not dominant
* contact paths are obvious
* routes are simple and maintainable
