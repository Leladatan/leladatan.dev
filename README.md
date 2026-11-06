# leladatan.dev

Стенд работ: frontend, React и TypeScript. Два языка, две темы, 3D на первом экране.

Кейсы лежат в `src/entities/work/model/works.ts`. Картинки потом кладутся в `public/work/<slug>/` и добавляются в поле `media`.

## Команды

```bash
pnpm dev
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
pnpm storybook
```

Шрифты Geist и Syne лежат в репозитории, лицензия OFL. Сборка не ходит за ними на чужой CDN.

Сначала сайт открывается на адресе Vercel. Домен `leladatan.dev` подключается отдельно: в DNS одна запись на проект, сертификат выпускает Vercel.
