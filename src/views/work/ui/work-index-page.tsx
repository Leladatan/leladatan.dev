import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { works } from "@/entities/work/model/works";
import { StackPlate } from "@/entities/work/ui/stack-plate";
import type { Locale } from "@/shared/i18n/routing";

export async function WorkIndexPage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto max-w-6xl px-6 pt-28 pb-24">
      <p className="text-xs tracking-[0.22em] text-accent uppercase">
        {t("works.kicker")}
      </p>
      <h1 className="mt-3 font-display text-5xl md:text-7xl">
        {t("works.title")}
      </h1>
      <ul className="mt-14 grid gap-6">
        {works.map((work, index) => (
          <li key={work.slug}>
            <Link
              href={`/${locale}/work/${work.slug}`}
              className="block rounded-3xl border border-line p-6 transition-colors hover:border-accent/50 md:p-8"
            >
              <span className="font-display text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-none md:text-5xl">
                {work.title[locale]}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                {work.summary[locale]}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <article className="rounded-2xl border border-line p-5">
                  <p className="text-xs tracking-[0.18em] text-accent uppercase">
                    {t("case.task")}
                  </p>
                  <p className="mt-3 leading-7">{work.task[locale]}</p>
                </article>
                <article className="rounded-2xl border border-line p-5">
                  <p className="text-xs tracking-[0.18em] text-accent uppercase">
                    {t("case.done")}
                  </p>
                  <p className="mt-3 leading-7">{work.done[locale]}</p>
                </article>
              </div>
              <div className="mt-4">
                <p className="mb-3 text-xs tracking-[0.18em] text-accent uppercase">
                  {t("case.stack")}
                </p>
                <StackPlate
                  stack={work.stack}
                  className="grid-cols-2 sm:grid-cols-3"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
