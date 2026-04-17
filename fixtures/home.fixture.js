const base = require('@playwright/test');
const { HomePage } = require('../pages/home.page');

const test = base.test.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  }
});

module.exports = {
  test,
  expect: base.expect
};
