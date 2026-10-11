# Visual Direction

## Status and authority

Milestone 4A specification, 2026-10-10. **Design target; foundation and expressive Hero implemented in Milestone 4B.1.** The Hybrid Personal Engineering Website positioning remains active. This specification supersedes the earlier editorial/document-like visual prescription, warm-neutral palette preservation, and quiet-dark-only direction in older planning documents. It does not supersede factual, confidentiality, localization, or route-preservation rules.

Read with [Design system](design-system.md), [Page blueprints](page-blueprints.md), and [Positioning](../strategy/positioning.md). Milestone 4B implements the homepage and global visual system; other page blueprints guide later bounded work.

## Overall concept

**A precise personal engineering workspace with visible system relationships and an optional intelligence layer.** Visitors should understand who Igal is, what he builds, how documented systems work, and where to explore next. Structure provides credibility; real relationships provide distinctiveness; interactive tools and sourced exploration provide depth.

| Direction | Design contribution | Concrete expression |
| --- | --- | --- |
| Precision Stack — foundation | Mature structure, hierarchy, calm product interface | Shared alignment, readable sans typography, disciplined spacing, explicit actions, consistent surface and state rules |
| Systems Canvas — explanatory layer | Architecture, integration and workflow thinking | Labeled modules, bounded process diagrams, clear inputs/outputs, decision and constraint panels tied to actual evidence |
| Neural Workbench — exploration layer | Modern AI/software atmosphere and useful interaction | Deep dark surfaces, restrained blue/teal accents, command-like assistant entry, concise responses with visible source links |

Precision Stack governs every page. Systems Canvas appears where relationships explain content. Neural Workbench is strongest around actual tools and the assistant. Do not assign a different visual identity to each route or turn every section into a diagram.

## Identity and hierarchy

Lead with Igal and his engineering focus, then selected work and exploration. Keep professional work, independent applications, and experiments distinguishable through factual labels. Show personality through confirmed first-person context and actual engineering choices, not invented terminal output or promotional claims.

Use a shared wide alignment frame with narrower reading columns. Prefer purposeful modules over a wall of identical cards. One dominant heading and one primary action per region are sufficient. Retain ordinary navigation, project links, and simple contact paths.

## Light and dark as separate compositions

**Light:** cool off-white canvas, white panels, ink text, clear gray borders and deep blue actions. Separation comes from spacing, fine rules and limited shadow. Crisp and professional, without warm-paper/editorial styling.

**Dark:** deep blue-black canvas, stepped slate surfaces, soft bright text, brighter blue links and restrained teal system cues. Depth comes from surface layers, bounded diagram areas and selective active-node glow in the Hero. Avoid pure-black/pure-white inversion and translucent text-bearing panels.

Both themes have equal content, hierarchy, focus visibility and state coverage. System preference and the existing explicit toggle remain supported. Theme must never change meaning or hide evidence. Token values and checks are specified in the design system.

## Typography and information graphics

Use the existing Inter/system sans direction for headings and prose. Add a system mono stack only for short technical labels, identifiers and code; no font dependency is needed. No serif display type, long all-caps copy, or terminal-styled paragraphs. The expressive Hero uses a prominent three-part engineering headline with selective blue emphasis.

Diagrams must explain publicly documented relationships. A homepage focus map may label confirmed work areas, but must not imply those nodes represent an actual employer architecture. Use meaningful labels, arrow direction only for known flows, a caption and a text equivalent. If evidence is missing, use plain text instead of manufacturing a system visual.

## Interaction character

Make real affordances visible: links navigate, controls act, sources substantiate. Keep feedback immediate and motion brief. Technical depth should reward exploration without requiring animation, hover, the assistant, or a large screen to understand the page.

The assistant is an optional site exploration layer within the same component system. Its eventual command/search character describes its visual entry and concise navigation purpose; it does not promise a search index, command palette or new capability in Milestone 4B.

## Explicit anti-patterns

- Editorial magazine, hotel/lifestyle, creative-agency or web-designer portfolio styling.
- Generic startup layouts: slogan hero, decorative product mockup, logo wall, repeated conversion CTAs and pricing-like cards.
- Neon cyberpunk, glass panels, pervasive glowing borders, particle fields, neural brains, stock AI art or animated wires without explanatory value.
- Fake dashboards, business metrics, live status indicators, terminal logs, confidence scores or invented architecture.
- Technology badge walls, tiny uppercase metadata, excessive nested cards, decorative section numbering and arbitrary asymmetry.
- A dominant chatbot hero, mascot, unsolicited popup or assistant-gated access to ordinary project information.
- Unsupported outcome claims, invented personal stories or detailed Agorando diagrams. Only confirmed high-level employer context is currently permitted.

## Review questions

Can a visitor identify Igal's engineering focus and reach real work quickly? Do system cues explain something verifiable? Does each theme feel deliberately composed? Are long localized labels and mobile layouts readable? Does the page remain useful without motion or AI? If a visual element cannot answer one of these needs, omit it.

## Milestone 4B.1 — expressive Hero refinement

The explicit expressive direction supersedes the static focus-map interpretation for the Hero only. `SystemExplorer.vue` replaces the vertical `HomeWorkflow` in the homepage. Integrations is the central selectable domain, surrounded by Data & APIs, Applications, AI & Automation and Useful Outcomes. Undirected SVG connections show conceptual relationships, not a deployed sequence or employer architecture. Slow dashed motion highlights the active relationship; it is illustrative, not live traffic. No status indicators or invented metrics.

The Hero uses a wider, balanced two-column frame, a large engineering headline, layered opaque surfaces, a technical grid and selective blue/cyan light. Existing semantic colors provide separate cool-white and graphite treatments. Below 640px the explorer becomes a compact central hub with a two-column domain selector and details underneath; it does not scale down the desktop diagram.

Semantic pressed buttons support Tab, Enter and Space. Selection has a checkmark, a thicker border and a polite contextual detail region. Hover/focus previews connections without replacing the selected detail. Reduced motion removes all explorer animation; native links and buttons remain usable. The small typed domain registry separates associations and geometry from interaction logic. Related titles and URLs resolve from existing project data, with locale-aware internal links. ARI Motors supports the data/outcome examples, Flowplace supports application/integration examples, and FlowForge supports AI/automation. These editorial examples do not claim every project uses every domain.

This refinement adds no dependencies and changes no other page composition. Visual approval is the next step before any further homepage rollout.
