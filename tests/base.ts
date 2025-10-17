import { test as base } from '@playwright/test';
import { PageManager } from '../pages/pageManager';

type User = {
  email: string;
  password: string;
};

export type TestOptions = {
  user: User;
  pm: PageManager;
};

export const test = base.extend<TestOptions>({
  // note: monitor for any page errors and report them if there are any. fail the test if we decided to do so.
  page: async ({ page }, use) => {
    const errors: Array<Error> = [];
    page.on('pageerror', err => {
      errors.push(err);
    });
    console.log('page');
    await use(page);
    // check if there were any errors during the test
    if (errors.length > 0) {
      throw new Error(errors.map(e => e.message).join('\n'));
    }
  },

  // note:pm is a fixture available in runner that provides the PageManager instance
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    console.log('Page Manager');
    await use(pm);
  },
  // note: define user in base.ts (fixture architecture) so it is available in the runner, test suite.
  // The user value is an array, first element is the value for user, second element is the { option: true } make it configurable in test by using test.use()
  user: [
    { email: process.env.DEFAULT_USER_EMAIL || '', password: process.env.DEFAULT_PASSWORD || '' },
    { option: true },
  ],
});

export { expect } from '@playwright/test';
