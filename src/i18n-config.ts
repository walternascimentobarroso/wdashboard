export const i18n = {
  defaultLocale: "pt",
  locales: ["pt", "es", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
