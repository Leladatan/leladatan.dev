import { getLocale, getTranslations } from "next-intl/server";
import { isLocale } from "@/shared/i18n/routing";
import { NotFoundView } from "@/views/not-found/ui/not-found-view";

export default async function NotFound() {
  const localeValue = await getLocale();
  const locale = isLocale(localeValue) ? localeValue : "ru";
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <NotFoundView
      title={t("title")}
      body={t("body")}
      home={t("home")}
      href={`/${locale}`}
    />
  );
}
