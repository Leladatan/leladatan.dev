import { type Locale, routing } from "./routing";

export function withLocale(pathname: string, locale: Locale) {
  const pattern = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);
  const stripped = pathname.replace(pattern, "") || "/";
  const suffix = stripped === "/" ? "" : stripped;
  return `/${locale}${suffix}`;
}
