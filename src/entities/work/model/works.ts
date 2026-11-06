import { companyUrl } from "@/shared/lib/site";
import type { Work } from "./types";

function workLinks(links: Work["links"] = {}): Work["links"] {
  return links;
}

export const works = [
  {
    slug: "task-manager",
    year: "2023",
    type: "commercial",
    draft: true,
    companyUrl,
    title: { ru: "Таск-менеджер", en: "Task manager" },
    summary: {
      ru: "Канбан, диаграмма Ганта, длинные списки и поиск по проектам.",
      en: "Kanban, a Gantt chart, long task lists, and project search.",
    },
    task: {
      ru: "Собрать интерфейс, в котором доска, сроки и длинный список задач живут в одном продукте.",
      en: "Build one product surface where the board, the schedule, and a long task list live together.",
    },
    done: {
      ru: "Экраны канбана и Ганта, списки задач и поиск по проектам.",
      en: "Kanban and Gantt screens, task lists, and project search.",
    },
    stack: [
      "TypeScript",
      "React",
      "TanStack Query",
      "Zustand",
      "React Hook Form",
      "Zod",
    ],
    links: workLinks(),
    media: [],
  },
  {
    slug: "screen-constructor",
    year: "2023",
    type: "commercial",
    draft: true,
    companyUrl,
    title: { ru: "Конструктор экранов", en: "Screen constructor" },
    summary: {
      ru: "Типовые экраны терминалов, чеков и табло собираются из конфигурации.",
      en: "Typical screens for terminals, receipts, and boards come from configuration.",
    },
    task: {
      ru: "Перестать верстать каждый типовой экран вручную.",
      en: "Stop hand-building every typical screen.",
    },
    done: {
      ru: "Динамические блоки на JSON Schema, условия показа, формы и валидация.",
      en: "Dynamic JSON Schema blocks, visibility conditions, forms, and validation.",
    },
    stack: ["TypeScript", "React", "JSON Schema", "React Hook Form", "Zod"],
    links: workLinks(),
    media: [],
  },
  {
    slug: "access-desktop",
    year: "2023",
    type: "commercial",
    draft: true,
    companyUrl,
    title: { ru: "Контроль доступа", en: "Access desktop" },
    summary: {
      ru: "Десктоп на Electron: журнал на КПП и длинные таблицы.",
      en: "An Electron desktop app: a checkpoint log and long tables.",
    },
    task: {
      ru: "Журнал прохода, который остаётся отзывчивым на длинной таблице.",
      en: "A checkpoint log that stays responsive when the table gets long.",
    },
    done: {
      ru: "Десктоп на Electron: журнал, виртуализация длинных таблиц, интерфейс рядом со сканерами документов и RFID.",
      en: "An Electron desktop app with the log, virtualized tables, and UI next to document scanners and RFID readers.",
    },
    stack: ["TypeScript", "React", "Electron"],
    links: workLinks(),
    media: [],
  },
  {
    slug: "dream-anime",
    year: "2025",
    type: "public",
    draft: false,
    title: { ru: "Dream Anime", en: "Dream Anime" },
    summary: {
      ru: "Публичная одностраничная витрина на Next.js: видео на первом экране, заголовки по скроллу и карточки, которые наклоняются за курсором.",
      en: "A public one-page site in Next.js: a video hero, titles tied to scroll, and cards that tilt toward the pointer.",
    },
    task: {
      ru: "Собрать открытый сайт с живой страницей: движение на GSAP и раскладка по FSD.",
      en: "Build a public site with a live page: GSAP motion and an FSD layout.",
    },
    done: {
      ru: "Одна страница: шапка, первый экран из четырёх видео со сменой по клику и обрезкой кадра по скроллу, заголовки по словам, блок о проекте, карточки функций с наклоном, кадр истории, который поворачивается за указателем, контакты и подвал. Сборка на Next.js 15, React, TypeScript, Tailwind CSS и Sass. Форматирование через Biome. Страница открыта на Vercel, код на GitHub.",
      en: "One page: a header, a hero of four videos that swap on click and crop on scroll, word-by-word titles, an about block, feature cards that tilt, a story frame that turns toward the pointer, a contact block, and a footer. Built with Next.js 15, React, TypeScript, Tailwind CSS, and Sass. Formatting runs through Biome. The page is on Vercel, and the code is on GitHub.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Sass",
      "GSAP",
      "FSD",
      "Biome",
    ],
    links: workLinks({
      demo: "https://dream-anime-frontend.vercel.app",
      github: "https://github.com/Leladatan/dream-anime-frontend",
    }),
    media: [],
  },
] as const satisfies readonly Work[];

export type WorkSlug = (typeof works)[number]["slug"];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

const inventedMetric = /\d+\s*%|в\s+\d+\s+раз|x\s*\d+/i;

export function workCopyHasInventedMetrics(work: Work) {
  const text = [
    work.summary.ru,
    work.summary.en,
    work.task.ru,
    work.task.en,
    work.done.ru,
    work.done.en,
  ].join("\n");
  return inventedMetric.test(text);
}
