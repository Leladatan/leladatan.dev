import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { getWork, works } from "@/entities/work/model/works";
import type { Locale } from "@/shared/i18n/routing";

export async function WorkCasePage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  setRequestLocale(locale);
  const work = getWork(slug);
  if (!work) notFound();
  const t = await getTranslations({ locale });
  const index = String(
    works.findIndex((item) => item.slug === slug) + 1,
  ).padStart(2, "0");

  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">
        <span className="text-accent">{index}</span>
        <span className="px-2 text-line">/</span>
        {t("works.kicker")}
      </p>
      <h1 className="mt-3 font-display text-4xl leading-none tracking-tight md:text-5xl">
        {work.title[locale]}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        {work.summary[locale]}
      </p>
      <dl className="mt-10 divide-y divide-line border-y border-line">
        <Field label={t("case.task")}>{work.task[locale]}</Field>
        <Field label={t("case.done")}>{work.done[locale]}</Field>
        <Field label={t("case.year")}>{work.year}</Field>
        <Field label={t("case.stack")}>
          <ul className="flex flex-wrap gap-1.5">
            {work.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-line px-2 py-1 text-xs leading-4"
              >
                {item}
              </li>
            ))}
          </ul>
        </Field>
        {work.links.demo || work.links.github ? (
          <Field label={t("case.links")}>
            <ul className="grid gap-3">
              {work.links.demo ? (
                <li>
                  <OutsideLink href={work.links.demo} label={t("case.site")} />
                </li>
              ) : null}
              {work.links.github ? (
                <li>
                  <OutsideLink
                    href={work.links.github}
                    label={t("links.github")}
                  />
                </li>
              ) : null}
            </ul>
          </Field>
        ) : null}
      </dl>
    </main>
  );
}

function OutsideLink({ href, label }: { href: string; label: string }) {
  const text = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-block text-accent underline-offset-4 hover:underline"
    >
      <span className="text-xs tracking-[0.14em] uppercase">{label}</span>
      <span className="mt-1 block text-base leading-6 text-ink">{text}</span>
    </a>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-2 py-4 md:grid-cols-[8.5rem_1fr] md:items-baseline md:gap-6">
      <dt className="text-xs tracking-[0.14em] text-muted uppercase">
        {label}
      </dt>
      <dd className="text-base leading-7">{children}</dd>
    </div>
  );
}
