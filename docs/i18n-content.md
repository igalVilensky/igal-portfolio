# Localized Structured Content

Structured portfolio content may use either a plain verified English string or a localized object:

```json
{
  "en": "Verified English content",
  "de": "",
  "ru": ""
}
```

Use `getLocalizedValue(value, locale)` when reading trusted structured content. Missing or empty translations fall back to English, and the app must not generate translations at runtime or show placeholder text.

## Public UI coverage (Milestone 3.1)

`i18n/i18n.config.ts` loads `i18n/locales/{en,de,ru}.json`. Keep the existing `app/i18n/locales/` mirrors synchronized. Public prose, labels, placeholders, accessibility labels, states and metadata belong in these catalogs; brands, technology names, URLs, API enum values and code examples may remain literal.

Project `title` supports the existing string/localized-object union. Public `category` and `short_description` now have all three translations in `content/projects.json`. Home, Work, Experiments and AI use `getLocalizedValue` through reactive computations. Do not translate API identifiers or duplicate the project records in locale catalogs. Non-rendered knowledge prose remains source material for the assistant, whose prompt requests the selected response language.

`content/source-labels.json` localizes assistant evidence labels for skills, FAQs and role-fit records, keyed by source type and stable ID. Project labels use the canonical project title. Keep the corresponding generated exports in `netlify/functions/lib/portfolioKnowledge.js` synchronized. Server-side retrieval normalizes localized project fields to English; response labels and provider language remain locale-aware.

Use `computed` for translated arrays and metadata. Store translation keys, not translated sentences, in local error/fallback state. Compliance API enum codes remain unchanged and are mapped to localized labels at display time. Generated prose and user-entered text are not silently translated when the locale changes; subsequent AI requests explicitly request the selected language.

Run both `npm run lint:i18n` and `npm run lint:i18n:public`. The second checks literal template text with a narrow technical allowlist, translation references, locale mirrors, structured translation coverage and generated-data synchronization. It does not replace review of script-generated strings or browser interaction tests.
