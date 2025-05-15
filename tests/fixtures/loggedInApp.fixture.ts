import { test as baseTest, Page, expect } from "./envConfig.fixture";

type TestOptions = {
  username: string;
  password: string;
  loggedInPage: Page;
};

export const test = baseTest.extend<TestOptions>({
  username: ["", { option: true }],
  password: ["", { option: true }],

  loggedInPage: async ({ page, username, password }, use) => {
    if (!username || !password) {
      throw new Error("Username and password must be provided for loggedInPage");
    }
    await page.goto("/");
    await page.getByRole("textbox", { name: "Email" }).fill(username);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByRole("textbox", { name: "••••••••" }).fill(password);
    await page.getByRole("button", { name: "Log In" }).click();
    await expect(page).toHaveTitle(/Alchemer - Dashboard/);
    await use(page);
  },
});
