import { expect } from '@playwright/test';
import { test } from './base';

/**
 * Override the user here to test with a specific user in test level.
 * test.use({
 *   user: { email: 'cypressRolesDowngrade@sgizmo.com', password: process.env.DEFAULT_PASSWORD || '' },
 * });
 */

test('Simple test to verify login', async ({ pm }) => {
  await pm.onDashboardPage().goto();
  const title = await pm.onDashboardPage().title();
  expect(title).toBe('Alchemer - Dashboard');
});
