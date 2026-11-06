import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/shared/i18n/routing";
import { githubUrl, telegramUrl } from "@/shared/lib/site";

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
      <article className="mt-12 max-w-xl rounded-3xl border border-line p-6">
        <p className="text-xs tracking-[0.18em] text-accent uppercase">
          {t("about.study")}
        </p>
        <p className="mt-4 text-lg leading-8">{t("about.education")}</p>
      </article>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <ContactLink
          href={githubUrl}
          label={t("links.github")}
          host="github.com/Leladatan"
        />
        <ContactLink
          href={telegramUrl}
          label={t("links.telegram")}
          host="t.me/leladatan"
        />
      </div>
    </main>
  );
}

function ContactLink({
  href,
  label,
  host,
}: {
  href: string;
  label: string;
  host: string;
}) {
  return (
    <a
      href={href}
      rel="noreferrer"
      className="group flex items-end justify-between gap-4 rounded-3xl border border-line px-6 py-6 transition-colors hover:border-accent hover:bg-accent/10"
    >
      <span className="font-display text-3xl tracking-tight">{label}</span>
      <span className="pb-1 text-sm text-muted transition-transform group-hover:translate-x-1">
        {host}
      </span>
    </a>
  );
}
