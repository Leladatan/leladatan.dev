import { getTranslations, setRequestLocale } from "next-intl/server";
import { fullStack } from "@/shared/content/stack";
import type { Locale } from "@/shared/i18n/routing";

export async function AboutPage({ locale }: { locale: Locale }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <p className="text-xs tracking-[0.22em] text-accent uppercase">
        {t("about.kicker")}
      </p>
      <h1 className="mt-4 font-display text-[clamp(3.6rem,11vw,7.5rem)] leading-none tracking-tight">
        {t("about.title")}
      </h1>
      <p className="mt-8 max-w-xl text-2xl leading-9 md:ml-auto">
        {t("about.lead")}
      </p>
      <div className="mt-14 max-w-3xl space-y-6 text-lg leading-8 text-muted">
        {t("about.body")
          .split("\n\n")
          .map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
      </div>
      <section className="mt-14">
        <p className="text-xs tracking-[0.18em] text-accent uppercase">
          {t("about.study")}
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-line p-6">
            <p className="font-display text-3xl leading-none tracking-tight">
              {t("about.vocational")}
            </p>
            <p className="mt-3 text-muted">{t("about.vocationalDetail")}</p>
          </article>
          <article className="rounded-3xl border border-line p-6">
            <p className="font-display text-3xl leading-none tracking-tight">
              {t("about.higher")}
            </p>
            <p className="mt-3 text-muted">{t("about.higherDetail")}</p>
          </article>
        </div>
      </section>
      <section className="mt-12 rounded-3xl border border-line p-6">
        <p className="text-xs tracking-[0.18em] text-accent uppercase">
          {t("stack.kicker")}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {fullStack.map((item) => (
            <li
              key={item}
              className="inline-flex items-center rounded-full border border-line bg-[color-mix(in_srgb,var(--ink)_16%,var(--bg))] px-4 py-2 text-sm text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--ink)_24%,var(--bg))]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
