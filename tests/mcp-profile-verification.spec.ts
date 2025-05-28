import { test as baseTest } from "./fixtures/loggedInApp.fixture";
import { expect } from "@playwright/test";

const test = baseTest.extend({
  username: async ({ envConfig }, use) => {
    await use(envConfig.applicationManagedAccounts.mainAccount.email);
  },
  password: async ({}, use) => {
    await use("123qweASD");
  },
});

test.describe("User Profile Verification", () => {
  test("should verify user email is displayed in profile", async ({
    loggedInPage: page,
    username,
  }) => {
    // We're already logged in thanks to the fixture

    // 3. Click on user profile avatar first to reveal dropdown menu
    // Using data-test attribute for more reliable user-facing locator
    await page.locator('[data-test="user-nav"] a.dropdown-toggle').click();

    // Then click on the Profile and Settings link in the dropdown using user-facing link text
    await page.getByRole("link", { name: "Profile and Settings" }).click();

    // Wait for profile page to load
    await page.waitForURL("**/account/user-preferences");

    // 4. Verify user's email is displayed in the email text box
    const emailField = page.getByPlaceholder("Email Address", { exact: true });
    await expect(emailField).toHaveValue(username);

    // Additional verification - make sure we're on the right page
    await expect(page.getByRole("heading", { name: "Profile And Settings" })).toBeVisible();
  });
});
