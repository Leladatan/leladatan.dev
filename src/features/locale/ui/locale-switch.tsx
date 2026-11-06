import Link from "next/link";
import type { Locale } from "@/shared/i18n/routing";
import { withLocale } from "@/shared/i18n/with-locale";

export function LocaleSwitch({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}) {
  return (
    <div className="flex items-center gap-1 text-xs tracking-[0.14em]">
      {(["ru", "en"] as const).map((item) => {
        const current = item === locale;
        return (
          <Link
            key={item}
            href={withLocale(path, item)}
            hrefLang={item}
            aria-current={current ? "true" : undefined}
            className={current ? "text-current" : "text-current/45"}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
