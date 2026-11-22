# Бесплатный хостинг

Сайт полностью статический: `npm run build` собирает папку `out/`. Домен не
обязателен — у бесплатных хостингов есть свой поддомен.

## Вариант 1: GitHub Pages (без домена)

Репозиторий: **https://github.com/Yakutc/vydoh**
Сайт: **https://yakutc.github.io/vydoh/**

Всё уже настроено. Обновление одной командой:

```bash
node scripts/deploy-gh-pages.mjs
```

Скрипт:
1. собирает сайт с `NEXT_PUBLIC_SITE_URL=https://yakutc.github.io/vydoh` и
   `NEXT_PUBLIC_BASE_PATH=/vydoh`;
2. добавляет `.nojekyll`;
3. пушит готовый `out/` в ветку `gh-pages`.

В GitHub: **Settings → Pages → Source: Deploy from a branch → gh-pages / (root)**.
После первого пуша это можно сделать один раз вручную (или через API).

Почему `NEXT_PUBLIC_BASE_PATH=/vydoh`: проект живёт по адресу
`/<repo>/`, и все ассеты (`/_next`, иконки, OG) должны получить этот префикс.
Для Cloudflare Pages и своего домена base path пустой.

Проверка локально (без base path):

```bash
npm run build
npm start        # http://localhost:3100
```

## Вариант 2: Cloudflare Pages

Бесплатно, коммерческое использование разрешено, неограниченный трафик, можно
подключить свой домен.

- Build command: `npm run build`
- Output directory: `out`
- Environment: `NEXT_PUBLIC_SITE_URL=https://твой-проект.pages.dev`
- `NEXT_PUBLIC_BASE_PATH` оставить пустым.

Через GitHub: Cloudflare Dashboard → Workers & Pages → Create → Pages →
Connect to Git → репозиторий `Yakutc/vydoh` → указать команды выше.

Или CLI:

```bash
npm i -g wrangler
wrangler login
npm run build
wrangler pages deploy out --project-name vydoh
```

## Свой домен (опционально)

Домен не нужен для запуска. Если появится:

1. Купи на Reg.ru / Beget / Timeweb (`.ru` — примерно 200–500 ₽/год).
2. Для GitHub Pages: Settings → Pages → Custom domain → впиши домен; у
   регистратора добавь CNAME `www` → `yakutc.github.io` и A-записи GitHub Pages
   для апекса. HTTPS включится сам.
3. Для Cloudflare Pages: переведи DNS на Cloudflare и добавь Custom domain.
4. После смены домена обнови `NEXT_PUBLIC_SITE_URL` и пересобери — от него
   зависят canonical, OG и sitemap.

## Что важно знать

- **Оплата.** Статический хостинг не принимает платежи. Сейчас кнопки тарифов
  открывают письмо. Для денег подключи платёжную ссылку ЮKassa / CloudPayments
  (или Stripe для мира) — её можно вставить в кнопку без сервера. Личный кабинет
  и подписки позже потребуют serverless-функций или VPS.
- **Почта.** Стоит `askfncs@gmail.com`, форма открывает почтовый клиент через
  `mailto:`. Для рассылки подключи Unisender / Sendsay / Mailchimp.
- **OG-картинка.** Статическая `src/app/opengraph-image.png` (1200×630). При
  смене заголовка перегенерируй её.
- **Аналитика.** Добавь Яндекс.Метрику и GA4; события: `cta_click`,
  `calculator_mode`, `calculator_change`, `craving_open`, `price_click`.
