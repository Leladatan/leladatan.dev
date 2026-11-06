import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { getWork, works } from "@/entities/work/model/works";
import { routing } from "@/shared/i18n/routing";
import { pageAlternates } from "@/shared/lib/site";
import { WorkCasePage } from "@/views/work/ui/work-case-page";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    works.map((work) => ({ locale, slug: work.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.title[locale],
    description: work.summary[locale],
    alternates: pageAlternates(locale, `work/${slug}`),
  };
}

export default function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  return (
    <Suspense fallback={<CaseFallback />}>
      <CaseContent params={params} />
    </Suspense>
  );
}

async function CaseContent({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <WorkCasePage locale={locale} slug={slug} />;
}

function CaseFallback() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-28 pb-24" aria-hidden>
      <div className="h-3 w-24 rounded bg-line" />
      <div className="mt-4 h-10 w-2/3 rounded-md bg-line" />
      <div className="mt-4 h-12 rounded-md bg-line" />
      <div className="mt-10 h-40 border-y border-line" />
    </main>
  );
}
