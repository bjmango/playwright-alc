// simple test verify the user can login to the application
import { createTest, expect } from './fixtures/loggedIn.fixture';

const test = createTest('mainAccount');

test('simple test to verify login', async ({ page, loginEmail, password }) => {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Email' }).fill(loginEmail);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page).toHaveTitle(/Alchemer - Dashboard/);
});
