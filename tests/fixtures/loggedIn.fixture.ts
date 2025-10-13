import { test as base, expect } from '@playwright/test';
import { getLoginEmail } from '../../utils/getLoginEmail';

// Define the shape of your custom fixtures
type Fixtures = {
  loginEmail: string;
  password: string;
};

export const createTest = (accountName: string, accountType?: string, user?: string) => {
  return base.extend<Fixtures>({
    loginEmail: async ({}, use) => {
      // Access your global config (set in playwright.config.ts)
      const config = (global as any).envConfig;

      accountType = accountType || process.env.DEFAULT_ACCOUNT_TYPE || 'applicationManagedAccounts';
      // Compute the loginEmail using your helper
      const email = getLoginEmail(config, accountName, accountType, user);

      // Expose it to the test
      await use(email);
    },
    password: async ({}, use) => {
      const password = process.env.DEFAULT_PASSWORD || '';

      // Expose it to the test
      await use(password);
    },
  });
};

export { expect };
