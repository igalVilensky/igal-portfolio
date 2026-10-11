# Design System

Milestone 4A implementation specification, 2026-10-10. All values below are **proposed tokens**, not a report of current CSS. See [Visual direction](visual-direction.md) and [Page blueprints](page-blueprints.md).

## Token architecture and migration

Use semantic CSS custom properties in `app/assets/css/main.css`, with light values at the root and dark overrides under the existing color-mode class. Expose them through Tailwind in `tailwind.config.js` as needed. Components consume roles, not isolated hex values. Keep existing utilities compatible while routes migrate; do not globally remap every `secondary-*` usage without checking its consumers.

Extend the existing `.page-shell`, `.page-container`, `.page-header`, `.page-title`, `.page-intro`, `.section-compact`, `.section-title`, `.btn-primary` and `.btn-outline` primitives. Introduce explicit reading/wide container variants where necessary. Global changes affect all routes and require regression review even when only Home is being recomposed. Legacy `.glass` remains a compatibility class, not permission to introduce glass effects.

## Color roles

Use these initial opaque sRGB values. Names below become `--color-{role}`. Validate actual pairings, including hover and focus, during implementation; the table is not a rendered accessibility certification.

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| canvas | `#F6F8FB` | `#0C121C` | Page background |
| surface | `#FFFFFF` | `#141E2B` | Cards, input and content panels |
| surface-raised | `#EDF2F7` | `#1C2A3B` | Hover, nested code/system areas, optional popovers |
| text | `#172334` | `#E6EDF5` | Headings and primary body |
| text-muted | `#526175` | `#A7B5C8` | Secondary prose, metadata, placeholder |
| border | `#D3DCE7` | `#33445B` | Decorative dividers and panel edges |
| border-control | `#76869B` | `#71849E` | Essential input/control outlines |
| accent | `#2456C4` | `#8DB4FF` | Links, active navigation, focus ring |
| accent-hover | `#1D439A` | `#B6CFFF` | Hover/pressed emphasis |
| on-accent | `#FFFFFF` | `#0C121C` | Filled primary button text/icons |
| system | `#0F6B65` | `#70CFC2` | Informational system nodes; not status by default |
| success | `#176641` | `#86D7AC` | Confirmed successful operation |
| warning | `#875300` | `#F2C572` | Actionable caution |
| danger | `#B42336` | `#FFA0AA` | Errors/destructive action |

Primary fill uses accent with on-accent; hover uses accent-hover with the same foreground. Secondary actions use text on surface with border-control. Selected items use accent plus a visible label/check/underline, never color alone. Status text uses its role on surface, with a label and optional icon; avoid low-opacity semantic text. Disabled controls remain legible using text-muted on surface-raised and an explicit disabled state.

Reserve blue for navigation/actions and teal for system explanation. No per-project rainbow. Decorative border may be subtle; it cannot be the sole boundary of an essential control or meaningful diagram connection. Use border-control or stronger for those connections. Selection uses accent/on-accent. Code, scrollbar and focus-offset backgrounds must follow the active theme.

## Typography

| Role | Size / line height | Weight and measure |
| --- | --- | --- |
| Home title | 36–56px fluid (`2.25–3.5rem`) / 1.1 | 600–700; natural wrapping, no forced desktop breaks |
| Page h1 | 32–44px fluid / 1.15 | 600; one h1 per page |
| Section h2 | 24–32px fluid / 1.25 | 600 |
| Card/panel h3 | 18–22px / 1.35 | 600 |
| Intro | 18–20px / 1.6 | 400; at most 60ch |
| Body | 16px (`1rem`) / 1.65 | 400; 60–70ch, cap at 72ch |
| Supporting text and controls | 14px / 1.5 | 400–500; not the default for long case-study prose |
| Metadata | 12–14px / 1.5 | 400–500; use muted text with adequate contrast |
| Code | 13–14px / 1.6 | System mono; local horizontal scrolling when needed |

Sans: `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Retain existing font loading; no new remote font requirement. Mono: `ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace`. Confirm Latin/Cyrillic fallback and wrapping. Short mono labels may use modest letter spacing; prose and headings use normal spacing. Avoid serif display, ultralight weights, 10px badges and aggressive negative tracking.

## Layout, spacing and surfaces

- Base spacing unit: 4px. Use 4, 8, 12, 16, 24, 32, 48, 64 and 96px. Typical label/control gap 8px; paragraph group 16px; card gap 24px.
- Wide container: max 1120px / 70rem, centered. Reading container: max 768px / 48rem, with actual prose capped at 72ch. Horizontal gutters: 20px mobile, 24px from 640px, 32px from 1024px.
- Section rhythm: 48px mobile, 64px tablet, 80–96px for major desktop transitions. Related subsections use 24–32px. Do not inflate every small section to viewport height.
- Use existing Tailwind breakpoints: 640, 768, 1024, 1280px. Default to one column; use two only when content fits. Desktop hero may use 7:5 columns at 1024px; reading content never stretches across the whole frame.
- Keep header offset in one shared rule; content and anchor scroll margin must clear the actual navbar height. Avoid hardcoded offsets repeated by page. Mobile navigation may wrap/open without overlapping content.
- Corners: 6px controls/chips, 10px cards, 12px large panels. Pills only where their meaning benefits (e.g. a removable filter), not every label.
- Borders: 1px. Light panels may use a small shadow (`0 2px 8px rgb(23 35 52 / 6%)`); dark panels primarily use surface steps and borders. No glow, deep floating shadows or nested stacks of raised panels.
- Use `minmax(0, 1fr)`, wrapping and flexible content heights. Never hide page overflow to conceal layout bugs. Reserve local scrolling for code or genuinely wide diagrams, with accessible text alternatives.

## Component rules

| Component | Anatomy and behavior |
| --- | --- |
| Page shell | Shared canvas, aligned header/body/footer; one main landmark and a skip link. Wide shell may contain a reading column. No bespoke full-page background per route. |
| Section heading | h2, optional short supporting sentence and one related link. Use whitespace/rule for separation, not decorative badges on every heading. |
| Card | Title → concise description → useful metadata → explicit action. 20px mobile/24px desktop padding. Static cards have no hover lift or pointer cursor. Avoid redundant card-within-card framing. |
| Buttons | Primary filled, secondary outlined, tertiary text. Min 44px interaction height for standalone controls; 16–20px horizontal padding. Icons 16–20px with visible labels unless an accessible name exists. Buttons act; links navigate. |
| Links | Underline in prose; navigation/card actions use clear placement plus hover/focus underline. Descriptive names; preserve external-link behavior. Do not make nested links inside a whole-card link. |
| Tags/chips | Short factual category/status, 12–14px, subtle surface fill. Aim for 1–3 meaningful categories, wrap naturally. A static tag is not a button. Interactive chips expose pressed/selected state. Technologies may be a compact text line. |
| Inputs | Persistent visible label, surface fill, border-control outline, 16px entry text, min 44px height; textarea resizes vertically. Hint and error associated programmatically. Placeholder never replaces label. Invalid state includes text, not just red. |
| Navigation | Retain current destinations, locale switch and theme control. Active route has text/underline plus `aria-current`. Mobile menu has named toggle, expanded state and keyboard access. No compressed desktop menu with unreadable labels. |
| Project card/row | Project title, evidence-based summary, professional/independent/experiment context when known, small technology line and actual available links. Default to readable horizontal modules; stack actions under text on narrow screens. No invented preview image or delivery status. |
| Case-study panel | Labeled context, constraint, decision or limitation. Use a definition list or plain prose where simpler. Link evidence beside the claim. Do not turn every paragraph into a card or require a metric block. |
| System visual | Labeled nodes and meaningful connections, caption and adjacent text equivalent. Use surface plus system accent sparingly. Group known boundaries; explain arrow semantics. Screenshots retain readable aspect ratio and useful alt/caption. |
| Assistant panel | Same surfaces, typography, inputs, buttons and source links. Question, concise answer, sources and next actions form a clear reading order. Distinguish generated response from documented evidence using labels, not glowing AI chrome. |

All actionable components need default, hover, focus-visible, active and disabled states where applicable. Async components additionally need loading, empty, error and successful result states. Hover changes color/border, not geometry; focus uses a 2px accent outline with 2px surface-aware offset. Loading retains a meaningful label and stable dimensions. Do not display fake progress or disable unrelated navigation.

## Motion and accessibility acceptance

Use 120–180ms color/border transitions and at most 200ms short panel opacity/translation transitions (4px maximum). No scroll hijacking, parallax, continuous ornament, delayed text reveal or card tilt. Under `prefers-reduced-motion: reduce`, remove movement and smooth scrolling; retain immediate state feedback. Loading text must work without a spinning indicator.

Implementation acceptance targets: normal text 4.5:1, large text 3:1, essential control boundaries/state indicators 3:1 against adjacent colors. Check both themes and all states; muted borders are decorative only. Links and errors cannot rely on color alone. Keyboard focus must remain visible and unobscured. Announce async status politely without reading the whole transcript repeatedly; do not move focus unexpectedly.

Check 320px, 390px, 768px and 1440px widths, 200% text zoom and reflow at 400% zoom on a 1280px viewport. Test EN/DE/RU, especially expanded labels, headings and source names. No clipped text, fixed-height prose, hidden controls or page-level horizontal scrolling. Touch, keyboard and pointer users must reach the same content.

## Implementation boundary

Milestone 4B applies tokens/shared shell and homepage composition only. Work, case-study and assistant blueprints remain future composition targets; global style inheritance is expected and must be reviewed. No new dependency, route, provider, content schema or font package is required. Preserve content evidence and both locale mirrors; implementation must follow [Localization contract](../i18n-content.md).
