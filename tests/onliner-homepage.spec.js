const { test, expect } = require('../fixtures/home.fixture');
const { normalizeComparableText } = require('../utils/text');
const { hasAllowedPathname, isOnlinerEcosystemUrl, toAbsoluteUrl } = require('../utils/url');

test.describe('Onliner homepage smoke checks', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test('TC-01: главная страница открывается @smoke', async ({ page }) => {
    await expect(page).toHaveURL(/onliner\.by/);
  });

  test('TC-02: заголовок страницы содержит Onliner @smoke', async ({ page }) => {
    const normalizedTitle = normalizeComparableText(await page.title());
    expect(normalizedTitle).toContain('onliner');
  });

  test('TC-03: шапка сайта отображается @smoke', async ({ homePage }) => {
    await expect(homePage.header).toBeVisible();
  });

  test('TC-04: логотип видим и ведет на главную', async ({ homePage }) => {
    await test.step('Логотип отображается в шапке', async () => {
      await expect(homePage.logoImage).toBeVisible();
      await expect(homePage.logoLink).toBeVisible();
    });

    await test.step('Ссылка логотипа ведет на главную страницу', async () => {
      await expect(
        homePage.logoLink,
        'Логотип в шапке должен вести на главную страницу Onliner'
      ).toHaveAttribute('href', 'https://www.onliner.by');
    });
  });

  test('TC-05: в верхней навигации не менее 5 внутренних ссылок', async ({ homePage }) => {
    const ecosystemLinks = (await homePage.getPrimaryHeaderLinksData()).filter(
      ({ href }) => href && href !== '#' && isOnlinerEcosystemUrl(href)
    );

    expect(ecosystemLinks.length).toBeGreaterThanOrEqual(5);
  });

  test('TC-06: поле поиска видно и доступно для ввода', async ({ homePage }) => {
    await expect(homePage.searchInput).toBeVisible();
    await expect(homePage.searchInput).toBeEditable();
  });

  test('TC-07: ссылка на каталог присутствует и отдает успешный ответ @smoke', async ({
    homePage,
    request,
    baseURL
  }) => {
    const catalogLink = homePage.catalogLink();

    await test.step('Ссылка на каталог видима в основной навигации', async () => {
      await expect(catalogLink).toBeVisible();
      await expect(catalogLink).toHaveAttribute('href', /catalog\.onliner\.by/);
    });

    const href = await catalogLink.evaluate((element) => element.href);
    expect(isOnlinerEcosystemUrl(href)).toBeTruthy();

    const response = await request.get(toAbsoluteUrl(baseURL, href));
    expect(response.ok()).toBeTruthy();
  });

  test('TC-08: ссылка на новости присутствует и отдает успешный ответ @smoke', async ({
    homePage,
    request,
    baseURL
  }) => {
    const newsLink = homePage.newsLink();

    await test.step('Пункт Новости отображается в основной навигации', async () => {
      await expect(newsLink).toBeVisible();
      await expect(newsLink).toHaveText(/Новости/);
    });

    const href = await newsLink.evaluate((element) => element.href);
    expect(isOnlinerEcosystemUrl(href)).toBeTruthy();
    expect(hasAllowedPathname(href, ['/', '/news'])).toBeTruthy();

    const response = await request.get(toAbsoluteUrl(baseURL, href));
    expect(response.ok()).toBeTruthy();
  });

  test('TC-09: основной контентный блок отображается', async ({ homePage }) => {
    expect(await homePage.contentBlocks.count()).toBeGreaterThan(0);
    await expect(homePage.contentBlocks.first()).toBeVisible();
  });

  test('TC-10: футер видим и содержит ссылки', async ({ homePage }) => {
    await homePage.scrollToBottom();
    await expect(homePage.footer).toBeVisible();
    await expect(homePage.footerLinks().first()).toBeVisible();
  });
});
