# Milestone 3.1 — Public localization audit

## Findings and fixes

| Area | Untranslated or non-reactive content found | Resolution |
| --- | --- | --- |
| Home | Structured project summaries/categories and location remained English | Canonical project localized values and translated location |
| Navigation and footer | Footer accessibility label and email label; some internal links lost locale | Localized footer labels and locale-aware page links; downloadable files retain their actual paths |
| Work and Experiments | Headings, introductions, link labels, metadata; separate English project list | Shared canonical localized project fields, reactive lists, translated copy and SEO |
| Professional case studies | All explanatory prose, headings, roles, outcomes, back links and metadata | EN/DE/RU catalogs; historical dates and claims preserved |
| AI & Automation | Section labels, project explanations, demonstrated approaches, patterns, course topics and links | Reactive translated content and canonical localized project titles |
| About, Contact, Education | Secondary links, contact labels, location, curriculum label; setup-time metadata | Translated labels and reactive arrays/metadata |
| JSON to TypeScript | Input labels, presets, empty state, copy feedback, invalid-JSON error | Localized display labels; code identifiers stay literal. Pure computed conversion/error state fixes unreliable invalid-input rendering |
| Contrast checker | Preview text, threshold labels, pass/fail results and guidance | Reactive translations for all results |
| System Design Sketcher | Form, constraints, loading/reset labels and error output; no explicit output language | Localized state and errors; prompt requests selected language, including generated headings |
| Security Playground | Safety guidance, all four demos, placeholders, conditional results and screen-reader headings | Translated prose, including interpolated SQL result; simulated code remains unchanged |
| AI Compliance Compass | Form, raw enum values, clarification questions/options, loading/errors, default and failure reports, disclaimer and metadata | Stable API codes mapped to localized labels; fallback state stores keys; free-text provider output explicitly requests selected language |
| Ask Igal | Runtime suggestions differed from UI translations; skill/FAQ/role evidence labels remained English; Netlify catch defaulted to English | Synchronized localized suggestions, structured source labels, locale-preserving catch; existing translated voice/loading/error UI retained |

## Files and content contracts

Changes cover the relevant `app/pages/`, `app/components/`, `app/composables/useProjects.ts`, both locale directories, `content/projects.json`, new `content/source-labels.json`, both portfolio assistant runtimes, and the generated Netlify knowledge snapshot. `package.json` adds `lint:i18n:public`; no dependencies were added.

Project records are not duplicated per locale. Public title/category/summary fields use the existing localized-object pattern. The legacy project composable retains its technical metadata while resolving public summaries, titles and categories from canonical content. Non-rendered knowledge prose remains evidence for the language-instructed model rather than appearing directly in English in the UI.

Technical terms, company and product names, URLs, JSON keys, enum codes and code examples are intentionally preserved. UI translations are reactive. Previously generated prose and user-entered text are not automatically translated; new AI requests use the selected locale.

## Verification

- Existing locale key/placeholder check and new public-template/content audit pass.
- The new audit covers 38 Vue components, literal template text, referenced translation keys, locale mirrors, structured translation coverage and generated-data synchronization. Script-generated states still need browser checks.
- Production build passes; all 39 public route/language combinations return HTTP 200. Rendered content was compared across languages; remaining identical text is technical content or names.
- Offline Netlify handler checks pass for EN/DE/RU fallback answers, localized suggestions and validation errors. No live provider call was made.
- Chrome dynamic checks passed in EN/DE/RU for JSON validation/empty/copy states, sketch loading and request language, compliance clarification/failure fallbacks, XSS/SQL states, and assistant loading/fallback. Requests were mocked at the provider boundary.
- EN/DE/RU switching passed at 1440px and 390px without a document reload, including updated visible tool labels and document language.
- The 390px sweep rendered all 39 localized pages without unresolved keys or horizontal overflow. It did not pass the zero-JavaScript-error assertion: intermittent layout-chunk loads failed. A diagnostic rerun identified Chrome `net::ERR_INSUFFICIENT_RESOURCES` and ended in a page crash; further browser runs were stopped to avoid memory pressure. Full error-free browser coverage of every page remains unverified; the successful targeted interaction checks and HTTP/SSR results above are separate evidence.

## Scope boundaries

No UI redesign, project removal, route migration, dependency addition, new provider, confidential employer detail, commit or push. Assistant purpose/knowledge-policy changes remain Milestone 4. Downloadable document translation/currency is not established by this UI audit. Real model output quality and browser speech-recognition services require live integration testing beyond the mocked-provider checks.
