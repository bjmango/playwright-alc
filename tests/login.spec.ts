import { expect } from '@playwright/test';
import { test } from './base';

/**
 * Override the user here to test with a specific user in test level.
 * test.use({
 *   user: { email: 'cypressRolesDowngrade@sgizmo.com', password: process.env.DEFAULT_PASSWORD || '' },
 * });
 */

test('Simple test to verify login', async ({ pm, user }) => {
  await pm.onLoginSpaPage().goto();
  await pm.onLoginSpaPage().typeInEmail(user.email);
  await pm.onLegacyLoginPage().legacyLogin(user.password);

  const title = await pm.onDashboardPage().title();
  expect(title).toBe('Alchemer - Dashboard');
});
