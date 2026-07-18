export type LocaleCode = "en" | "de" | "ru";
export type LocalizedValue = string | Partial<Record<LocaleCode, string>>;

const DEFAULT_LOCALE: LocaleCode = "en";

export const isLocaleCode = (value: unknown): value is LocaleCode =>
  value === "en" || value === "de" || value === "ru";

export const getLocalizedValue = (
  value: LocalizedValue | null | undefined,
  locale: string,
  fallbackLocale: LocaleCode = DEFAULT_LOCALE,
) => {
  if (!value) return "";
  if (typeof value === "string") return value;

  const safeLocale = isLocaleCode(locale) ? locale : fallbackLocale;
  return value[safeLocale] || value[fallbackLocale] || "";
};
