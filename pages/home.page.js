class HomePage {
  constructor(page) {
    this.page = page;
    this.header = page.locator('.header-style, header.g-top').first();
    this.mainNavigation = page.locator('.b-main-navigation').first();
    this.contentBlocks = page.locator('.b-main-page-grid-4');
    this.footer = page.locator('footer.g-bottom, .footer-style').first();
    this.searchInput = page
      .locator('input.fast-search__input, input[type="search"], input[name*="query"]')
      .first();
    this.logoLink = page
      .locator('.b-top-logo a[href="https://www.onliner.by"], .b-top-logo a[href="/"]')
      .first();
    this.logoImage = page.locator('.b-top-logo img.onliner_logo').first();
  }

  async open() {
    await this.page.goto('/');
  }

  primaryHeaderLinks() {
    return this.header.locator('a.header-style__link_primary');
  }

  mainNavigationLinks() {
    return this.mainNavigation.locator('a.b-main-navigation__link:visible');
  }

  catalogLink() {
    return this.mainNavigation.locator('a.b-main-navigation__link:has-text("Каталог")').first();
  }

  newsLink() {
    return this.mainNavigation.locator('a.b-main-navigation__link:has-text("Новости")').first();
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
    return this.footer.locator('a[href]');
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
}

module.exports = { HomePage };
