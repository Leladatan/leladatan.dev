import type { MetadataRoute } from "next";
import { works } from "@/entities/work/model/works";
import { routing } from "@/shared/i18n/routing";
import { siteUrl } from "@/shared/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    "/about",
    ...works.map((work) => `/work/${work.slug}`),
  ];
  const origin = siteUrl();

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${origin}/${locale}${path}`,
      alternates: {
        languages: {
          ru: `${origin}/ru${path}`,
          en: `${origin}/en${path}`,
        },
      },
    })),
  );
}
