import { test as baseTest, Page } from "./envConfig.fixture";
import { loadEnvConfig } from "config/loadEnv";

type TestOptions = {
  username: string;
  password: string;
  InternalLoggedInPage: Page;
};

export const test = baseTest.extend<TestOptions>({
  username: ["", { option: true }],
  password: ["", { option: true }],

  InternalLoggedInPage: async ({ page, username, password }, use) => {
    if (!username || !password) {
      throw new Error("Username and password must be provided for loggedInPage");
    }
    const envConfig = loadEnvConfig();
    await page.goto(envConfig.internalToolAccount.baseUrl);
    await page.getByRole("textbox", { name: "" }).first().fill(username);
    await page.getByRole("textbox", { name: "" }).last().fill(password);
    await page.getByRole("button", { name: "Authenticate" }).click();
    await use(page);
  },
});

export { expect } from "@playwright/test";
