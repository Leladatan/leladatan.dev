import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { works } from "@/entities/work/model/works";
import { jobStack, repoStack, siteStack } from "@/shared/content/stack";
import type { Locale } from "@/shared/i18n/routing";
import { Hero } from "@/widgets/hero/ui/hero";
import { StackSection } from "@/widgets/stack/ui/stack-section";
import { WorkSection } from "@/widgets/work-list/ui/work-section";

export async function HomePage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <Hero
        role={t("hero.role")}
        scrollLabel={t("hero.scroll")}
      />
      <WorkSection
        locale={locale}
        kicker={t("works.kicker")}
        title={t("works.title")}
        items={works.map((work) => ({
          slug: work.slug,
          title: work.title[locale],
          summary: work.summary[locale],
          stack: work.stack,
        }))}
      />
      <StackSection
        kicker={t("stack.kicker")}
        siteLabel={t("stack.site")}
        jobLabel={t("stack.job")}
        repoLabel={t("stack.repo")}
        site={siteStack}
        job={jobStack}
        repo={repoStack}
      />
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs tracking-[0.22em] text-accent uppercase">
          {t("about.kicker")}
        </p>
        <h2 className="mt-3 font-display text-5xl">{t("about.title")}</h2>
        <p className="mt-6 max-w-2xl text-lg leading-8">{t("about.teaser")}</p>
        <Link
          href={`/${locale}/about`}
          className="mt-8 inline-block text-sm text-accent"
        >
          {t("about.more")}
        </Link>
      </section>
    </>
  );
}
