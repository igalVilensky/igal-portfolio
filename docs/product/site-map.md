# Site Map

Active proposal, 2026-10-10, for the **Hybrid Personal Engineering Website**. This supersedes earlier recruiter journeys and CV-led page requirements. No navigation or route change is implemented in Milestone 1.

## Proposed information architecture

| Area | Purpose | Route / implementation status |
| --- | --- | --- |
| Home | Professional identity, current focus, selected work, short personal introduction | Existing `/`; copy and composition changes are later work |
| Work | Professional case studies and significant independent projects; problems, approaches, trade-offs, outcomes | Preserve `/case-studies` and existing detail routes |
| Notes | Technical writing, engineering observations, ideas, and learning | Optional future `/notes`; no page or navigation item until meaningful content exists |
| Experiments | Interactive tools, prototypes, and smaller projects | Preserve `/experiments` and linked tool routes |
| About | Professional background and selected personal context; current Agorando role and completed WBS education | Existing `/about` |
| Contact | Simple email and profile links without inferred job/freelance availability | Existing `/contact`; future navigation placement to decide |

The intended core navigation follows these areas, with Notes omitted until ready. Work retains its existing URL; a `/work` migration is unnecessary. This is an information architecture proposal, not a mandate for six equal top-level links.

## Current routes and features to preserve

Current navbar: Home, Work, Experiments, Ask Igal, AI, About. These link to `/`, `/case-studies`, `/experiments`, `/ask-igal`, `/ai-automation`, and `/about`. Contact is also accessible through existing links.

* `/ask-igal`: existing assistant. Review as project/knowledge exploration; final label and navigation prominence remain undecided. Do not delete its implementation.
* `/ai-automation`: existing specialization page. Keep accessible while deciding whether it remains a navigation item or is linked within Work/About. AI remains a specialization rather than the whole identity.
* `/ai-compliance-compass`: preserve the interactive tool and its existing access paths.
* `/education`: preserve the existing route; correct its educational facts in later content work. About can summarize education without deleting this page.
* `/experience`: previously removed; do not recreate it as part of this milestone. Structured experience remains useful for About, Work, and the assistant.

Routes listed here are base paths; preserve the existing locale routing behavior.

## Existing case-study mappings

| Route | Actual content |
| --- | --- |
| `/case-studies/flowplace` | Flowplace Role Compass |
| `/case-studies/leanera` | ARI Motors EV Portal; legacy path |
| `/case-studies/cashdo` | LeanERA Digital Transition; legacy path |
| `/case-studies/security` | Interactive Security Playground |

Do not rename legacy paths during repositioning. OpenMe and Decision Matrix AI remain useful featured projects without dedicated detail pages; their previously planned case studies are deferred until factual modernization is complete.

## Reading paths and content hierarchy

* A new visitor reads Home, explores selected Work, and finds About or Contact.
* An engineer reads a case study for context, decisions, trade-offs, limitations, and available source/demo links.
* A tool user goes directly to Experiments and can explore related projects.
* A returning reader can visit Notes once actual writing exists.
* Any visitor may use the optional assistant to locate documented work; ordinary navigation must remain sufficient.

Home should favor selected work over a résumé timeline or skills inventory. Work can retain Flowplace Role Compass, OpenMe, Decision Matrix AI, and ARI Motors EV Portal as its initial featured set. Independent applications and smaller experiments remain discoverable. About carries concise professional history and confirmed personal context.

Case studies should explain problem, role, approach, trade-offs, and documented outcomes or limitations. Do not invent missing sections. Agorando has only a high-level role description at present; a detailed employer case study is not assumed or required.

## Decisions deferred

Confirm the assistant’s name and placement, the AI page’s navigation role, Contact prominence, and whether there is meaningful content to launch Notes. Keep existing routes and tools working while these decisions are made.
