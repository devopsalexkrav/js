class HomePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('.header-style, header.g-top').first().describe('Шапка сайта');
    this.mainNavigation = page.locator('.b-main-navigation').first().describe('Основная навигация');
    this.contentBlocks = page.locator('.b-main-page-grid-4').describe('Контентные блоки на главной');
    this.footer = page.locator('footer.g-bottom, .footer-style').first().describe('Футер сайта');
    this.searchInput = page
      .locator('input.fast-search__input, input[type="search"], input[name*="query"]')
      .first()
      .describe('Поле поиска');
    this.logoLink = page
      .locator('.b-top-logo a[href="https://www.onliner.by"], .b-top-logo a[href="/"]')
      .first()
      .describe('Ссылка логотипа в шапке');
    this.logoImage = page.locator('.b-top-logo img.onliner_logo').first().describe('Логотип Onliner в шапке');
  }

  async open() {
    await this.page.goto('/');
  }

  primaryHeaderLinks() {
    return this.header.locator('a.header-style__link_primary').describe('Основные ссылки в шапке');
  }

  mainNavigationLinks() {
    return this.mainNavigation
      .locator('a.b-main-navigation__link:visible')
      .describe('Видимые ссылки основной навигации');
  }

  catalogLink() {
    return this.mainNavigation
      .locator('a.b-main-navigation__link:has-text("Каталог")')
      .first()
      .describe('Ссылка Каталог в основной навигации');
  }

  newsLink() {
    return this.mainNavigation
      .locator('a.b-main-navigation__link:has-text("Новости")')
      .first()
      .describe('Ссылка Новости в основной навигации');
  }

  async getPrimaryHeaderLinksData() {
    return this.primaryHeaderLinks().evaluateAll((links) =>
      links.map((link) => ({
        text: (link.textContent || '').trim(),
        href: link.href
      }))
    );
  }

  footerLinks() {
    return this.footer.locator('a[href]').describe('Ссылки в футере');
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
}

module.exports = { HomePage };
