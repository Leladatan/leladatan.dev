import type { Locale } from "@/shared/i18n/routing";

export const githubUrl = "https://github.com/Leladatan";
export const telegramUrl = "https://t.me/leladatan";
export const companyUrl = "https://alphamatica.ru/";

export function siteUrl() {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function pageAlternates(locale: Locale, path = "") {
  const suffix = path ? `/${path.replace(/^\//, "")}` : "";
  return {
    canonical: `/${locale}${suffix}`,
    languages: {
      ru: `/ru${suffix}`,
      en: `/en${suffix}`,
      "x-default": `/ru${suffix}`,
    },
  };
}
