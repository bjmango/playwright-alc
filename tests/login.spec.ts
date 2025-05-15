import { test } from "./fixtures/loggedInApp.fixture";
import { expect } from "@playwright/test";

import { loadEnvConfig } from "../config/loadEnv";
const envConfig = loadEnvConfig();
const username = envConfig.applicationManagedAccounts?.mainAccount?.email || "";
const password = process.env.DEFAULT_PASSWORD || "123qweASD";

test.use({ username, password });

test("Login to application with first user", async ({ loggedInPage }) => {
  const page = loggedInPage;
  await page.getByRole("img", { name: "" }).click();
  await page.getByRole("link", { name: "Profile and Settings" }).click();
  await expect(page).toHaveURL(/.*user-preferences/);
  await page.getByRole("textbox", { name: "Email Password" }).waitFor({ state: "visible" });
  await expect(page.getByRole("textbox", { name: "Email Password" })).toHaveValue(username);
});

// Skipped test has been removed to follow best practices
// If this was a real test that needs to be fixed later, we would use a TODO comment:
// TODO: Fix and enable this test when feature XYZ is implemented
