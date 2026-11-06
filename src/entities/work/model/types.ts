import type { Locale } from "@/shared/i18n/routing";

export type WorkCopy = Record<Locale, string>;

export type Work = {
  slug: string;
  year: string;
  type: "commercial" | "public";
  draft: boolean;
  companyUrl?: string;
  title: WorkCopy;
  summary: WorkCopy;
  task: WorkCopy;
  done: WorkCopy;
  stack: readonly string[];
  links: {
    demo?: string;
    github?: string;
  };
  media: readonly string[];
};
