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
