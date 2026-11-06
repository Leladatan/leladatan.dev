export const messages = {
  ru: {
    meta: {
      description: "Владимир, frontend. Работы на React и TypeScript.",
    },
    nav: {
      work: "Работы",
      about: "Обо мне",
      menu: "Меню",
      close: "Закрыть",
    },
    hero: {
      role: "Frontend · React / TypeScript",
      scroll: "Дальше — работы",
    },
    works: {
      kicker: "Работы",
      title: "Что можно открыть",
    },
    stack: {
      kicker: "Стек",
      site: "На этом сайте",
      job: "В проектах",
      repo: "В репозитории",
    },
    about: {
      kicker: "Обо мне",
      title: "Владимир",
      lead: "Делаю интерфейсы на React и TypeScript.",
      teaser:
        "Экран — функция состояния. Доски, формы и длинные таблицы на React и TypeScript: одни и те же данные дают один и тот же интерфейс.",
      body: "Собираю интерфейсы, которыми пользуются в работе: списки, формы, доски и длинные таблицы. У экрана своё состояние, данные приходят с API, и им всё ещё должно быть удобно пользоваться, когда записей становится много.\n\nОдна работа — продукт, где доска, сроки и длинный список задач живут рядом. Другая — типовые экраны, которые собираются из конфигурации, а не верстаются каждый раз заново. Третья — десктоп: журнал и таблица, которые остаются отзывчивыми на большом объёме.\n\nФормы, валидация и запросы к серверу для меня часть самого экрана. TypeScript держит это в одном виде: что пришло с API, что ввёл человек и что можно показать.",
      study: "Учёба",
      education: "Среднее специальное, веб-разработчик. Высшее.",
      more: "Подробнее",
    },
    case: {
      task: "Задача",
      done: "Что сделано",
      stack: "Стек",
      year: "Год",
    },
    notFound: {
      title: "Такой страницы нет",
      body: "Ссылка устарела или адрес набран с ошибкой.",
      home: "На главную",
    },
    footer: {
      note: "Сайт с работами",
    },
    theme: {
      toLight: "Включить светлую тему",
      toDark: "Включить тёмную тему",
    },
    links: {
      github: "GitHub",
      telegram: "Telegram",
    },
  },
  en: {
    meta: {
      description:
        "Vladimir, a frontend developer. Work in React and TypeScript.",
    },
    nav: {
      work: "Work",
      about: "About",
      menu: "Menu",
      close: "Close",
    },
    hero: {
      role: "Frontend · React / TypeScript",
      scroll: "Work is below",
    },
    works: {
      kicker: "Work",
      title: "What you can open",
    },
    stack: {
      kicker: "Stack",
      site: "On this site",
      job: "In projects",
      repo: "In the repository",
    },
    about: {
      kicker: "About",
      title: "Vladimir",
      lead: "I build interfaces in React and TypeScript.",
      teaser:
        "A screen is a function of state. Boards, forms, and long tables in React and TypeScript: the same data produces the same interface.",
      body: "I build interfaces people use for work: lists, forms, boards, and long tables. A screen keeps its own state, the data comes from an API, and it still has to stay usable when there are a lot of rows.\n\nOne piece of work is a product where a board, a schedule, and a long task list sit together. Another is typical screens assembled from configuration, rather than laid out by hand each time. A third is a desktop app: a log and a table that stay responsive when the data gets long.\n\nForms, validation, and requests to the server are part of the screen itself for me. TypeScript keeps that in one shape: what the API returned, what a person typed, and what the screen can show.",
      study: "Study",
      education: "Vocational qualification, web developer. Higher education.",
      more: "More",
    },
    case: {
      task: "Task",
      done: "What was built",
      stack: "Stack",
      year: "Year",
    },
    notFound: {
      title: "This page is not here",
      body: "The link is old, or the address has a typo.",
      home: "Back home",
    },
    footer: {
      note: "A site for the work",
    },
    theme: {
      toLight: "Switch to light theme",
      toDark: "Switch to dark theme",
    },
    links: {
      github: "GitHub",
      telegram: "Telegram",
    },
  },
} as const;

export type Messages = (typeof messages)["ru"];
