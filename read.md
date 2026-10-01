# Vite starter

Стартовая сборка для вёрстки: Vite, чистые HTML / JS, SCSS.

## Запуск

```
npm install
npm run dev      # дев-сервер
npm run build    # сборка в dist/
npm run preview  # посмотреть сборку
```

## Что внутри

- **Страницы.** `*.html` в корне проекта — сборка подхватывает их сама. Каждая подключает общий `src/main.js`
  и свой `src/pages/<имя>/<имя>.js` (секции и стили только этой страницы).
- **Модульность.** Секции — `src/sections/<имя>/` (`.html` + `.js` + `.scss`), мелкие компоненты — `src/components/`.
  В HTML подключаются тегом `<include src="src/sections/hero/hero.html"></include>` (путь от корня проекта, вложенность поддерживается).
  Стили секции импортирует её `.js`, сам `.js` — `src/main.js` (если секция на всех страницах) или js страницы.
- **Иконки.** SVG кладутся в `src/assets/icons/`, вставляются `<icon name="burger-menu" class="..."></icon>` —
  при сборке превращаются в inline-svg. Одноцветные иконки сохранять с `fill="currentColor"` / `stroke="currentColor"`.
- **Картинки.** `src/assets/img/`, в HTML — путь от корня: `/src/assets/img/photo.webp`.
- **SCSS.** В каждом файле: `@use "@/styles/abstracts" as *;`
  - `@include media("lg") { ... }` — desktop-first, `max-width` (брейкпоинты в `_variables.scss`);
  - `fluid(32px, 60px)` — плавный размер через `clamp()` между 375 и 768px;
  - `@include hover { ... }` — hover только для мыши + фокус с клавиатуры;
  - `@include visually-hidden`.
- **Reset** поверх `normalize.css`, с нулевой специфичностью у списков (`:where`).
- **Шрифты.** Миксин `font-face` в `src/styles/base/_fonts.scss`, файлы — в `src/assets/fonts/`.

## Новая секция

1. Создать `src/sections/about/about.html`, `about.js` (`import './about.scss';`), `about.scss`.
2. В `index.html`: `<include src="src/sections/about/about.html"></include>`.
3. В `src/main.js`: `import './sections/about/about';` (или `initAbout()`, если есть логика).

## Деплой на GitHub Pages

В `vite.config.js` уже стоит `base: './'`. Раскомментировать в `build` строки `outDir: 'docs'` и `emptyOutDir: true`,
выполнить `npm run build`, закоммитить `docs/` и выбрать в Settings → Pages ветку `main` и папку `/docs`.
