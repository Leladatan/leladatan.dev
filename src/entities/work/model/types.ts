import type { Locale } from "@/shared/i18n/routing";

export type WorkCopy = Record<Locale, string>;

export type Work = {
  slug: string;
  year: string;
  type: "commercial";
  draft: true;
  companyUrl: string;
  title: WorkCopy;
  summary: WorkCopy;
  task: WorkCopy;
  done: WorkCopy;
  stack: string[];
  links: {
    demo?: string;
    github?: string;
  };
  media: [];
};
