# Onliner UI Autotests

Production-oriented UI automation framework для проверки главной страницы `https://www.onliner.by/` на базе `Playwright` и `JavaScript (CommonJS)`.

Проект оформлен как минимальный, но поддерживаемый AQA-контур: с фиксированным стеком, quality gates, CI и разделением ответственности между тестами, page object и утилитами.

## Что покрывает проект

- открытие главной страницы
- проверку заголовка страницы
- видимость шапки и логотипа
- проверку навигации
- проверку строки поиска
- проверку ссылок на ключевые разделы
- проверку основного контентного блока
- проверку футера

Источник ручных кейсов: `tetsCases/onliner-homepage-test-cases.md`.

## Технологический стек

### Основные библиотеки

- `@playwright/test` `1.59.1` — UI/API automation framework, runner, assertions, fixtures, reporters
- `allure-playwright` `3.7.1` — интеграция Allure-репортинга с Playwright
- `allure-commandline` `2.38.1` — генерация статического Allure HTML-отчета
- `eslint` `10.2.0` — статический анализ кода
- `eslint-plugin-playwright` `2.10.1` — best practices и правила для Playwright-тестов
- `prettier` `3.8.3` — единое форматирование кода

### Инструменты и окружение

- `Node.js` LTS
- `npm` для управления зависимостями и скриптами
- `GitHub Actions` для CI
- `Chromium`/`Google Chrome` для локального и CI запуска

## Архитектура проекта

Проект следует практикам `KISS`, `DRY`, `SOLID`, `YAGNI`:

- проверки остаются в тестах
- page object содержит только элементы и действия
- общие преобразования и проверки вынесены в утилиты
- CI и quality gates отделены от тестовой логики

## Структура проекта

- `tests/` — test specs, пользовательские E2E/UI сценарии
- `pages/` — page objects и селекторы страниц
- `fixtures/` — расширения стандартных Playwright fixtures
- `utils/` — общие вспомогательные функции
- `docs/architecture/` — архитектурные правила и reference-документация для развития проекта
- `tetsCases/` — исходные ручные тест-кейсы
- `.github/workflows/` — CI workflow для GitHub Actions

### Ключевые файлы

- `package.json` — зависимости и npm-скрипты
- `package-lock.json` — lockfile для воспроизводимых установок
- `playwright.config.js` — конфигурация Playwright
- `eslint.config.js` — правила линтинга
- `.prettierrc.json` — настройки форматирования
- `.prettierignore` — исключения Prettier
- `.gitignore` — git-исключения
- `docs/architecture/test-automation-architecture.md` — архитектурный reference для разработки и рефакторинга
- `README.md` — документация по проекту

## Назначение основных папок

### `tests/`

Содержит тестовые сценарии верхнего уровня.  
Здесь должна находиться только бизнес-логика проверок и assertions, а не детали DOM-структуры страницы.

### `pages/`

Содержит page objects.  
Каждый page object инкапсулирует:

- стабильные локаторы
- операции над страницей
- получение структурированных данных для тестов

### `fixtures/`

Содержит кастомные Playwright fixtures, которые:

- уменьшают boilerplate в тестах
- централизуют создание page object
- упрощают масштабирование проекта

### `utils/`

Содержит небольшие независимые утилиты, например:

- работу с URL
- нормализацию текста
- общие вычисления, не относящиеся напрямую к DOM

### `tetsCases/`

Содержит исходные ручные тест-кейсы и выступает как traceability source между ручной и автоматизированной проверкой.

### `.github/workflows/`

Содержит CI-конвейер, который:

- устанавливает зависимости
- ставит браузеры Playwright
- запускает quality gates
- собирает `Allure`-отчет
- сохраняет `allure-report`, HTML report Playwright и `test-results` как артефакты
- публикует `Allure` в `GitHub Pages` при `push` в default branch

## Быстрый старт

### 1. Установка зависимостей

```bash
npm ci
```

### 2. Установка браузеров

```bash
npx playwright install --with-deps chromium
```

### 3. Запуск тестов

```bash
npm test
```

## Текущее состояние набора

В текущем состоянии репозитория набор содержит два намеренно падающих сценария для проверки диагностических артефактов:

- `TC-01` падает на assertion по URL в `tests/onliner-homepage.spec.js`
- `TC-06` падает на locator-ошибке, так как `searchInput` в `pages/home.page.js` указывает на заведомо отсутствующий элемент

Это сделано для проверки того, что локально и в CI корректно собираются отчеты и артефакты падения. Перед merge в основную ветку такие искусственные падения должны быть убраны.

## Основные сценарии запуска

### Полный локальный прогон

```bash
npm test
```

### Smoke-набор

```bash
npm run test:smoke
```

### Запуск в headed-режиме

```bash
npm run test:headed
```

### Запуск через Playwright UI

```bash
npm run test:ui
```

### Полный pre-push quality gate

```bash
npm run check
```

### Локальная сборка Allure-отчета

```bash
npm run report:allure
```

### Локальное открытие Allure-отчета

```bash
npm run report:allure:open
```

Важно: `allure-report/index.html` не стоит открывать напрямую через `file://`, потому что браузер может не подгрузить данные из `data/`. Для локального просмотра используйте `npm run report:allure:open` или любой локальный HTTP-сервер.

## NPM-скрипты

- `npm test` — полный запуск тестов
- `npm run test:smoke` — запуск smoke-сценариев
- `npm run test:headed` — запуск в headed-режиме
- `npm run test:ui` — интерактивный запуск через Playwright UI
- `npm run ci:test` — запуск, приближенный к CI-режиму
- `npm run check` — полный quality gate: `format:check` + `lint` + `ci:test`
- `npm run lint` — проверка ESLint
- `npm run lint:fix` — автоисправление ESLint, где возможно
- `npm run format` — форматирование кода
- `npm run format:check` — проверка форматирования без изменений
- `npm run report` — открытие HTML-отчета Playwright
- `npm run report:allure` — генерация статического Allure HTML-отчета из `allure-results`
- `npm run report:allure:open` — локальное открытие Allure-отчета

## Конфигурация и переменные окружения

Проект поддерживает `BASE_URL`:

```bash
BASE_URL=https://www.onliner.by npm test
```

По умолчанию используется значение из `playwright.config.js`.

Что еще важно:

- локально Playwright может использовать установленный `Google Chrome`, если он найден в стандартном пути
- в CI используется `Chromium`
- в CI включены `retries`
- `trace` сохраняется на падениях
- `screenshot` сохраняется только на падениях
- `video` сохраняется на падениях
- после запуска тестов формируются `test-results` и `allure-results`, из которых можно анализировать падение и собирать итоговые отчеты
- в `allure-results` могут появляться служебные `.md`-вложения с контекстом ошибки и рекомендациями по анализу фейла

## Quality Gates

Перед `push` рекомендуется всегда запускать:

```bash
npm run check
```

Этот сценарий проверяет:

- форматирование
- lint
- прохождение тестов

Это минимальный обязательный pre-push набор для стабильного прогона в `GitHub Actions`.

## CI

Workflow расположен в `.github/workflows/ui-tests.yml`.

Что делает pipeline:

1. checkout репозитория
2. setup Node.js
3. `npm ci`
4. `npx playwright install --with-deps chromium`
5. `npm run check`
6. `npm run report:allure` при наличии `allure-results`
7. upload артефактов (`allure-report`, `playwright-report`, `test-results`)
8. публикация `allure-report` в `GitHub Pages` при `push` в default branch

При падении тестов pipeline должен сохранять достаточно данных для разбора без повторного прогона:

- `test-results` с `trace`, `screenshot` и `video`, если они были собраны на падении
- `allure-results` как сырой источник для последующей генерации `allure-report`
- HTML-отчет Playwright
- markdown-вложения Allure с контекстом ошибки, если они сгенерированы интеграцией

Для публикации Pages в репозитории должен быть включен источник `GitHub Actions` в `Settings -> Pages`.

## Traceability

- TC-01 -> `tests/onliner-homepage.spec.js` (`главная страница открывается`)
- TC-02 -> `tests/onliner-homepage.spec.js` (`заголовок страницы содержит Onliner`)
- TC-03 -> `tests/onliner-homepage.spec.js` (`шапка сайта отображается`)
- TC-04 -> `tests/onliner-homepage.spec.js` (`логотип видим и ведет на главную`)
- TC-05 -> `tests/onliner-homepage.spec.js` (`в верхней навигации не менее 5 внутренних ссылок`)
- TC-06 -> `tests/onliner-homepage.spec.js` (`поле поиска видно и доступно для ввода`)
- TC-07 -> `tests/onliner-homepage.spec.js` (`ссылка на каталог присутствует и отдает успешный ответ`)
- TC-08 -> `tests/onliner-homepage.spec.js` (`ссылка на новости присутствует и отдает успешный ответ`)
- TC-09 -> `tests/onliner-homepage.spec.js` (`основной контентный блок отображается`)
- TC-10 -> `tests/onliner-homepage.spec.js` (`футер видим и содержит ссылки`)

## Подход к написанию тестов

- использовать максимально устойчивые селекторы и реальные стабильные блоки страницы
- не смешивать assertions и внутреннюю реализацию page object
- не дублировать одну и ту же логику в разных тестах
- не добавлять лишние абстракции без реальной пользы
- оставлять тесты независимыми и пригодными для параллельного запуска

## Production Notes

- селекторы привязаны к реальным стабильным блокам интерфейса (`.b-top-logo`, `.header-style`, `.b-main-navigation`, `.g-bottom`)
- для кейса `Новости` используется фактическая точка входа, доступная в текущей версии сайта
- стек зависимостей зафиксирован версиями для воспроизводимого CI
- отчетность и артефакты пригодны для анализа падений в GitHub Actions
- в текущей ветке присутствуют намеренные падения для проверки наблюдаемости и полноты артефактов
- `Allure` сохраняется как artifact для скачивания и дополнительно публикуется через `GitHub Pages`
