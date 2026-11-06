import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { fontVariables } from "@/shared/fonts/fonts";
import { routing } from "@/shared/i18n/routing";
import { githubUrl, siteUrl, telegramUrl } from "@/shared/lib/site";
import { ThemeScript } from "@/shared/theme/theme-script";
import { Providers } from "@/shared/ui/providers";
import { Footer } from "@/widgets/footer/ui/footer";
import { Header } from "@/widgets/header/ui/header";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: "leladatan", template: "%s · leladatan" },
    description: t("description"),
    openGraph: {
      title: "leladatan",
      description: t("description"),
      locale: locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
      siteName: "leladatan",
    },
    robots: { index: true, follow: true },
    twitter: {
      card: "summary_large_image",
      title: "leladatan",
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });
  const origin = siteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "leladatan",
        url: origin,
        inLanguage: ["ru", "en"],
      },
      {
        "@type": "Person",
        name: locale === "ru" ? "Владимир" : "Vladimir",
        alternateName: "leladatan",
        url: origin,
        sameAs: [githubUrl, telegramUrl],
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-bg text-ink">
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <ThemeScript />
        <Providers>
          <Header
            locale={locale}
            work={t("nav.work")}
            about={t("nav.about")}
            menu={t("nav.menu")}
            close={t("nav.close")}
            toLight={t("theme.toLight")}
            toDark={t("theme.toDark")}
          />
          {children}
          <Footer
            note={t("footer.note")}
            github={t("links.github")}
            telegram={t("links.telegram")}
          />
        </Providers>
      </body>
    </html>
  );
}
